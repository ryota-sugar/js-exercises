const editorFront = document.querySelector("#editor-front");

const editorBack = document.querySelector("#editor-back");

// div要素をクリックするとinput要素がfocusされる
editorFront.addEventListener("click", () => {
  editorBack.focus();
});

// input要素にフォーカスが当たるとdiv要素がsilverになる
editorBack.addEventListener("focus", () => {
  editorFront.style.backgroundColor = "rgb(192, 192, 192)";
});

// input要素からフォーカスが外れるとdiv要素が白になる
editorBack.addEventListener("blur", () => {
  editorFront.style.backgroundColor = "rgb(255, 255, 255)";
});

// input要素に入力されると、その内容がdiv要素に反映される
editorBack.addEventListener("input", () => {
  editorFront.textContent = editorBack.value;
});
