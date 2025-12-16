const canvas = document.getElementById("grid");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");

const ROWS = 50;
const COLS = 50;
const CELL_SIZE = 10; // 1セルのピクセルサイズ

const socket = new WebSocket("ws://localhost:3003");

socket.onopen = () => {
  console.log("WebSocket connection ok");
};

// メッセージを受信した時の処理
socket.onmessage = (message) => {
  const data = JSON.parse(message.data);
  if (data.type === "update") {
    // 更新の通知が来たらグリッドを描画
    updateGrid(data.grid);
  }
};

// グリッドを描画する関数
const updateGrid = (grid) => {
  // 画面をクリア
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (grid[row][col]) {
        // 生存セルは黒で塗りつぶす
        ctx.fillStyle = "black";
        ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      } else {
        // 死滅セルは灰色で枠線だけ描く
        ctx.strokeStyle = "gray";
        ctx.strokeRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }
  }
};

// キャンバスをクリックしたときの処理（セルの反転）
canvas.addEventListener("click", (event) => {
  // クリック位置を取得
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // 座標から行と列を計算
  const col = Math.floor(x / CELL_SIZE);
  const row = Math.floor(y / CELL_SIZE);

  // 範囲内であればserverにトグルメッセージを送信
  if (row >= 0 && row < ROWS && col >= 0 && col < COLS) {
    const message = {
      type: "toggle",
      row: row,
      col: col,
    };
    socket.send(JSON.stringify(message));
  }
});

// スタートボタンのクリック処理
startButton.addEventListener("click", () => {
  const message = {
    type: "start",
  };
  socket.send(JSON.stringify(message));
});

// ポーズボタンのクリック処理
pauseButton.addEventListener("click", () => {
  const message = {
    type: "pause",
  };
  socket.send(JSON.stringify(message));
});
