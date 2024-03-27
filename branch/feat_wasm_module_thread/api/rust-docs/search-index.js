var searchIndex = new Map(JSON.parse('[\
["cardano_chain_follower",{"doc":"Cardano chain follower.","t":"PPGPPPPGFPFFPPPFGPPPGPGPPFIPPPPNNNNNNNNNNOOOONNNNNNNNNNNNNNNNNCOONNNNNNNNNNNNNNNNNNNCOOONCNOONNNNNNNNNNNNNNNNNHNNNNNPGSFFFPNNNNNNNNNNNOOONNNNOOCNNNNNNNNNNNNNOONNNOONNNNNNNNNNNNNNNNFGGPPFNNNNNNNNOONNOONNNNNHNNNNNNNNOOHHHHONNNNNNNNNNNNNNNNNFFNNNNNNNNONNNNNNOONNNNNNNNNNNFNNONNNNONNNNNNNNN","n":["Block","Blockfetch","ChainUpdate","Chainsync","Client","Codec","Err","Error","Follower","FollowerBackgroundTaskNotRunning","FollowerConfig","FollowerConfigBuilder","FollowerStartPointNotFound","Mainnet","MithrilSnapshot","MultiEraBlockData","Network","Ok","Origin","ParseNetwork","Point","Point","PointOrTip","Preprod","Preview","Reader","Result","Rollback","Specific","Testnet","Tip","borrow","borrow","borrow","borrow","borrow","borrow_mut","borrow_mut","borrow_mut","borrow_mut","borrow_mut","chain_update_buffer_size","chain_update_buffer_size","chain_update_rx","client","clone","clone_into","decode","decode","decode_fragment","encode","encode_fragment","eq","eq","equivalent","equivalent","equivalent","equivalent","fmt","fmt","fmt","fmt","follow","follow_from","follow_from","from","from","from","from","from","from","from_ref","from_str","hash","into","into","into","into","into","into_request","into_request","into_request","into_request","into_request","mithril_snapshot","mithril_snapshot","mithril_snapshot_path","mithril_snapshot_path","new","read","slot_or_default","task_join_handle","task_request_tx","to_owned","to_string","try_from","try_from","try_from","try_from","try_from","try_into","try_into","try_into","try_into","try_into","type_id","type_id","type_id","type_id","type_id","validate_multiera_block","vzip","vzip","vzip","vzip","vzip","Block","ChainUpdate","DEFAULT_CHAIN_UPDATE_BUFFER_SIZE","Follower","FollowerConfig","FollowerConfigBuilder","Rollback","block_data","borrow","borrow","borrow","borrow","borrow_mut","borrow_mut","borrow_mut","borrow_mut","build","chain_update_buffer_size","chain_update_buffer_size","chain_update_buffer_size","chain_update_rx","close","connect","default","follow_from","follow_from","follow_from","follow_task","from","from","from","from","into","into","into","into","into_request","into_request","into_request","into_request","mithril_snapshot_path","mithril_snapshot_path","mithril_snapshot_path","next","send_request_and_wait","set_read_pointer","task_join_handle","task_request_tx","try_from","try_from","try_from","try_from","try_into","try_into","try_into","try_into","type_id","type_id","type_id","type_id","vzip","vzip","vzip","vzip","MithrilSnapshotState","Request","Response","SetReadPointer","SetReadPointer","TaskState","borrow","borrow","borrow","borrow","borrow_mut","borrow_mut","borrow_mut","borrow_mut","chain_update_tx","client","clone","clone_into","current_read_pointer","current_read_pointer_notify","from","from","from","from","from_ref","handle_request","into","into","into","into","into_request","into_request","into_request","into_request","iter","mithril_snapshot_state","next_from_client","run","send_next_chain_update","set_client_read_pointer","snapshot","to_owned","try_from","try_from","try_from","try_from","try_into","try_into","try_into","try_into","type_id","type_id","type_id","type_id","vzip","vzip","vzip","vzip","MithrilSnapshot","MithrilSnapshotIterator","borrow","borrow","borrow_mut","borrow_mut","contains_point","from","from","from_path","inner","into","into","into_iter","into_request","into_request","next","path","tip","try_from","try_from","try_into","try_into","try_read_block","try_read_block_range","try_read_blocks_from_point","type_id","type_id","vzip","vzip","Reader","borrow","borrow_mut","client","connect","from","into","into_request","mithril_snapshot","read_block","read_block_from_network","read_block_range","read_block_range_from_network","resolve_tip","try_from","try_into","type_id","vzip"],"q":[[0,"cardano_chain_follower"],[116,"cardano_chain_follower::follow"],[180,"cardano_chain_follower::follow::follow_task"],[238,"cardano_chain_follower::mithril_snapshot"],[268,"cardano_chain_follower::read"],[286,"pallas_traverse"],[287,"minicbor::decode::decoder"],[288,"minicbor::decode::error"],[289,"core::result"],[290,"core::error"],[291,"alloc::boxed"],[292,"minicbor::encode::encoder"],[293,"minicbor::encode::error"],[294,"minicbor::encode::write"],[295,"alloc::vec"],[296,"core::fmt"],[297,"core::fmt"],[298,"tonic::request"],[299,"alloc::string"],[300,"core::any"],[301,"tokio::runtime::task::error"],[302,"core::convert"],[303,"std::path"],[304,"core::option"],[305,"tokio::sync::oneshot"],[306,"pallas_network::facades"],[307,"tokio::sync::mpsc::bounded"],[308,"tokio::sync::mpsc::bounded"]],"d":["New block inserted on chain.","Blockfetch protocol error.","Enum of chain updates received by the follower.","Chainsync protocol error.","Client connection error.","Data encoding/decoding error.","Contains the error value","Crate error type.","Cardano chain follower.","Follower background task has stopped.","Configuration for the Cardano chain follower.","Builder used to create <code>FollowerConfig</code>s.","Follower start point was not found.","Cardano mainnet network.","Mithril snapshot error.","CBOR encoded data of a multi-era block.","Enum of possible Cardano networks.","Contains the success value","","Failed to parse","A point within a chain","Represents a specific point of the chain.","A point in the chain or the tip.","Cardano pre-production network.","Cardano preview network.","Cardano chain Reader.","Crate result type.","Chain rollback to the given block.","","Cardano testnet network.","Represents the tip of the chain.","","","","","","","","","","","Block buffer size option.","Configured chain update buffer size.","Chain update receiver.","Connection used by the reader to read blocks.","","","Decodes the data into a multi-era block.","","","","","","","","","","","","","","","Cardano chain follow module.","Where to start following from.","Where to start following from.","Returns the argument unchanged.","","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","","","","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","","","","","","Internal Mithril snapshot functions.","Mithril snapshot, if configured.","Path to the Mithril snapshot the follower should use.","Path to the Mithril snapshot the follower should use.","","Cardano chain read module.","","Task thread join handle.","Task request sender.","","","","","","","","","","","","","","","","","","Validate a multi-era block.","","","","","","New block inserted on chain.","Enum of chain updates received by the follower.","Default <code>Follower</code> block buffer size.","Cardano chain follower.","Configuration for the Cardano chain follower.","Builder used to create <code>FollowerConfig</code>s.","Chain rollback to the given block.","Gets the chain update’s block data.","","","","","","","","","Builds a <code>FollowerConfig</code>.","Sets the size of the chain updates buffer used by the …","Block buffer size option.","Configured chain update buffer size.","Chain update receiver.","Closes the follower connection and stops its background …","Connects the follower to a producer using the node-to-node …","","Sets the point at which the follower will start following …","Where to start following from.","Where to start following from.","Contains functions related to the Follower’s background …","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","","","","","Sets the path of the Mithril snapshot the <code>Follower</code> will …","Path to the Mithril snapshot the follower should use.","Path to the Mithril snapshot the follower should use.","Receive the next chain update from the producer.","Sends a request to the background task and waits for its …","Set the follower’s chain read-pointer. Returns None if …","Task thread join handle.","Task request sender.","","","","","","","","","","","","","","","","","Holds the state of Mithril snapshot functions in the …","Follow task’s requests.","Follow task’s responses.","Request the follow task to set the read pointer to the …","Whether the read pointer was set correctly.","Holds the locks and channels used by the follow task.","","","","","","","","","Shared chain update channel.","Shared client.","","","Shared current read pointer.","Shared current read point notifier.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","Returns the argument unchanged.","","Handles a request.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","","","","","Active snapshot iterator. None means we are not iterating …","Shared Mithril snapshot reading state.","Waits for the next update from the node the client is …","Runs a <code>Follower</code> background task.","Sends the next chain update to the follower. This can be …","Sets the N2N remote client’s read pointer.","Mithril snapshot handle.","","","","","","","","","","","","","","","","","","Holds information about a Mithril snapshot.","Wraps the iterator type returned by Pallas.","","","","","Naively checks if the snapshot contains a point.","Returns the argument unchanged.","Returns the argument unchanged.","Gets information about the snapshot at the given path.","Inner iterator.","Calls <code>U::from(self)</code>.","Calls <code>U::from(self)</code>.","","","","","Path to the Mithril snapshot.","Snapshot’s tip.","","","","","Tries reading a block from the Mithril snapshot. Returns …","Tries reading a range of blocks from the Mithril snapshot. …","Tries get an iterator that reads blocks from the Mithril …","","","","","Cardano chain Reader.","","","Connection used by the reader to read blocks.","Connects the Reader to a producer using the node-to-node …","Returns the argument unchanged.","Calls <code>U::from(self)</code>.","","Mithril snapshot, if configured.","Reads a single block from the chain.","Reads a block from the network using the N2N client.","Reads a range of blocks from the chain.","Reads a range of blocks from the network using the N2N …","Finds the tip point.","","","",""],"i":[30,19,0,19,19,19,5,0,0,19,0,0,19,17,19,0,0,5,1,19,0,23,0,17,17,0,0,30,1,17,23,23,3,19,17,1,23,3,19,17,1,31,32,34,50,1,1,3,1,1,1,1,17,1,1,1,1,1,19,19,17,1,0,31,32,23,23,3,19,17,1,1,17,1,23,3,19,17,1,23,3,19,17,1,0,50,31,32,1,0,1,34,34,1,19,23,3,19,17,1,23,3,19,17,1,23,3,19,17,1,0,23,3,19,17,1,30,0,0,0,0,0,30,30,30,31,32,34,30,31,32,34,31,31,31,32,34,34,34,31,31,31,32,0,30,31,32,34,30,31,32,34,30,31,32,34,31,31,32,34,34,34,34,34,30,31,32,34,30,31,32,34,30,31,32,34,30,31,32,34,0,0,0,38,39,0,38,39,51,41,38,39,51,41,41,41,41,41,41,41,38,39,51,41,41,0,38,39,51,41,38,39,51,41,51,41,0,0,0,0,51,41,38,39,51,41,38,39,51,41,38,39,51,41,38,39,51,41,0,0,49,44,49,44,44,49,44,44,49,49,44,49,49,44,49,44,44,49,44,49,44,44,44,44,49,44,49,44,0,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50,50],"f":"```````````````````````````````{ce{}{}}000000000````{bb}{{ce}d{}{}}{f{{j{h}}}}{{ld}{{A`{bn}}}}{{{Ad{Ab}}}{{A`{c{Ah{Af}}}}}{}}{{b{Aj{c}}d}{{A`{dAl}}}An}{c{{A`{{B`{Ab}}{Ah{Af}}}}}{}}{{BbBb}Bd}{{bb}Bd}{{ce}Bd{}{}}000{{BfBh}Bj}0{{BbBh}Bj}{{bBh}{{A`{dBl}}}}```{cc{}}{bBn}11111{C`{{A`{Bbc}}}{}}{{bc}dCb}{ce{}{}}0000{c{{Cd{e}}}{}{}}0000````{{Cf{B`{Ab}}}b}`{bCf}``3{cCh{}}{c{{A`{e}}}{}{}}000000000{cCj{}}0000{hd}77777```````{Clf}88888888{CnD`}{{CnDb}Cn}```{Dd{{A`{dDf}}}}{{C`BbD`}{{j{Dd}}}}{{}Cn}{{Cnc}Cn{{Dh{Bn}}}}```{cc{}}000????>>>>{{CnDj}Cn}``{Dd{{j{Cl}}}}{{DdDl}{{j{Dn}}}}{{Ddc}{{j{{E`{b}}}}}{{Dh{Bn}}}}``>>>>>>>>===={ce{}{}}000``````00000000``{EbEb}{{ce}d{}{}}``77777{{EbDl{Ed{Dn}}}d}3333{c{{Cd{e}}}{}{}}000``{Eb{{j{{E`{Cl}}}}}}{{Ef{E`{Eh}}{El{{Ej{Dl{Ed{Dn}}}}}}{En{{j{Cl}}}}}d}{Eb{{A`{d{F`{{j{Cl}}}}}}}}{{EfBn}{{j{{E`{b}}}}}}`8{c{{A`{e}}}{}{}}0000000{cCj{}}000::::``::::{{Ehb}Bd}{cc{}}0{Dj{{j{Eh}}}}`===99{Fb{{E`{c}}}{}}``5555{{Ehb}{{j{{E`{f}}}}}}{{Ehbb}{{j{{E`{{Ej{b{B`{f}}}}}}}}}}{{Ehb}{{E`{Fb}}}}77{ce{}{}}0`00`{{C`Bb{E`{Dj}}}{{j{Fd}}}}71?`{{Fdc}{{j{f}}}{{Dh{Bn}}}}{{Fdb}{{j{f}}}}{{Fdbc}{{j{{B`{f}}}}}{{Dh{Bn}}}}{{Fdbb}{{j{{B`{f}}}}}}{Fd{{j{b}}}}??>6","c":[],"p":[[6,"Point",0],[1,"unit"],[5,"MultiEraBlockData",0],[6,"MultiEraBlock",286],[8,"Result",0],[5,"Decoder",287],[5,"Error",288],[6,"Result",289],[1,"u8"],[1,"slice"],[10,"Error",290],[5,"Box",291],[5,"Encoder",292],[5,"Error",293],[10,"Write",294],[5,"Vec",295],[6,"Network",0],[1,"bool"],[6,"Error",0],[5,"Formatter",296],[8,"Result",296],[5,"Error",296],[6,"PointOrTip",0],[1,"str"],[10,"Hasher",297],[5,"Request",298],[1,"u64"],[5,"String",299],[5,"TypeId",300],[6,"ChainUpdate",116],[5,"FollowerConfigBuilder",116],[5,"FollowerConfig",116],[1,"usize"],[5,"Follower",116],[5,"JoinError",301],[10,"Into",302],[5,"PathBuf",303],[6,"Request",180],[6,"Response",180],[6,"Option",304],[5,"TaskState",180],[5,"Sender",305],[5,"PeerClient",306],[5,"MithrilSnapshot",238],[1,"tuple"],[5,"Receiver",307],[5,"Sender",307],[5,"SendError",308],[5,"MithrilSnapshotIterator",238],[5,"Reader",268],[5,"MithrilSnapshotState",180]],"b":[[58,"impl-Display-for-Error"],[59,"impl-Debug-for-Error"]]}],\
["follow_chain_updates",{"doc":"This example shows how to use the chain follower to follow …","t":"H","n":["main"],"q":[[0,"follow_chain_updates"],[1,"core::error"],[2,"alloc::boxed"],[3,"core::result"]],"d":[""],"i":[0],"f":"{{}{{h{b{f{d}}}}}}","c":[],"p":[[1,"unit"],[10,"Error",1],[5,"Box",2],[6,"Result",3]],"b":[]}],\
["follow_chain_updates_mithril",{"doc":"This example shows how to use the chain follower to follow …","t":"H","n":["main"],"q":[[0,"follow_chain_updates_mithril"],[1,"core::error"],[2,"alloc::boxed"],[3,"core::result"]],"d":[""],"i":[0],"f":"{{}{{h{b{f{d}}}}}}","c":[],"p":[[1,"unit"],[10,"Error",1],[5,"Box",2],[6,"Result",3]],"b":[]}],\
["hermes",{"doc":"The Hermes Node.","t":"HCCCCFNONNNNNONNNNONNNNONNNNNNNFNNNNNNNNNNNNNNNNNNKFNNNONNNONNNMNONNNN","n":["main","wasm","context","engine","module","Context","app_name","app_name","borrow","borrow_mut","clone","clone_into","counter","counter","deref","deref_mut","drop","event_name","event_name","from","init","into","module_id","module_id","new","to_owned","try_from","try_into","type_id","use_for","vzip","Engine","borrow","borrow_mut","clone","clone_into","deref","deref","deref_mut","deref_mut","drop","from","init","into","new","to_owned","try_from","try_into","type_id","vzip","LinkImport","Module","borrow","borrow_mut","call_func","context","deref","deref_mut","drop","engine","from","init","into","link","new","pre_instance","try_from","try_into","type_id","vzip"],"q":[[0,"hermes"],[2,"hermes::wasm"],[5,"hermes::wasm::context"],[31,"hermes::wasm::engine"],[50,"hermes::wasm::module"],[70,"alloc::string"],[71,"core::option"],[72,"rusty_ulid"],[73,"core::result"],[74,"core::any"],[75,"core::error"],[76,"alloc::boxed"],[77,"std::thread"],[78,"wasmtime::func::typed"],[79,"wasmtime::func::typed"]],"d":["","WASM related structures and functions which are specific …","WASM module’s context implementation.","WASM engine implementation Wrapper over the …","WASM module implementation. Wrapper over the …","A WASM module’s context structure, which is intended to …","Get the application name","Hermes application name","","","","","Get the counter value","module’s execution counter","","","","Get the event name","event name to be executed","Returns the argument unchanged.","","Calls <code>U::from(self)</code>.","Get the module id","module ULID id","Creates a new instance of the <code>Context</code>.","","","","","Increments the module’s execution counter and sets the …","","WASM Engine struct","","","","","","","","","","Returns the argument unchanged.","","Calls <code>U::from(self)</code>.","Creates a new instance of the <code>Engine</code>.","","","","","","Interface for linking WASM imports","Structure defines an abstraction over the WASM module It …","","","Call WASM module’s function. For each call creates a …","<code>Context</code> entity","","","","<code>Engine</code> entity","Returns the argument unchanged.","","Calls <code>U::from(self)</code>.","Link imports to the <code>wasmtime::Linker</code>","Instantiate WASM module","<code>wasmtime::InstancePre</code> entity","","","",""],"i":[0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,0,0,14,14,14,14,14,14,14,14,14,14,14,18,14,14,14,14,14,14],"f":"{{}b}`````{df}`{ce{}{}}0{dd}{{ce}b{}{}}{dh}`{jc{}}0{jb}{d{{n{l}}}}`{cc{}}{{}j}8{dA`}`{ld}:{c{{Ab{e}}}{}{}}0{cAd{}}{{dl}b}=`=={AfAf}<:{Afc{}};0:87?{{}{{Ab{Af{Aj{Ah}}}}}}{ce{}{}}6650``00{{Allc}{{An{{Ab{e{Aj{Ah}}}}}}}B`Bb}`>>=`;:1{{Bd{Bf{c}}}{{Ab{b{Aj{Ah}}}}}{}}{{Afl{Bj{Bh}}{Bj{{Aj{Bd}}}}}{{Ab{Al{Aj{Ah}}}}}}`9983","c":[],"p":[[1,"unit"],[5,"Context",5],[1,"str"],[1,"u64"],[1,"usize"],[5,"String",70],[6,"Option",71],[5,"Ulid",72],[6,"Result",73],[5,"TypeId",74],[5,"Engine",31],[10,"Error",75],[5,"Box",76],[5,"Module",50],[5,"JoinHandle",77],[10,"WasmParams",78],[10,"WasmResults",78],[10,"LinkImport",50],[5,"Linker",79],[1,"u8"],[1,"slice"]],"b":[]}],\
["read_block",{"doc":"This example shows how to use the chain reader to download …","t":"H","n":["main"],"q":[[0,"read_block"],[1,"core::error"],[2,"alloc::boxed"],[3,"core::result"]],"d":[""],"i":[0],"f":"{{}{{h{b{f{d}}}}}}","c":[],"p":[[1,"unit"],[10,"Error",1],[5,"Box",2],[6,"Result",3]],"b":[]}],\
["read_block_mithril",{"doc":"This example shows how to use the chain reader to read …","t":"H","n":["main"],"q":[[0,"read_block_mithril"],[1,"core::error"],[2,"alloc::boxed"],[3,"core::result"]],"d":[""],"i":[0],"f":"{{}{{h{b{f{d}}}}}}","c":[],"p":[[1,"unit"],[10,"Error",1],[5,"Box",2],[6,"Result",3]],"b":[]}],\
["read_block_range",{"doc":"This example shows how to use the chain reader to download …","t":"H","n":["main"],"q":[[0,"read_block_range"],[1,"core::error"],[2,"alloc::boxed"],[3,"core::result"]],"d":[""],"i":[0],"f":"{{}{{h{b{f{d}}}}}}","c":[],"p":[[1,"unit"],[10,"Error",1],[5,"Box",2],[6,"Result",3]],"b":[]}],\
["read_block_range_mithril",{"doc":"This example shows how to use the chain reader to read …","t":"H","n":["main"],"q":[[0,"read_block_range_mithril"],[1,"core::error"],[2,"alloc::boxed"],[3,"core::result"]],"d":[""],"i":[0],"f":"{{}{{h{b{f{d}}}}}}","c":[],"p":[[1,"unit"],[10,"Error",1],[5,"Box",2],[6,"Result",3]],"b":[]}]\
]'));
if (typeof exports !== 'undefined') exports.searchIndex = searchIndex;
else if (window.initSearch) window.initSearch(searchIndex);
