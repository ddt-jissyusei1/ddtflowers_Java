/** ファイル名:adminLessonList.js
 * 概要　　　:管理者画面 授業詳細タブのダイアログ用関数クラス定義のファイル
 * 作成日　:2016.0501
 * 作成者　:T.Masuda
 * 場所　　:js/page/adminLessonList.js
 */

/** クラス名:adminLessonList
 * 概要　　　:管理者画面 授業詳細タブのダイアログ用関数クラス
 * 親クラス  :baseDialog
 * 引数     :なし
 * 作成日　:2016.0501
 * 作成者　:T.Masuda
 */
function adminLessonList() {

	//押されたボタンを示すメンバ
	this.pushedButtonState = 0;
	
	/* 関数名:callbackCreateNew
	 * 概要　:新規作成ボタンのコールバック関数
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:2015.0822
	 * 作成者　:T.Masuda
	 */
	this.callbackCreateNew = function(){
		//ボタンが押されたときの状態の値を設定する。
		this.pushedButtonState = CREATE_NEW;
		this.openDialog(URL_ADMIN_LESSON_CREATE_DIALOG);	//授業新規作成ダイアログを開く
	}

	/* 関数名:callbackEdit
	 * 概要　:編集ボタンのコールバック関数(必ずオーバーライドで内容を定義されたし)
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:2016.0409
	 * 作成者　:T.Masuda
	 */
	this.callbackEdit = function(){
		this.pushedButtonState = EDIT;
		//選択されている行を取得する
		var $selectedRecord = $(SELECTOR_TBODY_TR, $('#lessonList')).filter('.selectRecord');
		//1行選択されていたら
		if ($selectedRecord.length == 1){
			//次のダイアログに渡すオブジェクトを準備する
			var returnStatusObj = $(CURRENT_DIALOG)[0].instance.getReturnStatusObject();
			//選択した行のインデックスを取得する
			var index = $(SELECTOR_TBODY_TR, $('#lessonList')).index($selectedRecord);			
			//取得したオブジェクトにクリックした行の番号をセットする
			returnStatusObj[CLICKED_ROW] = index;
			
			this.openDialog(URL_ADMIN_LESSON_DETAIL_DIALOG);	//授業詳細ダイアログを開く
		//選択なし、または2行以上選択されていたら
		} else {
			//警告を出す
			alert(MESSAGE_NEED_SELECT_RECORD);
		}
	}

	/* 関数名:callbackCreateNew
	 * 概要　:削除ボタンのコールバック関数(必ずオーバーライドで内容を定義されたし)
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:2016.0409
	 * 作成者　:T.Masuda
	 */
	this.callbackDelete = function(){
		this.pushedButtonState = DELETE;
		//対象がなければ
		if($('.selectRecord', $(SELECTOR_ADMIN_LESSON_LIST_TABLE_AREA)).length == 0) {
			//警告を出す
			alert(MESSAGE_CHOOSE_TARGET);
			return false;	//処理を行わない
		}
		
		//ダイアログを呼び出して確認を取った上で削除を行う
		askExecuteDelete('指定した授業を削除しますか?', "if($(CURRENT_DIALOG_SELECTOR)[0].instance.getPushedButtonState() == YES) {deleteRecords('.lessonTable', '.selectRecord', $('.lessonTable').closest('.tabPanel')[0].create_tag.json.lessonDeleteQuery, null, $('.lessonTable').closest('.tabPanel')[0].create_tag.json.lessonTable.tableData, null);}");
	}
	
	/* 関数名:setArgumentObj
	 * 概要　:ダイアログに渡すオブジェクトを生成する
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:015.08.14
	 * 作成者　:T.Masuda
	 */
	this.setArgumentObj = function() {
		//授業一覧タブのcreateTagを取得する
		var create_tag = $(LESSON_LIST_TAB)[0].create_tag;
		//当該ダイアログが生成されたときに渡されたインプット用データオブジェクトを取得する
		var argumentObj = commonFuncs.createCloneObject($(CURRENT_DIALOG)[0].instance.getArgumentObject());
		//イベントコールバックの起点となったものを判別する
		switch(this.pushedButtonState){
			//新規作成ボタンが押された
			case CREATE_NEW:
				//新規作成用のデータを取得してまとめる。また、close時のコールバック関数のポインタを渡す
				$.extend(true, 
						argumentObj.data, //このダイアログに渡されたインプット用データ
						{tableData:create_tag.json.lessonTable.tableData}, //授業一覧テーブルの全行データ
						//ダイアログインスタンスと新規作成ダイアログのclose時コールバック関数
						{parentDialogBuilder:$(CURRENT_DIALOG)[0].dialogBuilder, callback:this.newLessonEntry}
				);
				//ダイアログのタイトルをセットする
				argumentObj.config.title = TITLE_CREATE_LESSON;
				
				break;	//switchを抜ける
			//編集ボタン
			case EDIT:
				//選択されている行を取得する
				var $selectedRecord = $(SELECTOR_TBODY_TR, $('#lessonList')).filter('.selectRecord');
				//当該行の順番を調べる
				var index = $(SELECTOR_TBODY_TR, $('#lessonList')).index($selectedRecord);
				//既存の授業のデータを取得してまとめる
				$.extend(true,
						argumentObj.data, //このダイアログに渡されたインプット用データ
						//行データ
						create_tag.json.lessonTable.tableData[index],
						{parentDialogBuilder:$(CURRENT_DIALOG)[0].dialogBuilder}	//ダイアログインスタンス
				);
				//ダイアログのタイトルをセットする
				argumentObj.config.title = TITLE_EDIT_LESSON;
				
				break;	//switchを抜ける
			//削除ボタン
			case DELETE:
				//オブジェクトを作る必要なし
				break;	//switchを抜ける
			//授業一覧テーブルの行がクリックされた
			default:
				break;	//switchを抜ける
		}

		return argumentObj;	//生成したオブジェクトを返す
	}

}

//継承の記述
adminLessonList.prototype = new baseDialog();
//サブクラスのコンストラクタを有効にする
adminLessonList.prototype.constructor = baseDialog;
