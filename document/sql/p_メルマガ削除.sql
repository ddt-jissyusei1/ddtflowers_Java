DELIMITER $$
DROP PROCEDURE IF EXISTS p_delete_mail_magazine $$
CREATE PROCEDURE p_delete_mail_magazine (
    IN in_id INT
    ,OUT result INT
)
BEGIN
    
DECLARE old_count int;
DECLARE new_count int;

SELECT 
    COUNT(id)
FROM
    mail_magazine
INTO
    old_count;

START TRANSACTION;

DELETE
FROM
    mail_magazine
WHERE
    id = in_id;

SELECT
    COUNT(id)
FROM
    mail_magazine
INTO
    new_count;

IF old_count > new_count THEN
    SELECT 1 INTO result;
    COMMIT;
ELSE
    SELECT 0 INTO result;
    ROLLBACK;
END IF;

END$$

DELIMITER ;
        