const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

// 非同期でデータベースオブジェクトを取得する
// データベースオブジェクトをcallback関数(リストの表示、追加、削除など)に渡す
function withDB(callback) {
  const request = indexedDB.open("todo-db", 1);
  request.onerror = console.error; // エラー時はログに残す
  request.onsuccess = () => {
    const db = request.result; // リクエストの結果はデータベースオブジェクト
    callback(db); // データベースを引数にコールバックを呼び出す
  };
  // データベースが存在していない時の処理
  request.onupgradeneeded = () => {
    initdb(request.result);
  };
}

// データベースの初期化
function initdb(db) {
  db.createObjectStore("todos", { keyPath: "id", autoIncrement: true });
}

// 複数タブ同期のためのBroadcastChannelを作成
const broadcast = new BroadcastChannel("todo_channel");
broadcast.onmessage = () => getAllTodos();

function getAllTodos() {
  withDB((db) => {
    // 読み出し専用のトランザクションオブジェクトを作成
    const transaction = db.transaction("todos", "readonly");
    // トランザクションからオブジェクトストアを取得
    const todoStore = transaction.objectStore("todos");

    // オブジェクトストアから全件取得するリクエストを作成
    const getAllRequest = todoStore.getAll();
    getAllRequest.onerror = console.error;
    getAllRequest.onsuccess = () => {
      const todos = getAllRequest.result;
      // 既存のリストをクリア
      list.innerHTML = "";
      for (const todo of todos) {
        appendToDoItem(todo);
      }
    };
  });
}

function addTodo(todo) {
  withDB((db) => {
    // 書き込み可能なトランザクションオブジェクトを作成
    const transaction = db.transaction("todos", "readwrite");
    // トランザクションからオブジェクトストアを取得
    const todoStore = transaction.objectStore("todos");

    // オブジェクトストアにデータを追加するリクエストを作成
    const addRequest = todoStore.add(todo);
    addRequest.onerror = console.error;
    addRequest.onsuccess = () => {
      getAllTodos(); // 追加後にリストを再取得して表示を更新
      broadcast.postMessage("update"); // 他のタブに更新を通知
    };
  });
}

function updateTodo(todo) {
  withDB((db) => {
    // 書き込み可能なトランザクションオブジェクトを作成
    const transaction = db.transaction("todos", "readwrite");
    // トランザクションからオブジェクトストアを取得
    const todoStore = transaction.objectStore("todos");

    // オブジェクトストアにデータを更新するリクエストを作成
    const updateRequest = todoStore.put(todo);
    updateRequest.onerror = console.error;
    updateRequest.onsuccess = () => {
      getAllTodos(); // 更新後にリストを再取得して表示を更新
      broadcast.postMessage("update"); // 他のタブに更新を通知
    };
  });
}

function deleteTodo(todo) {
  withDB((db) => {
    // 書き込み可能なトランザクションオブジェクトを作成
    const transaction = db.transaction("todos", "readwrite");
    // トランザクションからオブジェクトストアを取得
    const todoStore = transaction.objectStore("todos");

    // オブジェクトストアからデータを削除するリクエストを作成
    const deleteRequest = todoStore.delete(todo.id);
    deleteRequest.onerror = console.error;
    deleteRequest.onsuccess = () => {
      getAllTodos(); // 削除後にリストを再取得して表示を更新
      broadcast.postMessage("update"); // 他のタブに更新を通知
    };
  });
}

// Todoを追加する関数
const appendToDoItem = (todo) => {
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = todo.name;
  label.style.textDecorationLine =
    todo.status === "completed" ? "line-through" : "none";

  const toggle = document.createElement("input");
  // TODO: toggle が変化 (change) した際に label.style.textDecorationLine を変更しなさい
  toggle.type = "checkbox";
  toggle.checked = todo.status === "completed";

  toggle.addEventListener("change", () => {
    todo.status = toggle.checked ? "completed" : "active";
    if (toggle.checked) {
      label.style.textDecorationLine = "line-through"; // 横の取消し線
    } else {
      label.style.textDecorationLine = "none";
    }
    updateTodo(todo);
  });

  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に elem を削除しなさい
  destroy.textContent = "❌";
  destroy.addEventListener("click", () => {
    deleteTodo(todo);
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  list.appendChild(elem);
};

// 初期表示 getAllTodosを呼ぶだけ
document.addEventListener("DOMContentLoaded", () => {
  getAllTodos();
});

form.addEventListener("submit", (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  // フォーム送信時にpreventDefaultを呼び出さないと、ページがリロードされてしまい、追加した要素が消えてしまうため。
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  if (input.value.trim() === "") {
    return;
  }
  const todo = { name: input.value.trim(), status: "active" };
  // new-todo の中身は空にする
  input.value = "";
  addTodo(todo); // ここでDBに保存
});
