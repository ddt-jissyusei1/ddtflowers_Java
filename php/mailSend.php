<?php

/*
 * ファイル名:mailSend.php
 * 概要	:メールを送信する。
 * 作成日:2015.0720
 * 作成者:T.Masuda
 * パス	:/php/mailSend.php
 */ 


define('MAIL_DDT_PRESIDENT', 'kaneko@ddthink.com');		//目安箱、通常メール送信で指定されるメールアドレス
define('MAIL_DDT_FLOWERS', 'hana@ddthink.com');			//通常メール送信でのみ指定されるアドレス
define('MEMBER_NUMBER', '会員番号');						//「会員番号」の文字列
define('STR_SAMA', '様');								//「様」の文字列
define('ID', 'id');										//「id」の文字列
define('NAME', 'name');									//「name」の文字列
define('EMAIL', 'email');								//「email」の文字列
define('ADD_HEADER_FROM', 'From');									//アディショナルヘッダー用「from」の文字列
define('ADD_HEADER_CC', 'Cc');										//アディショナルヘッダー用CC文字
define('ADD_HEADER_BCC', 'Bcc');									//アディショナルヘッダー用BCC文字
define('ESCAPE_NEXTROW', "\r\n");						//アディショナルヘッダー用改行文字


/*
 * 関数名：mailToMember
 * 概要  :引数に指定された設定でメールを送信する。
 * 引数  :Array $memberInfo:会員情報の連想配列を格納した配列。構成は以下の通り
 * 			{"id":"会員番号", name":"名前","email":"メールアドレス"}
 * 		 String $memberInfo:dbから取り出す会員情報が入った連想配列
 * 		 String $subject:メール件名
 * 		 string $message:メール本文
 * 		 String $from:メッセージの送信元のアドレス
 * 戻り値:Array:送信に失敗したメールの会員IDをリストで返す。。
 * 作成者:T.Masuda
 * 作成日:2015.0720
 */
function mailToMember($memberInfo, $subject, $message, $from) {
	//日本語設定を行う
	mb_language( 'Japanese' );
	mb_internal_encoding( 'UTF-8' );
	//会員情報の数を取得する
	$length = count($memberInfo);
	$failList = array();	//送信失敗者リストを作る
	
	//会員情報を操作し終えるまでループする
	for($i = 0; $i < $length; $i++){
		$to = $memberInfo[$i][EMAIL];	//宛先を設定する
		//本文の先頭(会員番号+氏名)をセットする。最後は2行改行する。
		$textBody = MEMBER_NUMBER.' '. $memberInfo[$i][ID] . ' ' . $memberInfo[$i][NAME] . STR_SAMA . "\n\n";
		$textBody .= $message;	//本文を追加する。
		//宛先、BCCを設定する。(作成時では同じメールアドレス)
		$addHeader = ADD_HEADER_FROM. ':' . $from . ESCAPE_NEXTROW . ADD_HEADER_BCC .':'.$from;	
		
		//メールの送信を行う。
		//メールの送信に失敗したら
		if(!mb_send_mail($to, $subject, $textBody, $addHeader)){
			$failList[] = $memberInfo[$i][ID];	//失敗者リストにIDを追加する
		}
	}
	
	return $failList;	//失敗者リストを返す
}

//テスト用会員データ
//0と1は増田アドレス
//$memberInfo = array(0 => array("id"=>"117",
//								"name"=>"中島 智子",
//								"email"=>"xellos00195@gmail.com"),
//					1 => array	("id"=>"119",
//								"name"=>"佐渡 幹",
//								"email"=>"kumano_fleet@ezweb.ne.jp"),
//					2 => array	("id"=>"123",
//								"name"=>"大崎 弥生",
//								"email"=>"ccd@ddd.fff")
//);

//メール送信テスト
//sendMail($memberInfo, "テストメール送信", "テストメールです。", MAIL_DDT_FLOWERS);

// //メールを送信するためのデータ連想配列を受け取る
// $memberInfo = $_POST['memberInfo'];
// //メールのタイトルを受け取る
// $subject = $_POST['subject'];
// //メールの内容を受けとる
// $message = $_POST['message'];

// //メールを送信する関数を実行してメールを送信する
// $failList = mailToMember($memberInfo, $subject, $message, 'ここに送信元メールアドレスをせっとする');
// //結果を返すために送信結果変数を文字列に変換する
// $failList = json_encode($failList, JSON_UNESCAPED_UNICODE);

// //結果を出力する
// print $failList;
?>