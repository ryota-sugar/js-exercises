import { cachedSlowFn } from "./index.js";

describe("cachedSlowFn", () => {
  test("同じオブジェクトで2回呼ぶと2回目はキャッシュされて速くなる", () => {
    const obj = { name: "foo" };

    const t1 = Date.now();
    const result1 = cachedSlowFn(obj);
    const t2 = Date.now();
    const result2 = cachedSlowFn(obj);
    const t3 = Date.now();

    // 1回目は1秒以上かかる
    expect(t2 - t1).toBeGreaterThanOrEqual(1000);
    // 2回目はキャッシュされてすぐ返る（1000ms未満を許容）
    expect(t3 - t2).toBeLessThan(1000);

    // 結果は同じ
    expect(result1).toBe(result2);
  });

  test("異なるオブジェクトは別キャッシュ", () => {
    const obj1 = { name: "foo" };
    const obj2 = { name: "foo" };

    const t1 = Date.now();
    cachedSlowFn(obj1);
    const t2 = Date.now();
    cachedSlowFn(obj2);
    const t3 = Date.now();

    // どちらも1秒以上かかる（キャッシュされない）
    expect(t2 - t1).toBeGreaterThanOrEqual(1000);
    expect(t3 - t2).toBeGreaterThanOrEqual(1000);
  });
});
