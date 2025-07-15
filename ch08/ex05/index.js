export const sequenceToObject = (...values) => {
  if (values.length === 0 || values.length % 2 !== 0) {
    throw new Error("Invalid number of arguments");
  }
  let result = {};
  for (let i = 0; i < values.length; i += 2) {
    result = { ...result, ...makeObject(values[i], values[i + 1]) };
  }
  return result;
};

// 引数を2つ受け取り、一つのオブジェクトに変換する関数
const makeObject = (key, value) => {
  // keyが文字列でない場合はエラーを投げる
  if (typeof key !== "string") {
    throw new Error("Key must be a string");
  }
  return { [key]: value };
};
