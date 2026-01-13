import { spawn } from "child_process";
import path from "path";

// ESMでこのファイルの絶対パスとして__dirnameを定義するイディオム
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// startChildで起動したプロセスの参照
let child = null;

// node ./child.js を起動し、このプロセスが終了したときに解決するPromiseを返す
// cf. https://nodejs.org/api/child_process.html#event-close
async function startChild() {
  const childPath = path.join(__dirname, "child.js");
  child = spawn("node", [childPath]);

  child.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  return new Promise((res) => {
    child.on("close", (code, signal) => {
      res([code, signal]);
    });
  });
}

// TODO: ここに処理を書く
// SIGINT(Ctrl+C)とSIGQUIT(Ctrl+\)のシグナルを親プロセスに通知して同じシグナルを子プロセスにも伝える
process.on("SIGINT", () => {
  console.log("Received SIGINT, killing child process...");
  child.kill("SIGINT");
});

process.on("SIGQUIT", () => {
  console.log("Received SIGQUIT, killing child process...");
  child.kill("SIGQUIT");
});

(async () => {
  for (;;) {
    console.log("Starting child process...");
    const [code, signal] = await startChild();
    console.log(`Child process exited with code ${code}, signal ${signal}`);

    // 子プロセス自身が異常終了している場合以外は親プロセスも終了する
    // 子プロセスが異常終了している場合のみcodeに1が返ってきて再起動する仕組み(シグナルを送って終了させた場合はcodeがnullになる)
    if (code !== 1) {
      process.exit(code);
    }
  }
})();
