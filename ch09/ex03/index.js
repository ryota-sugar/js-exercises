export function PositiveNumber(x) {
  if (x <= 0) {
    throw new Error("require : x > 0");
  }
  let value = x; // プライベートな状態を保持(外部からは直接アクセスできない)

  return {
    getX() {
      return value; // プライベートな状態を取得
    },
    setX(newX) {
      if (newX <= 0) {
        throw new Error("require : x > 0");
      }
      value = newX; // プライベートな状態を更新
    },
  };
}
