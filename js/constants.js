/**
 * ファイル名:constants.js 概要 :定数定義ファイル 作成日 :2015.0813 作成者 :T.Masuda 場所
 * :js/constants.js
 */

// トップページのファイル名の定数
TOPPAGE_NAME = 'top.php';
USER_ID = 'userId'; // ユーザID
PHP_SESSID = 'PHPSESSID'; // PHPのセッションIDのキー
// サーバへメッセージを送信したという文言
SEND_TO_SERVER_MESSAGE = 'サーバへデータの送信を行いました。';
MESSAGE_SUCCESS_SAVE_ARTICLE = '記事の投稿が完了しました。';
// 有効な画像拡張子
//2016/09/07 r.shibata 有効な拡張子よりtifを削除
VALID_IMAGE_IDENTIFIERS = [ '.jpg', '.jpeg', '.JPG', '.JPEG', '.png', '.PNG',
		 '.pict', '.PICT', '.bmp', '.BMP' ];
// 画像選択で無効な拡張子のファイルを選択した場合の警告
INVALID_IMAGE_FILE_WARNING = '無効なファイルです。以下の拡張子の画像ファイルを選択してください。\n'
		+ VALID_IMAGE_IDENTIFIERS.join('').replace(/\./g, ' ');

// userAgentより取得する名称の内、スマートフォンと判定する文字列群 2016.09.16 r.shibata 追加
VALID_SMARTPHONE_USERAGENT = ['android', 'ipad', 'ipod', 'iphone']

MSL_LIST_PHP = 'list.php'; // MSLのリスト
MSL_DETAIL_PHP = 'detail.php'; // MSLの記事詳細
INIT_JSON = 'source/init.json'; // 初期化の値のJSONファイル
// @add 2015.0627 T.Masuda 定数を大量に追加しました。詳細はGitで確認してください。
PATH_LOGIN_DIALOG_JSON = 'dialog/source/loginDialog.json'; // ログインダイアログのJSONファイルのパス
PATH_LOGIN_DIALOG_HTML = 'dialog/template/loginDialog.html'; // ログインダイアログのテンプレートHTMLファイルのパス
CLASS_HEADER = '.header'; // ヘッダーのクラス
CLASS_LOGOUT_LINK = '.logoutLink'; // ログアウトボタンのクラス

ADMIN_LESSON_INFORMATION = 'adminLessonInformation'; // 管理者日ごとダイアログの内容
CLASS = 'class'; // クラス

LOGIN_DIALOG = 'loginDialog'; // ログインダイアログ
CLASS_LOGIN_DIALOG = '.loginDialog'; // ログインダイアログのクラスのセレクタ
PATH_LOGIN_DIALOG = 'dialog/loginDialog.html'; // ログインダイアログのクラスのセレクタ
CLASS_LOGIN = '.login'; // ログインボタンのクラスのセレクタ
CLICK = 'click'; // クリックイベントの文字列
DOUBLE_TAP = 'doubletap';	// ダブルタップイベントの文字列 2016.10.07 add k.urabe
CLOSE = 'close'; // closeの文字列
CLASS_HEADER = '.header'; // ヘッダーのクラス
PATH_MEMBERPAGE_JSON = 'source/memberPage.json'; // 会員ページのJSON
PATH_MEMBERCOMMON_JSON = 'source/memberCommon.json'; // 会員ページ共通のJSON
PATH_MEMBERPAGE_HTML = 'template/memberPage.html'; // 会員ページテンプレ―ト
MEMBERPAGE_HTML = 'memberPage.html'; // 会員ページのHTML
USER_KEY = 'user_key'; // ユーザキー
VALUE = 'value'; // バリュー
ID = 'id'; // ID
MAIL = 'mail'; // メール
BUTTON = 'button'; // ボタン
SELECTOR_HEAD_LAST = 'head link:last'; // headタグの最後のタグ
PATH_MEMBERPAGE_CSS = '<link href="css/memberPage.css" rel="stylesheet" type="text/css">';
PATH_COURCEGUIDE_CSS = '<link href="css/courseGuide.css" rel="stylesheet" type="text/css">';
PATH_ADMINPAGE_CSS = '<link href="css/adminPage.css" rel="stylesheet" type="text/css">'; // 管理者ページ共通のCSS
PATH_CONTACT_CSS = '<link href="css/contact.css" rel="stylesheet" type="text/css">';
PATH_DAILYCLASSES_JS = '<script type="text/javascript" src="js/dailyClasses.js"></script>';
CLASS_HEADER = '.header'; // ヘッダーのクラス
CLASS_HEADERS = '.memberHeader, .adminHeader'; // 会員ページ、管理者ページのヘッダーのクラス

RESERVED_LESSON_TABLE = 'reservedLessonTable'; // 予約中授業のテーブル
TAG_TR = ' tr'; // trタグ
TAG_TABLE = 'table'; // tableタグ
CANCEL_LESSON_DIALOG_CONTENT = 'cancelLessonDialogContent'; // 授業予約キャンセルダイアログの中身のコンテンツセレクター
CANCEL_LESSON_DIALOG = 'cancelLessonDialog'; // 予約キャンセルダイアログの外枠
ADMIN_EACH_DAY_LESSON_TABLE = 'adminEachDayLessonTable'; // 管理者日ごと授業テーブル
ADMIN_LESSON_LIST_DIALOG = 'adminLessonListDialog'; // 管理者日ごとダイアログ
COLUMN_NAME_DEFAULT_USER_CLASSWORK_COST = 'default_user_classwork_cost';// DBのカラム名、この列の値があれば予約可になる。
WAIT_DEFAULT = 0; // 待ち時間のデフォルト値
LESSON_DETAIL_DIALOG = 'lessonDetailDialog'; // 管理者ページ授業詳細ダイアログ
ADMIN_LESSON_LIST_DIALOG_TR = '.adminLessonListDialog tr'; // 管理者の日ごと授業テーブルの行
ADMIN_LESSON_LIST_DIALOG_TD = '.adminLessonListDialog td'; // 管理者の日ごと授業テーブルのセル
LESSON_DATA = 'lessonData'; // 管理者の授業詳細ダイアログのコンテンツ部分
ADMIN_PAGE_URL = 'window/admin/adminPage.html'; // 管理者ページURL
MEMBER_PAGE_URL = 'window/member/memberPage.html'; // 会員ページURL

// 定数
EXPERIENCE = 'experience';
LESSON = 'Lesson';

// 定数定義
ADMIN_LESSON_LIST_INFORMATION = 'adminLessonInformation'; // 管理者日ごとダイアログの内容
NOW_PAGE = 'nowPage'; // ページングの現在のページのクラス名
PAGING = 'paging'; // ページングのクラス名
PAGING_AREA = 'pagingArea'; // ページングを囲むdivクラス名
CHANGE = 'change'; // イベント名がchangeのときにchangeイベントを登録するための定数
MARGIN_TOP = 'margin-top'; // 上margin
PX_5 = '5px'; // 5PX
PX_115 = '115px'; // 115PX
BLOG_SHOW_PAGES = 30; // ブログ表示記事数。blog.phpでも使う
EMPTY_STRING = ''; // 空文字
SPACE = ' '; // 半角スペース

// セレクターの文字列定数
NORMAL_HEADER = 'header.header'; // 通常のヘッダー
HEADER_VISIBLE = 'header.header:visible'; // 隠してないヘッダー
HEADER_HIDDEN = 'header.header:hidden'; // 隠してあるヘッダー
MAIN_TAG = '.main'; // メインのタグのセレクタ
GUIDES = 'guides'; // ガイド領域
TOP_MENU = 'topMenu'; // トップメニュー
LOCATION = 'flower_clone/'; // サイトルート前
SITE_ROOT = 'http://localhost/' + LOCATION; // サイトルート
IMAGE_PATH = 'uploadImage/flowerImage/'; // アップロード画像フォルダ
UPLOAD_LOCATION = SITE_ROOT + SITE_ROOT; // アップロードURL
SPECIAL_RESERVED_DIALOG_URL = 'dialog/specialReservedDialog.html'; // 体験レッスン予約ダイアログのHMTLファイルURL
ADMIN_NEWLESSON_CREATE_DIALOG_PATH = 'dialog/adminNewLessonCreateDialog.html'; // 授業新規作成ダイアログのHTMLファイルのパス
LESSON_DETAIL_DIALOG_PATH = 'dialog/lessonDetailDialog.html'; // 管理者
																// 授業詳細ダイアログのHTMLファイルのパス
// createLittleContentクラスインスタンスの連想配列内キー用文字列
CREATOR = 'creator';
// 会員ページ 予約一覧ダイアログのcreateLittleContentsクラスインスタンスの連想配列内キー用文字列
RESERVE_LIST_CREATOR = 'reserveListCreator';
NUMBER = 'number'; // numberキーの文字列
STRING = 'string'; // stringの文字列
SHARP = '#'; // #

// 画像縮小時のデフォルトサイズ
DEFAULT_WIDTH = 300; // 画像の縮小サイズ 横
DEFAULT_HEIGHT = 300; // 画像の縮小サイズ 縦
IMG_QUALITY = 80; // 画像圧縮時の品質
USER_IMAGE_UPLOADER = 'uploadImage/imageUpload.php'; // 画像アップローダーのパス

CHAR_DOT = '.';
CHAR_COMMA = ',';
CHAR_HYPHEN = '-';
CHAR_RIGHT_ARROW = '>';
MESSAGE_SUCCESS_RESERVED = '予約を承りました。';
MESSAGE_SUCCESS_CANCELED = '予約をキャンセルしました。';
MESSAGE_SUCCESS_PROFILE_UPDATE = 'プロフィールを変更しました。';
MESSAGE_SUCCESS_PASSWORD_UPDATE = 'パスワードを変更しました。';
MESSAGE_FAILED_RESERVED = '予約の処理に失敗しました。時間をおいてもう一度お試しください。';
MESSAGE_FAILED_CONNECT = '通信に失敗しました。時間をおいてもう一度お試しください。';
MESSAGE_LOGIN_ERROR = 'idまたはパスワードが間違っています';
SELECTOR_ALL_CHILD = '> *'; // 全ての子要素のセレクタ
SELECTOR_ALLCHILD_CLASS_FRONT = ' > *[class="';
SELECTOR_CLOSE_ATTRIBUTE = '"]';
SELECTOR_KEYS = '.keys';
SELECTOR_MAIN = '.main';
SELECTOR_NUMBERING_OUGHTER = '.numberingOuter';
SELECTOR_VALUES = '.values';
SELECTOR_LESSON_TABLE = '.lessonTable';
SELECTOR_RESERVE_LESSON_LIST_DIALOG_TR = '.memberReserveListDialog table tr';
SELECTOR_RESERVE_LESSON_LIST_DIALOG_TD = '.memberReserveListDialog table tr td';
SELECTOR_RESERVE_LESSON_LIST_DIALOG = '.memberReserveListDialog';
SELECTOR_MEMBER_RESERVED_CONFIRM_DIALOG = '.memberReservedConfirmDialog';
SELECTOR_MEMBER_RESERVED_CONFIRM_DIALOG_CONTENT = '.memberReservedConfirmDialogContent';
STR_FAILD_TO_CREATE = 'の作成に失敗しました。'; // outputTagでパーツの作成を失敗したときのメッセージ
STR_ARROW_LEFT_DOUBLE = '<<';
STR_TEXT = 'text';
STR_HTML = 'html';
STR_BODY = 'body';
STR_NUMBERING = 'numbering';
STR_PRE = 'pre';
STR_KEY_AND_VALUE = 'keyAndValue';
STR_VALUELABEL = 'valueLabel';
STR_VALUES = 'values';
STR_KEYS = 'keys';
STR_EDITVALUE = 'editValue';
STR_NAME = 'name';
STR_CLICK = 'click';
STR_STYLE = 'style';
STR_OPEN = 'open';
STR_RESERVE_LESSON_LIST_DIALOG = 'memberReserveListDialog';
STR_LESSON_TABLE_AREA = 'lessonTableArea';
STR_DIALOG = 'dialog';
STR_TR = 'tr';
STR_TD = 'td';
STR_TH = 'th';
STR_JSON = 'json'; // json
STR_DOM = 'dom'; // dom
STR_OBJECT = 'object'; // objectかどうかの判定に使う
STR_TRANSPORT_FAILD_MESSAGE = '通信に失敗しました。'; // 通信失敗のメッセージ
STR_POST = 'POST'; // リクエストのPOSTメソッド設定
STR_HTML = 'HTML'; // AJAXのレスポンスの指定をHTMLにする時に使う
STR_AUTO = 'auto';
STR_FONT_SIZE = 'font-size';
STR_TAG_TABLE = 'tagTable';
STR_LESSON_TABLE = 'lessonTable';
STR_MEMBER_RESERVED_CONFIRM_DIALOG_CONTENT = 'memberReservedConfirmDialogContent';
SYMBOL_UNIT = ' 〜 ';
TAG_DIV = '<div></div>';
TAG_SPAN = '<span></span>';
TAG_LABEL = '<label></label>';
TAG_TEXTAREA = '<textarea></textarea>';
URL_GET_JSON_STRING_PHP = 'php/GetJSONString.php';
URL_GET_JSON_ARRAY_PHP = 'php/GetJSONArray.php';
URL_SAVE_JSON_DATA_PHP = 'php/SaveJSONRecord.php';
STR_LESSON_TABLE = 'lessonTable';
STR_RESERVE_LESSON_LIST_DIALOG = 'memberReserveListDialog';
STR_CENTER_CENTER = 'center center';
STR_MEMBER_RESERVED_CONFIRM_DIALOG = 'memberReservedConfirmDialog';
STR_EVENT = 'event';
STR_COLSPAN = 'colspan';
VALUE_0_5EM = '0.5em';
STR_MEMBER_INFORMATION = 'memberInfomation';
STR_REPLACE_TABLE = 'replaceTable';
SP_SELECTOR_REPLACE_TABLE = ' .replaceTable';
// 処理の分岐のフラグの数値
PATTERN_ADD = 0;
PATTERN_REPLACE = 1;
// outputNumberingTagで用いる記事のオブジェクトの親のキー。
USER_ID = 'userId';
ADMIN_AUTHORITY = '80'; // 管理者権限のIDの定数
ACCOUNT_HEADER = 'accountHeader'; // アカウント管理のJSONのキー
// ページの権限用の名称 2016.10.09 r.shibata
PAGE_AUTHORITY_NAME = 'pageAuth';
EMPTY = ''; // 空文字
SLASH = '/'; // スラッシュ記号
DOT = '.'; // ドット
EQUAL = '=';//イコール 2016.10.09 r.shibata 追加

