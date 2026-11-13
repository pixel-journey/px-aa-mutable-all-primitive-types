# Tips — schema scalar types

- Match the **exact** type string from schema.format (`uint32` vs `int32`).
- Never “JSON number” your way past bigint needs for int64/uint64.
- Keep layer 2 full-map writes; this layer only validates the value.
- For IPFS fields, test against the **contract** rules before mainnet.

Stack: L1 bytes → L2 patch → **L3 types** → L4 vectors → L5 RPG.
