<?php
namespace session;

class SessionAsJson extends Session {
	
	static public function get($key) {
		$sessionJson = parent::get($key);
		return json_decode($sessionJson);
	}
	
	static public function set($key, $value) {
		parent::set($key, json_encode($value));
	}
}