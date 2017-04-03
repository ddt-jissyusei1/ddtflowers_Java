

// 挿入先ファイル：予約授業一覧ダイアログのjsonファイル
//クエリのデータ(db_getQueryのvalue部分に貼り付け)
"SELECT '' AS startEndTime, school_name ,lesson_name, '' AS sumCost, '' AS lesssonRest, '' AS lessonStatus ,user_classwork_cost ,time_table_day.max_num AS max_num , start_time, user_classwork.stage_no AS stage_no ,user_classwork.flower_cost AS flower_cost ,user_classwork_cost_aj ,flower_cost_aj ,user_classwork.extension_cost AS extension_cost ,uc_lesson_sub.level_no AS level_no ,classwork.lesson_key AS lesson_key ,pre_order_days ,stop_order_date ,end_time ,time_table_day.lesson_date AS lesson_date ,order_students ,classwork.max_students AS max_students ,classwork.min_students AS min_students ,lesson_inf.min_students AS default_min_students ,time_table_day.min_num AS min_num ,ul_lesson_sub.flower_cost AS default_flower_cost ,ul_lesson_sub.level_price AS default_user_classwork_cost ,ul_lesson_sub.level_no AS level_no_present ,classwork_status ,user_work_status ,ul_stage_inf.stage_no AS stage_no_present ,SUBSTRING(NOW(), 1,10) AS today ,user_classwork.id AS id ,classwork.id AS classwork_key ,ul_lesson_sub.id AS level_key ,ul_stage_inf.id AS stage_key  FROM  time_table_day INNER JOIN classwork ON time_table_day.id = classwork.time_table_day_key AND time_table_day.lesson_date = 'lessonDate' LEFT JOIN user_classwork ON classwork.id = user_classwork.classwork_key AND user_classwork.user_key = 'user_key' INNER JOIN  lesson_inf ON lesson_inf.id = classwork.lesson_key INNER JOIN school_inf ON school_inf.id = lesson_inf.school_key INNER JOIN timetable_inf ON timetable_inf.id = time_table_day.timetable_key LEFT JOIN user_lesson ON user_lesson.user_key = 'user_key' AND user_lesson.lesson_key = lesson_inf.id LEFT JOIN lesson_sub AS ul_lesson_sub ON ul_lesson_sub.id = user_lesson.level_key LEFT JOIN stage_inf AS ul_stage_inf ON ul_stage_inf.id = user_lesson.stage_key LEFT JOIN lesson_sub AS uc_lesson_sub ON uc_lesson_sub.id = user_classwork.level_key LEFT JOIN stage_inf AS uc_stage_inf ON uc_stage_inf.id = user_classwork.stage_key;",

//config部分
            "columns": {
                "startEndTime": {
                    "columnName": "時間割"
                },
                "school_name": {
                    "columnName": "店舗"
                },
                "lesson_name": {
                    "columnName": "テーマ"
                },
                "sumCost": {
                    "columnName": "料金(円)"
                },
                "lesssonRest": {
                    "columnName": "残席",
                    "className": "scribedby"
                },
                "lessonStatus": {
                    "columnName": "状況"
                },
                "user_classwork_cost": {
                    "style": "display:none;"
                },
                "max_num": {
                    "style": "display:none;"
                },
                "start_time": {
                    "style": "display:none;"
                },
                "stage_no": {
                    "style": "display:none;"
                },
                "flower_cost": {
                    "style": "display:none;"
                },
                "user_classwork_cost_aj": {
                    "style": "display:none;"
                },
                "flower_cost_aj": {
                    "style": "display:none;"
                },
                "extension_cost": {
                    "style": "display:none;"
                },
                "level_no": {
                    "style": "display:none;"
                },
                "lesson_key": {
                    "style": "display:none;"
                },
                "pre_order_days": {
                    "style": "display:none;"
                },
                "stop_order_date": {
                    "style": "display:none;"
                },
                "end_time": {
                    "style": "display:none;"
                },
                "lesson_date": {
                    "style": "display:none;"
                },
                "order_students": {
                    "style": "display:none;"
                },
                "max_students": {
                    "style": "display:none;"
                },
                "min_students": {
                    "style": "display:none;"
                },
                "default_min_students": {
                    "style": "display:none;"
                },
                "min_num": {
                    "style": "display:none;"
                },
                "default_flower_cost": {
                    "style": "display:none;"
                },
                "default_user_classwork_cost": {
                    "style": "display:none;"
                },
                "level_no_present": {
                    "style": "display:none;"
                },
                "classwork_status": {
                    "style": "display:none;"
                },
                "user_work_status": {
                    "style": "display:none;"
                },
                "stage_no_present": {
                    "style": "display:none;"
                },
                "today": {
                    "style": "display:none;"
                },
                "id": {
                    "style": "display:none;"
                },
                "classwork_key": {
                    "style": "display:none;"
                },
                "level_key": {
                    "style": "display:none;"
                },
                "stage_key": {
                    "style": "display:none;"
                }
            }



