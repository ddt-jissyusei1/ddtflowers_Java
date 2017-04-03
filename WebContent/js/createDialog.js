/* 
 * ファイル名:createDialog.js
 * 概要  :ダイアログと関係する関数を定義する
 * 作成者:T.M
 * 作成日:2015.
 * パス　:/js/createDialog.js
 */

/**
 * ダイアログを作る関数をまとめたJSファイル。
 */
	
//ファイルパスの定数	
/* 
 * 関数名:getCurrentPageFileName()
 * 概要  :ファイル名を取得する。引数に拡張子が入っていた場合、末尾のパスに依存せずURL全体から抽出する
 * 引数  :String identifier:探す拡張子
 * 返却値  :String:ファイル名を返す
 * 作成者:T.M
 * 作成日:2015.06.03
 */

function getCurrentPageFileName(identifier){
	var retFileName = EMPTY;	//ファイル名を返却するための変数を宣言、初期化する
	//現在のページのパスを配列で取得する
	var path = location.pathname.split(SLASH);
	//ファイル名取得の前準備としてパスの要素数を取得する
	var pathLength = path.length;
	
	//拡張子の指定があったら
	if(identifier){
		//拡張子の文字列を作成する
		var identifierString = DOT + identifier;
		//ループしてパスを走査する
		for(var i = 0; i < pathLength; i++){
			//配列の要素が指定した拡張子を含んでいたら
			if(path[i].indexOf(identifierString) != -1){
				//現在走査しているパスを返却するように、変数にセットする
				retFileName = path[i];
				break;	//ループ終了
			}
		}
	//拡張子の指定がなければ
	} else {
		//最後の文字列 = ファイル名として返却するようにする
		retFileName = path[pathLength - 1];
	}
	
	return retFileName;	//取得したファイル名を返す
}

/**
 * 体験レッスンページのコンテンツ作成用JavaScript関数 + 汎用テキスト作成JavaScript関数ファイル。
 */

var currentPage = getCurrentPageFileName('php');	//現在のページ名を取得する。phpでなければ空文字を返す

//現在のページがMSLのphpであれば
if(currentPage == MSL_LIST_PHP || currentPage == MSL_DETAIL_PHP){
	INIT_JSON_PATH = "../../../" + INIT_JSON;		//2階層下がってファイルを取得する
//他のページなら
} else {
	INIT_JSON_PATH = INIT_JSON;		//階層を下げない
}



/* 
 * 関数名:removeInputDialog(dialog, reservedData)
 * 概要  :入力ダイアログを消す。
 * 引数  :jQuery dialog, Object reservedData
 * 返却値  :なし
 * 作成者:T.M
 * 作成日:2015.02.11
 */
function removeInputDialog(dialog, reservedData){
	// ダイアログを完全に消去する。
	dialog.dialog("close").dialog("destroy").remove();
	// reservedDataにnullを格納して空扱いにする。
	reservedData = null;
}



	
/* 
 * 関数名:createSpecialDate(year, month, day)
 * 概要  :予約希望日時のパーツを追加する。
 * 引数  :int year, int month, int day
 * 返却値  :なし
 * 作成者:T.M
 * 作成日:2015.02.09
 * 変更者:T.M
 * 変更日:2015.04.01
 * 内容　:体験レッスン予約希望メールの仕組みの変更により、inputタグへも日付を渡す様に変更しました。
 */
function createSpecialDate(year, month, day){
	// 曜日の配列を宣言、初期化する。
	var weekChars = [ '日', '月', '火', '水', '木', '金', '土' ];
	// 予約希望ダイアログに予約希望日時が書かれたタグを追加する。
	// 年月日と曜日で構成された日付テキストを作る。月は日付型で0〜11で表現されているので、-1する。
	var date = year + '年' + month + '月' + day + '日' + '(' + weekChars[new Date(year, month - 1, day).getDay()] + ')';
	$('.specialReservedDialog').attr('title', date);
//	//日付のinputタグにも日付を追加する。
	$('.specialReservedDialog').dialog('option', 'title', date);
	$('.reservedDate').val(date);
}

