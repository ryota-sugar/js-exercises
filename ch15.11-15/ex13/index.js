const form = document.getElementById("input-area");
const messageInput = document.getElementById("message-input");
const messageContainer = document.getElementById("message-container");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value.trim();
  if (message === "") {
    return;
  }
  // 入力欄をクリアする
  messageInput.value = "";
  getMessageFromOllama(message);
});

async function getMessageFromOllama(message) {
  // ユーザー側のメッセージ用の要素を作成
  const userMessageElement = document.createElement("div");
  userMessageElement.className = "message message-user";
  userMessageElement.textContent = message;
  messageContainer.appendChild(userMessageElement);

  // Ollama側のメッセージ用の要素を作成
  const aiMessageElement = document.createElement("div");
  aiMessageElement.className = "message message-ai";
  messageContainer.appendChild(aiMessageElement);

  // 自動スクロール
  messageContainer.scrollTop = messageContainer.scrollHeight;

  try {
    // Ollamaにリクエスト送信
    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gemma2:2b",
        messages: [{ role: "user", content: message }],
      }),
    });

    if (!response.ok) {
      throw new Error(`response error status: ${response.status}`);
    }

    // ストリームリーダーの取得
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let done = false;
    while (!done) {
      const result = await reader.read();
      done = result.done;
      const value = result.value;
      if (done) break;

      // チャンクをデコードすることでテキストを取得
      const chunk = decoder.decode(value, { stream: true });

      // 各行を処理
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const json = JSON.parse(line);
          // message.contentにテキストが含まれているため、受け取るたびに追加表示
          if (json.message && json.message.content) {
            aiMessageElement.textContent += json.message.content;
            // 新しいテキストが追加されるたびにスクロール
            messageContainer.scrollTop = messageContainer.scrollHeight;
          }
        } catch (e) {
          console.error("JSON parse error", e);
        }
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
