DELIMITER $$
DROP PROCEDURE IF EXISTS p_update_approval_lesson $$
CREATE PROCEDURE p_update_approval_lesson (
	IN in_user_classwork_cost INT
    ,IN in_use_point INT
    ,IN in_get_point INT
    ,IN in_pay_price INT
	,IN in_user_key INT
    ,IN in_user_classwork_key INT
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
    user_classwork
INTO
    latest_timestamp;

START TRANSACTION;

UPDATE
	user_classwork
SET
	user_classwork_cost = in_user_classwork_cost
	,use_point = in_use_point
    ,get_point = in_get_point
	,update_datetime = NOW()
	,user_work_status = 3
	,pay_price = in_pay_price
WHERE
	id = in_user_classwork_key;

SELECT 
    MAX(update_datetime) AS latest
FROM
    user_classwork
INTO
    updated_timestamp;

IF latest_timestamp < updated_timestamp THEN
    SELECT
        in_get_point - in_use_point
    INTO
        diff_point;
    SELECT
        MAX(update_datetime)
    FROM
        user_inf
    INTO
        latest_timestamp_user;
    IF diff_point = 0 THEN
        IF in_get_point = 0 THEN
            SELECT 1 INTO result;
            COMMIT;
        ELSE
            UPDATE
                user_inf
            SET
                use_point = use_point + in_use_point
                ,update_datetime = NOW()
            WHERE
                id = in_user_key;
            SELECT
                MAX(update_datetime) AS latest
            FROM
                user_inf
            INTO
                updated_timestamp_user;
            IF latest_timestamp_user < updated_timestamp_user THEN
                COMMIT;
            ELSE
                SELECT 0 INTO result;
                ROLLBACK;
            END IF;
        END IF;
    ELSE
        UPDATE
            user_inf
        SET
            use_point = use_point + in_use_point
            ,get_point = get_point + diff_point
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