// 画面遷移を操作する関数を中心にまとめたJSファイル。

currentLocation = '';	//現在選択中のページの変数

/*
 * 関数名:overwrightContent(target, data)
 * 引数  :String target, Object state
 * 戻り値:なし
 * 概要  :既存のコンテンツを消して、新たなコンテンツを書き出す。
 * 作成日:2015.03.09
 * 作成者:T.M
 */
function overwrightContent(target, data){
alert("controlPage.js line:near 13 overwrightContent used"); 		// 使用確認のためのアラート r.shibata 追加 表示されなければこの関数を削除する
alert("使用されているため、この関数は削除できません。アラートを削除してください。"); 	// 使用確認のためのアラート r.shibata 追加 表示されなければこの関数を削除する
	var dat = $(data);
	//mainのタグを空にする。
	$(target).empty();
	//linkタグを収集する。
	var links = $('link', data);
	//コードが書かれているscriptタグを収集する。
	var scripts = $('script:not(:empty)', data);

	//linkタグを展開する。
	links.each(function(){
		//headタグ内にlinkタグを順次追加していく。
		$(target).append($(this));
	});

	//scriptタグを展開する。
	scripts.each(function(){
		//mainのタグの中にscriptタグを展開し、JavaScriptのコードを順次実行する。
		$(target).append($(this));
	});
}

/*
 * 関数名:callPage(url, state)
 * 引数  :String url, Object state
 * 戻り値:なし
 * 概要  :新たにページを読み込む。
 * 作成日:2015.03.05
 * 作成者:T.M
 * 修正日:2015.03.06
 * 修正者:T.M
 * 内容　:戻るボタンに対応しました。
 */
function callPage(url, state){
alert("controlPage.js line:near 48 callPage used"); 				// 使用確認のためのアラート r.shibata 追加 表示されなければこの関数を削除する
alert("使用されているため、この関数は削除できません。アラートを削除してください。"); 	// 使用確認のためのアラート r.shibata 追加 表示されなければこの関数を削除する
	//urlから#を抜き取り、有効なURLを形成する。
	url = url.replace(/#/g, '');
	//cgiなら
	if(url.indexOf('.cgi') > -1){
		//フォーム用の処理を行う。
		postForm($('<form></form>').attr({action: url,method:'post',state:url}));
		return;	//処理を終える。
	}
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
			overwrightContent('.main', html);
			//カレントのURLを更新する。
			currentLocation = url;

			//第二引数が入力されていなければ、また、pushStateに対応していれば
			//@mod 2015.0604 T.Masuda 1つ目の条件式のtrue条件に || state == null を追加しました
			if((state === void(0) || state == null) && commonFuncs.isSupportPushState()){
				//画面遷移の履歴を追加する。
				history.pushState({'url':'#' + currentLocation}, '', location.href);
			}
			
			//スクロール位置をトップに戻す。
			window.scroll(0, 0);
		}
	});
}


/*
 * イベント:ready
 * 引数   :なし
 * 戻り値 :なし
 * 概要   :ローディング画面の作成。
 * 作成日 :2015.03.10
 * 作成者 :T.M
 */
$(document).ready(function(){
	//ローディング画面を追加する。
	$('body').prepend($('<div></div>')
			.addClass('loading')
			//ローディング画像を追加する。
			.append($('<img>')
					//ローディング画像のパスを追加する。
					.attr('src', 'image/loading.gif')
			)
			//Loadingの文字を表示する。
			.append($('<p></p>')
					//文字を追加する。
					.text('Loading...')
			)
	);
});


/*
 * イベント:submit
 * 引数   :なし
 * 戻り値 :なし
 * 概要   :フォームがsubmitされたときのイベント。
 * 作成日 :2015.03.10
 * 作成者 :T.M
 * 変更日 :2015.03.31
 * 変更者 :T.M
 * 内容 　:.mainの中のフォームに限定しました。
 * 変更日 :2015.04.14
 * 変更者 :T.M
 * 内容 　:jQuery.Uploadで生成されたformタグを除外する記述を追加しました。
 * 変更日 :2015.04.17
 * 変更者 :T.M
 * 内容 　:処理内容を関数化しました。
 */
