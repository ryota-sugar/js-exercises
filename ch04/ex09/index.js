// 予想
// undefined => "undefined"
// null => "object"
// オブジェクト => "object"
// NaN => "number"
// 数値 => "number"
// 関数 => "function"

console.log("typeof undefined: ", typeof undefined); // => "undefined"
console.log("typeof null: ", typeof null); // => "object"
console.log("typeof {}: ", typeof {}); // => "object"
console.log("typeof NaN: ", typeof NaN); // => "number"
console.log("typeof 1: ", typeof 1); // => "number"
console.log("typeof function(){}: ", typeof function () {}); // => "function"