// ダイアログ固定幅
DIALOG_FIXED_WIDTH = 300;

// ログインエラー時の状態の整数値定数
TITLE = 'title'; // タイトルの文字列
STATE_NOT_LOGIN = 0; // 非ログイン時
STATE_TIMEOUT = 1; // タイムアウト時
LOGIN = 'ログイン'; // ログインダイアログのタイトル「ログイン」
RE_LOGIN = '再ログイン'; // 再ログインダイアログのタイトル「再ログイン」
LOGIN_MESSAGE = ''; // ログインダイアログのメッセージ
RE_LOGIN_MESSAGE = ''; // 再ログインダイアログのメッセージ
URL_LOGIN_DIALOG = 'dialog/loginDialog.html'; // ログインダイアログのHTMLファイルのURL
URL_ADMIN_PAGE = 'adminPage.html'; // 管理者ページのURL
URL_MEMBER_PAGE = 'memberPage.html'; // 管理者ページのURL

DIALOG_DEFAULT_ALERT_CONTENTS = 'dialog/defaultAlertContents.html'; // アラートを出すdomがあるファイル名
DIALOG_RESERVE_LESSON_LIST = 'dialog/memberReserveListDialog.html'; // 会員、予約可能授業一覧ダイアログファイルパス
DIALOG_MEMBER_RESERVED_CONFIRM = 'dialog/memberReservedConfirmDialog.html'; // 会員、授業予約確認ダイアログパス
DIALOG_CANCEL_LESSON = 'dialog/cancelLessonDialog.html'; // 会員、授業予約キャンセルダイアログパス
DIALOG_LESSON_DETAIL = 'dialog/lessonDetailDialog.html'; // 管理者、授業詳細、授業の詳細ダイアログパス
DIALOG_ADMIN_NEW_LESSON_CREATE = 'dialog/adminNewLessonCreateDialog.html'; // 管理者、授業詳細、新規授業作成ダイアログパス
UI_DIALOG_CONTENT = 'ui-dialog-content'; // ダイアログコンテンツのクラス名
DIALOG_CONTENT_ADMIN_LESSON_LIST = 'adminLessonListContent'; // 管理者、授業一覧ダイアログコンテンツ部分
DIALOG_CONTENT_ADMIN_NEW_LESSON_CREATE = 'adminNewLessonCreateContent'; // 管理者、新規授業作成ダイアログコンテンツ部分
DIALOG_CONTENT_RESERVED_LESSON_LIST = 'reserveLessonListContent'; // 会員、予約可能授業ダイアログコンテンツ部分
DIALOG_CONTENT_MEMBER_RESERVED_CONFIRM = 'memberReservedConfirmDialogContent'; // 会員、予約確認ダイアログコンテンツ部分
DIALOG_CONTENT_CANCEL_LESSON = 'cancelLessonDialogContent'; // 会員、予約キャンセルダイアログコンテンツ部分
UI_DIALOG = 'ui-dialog'; // ダイアログクラス名
CLOSE = 'close'; // クローズ処理に使う
DIALOG_CLOSE_BUTTON = 'dialogCloseButton'; // 閉じるボタンクラス名
DEFAULT_ALERT_CONTENTS = 'defaultAlertContents'; // アラートダイアログの外側divのクラス名
TAG_P = ' p'; // pタグ
LESSON_TABLE = 'lessonTable'; // 会員画面予約授業一覧テーブル
LESSON_TABLE_RECORD = 'targetLessonTable'; // 会員画面予約授業一覧テーブルの1行ごとのクラス名
MEMBER_RESERVED_CONFIRM_DIALOG = 'memberReservedConfirmDialog'; // 会員画面予約確認ダイアログ
CANCEL_LESSON_DIALOG = 'cancelLessonDialog'; // 会員画面予約キャンセルダイアログ
ADMIN_LESSONLIST_DIALOG = 'adminLessonListDialog'; // 管理者画面授業設定一覧ダイアログ
LESSON_DETAIL_DIALOG = 'lessonDetailDialog'; // 管理者画面授業詳細設定ダイアログ
ADMIN_NEW_LESSON_CREATE = 'adminNewLessonCreateDialog'; // 管理者画面新規授業作成ダイアログ
ADMIN_MAIL_SEND_DIALOG = 'adminMailSendDialog'; // 管理者画面メール送信ダイアログ
CONFIRM_DIALOG = 'confirmDialog'; // 確認ダイアログ
TITLE = 'title'; // ダイアログの設定のタイトルなどで使う
USER_ID = 'userId'; // ユーザの会員番号key名
TABLE = 'table'; // テーブル。DBから取り出した値のkey名としても使われている
TABLE_DATA = 'tableData'; // テーブルのデータ
LESSON_DATE = 'lessonDate' // レッスン日
TIME_SCHEDULE = 'time_schedule'; // 時間割の列名
LESSON_TABLE_REPLACE_FUNC = 'callReservedLessonValue'; // 予約可能授業一覧置換関数名
ADMIN_LESSON_DETAIL_TABLE = 'adminLessonDetailTable'; // 管理者、授業詳細一覧テーブル
ADMIN_LESSON_DETAIL_TABLE_RECORD = 'targetAdminLessonRecord'; // 管理者、授業詳細一覧テーブルの1行ごとのクラス名
ADMIN_LESSON_DETAIL_TABLE_REPLACE_FUNC = 'callAdminReservedLessonValue'; // 管理者、授業詳細一覧テーブル置換関数名
FINISHED_LESSONTABLE = 'finishedLessonTable'; // 会員、受講済み授業テーブル
FINISHED_LESSONTABLE_REPLACE_FUNC = 'commonFuncs.callMemberLessonValue'; // 会員、受講済み授業テーブル置換関数名
RESERVED_LESSON_TABLE = 'reservedLessonTable'; // 会員、予約中授業テーブル
RESERVED_LESSON_TABLE_RECORD = 'targetCancelReservedLesson'; // 会員、予約中授業テーブルの1行ごとのクラス名
RESERVED_LESSON_TABLE_OUTSIDE = '.reservedLessonTableOutsideArea'; // 会員、予約中授業テーブルの外側のタグのクラス名
RESERVED_LESSON_TABLE_REPLACE_FUNC = 'commonFuncs.callMemberLessonValue'; // 会員、予約中授業テーブル置換関数名
EACH_DAY_RESERVED_INFO_TABLE = 'eachDayReservedInfoTable'; // 管理者、日ごと予約者一覧テーブル
EACH_DAY_RESERVED_INFO_TABLE_RECORD = 'targetEachDayLessonRecord'; // 管理者、日ごと予約者一覧テーブル1行ごとのクラス名
EACH_DAY_RESERVED_INFO_TABLE_REPLACE_FUNC = 'commonFuncs.callEachDayReservedValue'; // 管理者、日ごと予約者一覧テーブル置換関数名
DO_LECTURE_PERMIT_INFO_TABLE = 'doLecturePermitInfoTable'; // 管理者、受講承認テーブル
DO_LECTURE_PERMIT_INFO_TABLE_REPLACE_FUNC = 'commonFuncs.callLecturePermitValue'; // 管理者、受講承認テーブル置換関数名
LECTURE_PERMIT_LIST_INFO_TABLE = 'lecturePermitListInfoTable'; // 管理者、受講承認一覧テーブル
LECTURE_PERMIT_LIST_INFO_TABLE_REPLACE_FUNC = 'commonFuncs.callPermitLessonListValue'; // 管理者、受講承認一覧テーブル置換関数名
SELLCOMMODITY_PERMIT_LIST_INFO_TABLE = 'sellCommodityPermitListInfoTable'; // 管理者、商品購入承認一覧テーブル
SELLCOMMODITY_PERMIT_LIST_INFO_TABLE_REPLACE_FUNC = 'commonFuncs.callSellCommodityPermitListValue'; // 管理者、商品購入承認一覧テーブル置換関数名
ADMIN_LESSON_ADD_BUTTON = 'lessonAddButton'; // 管理者、授業詳細、新規授業の追加ボタン
LESSON_DATA = 'lessonData'; // 管理者、授業詳細、授業データ部分クラス名
COL_TIME_TABLE_DAY_KEY = 'time_table_day_key'; // 授業の時限データのキー名
COL_TIMETABLE_KEY = 'timetable_key'; // スクールの時限ごとのキー名
CREATE_NEW_LESSON_MESSAGE = '新規授業の作成に成功しました。';
CONFIRM_DIALOG_BUTTONS = '.confirmDialog button'; // 確認ダイアログのボタン×2のセレクタ
CLICK = 'click'; // クリックイベント用文字列
CONFIRM_DIALOG_PATH = 'dialog/confirmDialog.html'; // 確認ダイアログのHTMLファイルパス
UI_DIALOG_CLOSEBOX = '.ui-dialog-titlebar-close'; // jQuery UI
													// Dialogのクローズボックスのセレクタ
UI_DIALOG_BUTTON_PANEL = '.ui-dialog-buttonpane'; // jQuery UI
													// Dialogのオプションで作るボタン領域のセレクタ
// 2016.09.16 r.shibata追加 start ユーザトップ画面のテーマ選択関連のセレクタを追加
SELECTOR_ALREADY_RESERVED = "#alreadyReserved"; // 予約中の授業を表示するエリアのセレクタ
SELECTOR_FINISHED_LESSON = "#finishedLesson"; // 受講済みの授業を表示するエリアのセレクタ
SELECTOR_SELECT_THEME = ".selectTheme"; // テーマを設定するエリアのセレクタ
SELECTOR_SELECT_THEMEBOX = ".selectThemebox"; // テーマを選択するセレクトボックスのセレクタ
SELECTOR_THEME_TEXT = ".themeText"; // テーマと表示するエリアのセレクタ
SELECTOR_THEME_SELECT_TEXT = ".themeSelectText"; // 選択したテーマを表示するエリアのセレクタ
// 2016.09.16 r.shibata追加 end

