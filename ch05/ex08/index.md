```
let x = 0;

for(let i = 1; i <= 5; i++) {
    x = i;
    try {
        throw Error();
    } catch {
        break;
    } finally {
        continue;
    }
}

console.log(x);
```

### 予想

`finally`が最終的に実行されるため、continueとなり、Errorは出力されず最後にxに代入された`5`が出力される。

### 実行結果

予想の通り、`5`が出力された。
これはcatchの例外処理が行われた後最後にfinallyが実行され、`break`が`continue`に上書きされるためである。
これにより、`break`は無視され、`continue`によってループが次に進む。for文を抜けるまで実行され、最後に代入された`x = 5`が結果として出力される。
