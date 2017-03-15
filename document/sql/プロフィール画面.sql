# ユーザIDはセッションからとりましょう

#-----------------------------------------------------
# 全部
SELECT 
	*
FROM
	user_inf
WHERE
	id = {{ユーザID}}

#-----------------------------------------------------

#プロフィール取得
delimiter $$
CREATE PROCEDURE getUserProfile(out result text, in userId int)
BEGIN
SELECT 
	user_name
	,name_kana
	,user_sex
	,birthday_date
	,zip_code
	,address
	,mail_address
	,telephone
	,telephone2
	,mail_deny 
FROM 
	user_inf 
WHERE 
	id = userId;
END$$
delimiter ;

CALL getUserProfile(@result, 'userId'); SELECT @result AS 'result';
