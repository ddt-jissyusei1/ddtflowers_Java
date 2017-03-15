SELECT
	time_table_day.id AS time_table_key
	,time_table_day.lesson_date AS lesson_date
    ,classwork.order_students AS order_students
    ,classwork.lesson_key AS lesson_key
	,start_time
	,end_time
	,lesson_name
	,user_name
	,user_classwork.stage_no AS stage_no
	,user_classwork.level_no AS level_no
	,user_classwork_cost
	,user_inf.get_point AS get_point
	,user_classwork.id AS user_classwork_key
	,user_inf.id AS user_key
	,time_table_day.scholl_key AS school_key
FROM
	time_table_day
INNER JOIN
	classwork
ON
	time_table_day.id = classwork.time_table_day_key
AND
	time_table_day.lesson_date = NOW()
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
AND
	user_classwork.user_work_status = 2;

# ポイントレート算出方法①
SELECT
    point_rate
FROM
    lesson_point_rate
WHERE
    lesson_point_rate.lesson_key = {{lesson_key}}
AND
    lesson_point_rate.students <= {{order_students}}
ORDER BY
    lesson_point_rate.students DESC
LIMIT 1
#⬆️の結果がかえってこなかったら
SELECT
    point_rate
FROM
    lesson_point_rate
WHERE
    lesson_point_rate.lesson_key = {{lesson_key}}
ORDER BY 
    lesson_point_rate.students ASC
LIMIT 1;

#ポイントレート算出方法②
SELECT
    point_rate
    ,students
FROM
    lesson_point_rate
WHERE
    lesson_point_rate.lesson_key = {{lesson_key}}
#これでとれた全件のうち、studentsがclassworkのorder_students以下なレコードのうちで最大のstudentsを持つレコードのpoint_rate
#上記に該当するものがないときは全件のうちで最小のstudentsをもつレコードのpoint_rate

	
# 備品名リスト用クエリ
# selling_priceは個数入力時の代金自動計算に使う
# point_rateは取得ポイントの計算に使う
SELECT 
	commodity_name
    ,point_rate
	,selling_price
	,id AS commodity_key
FROM
	commodity_inf
	
	
#受講承認
#受講承認対象の一覧取得
delimiter $$
CREATE PROCEDURE getLecturePermit(out result text)
BEGIN
SELECT 
	'' AS columnCheckbox
	,time_table_day.id AS time_table_key 
	,time_table_day.lesson_date AS lesson_date 
	,classwork.order_students AS order_students    
	,classwork.lesson_key AS lesson_key
	,start_time 
	,end_time 
	,lesson_name 
	,user_name 
	,user_classwork.stage_no AS stage_no 
	,user_classwork.level_no AS level_no 
	,user_classwork_cost 
	,user_inf.get_point AS get_point 
	,user_classwork.id AS user_classwork_key 
	,user_inf.id AS user_key 
	,timetable_inf.school_key AS school_key
	,classwork.order_students
FROM 
	time_table_day 
INNER JOIN 
	classwork 
ON 
	time_table_day.id = classwork.time_table_day_key 
AND 
	time_table_day.lesson_date = SUBSTRING(NOW(), 1, 10) 
INNER JOIN 
	user_classwork 
ON classwork.id = user_classwork.classwork_key 
INNER 
	JOIN user_inf 
ON user_inf.id = user_classwork.user_key 
INNER JOIN  
	lesson_inf 
ON 
	lesson_inf.id = classwork.lesson_key 
INNER JOIN 
	timetable_inf 
ON 
	timetable_inf.id = time_table_day.timetable_key 
AND 
	user_classwork.user_work_status = 2
;
END$$
delimiter ;

CALL getLecturePermit(@result); SELECT @result AS 'result';	

#ポイントレート算出
delimiter $$
CREATE PROCEDURE getPointRate(out result text, in lessonKey int)
BEGIN
SELECT
    point_rate
    ,students
FROM
    lesson_point_rate
WHERE
    lesson_point_rate.lesson_key = lessonKey
;
END$$
delimiter ;

CALL getPointRate(@result,'lesson_key'); SELECT @result AS 'result';

# 備品名リスト用クエリ
delimiter $$
CREATE PROCEDURE getCommodityNameList(out result text)
BEGIN
SELECT 
	commodity_name
	,selling_price
	,id AS commodity_key 
FROM 
	commodity_inf;
END$$
delimiter ;

CALL getCommodityNameList(@result); SELECT @result AS 'result';

