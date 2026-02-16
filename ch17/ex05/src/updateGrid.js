import { ROWS, COLS } from "./constants.js";

/**
 * Life Game のルールに従ってセルを更新する。
 * @param {Array<Array<boolean>>} grid 現在のセルの状態を表す2次元配列
 * @return {Array<Array<boolean>>} 更新後のセルの状態を表す2次元配列
 */
export function updateGrid(grid) {
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

/**
 * 対象のセルに対して周囲のセルの生存数をカウントする関数。
 * @param {Array<Array<boolean>>} grid 現在のセルの状態を表す2次元配列
 * @param {number} row 対象のセルの行インデックス
 * @param {number} col 対象のセルの列インデックス
 * @return {number} 周囲の生存セルの数
 */
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
