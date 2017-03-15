<?php
namespace database;

class DbConnectFailException extends \Exception {
	public function __construct($message="", $code=0, $prev=null) {
		if(!$message) {
			$message = 'データベースの接続に失敗しました。';
		}
		parent::__construct($message, $code, $prev);
	}
}