/** ファイル名:windowEx.js
 * 概要　　　:ダイアログ内コンテンツ作成、要素操作のためのクラスのための基底クラスの定義ファイル
 * 設計者　:H.Kaneko
 * 作成日　:2015.0813
 * 作成者　:T.Masuda
 * 場所　　:dialog/js/windowEx.js
 */

/** クラス名:windowEx
 * 概要　:ウィンドウ(ページ)を示すクラス
 * 引数	:なし
 * 設計者:H.Kaneko
 * 作成日:2015.0813
 * 作成者:T.Masuda
 */
function windowEx(url, argumentObj, returnObj, state){

	//親クラスのコンストラクタを起動する
	baseWindow.call(this, url, argumentObj, returnObj, state);

	//画面遷移の状態。空であれば履歴を積む
	this.state = state;
	
	/* 関数名:run
	 * 概要　:ウィンドウを生成して表示する。
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0813
	 * 作成者　:T.Masuda
	 */
	this.run = function(){
		//ロード失敗時の例外処理を行うため、try-catch節を使う。
		try{
			var dirArray = this.url.split('/');	//URLをディレクトリ、ファイルに分解する
			//ウィンドウ名(windowフォルダ直下のディレクトリ名)を格納する変数を用意する
			var windowName;						
			//通常ページでなければ
			if(dirArray.length > 1){
				//ディレクトリ名を取得する
				windowName = dirArray[dirArray.length - 3];
			//通常ページであれば
			} else {
				//通常ページウィンドウとなる
				windowName = 'usuall';
			}
			
			//ウィンドウのDOMのURLを取得する
			var windowUrl = WINDOW_URLS[windowName];
	
			//argumentObj、returnObjが空であればデフォルトのものを使う
			this.setDefaultObjects();
			this.load(windowUrl);					//HTMLファイルをロードする
			
			//ウィンドウのDOMを追加する
			$(STR_BODY).append(this.dom);
			this.runInit();						//run後の初期化処理を行う
		//例外をキャッチしたら
		} catch(e){
			console.log(e.stack);	//投げられたエラーオブジェクトをコンソールログに出す。
		}
	}

	/* 関数名:runInit
	 * 概要　:run後の初期化処理
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:2015.0921
	 * 作成者　:T.Masuda
	 */
	this.runInit = function(){
		this.dom = $('.window:last')[0];	//クラスインスタンスにウィンドウのDOMへの参照を持たせる
		this.dom.instance = this;			//DOM側にもクラスインスタンスへの参照を持たせる
		this.bindAnchor();					//同ウィンドウ内のaタグのコールバックの対象を同ウィンドウ内のものにしぼる
		
		//ログインダイアログが出ていなければ
		if(!$('.inputArea').length || $('.inputArea.valid').length){
			this.callPage(this.url, this.state);	//URLを読み込む
		}
		this.setWindowZIndex();				//ウィンドウの重なりを整理する
	}
	
	
	
	/*
	 * 関数名:callPage(url, state)
	 * 引数  :String url, Object state
	 * 戻り値:なし
	 * 概要  :新たにページを読み込む。
	 * 作成日:2015.09.21
	 * 作成者:T.M
	 */
	this.callPage = function(url, state){
		//urlから#を抜き取り、有効なURLを形成する。
		url = url.replace(/#/g, '');

		var splited = url.split('/');	//URLを/区切りで配列にする。
		//通常ページに重なるページが読み込まれるなら(会員・管理者画面)
		if(splited.length > 2
				//既に該当するウィンドウがあるなら生成しない
				&& $('.window').filter('[name="'+ splited[splited.length - 3] +'"]').length == 0){
			//新たなウィンドウのクラスインスタンスを生成する
			var newWindow = new windowEx(url);
			newWindow.state = state;	//stateを渡す
			newWindow.run();			//新たなウィンドウを表示する
			return;
		//既に表示されているウィンドウのコンテンツが呼ばれるなら
		} else if((splited.length <= 2 && $('.window:last').attr('name') != 'usuall')
				|| (splited.length > 2 && $('.window:last').attr('name') != splited[splited.length - 3])) {
			//該当するウィンドウを取得する
			var movingWindow = splited.length <= 2? $('.window[name="usuall"]'):$('.window[name="' + splited[splited.length - 3] + '"]');
			//該当するウィンドウを最前面に持ってくる
			$('body').append(movingWindow);
			//最前面に持ってきたウィンドウで当関数を再度コールする
			$('.window:last')[0].instance.callPage(url, state);
			this.setWindowZIndex();				//ウィンドウの重なりを整理する
			return;	//このウィンドウの処理を終える
		}
		
		//cgiなら
		if(url.indexOf('.cgi') > -1){
			//フォーム用の処理を行う。
			postForm($('<form></form>').attr({action: url,method:'post',state:url}));
			return;	//処理を終える。
		}
		
		var self = this;	//コールバック内でクラスインスタンスを参照するために変数に保存しておく

		//Ajax通信を行う。
		$.ajax({
			//URLを指定する。
			url: url,
			//HTMLを返してもらう。
			dataType:'html',
			//同期通信を行う。
			async: false,
			//通信成功時の処理
			success:function(html){
				//既存のコンテンツを上書きする。
				self.overwrightContent($('.main', self.dom), html);
				//カレントのURLを更新する。
				currentLocation = url;

				//第二引数が入力されていなければ、また、pushStateに対応していれば
				//@mod 2015.0604 T.Masuda 1つ目の条件式のtrue条件に || state == null を追加しました
				//@mod 2015.0922 T.Masuda argumentObjの初回実行フラグの状態・存在を条件に追加しました。
				//@mod 2015.1103 T.Masuda 会員画面へ管理者画面からログインしている場合は履歴を積まないようにしました
				if(((state === void(0) || state == null) && commonFuncs.isSupportPushState())
						&& !commonFuncs.checkEmpty(commonFuncs.GetCookies().otherUserId)
						&& !commonFuncs.checkEmpty(self.argumentObj.config.firstExec)){
					//画面遷移の履歴を追加する。
					history.pushState({'url':'#' + currentLocation}, '', location.href);
				}
				
				// リロード時の画面が会員、管理者画面であるとそれぞれの画面が映る前に通常画面が一瞬映ってしまうため対処
				if ((!history.state && self.argumentObj.config.firstExec) || (history.state && !self.argumentObj.config.firstExec) || $('.window[name!="usuall"]').length) {
					commonFuncs.showCurrentWindow();	//最前部のウィンドウのみ表示する
				}
				
				self.argumentObj.config.firstExec = null;	//初回実行フラグをオフにする

				//スクロール位置をトップに戻す。
				window.scroll(0, 0);
			}
		});
	}
	
	/* 関数名:bindAnchor
	 * 概要　:aタグクリック時のイベントコールバックを自身のダイアログにバインドする
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:015.09.21
	 * 作成者　:T.Masuda
	 */
	this.bindAnchor = function(){
		//自身の配下のaタグクリックイベントコールバックを定義する

		// リンクをクリックした後のイベント。新規タブを開くリンクについては処理しない。
		$(this.dom).on('click', 'a[href$=".html"][target!="_blank"]:not([data-target^="#"])', function(event){
			//URLを引数にしてページを切り替える関数をコールする。
			$(this).closest('.window')[0].instance.callPage($(this).attr('href'));
			//pushState対応ブラウザであれば
			if(commonFuncs.isSupportPushState()){
				//通常の画面遷移をキャンセルする。		
				event.preventDefault();
			}
		});

		// リンクをクリックした後のイベント。新規タブを開くリンクについては処理しない。
		$(this.dom).on('click', 'a[href$=".php"][target!="_blank"]', function(event){
			//URLを引数にしてページを切り替える関数をコールする。
			$(this).closest('.window')[0].instance.callPage($(this).attr('href'));
			//pushState対応ブラウザであれば
			if(commonFuncs.isSupportPushState()){
				//通常の画面遷移をキャンセルする。		
				event.preventDefault();
			}
		});
	}

	/*
	 * 関数名:overwrightContent(target, data)
	 * 引数  :String target, Object state
	 * 戻り値:なし
	 * 概要  :既存のコンテンツを消して、新たなコンテンツを書き出す。
	 * 作成日:2015.03.09
	 * 作成者:T.M
	 * 変更日:2016.10.10
	 * 変更者:R.Shibata
	 * 内容  :対象のHTMLからlinkとscriptだけでなく、mainクラス以下の物を取得するように変更
	 */
	this.overwrightContent = function(target, data){
		var dat = $(data);
		//mainのタグを空にする。
		$(target).empty();
		//main以下のタグを全て収集する。
		var targettag = $(MAIN_TAG + SPACE + WILD_CARD, data);

		//取得したタグを展開する。
		targettag.each(function(){
			//mainのタグの中に取得したタグを展開する。JavaScriptのコードがあれば順次実行する。
			$(target).append($(this));
		});
	}
	
	
}

//baseWindowクラスを継承する
windowEx.prototype = new baseWindow();
//サブクラスのコンストラクタを有効にする
windowEx.prototype.constructor = baseWindow;