$(document).on('submit', '.main form:not([target^="jquery_upload"])', function(event){
	afterSubmitForm(this, event);	//フォームをsubmitした後の処理を行う。
});

/*
 * 関数名:function afterSubmitForm(form, event)
 * 引数   :element form:submitを行ったフォームのタグ。
 * 　　   :event event:イベントオブジェクト。
 * 戻り値 :なし
 * 概要   :フォームがsubmitされたときの処理の関数。
 * 作成日 :2015.04.16
 * 作成者 :T.M
 */
function afterSubmitForm(form, event){
	var $this = $(form);		//処理高速化のためthisのjQueryオブジェクトを変数に入れる。
	//イベントオブジェクトがあれば
	if(event !== void(0)){
		//submitイベントをキャンセルする。
		event.preventDefault();
	}
	//@mod 2015.0812 T.Masuda 一時的にMyブログ記事編集ページ用にします。
	//submitボタンにconfirm属性が指定してありかつ、trueであれば
	if($(('input:submit[confirm="true"]'), $this).length){
		//フォームのvalue属性にmessageがあれば取得する
		//var message = $this.attr("value") !== void(0)? $this.attr("value"):"";
		
		//マイブログ記事更新(仮) 要調整
		//ダイアログ用オブジェクトを作る
		//var dialogObj = $.extend(true, {}, dialogExOption[SUGGESTION_BOX_CONFIRM_DIALOG]);
		//送信するデータをオブジェクトに統合する
		//$.extend(true, dialogObj.argumentObj.data, sendData, {form:$this});
		//更新確認ダイアログを作る
		//var myBlogConfirmDialog = new dialogEx('dialog/myBlogConfirmDialog.html', dialogObj.argumentObj, dialogObj.returnObj);
		//myBlogConfirmDialog.setCallbackClose(submitArticle);	//閉じるときのイベントを登録
		//myBlogConfirmDialog.run();	//主処理を走らせる
	} else {
		//チェックの必要がなければ通常通りフォームをsubmitする。
		postForm($this);
	}
}

/*
 * 関数名:function postForm(form)
 * 引数  :element form:フォームの要素。
 * 戻り値:なし
 * 概要  :フォームを送信する。
 * 作成日:2015.04.13
 * 作成者:T.Masuda
 * 作成日:2015.04.13
 * 変更者:T.Masuda
 * 変更日:2015.04.22
 * 内容　:通信メソッドをフォームから取得して設定する様にしました。
 */
