<?php
namespace controller;

/**
 * @author Honmura Atsushi
 * コントローラの規定クラス。
 */
abstract class ControllerAbstract {
	abstract static protected function getSession();
	abstract static protected function setSession($value);
} 