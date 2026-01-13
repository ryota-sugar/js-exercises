import { checkEntry } from "./index.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("checkEntry", () => {
  test("returns 'file' for a  file", async () => {
    const filePath = path.resolve(__dirname, "test.txt");
    const result = await checkEntry(filePath);
    expect(result).toBe("file");
  });

  test("returns 'directory' for a directory", async () => {
    const dirPath = path.resolve(__dirname, "testDirectory");
    const result = await checkEntry(dirPath);
    expect(result).toBe("directory");
  });

  test("throws error when path does not exist", async () => {
    const nonExistentPath = path.join(__dirname, "file-does-not-exist");
    await expect(checkEntry(nonExistentPath)).rejects.toThrow();
  });
});
