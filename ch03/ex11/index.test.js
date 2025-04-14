import { equals } from "./index.js";

describe("equals", () => {
  test("should return true for exact equicalence", () => {
    expect(equals(42, 42)).toBe(true);
    expect(equals(null, null)).toBe(true);
  });

  test("should return false if a non-object is specified", () => {
    expect(equals({ x: 42 }, 42)).toBe(false);
    expect(equals(null, { x: 42 })).toBe(false);
  });

  test("should return false if the number and name of properties do not match", () => {
    expect(equals({ x: 1 }, { y: 1 })).toBe(false);
    expect(equals({ x: 1 }, { x: 1, y: 1 })).toBe(false);
  });

  test("should be able to compare recursively", () => {
    expect(equals({ x: { y: { z: 10 } } }, { x: { y: { z: 10 } } })).toBe(true);
    expect(equals({ x: { y: { z: 10 } } }, { x: { y: { z: 10, w: 1 } } })).toBe(
      false
    );
  });
});
