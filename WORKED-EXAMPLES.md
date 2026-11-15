# Worked examples — all primitive kinds

## Integer bounds

| Kind | Accept | Refuse |
| --- | --- | --- |
| int8 | -128, 127 | 128, 1.5 |
| uint32 | 4294967295 | -1, 4294967296 |
| int64 | -1n | number 1 (type mismatch) |
| uint64 | 0n | -1n |

## Float / IPFS / byte

Float 1.5 ok; NaN and Infinity → not finite.

CIDv0 `QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG` ok; `not-a-cid` refused.

Byte `ABcd` lowercased to `abcd`; odd length / `zz` refused.

## setPrimitive siblings

Set `level` uint16 3 then `name` string `pix` → both keys present.

Kind mismatch on existing key refused unless `forceKind: true`.

String length 257 refused. Byte `deadbeef` and IPFS integrate on the same map.

Layer 3 of the mutable stack.
