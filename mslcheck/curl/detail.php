<?php
include 'inc/mslinfo.php';
$msl_infos = new MSLDetailInfo();
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<?php echo $msl_infos->get('html_meta'); ?>
</head>
<body>
記事詳細テスト
<h1><?php echo $msl_infos->get('h1'); ?></h1>

ini_get allow_url_fopen
<?php var_dump(ini_get('allow_url_fopen')); ?>

<?php echo $msl_infos->get('html_article'); ?>
</body>
</html>
