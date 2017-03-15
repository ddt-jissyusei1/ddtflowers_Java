<?php
require_once "JSONDBManager.php";


// MYSQLアクセスクラス
class ModelMysql {
	// 接続パラメータ
	private static $server = DB_HOST;         //'localhost';
	private static $username = DB_USER;       //'ddtcom';
	private static $password = DB_PASSWORD;   //'ddthink1221';
	private static $db = DB_DATABASE;         //'ddtcom';
	// 各種処理変数
	private static $connect = null; // 接続ID
	private static $tran = false; // トランザクション開始フラグ
	private static $table_col = null; // 列情報取得済みテーブル
	private static $cols = null; // 列情報
	public static $error = ''; // エラー内容

    const REC_STATUS_ALLIVE = 0;

	//
	// メソッド名   ：set_error
	// 概要         ：エラーセット
	// 戻り値       ：なし
	// 引数         ：$note=null
	//                補足メッセージ
	// 履歴         ：2010/02/19      林　直貴          新規作成
	//
	public static function set_error($note=null) {
		// MYSQLのエラー番号とエラーメッセージを設定
		self::$error = 'mysql errno:' . mysql_errno() . ' message:' . mysql_error();
		// 補足メッセージがあれば、追加
		if($note) self::$error .= '[' . $note . ']';
	}

	//
	// メソッド名   ：connect
	// 概要         ：接続
	// 戻り値       ：なし
	// 引数         ：なし
	// 履歴         ：2010/02/19      林　直貴          新規作成
	//
	public static function connect() {
		// 接続済みならば、リターン
		if(self::$connect) return;
		// 接続
		self::$connect = mysql_connect(self::$server, self::$username, self::$password);
		if(! self::$connect) {
			// 接続失敗
			self::set_error();
			throw new Exception('connect:接続失敗', 101);
		}


		//文字コードをセット
		//mysql_query(SET_NAMES_ENCODE);

		// DB選択
		$result = mysql_select_db(self::$db, self::$connect);
		if(! $result) {
			// 失敗
			self::set_error();
			mysql_close(self::$connect); // 切断
			self::$connect = null; // 接続済み情報クリア
			throw new Exception('connect:DB選択失敗', 101);
		}
	}

	//
	// メソッド名   ：disconnect
	// 概要         ：切断
	// 戻り値       ：なし
	// 引数         ：なし
	// 履歴         ：2010/02/19      林　直貴          新規作成
	//
	public static function disconnect() {
		// 未接続は、リターン
		if(self::$connect == null) return;
		// 切断
		$result = mysql_close(self::$connect);
		if(! $result) {
			// 失敗
			self::set_error();
			throw new Exception('disconnect:切断失敗', 101);
		}
		// トランザクション開始と接続情報クリア
		self::$tran = false;
		self::$connect = null;
	}

	//
	// メソッド名   ：query
	// 概要         ：クエリー実行
	// 戻り値       ：mysql_queryの戻り値
	// 引数         ：$sql
	//                実行SQL
	// 履歴         ：2010/02/19      林　直貴          新規作成
	//
	public static function query($sql) {
		// 未接続の場合、接続
		if(! self::$connect) self::connect();
		//ログ出力
		$message = Date("Y-m-d h:i:s") . " : ";
		$message .= $sql . "\n";
		// ログ出力
		error_log($message);

		// クエリー実行
		$result = mysql_query($sql);
		if(! $result) {
			// 失敗
			self::set_error($sql);
			throw new Exception('query:'.$sql, 101);
		}
		// mysql_queryの結果を返却
		return $result;
	}

	//
	// メソッド名   ：begin
	// 概要         ：トランザクション開始
	// 戻り値       ：なし
	// 引数         ：なし
	// 履歴         ：2010/02/19      林　直貴          新規作成
	//
	public static function begin() {
		// 既に開始済みならば、リターン
		if(self::$tran) return;
		// BEGINのクエリー実行
		self::query('BEGIN');
		// トランザクション開始フラグ設定
		self::$tran = true;
	}

