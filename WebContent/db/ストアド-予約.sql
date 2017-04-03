DELIMITER $$
DROP PROCEDURE IF EXISTS `book_classwork` $$
CREATE PROCEDURE `book_classwork`(
    IN in_default_user_classwork_cost int(11)
	,IN in_default_flower_cost int(11)
	,IN in_user_key int(11)
	,IN in_classwork_key int(11)
	,IN in_stage_key int(11)
	,IN in_stage_no_present int(11)
	,IN in_level_key int(11)
	,IN in_level_no_present int(11)
	,IN in_id int(11)
	)
BEGIN

DECLARE user_classwork_is_exists int(11);
DECLARE latest_timestamp VARCHAR(25);
DECLARE updated_count int(11); 

SELECT 
	MAX(update_datetime) AS latest 
INTO latest_timestamp;

-- 既にキャンセルしたレコードがあるか??
SELECT
	COUNT(id)
FROM
	user_classwork
WHERE
	user_key = in_user_key
AND
	classwork_key = in_classwork_key
INTO
	user_classwork_is_exists;

START TRANSACTION;

-- 予約レコードがあればupdate無ければinsert
IF user_classwork_is_exists = 1 THEN
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
	,in_default_user_classwork_cost
	,in_default_flower_cost
	,in_user_key
	,in_classwork_key
	,in_stage_key
	,in_stage_no_present
	,in_level_key
	,in_level_no_present
	,NOW()
	,NOW()
	,NOW()
);
ELSE
UPDATE
	user_classwork
SET
	user_work_status = 1
	,flower_cost = in_default_flower_cost
	,user_classwork_cost = in_default_user_classwork_cost
	,stage_key = in_stage_key
	,stage_no = in_stage_no_present
	,level_key = in_level_key
	,level_no = in_level_no_present
    ,update_datetime = NOW()
    ,order_datetime = NOW()
WHERE
	id = in_id;
END IF;

SELECT
	COUNT(*) FROM user_classwork
WHERE
	update_datetime > latest_timestamp
INTO updated_count; 

IF updated_count = 1 THEN
UPDATE 
	classwork
SET
	order_students = order_students+1
    ,update_datetime = NOW()
WHERE
	id = in_classwork_key;

COMMIT;

ELSE
ROLLBACK;
END IF;

END $$

DELIMITER ;
