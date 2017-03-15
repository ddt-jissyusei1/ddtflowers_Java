# 受講情報の更新
UPDATE
	user_classwork
SET
	user_classwork_cost = {{受講料}}
	,use_point = {{使用ポイント※但し受講料より多い場合は受講料と同額}}
    ,get_point = {{point_rate * 受講料}}
	,late_time = {{遅刻時間}}
	,update_datetime = NOW()
	,user_work_status = 3,
	,pay_price = {{支払い金額}}
WHERE
	id = {{user_classwork_key}}

# 備品代情報の更新
INSERT INTO
	commodity_sell(
		sell_datetime
		, sell_number
		, pay_cash
		, use_point
        	,get_point
		,content
		,user_key
		,school_key
		,commodity_key
		,create_datetime
		,update_datetime
	)
	VALUES (
		 NOW()
		,{{個数}}
		,{{備品代}}
		,{{受講情報の更新時のポイントのあまり}
        	,0
		,{{備品代}}
		,{{ユーザID}}
		,{{セッションのschool_key}}
		,{{commodity_key※セレクトで指定した値}}
		,NOW()
		,NOW()
	)


# 取得ポイントがある場合
UPDATE
	user_inf
SET
	,get_point = get_point + {{get_point}}
	,update_datetime = NOW()
WHERE
	id = {{ユーザID}}

# 使用ポイントがある場合(⬆️と同時にやろうと思えばできるけど複雑なんで分けた方が良さげ)
UPDATE
	user_inf
SET
	 use_point = use_point + {{使用ポイント}}
	,get_point = get_point - {{使用ポイント}}
	,update_datetime = NOW()
WHERE
	id = {{ユーザID}}

	
#受講承認更新
#受講情報の更新
delimiter $$
CREATE PROCEDURE doLecturePermit(in userClassworkCost int, getPoint int, classworkUsePoint int, lateTime int, payPrice int, userClassworkKey int)
BEGIN
UPDATE
	user_classwork
SET
	user_classwork_cost = userClassworkCost
	,use_point = getPoint
    ,get_point = classworkUsePoint
	,late_time = lateTime
	,update_datetime = NOW()
	,receipt_datetime = NOW()
	,user_work_status = 3
	,pay_price = payPrice
WHERE
	id = userClassworkKey;
END$$
delimiter ; 

CALL doLecturePermit('user_classwork_cost', 'get_point', 'classwork_use_point', 'late_time', 'pay_price', 'user_classwork_key');



#獲得ポイント更新
delimiter $$
CREATE PROCEDURE updateLecturePermitGetPoint(in getPoint int, userKey int)
BEGIN
	UPDATE
		user_inf
	SET
		get_point = get_point + getPoint
		,update_datetime = NOW()
	WHERE
		id = userKey
	;
END$$
delimiter ;

#使用ポイント更新
delimiter $$
CREATE PROCEDURE updateLecturePermitUsePoint(in usePoint int, userKey int)
BEGIN
	UPDATE
		user_inf
	SET
		 get_point = get_point - usePoint
		,use_point = use_point + usePoint
		,update_datetime = NOW()
	WHERE
		id = userKey
	;
END$$
delimiter ;

# ポイントの更新
delimiter $$
CREATE PROCEDURE updateLecturePermitPoints(in getPoint int ,usePoint int , userKey int)
BEGIN
#備品購入情報を追加する
INSERT INTO
	#獲得ポイントがあれば
	IF getPoint <> 0 THEN
		#ユーザの獲得ポイントを更新する
		CALL updateLecturePermitGetPoint(getPoint, userKey);
	END IF;

	#使用ポイントがあれば
	IF commodityUsePoint <> 0 THEN
		#ユーザの使用ポイントを更新する
		CALL updateLecturePermitUsePoint(usePoint, userKey); 
	END IF;
	
END$$
delimiter ;

# 備品代情報の更新
delimiter $$
CREATE PROCEDURE insertSellCommodity(in sellNumber int ,payCash int ,commodityUsePoint int ,commodityContent text, userKey int ,schoolKey int ,commodityKey int, getPoint int)
BEGIN
#備品購入情報を追加する
	INSERT INTO commodity_sell(
		sell_datetime
		,sell_number
		,pay_cash
		,use_point
		,content
		,user_key
		,school_key
		,commodity_key
		,create_datetime
		,update_datetime
	)
	VALUES (
		 NOW()
		,sellNumber
		,payCash
		,commodityUsePoint
		,commodityContent
		,userKey
		,schoolKey
		,commodityKey
		,NOW()
		,NOW()
	);

	#ポイントを反映する
	CALL updateLecturePermitPoints(getPoint, commodityUsePoint, userKey);	
END$$
delimiter ;

CALL doLecturePermit('user_classwork_cost', 'get_point', 'classwork_use_point', 'late_time', 'pay_price', 'user_classwork_key'); CALL updateLecturePermitPoints('get_point' ,'use_point', 'user_key');
CALL doLecturePermit('user_classwork_cost', 'get_point', 'classwork_use_point', 'late_time', 'pay_price', 'user_classwork_key'); CALL insertSellCommodity('sell_number' ,'pay_cash' ,'commodity_use_point' ,'content' ,'user_key' ,'school_key' ,'commodity_key', 'get_point');"

