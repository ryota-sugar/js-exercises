// テキストにあるfilter関数
function filter(iterable, predicate) {
  const iterator = iterable[Symbol.iterator]();
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      for (;;) {
        const v = iterator.next();
        if (v.done | predicate(v.value)) {
          return v;
        }
      }
    },
  };
}

// 整数列を返すジェネレータ(素数の2からスタート)
function* intergers() {
  let x = 2;
  while (true) {
    yield x++;
  }
}

// filter関数とintergersジェネレータを使って素数を生成するジェネレータを作る
export function* primes() {
  let it = intergers(); // 2,3,4,5,6...
  while (true) {
    const prime = it.next().value;
    yield prime;
    it = filter(it, (x) => x % prime !== 0); // 取得した素数の倍数を除外した新しいイテレータを返すため、primeで割り切れないものだけが残っていく
  }
}
