# Tips — primitive kinds

## Do

- Match schema types exactly before write.  
- Keep sibling keys on every update.  
- Prefer bigint for 64-bit fields in TypeScript labs.

## Don't

- Coerce NaN into 0 silently.  
- Use forceKind in production without a migration story.  
- Treat string length 256 as the chain maximum without checking AA.

## Related

[deserialize-core](https://github.com/pixel-journey/px-aa-mutable-deserialize-core) · [safe-partial](https://github.com/pixel-journey/px-aa-mutable-safe-partial-updater) · [vector CRUD](https://github.com/pixel-journey/px-aa-mutable-vector-arrays-crud) · [RPG XP](https://github.com/pixel-journey/px-aa-mutable-rpg-xp-and-leveling)
