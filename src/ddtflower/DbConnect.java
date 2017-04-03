package ddtflower;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

/* クラス名:DbConnect
 * 概要:DBに接続する関数を持つクラス
 * 作成日:2016.10.19
 * 作成者:R.Shibata
 */
public class DbConnect {
	//DB接続のためのコネクション用の変数
	public Connection con = null;

	/* 関数名:connect
	 * 概要:DBとの接続を行う。
	 * 引数:無し
	 * 戻り値:無し
	 * 作成日:2016.10.19
	 * 作成者:R.Shibata
	 */
	public void connect() throws ClassNotFoundException, SQLException {
		//JDBCドライバの読み込みを行う
		Class.forName(Constants.JDBC_DRIVER);
		//DBに接続する
		this.con = DriverManager.getConnection(Constants.DSN, Constants.DB_USER, Constants.DB_PASSWORD);
		//SQL実行用のステートメントを作成する
		Statement stmt = con.createStatement();
		//クエリをUTF8で設定する
		stmt.executeQuery("SET NAMES utf8");
		//ステートメントを終了する
		stmt.close();
		
	}
	
	/* 関数名:disconnect
	 * 概要:DBとの接続を閉じる。
	 * 引数:無し
	 * 戻り値:無し
	 * 作成日:2016.10.19
	 * 作成者:R.Shibata
	 */
	public void disconnect()  {
		//切断失敗のSQLエラーをキャッチするtryブロック
		try {
			//DBとの接続を取じる
			this.con.close();
		//SQLエラーが発生した場合
		} catch (SQLException e) {
			//エラーメッセージを表示する
			e.printStackTrace();
		}
	}
}
