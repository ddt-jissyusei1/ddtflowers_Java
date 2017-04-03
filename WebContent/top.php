<!-- container -->
<div id="container" class="window" name="usuall">

<header class="header">
</header>
	<div class="main">
		<pageAuth style="display: none">0xFF</pageAuth>
		<script>
			try{
				commonFuncs = new common();						//汎用共通関数定義クラスインスタンスを生成する
				//ページの権限をクッキーへ設定する 2016.10.09 r.shibata 追加
				commonFuncs.setPageAuthToCookie();

				var create_tag = new createLittleContents();		//createTagクラスのインスタンスを生成する
				
				create_tag.getJsonFile('source/index.json');		// ファイルのデータをjsonを用いて持ってくる
				create_tag.getJsonFile('source/commonJson.json');	// ファイルのデータをjsonを用いて持ってくる
				create_tag.getDomFile('template/common.html');		// 共通パーツのDOMを取得する。
				create_tag.getDomFile('template/toppage.html');	// トップページのパーツのDOMを取得する。
				//ヘッダー内のタグが作成済みでなければ
			
				create_tag.createNormalHeaderContent();	//ヘッダー内のタグが作成済みでなければ作る。
			
				create_tag.outputTag('flowerBackground', 'createImage', CURRENT_WINDOW_MAIN);	// トップページ背景を作る 2016.12.28 r.shibata 出力セレクターをカレントウィンドウのmainに出力するよう変更

				//ギャラリーの新着情報を取得する
				create_tag.getJsonFile(URL_GET_JSON_ARRAY_JSP, create_tag.json.getTopicGallery, 'getTopicGallery');
				//ブログの新着情報を取得する
				create_tag.getJsonFile(URL_GET_JSON_ARRAY_JSP, create_tag.json.getTopicBlog, 'getTopicBlog');

				//ギャラリー、ブログの新着記事情報をセットする
				commonFuncs.setDataToNoticeContents(create_tag.json.topicGallery, create_tag.json.getTopicGallery.tableData, commonFuncs.sampleNoticeDataOrganizeKeyArray, commonFuncs.sampleNoticeDataOrganizeSettingObj);
				commonFuncs.setDataToNoticeContents(create_tag.json.topicBlog, create_tag.json.getTopicBlog.tableData, commonFuncs.sampleNoticeDataOrganizeKeyArray, commonFuncs.sampleNoticeDataOrganizeSettingObj);
				//各お知らせを表示するボタンを作る
				create_tag.outputTag('topicShowCampaign','topicShow', '.flowerBackground');
				create_tag.outputTag('topicShowGallery','topicShow', '.flowerBackground');
				create_tag.outputTag('topicShowBlog','topicShow', '.flowerBackground');
				//各お知らせを作る。
				create_tag.outputTag('topicGallery','topic', '.flowerBackground');
				create_tag.outputTag('topicCampaign','topic', '.flowerBackground');
				create_tag.outputTag('topicBlog','topic', '.flowerBackground');
				
				create_tag.outputTag('footer');							// フッターを作る
				
				// トップメニューにマウスオーバーのフィルターを配置する。
				functionFilter('.topMenu li');
			
				//0ミリ秒後にキャンペーンお知らせ表示ボタンをスライド表示する。
				commonFuncs.moveNoticeWindows();
				//お知らせウィンドウを開閉させるイベントを登録する
				commonFuncs.toggleNoticeWindows();


				commonFuncs.setShowSelectedBlogArticleEvent();			
				
			//例外処理
			}catch(e){
				//エラーログを出す
				console.log(e);
			}
		</script>
	</div>
</div>
<!-- JavaScriptのコードを記述する -->
