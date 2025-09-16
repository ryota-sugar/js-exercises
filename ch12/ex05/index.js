import fs from "fs";

export function* readLines(filePath) {
  const file = fs.openSync(filePath, "r");
  const bufferSize = 256;
  const buffer = Buffer.alloc(bufferSize); // 256バイトを一度に読み込むためのバッファ
  let remain = ""; // 前回の読み込みで残ったデータを保持する変数
  try {
    while (true) {
      const bufferRead = fs.readSync(file, buffer, 0, buffer.length, null); // 対象のファイルを指定したバイト分用意したバッファに読み込む
      if (bufferRead === 0) {
        // ファイルの終端に達した場合
        break;
      }
      const joinOneLine = remain + buffer.toString("utf-8", 0, bufferRead); // 前回の残りと今回読み込んだデータを結合して文字化(行がバッファの途中で途切れることがあるため)

      const lines = joinOneLine.split(/\r?\n/); // 改行コードで分割する
      remain = lines.pop(); // 最後の要素は次の行のもののため、remainに保存しておく

      for (const line of lines) {
        yield line; // 分割された行を順に返す
      }
    }
    if (remain) {
      // 最後に残ったデータがあればそれも返す
      yield remain;
    }
  } finally {
    fs.closeSync(file); // 最後は必ずファイルを閉じる
  }
}
