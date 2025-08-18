import { sortJapanese, toJapaneseDateString } from "./index.ts";

describe("sortJapanese", () => {
  it("濁点・半濁点・小文字・大文字の違いを無視してソートできる", () => {
    const input = [
      "ばなな",
      "はな",
      "バナナ",
      "ぱなな",
      "はな",
      "ハナ",
      "つき",
      "っき",
      "ツキ",
    ];
    const expected = [
      "つき",
      "っき",
      "ツキ",
      "はな",
      "はな",
      "ハナ",
      "ばなな",
      "バナナ",
      "ぱなな",
    ];
    expect(sortJapanese(input)).toEqual(expected);
  });

  it("同じ読みの文字列は元の順序を保つ（安定ソート）", () => {
    const input = ["はな", "ハナ", "ばなな", "バナナ"];
    const expected = ["はな", "ハナ", "ばなな", "バナナ"];
    expect(sortJapanese(input)).toEqual(expected);
  });

  it("空配列はそのまま返す", () => {
    expect(sortJapanese([])).toEqual([]);
  });
});

describe("toJapaneseDateString", () => {
  it("令和6年4月2日 の形式で返す", () => {
    const date = new Date(2024, 3, 2);
    expect(toJapaneseDateString(date)).toBe("令和6年4月2日");
  });

  it("平成31年4月30日 の形式で返す", () => {
    const date = new Date(2019, 3, 30);
    expect(toJapaneseDateString(date)).toBe("平成31年4月30日");
  });

  it("昭和64年1月7日 の形式で返す", () => {
    const date = new Date(1989, 0, 7);
    expect(toJapaneseDateString(date)).toBe("昭和64年1月7日");
  });
});
