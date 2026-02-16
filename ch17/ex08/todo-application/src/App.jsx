import { useState } from "react";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 両端からホワイトスペースを取り除いた文字列を取得する
    if (inputText.trim() === "") {
      return;
    }
    const newTodo = {
      id: Date.now(), // 一意に決まるIDを設定
      text: inputText.trim(),
      completed: false,
    };
    setTodos([newTodo, ...todos]);
    setInputText("");
  };

  const handleCheckboxChange = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <form id="new-todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="new-todo"
          placeholder="What needs to be done?"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul id="todo-list" style={{ padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              listStyle: "none",
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                textDecorationLine: todo.completed ? "line-through" : "none",
                flex: 1,
                cursor: "pointer",
                gap: "8px",
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => {
                  handleCheckboxChange(todo.id);
                }}
                style={{ margin: 0, verticalAlign: "middle" }}
              />
              <span style={{ lineHeight: 1 }}>{todo.text}</span>
            </label>
            <button
              onClick={() => {
                handleDelete(todo.id);
              }}
              style={{ marginLeft: "8px" }}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
