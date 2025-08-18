export function any(...fnArgs) {
  return function (...args) {
    // 受け取った関数を実行し、少なくとも1つがtrueを返すかどうかを確認
    return fnArgs.some((fnArg) => fnArg.apply(this, ...args));
  };
}

export function catching(tryFn, catchFn) {
  return function (...args) {
    try {
      return tryFn(this, ...args);
    } catch (error) {
      return catchFn(this, error);
    }
  };
}
