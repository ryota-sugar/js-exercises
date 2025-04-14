const obj1 = { x: 1 };
// 問題: ここに1行コードを書くことで以下の行で {x: 1, y: 2} が出力されること
obj1.y = 2;
console.log(obj1); // => { x: 1, y: 2 }

const obj2 = { x: 1, y: 2 };
// 問題: 以下の行では何が出力されるか、予想してから結果を確認しなさい
console.log(obj1 === obj2); // => false

export const equals = (o1, o2) => {
  if (o1 === o2) {
    return true;
  }
  if (o1 === null || o2 === null) {
    return false;
  }
  if (typeof o1 !== "object" || typeof o2 !== "object") {
    return false;
  }

  const keys1 = Object.keys(o1);
  const keys2 = Object.keys(o2);

  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    if (!keys2.includes(key)) {
      return false;
    }
    if (!equals(o1[key], o2[key])) {
      return false;
    }
  }

  return true;
};
