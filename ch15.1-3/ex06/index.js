const info = [
  { label: "ユーザーエージェント", value: navigator.userAgent },
  { label: "言語", value: navigator.language },
  { label: "プラットフォーム", value: navigator.platform },
  {
    label: "オンライン状態",
    value: navigator.onLine ? "オンライン" : "オフライン",
  },
  { label: "Cookie有効", value: navigator.cookieEnabled ? "有効" : "無効" },
  { label: "ハードウェア並列数", value: navigator.hardwareConcurrency },
  { label: "ブラウザ名", value: navigator.vendor },
];
document.getElementById("pc-info").innerHTML =
  "<table>" +
  info
    .map(
      (i) =>
        `<tr>
          <td class="label">${i.label}</td>
          <td class="value">${i.value}</td>
        </tr>`
    )
    .join("") +
  "</table>";
