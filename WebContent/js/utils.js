/* 
 * ファイル名:utils.js
 * 概要  :ユーティリティクラスを定義する
 * 作成者:T.M
 * 作成日:2015.06.27
 * パス　:/js/utils.js
 */

/* クラス名:utils
 * 概要　　:汎用処理の関数を定義したクラス
 * 引数　　:なし
 * 作成日　:2015.0627
 * 作成者　:T.Masuda
 */
function utils(){
	
	/*
	 * 関数名:checkEmpty
	 * 引数  :var target:空白チェックを行う対象
	 * 戻り値:boolean:判定結果を返す
	 * 概要  :引数に指定された変数やオブジェクトが空でないかをチェックする
	 * 作成日:2015.06.27
	 * 作成者:T.M
	 */
	this.checkEmpty = function(target){
		//判定対象の中身がundefined、null、空文字のいずれかであればfalseを返す。
		return target === void(0) || target == null || target == '' ? false: true;
	}
}