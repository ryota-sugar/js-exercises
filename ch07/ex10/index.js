function makeFixedSizeArray(size) {
  const array = new Array(size);
  return {
    get(index) {
      if (index < 0 || array.length <= index) {
        throw new Error(`Array index out of range: ${index}`);
      }
      return array[index];
    },
    set(index, value) {
      if (index < 0 || array.length <= index) {
        throw new Error(`Array index out of range: ${index}`);
      }
      array[index] = value;
    },
    length() {
      return array.length;
    },
  };
}

export class DynamicSizeArray {
  static INITIAL_SIZE = 4;

  constructor() {
    this.len = 0; // 現在の要素数
    this.array = makeFixedSizeArray(DynamicSizeArray.INITIAL_SIZE);
  }

  get(index) {
    if (index < 0 || index >= this.len) {
      throw new Error(`Array index out of range: ${index}`);
    }
    return this.array.get(index);
  }

  set(index, value) {
    if (index < 0 || index >= this.len) {
      throw new Error(`Array index out of range: ${index}`);
    }
    this.array.set(index, value);
  }

  // 実際に格納されている要素数を返す
  length() {
    return this.len;
  }

  push(value) {
    // 空きがない場合は容量を倍に拡張（再配置）
    if (this.len >= this.array.length()) {
      const old = this.array;
      this.array = makeFixedSizeArray(old.length() * 2);
      // 古い配列(old)の要素を新しい配列にコピー
      for (let i = 0; i < old.length(); i++) {
        this.array.set(i, old.get(i));
      }
    }

    // 新しい要素を追加し、長さを更新する
    this.array.set(this.len, value);
    this.len++;
  }
}
