# ユーザIDはセッションからとりましょう

#-----------------------------------------------------
# ユーザ情報(自分)
SELECT 
	*
FROM
	user_inf
WHERE
	id = {{ユーザID}}

#-----------------------------------------------------

#-----------------------------------------------------
# ユーザ情報
SELECT 
	*
FROM
	user_inf
ORDER BY {{ソート項目}} {{ASC or DESC}}
#-----------------------------------------------------

#-----------------------------------------------------
# ユーザ情報検索条件フル指定
SELECT
	*
FROM
	user_inf
WHERE
	user_name
LIKE
	'%{{氏名}}%'
AND
	name_kana
LIKE
	'%{{氏名カナ}}%'
AND
	telephone
LIKE
	'%{{電話番号}}%'
AND
	mail_address
LIKE
	'%{{メアド}}%'
AND
	id in(
SELECT
	user_key
FROM
	user_classwork
INNER JOIN
	classwork
ON
	user_work_status = 3
AND
	classwork.id = user_classwork.classwork_key
INNER JOIN
	time_table_day
ON
	time_table_day.id = classwork.time_table_day_key
AND 
	time_table_day.lesson_date <= {{期間TO}}
AND
	time_table_day.lesson_date >= {{期間FROM}}
)
AND
	id in(
SELECT
	user_key
FROM
	user_lesson
WHERE
	lesson_key = {{lesson_key}}	
)
#-----------------------------------------------------
#-----------------------------------------------------
# ユーザ情報検索条件フル指定を分解してみる
SELECT
	*
FROM
	user_inf
#-----------------------------------------------------
# 氏名指定時
WHERE
	user_name
LIKE
	'%{{氏名}}%'
#-----------------------------------------------------
# 氏名カナ指定時
AND
	name_kana
LIKE
	'%{{氏名カナ}}%'
#-----------------------------------------------------
# 電話番号指定時
AND
	telephone
LIKE
	'%{{電話番号}}%'
#-----------------------------------------------------
# メールアドレス指定時
AND
	mail_address
LIKE
	'%{{メアド}}%'
#-----------------------------------------------------
# 期間TO、又は期間FROM指定時
AND
	id in(
SELECT
	user_key
FROM
	user_classwork
INNER JOIN
	classwork
ON
	user_work_status = 3
AND
	classwork.id = user_classwork.classwork_key
INNER JOIN
	time_table_day
ON
	time_table_day.id = classwork.time_table_day_key
#-----------------------------------------------------
# 期間TO指定時
AND 
	time_table_day.lesson_date <= {{期間TO}}
#-----------------------------------------------------
# 期間FROM指定時
AND
	time_table_day.lesson_date >= {{期間FROM}}
)
#-----------------------------------------------------
# テーマ指定時
AND
	id in(
SELECT
	user_key
FROM
	user_lesson
WHERE
	lesson_key = {{lesson_key}}
)

#-----------------------------------------------------


#----------------------------------------------------
# テーマ指定用リスト作成
SELECT
    id AS lesson_key
    ,lesson_name
FROM
    lesson_inf
WHERE
    rec_status = 0
AND
    school_key = 1
#----------------------------------------------------

#----------------------------------------------------
# 受講承認からの遷移時のクエリ
SELECT
	*
FROM
	user_inf
INNER JOIN
	user_classwork
ON
	user_inf.id = user_classwork.user_key
AND
	user_classwork.user_work_status = 2
#----------------------------------------------------

#----------------------------------------------------
#上記クエリを実装されていたクエリに合わせました
SELECT DISTINCT 
	user_name
	,pre_paid
	,user_inf.get_point
	,DATE(user_inf.update_datetime) AS update_date
	,user_inf.id
	,mail_address
	,user_status
FROM 
	user_inf 
INNER JOIN 
	user_classwork 
ON 
	user_inf.id = user_classwork.user_key 
WHERE 
	user_classwork.user_work_status = 2
;
#----------------------------------------------------

#会員一覧
# ユーザ情報(自分)
delimiter $$
CREATE PROCEDURE getSelfUserInfo(out result text, in userKey int)
BEGIN
SELECT 
	*
FROM
	user_inf
WHERE
	id = userKey
;
END$$
delimiter ;

CALL getSelfUserInfo(@result, 'user_key'); SELECT @result AS 'result';

# ユーザ情報
delimiter $$
CREATE PROCEDURE getUserInfoList(out result text, in sortTarget varchar(30), sortOrder tinyint)
BEGIN

IF sortOrder = 0 THEN
	SELECT 
		*
	FROM
		user_inf
	ORDER BY 
		sortTarget ASC
	;
ELSE
	SELECT 
		*
	FROM
		user_inf
	ORDER BY 
		sortTarget DESC
	;
END IF;

END$$
delimiter ;

CALL getUserInfoList(@result, 'sort_target', 'sort_order'); SELECT @result AS 'result';

# テーマ指定用リスト作成
delimiter $$
CREATE PROCEDURE getListForChooseThemes(out result text)
BEGIN
SELECT
    id AS lesson_key
    ,lesson_name
FROM
    lesson_inf
WHERE
    rec_status = 0
AND
    school_key = 1
;
END$$
delimiter ;

CALL getListForChooseThemes(@result); SELECT @result AS 'result';