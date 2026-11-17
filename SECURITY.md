# Security — primitive mutable kinds

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Out-of-range ints | refused |
| Non-finite floats (NaN / Inf) | refused |
| Bad CID / odd-length bytes | refused |
| Kind mismatch (default path) | refused |
| Overlong string (lab cap 256) | refused |
| Sibling keys on write | preserved when full map is used |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Collection auth | authorized_editor, not only owner |
| Live schema enforcement | Serialize with schema.format on contract |
| forceKind in migrations | Explicit, versioned, never silent |
| Chain string limits | Lab 256 ≠ consensus; check AtomicAssets |
| Wipe via partial map | [safe-partial-updater](https://github.com/pixel-journey/px-aa-mutable-safe-partial-updater) |

## Attack angles

1. Accepting a float where the schema says int32.
2. Coercing NaN to 0.
3. Storing level as a string and later reading uint32.
4. Writing only the changed key and deleting nickname.

## Honesty limits

No AtomicAssets RPC. Related: [deserialize-core](https://github.com/pixel-journey/px-aa-mutable-deserialize-core) · [vector CRUD](https://github.com/pixel-journey/px-aa-mutable-vector-arrays-crud) · [MUTABLE-STACK](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/MUTABLE-STACK.md).
