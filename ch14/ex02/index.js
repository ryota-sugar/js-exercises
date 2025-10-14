export class MyArrayLike {
  get length() {
    // プロパティの数を返す
    return Object.getOwnPropertyNames(this).length;
  }

  // sliceやmapの戻り値のインスタンスを生成する際にlengthプロパティが必要になるため、setterも定義しておく
  set length(value) {}
}

export class MyArray extends Array {
  constructor(items) {
    super(...items);
  }

  static get [Symbol.species]() {
    // MyArrayLikeを返すように明示的に定義
    return MyArrayLike;
  }
}
