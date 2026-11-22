# AI handoff — mutable primitive types

## Agent tooling

```bash
git clone https://github.com/wharfkit/skill.git ~/.claude/skills/wharfkit
# https://github.com/atomicassets/atomic-knowledge — pin commit, AGENTS.md
```

| Tool | Role |
| --- | --- |
| [Serialization wiki](https://github.com/pinknetworkx/atomicassets-contract/wiki/Serialization) | Kind encodings |
| [atomicassets-sdk](https://github.com/atomicassets/atomicassets-sdk) | Official TS serialize |
| [atomic-knowledge](https://github.com/atomicassets/atomic-knowledge) | Network before action |
| [MUTABLE-STACK.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/MUTABLE-STACK.md) | Layer 3 of 5 |

## Non-negotiables

1. Match **schema types** exactly (int8 ≠ int64; string ≠ ipfs).
2. Kind mismatch is **non-mutating** — throws, state unchanged.
3. Keep **sibling keys** on every update (full-map replace).
4. Prefer bigint for 64-bit fields.
5. Refuse NaN, Inf, and out-of-range integers — do not clamp.
6. Lab string length **256** is a teaching cap, not consensus.
7. Type checks port; schema field lists and ABI version are chain-local.

## Prompt seeds

- "int8 value 128 — accept or refuse?"
- "Show a full-map update that changes one uint64 and keeps a string sibling."
- "Refuse float NaN without mutating the previous map."
- "Hand off vector ops to vector-arrays-crud."

## Do not

- Clamp out-of-range ints.
- Splice one field into serialized bytes.
- Claim lab 256 is the chain string limit.
