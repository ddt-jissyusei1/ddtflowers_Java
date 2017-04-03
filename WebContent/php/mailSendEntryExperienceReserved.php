<?php
require_once "ModelMail.php";

$from		= $_POST['from'];
$to 		= $_POST['to'];
$subject	= $_POST['subject'];
$content	= $_POST['content'];

try{
	//メールを送信する。fromが会員IDになっていれば会員IDを渡す
	$ret = ModelMail::send_mail($to, $subject, $content, $from != ''? $from : false);
	if(!$ret) {
		throw new SendFailException("メールが送信できませんでした。");
	}
	$jsonResult = "{\"message\":\"1\"}";
} catch(SendFailException $e) {
	$jsonResult = "{\"message\":\"0\"}";
	// ajax的に500返して異常を伝える。
		error_log(e.getMessage());
		header('HTTP/1.1 500 Internal Server Error');
		echo e.getMessage();
		exit;
	}
	
header('Content-type: application/json');
echo $jsonResult;
exit;
