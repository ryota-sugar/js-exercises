import fs from "fs";
import iconv from "iconv-lite";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ストリームではない方法

// ファイルをバイナリデータとして読み込む
const buffer = fs.readFileSync(path.resolve(__dirname, "hello.txt"));

// バイナリデータをShift_JISとして解釈してデコードする
const text = iconv.decode(buffer, "Shift_JIS");

console.log(text);

// ストリームを使う方法

// ストリームを作成してファイルを読み込む
const readStream = fs.createReadStream(path.resolve(__dirname, "hello.txt"));
// デコードすることで、Shift_JISからUTF-8に変換している
const converter = iconv.decodeStream("Shift_JIS");
const outputStream = readStream.pipe(converter);

// デコードしたデータを随時受け取っていく
let result = "";

outputStream.on("data", (chunk) => {
  result += chunk;
});

// 全て受け取ったら結果を表示する
outputStream.on("end", () => {
  console.log(result);
});
