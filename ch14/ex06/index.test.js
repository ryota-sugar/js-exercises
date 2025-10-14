import { makeProxyAndLogs } from "./index.js";

describe("makeProxyAndLogs", () => {
  test("proparty access and method call log", () => {
    const a = {
      p: 1,
      f: (x, y) => x + y,
    };

    const [proxy, logs] = makeProxyAndLogs(a);

    // 最初はログは空
    expect(logs).toEqual([]);

    // プロパティアクセスはログに記録されない
    expect(proxy.p).toBe(1);
    expect(logs).toEqual([]);

    // メソッド呼び出し
    expect(proxy.f(1, 2)).toBe(3);

    // メソッド呼び出しがログに記録される
    expect(logs.length).toBe(1);
    expect(logs[0].name).toBe("f");
    expect(logs[0].args).toEqual([1, 2]);
    expect(typeof logs[0].timestamp).toBe("number");
  });
});
