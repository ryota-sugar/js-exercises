// クラス記法
// 戦士クラス
export class Warrior_class {
  constructor(atk) {
    this.atk = atk;
  }

  attack() {
    return this.atk * 2;
  }
}

// 魔法戦士クラス（戦士を継承）
export class MagicWarrior_class extends Warrior_class {
  constructor(atk, mgc) {
    super(atk);
    this.mgc = mgc;
  }

  attack() {
    return super.attack() + this.mgc;
  }
}

// prototype記法

// 戦士のコンストラクタ関数
export function Warrior_proto(atk) {
  this.atk = atk;
}

// attackメソッドを定義する
Warrior_proto.prototype.attack = function () {
  return this.atk * 2;
};

// MagicWarriorのコンストラクタ関数
export function MagicWarrior_proto(atk, mgc) {
  Warrior_proto.call(this, atk); // 親のコンストラクタを呼ぶ。MagicWarriorのインスタンスにatkプロパティが追加される。
  this.mgc = mgc;
}

MagicWarrior_proto.prototype = Object.create(Warrior_proto.prototype);
// コンストラクタは継承したくないため、新しくconstructorプロパティを設定する。
MagicWarrior_proto.prototype.constructor = Warrior_proto;

// attackメソッドをオーバーライドする
MagicWarrior_proto.prototype.attack = function () {
  return Warrior_proto.prototype.attack.call(this) + this.mgc;
};
