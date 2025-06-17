// プロパティ名が数値のプロパティ
// プロパティ名が文字列のプロパティ
// 列挙可能なプロパティ
// を持つオブジェクトを作成する。
const proto = {
  1: "proto-number",
  str: "proto-string",
  enum: "proto-enumerable",
};

// 列挙可能なプロパティとして定義
Object.defineProperty(proto, "enumerableProperty", {
  value: "proto_enumerable_value",
  enumerable: true,
});

// protoをプロトタイプとしてもつオブジェクトの作成
const targetObject = Object.create(proto);

targetObject[1] = "target_number_1";
targetObject[2] = "target_number_2";
targetObject.str = "target_string_1";
targetObject.ownStr = "target_string_2";
Object.defineProperty(targetObject, "enumerableProperty", {
  value: "target_non_enumerable_value",
  enumerable: false,
});

for (const key in targetObject) {
  console.log(`key: ${key}, value: ${targetObject[key]}`);
}

// 出力結果
// key: 1, value: target_number_1
// key: 2, value: target_number_2
// key: str, value: target_string_1
// key: ownStr, value: target_string_2
// key: enum, value: proto-enumerable
