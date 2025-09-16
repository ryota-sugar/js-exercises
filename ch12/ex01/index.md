`index.js`に対して以下の操作を実行した結果

## 明示的にイテレータプロトコルの next() を呼び出す

以下の実行コードを追加し、実行した。

```
const iterNext = counterIter(2);
console.log(iterNext.next());
console.log(iterNext.next());
console.log(iterNext.next());

const genNext = counterGen(2);
console.log(genNext.next());
console.log(genNext.next());
console.log(genNext.next());
```

### 実行結果

```
counterIter
counterIter: next
{ value: 1, done: false }
counterIter: next
{ value: 2, done: false }
counterIter: next
{ value: undefined, done: true }

counterGen
counterGen: next
{ value: 1, done: false }
counterGen: next
{ value: 2, done: false }
counterGen: finally
{ value: undefined, done: true }
```

### 動作の説明

#### イテレータメソッドについて

まず、イテレータメソッドを呼び出してイテレータオブジェクトを生成する。この時関数の中身は実行されるため、`console.log("counterIter");`も出力される。

イテレータオブジェクトには`next()`メソッドを保持しているため、`next()`メソッドを呼ぶことで、`next()`中の処理を実行できる。
max値までは`done`は`false`だが、max値を超えると、`done`が`true`として返ってくる。

#### ジェネレータメソッドについて

まず、ジェネレータ関数を呼び出してジェネレータオブジェクトを生成する。この時は関数本体は実行されないため、`console.log("counterGen");`も出力されない。

次に`next()`メソッドを呼ぶことで、ようやく関数の中身の`yield`文まで実行される。
`yield`する値がなくなった時に`done`が`true`となるため、finallyよりも後に`done: true`が出力されている。

## 明示的にイテレータプロトコルの return() を呼び出す

以下の実行コードを追加し、実行した。

```
const iterReturn = counterIter(2);
console.log(iterReturn.return(1000));

const genReturn = counterGen(2);
console.log(genReturn.return(2000));
```

### 実行結果

```
counterIter
counterIter: return: 1000
{ value: 1000, done: true }

{ value: 2000, done: true }
```

### 動作の説明

#### イテレータメソッドについて

まず、イテレータメソッドを呼び出してイテレータオブジェクトを生成する。この時関数の中身は実行されるため、`console.log("counterIter");`も出力される。

イテレータオブジェクトには`return()`メソッドを保持しているため、`return()`メソッドを呼ぶことで、`return()`中の処理を実行できる。
よって、中のlogが出力され、`done: true`が返ってくる。

#### ジェネレータメソッドについて

ジェネレータ関数に対して`return()`を呼ぶと、`{ value: 2000, done: true }`のみが返ってくる。

これはジェネレータの実行が即座に終了して`value`と`done`のみを返すようになっている。

## 明示的にイテレータプロトコルの throw() を呼び出す

以下の実行コードを追加し、実行した。

```
const iterThrow = counterIter(2);
iterThrow.throw(new Error("iterThrow error"));

const genThrow = counterGen(2);
genThrow.throw(new Error("genThrow error"));
```

### 実行結果

```
counterIter
counterIter: throw: Error: iterThrow error
    at file:///Users/ryota_sato/js-exercises/ch12/ex01/index.js:60:17
    at ModuleJob.run (node:internal/modules/esm/module_job:234:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:473:24)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:122:5)
node:internal/modules/run_main:128
    triggerUncaughtException(
    ^

Error: iterThrow error
    at file:///Users/ryota_sato/js-exercises/ch12/ex01/index.js:60:17
    at ModuleJob.run (node:internal/modules/esm/module_job:234:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:473:24)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:122:5)

Node.js v20.18.1


file:///Users/ryota_sato/js-exercises/ch12/ex01/index.js:62
genThrow.throw(new Error("genThrow error"));
               ^

Error: genThrow error
    at file:///Users/ryota_sato/js-exercises/ch12/ex01/index.js:62:16
    at ModuleJob.run (node:internal/modules/esm/module_job:234:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:473:24)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:122:5)

Node.js v20.18.1
```

