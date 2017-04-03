/* ファイル名:memberReserveListDialog.js
 * 概要　　　:テスト用ダイアログ
 * 作成者　:T.Masuda
 * 場所　　:dialog/js/memberReserveListDialog.js
 */

/* クラス名:memberReserveListDialog.js
 * 概要　　:URLからダイアログのHTMLファイルを取得して表示する。
 * 親クラス:baseDialog
 * 引数	 :Element dialog:ダイアログのDOM
 * 作成者　:T.Masuda
 * 場所　　:dialog/js/memberReserveListDialog.js
 */
function memberReserveListDialog(dialog){
	baseDialog.call(this, dialog);	//親クラスのコンストラクタをコールする
	//予約・キャンセルの操作分岐のための数値
	this.manipulation = 0;
	//選択したレコードのデータ
	this.recordData = {};
	
	//予約、キャンセルを行ったときのお知らせのテキストの配列
	this.noticeMessages = [
	                       	MESSAGE_FAILED_LESSON_RESERVE_TEXT,
	                       	MESSAGE_FAILED_LESSON_RESERVE_TEXT,
	                       	MESSAGE_FAILED_LESSON_CANCEL_TEXT
	                       ];
	

	/* 関数名:constructionContent
	 * 概要　:JSONやHTMLをcreateLittleContentsクラスインスタンスにロードする。
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0815
	 * 作成者　:T.Masuda
	 */
	this.constructionContent = function(){
		//主に分岐処理を行うためにtry catchブロックを用意する
		try{
			this.getJson();	//JSONを取得する
			//取得したデータが0のときダイアログを開いても閉じ,データがあるならそのままダイアログを開く
			if (!this.getTableData(LESSON_TABLE)) {
				throw new cannotGetAnyRecordException();
			}

			this.getDom();			//画面パーツ作成に必要なHTMLテンプレートを取得する
			this.customizeJson();	//取得したJSONを加工する
		//例外時処理
		}catch(e){
			//予約一覧のレコードが取得できなかったら
			if(e instanceof cannotGetAnyRecordException){
				//もう一度例外を投げ、dispContents内で処理する
				throw new cannotGetAnyRecordException();
			//それ以外の例外であれば
			} else {
				//もう一度例外を投げ、dispContents内で処理する
				throw e;
			}
		}
	};
	
	/* 関数名:getJson
	 * 概要　:JSONを取得する(オーバーライドして内容を定義してください)
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0815
	 * 作成者　:T.Masuda
	 * 修正日　:2015.0822
	 * 修正者　:T.Masuda
	 * 内容	　:当関数内でsetLessonDataToJSONをコールするようにしました
	 */
	this.getJson = function(){
		//このダイアログ用のJSONファイルを取得する
		this[VAR_CREATE_TAG].getJsonFile(RESERVE_LIST_JSON);
		//ダイアログ共通のJSONファイルを取得する
		this[VAR_CREATE_TAG].getJsonFile(COMMON_LIST_DIALOG_JSON);
		//JSONに授業データをセットする
		commonFuncs.setLessonDataToJSON(this[DIALOG_CLASS], this[VAR_CREATE_TAG]);	
	};

	/* 関数名:getDom
	 * 概要　:createTag用テンプレートHTMLを取得する(オーバーライドして内容を定義してください)
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0822
	 * 作成者　:T.Masuda
	 */
	this.getDom = function(){
		//createTagのDOMをクリアする
		this[VAR_CREATE_TAG].dom = EMPTY_STRING;		
		//会員ページ 授業一覧ダイアログのテンプレートHTMLを取得する
		this[VAR_CREATE_TAG].getDomFile(RESERVE_LIST_HTML);		
	};
	
	/* 関数名:getTableData
	 * 概要　:サーバからテーブルのデータを取得し、中身が空かどうかのチェックを行う。
	 * 引数　:String tableName:テーブルのJSONのキー
	 * 返却値:boolean:テーブルのデータがあるかどうかを判定して返す
	 * 作成日　:2015.0814
	 * 作成者　:T.Masuda
	 */
	this.getTableData = function(tableName){
		//予約できる授業のデータ一覧をDBから取得してテーブルを作る準備をする
		this[VAR_CREATE_TAG].getJsonFile(URL_GET_JSON_ARRAY_PHP, this[VAR_CREATE_TAG].json[tableName], tableName);
		//予約データが取得できていたらtrue、そうでなければfalseを返す
		return this[VAR_CREATE_TAG].json[tableName][TABLE_DATA_KEY].length != NO_TABLE_DATA ? true: false;
	}
	
	/* 関数名:customizeJson
	 * 概要　:constructionContentで取得したJSONの加工を行う。オーバーライドして定義されたし
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0815
	 * 作成者　:T.Masuda
	 */
	this.customizeJson = function(){
		//授業のデータを取得する
		var tableData = $.extend([], true, this[VAR_CREATE_TAG].json[LESSON_TABLE][TABLE_DATA_KEY]);
		//テーブル置換用の時限データを取得する
		var replaceData = commonFuncs.getRestAndReserveData(tableData);
		
		//授業データを走査し、列データを追加していく
		for(var i = 0; i < tableData.length; i++){
			tableData[i].cost = replaceData.cost[i] ? replaceData.cost[i] : CHAR_HYPHEN;
			tableData[i].start_and_end_time = replaceData.start_and_end_time[i];
			tableData[i].rest = replaceData.rest[i];
			tableData[i].lessonStatus = replaceData.lessonStatus[i];
		}
	};


	/* 関数名:dispContents
	 * 概要　:openDialogから呼ばれる、画面パーツ設定用関数
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0813
	 * 作成者　:T.Masuda
	 */
	this.dispContents = function(){
		//DBから1件もレコードを取得できなければ例外を投げてアラートダイアログに変化させる
		try {
			//画面を表示する準備をする
			this.constructionContent();
		//レコードが取得できていなければ、またはエラーが起きたら
		} catch (e) {
			//レコードが取得できていなければ
			if (e instanceof cannotGetAnyRecordException) {
				//ダイアログをアラートのダイアログに変える
				this.showAlertNoReserve();
				return;	//処理を打ち切る
			//別のエラーなら
			} else {
				throw e;	//上位にエラーを投げる
			}
		}
		
		//ダイアログの画面パーツをセットする
		this.dispContentsHeader();	//ダイアログ上部
		this.dispContentsMain();	//ダイアログ中部
		this.dispContentsFooter();	//ダイアログ下部
		this.setConfig();			//ダイアログの設定をする
		this.setCallback();			//コールバック関数を登録する
	}
	
	/* 関数名:dispContentsMain
	 * 概要　:画面パーツ設定用関数のメイン部分作成担当関数
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0814
	 * 作成者　:T.Masuda
	 */
	this.dispContentsMain = function(){
		//予約可能授業一覧テーブルの外側の領域を作る
		this[VAR_CREATE_TAG].outputTag(TABLE_AREA, TABLE_AREA, this.dialog);
		//予約できる授業のデータ一覧テーブルを作る
		this[VAR_CREATE_TAG].outputTagTable(LESSON_TABLE, LESSON_TABLE, $(SELECTOR_TABLE_AREA, this.dialog));
		//レッスンのステータス領域を作る
		this[VAR_CREATE_TAG].outputTag(EXPLAIN + 1, EXPLAIN + 1, this.dialog);
	}

	/* 関数名:setCallback
	 * 概要　:ダイアログのイベントコールバックを設定する
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:2015.0822
	 * 作成者　:T.Masuda
	 */
	this.setCallback = function(){
		//テーブルの行クリックイベントを登録する
		this.setCallbackRowClick();
	}
	
	/* 関数名:setConfig
	 * 概要　:ダイアログの設定を行う。
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:2015.0822
	 * 作成者　:T.Masuda
	 */
	this.setConfig = function(){
		//ダイアログの位置調整を行う
		this.setDialogPosition(POSITION_CENTER_TOP);
		//予約不可能な授業情報をグレーアウトする
		$(DOT + LESSON_TABLE + TAG_CHILD_TR, $(this.dialog)).has("td:contains('✕')").css('background', '#EDEDED');
		//料金欄が0の授業もグレーアウトする
		$(DOT + LESSON_TABLE + TAG_CHILD_TR, $(this.dialog)).filter(function(){
			//料金が-の行だけ抽出する
			return parseInt($("td.cost", this).text()) <= CHAR_HYPHEN ? true : false;
		}).css('background', '#EDEDED');
	}
	
	
	/* 関数名:setArgumentObj
	 * 概要　:ダイアログに渡すオブジェクトを生成する
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:015.08.15
	 * 作成者　:T.Masuda
	 */
	this.setArgumentObj = function() {

		//新たにオブジェクトを作り、親ダイアログから引き継いだargumentObjの内容をセットする
		var argumentObj = $.extend(true, {}, this.dialog.instance.argumentObj);
		
		//子ダイアログに渡すオブジェクトを生成する
		$.extend(true, argumentObj.data,							//元データ
				{parentDialogEx:this.dialogClass},					//このダイアログのクラスインスタンス
				this.recordData.data,								//行データ
				this.recordData.number,								//行番号
				{callback:this.registerReserved}					//子ダイアログclose時のコールバック関数
		);
		
		return argumentObj;	//生成したオブジェクトを返す
	}

	/* 関数名:showAlertNoReserve
	 * 概要　:予約なしのアラートダイアログを作る
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:015.08.15
	 * 作成者　:T.Masuda
	 */
	this.showAlertNoReserve = function(){
		//授業の予約データがないことをダイアログに表示する
		this.dialogClass.setAlertContents(ERROR_LESSONLIST);
		//ダイアログを閉じるときは破棄するように設定する
		this.dialogClass.setCallbackCloseOnAfterOpen(this.dialogClass.destroy);
	}
	
	/* 関数名:callbackRowClick
	 * 概要　:テーブルの行をクリックした時のイベントのコールバック関数(内容はオーバーライドして定義されたし)
	 * 引数　:Element clicked:クリックされた行の要素
	 * 返却値:なし
	 * 作成日　:015.08.22
	 * 作成者　:T.Masuda
	 */
	this.callbackRowClick = function(clicked) {
		//クリックした行の番号とデータを取得する。様々なところで使い回せるため、メンバに保存する
		this.recordData = this.getClickTableRecordData(clicked, LESSON_TABLE, LESSON_TABLE_RECORD);
		//無効な行(見出し)をクリックしていたら、または料金が0であれば
		if(this.recordData.number < 0 || this.recordData.data.cost == CHAR_HYPHEN){
			return;	//何もせずに終える
		}
		
		//残席の記号を取得する
		var restMarkNow = $(DOT + LESSON_TABLE + TAG_TR + ':eq(' + (this.recordData.number + 1) + CLOSE_AND_TD_TAG + '.rest', $(CURRENT_DIALOG)).text();
		//現状の予約状態を取得する
		var userWorkStatus = this[VAR_CREATE_TAG].json[LESSON_TABLE][TABLE_DATA_KEY][this.recordData.number][COLUMN_NAME_USER_WORK_STATUS];
		//会員が受講できないようになっている授業(NFDなど)についてはクリックして予約確認ダイアログは開かない
		//また、日時の関係で予約不可能な授業もダイアログを開かない
		if (this[VAR_CREATE_TAG].json[LESSON_TABLE][TABLE_DATA_KEY][this.recordData.number][COLUMN_NAME_DEFAULT_USER_CLASSWORK_COST]
			&& (commonFuncs.isBookable(this.recordData.data) || userWorkStatus == 1)) {
			var dialogUrl = EMPTY_STRING;	//ダイアログのURLを格納する変数を用意する
			
			//予約済みでなく、予約可能な授業であれば
			if(this[VAR_CREATE_TAG].json[LESSON_TABLE][TABLE_DATA_KEY][this.recordData.number][COLUMN_NAME_USER_WORK_STATUS] != RESERVED_LESSON_STATUS
					&& restMarkNow != CHAR_INVALIDATE) {
				//予約確認ダイアログのURLをセットする
				dialogUrl = HTML_MEMBER_RESERVE_CONFIRM_DIALOG;
				//予約操作を行う。初回予約、再予約で別の値をクエリ判別のための変数にセットする
				this.manipulation = userWorkStatus == EMPTY_STRING ? 
						PROCESSING_RESERVE : PROCESSING_RESERVE_AGAIN;
				this.openDialog(dialogUrl);	//ダイアログを開く
			//予約済みであれば
			} else if(this[VAR_CREATE_TAG].json[LESSON_TABLE][TABLE_DATA_KEY][this.recordData.number][COLUMN_NAME_USER_WORK_STATUS] == RESERVED_LESSON_STATUS){
				//予約キャンセルダイアログのURLをセットする
				dialogUrl = HTML_MEMBER_RESERVE_CANCEL_DIALOG;
				//キャンセル操作を行う
				this.manipulation = PROCESSING_CANCEL;
				this.openDialog(dialogUrl);	//ダイアログを開く
			}
		}
	};

	/*
	 * 関数名:getClickTableRecordData
	 * 概要　:クリックされたテーブルの行にある連想配列のデータを取得する。
	 		使い方としてクリックイベントの中で使う
	 * 引数　:string:tableName:データ取得対象のテーブルクラス名
	 		string:clickRecordClassName:クリックされたレコードのクラス名
	 		createTagInstance:creator:クリエイトタグインスタンス名
	 * 返却値:object:returnObject:取得したデータの結果
	 * 作成日　:2015.08.08
	 * 作成者　:T.Yamamoto
	 * 変更日　:2015.08.29
	 * 変更者　:T.Masuda
	 * 内容　 :全体的に改修しました。行番号はtrタグを基準に取得します
	 */
	this.getClickTableRecordData = function(clickTarget, tableName, clickRecordClassName) {
		//クリックされた行番号を取得する。見出しの行は除外する　2016.12.28 r.shibata クリックされたテーブルは、クリックされた行の親を取得するように変更
		var rowNum = $(clickTarget).parents(DOT + tableName).find(STR_TR).filter(SEL_NO_TABLE_FIRST_ROW).index(clickTarget);
		//次のダイアログに渡すデータを変数に入れる
		var recordObject = this[VAR_CREATE_TAG].json[tableName][TABLE_DATA_KEY][rowNum];
		//取得したデータを返却する
		return returnObject = {
			number:rowNum,			//クリックされた行番号
			data:recordObject		//クリックされた行のデータ
		}
	}

	/* 関数名:updateJson
	 * 概要　:サーバへクエリを投げる前に、送信するJSONデータを加工する
	 * 引数　:baseDialog dialogBuilder:ダイアログ専用クラスインスタンス
	 * 返却値:Object:DB更新用データをまとめたオブジェクトを返す
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0823
	 * 作成者　:T.Masuda
	 */
	this.updateJson = function(dialogBuilder){
		//インプット用データオブジェクトを取り出す
		var retObj = commonFuncs.createCloneObject(dialogBuilder.dialogClass.getArgumentDataObject());
		//DB操作によってクエリを切り替える
		switch(this.manipulation){
		//通常の予約
		case PROCESSING_RESERVE:
			//予約のクエリをオブジェクトにセットする
			retObj[KEY_DB_SETQUERY] = this[VAR_CREATE_TAG].json.sendReservedData.db_setQuery;
			break;
		//再予約
		case PROCESSING_RESERVE_AGAIN:
			//再予約のクエリをオブジェクトにセットする
			retObj[KEY_DB_SETQUERY] = this[VAR_CREATE_TAG].json.updateReservedData.db_setQuery;
			break;
		//キャンセル
		case PROCESSING_CANCEL:
			//キャンセルのクエリをオブジェクトにセットする
			retObj[KEY_DB_SETQUERY] = this[VAR_CREATE_TAG].json.cancelReservedData.db_setQuery;
			//キャンセルがユーザか管理者かの判定の値をセットする
			retObj.cancel_user = !this.create_tag.isAdminLoginToMemberPage() ? VALUE_USER_CANCEL : VALUE_ADMIN_CANCEL;
			//キャンセル料をセットする
			retObj.cancel_charge = dialogBuilder.create_tag.cancel_charge;
			break;
		//それ以外であれば、そのまま終わる
		default:
			break;
		}

		//ダイアログ専用クラスインスタンスがdialogExクラスインスタンスを通じてデータを取り出す
		return retObj;
	};
	
	/* 関数名:registerReserved
	 * 概要　:DBにデータを送信して授業の予約を行う
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:2015.0823
	 * 作成者　:T.Masuda
	 */
	this.registerReserved = function(){
		var dialogClass = this.instance;	//ダイアログのクラスインスタンスを取得する
		//予約確認、またはキャンセルダイアログを破棄する
		dialogClass.destroy();
		//押されたボタンで処理を分岐させる
		switch(dialogClass.getPushedButtonState()){
		//はいボタンが押されたパターン
		case YES:
				var data = dialogClass.getArgumentDataObject();
				//親のダイアログ専用クラスインスタンスを取得する
				var parentDialogBuilder = data.parentDialogEx.dom.dialogBuilder;
				//親ダイアログでDB更新用JSONをまとめる
				var sendObject = parentDialogBuilder.updateJson(this.dialogBuilder);
				console.log(sendObject);
				//クエリを発行してキャンセル処理を行う
				var sendResult = parentDialogBuilder.sendQuery(URL_SAVE_JSON_DATA_PHP, sendObject);
				$(parentDialogBuilder.dialog).empty();	//ダイアログの中を一旦空にする
				parentDialogBuilder.dispContents();		//予約一覧ダイアログの中身を更新する

				//予約中授業テーブルをリロードして予約状況を最新にする
				$('#alreadyReserved')[0].create_tag.tableReload(RESERVED_LESSON_TABLE);

				//DBの更新に失敗していたら
				if(!parseInt(sendResult.message)) {
				
					//openイベントはsetArgumentObjでセットしておく
					var confirmDialog = new dialogEx(CONFIRM_DIALOG_PATH,
							//オブジェクトを結合して引数として渡す
							$.extend({}, true
									//デフォルトの入力オブジェクトを用意する
									,commonFuncs.getDefaultArgumentObject()
									,{
										//ダイアログ用データ
										data:{
											//単なるメッセージのダイアログなのでコールバックなし
							    			callback : commonFuncs.removeCurrentDialog		
							    			//ダイアログのメッセージ
							    			,message:parentDialogBuilder.noticeMessages[parentDialogBuilder.manipulation]			
										},
										//ダイアログ設定データ
										config : {
											//open時のコールバック
											open://基本的にopen時はdispContentsが実行されるようにする
												function(){
												//dispContentsをコールしてダイアログの内容を作る
												commonFuncs.setCallbackToEventObject(this, 'dialogBuilder', 'dispContents');
												//ボタンを消す
												commonFuncs.removeCurrentDialogButtons();
											}
											//モーダル表示にする
											,modal : true
										}
									}
							)
					);
					
					//openイベントのコールバック関数をセットする
					confirmDialog.run();	//ダイアログを開く
				//更新に成功していたら
				} else {
					//カレンダーの授業がある日付を更新する
					$('.lessonCalendar:last')[0].instance.changeExistLessonDate();
				}
				
				break;	//switchを抜ける
		default:break;	//switchを抜ける
		}
	}

}

//継承の記述
memberReserveListDialog.prototype = new baseDialog();
//サブクラスのコンストラクタを有効にする
memberReserveListDialog.prototype.constructor = baseDialog;
