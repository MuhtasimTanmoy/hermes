//! Cardano Blockchain runtime extension implementation.
#![allow(unused)]

use std::{
    error::Error,
    sync::{
        atomic::{AtomicBool, AtomicU32},
        Arc,
    },
};

use dashmap::DashMap;
use tracing::{instrument, trace, warn, Instrument};

use crate::{
    app::HermesAppName,
    event::{HermesEvent, TargetApp, TargetModule},
    runtime_extensions::bindings::{
        exports::hermes::cardano::event_on_txn::CardanoTxn,
        hermes::cardano::api::{BlockSrc, CardanoBlockchainId, Slot},
    },
    wasm::module::ModuleId,
};

mod event;
mod host;

pub(super) type Result<T> = std::result::Result<T, Box<dyn Error>>;

struct TokioRuntimeSpawnFollowerCommand {
    chain_id: CardanoBlockchainId,
    subscription_state: Arc<SubscriptionState>,
    follow_from: cardano_chain_follower::PointOrTip,
}

type TokioRuntimeHandleCommandSender = tokio::sync::mpsc::Sender<(
    TokioRuntimeSpawnFollowerCommand,
    tokio::sync::oneshot::Sender<ChainFollowerHandle>,
)>;
type TokioRuntimeHandleCommandReceiver = tokio::sync::mpsc::Receiver<(
    TokioRuntimeSpawnFollowerCommand,
    tokio::sync::oneshot::Sender<ChainFollowerHandle>,
)>;

struct TokioRuntimeHandle {
    cmd_tx: TokioRuntimeHandleCommandSender,
}

impl TokioRuntimeHandle {
    fn spawn_follower_sync(
        &self, chain_id: CardanoBlockchainId, subscription_state: Arc<SubscriptionState>,
        follow_from: cardano_chain_follower::PointOrTip,
    ) -> Result<ChainFollowerHandle> {
        let (res_tx, res_rx) = tokio::sync::oneshot::channel();
        let cmd = TokioRuntimeSpawnFollowerCommand {
            chain_id,
            subscription_state,
            follow_from,
        };

        self.cmd_tx.blocking_send((cmd, res_tx)).map_err(Box::new)?;

        // TODO(FelipeRosa): Handle errors
        let handle = res_rx.blocking_recv().expect("Tokio runtime not running");
        Ok(handle)
    }
}

type ChainFollowerHandleCommandSender = tokio::sync::mpsc::Sender<(
    cardano_chain_follower::PointOrTip,
    tokio::sync::oneshot::Sender<
        cardano_chain_follower::Result<Option<cardano_chain_follower::Point>>,
    >,
)>;
type ChainFollowerHandleCommandReceiver = tokio::sync::mpsc::Receiver<(
    cardano_chain_follower::PointOrTip,
    tokio::sync::oneshot::Sender<
        cardano_chain_follower::Result<Option<cardano_chain_follower::Point>>,
    >,
)>;

struct ChainFollowerHandle {
    cmd_tx: ChainFollowerHandleCommandSender,
}

impl ChainFollowerHandle {
    fn set_read_pointer_sync(
        &self, at: cardano_chain_follower::PointOrTip,
    ) -> cardano_chain_follower::Result<Option<cardano_chain_follower::Point>> {
        let (res_tx, res_rx) = tokio::sync::oneshot::channel();

        // TODO(FelipeRosa): This should be mapped into an error. It's a serious bug
        // if the follower's executor was stopped and the handle was not dropped.
        self.cmd_tx
            .blocking_send((at, res_tx))
            .expect("Follower executor is not running");

        // TODO(FelipeRosa): Same as above.
        let result = res_rx
            .blocking_recv()
            .expect("Follower executor is not running");

        result
    }
}

type FollowerId = u32;
type ChainUpdateSender = tokio::sync::mpsc::Sender<(
    FollowerId,
    cardano_chain_follower::Result<cardano_chain_follower::ChainUpdate>,
)>;
type ChainUpdateReceiver = tokio::sync::mpsc::Receiver<(
    FollowerId,
    cardano_chain_follower::Result<cardano_chain_follower::ChainUpdate>,
)>;

#[derive(Default)]
struct SubscriptionState {
    stopped: AtomicBool,
    subscribed_to_blocks: AtomicBool,
    subscribed_to_txns: AtomicBool,
    subscribed_to_rollbacks: AtomicBool,
    follower_handle: std::sync::RwLock<Option<ChainFollowerHandle>>,
}

