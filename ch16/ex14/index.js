import threads from "worker_threads";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (threads.isMainThread) {
  console.log("Main Thread start");

  const inputFileName = process.argv[2];
  const outputFileName = process.argv[3];

  if (!inputFileName || !outputFileName) {
    console.error("enter input and output file path");
    process.exit(1);
  }

  const inputPath = path.resolve(__dirname, inputFileName);
  const outputPath = path.resolve(__dirname, outputFileName);

  (async () => {
    try {
      const image = sharp(inputPath); // sharpを使って画像を読み込む
      const { data: pixelData, info } = await image
        .ensureAlpha() // 4チャンネル(RGBA)の指定
        .raw() // 画像をpixelデータとして取得
        .toBuffer({ resolveWithObject: true }); // バイナリデータとして取得(画像データとinfoをオブジェクトで受け取る)

      const { width, height, channels } = info;
      console.log(`Image info: ${width}x${height}, Channels: ${channels}`);

      const worker = new threads.Worker(__filename);

      const processedDataPromise = new Promise((resolve, reject) => {
        worker.on("message", (message) => {
          resolve(message);
        });

        worker.on("error", (err) => {
          reject(err);
        });
      });

      // データを送信して処理開始
      worker.postMessage(
        { pixelData, info },
        { transferList: [pixelData.buffer] }
      );

      // 処理完了を待機
      const processedData = await processedDataPromise;

      console.log("Main Thread: Received processed data from Worker");

      try {
        await sharp(processedData, {
          raw: { width, height, channels },
        }).toFile(outputPath);
        console.log(`Saved to: ${outputPath}`);
      } catch (err) {
        console.error("Error:", err);
      }
    } catch (err) {
      console.error("Error:", err.message);
    }
  })();
} else {
  threads.parentPort.once("message", ({ pixelData, info }) => {
    try {
      const { width, height } = info;
      const data = pixelData;

      const outputData = applyGaussianFilter(width, height, data);

      // 結果をメインスレッドに送信
      threads.parentPort.postMessage(outputData, [outputData.buffer]);
    } catch (error) {
      console.error(error);
    }
  });
}

// ガウシアンフィルタ関数
function applyGaussianFilter(width, height, data) {
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
  const outputData = new Uint8ClampedArray(data.length);

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

  return outputData;
}
