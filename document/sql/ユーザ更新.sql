UPDATE
	user_inf
SET
	user_name = {{姓 + スペース + 名}}
	,zip_code = {{郵便番号}}
	,address = {{住所}}
	,user_sex = {{性別}}
	,birthday_date = {{誕生日}}
	,telephone = {{電話番号}}
	,telephone2 = {{緊急番号}}
	,mail_address = {{メールアドレス}}
	,mail_deny = {{メール受信拒否}}
    ,update_datetime = NOW()
WHERE 
	id = {{ユーザID}}
# メール受信拒否は0なら拒否しないだったとおもう

#プロフィール更新
delimiter $$
CREATE PROCEDURE updateUserProfile(in userName varchar(40), nameKana varchar(40), zipCode varchar(8), userAddress varchar(255), userSex tinyint, birthdayDate date, userTelephone1 varchar(20), userTelephone2 varchar(20), userMailAddress varchar(255), mailDeny int, userId int)
BEGIN
UPDATE user_inf SET user_name = userName,name_kana = nameKana, zip_code = zipCode, address = userAddress, user_sex = userSex, birthday_date = birthdayDate, telephone = userTelephone1, telephone2 = userTelephone2, mail_address = userMailAddress, mail_deny = mailDeny, update_datetime=NOW() WHERE  id = userId;
END$$
delimiter ;

CALL updateUserProfile('user_name', 'name_kana', 'zip_code', 'address', 'user_sex', 'birthday_date', 'telephone','telephone2' ,'mail_address', 'mail_deny', 'userId');
