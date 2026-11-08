# px-aa-mutable-all-primitive-types

> **Trust:** private educational lab (Tier B)  
> **Quest:** 023 — int8..int64, uint8..uint64, float, double, string, ipfs, byte  
> **Vault:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

Typed coerce and `setPrimitive` for every AtomicAssets scalar kind. Bounds, finite floats, CIDv0/v1 ipfs, even-length hex byte. Sibling keys stay when one field is written. Kind changes need `forceKind`.

**Real code:** `npm test`. No live AtomicAssets, no wasm.

## Run

```bash
npm test
```

MIT — Pixel Journey
