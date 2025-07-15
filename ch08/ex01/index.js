// 引数は2つのため、括弧は必要
// return文以外も必要なため、アロー関数の後に括弧を使用
export const getCNTimes = (n, c) => {
  if (n < 0) throw new Error("n must be a non-negative integer");
  // Array.fromを使って、長さnの配列を作成し、各要素にcを代入することで1行で記述
  const arr = Array.from({ length: n }, () => c);
  // 作成した配列はn個のため、forEachを使ってn回コンソールに出力。引数vに括弧は不要
  arr.forEach((v) => console.log(v));
  return arr;
}; //最後のセミコロンは省略可能

// 引数は1つのため、括弧は不要
// 関数本体がreturn文だけのため、returnキーワードとセミコロン、中括弧は省略可能
export const getSquare = (x) => x * x;

// 引数はないため、丸括弧だけ必要
// 関数本体がreturn文だけのため、returnキーワードとセミコロン、中括弧は省略可能
export const getNow = () => Date.now();
