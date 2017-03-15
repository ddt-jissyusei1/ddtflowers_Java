DELIMITER $$
DROP PROCEDURE IF EXISTS p_delete_classwork $$
CREATE PROCEDURE p_delete_classwork (
    IN in_id INT
    ,OUT result INT
)
BEGIN
    
DECLARE old_count int;
DECLARE new_count int;

SELECT 
    COUNT(id)
FROM
    classwork
INTO
    old_count;

START TRANSACTION;

DELETE
FROM
    classwork
WHERE
    id = in_id
AND
    order_students = 0;

SELECT
    COUNT(id)
FROM
    classwork
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
        