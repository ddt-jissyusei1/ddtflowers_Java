-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2015 年 8 月 02 日 12:06
-- サーバのバージョン： 5.6.20
-- PHP Version: 5.5.15

#ブログ

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
-- テーブルの構造 `blog_article_image`
--

CREATE TABLE IF NOT EXISTS `blog_article_image` (
  `id` int(11) NOT NULL,
  `blog_article_id` int(11) NOT NULL,
  `image_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ブログ記事の画像';

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blog_article_image`
--
ALTER TABLE `blog_article_image`
 ADD PRIMARY KEY (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

#ブログ記事取得
delimiter $$
CREATE PROCEDURE getBlogArticle(out result text)
BEGIN
SELECT 
	ub.id
	,ub.image_1 AS image1
	,ub.image_2 AS image2
	,ub.image_3 AS image3
	,ub.title
	,Date(ub.post_timestamp) AS date
	,uin.user_name AS userName
	,ub.content AS text 
FROM 
	user_blog AS ub
	,user_inf AS uin
WHERE
	ub.user_key=uin.id
ORDER BY 
	post_timestamp DESC;
END$$
delimiter ;

CALL getBlogArticle(@result); SELECT @result AS 'result';

#IDからブログ記事取得
delimiter $$
CREATE PROCEDURE getBlogArticleWithId(out result text, in userKey int, articleId int)
BEGIN
SELECT 
	* 
FROM 
	user_blog 
WHERE 
	user_key = userKey 
	AND id = articleId;
END$$
delimiter ;

CALL getBlogArticleWithId(@result, 'user_key', 'id'); SELECT @result AS 'result';

#ブログ記事作成
delimiter $$
CREATE PROCEDURE insertNewBlogArticle(in userKey int, blogTitle varchar(200), blogContent text, blogPublication tinyint, blogImage1 varchar(255), blogImage2 varchar(255), blogImage3 varchar(255))
BEGIN
INSERT INTO 
	user_blog
	(
	user_key
	,title
	,content
	,post_timestamp
	,disclosure_range
	,image_1
	,image_2
	,image_3
	)
	VALUES (
	userKey
	,blogTitle
	,blogContent
	,NOW()
	,blogPublication
	,blogImage1
	,blogImage2
	,blogImage3
	);
END$$
delimiter ;

CALL insertNewBlogArticle('user_key', 'blogTitle', 'blogContent', 'blogPublication', 'image_1', 'image_2', 'image_3');

#ブログ記事更新
delimiter $$
CREATE PROCEDURE updateBlogArticle(in blogId int, blogTitle varchar(200), blogContent text, blogImage1 varchar(255), blogImage2 varchar(255), blogImage3 varchar(255), blogPublication tinyint)
BEGIN
UPDATE 
	user_blog 
SET 
	title = blogTitle
	,content = blogContent 
	,image_1 = blogImage1
	,image_2 = blogImage2
	,image_3 = blogImage3
	,disclosure_range = blogPublication 
WHERE 
	id = blogId;
END$$
delimiter ;

CALL updateBlogArticle('id', 'blogTitle', 'blogContent' , 'image_1', 'image_2', 'image_3', 'blogPublication');

#ブログ記事削除
delimiter $$
CREATE PROCEDURE deleteBlogArticle(in articleId int)
BEGIN
DELETE FROM 
	user_blog 
WHERE id = articleId;
END$$
delimiter ;

CALL deleteBlogArticle('id');


#マイブログ画面記事取得
delimiter $$
CREATE PROCEDURE getMyBlogArticle(out result text, in userKey int)
BEGIN
SELECT 
	ub.id
	,ub.title
	,Date(ub.post_timestamp) AS date
	,uin.user_name AS userName
	,ub.image_1 AS image1
	,ub.image_2 AS image2
	,ub.image_3 AS image3
	,ub.content AS text
	, '' AS buttons
FROM 
	user_blog AS ub
	,user_inf AS uin 
WHERE 
	ub.user_key = userKey
	AND ub.user_key=uin.id 
ORDER BY 
	post_timestamp DESC;
END$$
delimiter ;

CALL getMyBlogArticle(@result, 'user_key'); SELECT @result AS 'result';

#マイブログ画面記事一覧取得
delimiter $$
CREATE PROCEDURE getMyBlogList(out result text, in userKey int)
BEGIN
SELECT 
	ub.id,ub.title
	,Date(ub.post_timestamp) AS date
	,uin.user_name AS userName
	,ub.image_1 AS image1
	,ub.image_2 AS image2
	,ub.image_3 AS image3
	,ub.content AS text, 
	'' AS buttons 
FROM 
	user_blog AS ub
	,user_inf AS uin 
WHERE 
	ub.user_key=userKey
	AND ub.user_key=uin.id
ORDER BY 
	post_timestamp DESC;
END$$
delimiter ;

CALL getMyBlogList(@result, 'user_key'); SELECT @result AS 'result';
