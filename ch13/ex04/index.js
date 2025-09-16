import * as fs from "node:fs";
import * as fsPromises from "node:fs/promises";
import { join } from "node:path";

// テストのために元のコードもexport
export function fetchFirstFileSize(path, callback) {
  fs.readdir(path, (err, files) => {
    if (err) {
      callback(err);
      return;
    }
    if (files.length === 0) {
      callback(null, null);
      return;
    }
    fs.stat(join(path, files[0]), (err, stats) => {
      if (err) {
        callback(err);
        return;
      }
      callback(null, stats.size);
    });
  });
}

// Promiseを使ったバージョン
export function fetchFirstFileSizePromise(path, callback) {
  fsPromises
    .readdir(path)
    .then((files) => {
      if (files.length === 0) {
        callback(null, null);
        return Promise.resolve(); // 終了を示すためにPromiseを返す
      }
      return fsPromises.stat(join(path, files[0]));
    })
    .then((stats) => {
      if (stats) {
        callback(null, stats.size);
      }
    })
    .catch((err) => {
      callback(err);
    });
}

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

// Promiseを使ったバージョン
export function fetchSumOfFileSizesPromise(path, callback) {
  fsPromises
    .readdir(path)
    .then((files) => {
      let total = 0;
      const rest = [...files];

      function iter() {
        if (rest.length === 0) {
          // もし全てのファイルのサイズを合計したら、callbackを呼ぶ
          callback(null, total);
          return Promise.resolve(); // 終了を示すためにPromiseを返す
        }
        const next = rest.pop();
        return fsPromises.stat(join(path, next)).then((stats) => {
          total += stats.size;
          return iter(); // 次のファイルを再起的に処理
        });
      }
      return iter();
    })
    .catch((err) => {
      callback(err);
    });
}
