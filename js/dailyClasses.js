/*
 * ファイル名:dailyClass.js
 * 概要:会員ページ、データベースから読込んだ予約テーブルの値を編集して表示する
 * 作成日:2015．06.13
 * 作成者:A.Honmura, T.Yamamoto
 */

var classworkStatuses = {
		0:"予約可能"
		,1:"開催済み"
		,2:"中止"
		,3:"中止"
		,4:"予約不可"
};

var userClassworkStatuses = {
	0:"予約済み"
	,1:"予約済み"
	,2:"受付"
	,3:"受講済み"
	,10:"キャンセル(本人)"
	,11:"キャンセル(管理者)"
	,12:"中止"
};


var noLongerBookable = "予約締切";
var fullHouse = "満席";

//テーブルから取り出す列名
COLUMN_NAME_MAX_NUM					= 'max_num';					// １限に予約できる最大の数
COLUMN_NAME_START_TIME				= 'start_time';					// 授業開始時間
COLUMN_NAME_END_TIME				= 'end_time';					// 授業終了時間
COLUMN_NAME_ORDER_STUDENTS			= 'order_students';				// 予約している生徒の数
COLUMN_NAME_MAX_STUDENTS			= 'max_students';				// 個別の予約できる最大の数
COLUMN_NAME_LESSON_DATE				= 'lesson_date';				// 授業受講日
COLUMN_NAME_USER_WORK_STATUS		= 'user_work_status';			// ユーザ授業ステータス
COLUMN_NAME_CLASSWORK_STATUS		= 'classwork_status';			// 授業ステータス
COLUMN_NAME_POINT_RATE				= 'point_rate';					// ポイントレート
COLUMN_NAME_STOP_ORDER_DATE			= 'stop_order_date';			// 授業締切日？
COLUMN_NAME_SCHOOL_NAME				= 'school_name';				// 店舗名
COLUMN_NAME_LESSON_NAME				= 'lesson_name';				//授業テーマ名
COLUMN_NAME_TODAY					= 'today';						// 今日の日付
COLUMN_DEFAULT_USER_CLASSWORK_COST	= 'default_user_classwork_cost';// デフォルト授業料
COLUMN_USER_CLASSWORK_COST			= 'user_classwork_cost';		// 授業料

var classworkCostColumns = [
	'user_classwork_cost'
	,'user_classwork_cost_aj'
	,'flower_cost'
	,'flower_cost_aj'
	,'extension_cost'
];

var defaultClassworkCostColumns = [
	'default_user_classwork_cost'
	,'default_flower_cost'
];

/* 
 * 関数名:getTotalStudentsOfTimeTable
 * 概要  :時間割ごとの生徒の合計人数を求める
 * 引数  :rowData:テーブル1行のデータ
 * 返却値:時間ごとの合計人数が入った連想配列
 * 作成者:T.Yamamoto
 * 作成日:2015.06.23
 */
var getTotalStudentsOfTimeTable = function(rowData) {
	//カウンターを作る
	var counter = 0;
	//時限の値を変数に入れる
	var lessonTime = rowData[counter][COLUMN_NAME_START_TIME];
	//生徒の数を連想配列に入れる
	var students = {};
	//生徒の数を0で初期化する
	students[lessonTime] = 0;

	//取り出した行の数だけループする
	$.each(rowData, function() {
		// 時限が同じときは合計の変数に足す
		if(lessonTime === rowData[counter][COLUMN_NAME_START_TIME]) {
			// 合計の変数に値を足す
			students[lessonTime] += Number(rowData[counter][COLUMN_NAME_ORDER_STUDENTS]);
		// 違う時限になった時の処理
		} else {
			// 時限の値を変数に入れる
			lessonTime = rowData[counter][COLUMN_NAME_START_TIME];
			//生徒の数を0で初期化する
			students[lessonTime] = 0;
		}
		//カウンタ変数をインクリメントする
		counter++;
	});
	// 生徒の合計人数を返す
	return students;
};

/**
 * 授業が中止かどうか判定する
 * @param string 授業ステータス
 * @return bool 中止かどうか
 */ 
function isCanceled(classworkStatus) {
	// 授業が中止するかどうかを見るための配列を作る
	var classworkCancelStatus = new Array(3,2)
	// 授業ステータスがキャンセルならtrueを返す
	 if($.inArray(classworkStatus, classworkCancelStatus) >= 0) {
		// if(classworkCancelStatus.indexOf(classworkStatus == -1)) {
		return true;
	}
	return false;
}

