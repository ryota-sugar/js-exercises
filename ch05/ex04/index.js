export const fibonacci1 = () => {
  // while文で書く
  let a = 1;
  let b = 1;
  const result = [a, b];
  while (result.length < 10) {
    const c = a + b;
    result.push(c);
    [a, b] = [b, c];
  }
  return result;
};

export const fibonacci2 = () => {
  // do while文で書く
  let a = 1;
  let b = 1;
  const result = [a, b];
  do {
    const c = a + b;
    result.push(c);
    [a, b] = [b, c];
  } while (result.length < 10);
  return result;
};

export const fibonacci3 = () => {
  // for文で書く
  let a = 1;
  let b = 1;
  const result = [a, b];
  for (let i = 2; i < 10; i++) {
    const c = a + b;
    result.push(c);
    [a, b] = [b, c];
  }
  return result;
};

console.log(fibonacci1());
console.log(fibonacci2());
console.log(fibonacci3());
