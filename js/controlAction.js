/* アクションを制御するJSファイル。 */

/*
 * 関数名:clickButtonToFile
 * 引数  :String parentClass:ボタンの親の要素のクラス名
 * 		:String button:ボタンのセレクタ文字列
 * 		:String uploader:ファイルアップロードを行う要素
 * 		:Function callBacktton:コールバック関数
 * 		:? arg1~arg3:任意の引数
 * 戻り値:boolean
 * 概要  :ボタンにクリックイベントを登録し、ファイルエクスプローラでファイルを選択するようにする。
 * 作成日:2015.04.18
 * 作成者:T.M
 */
function clickButtonToFile(parentClass, button, uploader, callBack, arg1, arg2, arg3){
	var $parent = EMPTY_STRING;	//ボタンの親要素を格納する変数を宣言する。
	
	//アップロードボタンのchangeイベントを定義する。
	$(uploader).on('change', function(){
		
		//ファイルが正しく、引数に関数がセットされていたら
		if(commonFuncs.checkImageFile($(this).val(), INVALID_IMAGE_FILE_WARNING) 
				&& commonFuncs.checkEmpty(callBack)){
			callBack(this, $parent, arg1, arg2, arg3);	//コールバック関数を実行する。
		}
		//アップロードボタンの値を初期化する。cloneで置き換えるため、引数をtrueとし、イベントもコピーする
		$(uploader).replaceWith($(uploader).clone(true)); // 2016.09.27 r.shibata 追加
	});
	
	//ボタンのクリックイベントを登録する。
	$(parentClass + ' > button' + button!== void(0)? button : '').on('click' , function(){
		//イベントオブジェクトが取得できていれば
		
		$parent = $(this).parent();	//ボタンの親要素を取得する。
		$(uploader);
		//アップロードボタンをクリックする。
		$(uploader, document).click();
	});
}

/*
 * 関数名:checkAllRecord()
 * 引数  :なし
 * 戻り値:なし
 * 概要  :見出しのチェックボックスをクリックしたら全ての行のチェックボックスのオンオフが切り替わる。
 * 作成日:2015.03.26
 * 作成者:T.M
 */
function checkAllRecord(){
	//見出し行のチェックボックスがクリックされたら
	$(document).on('click', '.tableHead th:first-child input:checkbox', function(){
		var parentTable = $('table').has(this);
		//見出し行のチェックボックスにチェックが入ったら
		if($(this).is(':checked')){
			//1列目のチェックボックスをみんな入れる。
			$('tr td:first-child input:checkbox', parentTable).prop('checked', true);
		//そうでなければ
		} else{
			//1列目のチェックボックスをみんな外す。
			$('tr td:first-child input:checkbox', parentTable).prop('checked', false);
		}
	});
}

/*
 * 関数名:function showRightOutOfDisplayButton(selector, timeout)
 * 引数  :String selector:対象となる要素のセレクタ。
 * 		:int timeout:ボタンの表示を始めるまでの時間。ミリ秒。
 * 		:int speed:メソッドが実行されてから変化が終わるまでの時間。
 * 戻り値:なし
 * 概要  :対象を右の画面外において、一定時間後に移動しながら表示する。
 * 作成日:2015.04.07
 * 作成者:T.M
 */
function showRightOutOfDisplayButton(selector, timeout, speed){
	var b = $("#container").width();
	var c = $(".main").width();
	var a = $("#container").width() - $(".main").width() / 2 + $(selector).width();
	//画面外に置く。
	$(selector).css("right", -($("#container").width() - $(".main").width() / 2 + $(selector).width()) + "px");
	$(selector).css("display", "block");	//表示する。
	
	//時間を置いてコードを実行する。
	window.setTimeout(function(){
		$(selector).animate({right:"5px"}, speed, "easeOutCubic");	//対象を移動させて表示する。
	}, timeout);	//timeoutミリ秒後にスタートする。
}

/*
 * 関数名:function fadeToggleSet(clicked, target, setClass, delay)
 * 引数  :String clicked:クリックイベントの対象となる要素のセレクタ。
 * 		:String target:クリックして表示/非表示が切り替わる要素のセレクタ。
 * 		:String setClass:targetをくくるクラスのセレクタ。
 * 		:int delay:フェードイン・アウトにかかる時間。ミリ秒。
 * 戻り値:なし
 * 概要  :clickedを押すとtargetがフェードイン・フェードアウトするイベントを登録する。
 * 作成日:2015.04.07
 * 作成者:T.M
 */
function fadeToggleSet(clicked, target, setClass, delay){

	//関数で指定していない場所をクリックすると
	$(':not(' + clicked + ' ,' + clicked + ' *)').on('click', function(e){
		//表示中だったら
		if($(target + ':visible').length){
			//該当する要素をフェードアウトさせる。
			$(target + ':visible').fadeOut(delay);
		}
	});
	
	//clickedのクリックイベントを登録する。
	$(clicked + ' ,' + clicked + ' *').on('click' , function(e){
		e.stopPropagation();	//イベントのバブリングを阻止する。
		//他に表示されていれば
		if($(setClass + ':visible:not(' + target + ')').length > 0){
			//フェードアウトさせる。
			$(setClass + ':visible').fadeOut(delay);
			$(target).fadeIn(delay);	//自分だけ表示する。
		//そうでなければ
		} else {
			//targetがdelayミリ秒かけてフェードアウト・インをする。
			$(target).fadeToggle(delay);
		}
	});
}