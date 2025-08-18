export class TypeMap {
  constructor() {
    this.map = new Map();
  }

  set(key, value) {
    // keyはコンストラクタ関数に限定する(関数やnewできないものを除く)
    if (typeof key !== "function" || key.prototype === null) {
      throw new TypeError("Key must be a constructor function");
    }

    // プリミティブ値は、ラッパークラスのコンストラクタ関数で get/set 可能とする
    if (key === String || key === Number || key === Boolean) {
      const expectedType = key.name.toLowerCase();
      // プリミティブ値やラッパーオブジェクトではない場合はエラー
      if (typeof value !== expectedType && !(value instanceof key)) {
        throw new TypeError(
          `Value must be a ${expectedType} or ${key.name} object`
        );
      }
    } else {
      // ユーザーが定義したクラスやDateなどはinstanceofで判定
      if (!(value instanceof key)) {
        throw new TypeError(`Value must be an instance of ${key.name}`);
      }
    }

    this.map.set(key, value);
    return this;
  }

  get(key) {
    return this.map.get(key);
  }
}