	//
	// メソッド名   ：commit
	// 概要         ：コミット
	// 戻り値       ：なし
	// 引数         ：なし
	// 履歴         ：2010/02/19      林　直貴          新規作成
	//
	public static function commit() {
		// トランザクションが開始されていなければ、リターン
		if(! self::$tran) return;
		// COMMITのクエリー実行
		self::query('COMMIT');
		// トランザクション開始フラグクリア
		self::$tran = false;
	}

	//
	// メソッド名   ：rollback
	// 概要         ：ロールバック
	// 戻り値       ：なし
	// 引数         ：なし
	// 履歴         ：2010/02/19      林　直貴          新規作成
	//
	public static function rollback() {
		// トランザクションが開始されていなければ、リターン
		if(! self::$tran) return;
		// ROLLBACKのクエリー実行
		self::query('ROLLBACK');
		// トランザクション開始フラグクリア
		self::$tran = false;
	}

	//
	// メソッド名   ：get_names
	// 概要         ：カラム名取得
	// 戻り値       ：カラム名の配列
	// 引数         ：$cur
	//                queryでSELECTを実行した場合の戻り値
	// 履歴         ：2010/02/19      林　直貴          新規作成
	//
	public static function get_names($cur) {
		// 未接続ならば、例外発生
		if(! self::$connect) throw new Exception('get_nemes:未接続', 101);
		// 結果配列初期化
		$n = array();
		// mysql_fetch_fieldにより、カラム名取得
		while($result = mysql_fetch_field($cur)) {
			$n[] = $result->name;
		}
		// カラム名配列返却
		return $n;
	}

	//
	// メソッド名   ：fetch_assoc
	// 概要         ：フェッチ(連想配列)
	// 戻り値       ：レコードデータの連想配列,失敗/データ終了:false
	// 引数         ：$cur
	//                queryでSELECTを実行した場合の戻り値
	// 履歴         ：2010/02/19      林　直貴          新規作成
	//
	public static function fetch_assoc($cur) {
		// 未接続ならば、例外発生
		if(! self::$connect) throw new Exception('fetch_assoc:未接続', 101);
		// mysql_fetch_arrayの結果を返却
		return mysql_fetch_array($cur, MYSQL_ASSOC);
	}

	//
	// メソッド名   ：fetch_num
	// 概要         ：フェッチ(通常配列)
	// 戻り値       ：レコードデータの配列,失敗/データ終了:false
	// 引数         ：$cur
	//                queryでSELECTを実行した場合の戻り値
	// 履歴         ：2010/02/19      林　直貴          新規作成
	//
	public static function fetch_num($cur) {
		// 未接続ならば、例外発生
		if(! self::$connect) throw new Exception('fetch_num:未接続', 101);
		// mysql_fetch_rowの結果を返却
		return mysql_fetch_row($cur);
	}

	//
	// メソッド名   ：close
	// 概要         ：クローズ
	// 戻り値       ：なし
	// 引数         ：$cur
	//                queryでSELECTを実行した場合の戻り値
	// 履歴         ：2010/02/19      林　直貴          新規作成
	//
	public static function close($cur) {
		// SELECTのメモリ開放
		mysql_free_result($cur);
	}

	//
	// メソッド名   ：select_one
	// 概要         ：単一SELECT
	// 戻り値       ：レコードデータの連想配列,データ無し/失敗:false
	// 引数         ：$select
	//                SELECTのSQL
	// 履歴         ：2010/02/19      林　直貴          新規作成
	//
	public static function select_one($select) {
		// SELECTクエリー実行
		$cur = self::query($select);
		// FETCH
		$result = mysql_fetch_array($cur, MYSQL_ASSOC);
		// メモリ開放
		mysql_free_result($cur);
		// FETCHの結果返却
		return $result;
	}

	//
	// メソッド名   ：select_all
	// 概要         ：複数SELECT
	// 戻り値       ：レコードデータの連想配列の配列
	// 引数         ：$select
	//                SELECTのSQL
	// 履歴         ：2010/02/19      林　直貴          新規作成
	//
	public static function select_all($select) {
		// SELECTクエリー実行
		$cur = self::query($select);
		// 結果配列初期化
		$a = array();
		// データのある間FETCH
		while($result = mysql_fetch_array($cur, MYSQL_ASSOC)) {
			$a[] = $result; // 結果追加
		}
		// メモリ開放
		mysql_free_result($cur);
		// 結果配列の返却
		return $a;
	}

