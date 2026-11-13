# AtomicAssets scalar mutables: every primitive kind and bound

> **Stack:** layer 3 of 5 — [MUTABLE-STACK.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/MUTABLE-STACK.md)  
> **Sources:** [SOURCES.md](SOURCES.md)

**Goal:** Typed coerce and `setPrimitive` for every AtomicAssets **scalar** kind, without wiping sibling keys.

Lab-side refusals (not always identical to the live contract): string longer than 256, IPFS string longer than 128, byte hex longer than 512, and values that are not CIDv0/CIDv1. The contract’s IPFS check is base58, so `"2"` can be legal there and illegal here. Matching byte previews live in [wax-atomic-template-and-schema-explorer](https://github.com/pixel-journey/wax-atomic-template-and-schema-explorer).

This is the scalar type layer of the same `setassetdata` write studied across the mutable stack — not a separate product contract.

| Layer | Concern |
| --- | --- |
| 1 | Bytes / deserialize |
| 2 | Full-map write (no wipe) |
| **3 (this)** | Scalar kinds and bounds |
| 4 | Vectors |
| 5 | Applied XP / level game rule |

**Official type names:** [Serialization wiki](https://github.com/pinknetworkx/atomicassets-contract/wiki/Serialization). **Client map shape:** [WAX mutable-data tutorial](https://docs.wax.io/build/tutorials/howto_atomicassets/mutabledata).

**Code under test:** `npm test` (unit + sequential composition).

## Composition

`primitives.composition.test.ts` writes uint32, string, and int8 in sequence. Kind mismatch is refused and the prior map stays usable. `forceKind` changes one key without dropping siblings. A bad IPFS string is refused; earlier keys stay.

## What is true (executed)

- int8..int32 and uint bounds enforced; int64/uint64 via bigint.
- Floats must be finite.
- IPFS accepts CIDv0-style values used in the lab.
- Byte fields require even-length hex.
- Writing one key leaves siblings intact.
- Kind mismatch refused unless `forceKind` is used.

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

MIT — Pixel Journey
