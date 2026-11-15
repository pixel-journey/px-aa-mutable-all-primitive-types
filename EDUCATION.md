# Education — primitive mutable types

AtomicAssets mutables carry typed values. This lab enumerates bounds for int/uint widths, float finiteness, IPFS CIDv0 shape, and lowercase even-length bytes — and shows `setPrimitive` never drops sibling keys.

## Outcomes

1. State int8 and uint32 edges from tests.
2. Refuse NaN/Infinity floats.
3. Show kind mismatch vs forceKind.
4. Keep siblings when setting a second key.

Stack: [MUTABLE-STACK.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/MUTABLE-STACK.md).
