function f(input) {
  const f = new Function(`return "Hello, " + ${input}`);
  console.log(f());
}

f("return 'World!';");

// undefined:3
// return "Hello, " + return 'World!';
//                    ^^^^^^

// SyntaxError: Unexpected token 'return'
//     at new Function (<anonymous>)
//     at f (file:///Users/ryota_sato/js-exercises/ch08/ex13/index.js:2:15)
//     at file:///Users/ryota_sato/js-exercises/ch08/ex13/index.js:5:1
//     at ModuleJob.run (node:internal/modules/esm/module_job:234:25)
//     at async ModuleLoader.import (node:internal/modules/esm/loader:473:24)
//     at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:122:5)

// Node.js v20.18.1
