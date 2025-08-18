import { TypeMap } from "./index.js";

class Foo {}
class Bar {}

describe("TypeMap", () => {
  test.each([
    // Mapインターフェース・プリミティブ値
    {
      name: "String: set/get with primitive",
      action: () => {
        const tm = new TypeMap();
        tm.set(String, "abc");
        return tm.get(String);
      },
      expected: "abc",
      throws: false,
    },
    {
      name: "String: set/get with String object",
      action: () => {
        const tm = new TypeMap();
        tm.set(String, new String("abc"));
        return tm.get(String);
      },
      expected: new String("abc"),
      throws: false,
      isInstanceOf: String,
    },
    {
      name: "Number: set/get with primitive",
      action: () => {
        const tm = new TypeMap();
        tm.set(Number, 123);
        return tm.get(Number);
      },
      expected: 123,
      throws: false,
    },
    {
      name: "Number: set/get with Number object",
      action: () => {
        const tm = new TypeMap();
        tm.set(Number, new Number(456));
        return tm.get(Number);
      },
      expected: new Number(456),
      throws: false,
      isInstanceOf: Number,
    },
    {
      name: "Boolean: set/get with primitive",
      action: () => {
        const tm = new TypeMap();
        tm.set(Boolean, false);
        return tm.get(Boolean);
      },
      expected: false,
      throws: false,
    },
    {
      name: "Boolean: set/get with Boolean object",
      action: () => {
        const tm = new TypeMap();
        tm.set(Boolean, new Boolean(true));
        return tm.get(Boolean);
      },
      expected: new Boolean(true),
      throws: false,
      isInstanceOf: Boolean,
    },
    // クラスインスタンス
    {
      name: "Custom class: set/get",
      action: () => {
        const tm = new TypeMap();
        const foo = new Foo();
        tm.set(Foo, foo);
        return tm.get(Foo);
      },
      expected: Foo,
      throws: false,
      isInstanceOf: Foo,
    },
    // 型不一致エラー
    {
      name: "Error: set(Date, 'not a date')",
      action: () => {
        const tm = new TypeMap();
        tm.set(Date, "not a date");
      },
      expected: "Value must be an instance of Date",
      throws: true,
    },
    {
      name: "Error: set(String, 123)",
      action: () => {
        const tm = new TypeMap();
        tm.set(String, 123);
      },
      expected: "Value must be a string or String object",
      throws: true,
    },
    {
      name: "Error: set(Foo, new Bar())",
      action: () => {
        const tm = new TypeMap();
        tm.set(Foo, new Bar());
      },
      expected: "Value must be an instance of Foo",
      throws: true,
    },
    {
      name: "Error: set({}, 'value')",
      action: () => {
        const tm = new TypeMap();
        tm.set({}, "value");
      },
      expected: "Key must be a constructor function",
      throws: true,
    },
  ])("$name", ({ action, expected, throws, isInstanceOf }) => {
    if (throws) {
      expect(action).toThrow(expected);
    } else if (isInstanceOf) {
      const result = action();
      expect(result).toBeInstanceOf(isInstanceOf);
    } else {
      expect(action()).toEqual(expected);
    }
  });
});
