import net from "net";
import { Readable } from "stream";

const getContentHTML = `
   <!doctype html>
   <html lang="ja">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Greeting Form</title>
     </head>
     <body>
       <form action="/greeting" method="POST">
         <label for="greeting">Name:</label>
         <input type="text" id="name" name="name" />
         <input type="text" id="greeting" name="greeting" />
         <button type="submit">Submit</button>
       </form>
     </body>
   </html>

`;

const postedConetentHTML = (name, greeting) => `
    <!doctype html>
    <html lang="ja">
    <head>
        <meta charset="UTF-8" />
        <title>Greeting Result</title>
    </head>
    <body>
        <h1>Greeting</h1>
        <p>Name: ${name}</p>
        <p>Greeting: ${greeting}</p>
    </body>
    </html>
`;

const sendContent = async (socket) => {
  return new Promise((resolve, reject) => {
    // データを受信したときの処理
    let data = "";
    socket.on("data", (chunk) => {
      data += chunk.toString();
      const [requestLine] = data.split("\r\n"); // 最初の行だけ取得
      const [method, path] = requestLine.split(" "); // スペースで分割してメソッドとパスを取得

      if (path === "/") {
        if (method === "GET") {
          const responseBody = getContentHTML;
          const responseHeaders = [
            "HTTP/1.1 200 OK",
            "Content-Type: text/html; charset=UTF-8",
            `Content-Length: ${Buffer.byteLength(responseBody)}`,
            "Connection: close",
          ];

          socket.write(responseHeaders.join("\r\n"));
          socket.write("\r\n\r\n"); // ヘッダーの終了を示す空行

          const stream = Readable.from(responseBody);
          stream.pipe(socket);
          stream.on("end", () => {
            socket.end();
            resolve(); // 完了したらresolve
          });
        } else {
          // メソッドが許可されていない場合
          const responseHeaders = [
            "HTTP/1.1 405 Method Not Allowed",
            "Connection: close",
            "Allow: GET", // 許可されているメソッドを通知
          ];
          socket.write(responseHeaders.join("\r\n") + "\r\n\r\n", () =>
            resolve()
          );
        }
      } else if (path === "/greeting") {
        if (method === "POST") {
          // dataの全体を2つに分けてheadersとbodyを取得
          const [, bodyPart] = data.split("\r\n\r\n");
          // body部分をURLSearchParamsで解析
          const params = new URLSearchParams(bodyPart);

          const name = params.get("name") || "";
          const greeting = params.get("greeting") || "";

          const responseBody = postedConetentHTML(name, greeting);

          const responseHeaders = [
            "HTTP/1.1 200 OK",
            "Content-Type: text/html; charset=UTF-8",
            `Content-Length: ${Buffer.byteLength(responseBody)}`,
            "Connection: close",
          ];

          socket.write(responseHeaders.join("\r\n"));
          socket.write("\r\n\r\n");

          const stream = Readable.from(responseBody);
          stream.pipe(socket);
          stream.on("end", () => {
            socket.end();
            resolve();
          });
        } else {
          // メソッドが許可されていない場合
          const responseHeaders = [
            "HTTP/1.1 405 Method Not Allowed",
            "Connection: close",
            "Allow: POST", // 許可されているメソッドを通知
          ];
          socket.write(responseHeaders.join("\r\n") + "\r\n\r\n", () =>
            resolve()
          );
        }
      } else {
        // パスが存在しない場合
        const responseHeaders = ["HTTP/1.1 404 Not Found", "Connection: close"];
        socket.write(responseHeaders.join("\r\n") + "\r\n\r\n", () =>
          resolve()
        );
      }
    });

    socket.on("error", (err) => reject(err));
  });
};

// Serverオブジェクトを作成して、接続の待ち受けを開始
const server = net.createServer();
server.listen(8000, () => {
  console.log("Listening on port 8000");
});

// クライアントが接続してきた時の処理
server.on("connection", async (socket) => {
  console.log("Client connected");
  try {
    await sendContent(socket);
  } catch (err) {
    console.log("Error:", err);
  } finally {
    socket.end();
  }
});

export { server };
