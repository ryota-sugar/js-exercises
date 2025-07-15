const myMax = (array) => {
  return array.reduce((acc, cur) => {
    return acc > cur ? acc : cur;
  }, -Infinity);
};

console.log(myMax.toString());
console.log(Math.max.toString());
