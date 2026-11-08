# px-aa-mutable-all-primitive-types

> **Trust:** private educational lab (Tier B)  
> **Quest:** 023 — int8..int64, uint8..uint64, float, double, string, ipfs, byte  
> **Layer:** 3 of 5. Map: [MUTABLE-STACK.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/MUTABLE-STACK.md)  
> **Vault:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

This is **not** its own contract. It is the scalar type check for the same `setassetdata` write as the other `px-aa-mutable-*` labs. Bytes are quest 021. Keeping sibling keys is 022. Vectors are 024. The XP game rule is 025.

Typed coerce and `setPrimitive` for every AtomicAssets scalar kind. Bounds, finite floats, CIDv0/v1 ipfs, even-length hex byte. Sibling keys stay when one field is written. Kind changes need `forceKind`.

**Real code:** `npm test`. No live AtomicAssets, no wasm.

## Run

```bash
npm test
```

MIT — Pixel Journey
