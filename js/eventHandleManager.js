/** ファイル名:eventHandleManager.js
 * 概要　　　:イベント登録管理クラスのファイル
 * 作成日　:2016.0501
 * 作成者　:T.Masuda
 * 場所　　:js/eventHandleManager.js
 */

/** クラス名:eventHandleManager
 * 概要　:イベント登録管理クラス
 * 引数	:Object inheritedEventList : 引き継いだイベント一覧
 * 作成日:2016.0501
 * 作成者:T.Masuda
 */
function eventHandleManager(inheritedEventList){
	
	//イベント管理一覧を作成する。コンストラクタに一覧が渡されていたら引き継ぐ
	this.eventList = inheritedEventList ? inheritedEventList : {};
	
	/** 関数名:addEventCallback
	 * 概要　:イベントコールバックを登録する
	 * 引数	:String eventName : 引き継いだイベント一覧
	 *    	:Elem or String eventRoot: イベントルート
	 *    	:String selector : セレクタ
	 *    	:String function : 関数。引数を使うためにevalに渡す文字列とする
	 * 作成日:2016.0501
	 * 作成者:T.Masuda
	 */
	this.addEventCallback = function(eventName, eventRoot, selector, func){
		//重複チェックを行う
		if (this.eventList) {
			//一覧をチェックする
			for (key in this.eventList) {
				//重複が見つかったら
				if (key == eventName + selector) {
					return;	//重複登録を避けるため処理を終了する
				}
			}
		}
		
		//イベント名とセレクタの組み合わせでイベント登録一覧にキーを登録する
		this.eventList[eventName + selector] = true;
		
		//documentやwindowのみに登録できるイベントコールバックであれば
		if(eventName.indexOf('resize') != -1
			|| eventName.indexOf('orientationchange') != -1
			|| eventName.indexOf('load') != -1
			|| eventName.indexOf('ready') != -1) {
			//指定したイベントルートを元にイベントコールバックを登録する。セレクタは使わない
			$(eventRoot).on(eventName, function (){
				//関数をコールする
				eval(func);
			});
		//限定的でないイベントであれば
		} else {
			//指定したイベントルートを元に、指定した対象にイベントコールバックを登録する
			$(eventRoot).on(eventName, selector, function (){
				//関数をコールする
				eval(func);
			});
			
		}
		
	}
}

//即時使える様にインスタンスをnewしておく
var ehm = ehm ? ehm : new eventHandleManager;
