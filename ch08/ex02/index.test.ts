import { exponentiation } from "./index.ts";

describe("exponentiation", () => {
  it("returns 1 when exponent is 0", () => {
    expect(exponentiation(5, 0)).toBe(1);
    expect(exponentiation(100, 0)).toBe(1);
  });

  it("calculates positive exponents correctly", () => {
    expect(exponentiation(2, 3)).toBe(8);
    expect(exponentiation(3, 4)).toBe(81);
    expect(exponentiation(5, 2)).toBe(25);
    expect(exponentiation(7, 1)).toBe(7);
  });

  it("returns base when exponent is 1", () => {
    expect(exponentiation(10, 1)).toBe(10);
    expect(exponentiation(-2, 1)).toBe(-2);
  });

  it("works with negative base", () => {
    expect(exponentiation(-2, 2)).toBe(4);
    expect(exponentiation(-2, 3)).toBe(-8);
  });

  it("works with large exponents", () => {
    expect(exponentiation(2, 10)).toBe(1024);
    expect(exponentiation(3, 6)).toBe(729);
  });
});
