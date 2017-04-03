package ddtflower;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Map.Entry;

import net.arnx.jsonic.JSON;

/* クラス名:JSONDBManager
 * 概要:JSONにDBから取得した値を与える、または、JSONのデータをDBに保存する役割のクラス
 *     DbConnerctクラスを継承する。
 * 作成日:2016.10.19
 * 作成者:R.Shibata
 */

public class JSONDBManager extends DbConnect {
	//DBへの追加、更新処理を行ったときに帰ってくる処理レコード数を格納するメンバ変数
	public int processedRecords = 0;
	//JSONを返還した連想配列を格納するメンバ変数
	public Map<String, Object> json = new HashMap<>();
	//HTML上に出力するための作成した文字列
	private String outHTMLString = "";

	/* 関数名：createJSON
	 * 概要:DBからデータを取得してJSONを作る
	 * 引数:Map<String,Object> json:カレントのJSON
	 *     String:key:JSONのキー
	 *     DBResultTree:dbrt_parent:DBから取得したデータを格納してツリー構造を作るためのクラスのインスタンス
	 * 戻り値:無し
	 * 作成日:2016.10.19
	 * 作成者:R.Shibata
	 */
	public void createJSON(Map<String, Object> json, String key, DB_ResultTree dbrt_parent)
			throws NoSuchAlgorithmException, SQLException {
		// DBの結果から構築したツリーを構成するクラスのインスタンスを作成する
		DB_ResultTree db_resultTree = new DB_ResultTree();
		//ステートメントを作成する
		db_resultTree.db_result = this.executeQuery(json, Constants.DB_GETQUERY);
		//DB_ResultTreeの親子関係を構築する
		db_resultTree.parent = dbrt_parent;
		//カレントのJSONを保存する
		db_resultTree.json = json;
		//カレントのキーを保存する
		db_resultTree.keyData = key;

		// db_resultTreeから"key"に該当するデータを取得する
		String column = this.getDBColumn(key, db_resultTree);
		// jsonについて最下層の要素にたどり着くまでループしてデータを取り出す
		for (Entry<String, Object> value : json.entrySet()) {
			// jsonのキーを示す変数に、キーの値をセットする
			String keyString = value.getKey();
			//valueに子供があるときの処理（LinkedHashMapの時）
			if (value.getValue() instanceof LinkedHashMap) {
				//再帰的にcreateJSONメソッドをコールする
				this.createJSON((Map<String, Object>) value.getValue(), keyString, db_resultTree);
				//columnがnullでなく、jsonの子のキーがtext,html、srcであれば
			} else if (column != null && keyString.equals(Constants.KEY_TEXT)
					|| keyString == Constants.KEY_HTML || keyString == Constants.KEY_SRC) {
				//該当するキーの値をcolumnで上書きする
				json.replace(keyString, column);
			}
		}
	}

