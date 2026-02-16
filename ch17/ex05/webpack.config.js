import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: "production",

  entry: "./ex05/src/index.js",

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"), // 出力先ディレクトリ
  },
};
