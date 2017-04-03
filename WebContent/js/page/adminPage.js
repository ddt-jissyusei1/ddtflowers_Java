/* 
 * ファイル名:adminPage.js
 * 概要  :管理者ページ用のjsファイル
 * 作成者:T.Yamamoto
 * 作成日:2015.08.04
 * パス :/js/page/adminPage.js
 */

//テーブル用入力値セッティング
var tableArgSettings ={};
//メルマガテーブル
tableArgSettings.mailMaga = {
		//startPage→表示する1個目のページャの数値。1や0 displayPageMax : ページャの一度に表示する数の最大
		//displayPage : 表示するページ pageNum : 一度に表示する記事数
		startPage : 1, displayPageMax : 4, displayPage : 1, pageNum  : 15
}


/* 
 * 関数名:clickEvent
 * 概要  :クリックイベントを登録する
 * 引数  :clickSelector:クリックされた要素のセレクター。
 		:clickFunc：クリックされたときにコールする関数
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.08.29
 */
function clickEvent(clickSelector, clickFunc) {
	$(clickSelector).click(function() {
		//コールバック関数の処理を開始する
		clickfunc(this);
	});
}

/* 
 * 関数名:toggleClassClickElement
 * 概要  :クリックした要素に対してクラス属性を付ける
 * 引数  :clickSelector:イベントコールバック登録対象のセレクタ
 		:className：付与、消去するクラス名
 		:parentElem：コールバック登録対象の親要素
 * 返却値  :なし
 * 作成者:.Yamamoto
 * 作成日:2015.08.29
 */
function toggleClassClickElement (clickSelector, className, parentElem) {
	//会員一覧テーブルがクリックされた時にuserSelectクラスをがなければ追加しあるなら消去する
	$(parentElem).on(CLICK, clickSelector, function(){
		// 2016.09.12 add k.urabe 時間帯一覧における行選択処理の場合の条件分岐を追加
		if(clickSelector != SELECTOR_TBODY_TR_TIME_TABLE) {
			//userSelectクラスを追加したり消したりする。このクラスがあればユーザが選択されているとみなしてボタン処理を行うことができる
			$(this).toggleClass(className);
		} else {
			// 2016.09.12 add k.urabe 時間帯一覧画面のセレクタであった場合、親のTR要素を対象とする
			$(this).parent().toggleClass(className);
		}
	});
}

/* 
 * 関数名:dateMovement
 * 概要  :日付の進退を求めて返す。管理者日ごと授業者一覧の日付の進退の表示で使う
 * 引数  :clickSelector:クリックされた要素のセレクター。
 		:nowDateObject：進退の対象となる日付オブジェクトのデータ
 * 返却値  :nowDateString:進退した日付の結果
 * 作成者:T.Yamamoto
 * 作成日:2015.08.29
 * 変更者:T.Masuda
 * 変更日:2016.04.217
 * 内容  :クリック対象の要素のクラス名が複数存在するケースに対応しました
 */
function dateMovement(clickSelector, nowDateObject) {
	//クリックされたクラス名を取得する
	var className = $(clickSelector).attr('class');
	//先頭のクラス名を取得する(クラス名が複数設定されている場合の対策。対象クラス名が先頭にあることが前提)
	var classNameFirst = className.split(/\s/g)[0];
	
	//取得したクラスの名前によって処理を分ける
	switch(classNameFirst) {
		//クリックされたのが2日前の時、日付を2日前にする
		case 'twoDayBefore':
		nowDateObject.setDate(nowDateObject.getDate() - 2);
		break;
		//クリックされたのが1日前の時、日付を1日前にする
		case 'oneDayBefore':
		nowDateObject.setDate(nowDateObject.getDate() - 1);
		break;
		//クリックされたのが1日後の時、日付を1日後にする
		case 'oneDayAfter':
		nowDateObject.setDate(nowDateObject.getDate() + 1);
		break;
		//クリックされたのが2日後の時、日付を2日後にする
		case 'twoDayAfter':
		nowDateObject.setDate(nowDateObject.getDate() + 2);
		break;
	}
	//日付が進退した結果を取り出す
	var nowDateString = create_tag.getDateFormatDB(nowDateObject);
	return nowDateString;
}

/* 
 * 関数名:updateDateMovement
 * 概要  :進退の領域をクリックしたときに日付を更新する
 * 引数  :String clickSelector : クリックイベント対象のセレクタ
 *      :Object nodDateObject : 日付型
 *      :createLittleContents create_tag : createLittleContentsクラスインスタンス
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.08.29
 * 変更者:T.Masuda
 * 変更日:2016.04.17
 * 内容  :create_tagを引数から指定するように変更しました
 */
var updateDateMovement = function(clickSelector, nowDateObject, create_tag) {
	//日付を更新する
	nowDateString = dateMovement(clickSelector, nowDateObject);
	//jsonに日付の値を入れる
	create_tag.json['eachDayReservedInfoTable']['lesson_date']['value'] = nowDateString;
	//テーブルをリロードする
	create_tag.tableReload('eachDayReservedInfoTable');
	//日付をタイトルに入れる
	$(DOT + 'dateBelt' + ' p').text(nowDateString);
}

//日ごと予約者一覧共通で使う日付オブジェクト
nowDateObject = new Date();

/* 
 * 関数名:updateDateSearch
 * 概要  :日付検索をクリックした時の処理
 * 引数  :createLittleContents create_tag : createLittleContentsクラスインスタンス
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.08.29
 * 変更者:T.Masuda
 * 変更日:2016.04.17
 * 内容  :create_tagを引数から指定するように変更しました
 */
var updateDateSearch = function (create_tag) {
	//表示されている日付を更新するために検索する日付のデータを取得する。
	var changeDate = $('.dateInput').val();
	
	//日付文字列を日付のオブジェクトに変換する
	dateObject =  new Date(changeDate);
	
	//無効な日付であれば
	if(dateObject.toString() === "Invalid Date"){
		alert('有効な日付を入力してください。');	//警告を出す
		return nowDateObject;	//処理を中断する
	}
	
	nowDateObject =  dateObject;
	
	//現在表示されている日付を入力された日付で更新する
	$(DOT + 'dateBelt p').text(changeDate)
	//日ごと授業者一覧テーブルをリロードする
	create_tag.eventTableReload('eachDayReservedInfoTable');
	//検索日付テキストボックスに変更された日付をセットする
	$('.dateInput').val($('.theDay').text());

	//日付オブジェクトを更新する
	return nowDateObject;
}

/* 
 * 関数名:nowDatePaging
 * 概要  :現在の日付からページング機能を実装する
 * 引数  :clickSelectorParent:クリックボタンのセレクター
 *      :createLittleContents create_tag : createLittleContentsクラスインスタンス
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.07.06
 * 変更者:T.Masuda
 * 変更日:2016.04.17
 * 内容  :create_tagを引数から指定するように変更しました
 */
function nowDatePaging(clickSelectorParent, create_tag) {
	//現在時刻のオブジェクトを作る
	var nowDateObject = new Date();
	//日付の文字列を取得する
	var nowDateString = create_tag.getDateFormatDB(nowDateObject);
	//日付をタイトルに入れる
	$(DOT + clickSelectorParent + ' p').text(nowDateString);
	//clickEvent(DOT + clickSelectorParent + ' a', updateDateMovement);
	$(DOT + clickSelectorParent + ' button').click(function() {
		//コールバック関数の処理を開始する
		updateDateMovement(this, nowDateObject, create_tag);
		//検索日付テキストボックスの値を更新する
		$('.dateInput').val($('.theDay').text());
	});
	//検索ボタンがクリックされた時に日付を更新する
	$(DOT + 'dateSelect .searchButton').click(function() {
		//日付オブジェクトを更新する
		nowDateObject = updateDateSearch(create_tag);
	});
}

/* 
 * 関数名:blushDayReserverDateButton
 * 概要  :日ごと予約者画面の日付変更ボタンをリッチにする
 * 引数  :なし
 * 返却値  :なし
 * 作成者:T.Masuda
 * 作成日:2016.04.17
 */
function blushDayReserverDateButton() {
	//各ボタンをjQuery UIのアイコンボタンに置き換える
	//2日前ボタン
	$('.twoDayBefore').button({ icons: {primary: "ui-icon-seek-prev"}, text : false});
	//1日前ボタン
	$('.oneDayBefore').button({ icons: {primary: "ui-icon-triangle-1-w"}, text : false});
	//1日後ボタン
	$('.oneDayAfter').button({ icons: {primary: "ui-icon-triangle-1-e"}, text : false});
	//2日後ボタン
	$('.twoDayAfter').button({ icons: {primary: "ui-icon-seek-next"}, text : false});
}


/* 
 * 関数名:setPermitListFromToDate
 * 概要  :受講承認一覧の検索する日付の範囲をデフォルトでは月の初日から末日に設定する
 * 引数  :String targetKey : 日付格納先のキー
 * 返却値  :なし
 * 作成者:T.Masuda
 * 作成日:2016.3.19
 */
function setPermitListFromToDate(targetKey) {
	//今日の日付を取得する
	var today = new Date();
	//今月の初日オブジェクトを取得する
	var monthStartday = new Date(today.getFullYear(), today.getMonth(), 1);
	//今月の初日の日付を取得して、受講承認一覧のfromの部分で使う
	monthStartday = create_tag.getDateFormatDB(monthStartday);
	//今月の末日オブジェクトを取得する
	var monthEndday = new Date(today.getFullYear(), today.getMonth() + 1, 0);
	//今月の末日の日付を取得して、受講承認一覧のtoの部分で使う
	monthEndday = create_tag.getDateFormatDB(monthEndday);
	//受講承認一覧に今月の初日を入れて一覧テーブルを検索するようにする
	create_tag.json[targetKey].fromDate.value = monthStartday;
	//受講承認一覧に今月の末日を入れて一覧テーブルを検索するようにする
	create_tag.json[targetKey].toDate.value = monthEndday;
	//デフォルトの検索値を分かりやすくするためにfromテキストボックスに月の初日の値を入れる
	$('[name=fromSearach]').val(monthStartday);
	//デフォルトの検索値を分かりやすくするためにtoテキストボックスに月の末日の値を入れる
	$('[name=toSearach]').val(monthEndday);
}

/* 
 * 関数名:searchPermitListInfoTable
 * 概要  :受講承認一覧の検索機能を実装する
 * 引数  :String createTagTarget : createTagを取得する先のDOMセレクタ
 * 		:String targetTable : 処理対象テーブル
 * 		 int startPage:表示する1つ目のナンバリングの数
 * 		 int displayPageMax:表示するナンバリングの最大数
 * 		 int displayPage:表示するテーブルのページ番号
 * 		 int pageNum:1ページに表示するレコード数。
 * 		 String targetArea:DOM追加先のセレクタ。
 * 		 String callback:実行させたいコードの文字列
 * 		 String button : 検索のトリガーとなるボタンのセレクタ
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.07.14
 * 作成者:T.Masuda
 * 作成日:2016.03.19
 * 内容　:引数を追加して他のテーブルでも使えるようにしました。
 * 変更者:R.Shibata
 * 変更日:2016.10.11
 * 内容  :取得したテーブルレコードが0件の時の処理を削除。エラーメッセージは出力処理で表示する。
 */
function searchPermitListInfoTable(
		createTagTarget
		,targetTable
		,startPage
		,displayPageMax
		,displayPage
		,pageNum
		,targetArea
		,callback
		,button
	) {
	//受講承認の検索ボタンをクリックした時のイベント
	$(button).click(function(){
		//検索初めの値を取得する
		var fromDate = $('[name=fromSearach]:visible').val();
		//検索終わりの値を取得する
		var toDate = $('[name=toSearach]:visible').val();
		
		//不正な日付が入力されていたら
		if(commonFuncs.isInvalidDate(new Date(fromDate)) 
				|| commonFuncs.isInvalidDate(new Date(toDate))){
			alert('不正な日付が入力されています。');	//警告を出す
			return;	//処理を終える
		}

		//受講承認一覧のcreateTagを取得する
		var searchCreateTag = $(createTagTarget)[0].create_tag;
//		var lecturePermitList = $('#lecturePermitList')[0].create_tag;

		//受講承認一覧の連想配列に検索初めの値を入れる
		searchCreateTag.json[targetTable].fromDate.value = fromDate;
		//受講承認一覧の連想配列に検索終わりの値を入れる
		searchCreateTag.json[targetTable].toDate.value = toDate;

		//テーブルデータをリセットしておく
		searchCreateTag.json[targetTable].tableData = [];
		//DBからデータを取得する
		searchCreateTag.getJsonFile('jsp/GetJSONArray.jsp', searchCreateTag.json[targetTable], targetTable);
		//受講承認一覧テーブルを作る
		searchCreateTag.outputNumberingTag(targetTable, startPage, displayPageMax, displayPage, pageNum, targetArea, callback, "$('" + createTagTarget + "')[0].");

	});
}

