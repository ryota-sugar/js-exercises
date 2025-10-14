// ブラウザで選択した部分を塗りつぶすブックマークレット
// 見せたくない部分を隠してスクリーンショットする際に使用

// getRangeAt()で選択範囲を取得し、
// getClientRects()で矩形のリストを取得する
// 大きすぎる矩形や小さい矩形は無視するように
(function () {
  const maskClassName = "security-mask";
  const selection = window.getSelection();
  if (!selection.rangeCount || selection.isCollapsed) {
    alert("隠したい部分を選択してから実行してください");
    return;
  }
  const range = selection.getRangeAt(0);
  const rects = range.getClientRects();
  const viewportWidth = window.innerWidth;
  for (const rect of rects) {
    if (rect.width < 1 || rect.height < 1 || rect.width > viewportWidth) {
      continue;
    }
    const mask = document.createElement("div");
    mask.className = maskClassName;
    mask.style.position = "absolute";
    mask.style.left = `${rect.left + window.scrollX}px`;
    mask.style.top = `${rect.top + window.scrollY}px`;
    mask.style.width = `${rect.width}px`;
    mask.style.height = `${rect.height}px`;
    mask.style.backgroundColor = "black";
    mask.style.zIndex = "10000";
    document.body.appendChild(mask);
  }
  selection.empty();
})();
