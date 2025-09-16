import { counterWithReset } from "./index";

test("counterWithReset increments and resets", () => {
  const it = counterWithReset(); // ジェネレータのイテレータオブジェクトを取得

  expect(it.next().value).toBe(0);
  expect(it.next().value).toBe(1);
  expect(it.next().value).toBe(2);

  it.throw(); // throwしてカウンタをリセットして0からスタート

  // 例外の後は次のyieldまで進むため、throw()の次に呼ばれるnext()は0ではなく1を返す
  expect(it.next().value).toBe(1);
  expect(it.next().value).toBe(2);
  expect(it.next().value).toBe(3);

  it.throw(); // 再度カウンタをリセット

  expect(it.next().value).toBe(1);
});
