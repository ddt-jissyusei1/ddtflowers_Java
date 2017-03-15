<?php
include 'inc/mslinfo.php';
$msl_infos = new MSLListInfo();
?>
<!-- HTMLによるコード -->
<!doctype html>
<!-- 最も外のタグ -->
<html>
<!-- 予め仕様等を記すヘッダータグ -->
<head>
<!-- UTF-8でエンコード -->
<meta http-equiv="Content-Type" content="application/json; charset=UTF-8">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width">
<!-- 表示用タイトル -->

<!--title、keywords、description表示用-->
<?php echo $msl_infos->get('html_meta'); ?>
<!--title、keywords、description表示用-->

<!-- このページのファイルと同じ階層にcssファイルを置く。css名はstyle.css -->
<link href="ddt-regular/css/style.css" rel="stylesheet" type="text/css">
<!-- スマートフォン -->
<link href="ddt-regular/css/smartphone.css" rel="stylesheet" type="text/css" media="only screen and (max-width:767px)">
<!-- タブレット -->
<link href="ddt-regular/css/tablet.css" rel="stylesheet" type="text/css" media="only screen and (min-width:768px) and (max-width:949px)">
<!-- デスクトップ -->
<link href="ddt-regular/css/desktop.css" rel="stylesheet" type="text/css" media="only screen and (min-width:950px)">
<!-- jQueryの本体ファイルを読み込む -->
<script type="text/javascript" src="ddt-regular/js/jquery-1.11.0.min.js" charset="utf-8"></script>
<!-- Ajaxによるページ切り替えスクリプトを読み込む -->
<script type="text/javascript" src="ddt-regular/js/pagemove.js" charset="utf-8"></script>
<!-- トップメニューにプルダウンメニューを追加するスクリプトを読み込む -->
<script type="text/javascript" src="ddt-regular/js/categorypulldown.js" charset="utf-8"></script>
<!-- 特定のクリックした画像を拡大表示し、もう一度クリックすれば元に戻るスクリプトを読み込む -->
<script type="text/javascript" src="ddt-regular/js/enlargeimg.js" charset="utf-8"></script>
<!-- 画像のアクションを設定したスクリプトを読み込む -->
<script type="text/javascript" src="ddt-regular/js/imagemove.js" charset="utf-8"></script>
<!-- script type="text/javascript" src="ddt-regular/js/footerFixed.js"></script -->
<!--[if lt IE 9]><script src="ddt-regular/js/html5shiv.js"></script><![endif]-->
</head>
<!-- コンテンツを表示する領域 -->
<body id="base">
<!-- ウェブサイトの横幅の基準となる -->
<div id="container">
<!-- 各ページ共通で企業ロゴ画像とナビゲーションバーを置くheaderタグ。各ページに必ず表示することを考慮し、footerタグと同じ"baseinfoクラスを設定" -->
<header class="baseinfo">
<div id="mottobg">
</div>
<div id="toppagemotto">
<!-- 企業ロゴ領域 -->
<h4>もっと速く　もっとシンプルに　More Quickly More Simply</h4>
<div id="headercontents">
<div id="companylogo">
<span id="biglogo-substitute" style="font-family:Impact, 'メイリオ', 'ＭＳ Ｐゴシック'; font-size: 28px; color: #800000; display: block; float:left; margin:-2px 2px 0 0;">DDThink</span>
<img id="smalllogo" src="ddt-regular/img/logo(DDTfull).gif">
</div>
<div id="ssn-d2124">
<img id="ssnmain" class="ssnimg" src="ddt-regular/img/ssn-d2124(57).gif">
<img id="ssncopy" src="ddt-regular/img/download(freeApp).gif">
<img id="ssniphone" class="ssnimg" src="ddt-regular/img/button(iphone).gif">
<img id="ssnandroid" class="ssnimg" src="ddt-regular/img/button(Android).gif">
</div>
</div>
</div>
<div id="navigationbg">
</div>
<!-- ナビゲーションバーを置くnavタグ -->
<nav id="navigation">
  <!-- リストの外枠となるulタグ -->
  <ul>
    <!-- トップページへとリンクするボタン -->
    <li><a href="ddt-regular/toppage.html">Top</a>
    </li>
    <!-- 企業プロフィールカテゴリーへリンクするボタン -->
    <li><a href="ddt-regular/outline.html">Profile</a>
    <!-- 企業プロフィールカテゴリーの部分を閉じる -->
    </li>
    <!-- 提供サービスカテゴリーへリンクするボタン -->
    <li><a href="ddt-regular/service.html">Service</a>
    <!-- 提供サービスのカテゴリーの部分を閉じる -->
    </li>
    <!-- 採用情報カテゴリーへリンクするボタン -->
    <li><a href="ddt-regular/gideline.html">Recruit</a>
    <!-- 採用情報カテゴリーの部分を閉じる -->
    </li>
    <!-- お問い合わせページへリンクするボタン -->
    <li><a href="ddt-regular/contact.html">Contact</a>
    </li>
    <!-- リスト終了 -->
    </ul>
  <!-- navタグを閉じてナビゲーションバーの記述を終了 -->
</nav>
</header>

<!--MSL記事表示用-->
<?php echo $msl_infos->get('html_article'); ?>
<!--MSL記事表示用-->

<!-- コピーライトの表示をするfooterタグ -->
<footer id="footer" class="baseinfo">
<div id="footerwrap">
<div id="footerleft">
<span class="footerlogo">DDThink</span>
<span class="footercompanyname">株式会社デジタルデザインシンク</span>
<address class="baseaddress">
<span class="basename">本社</span><br>
<span class="basepostal">〒160-0022</span><br>
<span class="baseaddressinfo">東京都新宿区新宿2-12-4アコード新宿ビル4F</span><br>
<span class="basetell">03-6413-1225</span>
<span class="basefax">fax 03-6413-1226</address>
<address class="baseaddress">
<span class="basename">相模原事業所</span><br><span class="basepostal">〒252-0231</span><br>
<span class="baseaddressinfo">神奈川県相模原市中央区相模原3-7-1フェリッシュ相模原2F</span><br>
<span class="basetell">042-759-7312</span><span class="basefax"> fax 042-759-7313</address>
<span class="baseemail">E-mail info@ddhtink.com</span>
</div>
<div id="footerright">
<navigation id="contentlinks">
<ul>
<li><a href="ddt-regular/outline.html">会社概要</a></li>
<li><a href="ddt-regular/profilephilosophy.html">企業理念</a></li>
<li><a href="ddt-regular/service.html">事業内容</a></li>
<li><a href="ddt-regular/gideline.html">求人情報</a></li>
<li><a href="ddt-regular/induction.html">研修制度</a></li>
<li><a href="ddt-regular/voice.html">社員&amp;研修生の声</a></li>
<li><a href="ddt-regular/contact.html">お問合せ</a></li>
</ul>
</navigation>
</div>
<!-- コピーライトの文を書く -->
<br>
<small>Copyright &copy; digital design think corporation All Rights Reserved.</small>
<!-- footerタグを閉じる -->
</div>
</footer>
<div id="footerbg">
</div>
<!-- idをcontainerに指定したdivタグを閉じる -->
</div>
<!-- bodyタグを閉じる -->
</body>
<!-- htmlタグを閉じる -->
</html>