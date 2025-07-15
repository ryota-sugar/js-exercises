import {
  Warrior_class,
  MagicWarrior_class,
  Warrior_proto,
  MagicWarrior_proto,
} from "./index.js";

describe("Warrior_class", () => {
  test("atkフィールドを持つ", () => {
    const w = new Warrior_class(10);
    expect(w.atk).toBe(10);
  });

  test("attackメソッドはatkの2倍を返す", () => {
    const w = new Warrior_class(7);
    expect(w.attack()).toBe(14);
  });
});

describe("MagicWarrior_class", () => {
  test("Warrior_classを継承している", () => {
    const mw = new MagicWarrior_class(5, 3);
    expect(mw instanceof MagicWarrior_class).toBe(true);
    expect(mw instanceof Warrior_class).toBe(true);
  });

  test("atkとmgcフィールドを持つ", () => {
    const mw = new MagicWarrior_class(8, 4);
    expect(mw.atk).toBe(8);
    expect(mw.mgc).toBe(4);
  });

  test("attackメソッドはatk*2+mgcを返す", () => {
    const mw = new MagicWarrior_class(6, 5);
    expect(mw.attack()).toBe(17); // 6*2+5=17
  });
});

describe("Warrior_proto", () => {
  test("atkフィールドを持つ", () => {
    const w = new Warrior_proto(10);
    expect(w.atk).toBe(10);
  });

  test("attackメソッドはatkの2倍を返す", () => {
    const w = new Warrior_proto(7);
    expect(w.attack()).toBe(14);
  });
});

describe("MagicWarrior_proto", () => {
  test("Warrior_protoを継承している", () => {
    const mw = new MagicWarrior_proto(5, 3);
    expect(mw instanceof MagicWarrior_proto).toBe(true);
    expect(mw instanceof Warrior_proto).toBe(true);
  });

  test("atkとmgcフィールドを持つ", () => {
    const mw = new MagicWarrior_proto(8, 4);
    expect(mw.atk).toBe(8);
    expect(mw.mgc).toBe(4);
  });

  test("attackメソッドはatk*2+mgcを返す", () => {
    const mw = new MagicWarrior_proto(6, 5);
    expect(mw.attack()).toBe(17); // 6*2+5=17
  });
});
