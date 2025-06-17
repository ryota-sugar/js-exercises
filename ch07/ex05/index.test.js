import { pop, push, shift, unshift, sort } from "./index";

describe("pop", () => {
  it("removes the last element and returns a new array", () => {
    const arr = [1, 2, 3];
    expect(pop(arr)).toEqual([1, 2]);
    expect(arr).toEqual([1, 2, 3]); // 元の配列は変更されない
  });
  it("returns empty array if input is empty", () => {
    expect(pop([])).toEqual([]);
  });
});

describe("push", () => {
  it("adds an element to the end and returns a new array", () => {
    const arr = [1, 2, 3];
    expect(push(arr, 4)).toEqual([1, 2, 3, 4]);
    expect(arr).toEqual([1, 2, 3]);
  });
});

describe("shift", () => {
  it("removes the first element and returns a new array", () => {
    const arr = [1, 2, 3];
    expect(shift(arr)).toEqual([2, 3]);
    expect(arr).toEqual([1, 2, 3]);
  });
  it("returns empty array if input is empty", () => {
    expect(shift([])).toEqual([]);
  });
});

describe("unshift", () => {
  it("adds an element to the start and returns a new array", () => {
    const arr = [1, 2, 3];
    expect(unshift(arr, 0)).toEqual([0, 1, 2, 3]);
    expect(arr).toEqual([1, 2, 3]);
  });
});

describe("sort", () => {
  it("sorts array in ascending order", () => {
    const arr = [3, 1, 2];
    expect(sort(arr, (a, b) => a - b)).toEqual([1, 2, 3]);
    expect(arr).toEqual([3, 1, 2]);
  });
  it("sorts array in descending order", () => {
    const arr = [3, 1, 2];
    expect(sort(arr, (a, b) => b - a)).toEqual([3, 2, 1]);
    expect(arr).toEqual([3, 1, 2]);
  });
});
