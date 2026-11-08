# Education

AtomicAssets schema format pins each attribute to a type. Writing a string where the schema expects uint32 corrupts the serialized blob or fails deserialize.

This lab models that with an explicit `kind` on every value. Bounds match the C++ integer widths. `int64`/`uint64` stay on `bigint` so JS number precision cannot silently truncate. Floats must be finite. IPFS is shape-checked, not resolved. Byte is even-length hex only.
