import { addMatrix, multiplyMatrix } from "./index.ts";

describe("addMatrix", () => {
  it("adds two 2x2 matrices", () => {
    const a = [
      [1, 2],
      [3, 4],
    ];
    const b = [
      [5, 6],
      [7, 8],
    ];
    expect(addMatrix(a, b)).toEqual([
      [6, 8],
      [10, 12],
    ]);
  });

  it("adds two 3x3 matrices", () => {
    const a = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const b = [
      [9, 8, 7],
      [6, 5, 4],
      [3, 2, 1],
    ];
    expect(addMatrix(a, b)).toEqual([
      [10, 10, 10],
      [10, 10, 10],
      [10, 10, 10],
    ]);
  });

  it("throws error for different dimensions", () => {
    const a = [
      [1, 2],
      [3, 4],
    ];
    const b = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    expect(() => addMatrix(a, b)).toThrow(
      "Matrices must have the same dimensions"
    );
  });
});

describe("multiplyMatrix", () => {
  it("multiplies two 2x2 matrices", () => {
    const a = [
      [1, 2],
      [3, 4],
    ];
    const b = [
      [2, 0],
      [1, 2],
    ];
    expect(multiplyMatrix(a, b)).toEqual([
      [4, 4],
      [10, 8],
    ]);
  });

  it("multiplies 2x3 and 3x2 matrices", () => {
    const a = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const b = [
      [7, 8],
      [9, 10],
      [11, 12],
    ];
    expect(multiplyMatrix(a, b)).toEqual([
      [58, 64],
      [139, 154],
    ]);
  });

  it("throws error for incompatible matrices", () => {
    const a = [
      [1, 2],
      [3, 4],
    ];
    const b = [[1, 2]];
    expect(() => multiplyMatrix(a, b)).toThrow(
      "Number of columns in the first matrix must match the number of rows in the second matrix"
    );
  });
});
