export type PromiseFunction<T> = () => Promise<T>;

export const retryWithExponentialBackoff = async <T>(
  func: PromiseFunction<T>,
  maxRetry: number
) => {
  let retryCount = 0;
  while (true) {
    try {
      const result = await func();
      return result; // 成功した場合は結果を返す
    } catch (err) {
      if (retryCount >= maxRetry) {
        // 最大試行回数に達した場合はエラーをスロー
        throw err;
      }
      const waitTime = Math.pow(2, retryCount) * 1000; // 待ち時間を指数関数的に増やす
      await new Promise((resolve) => setTimeout(resolve, waitTime)); // 指定された時間待機後にresolveを返してwhile内を再試行
      retryCount++;
    }
  }
};
