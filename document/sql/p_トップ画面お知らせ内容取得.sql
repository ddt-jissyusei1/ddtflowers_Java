
#コード記述のため区切り文字を一時的に変更する
DELIMITER $$

# お知らせ用ブログ記事取得

#当該プロシージャが既に登録されていた場合、登録し直すため一旦削除する
DROP PROCEDURE IF EXISTS `p_get_new_blog` $$
#授業予約のプロシージャの登録を行う
CREATE PROCEDURE `p_get_new_blog`(
    OUT result text
    )
#以降にストアドプロシージャの処理を記述する
BEGIN
SELECT 
    user_name AS name
    ,CONCAT('uploadImage/flowerImage/' , image_1) AS image
    ,title
    ,DATE_FORMAT(post_timestamp,GET_FORMAT(DATE,'JIS')) AS date
FROM 
    `user_blog`
INNER JOIN 
    user_inf
ON
    user_blog.user_key = user_inf.id
WHERE 
	disclosure_range = 0
ORDER BY
    post_timestamp DESC
LIMIT 3;

END$$

# お知らせ用ギャラリー記事取得

#当該プロシージャが既に登録されていた場合、登録し直すため一旦削除する
DROP PROCEDURE IF EXISTS `p_get_new_gallery_photo` $$
#授業予約のプロシージャの登録を行う
CREATE PROCEDURE `p_get_new_gallery_photo`(
    OUT result text
    )
#以降にストアドプロシージャの処理を記述する
BEGIN
SELECT 
    user_name AS name
    ,CONCAT('uploadImage/flowerImage/' , photo_title) AS image
    ,article_title AS title
    ,DATE_FORMAT(update_timestamp,GET_FORMAT(DATE,'JIS')) AS date
FROM 
    `user_image`
INNER JOIN 
    user_inf
ON
    user_image.user_key = user_inf.id
ORDER BY
    update_timestamp DESC
LIMIT 3;

END$$

DELIMITER ;
