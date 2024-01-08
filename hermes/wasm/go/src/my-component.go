// my-component.go
package main

import (
	"workspace/host"
  "fmt"
)

func init() {
    a := HostImpl{}
    host.SetExportsExampleHostFoo(a)
}

type HostImpl struct {
}

func (e HostImpl) Hello(name string) string {
  msg := "Hello, dear " + name + "!"
  host.ExampleHostBarSay(msg)
  fmt.Println(msg)
  return msg
}

//go:generate wit-bindgen tiny-go ../wit --out-dir=../host
func main() {}