<?php
namespace database;

class ConnectionFactory {
	
	static public function getSlaveConnection() {
		return new SlaveConnection();
	}
	
	static public function getMsterConnection() {
		return new MasterConnection();
	}
}