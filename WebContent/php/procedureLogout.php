<?php

/*
 * ファイル名:procedureLogout.php
 * 概要	:ログアウトの一連の手続きを行うクラスのファイル。
 * 設計者:H.Kaneko
 * 作成者:T.Masuda
 * 作成日:2015.0728
 * パス	:/php/procedureLogout.php
 */

//親クラスのファイルを読み込む
require_once ('procedureBase.php');

/*
 * クラス名:procedureLogout
 * 概要  :ログアウトの一連の手続きを行うクラス
 * 設計者:H.Kaneko
 * 作成者:T.Masuda
 * 作成日:2015.0728
 */
class procedureLogout extends procedureBase{

	/*
	 * 関数名：init
	 * 概要  :クラスの初期化関数。親クラスの初期化関数をコールする。
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
	 * 概要  :クラス特有の処理を行う関数。ログアウト処理を行う。
	 * 引数  :なし
	 * 戻り値:なし
	 * 設計者:H.Kaneko
	 * 作成者:T.Masuda
	 * 作成日:2015.0728
	 */
	function job(){
		$this->logout();	//ログアウト処理を行う。
	}
	
	/*
	 * 関数名：run
	 * 概要  :クラスのinit、job関数をまとめて実行する。
	 * 引数  :なし
	 * 戻り値:なし
	 * 設計者:H.Kaneko
	 * 作成者:T.Masuda
	 * 作成日:2015.0728
	 */
	function run(){
		//初期化処理とクラス独自の処理をまとめて実行する。
		$this->init();	//初期化関数
		$this->job();	//クラス特有の処理を行う
	}
}