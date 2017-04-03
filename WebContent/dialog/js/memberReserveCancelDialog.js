/* ファイル名:memberReserveCancelDialog.js
 * 概要　　　:会員、予約キャンセルダイアログ
 * 作成者　:T.Yamamoto
 * 場所　　:dialog/js/memberReserveCancelDialog.js
 */

/* クラス名:memberReserveCancelDialog.js
 * 概要　　:URLからダイアログのHTMLファイルを取得して表示する。
 * 親クラス:baseDialog
 * 引数	 :Element dialog:ダイアログのDOM
 * 作成者　:T.Masuda
 * 場所　　:dialog/js/memberReserveCancelDialog.js
 */
function memberReserveCancelDialog(dialog){
	baseDialog.call(this, dialog);	//親クラスのコンストラクタをコールする

	/* 関数名:dispContents
	 * 概要　:openDialogから呼ばれる、画面パーツ設定用関数
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0813
	 * 作成者　:T.Masuda
	 */
	this.dispContents = function(){
		try{
			//ダイアログ内コンテンツの準備を行う
			this.constructionContent();
			//小分けした画面作成用関数をコールする
			this.dispContentsHeader();	//上部
			this.dispContentsMain();	//メイン部分
			this.dispContentsFooter();	//下部
			this.setConfig();			//ダイアログの設定関数をコールする
			this.setCallback();			//イベントのコールバック関数をセットする
			//キャンセル料を算出してcreateTagにセットする
			this.setCancelCharge();
		} catch(e){
			console.log(e);
			//ダイアログ生成エラー
			throw new failedToDisplayException();
		}
	}


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
		this[VAR_CREATE_TAG].getJsonFile(MEMBER_RESERVE_CANCEL_DIALOG_JSON);
		//DBから値を読み込むためにデータをセットする
		commonFuncs.setJsonDataFromArgumentObj(this[VAR_CREATE_TAG], this.dialogClass);
		//DBからデータを読み込む
		this[VAR_CREATE_TAG].getJsonFile(URL_GET_JSON_STRING_PHP, this[VAR_CREATE_TAG].json[CLASS_LESSON_CONFIRM_CONTENT], CLASS_LESSON_CONFIRM_CONTENT);
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
		//予約キャンセルダイアログ個別テンプレートを取得する
		this[VAR_CREATE_TAG].getDomFile(MEMBER_RESERVE_CANCEL_DIALOG_HTML);
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

	/* 関数名:setCancelCharge
	 * 概要　:キャンセル料をセットする
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:2015.1212
	 * 作成者　:T.Masuda
	 */
	this.setCancelCharge = function() {
		//インプットデータオブジェクトを取得する
		var data = this.dialogClass.getArgumentDataObject();
		//インプットデータからレッスン日時を取得する
		var lessonDate = data.lesson_date;
		//受講料を取得する
		var cost = parseInt(data.cost);
		//createTagからキャンセル料のレートをまとめたノードを取り出す
		var cancelRateNodes = this.create_tag.json.lessonConfirmContent.attention.cancelRateValue;

		// キャンセルのノード情報を渡して、キャンセル料のレートをまとめる
		var rate = this.getRateArray(cancelRateNodes);

		//キャンセル料を算出する
		var cancelCharge = commonFuncs.calcCancelCharge(lessonDate, cost, rate); //キャンセル料を算出する
		this.create_tag.cancel_charge = cancelCharge;	//キャンセル料をcreateTagにセットする
	}

	/* 関数名:getRateArray
	 * 概要　:キャンセル情報のノードの中から、キャンセル料算出に必要な情報を抜き出して連想配列を作る。
	 * 引数　:object cancelRateNodes　キャンセルのレート情報をまとめたオブジェクト
	 * 返却値:object retObj
	 * 作成日　:2016.12.27
	 * 作成者　:k.urabe
	 */
	 this.getRateArray = function(cancelRateNodes) {
		// キャンセル料のノードからキャンセル料算出用の連想配列を作成する
		var retObj = [];
		// 最も日付が近いレートをセットする
		retObj.push({cancel_days : parseInt(cancelRateNodes.cancel__0.cancel_days.text), cancel_rate : parseInt(cancelRateNodes.cancel__0.cancel_rate.text)});
		// 中央のレートをセットする
		retObj.push({cancel_days : parseInt(cancelRateNodes.cancel__1.cancel_days.text), cancel_rate : parseInt(cancelRateNodes.cancel__1.cancel_rate.text)});
		// 最も日付が離れているレートをセットする
		retObj.push({cancel_days : parseInt(cancelRateNodes.cancel__2.cancel_days.text), cancel_rate : parseInt(cancelRateNodes.cancel__2.cancel_rate.text)});
		// 完成したレート用連想配列をcancel_daysの降順にソートする
		commonFuncs.sortArray(retObj, KEY_CANCEL_DAYS, false);	 
		
		// 完成した連想配列を返す。
		return retObj
	 }
	
}

//継承の記述
memberReserveCancelDialog.prototype = new baseDialog();
//サブクラスのコンストラクタを有効にする
memberReserveCancelDialog.prototype.constructor = baseDialog;
