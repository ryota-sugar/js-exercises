// 増加し続ける整数を生成する、カウンタのようなジェネレータ
// throwを使って例外処理を行うことで、カウンタをゼロに初期化する

export function* counterWithReset() {
  let count = 0;
  while (true) {
    try {
      yield count++;
    } catch {
      count = 0; // 例外が投げられたらカウンタをリセット
    }
  }
}
