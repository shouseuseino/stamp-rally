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
let currentSpot = null;
let scanner = null;

function startQR(spot) {
    currentSpot = spot;

    document.getElementById("qr-message").textContent =
        "スポット" + spot + "のQRコードを読み取ってください";

    scanner = new Html5Qrcode("reader");

    scanner.start(
        { facingMode: "environment" },
        {
            fps: 10,
            qrbox: 250
        },
        function(decodedText) {
            checkQR(decodedText);
        },
        function(errorMessage) {
            // 読み取り中なので何もしない
        }
    ).catch(function(err) {
        document.getElementById("qr-message").textContent =
            "カメラを起動できませんでした";
    });
}

function checkQR(code) {
    const correctCode = "stamp-" + currentSpot;

    if (code === correctCode) {

        scanner.stop().then(function() {

            document.getElementById("qr-message").textContent =
                "🎉 スポット" + currentSpot + "のスタンプGET！";

            getStamp(currentSpot);

        });

    } else {

        document.getElementById("qr-message").textContent =
            "❌ 違うQRコードです";
    }
}