	/* 関数名：executeQuery
	 * 概要:クエリを実行してDBから結果セットを取得する
	 * 引数:Map<String,Object> json:カレントのJSON連想配列
	 *     String:queryKey:実行するクエリのベースとなる文字列
	 * 戻り値:ResultSet retRs:DBから取得した結果セットを返す
	 * 作成日:2016.10.19
	 * 作成者:R.Shibata
	 */
	public ResultSet executeQuery(Map<String, Object> json, String queryKey) throws NoSuchAlgorithmException,
			SQLException {
		//返却する結果セットの変数を作成する
		ResultSet retRs = null;
		//ユーザ情報を保護するためパスワードがkeyにあればハッシュ化する
		if (json.containsKey(Constants.STR_PASSWORD)) {
			//置換対象のjsonオブジェクトを取得する
			Map<String, Object> replaceJson = (Map<String, Object>) json.get(Constants.STR_PASSWORD);
			//文字列をハッシュ化し、jsonの値を置換する（仮置換）
			replaceJson.replace(Constants.KEY_VALUE,
					encryptionSHA1(replaceJson.get(Constants.KEY_VALUE).toString()));
			//実際のjsonを置換する
			json.replace(Constants.STR_PASSWORD, replaceJson);
		}
		// queryKeyがjsonに存在していれば
		if (json.containsKey(queryKey)) {
			//カレントjsonからquerykeyを持つ値を取得する
			String query = (String) json.get(queryKey);
			//queryに正しい値が入っていれば
			if (query != null && query.length() >= 1) {
				//jsonについて最下層の要素にたどり着くまでループしてデータを取り出す
				for (Entry<String, Object> value : json.entrySet()) {
					//valueに子供があるときの処理(linkedHashMapの時)
					if (value.getValue() instanceof LinkedHashMap) {
						//子オブジェクトを取得する
						Map<String, Object> childObject = (Map<String, Object>) value.getValue();
						//子オブジェクトがvalueを持っていたら
						if (childObject.containsKey(Constants.KEY_VALUE)) {
							//置換対象の文字列を、取得した子オブジェクトのvalueより作成する
							String replaceValue = createReplaceValue(childObject.get(Constants.KEY_VALUE));
							//子オブジェクトのkey文字列と一致するqueryの文字列を置換する
							query = query.replace("'" + value.getKey() + "'", "'" + replaceValue + "'");
						}
					}
				}
				//Javaで実行できないパターンのクエリを修正する
				query = queryCorrection(query);
				//ステートメントを作成する
				Statement stmt = con.createStatement();
				System.out.println("query:" + query); //TODO debug クエリー出力
				//クエリを実行し結果セットを返す
				retRs = stmt.executeQuery(query);
				//行数を取得するため、レコードセットの位置をlastにする
				retRs.last();
				//処理を行ったレコード数を結果セットより取得してメンバに保存する
				this.processedRecords = retRs.getRow();
				//行数を取得するためにlastにしたカーソル位置を先頭に戻す。
				retRs.beforeFirst();
			}
		}
		//結果セットを返す
		return retRs;
	}

	/* 関数名：createReplaceValue
	 * 概要:クライアントより受け取った置換対象の値を、置換可能文字列に変換する
	 * 引数:Object childObjectValue:クライアントより受け取った置換対象の値、StringとArrayListが存在する
	 * 戻り値:String:作成した返却用の文字列
	 * 作成日:2016.10.28
	 * 作成者:R.Shibata
	 */
	private String createReplaceValue(Object childObjectValue) {
		//受け取ったオブジェクトにより、返却する文字列を作成するための変数を宣言する
		String retReplaceString = "";
		//データ作成のための文字列配列を用意する
		ArrayList<String> childObjectArray = new ArrayList<String>();
		//取得したオブジェクトがArrayListであれば
		if (childObjectValue instanceof ArrayList) {
			//走査用文字列配列にaddAllする
			childObjectArray.addAll((ArrayList<String>) childObjectValue);
			//リスト以外であれば
		} else {
			//走査用文字列配列にaddする
			childObjectArray.add(childObjectValue.toString());
		}
		//取得、作成した配列を走査する
		for (String childObjectstring : childObjectArray) {
			//置換文字列が空白であれば何もしない、値があれば区切り文字を付与する
			retReplaceString += retReplaceString.equals("") ? "" : "','";
			//配列の文字列を、エスケープ処理を行い置換文字列に付与する
			retReplaceString += escapeSQLValue(childObjectstring);
		}
		//作成した文字列を返却する
		return retReplaceString;
	}

	/* 関数名：getDBColumn
	 * 概要:指定したkey(列)の値を結果セットから取得して返す
	 * 引数:String key:JSONのオブジェクトのキー
	 *     DBResultTree dbrTree:DBから取得した結果をツリー構造にするクラスのインスタンス
	 * 戻り値:String column:取得した列の値を返す
	 * 作成日:2016.10.20
	 * 作成者:R.Shibata
	 */
	public String getDBColumn(String key, DB_ResultTree dbrTree) throws SQLException {
		//返却値を格納する変数を初期化する
		String column = null;
		//取得対象が列の何行目かをセットする
		int columnNumber = 0;
		//dbrTreeの親のキーが、これが配列の要素であるという事を示す文字を含んでいれば
		if (dbrTree.parent != null && dbrTree.parent.keyData.indexOf(Constants.STR_TWO_UNDERBAR) != -1) {
			//keyの値を分割する
			String[] keyString = dbrTree.parent.keyData.split(Constants.STR_TWO_UNDERBAR);
			//行数をセットする
			columnNumber = Integer.parseInt(keyString[1]);
		}

		//親が無くなるまでDBレコードツリーを走査する
		while (dbrTree != null) {
			//dbtTreeに結果セットが登録されていれば
			if (this.checkColumn(dbrTree.db_result, key)) {
				//colNumberの位置へレコードセットを移動させる（添え字は1開始のため+1）
				if (dbrTree.db_result.absolute(columnNumber + 1)) {
					//カラムの値を取得する
					column = dbrTree.db_result.getString(key);
				}
				//ループを抜ける
				break;
			} else {
				//親をセットする
				dbrTree = dbrTree.parent;
			}
		}
		//columnを返す
		return column;
	}

