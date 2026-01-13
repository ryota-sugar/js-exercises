// 指定されたディレクトリからファイルを提供するシンプルな静的HTTPサーバー
// また、受信したリクエストをエコーバックする特別な /test/mirror エンドポイントも実装している
// これはクライアントのデバッグ時に便利
import http from "http";
import url from "url";
import path from "path";
import fs from "fs";

// 指定されたポートでリッスンするHTTPサーバーを介して、指定されたルートディレクトリからファイルを提供
function serve(rootDirectory, port) {
  const server = new http.Server(); // 新しいHTTPサーバーを作成
  server.listen(port); // 指定されたポートでリッスン
  console.log("Listening on port", port);

  // リクエストが来たときに、この関数で処理
  server.on("request", (request, response) => {
    // リクエストURLのパス部分を取得
    // クエリパラメータは無視
    const endpoint = url.parse(request.url).pathname;

    // リクエストが "/test/mirror" の場合、リクエストをそのまま返す
    // リクエストヘッダーやボディを確認する必要がある場合に便利
    if (endpoint === "/test/mirror") {
      // レスポンスヘッダーを設定
      response.setHeader("Content-Type", "text/plain; charset=UTF-8");

      // レスポンスステータスコードを指定
      response.writeHead(200); // 200 OK

      // リクエストの内容でレスポンスボディを開始
      response.write(
        `${request.method} ${request.url} HTTP/${request.httpVersion}\r\n`
      );

      // リクエストヘッダーを出力
      const headers = request.rawHeaders;
      for (let i = 0; i < headers.length; i += 2) {
        response.write(`${headers[i]}: ${headers[i + 1]}\r\n`);
      }

      // 余分な空行でヘッダーを終了
      response.write("\r\n");

      // リクエストボディをレスポンスボディにコピーする必要がある
      // 両方ともストリームなので、パイプを使用可能
      request.pipe(response);
    }
    // それ以外の場合、ローカルディレクトリからファイルを提供
    else {
      // エンドポイントをローカルファイルシステムのファイルにマッピング
      let filename = endpoint.substring(1); // 先頭の / を削除
      // "../" を許可しない。これはルートディレクトリ外のファイルを提供するセキュリティホールになるため
      filename = filename.replace(/\.\.\//g, "");
      // 相対ファイル名から絶対ファイル名に変換
      filename = path.resolve(rootDirectory, filename);

      // PUTリクエストによるファイルアップロードを処理
      if (request.method === "PUT") {
        fs.mkdir(path.dirname(filename), { recursive: true }, (err) => {
          // recursive trueでディレクトリがなければ作成
          if (err) {
            response.writeHead(500);
            response.end(err.message);
            return;
          }
          const stream = fs.createWriteStream(filename);
          stream.on("error", (err) => {
            response.writeHead(500);
            response.end(err.message);
          });
          stream.on("finish", () => {
            response.writeHead(200);
            response.end("Upload complete");
          });
          request.pipe(stream);
        });
      } else if (request.method === "GET") {
        // 拡張子に基づいてファイルのMIMEタイプを推測
        let type;
        switch (path.extname(filename)) {
          case ".html":
          case ".htm":
            type = "text/html";
            break;
          case ".js":
            type = "text/javascript";
            break;
          case ".css":
            type = "text/css";
            break;
          case ".png":
            type = "image/png";
            break;
          case ".txt":
            type = "text/plain";
            break;
          default:
            type = "application/octet-stream";
            break;
        }

        const stream = fs.createReadStream(filename);
        stream.once("readable", () => {
          // ストリームが読み取り可能になったら、Content-Typeヘッダーと200 OKステータスを設定
          // そして、ファイル読み取りストリームをレスポンスにパイプ
          // パイプはストリームが終了したときに自動的に response.end() を呼び出す
          response.setHeader("Content-Type", type);
          response.writeHead(200);
          stream.pipe(response);
        });

        stream.on("error", (err) => {
          // ストリームを開こうとしてエラーが発生した場合、ファイルが存在しないか読み取れない可能性がある
          // エラーメッセージとともに404 Not Foundのプレーンテキストレスポンスを送信
          response.setHeader("Content-Type", "text/plain; charset=UTF-8");
          response.writeHead(404);
          response.end(err.message);
        });
      } else {
        // サポートされていないHTTPメソッドの場合、405 Method Not Allowedを返す
        response.writeHead(405);
        response.end("Method Not Allowed");
      }
    }
  });
}

// コマンドラインから呼び出されたときに serve() 関数を呼び出す
serve(process.argv[2] || "/tmp", parseInt(process.argv[3]) || 8000);
