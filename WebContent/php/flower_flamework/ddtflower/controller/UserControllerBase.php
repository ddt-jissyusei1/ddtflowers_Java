<?php
namespace controller;

use session\SessionNotExistsException;

use session\SessinHandlerFactory;

require_once (BASE_PATH.'/controller/ControllerAbstract.php');

abstract class UserControllerBase extends ControllerAbstract {
	
	/**
	 * @return \session\UserSessionHandler
	 */
	static protected function getSession() {
		$handler = SessinHandlerFactory::createUserHandler();
		return $handler->get();
	}
	
	/**
	 * @param unknown $value
	 */
	static protected function setSession($value) {
		$handler = SessinHandlerFactory::createUserHandler();
		$handler->set($value);
	}
	
	/**
	 * @return \session\UserSessionHandler
	 */
	static protected function getSessionThenRedirect() {
		try {
			$handler = self::getSession();
			$handle->get();
		} catch(SessionNotExistsException $e) {
			error_log($e->getTraceAsString());
			noSessionRedirect();
		}
	}
	
	/**
	 * 
	 */
	static protected function noSessionRedirect() {
		header('Location: '.BASE_URL.'index.php?A=login&M=executeLogin');
		exit;
	}
}