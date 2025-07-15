export class C {
  // 静的メソッド C.method()
  static method() {
    return 1;
  }
  // インスタンスメソッド new C().method()
  method() {
    return 2;
  }

  // クラスCの静的プロパティCにクラスを代入
  static C = class {
    // 静的メソッド C.C.method()
    static method() {
      return 3;
    }
    // インスタンスメソッド new C.C().method()
    method() {
      return 4;
    }
  };

  // クラスCのインスタンスプロパティC(getter)でクラスを返す(戻り値はクラス)
  // newC().C()で呼び出してクラスを返しているため、new new C().C()でインスタンスを生成できる
  get C() {
    return class {
      // 静的メソッド new C().C.method()
      static method() {
        return 5;
      }
      // インスタンスメソッド new new C().C().method()
      method() {
        return 6;
      }
    };
  }
}