// 選択されたボタンを表す値。
UNSELECTED = -1; // ボタン未選択の値
NO = 0; // いいえ //「はい」ボタンの値
YES = 1; // はい //「いいえ」ボタンの値
CANCEL = 2; // キャンセル
CREATE_NEW = 3; // 新規作成
CONFIRM = 4; // 確認
CLOSE_BUTTON = 5; // 閉じる
LOGIN_NUM = 6; // ログインボタン
EDIT = 7; // 編集ボタン
DELETE = 8; // 削除ボタン
SEND = 9; // 送信ボタン

CONFIRM_DIALOG_WAIT = 30; // 汎用確認ダイアログ関数終了後関数実行までの待ち時間
ARGUMENT_OBJ = 'argumentObj'; // dialogExクラスのインプット用オブジェクト名
RETURN_OBJ = 'returnObj'; // dialogExクラスのアウトプット用オブジェクト名
SELECTOR_LAST = ':last'; // 「一番後ろの要素」の疑似セレクタ
MESSAGE_SEND_SUCCESS_SIMPLE_NOTICE = "メッセージの送信が完了しました。"; // 簡易的なメッセージ送信完了のメッセージ
ROLE = 'role'; // role属性
CONFIRM_DIALOG = 'confirmDialog'; // 確認ダイアログ
SUGGESTION_BOX_CONFIRM_DIALOG = 'suggestionBoxConfirmDialog'; // 目安箱送信確認ダイアログ
MY_BLOG_CONFIRM_DIALOG = 'myBlogConfirmDialog'; // マイブログ更新確認ダイアログ
MAIL_MAGAZINE_CONFIRM_DIALOG = 'mailmagazineConfirmDialog'; // メルマガ送信確認ダイアログ
DESTROY = 'destroy'; // 破棄命令の文字列
MESSAGE_SEND_FAILED_SIMPLE_NOTICE = 'メッセージの送信に失敗しました。時間をおいてお試しください。'; // 簡易的なメッセージ送信失敗のメッセージ
MEMBER_MAIL = 0; // 目安箱 会員メールを示す数値
SUGGESTION_MAIL = 1; // 目安箱 目安箱メールを示す数値
SEND_MEMBERMAIL_PHP = 'php/mailSendEntryMemberMail.php'; // 目安箱 会員メール送信用のPHP
SEND_SUGGEST_PHP = 'php/mailSendEntrySuggest.php'; // 目安箱 目安箱メール送信用のPHP
SEND_MAILMAGA_PHP = 'php/mailSendEntryMagazine.php'; // メルマガ送信用PHP
DIALOG_JS_DIR = 'dialog/js/';
JS_IDENTIFIER = '.js';
TEST_DIALOG = 'testdialog';
DIALOG = 'dialog';
BUTTONS = 'buttons';
OPTION = 'option';

GET_SCRIPT_FAIL_MESSAGE_FRONT = "Faild to get Script File(location:"; // JSファイル取得エラーメッセージの前方
PARENTHESES_REAR = ")"; // 丸括弧閉じ
URL_TEST_DIALOG_CHILD = 'dialog/testdialogchild.html' // テスト用子ダイアログ(2世代目)のURL
COMMON_FUNCS_NOT_EXIST = 'commonFuncs is not exist.'; // 共通関数クラスインスタンスcommonFuncsがないエラーメッセージ
TEST_DIALOG_GRANDCHILD_URL = 'dialog/testdialoggrandchild.html'; // 孫ダイアログURL
TOP_LOCATION = 'top.php'; // トップページ用PHPのURL
LOADING_SCREEN = '.loading' // ローディング画面のセレクタ
DISPLAY = 'display'; // displayの文字列。css用
BLOCK = 'block'; // blockの文字列
NONE = 'none'; // noneの文字列
CANCEL_TEXT = 'キャンセル'; // キャンセルのテキスト
LOGIN_TEXT = 'ログイン'; // ログインのテキスト
LOGIN_BUTTON = 'loginButton'; // ログインボタンのテキスト
USERNAME_SELECTOR = '.userName'; // ユーザ名
CURRENT_DIALOG_SELECTOR = '.dialog:last'; // カレントのダイアログのセレクタ
ERROR_LESSONLIST = '予約可能な授業がありません'; // 予約できる授業がないというメッセージ
LESSON_TABLE = 'lessonTable'; // 授業テーブル
SELECTOR_LESSON_TABLE = DOT + LESSON_TABLE; // //授業テーブルのセレクタ
RESERVE_LIST_JSON = 'dialog/source/memberReserveListDialog.json';
RESERVE_LIST_HTML = 'dialog/template/memberReserveListDialog.html';

LESSON_NEW_BUTTON_TEXT = '新規作成' // 授業新規作成ボタンテキスト

// 会員予約確認、キャンセルダイアログ共通html
MEMBER_LESSON_CONFIRM_DIALOG_HTML = 'dialog/template/memberLessonConfirmDialog.html';
// 会員予約確認、キャンセルダイアログ共通html
MEMBER_LESSON_CONFIRM_DIALOG_JSON = 'dialog/source/memberLessonConfirmDialog.json';

// 会員、予約確認ダイアログ
MEMBER_RESERVE_CONFIRM_DIALOG = 'dialog/memberReserveConfirmDialog.html';
MEMBER_RESERVE_CONFIRM_DIALOG_JS = 'dialog/js/memberReserveConfirmDialog.js';
MEMBER_RESERVE_CONFIRM_DIALOG_HTML = 'dialog/template/memberReserveConfirmDialog.html';
MEMBER_RESERVE_CONFIRM_DIALOG_JSON = 'dialog/source/memberReserveConfirmDialog.json';

// 会員、予約キャンセルダイアログ
MEMBER_RESERVE_CANCEL_DIALOG = 'dialog/memberReserveCancelDialog.html';
MEMBER_RESERVE_CANCEL_DIALOG_JS = 'dialog/js/memberReserveCancelDialog.js';
MEMBER_RESERVE_CANCEL_DIALOG_HTML = 'dialog/template/memberReserveCancelDialog.html';
MEMBER_RESERVE_CANCEL_DIALOG_JSON = 'dialog/source/memberReserveCancelDialog.json';

// 授業詳細・作成ダイアログ共通テンプレート
ADMIN_LESSON_BASE_HTML = 'dialog/template/adminLessonBase.html';
ADMIN_LESSON_BASE_JSON = 'dialog/source/adminLessonBase.json';

// 管理者、授業一覧ダイアログ
ADMIN_LESSON_LIST_DIALOG = 'dialog/adminLessonListDialog.html';
ADMIN_LESSON_LIST_DIALOG_JS = 'dialog/js/adminLessonListDialog.js';
ADMIN_LESSON_LIST_DIALOG_HTML = 'dialog/template/adminLessonListDialog.html';
ADMIN_LESSON_LIST_DIALOG_JSON = 'dialog/source/adminLessonListDialog.json';

// 管理者、授業詳細ダイアログ
ADMIN_LESSON_DETAIL_DIALOG = 'dialog/adminLessonDetailDialog.html';
ADMIN_LESSON_DETAIL_DIALOG_JS = 'dialog/js/adminLessonDetailDialog.js';
ADMIN_LESSON_DETAIL_DIALOG_HTML = 'dialog/template/adminLessonDetailDialog.html';
ADMIN_LESSON_DETAIL_DIALOG_JSON = 'dialog/source/adminLessonDetailDialog.json';

// 管理者、新規授業作成ダイアログ
ADMIN_LESSON_CREATE_DIALOG = 'dialog/adminLessonCreateDialog.html';
ADMIN_LESSON_CREATE_DIALOG_JS = 'dialog/js/adminLessonCreateDialog.js';
ADMIN_LESSON_CREATE_DIALOG_HTML = 'dialog/template/adminLessonCreateDialog.html';
ADMIN_LESSON_CREATE_DIALOG_JSON = 'dialog/source/adminLessonCreateDialog.json';

// ダイアログの共通JSON
COMMON_LIST_DIALOG_JSON = 'source/commonListDialog.json'; //2016.09.21 r.shibata 追加

// テーブルから取り出す列名
COLUMN_NAME_MAX_NUM = 'max_num'; // １限に予約できる最大の数
COLUMN_NAME_START_TIME = 'start_time'; // 授業開始時間
COLUMN_NAME_END_TIME = 'end_time'; // 授業終了時間
COLUMN_NAME_ORDER_STUDENTS = 'order_students'; // 予約している生徒の数
COLUMN_NAME_MAX_STUDENTS = 'max_students'; // 個別の予約できる最大の数
COLUMN_NAME_STUDENTS = 'students';	// ポイントレートに紐付く生徒の数 2016.10.13 add k.urabe
COLUMN_NAME_LESSON_DATE = 'lesson_date'; // 授業受講日
COLUMN_NAME_USER_WORK_STATUS = 'user_work_status'; // ユーザ授業ステータス
COLUMN_NAME_CLASSWORK_STATUS = 'classwork_status'; // 授業ステータス
COLUMN_NAME_POINT_RATE = 'point_rate'; // ポイントレート
COLUMN_NAME_STOP_ORDER_DATE = 'stop_order_date'; // 授業締切日？
COLUMN_NAME_SCHOOL_NAME = 'school_name'; // 店舗名
COLUMN_NAME_LESSON_NAME = 'lesson_name'; // 授業テーマ名
COLUMN_NAME_TODAY = 'today'; // 今日の日付
COLUMN_DEFAULT_USER_CLASSWORK_COST = 'default_user_classwork_cost';// デフォルト授業料
COLUMN_USER_CLASSWORK_COST = 'user_classwork_cost'; // 授業料
COLUMN_LESSON_LEY = 'lesson_key';

COLUMN_CLASSWORK_KEY = 'COLUMN_NAME_TODAY'; // 授業id

// カスタマイズ後の行のKey名
START_END_TIME = 'startEndTime'; // 開始時間と終了時間を合わせたもの
LESSON_DATE_TIME = 'lessonDateTime'; // 年月日を含んだ開始時間と終了時間を合わせたもの
SUM_COST = 'sumCost'; // 受講料の合計
LESSON_POINT = 'lessonPoint'; // レッスン受講で加算されるポイント
LESSON_REST = 'lesssonRest'; // 受講情報の残席情報記号
LESSON_STATUS = 'lessonStatus'; // レッスンの予約状況

// 「テーブルデータ」のキー
TABLE_DATA_KEY = 'tableData';
// 「データ」のキー
DATA_KEY = 'data';
// 日本語に変換した日付文字列
DATE_JAPANESE = 'dateJapanese';
// jQuery UI Position用文字列。ダイアログの座標指定に使う
POSITION = 'position';
DIALOG_POSITION = 'center top'; // ダイアログのポジション
// テーブルの領域名とセレクタ
TABLE_AREA = 'tableArea';
SELECTOR_TABLE_AREA = DOT + TABLE_AREA;
EXPLAIN = 'explain';
CHAR_INVALIDATE = '✕';
TAG_CHILD_TR = ' tr'; // 子セレクタとしてのtr
TEXT_YES = 'はい'; // 「はい」の文字列
TEXT_NO = 'いいえ'; // 「いいえ」の文字列
// 予約キャンセルダイアログ
HTML_MEMBER_RESERVE_CANCEL_DIALOG = 'dialog/memberReserveCancelDialog.html';
// 予約確認ダイアログ
HTML_MEMBER_RESERVE_CONFIRM_DIALOG = 'dialog/memberReserveConfirmDialog.html';
// 整数の4
INT_4 = 4;
// ターゲットの授業テーブル
SELECTOR_TARGET_LESSON_TABLE = '.targetLessonTable';
// 疑似セレクタ eqの文字列 前部
EQ_FRONT = ':eq(';
// 閉じ括弧と子セレクタtd
CLOSE_AND_TD_TAG = ') td';
// 閉じるテキスト
STR_CLOSE_JP = '閉じる';
// キャンセルテキスト
STR_CANCEL_JP = 'キャンセル';
// createTagクラスインスタンス用変数orキー名
VAR_CREATE_TAG = 'create_tag';
// ログインダイアログのテンプレートHTLMパス
PATH_LOGIN_DIALOG_TEMPLATE = 'dialog/template/loginDialog.html';
// ログインダイアログのJSONパス
PATH_LOGIN_DIALOG_JSON = 'dialog/source/loginDialog.json';
// クラスインスタンスを表すinstanceの文字列
INSTANCE = 'instance';
// 各ダイアログ専用クラスインスタンス用の変数orキー名
DIALOG_BUILDER = 'dialogBuilder';
// パスワードのセレクタ
PASSWORD_SELECTOR = '.password';
// ハッシュの文字
CHAR_HASH = '#';
// ユーザ名とパスワードをまとめたセレクタ
SELECTOR_USERNAME_PASSWORD = '.userName, .password';
// ログインボタンのセレクタ
SELECTOR_LOGIN_BUTTON = DOT + LOGIN_BUTTON;
// 最新のダイアログのセレクタ
CURRENT_DIALOG = DOT + DIALOG + SELECTOR_LAST;
// ログインダイアログのJSファイルのURL
URL_LOGIN_DIALOG_JS = 'dialog/js/loginDialog.js';
// 入力エリア
INPUT_AREA = 'inputArea';