/* 
 * 関数名:getCommodityCostPrice
 * 概要  :受講承認テーブルで個数テキストボックスと備品代テキストボックスの値を掛け合わせた合計を返す
 		:会計テキストボックスの値を自動で変更するために値を取得するための関数
 * 引数  :rowNumber:行の何番目にあるテキストボックスが対象なのかを示す番号
 * 返却値  :commodityCostPrice:備品代の会計テキストボックスに入る値
 * 作成者:T.Yamamoto
 * 作成日:2015.07.17
 */
function getCommodityCostPrice(rowNumber) {
	//備品代の合計を求めるために購入した備品の価格を取得する
	var sellingPrice = $('.sellingPriceTextbox').eq(rowNumber).val();
	//備品代の合計を求めるために購入した個数を取得する
	var sellNumber = $('.sellNumberTextbox').eq(rowNumber).val();
	//取得した値から備品の合計金額を求める
	var commodityCostPrice = sellingPrice * sellNumber;
	//求めた金額を他でも使えるようにするため、返り値として返す
	return commodityCostPrice;
}

/* 
 * 関数名:setDefaultCommodityCostPrice
 * 概要  :ページの初期読み込み時に会計のデフォルト値を設定する
 * 引数  :なし
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.07.17
 */
function setDefaultCommodityCostPrice() {
	//会計のデフォルト値を設定するために会計の値を取得する
	var commodityCostPrice = getCommodityCostPrice(0);
	//会計の連想配列にデフォルト値を設定する
	$('.payCashTextbox').val(commodityCostPrice);
}

/* 
 * 関数名:setCommodityCostPrice
 * 概要  :受講承認テーブル会計の値を設定する
 * 引数  :changeSelector:changeイベントを当てるセレクター
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.07.17
 */
function setCommodityCostPrice(changeSelector) {
	//備品名、または個数が変化した時に会計の値をセットするイベントを登録する
	$(STR_BODY).on('change', changeSelector, function(){
		//他の行の備品代テキストボックスの値を変更しないために変更されたセレクトボックスが何番目のものなのかを取得する
		var contentSelectNumber = $(changeSelector).index(this);
		//会計のデフォルト値を設定するために会計の値を取得する
		var commodityCostPrice = getCommodityCostPrice(contentSelectNumber);
		//会計のテキストボックスの値を設定する
		$('.payCashTextbox').eq(contentSelectNumber).val(commodityCostPrice);
	});
}

/* 
 * 関数名:setSellingPrice
 * 概要  :受講承認テーブルの備品代を自動でセットする。
 		備品によって値段が異なるので備品名のセレクトボックスの値が変わったときに
 		備品名に対応した値段をテキストボックスに入れる
 * 引数  :なし
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.07.17
 */
function setSellingPrice(selectboxParentSelector, textboxParentSelector) {
	//備品名セレクトボックスの値が変更されたときに備品代を変えるイベントを開始する
	//イベントをonで登録しているのは違うページを読み込むときにイベントをoffにしやすくするため
	$(STR_BODY).on(CHANGE, selectboxParentSelector + ' .contentSelect', function(){
		//他の行の備品代テキストボックスの値を変更しないために変更されたセレクトボックスが何番目のものなのかを取得する
		var contentSelectNumber = $(selectboxParentSelector + ' .contentSelect').index(this);
		//選択されているテキストを取得し、備品名を取り出すための値を取り出すために使う
		var contentName = $(selectboxParentSelector + ' .contentSelect').eq(contentSelectNumber).val();
		//備品代の値を取得するための変数を作る
		var sellingPrice;
		//備品idを取り出すための変数を作る
		var commodityKey;
		//取り出した行のデータを数えるためにカウンターを変数を作る
		var counter = 0;
		//行データを変数に入れる
		var rowData = create_tag.json.selectCommodityInf[TABLE_DATA_KEY]
		//取り出したデータの数だけループし、価格を取り出す
		$.each(rowData, function(){
			//取得した備品名と比較するためにループしている備品名を取得する
			var commodityName = rowData[counter].commodity_name;
			//取得した備品名とセレクトボックスの中にあるタグの名前が同じときにその番号を取得する
			if (contentName == commodityName) {
				//備品代をテキストボックスに入れるための番号を取得する
				sellingPrice = create_tag.json.selectCommodityInf[TABLE_DATA_KEY][counter].selling_price;
				//備品idをテキストボックスに入れるための番号を取得する
				commodityKey = create_tag.json.selectCommodityInf[TABLE_DATA_KEY][counter].commodity_key;
			}
			counter++;
		});
		//備品代テキストボックスに備品名に対応した値段を入れる
		$('.sellingPriceTextbox').eq(contentSelectNumber).val(sellingPrice);
		//備品idテキストボックスに備品名に対応した値段を入れる
		$(textboxParentSelector + ' .commodityKeyBox').eq(contentSelectNumber).val(commodityKey);
	});
}

/* 
 * 関数名:setDefaultSellingPrice
 * 概要  :受講承認テーブルの備品代をページ読み込み時に自動でセットする。
 * 引数  :なし
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.07.17
 */
function setDefaultSellingPrice() {
	//備品代の連想配列にデフォルト値を設定する
	create_tag.json.accordionContent.sellingPrice.sellingPriceTextbox.value = create_tag.json.selectCommodityInf[TABLE_DATA_KEY][0].selling_price;
	//備品idの連想配列にデフォルト値を設定する
	create_tag.json.commodityKeyBox.value = create_tag.json.selectCommodityInf[TABLE_DATA_KEY][0].commodity_key;
}

/* 
 * 関数名:isBuyCommodity
 * 概要  :受講承認の承認ボタンがクリックされた時に備品を購入したかどうかを判定する
 * 引数  :sendReplaceArray
 * 返却値  :resultBool:判定結果
 * 作成者:T.Yamamoto
 * 作成日:2015.07.21
 */
function isBuyCommodity (sendReplaceArray) {
	//備品を購入していたらtrueにする
	var resultBool = true;
	//備品を購入していないときにfalseにする
	if(sendReplaceArray.pay_cash <= 1) {
		resultBool = false;
	}
	return resultBool;
}

/* 
 * 関数名:permitDataUpdate
 * 概要  :受講承認テーブルの承認ボタンが押された時に1行ずつ値を取得して1行ずつDBの値を更新してする
 * 引数  :なし
 * 返却値  :int : 更新が成功したレコード数
 * 作成者:T.Yamamoto
 * 作成日:2015.07.17
 */
function permitDataUpdate(sendReplaceArray, boolRule, trueQueryKey, falseQueryKey) {
	var sendQueryArray = create_tag.choiceSendQueryArray(boolRule, trueQueryKey, falseQueryKey);
	//クエリのデフォルトを取得してあとから元の戻せるようにする
	var defaultQuery = sendQueryArray.db_setQuery;
	//クエリを実行してテーブルの値1行ずつ更新していく
	var retNum = create_tag.setDBdata(sendQueryArray, sendReplaceArray, '');
	//ループで実行するので置換データ連想配列を初期化する
	sendQueryArray.db_setQuery = defaultQuery;
	
	return retNum;
}

/* 
 * 関数名:loopUpdatePermitLesson
 * 概要  :受講承認テーブルの承認ボタンが押された時に1行ずつ値を取得して1行ずつDBの値を更新してする
 * 引数  :なし
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.07.17
 */
function loopUpdatePermitLesson() {
	//受講承認の承認ボタンをクリックされた時にDBのデータを更新するイベントを登録する
	$(SELECTOR_DOLECTUREPERMIT_BUTTON).on(CLICK, function(){
		//チェックが入っているレコードがなければ
		if (!$(LECTUREPERMIT_SELECTED_RECORD).length) {
			alert(ALERT_NEED_SELECT_LECTUREPERMIT_RECORD);
			return;	//処理を終える
		}
		
		//受講承認テーブルの行を1行ごとに更新するため、1行を特定するためにカウンタを作る
		var counter = 0;
		//受講承認を行った生徒の方のリストを作る
		var processedList = new Array();
		//序文を追加する
		processedList.push(MESSAGE_RESULT_DOLECTUREPERMIT);
		
		//フォームの追加取得用オブジェクトを作る
		var addAttr = commonFuncs.getAddAttrObject("use_point", "data-diff_point", "diff_point");
		commonFuncs.getAddAttrObject("use_point", "data-classwork_use_point", "classwork_use_point", addAttr);
		commonFuncs.getAddAttrObject("use_point", "data-commodity_use_point", "commodity_use_point", addAttr);
		commonFuncs.getAddAttrObject("use_point", "data-base_point", "base_point", addAttr);

		//validation用の設定オブジェクトを作る
		//use_pointの未定義チェック
		var validateSettings = VALIDATOR.getValidationSettingObject('use_point', 'isUndefined');
		//use_pointの数字チェック
		validateSettings = VALIDATOR.getValidationSettingObject('use_point', 'isNumeric', validateSettings);
		
		//当該画面のcreateTagを取得する
		var create_tag = $('#doLecturePermit')[0].create_tag;
		//承認済みとなって削除するべきデータのインデックスの配列
		var deleteList = [];
		
		//受講承認途中にエラーが出たらそこで打ち切るため、try-catchを利用する
		try{
			//受講承認一覧テーブルの対象となる行の数だけループしてデータを更新していく
			$('.doLecturePermitInfoTable tr:not(:first)').each(function(i) {
				//選択されているものだけを更新するように条件設定する
				if(commonFuncs.checkEmpty($(this).attr('class')) && $(this).attr('class').indexOf('selectRecord') != -1) {
						// DBを更新するための値を取得するために置換する連想配列を取得する
						var sendReplaceArray = create_tag.getSendReplaceArray('doLecturePermitInfoTable', counter, SELECTOR_DO_LECTURE_PERMIT_SELECTED_INDEX + ':eq(' + $(SELECTOR_DO_LECTURE_PERMIT_SELECTED_INDEX).index(this) + ')');
						//取得した値が不正かどうかをチェックする
						VALIDATOR.validate(validateSettings, sendReplaceArray);
						
						//加算ポイントレートを取得する
						var lessonPlusPointRate = create_tag.getUserPlusPointRate('lecturePermitPlusPointRate', parseInt(sendReplaceArray.order_students), sendReplaceArray.lesson_key);
						// ユーザの所持ポイント退避
						var userGetPoint = sendReplaceArray['get_point'];
						// 受講料を待避
						var userClassworkCost = sendReplaceArray['user_classwork_cost'];
						
						// 支払い金額、使用ポイント計算(ポイントは授業料、備品代の双方に対して消費できる)
						var usePoint = sendReplaceArray['use_point'];
						if (userGetPoint * 1 < usePoint * 1) {
							throw new Error("使用ポイント(" + usePoint + ")が所持ポイント(" + userGetPoint + ")を超えています");
						}
						var classworkUsePoint = usePoint;
						var commodityUsePoint = usePoint - userClassworkCost;
						if (commodityUsePoint > 0) {
							classworkUsePoint = userClassworkCost;
						} else {
							commodityUsePoint = 0;
						}
						sendReplaceArray['pay_price'] = userClassworkCost - classworkUsePoint;
						// 使用ptを差し引いた最終支払額に対して、付与ポイントを算出する 2016.10.14 add k.urabe
						var get_point = create_tag.getUserPlusPoint(sendReplaceArray['pay_price'], lessonPlusPointRate);
						// 算出した付与ポイントを登録用の連想配列にセットする 2016.10.14 add k.urabe
						sendReplaceArray['get_point'] = get_point;		
						sendReplaceArray['pay_cash'] = sendReplaceArray['pay_price'] - commodityUsePoint;
						
						sendReplaceArray['classwork_use_point'] = classworkUsePoint;
						sendReplaceArray['commodity_use_point'] = commodityUsePoint;
						// 当該授業のポイント算出に使用したポイントレートを登録用の連想配列にセットする 2016.10.14 add k.urabe
						sendReplaceArray['lesson_plus_point_rate'] = lessonPlusPointRate;
						//備品代から加算ポイントを求める
						//受講承認データを更新する
						var processedNum = permitDataUpdate(sendReplaceArray, isBuyCommodity(sendReplaceArray), 'permitLessonUpdate', 'permitLessonUpdate');
						
						//更新ができていなければ
						if(!processedNum) {
							//異常とし、例外を投げて以後の更新を中断する
							throw new Error('以下のデータの更新に失敗しました。\n' + sendReplaceArray.user_name + ' ' +sendReplaceArray.start_time + ' ' + sendReplaceArray.lesson_name + '\n');
						}
						
						//生徒さんの情報をリストに追加していく
						processedList.push(sendReplaceArray.user_name + ' ' +sendReplaceArray.start_time + ' ' + sendReplaceArray.lesson_name + '\n');
						
						//承認を終えたデータのインデックスをリストに追加する
						deleteList.push(i);
						//承認を終えた行を削除する
						$(this).remove();

				}
				
				//カウンターをインクリメントする
				counter++;
			});
		//例外処理
		} catch(e){
			//処理件数が0件であれば
			if (counter == 0) {
				processedList = [];		//序文を消す
			}
			//メッセージの先頭を追加する
			processedList.unshift('受講承認処理中にエラーが発生したため受講承認処理を中断しました。\n' + e.message + '\n');
		//必ず行う処理
		} finally {

			commonFuncs.showMessageDialog('受講承認', processedList.join(''));	//処理を行った生徒さんのリストを表示する

			//承認済みのデータを削除する
			for (var i = 0; i < deleteList.length; i++) {
				//テーブル用JSONをクリアする
				create_tag.json['doLecturePermitInfoTable'].tableData.splice(deleteList[i] - i, 1);
			}
			
			//連番を振り直す
			commonFuncs.insertSequenceNo(SELECTOR_DO_LECTURE_PERMIT_INFO_TABLE, SELECTOR_NO_COL);
		}
	});
}

