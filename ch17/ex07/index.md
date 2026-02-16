### TypeScriptのトランスパイルは@babel/preset-typescriptやtscによって可能だが、それぞれの違いを調べなさい。

- `tsc`
  - 役割
    型チェック ＋ JavaScriptへの変換。

  - メリット:
    - 設定がシンプル（tsconfig.json だけで済む）。
    - 型定義ファイル (.d.ts) を生成できる（ライブラリ開発には必須）。
    - 型チェックと変換を一貫して行うため、整合性が高い。

  - デメリット:
    - Babelほど柔軟なプラグインシステムがない。
    - 古いブラウザ対応に手間がかかる。手動設定が必要になる。
    - ビルド速度が遅くなりやすい（型チェックを行うため）。

- `@babel/preset-typescript`
  - 役割:
    JavaScriptへの変換のみ（型チェックはしない）。

  - メリット:
    - エコシステムが巨大: React, Vue, Next.js などのフレームワークや、Webpack との相性が良い。
    - コンパイル速度が速い: 型チェックをスキップするため。
    - 高度なポリフィル: preset-env を使うことで、「ターゲットのブラウザに必要な機能だけ」を自動で追加できる。
    - カスタム変換: マクロや独自プラグインを使った高度なコード変換が可能。

  - デメリット:
    - 型チェック機能がない（別途 tsc --noEmit を実行する必要がある）。
    - .d.ts ファイルを作れない。
    - 設定ファイル（.babelrc や webpack.config.js）が複雑になりやすい。

参考: https://blog.logrocket.com/babel-vs-typescript-choosing-right-compiler-project/
