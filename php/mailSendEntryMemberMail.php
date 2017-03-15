<?php
require_once "ModelMail.php";

$from = $_POST['from'];
$subject = $_POST['subject'];
$content = $_POST['content'];

$ADMIN_ID = '1';

try{
	$ret = ModelMail::send_mail(array($ADMIN_ID), $subject, $content, $from);
	if(!$ret) {
		throw new SendFailException("メールが送信できませんでした。");
	}
	$jsonResult = json_encode(array());
} catch(SendFailException $e) {
		// ajax的に500返して異常を伝える。
		error_log(e.getMessage());
		header('HTTP/1.1 500 Internal Server Error');
		echo e.getMessage();
		exit;
	}
	
header('Content-type: application/json');
echo $jsonResult;
exit;
