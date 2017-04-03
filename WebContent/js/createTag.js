/* 
 * ファイル名:createTag.js
 * 概要  :JSONとテンプレート用HTMLから画面パーツを作るクラスを定義したファイル
 * 設計者:H.Kaneko
 * 作成者:T.M
 * 作成日:2015.
 * パス :/js/createTag.js
 */

/* 
 * クラス名:createTag
 * 概要  :JSONとテンプレート用HTMLから画面パーツを作るクラス
 * 引数	:なし
 * 設計者:H.Kaneko
 * 作成者:T.M
 * 作成日:2015.
 */
function createTag(){
	this.json = null;			//JSONデータを格納する変数。
	this.dom = '';				//ひな形のHTMLのDOMを格納する変数。
	this.numbering = '';		//ブログページのナンバリングのJSON連想配列。
	this.formData = {};			//フォームデータを格納する連想配列。
	//add T.Masuda 2015/0417 予約ダイアログを作る関数を格納した連想配列を用意する。
	this.reservedDialog = {};	
	this.dateText = null;		//日付による記事絞込時の日付。nullでなければ絞込を行う
	
	this.DOM_THEAD = '<thead></thead>';	//theadタグ
	this.TAG_THEAD = 'thead';			//theadタグのセレクタ
	this.ATTR_CLASS = 'class';			//クラス属性
	//ファイル取得失敗のエラーメッセージ
	this.MESSAGE_FAILED_TO_GET_FILE	= '通信に失敗しました。\n原因:ファイルが取得できませんでした。\nファイル名:';
	
	/*
	 * 関数名:this.getJsonFile = function(jsonPath,map)
	 * 概要  :JSONファイルを取得して返す。
	 * 引数  :String jsonPath:JSONを要求する先。
	 * 		:Object map:サーバへ渡す値の連想配列。実際に送信する際にはJSON文字列への変換を行う
	 * 		:String key:取得したJSONを格納するためのキー。
	 * 返却値  :Object
	 * 作成者:T.Masuda
	 * 作成日:2015.02.12
	 * 変更者:T.Masuda
	 * 変更日:2015.03.30
	 * 内容　:サーバへ連想配列を渡せる様に変更しました。
	 * 変更者:T.Masuda
	 * 変更日:2015.06.09
	 * 内容　:サーバへJSON文字列を渡せる様に変更しました。また、キー名を指定してJSONを格納できるように変更しました。
	 */
	this.getJsonFile = function(jsonPath, map, key){
		//一時的に値を保存する変数tmpを宣言する。
		var tmp;
		//関数内でいつでもthisを参照できるように変数に格納する
		var thisElem = this;
		
		//mapに何も入力されていなければ、空の連想配列を代入する。入力されていればJSON文字列に変換する
		map = map === void(0) ? {json:""} : JSON.stringify(map);
		//Ajax通信でjsonファイルを取得する。
		$.ajax({
			//jsonファイルのURLを指定する。
			url: jsonPath + CHAR_QUESTION + commonFuncs.getNowUnixTime(),
			//取得するファイルの形式をJSONに指定する。
			dataType: 'JSON',
			//POSTメソッドでデータを送信する
			type:'POST',
			//同期通信を行う。
			async: false,
			//サーバへ連想配列を送信する。
			data: {json:map,key:''},
			//キャッシュを無効にする。
			cache:false,
			//通信完了時の処理を記述する。
			success: function(json){
				//通常通りJSONが取得できていれば(JSONにcreateTagStateのキーがない)
				if(!('createTagState' in json)){
					//クラスのメンバjsonに取得したjsonの連想配列を格納する。
					tmp = json;
				//返ってきたJSONにログイン状態のキーがあれば
				} else{
					//ログイン状態の例外を投げる。
					throw new loginStateError(parseInt(json.createTagState));	
				}
			},
			//通信失敗時の処理。
			error:function(xhr, status, error){
				//エラーのアラートを出す。
				alert(thisElem.MESSAGE_FAILED_TO_GET_FILE + jsonPath);
				throw error;
			}
		});

		//@mod 2015.0609 T.Masuda 条件分岐を追加しました
		//フィールドのメンバのjsonが空であれば
		if(this.json == null){
			//keyが入力されていたら、オブジェクトを生成し、その中にtmpを格納する。
			//そうでなければ、そのままtmpを格納する
			this.json = key !== void(0) && key!= ''?{key:tmp}:tmp;
			//キーが入力されていたら
		} else if(key !== void(0)){
			//指定したキーにJSONを格納する
			var tmpObj = {};	//統合用オブジェクトを作る
			tmpObj[key] = tmp;	//統合用オブジェクトにkeyのキーを作り、valueをセットする
			//オブジェクトを統合する
			$.extend(true, this.json, tmpObj);
		//既にJSONが格納されていたら
		} else {
			//連想配列を連結する。
			this.json = $.extend(true, this.json, tmp);
		}
		
		return tmp;	//取得したデータを返す
	};

	/* 
	 * 関数名:this.getDomFile = function((domPath))
	 * 概要  :JSONファイルを取得して返す。
	 * 引数  :String jsonPath
	 * 返却値  :Object
	 * 作成者:T.Masuda
	 * 作成日:2015.02.12
	 */
	this.getDomFile = function(htmlPath){
		//一時的に値を保存する変数tmpを宣言する。
		var tmp;
		//関数内でいつでもthisを参照できるように変数に格納する
		var thisElem = this;
		
		//Ajax通信でjsonファイルを取得する。
		$.ajax({
			//jsonファイルのURLを指定する。
			url: htmlPath + CHAR_QUESTION + commonFuncs.getNowUnixTime(),
			//取得するファイルの形式をJSONに指定する。
			dataType: 'HTML',
			//同期通信を行う。
			async: false,
			//キャッシュを無効にする。
			cache:false,
			//通信完了時の処理を記述する。
			success: function(html){
				//クラスのメンバdomに取得したDOMのオブジェクトを格納する。
				tmp = html;
			},
			//通信失敗時の処理。
			error:function(){
				//エラーのアラートを出す。
				alert(thisElem.MESSAGE_FAILED_TO_GET_FILE + htmlPath);
			}
		});
		
		//DOMが空であれば
		if(this.dom == ''){
			//クラスのメンバのdomにtmpのHTML文字列をオブジェクトに変換して格納する。
			this.dom = $(tmp);
		//既にDOMがあれば
		} else {
			//DOMを追加する。
			$(this.dom).append($('> *',tmp));
		}
	};

	/* 
	 * 関数名:readyCreateTag
	 * 概要  :JSON、DOMのトップノードを引数で指定して返す
	 * 引数  :String key, String domNodeName
	 * 返却値  :Object:JSON、DOMのトップノードをオブジェクトにまとめて返す
	 * 設計者:H.Kaneko
	 * 作成者:T.Masuda
	 * 作成日:2015.06.09
	 */
	this.readyCreateTag = function(key, domNodeName){
		//domNodeNameがundefined(未入力)であれば、キー名をdomNodeNameにする。
		domNodeName = domNodeName === undefined ? key : domNodeName;
			
		//JSONとDOMのトップノードをオブジェクトにまとめて返す
		return {json:this.getMapNode(key), dom:this.getDomNode(domNodeName)};
	}	
	
	/* 
	 * 関数名:this.outputTag = function(key, domNodeName, appendTo)
	 * 概要  :JSONのキー、DOMのノードを指定して画面パーツを作り追加する。
	 * 引数  :String key, String domNodeName, String appendTo
	 * 返却値  :なし
	 * 設計者:H.Kaneko
	 * 作成者:T.Masuda
	 * 作成日:2015.02.20
	 * 修正者:T.Masuda
	 * 修正日:2015.06.09
	 * 内容　:createTagに渡す値を取得するコードをサブ関数化しました(指示者:H.Kaneko)
	 */
	this.outputTag = function(key, domNodeName, appendTo){
		//@mod 2015.0609 T.Masuda JSON、DOMをオブジェクトにまとめて取得するようにしました(指示者:H.Kaneko)
		var headNodes = this.readyCreateTag(key, domNodeName);
		
		//@mod 2015.0609 T.Masuda createTagの引数をオブジェクトから取得した値にしました(指示者:H.Kaneko)
		// createTagでキーに対応したHTMLのパーツを作成し、変数tagに格納する。
		var tag = this.createTag(headNodes[STR_JSON], headNodes[STR_DOM]);
		// パーツの作成に成功したならば
		if(tag != null){
			//@mod 2015.03.10 T.Masuda 第三引数appendToに対応しました。(指示者:H.Kaneko)
			//appendToが入力されていれば
			if(appendTo != null){
				//appendで、作成したタグをappendToに追加する。
				$(appendTo).append(tag);
			//appendToが空であれば	
			} else {
				//appendで作成したタグをmainに追加する。
				$(SELECTOR_MAIN).append(tag);
			}
			//@mod 2015.03.10 T.Masuda ここまで変更しました。(指示者:H.Kaneko)
		// パーツの作成に失敗したならば
		} else{
			//失敗のメッセージダイアログを出す。
			console.log(key + 'の作成に失敗しました。');
		}
	}
	
	/* 
	 * 関数名:this.createTag = function(curMapNode, curDomNode)
	 * 概要  :JSON連想配列のキーからタグに値を格納する。
	 * 引数  :Object curMapNode:カレントのJSONのオブジェクト
	 * 　　  :Element curDomNode:カレントのDOMの先頭
	 * 返却値  :なし
	 * 設計者:H.Kaneko
	 * 作成者:T.Masuda
	 * 作成日:2015.02.19
	 */
	this.createTag = function(curMapNode, curDomNode){
		
		//マップ、DOMが取得できていなかったら
		if(curMapNode == null || curDomNode == undefined){
			//処理を終える。
			return null;
		}
				
		//連想配列に子がいる限りループする。
		for(key in curMapNode){
			var mapNode = curMapNode[key];	//mapNodeの内容をcurMapNode内のmapNodeの参照に切り替える。
			var attribute = false;				//属性値を格納する変数
				if(key == 'cancel~0'){
					console.log('key:' + key + ' dom:' + curDomNode);
					//break;
				}
			
			//キーがtextであれば
			if(key == 'text'){
				//curDomにテキストtextメソッドで追加する。
				curDomNode.text(mapNode);
			//キーがHTMLであれば
			} else if(key == 'html'){
				//curDomにテキストをhtmlメソッドで追加する。
				curDomNode.html(mapNode);
			//mapNodeが配列であれば
			} else if($.isArray(mapNode)){
				//キー名でタグを作成し、そのテキストにキー値をセットする。
				this.createTagArray(key, mapNode, curDomNode);
			//mapNodeが子であれば
			} else if(typeof mapNode == 'object'){
				//カレントの子DOMノードからkeyを持つDOMノードを取得する。
				var domNode = this.getDomChild(key, curDomNode);
				//domNodeがundefinedでなければ
				//@mod 2015.0611 T.Masuda 「DOMが取得できなかったとき」の条件文を修正しました
				if(domNode[0] !== void(0)){
					//子ノードへ再帰する。
					this.createTag(mapNode, domNode);
				}
			//curDomNodeのAttribute配列からmapNodeのキー値を持つノードを取得する。
			} else if(attribute = curDomNode[0].getAttributeNode(key)){
				//取得したノードにmapNodeの値をセットする。
				attribute.value = mapNode;
			}
		}
	
		//curDomNodeを返す。
		return curDomNode;
	};
	
	/* 
	 * 関数名:this.getMapNode = function(key)
	 * 概要  :JSON連想配列の最上階層からキーに対応した値を取り出す。
	 * 引数  :String key
	 * 返却値  :Object
	 * 作成者:T.Masuda
	 * 作成日:2015.02.12
	 */
	this.getMapNode = function(key){
		//クラスメンバの連想配列からキーに応じた連想配列を返す。
		return this.json[key];
	};

	/* 
	 * 関数名:this.getDomNode = function(key)
	 * 概要  :キーに対応するHTMLのパーツを返す。
	 * 引数  :String key
	 * 返却値  :jQuery
	 * 作成者:T.Masuda
	 * 作成日:2015.02.12
	 * 内容  :テンプレートのHTMLそのものではなく、コピーを返す様に変更しました。
	 */
	this.getDomNode = function(key){
		//メンバのHTMLからキーに対応した要素をコピーして返す。
		return $($(' > *[class="' + key +'"]', this.dom).clone(false));
	};
	
	/* 
	 * 関数名:this.createTagArray = function(mapNode, domNode)
	 * 概要  :リストタイプのタグを配置する。
	 * 引数  :String key, Object mapNode, jQuery domNode
	 * 返却値  :なし
	 * 設計者:H.Kaneko
	 * 作成者:T.Masuda
	 * 作成日:2015.02.19
	 * 内容　:本来想定されていた動作に修正されました。
	 */
	this.createTagArray = function(key, mapNode, domNode){
		//domNodeのキーの要素を取得する。
		domNode = this.getDomChild(key, domNode); 
		
		//引数にnullがあれば
		if(key == null || mapNode == null || domNode == null){
			//処理をやめる。
			return;
		}

		//不足しているタグの個数を算出する。
		var clones = mapNode.length - 1;
		//domNodeを必要な分コピーする。
		for(var i = 0; i < clones; i++){
			//1個目のmapNodeの後ろに自身のコピーを追加する。
			$(domNode[0]).after($(domNode[0]).clone(false));
		}

		//mapNodeの配列分ループする。
		for(var i = 0; i < mapNode.length; i++){
			//mapNode[i]が配列であれば
			if($.isArray(mapNode[i])){
				//キー名でタグを作成し、そのテキストにキー値をセットする。
				this.createTagArray(key, mapNode, curDomNode);
			//mapNode[i]が子であれば
			} else if(typeof mapNode[i] == 'object'){
				//カレントのDOMノードの子ノードを取得する。子ノードは属性で特定する。
				//@mod 2015.0704 T.Masuda テーブル用配列「table」によるエラー回避の修正をしました
				var childDomNode = domNode[0] !== void(0) ? this.getDomChild(' > [' + domNode[0].children[0].attributes[0].name + ']', domNode) : null;
				//childDomNodeがnullでなければ
				if(childDomNode){
					//子ノードへ再帰する。
					this.createTag(mapNode[i], childDomNode);
				}
			//ただのテキストであれば
			} else {
				//テキストを書き込む。
				$(domNode).text(mapNode[i]);
			}
			
			//domNodeを次に移動する。
			domNode = $(domNode).next();
		}
	}

	/* 
	 * 関数名:this.getDomChild = function(key, domNode)
	 * 概要  :リストタイプのタグを配置する。
	 * 引数  :String key, jQuery domNode
	 * 返却値  :なし
	 * 設計者:H.Kaneko
	 * 作成者:T.Masuda
	 * 作成日:2015.02.19
	 * 内容　:タグに対応しました。
	 */
	this.getDomChild = function(key, domNode){
		var domNodeReturn;							//domNodeの返却用変数を作る。

		//子要素の識別子が記述されていなければ
		if(key.indexOf('>') == -1){
			domNodeReturn = $('.' + key, domNode);	//domNodeの子の階層からkeyのクラスを持つノードを取得する。
		//子要素のセレクタであったら
		}else{
			domNodeReturn = $(key, domNode);	//domNodeの子の階層から指定した属性を持つノードを取得する。
		}
		//DOMの取得に失敗したら
		if(domNodeReturn[0] == null){
			//domNodeの子の階層からkeyのタグ名を持つノードを取得する。
			domNodeReturn = $(key, domNode);
		}
		
		//domNodeReturnを返す。
		return domNodeReturn;
	}
	
	/* 
	 * 関数名:this.outputNumberingTag = function(jsonName, startPage, displayPageMax, displayPage, pageNum, targetArea)
	 * 概要  :ナンバリングと、それに応じたブログのページを作る。
	 * 使い方の補足:この関数をコールする前に、記事挿入先のタグとnumberingOuterクラスを持つタグを作成してください。
	 * 引数  :String jsonName:処理対象となるJSONのキー名。
	 * 		 int startPage:表示する1つ目のナンバリングの数
	 * 		 int displayPageMax:表示するナンバリングの最大数
	 * 		 int displayPage:表示するブログのページ番号
	 * 		 int pageNum:1ページに表示する記事数。
	 * 		 String targetArea:記事の追加先のセレクタ。
	 * 		String callBack:実行させたいコードの文字列
	 * 返却値  :なし
	 * 設計者:H.Kaneko
	 * 作成者:T.Masuda
	 * 作成日:2015.03.12
	 * 変更者:T.Masuda
	 * 変更日:2015.04.08
	 * 内容　:引数を追加して1ページに複数の記事を表示するのに対応しました。
	 * 変更者:T.Masuda
	 * 変更日:2015.04.09
	 * 内容　:引数に作成した記事の追加先を追加しました。
	 * 変更者:T.Masuda
	 * 変更日:2015.07.29
	 * 内容　:新しい記事の形式に対応しました。配列にも対応します。
	 * 変更者:T.Masuda
	 * 変更日:2015.08.08
	 * 内容　:日付による記事絞り込みに対応しました。
	 */
	this.outputNumberingTag = function(jsonName, startPage, displayPageMax, displayPage, pageNum, targetArea, callBack, createTagSelector){

		//createTag取得用のセレクタが空なら空文字を入れる。
		createTagSelector = commonFuncs.checkEmpty(createTagSelector) ? createTagSelector : EMPTY_STRING;
		
		var articles = this.checkArticleDate(jsonName);	//日付を確認する関数を実行する
		//記事の絞り込みが行われていたら、そのまま代入する。そうでなければjsonNameからオブジェクトを取得する
		articles = articles != null? articles:this.getMapNode(jsonName);	
		
		//numberingの内容をクリアする（numberingはクラスのメンバとして宣言する）
		this.numbering = {};		

		//ナンバリング用のJSONを作る。
		this.createNumbering(jsonName, startPage, displayPageMax, displayPage ,pageNum, targetArea, callBack, articles, createTagSelector);
		
		//記事を消す
		$(targetArea).empty();

		
		//JSONが配列形式であれば
		if($.isArray(articles[TABLE_DATA_KEY])){
			//コンテンツ表示
			$(targetArea).append(this.createTagTable(articles, this.getDomNode(jsonName) , pageNum, displayPage));
		//JSONが連想配列形式であれば
		} else {
			//コンテンツ表示
			this.outputKeyNumberObject(articles, jsonName, targetArea, pageNum, displayPage)
		}
		
		//ナンバリングを消す。
		$(targetArea).siblings('.numberingOuter').empty();
		
		// add T.Masuda 2015/0421 ナンバリングが生成されない時にcreateTagのエラーがコンソールに出力されるバグの修正
		// add T.Masuda 2015/0422 numberingオブジェクトが生成されていない状況への対応
		//ナンバリングのオブジェクトがあれば
		if('numbering' in this.json && '1' in this.json.numbering){
			//ナンバリング用Tagを表示する。
			this.outputTag('numbering', 'numbering', $(targetArea).siblings('.numberingOuter'));
			//現在表示中のページに対応するナンバリングの色を変える。
			this.selectPageNumber(displayPage, targetArea);
		}
		
		//スクロール位置が低ければ
		if($(window).scrollTop() > $(".main").offset().top){
			//スクロール位置を上に戻す。記事が見えなくならないようにするため、.mainの縦座標を基準に移動する。
			window.scroll(0,$(".main").offset().top);
		}
		
		//コールバック関数が入力されていれば
		if(commonFuncs.checkEmpty(callBack) && callBack != 'undefined'){
			var evaled = eval(callBack);	//評価する
			//evaledが関数であれば
			if(evaled instanceof Function == true){
				evaled(this);	//関数を実行する
			}
		}
	}

	/* 
	 * 関数名:this.createNumbering = function(jsonName, startPage, displayNum, pageNum)
	 * 概要  :ブログページのナンバリング(ページャ)を作る。
	 * 引数  :String jsonName:JSON名。
	 * 		 int startPage:表示する1つ目のナンバリングの番号。
	 * 		 int displayPageMax:表示するナンバリングの最大個数。
	 * 		 int pageNum:1ページに表示する記事数。
	 * 		Function callBack:終了後に実行する関数
	 * 		articles Object:記事データ
	 * 返却値  :なし
	 * 設計者:H.Kaneko
	 * 作成者:T.Masuda
	 * 作成日:2015.03.12
	 * 変更者:T.Masuda
	 * 変更日:2015.04.08
	 * 内容　:引数pageNumを追加し、1ページに複数の記事を載せることに対応しました。
	 */
	this.createNumbering = function(jsonName, startPage, displayPageMax, displayPage, pageNum, targetArea, callBack, articles, createTagSelector){
		//ページ数を取得する。
		var pageMax = Math.ceil(this.getJsonObjectNum(jsonName, articles) / pageNum);
		
		//ページ数が1以下ならナンバリングを作成せずに終了する。
		if(pageMax <= 1){
			//空のナンバリングを用意する
			this.numbering = {};						//メンバのナンバリングを空オブジェクトにする
			this.json['numbering'] = this.numbering;	//JSON内のナンバリングをメンバのナンバリングで上書きする
			return;										//処理を終えて呼び出し元に戻る
		}
		
		// <<ボタンを作る。(1ページ前に進める)
		this.createNumberingAround(this.numbering, 'pre', '<<', startPage,
										displayPageMax, displayPage-1, pageMax, jsonName, pageNum, targetArea, callBack, createTagSelector);

		//ナンバリングの中の最後の数字を算出して変数に格納する。最終ページを超えていれば最終ページに丸める。
		var lastPage = (startPage + displayPageMax) <= pageMax ? (startPage + displayPageMax) : pageMax;
		
		//for文でナンバリングを必要なだけ作る。
		for(var i = startPage; i <= lastPage; i++){
			var indexText = (i - startPage + 1).toString();	//ナンバリングのボタンの連番の数値を文字列にする。
			var map = {};									//ページ数をキーとしたオブジェクトを生成する。
			map[indexText] = {};							//mapにindexTextの値をキーとした連想配列を追加する。
			
			//"text"キーにページ数を設定する。
			map[indexText]['text'] = i;
			//関数実行属性にoutputNumberingTagを設定する。
			map[indexText]['onclick'] = createTagSelector + 'create_tag.outputNumberingTag("' 
				+ jsonName + '",' + startPage + ', ' + displayPageMax + ',' + i + ', ' + pageNum + ',"' + targetArea + '","' + callBack + '", "' + createTagSelector + '")';
			//numberingオブジェクトの中に、作成したオブジェクトを追加する。
			this.numbering[indexText] = map[indexText];
		}
			
		// <<ボタンを作る。(1ページ後に進める)
		this.createNumberingAround(this.numbering, 'next', '>>', startPage,
										displayPageMax, displayPage+1, pageMax, jsonName, pageNum, targetArea, callBack, createTagSelector);
			
		//メンバjsonオブジェクトにnumberingオブジェクトを追加する。
		this.json['numbering'] = this.numbering;
		//numberingオブジェクトを返す。
		return this.numbering;
	}
	
	/* 
	 * 関数名:this.createNumberingAround = function(numbering, key, numberingString, startPage, displayPageMax, displayPage, pageMax,, jsonName, pageNum, targetArea)
	 * 概要  :ナンバリングの<<、>>を作る。
	 * 引数  :object numbering:ナンバリングが格納されている連想配列
	 * 		 string key:キー名。'pre'または'next'が入っている。
	 * 		 String numberingString:該当するナンバリングの文字。
	 * 		 int startPage:表示する最初のナンバリングの番号。
	 * 		 int displayPageMax:表示するナンバリングの個数。
	 * 		 int displayPage:現在のページ番号。
	 * 		 int pageMax:全ページ数。
	 * 		String jsonName:JSON名。
	 * 		int pageNum:1ページに表示する記事数。
	 * 		String targetArea:記事の追加先。
	 * 		Function callBack:終了後に実行する関数
	 * 返却値  :なし
	 * 設計者:H.Kaneko
	 * 作成者:T.Masuda
	 * 作成日:2015.03.12
	 */
	this.createNumberingAround = function(numbering, key, numberingString, startPage, displayPageMax, displayPage, pageMax, jsonName, pageNum, targetArea, callBack, createTagSelector){
		var startAroundPage;
		
		//開始ページを算出する
		//前移動の場合
		if (key === 'pre' && startPage > 1) {
			//開始ページを算出、1ページ以下の場合には1ページに丸める
			startAroundPage = startPage > displayPage ? (startPage-1) : startPage;		
		//後移動の場合
		} else if (key === 'next' && (startPage+displayPageMax) < pageMax) {
			//開始ページを算出、表示ページが最終ページを超えている場合、最終ページから開始ページを逆算する。
			startAroundPage = (startPage+displayPageMax) < displayPage ? startPage+1 : startPage;		
		//上記以外の場合
		} else {
			return;
		}
		
		var keyObj = {};	//keyオブジェクトを生成する。
		keyObj[key] = {};	//keyのキーを持った連想配列を追加する。
		
		//有効属性をONにする。
		keyObj[key]['enable'] = 'on';
		//実際に設定する文字をtextに設定する。
		keyObj[key]['text'] = numberingString;
		
		//関数実行属性をoutputNumberingTagに設定する。
		keyObj[key]['onclick'] = createTagSelector + 'create_tag.outputNumberingTag("' + jsonName +'",'
			+ Math.round(startAroundPage) +','+ displayPageMax + ',' + displayPage +', ' + pageNum + ',"' + targetArea + '","' + callBack + '", "' + createTagSelector + '")';
		 
		//numberingオブジェクトの中に追加する。
		numbering[key] = keyObj[key];
	}

	/* 
	 * 関数名:getJsonObjectNum
	 * 概要  :メンバjsonの指定キー内の整数値のキーの数を返す。
	 * 引数  :String jsonName:メンバJSONルートの処理対象のJSONのキー名。
	 * 		:Object Articles:記事データの連想配列
	 * 返却値  :int:整数値のキーの数を返す。
	 * 作成者:T.Masuda
	 * 作成日:2015.03.13
	 * 変更者:T.Masuda
	 * 変更日:2015.07.29
	 * 内容　:jsonNameと定数「ARTICLE_OBJECT_KEY」で走査対象のオブジェクトを指定するようにしました。
	 * 変更者:T.Masuda
	 * 変更日:2015.08.08
	 * 内容　:引数を増やして記事絞り込みに対応しました。
	 */
	this.getJsonObjectNum = function(jsonName, articles){
		//返却する値を格納するための変数を宣言、0で初期化する。
		var retNum = 0;

		//@mod 2015.0729 T.Masuda 走査対象のオブジェクトを変えました。
		//メンバのJSONルートにある、引数の文字列と一致するキーのオブジェクトのtableキーを走査対象にする。
		//tableキーの文字列は定数で定義してあるので任意で変更可。
		//@mod 2015.0809 T.Masuda 引数のオブジェクトから記事数を取得するようにしましたなければメンバを見ます。
		var $searchObject = articles !== void(0)? articles[TABLE_DATA_KEY]: this.json[jsonName][TABLE_DATA_KEY];

		//配列であれば
		if($.isArray($searchObject)){
			retNum = $searchObject.length;	//要素数を取り出す
		//連想配列であれば
		} else {
			//該当するオブジェクトを走査する。
			for(key in $searchObject){
				//for(key in this.json){
				//2015.0729 ここまで変更しました。
				//キーが数字であれば
				if(!(isNaN(key))){
					//retNumに1を足す
					retNum++;
				}
			}
		}
		
		//retNumを返す。
		return retNum;
	}
	
	/* 
	 * 関数名:this.selectPageNumber = function(displayPage)
	 * 概要  :選択中のナンバリングの色を変える。
	 * 引数  :int displayPage:表示中のページ番号。
	 * 返却値  :なし
	 * 作成者:T.Masuda
	 * 作成日:2015.03.13
	 * 変更者:T.Masuda
	 * 変更日:2015.11.03
	 * 内容　:指定した領域以外のナンバリングまで色を変えてしまっていたため修正しました
	 */
	this.selectPageNumber = function(displayPage, targetArea){
		
		//対象となるナンバリングの領域を取得する
		var targetNumberingOuter = $(targetArea).siblings('.numberingOuter');
		//全てのナンバリングからselectクラスを除去する。
		$('li', targetNumberingOuter).removeClass('select');
		//選択中のナンバリングのタグにselectクラスを付与して色を変える。
		$('li:contains(' + displayPage + ')', targetNumberingOuter).addClass('select');
	}

	/*
	 * 関数名:this.createElementTag = function(stackKey, curMapNode, topDomNode)
	 * 概要  :JSONのノードに対応したタグを作る。
	 * 引数  :String stackKey:
	 * 　　　:Object curMapNode:
	 * 　　　:Element topDomNode:
	 * 返却値  :なし
	 * 設計者:H.Kaneko
	 * 作成者:T.Masuda
	 * 作成日:2015.04.01
	 */
	this.createElementTag = function(stackKey, curMapNode, topDomNode){
		//curMapNodeがnullであれば
		if(curMapNode == null){
			return;	//処理を終える。
		}
		
		//ノードがある限りループする。
		for(key in curMapNode){
			var mapNode = curMapNode[key];	//ループで走査しているキーの値を取得する。
			var curDomNode = null;			//カレントのDOMノードを格納する変数を宣言、nullで初期化する。
			
			//mapNodeが配列であれば
			if($.isArray(mapNode)){
				//スタックした文字列とテキストの配列からタグ群を作り出す。
				curDomNode = this.createKeysToTagArray(stackKey, mapNode, key);
			//オブジェクトであれば
			} else if(typeof mapNode == "object"){
				stackKey.push(key);			//stackKeyにkeyを追加する。
				this.createElementTag(stackKey, mapNode, topDomNode);	//再帰呼び出しを行う。
				stackKey.pop();				//stackKeyの末尾を削除する。
			//textであれば
			} else if(key == 'text'){
				//スタックしたkey文字列とテキストをタグ化する。
				curDomNode = this.createKeysToTag(stackKey, mapNode, key);
			//htmlであれば
			} else if(key == 'html'){
				//スタックしたkey文字列とテキストをタグ化する。
				curDomNode = this.createKeysToTag(stackKey, mapNode, key);
			}
			//DOMが生成されていたら
			if(curDomNode != null){
				//topDomNodeの最後尾にcurDomNodeを追加する。
				$(topDomNode).append($(curDomNode));
			}
		}
	}	

	/*
	 * 関数名:this.createKeysToTag = function(curStackKey, mapNode, key)
	 * 概要  :スタックからキーのタグ、テキストから編集用のタグを作る。
	 * 引数  :Array curStackKey:キー名のスタック。
	 * 　　　:String mapNode:JSONのテキスト。
	 * 　　　:String key:カレントのキー。
	 * 返却値  :Element
	 * 設計者:H.Kaneko
	 * 作成者:T.Masuda
	 * 作成日:2015.04.01
	 */
	this.createKeysToTag = function(curStackKey, mapNode, key){
		//retDomに外枠となるタグを格納する。
		var retDom = $('<div></div>')
						.addClass('keyAndValue')	//キーと値の組み合わせの意味合いのクラスを枠に付ける。
						.append($('<span></span>')	//キーの要素を格納するタグを生成する。
								.addClass('keys'))
						.append($('<span></span>')	//値の要素を格納するタグを生成する。
								.addClass('values')
						);

		//キーのタグを群を作る。
		var keys = this.createKeyTags(curStackKey);
		//キーのタグをまとめるタグに追加する。
		$('.keys', retDom).append(keys);

		curStackKey.push(key);	//スタックにカレントのキーを加える。
		
		//スタックの文字列を_を区切り文字にして連結する。
		var connectedKey = curStackKey.join('_');
		//編集用テキストエリアのラベルを追加する。
		$('.values', retDom).append($('<label></label>').addClass('valueLabel').text(key));
		//編集用テキストエリアを追加する。name属性には_で区切ったキーを格納する。
		$('.values', retDom).append($('<textarea></textarea>').addClass('editValue').val(mapNode).attr('name', connectedKey));

		curStackKey.pop();	//末尾に加えたキーを消す。
		
		//作成したDOMを返す。
		return retDom;
	}
	
	/*
	 * 関数名:this.createKeysToTagArray = function(curStackKey, mapNode, key)
	 * 概要  :スタックからキーのタグ、テキストから編集用のタグを複数作る。
	 * 引数  :Array curStackKey:キー名のスタック。
	 * 　　　:String mapNode:JSONの文字列配列。
	 * 　　　:String key:カレントのキー。
	 * 返却値  :Element
	 * 設計者:H.Kaneko
	 * 作成者:T.Masuda
	 * 作成日:2015.04.01
	 */
	this.createKeysToTagArray = function(curStackKey, mapNode, key){
		//retDomに外枠となるタグを格納する。
		var retDom = $('<div></div>')
						.addClass('keyAndValue')	//キーと値の組み合わせの意味合いのクラスを枠に付ける。
						.append($('<span></span>')	//キーの要素を格納するタグを生成する。
								.addClass('keys'))
						.append($('<span></span>')	//値の要素を格納するタグを生成する。
								.addClass('values')
						);
	
		curStackKey.push(key);	//スタックにカレントのキーを加える。
		//キーのタグを群を作る。
		var keys = this.createKeyTags(curStackKey);
		//キーのタグをまとめるタグに追加する。
		$('.keys', retDom).append(keys);
		
		//スタックの文字列を_を区切り文字にして連結する。
		var connectedKey = curStackKey.join('_');
		//テキスト編集用のタグを入れるタグのjQueryオブジェクトを生成、保存する。
		var $values = $('.values', retDom);
		//ループのカウント用にmapNodeの要素数を取得する。
		var mapNodeArrayLength = mapNode.length;
		
		//mapNodeを走査する。
		for(var i = 0; i < mapNodeArrayLength; i++){
			//編集用テキストエリアを追加する。name属性には_で区切ったキーを格納する。
			$values.append($('<textarea></textarea>').addClass('editValue').val(mapNode[i]).attr('name', connectedKey));
		}
		
		curStackKey.pop();	//末尾に加えたキーを消す。
		
		//作成したDOMを返す。
		return retDom;		
	}

	/*
	 * 関数名:this.createKeyTags = function(curStackKey)
	 * 概要  :キーのタグ群を作る。
	 * 引数  :Array curStackKey:キーのスタック。
	 * 返却値  :Element
	 * 設計者:H.Kaneko
	 * 作成者:T.Masuda
	 * 作成日:2015.04.01
	 */
	this.createKeyTags = function(curStackKey){
		var retDom = $('<div></div>');	//返却用の変数を宣言、初期化する。仮の枠となるdivタグを生成する。
		//スタックの要素数を取得する。
		var stackLength = curStackKey.length;
		
		//curStackKeyを走査する。
		for(var i = 0; i < stackLength; i++){
			//最後の要素でなければ
			if(i < stackLength - 1){
				//キーのタグをretDomに追加する。
				$(retDom).append($('<span></span>').addClass('key').text(curStackKey[i]));
			//最後の要素なら
			} else {
				//キーのタグをretDomに追加する。
				$(retDom).append($('<span></span>').addClass('key currentKey').text(curStackKey[i]));
			}
		}

		//作成したDOMを返す。
		return $(' > span', retDom);
	}
	
	/*
	 * 関数名:this.updateElementJson = function(topMapNode, topDomNode)
	 * 概要  :タグの内容をJSONに反映させる。
	 * 引数  :Object topMapNode:更新対象のJSONの先頭のノード
	 * 　　　:Element topDomNode:先頭のDOM
	 * 返却値  :なし
	 * 設計者:H.Kaneko
	 * 作成者:T.Masuda
	 * 作成日:2015.04.01
	 */
	this.updateElementJson = function(topMapNode, topDomNode){
		//ループ内ではthisでクラスインスタンスを参照できないので、変数に格納しておく
		var own = this;
		var prevName = "";	//1回前の走査した要素のname属性を保存する変数を用意する。
		//弟DOMがある限りループする。編集用テキストエリアのDOMを走査することで、この処理を実現する。
		$('.editValue', topDomNode).each(function(){
			var thisName = $(this).attr('name');	//現在のDOMのname属性を取得する。
			//前回の走査が配列ノードの2番目以降であればスキップする。
			if(thisName != prevName){
				//テキストエリアのname属性からスタックキーを生成する。
				var stackKey = thisName.split('_');
				//スタックキーからカレントのキーを取り出す。
				var key = stackKey[stackKey.length - 1];
				
				//スタックkeyに一致するノードを返す。
				var mapNode = own.findMapNode(stackKey, topMapNode);
				
				//ノードがtextであれば
				if(key == 'text'){
					//タグの文字列をJSONノードにセットする。
					mapNode[key] = $(this).val();
					//htmlであれば
				} else if(key == 'html'){
					//タグの文字列をJSONノードにセットする。
					mapNode[key] = $(this).val();
					//配列であれば
				} else if($.isArray(mapNode[key])){
					//処理対象となるDOMを全て取得する。
					var $targetArray = $('textarea[name="' + thisName + '"]', topDomNode);
					//DOMの配列の要素数を取得する。
					var arrayLength = $targetArray.length;
					//JSONの配列にリサイズが必要であれば、DOM配列の要素数と一致させる(リサイズする)。
					mapNode[key] = new Array(arrayLength);
					//配列数分ループ
					$targetArray.each(function(i){
						//JSON側の文字列配列にDOM配列の文字列をコピーする。
						mapNode[key][i] = $(this).val();
					});
				}
			}
			
			prevName = thisName;	//前回のname属性を更新する。
		});
	}

	/*
	 * 関数名:this.findMapNode = function(curStackKey, curMapNode)
	 * 概要  :トークン文字列に該当するJSONノードを探し返す。
	 * 引数  :Array curStackKey:スタックされたキーの配列
	 * 　　　:Object curMapNode:カレントの連想配列のノード
	 * 返却値  :なし
	 * 設計者:H.Kaneko
	 * 作成者:T.Masuda
	 * 作成日:2015.04.01
	 */
	this.findMapNode = function(curStackKey, curMapNode){
		//連想配列のノードを返却するための変数を宣言、nullで初期化する。
		var returnMapNode = null;
		
		//引数がnullなら
		if(curStackKey == null || curMapNode == null){
			return;	//処理を終える。
		}
		
		//先頭のトークンを取得する。
		var key = curStackKey[0];
		//keyに一致したNodeがあれば
		if(key in curMapNode){
			//curStackKeyから先頭トークンを取り除く
			curStackKey.shift();
			//keyに該当するノードを取得する。
			var mapNode = curMapNode[key];
			//curStackKeyが空であれば ※完全に空になるまでやるとノードの参照が失われるため、空になる一歩手前までにします。
			if(curStackKey.length == 1){
				//現在のノードを返却用の変数に格納する。
				returnMapNode = mapNode;
			//そうでなければ
			} else {
				//再帰して階層を潜る。
				//@mod 2015.0627 T.Masuda 
				returnMapNode = this.findMapNode(curStackKey, mapNode);
			}
		}
		
		//ノードを返す。
		return returnMapNode;
	}

	/*
	 * 関数名:this.getJsonForCustomize = function(rootName, jsonPath)
	 * 概要  :編集用にJSONを取得する。
	 * 引数  :String rootName:JSONを格納するキー
	 * 　　  :String jsonPath:JSONファイルのURL
	 * 返却値  :なし
	 * 作成者:T.Masuda
	 * 作成日:2015.04.01
	 */
	this.getJsonForCustomize = function(rootName, jsonPath){
		//一時的に値を保存する変数tmpを宣言する。
		var tmp;

		//Ajax通信でjsonファイルを取得する。
		$.ajax({
			//jsonファイルのURLを指定する。
			url: jsonPath + CHAR_QUESTION + commonFuncs.getNowUnixTime(),
			//取得するファイルの形式をJSONに指定する。
			dataType: 'JSON',
			//同期通信を行う。
			async: false,
			//キャッシュを無効にする。
			cache:false,
			//通信完了時の処理を記述する。
			success: function(json){
				//クラスのメンバjsonに取得したjsonの連想配列を格納する。
				tmp = json;
			},
			//通信失敗時の処理。
			error:function(){
				//エラーのダイアログを出す。
				alert('通信に失敗しました。');
			}
		});

		//フィールドのメンバのjsonが空であれば
		if(tmp != null){
			//クラスのメンバのjsonにtmpの連想配列を格納する。
			this.json[rootName] = tmp;
		} 
	}
	
	/* 
	 * 関数名:this.outputTagTable = function(key, domNodeName, appendTo)
	 * 概要  :JSON配列からテーブルを作り、画面に追加する
	 * 引数  :String key:JSON配列を格納しているキー
	 * 	　　 :String domNodeName:テーブルのクラス名
	 * 	　　 :String appendTo:作成したテーブルの追加先
	 * 返却値  :なし
	 * 設計者:H.Kaneko
	 * 作成者:T.Masuda
	 * 作成日:2015.06.09
	 */
	this.outputTagTable = function(key, domNodeName, appendTo){
		//取得するJSONとDOMの先頭のノードをオブジェクトにまとめて取得する
		var headNodes = this.readyCreateTag(key, domNodeName);
		
		// createTagTableでテーブルを作成し、変数tagに格納する。
		var tag = this.createTagTable(headNodes[STR_JSON], headNodes[STR_DOM]);
		// パーツの作成に成功したならば
		if(tag != null){
			//appendToが入力されていれば
			if(appendTo != null){
				//appendで、作成したタグをappendToに追加する。
				$(appendTo).append(tag);
			//appendToが空であれば	
			} else {
				//appendで作成したタグをmainに追加する。
				$('.main').append(tag);
			}
		// テーブルの作成に失敗した場合
		} else{
			//失敗のメッセージダイアログを出す。
			console.log(key + 'の作成に失敗しました。');
		}
	}	

	/*
	 * 関数名:createTagTable
	 * 概要  :配列と、その配列に格納された行に相当するオブジェクト群からレコード数可変のテーブルを作る
	 * 引数  :Array mapNode:テーブルのデータを格納した配列
	 * 　　  :Element domNode:テーブルのHTML
	 * 　　  :int pageNum:表示する記事数
	 * 　　  :int displayPage:表示するページ数
	 * 返却値 :Element:作成したテーブルのDOMを返す
	 * 設計者:H.Kaneko
	 * 作成者:T.Masuda
	 * 作成日:2015.06.09
	 * 変更者:R.Shibata
	 * 変更日:2016.10.11
	 * 内容  :取得したテーブルレコードが0件の時の処理を明示的に追加。エラーメッセージを例外処理でテーブルに表示させる。
	 */
	this.createTagTable = function(mapNode, domNode , pageNum, displayPage){
		//mapNodeからテーブル用のデータを取り出す
		var mapNodeArray = mapNode[TABLE_DATA_KEY];
		//見出し行用のDOMを格納する変数を宣言する
		var colNameNode = null;
		//何度も使うため、テーブルのjQueryオブジェクトを生成して変数に格納しておく
		var $table = $(domNode);
		
		//テーブルにクラス設定のノードがあれば
		if(mapNode.class) {
			//クラスを付与する
			$table.attr(this.ATTR_CLASS, mapNode.class);
		}
		
		//例外発生の恐れがある(レコード0時)ため、try-catchで例外処理を行う
		try{
			//テーブルレコード数が0の場合
			if (mapNodeArray.length == 0){
				//エラーを投げ、テーブルに対しメッセージを出力する
				throw new noTableRecordException(domNode, mapNode.noRecordMessage);
			}
			//mapNodeの要素数を取得する。
			var mapNodeArrayLength = mapNodeArray.length;
			//レコードの列数を取得する
			var mapObjectLength = Object.keys(mapNodeArray[0]).length;
			
			startIndex = 0;		//記事の表示開始インデックスを算出する
			endCount = mapNodeArrayLength; 	//記事の表示終了インデックスを算出する。
			
			//ページ番号、表示記事数が引数にあったら
			if(pageNum !== void(0) && displayPage !== void(0)){
				//表示する記事と記事数を指定するための値を算出する
				startIndex = pageNum * (displayPage - 1);		//記事の表示開始インデックスを算出する
				//記事の表示終了インデックスを算出する。記事配列の最大数を超えていたら、元の数値に戻す。
				endCount = pageNum * displayPage > mapNodeArrayLength? mapNodeArrayLength: pageNum * displayPage;
				pageNum = startIndex >= endCount? 0: endCount - startIndex;
			//ページ番号、表示記事数が入力されていなければ
			} else {
				//記事数 = 配列の要素数にする
				pageNum = mapNodeArrayLength;
			}
			 
			 //設定データを格納するための変数を用意する
			var config = null;
			
			//設定データが存在すれば
			if(mapNode.config !== void(0)){
				config = mapNode.config;	//列設定データを取得する
			}
	
			//テーブルの1行目のjQueryオブジェクトを生成し、変数に保存する。
			//tableタグ直下に自動生成されるtbodyタグの取得をスキップするため、children関数を2度コールする
			var $firstRow = $table.children().eq(0).children().eq(0);
			
			//配列のオブジェクト数分のdomNodeを作成する
			for(var j = 1; j < mapObjectLength; j++){
				//1行目の行の最初の子供(tdタグ)を必要なだけ増やす。
				$firstRow.append($firstRow.children().eq(0).clone(false));
			}
	
			//設定データを取得できていたら
			if(config != null){
				var objectCounter = 0;	//行のオブジェクトを走査するためのカウンター変数を用意する
				//複製したdomNodeに属性の値を指定していくループ
				for(column in mapNodeArray[0]){
					//各domNodeに属性の値を指定していく
					$firstRow.children().eq(objectCounter++)
					.addClass(this.getClassName(config, column))
					.attr(STR_STYLE, this.getStyle(config, column))
					.attr(STR_COLSPAN, this.getColspan(config, column));
				}
			}

			//テーブルに見出し行の領域を確保する
			$table.prepend(this.DOM_THEAD);
			
			//配列のオブジェクト数分のdomNodeを作成する。最初から1行分のDOMが用意されているので、カウンターを1から開始する
			//@mod 2015.0730 T.Masuda 表示指定した記事数分だけ複製するように変更しました。
			for(var i = 1; i < pageNum; i++){
				//テーブルに必要なだけの行を追加する
				$table.append($firstRow.clone(false));
			}
	
			//見出し行にセルを追加する
			colNameNode = $firstRow.clone(false);
			rowCounter = 0;	//行を指すカウンター変数を用意する
			
			//表示する記事数分ループする
			for(var i = startIndex; i < endCount; i++){
				//i番目の行を取得してjQueryオブジェクトに変換し、変数に格納する
				var $row = $table.children().eq(1).children().eq(rowCounter++);
				var j = 0;	//オブジェクト用ループ内でのカウンターを用意する
				//テーブルの行に相当するオブジェクトを、テーブルに相当する配列から取得する
				var mapObject = mapNodeArray[i];
				//テーブルの行に相当するオブジェクトの要素分ループする
				for(key in mapObject){
					if(i == startIndex){
						//見出し行のセルに値を入れる
						$(colNameNode).children().eq(j).text(this.getColumnName(config, key));
					}
					//セルにクラスとテキストを追加していく
					$row.children().eq(j++).text(mapObject[key]);
				}
			}
			
			//colNameNodeを行の先頭に配置する
			$(this.TAG_THEAD, $table).append(colNameNode);
		//例外処理ブロック
		} catch(e){
			//そのまま終了させるために握りつぶす
		}

		return $table;	//作成したテーブルを返す
	}
	
	/*
	 * 関数名:getColumnName
	 * 概要  :列設定のJSONから列のカラム名を取得する。見出し行に日本語の列名を設定するために使う
	 * 引数  :Object configNode:設定データを定義したオブジェクト
	 * 　　  :String key:列名
	 * 返却値 :String:取得した列名を返す。取得できなければkeyを返す
	 * 設計者:H.Kaneko
	 * 作成者:T.Masuda
	 * 作成日:2015.06.10
	 */
	this.getColumnName = function(configNode, key){
		//keyで指定された列のオブジェクトを取得する
		var ret = this.getConfigColumn(configNode, key);
		//列名を取得して返す。取得できなければキーを返す
		return ret['columnName'] !== void(0)? ret['columnName']: key;
	}
	
	/*
	 * 関数名:getColspan
	 * 概要  :列設定のJSONからセルに設定するcolspan属性の値を取得する
	 * 引数  :Object configNode:設定データを定義したオブジェクト
	 * 　　  :String key:列名
	 * 返却値 :int:colspanの値を返す。取得できなけれ空文字を出す
	 * 作成者:T.Masuda
	 * 作成日:2015.07.04
	 */
	this.getColspan = function(configNode, key){
		//keyで指定された列のオブジェクトを取得する
		var ret = this.getConfigColumn(configNode, key);
		//列名を取得して返す。取得できなければ空文字を返す
		return ret['colspan'] !== void(0)? ret['colspan']: "";
	}
	
	/*
	 * 関数名:getClassName
	 * 概要  :列設定のJSONからセルに設定するクラス名を取得する
	 * 引数  :Object configNode:設定データを定義したオブジェクト
	 * 　　  :String key:列名
	 * 返却値 :String:取得した列名を返す。取得できなけれ空文字を出す
	 * 設計者:H.Kaneko
	 * 作成者:T.Masuda
	 * 作成日:2015.06.10
	 */
	this.getClassName = function(configNode, key){
		//keyで指定された列のオブジェクトを取得する
		var ret = this.getConfigColumn(configNode, key);
		//列名を取得して返す。取得できなければ空文字を返す
		return ret['className'] !== void(0)? ret['className']: "";
	}
	
	/*
	 * 関数名:getStyle
	 * 概要  :列設定のJSONからセルに設定するスタイルを取得し、セットする
	 * 引数  :Object configNode:設定データを定義したオブジェクト
	 * 　　  :String key:列名
	 * 返却値 :String:取得したスタイルの文字列を返す。取得できなけれ空文字を出す
	 * 設計者:H.Kaneko
	 * 作成者:T.Masuda
	 * 作成日:2015.06.12
	 */
	this.getStyle = function(configNode, key){
		//keyで指定された列のオブジェクトを取得する
		var ret = this.getConfigColumn(configNode, key);
		//スタイルの文字列を取得して返す。取得できなければ空文字を返す
		return ret[STR_STYLE] !== void(0)? ret[STR_STYLE]: '';
	}

	/*
	 * 関数名:getConfigColumn
	 * 概要  :設定のJSONから行のオブジェクトを取得して返す
	 * 引数  :Object configNode:設定データを定義したオブジェクト
	 * 　　  :String key:列名
	 * 返却値 :Object:取得した列のオブジェクトを返す。取得できなければ空オブジェクトを返す
	 * 設計者:H.Kaneko
	 * 作成者:T.Masuda
	 * 作成日:2015.06.12
	 */
	this.getConfigColumn = function(configNode, key){
		var ret = {};	//返却する値を持つオブジェクトを格納する変数を準備する
		var oneColumn = void(0);	//取得した列のオブジェクトを格納する変数を用意する。undefinedで初期化
		
		//configNode、configNodeのcolumnsが空でないなら
		if(configNode!== void(0) && configNode != null && configNode.columns !== void(0)){
			//keyに該当する列のオブジェクトを引数のオブジェクトから取得する
			var oneColumn = configNode.columns[key];
		}
		
		//取得に成功した
		if(oneColumn !== void(0) && oneColumn != null){
			ret = oneColumn;	//列のオブジェクトを返却用の変数に格納する
		}
		
		return ret;	//処理の結果を返す
	}
	
	/*
	 * 関数名:replaceData
	 * 概要  :オブジェクトからオブジェクトへデータを追加、または置き換える
	 * 引数  :int process:オブジェクトへデータを追加するか、置き換えを行うかを判断する
	 * 　　  :Object baseObject:追加先となるオブジェクト
	 * 　　  :Object appendObject:追加元となるオブジェクト
	 * 　　  :String key:追加指定するオブジェクトのキー
	 * 返却値 :Object:データの追加・置き換えを行ったオブジェクトを返す
	 * 設計者:H.Kaneko
	 * 作成者:T.Masuda
	 * 作成日:2015.06.13
	 */
	this.replaceData = function(process, baseObject, appendObject, key){
		//返すオブジェクトを入れる変数を用意する
		var retObject = {};
		//追加するオブジェクトを格納する変数を用意する。まずは空のオブジェクトで初期化する
		var append = {};
		//keyが入力されていれば
		if(key !== void(0) && key != null && key != ''){
			//keyに該当する要素だけを追加するようにする
			append[key] = appendObject[key];
		} else {
			append = appendObject;	//引数の追加元オブジェクトを丸まる追加するようにする
		}
		
		//新規作成するなら
		if(process == PATTERN_REPLACE){
			///追加先のオブジェクトを走査する
			for(objKey in baseObject){
				//キーに被りがあったら
				if(objKey in append){
					//該当するキーを消す
					delete baseObject[objKey];
				}
			}
		}
		
		//2つのオブジェクトを統合したオブジェクトを作って返す
		return $.extend(true, baseObject, append);
	}
	
	
	/* 関数名　:removeDomNode
	 * 概要　　:引数で指定された要素を削除する
	 * 引数　　:Element element:削除する要素
	 * 戻り値　:boolean:削除できたかどうかを返す
	 * 作成日　:2015.0614
	 * 作成者　:T.Masuda
	 */
	this.removeDomNode = function(element){
		//指定された要素が存在していたら削除する
		element !== void(0)? $(element).remove():console.log("");
	}
	
	/* 関数名　:replaceValueNode
	 * 概要　　:引数で指定されたオブジェクトのルートのキーの値を、新たなオブジェクトのvalueキーのvalueにセットして元のキーにセットする
	 * 引数　　:Object object:処理対象のオブジェクト
	 * 戻り値　:なし
	 * 作成日　:2015.0614
	 * 作成者　:T.Masuda
	 * 変更日　:2015.0809
	 * 変更者　:T.Masuda
	 * 内容　 :引数に取ったオブジェクトに影響が出ない様にしました。
	 */
	this.replaceValueNode = function(object){
		//返却用オブジェクトを用意し、引数のオブジェクトのコピーを格納する
		var retObj = $.extend(true, {}, object);
		//オブジェクトを走査する
		for(key in retObj){
			//keyのvalueを、新たに生成したオブジェクトのvalueのkeyにセットし、元のkeyにセットする
			retObj[key] = {value:retObj[key]};
		}
		
		return retObj;	//処理を終えたobjectを返す
	}
	
	/*
	 * 関数名:appendTag
	 * 概要  :タグをセレクタで指定した場所に挿入する。
	 * 引数  :Element tag:指定したDOMに挿入する要素
	 * 		 String target:tagの挿入先のセレクタ
	 * 戻り値:なし
	 * 作成日:2015.07.29
	 * 作成者:T.Masuda
	 */
	this.appendTag = function(tag, target){
		// 引数の要素が入力されているかを判定する。
		if(tag !== void(0) && tag != null){
			//targetが入力されていれば
			if(target !== void(0) && target != null){
				//appendを使って、引数の要素をtargetに追加する。
				$(target).append(tag);
			//targetが空であれば	
			} else {
				//appendを使って、引数の要素をmainに追加する。
				$(SELECTOR_MAIN).append(tag);
			}
			//@mod 2015.03.10 T.Masuda ここまで変更しました。(指示者:H.Kaneko)
		// 引数の要素が空ならば
		} else{
			//失敗のメッセージダイアログを出す。
			console.log(i + 'の作成に失敗しました。');
		}
	}

	/*
	 * 関数名:outputKeyNumberObject(json, domkey, target)
	 * 概要  :整数値でナンバリングされた連想配列のキーを持つオブジェクトからパーツを作り追加する。
	 * 引数  :Object json:JSON連想配列
	 * 		 String domkey:作成したDOMのappend先
	 * 		 String target:作成したDOMのappend先
	 * 		 int showNum:生成するパーツの数。
	 * 		 int page:ブログ等、ページャを使っているコンテンツのページ数。
	 * 戻り値:なし
	 * 作成日:2015.03.20
	 * 作成者:T.Masuda
	 * 変更日:2015.04.08
	 * 変更者:T.Masuda
	 * 内容　:ブログ記事に対応しました。
	 * 変更日:2015.07.29
	 * 変更者:T.Masuda
	 * 内容　:createLittleContent.jsから移植しました。また、不要になった引数(json)を削除しました。
	 * 変更日:2015.08.08
	 * 変更者:T.Masuda
	 * 内容　:第一引数を連想配列にし、その後のものはずらしました。createTagTableと引数を合わせる形です。
	 */
	this.outputKeyNumberObject = function(json, domKey, target, showNum, page){
		//showNum、pageが未入力であれば初期化する。
		showNum = showNum === void(0)? 100: showNum;	//showNumの初期化判定と処理をする
		page = page === void(0)? 1: page;				//pageの初期化判定と処理をする
		//表示開始のインデックスの数値を作る。
		var startIndex = showNum * (page - 1); 
		//@mod 2015.0729 T.Masuda 新たな記事JSONの形に対応しました。
		//記事用のナンバリングがキーとなっているJSONを格納したオブジェクトを引数のJSONから取り出す
		var jsonNumbering = json[ARTICLE_OBJECT_KEY];
		
		//取得したJSONを走査する。引数に入力された数だけループする。
		for(var i = startIndex; (i.toString() in jsonNumbering) && i - startIndex < showNum; i++){
				// 記事の要素を作成し、変数tagに格納する。
				var tag = this.createTag(jsonNumbering[i.toString()], this.getDomNode(domKey));
				//targetで指定した場所に作成した要素を挿入する。
				this.appendTag(tag, target);
		}
		//ここまで変更しました。2015.0729
		
		//trタグを追加したなら
		if($('.recordWrapper').length > 0){
			//trタグを取得する
			var records = $('.recordWrapper tr');
			//tableタグを外す
			$('.' + records.attr('class')).unwrap().unwrap();
		}
	}
	
	/*
	 * 関数名:checkArticleDate
	 * 概要  :メンバJSONのブログ記事を日付で絞り込む
	 * 引数  :String jsonName:JSONのキー
	 * 		 String dateText:日付テキストの文字列
	 * 戻り値:Object:記事の絞り込みを行ったオブジェクトを返す
	 * 作成日:2015.08.08
	 * 作成者:T.Masuda
	 */
	this.checkArticleDate = function(jsonName){
		var retObj = null;	//返却用のオブジェクトを格納する変数を宣言、nullで初期化する
		
		//dateTextが入力されていれば
		if(this.dateText){
			//evaledが日付であれば、記事の絞り込みを行う。
			if(!isNaN(Date.parse(this.dateText))){
				//絞り込み対象のJSONの記事タイプが配列形式であれば
				if($.isArray(this.json[jsonName][TABLE_DATA_KEY])){
					retObj = this.filterArticleDateForArray(jsonName, this.dateText);	//配列形式の記事絞り込みを行う
				}else{
					retObj = this.filterArticleDateForObject(jsonName, this.dateText);	//オブジェクト形式の記事絞り込みを行う
				}
			}
		}
		
		return retObj;	//作成したオブジェクトか、失敗のnullを返す
	};
	
	/*
	 * 関数名:filterArticleDateForArray
	 * 概要  :日付により配列形式の記事データを絞り込む
	 * 引数  :String jsonName:JSONのキー
	 * 		 String dateText:日付テキストの文字列
	 * 戻り値:Object:記事の絞り込みを行ったオブジェクトを返す
	 * 作成日:2015.08.08
	 * 作成者:T.Masuda
	 */
	this.filterArticleDateForArray = function(jsonName, dateText){
		//対象のオブジェクトのコピーを作成する
		var retObj = $.extend(true, {}, this.getMapNode(jsonName));
		var deleteOffset = 0;					//要素の削除でずれたインデックスを修正するための数値
		
		//記事を走査し、日付が当てはまらない記事を削除していく
		for(var i = 0; i < retObj[TABLE_DATA_KEY].length; i++){
			//日付が合わなければ
			if(retObj[TABLE_DATA_KEY][i].date !== void(0) && retObj[TABLE_DATA_KEY][i].date != dateText.replace(/\//g, '-')){
				retObj[TABLE_DATA_KEY].splice(i--, 1);	//該当する記事を削除する
			}
			
			if(retObj[TABLE_DATA_KEY].length - 1<= i) {
				break;
			}
		}
		
		retObj[TABLE_DATA_KEY] = retObj[TABLE_DATA_KEY].concat();	//配列をコピーしてインデックスの乱れを直す
		
		return retObj;	//作成したオブジェクトを返す
	}
	
	/*
	 * 関数名:filterArticleDateForObject
	 * 概要  :日付によりオブジェクト形式の記事データを絞り込む
	 * 引数  :String jsonName:JSONのキー
	 * 		 String dateText:日付テキストの文字列
	 * 戻り値:Object:記事の絞り込みを行ったオブジェクトを返す
	 * 作成日:2015.08.08
	 * 作成者:T.Masuda
	 */
	this.filterArticleDateForObject = function(jsonName, dateText){
		//対象のオブジェクトのコピーを作成する
		var retObj = $.extend(true, {}, this.getMapNode(jsonName));
		var table = retObj[TABLE_DATA_KEY];				//tableキーのオブジェクトを取得する
		var tableLength = table.length;	//走査対象のテーブルのサイズを取得する
		var tmpObj = {};						//絞り込んだ記事を一時的に格納するオブジェクトを作る
		var i = 0;								//記事番号を振るためのカウンター変数を宣言する
		
		//記事を走査し、日付が当てはまらない記事を削除していく
		for(key in table){
			//日付が合っていれば
			//できれば日付のキーを汎用的なキーにしたいと思います。
			if(table[key].blogArticleTitle.blogArticleDate.text == dateText){
				tmpObj[(i++).toString()] = table[key];	//該当する記事を追加する
			}
		}
		
		retObj[TABLE_DATA_KEY] = tmpObj;	//作成したオブジェクトを返却するオブジェクトに代入する
		
		return retObj;	//作成したオブジェクトを返す
	}
	
	/*
	 * 関数名:getUserId
	 * 概要  :ユーザIDを取得する。
	 * 引数  :なし
	 * 返却値  :String:ユーザID。なければ空文字を返す
	 * 作成者:T.Masuda
	 * 作成日:2015.08.08
	 */
	this.getUserId = function(){
		//ユーザIDを取得する
		return this.json.accountHeader !== void(0)? this.json.accountHeader.user_key.value: EMPTY_STRING;
	}

	/*
	 * 関数名:getUserId
	 * 概要  :ユーザIDを取得する。
	 * 引数  :なし
	 * 返却値  :String:ユーザID。なければ空文字を返す
	 * 作成者:T.Masuda
	 * 作成日:2015.08.08
	 */
	this.getUserName = function(){
		//ユーザ名を返す
		return this.json.accountHeader !== void(0) ? this.json.accountHeader.memberStatus.memberName.user_name.text: EMPTY_STRING;
	}
	
	/*
	 * 関数名:getAuthority
	 * 概要  :ユーザ権限の値を取得する。
	 * 引数  :なし
	 * 返却値  :String:ユーザ権限の値。なければ空文字を返す
	 * 作成者:T.Masuda
	 * 作成日:2015.08.08
	 */
	this.getAuthority = function(){
		//ユーザ権限の値を取得する
		return this.json.accountHeader !== void(0)? this.json.accountHeader.authority.value: EMPTY_STRING;
	}
	

	/* クッキーを連想配列で取得する関数。http://so-zou.jp/web-app/tech/programming/javascript/cookie/#no5より。 */
	function GetCookies()
	{
	    var result = new Array();

	    var allcookies = document.cookie;
	    if( allcookies != '' )
	    {
	        var cookies = allcookies.split( '; ' );

	        for( var i = 0; i < cookies.length; i++ )
	        {
	            var cookie = cookies[ i ].split( '=' );

	            // クッキーの名前をキーとして 配列に追加する
	            result[ cookie[ 0 ] ] = decodeURIComponent( cookie[ 1 ] );
	        }
	    }
	    //結果を返す。
	    return result;
	}
	
	//コンストラクタ部分
	//会員番号がcookie内にあれば取得する。
	//cookieを取得して連想配列形式に変換する。
	var cookie = GetCookies();
	//ユーザ情報のJSONを取得する
	this.getJsonFile('source/account.json');
	//cookie内に会員番号があれば
	if('userId' in cookie && cookie.userId != ""){
		//会員IDのcookieを取得する。
		this.json.accountHeader.user_key.value = cookie.userId;
		this.json.accountHeader.authority.text = cookie.authority;
	}
}

