import { TypedMap } from "./index.js";

describe("TypedMap", () => {
  test("entriesで型が合う場合は初期化できる", () => {
    const tm = new TypedMap("string", "number", [
      ["foo", 1],
      ["bar", 2],
    ]);

    // Map に正しく値が入っているかの確認
    expect(tm.map instanceof Map).toBe(true);
    expect(tm.map.get("foo")).toBe(1);
    expect(tm.map.get("bar")).toBe(2);
  });
});