	/* 関数名：getListJSON
	 * 概要:リスト形式のJSONを作成して返す
	 * 引数:Map<String, Object> json:JSONのオブジェクト。
	 * 戻り値:String strAll:JSONの文字列配列を文字列で返す
	 * 作成日:2016.10.20
	 * 作成者:R.Shibata
	 */
	public String getListJSON(Map<String, Object> json) throws NoSuchAlgorithmException, SQLException {
		//返却する文字列を作成するための変数を3つ宣言、初期化する。
		String strAll = "";
		String strBlock = "";
		String strLine = "";
		//データベースから当該レコード群を取得する(結果セットを取得する)
		ResultSet rs = this.executeQuery(json, Constants.DB_GETQUERY);
		//レコードセットの列名を取得する
		ResultSetMetaData rsMeta = rs.getMetaData();
		//レコードセットの列数を取得する
		int columnCount = rsMeta.getColumnCount();
		//結果セットの行についてのループ
		while (rs.next()) {
			//レコードの文字列を初期化する
			strLine = "";
			//列についてのループ
			for (int i = 0; i < columnCount; i++) {
				//列名を取得する(別名の取得)
				String sColName = rsMeta.getColumnLabel(i + 1);
				//列の値を取得する
				String value = rs.getString(i + 1);
				//列の値がNULLだった場合、ブランクに置換する
				value = value == null ? Constants.EMPTY_STRING : value;
				//文字列の行単位の変数が空でない時、行の文字列をカンマで区切る
				strLine += strLine.equals(Constants.EMPTY_STRING) ? Constants.EMPTY_STRING : ",";

				//取得した値に、JSON用のエスケープ処理を行う
				value = escapeJSONValue(value);

				//1行分のデータを文字列に追加する
				strLine += "\"" + sColName + "\":\"" + value + "\"";
			}
			//行に文字列が入っていたら、カンマで区切る
			strBlock += strBlock.equals(Constants.EMPTY_STRING) ? Constants.EMPTY_STRING : ",";
			//作成した行の文字列をブロックの文字列に追加する
			strBlock += "{" + strLine + "}";
		}
		//作成した全ブロックを配列の括弧で囲む
		strAll = "[" + strBlock + "]";
		//作成した文字列を返す
		return strAll;
	}

	/* 関数名：outputJSON
	 * 概要:DBから取得したレコードでJSONを作る。
	 * 引数:String jsonString:クライアントから受け取ったJSON文字
	 *    :String key:JSONのトップのノードのキー。
	 * 戻り値:無し
	 * 作成日:2016.10.24
	 * 作成者:R.Shibata
	 */
	public void outputJSON(String jsonString, String key) {
		//引数のJSON文字列を変換して、JSONの連想配列を取得してクラスのメンバに格納する
		this.getJSONMap(jsonString);
		//例外に備える
		try {
			//データベースに接続する
			this.connect();
			//JSON文字列の作成を行う
			this.createJSON(json, key, null);
			//データベースから切断する
			this.disconnect();
		} catch (ClassNotFoundException | SQLException | NoSuchAlgorithmException e) {
			//エラーメッセージを表示する
			e.printStackTrace();
			//プログラムを止める
			return;
		}
	}