function postForm(form){
	
	$form = $(form);	//高速化のため、フォームの要素をjQueryオブジェクトにして変数に格納する。
	//フォームのaction属性から送信URLを取得する。
	var url = $form.attr('action').split(',');
	//送信するデータを格納する連想配列を作成する。
	var formData = commonFuncs.createFormObject($form);
	//creatorのメンバにフォームデータを保存する。
	creator.formData['formData'] = formData;
	// this.formData['formData'] = formData;
	
	//現在の日付を取得するために日付型のインスタンスを作る。
	var time = new Date();
	
	//Ajax通信を行う
	$.ajax({
		url:url[0],							//1つ目のURLにアクセスする
		dataType:'html',					//htmlのデータを返してもらう
		method:$form.attr('method'),		//メソッドをフォームから取得する
		async:false,						//同期通信を行う
		data:formData,						//フォームデータをを送る
		success:function(data, status, xhr){	//通信に成功したら
			//ブラウザ履歴からのページ読み込みであったらtrue判定、そうでなければfalse判定の変数を用意する。
			var isCgiHistory = $form.attr('state') !== void(0)? true: false;
			//お問い合わせフォームであったら
			if($('.main .confirmSendMail').length > 0 && !(isCgiHistory)){
				//送信完了のメッセージを出す。
				alert('お問い合わせのメールの送信が完了しました。\n追ってメールでの連絡をいたします。\n返信のメールがしばらく経っても届かない場合は、入力されたメールアドレスに誤りがある可能性がございます。\nもう一度メールアドレスを入力してお問い合わせの操作を行ってください。');
			}
		
			var $target = $('.main');	//書き込み先を指定する。
			
			//URLが二つあれば
			if(url.length > 1){
				//追記者 T.Yamamoto 追記日 2015.07.24 内容:マイブログページの更新の場合、入力したデータを取得してDBを更新する処理を入れる
				if(url[1] == 'memberMyBlog.html') {
					//inputタグなどに入力したデータを取得しDB更新のために用いる
					var sendData = getInputData('blogEdit');
					//送信するデータに会員番号を加え、DBに更新するデータが誰のデータなのかを明確にする
					sendData['user_key'] = creator.json.accountHeader.user_key.value;;
					//データ更新クエリのidに値が入っていれば記事更新のクエリを使う
					if (creator.json.updateMyBlog.id.value != EMPTY_STRING) {
						//ブログデータを更新しデータをDBにセットする
						creator.setDBdata(creator.json.updateMyBlog, sendData, EMPTY_STRING);
						//画面を更新せずに記事の新規作成ができるように判定に使っているjsonを空白で初期化する
						creator.json.updateMyBlog.id.value = EMPTY_STRING;
					//データ更新クエリのidに値が入っていなければ新規記事作成クエリを使う
					} else {
						//ブログデータを新規作成しデータをDBにセットする
						creator.setDBdata(creator.json.insertMyBlog, sendData, EMPTY_STRING);
					}
				
				}
				alert('更新に成功しました。');	//返ってきたデータをダイアログに出す。
//				alert(data);	//返ってきたデータをダイアログに出す。
				//タブがあれば
				if($target.has('.tabContainer').length){
					$target = $('.tabPanel.active:last');	//タブパネル内を書き換える。
					callPageInTab(url[1], $target);			//タブにページを書き込む。
					//タブでなかったら
				} else {
					callPage(url[1]); //画面を切り替える。
				}			
			} else {
				//タブがあれば
				if($target.has('.tabContainer').length){
					$target = $('.tabPanel.active:last');	//タブパネル内を書き換える。
					callPageInTab(url[0], $target);			//タブにページを書き込む。
					//タブでなかったら
				} else {
					//mainのタグを空にする。
					$target.empty();
					//取得したページのmainタグ直下の要素をを取得し、mainのタグに格納する。
					$target.append($('.main > *', data));
					//linkタグを収集する。
					var links = $(data).filter('link');
					//scriptタグを収集する。
					var scripts = $(data).filter('script:parent');
					//linkタグを展開する。
					links.each(function(){
						//headタグ内にlinkタグを順次追加していく。
						$target.append($(this));
					});
					//scriptタグを展開する。
					scripts.each(function(){
						//mainのタグの中にscriptタグを展開し、JavaScriptのコードを順次実行する。
						$target.append($(this));
					});
					
					//カレントのURLを更新する。
					currentLocation = url;
					//pushstateに対応していたら、かつcallPageからcgiが呼び出されていなければ
					if(!(isCgiHistory) && commonFuncs.isSupportPushState()){
						//画面遷移の履歴を追加する。
						history.pushState({'url':'#' + currentLocation}, '', location.href);
					}
				}
			}
			
		}
	});
	
	//スクロール位置をトップに戻す。
	window.scroll(0, 0);
}


/* 
 * 関数名:function chooseOKBeforeCallFunc(message, title, func, arg3, arg2, arg3)
 * 概要  :関数を実行するかどうか確認するダイアログを出す。
 * 引数  :String message:ダイアログに書き出すテキスト。
 * 		:String title:ダイアログのタイトル。
 * 		:function func:OKボタンを押した後にコールされる関数。
 * 		:?	arg1~3:関数の引数。
 * 返却値  :なし
 * 作成者:T.M
 * 作成日:2015.04.13
 * 変更者:T.M
 */
