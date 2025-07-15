export function addMyCall(f) {
  f.myCall = function (thisArg, ...args) {
    // bindでthisArgをバインドし、その関数に引数を渡して実行する
    return f.bind(thisArg)(...args);
  };
}