/**
 * 授業が開催済かどうか判定する
 * @param string 授業ステータス
 * @return bool 開催済かどうか
 */ 
function hasDone(classworkStatus) {
	// 授業が開催済みであればtrueを返す
	if(classworkStatus == 1) {
		return true;
	}
	return false;
}

/**
 * 連想配列に引数のキーがあるかどうか確認する
 * なかったら例外を吐く
 * @param mixed rowdata 授業情報を格納した連想配列
 * @param string target ターゲットのkey
 */ 
function isExist(rowData, target) {
	// 連想配列にtargetのkeyがなければ例外を投げる
	if(!target in rowData) {
		throw new Error("can't select status. no " + target);
	}
}

/**
 * 授業コマの残席を算出する
 * @param mixed rowdata 授業情報を(1時間割分全部)格納した連想配列
 * @param int timeTableStudents 時間割全体の予約人数
 * @return int 残席数
 */ 
function getRestOfSheets(rowData, timeTableStudents) {
	// 指定の時間割の数を取り出す
	var targetTimeSchedule = rowData[COLUMN_NAME_START_TIME];
	// max_num列がなければ例外処理をする
	isExist(rowData, COLUMN_NAME_MAX_NUM);
	// 最大人数を変数に入れる
	var maxNum = rowData[COLUMN_NAME_MAX_NUM];	//最大人数(時間割)
	// max_students列がなければ例外処理をする
	isExist(rowData, COLUMN_NAME_MAX_STUDENTS);
	// 授業コマの最大人数
	var maxStudents = rowData[COLUMN_NAME_MAX_STUDENTS];	//最大人数(授業コマ)
	// students列がなければ例外処理をする
	isExist(rowData, COLUMN_NAME_ORDER_STUDENTS);
	// 現在の予約人数を変数に入れる
	var students = rowData[COLUMN_NAME_ORDER_STUDENTS];	// 現予約人数
	// 時間割としての残りの人数
	var timeTableRest = maxNum - timeTableStudents[targetTimeSchedule];	// 時間割としての残り
	var classworkRest = maxStudents - students;	// 授業コマとしての残り
	// 時間割としてのが授業コマとしての数以下であるなら時間割基準の人数を返す
	if(timeTableRest <= classworkRest) {
		return timeTableRest;
	}
	
	return classworkRest;
}

/**
 * 満席かどうか判定する
 * @param mixed rowdata 授業情報を格納した連想配列
 * @return bool 満席かどうか
 */ 
 function isFull(rowData, timeTableStudents) {
 	// 残席が0以下であればtrueを返す
	if(getRestOfSheets(rowData, timeTableStudents) <= 0) {
		return true;
	}
	return false;
}

/**************************共通jsに移したら消しといて**************************
function toDateYYYY-MM-DD(dateStr) {
	var dateArr = dateStr.split("-");
	return new Date(dateArr[0]-0,dateArr[1]-1,dateArr[2]-0);
}

/**
 * Dateオブジェクトと加算日からn日後、n日前を求める関数
 * @param date 操作対象の日付
 * @param int addDays 加算日。マイナス指定でn日前も設定可能
 * @return 求まったdateオブジェクト
 */
function computeDate(date, addDays) {
    var baseSec = date.getTime();
    var addSec = addDays * 86400000; // 日数 * 1日のミリ秒数
    var targetSec = baseSec + addSec;
    date.setTime(targetSec);
    return date;
}

function isBookable(rowData) {
	isExist(rowData, COLUMN_NAME_LESSON_DATE);
	var lessonDateStr = rowData[COLUMN_NAME_LESSON_DATE];	// レッスン日
	var lessonDate = new Date(lessonDateStr);
	isExist(rowData, COLUMN_NAME_STOP_ORDER_DATE);
	var stopOrderDate = rowData[COLUMN_NAME_STOP_ORDER_DATE];	// 締切日数
	isExist(rowData, COLUMN_NAME_TODAY);
	var todayStr = rowData[COLUMN_NAME_TODAY];	// 今日
	var today = new Date(todayStr);
	
	// レッスン日の締切日数前を過ぎてたら締切
	var limitDate = computeDate(lessonDate, -1 * stopOrderDate);
	if(today.getTime() >= limitDate.getTime()) {
		return false;
	}
	return true;
}

