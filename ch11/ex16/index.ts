export type BooleanFunction = () => boolean;
type callbackFunction = (success: boolean) => void;

export const retryWithExponentialBackoff = (
  func: BooleanFunction,
  maxRetry: number,
  callback: callbackFunction
) => {
  let retryCount = 0;
  const attempt = () => {
    const result = func();
    if (result) {
      // 成功した場合はcallbackを実行
      callback(true);
      return;
    } else {
      if (retryCount < maxRetry) {
        // 待ち時間を指数関数的に増やす
        const waitTime = Math.pow(2, retryCount) * 1000;
        retryCount++;

        // 指定された時間待機してから再試行
        setTimeout(() => {
          attempt();
        }, waitTime);
      } else {
        // 最大リトライ回数に達した場合はcallbackを実行
        callback(false);
      }
    }
  };
  // 最初の試行を開始
  attempt();
};
