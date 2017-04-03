package ddtflower;

import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/* クラス名:procedureGetList
 * 概要:JSONDBManagerを利用し、クライアント側から送信されたJSONのクエリを
 *     基にDBから取得したデータをテーブルにしてクライアントに返す役割のクラス。
 * 作成日:2016.10.20
 * 作成者:R.Shibata
 */
public class procedureGetList extends procedureBase {

	/* クラス名:init
	 * 概要:クラスの初期化関数。
	 * 引数:無し
	 * 戻り値:無し
	 * 作成日:2016.10.20
	 * 作成者:R.Shibata
	 */
	public void init(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException,
			SQLException, NoSuchAlgorithmException, LoginCheckException {
		//親クラスのinit関数をコールする。
		super.init(request, response);
	}

	/* クラス名:job
	 * 概要:クラス特有の処理を行う関数。
	 * 引数:String $jsonString:JSON文字列
	 * 戻り値:無し
	 * 作成日:2016.10.20
	 * 作成者:R.Shibata
	 */
	public void job(String jsonString) {
		//親クラスのjobを実行し、メンバにJSONの連想配列を格納する
		super.job(jsonString);

		//返却するJSON配列の文字列を格納する変数を用意する
		String retArrayString = "";

		//SQLによる例外の対処のため、tryブロックで囲む
		try {
			//レコードのJSONを作成する
			retArrayString = this.getListJSONPlusKey(this.json, Constants.STR_TABLE_DATA);
		} catch (NoSuchAlgorithmException | SQLException e) {
			// エラーメッセージを表示する
			e.printStackTrace();
			// プログラムを終了する
			return;
		}
		//DBとの接続を閉じる
		this.disconnect();
		//作成したJSON文字列を出力用文字列へ設定する
		this.setOutHTMLString(retArrayString);
	}

	/* クラス名:run
	 * 概要:クラスのinit、job関数をまとめて実行する。
	 * 引数:String $jsonString:JSON文字列
	 * 戻り値:無し
	 * 作成日:2016.10.20
	 * 作成者:R.Shibata
	 */
	public void run(String jsonString, HttpServletRequest request, HttpServletResponse response)
			throws ClassNotFoundException, SQLException, NoSuchAlgorithmException, LoginCheckException {
		//初期化処理とクラス独自の処理をまとめて実行する
		this.init(request, response); //初期化関数
		this.job(jsonString); //クラス特有の処理を行う

	}
}
