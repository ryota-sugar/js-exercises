import { add, sub, mul, div } from "./index.js";

describe("Complex number operations", () => {
  const a = { re: 1, im: 2 };
  const b = { re: 3, im: 4 };

  test("Add", () => {
    expect(add(a, b)).toEqual({ re: 4, im: 6 });
  });

  test("Sub", () => {
    expect(sub(a, b)).toEqual({ re: -2, im: -2 });
  });

  test("Mul", () => {
    expect(mul(a, b)).toEqual({ re: -5, im: 10 });
  });

  test("Div", () => {
    expect(div(a, b)).toEqual({ re: 0.44, im: 0.08 });
  });
});
