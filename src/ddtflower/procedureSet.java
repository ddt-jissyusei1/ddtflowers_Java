package ddtflower;

import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/* クラス名:procedureSet
 * 概要:クライアントから送られたJSONのクエリを実行し、
 *     DBへのレコード追加、変更、削除を行う役割のクラス。
 * 作成日:2016.10.20
 * 作成者:R.Shibata
 */
public class procedureSet extends procedureBase {

	/* クラス名:init
	 * 概要:クラスの初期化関数。ログイン用のクラスの初期化関数をコールする。
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
	 * 概要:クラス特有の処理を行う関数。ログイン処理を行う。
	 * 引数:String $jsonString:JSON文字列
	 * 戻り値:無し
	 * 作成日:2016.10.20
	 * 作成者:R.Shibata
	 */
	public void job(String jsonString) {
		//親クラスのjobを実行し、メンバにJSONの連想配列を格納する
		super.job(jsonString);
		//JSONをDBに反映させる
		//SQLによる例外の対処のため、tryブロックで囲む
		try {
			//INSERT、またはUPDATE命令を実行する
			this.executeQuery(json, Constants.DB_SETQUERY);
			//SQL例外のcatchブロック
		} catch (NoSuchAlgorithmException | SQLException e) {
			//エラーメッセージを表示する
			e.printStackTrace();
			//プログラムをそこで止める
			return;
		}
		//最後に行う処理
		this.disconnect();

		//クライアントへ返すメッセージを作成する
		String returnMessage = "{\"message\":\"" + this.processedRecords + "\"}";
		//作成したJson文字列を出力用文字列へ設定する
		setOutHTMLString(returnMessage);
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