// 体験レッスン予約希望ダイアログのJSファイルパス
EXPERIENCE_RESERVED_DIALOG_JS = 'dialog/js/experienceReservedDialog.js';
// 同JSONファイルのパス
EXPERIENCE_RESERVED_DIALOG_JSON = 'dialog/source/experienceReservedDialog.json';

ALLDAY_CHECKBOX = '.allDayCheckbox';
ALLWEEK_CHECKBOX = '.allWeekCheckbox';
CHECKBOX_DAYOFWEEK = 'input[name="dayOfWeek"]';
CHECKBOX_WEEK = 'input[name="week"]';
DIALOG_CLASS = 'dialogClass';
STR_SEND_JP = '送信';
// 体験レッスン予約確認ダイアログのHTMLファイルのURL
EXPERIENCE_RESERVED_CONFIRM_DIALOG_URL = 'dialog/experienceReservedConfirmDialog.html';
EXPERIENCE_RESERVED_CONFIRM_DIALOG_JS = 'dialog/js/experienceReservedConfirmDialog.js';
EXPERIENCE_RESERVED_CONFIRM_DIALOG_JSON = 'dialog/source/experienceReservedConfirmDialog.json';
EXPERIENCE_RESERVED_CONFIRM_DIALOG_HTML = 'dialog/template/experienceReservedConfirmDialog.html';

// 確認ダイアログjs
CONFIRM_DIALOG_JS = 'dialog/js/confirmDialog.js';

// 体験レッスン予約希望ダイアログの入力チェック用の定数群
// 必須入力を行う入力フォームのname属性を配列に入れる。
EXPERIENCE_CHECK_FORMS = [ 'construct', 'course', 'schedule', 'name',
		'nameKana', 'personPhoneNumber', 'email', 'personEmailCheck',
		'personCount' ];
// 必須入力を行う入力フォームのname属性の日本語版を連想配列で用意する。
EXPERIENCE_CHECK_FORMS_JP_NAME = {
	reservedDate : '希望日',
	construct : '希望作品',
	schedule : '希望時限',
	dayOfWeek : '可能曜日',
	week : '可能週',
	name : 'ご氏名',
	nameKana : 'ご氏名(カタカナ)',
	personPhoneNumber : '電話番号',
	email : 'メールアドレス',
	personEmailCheck : 'メールアドレス(確認)',
	personCount : '人数',
	course : 'コース'
};
// 入力項目のエラー別メッセージの連想配列。
EXPERIENCE_CHECK_FORMS_ERROR_TEXT = {
	emptyList : "以下の項目が未入力となっています。\n",
	onlyAlphabetList : "以下の項目は半角英数字記号のみを入力してください。\n",
	emailCheck : "確認のため、同じメールアドレスもう一度入力してください。\n\n",
	numberList : "以下の項目の数値を1以上で入力してください。\n"
}
// 体験レッスン予約希望ダイアログのパーツ名群
RESERVED_DATE = 'reservedDate';
RESERVED_SUMMARY = 'reservedSummary';
SPECIAL_CONTRUCT = 'radioButtonSpecialConstruct';
SPECIAL_SCHEDULE = 'radioButtonSpecialSchedule';
SUBINFO = 'subInfo';
PERSON_INFORMATION = 'personInformation';
MAIL_SUBJECT = 'mailSubject';

// 体験レッスン予約希望ダイアログ 入力チェックのリスト名称群
EMPTY_LIST = 'emptyList';
ONLY_ALPHABET_LIST = 'onlyAlphabetList';
EMAIL_CHECK = 'emailCheck';
NUMBER_LIST = 'numberList';
// 体験レッスン予約希望ダイアログ 英数字入力チェック対象のセレクタ
IS_ALPHABET_CHECK_ELEMS_RESERVED_DIALOG = 'input[name="personPhoneNumber"], input[name="email"], input[name="personCount"]';
SELECTOR_PERSON_MAIL = '.personEmail input';
SELECTOR_PERSON_MAIL_CHECK = '.personEmailCheck input';
SELECTOR_COUNT = '.count';
ESCAPE_KAIGYOU = "\n"; // 改行のエスケープ文字
DISABLED = 'disabled';
FORM_ELEMS = 'input,button,textarea,select'; // フォームで使うタグ
FORM_DATA = 'formData';
SELECTOR_NAME_FRONT = '[name="'; // name属性を指定して取得するinputタグのセレクタの前部
SELECTOR_INPUT_NAME_FRONT = 'input[name="'; // name属性を指定して取得するinputタグのセレクタの前部
SELECTOR_ATTR_REAR_AND_CHECKED = '"]:checked'; // 属性を指定するセレクタの閉じ括弧＋チェックが入った要素の疑似セレクタの文字列
RADIO = 'radio';
CHECKBOX = 'checkbox';
TYPE = 'type';
FORM_VALIE_INPUTS = 'input:text, input[type="email"], textarea, input:radio:checked, input:checkbox:checked, input:hidden,input[type="number"], input[type="search"], input[type="tel"], input[type="password"]';
ATTR_DISABLED = '[disabled]';
// jQuery UI Positionの設定。X座標は中心 Y座標は画面上部に配置される様にする
POSITION_CENTER_TOP = {
	my : 'center top',
	at : 'center top',
	of : window
};
EXPERIENCE_RESERVED_COMPLETE_MESSAGE = '以上の内容でご予約の希望を承りました。\n追ってメールでの連絡をいたします。\n確認のメールがしばらく経っても届かない場合は、入力されたメールアドレスに誤りがある可能性がございます。\nもう一度メールアドレスを入力してご予約の操作を行ってください。';
EXPERIENCE_RESERVED_FAILED_MESSAGE = 'メールの送信に失敗しました。時間を置いてお試しください。';
SUBMIT = 'submit';
FORM = 'form';
ACTION = 'action';
MAIL_SEND_COMPLETE_CGI = '.mailSendComplete';
SEELCTOR_CONF_BACK_BUTTON = '.confBackButton';
SEND_COMPLETE = 'sendComplete';

// 管理者ページ 授業一覧ダイアログのボタン判別定数
CREATE_NEW_LESSON = 0; // 新規作成ボタン
EDIT_LESSON = 1; // 行クリック(授業詳細ダイアログを開く)
// 管理者ページ 授業新規作成ダイアログのURL
URL_ADMIN_LESSON_CREATE_DIALOG = 'dialog/adminLessonCreateDialog.html';
// 管理者ページ 授業詳細ダイアログのURL
URL_ADMIN_LESSON_DETAIL_DIALOG = 'dialog/adminLessonDetailDialog.html';
// クリックした行という意味合いのキー用文字列
CLICKED_ROW = 'clickedRow';
// 確認ダイアログのURL
URL_CONFIRM_DIALOG = 'dialog/confirmDialog.html';

// getInpuData関数内で使うセレクタ。inputタグ、selectタグ、textareaタグのデータをセレクタで指定
SEL_INPUT_DATA = 'input,select,textarea';

// dialogExファイル定数化作業分
MAILMAGA_SEND_SUCCESS = "メルマガを送信しました。"; // メルマガ送信後の完了メッセージ

// 授業作成ダイアログでデータを取得する先の親のクラス名
CLASS_NEW_LESSON_DATA_P = 'lessonData';

// commonJson.js
// レッスン予約数ステータス
CAN_RESERVED = 0;
HELD_ALREADY = 1;
STOP_RESERVED_2 = 2;
STOP_RESERVED_3 = 3;
CANNOT_RESERVED = 4;

// ユーザがレッスンを予約したステータス
HAS_RESERVED_0 = 0;
HAS_RESERVED_1 = 1;
RECEIPT = 2;
HAS_LECTURES = 3;
CANCEL_CUSTOMER = 10;
CANCEL_ADMIN = 11;
STOP_LESSON = 12;

// 2016.09.13 add k.urabe カレンダーのハイライト処理に使用する授業がある日を表す定数を追加
DEFAULT_LESSON = 99;
// 2016.09.20 add k.urabe カレンダーのハイライト処理に使用する授業がない日を表す定数を追加
NOT_LESSON = 100;

// 2016.09.13 add k.urabe カレンダーのハイライト処理に使用する色を判定するクラス名(4種)
DATE_HAS_LESSON = 'dateHasLesson';
DATE_CANCEL_LESSON = 'dateCancelLesson';
DATE_STOP_LESSON = 'dateStopLesson';
DATE_HAS_CLASS = 'dateHasClass';
// 2016.09.20 add k.urabe カレンダーのハイライト処理に使用する色を判定するクラス名（授業がない日）
DATE_NOT_LESSON = 'dateNotLesson';
// 2016.10.06 add k.urabe カレンダーのハイライト処理に使用する全ての色を判定するクラス名
HIGHLIGHT_CLASS_NAME = DATE_HAS_LESSON + SPACE + DATE_CANCEL_LESSON + SPACE + DATE_STOP_LESSON + SPACE + DATE_HAS_CLASS + SPACE + DATE_NOT_LESSON;

// 残席のマーク
MARK_DOUBLE_CIRCLE = 7;
MARK_CIRCLE = 4;
MARK_TRIANGLE = 1;
MARK_CROSS = 0;

// 予約済みの授業かつ、満席になっている授業を判別するための追加文字列 2016.10.13 add k.urabe
LESSON_FULL_RESERVED = '(予約済み)';

LESSON_DATA = 'lessonData';
TEXT_LESSON_CREATE_BUTTON = '授業作成';
TABLE_OUTER = 'tableArea'; // テーブルタグの外側を囲むdivタグクラス名

// setValueDBdata関数の第三引数で値をテキストボックスなどに入れる時にDBから取り出したテーブルの値を使ってテキストボックスに値を入れるためのフラグ
SET_ARRAY_TYPE_KEY_DB = 'keyTable'

// 授業詳細ダイアログ
TEXT_LESSON_UPDATE_BUTTON = '更新';
TEXT_LESSON_STUDENTS_BUTTON = '受講者一覧';

// 新規作成ボタン
LESSSON_NEW_BUTTON_TEXT = '新規作成';
// 全選択テキスト 2016.09.13 r.shibata 追加
TEXT_ALL_SELECT = '全選択'

// 授業確認内容ダイアログ、キャンセル料率と加算ポイントの親となるセレクタ名
CLASS_ATTENTION = 'attention';
// 全選択チェックボックスエリア名称
SELECT_ALL_ROW  = 'selectAllRow';
// 全選択チェックボックスのセレクタ
SELECTOR_SELECT_ALL_ROW_CHECKBOX = '.selectAllRowCheckBox';
// 全選択チェックボックスのラベルのセレクタ
SELECTOR_SELECT_ALL_ROW_LABEL    = '.selectAllRowLabel';

