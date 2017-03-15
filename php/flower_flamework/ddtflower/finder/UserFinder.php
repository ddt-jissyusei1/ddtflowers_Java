<?php
namespace finder;

use database\ConnectionFactory;

use database\connector;

use \PDO;

class UserFinder extends FinderAbstracrt {
	protected $connection = null;
	
	/**
	 * ログインIDとパスワードからユーザを取得する
	 * @param int $loginID
	 * @param string $password
	 * @throws UserNotFoundException
	 * @return array ユーザ情報 
	 */
	public function getByIdAndPW($loginID, $password) {
		$pdo = $this->getConnection();
		$result = array();
		$sql =<<<EOF
			SELECT
				*
			FROM
				user_inf
			WHERE
				login_id = '$loginID'
			AND
				password = '$password'
EOF;
		$stmt = $pdo->query($sql);
		if($stmt) {
			$result = $stmt->fetch(PDO::FETCH_ASSOC);
		}
		if(!$result) {
			throw new UserNotFoundException('指定されたユーザを取得できませんでした。' . $loginID);
		}
		
		return $result;
	}
	
	/**
	 * PDOとして接続を取得する
	 * @return PDO 接続オブジェクト
	 */
	protected function getConnection() {
		if($this->connection) {
			return $this->connection;
		}
		$this->connection = 
			Connector::getConnection(ConnectionFactory::getSlaveConnection());
		return $this->connection;
	} 
}