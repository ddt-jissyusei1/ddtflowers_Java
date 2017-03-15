<?php
namespace controller;

use session\SessinHandlerFactory;

use session\SessionNotExistsException;

use finder\UserFinder;

use finder\UserNotFoundException;

class LoginController extends UserControllerBase {

	const LOGIN_ID_KEY = 'loinID';
	const PASSWORD_KEY = 'password';
    
    // @TODO権限の対応がわからないので一旦適当に書いてます
    protected $destsDipendsAuth = array(
 	       0 => 'http://localhost/memberPage.html',
    	   1 => 'http://localhost/memberAdminPage.html',
    );

	static public function executeLogin() {
		
		try {
			LoginController::validate();
		}
		catch (ValidateFailException $e) {
			LoginController::showView(array('errMessage' => $e->getMessage()));
		}
		$loginID = $_POST[self::LOGIN_ID_KEY];
		$password = $_POST[self::PASSWORD_KEY];
		
		// user検索
		$finder = new UserFinder();
		$user = array();
		try {
			$user = $finder->getByIdAndPW($loginID, sha1($password));
		} catch(UserNotFoundException $e) {
			self::showView(array('errMessage' => $e->getMessage()));
			return;
		}
		
		// セッションつめて
		LoginController::setSession($user);
		// トップページへredirectする。
		LoginController::rediretToTop($user['authority']);
	}
	
	static protected function rediretToTop($auth=0) {
        $path = 'http://localhost/memberPage.html';
        if(array_key_exists($auth, $this->destsDipendsAuth)) {
            $path = $this->destsDipendsAuth[$auth];
        }
		header($path, true, 301);
		exit();
	}
    
    static protected function getDest($admin_flg) {
        
    }
	
	static protected function validate() {
		if(!array_key_exists(self::LOGIN_ID_KEY,$_POST) || 
			!$_POST[self::LOGIN_ID_KEY]) {
			throw new ValidateFailException('ログインIDを指定してください');
		}
		if(!array_key_exists(self::PASSWORD_KEY,$_POST) || 
			!$_POST[self::PASSWORD_KEY]) {
			throw new ValidateFailException('パスワードを指定してください');
		}
	}
	
	static public function showView($data=array()) {
		$session = null;
		try{
			LoginController::getSession();
			LoginController::rediretToTop();
		} catch(SessionNotExistsException $e){
			// do nothing
		}
		
		$errMesage = '';
		if(array_key_exists('errMessage', $data)) {
			$errMesage = $data['errMessage'];
		}
		
		// 取り急ぎviewがないので仮Viewを表示
		print<<<EOF
			<!DOCTYPE html>
			<html>
			<head>
			</head>
			<body>
				{$errMesage}
				<br>
				<form action ="http://localhost/index.php/index.php" method="POST">
					<input type="text" name="loinID" value="" />
					<input type="password" name="password" value="" />
					<input type="submit" vlue="ログイン" />
					<input type="hidden" name="A" value="login" />
					<input type="hidden" name="M" value="executeLogin" />
				</form>
			</body>
			</html>
EOF;
		exit;
	}
}
