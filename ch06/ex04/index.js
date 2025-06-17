// 各条件に基づいたオブジェクトを作成する関数
const makeObject = (value, writable, enumerable, configurable) => {
  return Object.defineProperty({}, "property1", {
    value: value,
    writable: writable,
    enumerable: enumerable,
    configurable: configurable,
  });
};

// バイナリ文字列に基づいてオブジェクトを作成する関数
const createObjects = (binaryString) => {
  const bits = binaryString.split("");
  const writable = bits[0] === "1";
  const enumerable = bits[1] === "1";
  const configurable = bits[2] === "1";
  return makeObject("value", writable, enumerable, configurable);
};

// すべての組み合わせをテストする関数
// バイナリ文字列の各ビットがwritable, enumerable, configurableを表す
const testCombinations = () => {
  // あらかじめ全ての組み合わせを表すバイナリ文字列を定義
  const combinations = ["000", "001", "010", "011", "100", "101", "110", "111"];

  combinations.forEach((binary) => {
    // バイナリ文字列に基づいてオブジェクトを作成
    const obj = createObjects(binary);
    // バイナリ文字列に対応するwritable, enumerable, configurableの値を取得
    const [writable, enumerable, configurable] = binary
      .split("")
      .map((b) => b === "1");

    let changeSuccess = true;
    try {
      obj.property1 = "new value";
      changeSuccess = obj.property1 === "new value";
    } catch {
      changeSuccess = false;
    }

    let deleteSuccess = true;
    try {
      delete obj.property1;
      "property1" in obj ? (deleteSuccess = false) : (deleteSuccess = true);
    } catch {
      deleteSuccess = false;
    }

    // ESLintでエラーになるため、Object.prototypeを明示的に参照
    const hasProperty = Object.prototype.hasOwnProperty.call(obj, "property1");
    // ESLintでエラーになるため、Object.prototypeを明示的に参照
    const isEnumerable = Object.prototype.propertyIsEnumerable.call(
      obj,
      "property1"
    );

    console.log(
      `writable: ${writable}, enumerable: ${enumerable}, configurable: ${configurable}の場合`
    );
    console.log(`プロパティの変更は: ${changeSuccess}`);
    console.log(`プロパティの削除は: ${deleteSuccess}`);
    console.log(`hasOwnProperty: ${hasProperty}`);
    console.log(`propertyIsEnumerable: ${isEnumerable}`);
  });
};

testCombinations();
