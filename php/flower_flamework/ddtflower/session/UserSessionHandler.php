<?php
namespace session;

class UserSessionHandler implements \ISessionHandler {
	
	const USER_SESSION_KEY = '__user__session__';
	
	public function get() {
		return SessionAsJson::get(self::USER_SESSION_KEY);
	}
	
	public function set($value) {
		SessionAsJson::set(self::USER_SESSION_KEY, $value);
	} 
}