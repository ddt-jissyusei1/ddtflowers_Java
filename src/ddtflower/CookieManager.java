package ddtflower;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CookieManager {
	private HttpServletResponse response; //クッキーを返却するためのresponseオブジェクトを保持するメンバ
	private Map<String, Cookie> cookie = new HashMap<String, Cookie>(); //クッキーを保持するためのメンバ

	/* 関数名：CookieManager(コンストラクタ)
	 * 概要:クッキーを使用するためにリクエストとレスポンスのオブジェクトを受け取り、メンバにセットする
	 * 引数:HttpServletRequest request:ServletのRequest
	 *    :HttpServletResponse response:ServletのResponse
	 * 戻り値:無し
	 * 作成日:2016.10.21
	 * 作成者:R.Shibata
	 */
	public CookieManager(HttpServletRequest request, HttpServletResponse response) {
		//受け取ったレスポンスオブジェクトを、メンバにセットし、使用できるようにする
		this.response = response;
		//受け取ったリクエストオブジェクトより、クッキーの値を走査する
		for (Cookie cookie : request.getCookies()) {
			//取得したクッキーを一つずつメンバのマップへセットする
			this.cookie.put(cookie.getName(), cookie);
		}
	}

	/* 関数名：setCookie
	 * 概要:クッキーをセットする
	 * 引数:String key:セットするクッキーのkey(名称)
	 *    :String value:セットするクッキーの値
	 *    :Int value:クッキーの生存時間
	 * 戻り値:無し
	 * 作成日:2016.10.24
	 * 作成者:R.Shibata
	 */
	public void setCookie(String key, String value, int expiry) {
		//セットするためのクッキーを作成する
		Cookie cookie = new Cookie(key, value);
		//クッキーの生存時間を指定する
		cookie.setMaxAge(expiry);
		//クッキーにアクセス可能なURLパスを指定する
		cookie.setPath("/");
		//responseにクッキーを追加する
		response.addCookie(cookie);
		//メンバのクッキーに値をセットする
		this.cookie.put(key, cookie);
	}

	/* 関数名：getCookieValue
	 * 概要:設定されているクッキーの値を取得する
	 * 引数:String key:取得対象のクッキーのkey
	 * 戻り値:String cookieValue:取得したクッキーの値
	 * 作成日:2016.10.24
	 * 作成者:R.Shibata
	 */
	public String getCookieValue(String key) {
		//返却する値を格納する変数を宣言する
		String cookieValue = null;
		//メンバのクッキーに、kyeに該当するクッキーが存在する場合
		if (cookie.containsKey(key)) {
			//そのクッキーより値を取得して返却用変数へセットする
			cookieValue = cookie.get(key).getValue();
		}
		//取得した値を返却する
		return cookieValue;
	}

	/* 関数名：deleteCookie
	 * 概要:クッキーを削除する
	 * 引数:String key:セットするクッキーのkey(名称)
	 * 戻り値:無し
	 * 作成日:2016.10.24
	 * 作成者:R.Shibata
	 */
	public void deleteCookie(String key) {
		//セットするためのクッキーを作成する
		Cookie cookie = new Cookie(key, Constants.EMPTY_STRING);
		//クッキーの生存時間を0指定して削除する
		cookie.setMaxAge(0);
		//クッキーにアクセス可能なURLパスを指定する
		cookie.setPath("/");
		//responseにクッキーを追加する(生存時間0のクッキーで上書きし削除する)
		response.addCookie(cookie);
		//メンバのクッキーから値を削除する
		this.cookie.remove(key);
	}
}
