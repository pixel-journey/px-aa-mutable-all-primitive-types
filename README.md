# px-aa-mutable-all-primitive-types

> **Trust:** private educational lab (Tier B)  
> **Stack:** layer 3 of 5 — [MUTABLE-STACK.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/MUTABLE-STACK.md)  
> **Sources:** [SOURCES.md](SOURCES.md)

**One-sentence goal:** Typed coerce and `setPrimitive` for every AtomicAssets **scalar** kind, without wiping sibling keys. A string longer than 256, an IPFS string longer than 128, a byte hex longer than 512, and a value that is not a CIDv0 or CIDv1 are **this lab's** refusals. The contract's IPFS check is base58, so `"2"` is legal there and illegal here. The bytes are `previewAttributeBytes` in [wax-atomic-template-and-schema-explorer](https://github.com/pixel-journey/wax-atomic-template-and-schema-explorer).

This is **not** its own contract. It is the scalar type check for the same `setassetdata` write as the other `px-aa-mutable-*` labs.

| Layer | Concern |
| --- | --- |
| 1 | Bytes / deserialize |
| 2 | Full-map write (no wipe) |
| **3 (this)** | Scalar kinds and bounds |
| 4 | Vectors |
| 5 | Applied XP / level game rule |

Ground truth for allowed type names: [Serialization wiki](https://github.com/pinknetworkx/atomicassets-contract/wiki/Serialization). Client map shape: [WAX mutable-data tutorial](https://docs.wax.io/build/tutorials/howto_atomicassets/mutabledata).

**Real code:** `npm test` (unit + **sequential composition**). No live AtomicAssets, no wasm.

## Composition note

`primitives.composition.test.ts` writes uint32, string, and int8 in sequence. A kind mismatch is refused and the prior map stays usable. `forceKind` changes one key without dropping siblings. A bad IPFS string is refused; earlier keys stay.

## What is true (executed)

- int8..int32 and uint bounds enforced; int64/uint64 via bigint.
- Floats must be finite.
- IPFS accepts CIDv0-style values used in the lab.
- Byte fields require even-length hex.
- Writing one key leaves siblings intact.
- Kind mismatch refused unless `forceKind` is used.
- Sequential scalar writes keep every earlier key.

```bash
npm test
```

## Layout

| Path | Role |
| --- | --- |
| `invariants/` | Scalar coerce / setPrimitive tests |
| `EDUCATION.md` | Why kinds are schema-driven |
| `SECURITY.md` | Bounds and kind lock |
| `SOURCES.md` | Official contract and docs.wax.io |

## Stack neighbors

| Layer | Repo |
| --- | --- |
| 1 | [px-aa-mutable-deserialize-core](https://github.com/pixel-journey/px-aa-mutable-deserialize-core) |
| 2 | [px-aa-mutable-safe-partial-updater](https://github.com/pixel-journey/px-aa-mutable-safe-partial-updater) |
| 4 | [px-aa-mutable-vector-arrays-crud](https://github.com/pixel-journey/px-aa-mutable-vector-arrays-crud) |
| 5 | [px-aa-mutable-rpg-xp-and-leveling](https://github.com/pixel-journey/px-aa-mutable-rpg-xp-and-leveling) |

## License

MIT — Pixel Journey
