package ddtflower;

/* クラス名:LoginCheckException
 * 概要:ログインチェックエラー時の例外クラス
 * 作成日:2016.10.19
 * 作成者:R.Shibata
 */
public class LoginCheckException extends Exception {
	//エラー発生時点のクッキーの値を保持するメンバ文字列
	private String cookieValue;
	//エラー発生時点のセッションの値を保持するメンバ文字列
	private String sessionValue;

	/*
	 * クラス名:LoginCheckException(コンストラクタ)
	 * 概要  :エラー発生時、セッションを取得してメンバに保持する
	 * 作成者:R.Shibata
	 * 作成日:2016.10.25
	 */
	public LoginCheckException(String cookieValue, String sessionValue) {
		//引数のクッキーの文字列をメンバに保持する
		this.cookieValue = cookieValue;
		//引数のセッションの文字列をメンバに保持する
		this.sessionValue = sessionValue;
	}

	/*
	 * クラス名:checkLoginState
	 * 概要  :ログイン状態を調べて数値で返す。
	 * 作成者:R.Shibata
	 * 作成日:2016.10.25
	 */
	public int checkLoginState() {
		//返却値の変数に初回ログインの値０をセットする。
		int retState = 0;
		//cookieがあり、sessionが無い場合
		if (cookieValue != null && sessionValue == null) {
			//タイムアウトとして、１をセットする。
			retState = 1;
		}
		//状態の整数値を返す
		return retState;
	}
}
