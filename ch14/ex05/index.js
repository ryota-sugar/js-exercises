export function template(strings, ...values) {
  // stringsにはテンプレートリテラルの文字列部分、valuesには${}で囲まれた部分が配列として入る
  if (strings.length === 0 && values.length === 0) {
    return "";
  }
  const escaped = values.map((value) => {
    return typeof value;
  });
  let result = strings[0];

  // ${} の位置は strings 配列の区切り目に対応している → stringsの間にescapedを挟む
  for (let i = 0; i < escaped.length; i++) {
    result += escaped[i] + strings[i + 1];
  }
  return result;
}
