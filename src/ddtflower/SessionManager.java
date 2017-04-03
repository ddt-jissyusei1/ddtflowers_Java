package ddtflower;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class SessionManager {
	private HttpServletRequest request; //クッキーを返却するためのresponseオブジェクトを保持するメンバ

	/* 関数名：CookieManager(コンストラクタ)
	 * 概要:クッキーを使用するためのHttpServletResponseを受け取り、メンバにセットする
	 * 引数:HttpServletRequest request:ServletのRequest
	 * 作成日:2016.10.24
	 * 作成者:R.Shibata
	 */
	public SessionManager(HttpServletRequest request) {
		//受け取ったリクエストオブジェクトを、メンバにセットし、使用できるようにする
		this.request = request;
	}

	/* 関数名：getSession
	 * 概要:セッションを取得する。存在しない場合作成する
	 * 引数:無し
	 * 戻り値:無し
	 * 作成日:2016.10.24
	 * 作成者:R.Shibata
	 */
	public void getSession() {
		//セッションを取得する。存在しない場合は新規作成する。
		request.getSession(true);
	}

	/* 関数名：checkSession
	 * 概要:セッションの有無を確認する
	 * 引数:String key:セッションのキー
	 * 戻り値:boolean retBoo:指定したセッションが存在すればtrue、無ければfalseを返却
	 * 作成日:2016.10.24
	 * 作成者:R.Shibata
	 */
	public boolean checkSession(String key) {
		//真偽値を返却するための変数を作成する
		boolean retBoo = false;
		//セッションを取得する。存在しない場合はnullを返却する
		HttpSession session = request.getSession(false);
		//セッションが存在している場合
		if (session != null) {
			//セッションの中にkeyと一致する値が存在する場合
			if (session.getAttribute(key) != null) {
				//返却値にtrueをセットする
				retBoo = true;
			}
		}
		//真偽値を返却する
		return retBoo;
	}

	/* 関数名：getSessionValue
	 * 概要:セッションの値を取得する
	 * 引数:String key:取得するセッションのキー
	 * 戻り値:String sessionValue:取得したセッションの値
	 * 作成日:2016.10.24
	 * 作成者:R.Shibata
	 */
	public String getSessionValue(String key) {
		String sessionValue = null;
		//セッションを取得する。存在しない場合はnullを返却する
		HttpSession session = request.getSession(false);
		//セッションが存在している場合
		if (session != null) {
			//セッションの値を取得する
			Object tempValue = session.getAttribute(key);
			//取得した値があれば文字列に置換する。nullであればnullとする。
			sessionValue = tempValue == null ? null : tempValue.toString();
		}
		return sessionValue;
	}

	/* 関数名：setSessionValue
	 * 概要:セッションに値をセットする
	 * 引数:String key:セットするセッションのキー
	 *    :String value:セットする値
	 * 戻り値:無し
	 * 作成日:2016.10.24
	 * 作成者:R.Shibata
	 */
	public void setSessionValue(String key, String value) {
		//セッションを取得する。存在しない場合はnullを返却する
		HttpSession session = request.getSession(false);
		//セッションが存在している場合
		if (session != null) {
			//セッションに値をセットする
			session.setAttribute(key, value);
		}
	}

	/* 関数名：invalidate
	 * 概要:セッションを破棄する
	 * 引数:無し
	 * 戻り値:無し
	 * 作成日:2016.10.24
	 * 作成者:R.Shibata
	 */
	public void invalidate() {
		//セッションを取得する。存在しない場合はnullを返却する
		HttpSession session = request.getSession(false);
		//セッションが存在している場合
		if (session != null) {
			//セッションを破棄する
			session.invalidate();
		}
	}

	/* 関数名：extension
	 * 概要:セッションの有効期限を更新(延長)する
	 * 引数:無し
	 * 戻り値:無し
	 * 作成日:2016.10.24
	 * 作成者:R.Shibata
	 */
	public void extension() {
		//セッションを取得する。存在しない場合はnullを返却する
		HttpSession session = request.getSession(false);
		//セッションが存在している場合
		if (session != null) {
			//セッションの有効期限を更新する
			session.setMaxInactiveInterval(Constants.SESSION_EXPIRATION_TIME);
		}
	}
}
