const f = () => {
  undeclaredVariable = 1;
  console.log(undeclaredVariable);
};

f();
// 出力結果
// file:///Users/ryota_sato/js-exercises/ch05/ex12/strict.js:2
//   undeclaredVariable = 1;
//                      ^

// ReferenceError: undeclaredVariable is not defined
//     at f (file:///Users/ryota_sato/js-exercises/ch05/ex12/strict.js:2:22)
//     at file:///Users/ryota_sato/js-exercises/ch05/ex12/strict.js:6:1
//     at ModuleJob.run (node:internal/modules/esm/module_job:193:25)
//     at async Promise.all (index 0)
//     at async ESMLoader.import (node:internal/modules/esm/loader:530:24)
//     at async loadESM (node:internal/process/esm_loader:91:5)
//     at async handleMainPromise (node:internal/modules/run_main:65:12)

// Node.js v18.12.0
