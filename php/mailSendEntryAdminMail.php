<?php
require_once "ModelMail.php";

$toJson = $_POST['to'];
$subject = $_POST['subject'];
$content = $_POST['content'];
$to = json_decode($toJson,true);

$ADMIN_ID = '1';
$sendResult = ModelMail::send_mail_each($to, $ADMIN_ID, $subject, $content);
$jsonResult = json_encode(array(
		'sendCount'			=> $sendResult[0],
		'failCount'			=> $sendResult[1],
		'noAddressCount'	=> $sendResult[2],
));

header('Content-type: application/json');
echo $jsonResult;
exit;