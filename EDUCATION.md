# Education — all primitive mutable kinds

> **Rung:** `npm test` passes. Typed values only — no AtomicAssets RPC.  
> **The test is the rule.**

AtomicAssets mutables carry **typed** values. This lab enumerates bounds for int/uint widths, float finiteness, IPFS CIDv0 shape, and lowercase even-length bytes — and shows `setPrimitive` **never drops sibling keys**.

Stack **layer 3 of 5**: deserialize → safe-partial → **primitives** → vector-crud → rpg-xp.

Prior: [deserialize-core](https://github.com/pixel-journey/px-aa-mutable-deserialize-core) · [safe-partial-updater](https://github.com/pixel-journey/px-aa-mutable-safe-partial-updater).  
Next: [vector-arrays-crud](https://github.com/pixel-journey/px-aa-mutable-vector-arrays-crud) · [rpg-xp](https://github.com/pixel-journey/px-aa-mutable-rpg-xp-and-leveling).

Official: [atomicassets-contract](https://github.com/pinknetworkx/atomicassets-contract) · [WAX AtomicAssets how-to](https://docs.wax.io/build/tutorials/howto_atomicassets).

## Learning outcomes

| Level | After this file |
| --- | --- |
| Beginner | State int8 / uint32 edges |
| Intermediate | Refuse NaN/Infinity; kind mismatch vs forceKind |
| Masterclass | Siblings survive; schema type must match product |

---

## Beginner — bounds table

| Kind | Accept | Refuse |
| --- | --- | --- |
| int8 | -128, 127 | 128, 1.5 |
| uint32 | 4294967295 | -1, 4294967296 |
| int64 | `-1n` | number `1` (wrong JS type) |
| uint64 | `0n` | `-1n` |

Float `1.5` ok; **NaN** and **Infinity** → not finite.

CIDv0 `QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG` ok; `not-a-cid` refused.

Byte `ABcd` lowercased to `abcd`; odd length / `zz` refused.

```bash
npm test
```

---

## Intermediate — setPrimitive

Set `level` uint16 `3` then `name` string `pix` → **both** keys present.

Kind mismatch on an existing key is refused unless `forceKind: true` (documented escape hatch for migrations — prefer schema-aligned data).

String length **257** refused (lab cap 256).

### Attack → test

| Attack | Lab behavior |
| --- | --- |
| int8 128 | refused |
| NaN float | not finite |
| Write only one key and drop siblings | siblings stay |
| Kind mismatch without forceKind | refused |
| String length 257 | refused |

---

## Masterclass — angles

### Common mistakes

1. Using JS `number` for uint64 amounts near 2^53.  
2. Storing XP as string and later `std::get<uint32_t>`.  
3. Sending only the changed key (wipe) — always merge full map.  
4. Assuming lab caps = consensus limits.  
5. Treating forceKind as a normal write path.

### Nice-to-have extensions (not in this repo)

| Idea | Note |
| --- | --- |
| Full AtomicAssets type matrix | Beyond this lab's set |
| Schema migration tooling | forceKind audit log |
| Live `setassetdata` | Collection auth required |

### Exercises

1. int8 128 — accept or refuse? (**Refuse**.)  
2. After setting two keys, is the first still there? (**Yes**.)  
3. Is NaN a valid float attribute? (**No**.)

Numbers: [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md) · [SECURITY](SECURITY.md) · [SOURCES](SOURCES.md).

---

## What this course will not teach

- Live AtomicAssets RPC or broadcast
- That lab string/vec caps equal chain maximums
- Schema authoring for a real collection