/* 
 * 関数名:function getMemberInformation(form)
 * 概要  :フォームの会員情報欄に情報を格納する。。
 * 引数  :String form:対象のフォーム
 * 返却値  :なし
 * 作成者:T.M
 * 作成日:2015.04.17
 */
function getMemberInformation(form){
	var userId = getUserId();	//ユーザIDを取得する。
	var tmp;					//JSONを一時的に格納する変数を用意する。
	//Ajax通信で会員情報のJSONを取得する
	$.ajax({
		// 予約データ保存用のPHPにデータを送信する。2015.02.19現在該当PHPが無いため自身のURLに送信しています。
		url: location.href,
//		url: init["getMemberInformation"],
		dataType: 'text',			//サーバ側の処理ができるまでの措置
//		dataType: 'JSON',			// JSONデータを返してもらう。
		async: false,				// 非同期通信にしない。
		data: {"userId":userId},	//ユーザIDを送信する。
		success:function(json){		// 通信成功時の処理。
			//tmp = json;				//tmpに取得したJSONの連想配列を格納する。
			tmp = {					//サーバの処理を実装するまでダミーデータを使う。
					"personName":"ユーザ",
					"personNameKana":"ユーザ",
					"personEmail":"user@exampleexampleuser.com",
					"personTel":"000-0000-0000"
			}
		}
	});
	
	//フォームの該当するタグの中にテキストを流し込む。
	for(key in tmp){
		$('.' + key).val(tmp[key]);	//連想配列からテキストを取得して流し込む。
	}
}


/* 
 * 関数名:sendReservedData(reservedData)
 * 概要  :サーバに予約希望データを送信する。
 * 引数  :Object reservedData
 * 返却値  :なし
 * 作成者:T.M
 * 作成日:2015.02.11
 */
function sendReservedData(reservedData){
	// サーバにデータを送信し、その結果の文字列をisSuccessに格納する。
	var isSuccess = sendData(reservedData);
	// データの送信に成功したら
	if(isSuccess){
		// 帰ってきたメッセージをダイアログで表示する。
		alert(isSuccess);
		// ダイアログを消す。
		removeReservedDialogs($('.reservedDialog .ui-dialog-content'));
	} else {
		// 時間を空けてもう一度実行してもらうようメッセージのダイアログを出す。
		alert("通信に失敗しました。時間をあけてもう一度お試しください。");
	}
}

/* 
 * 関数名:sendData(reservedData)
 * 概要  :サーバに予約希望データを送信する。
 * 引数  :Object reservedData
 * 返却値  :Object or int
 * 作成者:T.M
 * 作成日:2015.02.11
 */
function sendData(reservedData){
	// 返却値を格納する変数returnsを宣言、0で初期化する。
	var returns = 0;
	// ajax通信で予約データをサーバに送信する。
	$.ajax({
		// 予約データ保存用のPHPにデータを送信する。2015.02.19現在該当PHPが無いため自身のURLに送信しています。
		url: location.href,
//		url: init["sendReservedPhp"],
		// テキストデータを返してもらう。
		dataType: 'text',
		// 非同期通信にしない。
		async: false,
		// 予約データを添付する。
		data: {"reserved":reservedData},
		// 通信成功時の処理。
		success:function(text){
			// returnsに帰ってきたテキストを代入する。2015.03.06現在ではテスト用のテキストを返す。
			//returns = text;
			returns = "ご予約希望を承りました。追ってメールでの返信をいたします。";
		}
	});
	
	// returnsを返す。
	return returns;
}

/* 
 * 関数名:moveToPrevDialog(current)
 * 概要  :直前のダイアログに戻る。
 * 引数  :jQuery current
 * 返却値 :なし
 * 作成者:T.M
 * 作成日:2015.02.12
 */
function moveToPrevDialog(current){
	//1つ前のダイアログを取得する。
	var $prevDialog = $('.ui-dialog-content').eq(current.index('.ui-dialog-content') - 1);
	// currentの前のダイアログの入力要素を有効にする。
	$('input' ,$prevDialog).removeAttr('disabled');
}

