import https from "https";
import { EventEmitter } from "events";
import { jest } from "@jest/globals";
import { openIssue, closeIssue, listIssues } from "./index.js";

// モック作成関数
// https.requestが返すべきrequestオブジェクトと、responseオブジェクトの挙動を定義する
const mockHttpsRequest = (statusCode, responseBody) => {
  return () => {
    // レスポンスのフリをするオブジェクト
    const responseEmitter = new EventEmitter();
    responseEmitter.statusCode = statusCode;
    responseEmitter.headers = {};
    responseEmitter.setEncoding = jest.fn();
    responseEmitter.resume = jest.fn();

    // リクエストのフリをするオブジェクト
    const requestEmitter = new EventEmitter();
    requestEmitter.write = jest.fn();

    // request.end() が呼ばれたら、通信が完了してレスポンスが返ってきたことにする
    requestEmitter.end = jest.fn(() => {
      process.nextTick(() => {
        // .emitでイベントを発火させる
        requestEmitter.emit("response", responseEmitter);
        // データを流し込む
        responseEmitter.emit("data", JSON.stringify(responseBody));
        // 通信終了
        responseEmitter.emit("end");
      });
    });

    return requestEmitter;
  };
};

describe("GitHub API Test with Jest", () => {
  let requestSpy;
  let consoleSpy;

  beforeEach(() => {
    jest.clearAllMocks();

    // テスト用の環境変数
    process.env.GITHUB_OWNER = "testuser";
    process.env.GITHUB_REPOSITORY = "testrepo";
    process.env.GITHUB_TOKEN = "testtoken";

    // コンソール出力を監視 本来のconsole.logを空の関数に差し替え
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    // https.request を監視
    requestSpy = jest.spyOn(https, "request");
  });

  afterEach(() => {
    // スパイしたメソッドを元の https.request に戻す
    jest.restoreAllMocks();
  });

  test("listIssues", async () => {
    const mockData = [{ id: 1, title: "Test Issue" }];

    // https.requestが呼ばれたら、mockHttpsRequestの返すmockを使うようにする
    requestSpy.mockImplementation(mockHttpsRequest(200, mockData));

    await listIssues(false);

    expect(requestSpy).toHaveBeenCalledTimes(1);
    expect(requestSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "GET",
        path: "/repos/testuser/testrepo/issues",
      }),
    );
    // console.log に正しいデータが渡されたかチェック
    expect(consoleSpy).toHaveBeenCalledWith("Issues listed:", mockData);
  });

  test("openIssue", async () => {
    const mockResponse = { html_url: "http://github.com/test/new_issue" };
    requestSpy.mockImplementation(mockHttpsRequest(201, mockResponse));

    await openIssue("New Issue", false);

    expect(requestSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "POST",
        path: "/repos/testuser/testrepo/issues",
      }),
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      "Issue created:",
      "http://github.com/test/new_issue",
    );
  });

  test("closeIssue", async () => {
    const mockResponse = { html_url: "http://github.com/test/closed_issue" };
    requestSpy.mockImplementation(mockHttpsRequest(200, mockResponse));

    await closeIssue(123, false);

    expect(requestSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "PATCH",
        path: "/repos/testuser/testrepo/issues/123",
      }),
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      "Issue closed:",
      "http://github.com/test/closed_issue",
    );
  });
});