/* 
 * 関数名:loopUpdatePermitLessonList
 * 概要  :承認一覧テーブルの更新ボタンが押された時に1行ずつ値を取得して1行ずつDBの値を更新する
 * 引数  :String button : トリガーとなるボタンのセレクタ
 * 　　  :String targetTab : 処理対象のテーブルがあるタブ
 * 　　  :String rowSelector : 処理対象のレコードのセレクタ
 * 　　  :String targetTable : 処理対象のレコードのあるテーブル
 * 　　  :String parentTab : 親のタブのセレクタ
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.07.17
 * 作成者:T.Masuda
 * 作成日:2016.03.19
 * 内容　:処理対象を選択できるように変更しました
 */
function loopUpdatePermitLessonList(button, targetTab, rowSelector, targetTable, parentTab) {
	var thisElem = this;
	//受講承認一覧の更新ボタンをクリックされた時にDBのデータを更新するイベントを登録する
	$(button).on(CLICK, function(){
		//受講承認一覧テーブルの行を1行ごとに更新するため、1行を特定するためにカウンタを作る
		var counter = 0;
		//受講承認を行った生徒の方のリストを作る
		var processedList = new Array();
		//クエリのキー
		var queryKey = EMPTY_STRING;
		//受講承認一覧のcreateTagを取得する
		var create_tag = $(targetTab)[0].create_tag;
		
		//フォームの追加取得用オブジェクトを作る
		var addAttr = commonFuncs.getAddAttrObject("use_point", "data-diff_point", "diff_point");
		
		//受講承認途中にエラーが出たらそこで打ち切るため、try-catchを利用する
		try{
			//受講承認一覧テーブルの対象となる行の数だけループしてデータを更新していく
			$(rowSelector).each(function(i) {
					//DBを更新するための値を取得するために置換する連想配列を取得する
					var diffPoint = create_tag.json[targetTable][TABLE_DATA_KEY][counter].use_point - $('input[name="use_point"]', this).val();	// 元の値からの増減値 2016.12.22 r.shibata > 保持しているjsonのテーブルデータと比較して差分を取得するよう変更 
					var sendReplaceArray = 
						create_tag.getSendReplaceArray(
							targetTable, 
							counter, 
							rowSelector + ':eq(' + counter + ')',
							 commonFuncs.checkEmpty(diffPoint) ? addAttr : null
					);
					sendReplaceArray.diff_point = diffPoint;
					//受講承認一覧データを更新する
					var processedNum = permitDataUpdate(sendReplaceArray, commonFuncs.checkEmpty(sendReplaceArray.commodity_key), 'updateSellCommodityPermitList', 'updatePermitListLesson');
					
					//更新ができていなければ
					if(!processedNum) {
						//エラーメッセージを作成する
						var errorMes = '以下のデータの更新に失敗しました。\n' + (i + 1) + '行目 ' + sendReplaceArray.user_name + ' '+ (sendReplaceArray.lesson_name? sendReplaceArray.lesson_name : sendReplaceArray.content) + '\n';
						//異常とし、例外を投げて以後の更新を中断する
						throw new Error(errorMes);
					}
					
				//カウンターをインクリメントする
				counter++;
			});
		//例外処理
		} catch(e){
			//メッセージの先頭にエラーメッセージを追加する
			processedList.unshift(ALERT_LECTUREPERMIT_PROCESS_ERROR + e.message + JS_EOL);
		//必ず行う処理
		} finally {
			//createTagから検索日付をとりだす
			var fromDate = create_tag.json[targetTable][KEY_FROM_DATE][VALUE];
			var toDate = create_tag.json[targetTable][KEY_TO_DATE][VALUE];
			//検索日付をオブジェクトにまとめる
			var searchDate = {'fromDate' : fromDate, 'toDate' : toDate}
			
			//処理件数を処理リストの末尾に追加する
			processedList.push(counter + NOTICE_RECORD_UPDATE_MESSAGE_AND_NUMBER);
			//結果を表示する
			commonFuncs.showMessageDialog('承認一覧', processedList.join(''));
			
			//受講承認一覧テーブルなら
			if($('#lecturePermitList:visible').length > 0){
				create_tag.loadTableData(LECTURE_PERMIT_LIST_INFO_TABLE, START_PAGE_NUM, LECTUREPERMITLIST_TABLE_NUMBERING_MAX, FIRST_DISPLAY_PAGE, LECTUREPERMITLIST_TABLE_MAX_ROWS, SELECTOR_LECTUREPERMITLIST_OUTSIDE, AFTER_RELOAD_LECTUREPERMITINFOLIST_FUNC, GET_LECTUREPERMITLIST_CREATE_TAG);
			//商品購入一覧テーブルなら
			} else if ($('#sellCommodityPermitList:visible').length > 0) {
				//テーブルをリロードする。
				create_tag.loadTableData(SELLCOMMODITY_PERMIT_LIST_INFO_TABLE, START_PAGE_NUM, LECTUREPERMITLIST_TABLE_NUMBERING_MAX, FIRST_DISPLAY_PAGE, LECTUREPERMITLIST_TABLE_MAX_ROWS, SELECTOR_SELLCOMMODITYLIST_OUTSIDE, AFTER_RELOAD_SELLCOMMODITYPERMITINFOLIST_FUNC, GET_SELLCOMMODITYPERMITLIST_CREATE_TAG);
			}
		}
	});
}

/* 
 * 関数名:userListSearch
 * 概要  :管理者 会員一覧の検索機能を有効にする
 * 引数  :なし
 * 返却値  :String targetPage : 対象となる画面のセレクタ。createTagの参照を持っている要素である必要あり
 * 作成者:T.Yamamoto
 * 作成日:2015.08.29
 * 変更者:T.Yamamoto
 * 変更日:2016.04.10
 * 内容　:イベントコールバック登録を除去しました。
 * 変更者:R.Shibata
 * 変更日:2016.10.07
 * 内容  :検索SQLをストアドプロシージャに変更した事により処理を変更しました。
 * 変更者:R.Shibata
 * 変更日:2016.10.11
 * 内容  :取得したテーブルレコードが0件の時の処理を削除。エラーメッセージは出力処理で表示する。
 */
function userListSearch(targetPage) {
		//当該画面のcreateTagを取得する
		var userListCreateTag = $(targetPage)[0].create_tag;
		//オブジェクトをコピーしてクエリ発行の準備をする コピーするよう変更、クエリでなくオブジェクトなので名称変更 2016.10.07 r.shibata 
		var sendQueryObject = $.extend(true, {}, userListCreateTag.json.userListInfoTable);
		//検索エリアの要素を走査する 2016.10.07 r.shiabta 追加
		$(SELECTOR_SEARCH_USER_LIST_CURRENT + SPACE + SELECTOR_SEARCH_USER_LIST_ADMIN_USER_SEARCH).each(function(){
			//コピーしたオブジェクトに対し、検索値を要素より取得してセットする。
			sendQueryObject[$(this).data(KEY_COL_NAME)].value = $(this).val()
		});
		userListCreateTag.json.userListInfoTable.tableData = [];	//データを消しておく
		//会員一覧のデータを取り出す
		userListCreateTag.getJsonFile(URL_GET_JSON_ARRAY_JSP, sendQueryObject, KEY_USER_INFO_LIST_TABLE); //クエリでなくオブジェクトなので名称変更 2016.10.07 r.shibata 
		//ページング機能付きでユーザ情報一覧テーブルを作る
		userListCreateTag.outputNumberingTag(KEY_USER_INFO_LIST_TABLE, 1, 4, 1, 15, SELECTOR_USER_LIST_TABLE_OUTSIDE, FUNC_AFTER_RELOAD_USER_LIST_INFO_TABLE, JQUERY_OBJECT_FRONT + targetPage + JQUERY_OBJECT_REAR_0INDEX);

}

/* 
 * 関数名:jumpToMemberPage
 * 概要  :管理者 会員一覧で選択されているユーザの会員ページに接続する
 * 引数  :String || Element clickTarget : クリックイベントの対象
 * 　　  :String || Element targetParent : クリックイベントの対象の一意な祖先要素
 * 　　  :String user : 選択中ユーザのセレクタ
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.08.29
 * 変更者:T.Masuda
 * 変更日:2015.11.01
 * 内容　:セレクタが固定になっていたため調整しました
 */
function jumpToMemberPage(clickTarget, targetParent, user) {
	//詳細設定ボタンがクリックされたときになり代わりログインを行うかアラートを表示するかのイベントを登録する
	$(targetParent).on(CLICK, clickTarget, function(){
		//選択されているユーザの数を変数に入れ、なり代わりログインで選択されている人が1人であるかを判定するのに使う
		var selected = $(user).length;
		//詳細設定ボタンがクリックされた時に選択されている会員の人数が一人の時だけなりかわりログイン処理を行うイベントを登録する
		if(selected == 0 || selected > 1) {
			//選択している
			alert('ユーザを1人だけ選択してください');
		} else {
			//クリックした人でログインするために会員番号を取得する
			var memberId = $(user).children('.id').text();
			//クリックした人でなり代わりログインを行う
			loginInsteadOfMember(memberId);
		}
	});
}

/* 
 * 関数名:loginMemberPageFromAdminPage
 * 概要  :クリックした対象からユーザIDを抽出して会員画面へのログインを行う
 * 引数  :String || Element clickTarget : イベント登録の基点の要素
 * 　　  :String clickTarget : クリックイベントの対象
 * 	　   :String getTarget : ID取得対象のセレクタ
 * 返却値  :なし
 * 作成者:T.Masuda
 * 作成日:2015.11.01
 */
function loginMemberPageFromAdminPage(eventBase, clickTarget, getTarget){
	//対象の要素のクリックイベントコールバックを登録する
	$(eventBase).on(CLICK, clickTarget, function(e){
		var id = $(getTarget, this).text();	//対象からテキスト(ID)を取得する
		loginInsteadOfMember(id);			//取得したIDで会員画面へのログインを行う
	});
}

