const f = () => {
  const undeclaredVariable = 1;
  console.log(undeclaredVariable);
};

f(); //=> 1
