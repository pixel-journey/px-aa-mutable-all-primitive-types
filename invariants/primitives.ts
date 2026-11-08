/**
 * AtomicAssets mutable primitive types (educational).
 * int8..int64, uint8..uint64, float, double, string, ipfs, byte.
 * No live AtomicAssets. No wasm. No setassetdata broadcast.
 */

export type PrimitiveKind =
  | "int8"
  | "int16"
  | "int32"
  | "int64"
  | "uint8"
  | "uint16"
  | "uint32"
  | "uint64"
  | "float"
  | "double"
  | "string"
  | "ipfs"
  | "byte";

export type AttrValue =
  | { kind: "int8" | "int16" | "int32"; value: number }
  | { kind: "int64"; value: bigint }
  | { kind: "uint8" | "uint16" | "uint32"; value: number }
  | { kind: "uint64"; value: bigint }
  | { kind: "float" | "double"; value: number }
  | { kind: "string" | "ipfs"; value: string }
  | { kind: "byte"; value: string };

export type AttrMap = Readonly<Record<string, AttrValue>>;

export const MAX_STRING = 256;
export const MAX_IPFS = 128;
export const MAX_BYTE_HEX = 512;

const KEY = /^[a-z][a-z0-9_]{0,31}$/;
const HEX = /^[0-9a-f]*$/;
const IPFS_CIDv0 = /^Qm[1-9A-HJ-NP-Za-km-z]{44}$/;
const IPFS_CIDv1 = /^b[a-z2-7]{58,}$/;

const INT_BOUNDS: Record<"int8" | "int16" | "int32", { min: number; max: number }> = {
  int8: { min: -128, max: 127 },
  int16: { min: -32768, max: 32767 },
  int32: { min: -2147483648, max: 2147483647 },
};

const UINT_BOUNDS: Record<"uint8" | "uint16" | "uint32", { max: number }> = {
  uint8: { max: 255 },
  uint16: { max: 65535 },
  uint32: { max: 4294967295 },
};

const INT64_MIN = -9223372036854775808n;
const INT64_MAX = 9223372036854775807n;
const UINT64_MAX = 18446744073709551615n;

export function assertKey(key: string): string {
  if (!KEY.test(key)) throw new Error("bad key");
  return key;
}

export function assertInt(kind: "int8" | "int16" | "int32", n: number): number {
  if (!Number.isInteger(n)) throw new Error("not integer");
  const b = INT_BOUNDS[kind];
  if (n < b.min || n > b.max) throw new Error("out of range");
  return n;
}

export function assertUint(kind: "uint8" | "uint16" | "uint32", n: number): number {
  if (!Number.isInteger(n) || n < 0) throw new Error("not unsigned integer");
  if (n > UINT_BOUNDS[kind].max) throw new Error("out of range");
  return n;
}

export function assertInt64(n: bigint): bigint {
  if (typeof n !== "bigint") throw new Error("need bigint");
  if (n < INT64_MIN || n > INT64_MAX) throw new Error("out of range");
  return n;
}

export function assertUint64(n: bigint): bigint {
  if (typeof n !== "bigint") throw new Error("need bigint");
  if (n < 0n || n > UINT64_MAX) throw new Error("out of range");
  return n;
}

export function assertFloat(n: number): number {
  if (typeof n !== "number" || !Number.isFinite(n)) throw new Error("not finite float");
  return n;
}

export function assertString(s: string): string {
  if (typeof s !== "string") throw new Error("need string");
  if (s.length > MAX_STRING) throw new Error("string too long");
  return s;
}

export function assertIpfs(s: string): string {
  if (typeof s !== "string") throw new Error("need string");
  if (s.length > MAX_IPFS) throw new Error("ipfs too long");
  if (!IPFS_CIDv0.test(s) && !IPFS_CIDv1.test(s)) throw new Error("bad ipfs");
  return s;
}

export function assertByte(hex: string): string {
  if (typeof hex !== "string") throw new Error("need string");
  const h = hex.toLowerCase();
  if (h.length % 2 !== 0 || h.length > MAX_BYTE_HEX) throw new Error("bad byte");
  if (!HEX.test(h)) throw new Error("bad byte");
  return h;
}

export function coerce(
  kind: PrimitiveKind,
  raw: number | bigint | string,
): AttrValue {
  switch (kind) {
    case "int8":
    case "int16":
    case "int32":
      if (typeof raw !== "number") throw new Error("type mismatch");
      return { kind, value: assertInt(kind, raw) };
    case "int64":
      if (typeof raw !== "bigint") throw new Error("type mismatch");
      return { kind, value: assertInt64(raw) };
    case "uint8":
    case "uint16":
    case "uint32":
      if (typeof raw !== "number") throw new Error("type mismatch");
      return { kind, value: assertUint(kind, raw) };
    case "uint64":
      if (typeof raw !== "bigint") throw new Error("type mismatch");
      return { kind, value: assertUint64(raw) };
    case "float":
    case "double":
      if (typeof raw !== "number") throw new Error("type mismatch");
      return { kind, value: assertFloat(raw) };
    case "string":
      if (typeof raw !== "string") throw new Error("type mismatch");
      return { kind, value: assertString(raw) };
    case "ipfs":
      if (typeof raw !== "string") throw new Error("type mismatch");
      return { kind, value: assertIpfs(raw) };
    case "byte":
      if (typeof raw !== "string") throw new Error("type mismatch");
      return { kind, value: assertByte(raw) };
    default: {
      const _x: never = kind;
      throw new Error("unknown kind " + _x);
    }
  }
}

export function setPrimitive(
  previous: AttrMap,
  key: string,
  kind: PrimitiveKind,
  raw: number | bigint | string,
  opts: { forceKind?: boolean } = {},
): AttrMap {
  assertKey(key);
  const existing = previous[key];
  if (existing && existing.kind !== kind && !opts.forceKind) {
    throw new Error("kind mismatch");
  }
  const value = coerce(kind, raw);
  return { ...previous, [key]: value };
}

export function getPrimitive(map: AttrMap, key: string): AttrValue | undefined {
  return map[key];
}
