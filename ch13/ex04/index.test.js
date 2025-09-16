import {
  fetchFirstFileSize,
  fetchFirstFileSizePromise,
  fetchSumOfFileSizes,
  fetchSumOfFileSizesPromise,
} from "./index.js";
import { promisify } from "node:util";

const testDir = "./ch11/ex01";

describe("Promise-based file fetchers with actual directory", () => {
  describe("fetchFirstFileSizePromise", () => {
    test("should return the same file size as the callback version", async () => {
      const expectedSize = await promisify(fetchFirstFileSize)(testDir);
      const actualSize = await promisify(fetchFirstFileSizePromise)(testDir);

      expect(actualSize).toBe(expectedSize);
      expect(actualSize).toBeGreaterThan(0);
    });
  });
  describe("fetchSumOfFileSizesPromise", () => {
    test("should return the same total size as the callback version", async () => {
      const expectedTotalFromCallback =
        await promisify(fetchSumOfFileSizes)(testDir);

      const actualTotal = await promisify(fetchSumOfFileSizesPromise)(testDir);

      expect(actualTotal).toBe(expectedTotalFromCallback);
    });
  });
});
