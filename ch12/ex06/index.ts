import fs from "fs";

interface YieldProps {
  path: string;
  isDirectory: boolean;
}

export function* walk(rootPath: string): IterableIterator<YieldProps> {
  const stats = fs.statSync(rootPath); // ファイルやディレクトリの情報を取得する
  const isDirectory = stats.isDirectory();
  yield { path: rootPath, isDirectory }; // 現在のパスとディレクトリ情報をyieldする

  if (isDirectory) {
    // ディレクトリの場合、再帰的に中身をふかぼっていく
    const files = fs.readdirSync(rootPath);
    for (const file of files) {
      const fullPath = `${rootPath}/${file}`;
      yield* walk(fullPath); // 再帰的にwalkを呼び出し、結果を返す(walk(fullPath)がyieldする値をすべてyieldする)
    }
  }
}
