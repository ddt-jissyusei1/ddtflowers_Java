package ddtflower;

import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/* クラス名:procedureBase
 * 概要:procedureXXXクラスの親クラス
 * 作成日:2016.10.20
 * 作成者:R.Shibata
 */
public class procedureBase extends account {

	/* クラス名:init
	 * 概要:クラスの初期化関数。accountクラスの初期化関数とログインチェック関数をコールする。
	 * 引数:無し
	 * 戻り値:無し
	 * 作成日:2016.10.20
	 * 作成者:R.Shibata
	 */
	public void init(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException,
			SQLException, NoSuchAlgorithmException, LoginCheckException {
		//親クラスのinit関数をコールする
		super.init(request, response);
		//ログインチェックを行う
		this.loginCheck();
	}

	/* クラス名:job
	 * 概要:クラス特有の処理を行う関数。JSON文字列から連想配列を取得してメンバに格納する。
	 * 引数:String $jsonString:JSON文字列
	 * 戻り値:無し
	 * 作成日:2016.10.20
	 * 作成者:R.Shibata
	 */
	public void job(String jsonString) {
		//JSON文字列から連想配列を取得し、自身のメンバに保存する
		super.getJSONMap(jsonString);
	}

	/* クラス名:run
	 * 概要:クラスのinit、job関数をまとめて実行する。
	 * 引数:無し
	 * 戻り値:無し
	 * 作成日:2016.10.20
	 * 作成者:R.Shibata
	 */
	public void run(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException,
			SQLException, NoSuchAlgorithmException, LoginCheckException {
		//初期化処理とクラス独自の処理をまとめて実行する
		this.init(request, response);//初期化関数
		this.job(null); //クラス特有の処理を行う
	}
}
