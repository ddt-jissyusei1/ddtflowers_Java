SELECT
    sell_datetime
	,commodity_sell.id AS id
	,user_name
	,pay_cash
	,commodity_sell.use_point AS use_point
	,sell_number
	,commodity_inf.commodity_name AS commodity_name
	,user_inf.id AS user_key
    ,user_inf.get_point AS get_point
FROM
	commodity_sell
INNER JOIN
	user_inf
ON
	user_inf.id = commodity_sell.user_key
AND
    commodity_sell.purchase_status > 0
AND
	sell_datetime <= {{toDate}}
AND
	sell_datetime >= {{fromDate}}
INNER JOIN
	commodity_inf 
ON
	commodity_inf.id = commodity_sell.commodity_key
ORDER BY sell_datetime DESC;
