export function counterIter(max) {
  console.log("counterIter");
  let c = 1;
  return {
    [Symbol.iterator]() {
      console.log("counterIter: Symbol.iterator");
      return this;
    },
    next() {
      console.log("counterIter: next");
      if (c >= max + 1) {
        return { value: undefined, done: true };
      }
      const value = c;
      c++;
      return { value, done: false };
    },
    return(value) {
      console.log("counterIter: return:", value);
      return { value, done: true };
    },
    throw(e) {
      console.log("counterIter: throw:", e);
      throw e;
    },
  };
}

export function* counterGen(max) {
  console.log("counterGen");
  try {
    for (let c = 1; c <= max; c++) {
      console.log("counterGen: next");
      yield c;
    }
  } catch (e) {
    console.log("counterGen: catch:", e);
    throw e;
  } finally {
    console.log("counterGen: finally");
  }
}

// 明示的にイテレータプロトコルの next() を呼び出す
// const iterNext = counterIter(2);
// console.log(iterNext.next());
// console.log(iterNext.next());
// console.log(iterNext.next());

// const genNext = counterGen(2);
// console.log(genNext.next());
// console.log(genNext.next());
// console.log(genNext.next());

// 明示的にイテレータプロトコルの return() を呼び出す
// const iterReturn = counterIter(2);
// console.log(iterReturn.return(1000));

// const genReturn = counterGen(2);
// console.log(genReturn.return(2000));

// 明示的にイテレータプロトコルの throw() を呼び出す
// const iterThrow = counterIter(2);
// iterThrow.throw(new Error("iterThrow error"));

// const genThrow = counterGen(2);
// genThrow.throw(new Error("genThrow error"));

// for-of ループを実行
// for (const c of counterIter(2)) {
//   console.log(c);
// }

// for (const g of counterGen(2)) {
//   console.log(g);
// }

// for-of ループを実行途中で break
// for (const c of counterIter(2)) {
//   console.log(c);
//   break;
// }

// for (const g of counterGen(2)) {
//   console.log(g);
//   break;
// }

// for-of ループを実行中に例外発生
// try {
//   for (const c of counterIter(2)) {
//     console.log(c);
//     throw new Error("iter for-of loop error");
//   }
// } catch (e) {
//   console.log(e);
// }

// try {
//   for (const g of counterGen(2)) {
//     console.log(g);
//     throw new Error("gen for-of loop error");
//   }
// } catch (e) {
//   console.log(e);
// }
