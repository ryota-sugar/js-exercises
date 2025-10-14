export class SortableHiragana {
  constructor(char) {
    // ひらがな一文字ではない場合はエラー
    if (!/^[\u3041-\u3096]$/.test(char)) {
      throw new Error("Input must be a single Hiragana character");
    }
    this.char = char;
    this.code = char.charCodeAt(0);
  }

  [Symbol.toPrimitive](value) {
    // 文字列が期待される場合はひらがなを返す
    if (value === "string") {
      return this.char;
    }
    // 数字が期待される場合はUTF-16を返す
    if (value === "number") {
      return this.code;
    }
    // どちらでもない場合はひらがなを返す
    return this.char;
  }
}
