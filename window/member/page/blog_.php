<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
</head>
<body>
	<div id="container">
		<div class="main">
			<!-- コース案内のCSSファイルを読み込む。 -->
			<link href="css/courseguide.css" rel="stylesheet" type="text/css">
			<!-- ブログのCSSファイルを読み込む。 -->
			<link href="css/blog.css" rel="stylesheet" type="text/css">
			<script>
				//createTagクラスインスタンスを生成する
				//カレントのウィンドウのDOMを取得する
				var $currentWindow = $(CURRENT_WINDOW);
				//カレントのウィンドウのコンテンツ領域を取得する
				var $currentContent = $(CURRENT_WINDOW_MAIN);
				//createTagを用意する
				var create_tag = new createLittleContents();
				
				create_tag.getJsonFile('source/blog.json');			// ファイルのデータをjsonを用いて持ってくる
				create_tag.getJsonFile('source/commonJson.json');		// ファイルのデータをjsonを用いて持ってくる
				create_tag.getJsonFile('source/blogcontent.json');		// テスト用のブログJSONデータを取得する。
				create_tag.getDomFile('template/common.html');			// 共通パーツのDOMを取得する
				create_tag.getDomFile('template/blog.html');			// ブログページ用のDOMを取得する

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

				// 天の画像を作る
				create_tag.outputTag('headImage', 'createImage', $currentContent);				
				create_tag.outputTag('pageTitle', 'pageTitle', $currentContent);	// タイトル領域を作る

				// 右側領域を作る
				create_tag.outputTag('blogRightContent', 'blogRightContent', $currentContent);
				create_tag.outputTag('blog','blog','.blogRightContent');		// 右側領域にブログ領域を作る
				create_tag.outputTag('numberingOuter','numberingOuter','.blogRightContent');
				
				create_tag.outputNumberingTag('blogArticle', 1, 4, 1, BLOG_SHOW_PAGES, '.blog');	// ブログの記事を作る。
				
				create_tag.outputTag('blogLeftContent', 'blogLeftContent', $currentContent);	// 左側領域を作る
				create_tag.outputTag('calendar','calendar','.blogLeftContent');	// 左側領域にカレンダーを作る
				create_tag.outputTag('currentArticleList','currentArticleList','.blogLeftContent');
				
				create_tag.outputTag('footImage', 'createImage', $currentContent);		// 地の画像を作る
				create_tag.outputTag('footer', 'footer', $currentContent);				// フッターを作る
				
				// position:fixed;を設定したヘッダーが横スクロールしない問題を解決する関数をコールする。
				fixXCoordinateOnScroll('header')
				//記事の画像を拡大できるようにする。
				create_tag.useZoomImage('blogArticleImages');
				
				//datepickerによるカレンダーのクラスを作成する。
				var bCalendar = new blogCalendar('.calendar', create_tag, create_tag.json.blogArticle[TABLE_DATA_KEY]);
				bCalendar.create();	//カレンダーを実際に作成する
				create_tag.createNewArticleList();	//最新記事一覧を作る

				addlogoutEvent('.logoutLink');	//ログアウトボタンのイベントを登録する。
				
				</script>
		</div>	
	</div>
</body>
</html>