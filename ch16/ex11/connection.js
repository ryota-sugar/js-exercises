import net from "net";

const PORT = 8000;
const HOST = "localhost";
const connections = [];

let count = 0;

function connect() {
  const socket = net.connect(PORT, HOST);

  socket.on("connect", () => {
    count++;
    connections.push(socket);
    // ログを見やすいように100件ごとに表示
    if (count % 100 === 0) {
      console.log(`Connected: ${count}`);
    }
    // 次の接続をスケジュール (再帰的に呼び出して負荷をかける)
    setTimeout(connect, 1);
  });

  socket.on("error", (err) => {
    console.error(`Connection failed at count ${count}:`, err.message);
    process.exit(1);
  });

  // サーバーから切断された場合
  socket.on("close", () => {
    console.log("Connection closed");
  });
}

console.log("Starting connections...");
connect();
