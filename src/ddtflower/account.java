package ddtflower;

import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.arnx.jsonic.JSON;

/* クラス名:account
 * 概要:ログインのための関数を持ったクラス。JSONDBManagerクラスを継承する。
 * 作成日:2016.10.19
 * 作成者:R.Shibata
 */
public class account extends JSONDBManager {
	//ページ権限確認用の権限取得用の連想配列
	public Map<String, Object> pageAuthorityCheck = new HashMap<String, Object>();
	//クッキー操作用のオブジェクト
	private CookieManager cookie;
	//セッション操作用のオブジェクト
	private SessionManager session;

	/* クラス名:init
	 * 概要:初期化処理を行う。初期化としてセッションの開始とDBへの接続を行う。
	 * 引数:無し
	 * 戻り値:無し
	 * 作成日:2016.10.20
	 * 作成者:R.Shibata
	 */
	public void init(HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException,
			SQLException, NoSuchAlgorithmException, LoginCheckException {
		//クッキーマネージャのインスタンスを作成する
		cookie = new CookieManager(request, response);
		//セッションマネージャのインスタンスを作成する
		session = new SessionManager(request);
		//セッションを開始する
		session.getSession();
		//DBへの接続を開始する
		this.connect();
	}

	/* クラス名:login
	 * 概要:ログイン処理を行う。
	 * 引数:String jsonString: JSON文字列。ログイン情報が入っている必要がある。
	 * 戻り値:無し
	 * 作成日:2016.10.20
	 * 作成者:R.Shibata
	 */
	public void login(String jsonString) {
		//クライアントから送信されたJSON文字列を取得する
		this.getJSONMap(jsonString);

		//SQLによる例外対処のためrtyブロックで囲む
		//jsonを出力する
		try {
			//jsonを出力する
			this.createJSON(this.json, Constants.EMPTY_STRING, null);
			//SQL例外のchatchブロック
		} catch (NoSuchAlgorithmException | SQLException e) {
			// エラーメッセージを表示する
			e.printStackTrace();//systemエラーメッセージを出力する
		}

		//連想配列をjsonに変換して変数に入れる
		String jsonOut = JSON.encode(this.json);

		//セッションIDを更新する
		session.getSession();

		//JSONから会員番号を取り出す
		String userId = getJsonValue(json, Constants.STR_ID, Constants.KEY_TEXT);
		//JSONから権限を取り出す
		String authority = getJsonValue(json, Constants.AUTHORITY, Constants.KEY_TEXT);

		//会員番号(ユーザID)をセッションに入れる
		session.setSessionValue(Constants.USER_ID, userId);
		//ユーザの権限をセッションに入れる
		session.setSessionValue(Constants.AUTHORITY, authority);

		//cookieにユーザIDをセットする
		cookie.setCookie(Constants.USER_ID, userId, Constants.COOKIE_EXPIRATION);
		//cookieにユーザの権限をセットする
		cookie.setCookie(Constants.AUTHORITY, authority, Constants.COOKIE_EXPIRATION);

		//作成したJSON文字列を出力用文字列へセットする
		setOutHTMLString(jsonOut);
	}

	/* クラス名:logout
	 * 概要:ログアウト処理を行う。
	 * 引数:無し
	 * 戻り値:無し
	 * 作成日:2016.10.20
	 * 作成者:R.Shibata
	 */
	public void logout() {
		//セッションクッキーが存在するなら
		if (cookie.getCookieValue(Constants.JSP_SESSION_COOKIE_NAME) != Constants.EMPTY_STRING) {
			//セッションクッキーを破棄する
			cookie.deleteCookie(Constants.JSP_SESSION_COOKIE_NAME);
		}

		//ユーザID、権限のcookieを削除する
		cookie.deleteCookie(Constants.USER_ID);
		cookie.deleteCookie(Constants.AUTHORITY);

		//セッションそのものを破棄する
		session.invalidate();
	}

	/* クラス名:loginCheck
	 * 概要:ログインチェックを行う。
	 *    :チェック失敗時、LoginCheckExceptionをthrowする
	 * 引数:無し
	 * 戻り値:boolean:ログインしているか否かの真理値を返す
	 * 作成日:2016.10.20
	 * 作成者:R.Shibata
	 */
	public boolean loginCheck() throws NoSuchAlgorithmException, SQLException, LoginCheckException {
		boolean retBoo = false; //返却値を格納する変数を宣言する
		//セッション変数のユーザIDを参照し、値が存在するかどうかをチェックする
		//また、セッションとcookieに保存されているユーザIDが一致するかをたしかめる
		if (session.getSessionValue(Constants.USER_ID) != null && cookie.getCookieValue(Constants.USER_ID) != null
				&& session.getSessionValue(Constants.USER_ID).equals(cookie.getCookieValue(Constants.USER_ID))) {
			//セッションの有効時間を延長する
			session.extension();
			//返却値の変数にtrueを格納する
			retBoo = true;
			//ページに対する権限チェックを行う(権限所持ユーザー)
			this.pageCheck(session.getSessionValue(Constants.AUTHORITY));
		} else {
			//ページに対する権限チェックを行う（ゲストユーザー）
			this.pageCheck("1");
		}
		//真理値を返す
		return retBoo;
	}

	/* クラス名:pageCheck
	 * 概要:ページの権限チェックを行う
	 *    :チェック失敗時、LoginCheckExceptionをthrowする
	 * 引数:String strAuthority:ユーザーが所持する権限を示す文字列(内容は数値）
	 * 戻り値:無し
	 * 作成日:2016.10.20
	 * 作成者:R.Shibata
	 */
	public void pageCheck(String strAuthority) throws NoSuchAlgorithmException, SQLException, LoginCheckException {
		//権限比較用の変数を宣言し、取得したユーザ権限をセットする
		int authority = Integer.parseInt(strAuthority);

		//cookieにセットされている対象ページの権限を取得する(16進数)
		//入力は0xFF等の文字列のため、parseIntは使用できない。decodeの返り値はInteger型のため、intValueでintに変換する
		int pageAuth = Integer.decode(cookie.getCookieValue(Constants.PAGE_AUTH)).intValue();

		//当該ユーザで開けるページなのか検証する
		if ((authority & pageAuth) == 0) {
			//開けないと判定されれば、ログインチェックエラーの例外を投げる
			throw new LoginCheckException(cookie.getCookieValue(Constants.USER_ID),
					session.getSessionValue(Constants.USER_ID));
		}
	}
}
