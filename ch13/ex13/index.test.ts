import { walk } from "./index.ts";

test("walk returns all files and directories recursively from ./ch11", async () => {
  const expected = [
    { path: "./ch11", isDirectory: true },
    { path: "./ch11/ex01", isDirectory: true },
    { path: "./ch11/ex01/index.js", isDirectory: false },
    { path: "./ch11/ex01/index.test.js", isDirectory: false },
    { path: "./ch11/ex02", isDirectory: true },
    { path: "./ch11/ex02/index.js", isDirectory: false },
    { path: "./ch11/ex02/index.test.js", isDirectory: false },
    { path: "./ch11/ex03", isDirectory: true },
    { path: "./ch11/ex03/index.test.ts", isDirectory: false },
    { path: "./ch11/ex03/index.ts", isDirectory: false },
    { path: "./ch11/ex04", isDirectory: true },
    { path: "./ch11/ex04/index.js", isDirectory: false },
    { path: "./ch11/ex04/index.md", isDirectory: false },
    { path: "./ch11/ex05", isDirectory: true },
    { path: "./ch11/ex05/index.test.js", isDirectory: false },
    { path: "./ch11/ex05/index.ts", isDirectory: false },
    { path: "./ch11/ex06", isDirectory: true },
    { path: "./ch11/ex06/index.md", isDirectory: false },
    { path: "./ch11/ex06/index.test.js", isDirectory: false },
    { path: "./ch11/ex06/index.ts", isDirectory: false },
    { path: "./ch11/ex07", isDirectory: true },
    { path: "./ch11/ex07/index.md", isDirectory: false },
    { path: "./ch11/ex08", isDirectory: true },
    { path: "./ch11/ex08/index.md", isDirectory: false },
    { path: "./ch11/ex10", isDirectory: true },
    { path: "./ch11/ex10/index.test.ts", isDirectory: false },
    { path: "./ch11/ex10/index.ts", isDirectory: false },
    { path: "./ch11/ex11", isDirectory: true },
    { path: "./ch11/ex11/index.js", isDirectory: false },
    { path: "./ch11/ex11/index.md", isDirectory: false },
    { path: "./ch11/ex12", isDirectory: true },
    { path: "./ch11/ex12/index.ts", isDirectory: false },
    { path: "./ch11/ex13", isDirectory: true },
    { path: "./ch11/ex13/index.js", isDirectory: false },
    { path: "./ch11/ex13/index.test.js", isDirectory: false },
    { path: "./ch11/ex14", isDirectory: true },
    { path: "./ch11/ex14/index.test.ts", isDirectory: false },
    { path: "./ch11/ex14/index.ts", isDirectory: false },
    { path: "./ch11/ex15", isDirectory: true },
    { path: "./ch11/ex15/index.test.ts", isDirectory: false },
    { path: "./ch11/ex15/index.ts", isDirectory: false },
    { path: "./ch11/ex16", isDirectory: true },
    { path: "./ch11/ex16/index.test.ts", isDirectory: false },
    { path: "./ch11/ex16/index.ts", isDirectory: false },
  ];

  const result: { path: string; isDirectory: boolean }[] = [];
  for await (const entry of walk("./ch11")) {
    result.push(entry);
  }

  expect(result).toEqual(expected);
});
