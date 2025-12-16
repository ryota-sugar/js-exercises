const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

// localStorageに保存されているToDoリストを取得して表示する
const getTodosFromLocalStorage = () => {
  try {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    if (todos.length > 0) {
      // 既存のリストをクリア
      list.innerHTML = "";
      for (const todo of todos) {
        appendToDoItem(todo);
      }
    }
  } catch {
    // localStorageが使えない場合はlogに出力するだけ
    console.log("can not use localStorage");
  }
};

// localStorageにToDoリストを保存する
const saveTodosToLocalStorage = () => {
  try {
    const todos = [];
    list.querySelectorAll("li").forEach((li) => {
      const label = li.querySelector("label");
      const toggle = li.querySelector("input[type=checkbox]");
      todos.push({
        name: label.textContent,
        status: toggle.checked ? "completed" : "active",
      });
    });
    // todosというキーでlocalStorageに保存
    localStorage.setItem("todos", JSON.stringify(todos));
  } catch {
    // localStorageが使えない場合はlogに出力するだけ
    console.log("can not use localStorage");
  }
};

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
    if (toggle.checked) {
      label.style.textDecorationLine = "line-through"; // 横の取消し線
    } else {
      label.style.textDecorationLine = "none";
    }
    saveTodosToLocalStorage();
  });

  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に elem を削除しなさい
  destroy.textContent = "❌";
  destroy.addEventListener("click", () => {
    elem.remove();
    saveTodosToLocalStorage();
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  list.appendChild(elem);
};

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
  appendToDoItem(todo);
  saveTodosToLocalStorage();
});

// 他のタブへも自動的に反映されるようにする
window.addEventListener("storage", (e) => {
  if (e.key === "todos") {
    getTodosFromLocalStorage();
  }
});

// 初期表示
document.addEventListener("DOMContentLoaded", getTodosFromLocalStorage);