/*
* 授業のステータスを表す文字列を取得する
* @param mixed rowdata 授業情報を格納した連想配列
* @param int timeTableStudents 時間割全体の予約人数
* @return string ステータス文字列
*/ 
function getClassworkStatus(rowData, timeTableStudents) {
	if (rowData[COLUMN_NAME_MAX_NUM] == 0) {
		return classworkStatuses[2];
	}
	// 授業コマステータス中止は問答無用で"中止"を表示
	isExist(rowData, COLUMN_NAME_CLASSWORK_STATUS);
	// 授業の状態を変数に入れる
	var classworkStatus = rowData[COLUMN_NAME_CLASSWORK_STATUS];
	// 授業が中止であるなら中止であることの結果を返す
	if(isCanceled(classworkStatus)) {
		return classworkStatuses[classworkStatus];
	}
	
	// 予約ステータス取得 
	isExist(rowData, COLUMN_NAME_USER_WORK_STATUS);
	var userClassworkStatus = rowData[COLUMN_NAME_USER_WORK_STATUS];
	
	// 授業終了時の判断
	if(hasDone(classworkStatus)) {
		if(userClassworkStatus) {
			return userClassworkStatuses[userClassworkStatus];
		}
		return classworkStatuses[classworkStatus];
	}
	
	if(isFull(rowData, timeTableStudents)) {
		return fullHouse;
	}
	
	// 締め切られてないかの判断
	if(isBookable(rowData)) {
		if(userClassworkStatus) {
			return userClassworkStatuses[userClassworkStatus];
		}
		return classworkStatuses[classworkStatus];
	}
	
	return noLongerBookable;	// 締切リターン
}

/*
* 授業の残席を表す文字を取得する
* @param mixed rowdata 授業情報を格納した連想配列
* @param int timeTableStudents 時間割全体の予約人数
* @return string 残席文字
*/ 
function getRestMark(rowData, timeTableStudents) {
	var rest = getRestOfSheets(rowData, timeTableStudents);
	var restMark = "";
	if (lessonStatus == '予約締切' || 
		rowData[COLUMN_NAME_MAX_NUM] == 0 ||
		rowData[COLUMN_NAME_CLASSWORK_STATUS] == 1 ||
		rowData[COLUMN_NAME_CLASSWORK_STATUS] == 2 ||
		rowData[COLUMN_NAME_CLASSWORK_STATUS] == 3) {
		restMark = restMarks[0];
	} else {
		for(var key in restMarks) {
			if(key > rest) {
				break;
			}
			restMark = restMarks[key];
		}
	}
	return restMark;
};

/* 
 * 関数名:getPoint
 * 概要  :ポイントを取得するための関数
 * 引数  :targetKey:対象のテーブル(型は連想配列)
 		 :sumCost 料金の合計
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.06.14
 */
var getPoint = function (targetTable, sumCost) {
	// 列にあるポイントレートを変数に入れる
	var pointRate = targetTable[COLUMN_NAME_POINT_RATE];
	// 料金とレートをかけて100で割り、結果を求める
	var resultPoint = sumCost * pointRate / 100;
	// 四捨五入する
	resultPoint = Math.round(resultPoint);
	// 求めたポイントを返す
	return resultPoint;
};

/*
 * 1行中の各料金の合計を得る
 * @param rowData mixed 対象の列
 * @return int 料金合計
 */
var sumCost = function(rowData) {
	isExist(rowData, COLUMN_USER_CLASSWORK_COST);
	// 予約済でないならデフォルトの値を使う
	if(rowData[COLUMN_USER_CLASSWORK_COST] === "") {
		return getDefaultCost(rowData);
	}
	
	var result = 0;
	for (var i = 0; i < classworkCostColumns.length; i ++) {
		isExist(rowData, classworkCostColumns[i]);
		result += Number(rowData[classworkCostColumns[i]]);
		
	}
	return result;
};

/*
 * 1行中の各デフォルト料金の合計を得る
 * @param rowData mixed 対象の列
 * @return int デフォルト料金合計
 */
var getDefaultCost = function(rowData) {
	var result = 0;
	for (var i = 0; i < defaultClassworkCostColumns.length; i ++) {
		isExist(rowData, defaultClassworkCostColumns[i]);
		result += Number(rowData[defaultClassworkCostColumns[i]]);
		
	}
	return result;
}

