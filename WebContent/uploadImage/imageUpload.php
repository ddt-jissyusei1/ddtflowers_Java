<?php

//送信されたファイルのname属性の値を定数に入れる
define('SEND_IMAGE_NAME', 'imageFile');
//POSTされたディレクトリ名のキー
define('DIRECTORY_KEY', 'dir');
//POSTされたinput type="file"要素のname属性値
define('POSTED_NAME', 'postedName');
//デフォルトの保存先
define('SAVE_DIRECTORY', '/flowerImage/');
//画像保存成功時のメッセージ
define('SUCCESS_UPLOAD_MESSAGE', '画像の保存に成功しました。');
//画像保存失敗時のメッセージ
define('FAILED_UPLOAD_MESSAGE', '画像の保存に失敗しました。');
//無効なファイルが送信されたときのメッセージ
define('INVALID_FILE_SEND_MESSAGE', '無効なファイルが送信されました。');
//無効なファイルが送信されたときのメッセージ
define('NOT_EXIST_FILE_MESSAGE', 'ファイルがありません');

/* 関数名:getFileInfoArray
 * 概要　:ファイル情報の配列を返す
 * 引数　:なし
 * 返却値:Array:ファイル情報の配列
 * 作成者:T.Masuda
 * 作成日:2015.0727
 */
function getFileInfoArray($postedName){
	//画像タイプの整数を取得する。この後に、ここで取得した整数値でファイルの拡張子の文字列を取得する。
	$type = @exif_imagetype($_FILES[$postedName]['tmp_name']);
	//配列を作成して返す。
	return  array(
	// アップロードされたファイルの情報を変数に入れる
		//ファイルの一時保存先パス
		0 => $_FILES[$postedName]['tmp_name'],
		//ファイル名。会員ID＋日付＋時間＋画像の拡張子。
		1 => $_POST['userId'].date("YmdHis").image_type_to_extension($type),
		//ファイルのMIMEタイプの文字列
		2 => $_FILES[$postedName]['type'],
		//ファイルの大きさの整数値
		3 => $_FILES[$postedName]['size']
	);
}

// ファイルが送信されていない時の処理
if (!isset($_FILES[$_POST[POSTED_NAME]]['tmp_name'])) {
	//ファイルがないというメッセージをクライアントに返す。
	echo "<root><src></src><message>".NOT_EXIST_FILE_MESSAGE."</message><issuccess>0</issuccess></root>";
	exit;					// プログラムを終了する
}

//POSTされたname属性値を変数に入れる
$postedName = $_POST[POSTED_NAME];

// アップロードされたファイルの情報を変数に入れる
$fileArray = getFileInfoArray($postedName);

// アップロードされたのが画像でなかったら画像をアップロードしない
if ($fileArray[2] == 'image/jpeg' || $fileArray[2] == 'image/png' ||$fileArray[2] == 'image/gif') {

	//ローカルからディレクトリ名が送信されていた場合の処理
	$dir = '.'.SAVE_DIRECTORY;
	//画像のパスを指定する
	$path = 'http://' . $_SERVER['HTTP_HOST'] . dirname($_SERVER['PHP_SELF']) . SAVE_DIRECTORY;
	
	// ファイルがアップロードできているかを調べる
	if (is_uploaded_file($fileArray[0])) {
		// ファイルがアップロードできるかを調べ、可能ならアップロードする
		if (move_uploaded_file($fileArray[0], $dir . $fileArray[1])) {
			//保存した画像のパスと画像名、メッセージ、成功フラグのXMLを返す
			echo "<root><src>".$path.$fileArray[1]."</src><filename>".$fileArray[1]."</filename><message>".SUCCESS_UPLOAD_MESSAGE."</message><issuccess>1</issuccess></root>";
		} else {
			//保存した画像のパスとメッセージ、成功フラグのXMLを返す
			echo "<root><src></src><message>".FAILED_UPLOAD_MESSAGE."</message><issuccess>0</issuccess></root>";
		}
	}
} else {
			//保存した画像のパスとメッセージ、成功フラグのXMLを返す
			echo "<root><src></src><message>".INVALID_FILE_SEND_MESSAGE."</message><issuccess>0</issuccess></root>";
}
