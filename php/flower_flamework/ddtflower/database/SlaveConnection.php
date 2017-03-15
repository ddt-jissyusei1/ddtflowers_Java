<?php
namespace database;

class SlaveConnection extends ConnectionAbstract {
	
	// @TODO ほんとはコンパイルされないコンフィグを作ってそこから読みだしたい...
	protected $SLAVE_CONNECTION = array(
			'dbHost' => 'localhost',
			'rdb' => 'mysql',
			'database' => 'ddthink-com00006',
			'user' => 'root',
			'password' => ''
	);
	
	public function getHost() {
		return $this->SLAVE_CONNECTION['dbHost'];
	}
	
	public function getRdb() {
		return $this->SLAVE_CONNECTION['rdb'];
	}
	
	public function getDatabase() {
		return $this->SLAVE_CONNECTION['database'];
	}
	
	public function getUser() {
		return $this->SLAVE_CONNECTION['user'];
	}
	
	public function getPassword() {
		return $this->SLAVE_CONNECTION['password'];
	}
}