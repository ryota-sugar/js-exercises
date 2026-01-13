import crypto from "crypto";
// ここを埋める
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 鍵を生成する
function generateKey() {
  // 32バイトの暗号論的疑似乱数を生成する
  // ここを埋める
  return crypto.randomBytes(32);
}

// 平文を鍵とAES-256-CBCで暗号化する。次に、暗号文と初期化ベクトル(IV)を、Base64エンコードして返す。
function encrypt64(text, key) {
  // 16バイトの暗号論的疑似乱数を初期化ベクトル (IV) とする
  // ここを埋める
  const iv = crypto.randomBytes(16);

  // 暗号化とBase64エンコード
  // ここを埋める
  // 鍵と初期化ベクトルを元に暗号機を作成
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  // データを暗号化 出力形式はbase64
  let encrypted = cipher.update(text, "utf8", "base64");
  // 最終ブロックを処理して残ったデータを出し切る
  encrypted += cipher.final("base64");
  const encryptedBase64 = encrypted;

  // 暗号文とIVをbase64で返す
  return {
    value: encryptedBase64,
    iv: iv.toString("base64"),
  };
}

// generateKeyの返り値を、JSON形式でファイルに保存する(非同期)
async function writeKey(key) {
  // ここを埋める（fs.promisesで鍵を保存）
  try {
    // 鍵をBufferからBase64文字列に変換
    const data = { key: key.toString("base64") };
    await fs.promises.writeFile(
      path.resolve(__dirname, "key.json"),
      JSON.stringify(data)
    );
  } catch (err) {
    console.error("Error writing key to file:", err);
  }
}

// encrypt64の返り値を、JSON形式でファイルに保存する(非同期)
async function writeEncrypt64(data) {
  // ここを埋める（fs.promisesで暗号データを保存）
  try {
    await fs.promises.writeFile(
      path.resolve(__dirname, "encrypt64.json"),
      JSON.stringify(data)
    );
  } catch (err) {
    console.error("Error writing encrypted data to file:", err);
  }
}

async function readKey() {
  // ここを埋める（return Promise<鍵>）
  try {
    const data = await fs.promises.readFile(
      path.resolve(__dirname, "key.json"),
      "utf8"
    );
    const parsed = JSON.parse(data);
    // Base64文字列をBufferに変換して返す
    return Buffer.from(parsed.key, "base64");
  } catch (err) {
    console.error("Error reading key from file:", err);
  }
}

// ファイルから暗号データを読み込む (非同期)
async function readEncrypt64() {
  // ここを埋める（return Promise<data>）
  try {
    const data = await fs.promises.readFile(
      path.resolve(__dirname, "encrypt64.json"),
      "utf8"
    );
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading encrypted data from file:", err);
  }
}

// 復号して平文を返す
function decrypt64(data, key) {
  // ここを埋める
  try {
    const iv = Buffer.from(data.iv, "base64");

    // 復号とBase64デコード
    // 鍵と初期化ベクトルを元に復号機を作成
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    // データを復号 出力形式はutf8
    let decrypted = decipher.update(data.value, "base64", "utf8");
    // 最終ブロックを処理して残ったデータを出し切る
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (err) {
    console.error("Error during decryption:", err);
  }
}

// 指定の平文を暗号化とBase64エンコードし、後に復号する一連の処理
(async () => {
  // 平文
  const text = "Hello, World!";

  // 暗号化とBase64エンコード
  const key = generateKey();
  const encryptedData = encrypt64(text, key);

  // 鍵と暗号データをJSONで保存
  await writeKey(key);
  await writeEncrypt64(encryptedData);

  console.log("Encrypted Text (Base64):", encryptedData.value);

  // Base64デコードと復号
  const storedKey = await readKey();
  const storedEncryptedData = await readEncrypt64();
  const decryptedText = decrypt64(storedEncryptedData, storedKey);

  console.log("Decrypted Text:", decryptedText);
})();
