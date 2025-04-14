console.log(`整数の最大値は: ${Number.MAX_SAFE_INTEGER}`); // => 9007199254740991
console.log(`整数の最小値は: ${Number.MIN_SAFE_INTEGER}`); // => -9007199254740991

console.log(`整数の最大値+1は: ${Number.MAX_SAFE_INTEGER + 1}`); // => 9007199254740992
console.log(`整数の最大値+2は: ${Number.MAX_SAFE_INTEGER + 2}`); // => 9007199254740992

// 最大値+1と最大値+2は等しい理由
// JavaScriptの数値は64ビット浮動小数点数で表現されるため、整数の最大値を超えると精度が失われるから
// そのため、最大値+2を超えると、値が丸められて最大値+1と同じ値になる
console.log(
  `最大値+1と最大値+2は等しいか: ${
    Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2
  }`
); // => true
