<?php

/*
 * ファイル名:LogoutSession.php
 * 概要  :ログアウト処理のため、セッションを破棄する。
 * 設計者:H.Kaneko
 * 作成者:T.Masuda
 * 作成日:2015.0728
 * パス	:/php/LogoutSession.php
 */

//ログアウトを行うためのクラスを読み込む
require_once ('procedureLogout.php');

//ログアウト用のクラスのインスタンスを生成する
$logout = new procedureLogout();

//生成したインスタンスの処理関数を実行する。
$logout->run();