struct State {
    tokio_rt_handle: TokioRuntimeHandle,
    subscriptions:
        DashMap<(HermesAppName, ModuleId, cardano_chain_follower::Network), Arc<SubscriptionState>>,
}

static STATE: once_cell::sync::Lazy<State> = once_cell::sync::Lazy::new(|| {
    // Spawn a thread for running a Tokio runtime if we haven't yet.
    // This is done so we can run async functions.
    let (tokio_cmd_tx, tokio_cmd_rx) = tokio::sync::mpsc::channel(1);
    std::thread::spawn(move || {
        tokio_runtime_executor(tokio_cmd_rx);
    });

    State {
        tokio_rt_handle: TokioRuntimeHandle {
            cmd_tx: tokio_cmd_tx,
        },
        subscriptions: DashMap::new(),
    }
});

/// Advise Runtime Extensions of a new context
pub(crate) fn new_context(_ctx: &crate::runtime_context::HermesRuntimeContext) {}

pub(super) enum SubscriptionType {
    Blocks(Slot),
    Rollbacks,
    Transactions,
}

pub(super) fn subscribe(
    chain_id: CardanoBlockchainId, app_name: HermesAppName, module_id: ModuleId,
    sub_type: SubscriptionType,
) -> Result<()> {
    let network = network_from_chain_id(chain_id);

    let sub_state = STATE
        .subscriptions
        .entry((app_name.clone(), module_id.clone(), network))
        .or_default();

    match sub_type {
        SubscriptionType::Blocks(opt) => {
            // TODO(FelipeRosa): This should handle each case for the subscription.
            // follow_from should be Some(PointOrTip) if we need to follow from some specified point
            // or None if we should continue following from the last point.
            let follow_from = match opt {
                Slot::Continue => None,
                Slot::Genesis => Some(cardano_chain_follower::PointOrTip::Point(
                    cardano_chain_follower::Point::Origin,
                )),
                Slot::Point((slot_no, hash)) => Some(cardano_chain_follower::PointOrTip::Point(
                    cardano_chain_follower::Point::Specific(slot_no, hash),
                )),
                Slot::Tip => Some(cardano_chain_follower::PointOrTip::Tip),
            };

            let follow_from = match follow_from {
                Some(p) => p,
                None => {
                    // TODO(FelipeRosa): Implement the logic for when this is a new
                    // subscription but "continue" was requested.
                    cardano_chain_follower::PointOrTip::Tip
                },
            };

            let follower_handle_lock = sub_state.follower_handle.write();

            match follower_handle_lock {
                Ok(mut lock) => {
                    // NOTE(FelipeRosa): In the case the subscription is already active,
                    // we simply ask the follower to set its read pointer to the correct
                    // position on the chain.

                    match lock.as_mut() {
                        Some(handle) => {
                            // TODO(FelipeRosa): Handle error.
                            // Maybe this should cause subscribe to fail and the module could retry?
                            handle.set_read_pointer_sync(follow_from).unwrap();
                        },
                        None => {
                            // TODO(FelipeRosa): Handle error
                            let follower_handle = STATE
                                .tokio_rt_handle
                                .spawn_follower_sync(chain_id, sub_state.clone(), follow_from)
                                .unwrap();

                            *lock = Some(follower_handle);
                        },
                    }
                },
                Err(_) => {
                    // TODO(FelipeRosa): Handle error
                },
            }

            sub_state
                .subscribed_to_blocks
                .store(true, std::sync::atomic::Ordering::SeqCst);
        },
        SubscriptionType::Rollbacks => {
            sub_state
                .subscribed_to_rollbacks
                .store(true, std::sync::atomic::Ordering::SeqCst);
        },
        SubscriptionType::Transactions => {
            sub_state
                .subscribed_to_txns
                .store(true, std::sync::atomic::Ordering::SeqCst);
        },
    }
    Ok(())
}

