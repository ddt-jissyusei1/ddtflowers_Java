INSERT INTO 
	suggestion_box(
		suggest_title
		,suggest_content
		,send_datetime
		,suggest_type
	)
	VALUES (
		{{suggest_title}}
		,{{suggest_content}}
		,{{send_datetime}}
		,{{suggest_type}}
	)

# suggest_type のコードと日本語の対応
# 0:意見・要望
# 1:問い合わせ
# 2:クレーム

#目安箱
CREATE PROCEDURE postSuggestion(in suggestTitle varchar(100), suggestContent text, sendDatetime datetime, suggestType tinyint)
BEGIN
INSERT INTO 
	suggestion_box(
		suggest_title
		,suggest_content
		,send_datetime
		,suggest_type
	)
	VALUES (
		suggestTitle
		,suggestContent
		,sendDatetime
		,suggestType
	);
END$$
delimiter ;

CALL postSuggestion('suggest_title', 'suggest_content', 'send_datetime', 'suggest_type');
