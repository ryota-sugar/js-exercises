import { instanceOf } from "./index.js";

class A {}
class B extends A {}
class C extends B {}
class X {}

describe("instanceOf", () => {
  test("多段継承：C → B → A", () => {
    const c = new C();
    // cはCのインスタンス。 Aは基底クラスのコンストラクタ
    expect(instanceOf(c, C)).toBe(true);
    expect(instanceOf(c, B)).toBe(true);
    expect(instanceOf(c, A)).toBe(true);
  });

  test("継承関係にないインスタンスとクラス", () => {
    const x = new X();
    expect(instanceOf(x, A)).toBe(false);
    expect(instanceOf(x, B)).toBe(false);
  });

  test("プリミティブ値はすべてfalse", () => {
    expect(instanceOf(42, Number)).toBe(false);
    expect(instanceOf("hello", String)).toBe(false);
    expect(instanceOf(null, Object)).toBe(false);
    expect(instanceOf(undefined, Object)).toBe(false);
  });

  test("直接のインスタンス", () => {
    const a = new A();
    expect(instanceOf(a, A)).toBe(true);
  });

  test("Object自体はObjectのインスタンス", () => {
    expect(instanceOf({}, Object)).toBe(true);
  });
});
