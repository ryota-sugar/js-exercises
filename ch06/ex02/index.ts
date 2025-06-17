interface protoObject {
  name: string;
  age: number;
}

const person1: protoObject = {
  name: "Sato",
  age: 26,
};

const person2: protoObject = Object.create(person1);

console.log(Object.getPrototypeOf(person2)); // { name: 'Sato', age: 26 }
console.log(Object.getPrototypeOf(person2) === person1); // true
