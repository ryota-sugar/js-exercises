import { readdir, promisifiedReaddir, stat, promisifiedStat } from "./index.js";

const testDir = "./ch11";

describe("fs Promise wrappers", () => {
  test("readdir returns all entries in ch11", async () => {
    const files = await readdir(testDir);
    expect(Array.isArray(files)).toBe(true);
    // ch11 ディレクトリの一部ファイル・ディレクトリ名が含まれていることを確認
    expect(files).toContain("ex01");
    expect(files).toContain("ex02");
    expect(files.length).toBeGreaterThan(0);
  });

  test("promisifiedReaddir returns all entries in ch11", async () => {
    const files = await promisifiedReaddir(testDir);
    expect(Array.isArray(files)).toBe(true);
    expect(files).toContain("ex01");
    expect(files).toContain("ex02");
    expect(files.length).toBeGreaterThan(0);
  });

  test("stat returns correct info for a directory", async () => {
    const stats = await stat(`${testDir}/ex01`);
    expect(stats.isDirectory()).toBe(true);
    expect(stats.isFile()).toBe(false);
  });

  test("stat returns correct info for a file", async () => {
    const stats = await stat(`${testDir}/ex01/index.js`);
    expect(stats.isFile()).toBe(true);
    expect(stats.isDirectory()).toBe(false);
    expect(typeof stats.size).toBe("number");
  });

  test("promisifiedStat returns correct info for a directory", async () => {
    const stats = await promisifiedStat(`${testDir}/ex02`);
    expect(stats.isDirectory()).toBe(true);
    expect(stats.isFile()).toBe(false);
  });

  test("promisifiedStat returns correct info for a file", async () => {
    const stats = await promisifiedStat(`${testDir}/ex02/index.js`);
    expect(stats.isFile()).toBe(true);
    expect(stats.isDirectory()).toBe(false);
    expect(typeof stats.size).toBe("number");
  });

  test("readdir with withFileTypes option returns Dirent objects", async () => {
    const files = await readdir(testDir, { withFileTypes: true });
    expect(files[0]).toHaveProperty("isDirectory");
    expect(typeof files[0].isDirectory).toBe("function");
  });

  test("promisifiedReaddir with withFileTypes option returns Dirent objects", async () => {
    const files = await promisifiedReaddir(testDir, { withFileTypes: true });
    expect(files[0]).toHaveProperty("isDirectory");
    expect(typeof files[0].isDirectory).toBe("function");
  });
});
