export class TypedMap {
  constructor(keyType, valueType, entries) {
    // インスタンスをクラス中で作成
    this.map = new Map();
    this.keyType = keyType;
    this.valueType = valueType;
    if (entries) {
      for (const [k, v] of entries) {
        if (typeof k !== keyType || typeof v !== valueType) {
          throw new TypeError("Wrong type for entry [${k}, ${v}]");
        }
        this.set(k, v); // 作成したsetメソッドを使用して値を追加
      }
    }
  }

  set(key, value) {
    if (this.keyType && typeof key !== this.keyType) {
      throw new TypeError(`${key} is not type ${this.keyType}`);
    }
    if (this.valueType && typeof value !== this.valueType) {
      throw new TypeError(`${value} is not type ${this.valueType}`);
    }

    // Mapのsetメソッドを使用して、キーと値を追加
    this.map.set(key, value);
  }
}