function chooseOKBeforeCallFunc(message, title, func, arg1, arg2, arg3){
	//共通コンテンツのJSONを取得する。
	create_tag.getJsonFile('source/commonJson.json');
	// ダイアログの本体となるdivタグを生成する。
	create_tag.outputTag('funcConfirmDialog', 'funcConfirmDialog', 'body');
	$('.funcConfirmDialog:last').text(message);	//ダイアログにテキストを書き込む。
	// 生成したdivタグをjQuery UIのダイアログにする。
	$('.funcConfirmDialog:last').dialog({
		// 幅を設定する。
		width			: '300px',
		// ダイアログを生成と同時に開く。
		autoOpen		: true,
		// Escキーを押してもダイアログが閉じないようにする。
		closeOnEscape	: false,
		//タイトルをつける。
		title:title,
		appendTo : $(CURRENT_WINDOW),
		//ダイアログにクラスを設定する。
		dialogClass		:'confirmDialog',
		// モーダルダイアログとして生成する。
		modal			: true,
		// リサイズしない。
		resizable		: false, 
		// 作成完了時のコールバック関数。
		create:function(event, ui){
			// タイトルバーを見えなくする。
			$('.confirmDialog .ui-dialog-titlebar-close').css('display', 'none');
		},
		// 位置を指定する。
		position:{
			// ダイアログ自身の位置合わせの基準を、X座標をダイアログ中央、Y座標をダイアログ上部に設定する。
			my:'center center',
			// 位置の基準となる要素(ウィンドウ)の中心部分に配置する。
			at:'center center',
			// ウィンドウをダイアログを配置する位置の基準に指定する。
			of:window
		},
		buttons:[	//ボタンを配置する。
		         {
		        	 text:"OK",	//OKボタン
		        	 click:function(event, ui){	//クリック時のコールバック
		        		 func(arg1, arg2, arg3);	//関数をコールする。
		        		 //ダイアログを消す。
		        		 $(this).dialog("close").dialog("destroy").remove()
		        	 }
		         },
		         {
		        	 text:"キャンセル",	//キャンセルボタン
		        	 click:function(event, ui){	//クリック時のコールバック
		        		 //ダイアログを消す。
		        		 $(this).dialog("close").dialog("destroy").remove()
		        	 }
		         }
		]
	});
}



/*
 * 関数名:changeSelectedButtonColor
 * 引数  :var filterTarget
 * 戻り値:なし
 * 概要  :選択した要素の色を変えるクラスを付与する。
 * 作成日:2015.03.06
 * 作成者:T.Masuda
 */
function changeSelectedButtonColor(filterTarget){
	//一旦全てのactive,currentクラスを剥奪する。	
	$(filterTarget).removeClass('active');
	$(filterTarget).removeClass('current');
	//カレントのurlを割り出す
	var current = history.state ? history.state.url : TOPPAGE_NAME;
	// 現在のページのボタンの枠に対して、currentクラスを付与する。
	$(filterTarget).filter(':has(a[href$="' + current + '"])').addClass('current');
}

/*
 * イベント名:ajaxStart
 * 引数  　 :なし
 * 戻り値　 :なし
 * 概要  　 :Ajax通信を開始した後の処理。
 * 作成日　　:2015.03.09
 * 作成者　　:T.Masuda
 */
//Ajax通信が始まったら
$(document).ajaxStart( function(){
	//ローディング画面を出す。
	commonFuncs.callLoadingScreen();
});


/*
 * イベント名:ajaxStop -> ajaxSuccess 2016.12.28 r.shibata 変更
 * 引数  　 :なし
 * 戻り値　 :なし
 * 概要  　 :Ajax通信を終えた後の処理。
 * 作成日　　:2015.03.09
 * 作成者　　:T.Masuda
 */
