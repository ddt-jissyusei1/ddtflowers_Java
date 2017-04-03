/* ファイル名:userSearchDialog.js
 * 概要　　　:管理者 会員一覧 ユーザ検索ダイアログのJSファイル
 * 作成者　:T.Masuda
 * 場所　　:dialog/js/userSearchDialog.js
 */

/* クラス名:userSearchDialog.js
 * 概要　　:管理者 会員一覧 ユーザ検索ダイアログ
 * 親クラス:baseDialog
 * 引数	 :Element dialog:ダイアログのDOM
 * 作成者　:T.Masuda
 * 場所　　:dialog/js/userSearchDialog.js
 */
function userSearchDialog(dialog){
	baseDialog.call(this, dialog);	//親クラスのコンストラクタをコールする

	this.targetPage = '';			// 入力値チェックを行う画面のセレクタを格納する変数 2016.09.19 add k.urabe
	this.copyTarget = '';			// 検索のための入力値をコピーするセレクタを格納する変数 2016.09.19 add k.urabe

	// 2016.09.15 add k.urabe ユーザ検索ダイアログ用validation設定オブジェクトを追加
	this.validation = {
		//チェックが通った時の処理
		submitHandler : function(form, event){

			// 入力値チェックが成功したので、ユーザ検索を実行する
			thisDialog[0].dialogBuilder.clickSearchButtonEvent();	// 2016.09.19 add k.urabe　入力チェック成功時の処理を実行

			return false;	//デフォルトのsubmitをキャンセルする
		},
		invalidHandler:function(form,error){	//チェックで弾かれたときのイベントを設定する。
			var errors = $(error.errorList);	//今回のチェックで追加されたエラーを取得する。
			//エラー文を表示する。
			alert(createErrorText(errors, errorJpNames));

		},
		rules :{
			telephone : {
				telnum : true
			},
			mail_address : {
				emailjp : true
			}, 
			id : {
				digits : true
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
		//会員にユーザ検索ダイアログのjsonを取得する
		this[VAR_CREATE_TAG].getJsonFile(USER_SEARCH_DIALOG_JSON);
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
		
		//会員にユーザ検索ダイアログのjsonを取得するのテンプレートを取得する
		this[VAR_CREATE_TAG].getDomFile(USER_SEARCH_DIALOG_HTML);
		
	};

	/* 関数名:setTargetPage
	 * 概要　:処理の対象となる画面のセレクタをメンバ変数にセットする
	 * 引数 :String targetPage : 対象となる画面のセレクタ。createTagの参照を持っている要素である必要あり
	 * 返却値 :なし
	 * 作成日　:2016.09.19
	 * 作成者　:k.urabe
	 */
	 this.setTargetPage = function(targetPage) {
	 	// 引数で受け取った処理対象画面のセレクタをメンバ変数へセットする
	 	this.targetPage = targetPage;
	 }

	 /* 関数名:setCopyTarget
	 * 概要　:検索のための入力値をコピーするセレクタをメンバ変数にセットする
	 * 引数 :String copyTarget : テキストボックスをコピーする先
	 * 返却値 :なし
	 * 作成日　:2016.09.19
	 * 作成者　:k.urabe
	 */
	 this.setCopyTarget = function(copyTarget) {
	 	// 引数で受け取った検索のための入力値をコピーするセレクタをメンバ変数へセットする
	 	this.copyTarget = copyTarget;
	 }

	 /* 関数名:getTargetPage
	 * 概要　:メンバ変数に格納された、処理の対象となる画面のセレクタを取得する
	 * 引数 :なし
	 * 返却値 :処理の対象となる画面のセレクタ
	 * 作成日　:2016.09.19
	 * 作成者　:k.urabe
	 */
	 this.getTargetPage = function() {
	 	// 処理対象画面のセレクタを返す
	 	return this.targetPage;
	 }

	 /* 関数名:getCopyTarget
	 * 概要　:メンバ変数に格納された、検索のための入力値をコピーするセレクタを取得する
	 * 引数 :なし
	 * 返却値 :検索のための入力値をコピーするセレクタ
	 * 作成日　:2016.09.19
	 * 作成者　:k.urabe
	 */
	 this.getCopyTarget = function() {
	 	// 検索のための入力値をコピーするセレクタを返す
	 	return this.copyTarget;
	 }

	 /* 関数名:clickSearchButtonEvent
	 * 概要　:検索ボタン押下後の入力値チェック成功時の処理を定義する
	        :addClickSearchButtonEventCallbackより移動
	 * 引数 :なし
	 * 返却値 :なし
	 * 作成日　:2016.09.19
	 * 作成者　:k.urabe
	 */
	 this.clickSearchButtonEvent = function() {
	 	// メンバ変数に保存されている処理対象画面セレクタを取得する
		var targetPage = this.getTargetPage();		// 2016.09.19 add k.urabe メンバ変数に保管されているセレクタを取得する宇処理を追加
		// メンバ変数に保存されているコピー先画面セレクタを取得する
		var copyTarget = this.getCopyTarget();		// 2016.09.19 add k.urabe メンバ変数に保管されているセレクタを取得する宇処理を追加

		//ユーザ検索を行う
		userListSearch(targetPage);
			
		//コピー先領域を取得する
		$copyTarget = $(copyTarget);
		//テキストボックスのコピー先の既存のテキストボックスを一掃する
		$copyTarget.children(SELECTOR_LABEL_TAG).remove();
			
		//入力済みのテキストボックスをユーザ一覧タブ内の検索フォームにコピーする
		$(SELECTOR_INPUT, this.dialog).filter(SELECTOR_NOT_BUTTON_TYPE).each(function(i){
			//テキストボックスに値が入っていたら
			if (commonFuncs.checkEmpty($(this).val())){
				//指定した先にテキストボックスとラベルをコピーする
				$copyTarget.append($(this).parent());
			}
		});

		//検索ボタン押下と共にダイアログを破棄する
		this.dialogClass.destroy();
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
		//検索フォームを作る
		this[VAR_CREATE_TAG].outputTag(KEY_USER_SEARCH_FORM, KEY_USER_SEARCH_FORM, CURRENT_DIALOG);
		//検索ボタンをセットする
		commonFuncs.putCommonButton(CURRENT_DIALOG, 'searchUserButton fRight', 'search', true, false, true);
	}
	
	/* 関数名:setConfig
	 * 概要　:ダイアログの設定を行う。任意でオーバーライドして定義する
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成者　:T.Masuda
	 * 作成日　:2015.0822
	 * 変更者 :k.urabe
	 * 変更日 :2016.09.15
	 * 内容 :フォームに対する入力チェックの登録を追加
	 */
	this.setConfig = function(){
		//ユーザ一覧タブ内の検索フォームの値をダイアログにコピーする
		this.copyTextboxValues('#adminTab .searchUserList');
		//ボタンをjQueryUIのものにして見栄えを良くする
		$(SELECTOR_INPUT_BUTTON, this.dialog).button();
		//会員一覧の検索の中にあるテキストボックスにフォーカスしているときにエンターキー押下で検索ボタンを自動でクリックする
		commonFuncs.enterKeyButtonClick('.adminUserSearch', '.searchUserButton:last');
		//ダイアログの位置を修正する
		this.setDialogPosition(POSITION_CENTER_TOP);
		// 入力チェック処理を追加
		$(CURRENT_DIALOG).validate(this.validation);	// 2016.09.18 add k.urabe 作成した入力チェックを登録する処理を追加
	}

	/* 関数名:setCallback
	 * 概要　:ダイアログのイベントのコールバック関数を設定する
	 * 引数　:なし(オーバーライド時に定義する)
	 * 返却値:なし
	 * 作成日　:2015.0822
	 * 作成者　:T.Masuda
	 */
	this.setCallback = function(){
		//dialogExクラスインスタンスがあれば
		if(commonFuncs.checkEmpty(this[DIALOG_CLASS])){
			//デフォルトのコールバック関数をセットする
			this[DIALOG_CLASS].setCallbackCloseOnAfterOpen(this.callbackClose);
			//ユーザ一覧検索関数をボタンにセットする
			this.addClickSearchButtonEventCallback('.searchUserButton:last', '#userList', '#adminTab .searchUserList')
		}
	}

	/* 関数名:addClickSearchButtonEventCallback
	 * 概要　:ダイアログのイベントのコールバック関数を設定する。
	 *      :内容としては、テキストボックスの内容を元にユーザ一覧の検索を行い、検索に使ったテキストボックスを元
	 *      :ページの検索フォーム領域にコピーし、その後にダイアログを閉じるというものになる。
	 *      :コピーしたテキストボックスはenterキー押下で検索を実行する。
	 * 返却値  :String target : イベントコールバック登録を行う要素。基本的にボタン
	 *        :String targetPage : 対象となる画面のセレクタ。createTagの参照を持っている要素である必要あり
	 *        :String copyTarget : テキストボックスをコピーする先
	 * 返却値:なし
	 * 作成日　:2016.0410
	 * 作成者　:T.Masuda
	 * 変更日 :2016.09.15
	 * 変更者 :k.urabe
	 * 内容 :jqueryによるsubmit処理を追加。
	 */
	this.addClickSearchButtonEventCallback = function(target, targetPage, copyTarget){
		//クリックイベントコールバック内で当クラスインスタンスを使うため変数に格納しておく
		var thisElem = this;
		//検索ボタンをクリックしたときにテーブルの内容を更新する
		$(target).on(CLICK, function() {
			// 入力値チェックに使用するため、受け取った処理対象画面セレクタをメンバ変数にセットする
			thisElem.setTargetPage(targetPage);		// 2016.09.19 add k.urabe 引数をメンバ変数にセットする処理を追加
			// 入力値チェックに使用するため、受け取ったコピー先画面セレクタをメンバ変数にセットする
			thisElem.setCopyTarget(copyTarget);		// 2016.09.19 add k.urabe 引数をメンバ変数にセットする処理を追加

			// 入力フォームに対してsubmitを実行（入力値チェック）する
			$(CURRENT_DIALOG).submit();				// 2016.09.15 add k.urabe 対象フォームに対してsubmitを実行する処理を追加

		});

	}
	
	/* 関数名:copyTextboxValues
	 * 概要　:name属性が一致したテキストボックスの内容を一括コピーする
	 * 返却値  :String copyFrom : コピー元のテキストボックスのフォームのセレクタ
	 * 返却値:なし
	 * 作成日　:2016.0410
	 * 作成者　:T.Masuda
	 */
	this.copyTextboxValues = function(copyFrom){
		//each関数内で当該クラスインスタンスを利用するため変数に入れておく
		var thisElem = this;	
		//コピー元となる対象を走査する
		$(SELECTOR_INPUT, $(copyFrom)).each(function(i){
			//走査対象の要素からname属性を取得する
			var name = $(this).attr(STR_NAME);
			//当該ダイアログ内の検索フォーム内の同一name属性の要素を取得する
			var $targetElem = $(SELECTOR_INPUT, this.dialog).filter(ATTR_EQUAL_NAME_FRONT + name + ATTR_EQUAL_NAME_REAR);
			console.log($(STR_NAME, this.dialog));
			console.log($targetElem);
			//対象を取得できている場合
			if ($targetElem.length){
				//値をコピーする
				$targetElem.attr(VALUE, $targetElem.val());
			}
		});
	}	
	
	/* 関数名:sendQuery
	 * 概要　:DBヘテーブル操作のクエリを投げる
	 * 引数　:String sendUrl:DBへアクセスするアプリケーションのパス
	 * 		:Object sendObj:URLへ送信するデータのオブジェクト
	 * 返却値:int:処理したレコード数を返す
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0822
	 * 作成者　:T.Masuda
	 */
	this.sendQuery = function(sendUrl, sendObj){
	};
	
//ここまでクラスの記述
}

//継承の記述
userSearchDialog.prototype = new baseDialog();
//サブクラスのコンストラクタを有効にする
userSearchDialog.prototype.constructor = baseDialog;
