<%@page import="ddtflower.LoginCheckException"%>
<%@page import="ddtflower.procedureGet"%>
<%@page import="ddtflower.procedureLogin"%>
<%@page import="ddtflower.Constants"%>
<%@page contentType="text/html; charset=utf-8"%>
<%
	/*
	 * ファイル名:jsp/GetJSONString.jsp
	 * 概要	:クライアントから渡されたJSON文字列にDBから取得した値を追加して返す。
	 * 		また、ログイン用のJSONを渡されたらログイン用のクラスを生成してログイン処理を行う。
	 * 作成者:R.Shibata
	 * 作成日:2016.10.24
	 */
	//クライアントへ返却するための文字列を宣言する
	String outValue = "";
	//クライアントから取得したjsonデータを取得する
	String json = request.getParameter("json");
	//jsonにユーザ名、パスワード、IDの文字列が含まれていれば
	if (json.indexOf(Constants.USER_NAME) != -1 && json.indexOf(Constants.STR_PASSWORD) != -1
			&& json.indexOf(Constants.STR_ID) != -1) {
		//ログイン用の処理を行うクラスのインスタンスを生成する
		procedureLogin procedurelogin = new procedureLogin();
		//ログイン失敗エラーをキャッチするため、tryブロックで囲む
		try {
			//生成したインスタンスの処理関数を実行する
			procedurelogin.run(json, request, response);
			//作成した文字列を表示するための文字列へ格納する
			outValue = procedurelogin.getOutHTMLString();
			//ログインチェックエラーが発生した場合
		} catch (LoginCheckException e) {
			//エラーメッセージを作成し、表示するための文字列へ格納する
			outValue = Constants.ERROR_JSON_FRONT + e.checkLoginState() + Constants.ERROR_JSON_BACK;
			//その他エラーが発生した場合
		} catch (Exception e) {
			//エラーメッセージを表示する
			e.printStackTrace();
		}
		//jsonにユーザ名、パスワード、IDの文字列が含まれていなければ
	} else {
		//ログイン用の処理を行うクラスのインスタンスを生成する
		procedureGet procedureget = new procedureGet();
		//ログイン失敗エラーをキャッチするため、tryブロックで囲む
		try {
			//生成したインスタンスの処理関数を実行する
			procedureget.run(json, request, response);
			//作成した文字列を表示するための文字列へ格納する
			outValue = procedureget.getOutHTMLString();
			//ログインチェックエラーが発生した場合
		} catch (LoginCheckException e) {
			//エラーメッセージを作成し、表示するための文字列へ格納する
			outValue = Constants.ERROR_JSON_FRONT + e.checkLoginState() + Constants.ERROR_JSON_BACK;
			//その他エラーが発生した場合
		} catch (Exception e) {
			//エラーメッセージを表示する
			e.printStackTrace();
		}
	}
	//作成した文字列を表示しクライアントへ返却する
	out.print(outValue);
%>