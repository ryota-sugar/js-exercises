import { server } from "./index.js";
import net from "net";

describe("HTTP Server (net module)", () => {
  // テスト終了後にサーバーを閉じる
  afterAll(() => {
    server.close();
  });

  // リクエストを送信してレスポンス文字列全体を取得する関数
  function request(requestString) {
    return new Promise((resolve, reject) => {
      const socket = net.connect(8000, "localhost");
      let responseData = "";

      socket.on("connect", () => {
        socket.write(requestString);
      });

      socket.on("data", (chunk) => {
        responseData += chunk.toString();
      });

      socket.on("end", () => {
        resolve(responseData);
      });

      socket.on("error", (err) => {
        reject(err);
      });
    });
  }

  test("GET / should return 200 and the form HTML", async () => {
    const req = "GET / HTTP/1.1\r\nHost: localhost\r\n\r\n";
    const res = await request(req);

    expect(res).toContain("HTTP/1.1 200 OK");
    expect(res).toContain('<form action="/greeting" method="POST">');
  });

  test("POST /greeting should return 200 and the greeting result", async () => {
    const body = "name=Sato&greeting=Hello";
    const req = [
      "POST /greeting HTTP/1.1",
      "Host: localhost",
      `Content-Length: ${Buffer.byteLength(body)}`,
      "",
      body,
    ].join("\r\n");

    const res = await request(req);

    expect(res).toContain("HTTP/1.1 200 OK");
    expect(res).toContain("<p>Name: Sato</p>");
    expect(res).toContain("<p>Greeting: Hello</p>");
  });

  test("POST / should return 405 Method Not Allowed", async () => {
    const req = "POST / HTTP/1.1\r\nHost: localhost\r\n\r\n";
    const res = await request(req);

    expect(res).toContain("HTTP/1.1 405 Method Not Allowed");
    expect(res).toContain("Allow: GET");
  });

  test("GET /greeting should return 405 Method Not Allowed", async () => {
    const req = "GET /greeting HTTP/1.1\r\nHost: localhost\r\n\r\n";
    const res = await request(req);

    expect(res).toContain("HTTP/1.1 405 Method Not Allowed");
    expect(res).toContain("Allow: POST");
  });

  test("GET /unknown should return 404 Not Found", async () => {
    const req = "GET /unknown HTTP/1.1\r\nHost: localhost\r\n\r\n";
    const res = await request(req);

    expect(res).toContain("HTTP/1.1 404 Not Found");
  });
});
