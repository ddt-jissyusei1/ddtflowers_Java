/** ファイル名:createBlog.js
 * 概要　　　:ブログ記事作成関連のJSファイル
 * 作成日　:2016.05.06
 * 作成者　:T.Masuda
 * 場所　　:js/createBlog.js
 */

/*
 * 関数名:sendArticleData
 * 引数   :なし
 * 戻り値 :なし
 * 概要   :記事を投稿する
 * 作成日 :2015.11.07
 * 作成者 :T.M
 */
function sendArticleData(articleNumber, create_tag){
	
	//フォームデータを取得する
	var sendObject = commonFuncs.createFormObject('.blogEdit');
	//ユーザIDをオブジェクトにセットする
	sendObject.user_key = create_tag.getUserId();
	//記事IDをオブジェクトにセットする
	sendObject.id = articleNumber;
	
	//新規作成であれば
	if(articleNumber == 0){
		//INSERT用クエリをセットする
		sendObject.db_setQuery = create_tag.json.insertMyBlog.db_setQuery;
	//編集であれば
	} else {
		//UPDATE用クエリをセットする
		sendObject.db_setQuery = create_tag.json.updateMyBlog.db_setQuery;
	}
	
	//データを送信する
	var result = new baseDialog().sendQuery(URL_SAVE_JSON_DATA_PHP, sendObject);
	//データの保存に成功していれば
	if(parseInt(result.message)){
		//マイブログページに戻る
		$(CURRENT_WINDOW)[0].instance.callPage('window/member/page/memberMyBlog.html');
	//失敗であれば
	} else {
		//ダイアログでその旨を伝える
		commonFuncs.showMessageDialog('記事編集', MESSAGE_BLOG_NOT_MODIFIED);
	}
}	
