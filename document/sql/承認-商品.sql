--初期分
SELECT
	*
FROM
	commodity_sell
WHERE
	purchase_status = 0
ORDER BY sell_datetime DESC;


