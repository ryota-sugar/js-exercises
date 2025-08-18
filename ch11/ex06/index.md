### メールアドレスに一般的に使うと良いとされる正規表現

```
/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
```

が良いとされている。これはHTMLの標準仕様を定めるWHATWGの正規表現(http://html.spec.whatwg.org/multipage/input.html#email-state-(type=email))となっており、各ブラウザのデフォルトの`<input type="email" />`のバリデーションと一致するというメリットがある。

正規表現の意味としては、

```
^[a-zA-Z0-9.!#$%&'*+\/=?^_{|}~-]+`
```

localPartの英数字と一部記号を1文字以上許可

```
[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?
```

英数字で始まり、英数字またはハイフンを最大63文字まで許可し、英数字で終わる

```
(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*
```

ドットで区切られた追加のドメインラベルを0回以上許可

である。

参考文献: https://zenn.dev/igz0/articles/email-validation-regex-best-practices
