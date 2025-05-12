import { getEvenObjects } from "./index.js";

describe("getEvenObjects", () => {
  it("should return an object with even values", () => {
    const input = { a: 1, b: 2, c: 3, d: 4 };
    const expectedOutput = { b: 2, d: 4 };
    expect(getEvenObjects(input)).toEqual(expectedOutput);
  });

  it("should return an empty object if no even values are present", () => {
    const input = { a: 1, b: 3, c: 5 };
    const expectedOutput = {};
    expect(getEvenObjects(input)).toEqual(expectedOutput);
  });

  it("should return an empty object if the input is empty", () => {
    const input = {};
    const expectedOutput = {};
    expect(getEvenObjects(input)).toEqual(expectedOutput);
  });
});
