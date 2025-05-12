export const bitCount = (n) => {
  n = n >>> 0; // 符号なし 32 ビット整数として扱う(符号ビットがあるとシフトしても符号ビットが1のまま残る)
  let count = 0;
  while (n) {
    count += n & 1;
    n >>>= 1;
  }
  console.log(count);
  return count;
};
