const symname1 = Symbol("propname");
const symname2 = Symbol("propname");

const object1 = {};
object1[symname1] = "value1";
object1[symname2] = "value2";
console.log(`object symname1: ${object1[symname1]}`); // => "value1"
console.log(`object symname2: ${object1[symname2]}`); // => "value2"

const symname3 = Symbol.for("propname");
const symname4 = Symbol.for("propname");

const object2 = {};
object2[symname3] = "value1";
object2[symname4] = "value2";

// Symbol.for()は、同じ文字列を参照しているため、同じSymbolを共有している。
// そのため、object2[symname3]とobject2[symname4]は同じプロパティを指していて、値が上書きされている
console.log(`object symname1: ${object2[symname3]}`); // => "value2"
console.log(`object symname2: ${object2[symname4]}`); // => "value2"
