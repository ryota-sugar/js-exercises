import request from "supertest";
import app from "./index.js";

describe("Web Server Tests", () => {
  test("POST /test/mirror returns the request body", async () => {
    const data = "mirror test data.";

    // 仮想的にリクエストを送る
    const response = await request(app)
      .post("/test/mirror")
      .send(data)
      .expect(200)
      .expect("Content-Type", /text\/plain/);

    expect(response.text).toContain(data); // レスポンスに送信したデータが含まれているか
  });

  test("GET /test.txt returns text/plain", async () => {
    await request(app)
      .get("/test.txt")
      .expect(200)
      .expect("Content-Type", /text\/plain/);
  });

  test("GET /test.json returns application/json", async () => {
    await request(app)
      .get("/test.json")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("GET /noExist returns 404", async () => {
    await request(app).get("/noExist").expect(404);
  });
});