/* 
 * 関数名:backThreeStringDelete
 * 概要  :第一引数の配列から第二引数のキーの値について、その値の後ろから3文字を削除する
 * 引数  :rowData:連想配列名。テーブルから取り出した値
 		:columnName:テーブルの列名(連想配列のキー名)
 * 返却値  :resultString: 後ろから3文字を削除した結果の文字列
 * 用途例:11:00:00 となっているところの後ろの「:00」を削除する
 * 作成者:T.Yamamoto
 * 作成日:2015.06.13
 */
function backThreeStringDelete(rowData, columnName) {
	// 第一引数の連想配列に対して、第二引数の値を返却結果変数に入れる
	var resultString = rowData[columnName];
	// 値の後ろから3文字削除した文字列を結果の変数に入れる
	resultString = resultString.substr(0, (resultString.length-3));
	// 結果の文字列を返す
	return resultString;
}

/* 
 * 関数名:frontTwoStringDelete
 * 概要  :第一引数の配列から第二引数のキーの値について、その値の前から2文字を削除する
 * 引数  :rowData:連想配列名。テーブルから取り出した値
 		:columnName:テーブルの列名(連想配列のキー名)
 * 返却値  :resultString: 後ろから3文字を削除した結果の文字列
 * 用途例:2015:0613となっているところの前の「20」を削除する
 * 作成者:T.Yamamoto
 * 作成日:2015.06.13
 */
function frontTwoStringDelete(rowData, columnName) {
	// 第一引数の連想配列に対して、第二引数の値を返却結果変数に入れる
	var resultString = rowData[columnName];
	// 値の前から2文字削除した文字列を結果の変数に入れる
	resultString = resultString.substr(2, (resultString.length));
	// 結果の文字列を返す
	return resultString;
}

/* 
 * 関数名:buildHourFromTo
 * 概要  :時間割を求める
 * 引数  :rowData:連想配列名。テーブルから取り出した値
 * 返却値  :resultTimeschedule : 時間割の結果
 * 作成者:T.Yamamoto
 * 作成日:2015.06.13
 */
var buildHourFromTo = function(rowData) {
	// 時間割の始まりの時間を求める
	var start_time = backThreeStringDelete(rowData, COLUMN_NAME_START_TIME);
	// 時間割の終わりの時間を求める
	var end_time = backThreeStringDelete(rowData, COLUMN_NAME_END_TIME);
	// 時間割の結果を求める
	var resultTimeschedule = start_time + '-' + end_time;
	return resultTimeschedule;
};

/* 
 * 関数名:allDateTime
 * 概要  :年月日と開始時間、終了時間を返す
 * 引数  :rowData:連想配列名。テーブルから取り出した値
 		:columnName:テーブルの列名(連想配列のキー名)
 * 返却値  :resultString: 後ろから3文字を削除した結果の文字列
 * 用途例:11:00:00 となっているところの後ろの「:00」を削除する
 * 作成者:T.Yamamoto
 * 作成日:2015.06.13
 */
var allDateTime = function (rowData) {
	// 結果となる変数を用意する
	var result;
	//日付の前2文字を削除する(2015-01-01を15-01-01と表記したいため)
	result = frontTwoStringDelete(rowData, COLUMN_NAME_LESSON_DATE);
	//空白スペースを入れて見やすくする
	result += ' ';
	//時間の後ろ3文字を消す(12:00:00の「:00」を削除する)
	result += buildHourFromTo(rowData);
	//結果を返す
	return result;
};

/* 
 * 関数名:callReservedLessonValue
 * 概要  :会員側予約テーブルについてデータベースから取り出した値を入れる関数をコールする
 * 引数  :tableName:値を置換する対象となるテーブルのcssクラス名
 		 loopData:ループ対象となるテーブルの行全体の連想配列
 		 counter:カウンタ変数
 		 rowNumber:行番号
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.06.13
 */
