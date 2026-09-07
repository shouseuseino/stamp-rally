// ==========================
// スタンプデータ
// ==========================

let stamps = JSON.parse(localStorage.getItem("stamps")) || [];


// ==========================
// スタンプ表示
// ==========================

function updateDisplay() {

  // スタンプ数
  document.getElementById("count").textContent = stamps.length;

  // スタンプの色を変更
  for (let i = 1; i <= 5; i++) {

    const stampElement = document.getElementById("stamp" + i);

    if (stamps.includes(i)) {

      stampElement.classList.add("get");

      stampElement.textContent =
        "🎉 スポット" + i + " スタンプGET！";

    } else {

      stampElement.classList.remove("get");

      stampElement.textContent =
        "スポット" + i;

    }
  }

  // コンプリート
  if (stamps.length === 5) {

    document.getElementById("message").textContent =
      "🏆 コンプリート！おめでとう！";
  }
}


// ==========================
// スタンプをGET
// ==========================

function getStamp(number) {

  // すでに取得している場合
  if (stamps.includes(number)) {

    document.getElementById("message").textContent =
      "このスタンプはすでにGETしています！";

    return;
  }

  // スタンプを追加
  stamps.push(number);

  // 保存
  localStorage.setItem(
    "stamps",
    JSON.stringify(stamps)
  );

  // 表示更新
  updateDisplay();

  // メッセージ
  document.getElementById("message").textContent =
    "🎉 スポット" + number + " のスタンプGET！";

  // 5個全部集めた
  if (stamps.length === 5) {

    document.getElementById("message").textContent =
      "🏆 コンプリート！おめでとう！";
  }
}


// ==========================
// QRコード読み取り
// ==========================

let scanner = null;
let scanning = false;


// ==========================
// QRコードを読み始める
// ==========================

function startQR() {

  // すでに読み取り中なら何もしない
  if (scanning) {
    return;
  }

  scanning = true;

  // QR読み取り画面を表示
  document.getElementById("reader").style.display = "block";

  document.getElementById("qr-message").textContent =
    "📷 QRコードをカメラに映してください";

  // カメラを起動
  scanner = new Html5Qrcode("reader");

  scanner.start(

    {
      facingMode: "environment"
    },

    {
      fps: 10,
      qrbox: 250
    },

    function(decodedText) {

      checkQR(decodedText);

    },

    function(errorMessage) {

      // QRコードが見つからないときは何もしない

    }

  ).catch(function(error) {

    scanning = false;

    document.getElementById("reader").style.display = "none";

    document.getElementById("qr-message").textContent =
      "❌ カメラを起動できませんでした";

    console.log(error);

  });
}


// ==========================
// QRコードを確認
// ==========================

function checkQR(code) {

  console.log("読み取ったQR:", code);

  // 正しいQRコード
  // stamp-1
  // stamp-2
  // stamp-3
  // stamp-4
  // stamp-5

  const match = code.match(/^stamp-([1-5])$/);

  // 正しいQRコードだった場合
  if (match) {

    const spot = Number(match[1]);

    // カメラ停止
    if (scanner) {

      scanner.stop().then(function() {

        scanning = false;

        // カメラ画面を隠す
        document.getElementById("reader").style.display = "none";

        document.getElementById("qr-message").textContent =
          "🎉 QRコードを確認しました！";

        // スタンプGET
        getStamp(spot);

      }).catch(function(error) {

        console.log(error);

        scanning = false;

        document.getElementById("reader").style.display = "none";

        getStamp(spot);
      });

    } else {

      getStamp(spot);

    }

  }

  // 間違ったQRコード
  else {

    document.getElementById("qr-message").textContent =
      "❌ このスタンプラリーのQRコードではありません";

  }
}


// ==========================
// 最初に表示
// ==========================

updateDisplay();
