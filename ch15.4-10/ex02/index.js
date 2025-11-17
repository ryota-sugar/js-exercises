const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const template = document.querySelector("#todo-template");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  input.value = "";

  const clone = template.content.cloneNode(true);
  const li = clone.querySelector("li");
  const toggle = clone.querySelector("input");
  const label = clone.querySelector("label");
  const destroy = clone.querySelector("button");

  toggle.addEventListener("change", () => {
    // IMPORTANT: ChatGPT にはこの関数内のコードのみ変更してもらうこと
    // li.classList.toggle("completed", toggle.checked); // 元のコード

    // Tailwind CSS のクラスをトグルしてスタイルを変更
    label.classList.toggle("line-through", toggle.checked); // 取り消し線
    label.classList.toggle("text-gray-400", toggle.checked); // テキストをグレーに
    li.classList.toggle("bg-gray-50", toggle.checked); // リストアイテムの背景色を少し変更
  });
  label.textContent = todo;
  destroy.addEventListener("click", () => {
    li.remove();
  });

  list.prepend(li);
});
