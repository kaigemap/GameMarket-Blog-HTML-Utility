function addMaxWidth() {
  // テキストエリアから入力を取得
  var htmlCode = document.getElementById('htmlInput').value;

  // DOMPurifyを使用してHTMLをサニタイズ
  var sanitizedHTML = DOMPurify.sanitize(htmlCode);

  // ダミーのdiv要素を作成して、サニタイズされたHTMLを挿入してDOMを操作
  var dummyDiv = document.createElement('div');
  dummyDiv.innerHTML = sanitizedHTML;

  // すべてのimgタグを取得
  var images = dummyDiv.getElementsByTagName('img');

  // それぞれのimgタグに対して処理を行う
  Array.from(images).forEach(function (img) {
    // imgタグのstyle属性からmax-widthを取得
    var maxWidth = img.style.maxWidth;

    // max-widthが指定されていなければ、自動で追加する
    if (!maxWidth || maxWidth === '') {
      img.style.maxWidth = '100%';
    }

    // 追加のスタイル設定
    img.style.display = 'block';
    img.style.width = 'auto'; // 幅をオリジナルサイズに保つ
    img.style.height = 'auto'; // 高さもオリジナルサイズに保つ

    // もとのコードに width と height の属性が設定されていた場合に削除する
    if (img.hasAttribute('width')) {
      img.removeAttribute('width');
    }
    if (img.hasAttribute('height')) {
      img.removeAttribute('height');
    }
  });

  // サニタイズされたHTMLを表示
  var outputDiv = document.getElementById('output');
  outputDiv.innerHTML = dummyDiv.innerHTML;

  // サニタイズされたHTMLをテキストとして表示
  var resultText = document.createElement('textarea');
  resultText.rows = '10';
  resultText.cols = '50';
  resultText.textContent = outputDiv.innerHTML; // 加工されたHTMLを表示
  outputDiv.appendChild(resultText);

  // クリップボードにコピーするボタンを追加
  var copyButton = document.createElement('button');
  copyButton.textContent = 'HTMLをクリップボードにコピー';
  copyButton.onclick = function () {
    // 加工されたHTMLを取得
    var processedHTML = resultText.value; // テキストエリアの内容を取得

    // クリップボードにコピーする
    navigator.clipboard.writeText(processedHTML)
      .then(function () {
        console.log('HTMLがクリップボードにコピーされました！');
        // 「Copied!」というメッセージを表示
        var copyMessage = document.createElement('span');
        copyMessage.textContent = 'Copied!';
        copyMessage.style.marginLeft = '10px'; // ボタンの右側に表示するためにマージンを追加
        outputDiv.appendChild(copyMessage);
        // 3秒後にメッセージを消す
        setTimeout(function () {
          copyMessage.remove();
        }, 3000);
      })
      .catch(function (err) {
        console.error('HTMLのコピーに失敗しました:', err);
        // エラーメッセージを表示
        var errorMessage = document.createElement('span');
        errorMessage.textContent = 'Copy失敗';
        errorMessage.style.color = 'red'; // 赤色で表示
        errorMessage.style.marginLeft = '10px'; // ボタンの右側に表示するためにマージンを追加
        outputDiv.appendChild(errorMessage);
        // 3秒後にメッセージを消す
        setTimeout(function () {
          errorMessage.remove();
        }, 3000);
      });
  };
  outputDiv.appendChild(copyButton);

  // "HTMLをクリップボードにコピー"ボタンにCSSクラスを追加
  copyButton.classList.add('btn');
}
