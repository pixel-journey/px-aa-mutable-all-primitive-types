# Security — primitive mutable kinds

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Out-of-range ints | refused |
| Non-finite floats (NaN / Inf) | refused |
| Bad CID / odd-length bytes | refused |
| Kind mismatch (default path) | refused |
| Overlong string (lab cap **256**) | refused |
| Sibling keys on write | preserved when full map is used |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Collection auth | `authorized_editor`, not only owner |
| Live schema enforcement | Serialize with schema.format on contract |
| forceKind in migrations | Explicit, versioned, never silent |
| Chain string limits | Lab 256 ≠ consensus; check AtomicAssets |
| Wipe via partial map | [safe-partial-updater](https://github.com/pixel-journey/px-aa-mutable-safe-partial-updater) |

## Attack angles

1. Accepting a float where the schema says int32.  
2. Coercing NaN to 0.  
3. Storing level as a string and later reading uint32.  
4. Writing only the changed key and deleting nickname.  
5. Silent `forceKind` migrations without a version bump.

## Honesty limits

No AtomicAssets RPC. Layer 3 of the mutable stack.

| Sibling | Role |
| --- | --- |
| [deserialize-core](https://github.com/pixel-journey/px-aa-mutable-deserialize-core) | Bytes → fields |
| [safe-partial](https://github.com/pixel-journey/px-aa-mutable-safe-partial-updater) | Merge without wipe |
| [vector CRUD](https://github.com/pixel-journey/px-aa-mutable-vector-arrays-crud) | Array ops + index shift |
| [RPG XP](https://github.com/pixel-journey/px-aa-mutable-rpg-xp-and-leveling) | Level agreement |

[AtomicAssets contract](https://github.com/pinknetworkx/atomicassets-contract) · [docs.wax.io AtomicAssets](https://docs.wax.io/build/tutorials/howto_atomicassets).
