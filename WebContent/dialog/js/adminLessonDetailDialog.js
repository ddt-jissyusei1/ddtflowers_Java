/* ファイル名:adminLessonDetailDialog.js
 * 概要　　　:管理者、授業詳細ダイアログ
 * 作成者　:T.Yamamoto
 * 場所　　:dialog/js/adminLessonDetailDialog.js
 */

/* クラス名:adminLessonDetailDialog.js
 * 概要　　:URLからダイアログのHTMLファイルを取得して表示する。
 * 親クラス:baseDialog
 * 引数	 :Element dialog:ダイアログのDOM
 * 作成者　:T.Yamamoto
 * 場所　　:dialog/js/adminLessonDetailDialog.js
 * 変更者 : r.shiata
 * 変更日 : 2016.10.05
 * 内容 : 授業作成時のチェックに最大人数の上限（100名以下）を追加
 */
function adminLessonDetailDialog(dialog){
	baseDialog.call(this, dialog);	//親クラスのコンストラクタをコールする

	//jQuery validation用設定オブジェクト
	this.validation = {
			//チェックが通った時の処理
			submitHandler : function(form, event){
				
				//授業の内容を更新する
				$(form)[0].dialogBuilder.lessonDataUpdate();
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
					max : 100 // 2016.10.05 add r.shibata 最大人数のチェックを100名以下で追加
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
		this[VAR_CREATE_TAG].getJsonFile(ADMIN_LESSON_DETAIL_DIALOG_JSON);	//授業詳細ダイアログ個別json
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
		//画面パーツ作成に必要なHTMLテンプレートを取得する  
		this[VAR_CREATE_TAG].getDomFile(ADMIN_LESSON_BASE_HTML);			//授業詳細、作成ダイアログ共通テンプレート
		this[VAR_CREATE_TAG].getDomFile(ADMIN_LESSON_DETAIL_DIALOG_HTML);	//授業詳細ダイアログ個別テンプレート
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
		//親ダイアログから受け取ったデータを取得する
		var data = this.dialogClass.getArgumentDataObject();
		//日付を日付欄にセットする
		this[VAR_CREATE_TAG].json.lessonDate.text = data.dateJapanese;
		//受講する授業のテーマを入れる
		this[VAR_CREATE_TAG].json.themeArea.themeDetailText.text = data[COLUMN_NAME_LESSON_NAME];
		//受講する授業の時間割を入れる
		this[VAR_CREATE_TAG].json.timeTableArea.timeTableText.text = data[COLUMN_NAME_START_TIME].substr(TIME_CUT_S, TIME_CUT_E) + ' 〜 ' + data[COLUMN_NAME_END_TIME].substr(TIME_CUT_S, TIME_CUT_E);
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
	this.dispContentsMain = function(dialogClass){
		//授業データ入力領域を作る
		this[VAR_CREATE_TAG].outputTag(LESSON_DATA, LESSON_DATA, this.dialog);
		this[VAR_CREATE_TAG].outputTag('lessonDate', 'lessonDate', DOT + LESSON_DATA + SELECTOR_LAST);
		//授業のテーマを設定する領域を出力する
		this[VAR_CREATE_TAG].outputTag(CLASS_LESSON_THEME, CLASS_LESSON_THEME, DOT + LESSON_DATA + SELECTOR_LAST);
		//授業の時間割を設定する領域を出力する
		this[VAR_CREATE_TAG].outputTag(CLASS_LESSON_TIMETABLE, CLASS_LESSON_TIMETABLE, DOT + LESSON_DATA + SELECTOR_LAST);
		this[VAR_CREATE_TAG].outputTag('studentsArea', 'studentsArea', $(DOT + LESSON_DATA, this.dialog));
		//授業のステータスを設定する領域を出力する
		this[VAR_CREATE_TAG].outputTag(CLASS_LESSON_STATUS, CLASS_LESSON_STATUS, DOT + LESSON_DATA + SELECTOR_LAST);
		//授業の教室を設定する領域を出力する
		this[VAR_CREATE_TAG].outputTag(CLASS_LESSON_CLASSROOM, CLASS_LESSON_CLASSROOM, DOT + LESSON_DATA + SELECTOR_LAST);
		//授業のメモを設定する領域を出力する
		this[VAR_CREATE_TAG].outputTag(CLASS_LESSON_MEMO, CLASS_LESSON_MEMO, DOT + LESSON_DATA + SELECTOR_LAST);
	}
	
	/* 関数名:callbackUpdate
	 * 概要　:ダイアログの更新ボタンを押したときのコールバック関数用関数
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0823
	 * 作成者　:T.Masuda
	 */
	this.callbackUpdate = function(){
		
		//フォームをsubmitしてvalidationを行う
		$(this.dialog).submit();
	}

	/* 関数名:callbackStudents
	 * 概要　:ダイアログの受講者一覧ボタンを押したときのコールバック関数用関数
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0823
	 * 作成者　:T.Masuda
	 */
	this.callbackStudents = function(){
		
		//親ダイアログから渡されたデータを次のダイアログに渡すため取得する
		var argumentObj = $.extend(true, {}, this.dialogClass.getArgumentObject());
		// 2016/09/07 add k.urabe 親から引き継いだダイアログタイトルを「授業受講者一覧」に書き換える。
		argumentObj.config.title = TITLE_STUDENTS_LIST;
		//受講者一覧ダイアログを作る
		var userListDialog = new dialogEx('dialog/adminLessonUserListDialog.html', argumentObj);
		//受講者一覧ダイアログを表示する
		userListDialog.run();
	}

	/* 関数名:setConfig
	 * 概要　:ダイアログの設定を行う。
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:2015.0822
	 * 作成者　:T.Masuda
	 */
	this.setConfig = function(){
		//更新・受講者一覧ボタンを使う
		this.setDialogButtons(this.update_students);
		//ダイアログの位置調整を行う
		this.setDialogPosition(POSITION_CENTER_TOP);
		//受け取った値をテキストボックスやセレクトボックスに入れるためにデータを取得する
		var data = this.dialogClass.getArgumentDataObject();
		//連想配列のデータをダイアログの各要素に配置していく
		commonFuncs.setObjectValue(data, this.dialog);
		//入力チェックを登録する
		$(this.dialog).validate(this.validation);
	}

	/* 関数名:updateJson
	 * 概要　:サーバへクエリを投げる前に、送信するJSONデータを加工する
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0815
	 * 作成者　:T.Masuda
	 */
	this.updateJson = function(){
		//ダイアログ生成時に渡されたインプット用データを取得する
		var data = this.dialogClass.getArgumentDataObject();
		//入力した値を取得し、データの更新に用いる
		var updateData = commonFuncs.getInputData(DOT + LESSON_DATA);
		//送信するデータをまとめたオブジェクトを作って返す
		return $.extend(true, 
				{},				//オブジェクトを新たに作る 
				data, 			//親ダイアログからのデータ
				updateData, 	//このダイアログ内の入力データ
				//レコード更新クエリ
				{db_setQuery:this.create_tag.json.updateLessonQuery.db_setQuery}
			);
	};
	
	/* 関数名:lessonDataUpdate
	 * 概要　:授業データを入力された値で更新する
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:2015.0815
	 * 作成者　:T.Yamamoto
	 * 変更日　:2015.0912
	 * 変更者　:T.Masuda
	 * 内容	　:現行のクラスの形式に合わせました。
	 */
	this.lessonDataUpdate = function () {
		//送信するJSONを作成する
		var sendObject = this.updateJson();
		//授業詳細テーブルを更新する
		var result = this.sendQuery(URL_SAVE_JSON_DATA_PHP, sendObject);
		//DBレコードの更新に成功したかを判定する
		switch(parseInt(result.message)){
			//失敗時
			case SETQUERY_FAILED:
				//失敗のアラートを出す
				alert(MES_LESSON_EDIT_FAILED);
				break;
			//成功時
			default:
				//成功のお知らせを出す
				alert(MES_LESSON_EDIT_SUCCESS);
				//親ダイアログの授業一覧を更新するため、ダイアログ操作用クラスを取得する
				var parentDialogBuilder = this.dialogClass.getArgumentDataObject().parentDialogBuilder;
				//親ダイアログを一旦からにする
				$(parentDialogBuilder.dialog).empty();
				//親ダイアログの中身を作り直す
				parentDialogBuilder.dispContents();
				// 2016.09.08 add k.urabe 処理成功後、ダイアログを閉じる処理を追加
				$(this.dialog).dialog(CLOSE);
				break;
		}
	}

}

//継承の記述
adminLessonDetailDialog.prototype = new baseDialog();
//サブクラスのコンストラクタを有効にする
adminLessonDetailDialog.prototype.constructor = baseDialog;
