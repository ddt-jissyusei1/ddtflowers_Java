
/* ファイル名:commonPage.js
 * 概要　　　:各ページ共通の関数群
 * 作成日　:2015.08.06
 * 作成者　:T.Yamamoto
 * 場所　　:js/page/commonPage.js
 */

/*
 * 関数名:createDateArray(dateText)
 * 引数  :String dateText
 * 戻り値:なし
 * 概要  :日付文字列を配列にして返す。
 * 作成日:2015.02.12
 * 作成者:T.M
 */
function createDateArray(dateText){
	//スラッシュ区切り
	if(dateText.indexOf('/') != -1) {
		// 選択した日付を1つの文字列から配列に変換する。
		var date = dateText.split('/');
	//ハイフン区切り
	} else if (dateText.indexOf('-') != -1) {
		var date = dateText.split('-');
	}

	// trueDateを返す。
	return date;
}

/* 
 * 関数名:changeJapaneseDate(year, month, day)
 * 概要  :ダイアログのタイトルバーに表示する日時のパーツを追加する。
 * 引数  :int year, int month, int day
 * 返却値  :なし
 * 設計者:T.Masuda
 * 作成者:T.Yamamoto
 * 作成日:2015.06.13
 */
function changeJapaneseDate(dateText){
	//受け取った日付をスラッシュで配列に分割する
	var dateArray = createDateArray(dateText);
	// 曜日の配列を宣言、初期化する。
	var weekChars = [ '日', '月', '火', '水', '木', '金', '土' ];
	// 年月日と曜日で構成された日付テキストを作る。月は日付型で0〜11で表現されているので、-1する。
	var resultDate = dateArray[0] + '年' + dateArray[1] + '月' + dateArray[2] + '日' + '(' + weekChars[new Date(dateArray[0], dateArray[1] - 1, dateArray[2]).getDay()] + ')';
	// 日付を返す
	return resultDate;
}

