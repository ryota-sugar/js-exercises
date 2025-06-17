export const assign = (target, ...sources) => {
  if (target === null || target === undefined) {
    throw new TypeError("Cannot convert undefined or null to object");
  }
  const result = Object(target);
  for (const source of sources) {
    if (source === null || source === undefined) {
      continue;
    }
    // 列挙可能な文字列プロパティと列挙可能なシンボルプロパティを取得
    for (const key of [
      ...Object.keys(source),
      ...Object.getOwnPropertySymbols(source).filter((sym) =>
        Object.prototype.propertyIsEnumerable.call(source, sym)
      ),
    ]) {
      result[key] = source[key];
    }
  }
  return result;
};
