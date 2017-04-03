/* ファイル名:memberReserveConfirmDialog.js
 * 概要　　　:会員、予約確認ダイアログ
 * 作成者　:T.Yamamoto
 * 場所　　:dialog/js/memberReserveConfirmDialog.js
 */

/* クラス名:memberReserveConfirmDialog.js
 * 概要　　:URLからダイアログのHTMLファイルを取得して表示する。
 * 親クラス:baseDialog
 * 引数	 :Element dialog:ダイアログのDOM
 * 作成者　:T.Masuda
 * 場所　　:dialog/js/memberReserveConfirmDialog.js
 */
function memberReserveConfirmDialog(dialog){
	baseDialog.call(this, dialog);	//親クラスのコンストラクタをコールする
	
	/* 関数名:getJson
	 * 概要　:create_tagのインスタンスにデータのjsonをまとめるための処理
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0815
	 * 作成者　:T.Masuda
	 */
	this.getJson = function(){
		//データとなるjsonを読み込む
		this[VAR_CREATE_TAG].getJsonFile(MEMBER_RESERVE_CONFIRM_DIALOG_JSON);
		//DBから値を読み込むためにデータをセットする
		commonFuncs.setJsonDataFromArgumentObj(this[VAR_CREATE_TAG], this.dialogClass);
		//DBからデータを読み込む
		this[VAR_CREATE_TAG].getJsonFile(URL_GET_JSON_STRING_JSP, this[VAR_CREATE_TAG].json[CLASS_LESSON_CONFIRM_CONTENT], CLASS_LESSON_CONFIRM_CONTENT);
	}

	/* 関数名:getDom
	 * 概要　:create_tagのインスタンスにテンプレートのHTMLをまとめるための処理
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0815
	 * 作成者　:T.Masuda
	 */
	this.getDom = function(){
		//予約確認ダイアログ個別テンプレートを取得する
		this[VAR_CREATE_TAG].getDomFile(MEMBER_RESERVE_CONFIRM_DIALOG_HTML);
	}
	
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
		//ダイアログのコンテンツを作る
		this[VAR_CREATE_TAG].outputTag(CLASS_LESSON_CONFIRM_CONTENT, CLASS_LESSON_CONFIRM_CONTENT, CURRENT_DIALOG_SELECTOR);
	}

	/* 関数名:setCallback
	 * 概要　:ダイアログのコールバックを設定する
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:2015.0815
	 * 作成者　:T.Masuda
	 */
	this.setCallback = function(){
		//親ダイアログから渡されたクローズ用コールバック関数をセットする
		this.dialogClass.setCallbackCloseOnAfterOpen(this.dialogClass.getArgumentDataObject().callback);
	}

	/* 関数名:setConfig
	 * 概要　:ダイアログの設定を行う。任意でオーバーライドして定義する
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:2015.0822
	 * 作成者　:T.Masuda
	 */
	this.setConfig = function(){
		//はい・いいえボタンを使う
		this.setDialogButtons(this.yes_no);
		//ダイアログの位置調整を行う
		this.setDialogPosition(POSITION_CENTER_TOP);
	}

}

//継承の記述
memberReserveConfirmDialog.prototype = new baseDialog();
//サブクラスのコンストラクタを有効にする
memberReserveConfirmDialog.prototype.constructor = baseDialog;
