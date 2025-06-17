import { bubbleSort } from "./index.ts";

describe("bubbleSort", () => {
  it("sorts an array of numbers in ascending order", () => {
    expect(bubbleSort([5, 3, 1, 4, 2])).toEqual([1, 2, 3, 4, 5]);
    expect(bubbleSort([1, 2, 3])).toEqual([1, 2, 3]);
    expect(bubbleSort([3, 2, 1])).toEqual([1, 2, 3]);
    expect(bubbleSort([2, 1])).toEqual([1, 2]);
    expect(bubbleSort([1])).toEqual([1]);
    expect(bubbleSort([])).toEqual([]);
  });

  it("sorts an array with duplicate values", () => {
    expect(bubbleSort([3, 1, 2, 1, 3])).toEqual([1, 1, 2, 3, 3]);
  });

  it("sorts an array with negative numbers", () => {
    expect(bubbleSort([0, -1, 5, -3, 2])).toEqual([-3, -1, 0, 2, 5]);
  });
});
