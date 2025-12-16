"use strict";

const button = document.querySelector("#send-button");
const messageContainer = document.getElementById("message-container");
button.addEventListener("click", (e) => {
  e.preventDefault();
  getMessageFromServer();
});
async function getMessageFromServer() {
  const messageElement = document.createElement("div");
  messageElement.className = "message";
  messageElement.textContent = "";
  messageContainer.appendChild(messageElement);

  // TODO: ここにサーバーとのやり取り等を実装しなさい
  // 通信中はボタンを非活性にする
  button.disabled = true;
  // EventSourceでサーバーからメッセージを受信する
  const eventSource = new EventSource("http://localhost:3000/message");
  eventSource.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.done) {
      // もう続きのメッセージがない場合は、EventSourceを閉じてボタンを活性化する
      eventSource.close();
      button.disabled = false;
    }
    messageElement.textContent += message.value;
  };
  eventSource.onerror = (error) => {
    console.error("EventSource failed:", error);
    button.disabled = false;
  };
}