/* 
 * 関数名:removeReservedDialogs(dialogs)
 * 概要  :引数の配列にセットされたダイアログを消す。
 * 引数  :array dialogs
 * 返却値 :なし
 * 作成者:T.M
 * 作成日:2015.02.12
 */
function removeReservedDialogs(dialogs){
	// 引数のダイアログの配列を走査する。
	dialogs.each(function(){
		// ダイアログを消去する。
		$(this).dialog('close').dialog('destroy').remove();
	});
}

/* 
 * 関数名:checkAlphabet(str)
 * 概要  :英数字と最低限の記号が文字列に含まれているかをチェックする。
 * 引数  :String str:チェックする文字列
 * 返却値  :なし
 * 作成者:T.M
 * 作成日:2015.04.08
 */
function checkAlphabet(str){
	var retBool = true;	//返却する真理値を格納する変数を宣言、falseで初期化する。
	
	//for文で文字列を走査する。
	for(var i = 0; i < str.length; i++){
		//この文字列に含まれない文字が含まれていたら
		if (!(' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'.indexOf(str[i]) >= 0)){
			retBool = false;	//チェックにひっかかったということで、falseを返す。
			break;			//チェックを終える。
		}
	}
	
	return retBool;	//判定を返す。
}

/* 
 * 関数名:getInitData(path, continues)
 * 概要  :初期化用データの連想配列を取得して返す。
 * 引数  :String path, int continues
 * 返却値  :Object
 * 作成者:T.M
 * 作成日:2015.02.12
 */
function getInitData(path, continues){
	// 返却値を格納する変数を宣言、0で初期化する。
	var returns = 0;
	// for文で規定回数通信するか、通信成功するまで通信を繰り返す。
	for (var i = 0; i < continues && returns == 0; i++){
		// Ajax通信を行いファイルを取得する。
		returns = getJSONFile(path);
	}
	
	// ファイルが取得できていなかったら
	if(!(returns)){
		alert('初期化ファイルの取得に失敗しました。');
	}
	
	// 取得したデータを返す。
	return returns;
}

/* 
 * 関数名:getJSONFile(path)
 * 概要  :JSONファイルを取得して返す。
 * 引数  :String path
 * 返却値  :Object or int
 * 作成者:T.M
 * 作成日:2015.02.12
 */
function getJSONFile(path){
	// 返却値を格納する変数を宣言、0で初期化する。
	var returns = 0;

	// ajax通信で予約データをサーバに送信する。
	$.ajax({
		// pathのファイルを取得する。
		url: path,
		// テキストデータを返してもらう。
		dataType: 'JSON',
		// 同期通信を行う。
		async: false,
		// 通信成功時の処理。
		success:function(json){
			// returnsに取得したJSONデータを格納する。
			returns = json;
		}
	});
	
	// returnsを返す。
	return returns;
}


/*
 * 関数名:inspectAfterLoad
 * 概要:AJAX通信が終わった後にコールされるイベントを定義する
 * 引数:function func:AJAX通信が終わった後にコールするイベント
 * 戻り値:なし
 * 作成日:2015.0627
 * 作成者:T.Masuda
 */
function inspectAfterLoad(func, object){
	//引数のオブジェクトを複製する。オブジェクトが入っていなければ空のオブジェクトを用意する
	var parameter = object !== void(0)? $.extend(true, {}, object) : {};
	//AJAX通信終了後のイベントを定義する
	$(document).ajaxStop(function(){
		func(parameter);	//引数の関数を実行する
	});
}

/* 関数名　:toggleElement
 * 概要　　:要素の表示/非表示を切り替える
 * 引数　　:Object targetObject:処理対象と、判断の基準となる要素のセレクタの文字列を格納したオブジェクト
 * 戻り値　:なし
 * 作成日　:2015.0627
 * 作成者　:T.Masuda
 */
