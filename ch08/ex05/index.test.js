import { sequenceToObject } from "./index.js";

describe("sequenceToObject", () => {
  it("key-valueペアを正しくオブジェクトに変換する", () => {
    expect(sequenceToObject("a", 1, "b", 2)).toEqual({ a: 1, b: 2 });
    expect(sequenceToObject("x", "y")).toEqual({ x: "y" });
  });

  it("同じkeyが複数回出た場合は後の値で上書きされる", () => {
    expect(sequenceToObject("a", 1, "a", 2)).toEqual({ a: 2 });
  });

  it("引数が空の場合はエラーになる", () => {
    expect(() => sequenceToObject()).toThrow("Invalid number of arguments");
  });

  it("引数が奇数個の場合はエラーになる", () => {
    expect(() => sequenceToObject("a", 1, "b")).toThrow(
      "Invalid number of arguments"
    );
  });

  it("keyが文字列でない場合はエラーになる", () => {
    expect(() => sequenceToObject(1, "a")).toThrow("Key must be a string");
    expect(() => sequenceToObject("a", 1, {}, 2)).toThrow(
      "Key must be a string"
    );
  });
});
