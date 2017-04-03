<%@page import="net.arnx.jsonic.JSON"%>
<%@page import="ddtflower.Constants"%>
<%@page import="java.util.regex.Pattern"%>
<%@page import="java.util.LinkedHashMap"%>
<%@page import="java.util.Map"%>
<%@page contentType="text/html; charset=utf-8"%>
<%
	/*
	 * ファイル名:jsp/articleEditController.jsp
	 * 概要	:ブログ作成用のコントローラー　記事番号をセッションへ保存する
	 * 作成者:R.Shibata
	 * 作成日:2016.10.26
	 */

	//クライアントから送信された記事番号を取得する
	String number = request.getParameter(Constants.KEY_NUMBER);
	//クライアントにJSON文字列を返却するためのオブジェクトを作成する
	Map<String, String> sendResult = new LinkedHashMap<String, String>();
	//POSTされた値が数値なら1をセット、そうでなければ0をセットする
	String check_digit = Pattern.compile("^-?[0-9]+$").matcher(number).find() ? "1" : "0";
	//作成したオブジェクトに、受け取った値が数値であるかどうかを示す値をセットする
	sendResult.put(Constants.KEY_SUCCESS, check_digit);
	//数字が取得できていたら
	if(check_digit.equals("1")){
		//セッションを開始する
		session = request.getSession(true);
		//記事番号をセッションに入れる
		session.setAttribute(Constants.KEY_NUMBER, number);
	}
	//作成した文字列を表示しクライアントへ返却する
	out.print(JSON.encode(sendResult));
%>