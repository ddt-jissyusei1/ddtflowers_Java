<?php
namespace database;

class MasterConnection extends ConnectionAbstract {
	
	// @TODO ほんとはコンパイルされないコンフィグを作ってそこから読みだしたい...
	protected $MASTER_CONNECTION = array(
			'dbHost' => 'localhost',
			'rdb' => 'mysql',
			'database' => 'ddthink-com00006',
			'user' => 'root',
			'password' => ''
	);
	
	public function getHost() {
		return $this->MASTER_CONNECTION['dbHost'];
	}
	
	public function getRdb() {
		return $this->MASTER_CONNECTION['rdb'];
	}
	
	public function getDatabase() {
		return $this->MASTER_CONNECTION['database'];
	}
	
	public function getUser() {
		return $this->MASTER_CONNECTION['user'];
	}
	
	public function getPassword() {
		return $this->MASTER_CONNECTION['password'];
	}
}