/* 
 * 関数名:loginInsteadOfMember
 * 概要  :管理者ページから会員に為り変わって会員ページにログインする
 * 引数  :memberId: なり代わりを行うための会員番号
 		:clickSelector クリックしてなり代わりを行うセレクター
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.07.14
 */
function loginInsteadOfMember (memberId) {
	//会員のヘッダー連想配列に会員番号を入れてログインの準備をする
	//create_tag.json.accountHeader.user_key.value = memberId;
	document.cookie = 'otherUserId=' + memberId;	//cookieに会員IDを追加する
	//会員ページを呼び出す。会員画面内では画面遷移の履歴を作らない
	$('.window[name="admin"]')[0].instance.callPage('window/member/page/memberTop.html', null);
}

/* 
 * 関数名:afterReloadPermitListInfoTable
 * 概要  :受講承認一覧がリロードした際にテーブルに対して処理をする関数をコールするための関数
 * 引数  :なし
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.07.23
 */
function afterReloadPermitListInfoTable() {
	//当該タブのcreateTagを取得する
	var lecturePermitList = $(SELECTOR_LECTUREPERMITLIST_TAB)[0].create_tag;
	//受講承認一覧テーブルの取り出した行にクラス名を付ける
	setTableRecordClass(LECTURE_PERMIT_LIST_INFO_TABLE, LECTUREPERMITLIST_RECORD);
	//受講承認一覧テーブルの列内を編集する
	commonFuncs.dbDataTableReplaceExecute(DOT + LECTURE_PERMIT_LIST_INFO_TABLE, lecturePermitList.json[LECTURE_PERMIT_LIST_INFO_TABLE][TABLE_DATA_KEY], LECTURE_PERMIT_LIST_INFO_TABLE_REPLACE_FUNC, null, DEFAULT_SHOW_MAX_ROW);
	//受講承認一覧テーブルの料金列をテキストボックスにする
	lecturePermitList.insertTextboxToTable(LECTURE_PERMIT_LIST_INFO_TABLE, REPLACE_TEXTBOX_COST, REPLACE_TEXTBOX_COST_CELL);
	//受講承認一覧テーブルの使用pt列をテキストボックスにする
	lecturePermitList.insertTextboxToTable(LECTURE_PERMIT_LIST_INFO_TABLE, REPLACE_TEXTBOX_USE_POINT, REPLACE_TEXTBOX_USE_POINT_CELL);
	//セレクトメニューを列にアウトプットする
	lecturePermitList.outputTag(CONTENT_SELECT, CONTENT_SELECT, SELECTOR_APPEND_SELECTBOX);
	//受講承認のアコーディオンの備品名にセレクトボックスの値をDBから取り出した値で追加する
	lecturePermitList.setSelectboxText(lecturePermitList.json.selectCommodityInf[TABLE_DATA_KEY], lecturePermitList.json.accordionContent.contentCell.contentSelect.contentOption, COMMODITY_NAME);
	//受講承認一覧テーブルのテキストボックスにDBから読込んだ値をデフォルトで入れる
	lecturePermitList.setTableTextboxValuefromDB(lecturePermitList.json[LECTURE_PERMIT_LIST_INFO_TABLE][TABLE_DATA_KEY], create_tag.setInputValueToLecturePermitListInfoTable, SELECTOR_LECTUREPERMITLIST_INFOTABLE, DEFAULT_SHOW_MAX_ROW);		// 2016.10.07 mod k.urabe 当該関数の引数を追加したため
	
	//セレクトメニューが生成されていたら
	if($(SELECTOR_CONTENT_SELECT).length){
		//セレクトボックスのvalueを画面に表示されている値にする
		lecturePermitList.setSelectboxValue(SELECTOR_CONTENT_SELECT, LECTURE_PERMIT_LIST_INFO_TABLE, COMMODITY_KEY, lecturePermitList.json.selectCommodityInf[TABLE_DATA_KEY]);
		//備品販売IDを格納するための隠しフォームを各行にセットする
		lecturePermitList.outputTag(COMMODITY_SELL_ID, COMMODITY_SELL_ID, SELECTOR_APPEND_SELECTBOX);
		//備品セレクトボックスを規定のものにする
		setSelectedCommodity(lecturePermitList, null, LECTURE_PERMIT_LIST_INFO_TABLE, SELECTOR_LECTUREPERMITLIST_RECORD);
	}
	
	//置換済みテキストボックスに数値入力のみできるようにする
	$(SELECTOR_LECTUREPERMITLIST_REPLACE_TEXTBOX).attr({
        onkeydown: FUNC_CONTROLL_INPUT_CHAR	//数値のみ入力できるように関数を登録
	});
}

/* 
 * 関数名:setSelectedCommodity
 * 概要  :備品セレクトメニューの選択をDBの値に変更する。また、対象に備品IDをセットする
 * 引数  :createTag create_tag : createTagクラスインスタンス
 * 　　  :int showMaxNum : 表示する最大行数
 * 返却値  :なし
 * 作成者:T.Masuda
 * 作成日:2015.11.08
 */
function setSelectedCommodity(create_tag, showMaxNum, targetTable, targetRowClass){
	
	var pagenum = 1;					//ページ番号
	
	//showMaxNumが入力されていない場合
	if (!commonFuncs.checkEmpty(showMaxNum)) { 
		showMaxNum = DEFAULT_SHOW_MAX_ROW;	//デフォルトの値を使う
	}
	
	//ナンバリングを検出する
	if ($('.numbering li:visible').length){
		//ナンバリングがある場合は選択済みのものの値を取得してページ番号として利用する
		//ページ番号をテキストで取得する
		var pageNumText = $('.numbering .select:visible').text();
		//有効なページ番号が取得できていたら数値に変換する。そうでなければ1ページ目とする
		pagenum = !isNaN(pageNumText) ? parseInt(pageNumText) : 1;
	}
	
	//表示するレコードの起点の値を算出する
	var startNum = (pagenum - 1) * showMaxNum;
	//表示するレコードの最後の番号を算出する
	var endNum = startNum + showMaxNum;
	
	//リストのレコードを走査する
	$(targetRowClass).each(function(i){
		//セレクトメニューが行内にあれば
		if($('.contentSelect', this).length){
			//セレクトメニューをDBの値のものを選択した状態にする
			$('.contentSelect' ,this).val(create_tag.json[targetTable][TABLE_DATA_KEY][startNum + i]['commodity_key']);
			//備品販売IDもセットする
			$('.commoditySellId' ,this).val(create_tag.json[targetTable][TABLE_DATA_KEY][startNum + i]['id']);
		}
	});
}

/* 
 * 関数名:afterReloadMailMagaTable
 * 概要  :メルマガテーブルがリロードした際にテーブルに対して処理をする関数をコールするための関数
 * 引数  :なし
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.07.22
 */
function afterReloadMailMagaTable() {
	//メルマガの内容列に対して150文字以上の内容は画面には表示しないようにする。テキストボックスにはすべての値が反映される
	//cutString('.mailMagaContent', '150');
	//メルマガテーブルのクリック対象レコードに対してクラス属性を付けて識別をしやすくする
	commonFuncs.setTableRecordClass('mailMagaTable', 'targetMailMagazine');
}

/* 
 * 関数名:afterReloadUserListInfoTable
 * 概要  :管理者ユーザ一覧テーブルに対してdom作成後の処理を行う
 * 引数  :なし
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.08.06
 */
function afterReloadUserListInfoTable() {
	//会員一覧テーブルのクリック対象レコードに対してクラス属性を付けて識別をしやすくする
	commonFuncs.setTableRecordClass('userListInfoTable', 'targetUser');
	//ユーザ一覧の入会状況列をDB上の値から意味ある文字列に置き換える
	commonFuncs.replaceColumnValue('.userListInfoTable .user_status', commonFuncs.userStatusList);
}

/* 
 * 関数名:getSendPersonInfo
 * 概要  :管理者ユーザ一覧で通常メールボタン、またはお知らせボタンでメッセージを送る人の情報を取得する
 * 引数  :selector:buttonSelector:クリックしたときにダイアログを開くためのボタンのセレクター
		string:sendType:お知らせとして送信するか、メールとして送信するかを識別するための文字列
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.08.06
 */
function getSendPersonInfo() {
	//メールに送信するためのデータ配列を作る
	var sendToPersonList = [],	//送信先宛先人一覧
	sendToList = [],			//送信先宛先一覧
	userNumberList = [];		//送信先会員番号一覧
	//選択されているレコードの数だけループする
	$(SEL_SELECT_USER).each(function() {
		//選択されたユーザの情報を配列に入れていく
		commonFuncs.textPushArray(this, sendToPersonList, SEL_USER_NAME);	//名前
		commonFuncs.textPushArray(this, sendToList, SEL_MAIL_ADDRESS);		//メールアドレス
		commonFuncs.textPushArray(this, userNumberList, SEL_ID);			//会員番号
		
	});
	//取得した結果を返すために連想配列に入れる
	var sendPersonInfo = {
		name:sendToPersonList,			//送信先宛先人一覧
		mail:sendToList,				//送信先アドレス一覧
		memberNumber:userNumberList		//会員番号
	};
	return sendPersonInfo;
}

/* 
 * 関数名:adminMessageCreate
 * 概要  :管理者ユーザ一覧で通常メールボタン、またはお知らせボタンでメッセージを作るためのダイアログを表示する
 * 引数  :selector:buttonSelector:クリックしたときにダイアログを開くためのボタンのセレクター
		string:sendType:お知らせとして送信するか、メールとして送信するかを識別するための文字列
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.08.06
 */
function adminMessageCreate(buttonSelector, sendType) {
	//お知らせボタンをクリックでメール送信ダイアログを作る
	$(buttonSelector).on(CLICK, function() {
		//選択されているユーザの数を変数に入れ、ユーザが選択されていればメール送信処理を開始する
		var selected = $(SEL_SELECT_USER).length;
		//会員一覧から送信するメールの対象となる人が1人以上選択されているなら送信ダイアログを開く
		if(selected <= UNSELECTED_USER) {
			//アラートメッセージをだしてメール送信対象が1人以上選択することを警告する
			alert(TEXT_ERROR_SELECT_USER);
		} else {
			//メッセージを送信するための情報を取得する
			var sendMailData = getSendPersonInfo();
			// ダイアログを開くための情報とメール情報を結合する
			$.extend(true, sendMailData, {sendType:sendType});
			//ダイアログ用オブジェクトを作る。インプットデータをセットする
			var dialogObj = $.extend(true, {}, commonFuncs.getDefaultArgumentObject());
			//タイトルを設定する。
			$.extend(true, dialogObj.config, {title : sendType ==  MAIL? STR_JP_MAIL: STR_JP_ANNOUNCE});
			//送信するデータをオブジェクトに統合する
			$.extend(true, dialogObj.data, sendMailData);
			//メール送信ダイアログを作る
			var mailSendDialog = new dialogEx('dialog/adminMailDialog.html', dialogObj);
			mailSendDialog.setCallbackClose(mailSendDialog.destroy);	//閉じるときのイベントを登録
			mailSendDialog.run();	//主処理を走らせる
		}
	});
}
/* 
 * 関数名:mailMagaSearch
 * 概要  :管理者、メルマガタブの検索機能
 * 引数  :なし
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.09.12
 */
