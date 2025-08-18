// これから (N, K) と (K, M) の行列の乗算を行う (この値は色々変更して試すこと)
const [N, K, M] = [100, 200, 300];

// 配列版: (N, K) の行列を要素数 N * K の1次元配列で表現する ((i, j) は array[K * i + j] で参照)
const lhsA = Array(N * K)
  .fill(0.0)
  .map(() => Math.random());
const rhsA = Array(K * M) // (j, k) は array[M * j + k] で参照
  .fill(0.0)
  .map(() => Math.random());
const resultA = Array(N * M).fill(0.0); // (i, k) は array[M * i + k] で参照

function arrayMultiply() {
  resultA.fill(0.0);
  // 問題: ここで resultA に lhsA と rhsA の乗算結果を格納してね
  for (let i = 0; i < N; ++i) {
    // lhsAの行数
    for (let k = 0; k < M; ++k) {
      // rhsAの列数
      let sum = 0.0;
      for (let j = 0; j < K; ++j) {
        // lhsAの(i, j)要素 × rhsAの(j, k)要素を加算
        // lhsA[K * i + j]: (i, j)要素
        // rhsA[M * j + k]: (j, k)要素
        sum += lhsA[K * i + j] * rhsA[M * j + k];
      }
      resultA[M * i + k] = sum;
    }
  }
}

// 型付き配列版 (Float64Array 以外の型も試してみると良い)
const lhsB = new Float64Array(N * K).fill(0.0).map((_, i) => lhsA[i]);
const rhsB = new Float64Array(K * M).fill(0.0).map((_, i) => rhsA[i]);
const resultB = new Float64Array(N * M).fill(0.0);

function typedArrayMultiply() {
  resultB.fill(0.0);
  // 問題: ここで resultB に lhsB と rhsB の乗算結果を格納してね
  for (let i = 0; i < N; ++i) {
    // lhsBの行数
    for (let k = 0; k < M; ++k) {
      // rhsBの列数
      let sum = 0.0;
      for (let j = 0; j < K; ++j) {
        // lhsBの(i, j)要素 × rhsBの(j, k)要素を加算
        // lhsB[K * i + j]: (i, j)要素
        // rhsB[M * j + k]: (j, k)要素
        sum += lhsB[K * i + j] * rhsB[M * j + k];
      }
      resultB[M * i + k] = sum;
    }
  }
}

const TEST_TIMES = 100;
const TESTS = [arrayMultiply, typedArrayMultiply];
function test(fn) {
  let result;
  for (let i = 0; i < TEST_TIMES; ++i) {
    result = fn();
  }
  return result;
}

// warmup
for (let i = 0; i < TESTS.length; ++i) {
  test(TESTS[i]);
}

// 測定開始
for (let i = 0; i < TESTS.length; ++i) {
  const start = performance.now();
  test(TESTS[i]);
  const end = performance.now();
  console.log(`${TESTS[i].name}: ${end - start}`);
}
