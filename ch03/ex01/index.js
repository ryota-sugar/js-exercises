const values = [-Infinity, Infinity, NaN];

values.map((value1) => {
  values.map((value2) => {
    console.log(`${value1} + ${value2} = ${value1 + value2}`);
    console.log(`${value1} - ${value2} = ${value1 - value2}`);
    console.log(`${value1} * ${value2} = ${value1 * value2}`);
    console.log(`${value1} / ${value2} = ${value1 / value2}`);
  });
});
