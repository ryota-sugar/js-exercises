import { isEqual } from "./index.js";

describe("isEqual", () => {
  it("returns true for equal numbers", () => {
    expect(isEqual(0.3 - 0.2, 0.1)).toBe(true);
  });

  it("returns true for equal numbers", () => {
    expect(isEqual(0.2 - 0.1, 0.1)).toBe(true);
  });

  it("returns false if the deviation is not acceptable", () => {
    expect(isEqual(1, 1 - 1e-10)).toBe(false);
  });

  it("returns true if the deviation is acceptable", () => {
    expect(isEqual(1, 1 - 1e-11)).toBe(true);
  });

  it("returns false if the value is INFINITE", () => {
    expect(isEqual(Infinity, Infinity)).toBe(false);
  });
});
