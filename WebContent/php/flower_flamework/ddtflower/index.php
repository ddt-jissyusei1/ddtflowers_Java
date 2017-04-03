<?php
require_once dirname(__FILE__) . '/autoload/AutoLoader.php';

$fullDir = dirname(__FILE__);

define('BASE_PATH',$fullDir);

// オートロード対象ディレクトリを設定
$classLoader = new ClassLoader();
$classLoader->registerDir($fullDir . '/controller');
$classLoader->registerDir($fullDir . '/finder');
$classLoader->registerDir($fullDir . '/routes');
$classLoader->registerDir($fullDir . '/session');
$classLoader->registerDir($fullDir . '/database');

session_start();

$routes = new Routes();
try {
	$routes->route();
} catch(Exception $e) {
	echo $e->getMessage();
}


