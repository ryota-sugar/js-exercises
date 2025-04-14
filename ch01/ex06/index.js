export function fib(n) {
    if (n <= 0) {
        throw new Error("n must be a positive integer");
    }
    if (n === 1) {
        return 1;
    } else if (n === 2) {
        return 1;
    } else {
        return fib(n - 1) + fib(n - 2);
    }
}