var callReservedLessonValue = function(tableName, loopData, counter, rowNumber, timeTableStudents) {
	// テーブルの値に入る連想配列(テーブルの値一覧)を変数に入れる
	recordData = loopData[counter];
	// 開始日時と終了時刻を組み合わせた値を入れる
	timeSchedule = buildHourFromTo(recordData);
	var cost;			//料金
	var rest;			//残席
	// var lessonStatus;	//状況
	//ユーザが予約不可の授業のとき、行の値を網掛けにして予約不可であることを示す。
	if(!recordData[COLUMN_DEFAULT_USER_CLASSWORK_COST]) {
		//料金を空白にする
		cost = "";
		//残席を罰にする
		rest = restMarks[0];
		//状況を予約不可にする
		lessonStatus = classworkStatuses[4];
	//ユーザが予約可能な授業の時、料金、残席、状況を適切な形にする
	} else {
		//料金を入れる
		cost = sumCost(recordData);
		//状況を入れる
		lessonStatus = getClassworkStatus(recordData, timeTableStudents);
		//残席を記号にする
		rest = getRestMark(recordData, timeTableStudents);
	}
	//残席がバツのときにはクリックできないことを分かりやすくするために行の背景をグレーにする
	if(rest == restMarks[0]) {
		//行の色をグレーっぽくする
		$(tableName + ' tr:eq(' + rowNumber + ')').css('background', '#EDEDED');
	}
	// 開始日時と終了時間を合わせてテーブルの最初のカラムに値を入れる
	$(tableName + ' tr:eq(' + rowNumber + ') td').eq(0).text(timeSchedule);
	// 料金の表示を正規の表示にする
	$(tableName + ' tr:eq(' + rowNumber + ') td').eq(3).text(cost);
	// 残席の表示を正規の表示にする
	$(tableName + ' tr:eq(' + rowNumber + ') td').eq(4).text(rest);
	// 残席の表示を正規の表示にする
	$(tableName + ' tr:eq(' + rowNumber + ') td').eq(5).text(lessonStatus);
};

/* 
 * 関数名:callMemberLessonValue
 * 概要  :予約中テーブルと予約済みテーブルでセルに値を入れる関数を実行するための関数
 * 引数  :tableName:値を置換する対象となるテーブルのcssクラス名
 		 loopData:ループ対象となるテーブルの行全体の連想配列
 		 counter:カウンタ変数
 		 rowNumber:行番号
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.06.18
 */
var callMemberLessonValue = function(tableName, loopData, counter, rowNumber) {
	// テーブルの値に入る連想配列(テーブルの値一覧)を変数に入れる
	recordData = loopData[counter];
	// 開始日時と終了時刻を組み合わせた値を入れる
	allDay = allDateTime(recordData);
	// 料金を求める
	var cost = 0;
	if(recordData[COLUMN_DEFAULT_USER_CLASSWORK_COST] === "") {
		cost = "";
	} else {
		cost = sumCost(recordData);
	}
	// ポイントを求める
	var point = 0;
	if(cost) {
		point = getPoint(recordData, cost);
	}
	// 開始日時と終了時間を合わせてテーブルの最初のカラムに値を入れる
	$(tableName + ' tr:eq(' + rowNumber + ') td').eq(0).text(allDay);
	// 料金の表示を正規の表示にする
	$(tableName + ' tr:eq(' + rowNumber + ') td').eq(3).text(cost);
	// ポイントの表示を正規の表示にする
	$(tableName + ' tr:eq(' + rowNumber + ') td').eq(4).text(point);
};

/* 
 * 関数名:callEachDayReservedValue
 * 概要  :管理者日ごと予約者一覧テーブルの値を置換する
 * 引数  :tableName:値を置換する対象となるテーブルのcssクラス名
 		 loopData:ループ対象となるテーブルの行全体の連想配列
 		 counter:カウンタ変数
 		 rowNumber:行番号
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.06.22
 */
var callEachDayReservedValue = function(tableName, loopData, counter, rowNumber) {
	// テーブルの値に入る連想配列(テーブルの値一覧)を変数に入れる
	recordData = loopData[counter];
	// 時間割の始まりの時間を求める
	start_time = backThreeStringDelete(recordData, COLUMN_NAME_START_TIME);
	// 時間割の終わりの時間を求める
	end_time = backThreeStringDelete(recordData, COLUMN_NAME_END_TIME);
	//ユーザステータスの番号を取得する
	userStatusNumber = recordData[COLUMN_NAME_USER_WORK_STATUS]
	//ユーザのステータスを取得する
	userStatus = userClassworkStatuses[userStatusNumber];
	// No.を入力する
	$(tableName + ' tr:eq(' + rowNumber + ') td').eq(0).text(rowNumber);
	// 開始時間を表示する
	$(tableName + ' tr:eq(' + rowNumber + ') td').eq(2).text(start_time);
	// 終了時間を表示する
	$(tableName + ' tr:eq(' + rowNumber + ') td').eq(3).text(end_time);
	//ユーザステータスを表示する
	$(tableName + ' tr:eq(' + rowNumber + ') td').eq(6).text(userStatus);
};

