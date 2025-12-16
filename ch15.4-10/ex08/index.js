window.addEventListener("DOMContentLoaded", () => {
  const svg = document.getElementById("clock");
  // 秒針のline要素を作成
  const secondHand = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  secondHand.setAttribute("class", "secondhand");
  secondHand.setAttribute("x1", "50");
  secondHand.setAttribute("y1", "50");
  secondHand.setAttribute("x2", "50");
  secondHand.setAttribute("y2", "15");
  secondHand.setAttribute("stroke", "red");
  secondHand.setAttribute("stroke-width", "1");

  // handsグループに追加
  const handsGroup = svg.querySelector(".hands");
  handsGroup.appendChild(secondHand);

  function updateClock() {
    // SVG時計の画像を更新して現在時刻を表示する。
    const now = new Date(); // 現在時刻。
    const sec = now.getSeconds();
    const min = now.getMinutes() + sec / 60;
    const hour = (now.getHours() % 12) + min / 60;
    const secangle = sec * 6; // 360/60
    const minangle = min * 6; // 360/60
    const hourangle = hour * 30; // 360/12

    const minhand = svg.querySelector(".minutehand");
    const hourhand = svg.querySelector(".hourhand");
    // 時計の針のSVG要素を取得する。
    if (minhand) minhand.setAttribute("transform", `rotate(${minangle},50,50)`);
    if (hourhand)
      hourhand.setAttribute("transform", `rotate(${hourangle},50,50)`);
    secondHand.setAttribute("transform", `rotate(${secangle},50,50)`);

    // 1秒後にこの関数を再度実行する。
    setTimeout(updateClock, 1000);
  }

  updateClock();
});
