/* 
 * ファイル名:reservedLessonTable.js
 * 概要  :会員ページトップ、予約済み授業一覧テーブル
 * 作成者:T.Yamamoto
 * 作成日:2015.09.20
 * パス :/js/reservedLessonTable.js
 */

/* 
 * クラス名:reservedLessonTable
 * 概要  :管理者ページの受講承認タブの内容を作る
 * 引数  :なし
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.09.20
 */
function reservedLessonTable() {
	//インスタンスを保存して「this」の意味が変わっても使えるようにする
	var thisClass = this;
	/* 関数名:setArgumentObj
	 * 概要　:ダイアログに渡すオブジェクトを生成する
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:015.08.15
	 * 作成者　:T.Masuda
	 */
	this.setArgumentObj = function(clickRowData, create_tag) {
		//新たにオブジェクトを作り、親ダイアログから引き継いだargumentObjの内容をセットする
		var argumentObj = $.extend(true, {}, commonFuncs.getDefaultArgumentObject());
		//子ダイアログに渡すオブジェクトを生成する
		$.extend(true, argumentObj.data,							//元データ
				clickRowData.data,										//クリックした行データ
				{callback:this.cancelExecute},					//子ダイアログclose時のコールバック関数
				{create_tag:create_tag}
		);
		argumentObj.config.title = changeJapaneseDate(clickRowData.data[COLUMN_NAME_LESSON_DATE]);
		return argumentObj;	//生成したオブジェクトを返す
	}
	

	/* 関数名:openCancelDialog
	 * 概要　:テーブルの行をクリックした時のイベントのコールバック関数(内容はオーバーライドして定義されたし)
	 * 引数　:Element clicked:クリックされた行の要素
	 * 返却値:なし
	 * 作成日　:2015.09.12
	 * 作成者　:T.Yamamoto
	 */
	this.openCancelDialog = function(clicked, memberNumber, create_tag) {
		//クリックした行の番号とデータを取得する。様々なところで使い回せるため、メンバに保存する
		var recordData = this.getClickTableRecordData(clicked, RESERVED_LESSON_TABLE, RESERVED_LESSON_TABLE_RECORD, create_tag);
		
		//キャンセルダイアログに値を渡すためのデータを作る
		var argumentObj = this.setArgumentObj(recordData, create_tag);
		//ダイアログclose時に授業キャンセル処理を走らせる
		argumentObj.config.close = this.cancelExecute;
		//予約キャンセルダイアログのURLをセットする
		dialogUrl = HTML_MEMBER_RESERVE_CANCEL_DIALOG;
		//openイベントはsetArgumentObjでセットしておく
		var newDialog = new dialogEx(dialogUrl, argumentObj);
		//openイベントのコールバック関数をセットする
		newDialog.run();	//ダイアログを開く
	}

	/*
	 * 関数名:getClickTableRecordData
	 * 概要　:クリックされたテーブルの行にある連想配列のデータを取得する。
	 		使い方としてクリックイベントの中で使う
	 * 引数　:string:クリック対象セレクタ
	 		string:tableName:データ取得対象のテーブルクラス名
	 		string:clickRecordClassName:クリックされたレコードのクラス名
	 		create_tag:creator:クリエイトタグインスタンス名
	 * 返却値:object:returnObject:取得したデータの結果
	 * 作成日　:2015.09.12
	 * 作成者　:T.Yamamoto
	 */
	this.getClickTableRecordData = function(clickTarget, tableName, clickRecordClassName, create_tag) {
		//クリックされた行番号を取得する。見出しの行は除外する
		var rowNum = $(DOT + tableName + TAG_CHILD_TR).filter(SEL_NO_TABLE_FIRST_ROW).index(clickTarget);
		//次イアログに渡すデータを変数に入れる
		var recordObject = create_tag.json[tableName][TABLE_DATA_KEY][rowNum];
		//取得したデータを返却する
		return returnObject = {
			data:recordObject		//クリックされた行のデータ
		}
	}

	/* 関数名:cancelUpdateJson
	 * 概要　:サーバへクエリを投げる前に、送信するJSONデータを加工する
	 * 引数　:baseDialog dialogBuilder:ダイアログ専用クラスインスタンス
	 * 返却値:Object:DB更新用データをまとめたオブジェクトを返す
	 * 作成日　:2015.09.12
	 * 作成者　:T.Yamamoto
	 */
	this.cancelUpdateJson = function(dialogClass, create_tag){
		//インプット用データオブジェクトを取り出す
		var retObj = commonFuncs.createCloneObject(dialogClass.getArgumentDataObject());
		//クエリをセットする
		retObj[KEY_DB_SETQUERY] = create_tag.json.cancelReservedData.db_setQuery;
		// キャンセルのノード情報を渡して、キャンセル料のレートをまとめる 2016.12.27 add k.urabe キャンセル料を計算する処理を追加
		var rate = dialogBuilder.getRateArray(dialogBuilder.create_tag.json.lessonConfirmContent.attention.cancelRateValue);
		//キャンセル料をセットする 2016.12.27 mod k.urabe キャンセル料を算出し、セットする処理に変更
		retObj.cancel_charge = commonFuncs.calcCancelCharge(retObj[COLUMN_NAME_LESSON_DATE], retObj[COLUMN_USER_CLASSWORK_COST], rate);
		// キャンセルがユーザか管理者かの判定の値をセットする 2016.10.04 add k.urabe
		retObj.cancel_user = !dialogBuilder.create_tag.isAdminLoginToMemberPage() ? VALUE_USER_CANCEL : VALUE_ADMIN_CANCEL;
		//ダイアログ専用クラスインスタンスがdialogExクラスインスタンスを通じてデータを取り出す
		return retObj;
	};
	
	/* 関数名:registerReserved
	 * 概要　:DBにデータを送信して授業の予約を行う
	 * 引数　:dialogClass:ダイアログのインスタンス
	 		create_tag:クリエイトタグのインスタンス
	 		dialogBuilder:baseDialogのインスタンス
	 * 返却値:なし
	 * 作成日　:2015.0823
	 * 作成者　:T.Masuda
	 */
	this.registerReserved = function(dialogClass, create_tag, dialogBuilder){
		//予約確認、またはキャンセルダイアログを破棄する
		dialogClass.destroy();
		//押されたボタンで処理を分岐させる
		switch(dialogClass.getPushedButtonState()){
			//はいボタンが押されたパターン
			case YES:
				//DB更新用JSONをまとめる
				var sendObject = this.cancelUpdateJson(dialogClass, create_tag);
				//クエリを発行してキャンセル処理を行う
				dialogBuilder.sendQuery(URL_SAVE_JSON_DATA_PHP, sendObject);
				//予約中授業一覧テーブルを更新する
				create_tag.tableReload(RESERVED_LESSON_TABLE);
				//キャンセルに応じた通知のアラートを出す
				alert(LESSON_CANCEL_TEXT);
				break;	//switchを抜ける
			default:break;	//switchを抜ける
		}
	}

	/* 関数名:cancelExecute
	 * 概要　:予約キャンセル処理を実行する
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:2015.0912
	 * 作成者　:T.Yamamoto
	 */
	this.cancelExecute = function() {
		//キャンセル処理を実装する
		thisClass.registerReserved(this.instance, this.instance.argumentObj.data.create_tag, this.dialogBuilder);
	}

	/* 
	 * 関数名:cancelDialogOpenFromReservedTable
	 * 概要  :予約キャンセルダイアログを予約済み授業から開くための関数
	 * 引数  :int memberInfo:会員番号
	 * 　　  :create_tag :createLittleContentsクラスインスタンス
	 * 返却値  :なし
	 * 作成日　:2015.0912
	 * 作成者　:T.Yamamoto	 
	 * 変更日　:2015.1003
	 * 変更者　:T.Masuda	 
	 * 内容　　:コールバック登録対象の要素のセレクタを変更しました
	 */
	this.cancelDialogOpenFromReservedTable =  function(memberInfo, create_tag) {
		var thisElem = this;
		//予約中授業テーブルの行がクリックされたときに予約キャンセルダイアログを出す処理
		$(RESERVED_LESSON_TABLE_OUTSIDE).on(CLICK, SELECTOR_TBODY_TR, function(){
			//キャンセルダイアログを開く
			thisElem.openCancelDialog(this, memberInfo, create_tag);
		});
	}

}	//クラス定義ここまで
