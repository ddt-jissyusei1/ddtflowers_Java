/* 
 * ファイル名:createLittleContent.js
 * 概要  :小規模の処理の関数を定義する
 * 作成者:T.M
 * 作成日:2015.
 * 変更者:k.urabe
 * 変更日:2016.09.09
 * 内容:授業詳細ダイアログのオープン時にハイライト処理が失敗する障害に対応
 * パス :/js/createLittleContent.js
 */

/**
 * 小規模のパーツ、コンテンツを作るためのJSファイル。
 */

//ブラウザ判別のためのコード。
/*
 * if.useragent.js v0.1
 * info: http://company.miyanavi.net/archives/808
 * auther: miyanavi
 * licence: MIT
 *
 */
var uaName = 'unknown';
var userAgent = window.navigator.userAgent.toLowerCase();
var appVersion = window.navigator.appVersion.toLowerCase();
 
if (userAgent.indexOf('msie') != -1) {
  uaName = 'ie';
  if (appVersion.indexOf('msie 6.') != -1) {
    uaName = 'ie6';
  } else if (appVersion.indexOf('msie 7.') != -1) {
    uaName = 'ie7';
  } else if (appVersion.indexOf('msie 8.') != -1) {
    uaName = 'ie8';
  } else if (appVersion.indexOf('msie 9.') != -1) {
    uaName = 'ie9';
  } else if (appVersion.indexOf('msie 10.') != -1) {
    uaName = 'ie10';
  }
} else if (userAgent.indexOf('android') != -1) {
	uaName = 'android';
} else if (userAgent.indexOf('ipad') != -1) {
  uaName = 'ipad';
} else if (userAgent.indexOf('ipod') != -1) {
  uaName = 'ipod';
} else if (userAgent.indexOf('iphone') != -1) {
  uaName = 'iphone';
  var ios = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
//  uaName = [parseInt(ios[1], 10), parseInt(ios[2], 10), parseInt(ios[3] || 0, 10)];
} else if (userAgent.indexOf('mobile') != -1) {
	uaName = 'mobile';
} else if (userAgent.indexOf('chrome') != -1) {
	  uaName = 'chrome';
} else if (userAgent.indexOf('safari') != -1) {
  uaName = 'safari';
} else if (userAgent.indexOf('gecko') != -1) {
  uaName = 'gecko';
} else if (userAgent.indexOf('opera') != -1) {
  uaName = 'opera';
};
//以上、引用終了。

//ブログ削除クエリのキー
var QUERY_KEY_DELETE_MYBLOG = 'deleteMyBlog'