	/* 関数名：getJSONMap
	 * 概要:JSON文字列から連想配列を生成する。
	 * 引数:String jsonString:変換するJSON文字列
	 * 戻り値:無し
	 * 作成日:2016.10.20
	 * 作成者:R.Shibata
	 */
	public void getJSONMap(String jsonString) {
		// JSON文字列を連想配列に変換する
		Map<String, Object> map = (Map<String, Object>) JSON.decode(jsonString);
		// Mapに変換されたJSONをJSONDBManagerクラスのメンバに格納する
		this.json = map;
	}

	/* 関数名：checkColumn
	 * 概要:結果セットに指定した列名を持つ列があるかをチェックする
	 * 引数:ResultSet rs:指定した列があるかをチェックする対象の結果セット
	 *    :String columnName:チェック対象の列名
	 * 戻り値:無し
	 * 作成日:2016.10.20
	 * 作成者:R.Shibata
	 */
	public boolean checkColumn(ResultSet rs, String columnName) throws SQLException {
		boolean retBoo = false;
		//結果セットがnullでない時の処理
		if (rs != null) {
			//列名を取得するため、MetaDataを取得する
			ResultSetMetaData rsMeta = rs.getMetaData();
			//MetaDataより列数を取得する
			int columnCount = rsMeta.getColumnCount();
			// 最初の結果セットから列を走査する
			for (int i = 0; i < columnCount; i++) {
				//結果セットの列に指定した列名の列が存在する(添え字開始位置が１のため+1)
				if (rsMeta.getColumnLabel(i + 1).equals(columnName)) {
					// 返す変数にtrueを格納する
					retBoo = true;
					//チェック完了となり、ループを終了する
					break;
				}
			}
		}
		//判定を返す
		return retBoo;
	}

	/* 関数名：getListJSONPlusKey
	 * 概要:getListJSONで作成した配列を、クライアントから送信されたJSONに格納して文字列で返す。
	 * 引数:Object json:JSONのオブジェクト。
	 *    :String key:キー名
	 * 戻り値:String:オブジェクトで囲んだ配列のJSON文字列を返す
	 * 作成日:2016.10.20
	 * 作成者:R.Shibata
	 */
	public String getListJSONPlusKey(Map<String, Object> json, String key) throws NoSuchAlgorithmException,
			SQLException {
		//getListJSONでテーブル用のJSON配列を作成する
		String retArray = this.getListJSON(json);
		//JSON配列の文字列を配列データに変換し、引数のJSONに追加する
		json.put(key, JSON.decode(retArray));
		//追加を行った引数のJSONを文字列に変換する
		retArray = JSON.encode(json);
		//作成した文字列を返す
		return retArray;
	}

	/* 関数名：queryCorrection
	 * 概要:Javaでは実行できないタイプのクエリーを修正して返却する
	 *    :本来であればこんな処理は不要のはず
	 * 引数:String query:修正対象のクエリー
	 * 戻り値:String:修正後のクエリーを返却する
	 * 作成日:2016.10.20
	 * 作成者:R.Shibata
	 */
	private String queryCorrection(String query) {
		//返却用クエリーの文字列を宣言し、入力のクエリーをセットする
		String retQuery = query;
		//クエリーの中にセミコロンが含まれている場合
		if (retQuery.indexOf(";") != -1) {
			//クエリの最初の;を検索しindexを保持する。;も出力対象のため、数値を+1する
			int index = retQuery.indexOf(";") + 1;
			//クエリー文字列から最初の";"までを切り出す
			retQuery = retQuery.substring(0, index);
		}
		//修正したクエリーを返却する
		return retQuery;
	}

	/* 関数名：encryptionSHA1
	 * 概要:引数で受け取った文字列をSHA1で暗号化し返却する
	 * 引数:String str:暗号化する文字列
	 * 戻り値:String:暗号化した文字列
	 * 参考:https://hydrocul.github.io/wiki/programming_languages_diff/string/hash.html
	 * 作成日:2016.10.25
	 * 作成者:R.Shibata
	 */
	private String encryptionSHA1(String str) throws NoSuchAlgorithmException {
		//返却用のハッシュ化文字列を格納するための変数を宣言する
		StringBuilder hashString = new StringBuilder();
		//ハッシュ化するためのインスタンスを生成する
		MessageDigest md = java.security.MessageDigest.getInstance("SHA-1");
		//引数で受け取った値をバイトの配列に置き換える
		byte[] hash = md.digest(str.getBytes());
		//置き換えた配列の長さを取得する
		int hashLength = hash.length;
		//取得した配列を走査する
		for (int i = 0; i < hashLength; i++) {
			//配列の値をintの値として取得する
			int h = hash[i];
			//値が0未満であれば
			if (h < 0) {
				//256を追加した値をHexStringに変換し、文字列へ追加する
				hashString.append(Integer.toHexString(h + 256));
				//値が0以上であれば
			} else {
				//値が16未満であれば
				if (h < 16) {
					//"0"を文字列に追加する
					hashString.append("0");
				}
				//値をHexStringに変換し、文字列へ追加する
				hashString.append(Integer.toHexString(h));
			}
		}
		//作成した文字列を返却する
		return hashString.toString();
	}

