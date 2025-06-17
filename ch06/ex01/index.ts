interface Mapping {
  key: string;
  value: string | object;
  next: Mapping | undefined;
}

interface HashTable {
  size: number;
  entries: Mapping[] | undefined[];
  get(key: string): string | object | undefined;
  put(key: string, value: string | object): void;
  remove(key: string): void;
}

export function hash(key: string, capacity: number): number {
  // keyをハッシュ化して、配列のインデックスを計算する
  let hashValue = 0;
  for (let i = 0; i < key.length; i++) {
    // 各文字のコードポイントを加算してハッシュ値を計算
    hashValue += key.charCodeAt(i);
  }
  // ハッシュ値を配列のサイズで割った余りを返す
  return hashValue % capacity;
}

export function newHashTable(capacity: number): HashTable {
  return {
    size: 0, // マッピング数を示すプロパティ
    entries: new Array(capacity), // マッピングを格納する固定長の配列
    get(key: string): string | object | undefined {
      // keyにマップされた値を取得する
      const index = hash(key, this.entries.length);
      let current = this.entries[index];
      if (!current) {
        return undefined;
      }
      while (current) {
        if (current.key === key) {
          return current.value;
        }
        if (!current.next) {
          return undefined;
        } else {
          current = current.next;
        }
      }
    },
    put(key: string, value: string | object): void {
      // key, valueのマッピングを追加する(keyが存在する場合はvalueを上書きする)
      const index = hash(key, this.entries.length);
      let current = this.entries[index];

      if (!current) {
        // エントリが空の場合、新しいマッピングを作成
        this.entries[index] = { key, value, next: undefined };
        this.size++; // サイズを更新
        return;
      }
      while (current) {
        if (current.key === key) {
          current.value = value; // 値の更新
          break;
        }
        if (!current.next) {
          const newMapping: Mapping = { key, value, next: undefined };
          current.next = newMapping; // 新しいマッピングを追加
          this.size++; // サイズを更新
          break;
        } else {
          current = current.next;
        }
      }
    },
    remove(key) {
      const index = hash(key, this.entries.length);
      let current = this.entries[index];
      if (!current) {
        return; // エントリが空の場合は削除するものがないため何もしない
      }
      while (current) {
        if (current.key === key) {
          if (current.next) {
            // 次のマッピングがある場合、次のマッピングを現在の位置に移動
            current.key = current.next.key;
            current.value = current.next.value;
            current.next = current.next.next; // 次のマッピングを削除
          } else {
            // 次のマッピングがない場合、現在の位置を空にする
            this.entries[index] = undefined;
          }
          this.size--;
          return;
        }
        if (!current.next) {
          return;
        } else {
          current = current.next;
        }
      }
    },
  };
}

// function sample() {
//   const hashTable = newHashTable(10);
//   hashTable.put("key1", "value1");
//   hashTable.put("key2", { value: "value2" });

//   console.log(`size=${hashTable.size}`); // => size=2
//   console.log(`key1=${hashTable.get("key1")}`); // => key1=value1
//   console.log(`key2=${JSON.stringify(hashTable.get("key2"))}`); // => key2={"value":"value2"}

//   hashTable.put("key2", "new value");

//   console.log(`key2=${hashTable.get("key2")}`); // => key2=new value

//   hashTable.remove("key2");

//   console.log(`key2=${hashTable.get("key2")}`); // => key2=undefined
//   console.log(`size=${hashTable.size}`); // => size=1
// }