pub(super) fn unsubscribe(
    chain_id: CardanoBlockchainId, app_name: HermesAppName, module_id: ModuleId,
    opts: crate::runtime_extensions::bindings::hermes::cardano::api::UnsubscribeOptions,
) -> Result<()> {
    use crate::runtime_extensions::bindings::hermes::cardano::api::UnsubscribeOptions;

    let network = network_from_chain_id(chain_id);
    let sub_state = STATE.subscriptions.get(&(app_name, module_id, network));

    if let Some(sub_state) = sub_state {
        if opts & UnsubscribeOptions::BLOCK == UnsubscribeOptions::BLOCK {
            sub_state
                .subscribed_to_blocks
                .store(false, std::sync::atomic::Ordering::SeqCst);
        }

        if opts & UnsubscribeOptions::TRANSACTION == UnsubscribeOptions::TRANSACTION {
            sub_state
                .subscribed_to_txns
                .store(false, std::sync::atomic::Ordering::SeqCst);
        }

        if opts & UnsubscribeOptions::ROLLBACK == UnsubscribeOptions::ROLLBACK {
            sub_state
                .subscribed_to_rollbacks
                .store(false, std::sync::atomic::Ordering::SeqCst);
        }

        // TODO(FelipeRosa): Implement STOP
    }

    Ok(())
}

#[instrument(skip(cmd_rx))]
fn tokio_runtime_executor(mut cmd_rx: TokioRuntimeHandleCommandReceiver) {
    // TODO(FelipeRosa): Handle error
    let rt = tokio::runtime::Builder::new_current_thread()
        .enable_io()
        .build()
        .unwrap();
    trace!("Created Tokio runtime");

    rt.block_on(async move {
        while let Some((cmd, res_tx)) = cmd_rx.recv().await {
            let (follower_cmd_tx, follower_cmd_rx) = tokio::sync::mpsc::channel(1);

            trace!("Spawning chain follower executor");
            tokio::spawn(chain_follower_executor(
                follower_cmd_rx,
                cmd.chain_id,
                cmd.subscription_state,
            ));

            drop(res_tx.send(ChainFollowerHandle {
                cmd_tx: follower_cmd_tx,
            }));
        }
    });
}

#[instrument(skip(cmd_rx, subscription_state))]
async fn chain_follower_executor(
    mut cmd_rx: ChainFollowerHandleCommandReceiver, chain_id: CardanoBlockchainId,
    subscription_state: Arc<SubscriptionState>,
) {
    let config = cardano_chain_follower::FollowerConfigBuilder::default().build();
    let network = network_from_chain_id(chain_id);

    let mut follower = cardano_chain_follower::Follower::connect(
        follower_connect_address(network),
        network,
        config,
    )
    .await
    .unwrap();
    trace!("Started chain follower");

    'exec_loop: loop {
        tokio::select! {
            res = cmd_rx.recv() => {
                match res {
                    Some((follow_from, res_tx)) => {
                        let result = follower.set_read_pointer(follow_from).await;

                        // TODO(FelipeRosa): Decide what to do with this
                        if let Err(e) = result {
                            warn!(error = ?e, "Failed to set read pointer");
                            break 'exec_loop;
                        }

                        // Ignore if the receiver is closed.
                        drop(res_tx.send(result));
                    }
                    None => break 'exec_loop,
                }
            }

            result = follower.next() => {
                let chain_update = match result {
                    Ok(chain_update) => chain_update,
                    Err(e) => {
                        // TODO(FelipeRosa): Decide what to do with this
                        warn!(error = ?e, "Failed to get chain update");
                        break 'exec_loop;
                    },
                };

                let current_follower_slot = match chain_update {
                    cardano_chain_follower::ChainUpdate::Block(block_data) => {
                        let subscribed_to_blocks =
                            subscription_state.subscribed_to_blocks.load(std::sync::atomic::Ordering::SeqCst);

                        let subscribed_to_txns =
                            subscription_state.subscribed_to_txns.load(std::sync::atomic::Ordering::SeqCst);

                        if !subscribed_to_blocks && !subscribed_to_txns {
                            // Ignore this update
                            continue;
                        }

                        // TODO(FelipeRosa):
                        // 1. Handle error
                        let decoded_block_data = block_data.decode().unwrap();
                        let slot = decoded_block_data.slot();

                        if subscribed_to_blocks {
                            let on_block_event = event::OnCardanoBlockEvent {
                                blockchain: chain_id,
                                block: Vec::new(),
                                source: BlockSrc::TIP,
                            };
                            trace!("Generated Cardano block event");

                            // TODO(FelipeRosa): Handle error?
                            drop(crate::event::queue::send(HermesEvent::new(
                                on_block_event,
                                TargetApp::List(Vec::new()),
                                TargetModule::All,
                            )));
                        }

                        if subscribed_to_txns {
                            let txs = decoded_block_data.txs();

                            for (index, tx) in txs.iter().enumerate() {
                                let on_txn_event = event::OnCardanoTxnEvent {
                                    blockchain: chain_id,
                                    slot,
                                    txn_index: index as u32,
                                    txn: tx.encode(),
                                };

                                drop(crate::event::queue::send(HermesEvent::new(
                                    on_txn_event,
                                    TargetApp::List(Vec::new()),
                                    TargetModule::All,
                                )));
                            }

                            trace!(tx_count = txs.len(), "Generated Cardano block transactions events");
                        }

                        slot
                    },
                    cardano_chain_follower::ChainUpdate::Rollback(block_data) => {
                        let subscribed_to_rollbacks =
                            subscription_state.subscribed_to_rollbacks.load(std::sync::atomic::Ordering::SeqCst);

                        if !subscribed_to_rollbacks {
                            continue;
                        }

                        // TODO(FelipeRosa):
                        // 1. Handle error
                        let decoded_block_data = block_data.decode().unwrap();
                        let slot = decoded_block_data.slot();

                        let on_rollback_event = event::OnCardanoRollback {
                            blockchain: CardanoBlockchainId::Preprod,
                            slot: 0,
                        };
                        trace!("Generated Cardano rollback event");

                        // TODO(FelipeRosa): Handle error?
                        let res = crate::event::queue::send(HermesEvent::new(
                            on_rollback_event,
                            TargetApp::List(Vec::new()),
                            TargetModule::All,
                        ));

                        slot
                    },
                };
            }
        }
    }

    // TODO(FelipeRosa): Stop waiting if this times out.
    drop(follower.close().await);
}

