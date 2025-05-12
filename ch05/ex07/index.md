```
function f() {
    try {
        return true;
    } finally {
        return false;
    }
}

console.log(f());
```

### 予想

`console.log(f())`の出力結果は`false`となる。

### 実行結果

出力結果は`false`となった。
これはtryブロックが、break文やcontinue文、return文など、どのような方法で処理を終了したかにかかわらず、finallyブロックのコードは必ず実行されることによる。
これにより、tryブロックで`return true`としていても、finallyで`false`が返され、最終的に`f()`の返り値は`false`になる。
