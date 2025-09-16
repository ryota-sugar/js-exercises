import { fibonacciSequence } from "./index";

// Fibonacci数列の最初の20個の値をテスト
test("fibonacciSequence returns first 20 values", () => {
  const expected = [
    0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597,
    2584, 4181,
  ];
  const iterator = fibonacciSequence();
  const result = [];
  for (let i = 0; i < 20; i++) {
    result.push(iterator.next().value);
  }
  expect(result).toEqual(expected);
});
