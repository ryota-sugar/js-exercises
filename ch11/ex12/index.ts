// ファイルのパスを引数に受けとる関数で、ファイルのサイズが許容サイズをオーバーしている場合に投げるエラー

class FileSizeExceededError extends Error {
  constructor(filePath: string, fileSize: number, maxSize: number) {
    super(
      `File size exceeded: ${filePath} is ${fileSize} bytes, but the maximum allowed size is ${maxSize} bytes.`
    );
    this.name = "FileSizeExceededError";
  }
}

export const checkFileSize = (
  filePath: string,
  fileSize: number,
  maxSize: number
): void => {
  if (fileSize > maxSize) {
    throw new FileSizeExceededError(filePath, fileSize, maxSize);
  }
};
