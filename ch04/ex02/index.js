// const beforeFizzBuzz = () => {
//     for (let i = 1; i < 101; i++)
//         console.log(i % 15 ? (i % 3 ? (i % 5 ? i : "Buzz") : "Fizz") : "FizzBuzz");
// }

const fizzBuzz = () => {
  for (let i = 1; i < 101; i++) {
    if (i % 15) {
      if (i % 3) {
        if (i % 5) {
          console.log(i);
        } else {
          console.log("Buzz");
        }
      } else {
        console.log("Fizz");
      }
    } else {
      console.log("FizzBuzz");
    }
  }
};

fizzBuzz();
