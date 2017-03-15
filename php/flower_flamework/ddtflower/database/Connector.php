<?php
namespace database;

use \PDO;
use \PDOException;

class Connector {
	
	/**
	 * コネクション接続情報を受け取り、PDOオブジェクトを返す
	 * @param ConnectionAbstract $connection 生成対象のコネクション情報クラス
	 * @throws DbConnectFailException
	 * @return PDO DB接続(PDOオブジェクト)
	 */
	static public function getConnection(ConnectionAbstract $connection) {
		$pdo = null;
		try {
			$pdo = new PDO(
					self::buildConnectionStr($connection)
					,$connection->getUser()
					,$connection->getPassword()
			);
		} catch (PDOException $e){
			$message = self::buildConnectFailMessage($connection, $e);
			error_log($message);
			error_log($e->getMessage());
			throw new DbConnectFailException($message, $e->getCode() ,$e);
		}
		return $pdo;
	} 
	
	/**
	 * @param ConnectionAbstract $connection
	 * @param PDOException $e
	 */
	static protected function buildConnectFailMessage(ConnectionAbstract $connection, PDOException $e) {
		return $connection->getHost().'/'.$connection->getDatabase().
		'への接続に失敗しました。';
	}
	
	/**
	 * @param ConnectionAbstract $connection
	 * @return string
	 */
	static protected function buildConnectionStr(ConnectionAbstract $connection) {
		return $connection->getRdb().':host='.
				$connection->getHost().';dbname='.
				$connection->getDatabase();
	}
}