<?php
namespace controller;

class ValidateFailException extends \Exception {
	public function __construct($message="", $code=0, $prev=null) {
		if(!$message) {
			$message = '入力値エラー';
		}
		parent::__construct($message, $code, $prev);
	}
}