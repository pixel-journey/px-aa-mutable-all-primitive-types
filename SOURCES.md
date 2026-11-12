# Official sources

| Source | Use |
| --- | --- |
| [Serialization wiki — valid types](https://github.com/pinknetworkx/atomicassets-contract/wiki/Serialization) | int8..int64, uint8..uint64, float, double, string, ipfs, bool, byte, fixed* |
| [atomicassets-contract](https://github.com/pinknetworkx/atomicassets-contract) | Schema format drives serialize/deserialize |
| [WAX: Modifying mutable data](https://docs.wax.io/build/tutorials/howto_atomicassets/mutabledata) | ATTRIBUTE_MAP value shape on the client |
| [WAX: How-To AtomicAssets](https://docs.wax.io/build/tutorials/howto_atomicassets) | Standard overview |

Types are defined by the **schema format** on the collection, not by the client inventing kinds. This lab checks values; it does not load the `schemas` table.

## Stack position

Layer **3 of 5**. Previous: [safe-partial-updater](https://github.com/pixel-journey/px-aa-mutable-safe-partial-updater). Next: [vector-arrays-crud](https://github.com/pixel-journey/px-aa-mutable-vector-arrays-crud). Path: [MUTABLE-STACK.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/MUTABLE-STACK.md).