	//
	// メソッド名   ：get_all_rows
	// 概要         ：全体件数取得
	// 戻り値       ：SQL_CALC_FOUND_ROWSオプションでSELECTした場合の全体件数
	// 引数         ：なし
	// 履歴         ：2010/02/19      林　直貴          新規作成
	//
	public static function get_all_rows() {
		// クエリ実行
		$cur = self::query('SELECT FOUND_ROWS()');
		// FETCH
		$result = mysql_fetch_row($cur);
		// メモリ開放
		mysql_free_result($cur);
		// FETCH結果チェック
		if(! $result) return 0;
		// 結果返却
		return $result[0];
	}

	//
	// メソッド名   ：get_rows
	// 概要         ：処理件数取得
	// 戻り値       ：直前の処理件数
	// 引数         ：なし
	// 履歴         ：2010/02/19      林　直貴          新規作成
	//
	public static function get_rows() {
		// 未接続は、例外発生
		if(! self::$connect) throw new Exception('get_rows:未接続', 101);
		// mysql_affected_rowsの結果返却
		return mysql_affected_rows(self::$connect);
	}

	//
	// メソッド名   ：get_insert_id
	// 概要         ：挿入ID取得
	// 戻り値       ：直前のauto_incrementのID,失敗:false
	// 引数         ：なし
	// 履歴         ：2010/02/19      林　直貴          新規作成
	//
	public static function get_insert_id() {
		// 未接続は、例外発生
		if(! self::$connect) throw new Exception('get_insert_id:未接続', 101);
		// mysql_insert_idの結果返却
		return mysql_insert_id(self::$connect);
	}

