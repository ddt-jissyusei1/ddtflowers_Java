/* ファイル名:tabEx.js
 * 概要　　　:タブを作り表示するクラスのファイル
 * 設計者　:H.Kaneko
 * 作成日　:2015.1003
 * 作成者　:T.Masuda
 * 場所　　:js/tabEx.js
 */

/* クラス名:tabEx
 * 概要　　:タブを作り表示する
 * 引数　　:String url:ダイアログのクラス名
 * 		　:Object argumentObj:インプット用データオブジェクト
 * 		　:Object returnObj:アウトプット用データオブジェクト
 * 設計者　:H.Kaneko
 * 作成日　:2015.1003
 * 作成者　:T.Masuda
 */
function tabEx(url, argumentObj, returnObj){
	
	//親クラスのコンストラクタを起動する
	baseWindow.call(this, url, argumentObj, returnObj);
	//キャッシュ設定デフォルトではtrue
	this.cache		= false;
	//selectでタブが切り替わったかの判定。切り替え前の画面名が入る。通常はnull
	this.beforePanel	= null;
	
	//各種文字列
	//空タグの疑似セレクタ
	this.selectorEmpty			= ':empty';
	//easytabsのタブパネル切り替え直前のイベント
	this.eventEasytabsBefore	= 'easytabs:before';
	//href属性
	this.attrHref				= 'href';
	//オブジェクト内eventsキー
	this.keyEvents				= 'events';
	//タブインデックス内リンク文字のセレクタ
	this.tabIndexStrSelector	= ' > ul a';
	//対象を指定して登録するハッシュ切り替えイベント
	this.hashChangeTarget		= "hashchange.";
	
	//デフォルト設定のオブジェクト
	//argumentObjを作る際に参考にしてください。
	this.defaultArgumentObj = {
		//ダイアログの設定データオブジェクト
		config:{
			cache: true,	//キャッシュをtrueに固定する
			updateHash:false	//URLハッシュによるタブ開閉履歴を残す
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
			},
			//アウトプット用データのオブジェクト
			data:{
			}
	};
	
	
	/* 関数名:run
	 * 概要　:ダイアログを生成して表示する。
	 * 引数　:String target:タブを追加する先のセレクタ、または要素
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.1004
	 * 作成者　:T.Masuda
	 */
	this.run = function(target){
		//ロード失敗時の例外処理を行うため、try-catch節を使う。
		try{
			//メンバのURLからHTMLデータを読み込む
			this.load(this.url);
			this.dom.instance = this;	//DOMにクラスインスタンスへの参照を登録する
			
			//argumentObj、returnObjがそれぞれ空であれば、デフォルトの物に置き換える
			this.setDefaultObjects();
			
			var tab = $(this.dom).easytabs(this.argumentObj.config);	//configの設定を使ってタブを作成する
			//タブをクラスインスタンスから参照できる様にする
			this.tab = tab[0];
			tab[0].instance = this;	//逆の参照も可能にする
			
			//DOMにキャッシュ設定を保存する
			this.tab.cache = this.cache;
			$(target).append(tab);	//タブを指定した先に追加する
			
			
			this.tabChange();	//タブ切り替え時のイベントコールバックを設定する
		//例外をキャッチしたら
		} catch(e){
			console.log(e.stack);	//投げられたエラーオブジェクトをコンソールログに出す。
		}
	}

	/* 関数名:tabChange
	 * 概要　:タブの切り替えを行う直前の処理。キャッシュが無効ならタブパネルの内容を再取得して表示する
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:2016.0312
	 * 作成者　:T.Masuda
	 */
	this.tabChange = function(){
		var thisElem = this;	//下記イベントコールバック内で自身のインスタンスを使うため変数に保存する
		//タブ切り替え時
		$(this.tab).bind(this.eventEasytabsBefore, function(event, $clicked, $targetPanel, settings){
			//初回読み込み時ではないときにキャッシュしない設定であれば、新規にHTMLを取得して対象タブパネルに展開する
			if($targetPanel.filter(thisElem.selectorEmpty).length == 0 && !thisElem.cache){
//				if($targetPanel.filter(thisElem.selectorEmpty).length == 0 && !thisElem.tab[0].cache){
				//対象のタブパネルの内容を空にする
				$targetPanel.empty();
				//対象タブパネルのHTMLファイルのソースパスを取得する
				var source = $clicked.attr(thisElem.attrHref);
				
				//対象のHTMLデータを取得する
				$.get(source, '', function(html){
					//取得したHTMLを対象タブパネルに追加する
					$targetPanel.append(html);
				});
			}
			
			//デフォルトのキャッシュ設定がfalseなら
			if(!tabEx.cache) {
				//falseに戻す
				thisElem.cache = false;
			}

			// ユーザ一覧画面に他画面から遷移していないか、かつ遷移先がユーザ一覧画面でないか検証する	// 2016.12.26 k.urabe add
			if(thisElem.beforePanel && !($($($targetPanel)[0]).hasClass(KEY_USER_LIST))) {
				// 他画面からの記録を初期化する
				thisElem.beforePanel = null;
			}
		});
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
	
	/* 関数名:setHashChangeSyncTab
	 * 概要　:URLハッシュの切り替わりに合わせてタブを切り替えるイベントコールバックを設定する
	 * 引数　:String || Element selector : イベントコールバックの対象となる要素
	 * 返却値:なし
	 * 作成日　:2015.1031
	 * 作成者　:T.Masuda
	 */
	this.setHashChangeSyncTab = function(selector){
	
		//クリック判定
		var isClicked = false;
		//登録済みのhashchangeイベントの一覧を取得する
		var registerdHashchangeEvents = $._data($(window).get(0), this.keyEvents).hashchange;
		//イベントコールバック内で自身を利用するために変数に保存する
		var thisElem = this;
		
		//登録済みのhashchangeイベントを走査する
		for (key in registerdHashchangeEvents) {
			//登録済みのイベントであったら
			if(registerdHashchangeEvents[key].namespace == selector) {
				return false;	//新たにhashchangeイベントを登録せず処理を終了する
			}
		}
		
		$(document).on(CLICK, selector + this.tabIndexStrSelector, function(e){
			isClicked = true;
			$(e.currentTarget).attr(thisElem.attrHref);
			var clickedHref = commonFuncs.getLastValue($(e.currentTarget).attr(thisElem.attrHref), SLASH);
			location.hash = clickedHref.substring(0, clickedHref.indexOf(DOT));
		});
		
		//ハッシュ切り替えイベント発生時の処理
		$(window).bind(this.hashChangeTarget + selector, function(ev){
			
			if(isClicked) {
				isClicked = false;
				return false;
			}
						
			//ハッシュが変わっていれば
			if(location.hash) {
				//URLからハッシュを取り出し、変数に格納する。
				var hash = location.hash;

				//引数の要素が存在していれば
				if(commonFuncs.checkEmpty(selector) && $('> div > ' + hash, $(selector)).length > 0){
					var $tabParent = $(selector);
					//該当するタブを表示するを読み込む。
					$tabParent.easytabs('select', hash );
				//ハッシュに対応するタブがネストして存在すれば
				} else if ($(hash, selector).length > 0) {
					//親のタブのIDを取得する
					var parentTabPanelId = $(hash).parent().closest('.tabPanel').attr('id');
					var parentTabContainerId = $('#' + parentTabPanelId).closest('.tabContainer').attr('id');
					//親タブを開く
					$('#' + parentTabContainerId).easytabs('select', '#' + parentTabPanelId);
				}
			}
		});
	}
	
}

//baseWindowクラスを継承する
tabEx.prototype = new baseWindow();
//サブクラスのコンストラクタを有効にする
tabEx.prototype.constructor = baseWindow;
