/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./ex06/src/constants.js"
/*!*******************************!*\
  !*** ./ex06/src/constants.js ***!
  \*******************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   COLS: () => (/* binding */ COLS),
/* harmony export */   RESOLUTION: () => (/* binding */ RESOLUTION),
/* harmony export */   ROWS: () => (/* binding */ ROWS)
/* harmony export */ });
const ROWS = 50;
const COLS = 50;
const RESOLUTION = 10;


/***/ },

/***/ "./ex06/src/renderGrid.js"
/*!********************************!*\
  !*** ./ex06/src/renderGrid.js ***!
  \********************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderGrid: () => (/* binding */ renderGrid)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./ex06/src/constants.js");


/**
 * grid を canvas に描画する。
 * @param {CanvasRenderingContext2D} ctx 描画に使用するコンテキスト
 * @param {Array<Array<boolean>>} grid セルの状態を表す2次元配列
 */
function renderGrid(ctx, grid) {
  for (let row = 0; row < _constants_js__WEBPACK_IMPORTED_MODULE_0__.ROWS; row++) {
    for (let col = 0; col < _constants_js__WEBPACK_IMPORTED_MODULE_0__.COLS; col++) {
      const cell = grid[row][col];
      ctx.beginPath();
      ctx.rect(col * _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION, row * _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION, _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION, _constants_js__WEBPACK_IMPORTED_MODULE_0__.RESOLUTION);
      ctx.fillStyle = cell ? "black" : "white";
      ctx.fill();
      ctx.stroke();
    }
  }
}


/***/ },

/***/ "./ex06/src/updateGrid.js"
/*!********************************!*\
  !*** ./ex06/src/updateGrid.js ***!
  \********************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateGrid: () => (/* binding */ updateGrid)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./ex06/src/constants.js");


/**
 * Life Game のルールに従ってセルを更新する。
 * @param {Array<Array<boolean>>} grid 現在のセルの状態を表す2次元配列
 * @return {Array<Array<boolean>>} 更新後のセルの状態を表す2次元配列
 */
function updateGrid(grid) {
  // 新しいグリッドを作成
  const nextGrid = grid.map((arr) => [...arr]);

  for (let row = 0; row < _constants_js__WEBPACK_IMPORTED_MODULE_0__.ROWS; row++) {
    for (let col = 0; col < _constants_js__WEBPACK_IMPORTED_MODULE_0__.COLS; col++) {
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
        targetRow < _constants_js__WEBPACK_IMPORTED_MODULE_0__.ROWS &&
        targetCol >= 0 &&
        targetCol < _constants_js__WEBPACK_IMPORTED_MODULE_0__.COLS
      ) {
        if (grid[targetRow][targetCol]) {
          count++;
        }
      }
    }
  }
  return count;
}


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./ex06/src/index.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   update: () => (/* binding */ update)
/* harmony export */ });
/* harmony import */ var _updateGrid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateGrid.js */ "./ex06/src/updateGrid.js");
/* harmony import */ var _renderGrid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderGrid.js */ "./ex06/src/renderGrid.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.js */ "./ex06/src/constants.js");




const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

canvas.width = _constants_js__WEBPACK_IMPORTED_MODULE_2__.ROWS * _constants_js__WEBPACK_IMPORTED_MODULE_2__.RESOLUTION;
canvas.height = _constants_js__WEBPACK_IMPORTED_MODULE_2__.COLS * _constants_js__WEBPACK_IMPORTED_MODULE_2__.RESOLUTION;

// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame が返す ID
let animationId = null;

// NOTE: download from https://soundeffect-lab.info/sound/button/mp3/decision1.mp3
const sound = new Audio("src/decision1.mp3");

// ライフゲームのセル (true or false) をランダムに初期化する
let grid = new Array(_constants_js__WEBPACK_IMPORTED_MODULE_2__.ROWS)
  .fill(null)
  .map(() =>
    new Array(_constants_js__WEBPACK_IMPORTED_MODULE_2__.COLS).fill(null).map(() => !!Math.floor(Math.random() * 2)),
  );

// canvas がクリックされたときの処理 (セルの値を反転する)
canvas.addEventListener("click", function (evt) {
  const rect = canvas.getBoundingClientRect();
  const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };

  const row = Math.floor(pos.y / _constants_js__WEBPACK_IMPORTED_MODULE_2__.RESOLUTION);
  const col = Math.floor(pos.x / _constants_js__WEBPACK_IMPORTED_MODULE_2__.RESOLUTION);
  grid[row][col] = !grid[row][col];
  sound.cloneNode().play();
  (0,_renderGrid_js__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(ctx, grid);
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
function update(timeStamp) {
  // 最初の呼び出し時にlastUpdateTimeを初期化
  if (lastUpdateTime === 0) {
    lastUpdateTime = timeStamp;
  }
  // 経過時間を計算する
  const elapsed = timeStamp - lastUpdateTime;
  // UPDATE_INTERVAL 以上の時間が経過していれば、更新する
  if (elapsed > UPDATE_INTERVAL) {
    grid = (0,_updateGrid_js__WEBPACK_IMPORTED_MODULE_0__.updateGrid)(grid);
    // 更新時刻を上書きする
    lastUpdateTime = timeStamp;
  }
  (0,_renderGrid_js__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(ctx, grid);
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

(0,_renderGrid_js__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(ctx, grid);

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map