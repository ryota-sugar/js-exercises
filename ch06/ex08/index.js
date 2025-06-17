export const restrict = (target, template) => {
  const templateKeys = Object.keys(template);

  // 全てのプロパティを列挙
  for (const key of Reflect.ownKeys(target)) {
    // シンボルキーは常に保持
    if (typeof key === "symbol") continue;

    // 文字列キーは template に存在していないと削除
    if (!templateKeys.includes(key)) {
      delete target[key];
    }
  }
  return target;
};

export function substract(target, ...sources) {
  const keysToRemove = Object.create(null);

  // sources のすべての自前プロパティ（文字列キーのみ）を削除対象に追加
  for (const source of sources) {
    for (const key of Reflect.ownKeys(source)) {
      // Symbolキーと継承プロパティはスキップ
      if (
        typeof key !== "symbol" &&
        Object.prototype.hasOwnProperty.call(source, key)
      ) {
        keysToRemove[key] = true;
      }
    }
  }

  // target の各プロパティをチェックし、削除対象なら delete
  for (const key of Reflect.ownKeys(target)) {
    if (
      typeof key !== "symbol" && // シンボルは保持
      Object.prototype.hasOwnProperty.call(target, key) && //継承プロパティは対象外
      keysToRemove[key] // 削除対象かどうか
    ) {
      delete target[key];
    }
  }
  return target;
}
