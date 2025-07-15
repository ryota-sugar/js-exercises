export function instanceOf(obj, constructor) {
  // nullまたはオブジェクトでない場合は false を返す
  if (obj == null || typeof obj !== "object") return false;

  // objの内部プロトタイプを取得
  let proto = Object.getPrototypeOf(obj);
  // プロトタイプチェーンをたどり、constructor.prototypeと一致するか確認
  while (proto) {
    if (proto === constructor.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}