//Ajax通信が全て終了したら
$(document).ajaxSuccess( function(){
	//ローディング画面を隠す。
	commonFuncs.hideLoadingScreen();
	//選択されたトップメニューの色を変える。
	changeSelectedButtonColor('.topMenu li');
});
/* 以上、ローディング画面呼び出しのイベント登録。 */

/*
 * 関数名:なし
 * 引数  :なし
 * 戻り値:なし
 * 概要  :Ajax通信でのページ読み込みを行っていても、ブラウザバック等の履歴機能を有効にする。
 * 作成日:2015.03.09
 * 作成者:T.Masuda
 */
//popStateに対応できているブラウザであれば
if (commonFuncs.isSupportPushState()){
	//popStateに変動があれば
    $(window).on("popstate",function(event){
        //初回アクセスであれば何もしない。
    	if (!event.originalEvent.state){
    		return; // 処理を終える。
    	}
        var state = event.originalEvent.state; 	//stateオブジェクトを取得する。
        currentLocation = state['url'];			//stateから現在のURLを取り出し保存する。
        //履歴からページを読み込む。
        $(CURRENT_WINDOW)[0].instance.callPage(state['url'], state);
  });
}

/*
 * イベント名:load
 * 引数  　 :なし
 * 戻り値　 :なし
 * 概要  　 :ページの読み込みを終えた後の処理。
 * 作成日　　:2015.03.09
 * 作成者　　:T.Masuda
 * 変更日　　:2015.06.04
 * 変更者　　:T.Masuda
 * 内容　　　:トップページを2回読み込まないように修正しました。
 */
$(window).on('load', function(){
	//pushStateに対応していれば、pushStateで更新のイベント
	if (commonFuncs.isSupportPushState()){
		//@mod 2015.0604 T.Masuda コードの重複を減らしました
		var state = null;		//pushstateで保存されているstateを格納する変数を用意する
		var currentUrl = null;	//URLを格納する変数を用意する
		//初回ロードでなければ
		if (window.history.state){
			//履歴からURLとstateを引き出す
			currentUrl = window.history.state.url;
			state = window.history.state;
			//ページを読み込む。更新なので履歴を積まないために第二引数を入力する。
		//@add 2015.0603 T.Masuda URLのハッシュに応じて画面を遷移させるように変更しました
		//URLにハッシュがあれば
		} else if(location.hash){
			//HTMLまたはPHPの拡張子がハッシュにあれば、URLのハッシュを取得する
			currentUrl = location.hash.indexOf('.html') != -1 
			|| location.hash.indexOf('.php') != -1? location.hash: currentUrl;
		}
		
		//URLを取得していてかつ、トップページのURLでなければ
		if(currentUrl != null && currentUrl != TOPPAGE_NAME){
			$(CURRENT_WINDOW)[0].instance.callPage(currentUrl, state);	//画面遷移を行う
		}
		// 2015.0604の@mod終了
	//pushStateに対応していなければhashchangeのイベントで更新を行う。
	}else{
		//ハッシュ切り替えイベント発生時の処理
		$(window).bind("hashchange", function(ev){
			//ハッシュが変わっていれば
			if(location.hash) {
				//URLからハッシュを取り出し、変数に格納する。
				var hash = location.hash;
				//該当するページを読み込む。
				$(CURRENT_WINDOW)[0].instance.callPage(hash);
				//そうでなければ
			} else {
				//画面を更新する。
				location.reload();
			}
		});
		
		//画面遷移でのページ読み込み時点でハッシュがあれば
		if(location.hash) {
			//URLからハッシュを取り出し、変数に格納する。
			var hash = location.hash;
			//該当するページを読み込む。
			$(CURRENT_WINDOW)[0].instance.callPage(hash);
		//そうでなければ
		}
	}
});

