# Tips — primitive kinds on AtomicAssets mutables

## Do

- Match **schema types** exactly before write (int8 is not int64; string is not ipfs).
- Keep **sibling keys** on every update (full-map replace).
- Prefer bigint for 64-bit fields in TypeScript labs.
- Refuse NaN, Inf, and out-of-range integers instead of clamping.

## Don't

- Coerce NaN into 0 silently.
- Use forceKind in production without a migration story.
- Treat string length 256 as the chain maximum without checking AtomicAssets.
- Store a level as a string and later read it as uint32.

## Common mistakes

1. Accepting a float where the schema says int32.
2. Odd-length hex for a byte field.
3. IPFS CIDs that are not the shapes the tests allow.
4. Writing only the changed key and wiping nickname (use [safe partial](https://github.com/pixel-journey/px-aa-mutable-safe-partial-updater)).
5. Opening a new micro-repo for one scalar rule — extend this layer or layer 5 instead.

## Nice-to-have extensions (not in this repo)

| Idea | Note |
| --- | --- |
| Vector attributes | [vector CRUD](https://github.com/pixel-journey/px-aa-mutable-vector-arrays-crud) |
| Game rule on top | [RPG XP](https://github.com/pixel-journey/px-aa-mutable-rpg-xp-and-leveling) |
| Byte decode of the map | [deserialize-core](https://github.com/pixel-journey/px-aa-mutable-deserialize-core) |

Stack: [MUTABLE-STACK.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/MUTABLE-STACK.md).
Official: [Serialization wiki](https://github.com/pinknetworkx/atomicassets-contract/wiki/Serialization) · [mutable data howto](https://docs.wax.io/build/tutorials/howto_atomicassets/mutabledata).
