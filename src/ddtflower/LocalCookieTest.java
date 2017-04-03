package ddtflower;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LocalCookieTest {

	//クッキー操作用のオブジェクト
	private CookieManager cookie;
	public void init(HttpServletRequest request, HttpServletResponse response){
		cookie = new CookieManager(request, response);
	}
	public void setCookieTest(String key, String value){
		cookie.setCookie(key, value, 3600);
	}
}
