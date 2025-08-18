import { retryWithExponentialBackoff, BooleanFunction } from "./index.ts";
import { describe, it, expect, jest } from "@jest/globals";

describe("retryWithExponentialBackoff", () => {
  jest.useFakeTimers();

  it("funcが最初にtrueを返したらcallback(true)が呼ばれる", () => {
    const func = jest.fn(() => true);
    const callback = jest.fn();
    retryWithExponentialBackoff(func, 3, callback);
    expect(func).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(true);
  });

  it("funcがfalseを返し続け、maxRetry回リトライ後にcallback(false)が呼ばれる", () => {
    const func = jest.fn(() => false);
    const callback = jest.fn();
    retryWithExponentialBackoff(func, 2, callback);

    // setTimeoutを進める
    jest.runAllTimers();

    expect(func).toHaveBeenCalledTimes(3); // 初回+2回リトライ
    expect(callback).toHaveBeenCalledWith(false);
  });

  it("途中でfuncがtrueを返したらcallback(true)が呼ばれる", () => {
    const func = jest
      .fn()
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true) as BooleanFunction;
    const callback = jest.fn();
    retryWithExponentialBackoff(func, 5, callback);

    jest.runAllTimers();

    expect(func).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenCalledWith(true);
  });
});
