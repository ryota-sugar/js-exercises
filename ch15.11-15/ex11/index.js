/*
 * このクラスはキャンバスや画像のサブ矩形領域を表す。
 * Tileを使ってキャンバスを複数の領域に分割し、各領域を独立してWorkerで処理する。
 */
class Tile {
  constructor(x, y, width, height) {
    this.x = x; // Tileオブジェクトのプロパティは
    this.y = y; // 大きな矩形内での位置とサイズを
    this.width = width; // 表す。
    this.height = height;
  }

  // 指定された幅と高さの矩形を指定された行数・列数に分割し、numRows*numCols個のTileオブジェクトを生成する。
  static *tiles(width, height, numRows, numCols) {
    const columnWidth = Math.ceil(width / numCols);
    const rowHeight = Math.ceil(height / numRows);

    for (let row = 0; row < numRows; row++) {
      const tileHeight =
        row < numRows - 1
          ? rowHeight // 通常の行の高さ
          : height - rowHeight * (numRows - 1); // 最終行の高さ
      for (let col = 0; col < numCols; col++) {
        const tileWidth =
          col < numCols - 1
            ? columnWidth // 通常の列の幅
            : width - columnWidth * (numCols - 1); // 最終列の幅

        yield new Tile(
          col * columnWidth,
          row * rowHeight,
          tileWidth,
          tileHeight
        );
      }
    }
  }
}

/*
 * このクラスは同じコードを実行する複数のWorkerのプールを表す。
 * 指定したWorkerコードは、受け取った各メッセージに対して
 * 計算を行い、その結果を1つのメッセージで返す必要がある。
 *
 * WorkerPoolと処理内容を表すメッセージがあれば、addWork()を呼ぶだけでよい。
 * 現在アイドル状態のWorkerがいれば、すぐにメッセージを送信する。
 * アイドルWorkerがいなければ、メッセージはキューに入り、Workerが空き次第送信される。
 *
 * addWork()はPromiseを返す。PromiseはWorkerからの応答でresolveされる。
 * Workerが未処理のエラーを投げた場合はrejectされる。
 */
class WorkerPool {
  constructor(numWorkers, workerSource) {
    this.idleWorkers = []; // 現在作業していないWorker
    this.workQueue = []; // 未処理の作業
    this.workerMap = new Map(); // Workerとresolve/reject関数の対応表

    // 指定数のWorkerを生成し、メッセージ・エラーハンドラを設定し、idleWorkersに格納する。
    for (let i = 0; i < numWorkers; i++) {
      const worker = new Worker(workerSource);
      worker.onmessage = (message) => {
        this._workerDone(worker, null, message.data);
      };
      worker.onerror = (error) => {
        this._workerDone(worker, error, null);
      };
      this.idleWorkers[i] = worker;
    }
  }

  // Workerが作業を終えたとき（メッセージ送信またはエラー発生時）に呼ばれる内部メソッド。
  _workerDone(worker, error, response) {
    // Workerに対応するresolve/reject関数を取得し、対応表から削除する。
    const [resolver, rejector] = this.workerMap.get(worker);
    this.workerMap.delete(worker);

    // キューに作業がなければ、このWorkerをidleWorkersに戻す。
    // キューに作業があれば、次の作業をこのWorkerに割り当てる。
    if (this.workQueue.length === 0) {
      this.idleWorkers.push(worker);
    } else {
      const [work, resolver, rejector] = this.workQueue.shift();
      this.workerMap.set(worker, [resolver, rejector]);
      worker.postMessage(work);
    }

    // Workerに対応するPromiseをresolveまたはrejectする。
    error === null ? resolver(response) : rejector(error);
  }

  // Workerプールに作業を追加し、作業完了時にresolveされるPromiseを返す。
  // アイドルWorkerがいれば即時送信、いなければキューに追加する。
  addWork(work) {
    return new Promise((resolve, reject) => {
      if (this.idleWorkers.length > 0) {
        const worker = this.idleWorkers.pop();
        this.workerMap.set(worker, [resolve, reject]);
        worker.postMessage(work);
      } else {
        this.workQueue.push([work, resolve, reject]);
      }
    });
  }
}

