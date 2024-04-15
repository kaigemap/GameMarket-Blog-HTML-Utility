# GameMarket-Blog-HTML-Utility

GameMarket Blog HTML Utility は、ゲームマーケットのブログ記事（https://gamemarket.jp/blog/）の投稿用HTMLを加工するためのユーティリティツールです。
ゲームマーケットのブログ記事の投稿用HTMLでは、挿入した画像に自動的にwidthとheightが固定値で付与されるため、スマートフォンなどの表示サイズが狭い環境で大きな画像がはみ出ます。これを`max-width="100%"`を設定することでよしなに表示されるようにするツールです。

## 使用しているプラグイン

- DOMPurifyをCDNから読み込み（https://github.com/cure53/DOMPurify）