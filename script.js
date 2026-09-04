let stamps = JSON.parse(localStorage.getItem("stamps")) || [];

// URLからスポット番号を取得
const params = new URLSearchParams(window.location.search);
const spot = Number(params.get("spot"));

// スタンプを取得する
function getStamp(number) {

  // すでに取得済み
  if (stamps.includes(number)) {
    alert("このスタンプはすでに取得しています！");
    return;
  }

  // スタンプを追加
  stamps.push(number);

  // 保存
  localStorage.setItem("stamps", JSON.stringify(stamps));

  updateDisplay();

  document.getElementById("message").textContent =
    "🎉 スタンプGET！";

  // 5個全部集めた
  if (stamps.length === 5) {
    document.getElementById("message").textContent =
      "🏆 コンプリート！おめでとう！";
  }
}

// 表示を更新
function updateDisplay() {
  document.getElementById("count").textContent = stamps.length;
}

updateDisplay();

// QRコードから来た場合
if (spot >= 1 && spot <= 5) {
  getStamp(spot);
}