/*
 * ヒルベルト曲線描画に必要な状態情報を保持する。
 * cx, cyは描画空間の中心座標を表す。
 * perPixelは1ピクセルあたりの座標幅を表す。
 * maxIterationsは色の循環周期として使う。
 * キャンバスサイズは状態に含まれない。cx, cy, perPixelから
 * 現在のキャンバスに収まる範囲を描画する。
 *
 * この型のオブジェクトはhistory.pushState()やURLのパラメータで利用する。
 */
class PageState {
  // 全体を表示する初期状態を返すファクトリメソッド。
  static initialState() {
    const s = new PageState();
    s.cx = 0.5; // ヒルベルト空間の中心(0.5, 0.5)
    s.cy = 0.5;
    const minDim = Math.min(window.innerWidth, window.innerHeight);
    s.perPixel = 1.0 / minDim;
    s.maxIterations = 5000; // 色の循環周期
    return s;
  }

  // URLから状態を復元するファクトリメソッド。失敗時はnullを返す。
  static fromURL(url) {
    const s = new PageState();
    const u = new URL(url); // URLの検索パラメータから状態を初期化する。
    s.cx = parseFloat(u.searchParams.get("hx"));
    s.cy = parseFloat(u.searchParams.get("hy"));
    s.perPixel = parseFloat(u.searchParams.get("pp"));
    s.maxIterations = parseInt(u.searchParams.get("it"));
    // 値がすべて有効ならPageStateを返し、そうでなければnullを返す。
    return isNaN(s.cx) ||
      isNaN(s.cy) ||
      isNaN(s.perPixel) ||
      isNaN(s.maxIterations)
      ? null
      : s;
  }

  // 現在の状態をURLの検索パラメータにエンコードする。
  toURL() {
    const u = new URL(window.location);
    u.searchParams.set("hx", this.cx);
    u.searchParams.set("hy", this.cy);
    u.searchParams.set("pp", this.perPixel);
    u.searchParams.set("it", this.maxIterations);
    return u.href;
  }
}

// 並列処理の設定。マシン性能に応じて調整可能。
const ROWS = 3,
  COLS = 4,
  NUMWORKERS = navigator.hardwareConcurrency || 2;

/*
 * このクラスがヒルベルト曲線描画プログラムの本体。
 * <canvas>要素を渡してコンストラクタを呼ぶだけで描画が始まる。
 * この<canvas>要素は常にウィンドウ全体に広がるようにスタイル設定されている必要がある。
 */
class MandelbrotCanvas {
  constructor(canvas) {
    // キャンバスとそのコンテキスト、WorkerPoolを初期化する。
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.workerPool = new WorkerPool(NUMWORKERS, "worker.js");

    // 後で使うプロパティを定義する。
    this.tiles = null; // キャンバスの分割領域
    this.pendingRender = null; // 現在描画中かどうか
    this.wantsRerender = false; // 再描画要求フラグ
    this.resizeTimer = null; // リサイズ頻度制御用タイマー
    this.colorTable = null; // ピクセル値→色変換用テーブル

    // イベントハンドラを設定する。
    this.canvas.addEventListener("pointerdown", (e) => this.handlePointer(e));
    window.addEventListener("keydown", (e) => this.handleKey(e));
    window.addEventListener("resize", (e) => this.handleResize(e));
    window.addEventListener("popstate", (e) => this.setState(e.state, false));

    // URLから状態を復元、または初期状態で開始する。
    this.state = PageState.fromURL(window.location) || PageState.initialState();

    // この状態をhistory APIで保存する。
    history.replaceState(this.state, "", this.state.toURL());

    // キャンバスサイズを設定し、分割タイルを生成する。
    this.setSize();

    // 描画を開始する。
    this.render();
  }