/*
 * 関数名:callPageInTab(url, tabPanel)
 * 概要  :タブパネル内でページを切り替える。
 * 引数  :String url:読み込むhtmlファイルのURL
 * 		 element tabPanel:タブパネルのDOM要素
 * 戻り値:なし
 * 作成日　　:2015.03.25
 * 作成者　　:T.Masuda
 * 修正日　　:2015.04.23
 * 修正者　　:T.Masuda
 * 内容　　　:URLから#を抜く様に変更しました。
 */
function callPageInTab(url, tabPanel){
alert("controlPage.js line:near 511 callPageInTab used"); 			// 使用確認のためのアラート r.shibata 追加 表示されなければこの関数を削除する
alert("使用されているため、この関数は削除できません。アラートを削除してください。"); 	// 使用確認のためのアラート r.shibata 追加 表示されなければこの関数を削除する
	//urlから#を抜き取り、有効なURLを形成する。
	url = url.replace(/#/g, '');
	//ajax通信を行う
	$.ajax({
		url:url,				//読み込むファイルのURLを指定する。
		dataType:'html',		//htmlのデータを返してもらう。
		async:false,			//同期通信を行う。
		success:function(html, dataType){	//通信に成功したら
			//タブパネル内を書き換える。
			overwrightContent(tabPanel,html);
			//スクロール位置をトップに戻す。
			window.scroll(0, 0);
		},
		//通信エラーであれば
		error:function(XMLHttpRequest, textStatus, errorThrown){
			//エラーを通知する。
			alert('通信に失敗しました。時間をあけて試してください。');
		}
	})
}

/*
 * イベント名:$(document).on('click')
 * 引数  　 :なし
 * 戻り値　 :なし
 * 概要  　 :タブパネル内でリンクをクリックしたときのイベント。
 * 作成日　　:2015.03.25
 * 作成者　　:T.Masuda
 * 修正日　　:2015.04.25
 * 修正者　　:T.Masuda
 * 内容　　　:input:buttonにも対応しました。
 */
//表示中のタブパネル内でリンク付きのボタンがクリックされたら
$(document).on('click', '.tabPanel.active button[href],.tabPanel.active input:button[href]', function(){
	//タブ内でのページの切り替えを行う。
	callPageInTab($(this).attr('href'), $('.tabPanel').has(this));
});


/*
 * 関数名:submitImitateForm(form)
 * 概要  :疑似フォームを送信して画面を切り替える。
 * 引数  :element tabPanel:疑似フォームのDOM要素
 * 戻り値:なし
 * 作成日　　:2015.03.25
 * 作成者　　:T.Masuda
 */
function submitImitateForm(form){
	//フォームのデータを作る。
	var formData = commonFuncs.createFormData(form);
	//現在のタブを取得する。
	var activeTabPanel = $('.tabPanel').has(form);
	
	//createTagのインスタンスの連想配列メンバにフォームデータを格納する。
	creator.json['formData'] = formData;
	
	//フォームを送信する先のページに切り替える。
	callPageInTab(form.attr('action'), activeTabPanel);
};

/*
 * 関数名:sendImitateForm()
 * 概要  :疑似フォームを送信して画面を切り替える。ボタンのonclick属性でコールする。
 * 引数  :なし
 * 戻り値:なし
 * 作成日　　:2015.03.25
 * 作成者　　:T.Masuda
 */
function sendImitateForm(form){
	var $form = $(form);	//疑似フォームとなる要素を取得する。
	//フォームのデータを作る。
	var formData = commonFuncs.createFormData($form);
	//createTagのフォームデータのメンバを初期化する。
	creator.formData = {};
	//createTagのインスタンスの連想配列メンバにフォームデータを格納する。
	creator.formData['formData'] = formData;

	//フォームを送信する先のページに切り替える。
	callPage($form.attr('action'));
};



/*
 * イベント:$(document).on('click', '.main .confBackButton')
 * 引数   :String 'click':クリックイベントを登録する。
 * 		 :String '.confBackButton':通常のページでのPostmailの送信確認ページにおけるバックボタン。
 * 戻り値 :なし
 * 概要   :送信確認ページの戻るボタンがクリックされたときのイベント。
 * 作成日 :2015.03.31
 * 作成者 :T.M
 * 修正日 :2015.04.23
 * 修正者 :T.M
 * 内容　 :タブ外でのみ動作するように変更しました。
 */
$(document).on('click', '.main .confBackButton', function(){
	//タブでなければ
	if($('.tabContainer').length <= 0){
		//戻る。
		history.back();
	}
});

/*
 * イベント:$(document).on('click', '.back:not(.tabPanel button)')
 * 引数   :String 'click':クリックイベントを登録する。
 * 		 :String '.back:not(.tabPanel button)':タブパネル外のbackクラスのボタンのセレクタ。
 * 戻り値 :なし
 * 概要   :タブパネル外でbackクラスのボタンがクリックされたときのイベント。
 * 作成日 :2015.04.09
 * 作成者 :T.M
 */
$(document).on('click', '.back:not(.tabPanel button)', function(){
		history.back();	//ブラウザバックを行う。
});

/*
 * 関数名:addlogoutEvent
 * 引数  :String selector:セレクタ文字列
 * 戻り値:なし
 * 概要  :ログアウトを行うイベントを登録する。
 * 作成日:2015.08.01
 * 作成者:T.M
 */
function addlogoutEvent(selector){
	//指定した要素に対し、ログアウト処理のイベントを登録する。
	$(selector).on('click', function(event){
		
		event.preventDefault();	//Aタグがイベント登録の対象であった場合、本来の画面遷移をキャンセルする。
		
		var self = this;	//自信の要素を変数に入れる
			//日付クラスインスタンスを生成する。
			var cookieLimit = new Date();
			//現在の日付にクッキーの生存時間を加算し、cookieLimitに追加する。
			cookieLimit.setTime(0);

			//管理者画面から会員ページへログインしていなければ
			if(!commonFuncs.checkEmpty(commonFuncs.GetCookies().otherUserId)){
			//Ajax通信を行い、ログアウト処理を行う。
			$.ajax({
				//ログアウト用PHPをコールする
				url:'jsp/LogoutSession.jsp',
				async:false,	//同期通信を行う
				success:function(){	//通信成功時の処理
					//cookieを消去する
					document.cookie = 'userId=;expires=' + cookieLimit.toGMTString() + ';authority=;expires=' + cookieLimit.toGMTString() + ';';
					$(self).closest('.window')[0].instance.destroy();	//先頭のウィンドウを消す
					// ログアウトでフラワートップへ遷移する場合は、必ずtopへ遷移する 2016.12.27 r.shibata追加
					$(CURRENT_WINDOW)[0].instance.callPage(TOP_LOCATION);
					commonFuncs.showCurrentWindow();	//最前部のウィンドウのみ表示する
					//画面遷移の履歴を追加する。
					history.pushState({'url':'#' + TOPPAGE_NAME}, '', location.href);
					//ウィンドウの重なりを調整する
					$(CURRENT_WINDOW)[0].instance.setWindowZIndex();	
				},
				error:function(xhr,status,error){	//通信エラー時
					//エラーメッセージを出す
					alert('通信エラーです。時間をおいて試してください。');
				}
			});
		//管理者画面からの会員ページログインであったら
		} else {
			$(self).closest('.window')[0].instance.destroy();	//会員画面のウィンドウを消す
			document.cookie = 'otherUserId=;expires=' + cookieLimit.toGMTString() + ';';	//ログインを行った会員ID削除
			commonFuncs.showAdminWindow();	//管理者画面を表示する
			//ウィンドウの重なりを調整する
			$(CURRENT_WINDOW)[0].instance.setWindowZIndex();	
		}
		//ページの権限をクッキーへ設定する 2016.10.11 r.shibata 追加
		commonFuncs.setPageAuthToCookie();			
	});
}
