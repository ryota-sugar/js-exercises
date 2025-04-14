import {fib} from "./index.js";

describe("Fibonacci function", () => {
    test("returns 5 for n = 5", () => {
        expect(fib(5)).toBe(5);
    });

    test("return 55 for n = 10", () => {
        expect(fib(10)).toBe(55);
    });

    test("throws an error for n <= 0", () => {
        expect(() => fib(0)).toThrow("n must be a positive integer");
        expect(() => fib(-1)).toThrow("n must be a positive integer");
    });
});