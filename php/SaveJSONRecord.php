<?php

/*
 * ファイル名:SaveJSONRecord.php
 * 概要	:JSONの内容をもとにクエリを実行し、DBのレコードを追加、更新、削除する。
 * 設計者:H.Kaneko
 * 作成者:T.Masuda
 * 作成日:2015.0728
 * パス	:/php/dbConnect.php
 */

//送信されたJSONの値と、JSONに含まれるクエリを基にしてDBのレコードの更新、追加、削除を行うクラスを別ファイルから取り込む。
require_once ('procedureSet.php');

// クライアントから送信されたJSONのキーとJSON文字列を取得する。
$json = $_POST["json"];

//DBのレコードの更新、追加、削除のいずれかを行うためのクラスのインスタンスを生成する。
$jsonDbSetter = new procedureSet();

//生成したインスタンスの処理関数を実行する。
$jsonDbSetter->run($json);
