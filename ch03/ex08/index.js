console.log(`Number(true): ${Number(true)}`); // => 1
console.log(`Number(1234): ${Number(1234)}`); // => 1234
console.log(`Number("text"): ${Number("text")}`); // => NaN

console.log(`Boolean(1234): ${Boolean(1234)}`); // => true
console.log(`Boolean(0): ${Boolean(0)}`); // => false

console.log(`String(true): ${String(true)}`); // => "true"
console.log(`String(1234): ${String(1234)}`); // => "1234"

console.log(
  `ParseInt("12,742 km：地球の直径"): ${parseInt("12,742 km：地球の直径")}`
); // => 12
console.log(`ParseFloat("1.618：黄金比"): ${parseFloat("1.618：黄金比")}`); // => 1.618
