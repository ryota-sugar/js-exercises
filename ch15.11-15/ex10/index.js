const worker = new Worker("./imageProcessWorker.js");

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

    // workerからの結果を受け取る処理を設定
    worker.onmessage = (e) => {
      const outputData = e.data;
      // 受け取ったデータからImageDataを作成してCanvasに描画
      const outputImageData = new ImageData(outputData, img.width, img.height);
      filteredCtx.putImageData(outputImageData, 0, 0);
      console.log("workerから結果を受け取り、描画しました");
    };

    // workerに画像データを送信して処理を開始するメッセージを送る
    worker.postMessage({
      data: imageData.data,
      width: imageData.width,
      height: imageData.height,
    });
    console.log("workerに画像データを送信しました");
  });

  // ファイル読み込み開始
  reader.readAsDataURL(file);
});
