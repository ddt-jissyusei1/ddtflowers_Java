# 受講情報の場合の更新
UPDATE
	user_classwork
SET
	user_classwork_cost = {{料金}}
    ,update_datetime = NOW()
WHERE
	id = {{classwork_key}}

# 備品代の時の更新
UPDATE
	commodity_sell
SET
	pay_cash = {{料金}}
    ,update_datetime = NOW()
WHERE
	id = {{commodity_sell_key}}
	
#使用ポイントの更新
delimiter $$
CREATE PROCEDURE updateLecturePermitListPoint(in diffPoint int, userKey int)
BEGIN
UPDATE 
	user_inf 
SET 
	use_point = use_point + diffPoint
	,get_point = get_point - diffPoint
WHERE 
	id = userKey;	
END$$
delimiter ;

# 受講情報の場合の更新
delimiter $$
CREATE PROCEDURE updateLecturePermitListClasswork(in userClassworkCost int, usePoint int, classworkId int, diffPoint int, userKey int)
BEGIN
#授業データの更新
UPDATE
	user_classwork
SET
	user_classwork_cost = userClassworkCost
	, use_point = usePoint
    ,update_datetime = NOW()
WHERE
	id = classworkId
;
CALL updateLecturePermitListPoint(diffPoint, userKey);
END$$
delimiter ;

CALL updateLecturePermitListClasswork('user_classwork_cost', 'use_point', 'id', 'diff_point', 'user_key');

# 備品代の時の更新
delimiter $$
CREATE PROCEDURE updateLecturePermitListCommodity(in userClassworkCost int, commodityContent text, usePoint int, commoditySellKey int, diff_point int, userKey int)
BEGIN
UPDATE
	commodity_sell
SET
	pay_cash = userClassworkCost
	,commodity_key=commodityContent
	,use_point = usePoint
    ,update_datetime = NOW()
WHERE
	id = commoditySellKey
;
CALL updateLecturePermitListPoint(@result, diffPoint, userKey);
END$$
delimiter ;

CALL updateLecturePermitListCommodity('user_classwork_cost', 'content', 'use_point', 'id', 'diff_point', 'user_key');
