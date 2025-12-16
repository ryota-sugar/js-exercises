const sentRequest = (message) => {
  const socket = new WebSocket("ws://localhost:3003");
  // Promiseを返す
  return new Promise((resolve, reject) => {
    // 5s以内にメッセージが来なければタイムアウトとしてrejectする
    setTimeout(() => {
      reject("request timeout");
    }, 5000);
    // リクエストが複数並行して送信されても良いようにするためにidを付与
    const id = crypto.randomUUID();
    // CONNECTINGからOPENに移行したことを検知するためにonopenプロパティを設定
    socket.onopen = () => {
      const data = {
        id: id,
        message: message,
      };
      socket.send(JSON.stringify(data));
    };
    // メッセージを受信したときの処理
    socket.onmessage = (context) => {
      const response = JSON.parse(context.data);
      if (response.id === id) {
        // 該当するidのメッセージが来たらresolveしてsocketを閉じる
        resolve(response.message);
        socket.close();
      }
    };
    // 接続が切断した場合はrejectする
    socket.onerror = (error) => {
      reject(error);
    };
  });
};

const replyClient = () => {
  const socket = new WebSocket("ws://localhost:3003");
  // メッセージを受信した時の処理
  socket.onmessage = (context) => {
    const response = JSON.parse(context.data);
    const data = {
      id: response.id,
      message: "Hello, " + response.message, // レスポンスとしてリクエスト本文の先頭に Hello,  を付加したものを返す
    };
    socket.send(JSON.stringify(data));
  };
};

document.addEventListener("DOMContentLoaded", () => {
  replyClient();
  const form = document.getElementById("websocket-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputs = document.querySelectorAll(".websocket-input");
    const results = document.querySelectorAll(".websocket-result");

    // 非同期処理で各リクエストを並行して処理する
    inputs.forEach(async (input, index) => {
      const message = input.value;
      const resultElement = results[index];

      if (!message) return;

      resultElement.textContent = "sending...";

      // sentRequest関数を呼び出してWebSocketでリクエストを送信後、結果を表示する
      try {
        const response = await sentRequest(message);
        resultElement.textContent = response;
      } catch (error) {
        resultElement.textContent = error;
      }
    });
  });
});
