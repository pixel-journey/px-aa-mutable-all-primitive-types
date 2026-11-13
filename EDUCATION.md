# Education — scalar mutable kinds

> **Rung:** `npm test` passes. Schema kinds drive coerce; siblings must survive.  
> **Layer 3 of 5** — [MUTABLE-STACK.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/MUTABLE-STACK.md)

## What you should be able to do

| Level | After this file |
| --- | --- |
| Beginner | Name the scalar kinds and why a string is not a uint32 |
| Intermediate | Use `setPrimitive` without wiping siblings; handle kind mismatch |
| Masterclass | Explain lab vs live IPFS/base58 differences |

## Beginner

AtomicAssets schema format lists **types**. Writing a value of the wrong kind fails at serialization on chain. This lab **coerces and bounds** values in TypeScript first.

Covered families: signed/unsigned integers, float/double, string, ipfs, bool, byte (hex).

## Intermediate

`setPrimitive` patches **one** key using full-map discipline (layer 2). Kind mismatch is refused unless `forceKind` deliberately retypes. Composition writes uint32 → string → int8 and keeps all keys.

Lab caps (educational): string ≤ 256, IPFS ≤ 128, byte hex ≤ 512. Live contract limits differ; IPFS on chain is base58-oriented so some strings legal there are refused here and vice versa.

## Masterclass

- Bounds here are **teaching fences**, not consensus.
- Byte previews: [wax-atomic-template-and-schema-explorer](https://github.com/pixel-journey/wax-atomic-template-and-schema-explorer).
- Vectors are layer 4; RPG rules are layer 5.

## Will not teach

Live `setassetdata`, full IPFS CIDv1 edge matrix, or that lab caps equal contract caps.
