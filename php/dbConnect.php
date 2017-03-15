<?php

// データベースに接続するための値を定数として宣言する
require_once 'EnvSettings.php';
EnvSettings::create()->loadEnvSettings('DbDefine');

// PDOの使用有無を定数として宣言する
define('USE_PDO', false);
/*
 * ファイル名:dbConnect.php
 * 概要	:DBに接続する関数を持つクラスのPHPファイル。
 * 設計者:H.Kaneko
 * 作成者:T.Masuda
 * 作成日:2015.0728
 * パス	:/php/dbConnect.php
 */

/*
 * クラス名:dbConnect
 * 概要  :DBに接続する関数を持つクラス。
 * 設計者:H.Kaneko
 * 作成者:T.Masuda
 * 作成日:2015.0728
 */
class dbConnect{
	
	// データベースハンドラ-(DB接続に使う)
	public $dbh = "";
		
	/*
	 * 関数名：connect
	 * 概要  :DBとの接続を行う。
	 * 引数  :なし
	 * 戻り値:なし
	 * 設計者:H.Kaneko
	 * 作成者:T.Masuda
	 * 作成日:2015.0728
	 * 変更者:R.Shibata
	 * 変更日:2016.12.30
	 * 内容  :PDOが使用出来ない場合の、使用しないパターンの処理を追加（定数を一つ変更するだけで対応できるよう作成）
	 */
	function connect(){
		// PDOを使用する設定の場合
		if (USE_PDO){
			// DBに接続する。
			$this->dbh = new PDO(DSN, DB_USER, DB_PASSWORD);
			// クエリをUTF8で設定する
			$this->dbh->query('SET NAMES utf8');
		//PDOを使用しない設定の場合
		} else {
			// DBに接続する。
			$this->dbh = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);
			// クエリをUTF8で設定する
			mysql_query('SET NAMES utf8');
			// 指定したDBに接続する
			mysql_select_db(DB_DATABASE, $this->dbh);
		}
	}
		
	/*
	 * 関数名：disconnect
	 * 概要  :DBとの接続を閉じる。
	 * 引数  :なし
	 * 戻り値:なし
	 * 設計者:H.Kaneko
	 * 作成者:T.Masuda
	 * 作成日:2015.0728
	 * 変更者:R.Shibata
	 * 変更日:2016.12.30
	 * 内容  :PDOが使用出来ない場合の、使用しないパターンの処理を追加（定数を一つ変更するだけで対応できるよう作成）
	 */
	function disconnect(){
		// PDOを使用する設定の場合
		if (USE_PDO) {
			//DBとの接続を閉じる
			$this->dbh = null;
		//PDOを使用しない設定の場合
		} else {
			// DBから切断する
			mysql_close($this->dbh);
			//DBとの接続を閉じる
			$this->dbh = null;
		}
	}
	
}