/* createLittleContentsクラス(仮) */
function createLittleContents(){
	createTag.call(this);	//スーパークラスのコンストラクタを呼ぶ

	//http://yoyogisan.hatenablog.com/entry/2014/08/24/191101 より引用。
	//使っているのがAndroidの標準ブラウザかの判定の関数です。
	this.isAndDefaultBrowser = function(){
	    var ua=window.navigator.userAgent.toLowerCase();
	    if(ua.indexOf('linux; u;')>0){
	        return true;
	    }else{
	        return false;
	    } 
	}
	
	/*
	 * 関数名:function isIE()
	 * 引数  :なし
	 * 戻り値:なし
	 * 概要  :ブラウザがIEかどうかを調べる。IEならUA文字列を返す。
	 * 作成日:2015.04.23
	 * 作成者:T.M
	 */
	this.isIE =function (){
		//IEであればIEのUA文字列を返し、そうでなければfalseを返す。
		return uaName.indexOf('ie') != -1? uaName: false;
	}
	
	//Optionタグを生成するための連想配列。createOptions関数で使う。
	this.options = {
					"publifications":{
						"0":{"text":"全体"},
						"1":{"text":"友達のみ"},
						"2":{"text":"非公開"}
					}
				};
	
	//alert(options);
	
	
	/*
	 * 関数名:toolTip
	 * 引数  :var targetElement
	 * 戻り値:なし
	 * 概要  :引数の要素に対してツールチップを表示する
	 * 作成日:2015.02.06
	 * 作成者:T.Y
	 * 変更日:2015.03.10
	 * 変更者:T.Masuda
	 * 内容 :,を余計に書いてあった部分とコメント抜けを修正しました。
	 */
	this.toolTip = function() {
	  $(function() {
	    // 要素を追加する処理
	    $('body').append('<div class="tip"></div>');
	
	    $('.tip')                         // 表示するツールチップに関するcssを有効にする
	      .css({                          // jqueryでcssを記述する宣言をする
	          border: '1px solid Black',  // 枠線を1pxで黒色、実線で描く
	          backgroundColor: '#ffc',    // 背景を黄色っぽくする
	          fontSize: 'smaller',        // ツールチップ内での文字のサイズは小さめにする
	          padding: '2px',             // 2px分要素全体の幅を広くとる
	          position: 'absolute',       // ポジションを絶対位置にする
	          display: 'none'             // 画面には表示しない
	
	      })
	    //ツールチップを表示する処理
	    $('.tiplink')
	      //マウスオーバしたときの処理
	      .mouseenter(function(e) {
	      //.tipがアニメーション中でない場合のみ処理をする
	        $('.tip:not(:animated)')
	        //data-tips属性から本体テキストを設定
	          .text($(this).data('tips'))
	        //マウスの座標に応じて表示位置を決定
	          .css({
	            top: e.pageY,	//現在マウスポインターがあるY座標
	            left: e.pageX,	//現在マウスポインターがあるX座標
	            zIndex: 2		//z-indexを指定して重なりを制御する。
	          })
	          .fadeIn(300);//300ミリ秒かけて表示する
	      })
	      //マウスオーバから離れたときの処理
	      .mouseleave(function(e) {
	      $('.tip')//tipの中身について
	        .fadeOut(500);//500ミリ秒かけて表示しなくなる
	      })
	
	  });  
	}
	
	/*
	 * 関数名:getContentName()
	 * 引数  :なし
	 * 戻り値:String
	 * 概要  :URLから現在のファイル名を取り出し返す。
	 * 作成日:2015.02.12
	 * 作成者:T.M
	 */
	this.getContentName = function (){
		// URLからファイル名を取得する。
		var contentName = location.href.substring(location.href.lastIndexOf("/")+1,location.href.length);
		// ファイル名から拡張子を取り除く。
		contentName = contentName.substring(0,contentName.indexOf('.'));
		// ファイル名に予約コンテンツであるということを示す文字列を追加する。
		contentName = contentName + 'Reserved';
		
		//contentNameを返す
		return contentName;
	}
	

	
	/*
	 * 関数名:useZoomImage(selector)
	 * 引数  :String selector
	 * 戻り値:なし
	 * 概要  :fancyboxによる画像の拡大表示を有効にする。
	 * 作成日:2015.03.20
	 * 作成者:T.M
	 */
	this.useZoomImage = function(selector){
		// フッター前のギャラリーをクリックしたらjQueryプラグイン「fancybox」により
		// 拡大表示を行うようにする。
		$('.' + selector + ' a').fancybox({
			'hideOnContentClick': true
		});
	}
	
	/*
	 * 関数名:function isTouchDevice()
	 * 引数  :String selector
	 * 戻り値:なし
	 * 概要  :スマホ・タブレットかPCかを判別する。
	 * 作成日:2015.04.17
	 * 作成者:T.M
	 */
	this.isTouchDevice = function(){
		var retBoo = false;	//返却する真理値を格納する変数を宣言、falseで初期化する。
		if ((navigator.userAgent.indexOf('iPhone') > 0 				//UAがIPhoneか
				|| navigator.userAgent.indexOf('iPad') > 0) 		//iPadか
				|| navigator.userAgent.indexOf('iPod') > 0 			//iPodか
				|| navigator.userAgent.indexOf('Android') > 0) {	//Androidであれば
			retBoo = true;	//trueを返すようにする。
		}
		
		return retBoo;	//結果を返す。
	}
	
	/*
	 * 関数名:createGallery(selector)
	 * 引数  :String selector
	 * 戻り値:なし
	 * 概要  :カルーセルのギャラリーを生成する。
	 * 作成日:2015.02.21
	 * 作成者:T.M
	 * 変更日:2015.03.09
	 * 変更者:T.M
	 * 内容　:setTimeoutを利用してAjax通信でのページ読み込みに対応しました。
	 */
	this.createGallery = function (selector){
		var thisElem = this;
		//タッチ端末かどうかを判定する。
		var touchDevice = this.isTouchDevice();
		//要素を取得して変数に格納する。
		$gallery = $('.'+selector);
		//一旦ギャラリーを隠す。
		$gallery.hide();
		//時間をおいて関数を実行する。
		window.setTimeout(function(){
			//ギャラリーを見える様にする。
			$gallery.show();
			
			//SmoothDivScrollの関数をコールしてギャラリーを作る。
			$gallery.smoothDivScroll({
				//スマホなら両端のHotSpotによるスクロールを無効にする。
				hotSpotScrolling: !touchDevice,
				//タッチでのスクロールを有効にする。
				touchScrolling: true,
				//手動の無限スクロールをオンにする。
				manualContinuousScrolling: true,
				//スマホならホットスポットの背景をを出さない、PCなら出す。
				visibleHotSpotBackgrounds:touchDevice? "":"always",
				//マウスホイールによるスクロールを無効にする。
				mousewheelScrolling: false
			});
			//fancyboxで画像を拡大できるようにする。
			thisElem.useZoomImage(selector);
		//1秒置いて実行する。
		}, 1000);
	}
	
	/*
	 * 関数名:createUnmovableGallery(selector)
	 * 引数  :String selector
	 * 戻り値:なし
	 * 概要  :不動のギャラリーを生成する。
	 * 作成日:2015.02.21
	 * 作成者:T.M
	 */
	this.createUnmovableGallery = function(selector){
	// jQueryプラグイン「Slick」によりカルーセルのギャラリーを作成する。
		$('.' + selector).slick({
	        //以下2ステップ、矢印を使わない設定。
			accessibility:false,
	        arrows:false,
	        // レスポンシブレイアウトに対応する。
	        responsive:true,
	        //可変幅にする。
			variableWidth:true,
	        // 用意されている画像の数だけ並べる。
	        slidesToShow:$('.' + selector + ' img').length
		});
		
	// フッター前のギャラリーをクリックしたらjQueryプラグイン「fancybox」により
	// 拡大表示を行うようにする。
		$('.' + selector + ' a').fancybox({
			'hideOnContentClick': true
		}); 
	}
	
	/*
	 * 関数名:this.setTabAjaxCompleteEvent = function()
	 * 引数  :なし
	 * 戻り値:なし
	 * 概要  :Ajax通信でタブの内容を呼び出したときのイベント。
	 * 作成日:2015.03.25
	 * 作成者:T.Masuda
	 */
	this.setTabAjaxCompleteEvent = function(){
		$(document).bind('easytabs:ajax:complete', function(event, $clicked, $targetPanel, response, status, xhr){
			//overwriteContent関数同様、scriptタグとlinkタグを取得する。
			var pagedrawer = $('script, link', response);
			//コードを順番に実行する。
			$.when(
					//読み込み先のタブパネル内に取得したタグを展開する。
					$($targetPanel).html(pagedrawer)
			).done(function(){
			});
		});
	}
	
	
	/*
	 * 関数名:unwrapTable
	 * 概要  :trタグの親となるtableタグを消す。createTagでtrタグを追加する場合に使用する。
	 * 引数  :String row:trタグのセレクタ文字列
	 * 戻り値:なし
	 * 作成日:2015.03.25
	 * 作成者:T.Masuda
	 */
	this.unwrapTable = function (row){
		//trタグの親、祖父であるtbody、tableタグを消す。
		$(row).unwrap().unwrap();
	}
	
	/*
	 * 関数名:injectionTableData
	 * 概要  :対象となるテーブルに配置された空のセルに連想配列の値を流し込む。
	 * 引数  :String target:処理対象となるテーブル。
	 * 		:Object map:流し込むデータを持つ連想配列。
	 * 戻り値:なし
	 * 作成日:2015.03.26
	 * 作成者:T.Masuda
	 */
	this.injectionTableData = function (target, map){
		//ループのカウンター変数を準備する。
		var counter = 0;
		//処理対象のテーブルのjQueryオブジェクトを取得する。
		var $table = $(target);
		
		//mapを走査する。
		for(key in map){
			//対応するセルにデータを流し込む。
			$('.' + key + ' td', $table).text(map[key]);
			//疑似フォームで値を受け取る準備がしてあれば、そちらにも値を流し込む。
			$('.imitateForm input:hidden').filter('[name="' + key + '"]').val(map[key]);
		}
	}
	
	
	/*
	 * 関数名:getDateTime()
	 * 概要  :日付を取得する。
	 * 引数  :なし
	 * 戻り値:string:日付の文字列。
	 * 作成日:2015.03.27
	 * 作成者:T.Masuda
	 */
	this.getDateTime = function (){
		var date = new Date()//日付取得のため、Dateクラスのインスタンスを生成する。
		//日付を取得して返す。
		return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
	}
	
	/*
	 * 関数名:deletePhoto()
	 * 概要  :チェックが入ったMyギャラリーの写真を削除する。
	 * 引数  :なし
	 * 戻り値:なし
	 * 作成日:2015.03.27
	 * 作成者:T.Masuda
	 * 変更日:2015.11.03
	 * 変更者:T.Masuda
	 * 内容　:機能していなかったので機能を作りました
	 * 変更日:2016.10.04
	 * 内容  :複数件数削除時に動作していなかったため、1件ずつ削除するように修正しました。
	 */
	this.deletePhoto = function(){
		//チェックボックスが入っている写真があれば
		if($('.myPhotoCheck:checked').length){
			// インスタンスを関数内で使用するため変数に参照を持たせる
			thisElem = this;
			//写真の削除件数を格納する変数を用意する
			var result = 0;
			//対象となる写真を走査する
			$('.myPhoto').has('.myPhotoCheck:checked').each(function(){
				//対象の写真を削除し、削除件数をカウントしていく
				result = result + thisElem.setDBdata(thisElem.json.deleteMyGalleryPhoto, { id : $(SEL_ID, this).text() }, EMPTY_STRING);
			});
			 //削除に成功していたら
			 if (result) {
				//その旨を伝える
				alert('選択した写真の削除に成功しました。');
				this.loadTableData('myGalleryTable', 1, 4, 1, MYGALLERY_SHOW_NUMBER, '.galleryArea', 'create_tag.createMyGalleryImages');
			 //削除に失敗していたら
			 } else {
				 //その旨を伝える
				 alert('削除に失敗しました。時間をおいてもう一度お試しください。');
			 }
		} else {
			//写真未選択の旨を伝える。
			alert('削除する写真を選んでください。');
		}
	}
	
	/*
	 * 関数名:createPhotoData(photo)
	 * 概要  :写真のデータの連想配列を作成する。
	 * 引数  :element photo:写真のタグ。
	 * 戻り値:Object:写真のデータ。
	 * 作成日:2015.03.27
	 * 作成者:T.Masuda
	 */
	this.createPhotoData = function(photo){
		var retMap = {};	//返す連想配列を用意する。
		//日付を格納する。
		retMap['date'] = $('.myPhotoDate', photo).text();
		//ユーザ名を格納する。
		retMap['user'] = $('.myPhotoUser', photo).text();
		retMap['user_key'] = this.getUserId();	//ユーザID
		//タイトルを格納する。
		retMap['title'] = $('.myPhotoTitle', photo).text();
		//コメントを格納する。
		retMap['content_text'] = $('.myPhotoComment', photo).text();
		//公開設定を格納する。
		retMap['publication'] = $('.myPhotoPublication', photo).attr('value');
		
		//作成した連想配列を返す。
		return retMap;
	}
	
	/*
	 * 関数名:function createOptions(key)
	 * 概要  :連想配列からoption要素を作成する。
	 * 引数  :String key:連想配列のキー。
	 * 戻り値:Element:作成したoption要素
	 * 作成日:2015.04.09
	 * 作成者:T.Masuda
	 */
	this.createOptions = function(key){
		//キーに応じた連想配列を取得する。
		var map = options[key];
		var retElem = document.createElement('div');	//返却する値を格納する変数を宣言する。外枠となるdivタグを生成しておく。
		//連想配列を走査する。
		for(key in map){
			//optionタグを生成して変数に格納する。keyをoptionの値とする。
			var option = $('<option></option>').attr('value', key);
			//更に連想配列を進んでいく。
			for(childKey in map[key]){
				//キーがテキストなら
				if(childKey == 'text'){
					//optionにテキストを追加する。
					option.text(map[key][childKey]);
				//属性なら
				}else{
					//optionタグにキーと値を設定していく。
					option.attr(childKey, map[key][childKey]);
				}
			//生成したoptionタグをretElemに追加していく。
			$(retElem).append(option);
			}
		}	
		
		return $('option', retElem);	//生成した要素を返す。
	}
		
	
	/*
	 * 関数名:startEditText(textElem)
	 * 概要  :テキストを編集するモードに移行する。
	 * 引数  :elemental textElem:対象となる要素。
	 * 戻り値:なし
	 * 作成日:2015.03.27
	 * 作成者:T.Masuda
	 */
	this.startEditText = function(textElem){
		var currentText = $(textElem).text()		//テキストの値を取得する。
		var className = $(textElem).attr('class');	//クラス名を取得する。
		
		//classNameがコメントのクラスであれば
		if(className == 'myPhotoComment'){
			//編集用のテキストエリアを配置する。
			$(textElem).after($('<textarea>')
					.addClass(className + 'Edit')	//編集テキストエリア用のクラスをセットする。
					.val(currentText)				//テキストを引き継ぐ。
				);
		//公開設定であれば
		} else if(className == 'myPhotoPublication'){
			//編集用のテキストエリアを配置する。
			$(textElem).after($('<select></select>')
					.addClass(className + 'Edit')				//編集テキストエリア用のクラスをセットする。
					.val($(textElem).attr('value'))							//テキストを引き継ぐ。
					.append(createOptions('publifications'))	//optionタグをセットする。
					.focus());
			//選択済みにする。
	//		$('.' + className + 'Edit').val($(textElem).attr('value'));
		}else {
			//編集用のテキストエリアを配置する。
			$(textElem).after($('<input>')
					.addClass(className + 'Edit')	//編集テキストエリア用のクラスをセットする。
					.val(currentText)				//テキストを引き継ぐ。
					.attr('type', 'text')			//テキストボックスのtypeをセットする。	
			);
		}
	
		//Androidの標準ブラウザでなければ　※Androidの標準ブラウザはfocus()を使わずともセレクトメニューにフォーカスするので
		if(!this.isAndDefaultBrowser() && !$('.' + className + 'Edit')[0].tagName != 'SELECT'){
			var self = this;	//自身の要素を取得する
			//追加した要素にフォーカスする。
			$('.' + className + 'Edit').focus();
			//編集終了のイベントを登録する。
			$('.myPhotoTitleEdit,.myPhotoCommentEdit,.myPhotoPublicationEdit').on('blur', function(){
				//自身を持つ写真要素のセレクタを取得する。
				var myphoto = $('.myPhoto').has(this);
				//編集モードを解除する。
				self.endEditText(this);
			});
		} else {
			$('.memberMyGallery').on('click.editSelect', function(){
				//自身を持つ写真要素のセレクタを取得する。
				var myphoto = $('.myPhoto').has('.myPhotoPublicationEdit').eq(0);
				//編集終了の関数をコールする。
				this.endEditText($('.myPhotoPublicationEdit').eq(0));
				//$('body').off('click.editSelect');
			});
		}
		
		//イベント発火元の要素を非表示にする。
		$(textElem).css('display', 'none');
	};
	
	/*
	 * 関数名:endEditText
	 * 概要  :テキストの編集モードを終了する。
	 * 引数  :jQuery $this
	 * 戻り値:なし
	 * 作成日:2015.03.27
	 * 作成者:T.Masuda
	 */
	this.endEditText = function(textElem){
		var $this = $(textElem);	//引数の要素のjQueryオブジェクトを取得する。
		//編集後のテキストボックスを取得する。
		var currentText = $this.val();
		//編集モードになる前のクラス名を取得する。
		var pastClass = $this.attr('class').replace('Edit', '');
		var pastElem = $($this).siblings(DOT + pastClass);
		//セレクトメニューであれば
		if($this[0].tagName == 'SELECT'){
			//更新を反映する
			pastElem.attr('value', currentText).text($('option[value="' + currentText + '"]', $this).text());
		//それ以外であれば
		} else {
			//編集した内容が空でなければ
			if($($this).val() != EMPTY_STRING){
				pastElem.text($($this).val());	//内容を更新する
			//そうでなければ
			} else {
				//空入力はできないことを伝える
				alert('内容を入力してください。');
				//その後内容を更新せず終える
			}
		}
		
		//隠していた元々の要素を表示する
		pastElem.css('display', 'inline-block');
		//用済みになった編集要素を消す。
		$this.remove();
	}
	
	/*
	 * 関数名:popupComment
	 * 概要  :指定した要素をクリックまたはタップするとテキストがポップアップで表示されるようにする。
	 * 引数  :string selector:ポップアップさせる要素。
	 * 戻り値:なし
	 * 作成日:2015.03.27
	 * 作成者:T.Masuda
	 */
	this.popupComment = function(selector){
		//指定した要素をクリックまたはダブルクリックしたらテキストがポップアップ表示される様にする。
		$(selector, document).smallipop({triggerOnClick:true});
	}
	
	/*
	 * 関数名:beforeConfirmButtonPush
	 * 概要  :関数をコールする前に確認のダイアログを出す。
	 * 引数  :funciton func:対象の関数
	 * 		:string message:ダイアログに出すメッセージ。
	 * 		:?		arg:引数。特に型を指定しない。
	 * 戻り値:なし
	 * 作成日:2015.03.27
	 * 作成者:T.Masuda
	 */
	this.beforeConfirmButtonPush = function (func, message, arg){
		//確認ダイアログを出し、OKかキャンセルかを選択してもらう。
		ret = confirm(message);
		
		//OKが押されたら
		if(ret){
			//引数の関数をコールする。
			func(arg);
		}
	}
	
	/*
	 * イベント名:$(document).on('dblclick', '.myPhotoTitle,.myPhotoComment,.myPhotoPublication')
	 * 引数  　 	:string 'dblclick':ダブルクリックイベントの文字列
	 * 			:string '.myPhotoTitle,.myPhotoComment,.myPhotoPublication':写真のタイトル、コメント、公開設定のセレクタ。
	 * 戻り値　 :なし
	 * 概要  　 :Myギャラリーの写真のタイトル、コメント、公開設定をダブルクリックしたときのイベント。
	 * 作成日　　:2015.03.27
	 * 作成者　　:T.Masuda
	 */
	this.setDoubleClickMyPhotoEdit = function(){
		$ownerClass = this;	//自分自身のクラスインスタンスを変数に保存する
		$('.galleryArea').on('doubletap','.myGalleryTable .myPhotoTitle, .myGalleryTable .myPhotoComment, .myGalleryTable .myPhotoPublication',function(event){
			//タイトルを編集モードにする。
			$ownerClass.startEditText(this);
		});
	}
	
	/*
	 * 関数名:function bindClickTarget
	 * 引数 	:String selector:イベントをバインドする対象のセレクタ
	 * 戻り値:なし
	 * 概要  :第一引数で指定した要素をクリックすると第二引数で指定した要素がクリックされたことになる
	 * 作成日:2015.04.23
	 * 作成者:T.Masuda
	 */
	this.bindClickTarget = function(selector, target){
		$(selector).on('click', function(){	//クリックイベントを登録する。
			var $target = $(target);	//ターゲットのjQueryオブジェクトを取得する。
			//ターゲットをクリックする。
			$target.trigger('click');
		});
	}
	
	
	/** 画像縮小アップロードの流れ
	*	1. input type="file"を用意します。
	*	2. 1の要素にchangeイベントを登録します。
	*	3. 2のコールバック関数で1の要素から取得したFileオブジェクトをcanvasResizeにかけます。これで画像が縮小されます。
	*	4. canvasResizeはコールバック関数の引数にbase64形式の画像パスを渡します。これをBLOBデータに変換します。
	*	   一発でBLOBデータに変換する関数はないようなので、自分で実装します。
	*	5. フォームデータを作ります。(new FormData())。サーバへ送信するデータをappend関数で登録します。
	*	   append関数の引数は 1 キー 2 値 です。BLOBデータのみ3にファイル名の文字列を渡せます。
	*	6. Ajax関数で画像保存用PHPにフォームデータを送信します。その後はそのままPHP側で保存します。
	*/
	/*
	 * 関数名:function setMyGalleryChangeEvent
	 * 引数 	:String selector:イベントをバインドする対象のセレクタ
	 * 戻り値:なし
	 * 概要  :Myギャラリーの新規作成イベントの関数
	 * 作成日:2015.04.23
	 * 作成者:T.Masuda
	 * 変更日:2016.10.13
	 * 変更者:R.Shibata
	 * 内容  :連続して同じファイルを選択した場合、changeイベントが発生しない問題に対応(チェック成功時に処理を実行し、チェックの結果に関わらずアップロードの値を初期化するよう変更)
	 */
	this.setMyGalleryChangeEvent = function (selector, imgWidth, imgHeight){
		var thisElem = this;
		$(selector).on('change', function(event){
			
			//選択したファイルをチェックする。
			if(commonFuncs.checkImageFile($(this).val(), INVALID_IMAGE_FILE_WARNING)){
				var $uploader = $(this);		//画像アップローダーの要素を取得する
	    		canvasResize(this.files[0], {	//画像の縮小を行う
	    			//横サイズを設定
	    			width:imgWidth !== void(0)? imgWidth: DEFAULT_WIDTH,
	    			//縦サイズを設定
	    			height:imgHeight !== void(0)? imgHeight: DEFAULT_HEIGHT,
	    			crop: false,	//画像を切り取るかを選択する
	    			quality: IMG_QUALITY,	//画像の品質
	    			//コールバック関数。画像パスを引数として受け取る。
	    			callback: function(data) {
	    				thisElem.uploadUserPhoto(data);	//画像をアップロードする
	    				//テーブルをクリアする
	    				$('.myGalleryTable').empty();
	    				//ギャラリーのデータをリロードする
						thisElem.loadTableData('myGalleryTable', 1, 4, 1, MY_GALLERY_SHOW_PHOTO_NUM, '.galleryArea', 'create_tag.createMyGalleryImages');
	    			}
	    		});
			}
			//アップロードボタンの値を初期化する。cloneで置き換えるため、引数をtrueとし、イベントもコピーする
			$(selector).replaceWith($(selector).clone(true)); // 2016.10.13 r.shibata 追加
		});
	}
	
	/*
	 * 関数名:uploadUserPhoto
	 * 引数 	:String data:base64形式の画像パス
	 * 戻り値:なし
	 * 概要  :Myギャラリーの新規投稿画像をアップロードし、ギャラリー領域に表示する
	 * 作成日:2015.08.12
	 * 作成者:T.Masuda
	 */
	this.uploadUserPhoto = function(data){
		var thisElem = this;						//クラスインスタンスを変数に入れる
		//PHPへはフォームデータを作って送信する
		var fd = new FormData();					//フォームデータを作る
		fd.append('photo', toBlob(data), 'userPhoto');	//フォームデータにBLOB化した写真を登録する
		fd.append('postedName', 'photo');			//フォームデータに投稿名を登録する
		fd.append('userId', this.getUserId());		//フォームデータにユーザIDを登録する
		
        $.ajax({	//Ajax通信でサーバにデータを送る
            url: USER_IMAGE_UPLOADER,	//画像アップローダーのURLを指定する	
            type: 'post',				//HTTP通信のPOSTメソッドを使う
            async:false,				//同期通信
            data: fd,					//フォームデータを送信する
            dataType: 'xml',			//XMLデータを返してもらう
            //以下2点、よくわかっていません
            contentType: false,
            processData: false,
            //通信成功時の処理
            success: function(xml){
            	thisElem.saveImgIntoDB(xml);	//アップロードした画像を保存する
            	//thisElem.setNewPhoto($(xml).find('src').text());	//アップロードした画像を基に新たな記事を作る
            },
            //通信失敗時の処理
            error: function(xhr, status, error){
            	
            }
        });
	}


	/*
	 * 関数名:saveImgIntoDB
	 * 引数 	:XMLElement xml:画像のデータ一式が入ったxml
	 * 戻り値:なし
	 * 概要  :保存した画像をDBにも保存する
	 * 作成日:2015.08.12
	 * 作成者:T.Masuda
	 */
	this.saveImgIntoDB = function(xml){
		//アップロード画像の情報をDBに入れて送るための連想配列を作る
		var sendReplaceArray = {};
		//DBに画像タイトルを追加するためにアップロードされた画像のタイトルを取得する
		sendReplaceArray['photo_title'] = $('filename', xml).text();
		//会員番号を更新情報のクエリに入れる
		sendReplaceArray['user_key'] = this.getUserId();
		//画像情報をDBに新規登録する
		this.setDBdata(this.json.insertMyGalleryPhoto, sendReplaceArray, EMPTY_STRING);
	}

	/*
	 * 関数名:function uploadImage(uploader, parent, srcReturn)
	 * 引数  :element uploader:input type="file"の要素
	 * 		:element parent: 画像パスの追加を行う要素の親要素。
	 * 　　　:String srcReturn:取得した画像パスを追加する要素のセレクタ。
	 * 戻り値:なし
	 * 概要  :画像をアップロードし、指定した要素に画像パスを追加する。
	 * 作成日:2015.04.14
	 * 作成者:T.Masuda
	 */
	//アップロードボタンの値が変わったときのイベント(=アップロードを行った後のイベント)
	this.uploadImage = function(uploader, parent, srcReturn){
		$uploader = $(uploader);	//アップローダーの要素をjQueryオブジェクトにして変数に格納する。
		//保存先を指定して画像のアップロードを行う。
		
		var thisElem = this;						//クラスインスタンスを変数に入れる
		//クラスインスタンスが取得できていなければグローバル領域から取得する
		thisElem = thisElem instanceof createTag ? thisElem : create_tag;
			
				//IE6~9でなければ
	    		if(!(uaName == 'ie6' || uaName == 'ie7' || uaName == 'ie8' || uaName == 'ie9')){
		    		//ファイルのオブジェクトをを取得する。
		    		var file = uploader.files[0];
		    		
		    		//画像の縮小を行う。
		    		canvasResize(file, {
		    			crop: false,	//画像を切り取るかを選択する
		    			quality: 80,	//画像の品質
		    			//コールバック関数。画像パスを引数として受け取る。
		    			callback: function(data) {
		    				filetmp = data;				//filetmpにdataを一時保存する。

				    		//PHPへはフォームデータを作って送信する
				    		var fd = new FormData();					//フォームデータを作る
				    		fd.append('photo', toBlob(data), 'userPhoto');	//フォームデータにBLOB化した写真を登録する
				    		fd.append('postedName', 'photo');			//フォームデータに投稿名を登録する
				    		fd.append('userId', thisElem.getUserId());		//フォームデータにユーザIDを登録する
				    		
				            $.ajax({	//Ajax通信でサーバにデータを送る
				                url: USER_IMAGE_UPLOADER,	//画像アップローダーのURLを指定する	
				                type: 'post',				//HTTP通信のPOSTメソッドを使う
				                async:false,				//同期通信
				                data: fd,					//フォームデータを送信する
				                dataType: 'xml',			//XMLデータを返してもらう
				                //以下2点、よくわかっていません
				                contentType: false,
				                processData: false,
				                //通信成功時の処理
				                success: function(xml){
				    				$(srcReturn, parent).each(function(){			//画像パスを返す要素を操作する。
				    					//画像タグであれば
				    					if($(this)[0].tagName == 'IMG'){
				    						$(this).attr('src', $(xml).find('src').text());	//ソースパスを設定する。
				    					//特別処理の指定がないタグなら
				    					} else {
				    						$(this).val($(xml).find('filename').text());	//画像パスをvalue属性にセットする。
				    					}
				    				});
				                },
				                //通信失敗時の処理
				                error: function(xhr, status, error){
				                	
				                }
				            });
		    			}
		    		},'xml');
		    	//IE6~9なら
	    		}else{
		    		//サムネイルが出ないことを伝える。
		    		alert('サーバへの画像の保存の処理ができるまでIE6~9はサムネイルを使えません。');
					var src = "photo/general/web/DSC_0064.jpg";	//画像の保存先を取得する。
					$(srcReturn, parent).each(function(){			//画像パスを返す要素を操作する。
						//画像タグであれば
						if($(this)[0].tagName == 'IMG'){
							$(this).attr('src', src);	//ソースパスを設定する。
							//特別処理の指定がないタグなら
						} else {
							$(this).val(src);	//画像パスをvalue属性にセットする。
						}
					});
	    		}
	}
	
	/*
	 * 関数名:function replaceClone(elem)
	 * 引数  :element elem:処理対象の要素。
	 * 戻り値:なし
	 * 概要  :指定した要素を配置し直す。IOS Safariで画像パスを削除した画像タグの画像が空にならないバグへの対処により作成。
	 * 作成日:2015.04.22
	 * 作成者:T.Masuda
	 */
	this.replaceClone = function (elem){
		var $target = $(elem);				//処理対象の要素のjQueryオブジェクトを作る。
		var $clone = $(elem).clone(false);	//クローンを作る。
		$(elem).after($clone);				//クローンを処理対象の要素の後ろに配置する。
		$(elem).remove();					//処理対象の要素を消し、置き換えを終える。
	}
	
	/*
	 * 関数名:function deleteSiblingSrc
	 * 引数  :element button:画像削除のイベントをバインドした要素。
	 * 　　　:String targets:画像パスを削除する対象の要素のセレクタ。
	 * 戻り値:なし
	 * 概要  :削除ボタンの指定した兄弟要素の画像パスを削除する。
	 * 作成日:2015.04.14
	 * 作成者:T.Masuda
	 */
	this.deleteSiblingSrc = function(button, targets){
		var $this = this;
		var $siblings = $(button).siblings(targets);	//指定した兄弟要素を取得する。
		$($siblings).each(function(){					//画像パスを削除する要素を走査する。
			//画像タグであれば
			if($(this)[0].tagName == 'IMG' || $(this).filter('[src]').length){
				$(this).attr('src', "");	//ソースパスを空にする。
				//IOSのデバイスなら、DOMそのものを生成し直して画像を空にする。
				if(uaName == 'iphone' ||uaName == 'ipad' ||uaName == 'ipad'){
					$this.replaceClone(this);	//タグを置き換える。
				}
			//特別処理の指定がないタグなら
			} else {
				$(this).val("");	//value属性を空にする。
			}
		});
	}
	
	
	
	/*
	 * 関数名:function deleteNumberKey
	 * 引数  :map map: 処理対象とする連想配列。
	 * 戻り値:なし
	 * 概要  :数字のキーを消す。
	 * 作成日:2015.04.16
	 * 作成者:T.Masuda
	 */
	this.deleteNumberKey = function(map){
		//キーが数字かどうかのチェックを行いながら走査する。
		for(key in map){
			//キーが数字であれば
			if(!(isNaN(key))){
				delete map[key];	//キーを削除する。
			}
		}
	}
	
	/*
	 * 関数名:saveOptionSetting()
	 * 概要  :オプションの設定を保存する。
	 * 引数  :なし
	 * 戻り値:なし
	 * 作成日:2015.04.19
	 * 作成者:T.Masuda
	 */
	this.saveOptionSetting = function(){
		//設定のデータを連想配列にして返してもらう。
		var settingData = JSON.stringify(createOptionData());
		
		//Ajax通信でサーバに写真のデータを送信する。
		$.ajax({
			url:init['postJSON'],	//初期化データの連想配列にあるURLに送信する
			method:"POST",			//POSTメソッドで送信量を気にせず送信できるようにする。
			dataType:'text',		//JSONで返してもらう。	//サーバ側の処理を実装するまでダミーの処理を使う。
			//dataType:'json',		//JSONで返してもらう。
			data:{json:settingData, contentNum:"2"},	//作成した設定を送信する。
			//通信が成功したら
			success:function(json){
				var success = 1;	//成功したかどうかのデータを取得する。//ダミーの処理を用意する。
				//var success = parseInt(json['issuccess']);	//成功したかどうかのデータを取得する。返ってきた数値で判定する。
				var message = "更新に失敗しました。時間をおいてお試しください。";	//メッセージを格納する変数を宣言する。
				//取得したデータが成功のものなら
				if(success){
					message = "更新が完了しました。";	//成功メッセージを用意する。
				}
	
				alert(message);	//結果をダイアログで表示する。
			},
			//通信が失敗したら
			error:function(){
				//保存失敗の旨を伝える。
				alert('通信に失敗しました。時間をおいてお試しください。');
			}
		});
	}
	
	/*
	 * 関数名:createOptionData()
	 * 概要  :オプションページの設定の送信データを作成する。
	 * 引数  :なし
	 * 戻り値:Object : 設定データの連想配列。
	 * 作成日:2015.04.03
	 * 作成者:T.Masuda
	 */
	this.createOptionData = function (){
		//フォームデータを作る。
		var retMap = commonFuncs.createFormData($('.optionForm'));
		//ユーザIDを格納する。
		retMap['userId'] = this.getUserId();
	
		return retMap;	//作成したデータを返す。
	}
	
	/*
	 * 関数名 :loadValue(settings)
	 * 引数  　:map settings:個人設定情報の連想配列。
	 * 戻り値　:なし
	 * 概要  　:Myオプションページの個人設定をロードする。
	 * 作成日　:2015.04.18
	 * 作成者　:T.Masuda
	 */
	this.loadValue = function (settings){
		//settingsを走査する
		for(key in settings){
			//キーからname属性で対象の要素を取得する。
			var $elem = $('[name="' + key + '"]');
			//elemのタイプを取得する。
			var type = $elem.attr('type');
			//値を取得する。
			var value = settings[key]['value'];
			
			//ラジオボタンであれば
			if(type == "radio"){
				//値に該当する要素をチェックする。
				$elem.filter('[value="' + settings[key]['value'] + '"]').prop('checked', true);
			//チェックボックスであれば
			} else if(type == "checkbox"){
				//チェックが入っているチェックボックスの値の配列の長さを取得する。
				var valueLength = value.length;
				
				//チェックボックスの配列を走査する。
				for(var i = 0; i < valueLength; i++){
					//チェックが入っていることになる要素であれば
					$elem.filter('[value="' + value[i] + '"]').prop('checked', true);
				}
			//それ以外であれば
			} else {
				//普通に値をセットする。
				$elem.val(value);
			}
		}
	}
	
	/*
	 * 関数名 :function useFileReader(selector)
	 * 引数  　:String selector:input type="file"のセレクタ
	 * 戻り値　:なし
	 * 概要  　:IE9以下でFile APIに対応する。
	 * 作成日　:2015.04.23
	 * 作成者　:T.Masuda
	 */
	function useFileReader(selector){
		$(selector).fileReader({		//fileReader.jsの関数をコールする
			id: 'fileReaderSWFObject',	//fileReaderSWFObjectのIDを指定する
			//filereader.swf へのパス
			filereader: 'js/source/filereader.swf',
			//expressInstall.swf へのパス
			expressInstall: 'js/source/expressInstall.swf',
			debugMode: true			//デバッグモードをオンにする。
		});
	}
	
	/*
	 * 関数名 :createNewArticleList
	 * 引数  　:int number: 作成する記事一覧の項目数
	 * 戻り値　:なし
	 * 概要  　:最新記事の一覧を作る
	 * 作成日　:2015.05.27
	 * 作成者　:T.Masuda
	 * 修正日　:2015.08.08
	 * 修正者　:T.Masuda
	 * 内容  　:現行のクラスの仕様に対応しました。
	 */
	this.createNewArticleList = function(){
		//無名コールバック関数でこの時点のthisを使うための準備としてthisを変数に格納する
		var thisElem = this;
		
		//各項目を走査する
		$(CURRENT_ARTICLE_LIST_CONTENTS).each(function(i){
			var $elem = $(FIRST_ANCHOR_TAG, this);	//リンク部分を取得する
			//クリックしたらブログの記事を作るコードを追加する
			$elem.attr(ONCLICK_EVENT, 
					CURRENT_ARTICLE_CODE_FRONT + i + CURRENT_ARTICLE_CODE_REAR);
				
			var $elems = $(WILD_CARD ,$elem);	//項目を取得する
			//ブログ記事のオブジェクトを取得する
			var articleNode = thisElem.json[BLOG_TABLE_KEY][TABLE_DATA_KEY][String(i)];
			//オブジェクトが取得できていなければ
			if(articleNode === void(0)){
				return;	//関数を終える
			}
			//記事一覧にテキストを入れる
			thisElem.insertBlogArticleListText($elems, articleNode);
		});
	}
	
	/*
	 * 関数名 :createOneTableArticle
	 * 引数  　:int number:記事の番号(テーブルデータの配列のインデックス)
	 * 　　　　:String tableName:テーブル名
	 * 　　　　:Object settingONT:outputNumberingTagの設定オブジェクト
	 * 戻り値　:なし
	 * 概要  　:outputNumberingTagで記事を1つだけ指定して表示する
	 * 作成日　:2015.12.26
	 * 作成者　:T.Masuda
	 */
	this.createOneTableArticle = function (number, tableName, settingONT) {
		//日付による記事絞り込みを解除する
		this.dateText = null;
		//テーブルのデータを丸まる一時保存する
		var tableDataClone = this.json[tableName][TABLE_DATA_KEY];
		//記事1個分のデータだけテーブルデータにセットする
		this.json[tableName][TABLE_DATA_KEY] = [tableDataClone[number]];
		//outputNumberingTagをコールして記事を表示する
		this.outputNumberingTag(tableName, settingONT.startPage,settingONT.displayPageMax, SHOW_ONLY_ONE_ARTICLE_NUM, settingONT.pageNum, settingONT.targetArea, settingONT.callBack, settingONT.createTagSelector);
		//一時保存したテーブルデータを基に戻す
		this.json[tableName][TABLE_DATA_KEY] = tableDataClone;
	}
	
	/*
	 * 関数名 :insertBlogArticleListText
	 * 引数  　:element elem:記事リストの項目を構成する要素
	 * 　　　　:Object articleNode:記事のノード
	 * 戻り値　:なし
	 * 概要  　:ブログの最新記事の一覧のテキストを入れる
	 * 作成日　:2015.05.27
	 * 作成者　:T.Masuda
	 */
	this.insertBlogArticleListText = function(elems, articleNode){
		var elemsLength = elems.length; //項目数を取得する
		//ループで値を入れていく
		for(var j = 0; j < elemsLength; j++){
			//タグ名を取得する
			var tagName = elems[j].tagName;
			//タグ名でデータを取得するJSONノードを決める
			//タイトル
			if(tagName == PARAGRAPH_TAG){
				//値を入れる
				elems.eq(j).text(articleNode.title);
				//日時
			} else if(tagName == TIME_TAG){
				//値を入れる
				elems.eq(j).text(articleNode.date);
				//投稿者
			} else if(tagName == SMALL_TAG){
				//値を入れる
				elems.eq(j).text(articleNode.userName);
			}
		}
	}
	
	/*
	 * 関数名 :insertArticleListText
	 * 引数  　:element elems:記事リストのDOM
	 * 　　　　:element articleNodes:最新記事のタイトル、日付、ユーザー名の連想配列を格納した配列
	 * 戻り値　:なし
	 * 概要  　:最新記事の一覧のテキストを入れる
	 * 作成日　:2015.06.04
	 * 作成者　:T.Masuda
	 */
	this.insertArticleListText = function(elems, articleNodes){
		var articleLength = articleNodes.length; //項目数を取得する
		//ループで値を入れていく。記事データか記事一覧のDOMがなくなったら終了する
		for(var i = 0; i < articleLength && elems[i] != void(0); i++){
			for(key in articleNodes[i]){
				//タイトルを作成する
				$('p',elems[i]).text(articleNodes[i].title);
				//日付を作成する
				$('time',elems[i]).text(articleNodes[i].date);
				//ユーザ名を作成する
				$('small',elems[i]).text(articleNodes[i].user);
			}
		}
	}
	
	/* 
	 * 関数名:setSelectboxText
	 * 引数  :rowData:テーブルの連想配列、DBから取り出した値を使う(値の取得元)
	 		 selectboxArray:セレクトボックスの配列構造になっているjsonkey名(値の挿入先)
	 		 selectboxTextTarget:抜き出す対象となるテーブルのkey名(値の取得key名)
	 * 戻り値:なし
	 * 概要  :selectタグのoptionタグに入るテキスト要素をoutput前にDBから取り出した値を連想配列に入れて実装する
	 * 作成日 :2015.07.14
	 * 作成者:T.Yamamoto
	　*/
	this.setSelectboxText = function(rowData, selectboxArray, selectboxTextTarget) {
		//テーブルに値がないときはなにもしないようにする
		if(rowData[0]) {
			//ループで行の番号をとるようにするためにカウンターを初期値0で作る
			var counter = 0;
			//テーブルの行の回数だけループし、テーマを取り出す
			$.each(rowData, function(){
				//取り出したテーマを変数に入れ、セレクトボックスに入れるかどうか判定に使う
				var selectboxText = rowData[counter][selectboxTextTarget];
				//セレクトボックスにテーマを全て抜き出すために同じ値はテーマに追加しないようにする
				if(selectboxArray.indexOf(selectboxText) == -1) {
					//jsonの連想配列にテーマのを追加する
					selectboxArray.push(selectboxText);
				}
				//カウンター変数をインクリメントする
				counter++;
			});
		}
	}
	
	/* 
	 * 関数名:setSelectboxValueWithName
	 * 引数  :selector セレクトボックスのセレクター
	 * 戻り値:なし
	 * 概要  :optionタグのvalue属性に表示されている文字列と同じ値を入れる
	 * 作成日 :2015.11.08
	 * 作成者:T.Masuda
	　*/
	this.setSelectboxValueWithName = function(selector) {
		// optionタグをループで全て操作する
		$(selector + ' option').each(function(i){
			// optionタグの文字列を変数に入れる
			var selectValue = $(this).text();
			// 取得した文字列をvalue属性に入れる
			$(this).val(selectValue);
		});
	}
	
	/* 
	 * 関数名:setSelectboxValue
	 * 引数  :selector セレクトボックスのセレクター
	 * 戻り値:なし
	 * 概要  :optionタグのvalue属性に値を入れる
	 * 作成日 :2015.06.24
	 * 作成者:T.Yamamoto
	 * 変更日 :2015.11.08
	 * 変更者:T.Masuda
	 * 内容　:古い内容をsetSelectboxValueWithNameに移し、処理を一新しました
	　*/
	this.setSelectboxValue = function(selector, key, columnName, items) {
		//option追加前にセレクトメニューを空にしておく
		$(selector).empty();
		
		//データ取得元の連想配列を走査する
		for(key in items) { 
			$(selector).append($('<option></option>').addClass('contentOption').val(items[key].commodity_key).text(items[key].commodity_name));
			//optionタグにテキストに応じたIDをセットする
			//$('option', $(selector)).filter(function(index){return $(this).text() == items[key].commodity_name;}).val(items[key].id);
		}
	}
	
	/*
	 * 関数名:saveCustomizeTabJsonFile
	 * 引数  :createTag create_tag:createTagクラスのインスタンス
	 * 戻り値:なし
	 * 概要  :フラワースクール管理画面カスタマイズタブの保存を押したときのイベントを登録する
	 * 作成日:2015.06.27
	 * 作成者:T.Masuda
	 */
	this.saveCustomizeTabJsonFile = function(create_tag){
		var $create_tag = $(create_tag);	//createTagのインスタンスをjQueryオブジェクトに入れる
		//管理画面カスタマイズタブの保存ボタンを押したときのイベントを登録する
		$(document).on('click', '#customize .saveButton', function(){
			//更新ボタンのtarget属性に仕込まれた更新対象のJSONのトップノード名を取得する。
			var topNodeName = $(this).attr('target'); 
			//トップノード名からDOMのトップのIDを指定し、JSONを更新する。
			//thisの中身がボタンなので、ownに保存したクラスのインスタンスで関数を呼び出す。
			$updateElementJson($json[topNodeName], $('#'+topNodeName));
			//JSONを保存用に文字列に変換する。
			var jsonString = JSON.stringify($json[topNodeName]);
			
			//Ajax通信でJSONをファイルに保存する。
			$.ajax({
				url:'savetextfile.php',	//保存するプログラムのパスを指定する。
				method:'POST',			//POSTメソッドで送信する。
				//送信するデータを設定する。ファイルのパスとJSON文字列を送信する。
				data:{text:jsonString, path:'source/' + topNodeName + '.json'},
				dataType:'text',		//テキストデータを返してもらう。
				//キャッシュを無効にする。
				cache:false,
				async:false,	//同期通信
				success:function(text){	//通信成功時
					alert(text);	//保存結果のログを出す。
				},
				error:function(){		//通信失敗時
					//通信失敗のログを出す。
					alert('通信に失敗しました。時間をおいて試してください。');
				}
			});
		});
	}
	
	/* 
	 * 関数名:setDBdata
	 * 概要  :dbに接続し、データの挿入または更新または削除を行う
	 * 引数  :object sendQueryJsonArray: DBに接続するためにdb_setQueryを子に持つcreate_tagの連想配列
	 		:object queryReplaceData: クエリの中で置換するデータが入った連想配列
	 		:string successMessage: クエリが成功した時のメッセージ
	 * 返却値  :int :変更できた数 
	 * 作成者:T.Yamamoto
	 * 作成日:2015.06.27
	 * 変更者:T.Masuda
	 * 変更日:2015.08.09
	 * 内容　:操作したレコードの数を整数値で返す様にしました。
	 */
	this.setDBdata = function(sendQueryJsonArray, queryReplaceData, successMessage) {
		var retInt = 0;	//返却値用の変数を宣言、0で初期化する
		
		//DBに送信するための連想配列
		var send = {};
		//置換済みであるかどうか判定するためにkey名を一つだけ取り出す
		for(var arrayKey in queryReplaceData) {
			//key名を取り出したらループを回さずに終わらせる
			break;
		}
		//置換済みでなければ置換する
		if(!queryReplaceData[arrayKey].value) {
			send = $.extend(true, {}, sendQueryJsonArray, this.replaceValueNode(queryReplaceData))
		//置換済みであれば値をそのまま結合する	
		} else {
			send = $.extend(true, {}, sendQueryJsonArray, queryReplaceData);
		}
		
		var checkedObj = this.checkBeforeConvertJsonString(send);
		
		//変更者:T.Yamamoto 日付:2015.06.26 内容:jsondbManagerに送信する値はjson文字列でないといけないので連想配列を文字列にする処理を追加しました。
		var sendJsonString = JSON.stringify(checkedObj);
		//Ajax通信を行う
		$.ajax({
			url: URL_SAVE_JSON_DATA_JSP,		//レコード保存のためのPHPを呼び出す
			//予約情報のJSONを送信する
			//変更者:T.Yamamoto 日付:2015.06.26 内容:dataを変数sendから変数sendJsonStringに変更し、送信する値を配列から文字列を送信するように修正しました
			data:{json:sendJsonString},			//送信するデータを設定する
			dataType: 'json',					//JSONデータを返す
			type: STR_POST,						//POSTメソッドで通信する
			async:false,						//同期通信を行う
			success:function(json){				//通信成功時の処理
				//更新した結果が何件であったかを返すために、結果件数を変数に入れる
				//整数に変換できる値が返ってきていれば、整数値に変換して返却用変数に入れる
				retInt = !isNaN(json.message)? parseInt(json.message): 0;
				//更新成功であれば
				//変更者:T.Yamamoto 日付:2015.07.06 内容:コメント化しました
				//if(!parseInt(parseInt(ret.message)) && ret.message != "0"){
				//変更者:T.Yamamoto 日付2015.07.17 内容: ループで更新に対応するために第三引数が空白ならアラートを出さない設定をしました
				//第三引数が空白であるならループで更新を行うということなのでアラートを出さない
				if(successMessage != EMPTY_STRING) {
					//更新した内容が1件以上の時更新成功メッセージを出す
					if(retInt >= 1) {
						if (successMessage) {
							alert(successMessage);	//更新成功のメッセージを出す
						}
					//更新失敗であれば
					} else {
						alert(STR_TRANSPORT_FAILD_MESSAGE);	//更新失敗のメッセージを出す
					}
				}
			},
			error:function(xhr, status, error){	//通信失敗時の処理
				//通信失敗のアラートを出す
				alert(MESSAGE_FAILED_CONNECT);
			}
		});

		return retInt;	//整数値を返す
	}
	
	/* 
	 * 関数名:clickCalendar
	 * 概要  :クリックしたときにカレンダーを表示し、日付を指定できるようにする
	 * 引数  :string selector:カレンダーをクリックしたときにだしたいセレクター名
	 * 返却値  :なし
	 * 作成者:T.Yamamoto
	 * 作成日:2015.06.27
	 */
	this.clickCalendar = function(selector) {
		$('[name=' + selector + ']').datepicker({
			// 年月日の順番で表示するフォーマットにする
			dateFormat: 'yy-mm-dd',
			// 月をセレクトボックスで選択できるようにする
			changeMonth: true,
			// 年をセレクトボックスで選択できるようにする
			changeYear: true,
			// 選択できる年は1900年から2200年の範囲にする
			yearRange: '1900:2200',
		});
	}
	
	/* 
	 * 関数名:insertTextboxToTable
	 * 概要  :テーブルにテキストボックスを挿入する。
			受講承認テーブルなどでセルの内容をテキストボックスにする時に使う
	 * 引数  :string tableClassName: 対象テーブルのクラス名
	 		string appendDom: 追加するdom名
	 		string appendTo: 追加先セレクター
	 * 返却値  :なし
	 * 作成者:T.Yamamoto
	 * 作成日:2015.07.11
	 */
	this.insertTextboxToTable  = function(tableClassName, appendDom, appendTo) {
		//テキストボックスをクラス名の場所に挿入するためにテーブルの1列目のクラスを消去する
		$(DOT + tableClassName + ' tr:eq(0) td').removeClass(appendTo);
		//テキストボックス追加先のdomに表示している文字列を空白で初期化する
		$(DOT + appendTo).text('');
		//テキストボックスを追加する
		this.outputTag(appendDom, 'replaceTextbox', DOT + appendTo);
	}

	/* 
	 * 関数名:setInputValueToLecturePermitListInfoTable
	 * 概要  :受講者一覧テーブルのテキストボックスにデフォルトで値を入れる。
	 		使い方はsetTableTextboxValuefromDB関数で引数として呼ばれるときのみ使う
	 * 引数  :Object recordData : レコードのデータ
	 *      :String targetParent : 処理対象行の一意な祖先要素セレクタ
	 * 返却値  :なし
	 * 作成者:T.Yamamoto
	 * 作成日:2015.07.11
	 * 変更者:k.urabe
	 * 変更日:2016.10.06
	 * 内容:呼び出し元の処理を修正したことにより、行指定に使用する変数を変更。それに伴い処理を統一
	 */
	this.setInputValueToLecturePermitListInfoTable = function(recordData, targetParent) {
		//DBから取得した料金の値を取得する
		resultValueCost = recordData[KEY_COST];
		//DBから取得した使用ptの値を取得する
		resultValueUsePoint = recordData[KEY_USE_POINT];
		//DBから取得した販売個数の値を取得する 2016.10.14 r.shibata 追加
		resultValueSellNumber = recordData[KEY_SELL_NUMBER];
		//テーブルの料金のテキストボックスに対してデフォルトでDBから読込んだ値を入れる
		$(SELECTOR_TR_INDEX_FRONT + rowNumber + SELECTOR_TR_INDEX_USER_CLASSWORK_COST, $(targetParent)).attr({
				value : resultValueCost,
				min   : 0
			});
		//テーブルの料金の使用ptに対してデフォルトでDBから読込んだ値を入れる
		$(SELECTOR_TR_INDEX_FRONT + rowNumber + SELECTOR_TR_INDEX_USE_POINT, $(targetParent)).attr({
				value : resultValueUsePoint,
				min   : 0
			});
		//テーブルの料金の使用ptに対してデフォルトでDBから読込んだ値を入れる 2016.10.14 r.shibata 追加
		$(SELECTOR_TR_INDEX_FRONT + rowNumber + SELECTOR_TR_INDEX_SELL_NUMBER, $(targetParent)).attr({
				value : resultValueSellNumber,
				min   : 0
			});
		//授業データでなく備品データのとき備品データをデフォルトでセットする
		if(recordData[COLUMN_NAME_LESSON_NAME] == EMPTY_STRING && recordData[KEY_CONTENT] != EMPTY_STRING) {
			//DBから取得した日備品の値を取得する
			resultValueCommodityName = recordData[KEY_CONTENT];
			//備品名セレクトボックスにデフォルト値をDBから読込んだ値で設定する。
			$(SELECTOR_TR_INDEX_FRONT + rowNumber + SELECTOR_TR_INDEX_CONTENT, $(targetParent)).val(resultValueCommodityName);
		}
	}
	
	/* 
	 * 関数名:setTableTextboxValuefromDB
	 * 概要 :テーブルのテキストボックスにDBから読込んだ値をデフォルトでセットする
	 * 引数 :tableArray:DBから読込んだテーブルのデータが入っている連想配列:例(受講者一覧テーブル) json.LecturePermitListInfoTable.table
			:setTablefunc:テーブルのテキストボックスに値をセットするための関数
			:targetParent:処理対象行の一意の祖先要素
			:showMaxRow:1ページのテーブル最大表示件数
	 * 返却値  :なし
	 * 作成者:T.Yamamoto
	 * 作成日:2015.07.11
	 * 更新者:k.urabe
	 * 更新日:2016.10.06
	 * 内容:2ページ目以降に適切な値をセットするため、ページ判定処理関連を追加（1ページの最大表示数の引数も追加）
	 */
	this.setTableTextboxValuefromDB = function(tableArray, setTablefunc, targetParent, showMaxRow) {
		//DBから読込んだ値を取り出すためにカウンターを初期値0で作る
		counter = 0;
		//テーブルに値をセットするために行番号を初期値1で作る(0は見出しであるため、1から数え始める)
		rowNumber = 1;
		// DBから取得した値の件数を保存する
		var tableArrayNum = tableArray.length;

		// ページャが存在するか確認 2016.12.29 タブを現在選択されているタブに指定
		if($(SELECTOR_SELECT_TAB + SELECTOR_LAST + SPACE + SELECTOR_SELECT_PAGE).length){
			// ページ分数、DBから取得したレコードのカウンターを調整する 2016.12.29 タブを現在選択されているタブに指定
			counter = (showMaxRow) * (parseInt($(SELECTOR_SELECT_TAB + SELECTOR_LAST + SPACE + SELECTOR_SELECT_PAGE).text()) - 1);
		}

		//DBから取り出したテーブルの行数分ループしてテキストボックスにデフォルト値をセットする
		$.each(tableArray, function(){
			//DBから読込んだ値を取り出すためにループのカウンターに対応した行の値を指定する
			recordData = tableArray[counter];
			//テキストボックスにDBから読込んだ値を入れる
			setTablefunc(recordData, targetParent);
			//行番号をインクリメントする
			rowNumber++;
			//カウンタ変数をインクリメントする
			counter++;
			// 最後の値まで走査したか検証
			if(tableArrayNum <= counter) {
				// 走査を終了する
				return false;
			}
		});
	}

	//テーブルを置き換えるときの設定オブジェクト
	var replaceTableOption = {};
	//会員、予約可能授業一覧テーブル
	replaceTableOption['lessonTable']  = {
		//テーブルの追加先
		addDomPlace:'.lessonTableOutsideArea',
		//テーブルのリロードが終わった時に処理を行う関数をまとめてコールしてテーブルを編集する
		afterReloadFunc:'commonFuncs.tableReplaceAndSetClass(LESSON_TABLE, LESSON_TABLE_REPLACE_FUNC, true, reserveLessonListcreate_tag, LESSON_TABLE_RECORD, 10)'
	};
	//予約中授業テーブル
	replaceTableOption['reservedLessonTable'] = {
		//テーブルの追加先
		addDomPlace:'.reservedLessonTableOutsideArea',
		//テーブルのリロードが終わった時に行のクラス名を付ける処理とメルマガ内容列を指定文字数以内にする関数を呼び出す関数名を定義しておく
		afterReloadFunc:'commonFuncs.tableReplaceAndSetClass(RESERVED_LESSON_TABLE, RESERVED_LESSON_TABLE_REPLACE_FUNC, true, this, RESERVED_LESSON_TABLE_RECORD, 10)',
		//置換のvalueが入ったdom名
		replaceValueDom:'#alreadyReserved .selectThemebox',
		//置換するkey名
		replaceQueryKey:'lesson_name'
	}
	//受講済み授業テーブル
	replaceTableOption['finishedLessonTable'] = {
		//置換のvalueが入ったdom名
		replaceValueDom:'#finishedLesson .selectThemebox',
		//置換するkey名
		replaceQueryKey:'lesson_name'
	}
	//管理者画面、日ごと授業一覧
	replaceTableOption['eachDayReservedInfoTable'] = {
		//テーブルのafterでの追加先
		addDomPlace:'.eachDayReservedInfoTableOutsideArea',
		//置換のvalueが入ったdom名
		replaceValueDom:'.dateInput',
		//置換するkey名
		replaceQueryKey:'lesson_date',
		//テーブルのリロードが終わった時に行のクラス名を付ける処理とメルマガ内容列を指定文字数以内にする関数を呼び出す関数名を定義しておく
		afterReloadFunc:'commonFuncs.tableReplaceAndSetClass(EACH_DAY_RESERVED_INFO_TABLE, EACH_DAY_RESERVED_INFO_TABLE_REPLACE_FUNC, false, $("#dayReserver")[0].create_tag, EACH_DAY_RESERVED_INFO_TABLE_RECORD, 10)'
	}

	//受講承認一覧テーブル
	replaceTableOption['lecturePermitListInfoTable']  = {
		//テーブルのafterでの追加先
		addDomPlace:'.lecturePermitListInfoTableOutsideArea',
		//テーブルのリロードが終わった時に処理を行う関数をまとめてコールしてテーブルを編集する
		afterReloadFunc:'afterReloadPermitListInfoTable()'
	};

	//管理者画面、授業詳細一覧テーブル
	replaceTableOption['adminLessonDetailTable'] = {
		//テーブルの追加先
		addDomPlace:'.adminLessonDetailTableOutsideArea',
		//テーブルのリロードが終わった時に処理を実行する関数名を入力してテーブルに対して処理を行う
		afterReloadFunc:'commonFuncs.tableReplaceAndSetClass(ADMIN_LESSON_DETAIL_TABLE, ADMIN_LESSON_DETAIL_TABLE_REPLACE_FUNC, true, adminLessonListcreate_tag, ADMIN_LESSON_DETAIL_TABLE_RECORD, 10)'
	}

	/*
	 * 関数名 :addQueryExtractionCondition
	 * 概要  　:ボタンがクリックされた時にテーブルの中身を入れ替える時に発行するクエリに抽出条件を追加する
	 * 引数  　:element inputDataParent:テキストボックスが入っているdom名
	 * 　　　　:string query:テーブル作成のためにDBに送信するクエリ文字列
	 * 戻り値　:なし
	 * 作成日　:2015.07.03
	 * 作成者　:T.Yamamoto
	 * 変更日　:2015.11.08
	 * 変更者　:T.Masuda
	 * 内容　　:処理を見直しました。また、テキストボックスのみの対応であったため他のフォーム要素にも対応しました
	 */
	this.addQueryExtractionCondition = function(inputDataParent, queryArrayKey) {
		
		var counter = 0;				//走査用カウンター変数
		var operator = EMPTY_STRING;	//演算子の文字列
		var addString = EMPTY_STRING;	//追記するクエリの文字列
		var thisElem = this;			//ループ内でクラスインスタンスを使うため変数に保存する
		
		//フォームパーツを走査する
		$(SEL_INPUT_DATA, $('.' + inputDataParent)).filter(':not([type="button"])').each(function(){
			var value = $(this).val();	//フォームの値を取得する
			//入力された値が空白、スキップ用の値99でなければ
			if(commonFuncs.checkEmpty(value) && value != '99') {
				//入力値を取得する
				var inputData = $(this).val();
				//name属性を所得する
				var attrName = $(this).attr('name');
			
				//試行回数で利用する演算子をWHEREかANDに切り替える
				operator = counter ? ' AND ' : ' WHERE ';
					
				//テキストボックス、テキストエリアなら
				if(this.tagName == 'INPUT' || this.tagName == 'TEXTAREA'){
					//LIKE演算子のクエリを作成する
					addString = operator + attrName + " LIKE '%" + inputData + "%' ";
				} else {
					//=演算子のクエリを作成する
					addString = operator + attrName + " = '" + inputData + "' ";
				}
				
				counter++;	//カウンターを回す
				
				//クエリに文字を付け加える
				thisElem.json[queryArrayKey].db_getQuery += addString;
			}
		});
	}
	
	/*
	 * 関数名 :replaceTableQuery
	 * 概要  　:ボタンがクリックされた時にテーブルの中身を入れ替える時に発行するクエリに抽出条件を追加する
	 * 引数  　:element inputDataParent:テキストボックスが入っているdom名
	 * 　　　　:string query:テーブル作成のためにDBに送信するクエリ文字列
	 * 戻り値　:なし
	 * 作成日　:2015.07.03
	 * 作成者　:T.Yamamoto
	 * 変更者  :R.Shibata
	 * 変更日  :2016.09.09
	 * 内容    :置換する対象のDomの値が配列でない場合、正常終了しない問題の対応（日ごと予約者一覧画面より呼び出された場合）
	 */
	this.replaceTableQuery = function(queryArrayKey) {
		//テーブルのクエリを置換するための値をセレクタから取得する
		var replaceValue = $(replaceTableOption[queryArrayKey]['replaceValueDom']).val();
		//置換する値がテーマ選択のセレクトボックスである場合 2016.09.09 r.shibata 置換する値が配列でない場合、joinが使用できない問題の対応
		if(replaceValue == null || $.isArray(replaceValue)){//未選択時はnull、選択時は配列
			//全選択(何も選択されていない)なら「全て」、そうでなければテーマをひとまとめにして置換用変数にセットする  2016.12.27、取得する値を変数そのままに変更(配列の場合は配列そのまま)
			replaceValue = replaceValue != null && replaceValue.length ? replaceValue : KEY_ALL_JP;  
		}
		//取得する授業の日時の範囲を取得する
		var fromDate = $('.finishedLessonFromDate').val();
		var toDate = $('.finishedLessonToDate').val();
		//日付が入力されており、セット先のJSONが存在すれば  2016.09.09 r.shibata セット先のjsonが存在するかのチェックを追加
		if(commonFuncs.checkEmpty(fromDate) && commonFuncs.checkEmpty(toDate) &&
			this.json[queryArrayKey].fromDate && this.json[queryArrayKey].toDate) {
			//それぞれの日付をJSONにセットする
			this.json[queryArrayKey].fromDate.value = $('.finishedLessonFromDate').val();
			this.json[queryArrayKey].toDate.value = $('.finishedLessonToDate').val();
		}
		
		//置換するものが「全て」以外であれば置換する
		if (replaceValue != KEY_ALL_JP) {
			//テーブルのクエリを置換するためのkey名を取得する
			var replaceKey = replaceTableOption[queryArrayKey]['replaceQueryKey'];
			//取得した値をjsonの反映させる
			this.json[queryArrayKey][replaceKey][VALUE] = replaceValue;
			//クエリをテーマ検索用のものと入れ替える
			this.json[queryArrayKey].db_getQuery = this.json[queryArrayKey].replace_query;
		//絞込ボタンで「全て」が選択されたときに全ての値を検索するためのクエリを入れる
		} else {
			//全ての値を検索するためのクエリをセットする
			this.json[queryArrayKey].db_getQuery = this.json[queryArrayKey].allSearch_query;
		}
	}
	
	
	/* 
	 * 関数名:reloadTableTriggerEvent
	 * 概要  :クエリにテキストボックスから受け取った値を抽出条件に加える
	   ユーザが入力した内容でDBからデータを検索したいときにクエリをセットするために使う関数
	 * 引数  :eventSelector 			: イベントが始まる検索ボタンの親要素
	         eventName 				: どのイベントを行うかの名前
	         reloadTableClassName 	: リロードするテーブルクラス名
	         inputDataParent 		: クエリがaddのときクエリにデータを加えるためのテキストボックスの親要素のセレクター名
	 * 返却値  :なし
	 * 作成者:T.Yamamoto
	 * 作成日:2015.07.03
	 */
	this.reloadTableTriggerEvent = function(eventSelector, eventName, reloadTableClassName) {
		var thisElem = this;
		//対象のボタンがクリックされた時テーブルをリロードするイベントを登録する
		$(eventSelector).on(eventName, function(){
			//テーブルをリロードして最新のデータを表示する
			thisElem.eventTableReload(reloadTableClassName);
		});
	}
	
	/* 
	 * 関数名:eventTableReload
	 * 概要  :クリックやチェンジイベントで発生するテーブル再読み込み処理をまとめたもの。
			reloadTableTriggerEvent関数内で使い、用途に合わせてテーブルを更新する
	 * 引数  :eventButtonParent: イベントが始まる検索ボタンの親要素
	         queryArrayKey : クエリが入っている連想配列のkey
	 * 返却値  :なし
	 * 作成者:T.Yamamoto
	 * 作成日:2015.07.03
	 */
	this.eventTableReload = function(reloadTableClassName) {
		//クエリ初期状態を保存する
		var queryDefault = this.json[reloadTableClassName].db_getQuery;
		//クエリの置換を行う関数を実行する
		this.replaceTableQuery(reloadTableClassName);
		//テーブルをリロードする
		this.tableReload(reloadTableClassName);
		// クエリを最初の状態に戻す
		this.json[reloadTableClassName].db_getQuery = queryDefault;
	}
	
	/* 
	 * 関数名:tableReset
	 * 概要  :テーブルを完全に消去して初期化する。
	 * 引数  :tableName:リセットするテーブルのクラス属性名
	 * 返却値  :なし
	 * 作成者:T.Yamamoto
	 * 作成日:2015.08.08
	 */
	this.tableReset = function(tableName) {
		//テーブルのjsonの値が既にあれば
		if(this.json[tableName][TABLE_DATA_KEY]){
			//テーブルのjsonを初期化する
			this.json[tableName][TABLE_DATA_KEY] = {};
		}
		//すでにテーブルがあるならテーブルを消す
		if ($(DOT + tableName)) {
			//テーブルを消す
			$(DOT + tableName).remove();
		}
	}

	/* 
	 * 関数名:tableReload
	 * 概要  :テーブルをリロードする
	 * 引数  :reloadTableClassName:リロードする対象のテーブルのクラス名
	 * 返却値  :なし
	 * 作成者:T.Yamamoto
	 * 作成日:2015.07.06
	 * 変更者:R.Shibata
	 * 変更日:2016.10.11
	 * 内容  :取得したテーブルレコードが0件の時の処理を削除。エラーメッセージは出力処理で表示する。
	 */
	this.tableReload = function(reloadTableClassName) {
		//テーブルを初期化する
		this.tableReset(reloadTableClassName);
		//テーブルを作るためのjsonをDBから持ってきた値で作る
		this.getJsonFile(URL_GET_JSON_ARRAY_JSP, this.json[reloadTableClassName], reloadTableClassName);
		//テーブルを作り直す
		this.outputTagTable(reloadTableClassName,reloadTableClassName, replaceTableOption[reloadTableClassName].addDomPlace);
		//テーブルのリロード後にテーブルに対して必要な処理が必要であるならばその処理を行う(レコード0件では処理を行わない)
		if(replaceTableOption[reloadTableClassName].afterReloadFunc && this.json[reloadTableClassName][TABLE_DATA_KEY][0]) {
			//リロード後に処理をする関数をコールする
			eval(replaceTableOption[reloadTableClassName].afterReloadFunc);
		}
	}
	
	/* 
	 * 関数名:getDateFormatDB
	 * 概要  :日付オブジェクトからフォーマットをyyyy-mm-dd方式に変換してその文字列を返す(DBに適したフォーマットにする)
	 * 引数  :date:日付型オブジェクト
	 * 返却値  :なし
	 * 作成者:T.Yamamoto
	 * 作成日:2015.07.06
	 */
	this.getDateFormatDB = function(date) {
		var year = date.getFullYear();		//年
		var month = date.getMonth() + 1;	//月
		var date = date.getDate();			//日
		//月が1月から9月のとき先頭に0を足す
		if (month < 10) { month = "0" + month; }
		//日が1日から9日のとき先頭に0を足す
		if (date < 10) {  date = "0" + date; }
		//現在の日付を返す
		var nowDate = year + "-" + month + "-" + date;
		//現在日付を返す。
		return nowDate;
	}

	/* 
	 * 関数名:setTableReloadExecute
	 * 概要  :クエリをセットしてテーブルをリロードする
	 * 引数  :tableClassName:テーブルのクラス名
	 		:addQueryString:クエリに追加する文字列
	 *       defaultQuery:デフォルトのクエリ
	 * 返却値  :なし
	 * 作成者:T.Yamamoto
	 * 作成日:2015.07.07
	 */
	this.setTableReloadExecute = function(tableClassName, addQueryString, defaultQuery) {
		//クエリに文字列を追加する
		this.json[tableClassName].db_getQuery += addQueryString;
		//クエリからテーブルを作る
		this.tableReload(tableClassName);
		//クエリを追加前に戻す
		this.json[tableClassName].db_getQuery = defaultQuery;
	}
	
	/* 
	 * 関数名:accordionSetting
	 * 概要  :アコーディオン機能を実装する
	 * 引数  :clickSelector:クリックされたときにアコーディオンを表示するためのきっかけとなるdom要素のセレクター名
	 *       accordionDomSelector:アコーディオンの中身のdomセレクター名
	 * 返却値  :なし
	 * 作成者:T.Yamamoto
	 * 作成日:2015.07.09
	 * 変更者:R.Shibata
	 * 変更日:2016.09.09
	 * 内容　:複数回実行された時、イベントが重複して登録されてしまう現象に対応しました。
	 */
	this.accordionSetting = function(clickSelector, accordionDomSelector) {
		//登録されたイベントを削除する。削除後登録することで一つしか登録されないようにする。
		$(STR_BODY).off(CLICK, clickSelector);
		//第一引数のセレクター要素がクリックされたときにアコーディオンを表示するためのイベントが発生する
		$(STR_BODY).on(CLICK, clickSelector, function(){
			//第二引数のセレクター要素が非表示状態なら表示状態に、表示状態なら非表示状態にする
			$(accordionDomSelector).slideToggle();
		});
	}
	
	/* 
	 * 関数名:accordionSettingToTable
	 * 概要  :テーブルの行用にアコーディオン機能を実装する
	 * 引数  :clickSelector:クリックされたときにアコーディオンを表示するためのきっかけとなるdom要素のセレクター名
	 *       accordionDomSelector:アコーディオンの中身のdomセレクター名
	 * 返却値  :なし
	 * 作成者:T.Yamamoto
	 * 作成日:2015.07.16
	 */
	this.accordionSettingToTable = function(clickSelector, accordionDomSelector) {
		//第一引数のセレクター要素がクリックされたときにアコーディオンを表示するためのイベントが発生する
		$(STR_BODY).on(CLICK, clickSelector + ' td', function(){
			//どのレコードを開くのか判別するためにレコードの番号を取得する
			var rowNumber = $(this).parent().index(clickSelector);
			//チェックボックスをクリックしてもアコーディオンが反応しないようにする
			if($(this).attr('class') != 'permitCheckboxArea') {
				//第二引数のセレクター要素が非表示状態なら表示状態に、表示状態なら非表示状態にする
				$(accordionDomSelector).eq(rowNumber).toggle();
			}
		});
	}
	
	/* 
	 * 関数名:checkInputName
	 * 概要  :テキストボックスに入力された値が文字列のときはtrue、違うならfalseを返し、データ送信の入力チェックに使う
	 * 引数  :checkString:チェックする文字列
	 * 返却値  :resultbool:第一引数の文字列が数字や記号が入っているかどうかの判定結果
	 * 作成者:T.Yamamoto
	 * 作成日:2015.07.11
	 */
	this.checkInputName  = function(checkString) {
		//結果の変数をデフォルト値trueで作る
		var resultbool = true;
		//名前をチェックするために、第一引数の文字列に記号や数字が入っているとfalseを返す
		if(checkString.match(/[!-\/:-@≠\[-`{-~0-9]/)) {
			//名前の入力に適していないことを返す
			resultbool = false;
		}
		//名前の入力に適していたかどうかの結果を返す
		return resultbool;
	}
	
	/* 
	 * 関数名:checkInputPhone
	 * 概要  :テキストボックスに入力された値が数字かハイフンのときはtrue、違うならfalseを返し、データ送信の入力チェックに使う
	 * 引数  :checkString:チェックする文字列
	 * 返却値  :resultbool:数字かハイフンであったかどうかの判定結果
	 * 作成者:T.Yamamoto
	 * 作成日:2015.07.11
	 */
	this.checkInputPhone = function (checkString) {
		//結果の変数をデフォルト値trueで作る
		var resultbool = true;
		//電話番号をチェックするために、第一引数の文字列にハイフンを除く記号や文字が入っているとfalseを返す
		if(checkString.match(/[\/\^\:\[\]\;\@\!\"\#\\%\&\'\(\)\=\~\<\>a-zA-Z]/)) {
			//電話番号の入力に適していないことを返す
			resultbool = false;
		}
		//電話番号に適していたかどうかの結果を返す
		return resultbool;
	}

	/* 
	 * 関数名:logoutMemberPage
	 * 概要  :ログアウトボタンを押したときに会員ページからログアウトして通常ページに遷移する
	 		:管理者ページからログインした時は管理者のtopページに遷移する
	 * 引数  :なし
	 		:なし
	 * 返却値  :なし
	 * 作成者:T.Yamamoto
	 * 作成日:2015.07.15
	 */
	this.logoutMemberPage = function() {
		//ログアウトボタンがクリックされた時に処理を行うイベントを登録する
		$(STR_BODY).on(CLICK, '.logoutLink', function(){
			//管理者としてログインしていたなら管理者ページに遷移する
			if (this.json.accountHeader.authority == '80') {
				//管理者ページを呼び出し、続けて管理者としての処理をできるようにする
				callPage('adminPage.html');
			//管理者としてログインしていなければ通常ページのトップページに戻る
			} else {
				$(this).closest('.window')[0].instance.destroy();
				commonFuncs.showCurrentWindow();	//最前部のウィンドウのみ表示する
				//通常ページを使いやすくするためにヘッダーを表示するようにする
//				$('header').css('display', 'block');
				//通常ページに遷移する(create_tagがリセットされる問題があるかも？)
//				callPage('top.php');
			}
		});
	}

	/* 
	 * 関数名:insertTableRecord
	 * 概要  :テーブルに行を追加する。
	 		受講承認のアコーディオン機能実装のために新しく行を挿入するために使う。
	 		挿入するdom要素は最初はtdの代わりにdivで構成されていないといけない
	 * 引数  :tableRecordClasssName:行に新しくつけるクラス名
	 		:addDomClassName:挿入するdom要素のクラス属性名
	 * 返却値  :なし
	 * 作成者:T.Yamamoto
	 * 作成日:2015.07.16
	 */
	this.insertTableRecord = function(tableRecordClasssName, addDomClassName) {
		//追加するDOMをとりあえずbodyに作る
		this.outputTag(addDomClassName, addDomClassName, STR_BODY);
		//後でテーブルの中にdomを移動させるために追加するDOMの子要素を全て取得する
		var addDomChild = $(DOT + addDomClassName).html();
		//取得したDOMのうち、テーブルのセルに適応させるため「div」を「td」に置換する
		addDomChild = addDomChild.replace(/div/g, 'td');
		//とりあえず作っておいたdomをテーブルのtrの後に移動させる。
		$(DOT + tableRecordClasssName).after($(DOT + addDomClassName));
		//追加したDOMのタグをテーブルに適応させるためtrタグに変換する
		$(DOT + addDomClassName).replaceWith('<tr class="' + addDomClassName + '"></tr>');
		//移動させたdomに対して取得していたセルを入れていき、アコーディオン用のテーブル行を完成させる
		$(DOT + addDomClassName).html(addDomChild);
	}
	
	/*
	 * 関数名:pagingReset
	 * 概要  :ページング機能をリセットし、再びページングを作り直す時に使う
	 * 引数  :targetPagingClassName:ページング対象となる領域のクラス名。
	 * 返却値  :なし
	 * 作成者:T.Yamamoto
	 * 作成日:2015.07.30
	 */
	this.pagingReset = function(targetPagingClassName) {
		//ユーザ一覧テーブルを削除する
		$(DOT + targetPagingClassName).remove();
		//会員一覧テーブルをリセットして検索に備える
		this.json[targetPagingClassName][TABLE_DATA_KEY] = {};
		//ナンバリングのdomを初期化する
		$('.numbering').remove();
		//新しくページングを作り直すためにページングの番号一覧をリセットする
		this.json.numbering = {};
	}

	/* 
	 * 関数名:getSendReplaceArray
	 * 概要  :可変テーブルで取得した連想配列とユーザがテキストボックスで入力した値の連想配列を結合する。
	 		:これによってdb_setQueryで値を置換するときの連想配列が取得できる
	 * 引数  :tableClassName:可変テーブルクラス名
	 		int rowNumber:可変テーブルで取り出す行番号
	 		StringinputDataSelector:ユーザが入力した値を取得するためにinputタグなどの親のセレクター名
	 		Object addAttr:追加で取得するフォームデータの設定
	 * 返却値  :sendReplaceArray:テーブルと入力データを結合した結果の連想配列
	 * 作成者:T.Yamamoto
	 * 作成日:2015.07.17
	 */
	this.getSendReplaceArray = function(tableClassName, rowNumber, inputDataSelector, addAttr) {
		//可変テーブルから連想配列を取得する
		var resultTableArray = this.json[tableClassName][TABLE_DATA_KEY][rowNumber];
		try{
			//ユーザが入力した値をDBのクエリに対応したkey名で連想配列で取得する
			var inputDataArray = commonFuncs.getInputData(inputDataSelector, addAttr);
			delete inputDataArray.columnCheckbox;	//チェックボックス列から取得したデータは空なので削除する
			
			//取得した連想配列を結合する
			var sendReplaceArray = $.extend(true, {}, resultTableArray, inputDataArray);
			//使用ポイントが所持ポイントを上回っていれば
			if (sendReplaceArray.diff_point && Number(sendReplaceArray.get_point) < Number(sendReplaceArray.diff_point)) { // 比較が文字列で行われ、比較が不正だったため、数値で比較するよう修正 2016.12.22 r.shibata 
				throw new Error("使用ポイントが所持ポイントを上回っています。 所持:" + sendReplaceArray.get_point + " 使用ポイント: " + sendReplaceArray.data-diff_point);	//例外を発生させる
			}
			//チェック用に、ポイント未反映の支払額を取得する 2016.12.22 r.shibata 追加
			var temp_pay_price = sendReplaceArray.user_classwork_cost ? sendReplaceArray.user_classwork_cost : sendReplaceArray.pay_price
			//使用ポイントが支払額を上回っていれば 2016.12.22 r.shibata 追加
			if (Number(temp_pay_price) < Number(sendReplaceArray.diff_point)) {
				throw new Error("使用ポイントが支払額を上回っています。 使用ポイント: " + sendReplaceArray.data-diff_point);	//例外を発生させる
			}
			
			//実費の支払額をセットする
			sendReplaceArray.pay_price = sendReplaceArray.user_classwork_cost ? sendReplaceArray.user_classwork_cost - sendReplaceArray.use_point : sendReplaceArray.pay_price;
			
			//結合した結果の連想配列を返す
			return sendReplaceArray;
		//例外処理
		} catch (e) {
			throw e;	//上位に例外を投げる
		}
	}

	/* 
	 * 関数名:choiceSendQueryArray
	 * 概要  :JSONDBManagerに送信するためのjsonを分岐する
	 		:受講一覧の承認ボタンで使うクエリが受講情報のクエリか備品情報のクエリかを振り分けるときに使う
	 * 引数  :boolRule:分岐させるための値が入った変数
	 		trueQuery:条件がtrueのときに取得するクエリ
	 		falseQuery:条件がfalseのときに取得するクエリ
	 * 返却値  :resultSendQuery:選択した結果のクエリが入った連想配列
	 * 作成者:T.Yamamoto
	 * 作成日:2015.07.17
	 */
	this.choiceSendQueryArray = function(boolRule, trueQueryArray, falseQueryArray) {
		//送信するクエリを入れるための変数を作る
		var resultSendQueryArray = {};
		//条件分岐を設定するための値があるかどうかでクエリを決める
		if (boolRule) {
			//trueだった時のクエリを取得する
			resultSendQueryArray = this.json[trueQueryArray];
		//条件が合わなかったときに別のクエリを入れる
		} else {
			//falseのときのクエリを取得する
			resultSendQueryArray = this.json[falseQueryArray];
		}
		//取得したクエリの結果を返す
		return resultSendQueryArray;
	}
	
	/* 
	 * 関数名:addUsePointQuery
	 * 概要  :既にあるクエリに対して、クエリを付け足す。
	 		受講承認でユーザがポイントを使用したときにポイントしようクエリを付け足す
	 * 引数  :sendQueryArray:jsondbManagerに渡すためのクエリが入った連想配列
	 		sendReplaceArray:DBに更新で渡す値が入った連想配列
	 * 返却値  :resultSendQueryArray
	 * 作成者:T.Yamamoto
	 * 作成日:2015.07.17
	 */
	this.addUsePointQuery = function(sendQueryArray, sendReplaceArray) {
		//置換するクエリに使用ポイントの値が1以上のとき、ポイントを使うということなのでクエリにポイントしようクエリを付け足す
		if (sendReplaceArray.use_point >= 1) {
			//現状のクエリに使用ポイントのクエリを付け足す
			sendQueryArray.db_setQuery += this.json.updateUsePoint.db_setQuery;
		}
		//クエリの結果を返す
		return sendQueryArray;
	}
	
	/* 
	 * 関数名:createMemberPageHeader()
	 * 概要  :会員ページからブログページやギャラリーページに遷移するときに通常ページのヘッダーでなく会員ページのヘッダーを表示する。
	 * 引数  :createTag createtag:createTagクラスのインスタンス
	 * 返却値  :なし
	 * 作成者:T.Yamamoto
	 * 作成日:2015.07.17
	 * 変更者:T.Masuda
	 * 変更日:2015.08.02
	 * 内容　:createTagクラスインスタンスを引数にして使うようにしました。
	 */
	this.createMemberPageHeader = function() {
		//会員ページヘッダーのjsonがあるときに会員ページのヘッダーを作る
		//@mod 2015.0802 T.Masuda ページ内で生成したcreatetagクラスインスタンスを参照するようにしました。
		//会員番号が入っていなく、通常ヘッダーが見えていなければ
		if(!isNaN(this.json.accountHeader.user_key.value) && $('.header:hidden').length) {
			// パーツのテンプレートのDOMを取得する。
			this.getDomFile('template/memberCommon.html');
			// バナー領域のJSONを取得する。
			this.getJsonFile('source/memberCommon.json');
			//ユーザ情報のテキストをDBから取得する
			this.getJsonFile('jsp/GetJSONString.jsp', this.json['accountHeader'], 'accountHeader');
			// 会員ページヘッダーを作る
			this.outputTag('accountHeader', 'memberHeader');
			// バナー領域を作る
			this.outputTag('userBanner');
		}
	}

	/* 
	 * 関数名:sendMail
	 * 概要  :mailSend.phpにデータを渡してメールの送信処理を行う
	 * 引数  :object mailInfoArray:送信先アドレスなどの情報が入った連想配列
	 		string mailSubject:送信メールのタイトル文字列
	 		string mailContent:送信メール内容
	 * 返却値  :なし
	 * 作成者:T.Yamamoto
	 * 作成日:2015.07.22
	 */
	this.sendMail = function(mailInfoArray, mailSubject, mailContent) {
			//Ajax通信を行う
	}
	
	this.sendSuggest = function(from, type, mailSubject, mailContent) {
		
		var resulwork = null;
		
		$.ajax({
			url:'php/mailSendEntrySuggest.php'
			,data:{
					from:from
					,type:type
					,subject:mailSubject
					,content:mailContent
			}
			,dataType:"json"
			,type:"POST"
			,success:function(result){
				resulwork = result;
			}
			,error:function(xhr, status, error){
				throw new Error(status + ":" + MESSAGE_FAILED_CONNECT);
			}
		});
		
		// @TODO 結果をどうしいのかはまだ未定
		//return resulwork
	}
	
	this.sendMemberMail = function(from, mailSubject, mailContent) {
		
		var resulwork = null;
		
		$.ajax({
			url:'php/mailSendEntryMemberMail.php'
			,data:{
					from:from
					,subject:mailSubject
					,content:mailContent
			}
			,dataType:"json"
			,type:"POST"
			,success:function(result){
				resulwork = result;
			}
			,error:function(xhr, status, error){
				throw new (status + ":" + MESSAGE_FAILED_CONNECT);
			}
		});
		
		// @TODO 結果をどうしいのかはまだ未定
		//return resulwork
	}
	
	this.sendMailmagazine = function(mailSubject, mailContent) {
		
		var resulwork = null;
		alert("メルマガを送信しました。");
	}
	
	/* 
	 * 関数名:sendMail
	 * 概要  :mailSend.phpにデータを渡してメールの送信処理を行う
	 * 引数  :object mailInfoArray:送信先アドレスなどの情報が入った連想配列
	 		string mailSubject:送信メールのタイトル文字列
	 		string mailContent:送信メール内容
	 * 返却値  :なし
	 * 作成者:T.Yamamoto
	 * 作成日:2015.07.22
	 */
	this.sendMail = function(mailInfoArray, mailSubject, mailContent) {
		//Ajax通信を行う
		$.ajax({
			url:'php/mailSendEntryMagazine.php'
			,data:{
					subject:mailSubject
					,content:mailContent
			}
			,dataType:"json"
			,type:"POST"
			,success:function(result){
				resulwork = result;
			}
			,error:function(xhr, status, error){
				throw new (status + ":" + MESSAGE_FAILED_CONNECT);
			}
		});
		// @TODO 結果をどうしいのかはまだ未定
		//return resulwork
	}

	/* 
	 * 関数名:createContentTriggerClick
	 * 概要  :管理者ページでタブがクリックされたときにコンテンツを呼び出すための関数。
	 * 引数  :String clickSelector:クリックされたときにイベントを開始する対象のセレクター名
	 		function callContentFunc:タブがクリックされたときにcreateTagによって要素を作るための関数をコールするための関数名
	 		? arg:callContentFuncの引数
	 * 返却値  :なし
	 * 作成者:T.Yamamoto
	 * 作成日:2015.07.20
	 * 変更者:T.Masuda
	 * 変更日:2015.09.12
	 * 内容	:第3引数を追加し、callContentFuncに引数を1つ使えるようにしました。
	 */
	this.createContentTriggerClick = function(clickSelector, callContentFunc, arg) {
		var thisElem = this;
		//イベントを重複して登録しないためにイベントフラグ属性を作る
		$(clickSelector).attr('data-eventFlag', 0);
		//対象の要素がクリックされたらcreateTagによって要素を作る関数をコールする
		$(clickSelector).on(CLICK, function(){
			//イベントフラグが初期状態のときのみ関数を実行するようにして重複した実行を行わないようにする
			if ($(clickSelector).attr('data-eventFlag') == 0) {
				//引数の関数をコールする
				callContentFunc(arg);
				// ボタンの見た目をjqueryuiのものにしてデザインを整える
				$('button, .searchButton, input[type="button"],[type="reset"]').button();
				//イベントフラグ属性を変更することで重複してdomを作る処理をなくす
				$(clickSelector).attr('data-eventFlag', 1);
			}
		});
	}
	
	/* 
	 * 関数名:setBlogUpdateQueryReplace
	 * 概要  :ブログを更新するための置換の値をjsonに入れる
	 * 引数  :getContentKey:ブログのデータを取得するための連想配列key名
	 		:userKeyParrentKey:会員番号が入っている親のkey名
	 		:updateQueryKey:テキストボックスの親のセレクター。クエリを置換するために使う
	 		:String number:記事番号
	 * 返却値  :なし
	 * 作成者:T.Yamamoto
	 * 作成日:2015.07.27
	 * 変更者:T.Masuda
	 * 変更日:2015.11.07
	 * 内容　:記事番号を引数に追加しました
	 */
	this.setBlogUpdateQueryReplace = function(getContentKey, userKeyParrentKey, updateQueryKey, number) {
		
		if(!isNaN(number) && number != EMPTY_STRING && parseInt(number)){	//記事番号があれば、または0でなければなら
			number = parseInt(number);	//番号を整数値に変換する
			//DBから編集する対象となるブログ記事のデータを取得するために会員番号をセットする
			this.json[getContentKey].user_key.value = this.json[userKeyParrentKey].user_key.value;
			//DBから編集する対象となるブログ記事のデータを取得するため記事番号をセットする
			this.json[getContentKey].id.value = number;
			//DBからブログ記事を読み込む
			this.getJsonFile('jsp/GetJSONString.jsp', this.json[getContentKey], getContentKey);
			//クエリを更新するのか新規登録をするのかを決めるために更新クエリのjsonに値を入れて更新クエリを使うようにする
			this.json[updateQueryKey].id.value = number;
		}
	}
	
	/* 
	 * 関数名:deleteBlogArticle
	 * 概要  :ブログの記事を削除する
	 * 引数  :deleteQueryKey:ブログのデータを削除するためのクエリが入った連想配列key名
	 		:deleteArticleNumberArray:ブログデータ記事削除のための番号が入った配列
	 * 返却値  :なし
	 * 作成者:T.Yamamoto
	 * 作成日:2015.07.27
	 * 変更者:T.Masuda
	 * 変更者:2015.08.12
	 * 内容	:createLittleContentsクラスの関数として対応しました
	 */
	this.deleteBlogArticle = function(deleteQueryKey, deleteArticleNumberArray) {
		//削除する記事IDの配列を文字列に変換してオブジェクトに格納する
		var sendReplaceObject = deleteArticleNumberArray.join(','); 
		//削除のクエリを取得する
		var deleteQuery = this.json[deleteQueryKey].db_setQuery;
		//削除のクエリの条件部分を置換する
		this.json[deleteQueryKey].db_setQuery = deleteQuery.replace("'id'", sendReplaceObject);

		//記事を削除しDBを更新する
		 this.setDBdata(this.json[deleteQueryKey], { id : EMPTY_STRING }, EMPTY_STRING);
		 //すげ替えたクエリを元に戻す
		 this.json[deleteQueryKey].db_setQuery = deleteQuery;

		//ブログの記事を作り直す
		this.loadTableData('myBlogTable', 1, 4, 1, BLOG_SHOW_PAGES, '.blogArticles', 'create_tag.createMyBlogImages(\'.myBlogTable\');create_tag.setBlogEditButtons');
		//記事の画像を拡大できるようにする。
//		creator.useZoomImage('blogImage');
				
	}
	
	/* 
	 * 関数名:getUserPlusPointRate
	 * 概要  :管理者　受講承認画面でユーザが加算するポイントのレートを取得する
	 * 引数  :plusPointQueryKey	:加算ポイントを発行するためのクエリが入ったkey
	 		:orderStudents		:1コマあたりの予約人数
	 		:lessonKey			:授業のテーマを表すためのテーマの値(DBのlesson_infテーブルのlesson_key列の値)
	 * 返却値  :userPlusPointRate 	:ユーザにプラスポイントの数
	 * 作成者:T.Yamamoto
	 * 作成日:2015.07.28
	 * 変更者:k.urabe
	 * 変更日:2016.10.13
	 * 内容 :適切なポイントレートを算出できるように修正。また、取得したレートの配列を念のため、ソートする処理を追加
	 */
	this.getUserPlusPointRate = function(plusPointQueryKey, orderStudents, lessonKey) {
		var retRate = 0;	//ポイントレート返却用の変数を用意する
		
		//レッスンの加算ポイントを取得するために加算ポイント取得クエリの置換する値となるlesson_keyの値を入れる
		this.json[plusPointQueryKey].lesson_key.value = lessonKey;
		//受講ポイントの一覧を取得しどのポイントがユーザに加算されるポイント化を取得する
		this.getJsonFile(URL_GET_JSON_ARRAY_JSP, this.json[plusPointQueryKey], plusPointQueryKey);
		//ポイントレートの配列を取得する
		var rates = this.json[plusPointQueryKey][TABLE_DATA_KEY];
		// 取得したポイントレートの配列を生徒数が少ない順に並び替える 2016.10.13 add k.urabe 念のため取得した配列を使用するプロパティで昇順ソートする処理を追加
		commonFuncs.sortArray(rates, COLUMN_NAME_STUDENTS, true);
		var ratesLength = rates.length;	//ポイントレートの数を取得する
		
		//ポイントレートを順次比較していく。ポイントレートは人数が少ない順から走査される
		for (var i = 0; i < ratesLength; i++) {
			//ポイントレートに対する人数を取り出す
			var students = parseInt(rates[i].students);
			// ポイントレート当たりの人数が予約者数を越えたか検証 2016.10.13 mod k.urabe 演算子を修正（前：> → 後：<）
			if ((orderStudents < rates[i].students)) {
				break;	//処理終了
			}
			
			//ポイントレートを更新していく
			retRate = parseInt(rates[i].point_rate);
		}
		
		return retRate;		//算出したポイントレートを返す
	}

	/* 
	 * 関数名:getCommodityPlusPointRate
	 * 概要  :管理者　受講承認画面で商品に紐付くポイントレートを取得する
	 * 引数  :plusPointQueryKey	:ポイントレートを取得するためのクエリが入ったkey
	 		:commodityKey		:商品のID
	 * 返却値  :retRate 			:使用するレート
	 * 作成者:k.urabe
	 * 作成日:2016.10.14
	 */
	this.getCommodityPlusPointRate = function(plusPointQueryKey, commodityKey) {
		var retRate = 0;	// 返却用のレートを用意し初期化する

		// DBからポイントレポートを取得するために商品IDをリクエスト用のJSONにセットする
		this.json[plusPointQueryKey].commodity_key.value = commodityKey;
		// DBから商品IDに対応するポイントレートを取得する
		this.getJsonFile(URL_GET_JSON_STRING_JSP, this.json[plusPointQueryKey], plusPointQueryKey);
		// 商品のポイントレートを返却用変数に入れる
		retRate = this.json[plusPointQueryKey].point_rate.text;

		//加算ポイントを返す
		return retRate;
	}
	
	/* 
	 * 関数名:getUserPlusPoint
	 * 概要  :ユーザが加算するポイントを求める
	 * 引数  :cost 		:加算ポイントを指定するための授業料や備品代の値
	 		:pointRate 	: 加算ポイントのレート
	 * 返却値  :なし
	 * 作成者:T.Yamamoto
	 * 作成日:2015.07.28
	 */
	this.getUserPlusPoint = function(cost, pointRate) {
		//加算ポイントを計算式で求める(授業料×レート÷100を小数点切り捨て)
		var userPlusPoint = Math.floor(Number(cost) * pointRate / 100);
		//加算ポイントを返す
		return userPlusPoint;
	}
	
	/* 
	 * 関数名:getCommodityPlusPoint
	 * 概要  :管理者　受講承認画面でユーザが加算するポイントを取得する
	 * 引数  :plusPointQueryKey	:加算ポイントを発行するためのクエリが入ったkey
	 		:lessonStudents		:授業に出席した生徒様の人数
	 		:lessonKey			:授業のテーマを表すためのテーマの値(DBのlesson_infテーブルのlesson_key列の値)
	 * 返却値  :userPlusPointRate 	:ユーザにプラスポイントの数
	 * 作成者:T.Yamamoto
	 * 作成日:2015.07.28
	 */
	this.getCommodityPlusPoint = function(plusPointQueryKey, sendReplaceArray) {
		//DBからデータを取得するために備品のidを連想配列に入れてデータ取得のための準備をする
		this.json[plusPointQueryKey].commodity_key.value = sendReplaceArray['commodity_key'];
		//備品の加算ポイントレートを取得するためにDBからデータを取得する
		this.getJsonFile(URL_GET_JSON_STRING_JSP, this.json[plusPointQueryKey], plusPointQueryKey);
		//備品の加算ポイントレートを変数に入れる
		var commodityPlusPointRate = this.json[plusPointQueryKey].get_point.text;
		//加算ポイントを求める
		var plusPoint = this.getUserPlusPoint(sendReplaceArray['pay_cash'], commodityPlusPointRate);
		//加算ポイントを返す
		return plusPoint;
	}
	
	/* 
	 * 関数名:deleteMyGalleryPhoto
	 * 概要  :会員マイギャラリー画面でチェックボックスにチェックが入っているコンテンツを削除する
	 * 引数  :String || Element parentArea : イベントコールバック登録対象(ボタンの親要素)
	 * 返却値  :なし
	 * 作成者:T.Yamamoto
	 * 作成日:2015.07.28
	 * 変更者:T.Masuda
	 * 変更日:2015.11.03
	 * 内容　:機能が作りきられてなかったので作成しました
	 * 変更者:T.Masuda
	 * 変更日:2015.11.07
	 * 内容　:イベントコールバック登録対象の要素を指定できるように変更しました。
	 */
	this.deleteMyGalleryPhoto = function(parentArea) {
		
		var thisElem = this;	//クラスインスタンスへの参照を保存する
		
		$(parentArea).on(CLICK, '.deleteButton', function() {
			//チェックが入っているコンテンツの数を取得し、削除するコンテンツがあるかどうかやループの回数として使う
			var checkContentCount = $('.myPhotoCheck:checked').length;
			//チェックが入っている値が0であるならアラートを出して削除処理を行わない
			if(checkContentCount == 0) {
				//アラートでメッセージをだす
				alert('画像を1つ以上選択してください');
			} else {
				if(confirm('選択した写真を削除しますか')) {
					thisElem.deletePhoto();	//写真削除関数をコールする
				}
			}
		});
	}
	
	
	
	/* 
	 * 関数名:updatePhoto
	 * 概要  :写真のデータを更新する
	 * 引数  :Element photo : 写真のデータ
	 * 返却値  :int : 更新に成功したら1を返す。失敗したら0を返す
	 * 作成者:T.Masuda
	 * 作成日:2015.11.03
	 */
	this.updatePhoto = function(photo) {
		//更新用のデータを取得する
		var data = {photo_summary:$('.myPhotoComment', photo).text(), article_title:$('.myPhotoTitle', photo).text(), id:$('.id', photo).text() };
		//写真のデータを更新する。結果を数値で返す
		return this.setDBdata(this.json['updateMyGalleryPhoto'], data, EMPTY_STRING); 
	}
	
	/* 
	 * 関数名:updateMyGalleryPhotoData
	 * 概要  :会員マイギャラリー画面でチェックボックスにチェックが入っているコンテンツのデータを更新する
	 * 引数  :String || Element parentArea : イベントコールバック登録対象(ボタンの親要素)
	 * 返却値  :なし
	 * 作成者:T.Yamamoto
	 * 作成日:2015.07.28
	 * 変更者:T.Masuda
	 * 変更日:2015.11.03
	 * 内容　:機能が作られていなかったため作りました
	 * 変更者:T.Masuda
	 * 変更日:2015.11.07
	 * 内容　:イベントコールバック登録対象の要素を指定できるように変更しました。
	 */
	this.updateMyGalleryPhotoData = function(parentArea) {
		
		var thisElem = this;	//クラスインスタンスへの参照を保存する
		
		$(parentArea).on(CLICK, '.galleryUpdateButton', function() {
			//チェックが入っているコンテンツの数を取得し、削除するコンテンツがあるかどうかやループの回数として使う
			var checkContentCount = $('.myPhotoCheck:checked').length;
			//チェックが入っている値が0であるならアラートを出して更新処理を行わない
			if(checkContentCount == 0) {
				//アラートでメッセージをだす
				alert('画像を1つ以上選択してください');
			//チェックが入っているなら
			} else {
				//確認ウィンドウを出して確定するかを選択してもらう
				if(confirm('選択した写真を更新しますか')) {
					
					var success = 0;	//更新の成功数をカウントしていく
					//順次更新処理を行っていく
					$('.myPhoto').has('.myPhotoCheck:checked').each(function(){
						//更新処理を行う
						success = thisElem.updatePhoto(this);
					});
					
					//少なくとも1件成功していれば
					if(success){
						//更新ができた旨を伝える
						alert('写真のデータの更新を行いました。');
						//ギャラリーのデータをロードし直して再描画する　2016.10.13 mod k.urabe 参照オブジェクトおよび再描画のセレクタを修正
						thisElem.loadTableData('myGalleryTable', 1, 4, 1, MYGALLERY_SHOW_NUMBER, GALLERY_AREA, 'create_tag.createMyGalleryImages');
					//全件失敗であれば
					} else {
						//更新ができなかった旨を伝える
						alert(MESSAGE_FAILED_TO_UPDATE_PHOTO);
					}
				}
			}
		});
	}
	
	
	/* 
	 * 関数名:hideNormalHeader
	 * 概要  :通常ページのヘッダーを隠す
	 * 引数  :なし
	 * 返却値  :なし
	 * 作成者:T.Masuda
	 * 作成日:2015.0802
	 */
	this.hideNormalHeader = function(){
		//通常ページのヘッダータグがあれば、隠す。
		if($(NORMAL_HEADER).length){
			$(NORMAL_HEADER).hide();			//通常ページのヘッダーを隠す。
			$(MAIN_TAG).css(MARGIN_TOP, PX_5);	//通常ページのヘッダーの被さり対策のmarginをなくす。
		}
	}
	
	/* 
	 * 関数名:showNormalHeader
	 * 概要  :通常ページのヘッダーを表示する
	 * 引数  :なし
	 * 返却値  :なし
	 * 作成者:T.Masuda
	 * 作成日:2015.0802
	 */
	this.showNormalHeader = function(){
		//通常ページのヘッダータグがあれば、表示する。
		if($(NORMAL_HEADER).length){
			$(NORMAL_HEADER).show();				//通常ページのヘッダーを表示する。
			$(MAIN_TAG).css(MARGIN_TOP, PX_115);	//ヘッダーがかぶさる分、コンテンツ領域の位置を下げる。
		}
	}
	
	/* 
	 * 関数名:createNormalHeaderContent
	 * 概要  :通常ページのヘッダーの中身を作成する
	 * 引数  :creatTag createtagクラスのインスタンス
	 * 返却値  :なし
	 * 作成者:T.Masuda
	 * 作成日:2015.0802
	 */
	this.createNormalHeaderContent = function(){
		//ヘッダー内のタグが作成済みでなければ
		if($(NORMAL_HEADER).children().length <= 0){
			this.outputTag(GUIDES , GUIDES, NORMAL_HEADER);		// ガイド領域を作る
			this.outputTag(TOP_MENU, TOP_MENU, NORMAL_HEADER);		// トップメニューを作る
			// ログイン状態をチェックする。
			this.checkLoginState();
		}
	}
	
	/*
	 * 関数名:createMyBlogImages
	 * 概要  :マイブログの記事の画像列セルから画像タグを作る
	 * 引数  :String or Element target: 処理対象となる行を持つテーブルのセレクタ
	 * 返却値  :なし
	 * 作成者:T.Masuda
	 * 作成日:2015.08.03
	 * 変更者:T.Masuda
	 * 変更日:2015.10.31
	 * 内容　:fancyboxによる画像拡大表示に対応しました。
	 */
	this.createMyBlogImages = function(target){
		//ブログの各行を走査する
		$('tr:not(:first)', $(target)).each(function(){
			var $row = $(this);	//行そのものへの参照を変数に入れておく
			//画像の列を走査する
			$('.blogImage', $row).each(function(){
				if($(this).text() != EMPTY_STRING){	//画像列のセルにテキスト(画像名)があれば
					//テキストを画像パスにして、新たに生成する画像のパスにする
					$('.blogImage', $row).eq(0).append($('<a></a>').attr({href : IMAGE_PATH + $(this).text(), rel : "gallery" }).append($('<img>').attr('src', IMAGE_PATH + $(this).text())));
				}
			});
		});
	}
	
	/*
	 * 関数名:setBlogEditButtons
	 * 概要  :マイブログの記事の編集・削除ボタンを作る
	 * 引数  :なし
	 * 返却値  :なし
	 * 作成者:T.Masuda
	 * 作成日:2015.12.23
	 */
	this.setBlogEditButtons = function(){
		//ブログの各行を走査する
		$('.myBlogTable tr:not(:first)').each(function(){
			var $row = $(this);	//行そのものへの参照を変数に入れておく
			//編集ボタン用の列を走査する

			//削除ボタン、編集ボタンを作る
			var $deleteButton = commonFuncs.makeCommonButton('deleteButton', 'delete', true, true, true, {"type": "submit","data-role": "2"});
			var $editButton = commonFuncs.makeCommonButton('editButton', 'edit', true, true, true, {"type": "submit","data-role": "1"});
			
			//作成したボタンを各行に追加する
			$('.buttons', $row).append($deleteButton).append($editButton);
		});
		
	}
	
	/* 
	 * 関数名:createMyGalleryImages
	 * 概要  :マイギャラリーの記事の画像列セルから画像タグを作る
	 * 引数  :createTag ownerInstance : createTagクラスインスタンス(自身)。コールバックで呼び出された場合thisが自分自身を指さないことがあることへの対処
	 * 返却値  :なし
	 * 作成者:T.Masuda
	 * 作成日:2015.08.03
	 * 修正者:T.Masuda
	 * 修正日:2015.08.12
	 * 内容	:チェックボックスを追加する処理を追加しました。
	 * 修正者:T.Masuda
	 * 修正日:2015.12.27
	 * 内容	:通常のギャラリー、マイギャラリー双方に対応しました
	 */
	this.createMyGalleryImages = function(ownerInstance){
		//通常のギャラリーかマイギャラリーかを判定し、該当する方のセレクタを取得する
		var target = commonFuncs.checkEmpty(ownerInstance.json[GALLERY_TABLE]) ? SELECTOR_GALLERY_TABLE : SELECTOR_MY_GALLERY_TABLE;
		//各記事を処理する
		$(target + ' tr').each(function(){
			//画像列にaタグに入ったspanタグを用意する
			$('.myPhotoImage', this).append($('<a></a>')
					.attr({
							href: IMAGE_PATH + $('.myPhotoImage', this).text(),
							rel: "gallery"		
					})	//aのhref属性をセット
					.append($('<span></span>')
								//背景画像をセット
								.attr('style','background-image:url("'+IMAGE_PATH + $('.myPhotoImage', this).text() + '")')
								)
					);
		});
		
		//チェックボックスが必要なら
		if (target == SELECTOR_MY_GALLERY_TABLE) {
			//最後にまとめてチェックボックスを追加する
			$(SELECTOR_MY_GALLERY_TABLE + ' tr').append($('<input>').attr('type', 'checkbox').addClass('myPhotoCheck'));
		}
	}
	
	/*
	 * 関数名:function deleteRowData(form)
	 * 引数  :element form: フォームの要素。
	 * 戻り値:なし
	 * 概要  :レコードを消すイベントを定義する。
	 * 作成日:2015.04.16
	 * 作成者:T.Masuda
	 */
	this.deleteRowData = function(form, deleteQueryKey){
		var thisElem = this;
		//削除ボタンが押されたら
		$('.deleteRecord').on('click', function(){
			var numberArray = [];	//記事番号、または会員番号を格納する配列を用意する。
			//記事番号か、会員番号かを判別する。
			var numberString = $('table td.number' ,form).length > 0? 'number':'memberId';
			//チェックが入っている行を取得する。
			var $checkedRecord = $('table tr:has(input:checkbox:checked)', form);
			//フォームのテーブルのチェックボックスが入っている行を走査する。
			$checkedRecord.each(function(){
				//記事番号、または会員番号を配列に追加していく。
				numberArray.push($('.' + numberString,this).text());
			});
			
			//チェックがなければ
			if(numberArray.length <= 0){
				alert('必ず1行以上選択してください。');
				return;	//処理を終える。
			}
			
			//確認ダイアログを出して、OKならば
			if(window.confirm('選択した記事を削除しますか?')){
				//DBからチェックが入った記事を削除する
				thisElem.deleteBlogArticle(deleteQueryKey, numberArray);
				//先ほど選択した行を削除する。
				$checkedRecord.remove();
				//削除完了の旨を伝える。
				alert('選択した記事を削除しました。');
			}
		});
	}

	/*
	 * 関数名:this.sendButtonRole(form)
	 * 引数  :element form: フォームの要素。
	 * 戻り値:なし
	 * 概要  :ボタンに設定されたroleの値を隠しフォームにセットする。
	 * 作成日:2015.04.15
	 * 作成者:T.Masuda
	 */
	this.sendButtonRole = function(form){
		//submitボタンのクリックイベントを設定する。
		$(form).on('click', 'input:submit, button[type="submit"]', function(){
			//次に来るvalueHolderクラスのhiddenのinputタグにdata-role属性を渡す。 2016.12.29 r.shibata セレクタ指定をカレントを示すよう修正
			$(CURRENT_WINDOW + SPACE + SELECTOR_VALUE_HOLDER).attr('data-role', $(this).attr('data-role'));
			
			//ボタンのクラス名を取得する
			var buttonClass = $(this).attr('class');
			//編集ボタン、または削除ボタンなら
			if (buttonClass.indexOf('edit') != -1 || buttonClass.indexOf('delete') != -1 ) {
				//記事番号をセットする 2016.12.29 r.shibata セレクタ指定をカレントを示すよう修正
				$(CURRENT_WINDOW + SPACE + SELECTOR_VALUE_HOLDER).attr('data-number', $(this).parent().parent().children('.number').text());
			}
		});
	}

	/*
	 * 関数名:addUserIdToObject
	 * 引数  :object: addTargetObject:会員番号を追加したい連想配列名
	 * 戻り値:object:resultObject:会員番号を追加後の連想配列
	 * 概要  :連想配列に会員番号を追加する
	 * 作成日:2015.08.06
	 * 作成者:T.Yamamoto
	 */
	this.addUserIdToObject = function(addTargetObject){
		// 第一引数の連想配列に対して会員番号を追加する
		var resultObject = $.extend(true, {}, addTargetObject, {userId:this.getUserId()});
		return resultObject;
	}


	/* 
	 * 関数名:function checkLoginState()
	 * 概要  :ログイン状態をチェックする。
	 * 引数  :なし
	 * 返却値  :なし
	 * 作成者:T.Masuda
	 * 作成日:2015.02.20
	 * 変更者:T.Masuda
	 * 変更日:2015.06.10
	 * 内容　:ダイアログを呼ぶ関数を共通化したものにしました
	 * 変更者:T.Masuda
	 * 変更日:2015.08.02
	 * 内容　:ログイン済み状態での会員ページ、管理者ページへの転送振り分け処理を追加しました。
	 */
	this.checkLoginState = function(){
		// ログイン状態をチェックする。
		//イベントコールバック内でクラスインスタンスを参照するため、変数にクラスインスタンスを格納しておく
		var thisElem = this;
		//ログインボタンのイベントを設定する。
		$(CLASS_LOGIN).on(CLICK, function(){
			var cookie = GetCookies();	//cookieを取得する
			//ユーザの権限が管理者なら
			var loginUrl = cookie.authority
							&& cookie.authority == ADMIN_AUTHORITY? 'window/admin/page/adminTop.html' :'window/member/page/memberTop.html';
			// 会員ページ、または管理者ページへリンクする。
			$(CURRENT_WINDOW)[0].instance.callPage(loginUrl, thisElem.json.accountHeader !== void(0)
					//ログイン中でなければ画面遷移の履歴を作らない
					&& commonFuncs.checkEmpty(thisElem.json.accountHeader.authority.text) ? null : 1 );
		});
	}
	

	/* 関数名:openAdminLessonDetailDialog
	 * 概要　:管理者授業詳細ダイアログを開く
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:2015.07.31
	 * 作成者　:T.Yamamoto
	 * 変更日　:2015.08.09
	 * 変更者　:T.Masuda
	 * 内容	　:改修したdialogExクラスへの対応とcreateLittleContentsクラスへの移動を行いました
	 */
	this.openAdminLessonDetailDialog = function() {
		var thisElem = this;			//イベント内でのクラスインスタンス参照のため、変数にthisを格納する
		//レコードをクリックして授業詳細ダイアログを開くイベントを登録する
		//予約決定ダイアログを表示する処理
		//※このあたりはセレクタ関連に無駄が多かったです。
		$('.adminLessonListContent').on(STR_CLICK, STR_TR, function(){
			//インプット用データオブジェクトを取得する
			var argObj = dialogExOption[LESSON_DETAIL_DIALOG].argumentObj;
			
			//クリックしたセルの行番号を取得する
			var rowNum = $('.adminLessonListContent ' + STR_TR).index(this) - 1;
			
			//次のダイアログに渡すデータを変数に入れる
			var sendObject = thisElem.json['adminLessonDetailTable'][TAG_TABLE][rowNum];
			
			//次のダイアログに時間割を渡すためにテーブルに表示されている時間割の値を取得する
			var timeSchedule = $(STR_TD, this).eq(0).text();
			//時間割を次のダイアログに入れるためのデータに入れる
			sendObject['time_schedule'] = timeSchedule;
			
			//日付のハイフンを置換前のスラッシュ区切りにする
			var date = sendObject.lesson_date.replace(/-/g,"/");
			// 日付を日本語表示にする
			var titleDate = changeJapaneseDate(date);
			//ダイアログ用オブジェクトのコピーを用意して使う。
			var dialogObj = $.extend(true, {}, dialogExOption[LESSON_DETAIL_DIALOG]);
			//ダイアログのタイトルをセットして予約日を分かりやすくする
			dialogObj.argumentObj.config[TITLE] = titleDate;
			//インプット用データオブジェクトに授業データを追加する
			$.extend(true, dialogObj.argumentObj.data, sendObject, {create_tag:thisElem});
			
			//授業詳細ダイアログを作る
			var lessonDetailDialog = new dialogEx(	
					LESSON_DETAIL_DIALOG_PATH, 							//管理者 授業詳細ダイアログHTMLファイルのURL
					dialogObj.argumentObj,	//インプット用データオブジェクト
					dialogObj.returnObj		//アウトプット用データオブジェクト
				);
			
			//授業詳細で授業内容が更新された場合は、当該ダイアログを閉じたときに前のダイアログを閉じるようにする
			lessonDetailDialog.setCallbackClose(onCloseLessonDetailDialog);

			//ダイアログを開くときのテーブルの値を編集して表示する
			lessonDetailDialog.run();	//主処理を走らせる。
		});
	}
	
	/* 関数名:openAdminNewLessonCreateDialog
	 * 概要　:管理者新規授業作成ダイアログを開く
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:2015.08.01
	 * 作成者　:T.Yamamoto
	 * 変更日　:2015.08.09
	 * 変更者　:T.Masuda
	 * 内容	　:改修したdialogExクラスへの対応とcreateLittleContentsクラスへの移動を行いました
	 */
	 this.openAdminNewLessonCreateDialog = function() {
		var thisElem = this;			//イベント内でのクラスインスタンス参照のため、変数にthisを格納する
		//レコードをクリックして新規授業追加ダイアログを開くイベントを登録する
		$('.adminLessonListContent').on(STR_CLICK, '.lessonAddButton', function(){
			//ダイアログのクラスインスタンスを取得する
			var dialogClass = $('.adminLessonListContent')[0].instance;
			var argObj = dialogClass.getArgumentObject();	//argumentObjを取得する
			
			//新規授業追加ダイアログに渡す変数を宣言しておく
			var sendObject = {};
			//日本語名の日付を渡すデータを入れる(DBの形式をそろえるためスラッシュはハイフンに置き換える)
			sendObject['lessonDate'] = argObj.data.lessonDate.replace(/\//g,"-");
			//取得したテーブルの情報があればそれを新規作成ダイアログに渡す
			sendObject['tableData'] = thisElem.json.adminLessonDetailTable[TABLE_DATA_KEY];
			//ダイアログのタイトルをセットして予約日を分かりやすくする
			dialogExOption[ADMIN_NEW_LESSON_CREATE].argumentObj.config[TITLE] = argObj.config[TITLE];
			//sendObjectとダイアログオプションのオブジェクトとcreateLittleContentsクラスインスタンスを統合する
			$.extend(true, dialogExOption[ADMIN_NEW_LESSON_CREATE].argumentObj.data, sendObject, {create_tag:thisElem});
			
			//新規授業追加ダイアログを作る
			var newLessonCreateDialog = new dialogEx(
					ADMIN_NEWLESSON_CREATE_DIALOG_PATH, 
					dialogExOption[ADMIN_NEW_LESSON_CREATE].argumentObj, 
					dialogExOption[ADMIN_NEW_LESSON_CREATE].returnObj);
			//ダイアログを開くときのテーブルの値を編集して表示する
			//memberReservedConfirmDialog.setCallbackOpen(reservedLessonListDialogOpenFunc);
			newLessonCreateDialog.setCallbackClose(newLessonEntry);	//閉じるときのイベントを登録
			newLessonCreateDialog.run();	//主処理を走らせる。
		});
	}
	
		/*
		 * 関数名:checkBeforeConvertJsonString
		 * 概要  :オブジェクト内のJSON文字列に変換できない値を持つノードを削除する。
		 * 引数  :Object object:JSON文字列にに変換する予定のオブジェクト
		 * 戻り値:Object:JSON文字列に変換できない要素を持つキーを削除した引数のオブジェクトを返す
		 * 作成日:2015.08.09
		 * 作成者:T.Masuda
		 */
		this.checkBeforeConvertJsonString = function(object){
			var retObject = $.extend(true, {}, object);	//返却するオブジェクトを用意する
			
			//オブジェクトを走査する
			for(key in retObject){
				//keyのvalueキーに入っている値が文字列、数値でなければ
				if(retObject[key].value !== void(0) && 
						!(typeof retObject[key].value == STRING 
						|| typeof retObject[key].value == NUMBER)){
					delete retObject[key];	//該当するノードを削除する
				//キーがdb_getQuery、db_setQueryであり、テキストがvalueにセットされていたら
				} else if(key.indexOf('db_') != -1 
						&& key.indexOf('Query') != -1 
						&& commonFuncs.checkEmpty(retObject[key].value)){
					//階層を上げて、JSONDBManagerで利用するためのノードの構成にする(このキーの値はvalueであってはいけない)
					retObject[key] = retObject[key].value;
				}
			}
			
			return retObject;	//チェックが終わったオブジェクトを返す
		}

		/*
		 * 関数名:updateUserName
		 * 概要  :会員画面ヘッダー内のユーザ名を更新する
		 * 引数  :なし
		 * 戻り値:なし
		 * 作成日:2015.12.12
		 * 作成者:T.Masuda
		 */
		this.updateUserName = function() {
			//ユーザ情報のテキストをDBから取得する
			this.getJsonFile('jsp/GetJSONString.jsp', create_tag.json['accountHeader'], 'accountHeader');
			//ユーザ名を取り出す
			var updatedUserName = this.json.accountHeader.memberStatus.memberName.user_name.text;
			//ヘッダー内のユーザ名を更新する
			$('.memberName > .user_name', CURRENT_WINDOW_MAIN).text(updatedUserName);
		}
		
		/*
		 * 関数名:guestLogin
		 * 概要  :一時的なDBアクセスのためにゲストログインを行う
		 * 引数  :なし
		 * 戻り値:なし
		 * 作成日:2015.12.26
		 * 作成者:T.Masuda
		 */
		this.guestLogin = function() {
			//ログインの準備を行う
			try {
				//ログイン用のJSONファイルを読み込む
				this.getJsonFile(PATH_LOGIN_DIALOG_JSON);
				
				//ゲストログイン情報をセットする
				this.json[KEY_LOGIN][KEY_LOGIN_ID][VALUE] = GUEST_ID;
			   	this.json[KEY_LOGIN][KEY_LOGIN_PASSWORD][VALUE] = GUEST_PASS;
			   	
				//サーバにアクセスし、ログイン処理を行う
		 		this.getJsonFile(URL_GET_JSON_STRING_JSP, this.json[KEY_LOGIN], KEY_LOGIN);
		 		//DBから取得したログイン処理の結果をオブジェクトにまとめる
		 		var resultObj = {userId: this.json.login[ID][STR_TEXT], authority: this.json.login.authority[STR_TEXT]};
		 		
		 		//ログインに失敗してたら
		 		if (resultObj.userId == EMPTY_STRING || resultObj.authority == EMPTY_STRING) {
		 			//例外を投げて処理を止める
		 			throw new Error();
		 		}
			} catch (e) {
				//エラーオブジェクトにメッセージが入っていれば
				if (e && e instanceof String) {
					//エラーメッセージを新たなエラーオブジェクトに渡して上位に例外を投げる
					throw new Error(e);
				//エラーオブジェクトにメッセージが入っていなければ
				} else {
					//規定のエラーメッセージをエラーオブジェクトに渡して上位に例外を投げる
					throw new Error(FAIL_TO_CONNECT_MESSAGE);
				}
			}
			
		}
		
		/*
		 * 関数名:guestLogin
		 * 概要  :ゲストログイン状態が不要になった時にログアウトを行う
		 * 引数  :なし
		 * 戻り値:なし
		 * 作成日:2015.12.26
		 * 作成者:T.Masuda
		 */
		this.guestLogout = function() {
			//日付クラスインスタンスを生成する。
			var cookieLimit = new Date();
			//現在の日付にクッキーの生存時間を加算し、cookieLimitに追加する。
			cookieLimit.setTime(0);
			
			//Ajax通信を行い、ログアウト処理を行う。
			$.ajax({
				//ログアウト処理を呼び出す
				url:LOGOUT_URL,
				async:false,	//同期通信を行う
				success:function(){	//通信成功時の処理
					//cookieを消去する
					document.cookie = DELETE_COOKIE_FRONT + cookieLimit.toGMTString() + DELETE_COOKIE_REAR  + cookieLimit.toGMTString() + ';';
				},
				error:function(xhr,status,error){	//通信エラー時
					//エラーメッセージを出す
					alert(FAIL_TO_CONNECT_MESSAGE);
				}
			});
		}
	 
		/*
		 * 関数名:guestLoginAndProcedure
		 * 概要  :ゲストログインを行い処理を行う
		 * 引数  :function procedure : ゲストログイン中に行う処理
		 * 戻り値:なし
		 * 作成日:2015.12.26
		 * 作成者:T.Masuda
		 */
		this.guestLoginAndProcedure = function(procedure) {
			//ゲストログインを行う
			this.guestLogin();
			//必要な処理を行う
			procedure();
			//ログアウトする
			this.guestLogout();
		}
		
		/*
		 * 関数名:doGuestLoginProcedure
		 * 概要  :必要ならゲストログインを行い処理を行う。必要なければそのまま処理を行う
		 * 引数  :function procedure : ログイン中に行う処理
		 * 戻り値:なし
		 * 作成日:2015.12.26
		 * 作成者:T.Masuda
		 */
		this.doGuestLoginProcedure = function(procedure) {
			//未ログイン状態なら
			if (!commonFuncs.checkEmpty(commonFuncs.GetCookies().userId)) {
				//ゲストログインを行った上で処理を行う
				this.guestLoginAndProcedure(procedure);
			//ログイン中なら
			} else {
				//そのまま関数をコールする
				procedure();
			}
		}		
		
		/*
		 * 関数名:loadTableData
		 * 概要  :テーブルのデータを取得して描画する
		 * 引数　:String tableKey : 対象テーブルのcreateTagメンバJSON内のキー
		 * 		 int startPage:表示する1つ目のナンバリングの数
		 * 		 int displayPageMax:表示するナンバリングの最大数
		 * 		 int displayPage:表示するブログのページ番号
		 * 		 int pageNum:1ページに表示する記事数。
		 *   　　:String target : 対象テーブルのセレクタ
		 * 　　  :String callback : テーブルリロード後にコールされる関数名
		 * 　　  :String getCreateTag : ナンバリングのタグのonclickでのcreateTag再取得のための文字列。
		 * 　　　　例）"$('#lecturePermitList')[0]." ※jQueryオブジェクトは配列であるため、0番目を指定しないとメンバの取得ができない
		 * 　　  :Object values : データ取得用の値をまとめたオブジェクト
		 * 戻り値:なし
		 * 作成日:2015.1230
		 * 作成者:T.Masuda
		 */
		this.loadTableData = function(tableKey, startPage, displayPageMax, displayPage, pageNum, target, callback, getCreateTag, values) {
			//テーブルデータを一度空にする
			this.json[tableKey][TABLE_DATA_KEY] =[];
			
			//データ取得用の値のオブジェクトがセットされていたら
			if (values) {
				//オブジェクトを走査して
				for (key in values) {
					//jsonに値をセットする
					this.json[tableKey][key][VALUE] = values[key];
				}
			}
			
			//当該関数の引数にテーブルデータ取得に必要な値がセットされていたら
			if(values) {
				//JSONに値をセットしていく
				for (key in values) {
					//実際にデータをセットしていく
					this.json[tableKey][key][VALUE];
				}
			}
			
			//テーブルデータを取得する
			this.getJsonFile(URL_GET_JSON_ARRAY_JSP, this.json[tableKey], tableKey);
			//テーブルを作る
			this.outputNumberingTag(tableKey, startPage, displayPageMax, displayPage, pageNum, target, callback, getCreateTag);
		}

		/*
		 * 関数名:isAdminLoginToMemberPage
		 * 概要  :会員画面へ管理者ログインしているかの判定を返す
		 * 引数　:なし
		 * 戻り値:boolean : 管理者ログインしているか
		 * 作成日:2016.0417
		 * 作成者:T.Masuda
		 */
		this.isAdminLoginToMemberPage = function(){
			//ログイン情報が乗っているため、cookieを取得する
			var cookies = commonFuncs.GetCookies();
			//管理者ログイン用IDがcookieにセットされているかを判定して返す
			return commonFuncs.checkEmpty(cookies.otherUserId);
		}
	
	/* 
	 * 関数名:setTogglePosition
	 * 概要  :フォーカス時に指定したposition、高さを設定して、フォーカスが外れたら設定を無効にするようにする
	 *       主にmultipleのセレクトメニューでフォーカス時に内容を全て出すようにするようにするときに使う
	 * 引数  :
	 * 返却値  :
	 * 作成者:T.Masuda
	 * 作成日:2016.04.30
	 * 変更者:R.Shibata
	 * 変更日:2016.09.19
	 * 内容  :PCとスマートフォンの差を吸収するため、フォーカスが外れたときはセレクトボックスの表示をしないようにする設定を追加
	 *       :内容が一部画面の物だったのでcreateLittleContentへ移動
	 */
	this.setTogglePosition = function(parent, target, position, height){
		// 親タグの内のターゲットタグがフォーカスされた時のイベントをバインドする
		$(parent).on(EVENT_FOCUS, target, function(){
			//バインドされた要素のcssを変更する
			$(this).css({
				height 		: height 	// 高さを指定された高さに設定する
				,position 	: position 	// 位置を指定された位置に設定する
			})
		});
		// 親タグの内のターゲットタグからフォーカスが外れた時のイベントをバインドする
		$(parent).on(EVENT_BLUR, target, function(){
			//バインドされた要素のcssを変更する
			$(this).css({
				height 		: EMPTY_STRING 	// 高さを初期設定に戻すr
				,position 	: EMPTY_STRING 	// 位置を初期設定に戻す
				,display 	: NONE 			// 画面表示をしないようにする
			})
		});
	}

	/* 
	 * 関数名:changeTypeToButton
	 * 概要  :ターゲットのタイプをボタンに変更する
	 * 引数  :parent:親要素のセレクタ
	 *       :target:ボタンに置換する対象のセレクタ
	 * 返却値  :無し
	 * 作成者:R.Shibata
	 * 作成日:2016.09.19
	 */
	this.changeTypeToButton = function(parent, target){
		var $btn = $(HTML_BUTTON); // 置き換えるためのボタンを作成する
		var cls = $(parent + SPACE + target).attr(CLASS);				// 置換するため、ターゲットのクラス名を退避する
		var txt = $(parent + SELECTOR_FIRST + SPACE + target ).text();	// 置換するため、ターゲットのテキストを退避する
		// 作成したボタンのクラスを設定する
		$btn.addClass(cls)
		// 作成したボタンのテキストを設定する
		$btn.text(txt)
		// ターゲットを作成したボタンに置き換える
		$(parent + SPACE + target).replaceWith($btn);

	}

	/* 
	 * 関数名:setThemeClickEvent
	 * 概要  :テーマ選択画面の要素に対するクリックイベントを追加する。
	 * 引数  :parent:親要素のセレクタ
	 *       :selectbox:テーマを選択するセレクトボックスのセレクタ
	 *       :target:クリックイベントをバインドする対象のセレクタ
	 * 返却値  :無し
	 * 作成者:R.Shibata
	 * 作成日:2016.09.19
	 */
	this.setThemeClickEvent = function(parent, selectbox, target){
		// 親タグの内のターゲットタグがクリックされた時のイベントをバインドする
		$(parent).on(CLICK, target, function(){
			//指定されたセレクトボックスのcssを変更する
			$(selectbox).css({
				display : EMPTY_STRING // 画面表示を初期設定に戻す(画面表示させる)
			})
			// セレクトボックスにフォーカスを移動させる
			$(selectbox).focus();
		});
	}

	/* 
	 * 関数名:setCssDisplayNone
	 * 概要  :指定した要素の表示形式をnoneに設定する
	 * 引数  :selector:表示形式を変更したい要素のセレクタ
	 * 返却値  :無し
	 * 作成者:R.Shibata
	 * 作成日:2016.09.19
	 */
	this.setCssDisplayNone = function(selector){
		// 指定されたセレクトボックスの初期設定を変更する
		$(selector).css({
			display : NONE // 初期状態は画面表示をしないように変更する
		})
	}

	/* 
	 * 関数名:setThemeTextFromSelectBox
	 * 概要  :テーマを選択するセレクトボックスの値により、何が選択されたかをテキストに表示する
	 * 引数  :parent:親要素のセレクタ
	 *       :selectbox:選択されたテーマを取得するセレクトボックスのセレクタ
	 *       :target:値を表示させる対象のセレクタ
	 * 返却値  :無し
	 * 作成者:R.Shibata
	 * 作成日:2016.09.16
	 */
	this.setThemeTextFromSelectBox = function(parent, selectbox, target){
		// 親タグの内のターゲットタグの値が変更された時のイベントをバインドする
		$(parent).on(CHANGE, selectbox, function(){
			var selector = parent + SPACE + selectbox; // セレクタを加工し変数へセットする
			// セレクタに対する値を取得し、値があれば
			if ($(selector).val() != null){
				// 値をカンマで結合し、テキストへ表示させる
				$(target).text($(selector).val().join());
			// 値が無い場合
			}else{
				// ブランクをセットする
				$(target).text(EMPTY_STRING);
			}
		});
	}

}	//createLittleContentsクラスの終わり

createLittleContents.prototype = new createTag();
//サブクラスのコンストラクタを有効にする
createLittleContents.prototype.constructor = createTag;


//Datepickerの日本語用設定。
dpJpSetting = {
		closeText: '閉じる',
		prevText: '&#x3c;前',
		nextText: '次&#x3e;',
		currentText: '本日',
		monthNames: ['1月','2月','3月','4月','5月','6月',
		             '7月','8月','9月','10月','11月','12月'],
		             monthNamesShort: ['1月','2月','3月','4月','5月','6月',
		                               '7月','8月','9月','10月','11月','12月'],
		                               dayNames: ['日曜日','月曜日','火曜日','水曜日','木曜日','金曜日','土曜日'],
		                               // dayNamesShort: ['日','月','火','水','木','金','土'],
		                               // dayNamesMin: ['日','月','火','水','木','金','土'],
		                               weekHeader: '週',
		                               dateFormat: 'yy/mm/dd',
		                               firstDay: 0,
		                               isRTL: false,
		                               showMonthAfterYear: true,
		                               yearSuffix: '年'};

//Datepickerによるカレンダー作成時に関数に渡すオプションをまとめた連想配列を定義する
calendarOptions = {};

//ブログページのカレンダーの設定
calendarOptions['blog'] = {
		// カレンダーの日付を選択したら
		onSelect: function(dateText, inst){
			this.instance.create_tag.dateText = dateText;
			//絞り込まれたブログ記事を書き出す
			this.instance.create_tag.outputNumberingTag('blogTable', 1, 4, 1, BLOG_SHOW_PAGES, '.blogArticles', 'create_tag.createMyBlogImages(\'.blogTable\')')
		},
		//日付有効の設定を行う。配列を返し、添字が0の要素がtrueであれば日付が有効、falseなら無効になる
		beforeShowDay:function(date){
			var retArray = [true];	//返却する配列を宣言、添字0の要素をtrueで初期化する
			
			if(this.instance !== void(0)){
				//@add 2015.0604 T.Masuda 日付が用意されていなければ処理しないようにしました
				retArray = this.instance.putDisableDate(date, this.dateArray);
			}
			
			//結果の配列を返す
			return retArray;
		}
	}


//マイブログページのカレンダー。ブログ用オプションを継承する
calendarOptions['myBlog'] = $.extend(true, {}, calendarOptions['blog'], {
		// カレンダーの日付を選択したら
		onSelect: function(dateText, inst){
			//日付をcreateTagに渡して日付絞り込みを有効にする
			this.instance.create_tag.dateText = dateText;
			//絞り込まれたブログ記事を書き出す
			this.instance.create_tag.outputNumberingTag('myBlogTable', 1, 4, 1, BLOG_SHOW_PAGES, '.blogArticles', 'create_tag.createMyBlogImages(\'.myBlogTable\');create_tag.setBlogEditButtons');	
		}
	});

//マイギャラリーページのカレンダー。ブログ用オプションを継承する
calendarOptions['myGallery'] = $.extend(true, {}, calendarOptions['blog'], {
	// カレンダーの日付を選択したら
	onSelect: function(dateText, inst){
		//日付をcreateTagに渡して日付絞り込みを有効にする
		this.instance.create_tag.dateText = dateText;
		//絞り込まれたブログ記事を書き出す
		this.instance.create_tag.outputNumberingTag('myGalleryTable', 1, 4, 1, MYGALLERY_SHOW_NUMBER, '.galleryArea', 'create_tag.createMyGalleryImages');	
	}
});

//マイギャラリーページのカレンダー。ブログ用オプションを継承する
calendarOptions['gallery'] = $.extend(true, {}, calendarOptions['blog'], {
	// カレンダーの日付を選択したら
	onSelect: function(dateText, inst){
		//日付をcreateTagに渡して日付絞り込みを有効にする
		this.instance.create_tag.dateText = dateText;
		//絞り込まれたブログ記事を書き出す
		this.instance.create_tag.outputNumberingTag(GALLERY_TABLE, 1, 4, 1, MYGALLERY_SHOW_NUMBER, '.galleryArea', 'create_tag.createMyGalleryImages');	
	}
});

//マイページの予約カレンダー
calendarOptions['myPageReserved'] = {
		// カレンダーの日付を選択したら
		onSelect: function(dateText, inst){
			// 開発中のメッセージを出す。
			alert('現在この機能は開発中となっています。');
		},
		maxDate:this.dateRange,	//今日の日付を基準にクリック可能な期間を設定する。
		minDate:1			//過去はクリックできなくする。
	}

//予約ダイアログ
calendarOptions['reserved'] = {		//カレンダーを作る。
		// カレンダーの日付を選択したら
		onSelect: function(dateText, inst){
			// 予約のダイアログを出す。
			this.instance.callReservedDialog(dateText, $(this));
		},
		maxDate:this.dateRange,	//今日の日付を基準にクリック可能な期間を設定する。
		minDate:1			//今日以前はクリックできなくする。
	}

//会員ダイアログ
calendarOptions['member'] = {		//カレンダーを作る。
		// カレンダーの日付を選択したら
		onSelect: function(dateText, inst){
			//@mod 20150809 T.Masuda 改修したdialogExクラスに対応しました
			//汎用のダイアログ用オブジェクトをコピーする
			var sendObject = $.extend(true, {}, commonFuncs.getDefaultArgumentObject());
			
			//予約授業一覧ダイアログにカレンダーをクリックした日付の値を渡すための連想配列を作り、ダイアログのタイトルを日付に設定する
			var dateObject = commonFuncs.lessonListDialogSendObject(dateText);
			
			//createTagがセットできていなかった場合はここで取得してセットする
			this.instance.create_tag = commonFuncs.checkEmpty(this.instance.create_tag) ?
					this.instance.create_tag : $('#alreadyReserved')[0].create_tag;
			//会員番号をセットしてどのユーザが予約するのかを識別する
			var dialogDataObject = this.instance.create_tag.addUserIdToObject(dateObject);
			
			//ページ内にある会員の予約状況のテーブルをダイアログから更新するため、
			//dialogDataObjectにcreateLittleContentsクラスインスタンスをセットして以後リレーしていく
			dialogDataObject.create_tag = this.instance.create_tag;
			
			//ダイアログに渡すデータをdialogExOptionのオブジェクトにセットする
			$.extend(true, sendObject.data, dialogDataObject);
			//@mod 20150829 T.Masuda ダイアログのタイトルをここでセットするように変更しました
			//ダイアログのタイトルをセットする
			sendObject.config.title = sendObject.data.dateJapanese;
			
			//予約授業一覧ダイアログを作る
			var reservedLessonListDialog = new dialogEx(
					DIALOG_RESERVE_LESSON_LIST, 
					sendObject
					);
			//ダイアログが開いたときのコールバック関数を指定する。
			//callOpenDialog(現状はdispContents関数をコールするようになっている)をコールさせる
			reservedLessonListDialog.run();	//主処理を走らせる。
			var thisElem = this;
			//一旦日付のハイライトが消えるので付け直す
			setTimeout(function(){thisElem.instance.changeExistLessonDate();}, 100);
			this.instance.monthDates = [];	//monthDatesを初期化する
		},
		//日付有効の設定を行う。配列を返し、添字が0の要素がtrueであれば日付が有効、falseなら無効になる
		beforeShowDay:function(date){
			//その月の日付を配列にセットしていく
			this.instance.setMonthDates(date);
			//日付を無効にするということはないのでtrueを入れた配列を返す
			return [true];
		},
		onChangeMonthYear : function(year, month, inst){
			this.instance.monthDates = [];
			var thisElem = this;		//自身の要素を変数に保管する
			//beforeShowDayが終わった後
			setTimeout(function(){
				thisElem.instance.changeExistLessonDate();
			}, CALENDAR_SHOW_DELAY);
		},
		maxDate:this.dateRange,	//今日の日付を基準にクリック可能な期間を設定する。
		minDate:1				//過去はクリックできなくする。
	}

//管理者ダイアログ
calendarOptions['admin'] = {		//カレンダーを作る。
	// カレンダーの日付を選択したら
	onSelect: function(dateText, inst){
		//@mod 20150809 T.Masuda 改修したdialogExクラスに対応しました
		var instance = this.instance;	//カレンダーのクラスインスタンスを取得する
		//デフォルト設定のダイアログ用インプットデータのオブジェクトをコピーする
		var sendObject = $.extend(true, {}, commonFuncs.getDefaultArgumentObject());
		//授業一覧ダイアログにカレンダーをクリックした日付の値を渡すための連想配列を作り、ダイアログのタイトルを日付に設定する
		var dataObject = commonFuncs.lessonListDialogSendObject(dateText);
		//ページ内にある管理者の予約状況のテーブルをダイアログから更新するため、
		//dataObjectにcreateLittleContentsクラスインスタンスをセットして以後リレーしていく
		dataObject[VAR_CREATE_TAG] = instance[VAR_CREATE_TAG];
		//ダイアログに渡すデータをdialogExOptionのオブジェクトにセットする
		$.extend(true, sendObject.data, dataObject);
		//@mod 20150829 T.Masuda ダイアログのタイトルをここでセットするように変更しました
		//ダイアログのタイトルをセットする
		sendObject.config.title = sendObject.data.dateJapanese;

		//授業一覧ダイアログを作る
		var lessonListDialog = new dialogEx(ADMIN_LESSON_LIST_DIALOG, sendObject);
		//ダイアログが開いたときのコールバック関数を指定する。
		//callOpenDialog(現状はdispContents関数をコールするようになっている)をコールさせる
		lessonListDialog.setCallbackOpen(commonFuncs.callOpenDialog);
		lessonListDialog.setCallbackClose(function(){this.instance.destroy();$('.adminCalendar')[0].instance.changeExistLessonDate();});
		lessonListDialog.run();	//主処理を走らせる。
		var thisElem = this;
		//一旦日付のハイライトが消えるので付け直す
		setTimeout(function(){thisElem.instance.changeExistLessonDate();}, 100);
		// 2016.09.09 add k.urabe 当該月の日付配列の初期化処理を追加
		this.instance.monthDates = [];
	},
	//日付有効の設定を行う。配列を返し、添字が0の要素がtrueであれば日付が有効、falseなら無効になる
	beforeShowDay:function(date){
		//その月の日付を配列にセットしていく
		this.instance.setMonthDates(date);
		
		//日付を無効にするということはないのでtrueを入れた配列を返す
		return [true];
	},
	onChangeMonthYear : function(year, month, inst){
		this.instance.monthDates = [];		//月の日付を初期化する
		var thisElem = this;		//自身の要素を変数に保管する
		//beforeShowDayが終わった後
		setTimeout(function(){
			thisElem.instance.changeExistLessonDate();
		}, CALENDAR_SHOW_DELAY);
	}
}

/*
 * クラス名:calendar
 * 引数  :string selector:カレンダーにするタグのセレクタ
 * 戻り値:なし
 * 概要  :カレンダーを作る
 * 作成日:2015.06.10
 * 作成者:T.Masuda
 */
function calendar(selector) {
	//コンストラクタの引数をメンバに格納する
	this.selector = selector;
	this.calendarName = '';	//カレンダー名を設定する
	//カレンダー自身のDOMを取得する
	this.dom = selector ? $(selector)[0] : {};
	this.dom.instance = this;	//クラスインスタンスへの参照をDOMにセットする
	
	this.calendarOptions = {};	//オプションをオブジェクトで記述する
	
	//datepickerの日本語設定を行う
    $.datepicker.regional['ja'] = dpJpSetting;	
	$.datepicker.setDefaults($.datepicker.regional['ja']);

	/* 
	 * 関数名:create
	 * 概要  :カレンダーを作る処理
	 * 引数  :なし
	 * 返却値 :なし
	 * 作成者:T.M
	 * 作成日:2015.06.10
	 */
	this.create = function(){
			
		$(selector).datepicker(this.calendarOptions);
	}
	
	/*
	 * 関数名:callReservedDialog
	 * 引数  :String dateText:日付テキスト
	 *     :jQuery calendar:カレンダーの要素
	 * 戻り値:なし
	 * 概要  :ページに対応した予約ダイアログを生成する。
	 * 作成日:2015.02.10
	 * 作成者:T.M
	 * 修正日:2015.04.17
	 * 修正者:T.M
	 * 内容 :カレンダーのタグからコンテンツ名を取得するようにしました。
	 */
	this.callReservedDialog = function (dateText, calendar){
		// カレンダーからコンテンツ名を取得する。
		var contentName = calendar.attr('name');
		//日付文字列をオブジェクトにする。同時に日本語のデータにする
		var dateObject = commonFuncs.lessonListDialogSendObject(dateText)
		//ダイアログへのデータインプットに使うオブジェクトを生成する
		var argumentObj = $.extend(true, {}, commonFuncs.getDefaultArgumentObject());
		$.extend(true, argumentObj.data, {contentName: contentName}, dateObject);
		//幅とタイトルをセットする
		$.extend(true, argumentObj.config, {width: INT_300, title:dateObject.dateJapanese});
		
		// 予約希望ダイアログを作成する。引数のオブジェクトに日付データ配列、コンテンツ名を渡す
		var reservedDialog = new dialogEx('dialog/experienceReservedDialog.html', argumentObj);
		//閉じたら完全にダイアログを破棄させる
		reservedDialog.setCallbackClose(reservedDialog.destroy);
		reservedDialog.run();	//ダイアログを開く
	}

	/*
	 * 関数名:callMemberDialog
	 * 引数  :String dateText:日付テキスト
	 *     :jQuery calendar:カレンダーの要素
	 * 戻り値:なし
	 * 概要  :ページに対応した予約ダイアログを生成する。
	 * 作成日:2015.02.10
	 * 作成者:T.Yamamoto
	 */
	this.callMemberDialog = function(dateText, calendar){
		// カレンダーからコンテンツ名を取得する。
		var contentName = calendar.attr('name');
		// 日付配列を取得する。
		var date = createDateArray(dateText)
		// 予約希望ダイアログを作成する
		 var mDialog = new memberDialog('memberDialog',date,null, contentName, date);
		mDialog.open();	//ダイアログを開く
	}

	/*
	 * 関数名:putDisableDate(date, dateArray)
	 * 引数  :Date date: 日付
	 *     :Array dateArray: 日付の配列
	 * 戻り値:Array:DatepickerのbeforeShowDayで要求されるbooleanの配列を返す
	 * 概要  :配列に該当する日付があるかのチェックを行い、判定を返す
	 * 作成日:2015.06.04
	 * 作成者:T.Masuda
	 */
	this.putDisableDate = function(date, dateArray){
		var retArray = [false];					//返却する配列を作る。
		//日付が用意されていたら
		if(dateArray != null){
			var ymd = this.createYMD(date);				//日付の配列を作る。
			var dArrayLength = dateArray.length;	//日付配列の要素数を取得する。
				
			//日付配列を走査する。
			for(var i = 0; i < dateArray.length; i++){
				//合致する日付があれば
				if(this.compareYMD(ymd, this.createYMD(dateArray[i]))){
					retArray[0] = true;	//その日付を無効にする。
				}
			}
		//日付の配列が用意されていなければ
		} else {
			retArray[0] = true;	//日付を有効にする
		}
		
		return retArray;	//判定の配列を返す。
	}
	
	/*
	 * 関数名: extractDateArray(map)
	 * 引数  :map map: 処理対象とする連想配列。
	 * 戻り値:Array:日付型の配列。
	 * 概要  :blogのJSONから日付型の配列を作る。現状ではblogcontent.jsonの形式にあわせる。
	 * 作成日:2015.04.19
	 * 作成者:T.Masuda
	 */
	this.extractDateArrayForBlog = function(map){
		var retArray = [];		//返却するための配列を用意する。
		//キーが数字かどうかのチェックを行いながら走査する。
		for(key in map){
			//キーが数字であれば
			if(!(isNaN(key))){
				//日付のキーを取得して配列に格納する。
				retArray.push(new Date(map[key].blogArticleTitle.blogArticleDate.text));
			}
		}
		
		return retArray;	//配列を返す。
	}
	
	/*
	 * 関数名: extractDateArray(map)
	 * 引数  :map map: 処理対象とする連想配列。
	 * 戻り値:Array:日付型の配列。
	 * 概要  :blogのJSONから日付型の配列を作る。現状ではblogcontent.jsonの形式にあわせる。
	 * 作成日:2015.04.19
	 * 作成者:T.Masuda
	 */
	this.extractDateArray = function(array){
		var retArray = [];		//返却するための配列を用意する。
		//キーが数字かどうかのチェックを行いながら走査する。
		for(var i = 0; i < array.length; i++){
			//日付を取得して配列に格納する。
			retArray.push(new Date(array[i].date));
		}
		
		return retArray;	//配列を返す。
	}
	
	/*
	 * 関数名:createYMD(date)
	 * 引数  :Date date: 日付。
	 * 戻り値:Array:年月日の配列。
	 * 概要  :日付型から年月日の配列を作って返す。
	 * 作成日:2015.04.19
	 * 作成者:T.Masuda
	 */
	this.createYMD = function(date){
		var retArray = [];	//返却する配列を作成する。
		
		retArray.push(date.getFullYear());				//年を取得する。
		retArray.push(date.getMonth() + 1);				//月を取得する。
		retArray.push(date.getDate());					//日を取得する。
		
		return retArray;	//配列を返す。
	}

	/*
	 * 関数名: compareYMD(target1, target2)
	 * 引数  :Array target1: 比較対象1。
	 *     :Array target2: 比較対象2。
	 * 戻り値:boolean:日付が同じかどうかの判定を返す。
	 * 概要  :2つの日付型の配列が同じかどうかを判定して結果を返す。
	 * 作成日:2015.04.19
	 * 作成者:T.Masuda
	 */
	this.compareYMD = function(target1, target2){
		var retBoo = true;	//返す真理値を格納する配列を用意する。
		
		var ymdLength = target1.length;	//日付の構成要素の数を取得する。
		
		//2つの日付を走査する。
		for(var i = 0; i < ymdLength; i++){
			if(target1[i] != target2[i]){	//日付が違ったら
				retBoo = false;				//false判定を返す。
				break;						//ループを抜ける。
			}
		}
		
		return retBoo;	//判定を返す。
	}
	
	/*
	 * 関数名:setCallCalendar(selector)
	 * 引数  :string selector:カレンダーと関連づける要素のセレクタ。
	 * 戻り値:なし
	 * 概要  :指定した要素をクリックしてカレンダーを呼ぶようにする。
	 * 作成日:2015.03.26
	 * 作成者:T.Y
	 */
	this.setCallCalendar = function(selector) {
			//datepickerの日本語表示設定。
	        $.datepicker.regional['ja'] = dpJpSetting;
			$.datepicker.setDefaults($.datepicker.regional['ja']);
	
	        $(selector).datepicker();
	}
	
	/*
	 * 関数名:function checkDate(dateText, calendar)
	 * 引数  :string dateText:日付のテキスト。
	 *     :element calendar:この関数をコールしたdatepicker。
	 * 戻り値:booelan:判定結果を返す。
	 * 概要  :選択したカレンダーの日付が今日より前かどうかをチェックすり。
	 * 作成日:2015.04.10
	 * 作成者:T.Masuda
	 */
	this.checkDate = function(dateText, calendar){
		var retBoo = true;	//返却値を格納する変数を宣言、trueで初期化する。
		//予約カレンダーであれば
		if(calendar.hasClass('reservedCalendar')){
			//本日の日付のインスタンスを生成する。
			var today = new Date();
			//本日の0時0分0秒の日付を作成する。
			var today = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
			
			//選択した日付のインスタンスを生成する。
			var selectedDay = new Date(dateText);
			//今日より前の日付なら
			if(today.getTime() > selectedDay.getTime()){
				retBoo = false;	//falseを返すようにする。
			}
		}
		
		return retBoo;	//retBooを返す。
	}

	/*
	 * 関数名:sortLessonDateArray
	 * 引数  :Array lessonDateArray : 並び替え対象の授業日配列
	 * 戻り値:なし
	 * 概要  :授業日付の配列を昇順に並び替える
	 * 作成日:2016.09.20
	 * 作成者:k.urabe
	 */
	this.sortLessonDateArray = function(lessonDateArray){

		// 授業日の配列を昇順にソート
		lessonDateArray.sort(function(val1, val2){
			// 配列内の前要素が小さいか判定
			if(val1.lesson_date < val2.lesson_date) {
				return -1;
			}
			// 配列要素の後要素が小さいか判定
			if(val2.lesson_date < val1.lesson_date) {
				return 1;
			}
			// 2つの日付が等しいためそのまま
			return 0;
		});
		
	}

	/*
	 * 関数名:getLessonDateArray
	 * 引数  :object appendTo : 追加先のオブジェクト
	        :String fromDate : 当該月の初日
	        :String toDate : 当該月の最終日
	        :String userKey : ユーザID
	 * 戻り値:なし
	 * 概要  :授業がある日付の配列を取得する
	 * 作成日:2016.09.20
	 * 作成者:k.urabe
	 */
	this.getLessonDateArray = function(appendTo, fromDate, toDate, userKey){

		// 追加先のオブジェクトに当該月の初日を設定
		this.create_tag.json[appendTo].fromDate.value = fromDate;
		// 追加先のオブジェクトに当該月の最終日を設定
		this.create_tag.json[appendTo].toDate.value = toDate;
		// 追加先のオブジェクトに当該月の授業日配列を得るための空配列を準備
		this.create_tag.json[appendTo].tableData = [];
		// 呼び出し元からユーザIDを受け取っているか判定
		if(userKey !== void(0)) {
			// ユーザの予約授業日を取得するため、追加先のオブジェクトにユーザIDを設定
			this.create_tag.json[appendTo].user_key.value = userKey;
		}

		// 授業日を配列で取得
		this.create_tag.getJsonFile(URL_GET_JSON_ARRAY_JSP, this.create_tag.json[appendTo], appendTo);

		// 取得した授業日配列を念のためソート
		this.sortLessonDateArray(this.create_tag.json[appendTo].tableData);
	}

	/*
	 * 関数名:changeExistLessonDate
	 * 引数  :なし
	 * 戻り値:なし
	 * 概要  :授業がある日付をハイライトする
	 * 作成日:2016.04.19
	 * 作成者:T.Masuda
	 * 変更日:2016.09.13
	 * 変更者:k.urabe
	 * 内容:管理者の授業詳細にて、当該日の授業がすべて削除された場合のハイライト処理に対応
	 */
	this.changeExistLessonDate = function(){

		// 当該月の授業日配列を取得
		this.getLessonDateArray('searchClassworkExist', this.monthDates[0], this.monthDates[this.monthDates.length - 1]);
		// 存在する授業日付の数を取得する
		var lessonLength = this.create_tag.json.searchClassworkExist.tableData.length;

		// 授業が存在する年月日を格納するための変数
		var lessonDayAll = null;
		// 授業が存在する日付を格納するための変数
		var lessonDay = null;
		// 授業日を走査するための変数
		var lessonDayCount = 0;
		// インスタンスを関数内で使用するため変数に参照を持たせる
		var thisElem = this;

		//当該月の日付を走査する
		$(STR_TD, this.dom).each(function() {
			// 当該日に現在付いているハイライト判定用のクラスを削除 2016.10.06 add k.urabe カレンダーがリロードされない限りクラス名が残ってしまう問題に対処
			$(this).removeClass(HIGHLIGHT_CLASS_NAME);

			// 授業有無および予約状況に合わせたハイライトを判定するための変数に初期値として「授業がない状態」を設定
			var userWorkStatus = NOT_LESSON;
			//カレンダーから日付を取得する
			var calendarDate = $(this).children('a').text();
			//日付が1桁なら0を詰める
			calendarDate = calendarDate.length > 1 ? calendarDate : '0' + calendarDate;

			// 授業日を取得していない場合、かつ当該月の授業日が残っているか判定
			if(!lessonDay && lessonDayCount < lessonLength && '01' <= calendarDate) {
				// 会員カレンダーの場合、現在月は1日から取得が始まらない場合があるため、1日を越えて走査が始まった場合の対処
				do {
					// 未取得であれば、授業日を取得
					lessonDayAll = thisElem.create_tag.json.searchClassworkExist.tableData[lessonDayCount].lesson_date;
					// 取得した授業日から日だけを抽出
					lessonDay = lessonDayAll.substr(8, 2);
					// 授業日走査用の値をインクリメント
					lessonDayCount++;
				// 当月のカレンダー開始日が1日を越えていた場合、授業日の取得を同日もしくは未来日まで進める
				} while(lessonDay < calendarDate);
			}

			// 走査中のカレンダー日付と取得している授業日が一致するか検証
			if(calendarDate == lessonDay) {
				// 授業がある日のステータスを設定
				userWorkStatus = DEFAULT_LESSON;

				// 会員の場合
				if(thisElem instanceof memberCalendar) {
					// 当該月のユーザIDが持つ予約授業日配列を取得
					thisElem.getLessonDateArray('checkClassworkStatus', thisElem.monthDates[0], thisElem.monthDates[thisElem.monthDates.length - 1], thisElem.userId);
					// 存在する予約授業日付を取得する
					var lessonDetail = thisElem.create_tag.json.checkClassworkStatus.tableData;

					// ユーザの予約授業配列を走査
					for (var j = 0; j < lessonDetail.length; j++) {
						// 授業日とユーザの予約授業日が一致するか検証
						if (lessonDetail[j].lesson_date == lessonDayAll) {
							// 予約状況の値を取り出す
							var recUserWorkStatus = lessonDetail[j].user_work_status;
							// 取得した予約状況の値が前より小さいなら
							if (recUserWorkStatus < userWorkStatus) {
								//現在の予約状態の値を更新する
								userWorkStatus = recUserWorkStatus;
							}
						}
					}
				}

				// 当該日のマッチングが完了したため、授業日にnullを再設定
				lessonDay = null;
			}

			// 当該日のハイライト処理を行う
			$(this).addClass(commonFuncs.getLessonStatusClassByPriority(userWorkStatus));

		});

	}
	
	/*
	 * 関数名:setMonthDates
	 * 引数  :Date date :日付型
	 * 戻り値:なし
	 * 概要  :日付を月の配列にセットしていく。1日目からチェックしていき、別の月の日付が後から入ってきたら弾く
	 * 作成日:2016.04.19
	 * 作成者:T.Masuda
	 */
	this.setMonthDates = function(date) {
		
		//日付を文字列に変換する
		var dateStr = comDateFormat(date, DATEFORMAT_YYYY_MM_DD);
		//日付全体から日にち部分を切り出す
		var dayStr = dateStr.substr(8, 2);
		
		//日付が1日なら
		//	if (dayStr == '01' && $.inArray(this.instance.monthDates, dateStr) == -1) {
		//this.monthDates = [];	//monthDatesを初期化する
		//	}
		
		//その月の1日以降の日付であれば。その月以外の日付も入ってくることがあるのでその場合は弾く
		if((this.monthDates.length > 0)
				|| comDateFormat(date, DATEFORMAT_YYYY_MM_DD).substr(8, 2) == '01') {
			if(this.monthDates.length == 0 || dayStr >= this.monthDates[this.monthDates.length - 1].substr(8, 2)) {
				//日付を文字列にして月の日付一覧に追加していく
				this.monthDates.push(dateStr);
			}
		}
	}
	
	
}

/*
 * クラス名:reservedCalendar
 * 引数  :string selector:カレンダーにするタグのセレクタ
 *     :int dateRange:クリック可能な日付の期間
 * 戻り値:なし
 * 概要  :予約カレンダーを作る
 * 作成日:2015.06.10
 * 作成者:T.Masuda
 */
function reservedCalendar(selector, dateRange) {
	calendar.call(this, selector);	//スーパークラスのコンストラクタを呼ぶ
	this.calendarName = 'reserved';	//カレンダー名をセットする
	this.dateRange = dateRange;		//クリック可能な日付の期間の引数をメンバに格納する
	this.dom = $(selector)[0];		//DOMをメンバに保存する
	this.dom.instance = this;		//DOMにクラスインスタンスを保存する

	//オプションを設定する
	this.calendarOptions = calendarOptions['reserved'];
}

/*
 * クラス名:myPageReserved
 * 引数  :string selector:カレンダーにするタグのセレクタ
 *     :int dateRange:クリック可能な日付の期間
 * 戻り値:なし
 * 概要  :マイページのカレンダーを作る
 * 作成日:2015.06.10
 * 作成者:T.Masuda
 */
function myPageReservedCalendar (selector, dateRange) {
	calendar.call(this, selector);	//スーパークラスのコンストラクタを呼ぶ
	this.calendarName = 'myPageReserved';	//カレンダー名をセットする
	this.dateRange = dateRange;	//クリック可能な日付の期間の引数をメンバに格納する
	//オプションを設定する
	this.calendarOptions = calendarOptions['myPageReserved'];
}

/*
 * クラス名:memberCalendar
 * 引数  :string selector:カレンダーにするタグのセレクタ
 *     :int dateRange:クリック可能な日付の期間
 *     :int userId:ユーザID
 *     :createLittleContents create_tag:createLittleContentsクラスのインスタンス
 * 戻り値:なし
 * 概要  :マイページのカレンダーを作る
 * 作成日:2015.06.11
 * 作成者:T.Yamamoto
 * 変更日:2015.06.13
 * 変更者:T.Masuda
 * 変更日:2015.08.09
 * 変更者:T.Masuda
 * 内容	:dialogExクラス、createLittleContentsクラスの仕様に対応しました
 */
function memberCalendar(selector, dateRange, userId, create_tag) {
	calendar.call(this, selector);	//スーパークラスのコンストラクタを呼ぶ
	this.calendarName = 'member';	//カレンダー名をセットする
	$calendar = $(selector)[0];		//カレンダーの要素を取得する
	$calendar.instance = this;		//カレンダーの要素にクラスインスタンスへの参照を持たせる
	$calendar.calendar = this;		//クラスへの参照をカレンダーのタグにセットする
	$calendar.userId = userId;		//ユーザIDを保存する
	this.userId = userId;			//ユーザIDをクラスインスタンス内に保存する
	this.create_tag = create_tag;	//createLittleContentsクラスのインスタンスを利用する
	this.monthDates = [];			//月の日付
	
	//クリック可能な最大日付までの日数をオブジェクトにセットする
	calendarOptions[this.calendarName].maxDate = dateRange;
	//オプションを設定する
	this.calendarOptions = calendarOptions[this.calendarName];
}

/*
 * クラス名:adminCalendar
 * 引数  :string selector:カレンダーにするタグのセレクタ
 *     :element dialog:ダイアログへの参照
 *     :createTag create_tag:createTag、またはcreateTagのサブクラスのインスタンス
 * 戻り値:なし
 * 概要  :管理者のカレンダー
 * 作成日:2015.07.01
 * 作成者:T.Yamamoto
 * 修正日:2015.09.12
 * 修正者:T.Masuda
 * 概要	:第3引数(createTag)を追加しました
 */
function adminCalendar(selector, dialog, create_tag) {
	calendar.call(this, selector);	//スーパークラスのコンストラクタを呼ぶ
	this.calendarName = 'admin';	//カレンダー名をセットする
	
	$calendar = $(selector)[0];		//カレンダーの要素を取得する
	$calendar.calendar = this;		//クラスへの参照をカレンダーのタグにセットする
	$calendar.dialog = dialog;		//ダイアログへの参照をDOMに保存する
	$calendar.instance = this;		//カレンダーの要素にクラスインスタンスへの参照を持たせる
	$calendar.calendar = this;		//クラスへの参照をカレンダーのタグにセットする
	this.create_tag = create_tag;	//createLittleContentsクラスのインスタンスを利用する
	this.monthDates = [];			//月に存在する日付
	
	//@mod 2015.0704 T.Masuda 引数にない変数を使おうとしているのでコメントアウトしました。
	//this.dateRange = dateRange;	//クリック可能な日付の期間の引数をメンバに格納する
	//オプションを設定する
	this.calendarOptions = calendarOptions[this.calendarName];
}


/*
 * クラス名:blogCalendar
 * 引数  :string selector:カレンダーにするタグのセレクタ
 *     :createLittleContents create_tag:createLittleContentsクラスインスタンス
 * 戻り値:なし
 * 概要  :ブログページのカレンダーを作る
 * 作成日:2015.06.10
 * 作成者:T.Masuda
 */
function blogCalendar(selector, create_tag, tableData) {
	//セレクタの指定がなければ終える
	if(selector === void(0)) {
		return;
	}
	
	this.calendarName = 'blog';		//カレンダー名をセットする
	this.dom = $(selector)[0];		//クラスインスタンスにDOMへの参照を持たせる
	this.dom.instance = this;		//クラスインスタンスへの参照をDOMに持たせる
	this.create_tag = create_tag;	//createLittleContentsクラスインスタンスの参照をメンバに入れる
	
	//create_tagが読み込んだブログ記事のJSONから、カレンダーの有効日付を割り出す
	if (tableData !== void(0)) {
		//日付の配列を作成する
		this.dom.dateArray = this.extractDateArray(tableData);	
	}
	
	//オプションを設定する
	calendar.call(this, selector);			//スーパークラスのコンストラクタを呼ぶ
	this.calendarOptions = calendarOptions['blog'];
}

/*
 * クラス名:myBlogCalendar
 * 引数  :string selector:カレンダーにするタグのセレクタ
 *     :createLittleContents create_tag:createLittleContentsクラスインスタンス
 *     :Array tableData : ギャラリーの写真データ
 * 戻り値:なし
 * 概要  :マイブログページのカレンダーを作る
 * 作成日:2015.12.26
 * 作成者:T.Masuda
 */
function myBlogCalendar(selector, create_tag, tableData) {
	blogCalendar.call(this, selector, create_tag, tableData);			//スーパークラスのコンストラクタを呼ぶ
	//オプションを設定する
	this.calendarOptions = calendarOptions['myBlog'];
}

/*
 * クラス名:galleryCalendar
 * 引数  :string selector:カレンダーにするタグのセレクタ
 *     :createLittleContents create_tag:createLittleContentsクラスインスタンス
 *     :Array tableData : ギャラリーの写真データ
 * 戻り値:なし
 * 概要  :ギャラリーページのカレンダーを作る
 * 作成日:2015.12.26
 * 作成者:T.Masuda
 */
function galleryCalendar(selector, create_tag, tableData) {
	blogCalendar.call(this, selector, create_tag, tableData);			//スーパークラスのコンストラクタを呼ぶ
	//オプションを設定する
	this.calendarOptions = calendarOptions['gallery'];
}

/*
 * クラス名:myGalleryCalendar
 * 引数  :string selector:カレンダーにするタグのセレクタ
 *     :createLittleContents create_tag:createLittleContentsクラスインスタンス
 *     :Array tableData : ギャラリーの写真データ
 * 戻り値:なし
 * 概要  :マイギャラリーページのカレンダーを作る
 * 作成日:2015.12.26
 * 作成者:T.Masuda
 */
function myGalleryCalendar(selector, create_tag, tableData) {
	blogCalendar.call(this, selector, create_tag, tableData);			//スーパークラスのコンストラクタを呼ぶ
	//オプションを設定する
	this.calendarOptions = calendarOptions['myGallery'];
}

//カレンダークラスの親子関係を設定する
reservedCalendar.prototype = new calendar();
myPageReservedCalendar.prototype = new calendar();
blogCalendar.prototype = new calendar();
myBlogCalendar.prototype = new blogCalendar();
galleryCalendar.prototype = new blogCalendar();
myGalleryCalendar.prototype = new blogCalendar();
//サブクラスのコンストラクタを有効にする
reservedCalendar.prototype.constructor = reservedCalendar;
myPageReservedCalendar.prototype.constructor = myPageReservedCalendar;
blogCalendar.prototype.constructor = blogCalendar;
myBlogCalendar.prototype.constructor = myBlogCalendar;
galleryCalendar.prototype.constructor = galleryCalendar;
myGalleryCalendar.prototype.constructor = myGalleryCalendar;


//グローバルなスコープで定義されるべき関数を定義していく

/*
 * 関数名:numOnly()
 * 引数  :event evt: onkeyDownイベントのeventオブジェクト。
 * 戻り値:boolean
 * 概要  :onkeyDownイベントでコールされ、数字、バックスペース、左右のキーの移動以外の打鍵をキャンセルする。
 * 引用　:http://javascript.eweb-design.com/1205_no.html
 * 作成日:2015.04.14
 * 作成者:T.Masuda
 */
function numOnly() {
	  //押されたキーのコードを1文字に変換する。
	  m = String.fromCharCode(event.keyCode);
	  //指定されたキーコード以外であれば
	  if("0123456789\b\r%\'".indexOf(m, 0) < 0){
		  return false;	//処理を途中終了する。
	  }
	  
	  return true;	//処理を通常通りに行う。
	}

//入力制限の文字列を連想配列に格納する。キーは要素のtype属性の値が相当する。
var limitInput = {
		email:"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ\b\r%\'½¾ÛÞ»¿ÀÝºâÜ@",
		number:"0123456789\b\r%\'",
		tel:"0123456789\b\r%\'½"
}

/*
 * 関数名:function controllInputChar(evt)
 * 引数  :event evt: onkeyDownイベントのeventオブジェクト。
 * 戻り値:boolean
 * 概要  :入力する文字の制限をかける。
 * 作成日:2015.04.15
 * 作成者:T.Masuda
 */
function controllInputChar(evt){
	var keyCode;	//押下されたキーのコードを受け取る変数を宣言する。
	//document.allはInternet Explorerでのみ使用可能
	if (document.all)  //IEなら
	{
		keyCode = event.keyCode;	//event.keyCodeからキーコードを取得する。
	} else	//IE以外なら
	{
		keyCode = evt.which;		//引数で渡されたイベントオブジェクトからキーコードを取得する。
	}
	
	var type = $(evt.target).attr('type');	//テキストボックスのtype属性を取得する。
	//押されたキーのコードを1文字に変換する。
	m = String.fromCharCode(keyCode);
	//指定されたキーコード以外であれば。tabキーのコードは許可する。
	if(limitInput[type].indexOf(m, 0) < 0 && !(parseInt(keyCode) == 9)){
		//Firefox用のバリデーションを行う
		if(!validateFirefoxKeyCode(keyCode, type)){
			return false;	//処理を途中終了する。
		}
	}
	
	return true;	//処理を通常通りに行う。	
}

/*
 * 関数名:function validateFirefoxKeyCode(keyCode)
 * 引数  :String keyCode: キーコード。
 * 　　  :String type: 判定する入力欄のタイプ。
 * 戻り値:boolean
 * 概要  :Firefoxでのキーコードのチェックを行う。
 * 作成日:2015.04.18
 * 作成者:T.Masuda
 */
function validateFirefoxKeyCode(keyCode,type){
	if(uaName != 'gecko'){	//Firefoxでなければ
		return;	//何もしない。
	}
	var key = parseInt(keyCode);	//キーコードを数値に変換する。
	var retBoo = false;				//返却する値を格納する変数を宣言、falseで初期化する。
	
	//ハイフンかつ電話番号、メールアドレス
	if(key == 173 && (type == 'tel' || type == 'email')){
		retBoo = true;	//trueを返す
	//アンダーバーかつメールアドレス
	} else if(key == 167 && type == "email"){
		retBoo = true;	//trueを返す
	}
	
	return retBoo;	//判定結果を返す。
}


//テキストボックス等のname属性の日本語版を格納する連想配列。
var errorJpNames = {
		name:'氏名',
					eMail:'メールアドレス',
					email:'メールアドレス',
					sex:'性別',
					content:'お問い合わせ内容',
					tel:"電話番号",
					address:'住所',
					eMailConfirm:"メールアドレス(確認)",
					emailConfirm:"メールアドレス(確認)",
					campaignTitle:'キャンペーン名',
					startDate:'開始日',
					endDate:'終了日',
					maxEntry:'上限人数',
					blogContent:'本文',
					blogTitle:'ブログタイトル',
					imagePath:'画像',
					campaignTitle:'キャンペーン名',
					campaignType:'種別',
					campaignContent:'内容',
					campaignPrice:'金額',
					campaignCopy:'コピー',
					startDate:'開始日',
					endDate:'終了日',
					maxEntry:'上限人数',
					nameKana:'氏名(カナ)',
					passwordConfirm:'パスワード(確認)',
					nickname:'ニックネーム',
					password:'パスワード',
					passwordNew:'パスワード(新)',
					emailNew:'メールアドレス(新)',
					adminBlogTitle:'管理者ブログタイトル',
					allowMidnightMail:'深夜メール受信',
					recieveMailType:'受信するメールの種類',
					myEmail:'メールアドレス',
					user_name : '氏名',
					name_kana : '氏名(カナ)',
					user_sex : '性別',
					birthday_date : '生年月日',
					zip_code : '郵便番号',
					mail_address : 'メールアドレス',
					telephone : '電話番号',
					telephone2 : '緊急電話番号',
					mail_deny : 'メルマガ受信設定',
					max_students : '最大人数',
					min_students : '最低人数',
					classroom : '教室',
					personPhoneNumber : '電話番号',
					personEmailCheck: 'メールアドレス(確認)',
					personCount : '人数',
					construct : '作品',
					schedule : '時限',
					dayOfWeek : '曜日',
					week : '週',
					// 2016.09.15 add k.urabe ユーザ検索フォームのid検索用の要素を追加
					id : 'ID',
					// 2016.09.15 add k.urabe 時間帯一覧タブの最小・最大人数用の要素を追加
					min_num : '最小人数',
					max_num : '最大人数'
				}




//validate.jsでチェックした結果を表示する記述をまとめた連想配列。
var showAlert = {
		invalidHandler:function(form,error){	//チェックで弾かれたときのイベントを設定する。
			var errors = $(error.errorList);	//今回のチェックで追加されたエラーを取得する。
			//エラー文を表示する。
			alert(createErrorText(errors, errorJpNames));
		},
		rules:{	//ルールを設定する。
			emailConfirm:{	//メールアドレス入力確認欄
				equalTo: '[name="email"]'	//メールアドレス入力欄と同じ値を要求する。
			},
			passwordConfirm:{	//パスワード入力確認欄
				equalTo: '[name="password"]'	//パスワード入力欄と同じ値を要求する。
			}
		}
	}

//記事編集・作成フォームのvalidationと成功時の処理。showAlertの内容を利用する
var articleCreateHandler = $.extend({}, true, showAlert, {
	//成功時のコールバック
	submitHandler : function(form, event){
	
		//記事を作成する、または更新する
		sendArticleData(articleNumber, $('.blogEdit')[0].create_tag);
		
//		//ダイアログのインプットデータのオブジェクトを作成する。close時のコールバック関数、タイトル、ダイアログのメッセージを引数で渡す
//		var argumentObj = commonFuncs.createBasicComfirmDialogObject(sendArticleData(), SAVE_ARTICLE_BEFORE_CONFIRM_TITLE, SAVE_ARTICLE_BEFORE_CONFIRM_MESSAGE);
//		//記事編集ページのcreateTagをダイアログに渡す
//		argumentObj.data.create_tag = create_tag;
//		//確認ダイアログクラスインスタンスを生成する
//		var confirmDialog = new dialogEx(CONFIRM_DIALOG_PATH, argumentObj);
//		//openイベントのコールバック関数をセットする
//		confirmDialog.run();	//ダイアログを開く
		
		return false;	//元々のsubmitイベントコールバックをキャンセルする
	}
})

//プロフィール編集フォームのvalidation設定
var profileValidation = $.extend({}, true, showAlert, {
	//成功時のコールバック
	submitHandler : function(form, event){
		//入力したデータでDBを更新する
		setProfileUpdate();
		
		return false;	//元々のsubmitイベントコールバックをキャンセルする
	}, rules :{
		user_name:{
			jp : true,
			required : true
		},
		name_kana : {
			required : true,
			katakana : true
		}, 
		birthday_date : {
			required : true,
			date : true
		},
		zip_code : {
			required : true,
			postnum : true
		}, 
		address : {
			required : true
		}, 
		mail_address:{	//メールアドレス入力確認欄
			required : true,
//			email : true,
			emailjp : true
		},
		telephone : {
			required : true,
			telnum : true
		},
		telephone2 : {
			telnum : true
		}
	}
})

// 2016.09.15 add k.urabe 時間帯一覧タブのvalidation設定を追加
var timeTableListValidation = $.extend({}, true, showAlert, {
	//成功時のコールバック
	submitHandler : function(form, event){

		timetableListFuncs.callbackUpdate();
		
		return false;	//元々のsubmitイベントコールバックをキャンセルする
	}, rules :{
		min_num:{
			required : true,
			digits : true,
			checkMinTime : true
		},
		max_num : {
			required : true,
			digits : true,
			max : 100
		}
	}
})

//デフォルトのsubmitHandlerを定義する連想配列。
var defaultSubmitHandler = {
	submitHandler:function(form){
		afterSubmitForm(this, event);	//フォームをsubmitした後の処理を行う。
	}
}

//記事の管理ボタン用のsubmitHandler。新規作成ならページを読み込むだけ、編集ならデータを取得
//してテキストボックス等に格納する。
var articleSubmitHandler = {
	submitHandler:function(form, event){
		
		//hiddenのinputタグからrole属性の値を受け取る。
		var command = parseInt($('.valueHolder:first', form).attr('data-role'));
		//var userId = getUserId();					//ユーザIDを取得する。
		var contentNum = $(form).attr('data-role');	//コンテンツ番号を取得する。
		//記事番号を取得する
		var number = parseInt($('.valueHolder:first', form).attr('data-number'));
		
		//新規作成の記事なら記事0番を入れる
		number = !isNaN(number) && command != 0 ? number : 0;		
		
		//削除ボタンを押していたら
		if (command == 2) {
			//確認ダイアログを出して、OKならば
			if(window.confirm('選択した記事を削除しますか?')){
				//ブログ記事の削除を行う
				$('.memberHeader')[0].create_tag.deleteBlogArticle(QUERY_KEY_DELETE_MYBLOG, [number]);
			}
		//新規作成、編集ボタンなら
		} else {
			//ajax通信でPHPに記事番号を渡す
			$.ajax({
				//記事編集制御用PHPにアクセスする
				url : 'jsp/articleEditController.jsp',
				async : false,					//同期通信を行う
				cache : false,					//通信結果をキャッシュしない
				data  : {'number' : number},	//記事番号を送る
				dataType : 'json',				//レスポンステキストにJSON形式を指定する
				method : 'post',				//POSTする
				success : function(json){		//通信成功時
					//PHP内での処理が成功したかを判定する
					parseInt(json.success) ? 
							//成功であれば編集画面へ遷移する
							$(CURRENT_WINDOW)[0].instance.callPage('window/member/page/createarticle.php')
							//失敗であればその旨を伝える
							: alert('通信に失敗しました。時間をおいてお試しください。');
				}, 
				//通信失敗時
				error : function(xhr, status, error){
					//失敗の旨を伝える。
					alert('通信に失敗しました。時間をおいてお試しください。');
				}
			});
		}
			
		return false;	//本来のsubmitをキャンセルする
	}
}

//リストに対する検索フォームのsubmitHandlerの連想配列。
var listSearchSubmitHandler = {
		submitHandler:function(form){	//submitHandlerのコールバック関数
			//入力された項目がある入力欄のデータを取得する。
			var formData = commonFuncs.createFormData(form);
			//行のクラス名と同様の文字列をdata-target属性から取得する。
			var rowName = $(form).attr('data-target');
			//サーバに送信するデータを作成する。コンテンツ番号、フォームデータを送信する。
			var sendData = {search:formData,contentNum:$(form).attr('data-role')};
			//ナンバリングのJSONを消す。
			deleteNumberKey(json);
			//サーバへデータを送信する。
		//	getJsonFile(init['getListData'], sendData);//サーバ側の処理が実装されたらこちらを使います。
			
			//現在はダミーの処理です。
			var jsonurl = '';	//jsonファイルのurlを格納する変数を宣言、初期化する。
			var dataRole = parseInt($(form).attr('data-role'));	//コンテンツ番号を取得する。
			switch(dataRole){	//コンテンツ番号で分岐する。
				case 4: jsonurl = 'source/adminbloglist.json';	//管理者ブログ
								break;								//switchを抜ける。
				case 5: jsonurl = 'source/campaignlist.json';	//キャンペーン
								break;								//switchを抜ける。
				case 6: jsonurl = 'source/studentlist.json';	//生徒さん
								break;								//switchを抜ける。
				default:		break;								//switchを抜ける。
			}
			
			getJsonFile(jsonurl, sendData);
			//ここまでダミーのJSON取得の処理
			
			//ナンバリングのJSONが返ってきていれば
			if('1' in json){
				//ナンバリングとともに書き出す。同じdata-roleの値を持つフォームのリストを指定し、レコードを書き出す。
				outputNumberingTag(rowName + 'Wrap', init.listSetting.startPage, 
						init.listSetting.displayPageMax, init.listSetting.displayPage, 
						init.listSetting.pageNum, 
						'.managementForm[data-role=\'' + $(form).attr('data-role') + '\'] .table > tbody');
			//何も返ってきていなければ
			} else {
				//エラーメッセージを出す
				alert('検索条件に該当するデータがなかった、または通信に失敗しました。');
			}
		}
	}

//オプション更新のsubmitHandler。
var optionSubmitHandler = { 
	submitHandler:function(form){
		saveOptionSetting();	//設定を保存する。
	},
	invalidHandler:function(form,error){	//チェックで弾かれたときのイベントを設定する。
		var errors = $(error.errorList);	//今回のチェックで追加されたエラーを取得する。
		//エラー文を表示する。
		alert(createErrorText(errors, errorJpNames));
	},
	rules:{	//ルールを設定する。
		emailConfirm:{	//メールアドレス入力確認欄
			equalTo: '[name="emailNew"]'	//メールアドレス入力欄と同じ値を要求する。
		},
		passwordConfirm:{	//パスワード入力確認欄
			equalTo: '[name="passwordNew"]'	//パスワード入力欄と同じ値を要求する。
		}
	}
}



/*
 * scriptタグで外部ファイルjsを読み込む関数
 * 引用元 http://so-zou.jp/web-app/tech/programming/javascript/sample/script.htm
 */
function loadScript(filename) {
	var script = document.createElement( 'script' );

	script.type = 'text/javascript';
	script.src = filename;

	var firstScript = document.getElementsByTagName( 'script' )[ 0 ];
	firstScript.parentNode.insertBefore( script, firstScript );
}


/* 
 * 関数名:setTableRecordClass
 * 概要  :テーブルの最初の行を除くtrタグに対してクラス属性を付ける
 		これによってアコーディオン機能を実装するための行がどの行なのかを
 		識別できるようになる
 * 引数  :tableClassName: 行にクラス属性を付けたいテーブル名
 		:tableRecordClasssName: 行に新しくつけるクラス名
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.07.16
 */
function setTableRecordClass (tableClassName, tableRecordClasssName) {
	//第一引数のテーブルの1行目を除くtrタグに対して第2引数の名前のクラス属性を付け、行に対する対象を当てやすくする
	$(DOT + tableClassName + TAG_TR).eq(0).siblings().addClass(tableRecordClasssName);
}




/* 
 * 関数名:cutString
 * 概要  :すでに画面に表示されている文字を指定文字数で切り取る。
 * 引数  :cutTargetSelector:文字を切り取る対象となる文字列を持ったセレクター名
 		cutCount:何文字以上であるなら文字に対して切り取りを行うかの設定の数字
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.07.22
 */
function cutString(cutTargetSelector, cutCount) {
	//文字数カット対象となるセレクター、メルマガの内容列
	var $setElm = $(cutTargetSelector);
	// カットする文字数
	var cutFigure = cutCount;
	// 文字カット後に表示するテキスト
	var afterTxt = ' …';

	//ループですべてのメルマガ内容列について処理をする
	$setElm.each(function(){
		//対象の列の文字数を取得してカットする文字数と比較するのに使う
		var textLength = $(this).text().length;
		//カットした後の文字列を取得する
		var textTrim = $(this).text().substr(0,(cutFigure))
		//対象の列の文字数がカットする文字数より多い時に文字をカットする
		if(cutFigure < textLength) {
			//対象の列に対して文字をカットして表示する
			$(this).html(textTrim + afterTxt).css({visibility:'visible'});
		//対象の列がカットする文字数より少なかった場合、カットはせずにそのまま表示する
		} else if(cutFigure >= textLength) {
			//そのまま表示するように設定する
			$(this).css({visibility:'visible'});
		}
	});
}


/*
 * 関数名:createErrorText
 * 引数  :jQuery errors: エラーがあった要素。
 * 　　  :Object jpNames: name属性に対応する日本語名が格納された連想配列。
 * 戻り値:String:エラーメッセージの文字列。
 * 概要  :エラーメッセージを作成する。
 * 作成日:2015.04.15
 * 作成者:T.Masuda
 */
function createErrorText (errors, jpNames) {
	//返却する文字列を格納する変数を用意する。
	var retText = "";
	//エラーメッセージの数を取得する。
	var errorLength = errors.length;
	//エラーメッセージを格納する配列を用意する。1つ目の要素に1個目のエラーメッセージを配置する。
	var errorMessages = [errors[0].message];

	//エラーメッセージの数を取得する。
	var messageLength;
	
	//エラーメッセージを取得する。
	for(var i = 1; i < errorLength; i++){
		//エラーメッセージの重複をチェックする。
		for(var j = 0; j < errorMessages.length; j++){
			//エラーメッセージが重複していれば
			if(errorMessages[j] == errors[i].message){
				break;	//追加せずに抜ける。
			//エラーメッセージの重複がなかったら
			} else if(errorMessages.length - 1 <= j){
				//エラーメッセージを配列に追加する。
				errorMessages.push(errors[i].message);	
			}
		}
	}
	
	messageLength = errorMessages.length;	//エラーメッセージの数を取得する。
	
	//エラーメッセージを取得する。
	for(var i = 0; i < messageLength; i++){
		//エラー文を追加する。
		retText += errorMessages[i] + '\n';
		//エラーメッセージごとに要素を走査する。filter関数で対象の要素を絞り込む。
		$(errors).filter(function(){
			return this.message == errorMessages[i];	//エラーメッセージが一致した要素を返す。
		}).each(function(){	//each関数で対象を走査する。
			//retTextに名前を箇条書きする。
			retText += '・' + jpNames[$(this.element).attr('name')] +'\n';
		});
		//項目ごとに改行する。
		retText +='\n';
	}
	
	return retText;	//作成したメッセージを返す。
}

function toBlob(base64) {
    var bin = atob(base64.replace(/^.*,/, ''));
    var buffer = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) {
        buffer[i] = bin.charCodeAt(i);
    }
    // Blobを作成
    try{
        var blob = new Blob([buffer.buffer], {
            type: 'image/png'
        });
    }catch (e){
        return false;
    }
    return blob;
}
