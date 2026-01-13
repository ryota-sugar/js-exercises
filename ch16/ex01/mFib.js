import { Worker } from "worker_threads";
// eslint-disable-next-line no-unused-vars
import path from "path";

// プロセスIDを表示 (PIDでアクティビティモニタから特定するため)
console.log("Process ID:", process.pid);

// フィボナッチ数とスレッド数を指定
const fibNumber = parseInt(process.argv[2]) || 40; // フィボナッチ数
const numThreads = parseInt(process.argv[3]) || 4; // スレッド数
let currentTask = 0; // 現在のタスク番号
const results = [];
let threadsCompleted = 0;

// 全体の実行時間計測開始
console.time("Total execution time");

// 動的にタスクをワーカーに割り当てる
const assignTask = (worker) => {
  if (currentTask < fibNumber) {
    worker.postMessage(currentTask); // タスクを割り当て
    currentTask++;
  } else {
    worker.postMessage(null); // タスクが無いことを通知
  }
};

// ワーカースレッドを生成して管理
for (let i = 0; i < numThreads; i++) {
  const worker = new Worker(new URL("./worker.js", import.meta.url)); // ワーカースレッドファイルを指定

  // 各スレッドの実行時間計測
  console.time(`Worker ${i} execution time`);

  worker.on("message", (result) => {
    if (result !== null) {
      results.push(result);
      assignTask(worker); // 次のタスクを割り当て
    } else {
      worker.terminate(); // ワーカーを終了させないとプログラムが終了しなかったため追加
      console.timeEnd(`Worker ${i} execution time`);
      threadsCompleted++;
      if (threadsCompleted === numThreads) {
        const finalResult = results.reduce((acc, val) => acc + val, 0);
        console.timeEnd("Total execution time");
        console.log(`Fibonacci number: ${finalResult}`);
      }
    }
  });

  assignTask(worker); // 最初のタスクを割り当て
}
