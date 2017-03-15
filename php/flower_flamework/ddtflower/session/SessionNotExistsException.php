<?php
namespace session;

class SessionNotExistsException extends \Exception {
	public function __construct($message="", $code=0, $prev=null) {
		if(!$message) {
			$message = '指定された　セッションは存在しません。';
		}
		parent::__construct($message, $code, $prev);
	}
}