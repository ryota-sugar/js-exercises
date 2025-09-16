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

export async function fetchFirstFileSizeAsync(path, callback) {
  try {
    const files = await fsPromises.readdir(path);
    if (files.length === 0) {
      callback(null, null);
      return;
    }
    const stats = await fsPromises.stat(join(path, files[0]));
    callback(null, stats.size);
  } catch (err) {
    callback(err);
  }
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

export async function fetchSumOfFileSizesAsync(path, callback) {
  let total = 0;
  let rest;

  async function iter() {
    if (rest.length === 0) {
      callback(null, total);
      return;
    }
    const next = rest.pop();
    const stats = await fsPromises.stat(join(path, next));
    total += stats.size;
    await iter();
  }

  try {
    const files = await fsPromises.readdir(path);
    rest = [...files];
    await iter();
  } catch (err) {
    callback(err);
  }
}