function toggleHeader(targetObject){
	//判断基準となる要素が存在したら
	if(!$(targetObject.evaluation).length){
		//指定された要素を表示する
		$(targetObject.target).show();
	} else {
		//指定された要素を非表示にする
		$(targetObject.target).hide();
	}
}

//@add 2015. T.Masuda 会員ページならヘッダーを消すイベントを設定しました。
//会員ページでのみヘッダーを表示するようにイベントを登録する
//注意:現状ではログアウトボタンが画面上に存在するかを基準にしています。
//短絡的な判断基準ですので、後々詰めるべきであると思います。
//inspectAfterLoad(toggleHeader, {evaluation:CLASS_HEADERS,target:CLASS_HEADER})


/* 
 * 関数名:afterCreateClassList
 * 概要  :予約一覧テーブルを作った後の加工を行う
 * 引数  :Element elem:ダイアログのDOM
 * 		:int time:処理を開始するまでの待ち時間
 * 返却値  :なし
 * 作成者:T.M
 * 作成日:2015.06.14
 */
function afterCreateClassList(elem, time){
	//setTimeoutのコールバック関数前にダイアログ自身への参照を保存する
	var $this = $(elem);
	//時間が入力されていなければ初期値を入れる
	time = time === void(0)? WAIT_DEFAULT : time;
	setTimeout(function(){
		//ダイアログの直下の子のクラス名を取得する
		var className = $this.children().eq(0).attr(CLASS).split(' ')[0];
		//変数に予約一覧テーブルのjsonの連想配列を入れる
		var lessonTable = creator.json[className][TABLE_DATA_KEY];
		// 時間割1限分の生徒の合計人数が入った連想配列を作る
		var timeStudentsCount = getTotalStudentsOfTimeTable(lessonTable);
		//予約一覧テーブルの値を置換する
		lessonReservedTableValueInput('.lessonTable', lessonTable, "callReservedLessonValue", timeStudentsCount);
		$('.lessonTable').show();
	},time);
};

//ダイアログのコール前に呼ぶ関数を連想配列に格納しておく
var readyDialogFunc = {};

//ログインダイアログの準備関数
readyDialogFunc[LOGIN_DIALOG] = function(){
	//ダイアログのDOMとJSONを用意する
	//ログインダイアログのDOMが用意されていなければ
	if(!$(CLASS_LOGIN_DIALOG ,creator.dom).length){
		//ログインダイアログのDOMを取得する
		creator.getDomFile(PATH_LOGIN_DIALOG_HTML);
	}
	//ログインダイアログのJSONが用意されていなければ
	if(util.checkEmpty(creator)|| !(LOGIN_DIALOG in creator.json)){
		//ログインダイアログのJSONを取得する
		creator.getJsonFile(PATH_LOGIN_DIALOG_JSON);
	}

	//ダイアログのタグを作る。
	creator.outputTag(LOGIN_DIALOG);
};

//予約ダイアログの準備関数
readyDialogFunc['specialReservedDialog'] = function(content, array){
	// ダイアログのデータを格納する連想配列を宣言し、引数の配列に格納されたコンテンツ名と予約希望日時を格納する。
	reservedData = {'year': array[0], 'month': array[1], 'day': array[2]};
	
	//@add 2015.0527 T.Masuda この関数が呼ばれるたびにreserved.htmlを読み込んでいた不具合を修正
	//予約ダイアログのDOMを読み込んでいなければ
	if(!$('.specialReservedDialog' ,creator.dom).length){
		creator.getDomFile('template/reserved.html');	//タグを作るためにテンプレートのDOMを取得する。
	}
	
	//レッスン予約ダイアログ用のJSONを取得する。。
	creator.getJsonFile(init[content + LESSON]);

	//体験レッスンであれば
	if(content = EXPERIENCE){
		//体験レッスンの予約ダイアログのDOMを作る
		makeSpecialReservedDialogDom(creator);
	//体験レッスンでなければ
	} else {
		//汎用的な予約ダイアログを作る
		makeUsuallyReservedDialogDom(creator);
	}
	
	//DBから会員情報を取得してpersonInformationの各フォームにデータを格納する。
	getMemberInformation('.specialReservedDialog');
	
	
	//希望曜日の選択があれば
	if($('input[name="dayOfWeek"]').length){
		// 全ての曜日のチェックボックスにチェックする
		allCheckbox('.allDayCheckbox', 'input[name="dayOfWeek"]');
	}
	//希望週の選択があれば
	if($('input[name="week"]').length){
		// 全ての週のチェックボックスにチェックする
		allCheckbox('.allWeekCheckbox', 'input[name="week"]');
	}
	
	// ダイアログに日付欄を追加する。
	createSpecialDate(reservedData['year'], reservedData['month'], reservedData['day']);
};

