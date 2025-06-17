let o: any = {};
o.x = 1;
let p = Object.create(o);
p.y = 2;
let q = Object.create(p);
q.z = 3;
let f = q.toString();
q.x + q.y;

console.log(o.isPrototypeOf(p) && o.isPrototypeOf(q)); // true
console.log(p.isPrototypeOf(q)); // true

// 継承関係の確認

const targets = {
  Object: Object.prototype,
  Array: Array.prototype,
  Date: Date.prototype,
  Map: Map.prototype,
};

const instances = {
  Object: new Object(),
  Array: new Array(),
  Date: new Date(),
  Map: new Map(),
};

type Key = keyof typeof targets;

for (const key1 of Object.keys(targets) as Key[]) {
  for (const key2 of Object.keys(instances) as Key[]) {
    if (key1 !== key2) {
      const proto = targets[key1];
      const instance = instances[key2];

      const result = proto.isPrototypeOf(instance);
      console.log(
        `${key1}が${key2}のプロトタイプチェーン上にいるか: ${result}`
      );
    }
  }
}

// ObjectがArrayのプロトタイプチェーン上にいるか: true
// ObjectがDateのプロトタイプチェーン上にいるか: true
// ObjectがMapのプロトタイプチェーン上にいるか: true
// ArrayがObjectのプロトタイプチェーン上にいるか: false
// ArrayがDateのプロトタイプチェーン上にいるか: false
// ArrayがMapのプロトタイプチェーン上にいるか: false
// DateがObjectのプロトタイプチェーン上にいるか: false
// DateがArrayのプロトタイプチェーン上にいるか: false
// DateがMapのプロトタイプチェーン上にいるか: false
// MapがObjectのプロトタイプチェーン上にいるか: false
// MapがArrayのプロトタイプチェーン上にいるか: false
// MapがDateのプロトタイプチェーン上にいるか: false
