import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.argv[2] || 8000; // ポート番号を引数で指定 or 8000
const rootDirectory = process.argv[3]
  ? path.resolve(process.argv[3])
  : path.resolve(__dirname, "./test");

// rootDirectory配下の静的ファイルを提供
console.log("Serving files from:", rootDirectory);

// リクエストが/test/mirrorの場合、リクエストをそのまま返す
app.all("/test/mirror", (request, response) => {
  // allを使うことで endPointが完全一致のときのみ反応
  // レスポンスヘッダーを設定
  response.setHeader("Content-Type", "text/plain; charset=UTF-8");

  // レスポンスのステータスコードを指定
  response.status(200);

  // レスポンスボディの最初にリクエストを出力
  response.write(`${request.method} ${request.url} HTTP/1.1\r\n`);

  // リクエストヘッダーを出力
  const headers = request.rawHeaders;
  for (let i = 0; i < headers.length; i += 2) {
    response.write(`${headers[i]}: ${headers[i + 1]}\r\n`);
  }

  // ヘッダーの終わりを示す空行
  response.write("\r\n");

  // リクエストボディをレスポンスボディにパイプで接続
  request.pipe(response);
});

// それ以外のリクエストはrootDirectory配下の静的ファイルを提供(Content-Typeや404エラーも自動設定)
app.use(express.static(rootDirectory));

// サーバーを起動
// もしこのファイルが直接実行された時だけサーバーを起動する。テストからimportされた場合は起動しない。
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

// テスト用にexport
export default app;
