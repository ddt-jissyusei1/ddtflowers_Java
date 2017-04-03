/* ファイル名:adminLessonCreateDialog.js
 * 概要　　　:管理者、新規授業作成ダイアログ
 * 作成者　:T.Yamamoto
 * 場所　　:dialog/js/adminLessonCreateDialog.js
 */

/* クラス名:adminLessonCreateDialog.js
 * 概要　　:URLからダイアログのHTMLファイルを取得して表示する。
 * 親クラス:baseDialog
 * 引数	 :Element dialog:ダイアログのDOM
 * 作成者　:T.Yamamoto
 * 場所　　:dialog/js/adminLessonCreateDialog.js
 * 変更者 : k.urabe
 * 変更日 : 2016.09.12
 * 内容 : 授業作成時のチェックに最大人数の上限（100名以下）を追加
 */
function adminLessonCreateDialog(dialog){
	baseDialog.call(this, dialog);	//親クラスのコンストラクタをコールする

	//jQuery validation用設定オブジェクト
	this.validation = {
			//チェックが通った時の処理
			submitHandler : function(form, event){
				
				//授業作成処理を行う
				$(form)[0].dialogBuilder.newLessonEntry();
				return false;	//デフォルトのsubmitをキャンセルする
			},
			invalidHandler:function(form,error){	//チェックで弾かれたときのイベントを設定する。
				var errors = $(error.errorList);	//今回のチェックで追加されたエラーを取得する。
				//エラー文を表示する。
				alert(createErrorText(errors, errorJpNames));
			},
			rules :{
				min_students:{
					required : true,
					digits : true,
					checkMinStudents : true
				},
				max_students : {
					required : true,
					digits : true,
					// 2016.09.12 add k.urabe 最大人数のチェックを100名以下で追加
					max : 100
				}, 
				classroom : {
					required : true,
					alphabet : true
				}
			}
	}
	
	/* 関数名:getJson
	 * 概要　:JSONを取得する(オーバーライドして内容を定義してください)
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0815
	 * 作成者　:T.Masuda
	 */
	this.getJson = function(){
		//画面パーツ作成に必要なjsonを取得する
		this[VAR_CREATE_TAG].getJsonFile(ADMIN_LESSON_BASE_JSON);			//授業詳細、作成ダイアログ共通json
		this[VAR_CREATE_TAG].getJsonFile(ADMIN_LESSON_CREATE_DIALOG_JSON);	//授業作成ダイアログ個別json
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
		//画面パーツ作成に必要なHTMLテンプレートを取得する 
		this[VAR_CREATE_TAG].getDomFile(ADMIN_LESSON_BASE_HTML);			//授業詳細、作成ダイアログ共通テンプレート
		this[VAR_CREATE_TAG].getDomFile(ADMIN_LESSON_CREATE_DIALOG_HTML);	//授業作成ダイアログ個別テンプレート
	};
	
	/* 関数名:customizeJson
	 * 概要　:constructionContentで取得したJSONの加工を行う。オーバーライドして定義されたし
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0815
	 * 作成者　:T.Masuda
	 */
	this.customizeJson = function(){
		//日付を日付欄にセットする
		this.create_tag.json.lessonDate.text = this.dialogClass.getArgumentDataObject().dateJapanese;
		
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
		//授業データ入力領域を作る
		this[VAR_CREATE_TAG].outputTag(LESSON_DATA, LESSON_DATA, this.dialog);
		//授業編集領域の要素を取得する
		var $targetArea = $(DOT + LESSON_DATA, this.dialog);
		this[VAR_CREATE_TAG].outputTag('lessonDate', 'lessonDate', $targetArea);
		//授業のテーマを設定する領域を出力する
		this[VAR_CREATE_TAG].outputTag(CLASS_LESSON_THEME, CLASS_LESSON_THEME, $targetArea);
		//授業の時間割を設定する領域を出力する
		this[VAR_CREATE_TAG].outputTag(CLASS_LESSON_TIMETABLE, CLASS_LESSON_TIMETABLE, $targetArea);
		//最大最小人数設定要素を作る
		this[VAR_CREATE_TAG].outputTag('studentsArea', 'studentsArea', $targetArea);
		//授業のステータスを設定する領域を出力する
		this[VAR_CREATE_TAG].outputTag(CLASS_LESSON_STATUS, CLASS_LESSON_STATUS, $targetArea);
		//授業の教室を設定する領域を出力する
		this[VAR_CREATE_TAG].outputTag(CLASS_LESSON_CLASSROOM, CLASS_LESSON_CLASSROOM, $targetArea);
		//授業のメモを設定する領域を出力する
		this[VAR_CREATE_TAG].outputTag(CLASS_LESSON_MEMO, CLASS_LESSON_MEMO, $targetArea);
	}

	/* 関数名:setConfig
	 * 概要　:ダイアログの設定を行う。
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:2015.0822
	 * 作成者　:T.Masuda
	 */
	this.setConfig = function(){
		//新規作成ボタンを使う
		this.setDialogButtons(this.createNew);
		//ダイアログの位置調整を行う
		this.setDialogPosition(POSITION_CENTER_TOP);
		//入力チェックを登録する
		$(this.dialog).validate(this.validation);
	}

	/* 関数名:callbackCreateNew
	 * 概要　:新規作成ボタンのコールバック関数(必ずオーバーライドで内容を定義されたし)
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:2015.0822
	 * 作成者　:T.Masuda
	 */
	this.callbackCreateNew = function(){
		//入力チェックを開始する
		$(this.dialog).submit();
	}

	/* 関数名:updateJson
	 * 概要　:サーバへクエリを投げる前に、送信するJSONデータを加工する
	 * 引数　:Object newLessonData:今回作成しようとしている授業のデータ
	 * 返却値:Object:授業データ
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.09.20
	 * 作成者　:T.Masuda
	 */
	this.updateJson = function(newLessonData){
		//授業の時限データを探して返す
		return this.getNewLessonData(newLessonData);
	};

	/* 
	 * 関数名:getNewLessonData
	 * 概要  :管理者、授業詳細タブで新規に授業を授業を登録するときに必要となる、授業日と時限idを取得する
	 * 引数  :Object newLessonData:新規授業データ
	 * 返却値  :Object:授業の登録に必要となる日付、時限の情報を持ったオブジェクト
	 * 作成者:T.Yamamoto
	 * 作成日:2015.08.23
	 * 変更者:T.Masuda
	 * 変更日:2015.09.20
	 * 内容	:新規授業データを引数から取るようにしました。
	 */
	this.getNewLessonData = function(newLessonData) {
		var data = this.dialog.instance.getArgumentDataObject();	//argumentObjのdataを取得する
		//時限データを入れる変数を作り、すでにある時限についてはこの変数を使うようにする
		var timeTableDayKey = EMPTY_STRING;
		//授業一覧のデータを長さを取得し、ループが終わる回数として使う
		var tableLength = data[TABLE_DATA_KEY].length;
		//受け取った授業一覧データから時限データを探す
		for(var i = 0; i < tableLength; i++) {
			//新規授業作成データの時限データが見つかった時の処理
			if(newLessonData[COL_TIMETABLE_KEY] == data[TABLE_DATA_KEY][i][COL_TIMETABLE_KEY] 
				&& data[TABLE_DATA_KEY][i][COL_TIME_TABLE_DAY_KEY] != EMPTY_STRING) {
				//時限データを取得し、ループを終える
				timeTableDayKey = data[TABLE_DATA_KEY][i][COL_TIME_TABLE_DAY_KEY];
				//ループを終わらせる
				break;
			}
		}

		//新しく授業データを作るために授業日を連想配列に入れる
		var lessonData = {
			lessonDate:data.lessonDate.replace(/\//g, '-'),			//受講日
			time_table_day_key:timeTableDayKey 	//授業時限キー
		};
		
		//授業データを返す
		return lessonData;
	}
	
	/* 
	 * 関数名:getSendData
	 * 概要  :送信用データをフォームから取得して返す
	 * 引数  :なし
	 * 返却値  :Object : フォームデータ
	 * 作成者:T.Masuda
	 * 作成日:2015.11.08
	 */
	this.getSendData = function() {
		//ダイアログ生成時に渡されたインプット用データを取得する
		var data = this.dialogClass.getArgumentDataObject();
		//入力した値を取得し、授業の新規作成に用いる
		var newLessonData = commonFuncs.getInputData(DOT + LESSON_DATA);
		
		//新しく授業データを作るために授業日を連想配列に入れる
		var lessonData = this.updateJson(newLessonData);
		
		//送信するオブジェクトを作って返す
		return $.extend(true, {}, 
				newLessonData, 	//このダイアログ内の入力データ
				data, 			//親ダイアログからのデータ
				lessonData		//探した授業データ
		);
	}

	/* 
	 * 関数名:newLessonEntry
	 * 概要  :管理者、授業詳細タブで新規に授業をDBに登録する処理
	 * 引数  :なし
	 * 返却値  :なし
	 * 作成者:T.Yamamoto
	 * 作成日:2015.08.03
	 * 修正日　:2015.08.09
	 * 修正者　:T.Masuda
	 * 内容	　:改修したdialogExクラスに対応しました。また、改名しました
	 * 修正日　:2015.09.20
	 * 修正者　:T.Masuda
	 * 内容	　:adminLessonCreateDialogクラスに対応しました
	 * 修正日　:2015.11.08
	 * 修正者　:T.Masuda
	 * 内容	　:jQuery validationに対応しました。
	 */
	this.newLessonEntry = function(){
		//処理結果の通知の文字列を変数にセットする。成功時のメッセージで初期化する
		var alertNotice = '新規授業の作成に成功しました。';	
		var dialogClass = this.dialogClass;			//ダイアログのクラスインスタンスを取得する
		
		//当該関数の引数のデータから送信用データを作る。
		var sendData = this.getSendData();
		
		//授業作成失敗時の処理を一元化するため、try-catch構文を使う
		try{
			//時限データが空のときは新規時限データを作成し、そのあとに授業データを作成する
			if(sendData.time_table_day_key == EMPTY_STRING) {
				//時限データ作成用クエリを送信用オブジェクトにセットする
				sendData.db_setQuery = this.create_tag.json.insertTimeTableDay.db_setQuery;
				
				//時限データテーブルに対してinsert処理を行い、次の授業データを新しく作るための準備をする
				//失敗件数が0でないなら授業データを新しく作るクエリを発行する
				if (parseInt(this.sendQuery(URL_SAVE_JSON_DATA_PHP, sendData).message)) {
					//授業新規作成用のクエリをJSONにセットする
					sendData.db_setQuery = this.create_tag.json.newClassWork.db_setQuery;
					//授業作成に失敗したら
					if(!(this.sendQuery(URL_SAVE_JSON_DATA_PHP, sendData).message)){
						//例外を投げて失敗処理に入る
						throw '授業の新規作成に失敗しました。時間を置いて試してください。';	
					}
				//失敗であれば
				} else {
					//例外を投げて失敗処理に入る
					throw '授業の新規作成に失敗しました。時間を置いて試してください。';	
				}
			//予約する時限があった時にそれを使って新規授業を作成する
			} else {
				//単純なinsert用クエリを送信用JSONにセットする
				sendData.db_setQuery = this.create_tag.json.normalInsertClasswork.db_setQuery;
				//すでにある時限データを使って授業データを作る。
				//授業作成に失敗したら
				if(!parseInt(this.sendQuery(URL_SAVE_JSON_DATA_PHP, sendData).message)){
					//例外を投げて失敗処理に入る
					throw '授業の新規作成に失敗しました。時間を置いて試してください。';	
				}
			}
		//授業作成に失敗したら
		} catch(e){
			//アラートに出すメッセージに失敗時のものをセットする
			alertNotice = e;	//文字列はthrow時に用意する
			return;		//処理をここで終える
		}
		
		//処理結果のメッセージを出す
		alert(alertNotice);
		$(this.dialog).dialog(CLOSE);	//ダイアログを閉じる
		this.afterCreateNewLesson();	//授業作成後の処理を行う
	}
	
	/* 
	 * 関数名:afterCreateNewLesson
	 * 概要  :管理者、授業詳細タブで新規に授業をDBに登録する処理
	 * 引数  :授業の新規作成を終えた後の処理
	 * 返却値  :なし
	 * 作成日　:2015.09.20
	 * 作成者:T.Masuda
	 */
	this.afterCreateNewLesson = function(){
		console.log(this.dialogClass.getArgumentDataObject());
		//親ダイアログから渡された親ダイアログ操作用クラスインスタンスを取得し、親ダイアログのテーブルの内容を更新する
		var parentDialogBuilder = this.dialogClass.getArgumentDataObject().parentDialogBuilder;
		//親ダイアログの内容を一旦消去する
		$(parentDialogBuilder.dialog).empty();
		//親ダイアログの中身を更新する
		parentDialogBuilder.dispContents();
	}
}

//継承の記述
adminLessonCreateDialog.prototype = new baseDialog();
//サブクラスのコンストラクタを有効にする
adminLessonCreateDialog.prototype.constructor = baseDialog;