	//
	// メソッド名   ：get_col_inf
	// 概要         ：列情報取得
	// 戻り値       ：列情報,失敗:false
	// 引数         ：$tname
	//                テーブル名
	// 引数         ：$cname
	//                列名
	// 履歴         ：2010/02/19      林　直貴          新規作成
	//
	public static function get_col_inf($tname, $cname) {

		// テーブル情報取得
		if($tname != self::$table_col) {
			// 未取得の場合実行

			// クエリーによりテーブル情報取得
			$cur = self::query('SHOW COLUMNS FROM ' . $tname);

			// レコードのある間FETCH
			$a = array();
			while($row = mysql_fetch_row($cur)) {
				$key = array_shift($row); // 列名をキーにして、
				$a[$key] = $row; // 連想配列を作成
			}

			// メモリ開放
			mysql_free_result($cur);

			// バックアップ
			self::$table_col = $tname;
			self::$cols = $a;
		}

		// 列情報返却
		if(isset(self::$cols[$cname])) {
			// 該当列情報がある場合
			return self::$cols[$cname];
		} else { // 該当列情報がない場合
			return null;
		}
	}

//
// メソッド名   ：select_one2
// 概要         ：単一SELECT(get_select()連動)
//                同引数で、get_selectでSQLを生成して、select_oneを呼び出す
// 戻り値       ：レコードデータの連想配列,データ無し:array()
// 引数         ：$items
//                取得列項目(配列可)
// 引数         ：$from
//                FROM句
// 引数         ：$where
//                WHERE句(項目名,比較演算子,比較値,比較値をシングルクォートで囲む有無true/false)配列の配列も可能
// 引数         ：$table=''
//                取得テーブル名(JOINを使用した検索など、rec_status条件の曖昧回避に使用、通常は、省略可能)
// 引数         ：$order=''
//                ORDER BY句(省略可能)
// 引数         ：$start=0
//                取得開始レコード(1回に取得するレコード数を制限する場合)
// 引数         ：$num=0
//                取得最大レコード数(1回に取得するレコード数を制限する場合)
// 引数         ：$c_rows=false
//                検索時、SQL_CALC_FOUND_ROWSを指定するかどうかのフラグ
// 引数         ：$group=''
//                GROUP BY句
// 履歴         ：2010/02/19      林　直貴          新規作成
//
public static function select_one2($items, $from, $where, $table='', $order='', $start=0, $num=0, $c_rows=false, $group='') {
	// get_select()で取得したSQLをそのまま利用してselect_oneを呼び出す
	return self::select_one(self::get_select($items, $from, $where, $table, $order, $start, $num, $c_rows, $group));
}

//
// メソッド名   ：select_all2
// 概要         ：複数SELECT(get_select()連動)
//                同引数で、get_selectでSQLを生成して、select_allを呼び出す
// 戻り値       ：レコードデータの連想配列の配列
// 引数         ：$items
//                取得列項目(配列可)
// 引数         ：$from
//                FROM句
// 引数         ：$where
//                WHERE句(項目名,比較演算子,比較値,比較値をシングルクォートで囲む有無true/false)配列の配列も可能
// 引数         ：$table=''
//                取得テーブル名(JOINを使用した検索など、rec_status条件の曖昧回避に使用、通常は、省略可能)
// 引数         ：$order=''
//                ORDER BY句(省略可能)
// 引数         ：$start=0
//                取得開始レコード(1回に取得するレコード数を制限する場合)
// 引数         ：$num=0
//                取得最大レコード数(1回に取得するレコード数を制限する場合)
// 引数         ：$c_rows=false
//                検索時、SQL_CALC_FOUND_ROWSを指定するかどうかのフラグ
// 引数         ：$group=''
//                GROUP BY句
// 履歴         ：2010/02/19      林　直貴          新規作成
//
public static function select_all2($items, $from, $where, $table='', $order='', $start=0, $num=0, $c_rows=false, $group='') {
	// get_select()で取得したSQLをそのまま利用してselect_allを呼び出す
	return self::select_all(self::get_select($items, $from, $where, $table, $order, $start, $num, $c_rows, $group));
}

//
// メソッド名   ：insert
// 概要         ：INSERT文実行
//                get_insertでSQLを生成し、queryを呼ぶ
// 戻り値       ：mysql_queryの戻り値
// 引数         ：$table
//                挿入先テーブル名
// 引数         ：$items
//                列項目リスト(配列可)
// 引数         ：$values
//                値項目リスト(値, 値をシングルクォートで囲む有無true/false)配列の配列可
// 履歴         ：2010/02/19      林　直貴          新規作成
//
public function insert($table, $items, $values) {
	// get_insert()で取得したSQLをそのまま利用してqueryを呼び出す
	return self::query(self::get_insert($table, $items, $values));
}

//
// メソッド名   ：insert2
// 概要         ：INSERT文実行
//                get_items_valuesで列リストと項目リストに分離し、get_insertでSQLを生成し、queryを呼ぶ
// 戻り値       ：mysql_queryの戻り値
// 引数         ：$table
//                挿入先テーブル名
// 引数         ：$it_vals
//                列名、値項目リスト(列名, 値, 値をシングルクォートで囲む有無true/false)配列の配列可
//引数			：$create_user
//				クリエイトユーザー番号	2011-07-30	shou
// 履歴         ：2010/02/19      林　直貴          新規作成
//
public function insert2($table, $it_vals, $create_user=0) {
	// 列リスト、項目リスト分離
	list($items, $values) = self::get_items_values($it_vals);
	// get_insert()で取得したSQLをそのまま利用してqueryを呼び出す
	return self::query(self::get_insert($table, $items, $values, $create_user));
}

//
// メソッド名   ：update
// 概要         ：UPDATE文実行
//                get_updateでSQLを生成し、queryを呼び出す
// 戻り値       ：mysql_queryの戻り値
// 引数         ：$table
//                更新先テーブル名
// 引数         ：$set
//                SET句(列名, 値, 値をシングルクォートで囲む有無true/false)配列の配列可
// 引数         ：$where
//                WHERE句(項目名,比較演算子,比較値,比較値をシングルクォートで囲む有無true/false)配列の配列も可能
// 履歴         ：2010/02/19      林　直貴          新規作成
//
public function update($table, $set, $where, $ignoreDeleted = false) {
	// get_update()で取得したSQLをそのまま利用してqueryを呼び出す

	//2011-07-03 shou add
	$sql = self::get_update($table, $set, $where, $ignoreDeleted);

	//$message = Date("Y-m-d h:i:s") . " : ";
	//$message .= $sql . "\n";
	// ログ出力
	//error_log($message, 3, '../' . FsConst::fnSqlLogFile);

	//return self::query(self::get_update($table, $set, $where));
	return self::query($sql);
}

//
// メソッド名   ：delete
// 概要         ：DELETE文実行
//                get_deleteでSQLを生成し、queryを呼び出す
// 戻り値       ：mysql_queryの戻り値
// 引数         ：$table
//                削除テーブル名
// 引数         ：$where
//                WHERE句(項目名,比較演算子,比較値,比較値をシングルクォートで囲む有無true/false)配列の配列も可能
// 履歴         ：2010/02/19      林　直貴          新規作成
//
public function delete($table, $where) {
	// get_delete()で取得したSQLをそのまま利用してqueryを呼び出す
	return self::query(self::get_delete($table, $where));
}

//
// メソッド名   ：get_select
// 概要         ：SLECT文生成
// 戻り値       ：SQL
// 引数         ：$items
//                取得列項目(配列可)
// 引数         ：$from
//                FROM句
// 引数         ：$where
//                WHERE句(項目名,比較演算子,比較値,比較値をシングルクォートで囲む有無true/false)配列の配列も可能
// 引数         ：$table=''
//                取得テーブル名(JOINを使用した検索など、rec_status条件の曖昧回避に使用、通常は、省略可能)
// 引数         ：$order=''
//                ORDER BY句(省略可能)
// 引数         ：$start=0
//                取得開始レコード(1回に取得するレコード数を制限する場合)
// 引数         ：$num=0
//                取得最大レコード数(1回に取得するレコード数を制限する場合)
// 引数         ：$c_rows=false
//                検索時、SQL_CALC_FOUND_ROWSを指定するかどうかのフラグ
// 引数         ：$group=''
//                GROUP BY句
// 履歴         ：2010/02/19      林　直貴          新規作成
//
public function get_select($items, $from, $where, $table='', $order='', $start=0, $num=0, $c_rows=false, $group='') {

	// 準備処理
	$itm = self::get_items($items); // itemsが配列の場合に、文字列に変換
	$whe = self::get_where($where); // whereが配列の場合に、文字列に変換

	// SQL文生成
	$sql = 'SELECT '; // SELECT句
	if($c_rows) {
		$sql .= 'SQL_CALC_FOUND_ROWS '; // レコード数取得の場合
	}
	$sql .= $itm . ' FROM ' . $from . ' WHERE '; // FROM句とWHERE句
	if($whe != '') {
		$sql .= $whe . ' AND '; // WHERE句に条件付加
	}
	if($table != '') {
		//$sql .= '`' . $table . '`.'; // 活性レコードのみ取得の条件を自動付加
		$sql .= $table . '.'; // 活性レコードのみ取得の条件を自動付加
	}
	$sql .= 'rec_status=' . self::REC_STATUS_ALLIVE;
	if($group != '') {
		$sql .= ' GROUP BY ' . $group; // GROUP BY句
	}
	if($order != '') {
		$sql .= ' ORDER BY ' . $order; // ORDER BY句
	}
	if($num > 0) {
		$sql .= ' LIMIT ' . $start . ',' . $num; // 一部のレコードを取得する場合のオプション付加
	}

	// 返却
	return $sql;
}

//
// メソッド名   ：get_insert
// 概要         ：INSERT文生成
// 戻り値       ：SQL
// 引数         ：$table
//                挿入先テーブル名
// 引数         ：$items
//                列項目リスト(配列可)
// 引数         ：$values
//                値項目リスト(値, 値をシングルクォートで囲む有無true/false)配列の配列可
//引数			：$create_user
//				クリエイトユーザー番号	2011-07-30	shou
// 履歴         ：2010/02/19      林　直貴          新規作成
//
public function get_insert($table, $items, $values, $create_user=0) {

	// 準備処理
	$itm = self::get_items($items); // 列リストが配列の場合、文字列に変換
	$val = self::get_values($values); // 値リストが配列の場合、文字列に変換

	// ユーザID設定
	$user = $create_user;//2011-07-30 shou update クリエイトユーザーを登録

	// ログインセッションが取得できる場合に、ログインID取得
	if(isset($_SESSION['login'])) {
		$login = $_SESSION['login'];
		$user = $login->user_id;
	}

	// INSERT文生成
	$sql = 'INSERT INTO `' . $table; // INSERT句

	// 列リスト追加(作成ID,作成日時,更新ID,更新日時も追加)
	$sql .= '` (' . $itm . ',create_user,create_datetime,update_user,update_datetime) VALUES (';

	// 値リスト追加(作成ID,作成日時,更新ID,更新日時も追加)
	$sql .= $val . ',' . $user . ',NOW(),' . $user . ',NOW())';

	// 返却
	return $sql;
}

//
// メソッド名   ：get_update
// 概要         ：UPDATE文生成
// 戻り値       ：SQL
// 引数         ：$table
//                更新先テーブル名
// 引数         ：$set
//                SET句(列名, 値, 値をシングルクォートで囲む有無true/false)配列の配列可
// 引数         ：$where
//                WHERE句(項目名,比較演算子,比較値,比較値をシングルクォートで囲む有無true/false)配列の配列も可能
// 履歴         ：2010/02/19      林　直貴          新規作成
//
public function get_update($table, $set, $where, $ignoreDeleted = false) {
	// 準備処理
	$ups = self::get_update_set($set); // SET句が配列の場合、文字列に変換
	$whe = self::get_where($where); // WHERE句が配列の場合、文字列に変換
	// ユーザID設定
	$user = 0;
	// ログインセッションが取得できる場合に、ログインID取得
	if(isset($_SESSION['login'])) {
		$login = $_SESSION['login'];
		$user = $login->user_id;
	}
	// UPDATE文生成
	$sql = 'UPDATE `' . $table; // UPDATE句
	// SET句追加(更新ID,更新日時も追加)、WHERE句追加(rec_statusを自動付加)
	if(!$ignoreDeleted)
	{
		$sql .= '` SET ' . $ups . ',update_user=' . $user . ',update_datetime=NOW() WHERE ' . $whe . ' AND rec_status=0';	//わざとまちがい
	}
	else
	{
		$sql .= '` SET ' . $ups . ',update_user=' . $user . ',update_datetime=NOW() WHERE ' . $whe;
	}
	// 返却
	return $sql;
}

//
// メソッド名   ：get_delete
// 概要         ：DELETE文生成
// 戻り値       ：SQL
// 引数         ：$table
//                削除テーブル名
// 引数         ：$where
//                WHERE句(項目名,比較演算子,比較値,比較値をシングルクォートで囲む有無true/false)配列の配列も可能
// 履歴         ：2010/02/19      林　直貴          新規作成
//
public function get_delete($table, $where) {
	// 準備処理
	$whe = self::get_where($where); // WHERE句が配列の場合、文字列に変換
	// DELETE文生成
	$sql = 'DELETE FROM `' . $table; // DELETE句
	$sql .= '` WHERE ' . $whe . ' AND  rec_status=0'; // WHERE句(rec_statusを自動付加)
	// 返却
	return $sql;
}

//
// メソッド名   ：get_items
// 概要         ：列リスト生成
// 戻り値       ：配列以外はそのまま返却、配列はカンマで結合
// 引数         ：$items
//                列リスト文字列もしくは配列
// 履歴         ：2010/02/19      林　直貴          新規作成
//
public function get_items($items) {
	// 配列以外はそのまま返す
	if(! is_array($items)) return $items;
	// カンマで結合して返却
	return implode(',', $items);
}

//
// メソッド名   ：get_values
// 概要         ：値リスト生成
// 戻り値       ：配列以外はそのまま返却、配列は以下の配列の配列として値リスト作成
//                (値、クォートフラグ(trueでつける))
// 引数         ：$values
//                値リスト文字列もしくは配列
// 履歴         ：2010/02/19      林　直貴          新規作成
//
public function get_values($values) {
	// 配列以外はそのまま返す
	if(! is_array($values)) return $values;
	// 値リスト作成
	$ret = '';
	foreach($values as $val) {
		// 比較値取得＆クォートフラグによって、エスケープとシングルクォート付加
		$v = $val[0];
		if($val[1]) $v = "'" . mysql_real_escape_string($v) . "'";
		// 値項目追加
		if($ret != '') $ret .= ',';
		$ret .= $v;
	}
	// 返却
	return $ret;
}

//
// メソッド名   ：get_items_values
// 概要         ：列、値リスト生成
// 戻り値       ：以下の配列の配列として列、値リスト作成
//                (項目名、値、クォートフラグ(trueでつける))
// 引数         ：$it_val
//                列、値リスト配列
// 履歴         ：2010/02/19      林　直貴          新規作成
//
public function get_items_values($it_val) {
	// リスト作成
	$items = '';
	$values = '';
	foreach($it_val as $iv) {
		// 比較値取得＆クォートフラグによって、エスケープとシングルクォート付加
		$v = $iv[1];
		if($iv[2]) $v = "'" . mysql_real_escape_string($v) . "'";
		// 項目追加
		if($items != '') $items .= ',';
		if($values != '') $values .= ',';
		$items .= $iv[0];
		$values .= $v;
	}
	// 返却
	return array($items, $values);
}

//
// メソッド名   ：get_update_set
// 概要         ：更新リスト生成
// 戻り値       ：配列以外はそのまま返却、配列は以下の配列の配列として更新リスト作成
//                (項目名、値、クォートフラグ(trueでつける))
// 引数         ：$ups
//                SET句文字列もしくは配列
// 履歴         ：2010/02/19      林　直貴          新規作成
//
public function get_update_set($ups) {
	// 配列以外はそのまま返す
	if(! is_array($ups)) return $ups;
	// 更新リスト作成
	$ret = '';
	foreach($ups as $u) {
		// 比較値取得＆クォートフラグによって、エスケープとシングルクォート付加
		$v = $u[1];
		if($u[2]) $v = "'" . mysql_real_escape_string($v) . "'";
		// 更新項目追加
		if($ret != '') $ret .= ',';
		$ret .= $u[0] . '=' . $v;
	}
	// 返却
	return $ret;
}

//
// メソッド名   ：get_where
// 概要         ：where文字生成
// 戻り値       ：配列以外はそのまま返却、配列は以下の配列の配列として検索条件作成
//                (項目名、比較演算子、値、クォートフラグ(trueでつける))
// 引数         ：$where
//                WHERE句文字列もしくは配列
// 履歴         ：2010/02/19      林　直貴          新規作成
//
public function get_where($where) {
	// 配列以外はそのまま返す
	if(! is_array($where)) return $where;
	// 検索条件作成
	$ret = '';
	foreach($where as $w) {
		// 比較値取得＆クォートフラグによって、エスケープとシングルクォート付加
		$v = $w[2];
		if($w[3]) $v = "'" . mysql_real_escape_string($v) . "'";
		// 結合のAND追加
		if($ret != '') $ret .= ' AND ';
		// 条件項目追加
		$ret .= $w[0];
		if($w[1] == 'IN' || $w[1] == 'in') {
			// IN の場合
			$ret .= ' IN (' . $v . ')';
		} else if($w[1] == 'NOT IN' || $w[1] == 'not in') {
			// NOT IN の場合
			$ret .= ' NOT IN (' . $v . ')';
		} else { // その他
			$ret .= $w[1] . $v;
		}
	}
	// 返却
	return $ret;
}

//
// メソッド名   ：select_col_by_id
// 概要         ：IDによる1項目取得
// 戻り値       ：取得値
// 引数         ：$table
//                テーブル名
// 引数         ：$col
//                取得列名
// 引数         ：$id
//                検索ID
// 履歴         ：2010/02/19      林　直貴          新規作成
//
public function select_col_by_id($table, $col, $id) {
	// WHERE句
	$where = 'id=' . $id;
	// 検索
	$rec = self::select_one2($col, $table, $where);
	// レコードが見つかった場合に列の値を返す
	if($rec) return $rec[$col];
	// 見つからなかった場合は、null
	return null;
}

//
// メソッド名   ：escape_str
// 概要         ：クォート囲み＆エスケープ
// 戻り値       ：クォートで囲みエスケープした値
// 引数         ：$val
//                入力文字列
// 履歴         ：2010/02/19      林　直貴          新規作成
//
public function escape_str($val) {
	// MYSQLの特殊文字をエスケープし、シングルクォートで囲んで返す
	return "'" . mysql_real_escape_string($val) . "'";
}
}
?>