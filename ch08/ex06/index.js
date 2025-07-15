const args = [];
function call(...values) {
  // ...valuesはすでに配列のため、そのままpushするだけ
  args.push(values);
}

call(1, 2, 3);
call("A", "B");

console.log(args[0]); // [1, 2, 3]
console.log(args[1]); // ["A", "B"]
