<?php

/**
 * 環境変数「DDT_FLOWER_ENV」を読み込んで環境ごとのphpファイルを読み込む
 * @author honmura
 */
class EnvSettings {
	
	const ENV_DELIMITER = '_';				// 環境変数の値とベースファイル名の間の区切り文字
	const _PHP_EXTENSION = '.php';			// phpの拡張子
	const ENV_VAR_NAME = 'DDT_FLOWER_ENV';	// 環境変数名
	
	/**
	 * 環境変数「DDT_FLOWER_ENV」がセットされている場合「$targetBaseName . $delimiter . '{DDT_FLOWER_ENVの値}.php'」
	 * をrequire_onceする。
	 * 環境変数「DDT_FLOWER_ENV」がセットされていなければ「$targetBaseName . '.php'」
	 * をrequire_onceする。
	 * 環境変数「DDT_FLOWER_ENV」が「dev」targetBaseNameが「DbDefine」の場合、
	 * 「require_once 'DbDefine_dev.php'」が行われる。
	 * @param	targetBaseName		(必須)読み込み対象基本ファイル名(パス付きで「.php」を抜いたもの)
	 *			delimiter			(任意)基本ファイル名とsuffixの間の区切り文字。省略時は「_」
	 * @return	void
	 */
	public function loadEnvSettings($targetBaseName, $delimiter=self::ENV_DELIMITER) {
		$targetName = $targetBaseName;
		$envStr = getenv(self::ENV_VAR_NAME);
		if($envStr) {
			$targetName .= $delimiter . $envStr;
		}
		require_once $targetName . self::_PHP_EXTENSION;
	}
	
	public static function create() {
		return new EnvSettings();
	}
}
