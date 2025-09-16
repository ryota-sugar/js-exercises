// イテレータオブジェクトを返すイテレータメソッド
export function fibonacciSequence() {
  let x = 0;
  let y = 1;
  return {
    [Symbol.iterator]() {
      // イテレータ自体も反復可能にすることでfor...ofで使える
      return this;
    },
    next() {
      // イテレータオブジェクトはnextメソッドが必要
      const value = x;
      [x, y] = [y, x + y];
      return { value, done: false };
    },
  };
}
