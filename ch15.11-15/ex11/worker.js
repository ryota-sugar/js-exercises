onmessage = function (message) {
  const { tile, x0, y0, perPixel, maxIterations } = message.data;
  const { width, height } = tile;

  const imageData = new ImageData(width, height);
  const iterations = new Uint32Array(imageData.data.buffer);

  const N = 64;

  // (x, y) → d 変換 スタート位置からそのマスまでの距離を求める
  // (x, y) → グリッド座標
  function mapCoordinatesToDistance(gridSize, x, y) {
    let regionX, regionY; // ステップで4分割した領域のどこにいるか (0 or 1)
    let subSquareSize; // 現在注目している正方形の半分のサイズ
    let distance = 0;

    // 大きな領域から徐々に小さな領域へと絞り込んでいく
    for (subSquareSize = gridSize / 2; subSquareSize > 0; subSquareSize /= 2) {
      // ビット演算で領域を判定
      regionX = (x & subSquareSize) > 0 ? 1 : 0;
      regionY = (y & subSquareSize) > 0 ? 1 : 0;

      // 距離を加算
      distance += subSquareSize * subSquareSize * ((3 * regionX) ^ regionY);

      // ヒルベルト曲線の回転・反転処理
      if (regionY === 0) {
        if (regionX === 1) {
          x = gridSize - 1 - x;
          y = gridSize - 1 - y;
        }
        // xとyを交換 (回転)
        const temp = x;
        x = y;
        y = temp;
      }
    }
    return distance;
  }

  // 隣のマスがどこかを調べる関数
  function mapDistanceToCoordinates(gridSize, distance) {
    let regionX, regionY;
    let subSquareSize;
    let remainingDistance = distance;
    let x = 0;
    let y = 0;

    // 小さな領域から徐々に大きな領域へと座標を復元していく
    for (subSquareSize = 1; subSquareSize < gridSize; subSquareSize *= 2) {
      regionX = 1 & (remainingDistance / 2);
      regionY = 1 & (remainingDistance ^ regionX);

      // 回転・反転処理
      if (regionY === 0) {
        if (regionX === 1) {
          x = subSquareSize - 1 - x;
          y = subSquareSize - 1 - y;
        }
        const temp = x;
        x = y;
        y = temp;
      }

      x += subSquareSize * regionX;
      y += subSquareSize * regionY;
      remainingDistance /= 4;
    }
    return { x, y };
  }

  let index = 0,
    max = 0,
    min = maxIterations;

  // 線の太さ
  const thickness = 0.15;

  for (let row = 0, y = y0; row < height; row++, y += perPixel) {
    for (let column = 0, x = x0; column < width; column++, x += perPixel) {
      // グリッド座標 (ix, iy)
      const ix = Math.floor(x * N);
      const iy = Math.floor(y * N);

      // グリッド内での相対位置(0.0~1.0)
      // これを使って「マスの中心に近いか」などを判定します
      const fx = x * N - ix;
      const fy = y * N - iy;

      let val = 0;

      if (ix >= 0 && ix < N && iy >= 0 && iy < N) {
        // 現在の距離d
        const d = mapCoordinatesToDistance(N, ix, iy);

        // 前後のマスの座標を取得
        const prev = d > 0 ? mapDistanceToCoordinates(N, d - 1) : null;
        const next = d < N * N - 1 ? mapDistanceToCoordinates(N, d + 1) : null;

        // 描画するかどうかのフラグ
        let onLine = false;

        // マスの中心(0.5, 0.5)付近は常に描画(接続部)
        if (Math.abs(fx - 0.5) < thickness && Math.abs(fy - 0.5) < thickness) {
          onLine = true;
        }

        // 前のマスへの接続を描画
        if (prev) {
          // 左へ接続
          if (prev.x < ix && fx < 0.5 && Math.abs(fy - 0.5) < thickness)
            onLine = true;
          // 右へ接続
          if (prev.x > ix && fx > 0.5 && Math.abs(fy - 0.5) < thickness)
            onLine = true;
          // 上へ接続
          if (prev.y < iy && fy < 0.5 && Math.abs(fx - 0.5) < thickness)
            onLine = true;
          // 下へ接続
          if (prev.y > iy && fy > 0.5 && Math.abs(fx - 0.5) < thickness)
            onLine = true;
        }

        // 次のマスへの接続を描画
        if (next) {
          if (next.x < ix && fx < 0.5 && Math.abs(fy - 0.5) < thickness)
            onLine = true;
          if (next.x > ix && fx > 0.5 && Math.abs(fy - 0.5) < thickness)
            onLine = true;
          if (next.y < iy && fy < 0.5 && Math.abs(fx - 0.5) < thickness)
            onLine = true;
          if (next.y > iy && fy > 0.5 && Math.abs(fx - 0.5) < thickness)
            onLine = true;
        }

        if (onLine) {
          // 線の上なら色をつける
          val = d % maxIterations;
          if (val === 0) val = maxIterations; // 色落ち防止
        } else {
          // 線の上でなければ黒 (背景)
          val = 0;
        }
      } else {
        val = 0;
      }

      iterations[index++] = val;
      if (val > max) max = val;
      if (val < min && val !== 0) min = val;
    }
  }

  postMessage({ tile, imageData, min, max }, [imageData.data.buffer]);
};
