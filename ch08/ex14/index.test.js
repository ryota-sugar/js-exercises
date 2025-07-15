import { any, catching } from "./index.js";

// any tests
const isEven = (x) => x % 2 === 0;
const isNegative = (x) => x < 0;

test("any returns true if any function returns true", () => {
  const fn = any(isEven, isNegative);
  expect(fn(3)).toBe(false);
  expect(fn(4)).toBe(true);
  expect(fn(-1)).toBe(true);
});

test("any works with no functions", () => {
  const fn = any();
  expect(fn(1)).toBe(false);
});

// catching tests
const throws = () => {
  throw new Error("fail");
};
const returns = (x) => x * 2;

test("catching returns tryFn result if no error", () => {
  const fn = catching(returns, () => 0);
  expect(fn(5)).toBe(10);
});

test("catching returns catchFn result if error", () => {
  const fn = catching(throws, (e) => e.message);
  expect(fn()).toBe("fail");
});
