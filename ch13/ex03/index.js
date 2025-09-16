import * as fs from "node:fs";
import { promisify } from "node:util";

// Promiseのreaddir
export function readdir(path, options) {
  return new Promise((resolve, reject) => {
    //fs.readdir(path, options, callback)
    fs.readdir(path, options, (err, files) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(files);
    });
  });
}

// promisifyのreaddir
export const promisifiedReaddir = promisify(fs.readdir);

// Promiseのstat(ファイルやディレクトリの情報を取得)
export function stat(path, options) {
  return new Promise((resolve, reject) => {
    //fs.stat(path, options, callback)
    fs.stat(path, options, (err, stats) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(stats);
    });
  });
}

// promisifyのstat
export const promisifiedStat = promisify(fs.stat);
