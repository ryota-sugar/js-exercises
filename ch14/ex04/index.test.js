import { SortableHiragana } from "./index.js";

describe("SortableHiragana", () => {
  test("プロパティ値", () => {
    const a = new SortableHiragana("あ");
    expect(a.char).toBe("あ");
    expect(a.code).toBe("あ".charCodeAt(0));
  });

  test("stringヒント", () => {
    const a = new SortableHiragana("あ");
    expect(`${a}`).toBe("あ");
    expect(String(a)).toBe("あ");
  });

  test("numberヒント", () => {
    const a = new SortableHiragana("あ");
    expect(+a).toBe("あ".charCodeAt(0));
    expect(Number(a)).toBe("あ".charCodeAt(0));
  });

  test("stringとnumber以外の場合", () => {
    const a = new SortableHiragana("あ");
    expect(a + "").toBe("あ");
    expect(a == "あ").toBe(true);
  });

  test("比較・ソート", () => {
    const chars = [
      new SortableHiragana("か"),
      new SortableHiragana("あ"),
      new SortableHiragana("さ"),
    ];
    chars.sort((x, y) => x - y);
    expect(chars.map(String)).toEqual(["あ", "か", "さ"]);
    expect(chars[0] < chars[1]).toBe(true);
    expect(chars[2] > chars[1]).toBe(true);
  });

  test("ひらがな1文字以外はエラー", () => {
    expect(() => new SortableHiragana("A")).toThrow();
    expect(() => new SortableHiragana("ア")).toThrow();
    expect(() => new SortableHiragana("あい")).toThrow();
  });
});
