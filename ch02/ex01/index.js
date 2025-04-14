class DefaultMap extends Map {
  constructor(defaultValue) {
    super(); //親クラス(Mapクラス)のコンストラクタの呼び出し
    this.defaultValue = defaultValue;
  }

  get(key) {
    if (this.has(key)) {
      return super.get(key); //キーを持っているか確認し、マップ中に存在すれば親クラス中の値を返す
    } else {
      return this.defaultValue; //新しいキーの場合は、デフォルト値を返す
    }
  }
}

class Histogram {
  constructor() {
    this.letterCounts = new DefaultMap(0); // Mapオブジェクトはキーと値のペアを保持する
    this.totalLetters = 0;
  }

  add(text) {
    text = text.replace(/\s/g, "").toUpperCase(); //空白文字を取り除いて、全て大文字に変換

    for (const character of text) {
      const count = this.letterCounts.get(character); //characterをキーとして、letterCountsから値を取得
      this.letterCounts.set(character, count + 1); // そのキーの値を1増やす
      this.totalLetters++;
    }
  }

  toString() {
    let entries = [...this.letterCounts]; //Mapを[キー、文字数]の配列に変換

    // 文字数順にソート。文字数が同じ場合は、アルファベット順にソート
    entries.sort((a, b) => {
      if (a[1] === b[1]) {
        return a[0] < b[0] ? -1 : 1;
      } else {
        return b[1] - a[1]; //正の場合はbがaより大きいため、aがbより後に来る
      }
    });

    for (const entry of entries) {
      entry[1] = (entry[1] / this.totalLetters) * 100;
    }

    entries = entries.filter((entry) => entry[1] >= 1);

    const lines = entries.map(
      ([l, n]) => `${l}: ${"#".repeat(Math.round(n))} ${n.toFixed(2)}%`
    );

    return lines.join("\n");
  }
}

async function histogramFromStdin() {
  process.stdin.setEncoding("utf8");
  const histogram = new Histogram();
  for await (const chunk of process.stdin) {
    histogram.add(chunk);
  }
  return histogram;
}

histogramFromStdin().then((histogram) => {
  console.log(histogram.toString());
});
