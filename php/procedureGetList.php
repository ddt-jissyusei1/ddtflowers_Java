<?php

/*
 * ファイル名:procedureGetList.php
 * 概要  :JSONDBManagerを利用し、クライアント側から送信されたJSONのクエリを
 * 		基にDBから取得したデータをテーブルにしてクライアントに返す役割のクラスのファイル。
 * 設計者:H.Kaneko
 * 作成者:T.Masuda
 * 作成日:2015.0728
 * パス	:/php/procedureGetList.php
 */

// JSONのvalueキーの文字列を定数にセットする
define('STR_TABLE_DATA', 'tableData');
//親クラスのファイルを読み込む
require_once ('procedureBase.php');

/*
 * クラス名:procedureGetList
 * 概要  :JSONDBManagerを利用し、クライアント側から送信されたJSONのクエリを
 * 		基にDBから取得したデータをテーブルにしてクライアントに返す役割のクラス。
 * 設計者:H.Kaneko
 * 作成者:T.Masuda
 * 作成日:2015.0728
 */
class procedureGetList extends procedureBase{

	/*
	 * 関数名：init
	 * 概要  :クラスの初期化関数
	 * 引数  :なし
	 * 戻り値:なし
	 * 設計者:H.Kaneko
	 * 作成者:T.Masuda
	 * 作成日:2015.0728
	 */
	function init(){
		//親クラスのinit関数をコールする。
		parent::init();
	}

	/*
	 * 関数名：job
	 * 概要  :クラス特有の処理を行う関数
	 * 引数  :String $jsonString:JSON文字列
	 * 戻り値:なし
	 * 設計者:H.Kaneko
	 * 作成者:T.Masuda
	 * 作成日:2015.0728
	 */
	function job($jsonString){
		parent::job($jsonString);	//親クラスのjobを実行し、メンバにJSONの連想配列を格納する。
		//JSON配列を取得する。

		// 返却するJSON配列の文字列を格納する変数を用意する
		$retArrayString = "";
		
		//SQLによる例外の対処のためtryブロックで囲む
		try {
			//取得したJSON連想配列を走査する
			if(is_array($this->json) && $this->is_hash($this->json)){
				//レコードのJSONを作る
				$retArrayString = $this->getListJSONPlusKey($this->json, STR_TABLE_DATA);
			}
			//SQL例外のcatchブロック
		} catch (PDOException $e) {
			// エラーメッセージを表示する
			echo $e->getMessage();
			// プログラムを終了する
			exit;
		}
		
		//作成したJSON文字列を出力する。
		print($retArrayString);
	}
	
	/*
	 * 関数名：run
	 * 概要  :クラスのinit、job関数をまとめて実行する。
	 * 引数  :String $jsonString:JSON文字列。
	 * 戻り値:なし
	 * 設計者:H.Kaneko
	 * 作成者:T.Masuda
	 * 作成日:2015.0728
	 */
	function run($jsonString){
		//初期化処理とクラス独自の処理をまとめて実行する。
		$this->init();	//初期化関数
		$this->job($jsonString);	//クラス特有の処理を行う
	}
}