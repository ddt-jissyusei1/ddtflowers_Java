<?php
namespace session;

class Session {
	
	/**
	 * @param string $key セッションのキー
	 * @throws SessionNotExistsException
	 * @return string セッション内容文字列
	 */
	static public function get($key) {
		if(!array_key_exists($key, $_SESSION)) {
			throw new SessionNotExistsException();
		}
		return $_SESSION[$key];
	} 
	
	/**
	 * @param string $key セッションのキー
	 * @param string $key セッション内容文字列
	 */
	static public function set($key, $value) {
		$_SESSION[$key] = $value;
	}
}