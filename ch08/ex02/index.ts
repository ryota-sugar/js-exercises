export const exponentiation = (base: number, exponent: number): number => {
  if (exponent === 0) {
    return 1;
  }
  // 指数が偶数なら、指数を半分にして再帰的に計算し、その結果を2回掛ける
  if (exponent % 2 === 0) {
    const half = exponentiation(base, exponent / 2);
    return half * half;
  }
  // 指数が奇数なら、1つ減らして偶数にし、baseを1回掛ける
  return base * exponentiation(base, exponent - 1);
};
