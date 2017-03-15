/* 
 * ファイル名:login.js
 * 概要  :ログイン状態の検知からログインダイアログを出すの処理をまとめたJSファイル。
 *       詳細な処理はダイアログ側にあり
 * 作成者:T.Masuda
 * 作成日:2016.05.03
 * パス :js/login.js
 */

/*
 * クラス名:loginStateError
 * 概要  :非ログイン状態を検知したときの例外
 * 引数  :int createTagState:ログインエラー状態の整数値
 * 作成日:2015.08.01
 * 作成者:T.Masuda
 */
	function loginStateError(createTagState){
		//ログインダイアログが既に出ていなければ
		if(!($(CLASS_LOGIN_DIALOG).length)){
				
			//エラー内容の値をメンバに格納する
			this.createTagState = createTagState;
			//タイトルの文字列
			this.title = '';
			//ダイアログのメッセージ
			this.message = '';
	
			//エラー内容でダイアログの内容をを分岐させる
			switch(this.createTagState){
			//初回ログイン時
			case STATE_NOT_LOGIN:
				this.title = LOGIN;				//タイトルを「ログイン」にする
				this.message = LOGIN_MESSAGE;	//初回ログインダイアログ用のメッセージを表示するようにする
				break;				//switch文を抜ける
			//タイムアウト時
			case STATE_TIMEOUT:
				this.title = RE_LOGIN;				//タイトルを「再ログイン」にする
				this.message = RE_LOGIN_MESSAGE;	//再ログインダイアログ用のメッセージを表示するようにする
				break;				//switch文を抜ける
			}
			
			//ダイアログ用のインプットデータオブジェクトを作る
			var argumentObj = commonFuncs.getDefaultArgumentObject();
			//ダイアログの幅を固定幅にする
			argumentObj.config.width = DIALOG_FIXED_WIDTH;
			//ログインダイアログのクラス名をセットする
			argumentObj.config.dialogClass = 'dialog loginDialog';
			//インプット用データオブジェクトにエラー内容の値を追加する
			$.extend(true, argumentObj.data, {createTagState: this.createTagState});
			//インプット用データオブジェクトにタイトルのデータを追加する
			$.extend(true, argumentObj.config, {title: this.title});
			
			//ログインダイアログを作る。
			var loginDialog = new dialogEx(URL_LOGIN_DIALOG, argumentObj, {});
			loginDialog.run();	//ログインダイアログを開く
			commonFuncs.hideLoadingScreen();	//ローディング画面が出っぱなしになっているので消す
			//ログインダイアログが見えなくなっていたら、ダイアログをbody直下に移動する
			if ($('.window:has(.inputArea)').height() < $('.ui-dialog:has(.inputArea)').height()) {
				//オーバーレイもセットで動かす
				$('.window:last').after($('.ui-dialog:has(.inputArea)').siblings('.ui-widget-overlay'))
									.after($('.ui-dialog:has(.inputArea)'));
			}
		}
	};
	
	