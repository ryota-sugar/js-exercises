import { DynamicSizeArray } from "./index";

describe("DynamicSizeArray", () => {
  test("initial length is 0", () => {
    const arr = new DynamicSizeArray();
    expect(arr.length()).toBe(0);
  });

  test("push adds elements and get retrieves them", () => {
    const arr = new DynamicSizeArray();
    arr.push("a");
    arr.push("b");
    arr.push("c");
    expect(arr.length()).toBe(3);
    expect(arr.get(0)).toBe("a");
    expect(arr.get(1)).toBe("b");
    expect(arr.get(2)).toBe("c");
  });

  test("set updates values", () => {
    const arr = new DynamicSizeArray();
    arr.push(1);
    arr.push(2);
    arr.set(1, 42);
    expect(arr.get(1)).toBe(42);
  });

  //初期容量（4）を超えたときに配列が自動で再配置（resize）されることの確認
  test("push beyond initial size triggers resize and preserves values", () => {
    const arr = new DynamicSizeArray();
    for (let i = 0; i < 10; i++) {
      arr.push(i * 10);
    }
    expect(arr.length()).toBe(10);
    for (let i = 0; i < 10; i++) {
      expect(arr.get(i)).toBe(i * 10);
    }
  });

  test("get with out-of-range index throws error", () => {
    const arr = new DynamicSizeArray();
    arr.push(1);
    expect(() => arr.get(1)).toThrow("Array index out of range");
    expect(() => arr.get(-1)).toThrow("Array index out of range");
  });

  test("set with out-of-range index throws error", () => {
    const arr = new DynamicSizeArray();
    arr.push(1);
    expect(() => arr.set(1, 100)).toThrow("Array index out of range");
    expect(() => arr.set(-1, 100)).toThrow("Array index out of range");
  });

  test("length reflects number of elements after multiple operations", () => {
    const arr = new DynamicSizeArray();
    expect(arr.length()).toBe(0);
    arr.push("x");
    arr.push("y");
    expect(arr.length()).toBe(2);
    arr.set(1, "z");
    expect(arr.length()).toBe(2);
  });
});
