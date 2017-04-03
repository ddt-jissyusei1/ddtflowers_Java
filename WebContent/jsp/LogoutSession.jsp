<%@page import="ddtflower.Constants"%>
<%@page import="ddtflower.LoginCheckException"%>
<%@page import="ddtflower.procedureLogout"%>
<%@page contentType="text/html; charset=utf-8"%>
<%
	/*
	 * ファイル名:jsp/LogoutSession.jsp
	 * 概要	:ログアウト処理のため、セッションを破棄する。
	 * 作成者:R.Shibata
	 * 作成日:2016.10.24
	 */
	//クライアントへ返却するための文字列を宣言する
	String outValue = "";
	//リスト形式のJSONを作るクラスのインスタンスを作成する
	procedureLogout logout = new procedureLogout();
	//ログイン失敗エラーをキャッチするため、tryブロックで囲む
	try {
		//生成したインスタンスの処理関数を実行する
		logout.run(request, response);
		//ログインチェックエラーが発生した場合
	} catch (LoginCheckException e) {
		//エラーメッセージを作成し、表示するための文字列へ格納する
		outValue = Constants.ERROR_JSON_FRONT + e.checkLoginState() + Constants.ERROR_JSON_BACK;
		//その他エラーが発生した場合
	} catch (Exception e) {
		//エラーメッセージを表示する
		e.printStackTrace();
	}
	//作成した文字列を表示しクライアントへ返却する
	out.print(outValue);
%>