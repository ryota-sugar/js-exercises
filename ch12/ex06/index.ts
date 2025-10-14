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
    const files = fs.readdirSync(rootPath); //そのディレクトリに含まれるすべてのファイルやサブディレクトリの名前を読み取る
    for (const file of files) {
      const fullPath = `${rootPath}/${file}`; //環境によってはパスの区切り文字が異なるため注意(path.joinを使うのが無難) path.join(rootPath, file)
      yield* walk(fullPath); // 再帰的にwalkを呼び出し、結果を返す(walk(fullPath)がyieldする値をすべてyieldする)
    }
  }
}

// 修正後コード
// export function* walk(rootPath: string): IterableIterator<YieldProps> {
//   const stats = fs.lstatSync(rootPath); // lstatSyncでシンボリックリンク等も判定
//   const isDirectory = stats.isDirectory();
//   const isFile = stats.isFile();

//   // 通常ファイルかディレクトリのみyield
//   if (isDirectory || isFile) {
//     yield { path: rootPath, isDirectory };
//   } else {
//     // シンボリックリンク、ブロックデバイスは無視
//     return;
//   }

//   if (isDirectory) {
//     const files = fs.readdirSync(rootPath);
//     for (const file of files) {
//       const fullPath = path.join(rootPath, file);
//       yield* walk(fullPath);
//     }
//   }
// }
