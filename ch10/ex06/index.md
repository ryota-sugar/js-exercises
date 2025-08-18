### 初めに

今回の実験では3つのファイルを作成した。

- file1.js
  - `"file1.js started"`を出力するファイル
- file2.js
  - `"file2.js started"`を出力するファイル
- index.js - 以下のコードを実行するファイル
  ```
  console.log("index.js started");

      import "./file1.js";
      import "./file2.js";

      console.log("index.js ended");

      import "./file1.js";
      import "./file2.js";

      ```

  複数回インポートを実行したり、インポートの前後にもlogを入れることでどのように処理が行われるのかを調べる。

### 予想

`index.js`を実行すると、import文は上に巻き上げられるため、先に実行されると考える。
そのため、以下のようなlogが出力されると予想する。

```
file1.js started
file2.js started
file1.js started
file2.js started
index.js started
index.js ended
```

### 実行結果

実行すると以下のような結果となった。

```
file1.js started
file2.js started
index.js started
index.js ended
```

インポートの処理を複数回記述しても実行されたのは1度のみであった。
これは2回目以降のインポートではキャッシュが使われるため、実行されなかったと考えられる。
また、インポート先のlogが先に呼び出し前のlogよりも先に出力されていることから、予想通りコンパイル時にimport文は上に巻き上げられたのだと考えられる。
