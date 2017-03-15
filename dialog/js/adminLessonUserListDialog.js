/* ファイル名:adminLessonUserListDialog.js
 * 概要　　　:管理者ページ 授業予約者一覧ダイアログのクラスファイル
 * 作成者　:T.Masuda
 * 場所　　:dialog/js/adminLessonUserListDialog.js
 */

/* クラス名:adminLessonUserListDialog.js
 * 概要　　:管理者ページ 授業予約者一覧ダイアログクラス
 * 親クラス:baseDialog
 * 引数	 :Element dialog:ダイアログのDOM
 * 作成者　:T.Masuda
 * 場所　　:dialog/js/adminLessonUserListDialog.js
 */
function adminLessonUserListDialog(dialog){
	baseDialog.call(this, dialog);	//親クラスのコンストラクタをコールする

	/* 関数名:getJson
	 * 概要　:必要なjsonデータをcreateTagのインスタンスに格納する
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:2015.0822
	 * 作成者　:T.Masuda
	 */
	this.getJson = function() {
		//管理者ページ受講者一覧ダイアログのjsonデータを取得する
		this[VAR_CREATE_TAG].getJsonFile(ADMIN_LESSON_USER_LIST_DIALOG_JSON);
		//授業データ検索のキーとして授業IDをインプットデータから取得し、JSONにセットする
		this.create_tag.json.lessonTable.id.value = this.dialogClass.getArgumentDataObject().classwork_key;
		//予約できる授業のデータ一覧をDBから取得してテーブルを作る準備をする
		this[VAR_CREATE_TAG].getJsonFile(URL_GET_JSON_ARRAY_PHP, this[VAR_CREATE_TAG].json[LESSON_TABLE], LESSON_TABLE);
	}

	/* 関数名:getDom
	 * 概要　:createTag用テンプレートHTMLを取得する(オーバーライドして内容を定義してください)
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0822
	 * 作成者　:T.Masuda
	 */
	this.getDom = function(){
		//DOMをクリアする
		this[VAR_CREATE_TAG].dom = EMPTY_STRING;
		//授業データ一覧ダイアログのテンプレートを取得する
		this[VAR_CREATE_TAG].getDomFile(ADMIN_LESSON_USER_LIST_DIALOG_HTML);
	};

	/* 関数名:customizeJson
	 * 概要　:constructionContentで取得したJSONの加工を行う
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.1011
	 * 作成者　:T.Masuda
	 */
	this.customizeJson = function(){
		//授業データがあれば
		if (this[VAR_CREATE_TAG].json[LESSON_TABLE].tableData.length) {
			//授業のデータを取得する
			var tableData = $.extend([], true, this[VAR_CREATE_TAG].json[LESSON_TABLE][TABLE_DATA_KEY]);

			//授業データを走査し、列データを置換していく
			for(var i = 0; i < tableData.length; i++){
				//予約状態を数値から文字列に変換していく
				tableData[i].user_work_status = commonFuncs.userClassworkStatuses[parseInt(tableData[i].user_work_status)];
			}
		}
	};
	
	/* 関数名:dispContentsMain
	 * 概要　:画面パーツ設定用関数のメイン部分作成担当関数
	 * 引数　:createLittleContents creator:createLittleContentsクラスインスタンス
	 * 		:dialogEx dialogClass:このダイアログのdialogExクラスのインスタンス
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0814
	 * 作成者　:T.Masuda
	 */
	this.dispContentsMain = function(){
		//授業一覧テーブルの外側の領域を作る
		this[VAR_CREATE_TAG].outputTag(TABLE_OUTER, TABLE_OUTER, $(this.dialog));
		//授業データがあれば
		if (this[VAR_CREATE_TAG].json[LESSON_TABLE].tableData.length) {
			//授業のデータ一覧テーブルを作る
			this[VAR_CREATE_TAG].outputTagTable(LESSON_TABLE, LESSON_TABLE, $(DOT+TABLE_OUTER, this.dialog));
		//なければ
		} else {
			//その旨を伝える
			this[VAR_CREATE_TAG].outputTag('noReserver', 'noReserver', $(this.dialog));
		}
	}

	/* 関数名:setConfig
	 * 概要　:ダイアログの設定を行う
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:2015.0822
	 * 作成者　:T.Masuda
	 */
	this.setConfig = function(){
		//閉じるボタンを作る
		this.setDialogButtons(this.close_single);
		//ダイアログの位置を修正する
		this.setDialogPosition(POSITION_CENTER_TOP);
	}


	/* 関数名:setCallback
	 * 概要　:ダイアログのイベントコールバックを設定する
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:2015.0822
	 * 作成者　:T.Masuda
	 */
	this.setCallback = function(){
		//テーブルの行をクリックイベントに対し授業詳細ダイアログを開くコールバック関数を登録する
		this.setCallbackRowClick();
	}

	/* 関数名:setCallbackRowClick
	 * 概要　:テーブルの行をクリックした時のイベントのコールバック関数を設定する
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:015.08.22
	 * 作成者　:T.Masuda
	 */
	this.setCallbackRowClick = function() {
		//当クラスインスタンスをイベントコールバック内で使える用に変数に格納する
		var thisElem = this;	
		//ダイアログの内のテーブルの行をクリックしたときのコールバック関数をセットする
		$(SELECTOR_TBODY_TR, this.dialog).on(CLICK, function(){
			//行データを引数にコールバック用関数をコールする
			thisElem.callbackRowClick(this);
		});
	};

	/* 関数名:callbackRowClick
	 * 概要　:テーブルの行をクリックした時のイベントのコールバック関数
	 * 引数　:Element row:行データ
	 * 返却値:なし
	 * 作成日　:015.11.08
	 * 作成者　:T.Masuda
	 */
	this.callbackRowClick = function(row) {
		//クリックした人でログインするために会員番号を取得する
		var memberId = $(row).children('.id').text();
		//クリックした人でなり代わりログインを行う
		loginInsteadOfMember(memberId);
		commonFuncs.showCurrentWindow();
	};
}

//継承の記述
adminLessonUserListDialog.prototype = new baseDialog();
//サブクラスのコンストラクタを有効にする
adminLessonUserListDialog.prototype.constructor = baseDialog;

