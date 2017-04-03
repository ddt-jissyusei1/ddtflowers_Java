<?php

define('EMPTY_STRING', '');

/*
 * ファイル名:procedureGet.php
 * 概要  :JSONDBManagerを利用し、クライアント側から送信された
 * 		JSONにDBから取得したデータを挿入して返す役割のクラスのファイル。
 * 設計者:H.Kaneko
 * 作成者:T.Masuda
 * 作成日:2015.0728
 * パス	:/php/procedureGet.php
 */

//親クラスのファイルを読み込む
require_once ('procedureBase.php');

/*
 * クラス名:procedureGet
 * 概要  :JSONDBManagerを利用し、クライアント側から送信された
 * 		JSONにDBから取得したデータを挿入して返す役割のクラス。
 * 設計者:H.Kaneko
 * 作成者:T.Masuda
 * 作成日:2015.0728
 */
class procedureGet extends procedureBase{

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

		//JSONを取得する。
		//SQLによる例外の対処のためtryブロックで囲む
		try {
			//JSON文字列の作成を行う。
			$this->createJSON($this->json, EMPTY_STRING, null);
		//SQL例外のcatchブロック
		} catch (PDOException $e) {
			// エラーメッセージを表示する
			echo $e->getMessage();
			// プログラムを終了する
		}
		
		//DBとの接続を閉じる
		$this->disconnect();
		
		// 連想配列をjsonに変換して変数に入れる
		$jsonOut = json_encode($this->json, JSON_UNESCAPED_UNICODE);
		// 作成したJSON文字列を出力する。
		print($jsonOut);
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