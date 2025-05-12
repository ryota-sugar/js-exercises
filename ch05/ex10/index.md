### console.logの出力結果

非strictモードで実行

```
{ a: 1, b: 2, obj: { a: 4, b: 4 } }
{ a: 4, b: 2, obj: { b: 4 } }
{ a: 1, b: 2, obj: { a: 2 } }
{ a: 2, b: 2, obj: {} }
```

### with文を使わずに同じ処理を書く場合にどのような文になるか

```
{
  let a = 1;
  let b = 2;
  let obj = { a: 3, b: 4 };
  obj.a = obj.b;
  console.log({ a, b, obj });
}
{
  let a = 1;
  let b = 2;
  let obj = { b: 4 };
  a = obj.b;
  console.log({ a, b, obj });
}
{
  let a = 1;
  let b = 2;
  let obj = { a: 3 };
  obj.a = b;
  console.log({ a, b, obj });
}
{
  let a = 1;
  let b = 2;
  let obj = {};
  console.log({ a, b, obj });
}
```
