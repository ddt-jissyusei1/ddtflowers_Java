<?php
namespace finder;

class UserNotFoundException extends \Exception {
	public function __construct($message="", $code=0, $prev=null) {
		if(!$message) {
			$message = '指定されたユーザが見つかりませんでした。';
		}
		parent::__construct($message, $code, $prev);
	}
}