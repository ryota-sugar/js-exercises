test("obj is correctly serialized and mock is called", () => {
  const mock = jest.fn();

  const obj = {
    x: 0,
    y: 0,
    sum() {
      mock();
      return this.x + this.y;
    },
  };

  // ここに１行のコードを書く
  // prettier-ignore
  (obj as any).toJSON = function () { return { x: obj.x, y: obj.y, sum: obj.sum() };};

  obj.x = 1;
  obj.y = 2;

  expect(JSON.stringify(obj)).toBe(`{"x":1,"y":2,"sum":3}`);
  expect(mock).toHaveBeenCalled();
});