// 管理者、会員一覧で選択されたユーザにつくセレクタ-名
SEL_SELECT_USER = '.selectRecord';
// 管理者、会員一覧で選択されたユーザにつくセレクタ-の名称 2016.09.11 r.shibata 追加
SELECT_RECORD = 'selectRecord';
// 一人もユーザが選択されていない状態でメールダイアログまたはお知らせダイアログを開くボタンを押した時の処理
TEXT_ERROR_SELECT_USER = '1人以上選択してください';
// ユーザ名のセレクタ
SEL_USER_NAME = '.user_name';
// ユーザのメールアドレスのセレクタ
SEL_MAIL_ADDRESS = '.mail_address';
// ユーザの会員番号のセレクタ
SEL_USER_NUMBER = '.user_number';

// 会員、確認ダイアログ
CLASS_LESSON_CONFIRM_CONTENT = 'lessonConfirmContent';
CLASS_LESSON_INFO = 'lessonConfirmInfo'; // 会員、確認ダイアログ、授業情報クラス名
CLASS_INFO_ACCORDION = 'lessonAccordion'; // 会員、確認ダイアログ、アコーディオンを開くきっかけとなるリンククラス名
CLASS_LESSON_ACCORDION = 'attention'; // 会員、確認ダイアログ、アコーディオンの親となる要素のクラス名
CLASS_MEMBER_CONFIRM = "confirmText"; // 会員、確認ダイアログ、確認テキストのクラス名

// 管理者、授業詳細と新規授業追加ダイアログ
CLASS_LESSON_DATA = 'lessonData'; // 授業データの一番上となるクラス名
CLASS_LESSON_THEME = 'themeArea'; // 授業のテーマ選択の領域クラス名
CLASS_LESSON_TIMETABLE = 'timeTableArea'; // 授業時間割領域クラス名
CLASS_LESSON_MIN_STUDENTS = 'minStudentsArea'; // 授業最少人数設定領域クラス名
CLASS_LESSON_MAX_STUDENTS = 'maxStudentsArea'; // 授業最大人数設定領域クラス名
CLASS_TIME_MIN_STUDENTS = 'minNumArea'; // 時間帯最少人数設定領域クラス名
CLASS_TIME_MAX_STUDENTS = 'maxNumArea'; // 時間帯最大人数設定領域クラス名
CLASS_LESSON_STATUS = 'statusArea'; // 授業、受講状況設定領域クラス名
CLASS_LESSON_CLASSROOM = 'classRoomArea'; // 授業教室設定領域クラス名
CLASS_LESSON_MEMO = 'memoArea'; // 授業メモ設定領域クラス名

// 管理者、メール・お知らせダイアログ
UNSELECTED_USER = 0; // 会員が一人も選択されていないときの数値

// dialogEx.js
WINDOW_EX_PATH = 'js/windowEx.js'; // windowEx.jsのパス
DIALOG_INSTANCE = 'dialogBuilder'; // ダイアログを作るインスタンス名
DIALOG_DISP_MESTHOD = 'dispContents'; // ダイアログのコンテンツを作るメソッド名
EVENT_CREATE = 'create'; // ダイアログを生成したときに発生するイベント名

// dialog/js/experienceReservedDialog.js
EXPERIENCE_RESERVED_DIALOG_HTML = 'template/reserved.html';
EXPERIENCE_CONFIRM_TEXT = '入力した内容で体験レッスンの予約希望を送信します。';
SEL_FORM_DIALDOG = 'form.dialog';
EXPERIENCE_MAIL_SEND_PHP = 'php/mailSendEntryExperienceReserved.php';

// loginDialog.js
KEY_LOGIN = 'login';
KEY_LOGIN_ID = 'userName';
KEY_LOGIN_PASSWORD = 'password';

// adminLessonListDialog.js
EXPLAIN_FIRST = 'explain1'; // 授業一覧ダイアログ記号説明概要
TMP_CREATE_TABLE = 'template/createTable.html'; // テーブルテンプレート
TMP＿TABLE_AREA = 'template/tableArea.html'; // テーブルを囲むdivタグテンプレート
TMP_LESSON_STATUS = 'template/lessonStatus.html'; // 授業ステータステンプレ―ト

// adminMailDialog.js
ADMIN_MAIL_DIALOG_JSON = 'dialog/source/adminMailDialog.json'; // 管理者、メールダイアログ
ADMIN_MAIL_DIALOG_HTML = 'dialog/template/adminMailDialog.html';
ADMIN_MAIL_DIALOG_JS = 'dialog/js/adminMailDialog.js';
KEY_MAIL_FORM = 'mailForm';
SEL_MAIL_SEND_CONTENT = '.mailSendContent'; // メールの内容を入力する親となるセレクター名
SEL_MESSAGE_TITLE = '.message_title'; // メッセージのタイトル
SEL_MESSEAGE_CONTENT = '.message_content' // メッセージ内容
MAIL_SEND_MEMBER_PHP = 'php/mailSendEntryMemberMail.php';
SUCCESS_MESSAGE_MAIL = 'メールの送信に成功しました。';
KEY_MESSAGE = 'message';

// baseDialog.js
TEXT_BUTTON_NEW = '新規作成';
TEXT_BUTTON_SEND = '送信';
TEXT_BUTTON_RESET = 'リセット';
TEXT_BUTTON_CONFIRM = '確認';

// errrMessaes 配列errorMessagesのエラーメッセージの配列インデックス番号
ERROR_CONNECT_ = 0; // 接続失敗
ERROR_LOGIN_CONNENCT = 1; // ログイン認証失敗
ERROR_SERVER_CONNECT = 2; // サーバー通信失敗
ERROR_LOGIN_EMPTY = 3; // ログイン、idまたはパスワードが空白

// memberReserveListDialog
NO_TABLE_DATA = 0; // DBから取り出した値が0
REST_COLUMN_NUM = 4; // 残席の列がテーブルの4番目にある
RESERVED_LESSON_STATUS = 1; // 授業予約済みステータス
// 操作ステータス
PROCESSING_RESERVE = 0; // 予約操作を行う
PROCESSING_RESERVE_AGAIN = 1;
PROCESSING_CANCEL = 2; // 予約キャンセル操作を行う

KEY_DB_SETQUERY = 'db_setQuery';
KEY_DB_GETQUERY = 'db_getQuery';

NUMBERING_START = 1; // ページングの最初の表示する値。1つ目のコンテンツからから表示
NUMBERING_PAGE = 4; // ページング化される数。5ページ目から＞＞の記号になる
NUMBERING_DEFAULT = 1; // ページングは1ページ目から表示する
NUMBERING_DISPLAY = 15; // ページングの1つのページにつき、15件を表示するようにする  2016.10.02 k.urabe 当該定数を使用するべき箇所の数値に合わせて修正（作成済み定数が未使用であった）
NUMBERING_DISPLAY_FINISHEDLESSON_TABLE = 10; // ページングの1ページにつき10件を表示する（受講済みの授業テーブル) 2016.10.06 r.shibata 追加

// 会員ページトップ予約関連処理
MESSAGE_FAILED_LESSON_RESERVE_TEXT = '選択したの授業の予約に失敗しました。\n時間を置いてお試しください。'; // 予約失敗テキスト
MESSAGE_FAILED_LESSON_CANCEL_TEXT = '選択した授業のキャンセルに失敗しました。\n時間を置いてお試しください。'; // 予約キャンセル失敗テキスト

// テーブルの最初の行を含まないセレクタ
SEL_NO_TABLE_FIRST_ROW = ':not(:first)';

// DBデータの更新に成功したときに帰ってくる値
SETQUERY_FAILED = 0;

// 管理者画面 ユーザ一覧 会員IDのJSONのキー
KEY_MEMBER_NUMBER = 'memberNumber';
// ユーザの会員番号のセレクタ
SEL_ID = '.id';
// お知らせ
ANNOUNCE = 'announce';

// 日本語の「メール」文字列
STR_JP_MAIL = 'メール';
// 日本語の「お知らせ」文字列
STR_JP_ANNOUNCE = 'お知らせ';
// 管理者画面 メール送信のPHP
SEND_ADMINMAIL_PHP = 'php/mailSendEntryAdminMail.php';
// 整数300
INT_300 = 300;

// 体験レッスン予約希望メールの件名
// 管理者向け
EXPERIENCE_MAIL_SUBJECT_ADMIN = "DDTフラワーズ　体験レッスン予約希望メール";
// お客様向け
EXPERIENCE_MAIL_SUBJECT_CUSTOM = "DDTフラワーズ　体験レッスンの予約希望を承りました。";
// 体験レッスン予約希望メールの前置き
// 管理者向け
EXPERIENCE_MAIL_INTRODUCTION_ADMIN = '以下の内容で体験レッスンの予約希望を承りました。'
		+ ESCAPE_KAIGYOU + ESCAPE_KAIGYOU;
// お客様向け
EXPERIENCE_MAIL_INTRODUCTION_CUSTOM = 'DDTフラワーズへのご予約のご希望ありがとうございます。\nご予約のご希望の内容は以下の通りになります。\nご確認のほどをよろしくお願いいたします。'
		+ ESCAPE_KAIGYOU + ESCAPE_KAIGYOU;

// 体験レッスン予約希望メール送信後のメッセージ
// 送信成功時
EXPERIENCE_MAIL_SEND_SUCCESS = "ご入力の内容でご予約の希望を承りました。\n追ってメールでの連絡をいたします。\n確認のメールがしばらく経っても届かない場合は、入力されたメールアドレスに誤りがある可能性がございます。\nもう一度メールアドレスを入力してご予約の操作を行ってください。";
// 送信失敗時
EXPERIENCE_MAIL_SEND_FAILED = "メールの送信に失敗しました。時間を置いてお試しください。";
// お客様にだけ送信された場合
EXPERIENCE_MAIL_SEND_ONLY_CUSTOM = "メールの送信に失敗しました。時間を置いてお試しください。\nまた、予約を承ったという旨のメールが送信されている可能性がございます。\nお手数ですが、受信された場合は削除をお願いいたします。";
// 管理者側にだけ送信された場合(通常通り予約OK)
EXPERIENCE_MAIL_SEND_ADMIN = "ご入力の内容でご予約の希望を承りました。\n追ってメールでの連絡をいたします。\n確認のメールがしばらく経っても届かない場合は、入力されたメールアドレスに誤りがある可能性がございます。\nもう一度メールアドレスを入力してご予約の操作を行ってください。";

// 各トップページのリスト
WINDOW_URLS = {
	usuall : TOPPAGE_NAME,
	member : "window/member/memberPage.html",
	admin : "window/admin/adminPage.html",
	test : "window/test/testWindow.html"
};
// フラワートップウィンドウを示すセレクタ 2016.12.27 r.shibata 追加
USUALL_WINDOW = '.window[name="usuall"]'

// カレントのウィンドウ
CURRENT_WINDOW = '.window:last';
CURRENT_WINDOW_MAIN = CURRENT_WINDOW + ' .main';
//カレントウィンドウのカレンダー 2016.10.14 r.shibata 追加
CURRENT_WINDOW_CALENDAR = CURRENT_WINDOW + ' .calendar';
DIR_ADMIN_PAGE = 'window/admin/page/';
DIR_MEMBER_PAGE = 'window/member/page/';

