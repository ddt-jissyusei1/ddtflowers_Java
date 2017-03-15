SELECT 
	user_classwork.id AS id
	,user_name
	,lesson_name
	,lesson_sub.level_no AS level_no
	,stage_inf.stage_no AS stage_no
	,user_classwork.user_classwork_cost AS cost
	,user_classwork.use_point AS use_point
	,user_inf.id AS user_key
	,user_inf.get_point AS get_point
	,lesson_inf.scholl_key AS school_key
FROM
	user_classwork
INNER JOIN
	classwork
ON
	classwork.id = user_classwork.classwork_key
INNER JOIN
	time_table_day
ON
	time_table_day.id = classwork.time_table_day_key
AND
	time_table_day.lesson_date <= {{toDate}}
AND
	time_table_day.lesson_date >= {{fromDate}}
INNER JOIN
	user_inf
ON
	user_inf.id = user_classwork.user_key
INNER JOIN 
	lesson_inf
ON
	lesson_inf.id = classwork.lesson_key
INNER JOIN
	stage_inf
ON
	stage_inf.id = user_classwork.stage_key
INNER JOIN
	lesson_sub
ON
	lesson_sub.id = user_classwork.level_key
ORDER BY time_table_day.lesson_date DESC；