function mailMagaSearch() {

	//メルマガ検索ボタンがクリックされた時に検索機能を行うイベントを開始する
	$(STR_BODY).on(CLICK, '.mailMagaSearchButton', function() {
		
		//メルマガ・アナウンスタブのcreateTagを取得する
		var mailMagaAndAnnounce = $('#mailMagaAndAnnounce')[0].create_tag;
		//ページングの設定を初期化し、作り直しに備える
		create_tag.pagingReset('mailMagaTable');
		//クエリのデフォルトを取得し、編集した後でも戻せるようにする
		var queryDefault = create_tag.json.mailMagaTable.db_getQuery;

		//検索処理のエラーに備えてtry-catch構文を利用する
		try{
			//クエリの文字列の長さを取得してORDER以降の文字列の取得に使う
			var queryStringLength = create_tag.json.mailMagaTable.db_getQuery.length;
			//ORDER BY以降の文字列を取得するため、ORDER 以降の文字列を取得する
			var cutString = create_tag.json.mailMagaTable.db_getQuery.substring(create_tag.json.mailMagaTable.db_getQuery.indexOf("ORDER"),queryStringLength);
			//現在のクエリからORDER BYを取り除き、検索の条件を入れることができるようにする
			create_tag.json.mailMagaTable.db_getQuery = create_tag.json.mailMagaTable.db_getQuery.substring(0,create_tag.json.mailMagaTable.db_getQuery.indexOf("ORDER"));
			//検索の条件をクエリに入れる
			create_tag.addQueryExtractionCondition('mailMagaSearchArea', 'mailMagaTable');
			//クエリに切り取ったORDER BYを付け足す
			create_tag.json.mailMagaTable.db_getQuery += cutString;
			//メルマガのデータを取得して表示する
			create_tag.loadTableData('mailMagaTable', 1, 4, 1, MAILMAGA_TABLE_SHOW_NUMBER, '.mailMagaTableOutside', 'afterReloadMailMagaTable');
		//例外処理ブロック
		} catch (e) {
			//エラー発生を伝える
			alert('検索処理でエラーが発生しました。時間をおいてお試しください。');
		//必ず行う処理
		} finally {
			//クエリをデフォルトに戻す
			create_tag.json.mailMagaTable.db_getQuery = queryDefault;
		}
	});
}


/* 
 * 関数名:mailMagaSendConfirm
 * 概要  :メルマガ送信の内容を取得して、メルマガ送信ダイアログを作る
 * 引数  :String target : イベントコールバック登録対象(基本的にボタン)のセレクタ
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.09.12
 */
function mailMagaSendConfirm(target) {
	
	//送信ボタンがクリックされたときにメール送信イベントを開始する
	$(target).on(CLICK, function() {

		//タイトル、または本文が空であれば
		if(!commonFuncs.checkEmpty($('.messageTitleTextbox').val()) 
				|| !commonFuncs.checkEmpty($('.messageTextarea').val())){
			//空白があるという警告を出して
			alert('タイトル、または本文のいずれかが空白になっています。入力を行ってください。');
			return;		//処理を終える
		}
		
		//メルマガを送信する
		sendMailMaga();
	});
}

/* 
 * 関数名:sendMailMaga
 * 概要  :メルマガの送信を行う
 * 引数  :なし
 * 返却値  :なし
 * 作成者:T.Masuda
 * 作成日:2015.11.08
 */
function sendMailMaga() {

	//メルマガダイアログのcreateTagを取得する
	var create_tag = $('.dialog:has(.mailMagaAndAnnounceArea)')[0].dialogBuilder.create_tag;
	//メルマガを送信するための値をテキストボックスから取得する
	var data = commonFuncs.getInputData('.mailMagaAndAnnounceArea');
	var sendObject = {									//送信するデータのオブジェクト
			//DB保存用クエリ
			db_setQuery : create_tag.json.insertMailMagazine.db_setQuery
			,subject:data.magazine_title	//タイトル
			,content:data.magazine_content	//本文
			,type :data.magazine_type		//メルマガの種別
			,school_key : data.school_key	//校舎キー
	}

	//DBにメルマガの内容を保存する。成功していれば送信処理に移る
	if (new baseDialog().sendQuery(URL_SAVE_JSON_DATA_JSP, sendObject)) {
		$.ajax({					//PHPにメール用データを渡すAjax通信
			url:SEND_MAILMAGA_PHP			//PHPのURLを設定する
			,data:sendObject	//送信データのオブジェクト
			,dataType:"json"	//JSON形式でデータをもらう
			,type:"POST"		//POSTメソッドでHTTP通信する
			,async : false		//同期通信を行う
			,cache : false		//通信結果をキャッシュしない
			,success:function(json){		//通信成功時
				//送信結果を伝える
				alert('メルマガの送信を行いました。\n送信結果は以下の通りになります。\n\n送信成功 : ' + json.sendCount + '件\n送信失敗 : ' + json.failCount + '件\nアドレスなし : ' + json.noAddressCount + '件');
				//メルマガテーブルをリフレッシュする
				$(SELECTOR_MAIL_MAGA_TAB)[0].create_tag.loadTableData(
						KEY_MAIL_MAGA_TABLE, tableArgSettings.mailMaga.startPage, 
						tableArgSettings.mailMaga.displayPageMax, tableArgSettings.mailMaga.displayPage, 
						tableArgSettings.mailMaga.pageNum, '.mailMagaTableOutside',
						'afterReloadMailMagaTable', "$('#mailMagaAndAnnounce')[0].");
				//ダイアログを閉じる
				$('.dialog:has(.mailMagaAndAnnounceArea)')[0].instance.destroy();
			}
			//通信失敗時
			,error:function(xhr, status, error){
				//送信失敗と再操作要求の旨を伝える
				alert(SEND_MAILMAGA_FAIL_HALF);
			}
		});
	//DBへの保存失敗時
	} else {
		//失敗の旨を伝える
		alert(SEND_MAILMAGA_FAIL_ALL);
	}
	
}

/* 
 * 関数名:resetMailMageSendContent
 * 概要  :削除ボタンがクリックされた時にメルマガの送信内容のテキストボックスの中身を削除する
 * 引数  :なし
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.09.12
 * 修正者:R.Shibata
 * 修正日:2016.09.07
 * 内容  :テキストボックスの値がクリアされていなかった点を修正しました
 * 修正者:R.Shibata
 * 修正日:2016.10.06
 * 内容  :店舗セレクトボックスの値を初期化する処理を追加しました
 */
function resetMailMageSendContent() {
//削除ボタンがクリックされたとき、テキストボックスの中身も空白にする
	$(STR_BODY).on(CLICK, ".messageButtonArea .deleteButton", function(){
		//メッセージ内容テキストエリアの中身を空にする
		$(SELECTOR_MAILMAGA_EDIT_AREA + SPACE + SELECTOR_MAILMAGA_EDIT_AREA_TITLE).val('');//タイトルエリアの値を削除する
		$(SELECTOR_MAILMAGA_EDIT_AREA + SPACE + SELECTOR_MAILMAGA_EDIT_AREA_TEXT).val('');//内容エリアの値を削除する
		//店舗セレクトボックスの値を初期化する(セレクトボックスの一つ目の要素の値を取得し、セレクトボックスの値へ設定する) 2016.10.06 r.shibata 追加
		$(SELECTOR_MAILMAGA_EDIT_AREA + SPACE + SELECTOR_MAILMAGA_EDIT_AREA_SCOOLNAME_SELECTBOX).val($(SELECTOR_MAILMAGA_EDIT_AREA + SPACE + SELECTOR_MAILMAGA_EDIT_AREA_SCOOLNAME_SELECTBOX).children().first().val());
	});
}
 

/* 
 * 関数名:permitSellCommodity
 * 概要  :商品購入承認を行う
 * 引数  :なし
 * 返却値  :なし
 * 作成者:T.Masuda
 * 作成日:2016.03.19
 */
function permitSellCommodity() {
	//受講承認の承認ボタンをクリックされた時にDBのデータを更新するイベントを登録する
	$(SELECTOR_SELLCOMMODITYPERMIT_BUTTON).on(CLICK, function(){
		
		//チェックが入っているレコードがなければ
		if (!$('.sellCommodityPermitInfoTable tr.selectRecord').length) {
			alert(ALERT_NEED_SELECT_SELLCOMMODITYPERMIT_RECORD);
			return;	//処理を終える
		}

		//商品購入承認テーブルの行を1行ごとに更新するため、1行を特定するためにカウンタを作る
		var counter = 0;
		//更新成功数をカウントする変数を作成する // 2016.10.04 r.shibata
		var successcounter = 0;
		//商品購入承認を行った生徒の方のリストを作る
		var processedList = new Array();
		//序文を追加する
		processedList.push(MESSAGE_RESULT_SELLCOMMODITYLECTUREPERMIT);

		//フォームの追加取得用オブジェクトを作る
		var addAttr = commonFuncs.getAddAttrObject("use_point", "data-diff_point", "diff_point");
		commonFuncs.getAddAttrObject("use_point", "data-commodity_use_point", "commodity_use_point", addAttr);
		commonFuncs.getAddAttrObject("use_point", "data-base_point", "base_point", addAttr);

		//validation用の設定オブジェクトを作る
		//use_pointの未定義チェック
		var validateSettings = VALIDATOR.getValidationSettingObject(KEY_USE_POINT, 'isUndefined');
		//use_pointの数字チェック
		validateSettings = VALIDATOR.getValidationSettingObject(KEY_USE_POINT, 'isNumeric', validateSettings);
		
		//createTagを取得する
		var scpc =$(SELECTOR_SELL_COMMODITY_PERMIT_TAB)[0].create_tag;
		var deleteList = [];

		//商品購入承認途中にエラーが出たらそこで打ち切るため、try-catchを利用する
		try{
			//商品購入承認一覧テーブルの対象となる行の数だけループしてデータを更新していく
			$('.sellCommodityPermitInfoTable tr:not(:first)').each(function(i) {
				//選択済みレコードであれば
				if(commonFuncs.checkEmpty($(this).attr(CLASS)) && $(this).attr(CLASS).indexOf('selectRecord') != -1){

					// DBを更新するための値を取得するために置換する連想配列を取得する
					var sendReplaceArray = scpc.getSendReplaceArray(KEY_SELL_COMMODITY_PERMIT_INFO_TABLE, counter, '.sellCommodityPermitInfoTable tr:not(:first):eq(' + $(this).index() + ')'); // 2016.10.04 r.shibata 行指定が異なっていた点を修正
					//商品が未選択であれば
					if(sendReplaceArray.commodity_key == COMMODITY_NOT_SELECTED_KEY_1 || sendReplaceArray.commodity_key == COMMODITY_NOT_SELECTED_KEY_2) {
						//エラー扱いにするため例外を投げる。対象の行のお客様の名前を挙げる
						throw new Error(MESSAGE_COMMODITY_NOT_SELECT_EXCEPTION + sendReplaceArray.user_name);
					}

					//取得した値が不正かどうかをチェックする
					VALIDATOR.validate(validateSettings, sendReplaceArray);
					// ユーザの所持ポイント退避
					var userGetPoint = sendReplaceArray[KEY_GET_POINT];
	
					// 支払い金額、使用ポイント計算(ポイントは授業料、備品代の双方に対して消費できる)
					var usePoint = sendReplaceArray[KEY_USE_POINT];
					if (userGetPoint * 1 < usePoint * 1) {
						throw new Error("使用ポイント(" + usePoint + ")が所持ポイント(" + userGetPoint + ")を超えています");
					}

					// 使用ポイントが購入金額を超えていないか検証する 2016.10.16 add k.urabe
					if((sendReplaceArray[KEY_PAY_PRICE] - usePoint) < 0) {
						// 使用ポイントが購入金額を上回っているため、使用ポイントを購入金額と同ポイントにする 2016.10.16 add k.urabe
						usePoint = sendReplaceArray[KEY_PAY_PRICE];
					}

					//実際の支配額をセットする
					sendReplaceArray[KEY_PAY_CASH] = sendReplaceArray[KEY_PAY_PRICE] - usePoint;

					// 最終的に算出された使用ポイントをセットする 2016.10.16 add k.urabe
					sendReplaceArray[KEY_USE_POINT] = usePoint;
					// 商品に紐付くポイントレートを取得する 2016.10.16 add k.urabe
					sendReplaceArray[COLUMN_NAME_POINT_RATE] = scpc.getCommodityPlusPointRate('commodityPlusPoint' , sendReplaceArray[COMMODITY_KEY]);
					// 最終確定額とポイントレートから加算されるポイントを算出する 2016.10.16 add k.urabe
					sendReplaceArray[KEY_GET_POINT] = scpc.getUserPlusPoint(sendReplaceArray[KEY_PAY_CASH], sendReplaceArray[COLUMN_NAME_POINT_RATE]);

					//商品購入承認データを更新する
					var processedNum = permitDataUpdate(sendReplaceArray, isBuyCommodity(sendReplaceArray), 'permitLessonContainCommodity', 'permitLessonContainCommodity');
					
					//更新ができていなければ
					if(!processedNum) {
						//異常とし、例外を投げて以後の更新を中断する
						throw new Error('以下のデータの更新に失敗しました。\n' + sendReplaceArray.user_name + ' ' +sendReplaceArray.content + ' ' + sendReplaceArray.sell_number + '個 合計' +  sendReplaceArray.selling_price + '円\n');
					}
					
					//生徒さんの情報をリストに追加していく
					processedList.push(sendReplaceArray.user_name + ' ' + sendReplaceArray.content + ' ' + sendReplaceArray.sell_number + '個 ' + sendReplaceArray.pay_cash + '円' + '\n');	

					//データ削除用リストに番号を追加する
					deleteList.push(i); // 2016.10.04 r.shibata 指定が[i]だったのを修正
					//承認を終えた行を削除する
					$(this).remove();
					//更新成功数をインクリメントする //2016.10.04 r.shibata 追加
					successcounter++;
				}
				
				//カウンターをインクリメントする
				counter++;
			});
		//例外処理
		} catch(e){
			//処理件数が0件であれば 2016.10.04 r.shibata 更新成功するを参照するよう変更
			if (successcounter == 0) {
				processedList = [];		//序文を消す
			}
			//メッセージの先頭を追加する
			processedList.unshift('商品購入処理中にエラーが発生したため商品購入承認処理を中断しました。\n' + e.message + '\n');
		//必ず行う処理
		} finally {

			commonFuncs.showMessageDialog('商品購入承認', processedList.join(''));	//処理を行った生徒さんのリストを表示する
			
			//承認済みのデータを削除する
			for (var i = 0; i < deleteList.length; i++) {
				//テーブル用JSONをクリアする
				create_tag.json[KEY_SELL_COMMODITY_PERMIT_INFO_TABLE].tableData.splice(deleteList[i] - i, 1);
			}
			
		//連番を振り直す
		commonFuncs.insertSequenceNo(SELECTOR_SELL_COMMODITY_PERMIT_INFO_TABLE, SELECTOR_NO_COL);
		}
	});
}