// 各トップページHTML
URL_MEMBER_TOP = 'memberTop.html';
URL_ADMIN_TOP = 'adminTop.html';
// adminLessonDetailDialog
TIME_CUT_S = 0; // 授業開始時間切り取り開始数字
TIME_CUT_E = 5; // 授業終了時間切り取り終わり数字
MES_LESSON_EDIT_SUCCESS = '授業内容の更新に成功しました。';// 授業内容更新成功メッセージ
MES_LESSON_EDIT_FAILED = '授業内容の更新に失敗しました。時間を置いて試してください。';// 授業内容更新成功メッセージ
// 記事オブジェクトのキー
ARTICLE_OBJECT_KEY = 'tableData';
CHECKED = 'checked'; // 「チェック済み」の意味合いの文字列
// 目安箱メール入力エリア
SEL_SUGGESTION_AREA = '.suggestionArea';
PATH_SEND_MEMBERMAIL_PHP = 'php/mailSendEntryMemberMail.php';
PATH_SEND_SUGGESTION_PHP = 'php/mailSendEntrySuggest.php';
// 予約締切
RESERVE_AFTER_DEADLINE = '予約締切';
// メール送信確認前に空欄があったときの警告
ALERT_EMPTY_CONTENTS = '空欄があります。タイトル、お問い合わせ内容の記入をお願いします。';
// デフォルトの最大表示行数
DEFAULT_SHOW_MAX_ROW = 15;
// 選択されているタブのセレクタ 2016.12.29 r.shibata
SELECTOR_SELECT_TAB = '.tabPanel.active'
// 選択されているページャのセレクタ 2016.10.06 add k.urabe
SELECTOR_SELECT_PAGE = '.numbering .select:visible';
// 記事投稿選択前のメッセージ
SAVE_ARTICLE_BEFORE_CONFIRM_MESSAGE = '入力した内容で記事を投稿します。';
// 記事投稿選択前の確認ダイアログのタイトル
SAVE_ARTICLE_BEFORE_CONFIRM_TITLE = '記事投稿';
// メルマガ DB登録成功かつ送信失敗のメッセージ
SEND_MAILMAGA_FAIL_HALF = 'DBへのメルマガの登録が完了しましたが、メルマガの送信に失敗しました。時間をおいてから再度メルマガの送信を行ってください。'
// メルマガ DB登録の時点で失敗したときのメッセージ
SEND_MAILMAGA_FAIL_ALL = 'メルマガの登録に失敗しました。時間をおいてお試しください。';
// 受講者一覧のJSON、HTMLファイル
ADMIN_LESSON_USER_LIST_DIALOG_JSON = 'dialog/source/adminLessonUserListDialog.json';
ADMIN_LESSON_USER_LIST_DIALOG_HTML = 'dialog/template/adminLessonUserListDialog.html';

// マイギャラリーの表示記事数
MYGALLERY_SHOW_NUMBER = 6;
// メルマガ送信テーブルの表示記事数
MAILMAGA_TABLE_SHOW_NUMBER = 15;

// createTagのJSON内ブログのテーブルデータのキー
BLOG_TABLE_KEY = "blogTable";
// ワイルドカード
WILD_CARD = '*';
// onclickイベント
ONCLICK_EVENT = 'onclick'
// 最初のAタグ
FIRST_ANCHOR_TAG = 'a:first';
// ブログ最新記事一覧の各項目
CURRENT_ARTICLE_LIST_CONTENTS = '.currentArticleList li';
// 段落タグ
PARAGRAPH_TAG = 'P';
// 小さい文章タグ
SMALL_TAG = 'SMALL';
// 時刻タグ
TIME_TAG = 'TIME';
// ブログの記事指定表示コード前半・後半
CURRENT_ARTICLE_CODE_FRONT = 'create_tag.createOneTableArticle(';
CURRENT_ARTICLE_CODE_REAR = ', "blogTable", SETTING_CURRENT_ARTICLE_CODE)';
// ブログの記事指定表示コードの設定オブジェクト
// 2016.09.09 r.shibata callBackの引数に'.blogTable'を指定
SETTING_CURRENT_ARTICLE_CODE = {
	startPage : 1,
	displayPageMax : 1,
	pageNum : 1,
	targetArea : ".blogArticles",
	callBack : "create_tag.createMyBlogImages('.blogTable')",
	createTagSelector : void (0)
};
// 記事番号保持用のタグを示すセレクタ 2016.12.29 r.shibata 追加
SELECTOR_VALUE_HOLDER = '.valueHolder';

// outputNumberingTagで一件だけ表示する場合の数
SHOW_ONLY_ONE_ARTICLE_NUM = 1;
// outputNumberingTagで1ページ目を指定して表示する場合の数
FIRST_DISPLAY_PAGE = 1;
// outputNumberingTagで最初のコール時に開始ページを指定する場合の数
START_PAGE_NUM = 1;
// 受講承認一覧テーブルのナンバリングの最大個数(0で1個)
LECTUREPERMITLIST_TABLE_NUMBERING_MAX = 4;
// 受講承認一覧テーブルの最大行数
LECTUREPERMITLIST_TABLE_MAX_ROWS = 15;
// 受講承認一覧を表示した後の処理関数の文字列
AFTER_RELOAD_LECTUREPERMITINFOLIST_FUNC = 'afterReloadPermitListInfoTable';
// outputNumberingTagでcreateTagをonclick内で取得するための文字列。受講承認一覧版
GET_LECTUREPERMITLIST_CREATE_TAG = "$('#lecturePermitList')[0].";
// 受講承認一覧を表示した後の処理関数の文字列
AFTER_RELOAD_SELLCOMMODITYPERMITINFOLIST_FUNC = 'afterReloadSellCommodityPermitListInfoTable';
// outputNumberingTagでcreateTagをonclick内で取得するための文字列。受講承認一覧版
GET_SELLCOMMODITYPERMITLIST_CREATE_TAG = "$('#sellCommodityPermitList')[0].";

// サーバとの通信失敗時のエラーメッセージ
FAIL_TO_CONNECT_MESSAGE = 'サーバとの通信に失敗しました。時間を置いてアクセスしてください。'
// ログアウト処理ファイルのURL
LOGOUT_URL = 'php/LogoutSession.php';
// ゲストID、パス
GUEST_ID = '9999';
GUEST_PASS = 'xxxxxx';
// ログイン用クッキー削除用文字列前半後半
DELETE_COOKIE_FRONT = 'userId=;expires=';
DELETE_COOKIE_REAR = ';authority=;expires=';
// ギャラリーのテーブル
GALLERY_TABLE = 'galleryTable';
// ギャラリーのテーブルエリアのセレクタ
GALLERY_AREA = '.galleryArea';
// ギャラリーのテーブルのセレクタ
SELECTOR_GALLERY_TABLE = '.galleryTable';
// マイギャラリーのテーブルのセレクタ
SELECTOR_MY_GALLERY_TABLE = '.myGalleryTable';

// 管理者権限ではないアカウントで管理者画面にアクセスしようとしたときの警告文
ALERT_NOT_ADMIN_USER_ACCESS = '管理者権限ではないユーザでは管理者画面を表示できません。';
// 受講承認画面の承認ボタン
SELECTOR_DOLECTUREPERMIT_BUTTON = '.doLecturePermitButton';
// 受講承認画面のチェックが入ったチェックボックス
SELECTOR_DOLECTUREPERMIT_SELECTED_CHECKBOX = '.permitCheckbox:checked';
// 受講承認時に対象のレコードが存在しなかった場合の警告
ALERT_NEED_SELECT_LECTUREPERMIT_RECORD = '受講承認を行うレコードを選択してください。';
// 受講承認時に対象のレコードが存在しなかった場合の警告
ALERT_NEED_SELECT_SELLCOMMODITYPERMIT_RECORD = '商品購入承認を行うレコードを選択してください。';
// 受講承認処理完了時のメッセージの序文
MESSAGE_RESULT_DOLECTUREPERMIT = '以下の生徒の受講承認処理が完了しました。\n';
// 受講承認処理完了時のメッセージの序文
MESSAGE_RESULT_SELLCOMMODITYLECTUREPERMIT = '以下の生徒の商品購入承認処理が完了しました。\n';
// 更新件数を知らせるメッセージ
NOTICE_RECORD_UPDATE_MESSAGE_AND_NUMBER = '件のレコードを更新しました。';
// 受講承認一覧テーブルの領域
SELECTOR_LECTUREPERMITLIST_OUTSIDE = '.lecturePermitListInfoTableOutsideArea';
// 受講承認一覧テーブルの領域 2016.09.11 r.shibata 追加
SELECTOR_LECTUREPERMITLIST_INFOTABLE = '.lecturePermitListInfoTable';
// 受講承認一覧テーブル内のテキストボックスを指定するセレクタ 2016.10.07 add k.urabe
SELECTOR_LECTUREPERMITLIST_REPLACE_TEXTBOX= '.lecturePermitListInfoTable .replaceTextbox';
// 受講承認異常終了用のメッセージ
ALERT_LECTUREPERMIT_PROCESS_ERROR = '更新処理中にエラーが発生したため更新処理を途中で終了しました。\n';
// 商品購入承認以上終了用のメッセージ
ALERT_SELLCOMMODITYPERMIT_PROCESS_ERROR = '更新処理中にエラーが発生したため更新処理を途中で終了しました。\n';
JS_EOL = '\n'; // 改行文字
// 受講承認タブのセレクタ(id) 2016.09.30 k.urabe 不足していたセレクタを追加
SELECTOR_LECTURE_PERMIT = '#lecturePermit';
// 受講承認一覧の各行のクラス名 2016.10.07 add k.urabe
LECTUREPERMITLIST_RECORD = 'lecturePermitListRecord';
// 受講承認一覧の各行のセレクタ
SELECTOR_LECTUREPERMITLIST_RECORD = '.lecturePermitListRecord';
// 商品購入承認一覧の各行のクラス名 2016.10.07 add k.urabe
SELLCOMMODITYPERMITLIST_RECORD = 'sellCommodityPermitListRecord';
// 商品購入承認一覧の各行のセレクタ
SELECTOR_SELLCOMMODITYPERMITLIST_RECORD = '.sellCommodityPermitListRecord';
// 受講承認一覧タブのセレクタ
SELECTOR_LECTUREPERMITLIST_TAB = '#lecturePermitList';
// 商品テーブルで使用されるセレクトメニューカラム 2016.10.07 add k.urabe
CONTENT_SELECT = 'contentSelect';
// 商品テーブルで使用されるセレクトメニューカラムのセレクタ 2016.10.07 add k.urabe
SELECTOR_CONTENT_SELECT = '.contentSelect';
// 商品テーブルで使用されるセレクトメニューカラムの追加先セレクタ 2016.10.07 add k.urabe
SELECTOR_APPEND_SELECTBOX = '.appendSelectbox';
// 受講・商品テーブルで使用される料金カラムの追加名 2016.10.07 add k.urabe
REPLACE_TEXTBOX_COST = 'replaceTextboxCost';
// 受講・商品テーブルで使用される料金カラムの追加先名 2016.10.07 add k.urabe
REPLACE_TEXTBOX_COST_CELL = 'replaceTextboxCostCell';
// 受講・商品テーブルで使用される使用ポイントカラムの追加名 2016.10.07 add k.urabe
REPLACE_TEXTBOX_USE_POINT = 'replaceTextboxUsePoint';
// 受講・商品テーブルで使用される使用ポイントカラムの追加先名 2016.10.07 add k.urabe
REPLACE_TEXTBOX_USE_POINT_CELL = 'replaceTextboxUsePointCell';
// 受講・商品テーブルで使用される販売個数の追加名 2016.10.14 add r.shibata
REPLACE_TEXTBOX_SELL_NUMBER = 'replaceTextboxSellNumber';
// 受講・商品テーブルで使用される販売個数の追加先名 2016.10.14 add r.shibata
REPLACE_TEXTBOX_SELL_NUMBER_CELL = 'replaceTextboxSellNumberCell';
// 商品テーブルでセレクトメニューのキー 2016.10.07 add k.urabe
COMMODITY_KEY = 'commodity_key';
// 商品テーブルでセレクトメニュー内にIDセットするためのキー 2016.10.07 add k.urabe
COMMODITY_SELL_ID = 'commoditySellId';
// DBから取得した商品名が格納されているキー 2016.10.07 add k.urabe
COMMODITY_NAME = 'commodity_name';
// 承認タブのセレクタ
SELECTOR_PERMIT_TAB = '#permitTab';
// 承認一覧タブのセレクタ
SELECTOR_PERMITLIST_TAB = '#permitListTab';
// 対象が数字でないというメッセージ
ALERT_VALUE_IS_NOT_NUMERIC = 'は数字ではありません。';
// 対象が数値でないというメッセージ
ALERT_VALUE_IS_NOT_NUMERIC_STRICT = 'は数値ではありません。';
// 対象がnullであるというメッセージ
ALERT_VALUE_IS_NULL = 'はnullです。';
// 対象が空であるというメッセージ
ALERT_VALUE_IS_EMPTY = 'は空です。';
// 対象がundefinedであるというメッセージ
ALERT_VALUE_IS_UNDEFINED = 'は未定義です。';
// 検索用日付のキー
// 日付検索用データのキー
KEY_FROM_DATE = 'fromDate';
KEY_TO_DATE = 'toDate';
// Myギャラリーの表示記事数
MY_GALLERY_SHOW_PHOTO_NUM = 6;

