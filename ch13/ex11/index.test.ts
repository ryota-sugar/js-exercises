import { retryWithExponentialBackoff } from "./index.ts";
import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";

describe("retryWithExponentialBackoff", () => {
  // すべてのテストで擬似タイマーを使用
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("funcが最初にresolveしたらその値でresolveされる", async () => {
    const func = jest.fn<() => Promise<boolean>>().mockResolvedValueOnce(true);
    const promise = retryWithExponentialBackoff(func, 3);

    // Promiseが解決するのを待つ
    await expect(promise).resolves.toBe(true);

    // 関数が1回だけ呼び出されたことを検証
    expect(func).toHaveBeenCalledTimes(1);
  });

  it("funcが失敗後にresolveしたら成功する", async () => {
    // 最初の2回は失敗し、3回目で成功するモック関数を作成
    const func = jest
      .fn<() => Promise<boolean>>()
      .mockRejectedValueOnce(new Error("fail 1"))
      .mockRejectedValueOnce(new Error("fail 2"))
      .mockResolvedValueOnce(true);

    const promise = retryWithExponentialBackoff(func, 3);

    // 待機時間を進める
    await jest.advanceTimersByTimeAsync(1000);
    await jest.advanceTimersByTimeAsync(2000);

    // Promiseが解決するのを待つ
    await expect(promise).resolves.toBe(true);

    // 関数が3回呼び出されたことを検証
    expect(func).toHaveBeenCalledTimes(3);
  });

  it("funcが失敗し続けた場合、maxRetry回でrejectされる", async () => {
    const func = jest
      .fn<() => Promise<boolean>>()
      .mockRejectedValue(new Error("fail"));

    const maxRetry = 2;
    const promise = retryWithExponentialBackoff(func, maxRetry);

    // Promiseの解決または拒否を待つためのアサーションを先に配置
    const assertion = expect(promise).rejects.toThrow("fail");

    // すべてのタイマーを強制的に実行し、内部の非同期処理を進める
    await jest.runAllTimersAsync();

    // アサーションが完了するのを待つ
    await assertion;

    // 最大試行回数（1回目 + maxRetry回）だけ呼び出されたことを検証
    expect(func).toHaveBeenCalledTimes(1 + maxRetry);
  });
});
