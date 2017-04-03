DELIMITER $$
DROP PROCEDURE IF EXISTS `cancel_classwork` $$
CREATE PROCEDURE `cancel_classwork`(
	IN in_id int(11)
	,in_classwork_key int(11)
	,in_cancel_charge int(11)
	,in_cancel_user tinyint(4)
)
BEGIN

DECLARE latest_timestamp VARCHAR(25);
DECLARE updated_count int(11); 
DECLARE cancel_status tinyint(4);

SELECT 
	MAX(update_datetime) AS latest
FROM
	user_classwork
INTO latest_timestamp;

IF in_cancel_user = 0 THEN
	SET cancel_status = 10;
ELSE 
	SET cancel_status = 11;
END IF;

UPDATE
	user_classwork
SET
	user_work_status = cancel_status
    ,update_datetime = NOW()
WHERE
	id = in_id;

SELECT
	COUNT(*) 
FROM 
	user_classwork
WHERE
	update_datetime > latest_timestamp
INTO updated_count; 

IF updated_count = 1 THEN

UPDATE 
	classwork
SET
	order_students = order_students-1
    ,update_datetime = NOW()
    ,cancel_charge = in_cancel_charge
WHERE
	id = in_classwork_key;

COMMIT;

ELSE
ROLLBACK;
END IF;

END $$
DELIMITER ;