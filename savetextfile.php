<?php
$text = $_POST["text"];	//POSTされたテキストデータを取得する。
$path = $_POST["path"];	//POSTされたパスを取得する。
$retMessage = "編集内容の保存に成功しました。";

// ファイルをオープンして既存のコンテンツを取得する。
$current = file_get_contents($path);
//テキストを保存する。
if(file_put_contents($path, $text)){
	$retMessage = "編集内容の保存に成功しました。";
}
//結果を出力して返す。
echo $retMessage;
?>