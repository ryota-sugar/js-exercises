### 手順

- `npm install --save-dev eslint prettier eslint-config-google eslint-config-prettier`の実行で必要なパッケージをインストールし、Google JavaScript Style Guideに基づくESLintの設定ファイルを作成。

- `package.json`のscriptsにESLintとPrettierのスクリプトを追加。

```
"lint": "eslint .",
"format": "prettier --write .",
```

これにより、`npm run lint`でコードの静的解析、`npm run format`でコードの自動整形を可能にした。

- .eslintignoreファイルを作成し、ESLintの解析対象から除外するファイルやディレクトリを指定。
  - `format_sample.js`は自動整形の対象としないため、.eslintignoreに追加。
