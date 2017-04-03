package ddtflower;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet implementation class cookieTest
 */
@WebServlet("/cookieTest")
public class cookieTest extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public cookieTest() {
		super();
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//出力するためのライターをresponseより取得する
		PrintWriter out = response.getWriter();

		//*****クッキーエリア*****//
		out.println("<h2>cookieTest</h2>");
		Cookie cookie = new Cookie("cookieTest", "cookieTestValue");
		cookie.setMaxAge(3600);
		response.addCookie(cookie);

		Cookie[] cookies = request.getCookies();
		for (Cookie cookie2 : cookies) {
			out.println(cookie2.getName());
			out.println(" : ");
			out.println(cookie2.getValue());
			out.println(" : ");
			out.println(cookie2.getMaxAge());
			out.println("<br />");
		}
		//*****クッキーエリア*****//

		//*****セッションエリア*****//
		out.println("<h2>sessionTest</h2>");
		//セッション有無チェック
		HttpSession session = request.getSession(false);

		//セッション無い場合
		if (session == null) {
			//セッション無しを出力
			out.println("<p>session is null</p>");
			//セッションを作成
			session = request.getSession(true);
			//セッションに値をセット
			session.setAttribute("sessionTest", "1");
			//セッションある場合
		} else {
			//カウンター用意、セッションよりカウント済み数を取得
			int cnt = Integer.parseInt(session.getAttribute("sessionTest").toString());
			//セッションありを出力
			out.println("<p>session true</p>");
			//カウンタ出力
			out.println("<p>Count:" + cnt + "</p>");
			//カウントアップ
			cnt++;
			//カウントした数をセッションにセット
			session.setAttribute("sessionTest", Integer.toString(cnt));
		}
		//*****セッションエリア*****//

		//リロード
		out.println("<a href=\"./cookieTest\">reload</a>");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,
			IOException {
	}

}
