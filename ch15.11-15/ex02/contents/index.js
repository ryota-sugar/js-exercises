const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

const retryWithExponentialBackoff = (func, maxRetry) => {
  return new Promise((resolve, reject) => {
    let retryCount = 0;
    const attempt = () => {
      Promise.resolve()
        .then(func)
        .then((result) => {
          if (result) {
            resolve(result);
          } else {
            if (retryCount < maxRetry) {
              // 待ち時間を指数関数的に増やす
              const waitTime = Math.pow(2, retryCount) * 1000;
              retryCount++;
              // 指定された時間待機してから再試行
              setTimeout(attempt, waitTime);
            } else {
              reject(new Error("Maximum retry attempts reached"));
            }
          }
        })
        .catch((err) => {
          // エラーが発生した場合もリトライ
          if (retryCount < maxRetry) {
            const waitTime = Math.pow(2, retryCount) * 1000;
            retryCount++;
            setTimeout(attempt, waitTime);
          } else {
            reject(err);
          }
        });
    };
    attempt();
  });
};

const fetchAPIRequest = async (url, options = {}) => {
  // 時間制限付きのリクエスト関数
  const fetchWithTimeout = (url, options = {}) => {
    return new Promise((resolve, reject) => {
      // リクエストの中止のためのAbortControllerを作成
      const controller = new AbortController();
      // optionsにsignalを追加
      options.signal = controller.signal;
      // タイムアウトを設定 タイムアウトしたらリクエストを中止
      const timer = setTimeout(() => {
        controller.abort();
        reject(new Error("Request timed out"));
      }, 3000);
      // fetchを実行
      fetch(url, options)
        .then((response) => {
          clearTimeout(timer);
          resolve(response);
        })
        .catch((err) => {
          clearTimeout(timer);
          reject(err);
        });
    });
  };

  try {
    const response = await retryWithExponentialBackoff(async () => {
      try {
        const res = await fetchWithTimeout(url, options);
        if (res.status >= 500 && res.status < 600) {
          // 500番台の場合はリトライする
          return null;
        }
        return res;
      } catch (error) {
        // タイムアウトの場合はエラーを投げてalertの処理へ
        if (error.message === "Request timed out") {
          throw error;
        }
        // その他のエラーの場合はリトライする
        return null;
      }
    }, 3); // 今回は最大3回リトライとする
    return response;
  } catch (error) {
    if (error.message === "Request timed out") {
      alert("タイムアウトしました。");
      return null;
    }
    throw error;
  }
};

// 通信やリトライが完了するまで、編集ができないようにする
const isUIEnabled = (enabled) => {
  form.querySelector("button[type=submit]").disabled = !enabled;
  input.disabled = !enabled;
  // ToDoリスト内の全てのボタン・チェックボックスを制御
  list.querySelectorAll("button, input[type=checkbox]").forEach((el) => {
    el.disabled = !enabled;
  });
  // ローディング表示の切り替え
  const loading = document.getElementById("loading");
  if (loading) {
    loading.style.display = enabled ? "none" : "block";
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  isUIEnabled(false);
  try {
    const response = await fetchAPIRequest("/api/tasks", { method: "GET" });
    const tasks = await response.json();
    for (const task of tasks.items) {
      appendToDoItem(task);
    }
  } catch (error) {
    alert(`${error.message}`);
  }
  isUIEnabled(true);
});

form.addEventListener("submit", async (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  // new-todo の中身は空にする
  input.value = "";

  // TODO: ここで API を呼び出して新しいタスクを作成し
  // 成功したら作成したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  isUIEnabled(false);
  try {
    const response = await fetchAPIRequest("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: todo }),
    });
    const newTask = await response.json();
    appendToDoItem(newTask);
  } catch (error) {
    alert(`${error.message}`);
  }
  isUIEnabled(true);
});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  //   label.style.textDecorationLine = "none";
  label.style.textDecorationLine =
    task.status === "completed" ? "line-through" : "none";

  const toggle = document.createElement("input");
  // TODO: toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
  // 成功したら label.style.textDecorationLine を変更しなさい
  toggle.type = "checkbox";
  toggle.checked = task.status === "completed";

  toggle.addEventListener("change", async () => {
    isUIEnabled(false);
    const newStatus = toggle.checked ? "completed" : "active";
    try {
      const response = await fetchAPIRequest(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const updatedTask = await response.json();
      label.style.textDecorationLine =
        updatedTask.status === "completed" ? "line-through" : "none";
    } catch (error) {
      alert(`${error.message}`);
    }
    isUIEnabled(true);
  });

  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.textContent = "DELETE";
  destroy.addEventListener("click", async () => {
    isUIEnabled(false);
    try {
      await fetchAPIRequest(`/api/tasks/${task.id}`, {
        method: "DELETE",
      });
      elem.remove();
    } catch (error) {
      alert(`${error.message}`);
    }
    isUIEnabled(true);
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  list.prepend(elem);
}
