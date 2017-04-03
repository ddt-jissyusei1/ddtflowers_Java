<?php
class ClassLoader {

	private $dirs = array();

	public function __construct() {
		spl_autoload_register(array($this, 'loader'));
	}

	public function registerDir($dir){
		$this->dirs[] = $dir;
	}

	public function loader(){

		foreach ($this->dirs as $dir) {
			$files = $this->getPHPFiles($dir);
			foreach ($files as $file) {
				$full_path = $dir . '/' . $file;
				if(is_readable($full_path)){
					require_once $full_path;
				}
			}
		}
	}
	
	protected function getPHPFiles($dir) {
		$filesArr = array();
		$res_dir = opendir( $dir);
		$limit = 500;
		$cnt = 0; 
		while($fileName = readdir($res_dir)){
			if($cnt >= $limit) {
				break;
			}
			if(!strpos($fileName, '.php')) {
				$cnt++;
				continue;
			}
			$filesArr[] = $fileName;
			$cnt++;
		}
		closedir($res_dir);
		return $filesArr;
	}
}