/* 
 * 関数名:afterReloadSellCommodityPermitListInfoTable
 * 概要  :商品購入承認一覧がリロードした際にテーブルに対して処理をする関数をコールするための関数
 * 引数  :なし
 * 返却値  :なし
 * 作成者:T.Masuda
 * 作成日:2016.03.19
 */
function afterReloadSellCommodityPermitListInfoTable() {
	//当該タブのcreateTagを取得する
	var sellCommodityPermitList = $(SELECTOR_SELLCOMMODITYPERMITLIST_TAB)[0].create_tag;
	//受講承認一覧テーブルの取り出した行にクラス名を付ける
	setTableRecordClass(SELLCOMMODITY_PERMIT_LIST_INFO_TABLE, SELLCOMMODITYPERMITLIST_RECORD);
	//受講承認一覧テーブルの列内を編集する
	commonFuncs.dbDataTableReplaceExecute(DOT + SELLCOMMODITY_PERMIT_LIST_INFO_TABLE, sellCommodityPermitList.json[SELLCOMMODITY_PERMIT_LIST_INFO_TABLE][TABLE_DATA_KEY], SELLCOMMODITY_PERMIT_LIST_INFO_TABLE_REPLACE_FUNC, null, DEFAULT_SHOW_MAX_ROW);
	//受講承認一覧テーブルの料金列をテキストボックスにする
	sellCommodityPermitList.insertTextboxToTable(SELLCOMMODITY_PERMIT_LIST_INFO_TABLE, REPLACE_TEXTBOX_COST, REPLACE_TEXTBOX_COST_CELL);
	//受講承認一覧テーブルの使用pt列をテキストボックスにする
	sellCommodityPermitList.insertTextboxToTable(SELLCOMMODITY_PERMIT_LIST_INFO_TABLE, REPLACE_TEXTBOX_USE_POINT, REPLACE_TEXTBOX_USE_POINT_CELL);
	//受講承認一覧テーブルの販売個数列をテキストボックスにする
	sellCommodityPermitList.insertTextboxToTable(SELLCOMMODITY_PERMIT_LIST_INFO_TABLE, REPLACE_TEXTBOX_SELL_NUMBER, REPLACE_TEXTBOX_SELL_NUMBER_CELL);
	//セレクトメニューを列にアウトプットする
	sellCommodityPermitList.outputTag(CONTENT_SELECT, CONTENT_SELECT, SELECTOR_APPEND_SELECTBOX);
	//受講承認のアコーディオンの備品名にセレクトボックスの値をDBから取り出した値で追加する
	sellCommodityPermitList.setSelectboxText(sellCommodityPermitList.json.selectCommodityInf[TABLE_DATA_KEY], sellCommodityPermitList.json.accordionContent.contentCell.contentSelect.contentOption, COMMODITY_NAME);
	//受講承認一覧テーブルのテキストボックスにDBから読込んだ値をデフォルトで入れる
	sellCommodityPermitList.setTableTextboxValuefromDB(sellCommodityPermitList.json[SELLCOMMODITY_PERMIT_LIST_INFO_TABLE][TABLE_DATA_KEY], create_tag.setInputValueToLecturePermitListInfoTable, SELECTOR_SELLCOMMODITY_PERMIT_LIST_INFO_TABLE, DEFAULT_SHOW_MAX_ROW);

	//テーブルにデータがあれば
	if($(SELECTOR_SELLCOMMODITY_PERMIT_LIST_INFO_TABLE_BODY_TR).length){
		//セレクトボックスのvalueを画面に表示されている値にする
		sellCommodityPermitList.setSelectboxValue(SELECTOR_CONTENT_SELECT, LECTURE_PERMIT_LIST_INFO_TABLE, COMMODITY_KEY, sellCommodityPermitList.json.selectCommodityInf[TABLE_DATA_KEY]);
		//備品販売IDを格納するための隠しフォームを各行にセットする
		sellCommodityPermitList.outputTag(COMMODITY_SELL_ID, COMMODITY_SELL_ID, SELECTOR_APPEND_SELECTBOX);
		//備品セレクトボックスを規定のものにする
		setSelectedCommodity(sellCommodityPermitList, null, SELLCOMMODITY_PERMIT_LIST_INFO_TABLE, SELECTOR_SELLCOMMODITY_PERMIT_LIST_INFO_TABLE_BODY_TR);
	}
	
	//置換済みテキストボックスに数値入力のみできるようにする
	//2016.09.11 r.shibata 指定されているセレクタ不正を修正
	$(SELECTOR_SELLCOMMODITYPERMITLIST_TAB + SPACE + SELECTOR_REPLACETEXTBOX).attr({
        onkeydown: FUNC_CONTROLL_INPUT_CHAR	//数値のみ入力できるように関数を登録
	});
}

/* 
 * 関数名:moveToUserList
 * 概要  :ユーザ情報取得のためにユーザ一覧へ遷移する
 * 引数  :String beforePanel : 遷移前のパネル名
 * 		:String button : ボタンのセレクタ
 * 返却値  :なし
 * 作成者:T.Masuda
 * 作成日:2016.03.19
 */
function moveToUserList(beforePanel, button) {
	//ボタンにコールバックを登録する
	$(button).on(CLICK, function(){
		//遷移前の画面名を指定したタブのクラスインスタンスにセットする
		$('#adminTab')[0].instance.beforePanel = beforePanel;
		//対象のタブへ遷移する
		$('#adminTab').easytabs('select', '#userList');
	});
}

/*
 * 関数名:clickUserListButton
 * 概要  :ユーザ一覧画面の押されたボタンによって処理を振り分ける
 * 引数  :element button : 押されたボタン
 * 返却値  :なし
 * 作成者:T.Masuda
 * 作成日:2016.03.19
 * 変更者:k.urabe
 * 変更日:2016.09.29
 * 内容　:受講承認の追加画面仕様変更に伴い、主にbackCallbacks[doLecturePermit]内の処理を全体的に修正
 * 変更者:k.urabe
 * 変更日:2016.10.07
 * 内容　:共通ボタン（ログインor受付）の導入に合わせて、関数名の変更および処理の判定等を追加（旧関数名：returnFromUserList）
 */
function clickUserListButton(button) {
	// 管理者タブから前の画面名を取得する
	var moveTo = $(SELECTOR_ADMIN_TAB)[0].instance.beforePanel;
	// 押されたボタンの値を取得する
	var buttonType = $(button).attr(DATA_BUTTON_TYPE);
	// 選択行を保存する変数を宣言する
	var selectedRecords = {};

	// ユーザ行のダブルクリックから呼ばれ、既に対象データを保持しているか確認する
	if(!($(SELECTOR_USER_LIST)[0].record)) {
		// 保持していないため、選択行をすべて取得する
		selectedRecords = $(SELECTED_USER_RECORDS);
	} else {
		// 保持しているため、対象行を取得する
		selectedRecords = $(SELECTOR_USER_LIST)[0].record;
		// DOMが持つ選択行を初期化する
		$(SELECTOR_USER_LIST)[0].record = null;
	}
	
	// ユーザ一覧画面が、通常画面なのか他画面からの遷移後の画面なのかを判定する
	if(!moveTo) {
		// 通常画面のため、選択行が1行であるか検証する
		if(selectedRecords.length == 1) {
			// 対象のユーザで代行ログインする
			loginInsteadOfMember($(SEL_ID, selectedRecords).text());
		} else {
			// 1行のみ選択する旨のメッセージを表示する
			alert(MESSAGE_NEED_SELECT_RECORD);
		}
	} else {
		// 遷移前の画面および押されたボタンに併せた処理を行う
		backCallbacks[moveTo](selectedRecords, buttonType);
	}
}

//ユーザ一覧から元画面に戻るときにコールする関数 2016.09.29 mod　k.urabe 画面の機能仕様変更に伴い、doLecturePermitプロパティから呼ばれる無名関数を修正
var backCallbacks = {
		//受講承認
		doLecturePermit : function(records, buttonType){
			// 押されたボタンが選択ならば
			if (buttonType == 0) {
				// 受講承認タブのcreateTagを取得する
				var dlpc = $(DO_LECTUREPERMIT_TAB)[0].create_tag;
				// DB更新のキーとして選択行のuser_classwork_keyキーを保存するための変数
				var sendUpdateDate　= {};
				// DB更新に使用するクエリを保持するための変数を宣言し、クエリを取得する
				var sendQuery = $.extend(true, {}, dlpc.json.setReservedStatusToReception);
				// 更新対象となるレコード件数を保持するための変数を宣言し、件数を取得する
				var updateRecordNum = records.length;

				// 更新対象の行が選択されているか検証する
				if(0 < updateRecordNum) {
					// 選択行を走査し、選択された会員に紐付く授業を「受付」に更新する
					for (var i = 0; i < updateRecordNum; i++) {
						// 現在行の更新対象となるuser_classwork_keyキーを抽出する
						sendUpdateDate[KEY_USER_CLASSWORK_KEY]　= $(records[i]).children(SELECTOR_USER_CLASSWORK_KEY).text();
						// 抽出したuser_classwork_keyをキーとして予約状況を更新する
						dlpc.setDBdata(sendQuery, sendUpdateDate, EMPTY_STRING);
					}
					// 追加画面用のクエリをセットする
					dlpc.json.userListInfoTable.db_getQuery = dlpc.json.userListInfoTable.queryForDoLecturePermit;
					// ページング機能付きテーブルを再表示する 2016.09.10 mod k.urabe テーブル再表示処理を関数にまとめたので変更
					reloadPagingTable(dlpc, KEY_USER_INFO_LIST_TABLE, SELECTOR_USER_LIST_TABLE_OUTSIDE, SELECTOR_USER_LIST);
				// 選択されていなかった場合
				} else {
					// 1行以上選択する必要がある旨を出力する
					alert(MESSAGE_NEED_SELECT_MORE_1_RECORD);
				}
			// 押されたボタンがキャンセルならば
			} else {
				// タブのインスタンスを取得する
				var tabInstance = $('#adminTab')[0].instance;

				// 呼び出し元のテーブルに戻る 2016.09.30 mod k.urabe 呼び出し元画面に戻る関数を追加したことによる変更
				executeTagReturn(tabInstance, false, SELECTOR_ADMIN_TAB, SELECTOR_LECTURE_PERMIT);
			}
		},
		//商品購入承認
		sellCommodityPermit : function(records, buttonType){
			//押されたボタンが選択であれば 2016.09.30 k.urabe buttonTypeを取得できるようになったので、条件を変更
			if (buttonType == 0) {
				//商品購入承認画面のcreateTagを取得する
				var scpc = $('#sellCommodityPermit')[0].create_tag;
				// 対象の行が選択されているか検証する 2016.10.13 r.shibata 追加
				if(records.length > 0) {
					//レコードを走査する
					$(records).each(function(){
						//データ作成用のデータをレコードから抽出する
						var recordData = createRecordFromDom(this);
						//承認用データを作る
						var permitData = creaetSellCommodityPermitData(recordData);
						//商品購入承認のレコードをINSERTする準備を行う
						//ユーザーキーを設定する
						scpc.json.insertSellCommodityRecord.user_key.value = permitData.user_key;
						//デフォルトの商品コードを設定する
						scpc.json.insertSellCommodityRecord.purchase_id.value = COMMODITY_NOT_SELECTED_KEY_2;
						//レコードの保存を行う
						var result = scpc.getJsonFile(URL_SAVE_JSON_DATA_JSP, scpc.json.insertSellCommodityRecord, 'insertSellCommodityRecord');
						//レコードの保存ができなかった
						if (!parseInt(result.message)) {
							//レコードの保存が出来なかった旨を伝達する
							alert(COUNDNT_INSERT_SELLCOMMODITY_PERMIT_MESSAGE + permitData.user_name + ' 会員番号 : ' + permitData.user_key);
						}
					});
					//タブのインスタンスを取得する
					var tabInstance = $(SELECTOR_ADMIN_TAB)[0].instance;
					// 呼び出し元のテーブルに戻る
					executeTagReturn(tabInstance, false, SELECTOR_ADMIN_TAB, SELECTOR_LECTURE_PERMIT);
				// 選択されていなかった場合 2016.10.13 r.shibata 追加
				} else {
					// 1行以上選択する必要がある旨を出力する 2016.10.13 r.shibata 追加
					alert(MESSAGE_NEED_SELECT_MORE_1_RECORD);
				}
			// 押されたボタンがキャンセルならば 2016.10.13 r.shibata 追加
			} else {
				//タブのインスタンスを取得する
				var tabInstance = $(SELECTOR_ADMIN_TAB)[0].instance;
				// 呼び出し元のテーブルに戻る 2016.09.30 mod k.urabe 呼び出し元画面に戻る関数を追加したことによる変更 2016.10.04 r.shibata タブ遷移後画面をリロードするように変更
				executeTagReturn(tabInstance, false, SELECTOR_ADMIN_TAB, SELECTOR_LECTURE_PERMIT);
			}
		}
}

