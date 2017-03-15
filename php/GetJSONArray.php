<?php

/*
 * ファイル名:GetJSONArray.php
 * 概要	:テーブルのタグ作成用のJSON配列を作成して返す。
 * 設計者:H.Kaneko
 * 作成者:T.Masuda
 * 作成日:2015.0728
 * パス	:/php/GetJSONArray.php
 */

//リスト形式のJSONを作るクラスをファイルから取り込む
require_once ('procedureGetList.php');

// クライアントから送信されたJSONのキーとJSON文字列を取得する。
$json = $_POST["json"];

//リスト形式のJSONを作るクラスのインスタンスを生成する。
$listJsonDbGetter = new procedureGetList();

//生成したインスタンスの処理関数を実行する。
$listJsonDbGetter->run($json);
