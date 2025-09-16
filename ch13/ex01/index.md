### 予想

まず`setTimeout`の処理が走るが、1000ms以内に`longRunningFunction`の同期処理が実行されるため、その処理が終了するまでsetTimeoutの1000ms後の処理を実行することができない。
`while(true){}`は終了しないため、何も出力されないまま処理が終わらない状態となる。

### 実行結果

```
npm run start:ts ch13/ex01/index.js                                                                                                                       main ◼

> preset-js@1.0.0 start:ts
> node --no-warnings --loader ts-node/esm ch13/ex01/index.js

^C%
```

予想通り^Cで終了するまで処理が終わらず、何も出力がされなかった。

### 理由

タスクとは、複数のイベントを順番に実行させるためのコードのまとまりのことを指す。
while(true)の無限ループは一つのタスクとしてメインスレッドを占有してしまい、setTimeoutの1000ms後に追加されるコールバック関数が追加されるタスクキューがいつまでも呼ばれず、次のタスクが処理できなくなってしまうため。
そのため何も出力されない。
