const template = document.createElement("template");
template.innerHTML = `\
<style>
.completed {
  text-decoration: line-through;
}
</style>

<form id="new-todo-form">
  <input type="text" id="new-todo" placeholder="What needs to be done?" />
  <button>Add</button>
</form>
<ul id="todo-list"></ul>
`;

class TodoApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.form = this.shadowRoot.querySelector("#new-todo-form");
    // TODO: 残りを実装
    this.input = this.shadowRoot.querySelector("#new-todo");
    this.list = this.shadowRoot.querySelector("#todo-list");

    this.todoList = [];

    this.form.addEventListener("submit", (e) => {
      // ページの読み込みを防止
      e.preventDefault();
      const todoText = this.input.value.trim();
      if (!todoText) return;
      // ToDoリストに新しい項目を追加していく
      this.todoList.push({ text: todoText, completed: false });
      this.input.value = "";
      this.render();
    });
  }

  render() {
    this.list.innerHTML = "";
    this.todoList.forEach((todo, index) => {
      const li = document.createElement("li");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.completed;

      // completedhならliにcompletedクラスを追加
      if (todo.completed) {
        li.classList.add("completed");
      } else {
        li.classList.remove("completed");
      }

      // checkboxの状態が変化したときにToDoの完了状態を更新
      checkbox.addEventListener("change", () => {
        this.todoList[index].completed = checkbox.checked;
        this.render();
      });
      li.appendChild(checkbox);

      // ToDoのテキストをli要素に追加
      li.appendChild(document.createTextNode(todo.text));

      // 削除ボタン
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "削除";
      deleteButton.addEventListener("click", (e) => {
        e.stopPropagation();
        // todoListから該当項目を削除
        this.todoList.splice(index, 1);
        this.render();
      });

      li.appendChild(deleteButton);
      this.list.appendChild(li);
    });
  }
}

customElements.define("todo-app", TodoApp);
