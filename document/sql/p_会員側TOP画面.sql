DELIMITER $$

-- user_inf
CREATE PROCEDURE p_user_inf(
	IN in_user_key INT
)
BEGIN

SELECT 
	*
FROM 
	user_inf
WHERE
	id = in_user_key;

END$$

-- essage_inf
CREATE PROCEDURE p_message_inf(
	IN in_user_key INT
)
BEGIN

SELECT 
	message_title
	,message_content
	,send_date
FROM
	message_inf
WHERE
	id IN (
		SELECT
			message_key
		FROM
			message_to
		WHERE
			user_key = in_user_key
		AND
			check_datetime IS NULL
	)
ORDER BY send_date DESC;
END$$

-- 受講可能レッスン
CREATE PROCEDURE p_booked_lessons(
	IN in_user_key INT
)
BEGIN

CREATE TEMPORARY TABLE tmp_booked_lessons AS 
SELECT
	user_classwork_cost
	,user_classwork_cost_aj
	,get_point
	,flower_cost
	,flower_cost_aj
	,extension_cost
	,lesson_name
	,school_name
	,start_time
	,end_time
	,lesson_date
    ,today
    ,lesson_key
	,id
	,biggest_students
	,MAX(point_rate) AS point_rate
	,students
	,order_students
    ,user_work_status
FROM (
SELECT 
	user_classwork_cost
	,user_classwork_cost_aj
	,user_classwork.get_point AS get_point
	,flower_cost
	,flower_cost_aj
	,user_classwork.extension_cost AS extension_cost
	,lesson_name
	,school_name
	,start_time
	,end_time
	,time_table_day.lesson_date AS lesson_date
	,lesson_point_rate.point_rate AS point_rate
	,students
	,order_students
    ,SUBSTRING(NOW(), 1,10) AS today
    ,user_classwork.stage_no AS stage_no
	,user_classwork.level_no AS level_no
    ,classwork.lesson_key AS lesson_key
	,user_classwork.id as id
	,biggest_students
    ,user_work_status
	,classwork.id AS classwork_key
FROM 
	user_classwork
INNER JOIN
	classwork
ON
	classwork.id = user_classwork.classwork_key
AND	
	user_classwork.user_key = in_user_key
INNER JOIN 
	lesson_inf
ON
	lesson_inf.id = classwork.lesson_key
INNER JOIN
	school_inf
ON	
	school_inf.id = lesson_inf.school_key
INNER JOIN
	time_table_day
ON
	time_table_day.id = classwork.time_table_day_key
INNER JOIN
	timetable_inf
ON
	timetable_inf.id = time_table_day.timetable_key
LEFT JOIN
	(
        SELECT
            MAX(students) AS biggest_students
            ,lesson_key
		FROM
            lesson_point_rate
        GROUP BY
            lesson_key	
    ) AS lsp
ON
    lsp.lesson_key = lesson_inf.id
AND 
	order_students > biggest_students
INNER JOIN
	lesson_point_rate
ON
	lesson_point_rate.lesson_key = lesson_inf.id
AND(
	students <= order_students
OR
	biggest_students IS NOT NULL
)) AS student_class_rec
GROUP BY
    id;

END$$

-- キャンセル料(率)
CREATE PROCEDURE p_lesson_cancel_rate(
	,IN in_lesson_key INT
)
BEGIN

CREATE TEMPORARY TABLE tmp_lesson_cancel_rate AS 
SELECT
	*
FROM
	lesson_cancel_rate
WHERE
	lesson_key = in_lesson_key;

END$$

-- 受講可能レッスン
CREATE PROCEDURE p_bookable_lessons(
	,IN in_user_key INT
)
BEGIN

SELECT 
    lesson_name
    ,id AS lesson_key
FROM
    lesson_inf
WHERE
    id in(
        SELECT 
            lesson_key
        FROM
            user_lesson
        WHERE
            user_key = in_user_key
        AND
            rec_status = 0
    )
AND
	rec_status = 0;

END$$

DELIMITER ;

DELIMITER $$
-- 受講可能レッスン
CREATE PROCEDURE check_userworkstatus(
	IN in_user_key INT
	,IN in_from_date varchar(10)
	,IN in_to_date varchar(10)
    ,OUT `result` TEXT
)
BEGIN
# ログインユーザの授業予約状況チェック用クエリ
SELECT DISTINCT 
	lesson_date
	,user_work_status 
FROM 
	`user_classwork` 
INNER JOIN 
	classwork 
ON 
	user_classwork.classwork_key = classwork.id 
INNER JOIN 
	time_table_day 
ON 
	classwork.time_table_day_key = time_table_day.id 
WHERE 
	lesson_date >= in_from_date 
AND 
	lesson_date <= in_to_date 
AND 
	user_key = in_user_key;
END$$

DELIMITER ;

