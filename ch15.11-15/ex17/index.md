野村證券の持ち株WEBサービス(https://www.e-plan.nomura.co.jp/login/index.html)サイトにアクセスした際のCORSの設定を調べた。

method: `GET`

Request Headers:

- Origin: `https://www.e-plan.nomura.co.jp`

Response Headers:

- Access-Control-Allow-Origin: `https://www.e-plan.nomura.co.jp`
- Access-Control-Allow-Credentials: `true`

OriginとAccess-Control-Allow-Originが一致しており、かつAccess-Control-Allow-Credentialsがtrueに設定されているため、ブラウザはこのレスポンスを許可するようになっていることを確認した。
