interface Polar {
  r: number; // 極座標の半径
  theta: number; // 極座標の角度（ラジアン）
  get x(): number; // x座標（getter）
  set x(value: number); // x座標（setter）
  get y(): number; // y座標（getter）
  set y(value: number); // y座標（setter）
}

// 極座標と直交座標を相互変換するオブジェクト
export const p: Polar = {
  r: 0,
  theta: 0,
  // x座標を取得（r * cos(theta)）
  get x() {
    return this.r * Math.cos(this.theta);
  },

  // x座標を設定するとrとthetaも更新される
  set x(value) {
    if (Number.isNaN(value)) {
      throw new TypeError("x must be a number");
    }
    const y = this.y;
    this.r = Math.hypot(value, y); // r = sqrt(x^2 + y^2)
    this.theta = Math.atan2(y, value); // theta = atan2(y, x)
  },

  // y座標を取得（r * sin(theta)）
  get y() {
    return this.r * Math.sin(this.theta);
  },

  // y座標を設定するとrとthetaも更新される
  set y(value) {
    if (Number.isNaN(value)) {
      throw new TypeError("y must be a number");
    }
    const x = this.x;
    this.r = Math.hypot(x, value); // r = sqrt(x^2 + y^2)
    this.theta = Math.atan2(value, x); // theta = atan2(y, x)
  },
};
