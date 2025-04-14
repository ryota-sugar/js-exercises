### 開発者ツール (Chrome の場合 F12) のコンソール上に何が表示されるか予想し、結果が一致するか確認しなさい。

予想:
```
ex02と同様に、`answer: 42`と`answer: 0`が出力される。
```
結果:
```
Object { answer: 0 }
Object { answer: 0 }
```

### 開発者ツールを開いた状態のタブで HTML を開く場合と、HTML を開いた状態のタブで開発者ツールを開く場合とで、結果を比較しなさい。

開発者ツールを開いた状態のタブで HTML を開く場合:
```
Object { answer: 42 }
Object { answer: 0 }
```

HTML を開いた状態のタブで開発者ツールを開く場合:
```
Object { answer: 0 }
Object { answer: 0 }
```
開発者ツールを開いた状態のタブで HTML を開くと、コンソールはオブジェクトの現在の状態を表示する。

HTML を開いた状態のタブで開発者ツールを開くと、コンソールはオブジェクトの最新の状態を表示する。(すでに変更された後の値が反映される)

### 常に期待した結果を得るためにはどのようにコードを修正すべきか答えなさい。

1つ目の出力で現在の状態を表示するために、数値を文字列に変換する。
変換した文字列は、`life.answer`の格納先ではなく、別のメモリに格納される。
そのため、`life.answer`の値が更新されたとしても、出力の参照先は異なるため、常に期待した結果を得られるようになる。


変更後コード:
```
<!DOCTYPE html>
<html>
  <body>
    <script>
      let life = { answer: 42 };
      console.log(JSON.stringify(life));
      life.answer = 0;
      console.log(JSON.stringify(life));
    </script>
  </body>
</html>
```