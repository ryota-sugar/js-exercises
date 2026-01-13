import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 大きなファイルサイズ(50MB)
const FILE_SIZE = 50 * 1024 * 1024;
const FILE_PATH = path.resolve(__dirname, "large-file.txt");

// ファイルが存在しない、またはサイズが小さい場合は生成する
if (!fs.existsSync(FILE_PATH) || fs.statSync(FILE_PATH).size < FILE_SIZE) {
  console.log("Creating large file (50MB)...");
  const file = fs.openSync(FILE_PATH, "w");
  const buffer = Buffer.alloc(1024 * 1024, "a".charCodeAt(0)); // 1MBのバッファを'a'で埋める
  for (let i = 0; i < 50; i++) {
    fs.writeSync(file, buffer); // 50回書き込んで50MBにする
  }
  fs.closeSync(file);
  console.log("File created.");
}

// メモリ使用量を表示する関数
function logMemory(label) {
  const used = process.memoryUsage();
  console.log(
    `[${label}] RSS: ${(used.rss / 1024 / 1024).toFixed(2)} MB, Heap: ${(
      used.heapUsed /
      1024 /
      1024
    ).toFixed(2)} MB`
  );
}

// コマンドライン引数からモードを取得 指定なしはstream
const mode = process.argv[2] === "notStream" ? "notStream" : "stream";
console.log(`Running in [${mode}] mode`);

logMemory("Start");

try {
  let body;
  const options = { method: "PUT" };

  if (mode === "notStream") {
    // fs.readを使用してファイル全体をメモリに読み込む
    body = fs.readFileSync(FILE_PATH);
    options.body = body;
    logMemory("Loaded file into memory");
  } else {
    // fs.createReadStreamを使用してストリームとしてファイルを送信
    body = fs.createReadStream(FILE_PATH);
    options.body = body;
    options.duplex = "half";
    logMemory("Stream created");
  }

  const res = await fetch("http://localhost:8000/ch16/ex10/test.txt", {
    ...options, // モードに応じてbodyを設定
  });

  console.log(`Status: ${res.status} ${res.statusText}`);

  logMemory("Finished");
} catch (err) {
  console.error("Error:", err);
}

// 動作確認結果
```
node ch16/ex10/client.js stream

Creating large file (50MB)...
File created.
Running in [stream] mode
[Start] RSS: 34.77 MB, Heap: 4.02 MB
[Stream created] RSS: 34.83 MB, Heap: 4.03 MB
Status: 200 OK
[Finished] RSS: 139.53 MB, Heap: 6.49 MB

node ch16/ex10/client.js notStream

Running in [notStream] mode
[Start] RSS: 33.61 MB, Heap: 4.01 MB
[Loaded file into memory] RSS: 83.72 MB, Heap: 4.02 MB
Status: 200 OK
[Finished] RSS: 200.80 MB, Heap: 5.53 MB

streamの場合はstreamをcreateした段階では、メモリは使用されない。
streamにデータが流れると、少しずつデータが流れていき、大きくメモリが大きくなることはない。
Finishedのタイミングで占有しているメモリがあるが、少量ずつデータを流していたため、notStreamよりは少ない。

notStreamの場合は、loadのタイミングで一度に全てのデータをloadするため、一気にメモリの使用量が大きくなる(50MB増えている)。
Finishedのタイミングでもメモリが高いのは、一貫して全てのデータを保持しているから。
```;
