DELIMITER $$
DROP PROCEDURE IF EXISTS `getAdminLessonList` $$
CREATE PROCEDURE `getAdminLessonList`(
	OUT result text,
	IN in_date VARCHAR(25)
)
BEGIN
 
SELECT 
	lesson_name
	,classwork.lesson_key AS lesson_key
	,start_time
	,end_time
	,time_table_day.lesson_date AS lesson_date
	,order_students
	,classwork.max_students AS max_students
	,classwork.min_students AS min_students
	,lesson_inf.min_students AS default_min_students
	,time_table_day.max_num AS max_num
	,time_table_day.min_num AS min_num
	,classwork_status
	,SUBSTRING(NOW(), 1,10) AS today
	,classwork.id AS classwork_key
	,classwork_note
	,classroom
    ,school_inf.id AS school_key
    ,school_name
	,time_table_day.id AS time_table_day_key
    ,timetable_inf.id AS timetable_key
FROM 
	time_table_day
INNER JOIN
	classwork
ON
	time_table_day.id = classwork.time_table_day_key
AND
	time_table_day.lesson_date = in_date
LEFT JOIN
	lesson_inf
ON
	lesson_inf.id = classwork.lesson_key
LEFT JOIN
    school_inf 
ON
    school_inf.id = lesson_inf.school_key
RIGHT JOIN
	timetable_inf
ON
	timetable_inf.id = time_table_day.timetable_key;
	
END $$
DELIMITER ;