/* 
* 関数名:executeTagReturn
* 概要  :戻り先のタブに戻る処理をまとめた関数です
* 引数  :object tabInstance	:tabExクラスのインスタンス
       :boolean cache		:trueだと戻り先のタブをリロードしない、falseだと戻り先のタブをリロードする
       :selector tabParent	:戻り先の対象とする親のタブ（例：#adminTab）
       :selector tabChild	:戻り先の対象とする子のタブ（例：#lecturePermit）
* 返却値:なし
* 作成者:k.urabe
* 作成日:2016.09.30
*/
function executeTagReturn(tabInstance, cache, tabParent, tabChild) {
	// 戻り先のタブの内容をリロードするか設定する
	tabInstance.cache = cache;
	// 指定された戻り先に戻る
	$(tabParent).easytabs('select', tabChild);
	// 保持していた呼び出し元の画面情報を初期値に戻す。
	tabInstance.beforePanel = null;
}

/* 
* 関数名:reloadPagingTable
* 概要  :ページャ付きのテーブルを表示（再表示）する関数をまとめた関数
* 引数  :object reservedObject		: createLittleContentのインスタンス
*      :object tableName			: 対象とするテーブルのクラス名（例：userListInfoTable）
*      :selector outsideSelector	: 対象とするテーブルの外側のセレクタークラス名（例：.userListTableOutside）
*      :selector targetSelector		: 対象とするテーブルのセレクターID名（例：#userList）
* 返却値:なし
* 作成者:k.urabe
* 作成日:2016.10.02
*/
function reloadPagingTable(reservedObject, tableName, outsideSelector, targetSelector) {
	// テーブルを表示（再表示）するためにテーブルの描画エリアをリセットする
	reservedObject.tableReset(tableName);
	// 対象のデータ一覧を取得する
	reservedObject.getJsonFile(URL_GET_JSON_ARRAY_JSP, reservedObject.json[tableName], tableName);
	// ページング機能付きで対象のデータ一覧テーブルを作る
	reservedObject.outputNumberingTag(tableName, NUMBERING_START, NUMBERING_PAGE, NUMBERING_DEFAULT, NUMBERING_DISPLAY, outsideSelector, FUNC_AFTER_RELOAD_USER_LIST_INFO_TABLE, "$('" + targetSelector + "')[0].");
}

/* 
 * 関数名:replaceSellCommodityPermitInputs
 * 概要  :受講承認用レコードのDOMを作成する
 * 引数  :common common : 汎用関数クラスインスタンス 
 * 返却値  :なし
 * 作成者:T.Masuda
 * 作成日:2016.03.26
 */
function replaceSellCommodityPermitInputs(common) {
	// 入力可能テキストボックスに設定する設定を作成する 2016.10.05 r.shibata 追加
	var settings = {onkeydown : FUNC_CONTROLL_INPUT_CHAR, min : 0}
	//数量、価格、使用ポイント、合計金額列をテキストボックスに置き換える
	//商品キー列は隠しinputに置き換える
	common.tdReplaceToTextbox('.sellCommodityPermitInfoTable', '.sell_number:not(:first)', 'sell_number', 'number', settings);	// 第5引数追加、テキストボックスに設定する 2016.10.05 r.shibata
	common.tdReplaceToTextbox('.sellCommodityPermitInfoTable', '.price:not(:first)', 'price', 'number', settings);				// 第5引数追加、テキストボックスに設定する 2016.10.05 r.shibata
	common.tdReplaceToTextbox('.sellCommodityPermitInfoTable', '.use_point:not(:first)', 'use_point', 'number', settings);		// 第5引数追加、テキストボックスに設定する 2016.10.05 r.shibata
	common.tdReplaceToTextbox('.sellCommodityPermitInfoTable', '.pay_price:not(:first)', 'pay_price', 'number');
	common.tdReplaceToTextbox('.sellCommodityPermitInfoTable', '.commodity_key:not(:first)', 'commodity_key', 'hidden');
}

/* 
 * 関数名:creaetLecturePermitRecord
 * 概要  :受講承認用レコードのDOMを作成する
 * 引数  :Object record : 受講承認データ1レコード分 
 * 返却値  :なし
 * 作成者:T.Masuda
 * 作成日:2016.03.19
 */
function creaetLecturePermitRecord(record) {
	//返却用のDOMを作成する
	var retDom =
			//行の連番
			$('<table><tr><td class="No">'
			//開始〜終了時刻
			+ TD_FROM_REAR + commonFuncs.allDateTime(record)
			//受講人数
			+ TD_FROM_REAR_DISPLAY_NONE + record.order_students
			//授業詳細情報テーブルのID
			+ TD_FROM_REAR_DISPLAY_NONE + record.lesson_key
			//開始時刻
			+ TD_FROM_REAR_DISPLAY_NONE + record.start_time
			//終了時刻
			+ TD_FROM_REAR_DISPLAY_NONE + record.end_time
			//ユーザ名
			+ TD_FROM_REAR + record.user_name
			//ステージ番号
			+ TD_FROM_REAR_DISPLAY_NONE + record.stage_no
			//レベル番号
			+ TD_FROM_REAR_DISPLAY_NONE + record.level_no
			//受講情報テーブルのID
			+ TD_FROM_REAR_DISPLAY_NONE + record.user_classwork_key
			//ユーザID
			+ '</td><td class="user_key" style="display : none">' + record.user_key
			//所持ポイント
			+ TD_FROM_REAR+ record.get_point
			//授業(コース)名
			+ TD_FROM_REAR + record.lesson_name
			//使用ポイントを入力するテキストボックス
			+ '</td><td class="use_point"><input type="number" min="0" name="use_point" onkeydown="return controllInputChar(event);" value="0"></td>'
			+ '<td style="" colspan="" class="user_classwork_cost"><input type="number" min="0" name="user_classwork_cost" onkeydown="return controllInputChar(event);" value="' + record.user_classwork_cost + '">'
			+ TD_FROM_REAR_DISPLAY_NONE+ record.school_key + '</td></tr></table>');
	
	//作成したDOMを返す
	return retDom;
}

/* 
 * 関数名:creaetLecturePermitData
 * 概要  :受講承認用データを作成する
 * 引数  :Object record : 受講承認データ1レコード分 
 * 返却値  :object : 受講承認データ
 * 作成者:T.Masuda
 * 作成日:2016.03.19
 */
function creaetLecturePermitData(record) {
	//返却用のDOMを作成する
	var obj =
			{
				//受講人数
				order_students : record.order_students
				//授業詳細情報テーブルのID
				,lesson_key : record.lesson_key
				//開始時刻
				 ,start_time : record.start_time
				//終了時刻
				 ,end_time : record.end_time
				//ユーザ名
				 ,user_name : record.user_name
				//ステージ番号
				 ,stage_no : record.stage_no
				//レベル番号
				 ,level_no : record.level_no
				//受講情報テーブルのID
				 ,user_classwork_key : record.user_classwork_key
				//ユーザID
				 ,user_key : record.user_key
				//所持ポイント
				 ,get_point : record.get_point
				//授業(コース)名
				 ,lesson_name : record.lesson_name
				//使用ポイントを入力するテキストボックス
				 ,use_point : 0
				 ,user_classwork_cost : record.user_classwork_cost
				 ,school_key : record.school_key
			};
	
	//作成したDOMを返す
	return obj;
}

/* 
 * 関数名:creaetSellCommodityPermitRecord
 * 概要  :商品購入承認用レコードのDOMを作成する
 * 引数  :Object record : 受講承認データ1レコード分 
 * 返却値  :なし
 * 作成者:T.Masuda
 * 作成日:2016.03.19
 */
function creaetSellCommodityPermitRecord(record) {
	var seqNum = $('.sellCommodityPermitInfoTable tr:not(:first)').length + 1;
	//返却用のDOMを作成する
	var retDom =
		//行の連番
		$('<table><tr><td class="No">' 
				//ユーザ名
				+ '</td><td style="" colspan="">' + record.user_name
				//獲得ポイント
				+ '</td><td style="" colspan="">' + record.get_point
				//商品キー
				+ '</td><td class="commodity_key" style="display : none" colspan=""><input type="hidden" name="commodity_key" value="' + COMMODITY_NOT_SELECTED_KEY_2 + '">'
				//ユーザID
				+ '</td><td style="" colspan="">' + record.user_key
				//商品名 未選択状態で
				+ '</td><td class="content" style="" colspan="">' + COMMODITY_NOT_SELECTED
				//個数
				+ '</td><td class="sell_number" style="" colspan="">' + DEFAULT_COMMODITY_SELL_NUMBER
				//単価
				+ '</td><td class="price" style="" colspan="">' + 0
				//使用ポイント
				+ '</td><td class="use_point" style="" colspan="">' + 0
				//合計金額
				+ '</td><td class="pay_price" style="" colspan="">' + 0
				+ '</td><td class="commodity_sell_key" style="" colspan="">' + ''
				+ '</td></tr></table>');	

	//作成したDOMを返す
	return retDom;
}

/* 
 * 関数名:creaetSellCommodityPermitData
 * 概要  :商品購入承認データを作成する
 * 引数  :Object record : 商品購入承認データ1レコード分 
 * 返却値  :object : 購入承認データ
 * 作成者:T.Masuda
 * 作成日:2016.03.19
 */
