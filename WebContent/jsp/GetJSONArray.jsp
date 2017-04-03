<%@page import="ddtflower.Constants"%>
<%@page import="ddtflower.LoginCheckException"%>
<%@page import="ddtflower.procedureGetList"%>
<%@page contentType="text/html; charset=utf-8"%>
<%
	/*
	 * ファイル名:jsp/GetJSONArray.jsp
	 * 概要	:テーブルのタグ作成用のJSON配列を作成して返す。
	 * 作成者:R.Shibata
	 * 作成日:2016.10.24
	 */

	//クライアントへ返却するための文字列を宣言する
	String outValue = "";
	//クライアントから取得したjsonデータを取得する
	String json = request.getParameter("json");
	//リスト形式のJSONを作るクラスのインスタンスを作成する
	procedureGetList listJsonDbGetter = new procedureGetList();
	//ログイン失敗エラーをキャッチするため、tryブロックで囲む
	try {
		//生成したインスタンスの処理関数を実行する
		listJsonDbGetter.run(json, request, response);
		//作成した文字列を表示しクライアントへ返却する
		outValue = listJsonDbGetter.getOutHTMLString();
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