/* 
 * 関数名:callAdminReservedLessonValue
 * 概要  :会員側予約テーブルについてデータベースから取り出した値を入れる関数をコールする
 * 引数  :tableName:値を置換する対象となるテーブルのcssクラス名
 		 loopData:ループ対象となるテーブルの行全体の連想配列
 		 counter:カウンタ変数
 		 rowNumber:行番号
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.07.07
 */
var callAdminReservedLessonValue = function(tableName, loopData, counter, rowNumber, timeTableStudents) {
	// テーブルの値に入る連想配列(テーブルの値一覧)を変数に入れる
	recordData = loopData[counter];
	//レッスンテーマ名または店舗名が空であるならばその行を表示しなくする
	if(recordData[COLUMN_NAME_LESSON_NAME] =="" || recordData[COLUMN_NAME_SCHOOL_NAME] == "") {
		//授業情報があいまいなものは表示しないクラスを取得する
		$(tableName + ' tr:eq(' + rowNumber + ')').addClass('displayNone');
	//しっかりとした授業情報があれば表示する
	} else {
		// 開始日時と終了時刻を組み合わせた値を入れる
		timeSchedule = buildHourFromTo(recordData);
		//状況を入れる
		lessonStatus = getClassworkStatus(recordData, timeTableStudents);
		//残席を記号にする
		rest = getRestMark(recordData, timeTableStudents);
		// 開始日時と終了時間を合わせてテーブルの最初のカラムに値を入れる
		$(tableName + ' tr:eq(' + rowNumber + ') td').eq(0).text(timeSchedule);
		// 残席の表示を正規の表示にする
		$(tableName + ' tr:eq(' + rowNumber + ') td').eq(3).text(rest);
		// 残席の表示を正規の表示にする
		$(tableName + ' tr:eq(' + rowNumber + ') td').eq(4).text(lessonStatus);
	}
};

/* 
 * 関数名:callLecturePermitValue
 * 概要  :受講承認テーブルに値入れるための関数
 * 引数  :tableName:値を置換する対象となるテーブルのcssクラス名
 		 loopData:ループ対象となるテーブルの行全体の連想配列
 		 counter:カウンタ変数
 		 rowNumber:行番号
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.07.15
 */
var callLecturePermitValue = function(tableName, loopData, counter, rowNumber) {
	// テーブルの値に入る連想配列(テーブルの値一覧)を変数に入れる
	recordData = loopData[counter];
	// 開始日時と終了時刻を組み合わせた値を入れる
	allDay = allDateTime(recordData);
	//連番を入れる
	$(tableName + ' tr:eq(' + rowNumber + ') td').eq(1).text(rowNumber);
	// 開始日時と終了時間を合わせてテーブルの最初のカラムに値を入れる
	$(tableName + ' tr:eq(' + rowNumber + ') td').eq(2).text(allDay);
};

/* 
 * 関数名:callPermitLessonListValue
 * 概要  :受講承認一覧テーブルに表示されている値を変換する
 * 引数  :tableName:値を置換する対象となるテーブルのcssクラス名
 		 loopData:ループ対象となるテーブルの行全体の連想配列
 		 counter:カウンタ変数
 		 rowNumber:行番号
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.07.20
 */
var callPermitLessonListValue = function(tableName, loopData, counter, rowNumber) {
	// テーブルの値に入る連想配列(テーブルの値一覧)を変数に入れる
	recordData = loopData[counter];
	//連番を入れる
	$(tableName + ' tr:eq(' + rowNumber + ') td').eq(0).text(rowNumber);
	//テーマの値が空白のとき、その列に後にセレクトボックスをアペンドするために対してクラスをつける。
	if(recordData.lesson_name == "") {
		//クラスappendSelectboxをつけてアペンド対象であることを分かりやすくする
		$(tableName + ' tr:eq(' + rowNumber + ') td').eq(2).addClass('appendSelectbox');
	}
};

/* 
 * 関数名:dbDataTableReplaceExecute
 * 概要  :dbから取り出したテーブルについてクライアント側で置換させる
 * 引数  :
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.06.13
 */
function dbDataTableReplaceExecute(tableName, rowData, func, timeTableStudents) {
	// カウンターを作る
	var counter = 0;
	// テーブルの行番号
	var rowNumber = 1;
	// テーブルのすべての行に対してループで値を入れる
	$.each(rowData, function() {
		// テーブルの値を変える関数をコールする
		eval(func)(tableName, rowData, counter, rowNumber, timeTableStudents);
		// 行番号をインクリメントする
		rowNumber++;
		// カウンタ変数をインクリメントする
		counter++;
	});
}
