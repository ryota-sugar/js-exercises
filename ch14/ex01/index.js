export const unwritableAndUnconfigurableObj = () => {
  const obj = { a: 1 };
  Object.defineProperty(obj, "a", {
    value: 1,
    writable: false,
    configurable: false,
  });
  return obj;
};

export const writableAndUnconfigurableObj = () => {
  const obj = { b: 2 };
  Object.defineProperty(obj, "b", {
    value: 2,
    writable: true,
    configurable: false,
  });
  return obj;
};

export const nestedUnwritableObj = () => {
  const obj = { c: { d: { e: 3 } } };
  // 再帰的に全てのオブジェクトの拡張を禁止する関数
  const preventAllExtensions = (o) => {
    Object.keys(o).forEach((key) => {
      if (typeof o[key] === "object" && o[key] !== null) {
        preventAllExtensions(o[key]);
      }
    });
    Object.preventExtensions(o); // 拡張不可にする
  };
  preventAllExtensions(obj);
  return obj;
};
