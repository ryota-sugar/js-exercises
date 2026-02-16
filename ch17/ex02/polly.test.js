import path from "path";
import { fileURLToPath } from "url";
import { Polly } from "@pollyjs/core";
import NodeHttpAdapter from "@pollyjs/adapter-node-http";
import FSPersister from "@pollyjs/persister-fs";
import { jest } from "@jest/globals";
import { listIssues, openIssue, closeIssue } from "./index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// PollyにNode.jsのhttpを使うこと、ファイルに保存することを登録
Polly.register(NodeHttpAdapter);
Polly.register(FSPersister);

describe("GitHub API Test with Polly", () => {
  let polly;
  let consoleSpy;

  beforeAll(async () => {
    // Pollyの起動設定
    polly = new Polly("GitHub-API-Recording", {
      adapters: ["node-http"], // http/https モジュールをジャックする
      persister: "fs", // ファイルシステムに保存する
      persisterOptions: {
        fs: {
          recordingsDir: path.resolve(__dirname, "__recordings__"), // 保存場所
        },
      },
      logging: false,
    });

    // 録音データに本物のトークンが残らないように隠す
    const { server } = polly;
    server.any().on("beforePersist", (req, recording) => {
      // Authorizationヘッダーの中身を書き換えてから保存する
      if (recording.request.headers.authorization) {
        recording.request.headers.authorization = "Bearer <MASKED_TOKEN>";
      }
    });
  });

  afterAll(async () => {
    // テストが終わったらPollyを停止
    await polly.stop();
  });

  beforeEach(() => {
    // コンソール出力の監視と無効化
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("listIssues", async () => {
    // 初回は実際に実行する
    await listIssues(false);

    // Pollyの場合は通信の中身ではなく、コンソール出力の内容を確認(通信内容は録画ファイルとして固定されるため)
    expect(consoleSpy).toHaveBeenCalledWith(
      "Issues listed:",
      expect.any(Array),
    );
  });

  test("openIssue", async () => {
    await openIssue("Polly Test Issue", false);

    expect(consoleSpy).toHaveBeenCalledWith(
      "Issue created:",
      expect.stringContaining("https://github.com/"),
    );
  });

  test("closeIssue", async () => {
    const existingIssueNumber = 4;

    try {
      await closeIssue(existingIssueNumber, false);
      expect(consoleSpy).toHaveBeenCalledWith(
        "Issue closed:",
        expect.stringContaining("https://github.com/"),
      );
    } catch (error) {
      console.log("Error closing issue:", error);
    }
  });
});
