/* ファイル名:dialogEx.js
 * 概要　　　:URLからダイアログのHTMLファイルを取得して表示する。
 * 設計者　:H.Kaneko
 * 作成日　:2015.0729
 * 作成者　:T.Masuda
 * 場所　　:js/dialogEx.js
 */

/* クラス名:dialogEx
 * 概要　　:URLからダイアログのHTMLファイルを取得して表示する。
 * 引数　　:String url:ダイアログのクラス名
 * 		　:Object argumentObj:インプット用データオブジェクト
 * 		　:Object returnObj:アウトプット用データオブジェクト
 * 設計者　:H.Kaneko
 * 作成日　:2015.0729
 * 作成者　:T.Masuda
 * 変更日　:2015.0731
 * 変更者　:T.Masuda
 * 内容　　:引数「argumentObj」を追加しました
 * 変更日　:2015.0813
 * 変更者　:T.Masuda
 * 内容　　:windowExクラスを継承するようにしました。
 */
function dialogEx(url, argumentObj, returnObj){
	//親クラスのコンストラクタを起動する
	windowEx.call(this, url, argumentObj, returnObj);

	//デフォルト設定のオブジェクト
	//argumentObjを作る際に参考にしてください。
	this.defaultArgumentObj = {
		//ダイアログの設定データオブジェクト
		config:{
			width: STR_AUTO,		//幅を自動調整する
			autoOpen : true,	//作成時の自動オープンを無効にする
			modal : true,		//モーダル表示
			resizable : false,	//ドラッグでのリサイズ可否
			//表示位置の指定。
			position :POSITION_CENTER_TOP,
			closeOnEscape : false,	//escキーを押して閉じるか
			appendTo : $('body'),	//追加先
			create:function(){	//ダイアログ作成時のイベント
			},
			open://基本的にopen時はdispContentsが実行されるようにする
				function(){
				//dispContentsをコールしてダイアログの内容を作る
				commonFuncs.setCallbackToEventObject(this, DIALOG_INSTANCE, DIALOG_DISP_MESTHOD);
			},
			close:function(){
				//ダイアログを完全に破棄する
				commonFuncs.setCallbackToEventObject(this, INSTANCE, DESTROY);
			}
		},
		//インプット用データオブジェクト
		data:{
		}
	};

	//デフォルトのアウトプット用オブジェクト
	//returnObjを作る際に参考にしてください。
	this.defaultReturnObj = {
			//ダイアログのステータスオブジェクト
			statusObj:{
				buttonState:UNSELECTED	//押されたボタンの値。1→未選択 0→いいえ 1→はい 
			},
			//アウトプット用データのオブジェクト
			data:{
			}
	};
	
	
	/* 関数名:run
	 * 概要　:ダイアログを生成して表示する。
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0729
	 * 作成者　:T.Masuda
	 */
	this.run = function(){
		//ロード失敗時の例外処理を行うため、try-catch節を使う。
		try{
			//変更者:T.Yamamoto 変更指示者:H.Kaneko 日付2015.08.07 内容：loadの引数を
			//メンバのURLからHTMLデータを読み込む
			this.load(this.url);
			//argumentObj、returnObjが空であればデフォルトのものを使う
			this.setDefaultObjects();
			
			var dom = $(this.dom)[0];	//ダイアログのDOMを取得する
			dom.instance = this;		//ダイアログのDOMにクラスインスタンスへの参照を持たせる。
			this.dom = dom;				//クラスインスタンスにDOMへの参照を持たせる
			
			$(dom).dialog(this.argumentObj.config).parent();	//configの設定を使ってダイアログを作成、表示する
		//例外をキャッチしたら
		} catch(e){
			//通信が終了しているのでローディング画面を消す
			commonFuncs.hideLoadingScreen();
			console.log(e.stack);	//投げられたエラーオブジェクトをコンソールログに出す。
			//ダイアログのDOMが既に存在していたら
			if(commonFuncs.checkEmpty(this.dom)){
				this.destroy();	//ダイアログを消去する
			}
		}
	}

	
	/* 関数名:destroy
	 * 概要　:ダイアログの破棄する。
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0729
	 * 作成者　:T.Masuda
	 */
	this.destroy = function(){
		//ダイアログのDOMを取得する。
		var $dialog = this.dom !== void(0)? $(this.dom) : $(this);
		var dialogRole = $dialog.attr(ROLE);	//ダイアログのrole属性を取得する
		//ダイアログが確認ダイアログであれば、その親の要素(=元のダイアログ)を取得して処理対象にする
		$dialog = dialogRole !== void(0) && dialogRole.indexOf(CONFIRM_DIALOG) != -1 
			? $('[role="' + CONFIRM_DIALOG + '"]' + SELECTOR_LAST) : $dialog;
			
		//例外に備える
		try{
			//まずはダイアログを閉じる
			$dialog.dialog(CLOSE);
			//jQuery UIのダイアログを破棄する
			$dialog.dialog(DESTROY);
		//例外発生時
		} catch(e) {
			//握りつぶす
		//必ず最後は
		} finally {
			//DOMを消す
			$dialog.remove();
		}
	}
	/* 関数名:setAlertContents
	 * 概要　:ダイアログにアラートと閉じるボタンを表示する
	 * 引数　:String:alertMessage: アラートで表示するメッセージ文字列
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.08.07
	 * 作成者　:T.Yamamoto
	 */
	this.setAlertContents = function(alertMessage) {
		var domtmp = this.dom;	//現在参照しているDOMが書き変わるため、退避する
		//アラートとして表示するためのdomを取得する
		this.load(DIALOG_DEFAULT_ALERT_CONTENTS);
		//アラートで表示するdomをセレクタとして変数に入れる
		var alertDom = $(this.dom)[0];
		//domをダイアログにセットする
		$(DOT + UI_DIALOG_CONTENT).append(alertDom);
		//メッセージを表示する
		$(DOT + UI_DIALOG_CONTENT + TAG_P).text(alertMessage);
		this.dom = domtmp;	//退避していたDOMの参照を戻す
	}

	/* 関数名:setConfirmContents
	 * 概要　:ダイアログに確認用テキストとはい、いいえのボタンを表示する
	 * 引数　:String:message:ダイアログのメッセージ
	 * 		:Function:func:ダイアログが閉じるときのコールバック関数
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.08.07
	 * 作成者　:T.Yamamoto
	 * 変更日　:2015.08.08
	 * 変更者　:T.Masuda
	 * 内容　　:内容を作りました。
	 */
	this.setConfirmContents = function(message, func) {
		var domtmp = this.dom;	//現在参照しているDOMが書き変わるため、退避する
		//アラートとして表示するためのdomを取得する
		this.load(CONFIRM_DIALOG_PATH);
		//アラートで表示するdomをセレクタとして変数に入れる
		var confirm = $(this.dom)[0];
		//メッセージを表示する
		$(CURRENT_DIALOG + TAG_P).filter(SELECTOR_LAST).text(message);
		this.dom = domtmp;	//退避していたDOMの参照を戻す
		//ダイアログを閉じる時のクローズバック関数を登録する
		this.setCallbackCloseOnAfterOpen(func);
	}

	/* 関数名:removeDialogCloseBox
	 * 概要　:ダイアログのクローズボックスを消す
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:2015.0808
	 * 作成者　:T.Masuda
	 */
	this.removeDialogCloseBox = function(){
		$(UI_DIALOG_CLOSEBOX + SELECTOR_LAST).remove();
	}
	
	/* 関数名:removeDialogButtons
	 * 概要　:ダイアログの設定で表示するボタンを消す
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:2015.0808
	 * 作成者　:T.Masuda
	 */
	this.removeDialogButtons = function(){
		$(UI_DIALOG_BUTTON_PANEL, this.dom.parent()).remove();
	}

	/* 関数名:setCallbackCloseOnAfterOpen
	 * 概要　:ダイアログが開いた後にcloseイベントのコールバックを設定する
	 * 引数　:function func:コールバック関数で実行される関数のポインタ
	 * 返却値:なし
	 * 作成者　:T.Masuda
	 * 変更日　:2015.0813
	 * 変更者　:T.Masuda
	 * 内容　　:セット先が変わりました。
	 */
	this.setCallbackCloseOnAfterOpen = function(func){
		//引数が関数であれば
		if(func instanceof Function){
			//optionでcloseコールバック関数をセットする
			$(this.dom).dialog(OPTION, CLOSE, func);
		//関数以外であれば
		} else {
			console.log("not a function");
		}
	}
	
	/* 関数名:setPushedButtonState
	 * 概要　:押されたボタンがどれかを表す値を更新するsetterメソッド
	 * 引数　:String buttonState:ボタンの値。ボタンが押された後にbuttonタグのvalueから値を取得することを想定しているため、文字列となっている
	 * 返却値:なし
	 * 作成日　:015.08.08
	 * 作成者　:T.Masuda
	 */
	this.setPushedButtonState = function(buttonState){
		//引数の値を押されたボタンの状態としてセットする
		this.returnObj.statusObj.buttonState = parseInt(buttonState);
	}
	
	/* 関数名:getPushedButtonState
	 * 概要　:押されたボタンを表す値を返すgetterメソッド
	 * 引数　:String:なし
	 * 返却値:int:ボタンを表す整数を返す
	 * 作成日　:015.08.08
	 * 作成者　:T.Masuda
	 */
	this.getPushedButtonState = function() {
		return this.returnObj.statusObj.buttonState;
	}

	/* 関数名:setDefaultObjects
	 * 概要　:メンバの各オブジェクトが空であれば、デフォルトのものを使う
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:2015.1004
	 * 作成者　:T.Masuda
	 */
	this.setDefaultObjects = function(){
		//argumentObj、returnObjが空であればデフォルトのものを使う
		this.argumentObj = Object.keys(this.argumentObj).length? this.argumentObj: this.defaultArgumentObj;
		this.returnObj = Object.keys(this.returnObj).length? this.defaultReturnObj: this.defaultReturnObj;
	}
	
	
}

//親クラスwindowExが読み込まれていなければ読み込むコード
//親クラスが読み込まれていなければ
if(windowEx === void(0)){
	//共通関数クラスが用意されていれば
	if(commonFuncs !== void(0)){
		//dialogExの親クラスwindowExの定義ファイルを読み込む
		commonFuncs.getScriptFile(WINDOW_EX_PATH);
	} else {
		//共通関数クラスが用意されていない旨を伝える
		console.log(COMMON_FUNCS_NOT_EXIST);
	}
}

//windowExクラスを継承する
dialogEx.prototype = new windowEx();
//サブクラスのコンストラクタを有効にする
dialogEx.prototype.constructor = windowEx;
