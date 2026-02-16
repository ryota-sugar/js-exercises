import { ROWS, COLS, RESOLUTION } from "./constants.js";

/**
 * grid を canvas に描画する。
 * @param {CanvasRenderingContext2D} ctx 描画に使用するコンテキスト
 * @param {Array<Array<boolean>>} grid セルの状態を表す2次元配列
 */
export function renderGrid(ctx, grid) {
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
