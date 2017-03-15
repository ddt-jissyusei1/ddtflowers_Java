<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>DDTFlowers/プリザーブドフラワー</title>
</head>
<body>
	<div id="container">
		<div class="main">
			<!-- コース案内のCSSファイルを読み込む。 -->
			<link href="css/courseguide.css" rel="stylesheet" type="text/css">
			<!-- ギャラリーページのCSSファイルを読み込む。 -->
			<link href="css/gallery.css" rel="stylesheet" type="text/css">
			<script>
				//カレントのウィンドウのDOMを取得する
				var $currentWindow = $(CURRENT_WINDOW);
				//カレントのウィンドウのコンテンツ領域を取得する
				var $currentContent = $(CURRENT_WINDOW_MAIN)
				
				//createTagクラスのインスタンスを生成する
				var create_tag = new createLittleContents();
				
				create_tag.getJsonFile('source/gallery.json');			// ギャラリーページ用のJSONデータを取得する。
				create_tag.getJsonFile('source/gallerycontent.json');	// フォトギャラリー用のJSONデータを取得する。
				create_tag.getJsonFile('source/commonJson.json');		// 各ページ共通のパーツのJSONデータを取得する。
				//テンプレートのDOMを取得する。
				create_tag.getDomFile('template/common.html');
				create_tag.getDomFile('template/gallery.html');

				//accountHeaderから会員IDを取得する。別ユーザログインしていた場合はcookieからIDを取得する
				var memberInfo = commonFuncs.checkEmpty(commonFuncs.GetCookies().otherUserId) ?  commonFuncs.GetCookies().otherUserId: create_tag.json.accountHeader.user_key.value;
				create_tag.json.accountHeader.user_key.value = memberInfo;	//取得したIDをaccountHeaderに反映する
				
				//ユーザ情報のテキストをDBから取得する
				create_tag.getJsonFile('php/GetJSONString.php', create_tag.json['accountHeader'], 'accountHeader');
				// パーツのテンプレートのDOMを取得する。
				create_tag.getDomFile('template/memberCommon.html');
				// 共通のパーツのJSONを取得する。
				create_tag.getJsonFile('source/memberCommon.json');
				
				// 会員ページヘッダーを作る
				create_tag.outputTag('accountHeader', 'memberHeader', $currentContent);
				// バナー領域を作る
				create_tag.outputTag('userBanner', 'userBanner', $currentContent);
				
				create_tag.outputTag('headImage', 'createImage', $currentContent);			// 天の画像を作る
				create_tag.outputTag('pageTitle', 'pageTitle', $currentContent);			// タイトル領域を作る
				create_tag.outputTag('gallery', 'gallery', $currentContent);				// ギャラリーページ用のギャラリーを作る。
				create_tag.outputTag('numberingOuter', 'numberingOuter', $currentContent);	//ナンバリング領域を作る
				create_tag.outputTag('footImage', 'createImage', $currentContent);			// 地の画像を作る
				create_tag.outputTag('footer', 'footer', $currentContent);					// フッターを作る

				create_tag.outputNumberingTag('photo', 1, 4, 1, 8, '.gallery');	// ギャラリーの記事を作る。
				
				// メイン領域にヘッダーの高さ分のmarginを設定し、固定スクロール時に埋もれるのを阻止する。
				// fixYCoordinate('header', '.main');
				// position:fixed;を設定したヘッダーが横スクロールしない問題を解決する関数をコールする。
				fixXCoordinateOnScroll('header')
				//ギャラリーの画像を拡大できるようにする。
				create_tag.useZoomImage('photo');
				addlogoutEvent('.logoutLink');	//ログアウトボタンのイベントを登録する。
				
			</script>
		</div>
	</div>
</body>
</html>