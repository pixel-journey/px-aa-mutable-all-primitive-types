# Security notes — scalar kinds

| Mitigated | Behavior |
| --- | --- |
| Out-of-range ints | refused |
| Non-finite floats | refused |
| Kind mismatch | refused (unless forceKind) |
| Lab length caps | refused |

Production: schema-aware serialize on contract; collection auth; chain-sourced previous map (layers 1–2, 5 notes).
