<?php
ini_set('display_errors', '1');

// MSL設定ファイル読み込み
require_once(dirname(__FILE__).'/mslconfig.php');

class MSLInfo
{
	var $msl_url = 'http://msl.sk-t.com/web/info';
	var $site_id;
	var $enc;
	var $hash;
	var $path_info;
	var $infos = array(
		'site_name'     => '', // サイト名
		'site_url'      => '', // サイトURL
		'site_img'      => '', // サイト画像（SNS表示用画像）
		'page_title'    => '', // ページタイトル
		'page_url'      => '', // ページURL
		'list_url'      => '', // 記事一覧URL
		'article_title' => '', // 記事件名
		'article_url'   => '', // 記事本文
		'h1'            => '', // H1テキスト
		'html_meta'     => '', // メタHTML
		'html_article'  => ''  // 記事HTML
	);
	var $enc_arr = array('SJIS','EUC-JP','ISO-2022-JP','UTF-8');

	function MSLInfo()
	{
		global $g_msl_site_id;
		global $g_msl_encode_to;
		global $g_msl_hash;
		$this->site_id   = $g_msl_site_id;
		$this->enc       = $g_msl_encode_to;
		$this->hash      = $g_msl_hash;
		$this->path_info = $this->get_pathinfo();
	}

	function get_pathinfo()
	{
		$path_info = isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : null;
		if (empty($path_info)) $path_info = isset($_SERVER['ORIG_PATH_INFO']) ? $_SERVER['ORIG_PATH_INFO'] : null;
		return $path_info;
	}

	function get($element)
	{
		return array_key_exists($element, $this->infos) ? $this->infos[$element] : '';
	}

	function set_infos($path, $enc = null)
	{
		$infos = unserialize(file_get_contents($this->msl_url.$path));
		if (!empty($infos)) {
			$enc !== null and $this->enc = $enc;
			$this->enc = in_array(strtoupper($this->enc), $this->enc_arr) ? strtoupper($this->enc) : 'UTF-8';
			$this->infos = $this->set_encode($infos);
		}
	}

	function set_encode(&$contents)
	{
		if (strtolower($this->enc) != 'utf-8'){
			if (is_array($contents)){
				foreach($contents as $k => $v){
					if (is_array($v)){
						$contents[$k] = $this->set_encode($contents[$k]);
					} else {
						$contents[$k] = mb_convert_encoding($contents[$k], $this->enc, 'UTF-8');
					}
				}
			} else {
				$contents = mb_convert_encoding($contents, $this->enc, 'UTF-8');
			}
		}
		return $contents;
	}
}

class MSLTopInfo extends MSLInfo
{
	function MSLTopInfo($site_id, $enc = null)
	{
		parent::MSLInfo();
		if (!empty($site_id) && !empty($this->hash)) {
			if ($site_id == $this->site_id) {
				parent::set_infos('/top/'.$this->hash.'/'.$site_id, $enc);
			}
		}
	}
}

class MSLPageInfo extends MSLInfo
{
	function MSLPageInfo($site_id, $page_id, $enc = null)
	{
		parent::MSLInfo();
		if (!empty($site_id) && !empty($page_id) && !empty($this->hash)) {
			if ($site_id == $this->site_id) {
				parent::set_infos('/page/'.$this->hash.'/'.$site_id.'/'.$page_id, $enc);
			}
		}
	}
}

class MSLListInfo extends MSLInfo
{
	function MSLListInfo($enc = null)
	{
		parent::MSLInfo();
		if (!empty($this->path_info) && !empty($this->hash)) {
			$arr_path = explode("/", $this->path_info);
			$site_id  = $arr_path[1];
			if ($site_id == $this->site_id) {
				parent::set_infos('/list/'.$this->hash.$this->path_info, $enc);
			}
		}
	}
}

class MSLDetailInfo extends MSLInfo
{
	function MSLDetailInfo($enc = null)
	{
		parent::MSLInfo();
		if (!empty($this->path_info) && !empty($this->hash)) {
			$arr_path = explode("/", $this->path_info);
			$site_id  = $arr_path[1];
			if ($site_id == $this->site_id) {
				parent::set_infos('/detail/'.$this->hash.$this->path_info, $enc);
			}
		}
	}
}
?>