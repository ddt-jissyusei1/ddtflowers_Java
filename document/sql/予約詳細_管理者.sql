#-----------------------------------------------------
# リスト出力
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
LEFT JOIN
	classwork
ON
	time_table_day.id = classwork.time_table_day_key
AND
	time_table_day.lesson_date = '{{日付}}'
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
	timetable_inf.id = time_table_day.timetable_key
#-------------------------------------------

#-------------------------------------------
# 新規登録
INSERT INTO
	classwork(
		max_students
		,min_students
		,classwork_status
		,classroom
		,classwork_note
		,teacher_key
        ,school_key
        ,lesson_key
        ,time_table_day_key
		,create_datetime
		,update_datetime
	)
	VALUES(
		{{max_students}}
		,{{min_students}}
		,{{classwork_status}}
		,'{{classroom}}'
		,'{{classwork_note}}'
		,(select id from user_inf where authority = 10 limit 1)
        ,{{school_key}}
        ,{{lesson_key}}
        ,{{time_table_day_key}}
		,NOW()
		,NOW()
	)

	
#-------------------------------------------
# 新規登録(time_table_dayも一緒にVersion)
# 同じ更新を連続でやると危険
INSERT INTO
	time_table_day(
		timetable_key
		,lesson_date
        ,max_num
        ,min_num
		,create_datetime
		,update_datetime
	)
	VALUES(
		{{timetable_key}}
		,{{lesson_date}}
        ,{{max_num}}
        ,{{min_num}}
		,NOW()
		,NOW()
	);

INSERT INTO
	classwork(
		max_students
        ,lesson_date
		,min_students
		,classwork_status
		,classroom
		,classwork_note
		,teacher_key
        ,school_key
        ,lesson_key
        ,time_table_day_key
		,create_datetime
		,update_datetime
	)
	VALUES(
		{{max_students}}
        ,'{{lesson_date}}'
		,{{min_students}}
		,{{classwork_status}}
		,'{{classroom}}'
		,'{{classwork_note}}'
		,(select id from user_inf where authority = 10 limit 1)
        ,{{school_key}}
        ,{{lesson_key}}
        ,(SELECT id FROM time_table_day WHERE timetable_key = {{timetable_key}} order by create_datetime DESC LIMIT 1)
		,NOW()
		,NOW()
	)
#-------------------------------------------
# 更新
UPDATE
	classwork
SET
	max_students = {{max_students}}
	,min_students = {{min_students}}
	,classwork_status = '{{classwork_status}}'
	,classroom = '{{classroom}}'
	,classwork_note = '{{classwork_note}}'
	,update_datetime = NOW()
WHERE
	id = {{classwork_key}}
    
#-------------------------------------------
# 時間割ごとの最大、最小人数更新
UPDATE
    time_table_day
SET 
    max_num = {{max_num}}
    ,min_num = {{min_num}}
    ,update_datetime = NOW()
WHERE
    id = {{time_table_day_key}}

#-------------------------------------------
# 授業のコマ追加時のテーマ選択セレクト用クエリ
SELECT 
    id AS lesson_key
    ,lesson_name
FROM
    lesson_inf
WHERE
    rec_status = 0;

    
