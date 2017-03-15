<?php
include 'inc/mslinfo.php';
$msl_infos = new MSLDetailInfo();
if ($msl_infos->get('article_title')==""){
header("HTTP/1.0 404 Not Found");
header("Location:".(empty($_SERVER["HTTPS"]) ? "http://" : "https://") . $_SERVER["HTTP_HOST"]);
exit;
}
?>
<!-- HTMLによるコード -->
<!doctype html>
<!-- 最も外のタグ -->
<html>
<!-- 予め仕様等を記すヘッダータグ -->
<head>
<!-- UTF-8でエンコード -->
<meta http-equiv="Content-Type" content="text/html charset=UTF-8">
<meta charset="utf-8">
<!-- 画面の幅を使用している端末に依存する。加えてズームを許可しない。 -->
<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes">
<!--title、keywords、description表示用-->
<?php echo $msl_infos->get('html_meta'); ?>
<!--title、keywords、description表示用-->

<!-- Googleアナリスティクの記述のタグ -->
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-58020246-43', 'auto');
  ga('send', 'pageview');
</script>
<!-- mslで指定されたCSSファイルを読み込む -->
<link href="../../css/top.css" rel="stylesheet" type="text/css">
<!-- mslで指定されたCSSファイルを読み込む -->
<link href="../../css/detail.css" rel="stylesheet" type="text/css">
<!-- メインのCSSファイルを読み込む。 -->
<link href="../../../css/style.css" rel="stylesheet" type="text/css">
<!-- コース案内のCSSファイルを読み込む。 -->
<link href="../../../css/courseguide.css" rel="stylesheet" type="text/css">

<!-- メインのCSSファイルを読み込む。 -->
<link href="../../../css/style.css" rel="stylesheet" type="text/css">
<!-- jQueryの本体を読み込む。 -->
<script src="../../../js/jquery-1.11.0.min.js"></script>
<!-- ユーティリティクラスのjsファイル。 -->
<script src="../../../js/utils.js"></script>
<!-- サイト全体のレイアウト調整用JSファイル。 -->
<script src="../../../js/flowersstylefix.js"></script>
<!-- タグを作成するJSの関数群を読み込む -->
<script type="text/javascript" src="../../../js/createTag.js"></script>
<!-- 初期化変数を配置するための関数をコールするためのファイルを読み込む -->
<script type="text/javascript" src="../../../js/createDialog.js"></script>
<!-- MSLページ用の関数ファイルを読み込む -->
<script type="text/javascript" src="../../../js/mslFunctions.js"></script>


<script>
	$(document).ready(function(){
		util = new utils();			//汎用関数のクラスのインスタンスを用意する
		creator = new createTag();	//createTagのクラスオブジェクトを生成する

		creator.getJsonFile('../../../source/commonJson.json');			// ファイルのデータをjsonを用いて持ってくる
		creator.getDomFile('../../../template/common.html');				// 共通パーツのDOMを取得する。
		creator.getDomFile('../../../template/courseguide.html');		// コース紹介ページのパーツのDOMを取得する。

		creator.outputTag('guides', 'guides', '.header');		// ガイド領域を作る
		creator.outputTag('topMenu', 'topMenu', '.header');		// トップメニューを作る
		// ログイン状態をチェックする。
		checkLoginState();
		creator.outputTag('headImage', 'createImage');			// 天の画像を作る
		creator.outputTag('footImage', 'createImage');			// 地の画像を作る
		creator.outputTag('footer');							// フッターを作る
		// トップメニューにマウスオーバーのフィルターを配置する。
		functionFilter('.topMenu li');
		// メイン領域にヘッダーの高さ分のmarginを設定し、固定スクロール時に埋もれるのを阻止する。
		fixYCoordinate('header', '.main');
		// position:fixed;を設定したヘッダーが横スクロールしない問題を解決する関数をコールする。
		fixXCoordinateOnScroll('header')
		//花の上下の画像にMSL記事を移動する
		$('.createImage:first').after($('[id*="mslongtail_198"]'));
		$('.createImage:first').after($('#mslSocial'));

		//画像タグのパスを階層に合わせて修正する
		$('img').each(function(){
			var imgPath = $(this).attr('src');	//画像のパスを取得する
			//画像フォルダから取得している画像なら
			if(imgPath.indexOf('image/') != -1){
				//画像パスを階層に合わせる
				$(this).attr('src', '../../../' + $(this).attr('src'));
			}
		});
		
		//画面遷移イベントを登録する関数をコールする
		linkClicked('a[href*="#"],a[href$="#"][target!="_blank"]');
		removeTextNode('.main');	//不要なテキストを消す
	});
</script>
</head>
<!-- コンテンツを表示する領域 -->
<body>
	<!-- ウェブサイトの横幅の基準となる -->
	<div id="container">
	<!-- ヘッダー領域のタグ -->
	<header class="header"></header>
	<!-- メインのタグ -->
		<div class="main">
			<?php echo $msl_infos->get('h1'); ?>
			<!--MSL記事表示用-->
			<ul id="mslSocial">
				<li class="mslFacebook"><a href="http://www.facebook.com/share.php?u=<?php echo $msl_infos->get('article_url'); ?>"><img src="http://ddthink.com/test/before/ddtflowers/article/images/fb_likebtn.gif"></a></li>
				<li class="mslTwitter"><a href="https://twitter.com/share" class="twitter-share-button" data-url="<?php echo $msl_infos->get('article_url'); ?>" data-lang="ja" data-count="none">ツイート</a> 
					<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script> 
				</li>
				<li class="mslMixi"><a href="http://mixi.jp/share.pl" class="mixi-check-button" data-button="button-6">mixiチェック</a> 
					<script type="text/javascript" src="http://static.mixi.jp/js/share.js"></script> 
				</li>
			</ul>
			<?php echo $msl_infos->get('html_article'); ?>
			<!--MSL記事表示用-->
		</div>
	<!-- idをcontainerに指定したdivタグを閉じる -->
	</div>
	
<!-- bodyタグを閉じる -->
</body>
<!-- htmlタグを閉じる -->
</html>