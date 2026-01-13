### 複数のTCPクライアント (net.Socket) でHTTPリクエストを送信せず同時に接続を維持した際、何接続で接続が確立できなくなるか確認し、確立できなかった理由を書きなさい

`client.js`を実行して再起的に接続を行い、TCPクライアントで同時に接続を維持した。

検証環境は、macOS Sequoia 15.6.1, Node.js v20.18.1である。
結果は、
`Connection failed at count 28513: getaddrinfo ENOTFOUND localhost`となり、28513接続で接続が確立できなくなった。

理由は、クライアント(テストスクリプト)がサーバーに接続するたびに消費する送信元ポート等のリソースが枯渇したためである。
具体的なエラー`getaddrinfo ENOTFOUND localhost`は、リソース不足により、新たな接続のためのlocalhostDNS名前解決を行うためのシステムコールすら実行できなくなったことを意味していると考えられる。
