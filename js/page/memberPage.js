
/* 
 * ファイル名:memberPage.js
 * 概要  :会員トップページ用のjsファイル
 * 作成者:T.Yamamoto
 * 作成日:2015.08.04
 * パス :/js/page/memberPage.js
 */

/* 
 * 関数名:createMemberFinishedLessonContent
 * 概要  :会員ページの受講済み授業タブの内容を作る
 * 引数  :なし
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.07.20
 * 変更者:R.Shibata
 * 変更日:2016.10.11
 * 内容  :取得したテーブルレコードが0件の時の条件を削除。
 */
function createMemberFinishedLessonContent() {
	//受講済み授業の絞り込み領域を作る
	create_tag.outputTag('selectTheme', 'selectTheme', '#finishedLesson');
	//受講済みテーブルページングの一番外側となる領域を作る
	create_tag.outputTag('finishedLessonPagingArea', 'divArea', '#finishedLesson');
	//ページングのテーブルを作るためにテーブルの外側となるdivを作る
	create_tag.outputTag('finishedLessonTableOutside', 'divArea', '.finishedLessonPagingArea');
	// ナンバリング領域を作る
	create_tag.outputTag('numberingOuter', 'numberingOuter', '.finishedLessonPagingArea');
	//受講済み授業一覧テーブルを表示する
	create_tag.loadTableData('finishedLessonTable', NUMBERING_START, NUMBERING_PAGE, NUMBERING_DEFAULT, NUMBERING_DISPLAY_FINISHEDLESSON_TABLE, '.finishedLessonTableOutside', 'finshedLessonTableAfterPaging'); //  表示件数を示す定数を共通の物でなく、受講済み一覧用の定数を使用するよう変更 2016.10.06 r.shibata
	//授業の絞り込み機能を実装する
	setConfigFinishedLesson();
}

/* 
 * 関数名:setConfigFinishedLesson
 * 概要  :受講済み授業タブの設定を行う。
 		設定内容は授業の絞り込み機能
 * 引数  :なし
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.08.29
 */
function setConfigFinishedLesson() {
	//セレクトボックスのvalueを画面に表示されている値にする
	create_tag.setSelectboxValueWithName('.selectThemebox');
	//絞り込み機能を実装する
	finshedLessonTableThemeSelect();
}

/*
 * 関数名:finshedLessonTableAfterPaging
 * 概要  :会員トップ、受講済みテーブルでページングボタンがクリックされた時や
 		テーマでの絞り込み機能でテーブルをリロードした後にテーブルの値を置換する処理を行う
 * 引数  :なし
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.07.30
 */
function finshedLessonTableAfterPaging() {
	//受講済みテーブルを編集が終わるまで表示しなくする
	$('.finishedLessonTable').hide();
	//時間差で表現するためにsetTimeOutを使う
	setTimeout(function(){
		//ページングの処理を行う件数を取得するためにページングの現在のページを取得する 2016.12.29 mod k.urabe セレクタの指定が不足していたため指定範囲を限定するよう修正
		var nowPageNumber = Number($(SELECTOR_FINISHED_LESSONTABLE_NUMBERING).text() - 1);
		//ページャがなければページ番号を1とする
		nowPageNumber = nowPageNumber > -1 ? nowPageNumber : 0;
		//テーブルのデータを取得する
		var tableData = $('#finishedLesson')[0].create_tag.json.finishedLessonTable[TABLE_DATA_KEY];
		//テーブルのレコード数を取得する
		var recordCount = Number(tableData.length);
		//今のページングの値が最大値なら行数の最大値、違うならページングの最後の行の値をループの終わり値とする
		var loopEndCount = loopEndCount >= recordCount ? recordCount-1 : nowPageNumber * 10 + 9;
		//テーブルのループのための行番号を取得する
		var rowNumber = 1;
		
		//ループで受講済みテーブルを編集する
		//ループの開始の値を算出する(loopStartCount)
		for(var loopStartCount = nowPageNumber * 10; loopStartCount <= loopEndCount; loopStartCount++) {
			//走査対象のデータがなければ
			if(tableData[loopStartCount] === void(0)){
				break;	//ループを抜ける
			}
			
			//テーブルの値を置換する
			commonFuncs.callMemberLessonValue('.finishedLessonTable', tableData, loopStartCount, rowNumber);
			//行番号をインクリメントして次の行についてのループに備える
			rowNumber++;
		}
		
		//受講済みテーブルを表示する
		$('.finishedLessonTable').show();
	},1);
}

/*
 * 関数名:finshedLessonTableThemeSelect
 * 概要  :会員top、受講済み授業一覧のテーブルをテーマのセレクトボックスが変更されたときに変換するイベントを登録する
 * 引数  :なし
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.07.30
 */
function finshedLessonTableThemeSelect() {
	//絞り込みボタンがクリックされたとき
	$('#finishedLesson').on(CLICK, '.filterButton', function() {
		//受講済み授業一覧のcreateTagを取得する
		var create_tag = $('#finishedLesson')[0].create_tag;
		//テーブルを作るためのクエリを置換する
		create_tag.replaceTableQuery('finishedLessonTable');
		//ページングに使うものを初期化し、ページングを作り直すために備える
		create_tag.pagingReset('finishedLessonTable');
		//クエリを発行してDBから対象のデータの受講済み授業一覧のデータを取り出す
		create_tag.getJsonFile(URL_GET_JSON_ARRAY_PHP, create_tag.json.finishedLessonTable, 'finishedLessonTable');
		//ページング機能付きで受講済みテーブルを作り直す
		create_tag.outputNumberingTag('finishedLessonTable', NUMBERING_START, NUMBERING_PAGE, NUMBERING_DEFAULT, NUMBERING_DISPLAY_FINISHEDLESSON_TABLE, '.finishedLessonTableOutside', 'finshedLessonTableAfterPaging', "$('#finishedLesson')[0]."); //  表示件数を示す定数を共通の物でなく、受講済み一覧用の定数を使用するよう変更 2016.10.06 r.shibata
	});
}

/*
 * 関数名:addExecuteFinishedLessonSearchEvent
 * 概要  :指定した対象を押下することで受講済みテーブルの絞り込みを実行するイベントを登録する
 * 引数  :なし
 * 返却値  :なし
 * 作成者:T.Masuda
 * 作成日:2016.04.10
 */
function addExecuteFinishedLessonSearchEvent(target){
	//対象のボタンを押下したら
	$(target).on(CLICK, function(){
		//絞り込みを行う
		$('#finishedLesson .selectThemebox').trigger(CHANGE);
	});
}