// common.jsの
// customizeTableData
// 関数の第二引数でコールするための関数。

// 実際に予約授業一覧テーブルの置換を行う時の処理

//授業一覧データ
// var tableData = create_tag.json[LESSON_TABLE][TABLE_DATA_KEY];
// //授業ごと、受講者人数
// var timeTableStudents = commonFuncs.getTotalStudentsOfTimeTable(tableData);
// //テーブル置換処理
// commonFuncs.customizeTableData(tableData, this.customizeReserveLessonTable, timeTableStudents);



//挿入先ファイル:予約授業一覧ダイアログ作成jsファイル
	/* 
	 * 関数名:customizeReserveLessonListTable
	 * 概要  :会員トップページ、予約授業一覧テーブルのjsonに対して加工を行い、
	 		加工後のデータをjsonにセットする
	 * 引数  :tableName:値を加工する対象となるテーブルのjsonデータ
	 		 counter:カウンタ変数。加工する行を識別するのに使う
	 		 timeTableStudents:時限ごと受講生徒数
	 * 返却値  :なし
	 * 作成者:T.Yamamoto
	 * 作成日:2015.08.15
	 */
	this.customizeReserveLessonTable = function(tableData, counter, timeTableStudents) {
		// テーブルの値に入る連想配列(テーブルの値一覧)を変数に入れる
		var recordData = loopData[counter];
		// 開始日時と終了時刻を組み合わせた値を入れる
		var timeSchedule = commonFuncs.buildHourFromTo(recordData);
		var cost,			//料金
			rest,			//残席
		 	lessonStatus;	//状況
		//ユーザが予約不可の授業のとき、行の値を網掛けにして予約不可であることを示す。
		if(!recordData[COLUMN_NAME_DEFAULT_USER_CLASSWORK_COST]) {
			//料金を空白にする
			cost = "";
			//残席を罰にする
			rest = commonFuncs.restMarks[0];
			//状況を予約不可にする
			lessonStatus = commonFuncs.classworkStatuses[4];
		//ユーザが予約可能な授業の時、料金、残席、状況を適切な形にする
		} else {
			//料金を入れる
			cost = commonFuncs.sumCost(recordData);
			//残席を記号にする
			rest = commonFuncs.getRestMark(recordData, timeTableStudents);
			//状況を入れる
			lessonStatus = commonFuncs.getClassworkStatus(recordData, timeTableStudents);
		}
		//取得したデータをjsonに入れていく
		tableData[counter][START_END_TIME]	= timeSchedule;		//時間割開始と終了時刻
		tableData[counter][SUM_COST]		= cost;				//受講料
		tableData[counter][LESSON_POINT]	= rest;				//残席
		tableData[counter][LESSON_STATUS]	= lessonStatus;		//予約ステータス
	};