//予約希望情報送信前の確認ダイアログ
readyDialogFunc['specialReservedConfirmDialog'] = function(reservedData){
		// ダイアログの本体となるdivタグを生成する。
		creator.outputTag('specialReservedConfirmDialog');
}

/* 
 * 関数名:makeSpecialReservedDialogDom
 * 概要  :体験レッスン予約ダイアログのDOMを作る
 * 引数  :createTag creator:createTagクラスのインスタンス
 * 返却値  :なし
 * 作成者:T.M
 * 作成日:2015.06.27
 */
function makeSpecialReservedDialogDom(creator){
	//createTagでダイアログに必要なタグを生成する。
	creator.outputTag('specialReservedDialog','specialReservedDialog','body');
	creator.outputTag('reservedDate','reservedDate','.specialReservedDialog');
	creator.outputTag('reservedSummary','reservedSummary','.specialReservedDialog');
	creator.outputTag('radioButtonSpecialConstruct','radioButtonSpecialConstruct','.specialReservedDialog');
	creator.outputTag('radioButtonSpecialSchedule','radioButtonSpecialSchedule','.specialReservedDialog');
	creator.outputTag('subInfo','subInfo','.specialReservedDialog');
	creator.outputTag('personInformation','personInformation','.specialReservedDialog');
	creator.outputTag('mailSubject','mailSubject','.specialReservedDialog');
}

/* 
 * 関数名:makeUsuallyReservedDialogDom
 * 概要  :通常レッスン予約ダイアログのDOMを作る(旧マイページ)
 * 引数  :createTag creator:createTagクラスのインスタンス
 * 返却値  :なし
 * 作成者:T.M
 * 作成日:2015.06.27
 */
function makeUsuallyReservedDialogDom(creator){
	//createTagでダイアログに必要なタグを生成する。
	creator.outputTag('specialReservedDialog','specialReservedDialog','body');
	creator.outputTag('reservedDate','reservedDate','.specialReservedDialog');
	creator.outputTag('reservedSummary','reservedSummary','.specialReservedDialog');
	creator.outputTag('radioButtonUsuallyCourse','radioButtonUsuallyCourse','.specialReservedDialog');
	creator.outputTag('radioButtonSpecialSchedule','radioButtonSpecialSchedule','.specialReservedDialog');
	creator.outputTag('subInfo','subInfo','.specialReservedDialog');
	creator.outputTag('memberInformation','memberInformation','.specialReservedDialog');
	creator.outputTag('mailSubject','mailSubject','.specialReservedDialog');
}



//クッキーの削除。http://javascript.eweb-design.com/1404_dc.htmlより。
function deleteCookie(cookieName) {
  cName = cookieName + "="; // 削除するクッキー名
  dTime = new Date();
  dTime.setYear(dTime.getYear() - 1);
	  document.cookie = cName + ";expires=" + dTime.toGMTString();
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
//エラーメッセージの配列。
var errorMessages = [
'failed to connect',
'ユーザ認証に失敗しました。ユーザ名、またはパスワードを確認してください。',
'サーバとの通信に失敗しました。時間を置いて再度お試しください。',
'ユーザ名、パスワード、または両方が空欄になっています。'
];

// 初期化用関数をコールして初期化用データの連想配列を用意する。
var init = getInitData(INIT_JSON_PATH, 100);
