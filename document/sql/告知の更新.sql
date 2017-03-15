#メッセージそのもの取得
SELECT
	id
	,message_title
	,message_content
FROM
	message_inf
WHERE
	message_type = 0
ORDER BY 
	create_datetime DESC

# メッセージそのもの追加
INSERT INTO
	message_inf(
		message_type
		,message_title
		,message_content
		,create_datetime
		,update_datetime
	)
	VALUES(
		0
		,{{タイトル}}
		,{{本文}}
		,NOW()
		,NOW()
	)
# メッセージそのもの更新
UPDATE
	message_inf
SET
	message_title = {{タイトル}}
	,message_content = {{本文}}
	,update_datetime = NOW()
WHERE
	id = {{message_infのid}}
	
# メッセージ宛先追加
INSERT INTO
	message_to(
		message_key
		,user_key
		,create_datetime
		,update_datetime
	)
	VALUES(
		{message_infのid}
		,{user_key}
		,NOW()
		,NOW()
	)

#お知らせ取得
delimiter $$
CREATE PROCEDURE getUserMessage(out result text, in userKey int)
BEGIN
SELECT
	message_title
	,message_content
	,send_date 
FROM 
	message_inf 
WHERE 
	id IN 
	(
	SELECT 
		message_key 
	FROM 
		message_to 
	WHERE 
		user_key = 'userKey' 
		AND check_datetime IS NULL
	) 
	ORDER BY 
		send_date DESC
		, id DESC;
END$$
delimiter ;

CALL getUserMessage(@result, 'user_key'); SELECT @result AS 'result';

#お知らせ登録1
delimiter $$
CREATE PROCEDURE insertMessageInfo(in messageTitle varchar(100), messageContent text)
BEGIN
INSERT INTO message_inf(send_date,message_type,message_title,message_content,create_datetime,update_datetime) VALUES(DATE(NOW()), 0, messageTitle, messageContent, NOW(), NOW());
END$$
delimiter ;

CALL insertMessageInfo('message_title', 'message_content');

#お知らせ登録2
delimiter $$
CREATE PROCEDURE insertMessageTo(in userKey int)
BEGIN
INSERT INTO message_to(message_key, user_key,create_datetime ,update_datetime) VALUES((SELECT id FROM message_inf ORDER BY create_datetime DESC LIMIT 1), 'userKey', NOW(), NOW());
END$$
delimiter ;

CALL insertMessageTo('user_key');
	
	