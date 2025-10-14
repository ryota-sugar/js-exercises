export function makeProxyAndLogs(obj) {
  //任意のオブジェクトを引数にとる
  const logs = [];
  const proxy = new Proxy(obj, {
    get(target, prop, receiver) {
      // Reflect.getで元のプロパティを取得(taget[prop])
      const value = Reflect.get(target, prop, receiver);
      if (typeof value === "function") {
        return function (...args) {
          logs.push({
            name: prop,
            args: args,
            timestamp: Date.now(),
          });
          return Reflect.apply(value, this, args); // thisのメソッドとしてvalue(関数)を呼び出す
        };
      }
      // 関数でなければそのまま返す
      return value;
    },
  });
  return [proxy, logs];
}
