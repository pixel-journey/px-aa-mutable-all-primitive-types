# Tips — primitive kinds on AtomicAssets mutables

## Do

- Match **schema types** exactly before write (int8≠int64, string≠ipfs).
- Keep **sibling keys** on every update (full-map replace).
- Prefer `bigint` for 64-bit fields in TypeScript labs.
- Refuse NaN, Inf, and out-of-range integers instead of clamping.

## Don't

- Coerce NaN into 0 silently.
- Use `forceKind` in production without a migration story.
- Treat string length 256 as the chain maximum without checking AtomicAssets.
- Store a level as a string and later `get` it as uint32.

## Common mistakes

1. Accepting `