	/* 関数名：escapeJSONValue
	 * 概要:引数で受け取った文字列をJSON用のエスケープ処理を行い返却する
	 * 引数:String str:エスケープする文字列
	 * 戻り値:String:エスケープした文字列
	 * 作成日:2016.10.27
	 * 作成者:R.Shibata
	 */
	private String escapeJSONValue(String str) {
		//返却用文字列に、引数の文字列をセットする
		String retStr = str;
		//￥マークをエスケープ文字に置き換える(replaceAllは正規表現として扱われるため、￥一つが\4つ分となる）
		retStr = retStr.replaceAll("\\\\", "\\\\\\\\");
		//改行文字をエスケープ文字に置き換える
		retStr = retStr.replaceAll("\r\n", "\\\\n");
		retStr = retStr.replaceAll("\r", "\\\\n");
		retStr = retStr.replaceAll("\n", "\\\\n");
		//ダブルクォートをエスケープ文字に置き換える
		retStr = retStr.replaceAll("\"", "\\\\\"");
		//エスケープした値を返却する
		return retStr;
	}

	/* 関数名：escapeSQLValue
	 * 概要:引数で受け取った文字列をSQL用のエスケープ処理を行い返却する
	 * 引数:String str:エスケープする文字列
	 * 戻り値:String:エスケープした文字列
	 * 作成日:2016.10.27
	 * 作成者:R.Shibata
	 */
	private String escapeSQLValue(String str) {
		//返却用文字列に、引数の文字列をセットする
		String retStr = str;
		//SQL実行時削除されるため￥マークをエスケープする
		retStr = retStr.replaceAll("\\\\", "\\\\\\\\");
		//SQL実行できなくなるため、シングルクォートをエスケープする
		retStr = retStr.replaceAll("'", "\\\\'");
		return retStr;

	}

	/* 関数名：getMapValue
	 * 概要:指定したmapの一つ下の階層のデータを取得する
	 * 引数:Map<String, Object> map:値を取得したいmapオブジェクト
	 *    :String jsonKey:mapから取得したい値のキー
	 *    :String vauleKey:mapのkeyに含まれる値を示すキー 
	 * 戻り値:String:取得した文字列
	 * 作成日:2016.10.27
	 * 作成者:R.Shibata
	 */
	public String getJsonValue(Map<String, Object> map, String jsonKey, String valueKey) {
		//引数のmapから下位のオブジェクトを取得する
		Map<String, Object> tempObject = (Map<String, Object>) map.get(jsonKey);
		//下位オブジェクトよりデータを取得し、その値を返却する
		return tempObject.get(valueKey).toString();
	}

	/* 関数名：getOutHTMLString
	 * 概要:クライアントに出力する用の文字列であるoutHTMLStringを返却する
	 * 引数:無し
	 * 戻り値:String:outHTMLString
	 * 作成日:2016.10.25
	 * 作成者:R.Shibata
	 */
	public String getOutHTMLString() {
		//outHTMLStringを返却する
		return outHTMLString;
	}

	/* 関数名：setOutHTMLString
	 * 概要:クライアントに出力する用の文字列であるoutHTMLStringを設定する。
	 * 引数:String outHTMLString:設定する文字列
	 * 戻り値:無し
	 * 作成日:2016.10.25
	 * 作成者:R.Shibata
	 */
	public void setOutHTMLString(String outHTMLString) {
		//入力の値を設定する
		this.outHTMLString = outHTMLString;
	}
}
