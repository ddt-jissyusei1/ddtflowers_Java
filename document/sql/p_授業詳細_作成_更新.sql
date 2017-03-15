
DELIMITER $$

# 授業時間帯作成プロシージャ
DROP PROCEDURE IF EXISTS p_insert_time_table_day $$
CREATE PROCEDURE p_insert_time_table_day (
    IN in_timetable_key INT
    ,IN in_lesson_date varchar(10)
    ,IN in_max_num INT
    ,IN in_min_num INT
    ,OUT result INT
)
# プロシージャ開始
BEGIN
# レコードを以下のテーブルに新規追加する
INSERT INTO 
	# 授業時間帯テーブル
	time_table_day
	# 値を設定する列を指定する
	( 
	    # 最小人数
		min_num 
		# 最大人数
		,max_num
		# 授業時間帯情報テーブルのID
		,timetable_key 
		# 授業の日付
		,lesson_date
		# レコード作成日時
		,create_datetime
		# レコード更新日時
		,update_datetime 
	)
# 以下の通りに値をセットする
VALUES
	( 
	    # 各々引数の通りに値をセットする
		in_min_num 
		,in_max_num 
		,in_timetable_key 
		,in_lesson_date
		# 作成日時、更新日時は現在時刻
		,NOW() 
		,NOW() 
	);
# プロシージャを終了する
END$$


# 時間帯作成と同時に授業作成するときに使うプロシージャ
DROP PROCEDURE IF EXISTS p_insert_new_classwork $$
CREATE PROCEDURE p_insert_new_classwork (
	IN in_max_students INT
	,IN in_min_students INT
	,IN in_classwork_status INT 
	,IN in_classroom VARCHAR(10)
	,IN in_classwork_note TEXT
    ,IN in_lesson_key VARCHAR(8)
    ,IN in_timetable_key INT
    ,OUT result INT
)
# プロシージャ開始
BEGIN
# レコードを以下のテーブルに新規追加する
INSERT INTO 
	classwork
		( 
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
			,order_students
		) 
	VALUES
		(
			in_max_students 
			,in_min_students 
			,in_classwork_status 
			,in_classroom 
			,in_classwork_note
			,(select id from user_inf where authority = 10 limit 1)
			,(SELECT school_key FROM timetable_inf WHERE id = in_timetable_key) 
			,in_lesson_key 
			,(SELECT id FROM time_table_day WHERE timetable_key = in_timetable_key order by create_datetime DESC LIMIT 1) ,NOW() ,NOW(), 0 )
;
END $$

# 通常通り授業作成するときに使うプロシージャ
DROP PROCEDURE IF EXISTS p_insert_normal_classwork $$
CREATE PROCEDURE p_insert_normal_classwork (
	IN in_max_students INT
	,IN in_min_students INT
	,IN in_classwork_status INT 
	,IN in_classroom VARCHAR(10)
	,IN in_classwork_note TEXT
    ,IN in_lesson_key VARCHAR(8)
    ,IN in_timetable_key INT
    ,IN in_time_table_day_key INT
    ,OUT result INT
)
# プロシージャ開始
BEGIN
# レコードを以下のテーブルに新規追加する
INSERT INTO 
	classwork
	( 
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
		,order_students
	) 
VALUES
	(
		in_max_students 
		,in_min_students 
		,in_classwork_status 
		,in_classroom 
		,classwork_note
		,(select id from user_inf where authority = 10 limit 1)
		,(SELECT school_key FROM timetable_inf WHERE id = in_timetable_key)
		,in_lesson_key
		,in_time_table_day_key
		,NOW()
		,NOW()
		,0)
;
END$$

# 授業更新プロシージャ
DROP PROCEDURE IF EXISTS p_update_lesson_detail $$
CREATE PROCEDURE p_update_lesson_detail (
    IN in_max_students INT
    ,IN in_min_students INT
    ,IN in_classwork_status INT
    ,IN in_classroom VARCHAR(100)
    ,IN in_classwork_note TEXT
    ,IN in_classwork_key INT
    ,OUT result INT
)
# プロシージャ開始
BEGIN
	UPDATE 
		classwork 
	SET 
		max_students = in_max_students 
		,min_students = in_min_students
		,classwork_status = in_classwork_status 
		,classroom = in_classroom
		,classwork_note = in_classwork_note 
		,update_datetime = NOW() 
	WHERE 
		id = in_classwork_key
	;
END$$

DELIMITER ;
