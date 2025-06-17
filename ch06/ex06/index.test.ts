import { getProperty } from "./index.ts";

const sym1 = Symbol("sym1");
const sym2 = Symbol("sym2");

interface ProtoObject {
  protoEnum: number; // 列挙可能なプロパティ
  [sym1]: number; // シンボルプロパティ
}

interface TestObject extends ProtoObject {
  ownEnum: number; // 独自の列挙可能なプロパティ
  ownNonEnum: number; // 独自の列挙不可プロパティ
  [sym2]: number; // 独自のシンボルプロパティ
}

describe("getProperty", () => {
  it("独自プロパティ（列挙可・不可・Symbol）と継承プロパティ（列挙可）を正しく取得できる", () => {
    // プロトタイプを作成
    const proto: ProtoObject = {
      protoEnum: 1,
      [sym1]: 100,
    };
    Object.defineProperty(proto, "protoNonEnum", {
      value: 2,
      enumerable: false,
    });

    // テスト対象オブジェクト
    const obj: TestObject = Object.create(proto);
    obj.ownEnum = 10; // 列挙可能
    Object.defineProperty(obj, "ownNonEnum", {
      value: 20,
      enumerable: false,
    });
    obj[sym2] = 200; // Symbolプロパティ

    const result = getProperty(obj);

    // 結果の検証
    expect(result).toEqual(
      expect.arrayContaining([
        "ownEnum", // 独自・列挙可
        "ownNonEnum", // 独自・列挙不可
        sym2, // 独自・Symbol
        "protoEnum", // 継承・列挙可
      ])
    );
    // 継承の列挙不可プロパティや未使用Symbolは含まれない
    expect(result).not.toContain("protoNonEnum");
  });
});
