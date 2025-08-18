/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./ch10/ex01/index.cjs":
/*!*****************************!*\
  !*** ./ch10/ex01/index.cjs ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("{const stats = __webpack_require__(/*! ./stats.cjs */ \"./ch10/ex01/stats.cjs\");\nconst BitSet = (__webpack_require__(/*! ./sets.cjs */ \"./ch10/ex01/sets.cjs\").BitSet);\n\nconst s = new BitSet(100);\ns.insert(10);\ns.insert(20);\ns.insert(30);\n// eslint-disable-next-line no-unused-vars\nconst average = stats.mean([...s]); // averagetは20。\n\n\n//# sourceURL=webpack://preset-js/./ch10/ex01/index.cjs?\n}");

/***/ }),

/***/ "./ch10/ex01/sets.cjs":
/*!****************************!*\
  !*** ./ch10/ex01/sets.cjs ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("{class AbstractSet {\n  // eslint-disable-next-line no-unused-vars\n  has(x) {\n    throw new Error(\"Abstract method\");\n  }\n}\n\n// eslint-disable-next-line no-unused-vars\nclass NotSet extends AbstractSet {\n  constructor(set) {\n    super();\n    this.set = set;\n  }\n  // 継承した抽象メソッドに対する実装。\n  has(x) {\n    return !this.set.has(x);\n  }\n  // また、ObjectのtoString()メソッドもオーバーライドする。\n  toString() {\n    return `{ x| x ∉ ${this.set.toString()} }`;\n  }\n}\n\n// eslint-disable-next-line no-unused-vars\nclass RangeSet extends AbstractSet {\n  constructor(from, to) {\n    super();\n    this.from = from;\n    this.to = to;\n  }\n  has(x) {\n    return x >= this.from && x <= this.to;\n  }\n  toString() {\n    return `{ x| ${this.from} ≤ x ≤ ${this.to} }`;\n  }\n}\n\nclass AbstractEnumerableSet extends AbstractSet {\n  get size() {\n    throw new Error(\"Abstract method\");\n  }\n  [Symbol.iterator]() {\n    throw new Error(\"Abstract method\");\n  }\n  isEmpty() {\n    return this.size === 0;\n  }\n  toString() {\n    return `{${Array.from(this).join(\", \")}}`;\n  }\n  equals(set) {\n    if (!(set instanceof AbstractEnumerableSet)) return false;\n    if (this.size !== set.size) return false;\n    for (const element of this) {\n      if (!set.has(element)) return false;\n    }\n    return true;\n  }\n}\n\n// eslint-disable-next-line no-unused-vars\nclass SingletonSet extends AbstractEnumerableSet {\n  constructor(member) {\n    super();\n    this.member = member;\n  }\n  has(x) {\n    return x === this.member;\n  }\n  get size() {\n    return 1;\n  }\n  *[Symbol.iterator]() {\n    yield this.member;\n  }\n}\n\nclass AbstractWritableSet extends AbstractEnumerableSet {\n  // eslint-disable-next-line no-unused-vars\n  insert(x) {\n    throw new Error(\"Abstract method\");\n  }\n  // eslint-disable-next-line no-unused-vars\n  remove(x) {\n    throw new Error(\"Abstract method\");\n  }\n  add(set) {\n    for (const element of set) {\n      this.insert(element);\n    }\n  }\n  subtract(set) {\n    for (const element of set) {\n      this.remove(element);\n    }\n  }\n  intersect(set) {\n    for (const element of this) {\n      if (!set.has(element)) {\n        this.remove(element);\n      }\n    }\n  }\n}\n\nexports.BitSet = class BitSet extends AbstractWritableSet {\n  constructor(max) {\n    super();\n    this.max = max;\n    this.n = 0;\n    this.numBytes = Math.floor(max / 8) + 1;\n    this.data = new Uint8Array(this.numBytes);\n  }\n\n  _valid(x) {\n    return Number.isInteger(x) && x >= 0 && x <= this.max;\n  }\n\n  _has(byte, bit) {\n    return (this.data[byte] & BitSet.bits[bit]) !== 0;\n  }\n\n  has(x) {\n    if (this._valid(x)) {\n      const byte = Math.floor(x / 8);\n      const bit = x % 8;\n      return this._has(byte, bit);\n    } else {\n      return false;\n    }\n  }\n\n  insert(x) {\n    if (this._valid(x)) {\n      const byte = Math.floor(x / 8);\n      const bit = x % 8;\n      if (!this._has(byte, bit)) {\n        this.data[byte] |= BitSet.bits[bit];\n        this.n++;\n      } else {\n        throw new TypeError(\"Invalid set element: \" + x);\n      }\n    }\n  }\n\n  remove(x) {\n    if (this._valid(x)) {\n      const byte = Math.floor(x / 8);\n      const bit = x % 8;\n      if (this._has(byte, bit)) {\n        this.data[byte] &= BitSet.masks[bit];\n        this.n--;\n      } else {\n        throw new TypeError(\"Invalid set element: \" + x);\n      }\n    }\n  }\n\n  get size() {\n    return this.n;\n  }\n\n  *[Symbol.iterator]() {\n    for (let i = 0; i <= this.max; i++) {\n      if (this.has(i)) {\n        yield i;\n      }\n    }\n  }\n};\n\nexports.BitSet.bits = new Uint8Array([1, 2, 4, 8, 16, 32, 64, 128]);\nexports.BitSet.masks = new Uint8Array([~1, ~2, ~4, ~8, ~16, ~32, ~64, ~128]);\n\n\n//# sourceURL=webpack://preset-js/./ch10/ex01/sets.cjs?\n}");

/***/ }),

/***/ "./ch10/ex01/stats.cjs":
/*!*****************************!*\
  !*** ./ch10/ex01/stats.cjs ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("{const sum = (x, y) => x + y;\nconst square = (x) => x * x;\n\nexports.mean = (data) => data.reduce(sum) / data.length;\nexports.stddev = function (d) {\n  const m = exports.mean(d);\n  return Math.sqrt(\n    d\n      .map((x) => x - m)\n      .map(square)\n      .reduce(sum) /\n      (d.length - 1)\n  );\n};\n\n\n//# sourceURL=webpack://preset-js/./ch10/ex01/stats.cjs?\n}");

/***/ })

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./ch10/ex01/index.cjs");
/******/ 	
/******/ })()
;