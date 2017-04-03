<?php

/*
 * ファイル名:GetJSONString.php
 * 概要	:クライアントから渡されたJSON文字列にDBから取得した値を追加して返す。
 * 		また、ログイン用のJSONを渡されたらログイン用のクラスを生成してログイン処理を行う。
 * 設計者:H.Kaneko
 * 作成者:T.Masuda
 * 作成日:2015.0728
 * パス	:/php/GetJSONString.php
 */

//各定数を定義する。
//ユーザ名のキー
define('USER_NAME', 'userName');
define('PASSWORD', 'password');
define('ID', 'id');

//JSONにDBから取得したデータを追加するクラスをファイルから取り込む
require_once ('procedureGet.php');
//ログイン用のクラスのファイルを読み込む
require_once ('procedureLogin.php');

// クライアントから送信されたJSONのキーとJSON文字列を取得する。
$json = $_POST["json"];
$jsonDbGetter;	//procedure〜クラスのインスタンスを格納する変数を宣言する。

//jsonにユーザ名、パスワード、IDの文字列が含まれていたら(ログインのJSONであれば)
if(strpos($json, USER_NAME) !==false 
	&& strpos($json, PASSWORD) !==false 
	&& strpos($json, ID) !==false){
	//ログイン用の処理を行うクラスのインスタンスを生成する。
	$jsonDbGetter = new procedureLogin();
//ログインのJSONでなければ
} else {
	//JSONにDBから取得したデータを追加するクラスをのインスタンスを生成する。
	$jsonDbGetter = new procedureGet();
}

//生成したインスタンスの処理関数を実行する。
$jsonDbGetter->run($json);
