export const getProperty = (obj: object): (string | symbol)[] => {
  const properties: (string | symbol)[] = [];

  // 列挙不可・シンボルを含む独自プロパティを取得
  const ownPropertyKeys = [
    ...Object.getOwnPropertyNames(obj), //独自プロパティの中で列挙可能なものと列挙不可なもの両方を取得可能
    ...Object.getOwnPropertySymbols(obj), //プロパティ名がシンボルのものを取得
  ];
  properties.push(...ownPropertyKeys);

  // 列挙可能な継承プロパティを取得
  const inheritedPropertyKeys = [];
  // for inを使うと、列挙可能なプロパティのみが取得される
  // その中で独自プロパティを除けば、列挙可能な継承プロパティが取得できる
  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) {
      inheritedPropertyKeys.push(key);
    }
  }
  properties.push(...inheritedPropertyKeys);
  return properties;
};
