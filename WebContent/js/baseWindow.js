/** ファイル名:baseWindow.js
 * 概要　　　:コンテンツを描画するウィンドウの基底クラスのファイル
 * 設計者　:H.Kaneko
 * 作成日　:2015.10.03
 * 作成者　:T.Masuda
 * 場所　　:dialog/js/baseWindow.js
 */

/** クラス名:baseWindow
 * 概要　:コンテンツを描画するウィンドウの基底クラス
 * 引数	:なし
 * 設計者:H.Kaneko
 * 作成日:2015.10.03
 * 作成者:T.Masuda
 */
function baseWindow(url, argumentObj, returnObj){

	//ウィンドウのHTMLのURLを格納するメンバ
	this.url = url;
	//ウィンドウ自身のDOMを格納するメンバ
	this.dom = EMPTY_STRING;
	this.WINDOW_ZINDEX_COEFFICIENT = 99;	//ウィンドウごとのz-indexの値の差
	//インプット用データのオブジェクト
	this.argumentObj = argumentObj !== void(0)? argumentObj : {};
	//アウトプット用データのオブジェクト
	this.returnObj = returnObj !== void(0)? returnObj : {};
	
	//デフォルト設定のオブジェクト
	this.defaultArgumentObj = {
		//設定データオブジェクト。dialogEx(当クラスを継承したクラス)では必ず利用する
		config:{
		},
		//インプット用データオブジェクト
		data:{
		}
	};
	
	//デフォルト設定のreturnObj
	this.defaultReturnObj = {
			//状態設定のオブジェクト
			statusObj:{
			},
			//インプット用データオブジェクト
			data:{
			}
	};
	
	/* 関数名:load
	 * 概要　:URLのHTMLファイルを取得してメンバに保存する。
	 * 引数　:String: domUrl:取得するHTMLファイルのパス
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.1004
	 * 作成者　:T.Masuda
	 */
	this.load = function(domUrl){
		//クラスインスタンスへの参照を変数に格納しておく。
		var tmpThis = this;
		
		//Ajax通信でURLからHTMLを取得する。
		$.ajax({
			url:domUrl,				//URLを設定する
			dataType:'HTML',		//HTMLデータを取得する
			async: false,			//同期通信を行う
			cache: true,			//通信結果をキャッシュする
			success:function(html){	//通信成功時
				//DOMをクリアする
				tmpThis.dom = EMPTY_STRING;	
				//取得したhtmlデータをメンバに格納する。
				tmpThis.dom = html;
			},
			error:function(xhr, status, e){	//通信失敗時
				//例外としてエラーオブジェクトを投げる。
				throw new Error('通信に失敗しました :' + e);
			}
		});
	}
	
	/* 関数名:run
	 * 概要　:ウィンドウを生成して表示する。
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.1003
	 * 作成者　:T.Masuda
	 */
	this.run = function(){
	}	

	/* 関数名:runInit
	 * 概要　:run後の初期化処理
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:2015.1004
	 * 作成者　:T.Masuda
	 */
	this.runInit = function(){
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
	
	
	/* 関数名:destroy
	 * 概要　:ウィンドウをを破棄する。
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.1004
	 * 作成者　:T.Masuda
	 */
	this.destroy = function(){
		$(this.dom).remove();	//自身のDOMを消す
		
		//close時のコールバック関数が登録されていたら
		if(this.argumentObj.config.close !== void(0) 
				&& this.argumentObj.config.close instanceof Function){
			this.argumentObj.config.close();	//コールする
		}
	}

	/* 関数名:setWindowZIndex
	 * 概要　:ウィンドウの重なりを整理する
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:2015.0921
	 * 作成者　:T.Masuda
	 */
	this.setWindowZIndex = function(){
		var windows = $('.window');	//全てのウィンドウを取得する
		//ウィンドウの数を取得する
		var windowsLength = windows.length;
		var prevZindex = 0;
		
		//全ウィンドウを走査する
		for(var i = 0; i < windowsLength; i++){
			//ウィンドウをのZ座標を指定していく
			$(windows[i]).css('z-index', (i + 1) * this.WINDOW_ZINDEX_COEFFICIENT + prevZindex);
			//ダイアログとオーバーレイのZIndexも整理する
			$(windows[i]).nextAll('.ui-dialog, .ui-widget-overlay').each(function(){
				$(this).hide();
			});
			
			$(windows[windowsLength - 1]).nextAll('.ui-dialog, .ui-widget-overlay').show();
//			$('.dialog, .ui-widget-overlay', windows[i]).each(function(i){
//				//順次Z座標を指定していく
//				$(this).css('z-index', (i + 1) * this.WINDOW_ZINDEX_COEFFICIENT);
//				//最後の要素なら
//				if(i <= $('.dialog, .ui-widget-overlay', windows[i]).length){
//					//次のウィンドウの処理のときに必ず前のウィンドウの要素より下にならないよう、zindexを加算していく
//					prevZindex += parseInt($(this).css('z-index'));
//				}
//			});
		}
	}
	
	/* 関数名:setAlertContents
	 * 概要　:警告コンテンツをセットする
	 * 引数　:String:alertMessage:警告メッセージ
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.1003
	 * 作成者　:T.Masuda
	 */
	this.setAlertContents = function(alertMessage) {
	}

	/* 関数名:setConfirmContents
	 * 概要　:確認コンテンツをセットする
	 * 引数　:String:message:確認のメッセージ
	 * 		:Function:func:コールバック関数
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.1003
	 * 作成者　:T.Masuda
	 */
	this.setConfirmContents = function(message, func) {
	}

	/* 関数名:getArgumentObject
	 * 概要　:argumentObjを返す
	 * 引数　:なし
	 * 返却値:Object:ダイアログのインプットデータオブジェクト
	 * 作成日　:2015.1003
	 * 作成者　:T.Masuda
	 */
	this.getArgumentObject = function() {
		return this.argumentObj;	//argumentオブジェクトを返す
	}
	
	/* 関数名:getArgumentConfigObject
	 * 概要　:configオブジェクトを返す
	 * 引数　:なし
	 * 返却値:Object:ダイアログの設定用オブジェクト
	 * 作成日　:2015.1003
	 * 作成者　:T.Masuda
	 */
	this.getArgumentConfigObject = function() {
		return this.argumentObj.config;	//configオブジェクトを返す
	}
	
	/* 関数名:getArgumentDataObject
	 * 概要　:インプット用データオブジェクトを返す
	 * 引数　:なし
	 * 返却値:Object:インプット用データオブジェクト
	 * 作成日　:2015.1003
	 * 作成者　:T.Masuda
	 */
	this.getArgumentDataObject = function() {
		return this.argumentObj.data;	//dataオブジェクトを返す
	}

	/* 関数名:getReturnObject
	 * 概要　:アウトプット用オブジェクトを返す
	 * 引数　:なし
	 * 返却値:Object:アウトプット用オブジェクト
	 * 作成日　:2015.1003
	 * 作成者　:T.Masuda
	 */
	this.getReturnObject = function() {
		return this.returnObj;		//アウトプット用オブジェクトを返す
	}
	
	/* 関数名:setArgumentObject
	 * 概要　:argumentObjをセットする
	 * 引数　:Object argumentObj:ダイアログのインプットデータオブジェクト
	 * 返却値:なし
	 * 作成日　:2015.1003
	 * 作成者　:T.Masuda
	 */
	this.setArgumentObject = function(argumentObj) {
		this.argumentObj = argumentObj;	//argumentオブジェクトをセットする
	}
	
	/* 関数名:setArgumentConfigObject
	 * 概要　:configオブジェクトをセットする
	 * 引数　:Object config:ダイアログのインプットデータオブジェクト
	 * 返却値:なし
	 * 作成日　:2015.1003
	 * 作成者　:T.Masuda
	 */
	this.setArgumentConfigObject = function(config) {
		this.argumentObj.config = config;	//configオブジェクトをセットする
	}
	
	/* 関数名:setArgumentDataObject
	 * 概要　:インプット用データオブジェクトをセットする
	 * 引数　:Object data:ダイアログのインプットデータオブジェクト
	 * 返却値:なし
	 * 作成日　:2015.1003
	 * 作成者　:T.Masuda
	 */
	this.setArgumentDataObject = function(data) {
		this.argumentObj.data = data;	//dataオブジェクトをセットする
	}

	/* 関数名:setReturnObject
	 * 概要　:アウトプット用オブジェクトをセットする
	 * 引数　:Object returnObj:アウトプット用オブジェクト
	 * 返却値:なし
	 * 作成日　:2015.1004
	 * 作成者　:T.Masuda
	 */
	this.setReturnObject = function(returnObj) {
		this.returnObj = returnObj;		//returnObjオブジェクトをセットする
	}

	/* 関数名:setCallbackClose
	 * 概要　:のcloseイベントのコールバック関数をセットする。
	 * 引数　:function func:コールバック関数で実行される関数のポインタ
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.1004
	 * 作成者　:T.Masuda
	 */
	this.setCallbackClose = function(func){
		//引数が関数であれば、closeイベントのコールバック関数として登録する。
		func instanceof Function? this.argumentObj.config[CLOSE] = func: console.log('setCallBackClose recieved enythingeles function');
	}
	
	/* 関数名:setCallbackOpen
	 * 概要　:openイベントのコールバック関数をセットする。
	 * 引数　:function func:コールバック関数で実行される関数のポインタ
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.1004
	 * 作成者　:T.Masuda
	 */
	this.setCallbackOpen = function(func){
		//引数が関数であれば、closeイベントのコールバック関数として登録する。
		func instanceof Function?  this.argumentObj.config[STR_OPEN] = func: console.log('setCallBackOpen recieved enythingeles function');
	}

	/* 関数名:setCallbackCreate
	 * 概要　:createイベントのコールバック関数をセットする。
	 * 引数　:function func:コールバック関数で実行される関数のポインタ
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.1004
	 * 作成者　:T.Masuda
	 */
	this.setCallbackCreate = function(func){
		//引数が関数であれば、closeイベントのコールバック関数として登録する。
		func instanceof Function?  this.argumentObj.config[EVENT_CREATE] = func: console.log('setCallBackCreate recieved enythingeles function');
	}
	
	/* 以下現状未使用 */
	
	/* 関数名:getReturnObject
	 * 概要　:アウトプット用オブジェクトを返す
	 * 引数　:なし
	 * 返却値:Object:アウトプット用オブジェクト
	 * 作成日　:2015.1003
	 * 作成者　:T.Masuda
	 */
	this.getReturnObject = function() {
		return this.returnObj;		//アウトプット用オブジェクトを返す
	}

	/* 関数名:getReturnDataObject
	 * 概要　:アウトプット用データオブジェクトを返す
	 * 引数　:なし
	 * 返却値:Object:アウトプット用データオブジェクト
	 * 作成日　:2015.1003
	 * 作成者　:T.Masuda
	 */
	this.getReturnDataObject = function() {
		return this.returnObj.data;		//アウトプット用データのオブジェクトを返す
	}
	
	/* 関数名:getReturnStatusObject
	 * 概要　:アウトプット用ステートオブジェクトを返す
	 * 引数　:なし
	 * 返却値:Object:アウトプット用ステートオブジェクトを返す
	 * 作成日　:2015.1003
	 * 作成者　:T.Masuda
	 */
	this.getReturnStatusObject = function() {
		return this.returnObj.statusObj;	//アウトプット用ステートのオブジェクトを返す
	}
	
	/* 関数名:setReturnStatusObject
	 * 概要　:アウトプット用ステートオブジェクトの状態オブジェクトをセットする
	 * 引数　:Object statusObj
	 * 返却値:なし
	 * 作成日　:2015.1003
	 * 作成者　:T.Masuda
	 */
	this.setReturnStatusObject = function(statusObj) {
		//statusObjをセットする
		this.returnObj.statusObj = statusObj;
	}

}