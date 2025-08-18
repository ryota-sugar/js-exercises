// 再エクスポートしたことで一つのファイルからインポート
// 名前変更を伴うエクスポート
import {
  add_not_default as add,
  subtract_not_default as subtract,
  Calculator,
} from "./index.re_export.js";

console.log(add(5, 3)); //=> 8
console.log(subtract(5, 3)); //=> 2
const calc = new Calculator();
console.log(calc.multiply(4, 5)); //=> 20
