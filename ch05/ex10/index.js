// {
//   let a = 1;
//   let b = 2;
//   let obj = { a: 3, b: 4 };
//   with (obj) {
//     a = b;
//   }
//   console.log({ a, b, obj });
// }
// {
//   let a = 1;
//   let b = 2;
//   let obj = { b: 4 };
//   with (obj) {
//     a = b;
//   }
//   console.log({ a, b, obj });
// }
// {
//   let a = 1;
//   let b = 2;
//   let obj = { a: 3 };
//   with (obj) {
//     a = b;
//   }
//   console.log({ a, b, obj });
// }
// {
//   let a = 1;
//   let b = 2;
//   let obj = {};
//   with (obj) {
//     a = b;
//   }
//   console.log({ a, b, obj });
// }

{
  let a = 1;
  let b = 2;
  let obj = { a: 3, b: 4 };
  obj.a = obj.b;
  console.log({ a, b, obj });
}
{
  let a = 1;
  let b = 2;
  let obj = { b: 4 };
  a = obj.b;
  console.log({ a, b, obj });
}
{
  let a = 1;
  let b = 2;
  let obj = { a: 3 };
  obj.a = b;
  console.log({ a, b, obj });
}
{
  let a = 1;
  let b = 2;
  let obj = {};
  console.log({ a, b, obj });
}
