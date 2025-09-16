import {
  wait1,
  wait2,
  wait3,
  log,
  logA,
  logB,
  logC,
  errX,
  errY,
} from "../wait.js";

// async function h1() {
//   try {
//     await wait3();
//     logA();
//     await wait2();
//     logB();
//     await wait1();
//     logC();
//   } catch (e) {
//     log(e.message);
//   }
// }
// h1();

// function h2() {
//   // NOTE: h3 との比較用
//   new Promise(() => {
//     errX();
//   }).catch((e) => log(e.message));
// }
// h2();

// function h3() {
//   // NOTE: new Promise の引数が async function の場合、例外はどう扱われるだろう
//   new Promise(async () => {
//     errX();
//   }).catch((e) => log(e.message));
// }
// h3();

async function h4() {
  // NOTE: 2つの例外は両方 catch できるか？
  try {
    const p1 = wait2().then(() => {
      errX();
    });
    const p2 = wait1().then(() => {
      errY();
    });
    await p1;
    await p2;
  } catch (e) {
    log(e.message);
  }
}
h4();
