# AtomicAssets scalar mutables: every primitive kind and bound

> **Stack:** layer 3 of 5 — [MUTABLE-STACK.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/MUTABLE-STACK.md)  
> **Sources:** [SOURCES.md](SOURCES.md)

**Goal:** Typed coerce and `setPrimitive` for every AtomicAssets **scalar** kind, without wiping sibling keys.

**Code under test:** `npm test` (unit + sequential composition).

## Learning materials

| Doc | Role |
| --- | --- |
| [EDUCATION.md](EDUCATION.md) | Beginner → masterclass |
| [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md) | Sequential kinds, forceKind, bounds |
| [TIPS.md](TIPS.md) | Schema type discipline |
| [SECURITY.md](SECURITY.md) | Bounds and kind lock |
| [SOURCES.md](SOURCES.md) | Wiki + contract |

## What is true (executed)

- int/uint bounds; int64/uint64 via bigint; finite floats; IPFS lab rules; even-length byte hex.
- One key write leaves siblings intact; kind mismatch refused unless `forceKind`.

```bash
npm test
```

MIT — Pixel Journey
