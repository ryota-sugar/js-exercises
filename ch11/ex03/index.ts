export const littleEndianToBigEndian = (array: Uint32Array): Uint32Array => {
  const result = new Uint32Array(array.length);
  for (let i = 0; i < array.length; i++) {
    // 各要素をビッグエンディアンに変換
    result[i] =
      ((array[i] & 0x000000ff) << 24) | // 最下位のバイト(1番右の8ビット)を24ビット左にシフトして最上位にスライド
      ((array[i] & 0x0000ff00) << 8) | // 右から2番目のバイトを8ビット左にシフト
      ((array[i] & 0x00ff0000) >>> 8) | // 右から3番目のバイトを8ビット右に符号なしシフト
      ((array[i] & 0xff000000) >>> 24); // 最上位のバイト(1番左の8ビット)を24ビット右に符号なしシフトして最下位にスライド
  }
  return result;
};

// 上の関数と同じ処理になる
export const bigEndianToLittleEndian = (array: Uint32Array): Uint32Array => {
  const result = new Uint32Array(array.length);
  for (let i = 0; i < array.length; i++) {
    // 各要素をリトルエンディアンに変換
    result[i] =
      ((array[i] & 0x000000ff) << 24) | // 最下位のバイト(1番右の8ビット)を24ビット左にシフトして最上位にスライド
      ((array[i] & 0x0000ff00) << 8) | // 右から2番目のバイトを8ビット左にシフト
      ((array[i] & 0x00ff0000) >>> 8) | // 右から3番目のバイトを8ビット右に符号なしシフト
      ((array[i] & 0xff000000) >>> 24); // 最上位のバイト(1番左の8ビット)を24ビット右に符号なしシフトして最下位にスライド
  }
  return result;
};
