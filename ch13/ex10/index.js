import * as fs from "node:fs";
import * as fsPromises from "node:fs/promises";
import { join } from "node:path";

// テストのために元のコードもexport
export function fetchSumOfFileSizes(path, callback) {
  fs.readdir(path, (err, files) => {
    if (err) {
      callback(err);
      return;
    }

    let total = 0;
    const rest = [...files];

    function iter() {
      if (rest.length === 0) {
        callback(null, total);
        return;
      }

      const next = rest.pop();
      fs.stat(join(path, next), (err, stats) => {
        if (err) {
          callback(err);
          return;
        }
        total += stats.size;
        iter();
      });
    }
    iter();
  });
}

export async function fetchSumOfFileSizesAll(path, callback) {
  try {
    const files = await fsPromises.readdir(path);
    if (files.length === 0) {
      callback(null, 0);
      return;
    }

    // Promise.allで全てのstatを並列に実行
    const stats = await Promise.all(
      files.map((file) => fsPromises.stat(join(path, file)))
    );

    const total = stats.reduce((sum, stat) => sum + stat.size, 0);
    callback(null, total);
  } catch (err) {
    callback(err);
  }
}
