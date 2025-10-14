// nav要素内のリンク(<a>)
console.log(document.querySelectorAll("nav a"));

// 商品リスト(.product-list)内の最初の商品(.product-item)
console.log(document.querySelector(".product-list .product-item"));

// カートアイコンの画像(<img>)
console.log(document.querySelector(".cart img"));

// 商品リスト(.product-list)内の価格(.price)を表示する要素
console.log(document.querySelectorAll(".product-list .price"));

// 商品リスト(.product-list)内の全ての商品(.product-item)の画像(<img>)
console.log(document.querySelectorAll(".product-list .product-item img"));

// 検索バー(.search-bar)内の検索ボタン(<button>)
console.log(document.querySelector(".search-bar button"));

// フッター(footer)内のパラグラフ(<p>)要素
console.log(document.querySelector("footer p"));

// 商品リスト(.product-list)内の偶数番目の商品(.product-item)
console.log(
  document.querySelectorAll(".product-list .product-item:nth-child(even)")
);

// ヘッダー(header)内のアカウントリンク(.account)の画像(<img>)
console.log(document.querySelector(".account img"));

// ナビゲーションリンクのうち、"会社情報"のリンク
console.log(document.querySelector('nav a[href="#about"]'));
