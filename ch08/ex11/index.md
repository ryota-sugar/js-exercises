### 作成したコード

```
// 自作関数
const myMax = (array) => {
  return array.reduce((acc, cur) => {
    return acc > cur ? acc : cur;
  }, -Infinity);
};
// 自作関数を出力
console.log(myMax.toString());
// 組み込み関数を出力
console.log(Math.max.toString());
```

### 出力結果

```
(array) => {
    return array.reduce((acc, cur) => {
        return acc > cur ? acc : cur;
    }, -Infinity);
}
function max() { [native code] }
```

自作関数では関数のソースコード全体が出力されるのに対し、組み込み関数では、[native code]として出力されることが確認できた。