//キーボード入力時、数値以外を受け付けない関数を示す文字列 2016.10.05 r.shibata 追加
FUNC_CONTROLL_INPUT_CHAR = 'return controllInputChar(event)';

// 商品購入承認ボタンのセレクタ
SELECTOR_SELLCOMMODITYPERMIT_BUTTON = '.sellCommodityPermitButton';
// 何も子要素がない要素のセレクタ。主にfilter関数での絞り込みに使う
SELECTOR_HAS_ANYTHING = ':not(:has(*))';
// inputタグ
TAG_INPUT = '<input>';
// inputタグのセレクタ
SELECTOR_INPUT = 'input';
// inputタグ
HTML_INPUT = 'input';

// 最初の要素というセレクタ。
SELECTOR_FIRST = ':first';
// 最初の要素ではないというセレクタ。主に見出し行を除外したテーブルのレコードを指定するのに使う
SELECTOR_NOT_FIRST = ':not(:first)';
// 商品購入一覧タブのセレクタ
SELECTOR_SELLCOMMODITYPERMITLIST_TAB = '#sellCommodityPermitList';
SELECTOR_SELLCOMMODITYLIST_OUTSIDE = '.sellCommodityPermitListInfoTableOutsideArea';
// 数値入力エリアのセレクタ 2016.09.11 r.shibata 追加
SELECTOR_REPLACETEXTBOX = '.replaceTextbox';
// 受講承認タブ内の選択済みレコードのセレクタ
LECTUREPERMIT_SELECTED_RECORD = '.doLecturePermitInfoTable .selectRecord';
// 管理者タブのセレクタ
SELECTOR_ADMIN_TAB = '#adminTab';
// 選択済みのユーザ一覧のレコード
SELECTED_USER_RECORDS = '.userListInfoTable tr.selectRecord';
// 受講承認タブ
DO_LECTUREPERMIT_TAB = '#doLecturePermit';
// 受講承認タブの削除ボタンのセレクタ 2016.10.06 add k.urabe
SELECTOR_LECTUREPERMIT_DELETE_BUTTON = '#doLecturePermit .deletePermitRecordButton';
// 削除可否のダイアログに表示する文言 2016.10.06 add k.urabe
MESSAGE_DELETE_CONFIRM = '指定したレコードを削除しますか?';
// tdタグ後方から
TD_FROM_REAR = '</td><td>';
TD_FROM_REAR_DISPLAY_NONE = '</td><td style="display : none">';
SELECTOR_SELLCOMMODITY_PERMIT_LIST_INFO_TABLE = '.sellCommodityPermitListInfoTable'; // 管理者、商品購入承認一覧テーブルのセレクタ
// 管理者、商品購入承認一覧テーブルのテーブル本体内の行セレクタ 2016.10.07 add k.urabe
SELECTOR_SELLCOMMODITY_PERMIT_LIST_INFO_TABLE_BODY_TR = '.sellCommodityPermitListInfoTable tbody tr';
SELECTOR_DO_LECTURE_PERMIT_INFO_TABLE = '.doLecturePermitInfoTable'; // 管理者、受講承認テーブルのセレクタ
// 受講承認の更新時に選択行のインデックスを取得するためのセレクタ 2016.10.04 add k.urabe
SELECTOR_DO_LECTURE_PERMIT_SELECTED_INDEX = SELECTOR_DO_LECTURE_PERMIT_INFO_TABLE + SPACE + TAG_TR + SELECTOR_NOT_FIRST
// 受講承認のダミーデータ
DUMMY_LECTUREPERMIT_DATA = {
	time_table_key : "",
	lesson_date : "",
	order_students : "",
	lesson_key : "",
	start_time : "",
	end_time : "",
	user_name : "",
	stage_no : "",
	level_no : "",
	user_classwork_key : "",
	user_key : "",
	get_point : "",
	lesson_name : "",
	use_point : "",
	cost : "",
	school_key : ""
};
// 未選択の商品名
COMMODITY_NOT_SELECTED = '-未選択-';
// 未選択の商品のキー 使いそうにないキーを2つ用意
COMMODITY_NOT_SELECTED_KEY_1 = -1;
COMMODITY_NOT_SELECTED_KEY_2 = 999999;
// デフォルトの商品購入数
DEFAULT_COMMODITY_SELL_NUMBER = 1;
MESSAGE_COMMODITY_NOT_SELECT_EXCEPTION = '以下の生徒の商品が未選択です。\n';
// 商品購入履歴レコードINSERT失敗メッセージ
COUNDNT_INSERT_SELLCOMMODITY_PERMIT_MESSAGE = '以下の生徒の商品購入履歴レコードを作成できませんでした。\n';

// 処理対象がないという警告
MESSAGE_CHOOSE_TARGET = '処理対象を選択してください。';
// tbody内trタグ
SELECTOR_TBODY_TR = 'tbody tr';
// 2016.09.12 add k.urabe 時間帯一覧画面の行選択に対応するためのセレクタを追加
SELECTOR_TBODY_TR_TIME_TABLE = SELECTOR_TBODY_TR + SPACE + DOT + 'time_table';
// 編集の文字。主にボタン用
TEXT_EDIT = '編集';
// 削除の文字。主にボタン用
TEXT_DELETE = '削除';
// 1行だけ選択するように要求する警告
MESSAGE_NEED_SELECT_RECORD = '1行選択してください。';
// 1行以上選択するように要求する警告
MESSAGE_NEED_SELECT_MORE_1_RECORD = '1行以上選択してください。';
// ボタンタグサンプル
HTML_BUTTON = '<button type="button"></button>';
// jquery uiのサーチアイコン
JQUERYUI_ICON_SEARCH = 'ui-icon-search';
// ユーザ検索用ダイアログのパス
PATH_USER_SEARCH_DIALOG = 'dialog/userSearchDialog.html';
// ユーザ検索用ダイアログのJSファイル
USER_SEARCH_DIALOG_JS = 'dialog/js/userSearchDialog.js';
// ユーザ検索用ダイアログのHTMLファイル
USER_SEARCH_DIALOG_HTML = 'dialog/template/userSearchDialog.html';
// ユーザ検索用ダイアログのJSONファイル
USER_SEARCH_DIALOG_JSON = 'dialog/source/userSearchDialog.json';
// ユーザ検索フォームのキー
KEY_USER_SEARCH_FORM = 'searchUserList';
// ユーザ一覧テーブルのキー
KEY_USER_INFO_LIST_TABLE = 'userListInfoTable';
// ユーザ一覧テーブルのセレクタ
SELECTOR_USER_INFO_LIST_TABLE = '.userListInfoTable';
// ユーザ一覧テーブルの格納領域のセレクタ
SELECTOR_USER_LIST_TABLE_OUTSIDE = '.userListTableOutside';
// ユーザ一覧テーブルリロード後処理関数名
FUNC_AFTER_RELOAD_USER_LIST_INFO_TABLE = 'afterReloadUserListInfoTable';
// ユーザ一覧テーブルのセレクタ(id)
SELECTOR_USER_LIST = '#userList';
//ユーザ一覧テーブルのキー
KEY_USER_LIST = 'userList';
// ユーザ一覧テーブルの中のボタン群のセレクタ
SELECTOR_USER_LIST_UNDER_BUTTONS = '#userList .userListButtons';
// ユーザ一覧の共通ボタンのクラス名（フル） 2016.10.07 add k.urabe
SELECTOR_SELECT_USER_FRIGHT = 'selectUser fRight';
// ユーザ一覧の戻るボタンのクラス名（フル） 2016.10.07 add k.urabe
SELECTOR_CANCEL_USER_FRIGHT = 'cancelUser fRight';
// ユーザ一覧の共通ボタンのセレクタ
SELECTOR_SELECT_USER = '.selectUser';
// ユーザ一覧の押下ボタンの判定用プロパティ名 2016.10.07 add k.urabe
DATA_BUTTON_TYPE = 'data-buttontype';
// name属性を指定するセレクタの前後の文字列
ATTR_EQUAL_NAME_FRONT = '[name="';
ATTR_EQUAL_NAME_REAR = '"]';
// ユーザ一覧タブ内の検索フォームのセレクタ
SELECTOR_SEARCH_USER_LIST_INF_ADMINTAB = '#adminTab .searchUserList';
// ユーザ一覧タブ内の検索する値の入ったテキストのセレクタ 2016.10.07 r.shibata 追加
SELECTOR_SEARCH_USER_LIST_ADMIN_USER_SEARCH = '.adminUserSearch';
// 列名を取得するためのキーとなる文字列 2016.10.07 r.shibata 追加
KEY_COL_NAME = 'col_name';
// エンターキーの識別番号
NUM_ENTER_KEY = 13;
// キーが押されたイベント
EVENT_KEYPRESS = 'keypress';

