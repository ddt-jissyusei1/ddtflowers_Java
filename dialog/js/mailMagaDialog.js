/* ファイル名:mailMagaDialog.js
 * 概要　　　:管理者 メルマガ編集ダイアログのJSファイル
 * 作成者　:T.Masuda
 * 場所　　:dialog/js/mailMagaDialog.js
 */

/* クラス名:mailMagaDialog.js
 * 概要　　:管理者 メルマガ編集ダイアログ
 * 親クラス:baseDialog
 * 引数	 :Element dialog:ダイアログのDOM
 * 作成者　:T.Masuda
 * 場所　　:dialog/js/mailMagaDialog.js
 */
function mailMagaDialog(dialog){
	baseDialog.call(this, dialog);	//親クラスのコンストラクタをコールする

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
		this[VAR_CREATE_TAG].getJsonFile(PATH_MAILMAGA_DIALOG_JSON);
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
		this[VAR_CREATE_TAG].getDomFile(PATH_MAILMAGA_DIALOG_HTML);
	};
	
	/* 関数名:dispContentsMain
	 * 概要　:画面パーツ設定用関数のメイン部分作成担当関数
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0814
	 * 作成者　:T.Masuda
	 */
	this.dispContentsMain = function(){
		//メルマガ入力フォームを作る
		this[VAR_CREATE_TAG].outputTag('mailMagaAndAnnounceArea', 'mailMagaAndAnnounceArea', $(this.dialog));
		//送信ボタンを追加する
		commonFuncs.putCommonButton(CURRENT_DIALOG + ' .messageButtonArea', 'sendButton', 'send', true, true, true, {}, false);
		//削除ボタンを追加する
		commonFuncs.putCommonButton(CURRENT_DIALOG + ' .messageButtonArea', 'deleteButton', 'reset', true, true, true, {}, false);
	}
	
	/* 関数名:setConfig
	 * 概要　:ダイアログの設定を行う。任意でオーバーライドして定義する
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成者　:T.Masuda
	 * 作成日　:2015.0822
	 */
	this.setConfig = function(){
		//メルマガ送信処理を行う、メルマガ送信確認ダイアログを作る
		mailMagaSendConfirm('.messageButtonArea .sendButton');
		//ダイアログの位置を修正する
		this.setDialogPosition(POSITION_CENTER_TOP);
		//ボタンをjQueryUIのものにして見栄えを良くする
		$(SELECTOR_INPUT_BUTTON, this.dialog).button();
		$(SELECTOR_INPUT_RESET, this.dialog).button();

		//タイトルのテキストボックスをラベルサイズに合わせて伸縮させる
		ehm.addEventCallback('resize orientationchange', window, '.messageTitleLabel', 'resizeMailMagaDialogTitleInput()');
		//イベントコールバック登録とは別口でリサイズをしておく
		resizeMailMagaDialogTitleInput();
		
		//選択済みのレコードを取得する
		var selectedRecord = $('#mailMagaAndAnnounce .selectRecord');
		//選択済みのレコードが存在していたら
		if (selectedRecord.length) {
			//新規作成フォームに選択したレコードの値(既存の内容)を追加する
			this.setMailMagaSendContent(selectedRecord[0]);
		}
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
			this[DIALOG_CLASS].setCallbackCloseOnAfterOpen(this[DIALOG_CLASS].destroy);
		}
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
	
	/* 
	 * 関数名:copyExistMailMagaContent
	 * 概要  :既存のメルマガの内容をコピーする
	 * 引数  :Element copyFrom : コピー元のメルマガデータ行
	 * 返却値  :なし
	 * 作成者:T.Masuda
	 * 作成日:2016.04.17
	 */
	this.setMailMagaSendContent = function(copyFrom) {
			//メルマガ・アナウンスタブのcreateTagを取得する
			var mailMagaAndAnnounce = $(SELECTOR_MAILMAGA_TAB)[0].create_tag;
			//クリックされたのが何番目の行であるかを取得し、メルマガのタイトルや内容を取り出すのに使う
			var targetNumber = $(MAILMAGA_TABLE_RECORDS).index(copyFrom);

			//ページャの番号を取得する
			var pager = $(SELECTOR_MAILMAGA_NUMBERING).text();
			//ページャの番号-1の値を取得する
			var pageNum = commonFuncs.checkEmpty(pager) && !isNaN(pager)  ? parseInt(pager) - 1 : 0;
			//JSON内での記事の番号を取得する
			var targetNumberFix = pageNum * MAILMAGA_TABLE_SHOW_NUMBER + targetNumber;
			
			//取得した番号をもとにメルマガのタイトルや内容などの情報を取得し、連想配列に入れる
			var targetInf = mailMagaAndAnnounce.json.mailMagaTable[TABLE_DATA_KEY][targetNumberFix];
			//取得した連想配列をテキストボックスにセットする
			commonFuncs.setObjectValue(targetInf, SELECTOR_MAILMAGA_EDIT_AREA);
	}

	
//ここまでクラスの記述
}

//継承の記述
mailMagaDialog.prototype = new baseDialog();
//サブクラスのコンストラクタを有効にする
mailMagaDialog.prototype.constructor = baseDialog;
