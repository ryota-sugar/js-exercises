export const addMatrix = (
  matrix1: number[][],
  matrix2: number[][]
): number[][] => {
  if (
    matrix1.length !== matrix2.length ||
    matrix1[0].length !== matrix2[0].length
  ) {
    throw new Error("Matrices must have the same dimensions");
  }
  // 2次元配列を作成
  const result: number[][] = new Array(matrix1.length);
  for (let i: number = 0; i < matrix1.length; i++) {
    result[i] = new Array(matrix1[i].length);
  }
  for (let row: number = 0; row < matrix1.length; row++) {
    for (let col: number = 0; col < matrix1[row].length; col++) {
      result[row][col] = matrix1[row][col] + matrix2[row][col];
    }
  }
  return result;
};

export const multiplyMatrix = (
  matrix1: number[][],
  matrix2: number[][]
): number[][] => {
  if (matrix1[0].length !== matrix2.length) {
    throw new Error(
      "Number of columns in the first matrix must match the number of rows in the second matrix"
    );
  }
  // 2次元配列を作成
  const result: number[][] = new Array(matrix1.length);
  for (let i: number = 0; i < matrix1.length; i++) {
    result[i] = new Array(matrix2[0].length).fill(0);
  }
  for (let row: number = 0; row < matrix1.length; row++) {
    for (let col: number = 0; col < matrix2[0].length; col++) {
      for (let k: number = 0; k < matrix1[0].length; k++) {
        result[row][col] += matrix1[row][k] * matrix2[k][col];
      }
    }
  }
  return result;
};
