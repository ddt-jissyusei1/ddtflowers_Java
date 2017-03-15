/* 
 * ファイル名:exceptionHandling.js
 * 概要  :例外処理をまとめたjsファイル
 * 作成者:R.Shibata
 * 作成日:2016.10.11
 * パス :js/exceptionHandling.js
 */

/*
 * クラス名:noTableRecordException
 * 概要  :テーブル件数が0件を検知した時の例外
 * 引数  :table selecter:0件表示する対象のテーブルを指し示すセレクター
 *        message string:表示するメッセージ
 * 作成日:2016.10.11
 * 作成者:R.Shibata
 */
function noTableRecordException(table, message){
	// メッセージを指定されたテーブルへ出力する。
	$(table).text(message);
};

	