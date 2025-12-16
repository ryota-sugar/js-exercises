// 50 x 50 の盤面とする
const ROWS = 50;
const COLS = 50;
// 1セルのサイズ
const RESOLUTION = 10;

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame が返す ID
let animationId = null;

// NOTE: download from https://soundeffect-lab.info/sound/button/mp3/decision1.mp3
const sound = new Audio("/ch15.4-10/ex10/decision1.mp3");

// ライフゲームのセル (true or false) をランダムに初期化する
let grid = new Array(ROWS)
  .fill(null)
  .map(() =>
    new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2))
  );

// grid を canvas に描画する
function renderGrid(grid) {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = grid[row][col];
      ctx.beginPath();
      ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
      ctx.fillStyle = cell ? "black" : "white";
      ctx.fill();
      ctx.stroke();
    }
  }
}

// 対象のセルに対して周囲のセルの生存数をカウントする関数
function countAliveNeighbors(grid, row, col) {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue; // 自分自身はカウントなし
      // セルがグリッドの境界の場合を考慮
      const targetRow = row + i;
      const targetCol = col + j;
      if (
        targetRow >= 0 &&
        targetRow < ROWS &&
        targetCol >= 0 &&
        targetCol < COLS
      ) {
        if (grid[targetRow][targetCol]) {
          count++;
        }
      }
    }
  }
  return count;
}

// Life Game のルールに従ってセルを更新する
function updateGrid(grid) {
  // 新しいグリッドを作成
  const nextGrid = grid.map((arr) => [...arr]);

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      // 周囲のセルの生存数を数えて nextGrid[row][col] に true or false を設定する (実装してね)
      const aliveNeighbors = countAliveNeighbors(grid, row, col);
      // ライフゲームのルール適用
      if (grid[row][col]) {
        // 現在のセルが生きている場合
        // 隣接する生存セルが1個以下または4個以上の場合、死ぬ
        if (aliveNeighbors < 2 || aliveNeighbors > 3) {
          nextGrid[row][col] = false;
        }
      } else {
        // 現在のセルが死んでいる場合
        if (aliveNeighbors === 3) {
          nextGrid[row][col] = true; // 誕生する
        }
      }
    }
  }
  return nextGrid;
}

// canvas がクリックされたときの処理 (セルの値を反転する)
canvas.addEventListener("click", function (evt) {
  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

  const row = Math.floor(pos.y / RESOLUTION);
  const col = Math.floor(pos.x / RESOLUTION);
  grid[row][col] = !grid[row][col];
  sound.cloneNode().play();
  renderGrid(grid);
});

// requestAnimationFrame によって一定間隔で更新・描画を行う
// TODO: リフレッシュレートの高い画面では速く実行されてしまうため、以下を参考に更新頻度が常に一定となるようにしなさい
// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame

// 更新速度を100msに設定
const UPDATE_INTERVAL = 100;
// 最後に更新した時間を保持する変数
let lastUpdateTime = 0;

// requestAnimationFrame のコールバック関数として第一引数にtimestampを渡す
function update(timeStamp) {
  // 最初の呼び出し時に lastUpdateTime を初期化
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
  renderGrid(grid);
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

renderGrid(grid);

const gliderGunButton = document.querySelector("#gliderGun");
gliderGunButton.addEventListener("click", () => {
  const gunPattern = [
    [1, 5],
    [1, 6],
    [2, 5],
    [2, 6],
    [11, 5],
    [11, 6],
    [11, 7],
    [12, 4],
    [12, 8],
    [13, 3],
    [14, 3],
    [15, 6],
    [16, 4],
    [17, 5],
    [17, 6],
    [17, 7],
    [18, 6],
    [16, 8],
    [13, 9],
    [14, 9],
    [21, 3],
    [22, 3],
    [21, 4],
    [22, 4],
    [21, 5],
    [22, 5],
    [23, 2],
    [23, 6],
    [25, 1],
    [25, 2],
    [25, 6],
    [25, 7],
    [35, 3],
    [36, 3],
    [35, 4],
    [36, 4],
  ];

  // グリッドを全て白紙にする
  const newGrid = new Array(ROWS)
    .fill(null)
    .map(() => new Array(COLS).fill(false));

  // グライダー銃のパターンをセットする
  gunPattern.forEach(([col, row]) => {
    newGrid[col][row] = true; // 軸取り間違えた
  });

  grid = newGrid;
  renderGrid(grid);
});
