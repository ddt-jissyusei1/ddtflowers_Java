package ddtflower;

import java.sql.ResultSet;
import java.util.Map;

/*
 * クラス名:DB_ResultTree
 * 概要  :DBの結果セットのツリーのノードクラス
 * 作成者:R.Shibata
 * 作成日:2016.10.19
 */
public class DB_ResultTree {
	public DB_ResultTree parent;		//このノード（インスタンス）の親
	public Map<String, Object> json;	//JSONデータの連想配列
	public String keyData;				//メンバのjsonキー
	public ResultSet db_result;			//DBの結果セット
}
