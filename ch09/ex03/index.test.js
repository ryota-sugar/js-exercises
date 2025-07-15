import { PositiveNumber } from "./index.js";

test("PositiveNumber: 正の値のみ保持できる", () => {
  const p = PositiveNumber(10);
  expect(p.getX()).toBe(10);

  p.setX(5);
  expect(p.getX()).toBe(5);

  expect(() => p.setX(0)).toThrow("require : x > 0");
  expect(() => p.setX(-3)).toThrow("require : x > 0");
});

test("PositiveNumber: 初期値が0以下なら例外", () => {
  expect(() => PositiveNumber(0)).toThrow("require : x > 0");
  expect(() => PositiveNumber(-1)).toThrow("require : x > 0");
});

test("PositiveNumber: 外部から直接書き換えできない", () => {
  const p = PositiveNumber(7);
  p.value = -100;
  expect(p.getX()).toBe(7); // valueを書き換えても内部状態は変わらない
});
