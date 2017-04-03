<?php
//クライアントから送信された記事番号を取得する。
$number = isset($_POST['number']) ? $_POST['number'] : null;

//POSTされた値が数値であるかの判定をJSON文字列して返すため、連想配列を作成する
$sendResult = array(
		//POSTされた値が数値なら1をセット、そうでなければ0をセットする
		'success'			=> ctype_digit($number) ? 1 : 0
);

//数字が取得できていたら
if($sendResult['success']){
	//セッションを開始する
	session_start();
	//記事番号をセッションに入れる
	$_SESSION['number'] = $number;
}

//JSONで結果を返すためのHTTPレスポンスヘッダをセットする
header('Content-type: application/json');
//結果の連想配列をJSON文字列に変換してクライアントへ返す
echo json_encode($sendResult);