// jQueryオブジェクト前後の文字列。
JQUERY_OBJECT_FRONT = "$('";
// 0番目の要素の場合
JQUERY_OBJECT_REAR_0INDEX = "')[0].";
// typeがbuttonではない要素のセレクタ。inputからbuttonを除外する場合に使う
SELECTOR_NOT_BUTTON_TYPE = ':not([type="button"])';
// 有効なユーザ検索フォーム
SELECTOR_SEARCH_USER_LIST_CURRENT = '.searchUserList:visible:last';
// inputによるボタンのセレクタ
SELECTOR_INPUT_BUTTON = 'input[type="button"]';
// inputによるリセットボタンのセレクタ
SELECTOR_INPUT_RESET = 'input[type="reset"]';
// ユーザ検索のテキスト
TEXT_USER_SEARCH = 'ユーザ検索';
// メルマガダイアログのパス
PATH_MAILMAGA_DIALOG = 'dialog/mailMagaDialog.html';
// メルマガダイアログのJSファイルパス
PATH_MAILMAGA_DIALOG_JS = 'dialog/js/mailMagaDialog.js';
// メルマガダイアログのJSONファイルパス
PATH_MAILMAGA_DIALOG_JSON = 'dialog/source/mailMagaDialog.json';
// メルマガダイアログのHTMLファイルパス
PATH_MAILMAGA_DIALOG_HTML = 'dialog/template/mailMagaDialog.html';
// メルマガ編集ダイアログのタイトル
TEXT_MAIL_MAGA_DIALOG = 'メルマガ編集';
// メルマガタブ
SELECTOR_MAIL_MAGA_TAB = '#mailMagaAndAnnounce';
// メルマガテーブルのキー
KEY_MAIL_MAGA_TABLE = 'mailMagaTable';
// メルマガテーブルの囲う要素のセレクタ 2016.10.04 add k.urabe
SELECTOR_MAIL_MAGA_TABLE_OUTSIDE = '.mailMagaTableOutside';
// outputNumberingTagでcreateTagをonclick内で取得するための文字列。メルマガテーブル用 2016.10.06 r.shibata 追加
GET_MAILMAFATABLE_CREATE_TAG = "$('#mailMagaAndAnnounce')[0]."
// UNIXタイムスタンプの開始日付
UNIX_TIMESTAMP_START_DATE = '1900-01-01';
// 商品購入承認テーブルのキー
KEY_SELL_COMMODITY_PERMIT_INFO_TABLE = 'sellCommodityPermitInfoTable';
// 商品購入承認テーブルのセレクタ
SELECTOR_SELL_COMMODITY_PERMIT_INFO_TABLE = '.sellCommodityPermitInfoTable';
// テーブルの連番列セレクタ
SELECTOR_NO_COL = '.No';
// 取得ポイントのキー
KEY_GET_POINT = 'get_point';
// 使用ポイントのキー
KEY_USE_POINT = 'use_point';
// 料金のキー 2016.10.07 add k.urabe
KEY_COST = 'cost';
// 料金のキー 2016.10.14 add r.shibata
KEY_SELL_NUMBER = 'sell_number';
// コンテンツ（内容）のキー 2016.10.07 add k.urabe
KEY_CONTENT = 'content';
// テーブル内のindex検索に用いるセレクタ（前半） 2016.10.07 add k.urabe
SELECTOR_TR_INDEX_FRONT  = 'tr:eq(';
// テーブル内のindex検索に用いるセレクタ（後半：name要素がuser_classwork_cost） 2016.10.07 add k.urabe
SELECTOR_TR_INDEX_USER_CLASSWORK_COST = ') [name=user_classwork_cost]';
// テーブル内のindex検索に用いるセレクタ（後半：name要素がuse_point） 2016.10.07 add k.urabe
SELECTOR_TR_INDEX_USE_POINT = ') [name=use_point]';
// テーブル内のindex検索に用いるセレクタ（後半：name要素がcontent） 2016.10.07 add k.urabe
SELECTOR_TR_INDEX_CONTENT = ') [name="content"]';
// テーブル内のindex検索に用いるセレクタ（後半：name要素がcontent） 2016.10.14 add r.shibata
SELECTOR_TR_INDEX_SELL_NUMBER = ') [name="sell_number"]';
// 商品購入承認タブのセレクタ
SELECTOR_SELL_COMMODITY_PERMIT_TAB = '#sellCommodityPermit';
// 合計額のキー
KEY_PAY_PRICE = 'pay_price';
// 支払額のキー
KEY_PAY_CASH = 'pay_cash';
// 会員ごとの授業データのキー（user_classwork_key） 2016.09.29 add k.urabe
KEY_USER_CLASSWORK_KEY = 'user_classwork_key';
// 会員ごとの授業データのセレクター（user_classwork_key） 2016.09.29 add k.urabe
SELECTOR_USER_CLASSWORK_KEY = '.user_classwork_key';
// メールの送信に失敗したという旨のメッセージ
MESSAGE_FALED_TO_SEND_MAIL = 'メールの送信に失敗しました。\n時間を置いてお試しください。';
// メールの送信に失敗したという旨のメッセージ
MESSAGE_FALED_CREATE_NOTICE = 'お知らせの登録に失敗しました。\n時間を置いてお試しください。';
// 送信結果ダイアログのタイトル用の文字列
TITLE_SEND_RESULT = '送信結果';
// 送信失敗ダイアログのタイトル用の文字列
TITLE_SEND_FAILED = '送信失敗';
// 閉じるボタンのラベル
LABEL_CLOSE_BUTTON = '閉じる';
// メール送信ダイアログのメールアドレス欄
SELECTOR_MAIL_SEND_DIALOG_MAIL_TO_AREA = '.mailSendContent .mailToArea';
// labelタグのセレクタ
SELECTOR_LABEL_TAG = 'label';
// ユーザからの授業キャンセルを表す値
VALUE_USER_CANCEL = 0;
// 管理者からの授業キャンセルを表す値
VALUE_ADMIN_CANCEL = 1;
// メルマガの内容を流用する場合は1つだけ選択してくださいという内容の警告
MESSAGE_CHOOSE_A_MELMAGA = '既存のメルマガの内容を元に新規作成を行う場合は対象を1行選択してください。';
// メルマガタブ
SELECTOR_MAILMAGA_TAB = '#mailMagaAndAnnounce';
// メルマガテーブルのレコード
MAILMAGA_TABLE_RECORDS = '.mailMagaTable tbody tr';
// メルマガ画面のサーチエリアを示すセレクタ 2016.09.13 r.shibata 追加
SELECOR_MAILMAGA_SEARCH_AREA = '.mailMagaSearchArea'
// メルマガテーブルに対する選択済みナンバリング
SELECTOR_MAILMAGA_NUMBERING = '.mailMagaPagingArea .numbering .select';
// 会員、受講済み授業テーブルに対する選択済みナンバリング 2016.12.29
SELECTOR_FINISHED_LESSONTABLE_NUMBERING = '.finishedLessonPagingArea .select';
// メルマガ編集フォームのセレクタ
SELECTOR_MAILMAGA_EDIT_AREA = '.mailMagaAndAnnounceArea';
// メルマガ編集フォーム内部のタイトルエリアのセレクタ 2016.09.09 r.shibata 追加
SELECTOR_MAILMAGA_EDIT_AREA_TITLE = '.messageTitleTextbox';
// メルマガ編集フォーム内部の内容エリアのセレクタ 2016.09.09 r.shibata 追加
SELECTOR_MAILMAGA_EDIT_AREA_TEXT = '.messageTextarea';
// メルマガ編集フォーム内部の店舗セレクトボックスのセレクタ 2016.10.06 r.shibata 追加
SELECTOR_MAILMAGA_EDIT_AREA_SCOOLNAME_SELECTBOX = '.schoolNameSelectBox';
// カレンダー表示のディレイ
CALENDAR_SHOW_DELAY = 200;
// 2016.09.08 add k.urabe カレンダーの選択可能な最大日付(nullは無制限)
CALENDAR_MAX_DATE = null;
// 基本の日付フォーマット
DATEFORMAT_YYYY_MM_DD = "yyyy-MM-dd";
// ?マーク
CHAR_QUESTION = '?';
// focusイベント
EVENT_FOCUS = 'focus';
// blurイベント
EVENT_BLUR = 'blur';
// position : absolute用の設定値
VALUE_ABSOLUTE = 'absolute';
// 「全て」
KEY_ALL_JP = '全て';
// ','
SIMBOLE_SINGLQUATE_COMMA = '\',\'';
// 0の文字
CHAR_ZERO = '0';
// 日付テキストボックスのセレクタ
SELECTOR_DATE_TEXTBOX = 'input[type="date"]';
// 授業新規作成ダイアログのタイトル
TITLE_CREATE_LESSON = '授業作成';
// 授業編集ダイアログのタイトル
TITLE_EDIT_LESSON = '授業編集';
// 2016/09/07 add k.urabe 授業受講者一覧ダイアログのタイトル定数を追加
TITLE_STUDENTS_LIST = '授業受講者一覧';
// 会員トップ画面でポイントレート取得用クエリのキー
KEY_GET_POINT_RATE = 'getPointRate';

// 検索ボタンの画像ソースパス
SRC_SEARCH_BUTTON = 'image/icon_search.png';
// 絞込ボタンの画像ソースパス
SRC_FILTER_BUTTON = 'image/icon_filter.png';
// 削除ボタンの画像ソースパス
SRC_DELETE_BUTTON = 'image/icon_delete.png';
// 新規作成ボタンの画像ソースパス
SRC_CREATE_NEW_BUTTON = 'image/icon_create_new.png';
// 追加ボタンの画像ソースパス
SRC_ADD_BUTTON = 'image/icon_add.png';
// 編集ボタンの画像ソースパス
SRC_EDIT_BUTTON = 'image/icon_edit.png';
// キャンセルボタンの画像ソースパス
SRC_CANCEL_BUTTON = 'image/icon_cancel.png';
// 選択ボタンの画像ソースパス
SRC_SELECT_BUTTON = 'image/icon_select.png';
// メールボタンの画像ソースパス
SRC_MAIL_BUTTON = 'image/icon_mail.png';
// お知らせボタンの画像ソースパス
SRC_NOTICE_BUTTON = 'image/icon_notice.png';
// 送信ボタンの画像ソースパス
SRC_SEND_BUTTON = 'image/icon_send.png';
// 更新ボタンの画像ソースパス
SRC_UPDATE_BUTTON = 'image/icon_update.png';
// 確認ボタンの画像ソースパス
SRC_CONFIRM_BUTTON = 'image/icon_confirm.png';
// 確認ボタンの画像ソースパス
SRC_PERMIT_BUTTON = 'image/icon_permit.png';
// 画像なし用画像ソースパス
SRC_NO_IMAGE = 'image/no_image.png';
//鍵ボタンの画像ソースパス
SRC_KEY_BUTTON = 'image/icon_key.png';
//パスワード変更ボタンの画像ソースパス
SRC_PASSWORD_CHANGE_BUTTON = 'image/icon_key.png';

// 画像タグ
HTML_IMG = '<img src alt>';
// 画像タグのセレクタ
SELECOR_IMG = 'img';
// ボタン作成関数のボタンのクラス名
CLASS_COMMON_BUTTON = 'commonButton';
// 共通ボタン作成時のボタンタイプ指定ミス時のメッセージ
MESSAGE_INVALID_BUTTON_TYPE = '指定したボタンのタイプは存在しません。 タイプ : ';
// 矢印ボタンの画像ソースパス
SRC_ARROW_RIGHT_SINGLE_BUTTON = 'image/icon_arrow_right_single.png';
SRC_ARROW_LEFT_SINGLE_BUTTON = 'image/icon_arrow_left_single.png';
SRC_ARROW_RIGHT_DOUBLE_BUTTON = 'image/icon_arrow_right_double.png';
SRC_ARROW_LEFT_DOUBLE_BUTTON = 'image/icon_arrow_left_double.png';

// 授業一覧タブのセレクタ
LESSON_LIST_TAB					= '#lessonList';
// 授業時間帯一覧タブのセレクタ
TIME_TABLE_LIST_TAB				= '#timeTableList';
// 授業時間帯一覧テーブルのキー
KEY_TIME_TABLE_LIST_TABLE		= 'timetableListTable';
// 授業時間帯一覧テーブルのセレクタ
SELECTOR_TIME_TABLE_LIST_TABLE	= '.timetableListTable';
// 2016.09.15 add k.urabe 時間帯一覧タブのフォームのキー
KEY_TIME_TABLE_LIST_OUTER = 'timeTableListOuter';
// 2016.09.15 add k.urabe 時間帯一覧タブのフォームのセレクタ
SELECTOR_TIME_TABLE_LIST_OUTER = '.timeTableListOuter';
// 2016.09.18 add k.urabe 時間帯一覧テーブルを囲む領域のキー
KEY_TIME_TABLE_LIST_INNER = 'timeTableListInner';
// 2016.09.18 add k.urabe 時間帯一覧テーブルを囲む領域のセレクタ
SELECTOR_TIME_TABLE_LIST_INNER = '.timeTableListInner';
// 2016.09.18 add k.urabe 時間帯一覧テーブルを囲む内側領域の追加先セレクタ
SELECTOR_SET_TIME_TABLE_LIST_INNER = TIME_TABLE_LIST_TAB + SPACE + SELECTOR_TIME_TABLE_LIST_OUTER;
// 2016.09.18 add k.urabe 時間帯一覧テーブルの追加先セレクタ
SELECTOR_SET_TIME_TABLE_LIST = SELECTOR_SET_TIME_TABLE_LIST_INNER + SPACE + SELECTOR_TIME_TABLE_LIST_INNER;

// 授業予約キャンセルの判定に用いる
KEY_CANCEL_DAYS = 'cancel_days';
KEY_CANCEL_RATE = 'cancel_rate';
KEY_DATE_MIN_SECOND = ' 00:00:00';


// 授業一覧タブのセレクタ
SELECTOR_LESSON_LIST_TAB = '#lessonList';

// メッセージダイアログ用のHTML
HTML_MESSAGE_DIALOG = '<div class="messageDialog"></div>';
// tdタグのhtml
TAG_TD = '<td></td>';
// 時間帯をあらわすクラス名
CLASS_TIME_TABLE = 'time_table';

// カレントのメッセージダイアログのセレクタ
SELECTOR_CURRENT_MESSAGE_DOIALOG = '.messageDialog:last';

// ギャラリーの写真更新失敗時のメッセージ
MESSAGE_FAILED_TO_UPDATE_PHOTO = '変更部分がなかったため記事の更新を行いませんでした。記事の内容を変更した後に更新を行ってください。';

// 管理者画面 授業一覧の領域のセレクタ
SELECTOR_ADMIN_LESSON_LIST_TABLE_AREA	= '#lessonList .tableArea';
//段落タグ
HTML_PARAGRAPH							= '<p></p>';
//記事未作成時の表示
MESSAGE_NO_ARTICLE						= '記事が作成されていません。\n新規ボタンから新しく記事を作成するとここに記事が表示されます。';
//THEADタグのセレクタ
SELECTOR_THEAD							= 'thead';
//TBODYタグのセレクタ
SELECTOR_TBODY							= 'tbody';
//ブログの記事編集時に変更がない警告
MESSAGE_BLOG_NOT_MODIFIED				= '記事に変更点がないため保存を行いませんでした。\n記事を変更した後に編集ボタンを押してください。';
