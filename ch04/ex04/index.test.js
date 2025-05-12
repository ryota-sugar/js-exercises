import { bitCount } from "./index.js";

describe("bitCount", () => {
  test("bitCount(0b111) => 3", () => {
    expect(bitCount(0b111)).toBe(3);
  });

  test("bitCount(0b1111111111111111111111111111111) => 31", () => {
    expect(bitCount(0b1111111111111111111111111111111)).toBe(31);
  });
});
