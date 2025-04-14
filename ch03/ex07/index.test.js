import { equalArrays } from "./index.js";

test("ch03-ex07", () => {
  const x = Symbol("x");
  const y = Symbol("x");

  expect(equalArrays(x, y)).toBe(true);
  expect(x).not.toEqual(y);
});
