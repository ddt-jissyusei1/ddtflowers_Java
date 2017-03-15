#-----------------------------------------------------
# viewにuser_classworkのレコードがなければinsert
INSERT INTO 
	user_classwork (
		user_work_status
		,user_classwork_cost
		,flower_cost
		,user_key
		,classwork_key
		,stage_key
		,stage_no
		,level_key
		,level_no
		,order_datetime
		,create_datetime
		,update_datetime
	)
	VALUES (
		1
		,{{default_user_classwork_cost}}
		,{{default_flower_cost}}
		,{{user_key}}
		,{{classwork_key}}
		,{{stage_key}}
		,{{stage_no_present}}
		,{{level_key}}
		,{{level_no_present}}
		,NOW()
		,NOW()
		,NOW()
	);
#-----------------------------------------------------

#-----------------------------------------------------
# viewにuser_classworkのレコードがあればupdate
UPDATE
	user_classwork
SET
	user_work_status = 1
	,flower_cost = {{default_user_classwork_cost}}
	,user_classwork_cost = {{default_flower_cost}}
	,stage_key = {{stage_key}}
	,stage_no = {{stage_no_present}}
	,level_key = {{level_key}}
	,level_no = {{level_no_present}}
    ,update_datetime = NOW()
    ,order_datetime = NOW()
WHERE
	id = {{id}};
#-----------------------------------------------------

#-----------------------------------------------------
# キャンセルSQL
UPDATE
	user_classwork
SET
	user_work_status = 10
    ,update_datetime = NOW()
WHERE
	userr_key = {{id}}

#-----------------------------------------------------
# 予約の時に追加してほしいSQL
UPDATE 
	classwork
SET
	order_students = order_students+1
    ,update_datetime = NOW()
WHERE
	id = {{classwoek_key}};

#-----------------------------------------------------
# キャンセルのときに追加してほしいSQL
UPDATE 
	classwork
SET
	order_students = order_students-1
    ,update_datetime = NOW()
WHERE
	id = {{classwoek_key}};

#まとめ
#予約sql
INSERT INTO user_classwork (user_work_status,user_classwork_cost,flower_cost,user_key,classwork_key,stage_key,stage_no,level_key,level_no,order_datetime,create_datetime,update_datetime) VALUES (1,'default_user_classwork_cost','default_flower_cost','userId','classwork_key','stage_key','stage_no_present','level_key','level_no_present',NOW(),NOW(),NOW()); UPDATE classwork SET order_students = order_students+1 WHERE id = 'classwork_key'

#キャンセル
UPDATE user_classwork SET user_work_status = 10 WHERE user_key = 'userId'; UPDATE classwork SET order_students = order_students-1 WHERE id = 'classwork_key';

