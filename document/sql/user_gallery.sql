-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2015 年 7 月 31 日 04:24
-- サーバのバージョン： 5.6.20
-- PHP Version: 5.5.15

#ギャラリー

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `ddthink-com00006`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `user_gallery`
--

CREATE TABLE IF NOT EXISTS `user_gallery` (
`id` int(11) NOT NULL COMMENT 'ギャラリー記事ID',
  `user_key` int(11) NOT NULL COMMENT 'ユーザID',
  `title` varchar(100) NOT NULL COMMENT '記事タイトル',
  `content_text` text NOT NULL COMMENT '記事本文',
  `image_id` int(11) NOT NULL COMMENT '画像ID',
  `publication` smallint(6) NOT NULL DEFAULT '0' COMMENT '公開設定'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Myギャラリー記事テーブル' AUTO_INCREMENT=1 ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user_gallery`
--
ALTER TABLE `user_gallery`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user_gallery`
--
ALTER TABLE `user_gallery`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ギャラリー記事ID';
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

SELECT --SELECT命令
	ug.id, --記事ID
	ui.photo_title AS myPhotoImage, --画像名
	ug.date AS myPhotoDate, --記事の日付
	ug.title AS myPhotoTitle, --記事のタイトル
	uin user_name AS myPhotoUser, --ユーザ名
	ug.content_text AS myPhotoComment, --記事の文章
	ug.publication AS myPhotoPublication  --記事の公開設定
FROM --以下のテーブルから行を取得する
	user_gallery AS ug, --myギャラリーテーブル
	user_image AS ui,  --ユーザ画像テーブル
	user_inf AS uin	--会員情報テーブル
WHERE --以下の条件で絞り込む
	ug.user_key='117' --ユーザID
AND
	ug.user_key=uin.user_key --ユーザIDで結合する
AND
	ug.image_id=ui.id; --画像IDでテーブルをつなげる
	
SELECT
	ug.id,
	ui.photo_title AS myPhotoImage,
	ug.date AS myPhotoDate,
	ug.title AS myPhotoTitle, 
	uin.user_name AS myPhotoUser,
	ug.content_text AS myPhotoComment,
	ug.publication AS myPhotoPublication
FROM
	user_gallery AS ug,
	user_image AS ui,
	user_inf AS uin
WHERE
	ug.user_key='user_key'
AND
	ug.user_key=uin.id
AND
	ug.image_id=ui.id;
	

#ギャラリー記事取得
delimiter $$
CREATE PROCEDURE getGalleryContents(out result text)
BEGIN
SELECT 
	ui.id
	,ui.photo_title AS myPhotoImage
	,Date(ui.update_timestamp) AS date
	,ui.article_title AS myPhotoTitle
	,uin.user_name AS myPhotoUser
	,ui.photo_summary AS myPhotoComment 
FROM 
	user_image AS ui
	,user_inf AS uin 
WHERE 
	ui.user_key=uin.id 
ORDER BY 
	ui.update_timestamp DESC;
END$$
delimiter ;

CALL getGalleryContents(@result); SELECT @result AS 'result';

#マイギャラリー記事取得1
delimiter $$
CREATE PROCEDURE getMyGalleryContents1(out result text)
BEGIN
SELECT 
	ui.id
	,ui.photo_title AS myPhotoImage
	,Date(ui.update_timestamp) AS date
	,ui.article_title AS myPhotoTitle
	,uin.user_name AS myPhotoUser
	,ui.photo_summary AS myPhotoComment 
FROM 
	user_image AS ui
	,user_inf AS uin 
ORDER BY 
	ui.update_timestamp 
DESC 
LIMIT 300;
END$$
delimiter ;

CALL getMyGalleryContents(@result);  SELECT @result AS 'result';

##マイギャラリー記事取得2
delimiter $$
CREATE PROCEDURE getMyGalleryContents2(out result text, in userKey int)
BEGIN
SELECT 
	ui.id, ui.photo_title AS myPhotoImage
	,Date(ui.update_timestamp) AS date
	,ui.article_title AS myPhotoTitle
	,uin.user_name AS myPhotoUser
	,ui.photo_summary AS myPhotoComment 
FROM 
	user_image AS ui
	,user_inf AS uin 
WHERE 
	ui.user_key=userKey 
	AND ui.user_key=uin.id 
ORDER BY 
	ui.update_timestamp DESC;
END$$
delimiter ;

CALL getMyGalleryContents2(@result, 'user_key'); SELECT @result AS 'result';

#マイギャラリー記事作成
delimiter $$
CREATE PROCEDURE insertGalleryContent(in userKey int, photoTitle varchar(200))
BEGIN
INSERT INTO user_image(user_key, photo_title, update_timestamp) VALUES (userKey, photoTitle, NOW());
END$$
delimiter ;

CALL insertGalleryContent('id', 'photo_title');

#マイギャラリー記事更新
delimiter $$
CREATE PROCEDURE updateGalleryContent(in photoSummary varchar(210), articleTitle varchar(100), articleId int)
BEGIN
UPDATE user_image SET photo_summary = photoSummary, article_title = articleTitle WHERE id = articleId;
END$$
delimiter ;

CALL updateGalleryContent('photo_summary', 'article_title', 'id');

#マイギャラリー記事削除
delimiter $$
CREATE PROCEDURE deleteGalleryContent(in articleId int)
BEGIN
DELETE FROM user_image WHERE id IN (articleId);
END$$
delimiter ;

CALL deleteGalleryContent('id');

