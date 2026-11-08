import assert from "node:assert/strict";
import test from "node:test";
import {
  assertByte,
  assertFloat,
  assertInt,
  assertInt64,
  assertIpfs,
  assertUint,
  assertUint64,
  coerce,
  setPrimitive,
} from "./primitives.ts";

const CID =
  "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG";

test("int8 bounds accept edges and refuse overflow", () => {
  assert.equal(assertInt("int8", -128), -128);
  assert.equal(assertInt("int8", 127), 127);
  assert.throws(() => assertInt("int8", 128), /out of range/);
  assert.throws(() => assertInt("int8", 1.5), /not integer/);
});

test("uint32 max and negative refused", () => {
  assert.equal(assertUint("uint32", 4294967295), 4294967295);
  assert.throws(() => assertUint("uint32", -1), /not unsigned/);
  assert.throws(() => assertUint("uint32", 4294967296), /out of range/);
});

test("int64 and uint64 use bigint", () => {
  assert.equal(assertInt64(-1n), -1n);
  assert.equal(assertUint64(0n), 0n);
  assert.throws(() => assertUint64(-1n), /out of range/);
  assert.throws(() => coerce("int64", 1 as unknown as bigint), /type mismatch/);
});

test("float refuses NaN and Infinity", () => {
  assert.equal(assertFloat(1.5), 1.5);
  assert.throws(() => assertFloat(Number.NaN), /not finite/);
  assert.throws(() => assertFloat(Number.POSITIVE_INFINITY), /not finite/);
});

test("ipfs accepts CIDv0 and refuses garbage", () => {
  assert.equal(assertIpfs(CID), CID);
  assert.throws(() => assertIpfs("not-a-cid"), /bad ipfs/);
});

test("byte requires even lowercase hex", () => {
  assert.equal(assertByte("ABcd"), "abcd");
  assert.throws(() => assertByte("abc"), /bad byte/);
  assert.throws(() => assertByte("zz"), /bad byte/);
});

test("setPrimitive preserves siblings", () => {
  const prev = setPrimitive({}, "level", "uint16", 3);
  const next = setPrimitive(prev, "name", "string", "pix");
  assert.equal(next.level?.kind, "uint16");
  assert.equal(next.name?.kind, "string");
  if (next.level?.kind === "uint16") assert.equal(next.level.value, 3);
});

test("kind mismatch refused without forceKind", () => {
  const prev = setPrimitive({}, "score", "uint8", 10);
  assert.throws(() => setPrimitive(prev, "score", "int8", -1), /kind mismatch/);
  const forced = setPrimitive(prev, "score", "int8", -1, { forceKind: true });
  assert.equal(forced.score?.kind, "int8");
});

test("coerce covers double and string length", () => {
  const d = coerce("double", 3.14);
  assert.equal(d.kind, "double");
  assert.throws(() => coerce("string", "x".repeat(257)), /string too long/);
});

test("byte and ipfs integrate through setPrimitive", () => {
  let m = setPrimitive({}, "img", "ipfs", CID);
  m = setPrimitive(m, "sig", "byte", "deadbeef");
  assert.equal(m.img?.kind, "ipfs");
  assert.equal(m.sig?.kind, "byte");
  if (m.sig?.kind === "byte") assert.equal(m.sig.value, "deadbeef");
});
