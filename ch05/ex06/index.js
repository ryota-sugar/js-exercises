const tryCatchFinally = () => {
  try {
    console.log("try block");
    throw new Error("Error in try block");
  } catch (error) {
    console.log("catch block");
    console.error(error);
  } finally {
    console.log("finally block");
  }
};

tryCatchFinally();

// 出力:
// try block
// catch block
// Error: Error in try block
//     at tryCatchFinally (file:///Users/ryota_sato/js-exercises/ch05/ex06/index.js:4:11)
//     at file:///Users/ryota_sato/js-exercises/ch05/ex06/index.js:13:1
//     at ModuleJob.run (node:internal/modules/esm/module_job:193:25)
//     at async Promise.all (index 0)
//     at async ESMLoader.import (node:internal/modules/esm/loader:530:24)
//     at async loadESM (node:internal/process/esm_loader:91:5)
//     at async handleMainPromise (node:internal/modules/run_main:65:12)
// finally block
