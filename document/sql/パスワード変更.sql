# ユーザIDはセッションからとりましょう

#-----------------------------------------------------
# ヘッダ部分(ユーザ番号と名前)
SELECT 
	*
FROM
	user_inf
WHERE
	id = {{ユーザID}}
#-----------------------------------------------------