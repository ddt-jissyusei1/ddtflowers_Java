# パスワードはphpで言うならsha1()をかけてから保存
UPDATE
	user_inf	
SET
	password = {{sha1暗号化password}}
    ,update_datetime = NOW()
WHERE
	id = {{ユーザID}}
	
#パスワード変更
delimiter $$
CREATE PROCEDURE updateUserPassword(in newPassword varchar(255), userId int)
BEGIN
UPDATE user_inf SET password = newPassword,update_datetime = NOW() WHERE id = userId;
END$$
delimiter ;

CALL updateUserPassword('password', 'userId');