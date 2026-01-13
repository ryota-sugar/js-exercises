import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, "test.txt");

// fs.truncate() を使ってファイルを拡張 (今回特にコールバックはなし)
fs.truncate(filePath, 30, () => {});
