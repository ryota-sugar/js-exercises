import { primes } from "./index";

test("primes generator returns first 20 prime numbers", () => {
  const expected = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
  ];
  const it = primes();
  const result = [];
  for (let i = 0; i < 20; i++) {
    result.push(it.next().value);
  }
  expect(result).toEqual(expected);
});
