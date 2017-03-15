SELECT
	time_table_day.id AS time_table_key
	,time_table_day.lesson_date AS lesson_date
	,start_time
	,end_time
	,lesson_name
	,user_name
	,stage_inf.stage_no
	,lesson_sub.level_no
    ,user_classwork.user_work_status AS user_work_status
FROM
	time_table_day
INNER JOIN
	classwork
ON
	time_table_day.id = classwork.time_table_day_key
AND
	time_table_day.lesson_date = '{{date}}'
INNER JOIN
	user_classwork
ON
	classwork.id = user_classwork.classwork_key
INNER JOIN
	user_inf
ON
	user_inf.id = user_classwork.user_key
INNER JOIN 
	lesson_inf
ON
	lesson_inf.id = classwork.lesson_key
INNER JOIN
	timetable_inf
ON
	timetable_inf.id = time_table_day.timetable_key;
INNERR JOIN
	stage_inf
ON
	stage_inf.id = user_classwork.stage_key
INNER JOIN
	lesson_sub
ON
	lesson_sub.id = user_classwork.level_key
ORDER BY
	start_time ASC	
;

#日ごと予約者一覧取得
delimiter $$
CREATE PROCEDURE getEachDayLessonList(out result text, in date date)
BEGIN
SELECT
	time_table_day.id AS time_table_key
	,time_table_day.lesson_date AS lesson_date
	,start_time
	,end_time
	,lesson_name
	,user_name
	,stage_inf.stage_no
	,lesson_sub.level_no
    ,user_classwork.user_work_status AS user_work_status
    ,user_inf.id AS user_key
FROM
	time_table_day
INNER JOIN
	classwork
ON
	time_table_day.id = classwork.time_table_day_key
AND
	time_table_day.lesson_date = date
INNER JOIN
	user_classwork
ON
	classwork.id = user_classwork.classwork_key
INNER JOIN
	user_inf
ON
	user_inf.id = user_classwork.user_key
INNER JOIN 
	lesson_inf
ON
	lesson_inf.id = classwork.lesson_key
INNER JOIN
	timetable_inf
ON
	timetable_inf.id = time_table_day.timetable_key
INNER JOIN
	stage_inf
ON
	stage_inf.id = user_classwork.stage_key
INNER JOIN
	lesson_sub
ON
	lesson_sub.id = user_classwork.level_key
;	
END$$
delimiter ;

CALL getEachDayLessonList(@result, 'lesson_date'); SELECT @result AS 'result';
