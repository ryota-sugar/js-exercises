const f = () => {
  undeclaredVariable = 1;
  console.log(undeclaredVariable);
};

f(); // => 1
