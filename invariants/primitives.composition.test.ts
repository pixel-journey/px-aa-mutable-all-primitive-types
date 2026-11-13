/**
 * Composition: sequential scalar writes keep sibling keys and kinds.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { setPrimitive, type AttrMap } from "./primitives.ts";

const CID = "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG";

describe("composition: sequential scalar writes", () => {
  it("writes uint32, string, int8 without dropping siblings", () => {
    let map: AttrMap = {};
    map = setPrimitive(map, "xp", "uint32", 50);
    map = setPrimitive(map, "nickname", "string", "oak");
    map = setPrimitive(map, "durability", "int8", 10);
    assert.equal(map.xp?.kind, "uint32");
    assert.equal(map.xp?.value, 50);
    assert.equal(map.nickname?.value, "oak");
    assert.equal(map.durability?.value, 10);
  });

  it("kind mismatch leaves the prior map usable", () => {
    let map: AttrMap = {};
    map = setPrimitive(map, "xp", "uint32", 10);
    map = setPrimitive(map, "nickname", "string", "oak");
    assert.throws(() => setPrimitive(map, "xp", "string", "nope"), /kind mismatch/);
    assert.equal(map.xp?.value, 10);
    assert.equal(map.nickname?.value, "oak");
    const next = setPrimitive(map, "xp", "uint32", 11);
    assert.equal(next.xp?.value, 11);
    assert.equal(next.nickname?.value, "oak");
  });

  it("forceKind changes kind and keeps other keys", () => {
    let map: AttrMap = {};
    map = setPrimitive(map, "note", "string", "a");
    map = setPrimitive(map, "flag", "uint8", 1);
    map = setPrimitive(map, "note", "byte", "ab", { forceKind: true });
    assert.equal(map.note?.kind, "byte");
    assert.equal(map.note?.value, "ab");
    assert.equal(map.flag?.value, 1);
  });

  it("bad ipfs refused; earlier keys stay", () => {
    let map: AttrMap = {};
    map = setPrimitive(map, "xp", "uint32", 1);
    assert.throws(() => setPrimitive(map, "art", "ipfs", "notacid"), /bad ipfs/);
    map = setPrimitive(map, "art", "ipfs", CID);
    assert.equal(map.xp?.value, 1);
    assert.equal(map.art?.value, CID);
  });
});
