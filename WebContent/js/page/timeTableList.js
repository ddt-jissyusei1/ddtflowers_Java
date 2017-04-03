/** ファイル名:timetableList.js
 * 概要　　　:管理者画面 授業詳細タブの時間帯一覧用関数クラス定義のファイル
 * 作成日　:2016.0501
 * 作成者　:T.Masuda
 * 場所　　:js/page/timetableList.js
 */

/** クラス名:timetableList
 * 概要　　　:管理者画面 授業詳細タブの時間帯一覧用関数クラス
 * 引数     :なし
 * 作成日　:2016.0501
 * 作成者　:T.Masuda
 */
function timetableList() {

	/* 関数名:replaceTable
	 * 概要　:テーブルを編集可能になるように調整する。(そのまま出力した場合inputは付けられないため)
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:2016.0502
	 * 作成者　:T.Masuda
	 */
	this.replaceTable = function(){
		//時間帯列の作成を行う
		commonFuncs.addTimeTableColumn('.start_time', '.end_time', '.timetableListTable', 5, '.id', true);
		//最小人数列の置換を行う
		commonFuncs.tdReplaceToTextbox('.timetableListTable tbody', '.min_num', 'min_num', 'number', {'min' : '0', 'max' : '100'});
		//最大人数列の置換を行う
		commonFuncs.tdReplaceToTextbox('.timetableListTable tbody', '.max_num', 'max_num', 'number', {'min' : '0', 'max' : '100'});
	}
	
	/* 関数名:callbackUpdate
	 * 概要　:更新ボタンのコールバック関数(必ずオーバーライドで内容を定義されたし)
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:2016.0505
	 * 作成者　:T.Masuda
	 * 変更日 : 2016.09.12
	 * 変更者 : k.urabe
	 * 内容 : 当該ダイアログ更新後に、再度リスト選択の処理を設定
	 * 変更日 : 2016.09.15
	 * 変更者 : k.urabe
	 * 内容 : テーブル再配置後にボタンとの位置関係を修正する処理を追加
	 * 変更日 : 2016.09.18
	 * 変更者 : k.urabe
	 * 内容 : テーブル再配置後にボタンを再調整する処理を削除し、テーブルの追加先を変更
	 */
	this.callbackUpdate = function(){
		//選択されている行を取得する
		var $selectedRecord = $(STR_TR, $('.timetableListTable tbody')).filter('.selectRecord');
		//1行以上選択されていたら
		if ($selectedRecord.length > 0){
			//レコードの更新を行う
			this.updateRecords($selectedRecord);

			//テーブルをリロードのため、タブのcreateTagを取得する
			var create_tag = $(TIME_TABLE_LIST_TAB)[0].create_tag;
			//テーブルデータをリセットする
			create_tag.json[KEY_TIME_TABLE_LIST_TABLE].tableData = [];
			//テーブルリロードのためデータを再取得する
			create_tag.getJsonFile(URL_GET_JSON_ARRAY_JSP, create_tag.json[KEY_TIME_TABLE_LIST_TABLE], KEY_TIME_TABLE_LIST_TABLE);
			$(SELECTOR_TIME_TABLE_LIST_TABLE).remove();	//既存のテーブルを消す
			//テーブルをリロードする
			create_tag.outputTagTable(KEY_TIME_TABLE_LIST_TABLE, LESSON_TABLE, $(SELECTOR_SET_TIME_TABLE_LIST));		// 2016.09.18 mod k.urabe テーブル再配置指定場所を変更
			
			//リロードしたテーブルの置換を行う
			this.replaceTable();

			// 2016.09.12 add k.urabe 更新後に再度、クリックされた時にuserSelectクラスをがなければ追加しあるなら消去する処理を設定
			toggleClassClickElement(SELECTOR_TBODY_TR_TIME_TABLE, SELECT_RECORD, SELECTOR_TIME_TABLE_LIST_TABLE);
		//選択なしであれば
		} else {
			//警告を出す
			alert(MESSAGE_NEED_SELECT_MORE_1_RECORD);
		}
	}
	
	/* 関数名:updateRecords
	 * 概要　:指定したレコードを更新する。(授業時間帯データ)
	 * 引数　:Array records : 更新対象の行HTML
	 * 返却値:なし
	 * 作成日　:2016.0502
	 * 作成者　:T.Masuda
	 */
	this.updateRecords = function(records){
		//タブのcreateTagを取得する
		var create_tag = $(TIME_TABLE_LIST_TAB)[0].create_tag;
		//送信用データを取り出す
		var sendData = create_tag.json.updateTimeTable;
		//結果のメッセージを格納する変数を用意する
		var resultMessage = EMPTY_STRING;
		//each内でクラスインスタンスを使うため、変数に入れておく
		var thisElem = this;
		//処理予定数を取得する
		var recordsLength = records.length;
		
		//UPDATE失敗時に例外処理を行う
		try {
			//レコードを走査する
			$(records).each(function(i){
				//送信用データにフォームの値をセットする
				thisElem.setSendData(sendData, this);
				
				//UPDATEを行い成功したか
				if(!parseInt(thisElem.sendQuery(URL_SAVE_JSON_DATA_JSP, sendData).message)) {
					throw new Error(thisElem.makeErrorMessage(records, i));
				}
				
				//全レコードの処理を終えたら
				if (i == recordsLength -1) {
					//処理終了を伝えるダイアログを出す
					commonFuncs.showMessageDialog('授業時間帯更新完了', '授業時間帯の更新が完了しました。');
				}
			});
		} catch (e) {
			//エラーメッセージを通知する
			alert(e);
		}
	}

	/* 関数名:makeErrorMessage
	 * 概要　:エラーメッセージを作成する。更新が成功した対象と失敗した対象を明記する
	 * 引数　:Array records : 更新対象の行HTML
	 *    　:int successCount : 更新が終わった数
	 * 返却値:Strinb : エラーメッセージ
	 * 作成日　:2016.0502
	 * 作成者　:T.Masuda
	 */
	this.makeErrorMessage = function(records, successCount){
		//更新成功した行を通知するため、更新した行の時間を改行しながら追記していくための変数を用意
		var successUpdateRecordsTime = EMPTY_STRING;
		//更新に成功した行を走査する
		for (var j = 0; j < successCount; j++) {
			//成功した時間を取り出して追記していく
			successUpdateRecordsTime += JS_EOL + $(records[j]).children('.startEndTime').text();
		}
		
		//更新に成功した行があればその旨の補足文を追記する。なければそのまま空文字となる
		successUpdateRecordsTime = successUpdateRecordsTime != EMPTY_STRING ? '以下の時間帯の更新が完了しています。' + successUpdateRecordsTime : successUpdateRecordsTime; 
		
		//失敗した行の時間帯の文字列を取り出す。成功数が更新対象行のindexと一致するので流用する
		var errorTargetName = $(records[successCount]).children('.time_table').text();
		//エラーを投げる
		return errorTargetName + 'の更新に失敗しました。処理を中断いたします。\n' + successUpdateRecordsTime;
	}
	
	/* 関数名:setSendData
	 * 概要　:送信用データを作成する
	 * 引数　:Object sendData : 送信用データのオブジェクト
	 *    　:Element targetRecord : データ取得対象のレコード
	 * 返却値:なし
	 * 作成日　:2016.0502
	 * 作成者　:T.Masuda
	 */
	this.setSendData = function(sendData, targetRecord){
		//ID、最小人数、最大人数をレコードから取得してそれぞれ送信用データにセットしていく
		sendData.id = $(targetRecord).children('.id').text();
		
		sendData.min_num = $('[name="min_num"]', targetRecord).val();
		sendData.max_num = $('[name="max_num"]',targetRecord).val();
	}

}

//継承の記述
timetableList.prototype = new baseDialog();
//サブクラスのコンストラクタを有効にする
timetableList.prototype.constructor = baseDialog;

