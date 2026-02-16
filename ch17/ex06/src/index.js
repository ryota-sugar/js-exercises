import { updateGrid } from "./updateGrid.js";
import { renderGrid } from "./renderGrid.js";
import { ROWS, COLS, RESOLUTION } from "./constants.js";

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame が返す ID
let animationId = null;

// NOTE: download from https://soundeffect-lab.info/sound/button/mp3/decision1.mp3
const sound = new Audio("src/decision1.mp3");

// ライフゲームのセル (true or false) をランダムに初期化する
let grid = new Array(ROWS)
  .fill(null)
  .map(() =>
    new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2)),
  );

// canvas がクリックされたときの処理 (セルの値を反転する)
canvas.addEventListener("click", function (evt) {
  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);
  grid[row][col] = !grid[row][col];
  sound.cloneNode().play();
  renderGrid(ctx, grid);
});

// requestAnimationFrame によって一定間隔で更新・描画を行う
// TODO: リフレッシュレートの高い画面では速く実行されてしまうため、以下を参考に更新頻度が常に一定となるようにしなさい
// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame

// 更新速度を100msに設定
const UPDATE_INTERVAL = 100;
// 最後に更新した時間を保持する変数
let lastUpdateTime = 0;

/**
 * requestAnimationFrame のコールバック関数として画面の更新を行う。
 * @param {number} timeStamp requestAnimationFrame から渡されるタイムスタンプ
 */
export function update(timeStamp) {
  // 最初の呼び出し時にlastUpdateTimeを初期化
  if (lastUpdateTime === 0) {
    lastUpdateTime = timeStamp;
  }
  // 経過時間を計算する
  const elapsed = timeStamp - lastUpdateTime;
  // UPDATE_INTERVAL 以上の時間が経過していれば、更新する
  if (elapsed > UPDATE_INTERVAL) {
    grid = updateGrid(grid);
    // 更新時刻を上書きする
    lastUpdateTime = timeStamp;
  }
  renderGrid(ctx, grid);
  animationId = requestAnimationFrame(update);
}

startButton.addEventListener("click", () => {
  // 既にアニメーションが動いている場合は何もしない
  if (animationId) {
    return;
  }
  animationId = requestAnimationFrame(update);
});

pauseButton.addEventListener("click", () => {
  // アニメーションが停止している場合は何もしない
  if (!animationId) {
    return;
  }
  cancelAnimationFrame(animationId);
  animationId = null;
});

renderGrid(ctx, grid);
