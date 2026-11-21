# Sources

## Official AtomicAssets / WAX

| Source | Use |
| --- | --- |
| [atomicassets-contract](https://github.com/pinknetworkx/atomicassets-contract) | Typed attributes, serialize path |
| [Serialization wiki](https://github.com/pinknetworkx/atomicassets-contract/wiki/Serialization) | Kind encodings, field ids |
| [WAX How-To AtomicAssets](https://docs.wax.io/build/tutorials/howto_atomicassets) | Overview |
| [WAX: Modifying mutable data](https://docs.wax.io/build/tutorials/howto_atomicassets/mutabledata) | `setassetdata` args |
| [atomicassets-sdk](https://github.com/atomicassets/atomicassets-sdk) | Official TS serialize / actions |
| [MUTABLE-STACK.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/MUTABLE-STACK.md) | Layer order |

## WharfKit

| Source | Use |
| --- | --- |
| [@wharfkit/atomicassets](https://www.npmjs.com/package/@wharfkit/atomicassets) | AA API client |
| [wharfkit/skill](https://github.com/wharfkit/skill) | Agent skill for Session / Contract Kit |
| [WharfKit docs](https://wharfkit.com/) | Session, types, starter-wax |

## Product facts locked by this lab

- Match **schema types** exactly (int8 is not int64; string is not ipfs).
- Kind mismatch is **non-mutating** — throws, state unchanged.
- Keep **sibling keys** on every update (full-map replace).
- Prefer bigint for 64-bit fields in TypeScript labs.
- Refuse NaN, Inf, and out-of-range integers instead of clamping.
- Lab string length **256** is a teaching cap, not a consensus claim.

## Related labs

| Lab | Role |
| --- | --- |
| [deserialize-core](https://github.com/pixel-journey/px-aa-mutable-deserialize-core) | Bytes ↔ map |
| [safe-partial-updater](https://github.com/pixel-journey/px-aa-mutable-safe-partial-updater) | Full-map patch / wipe |
| [vector-arrays-crud](https://github.com/pixel-journey/px-aa-mutable-vector-arrays-crud) | Vector ops |
| [rpg-xp-and-leveling](https://github.com/pixel-journey/px-aa-mutable-rpg-xp-and-leveling) | Multi-field game rule |