  // キャンバスサイズを設定し、Tileオブジェクトの配列を初期化する。
  // コンストラクタやリサイズ時に呼ばれる。
  setSize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.tiles = [...Tile.tiles(this.width, this.height, ROWS, COLS)];
  }

  // PageStateを変更し、再描画と履歴保存を行う。
  // 第一引数が関数ならstateを引数に呼び出す。オブジェクトならstateにプロパティをコピーする。
  // 第二引数がfalseなら履歴保存しない(popstateイベント時)
  setState(f, save = true) {
    if (typeof f === "function") {
      f(this.state);
    } else {
      for (const property in f) {
        this.state[property] = f[property];
      }
    }
    this.render();
    if (save) {
      history.pushState(this.state, "", this.state.toURL());
    }
  }

  // PageStateで指定された範囲をキャンバスに非同期で描画する。
  // コンストラクタ、setState、リサイズ時に呼ばれる。
  render() {
    // ユーザーが連続して描画要求を出した場合、最新状態だけを描画する。
    if (this.pendingRender) {
      this.wantsRerender = true;
      return;
    }

    // 状態変数を取得し、キャンバス左上の座標を計算する。
    const { cx, cy, perPixel, maxIterations } = this.state;
    const x0 = cx - (perPixel * this.width) / 2;
    const y0 = cy - (perPixel * this.height) / 2;

    // 各タイルごとにaddWork()でWorkerに処理を依頼し、Promise配列を作る。
    const promises = this.tiles.map((tile) =>
      this.workerPool.addWork({
        tile: tile,
        x0: x0 + tile.x * perPixel,
        y0: y0 + tile.y * perPixel,
        perPixel: perPixel,
        maxIterations: maxIterations,
      })
    );

    // Promise.all()で全タイルの計算結果を取得する。
    // 各応答にはTile, ImageData, min/max値が含まれる。
    this.pendingRender = Promise.all(promises)
      .then((responses) => {
        // 全タイルのmin/max値を集計し、色割り当てに使う。
        let min = maxIterations,
          max = 0;
        for (const r of responses) {
          if (r.min < min) min = r.min;
          if (r.max > max) max = r.max;
        }

        // カラーテーブルを生成する。
        if (!this.colorTable || this.colorTable.length !== maxIterations + 1) {
          this.colorTable = new Uint32Array(maxIterations + 1);
        }

        // 0からmaxIterationsまでの値を色にマッピングする。
        for (let i = 0; i <= maxIterations; i++) {
          // 0は黒
          if (i === 0) {
            this.colorTable[i] = 0xff000000; // 黒 (ABGR)
          } else {
            // 青〜水色のグラデーション
            const t = i / maxIterations;
            const r = 0;
            const g = Math.floor(t * 255);
            const b = Math.floor(128 + t * 127);
            this.colorTable[i] = (255 << 24) | (b << 16) | (g << 8) | r;
          }
        }

        // 各タイルのImageDataの値をカラーテーブルで色に変換する。
        for (const r of responses) {
          const iterations = new Uint32Array(r.imageData.data.buffer);
          for (let i = 0; i < iterations.length; i++) {
            iterations[i] = this.colorTable[iterations[i]];
          }
        }

        // 各タイルのImageDataをキャンバスに描画する。
        // pointerdownイベントで設定されたCSS transformを解除する。
        this.canvas.style.transform = "";
        for (const r of responses) {
          this.context.putImageData(r.imageData, r.tile.x, r.tile.y);
        }
      })
      .catch((reason) => {
        // いずれかのPromiseでエラーが発生した場合はここでログ出力する。
        console.error("Promise rejected in render():", reason);
      })
      .finally(() => {
        // 描画完了時にpendingRenderフラグをクリアする。
        this.pendingRender = null;
        // 描画中に再描画要求があれば、再度描画する。
        if (this.wantsRerender) {
          this.wantsRerender = false;
          this.render();
        }
      });
  }

  // ウィンドウリサイズ時に呼ばれる。200msごとに処理を遅延させる。
  handleResize() {
    if (this.resizeTimer) clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.resizeTimer = null;
      this.setSize();
      this.render();
    }, 200);
  }

  // キー入力時に呼ばれる。各キーに応じて状態を変更し、再描画する。
  handleKey(event) {
    switch (event.key) {
      case "Escape": // Escapeで初期状態に戻す
        this.setState(PageState.initialState());
        break;
      case "+": // +で色周期を増やす
        this.setState((s) => {
          s.maxIterations = Math.round(s.maxIterations * 1.5);
        });
        break;
      case "-": // -で色周期を減らす
        this.setState((s) => {
          s.maxIterations = Math.round(s.maxIterations / 1.5);
          if (s.maxIterations < 1) s.maxIterations = 1;
        });
        break;
      case "o": // oでズームアウト
        this.setState((s) => (s.perPixel *= 2));
        break;
      case "ArrowUp": // 上矢印で上にスクロール
        this.setState((s) => (s.cy -= (this.height / 10) * s.perPixel));
        break;
      case "ArrowDown": // 下矢印で下にスクロール
        this.setState((s) => (s.cy += (this.height / 10) * s.perPixel));
        break;
      case "ArrowLeft": // 左矢印で左にスクロール
        this.setState((s) => (s.cx -= (this.width / 10) * s.perPixel));
        break;
      case "ArrowRight": // 右矢印で右にスクロール
        this.setState((s) => (s.cx += (this.width / 10) * s.perPixel));
        break;
    }
  }

  // キャンバス上でpointerdownイベントが発生したときに呼ばれる。
  // クリックやドラッグによるズーム・パン操作を実現する。
  handlePointer(event) {
    // pointerdown時の座標と時刻を記録する。
    const x0 = event.clientX,
      y0 = event.clientY,
      t0 = Date.now();

    // pointermoveイベントのハンドラ
    const pointerMoveHandler = (event) => {
      // 移動量と経過時間を計算する。
      const dx = event.clientX - x0,
        dy = event.clientY - y0,
        dt = Date.now() - t0;

      // 十分に動いたか、長時間経過した場合はCSSでパン表示する。
      // pointerup時に本描画を行う。
      if (dx > 10 || dy > 10 || dt > 500) {
        this.canvas.style.transform = `translate(${dx}px, ${dy}px)`;
      }
    };

    // pointerupイベントのハンドラ
    const pointerUpHandler = (event) => {
      // ジェスチャ終了時にmove/upハンドラを解除する。
      this.canvas.removeEventListener("pointermove", pointerMoveHandler);
      this.canvas.removeEventListener("pointerup", pointerUpHandler);

      // 移動量と経過時間を計算する。
      const dx = event.clientX - x0,
        dy = event.clientY - y0,
        dt = Date.now() - t0;
      const { cx, cy, perPixel } = this.state;

      // 十分に動いたか長時間経過した場合はパン操作とみなす。
      // そうでなければクリック（ズームイン）とみなす。
      if (dx > 10 || dy > 10 || dt > 500) {
        // パン操作：座標をずらす
        this.setState({ cx: cx - dx * perPixel, cy: cy - dy * perPixel });
      } else {
        // クリック操作：中心を移動しズームイン
        const cdx = x0 - this.width / 2;
        const cdy = y0 - this.height / 2;

        // 一時的にCSSでズーム表示
        this.canvas.style.transform = `translate(${-cdx * 2}px, ${-cdy * 2}px) scale(2)`;

        // 新しい中心座標とズーム倍率を設定する。
        this.setState((s) => {
          s.cx += cdx * s.perPixel;
          s.cy += cdy * s.perPixel;
          s.perPixel /= 2;
        });
      }
    };

    // ジェスチャ開始時にmove/upハンドラを登録する。
    this.canvas.addEventListener("pointermove", pointerMoveHandler);
    this.canvas.addEventListener("pointerup", pointerUpHandler);
  }
}

// 最後にキャンバスをセットアップする。
// このJavaScriptファイルは自己完結している。HTMLはこの<script>を1つ読み込むだけでよい。
const canvas = document.createElement("canvas"); // キャンバス要素を生成
document.body.append(canvas); // bodyに追加
document.body.style = "margin:0"; // bodyのマージンを0にする
canvas.style.width = "100%"; // キャンバスをbody幅いっぱいに広げる
canvas.style.height = "100%"; // キャンバスをbody高さいっぱいに広げる
new MandelbrotCanvas(canvas); // 描画を開始する