const fn follower_connect_address(network: cardano_chain_follower::Network) -> &'static str {
    match network {
        cardano_chain_follower::Network::Mainnet => "backbone.cardano-mainnet.iohk.io:3001",
        cardano_chain_follower::Network::Preprod => "preprod-node.play.dev.cardano.org:3001",
        cardano_chain_follower::Network::Preview => "preview-node.play.dev.cardano.org:3001",
        cardano_chain_follower::Network::Testnet => todo!(),
    }
}

const fn network_from_chain_id(chain_id: CardanoBlockchainId) -> cardano_chain_follower::Network {
    match chain_id {
        CardanoBlockchainId::Mainnet => cardano_chain_follower::Network::Mainnet,
        CardanoBlockchainId::Preprod => cardano_chain_follower::Network::Preprod,
        CardanoBlockchainId::Preview => cardano_chain_follower::Network::Preview,
        CardanoBlockchainId::LocalTestBlockchain => todo!(),
    }
}

#[cfg(test)]
mod test {
    use rusty_ulid::Ulid;

    use crate::{
        app::HermesAppName,
        runtime_extensions::bindings::hermes::cardano::api::{
            CardanoBlockchainId, Slot, UnsubscribeOptions,
        },
        wasm::module::ModuleId,
    };

    use super::{subscribe, unsubscribe, SubscriptionType};

    #[test]
    fn it_works() {
        tracing_subscriber::fmt()
            .with_thread_ids(true)
            .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
            .init();

        let app_name = HermesAppName("test_app_it_works".to_string());
        let module_id = ModuleId(Ulid::generate());

        subscribe(
            CardanoBlockchainId::Preprod,
            app_name.clone(),
            module_id.clone(),
            SubscriptionType::Rollbacks,
        )
        .expect("subscribed");

        subscribe(
            CardanoBlockchainId::Preprod,
            app_name.clone(),
            module_id.clone(),
            SubscriptionType::Blocks(Slot::Tip),
        )
        .expect("subscribed");

        subscribe(
            CardanoBlockchainId::Preprod,
            app_name.clone(),
            module_id.clone(),
            SubscriptionType::Transactions,
        )
        .expect("subscribed");

        std::thread::sleep(std::time::Duration::from_secs(5));

        subscribe(
            CardanoBlockchainId::Preprod,
            app_name.clone(),
            module_id.clone(),
            // NOTE(FelipeRosa):
            // For some reason this does not work:
            // Slot::Genesis
            // So I'm using some other point.
            SubscriptionType::Blocks(Slot::Point((
                49_075_522,
                hex::decode("b7639b523f320643236ab0fc04b7fd381dedd42c8d6b6433b5965a5062411396")
                    .unwrap(),
            ))),
        )
        .expect("subscribed");

        std::thread::sleep(std::time::Duration::from_secs(5));

        unsubscribe(
            CardanoBlockchainId::Preprod,
            app_name,
            module_id,
            UnsubscribeOptions::BLOCK,
        );

        std::thread::sleep(std::time::Duration::from_secs(100));
    }
}
