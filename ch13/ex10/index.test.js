import { fetchSumOfFileSizes, fetchSumOfFileSizesAll } from "./index.js";
import { promisify } from "node:util";

const testDir = "./ch11/ex01";

describe("fetchSumOfFileSizesAll", () => {
  test("should return the same total size as the callback version", async () => {
    const expectedTotal = await promisify(fetchSumOfFileSizes)(testDir);
    const actualTotal = await promisify(fetchSumOfFileSizesAll)(testDir);

    expect(actualTotal).toBe(expectedTotal);
    expect(actualTotal).toBeGreaterThanOrEqual(0);
  });
});