### 動作の説明

#### イテレータメソッドについて

イテレータオブジェクトの`throw()`を呼び出すと、イテレータ内部でcatch節に入り、例外処理が実行される。
`counterIter`の`throw()`メソッド内でエラー内容をログ出力し、そのまま例外を再スローしているため、プログラムが停止する。

#### ジェネレータメソッドについて

ジェネレータの`throw()`メソッドが呼び出される。ただ、`next()`が一度も呼ばれていないため、ジェネレータ関数は実行を開始していない。この状態で`throw()`を呼び出すと、ジェネレータ内部の`try catch`が有効にならない。結果として、例外はそのまま呼び出し元に投げられ、プログラムが停止する。

## for-of ループを実行

以下の実行コードを追加し、実行した。

```
for (const c of counterIter(2)) {
  console.log(c);
}

for (const g of counterGen(2)) {
  console.log(g);
}
```

### 実行結果

```
counterIter
counterIter: Symbol.iterator
counterIter: next
1
counterIter: next
2
counterIter: next
counterGen
counterGen: next
1
counterGen: next
2
counterGen: finally
```

### 動作の説明

#### イテレータメソッドについて

まずイテレータの[Symbol.iterator]()メソッドを呼び出す。その後、ループの各反復処理で`next()`メソッドを呼び出し`done: true`が返されるまで実行し続ける。

#### ジェネレータメソッドについて

各反復処理でジェネレータの`next()`を暗黙的に呼び出す。これにより、ジェネレータ関数の実行が再開されて、yieldに到達するまで進む。すべてのyieldが完了すると、関数の最後までいき、finallyブロックが実行される。

## for-of ループを実行途中で break

以下の実行コードを追加し、実行した。

```
for (const c of counterIter(2)) {
  console.log(c);
  break;
}

for (const g of counterGen(2)) {
  console.log(g);
  break;
}
```

### 実行結果

```
counterIter
counterIter: Symbol.iterator
counterIter: next
1
counterIter: return: undefined

counterGen
counterGen: next
1
counterGen: finally
```

### 動作の説明

#### イテレータメソッドについて

ループが`break`で中断されると、イテレータの`return()`メソッドが呼び出され、終了する。

#### ジェネレータメソッドについて

`break`によって、ジェネレータの`return()`メソッドが暗黙的に呼び出される。ジェネレータの実行が終了して、`finally`ブロックが実行される。

## for-of ループを実行中に例外発生

以下の実行コードを追加し、実行した。

```
try {
  for (const c of counterIter(2)) {
    console.log(c);
    throw new Error("iter for-of loop error");
  }
} catch (e) {
  console.log(e);
}

try {
  for (const g of counterGen(2)) {
    console.log(g);
    throw new Error("gen for-of loop error");
  }
} catch (e) {
  console.log(e);
}
```

### 実行結果

```
counterIter
counterIter: Symbol.iterator
counterIter: next
1
counterIter: return: undefined
Error: iter for-of loop error
    at file:///Users/ryota_sato/js-exercises/ch12/ex01/index.js:83:15
    at ModuleJob.run (node:internal/modules/esm/module_job:234:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:473:24)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:122:5)


counterGen
counterGen: next
1
counterGen: finally
Error: gen for-of loop error
    at file:///Users/ryota_sato/js-exercises/ch12/ex01/index.js:92:15
    at ModuleJob.run (node:internal/modules/esm/module_job:234:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:473:24)
    at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:122:5)
```

### 動作の説明

#### イテレータメソッドについて

ループ内で例外が発生すると、ループは中断されて、イテレータの`return()`メソッドが呼び出される。`try catch` でその例外が捕捉されている。

#### ジェネレータメソッドについて

ループ内で例外が発生すると、ジェネレータの `throw()`メソッドが暗黙的に呼び出される。これにより、ジェネレータは終了処理を実行し、`finally`ブロックが実行される。ジェネレータ内の `catch`は実行されずに、例外は外部の`try catch`で捕捉されている。
