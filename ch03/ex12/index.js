class Example {
  constructor(number, string) {
    this.number = number;
    this.string = string;
  }
  valueOf() {
    return this.number;
  }

  toString() {
    return this.string;
  }
}

const obj = new Example(1, "example");
console.log(Number(obj)); // => 1
console.log(String(obj)); // => "example"
