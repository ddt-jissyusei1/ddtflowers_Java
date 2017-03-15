<?php
namespace session;

class SessinHandlerFactory {
	static public function createUserHandler() {
		return new UserSessionHandler();
	}
	static public function createAdminHandler() {
		return new AdminSessionHandler();
	} 
}