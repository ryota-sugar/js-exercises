export const convertLfToCrLf = (str) => {
  str = str.replace(/\r\n/g, "\n");
  // エスケープシーケンスの\n(LF)を\r\n(CRLF)に変換する
  return str.replace(/\n/g, "\r\n");
};

export const convertCrLfToLf = (str) => {
  // エスケープシーケンスの\r\n(CRLF)を\n(LF)に変換する
  return str.replace(/\r\n/g, "\n");
};
