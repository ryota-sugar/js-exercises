import { fibonacci1, fibonacci2, fibonacci3 } from "./index.js";

describe("fibonacci", () => {
  describe("fibonacci1", () => {
    it("should return the first 10 Fibonacci numbers", () => {
      expect(fibonacci1()).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
    });
  });

  describe("fibonacci2", () => {
    it("should return the first 10 Fibonacci numbers", () => {
      expect(fibonacci2()).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
    });
  });

  describe("fibonacci3", () => {
    it("should return the first 10 Fibonacci numbers", () => {
      expect(fibonacci3()).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
    });
  });
});
