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
<link href="../../css/list.css" rel="stylesheet" type="text/css">

<!-- メインのCSSファイルを読み込む。 -->
<link href="../css/style.css" rel="stylesheet" type="text/css">
<!-- jqueryUIのcssを読み込む -->
<link rel="stylesheet" type="text/css" href="../../../css/jquery-ui-1.10.4.custom.min.css" media="screen" />
<!-- Googleアナリティクスのトラッキングコード -->
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

<!-- メインのCSSファイルを読み込む。 -->
<link href="../../../css/style.css" rel="stylesheet" type="text/css">
<!-- メインのCSSファイルを読み込む。 -->
<link href="../../../css/style.css" rel="stylesheet" type="text/css">
<!-- コース案内のCSSファイルを読み込む。 -->
<link href="../../../css/courseguide.css" rel="stylesheet" type="text/css">

<!-- jQueryの本体を読み込む。 -->
<script src="../../../js/jquery-1.11.0.min.js"></script>
<!-- サイト全体のレイアウト調整用JSファイル。 -->
<script src="../../../js/flowersstylefix.js"></script>
<!-- jQueryUIを読み込む。 -->
<script type="text/javascript" src="../../../js/jquery-ui-1.9.2.custom.min.js"></script>
<!-- タグを作成するJSの関数群を読み込む -->
<script type="text/javascript" src="../../../js/createTag.js"></script>
<!-- ユーティリティクラスのjsファイル。 -->
<script src="../../../js/utils.js"></script>
<!-- 初期化変数を配置するための関数をコールするためのファイルを読み込む -->
<script type="text/javascript" src="../../../js/createDialog.js"></script>
<!-- MSLページ用の関数ファイルを読み込む -->
<script type="text/javascript" src="../../../js/mslFunctions.js"></script>
<!-- カレンダー作成のため、作成関数が定義してあるファイルを読み込む -->
<script type="text/javascript" src="../../../js/createLittleContent.js"></script>

<script>
	$(document).ready(function(){
		util = new utils();			//汎用関数のクラスのインスタンスを用意する
		creator = new createTag();	//createTagのクラスオブジェクトを生成する

		creator.getJsonFile('../../../source/commonJson.json');			// ファイルのデータをjsonを用いて持ってくる
		creator.getJsonFile('../../../source/blog.json');			// ファイルのデータをjsonを用いて持ってくる
		creator.getDomFile('../../../template/common.html');				// 共通パーツのDOMを取得する。
		creator.getDomFile('../../../template/courseguide.html');		// コース紹介ページのパーツのDOMを取得する。
		creator.getDomFile('../../../template/blog.html');				// ブログページのパーツのDOMを取得する。

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
		//@mod 2015.0604 T.Masuda カレンダークリックに反応しないようにしました
		linkClicked('a[href*="#"]:not(.ui-datepicker-calendar a),a[href$="#"][target!="_blank"]:not(.ui-datepicker-calendar a)');

		//ブログのリストなら
		if($('#mslongtail_1984').length){
			creator.outputTag('blogRightContent');						// 右側領域を作る
			creator.outputTag('blog','blog','.blogRightContent');		// 右側領域にブログ領域を作る
			
			creator.outputTag('blogLeftContent');						// 左側領域を作る
			creator.outputTag('calendar','calendar','.blogLeftContent');	// 左側領域にカレンダーを作る
			// 左側領域に最新記事一覧を作る
			creator.outputTag('currentArticleList','currentArticleList','.blogLeftContent');

			//datepickerによるカレンダーのクラスを作成する。
			var mslBlogCalendar = new blogCalendar('.calendar', dateArray);
			mslBlogCalendar.create();	//カレンダーを実際に作成する
						//ブログ記事の前にMSLのリストを配置する
			$('.blog').append($('#mslongtail_1984').show());
			//花の上下の画像にMSL記事を移動する
			$('.createImage:first').after($('.blogLeftContent'));
			//花の上下の画像にMSL記事を移動する
			$('.createImage:first').after($('.blogRightContent'));
			//タイトルを移動する
			$('.createImage:first').after($('#mslongtail_1984 h2'));
			//ブログページのCSSファイルを追加する
			//CSSファイルのパスを指定したlinkタグの文字列を用意する
			var style = '<link rel="stylesheet" href="../../../css/blog.css">';
			//linkタグの最後尾に新たにCSSファイル読み込みのlinkタグを追加する
		    $('head link:last').after(style);
		    //最新記事一覧の内容を作る(2015.0604時点未実装)
		    //insertArticleListText($('.currentArticleListContent'), currentArticlesData);
		}
	});
</script>

</head>
<!-- コンテンツを表示する領域 -->
<body>
	<!-- ウェブサイトの横幅の基準となる -->
	<div id="container">
	<!-- ヘッダー領域のタグ -->
	<header class="header"></header>
	<!-- コンテンツ領域のタグ -->
		<div class="main">
			<!--MSL記事表示用-->
			<?php echo $msl_infos->get('html_article'); ?>
			<!--MSL記事表示用-->
		</div>
	</div>
<!-- bodyタグを閉じる -->
</body>
<!-- htmlタグを閉じる -->
</html>