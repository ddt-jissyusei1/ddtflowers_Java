package ddtflower;

/* クラス名:Constants
 * 概要:サーバーで使用する定数クラス
 * 作成日:2016.10.19
 * 作成者:R.Shibata
 */
public class Constants {
	// DB接続に使用するドライバーのクラス名称
	public static final String JDBC_DRIVER = "org.mariadb.jdbc.Driver";
	// 接続するデータベースのアドレス
	public static final String DSN = "jdbc:mariadb://localhost/ddthink-com00006";
	// 接続するユーザー名
	public static final String DB_USER = "root";
	// 接続するパスワード
	public static final String DB_PASSWORD = "";
	//JSONのdb_getQueryキーの文字列
	public static final String DB_GETQUERY = "db_getQuery";
	//JSONのdb_setQueryキーの文字列
	public static final String DB_SETQUERY = "db_setQuery";
	//JSONのdb_columnキーの文字列
	public static final String DB_COLUMN = "db_column";
	//JSONのtextキーの文字列
	public static final String KEY_TEXT = "text";
	//JSONのhtmlキーの文字列
	public static final String KEY_HTML = "html";
	//JSONのsrcキーの文字列
	public static final String KEY_SRC = "src";
	//JSONのvalueキーの文字列
	public static final String KEY_VALUE = "value";
	//アンダーバー二つの文字列
	public static final String STR_TWO_UNDERBAR = "__";
	//会員番号列の定数
	public static final String COLUMN_NAME_USER_KEY = "user_key";
	// JSONのvalueキーの文字列
	public static final String STR_TABLE_DATA = "tableData";
	// 空文字を示す定数
	public static final String EMPTY_STRING = "";
	// クッキーの有効期限
	public static final int COOKIE_EXPIRATION = 60 * 60 * 24;
	// クッキー、セッション共通キーuserId(ユーザID)の定数
	public static final String USER_ID = "userId";
	// クッキー、セッション共通キーauthority(ユーザ権限)の定数
	public static final String AUTHORITY = "authority";
	// クッキー、セッション共通キーpageAuth(ページ権限)の定数
	public static final String PAGE_AUTH = "pageAuth";
	// jspのセッションクッキー名称
	public static final String JSP_SESSION_COOKIE_NAME = "JSESSIONID";
	// セッションの有効期限（秒）
	public static final int SESSION_EXPIRATION_TIME = 60 * 24;
	// passwordを示す文字列
	public static final String STR_PASSWORD = "password";
	// idを示す文字列
	public static final String STR_ID = "id";
	// JsonのLogin判別キーuserName(ユーザ名)の定数
	public static final String USER_NAME = "userName";
	//返却用JSON文字列、前
	public static final String ERROR_JSON_FRONT = "{\"createTagState\":\"";
	//返却用JSON文字列、後
	public static final String ERROR_JSON_BACK = "\"}";
	//クライアントから取得した置換文字が配列の場合の区切り文字
	public static final String ARRAY_DELIMITER = "','";

	//画像UPLOADで使用する定数
	//送信されたファイルのname属性の値を定数に入れる
	public static final String SEND_IMAGE_NAME = "imageFile";
	//POSTされたディレクトリ名のキー
	public static final String DIRECTORY_KEY = "dir";
	//POSTされたinput type="file"要素のname属性値
	public static final String POSTED_NAME = "postedName";
	//デフォルトの保存先
	public static final String SAVE_DIRECTORY = "/uploadImage/flowerImage/";
	//画像の保存先(表示に使用)
	public static final String IMAGE_DIRECTORY = "uploadImage/flowerImage/";
	//画像保存成功時のメッセージ
	public static final String SUCCESS_UPLOAD_MESSAGE = "画像の保存に成功しました。";
	//画像保存失敗時のメッセージ
	public static final String FAILED_UPLOAD_MESSAGE = "画像の保存に失敗しました。";
	//無効なファイルが送信されたときのメッセージ
	public static final String INVALID_FILE_SEND_MESSAGE = "無効なファイルが送信されました。";
	//無効なファイルが送信されたときのメッセージ
	public static final String NOT_EXIST_FILE_MESSAGE = "ファイルがありません";
	//ファイルタイプが画像である事を示す文字列
	public static final String FILE_TYPE_IMAGE = "image";
	//受信したデータのキー文字列
	public static final String GET_IMAGE_KEY = "photo";
	//データフォーマットを示す定数 (年月日時分秒を数値で出力)
	public static final String DATETIME_FROMAT_STRING ="yyyyMMddHHmmss";

	//記事番号をセッションに入れるためのキー文字列 ブログ作成、編集に使用する
	public static final String KEY_NUMBER = "number";
	//ブログ作成、編集に使用する、文字が数値に変換できたかを示すためのオブジェクトキー
	public static final String KEY_SUCCESS = "success";
	//ブログ作成、編集に使用する、ブログ編集画面のHTMLを示すURL
	public static final String URL_CREATEARTICLE_HTML = "/window/member/page/createarticle.html";
}
