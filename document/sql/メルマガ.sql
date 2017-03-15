
# メルマガ全部取り
SELECT 
	*
FROM
	mail_magazine
WHERE
	magazine_type = 0
AND
    school_key = 1


# メルマガ追加
INSERT INTO
	mail_magazine (
		magazine_type
		,send_datetime
		,magazine_title
		,magazine_content
		,create_datetime
	)
	VALUES (
		0
		,{{送信日時}}
		,{{タイトル}}
		,{{本文}}
		NOW()
	)
    
# メルマガ受信ユーザ一覧取得
SELECT 
    id
    ,user_name
    ,mail_address 
FROM 
    user_inf
WHERE 
    mail_deny = 0