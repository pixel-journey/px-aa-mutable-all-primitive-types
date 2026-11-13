# Worked examples — scalar primitives

## Example A — sequential kinds (composition)

Write `score` uint32, then `title` string, then `flag` int8. All three keys present afterward.

## Example B — kind mismatch

Existing uint32 key; write a string without `forceKind` → refused; map unchanged.

## Example C — forceKind

Retype one key on purpose; siblings remain.

## Example D — bounds

| Case | Result |
| --- | --- |
| int8 128 | refused |
| non-finite float | refused |
| odd-length byte hex | refused |
| overlong string/IPFS (lab caps) | refused |

## Example E — bad IPFS mid-path

Earlier keys stay when a later IPFS write fails.
