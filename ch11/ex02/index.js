// f はオブジェクトを1つ引数に取る関数
function cache(f) {
  // この関数を実装する
  const weakM = new WeakMap();

  // キャッシュ付きの関数
  return function (obj) {
    // すでにキャッシュがあれば(同じobjがあれば)それを返す
    if (weakM.has(obj)) {
      return weakM.get(obj);
    }
    // キャッシュがなければ、fを実行して結果をキャッシュに保存する
    const result = f(obj);
    weakM.set(obj, result);
    return result;
  };
}

function slowFn(obj) {
  // 時間のかかる処理
  const now = Date.now();
  while (Date.now() - now < 1000) {
    // 1秒間待機
  }
  return obj;
}

// cachedSlowFnを同じ引数で複数回呼び出すと、2回目以降はキャッシュが返る
export const cachedSlowFn = cache(slowFn);
