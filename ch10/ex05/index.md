### Nodeのモジュール方式での名前変更に関して(問題10.3)

vsCodeで確認した。
関数`add`の名前をエディタのリファクタ機能(Rename Symbol)で変更したところ、以下のようになった。
これは同ファイルで定義した関数名は変更したがexportする名前は`add`に指定している(エクスポート名と実装名が分離されている)ため、import先でも変更せず`add`で参照できるようになっている。

```
module.exports = { add: add_changed, Calculator };
```

### ES6のモジュール方式での名前変更に関して(問題10.4)

#### デフォルトのエクスポート

クラス名を`Calculator_default`から`Calculator_default_changed`に変更したが、それ以外の箇所で変更はなかった。
デフォルトエクスポートの場合、インポート側はエクスポート元のクラス名や関数名に依存せず、任意の名前でインポートできるため、インポート側には影響がないためである。

#### 名前変更を伴うインポート

エクスポート元ファイル(`index.not_default.js`)で`add_not_default`から`add_not_default_changed`に変更したところ、
インポート先である`index.re_export.js`でのimport箇所が以下のように変更された。

```
export {
  add_not_default_changed as add_not_default,
  subtract_not_default,
} from "./index.not_default.js";
```

これは参照する名前が一致している必要があるため、エクスポート側で名前が変更されたことに伴ってエディタがインポート側の参照も自動で変更してくれたと考えられる。

#### 再エクスポート

再エスクポートファイルで、`add_not_default`から`add_not_default_changed`へ変更したところ、その箇所が
`add_not_default as add_not_default_changed`へ変更された。
そしてインポート先では、

```
import {
  add_not_default_changed as add,
  subtract_not_default as subtract,
  Calculator,
} from "./index.re_export.js";
```

とエディタが自動で変更してくれた。これも名前変更に伴うエクスポートと同様に、参照する名前が一致している必要があるためだと考えられる。
