#### Node で debugger 文を使ってデバッグする方法

1. コード中に`debugger文`を記述する。一時停止してデバッグしたい位置に書く。

```
function f(o) {
    if (o === undefined) debugger;
    ・・・
}
```

2. Node.jsを`inspectモード`で実行する
   `node inspect example.js`のように`inspect`を追加することで、ターミナルにデバッガが起動し、debugger文のところで一時停止することができる。

3. インタラクティブにステップ実行する
   以下のコマンドを使用することでインタラクティブにデバッガを操作することができる。

- cont or c : 次のブレークポイントまで進む
- next or n : 次の行へ(関数の中には入らない)
- step or s : 次の行へ(関数の中にも入る)
- repl : JavaScriptのREPLに入る (Read-Eval-Print Loop（読み取り・評価・出力・ループ）)
  - Nodeのdebuggerモード中に`repl`と入力すると、一時的にプログラムの中に入り込んで、その時点の変数や関数を試せる REPLモードに入れる。
- quit : デバッガを終了する
