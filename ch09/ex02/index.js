export class C {
  constructor() {
    this._x = 0;
  }
  get x() {
    return this._x++;
  }
}