function creaetSellCommodityPermitData(record) {
	//返却用のオブジェクトを作成する
	var obj =
		{
			//列の内訳 連番 ユーザ名 所持ポイント 商品ID ユーザID 商品名 数量 単価 使用ポイント 支払額
			'user_name' : record.user_name
			,'get_point' : record.get_point
			,'commodity_key' : COMMODITY_NOT_SELECTED_KEY_2
			,'user_key' : record.user_key
			,'content' : COMMODITY_NOT_SELECTED
			,'sell_number' : DEFAULT_COMMODITY_SELL_NUMBER
			,'price' : 0
			,'use_point' : 0
			,'pay_price' : 0
		};
	
	//作成したDOMを返す
	return obj;
}

/* 
 * 関数名:createRecordFromDom
 * 概要  :ユーザ一覧の行DOMから販売承認用データを作る
 * 引数  :element record : 商品購入承認データ1レコード分 
 * 返却値  :object : 購入承認データ
 * 作成者:T.Masuda
 * 作成日:2016.03.19
 */
function createRecordFromDom(record){
	//返却するオブジェクトを用意する
	var dataObj = {
		//ユーザ名
		user_name : $('td', record).filter('.user_name').text()
		//ユーザID
		,user_key : $('td', record).filter('.id').text()
		//所持ポイント
		,get_point : $('td', record).filter('.get_point').text()
	}
	
	return dataObj;	//作成したデータを返す
}


/*
 * 関数名:doubleClickToLogin
 * 引数  :string targetParent : コールバック登録対象の祖先要素
 * 戻り値:なし
 * 概要  :指定した要素の子孫のユーザデータを持つtrをダブルクリックして、対象ユーザでログインするイベントコールバック登録
 * 作成日:2016.04.02
 * 作成者:T.Masuda
 */
function doubleClickToLogin (targetParent){
	//対象の子孫の行データをダブルクリックしたら
	$(targetParent).on('doubletap','tbody tr',function(event){
		//対象のユーザでログインする
		loginInsteadOfMember($('.id', this).text());
	});
}

/*
 * 関数名:doubleClickTo
 * 引数  :string targetParent : コールバック登録対象の祖先要素
 * 戻り値:なし
 * 概要  :対象行trをダブルクリックして、対象ユーザの情報を取得するイベントをコールバック登録
 * 作成日:2016.10.07
 * 作成者:k.urabe
 */
function doubleClickTo (targetParent){
	//対象の子孫の行データをダブルクリックしたら
	$(targetParent).on(DOUBLE_TAP, SELECTOR_TBODY_TR,function(event){
		// 選択された行のデータをDOMに保存する
		$(SELECTOR_USER_LIST)[0].record = $(this);
		// 共通ボタンをクリックする
		$(SELECTOR_SELECT_USER).trigger(CLICK);
	});
}

/*
 * 関数名:deleteRecords
 * 引数  :string targetTable : コールバック登録対象の祖先要素
 *      :string targetClass : コールバック登録対象の祖先要素
 *      :Object queryObj    : 削除用クエリが入ったオブジェクト
 *      :function callback  : 処理後のコールバック
 *      :Array createTagData : createTagの処理対象テーブルデータ
 *      :String noColumn    : 連番列名
 * 戻り値:なし
 * 概要  :指定した行データをDBレコード共に削除する
 * 作成日:2016.04.09
 * 作成者:T.Masuda
 */
function deleteRecords (targetTable, targetClass, queryObj, callback, createTagData, noColumn){
	var processedRecords = 0;	//処理済みレコード数のカウント

	//承認済みとなって削除するべきデータのインデックスの配列
	var deleteList = [];
	var resultMessage = '';	//処理結果を伝えるメッセージ
	
	//削除失敗時に例外で以降の処理を中断させるため、try-catch構文を使う
	try {
		//対象のテーブルの行を走査する
		$('tr', $(targetTable)).each(function(i){
			//対象の行であれば
			if($(this).attr('class') && $(targetClass, $(targetTable)).index(this) != -1) {
				var isSuccess = true;	//処理成否結果。DBアクセスがない場合はずっとtrue
				
				if(queryObj) {
					
					//送信用のオブジェクトを生成する
					var sendObj = {
							//クエリ
							db_setQuery : queryObj[KEY_DB_SETQUERY]
					//削除対象のID。行データから抽出する
					,id : { value : $(this).children('.id').text()}
					};
					
					//レコード削除のクエリを発行する
					isSuccess = commonFuncs.sendSimpleQuery(sendObj, EMPTY_STRING, URL_SAVE_JSON_DATA_JSP);
				}
				
				//成功したら
				if (isSuccess) {
					//削除に成功した行を削除する
					$(this).remove();
					//承認を終えたデータのインデックスをリストに追加する
					deleteList.push(i);
				//失敗したら
				} else {
					//対象のレコードの会員名の取得を試行する
					var userName = $(this).children('.user_name').text();
					//エラーメッセージを作成する。名前が取得できた場合は名前を載せる
					var errorMessage = commonFuncs.checkEmpty(userName) ? 'このレコードの削除に失敗しました。処理を中断します。 : ' + userName : 'レコードの削除に失敗しました。処理を中断します。';
					//処理を中断する
					throw new Error(errorMessage);
				}
				
				processedRecords++;	//処理済み数をカウントアップする
			
			}
		});
	//例外発生時
	} catch (e) {
		//エラーメッセージをセットする
		resultMessage = e.message + '\n' + processedRecords + '件のレコードを削除しました。';
	//最後の処理
	} finally {
		//コールバックが指定されていたら
		if(callback){
			//処理後のコールバックを実行する
			callback();
		}
		
		//連番列が入力されていれば
		if(noColumn) {
			//連番を振り直す
			commonFuncs.insertSequenceNo(targetTable, noColumn);
		}
		
		//処理対象のレコードがcreateTagと連動したデータであったら
		if(createTagData){
			//削除済みのデータを削除する
			for (var i = 0; i < deleteList.length; i++) {
				//テーブル用JSONをクリアする
				createTagData.splice(deleteList[i] - i, 1);
			}
		}
	}
	
	//エラーメッセージがセットされていなければ処理結果メッセージを処理件数を伝える内容にする
	resultMessage = resultMessage == EMPTY_STRING ? processedRecords + '件のレコードを削除が完了しました。' : resultMessage;
	//処理結果を通知する
	alert(resultMessage);
}

/*
 * 関数名:askExecuteDelete
 * 引数  :string message : ダイアログに出すメッセージ
 *      :function func : 削除の関数
 * 戻り値:なし
 * 概要  :削除実行前にダイアログを出して実行するかの確認を取る
 * 作成日:2016.04.09
 * 作成者:T.Masuda
 */
function askExecuteDelete (message, func){
	//設定オブジェクトを作る
	var settingObj = commonFuncs.getDefaultArgumentObject();
	//オブジェクトにメッセージ、コールバック関数をセットする
	settingObj.data.message = message;
	//無名関数として引数の関数eval関数にかけるコードをコールバックにセットする
	settingObj.data.callback = function(){ eval(func); this.instance.destroy();};
	
	//確認ダイアログのクラスインスタンスを生成する
	var confirmDialog = new dialogEx(CONFIRM_DIALOG_PATH,settingObj);
	
	//openイベントのコールバック関数をセットする
	confirmDialog.run();	//ダイアログを開く	
}

/*
 * 関数名:executeDeleteRecord
 * 引数  :string or Element target: クリックイベント登録先の要素
 *      :string message : ダイアログに出すメッセージ
 *      :string targetRecord : 処理対象のレコードのセレクタ
 *      :function func : 削除の関数
 * 戻り値:なし
 * 概要  :指定した要素をクリックしてレコード削除を行う
 * 作成日:2016.04.09
 * 作成者:T.Masuda
 */
function executeDeleteRecord (target, message, targetRecord, func){
	//対象をクリックしたら
	$(target).on(CLICK, function(){
		//対象がなければ
		if($(targetRecord).length == 0) {
			//警告を出す
			alert(MESSAGE_CHOOSE_TARGET);
			return false;	//処理を行わない
		}
		
		//ダイアログを呼び出して確認を取った上で削除を行う
		askExecuteDelete(message, func);
	});
}

/*
 * 関数名:popupSearchDialog
 * 引数  :string or Element target: クリックイベント登録先の要素
 * 戻り値:なし
 * 概要  :検索ダイアログを表示する
 * 作成日:2016.04.09
 * 作成者:T.Masuda
 */
function popupSearchDialog (){
	//ダイアログ作成用のオブジェクトのひな形を生成する
	var argumentObj = commonFuncs.getDefaultArgumentObject();
	//タイトルを設定する
	argumentObj.config.title = TEXT_USER_SEARCH;
	//検索用ダイアログのクラスインスタンスを生成する
	var searchDialog = new dialogEx(PATH_USER_SEARCH_DIALOG, argumentObj);
	//ユーザ検索ダイアログを表示する
	searchDialog.run();
}

/*
 * 関数名:setPopupSearchDialog
 * 引数  :string or Element target: クリックイベント登録先の要素
 * 戻り値:なし
 * 概要  :検索ダイアログを表示する関数をボタン等の要素のクリックコールバックに登録する
 * 作成日:2016.04.09
 * 作成者:T.Masuda
 */
function setPopupSearchDialog (target){
	//対象をクリックしたら
	$(target).on(CLICK, function(){
		popupSearchDialog();	//検索ダイアログを表示する
	});
}

/*
 * 関数名:deleteAfterReloadMailMagaTable
 * 引数  :なし
 * 戻り値:なし
 * 概要  :メルマガの削除実行後の処理関数
 * 作成日:2016.04.09
 * 作成者:T.Masuda
 */
function deleteAfterReloadMailMagaTable(){
	//テーブルをリロードする
	$('#mailMagaAndAnnounce')[0].create_tag.loadTableData('mailMagaTable', 1, 4, 1, MAILMAGA_TABLE_SHOW_NUMBER, '.mailMagaTableOutside', 'afterReloadMailMagaTable', GET_MAILMAFATABLE_CREATE_TAG); // create_tag取得用の引数の値を修正し定数化 2016.10.06 r.shibata
} 

/*
 * 関数名:popupMailMagaDialog
 * 引数  :なし
 * 戻り値:なし
 * 概要  :メルマガ編集ダイアログを表示する
 * 作成日:2016.04.10
 * 作成者:T.Masuda
 */
function popupMailMagaDialog (){
	//ダイアログ作成用のオブジェクトのひな形を生成する
	var argumentObj = commonFuncs.getDefaultArgumentObject();
	//タイトルを設定する
	argumentObj.config.title = TEXT_MAIL_MAGA_DIALOG;
	//メルマガ編集ダイアログのクラスインスタンスを生成する
	var mailMagaDialog = new dialogEx(PATH_MAILMAGA_DIALOG, argumentObj);
	//メルマガ編集ダイアログを表示する
	mailMagaDialog.run();
}

/*
 * 関数名:setPopupMailMagaDialog
 * 引数  :string target: クリックイベント登録先の要素
 * 戻り値:なし
 * 概要  :メルマガ編集を表示する関数をボタン等の要素のクリックコールバックに登録する
 * 作成日:2016.04.10
 * 作成者:T.Masuda
 */
function setPopupMailMagaDialog (target){
	//対象をクリックしたら
	$(target).on(CLICK, function(){
		//選択されているメルマガが0個か1個の場合は
		if($('#mailMagaAndAnnounce .selectRecord').length <= 1){
			popupMailMagaDialog();	//メルマガ編集ダイアログを表示する
		//それ以上選択している場合は
		} else {
			//新規の場合は1個までしか選べないという警告を出す
			alert(MESSAGE_CHOOSE_A_MELMAGA);
		}
	});
}

/*
 * 関数名:resizeMailMagaDialogTitleInput
 * 引数  :なし
 * 戻り値:なし
 * 概要  :メルマガダイアログのタイトル編集テキストボックスをラベルサイズに合わせてリサイズする
 * 作成日:2016.05.01
 * 作成者:T.Masuda
 */
function resizeMailMagaDialogTitleInput() {
	//ラベルの幅を取得する
	var labelWidth = $(".messageTitleLabel").outerWidth(true);
	//ラベルの親要素の幅を取得する
	var parentWidth = $(".messageTitleLabel").parent().outerWidth(true);
	//テキストボックスを持つ要素をリサイズする。それぞれの幅は四捨五入となっているため、念のため1px分引いておく
	$(".messageTitleTextboxArea").width(parentWidth - labelWidth - 1);
}

