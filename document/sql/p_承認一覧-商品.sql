DELIMITER $$
DROP PROCEDURE IF EXISTS p_update_approval_list_purchase $$
CREATE PROCEDURE p_update_approval_list_purchase (
	IN in_sell_number INT
    ,IN in_pay_cash INT
    ,IN in_use_point INT
    ,IN in_commodity_sell_key INT
	,IN in_user_key INT
	,IN in_diff_point INT
    ,OUT result INT
)
BEGIN

DECLARE latest_timestamp VARCHAR(25);
DECLARE updated_timestamp VARCHAR(25);
DECLARE latest_timestamp_user VARCHAR(25);
DECLARE updated_timestamp_user VARCHAR(25);
DECLARE diff_point int(11);

SELECT 
    MAX(update_datetime)
FROM
    commodity_sell
INTO
    latest_timestamp;

START TRANSACTION;

UPDATE
	commodity_sell
SET
	pay_cash = in_pay_cash
	,use_point = in_use_point
    ,update_datetime = NOW()
WHERE
	id = in_commodity_sell_key;

SELECT 
    MAX(update_datetime)
FROM
    commodity_sell
INTO
    updated_timestamp;

IF latest_timestamp < updated_timestamp THEN
	IF in_diff_point = 0 THEN
		SELECT 1 INTO result;
		COMMIT;
	ELSE
		SELECT
	        MAX(update_datetime)
    	FROM
        	user_inf
    	INTO
        	latest_timestamp_user;
			
		UPDATE
			user_inf
		SET
			get_point = get_point + in_diff_point
			,update_datetime = NOW()
		WHERE
			id = in_user_key;
		
		SELECT
            MAX(update_datetime)
        FROM
            user_inf
        INTO
            updated_timestamp_user;
		
		IF latest_timestamp_user < updated_timestamp_user THEN
            SELECT 1 INTO result;
            COMMIT;
        ELSE
            SELECT 0 INTO result;
            ROLLBACK;
        END IF;
	END IF;
ELSE 
    SELECT 0 INTO result;
    ROLLBACK;
END IF;

END$$
DELIMITER ;