DELIMITER $$
DROP PROCEDURE IF EXISTS p_update_capacity_classwork $$
CREATE PROCEDURE p_update_capacity_classwork (
    IN in_id INT
    ,IN in_min_sutudents INT
    ,IN in_max_students INT
    ,OUT result INT
)
BEGIN

DECLARE updated_old DATETIME;
DECLARE updated DATETIME;

SELECT 
    MAX(update_datetime)
FROM
    classwork
INTO
    updated_old;

START TRANSACTION;

UPDATE
    classwork
SET
    min_students = in_min_sutudents
	,max_students = in_max_students
	,update_datetime = NOW()
WHERE
    id = in_id;

SELECT 
    MAX(update_datetime)
FROM
    classwork
INTO
    updated;

IF updated > updated_old THEN
    SELECT 1 INTO result;
    COMMIT;
ELSE
    SELECT 0 INTO result;
    ROLLBACK;
END IF;

END$$

DROP PROCEDURE IF EXISTS p_update_capacity_time_table_day $$
CREATE PROCEDURE p_update_capacity_time_table_day (
    IN in_id INT
    ,IN in_min_sutudents INT
    ,IN in_max_students INT
    ,OUT result INT
)
BEGIN

DECLARE updated_old DATETIME;
DECLARE updated DATETIME;

SELECT 
    MAX(update_datetime)
FROM
    time_table_day
INTO
    updated_old;

START TRANSACTION;

UPDATE
    time_table_day
SET
    min_num = in_min_sutudents
	,max_num = in_max_students
	,update_datetime = NOW()
WHERE
    id = in_id;

SELECT 
    MAX(update_datetime)
FROM
    time_table_day
INTO
    updated;

IF updated > updated_old THEN
    SELECT 1 INTO result;
    SELECT ROW_COUNT();
    COMMIT;
ELSE
    SELECT 0 INTO result;
    ROLLBACK;
END IF;

END$$

# 時間帯一覧取得
DROP PROCEDURE IF EXISTS p_select_timetable_day $$
# 授業時間帯情報の変更に必要なデータを取り出す
CREATE PROCEDURE p_select_timetable_day (
    IN in_lesson_date varchar(10)
    ,OUT result text
)
# プロシージャ開始
BEGIN

# 以下の列を取得する
SELECT
    # ID
    time_table_day.id
    # 最小人数
    ,time_table_day.min_num
    # 最大人数
    ,time_table_day.max_num
    # 開始時間
    ,start_time
    # 終了時間
    ,end_time
# 以下のテーブルからデータを取得する
FROM
    # 授業時間帯テーブル
    time_table_day
# テーブルを結合する
INNER JOIN
    # 授業時間帯情報テーブル
    timetable_inf
# 以下の列を指定して結合する
ON
    # 各授業時間帯情報テーブルID
    time_table_day.timetable_key = timetable_inf.id
# 検索条件を指定する
WHERE
    # 指定した授業日時
    lesson_date = in_lesson_date
;
# プロシージャを終了する
END$$

DELIMITER ;

 
