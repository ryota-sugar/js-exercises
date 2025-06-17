function fizzbuzz(n: number): void {
  let data = new Array(n).fill(0);
  data.forEach((_, index) => {
    const targetNumber = index + 1;
    // prettier-ignore
    console.log(targetNumber % 15 ? (targetNumber % 3 ? (targetNumber % 5 ? targetNumber : "Buzz") : "Fizz") : "FizzBuzz");
  });
}

function sumOfSquaredDifference(f: number[], g: number[]): number {
  let result = 0;
  f.forEach((_, index) => {
    result += (f[index] - g[index]) ** 2;
  });
  return result;
}

function sumOfEvensIsLargerThan42(array: number[]): boolean {
  let sum = 0;
  const evenArray = array.filter((value) => {
    value % 2 === 0;
  });
  evenArray.forEach((value) => {
    sum += value;
  });
  return sum >= 42;
}
