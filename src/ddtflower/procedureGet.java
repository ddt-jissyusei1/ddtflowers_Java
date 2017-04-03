package ddtflower;

import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.arnx.jsonic.JSON;

/* クラス名:procedureGet
 * 概要:JSONDBManagerを利用し、クライアント側から送信された
 *     JSONにDBから取得したデータを挿入して返す役割のクラス。
 * 作成日:2016.10.20
 * 作成者:R.Shibata
 */
public class procedureGet extends procedureBase {

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

		//JSONを取得する
		//SQLによる例外の対処のためtryブロックで囲む
		try {
			//JSON文字列の作成を行う
			this.createJSON(this.json, Constants.EMPTY_STRING, null);
			//SQL例外のcatchブロック
		} catch (NoSuchAlgorithmException | SQLException e) {
			//エラーメッセージを表示する
			e.printStackTrace();
			//プログラムを終了する
			return;
		}

		//DBとの接続を閉じる
		this.disconnect();

		//連想配列をjsonに変換して変数に入れる
		String jsonOut = JSON.encode(this.json);
		//作成したJSON文字列を出力用文字列へ設定する
		this.setOutHTMLString(jsonOut);
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
