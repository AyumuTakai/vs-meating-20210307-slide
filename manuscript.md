# コンポジットテーマの提案

一つの原稿に複数のテーマを適用する機能を提案します。

@AyumuTakai

# メリット

* 既存テーマのfork/clone不要でカスタマイズしやすい
* 既存テーマのバージョンアップにカスタマイズ側で対応しやすい
* エントリーに合わせてテーマを着脱しやすい
* 部分的なテーマを組合せることで完結したテーマを作りやすい
* 機能追加のためのテーマ(プラグイン)への布石

<small>この[スライド](https://github.com/AyumuTakai/vs-meating-20210307-slide)も@vivliostyle/theme-slideをベースにカスタマイズ用テーマを追加して作成しています。</small>

# デメリット

* 構造の複雑化によって適用されるスタイルを想像しにくい
* テーマの相性問題が発生しやすくなる
* スタイルのデバッグが難しくなる
* CSSの適用優先順位の知識が必要になる

# 仕組み

CSSの結合などは行なわず、指定されたテーマの数だけ<br>&lt;link rel="stylesheet"&gt;を書き出しているだけです。

MarkdownとHTMLの両方の原稿に対応しています。

<small>コード的にはテーマを管理しやすくするためにUriTheme,PackageThemeをクラス化したりといろいろ手を入れています。</small>

# デモ その1

部分的なテーマを組みあわせて簡単にカスタマイズできます。

以下のテーマを順に適用します。<br>(将来SCSS変数が導入されると不要になるものも)

* A4書籍用ページレイアウト(ページ余白、ノンブル、柱の設定)
* 表紙(ページ背景を設定、ノンブルと柱を非表示)
* 開始ページ番号指定
* 2段組み

```javascript
{path:'cover.md', theme: ['A4book.css','cover.css'] },
{path:'bunko.md', theme: ['A4book.css','2column.css','startpage.css']},
{path:'yume.md', theme: ['A4book.css','2column.css']}
```

# デモ その2

スクリプトを含むテーマを使ってプラグイン的に機能追加できます。

以下のテーマを順に適用します。

* 指定文字置換1(VFMのリプレイス:猫→🐈)
* 指定文字置換2(VFMのリプレイス:掌→🖐)
* 常用漢字ルールを設定したTextLintによる校正(プリプロセス)
* 音声合成(プリプロセス)

<small>※プリプロセス機能はMarkdown読込み時にフィルタスクリプトを実行します。</small>

```javascript
theme: ['@vivliostyle/theme-bunko', 'emojicat',
    'emojihand', 'textlint', 'openJTalk']
```

# デモ その3(時間があれば)

[請求書発行システム試作](https://github.com/AyumuTakai/vivliostyle-invoice-sample)

```
@hassaku_63 : Vivliostyle のようなCSS組版のソフトウェアを使って、
例えば請求書などのようなバックオフィス業務で発生する帳票の類をいい感じ
に開発できないだろうか？？
```

Twitter(Slackの#twitter)で見掛けた上記の書き込みを切っ掛けに、自作のRuby+TeX製 請求書PDF作成プログラムをvivliostyle-cliに移行できないか試作してみました。

プリプロセス、リプレイス機能によるスクリプティングと複数テーマの組合せによって比較的効率的に開発を進めることができました。

# 設定書式

現在は、vivliostyle.config.jsの全体とエントリで
```javascript
theme: ["テーマ1","テーマ2"]
```
のように記述し、優先順位はエントリ>全体(排他で適用)、リスト内は右>左(CSSは上書き、スクリプトは先に処理)としています。

<small>※ コマンドラインオプションやMarkdownのメタデータ、テーマパッケージ内での指定は今後対応する予定です。</small>

全体のテーマを設定したうえでエントリ毎に拡張やカスタマイズしたくもあるため、設定書式を[Issue #143](https://github.com/vivliostyle/vivliostyle-cli/issues/143)で検討中です。
