import { abs, sum, factorial } from "./index.js";

// TypeScript の場合は以下:
// import { abs, sum, factorial } from "./index.ts";

describe("math", () => {
  describe("abs", () => {
    it("returns same value when positive value given", () => {
      expect(abs(42)).toBe(42);
    });

    it("returns negated value when negative value given", () => {
      expect(abs(-42)).toBe(42);
    });

    it("returns zero value when zero given", () => {
      expect(abs(0)).toBe(0);
    });
  });

  // 以下に sum, factorial のテストを記載せよ
  describe("sum", () => {
    it("returns the sum of two positive numbers", () => {
      expect(sum([3, 5])).toBe(8);
    });

    it("returns the sum of a positive and a negative number", () => {
      expect(sum([7, -2])).toBe(5);
    });

    it("returns the sum of two negative numbers", () => {
      expect(sum([-4, -6])).toBe(-10);
    });
  });

  describe("factorial", () => {
    it("returns 1 for 0 as input", () => {
      expect(factorial(0)).toBe(1);
    });

    it("returns the factorial of a positive number", () => {
      expect(factorial(5)).toBe(120);
    });

    it("throws an error for negative input", () => {
      expect(() => factorial(-3)).toThrow();
    });
  });
});

