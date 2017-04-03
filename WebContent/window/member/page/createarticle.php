<?php
	//DOM操作用ライブラリを読み込む
	require_once ('../../../php/simple_html_dom.php');
	session_start();	//セッション開始
	//記事番号がセッションにセットされていれば記事番号をその番号にセットする。そうでなければ0番にする
	$number = isset($_SESSION['number']) ? $_SESSION['number'] : 0;
	
	//記事編集画面のHTMLファイルを取得する
	$html = file_get_html( 'createarticle.html' );
	//Scriptタグを取得する
	$script = $html->find('script', 0);
	//scriptタグの前に変数宣言のscriptタグを挿入する
	$script->outertext = '<script>var articleNumber = ' . $_SESSION['number'] . ';</script>' . $script->outertext;
	
	echo $html;	//HTMLを出力する
?>