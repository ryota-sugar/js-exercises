function normalizeDiacriticalMark(str) {
  // 合成可能なダイアクリティカルマークを無視するために、文字列を Unicode 正規化して分解し、 \u0300-\u036f の範囲を取り除く
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export class IgnoreAccentPattern {
  constructor(pattern) {
    this.pattern = pattern;

    if (typeof pattern === "string") {
      // 文字列の場合は、ダイアクリティカルマークを無視した正規表現を作成
      this.normalizedPattern = new RegExp(normalizeDiacriticalMark(pattern));
    } else {
      // 正規表現の場合は、フラグとソースを取得し、ソースのダイアクリティカルマークを無視した正規表現を作成
      const flags = pattern.flags;
      const source = normalizeDiacriticalMark(pattern.source);
      this.normalizedPattern = new RegExp(source, flags);
    }
  }
  [Symbol.search](s) {
    // 検索対象文字列もダイアクリティカルマークを無視して正規化
    const normalizedSearch = normalizeDiacriticalMark(s);
    return normalizedSearch.search(this.normalizedPattern);
  }
  [Symbol.match](s) {
    // マッチ対象文字列もダイアクリティカルマークを無視して正規化
    const normalizedMatch = normalizeDiacriticalMark(s);
    return normalizedMatch.match(this.normalizedPattern);
  }
}
