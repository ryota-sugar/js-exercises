document.getElementById("image").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const img = new Image();
  const reader = new FileReader();

  reader.addEventListener("load", (e) => {
    img.src = e.target.result;
  });

  img.addEventListener("load", () => {
    const originalCanvas = document.getElementById("original");
    const filteredCanvas = document.getElementById("filtered");
    const originalCtx = originalCanvas.getContext("2d");
    const filteredCtx = filteredCanvas.getContext("2d");

    // Canvasサイズを画像サイズに合わせる
    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    filteredCanvas.width = img.width;
    filteredCanvas.height = img.height;

    originalCtx.drawImage(img, 0, 0);

    // 画像のデータを取得する
    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;

    // 5×5ガウシアンフィルタの定義
    const kernel = [
      [1, 4, 7, 4, 1],
      [4, 16, 26, 16, 4],
      [7, 26, 41, 26, 7],
      [4, 16, 26, 16, 4],
      [1, 4, 7, 4, 1],
    ];
    const kernelSize = 5;
    const kernelSum = 273;

    // 出力用データ配列
    const outputData = new Uint8ClampedArray(imageData.data.length);

    // ガウシアンフィルタ処理
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let r = 0,
          g = 0,
          b = 0,
          a = 0;
        for (let ky = 0; ky < kernelSize; ky++) {
          for (let kx = 0; kx < kernelSize; kx++) {
            // 周囲のピクセルを参照
            const px = x + kx - 2;
            const py = y + ky - 2;
            const qx = Math.max(0, Math.min(width - 1, px));
            const qy = Math.max(0, Math.min(height - 1, py));
            const idx = (qy * width + qx) * 4;
            const kval = kernel[ky][kx];
            r += data[idx] * kval;
            g += data[idx + 1] * kval;
            b += data[idx + 2] * kval;
            a += data[idx + 3] * kval;
          }
        }
        // フィルタ結果を出力配列に格納
        const outIdx = (y * width + x) * 4;
        outputData[outIdx] = r / kernelSum;
        outputData[outIdx + 1] = g / kernelSum;
        outputData[outIdx + 2] = b / kernelSum;
        outputData[outIdx + 3] = a / kernelSum;
      }
    }

    // フィルタ後の画像データをCanvasに描画
    const outputImageData = new ImageData(outputData, img.width, img.height);
    filteredCtx.putImageData(outputImageData, 0, 0);
  });

  // ファイル読み込み開始
  reader.readAsDataURL(file);
});
