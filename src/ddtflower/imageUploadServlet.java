package ddtflower;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

/*
 * ファイル名:imageUploadServlet
 * 概要	:クライアントより受信したファイルをサーバへ保存する
 * 作成者:R.Shibata
 * 作成日:2016.10.24
 */
@WebServlet("/uploadImage/imageUploadServlet")
@MultipartConfig(location = "/", maxFileSize = 1048576)
public class imageUploadServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException,
			IOException {

		//出力するためのWriterをresponseより取得する
		PrintWriter out = response.getWriter();

		//クライアントから送信されたファイルを取得する
		Part part = request.getPart(Constants.GET_IMAGE_KEY);
		//ファイルが送信されていない時の処理
		if (part == null) {
			//ファイルがないというメッセージをクライアントに返す。
			out.println("<root><src></src><message>" + Constants.NOT_EXIST_FILE_MESSAGE
					+ "</message><issuccess>0</issuccess></root>");
			//プログラムを終了する
			return;
		}
		//画像タイプを取得する
		String type = part.getContentType();
		//フォーマットを変換するためのオブジェクトを作成する
		SimpleDateFormat sdf = new SimpleDateFormat(Constants.DATETIME_FROMAT_STRING);
		//現在日付を表す文字列をDateオブジェクトより取得する
		String nowDateString = sdf.format(new Date());
		//ファイル名を作成する(会員ID+日付＋時間+拡張子)
		String fileName = request.getParameter(Constants.USER_ID) + nowDateString + getExtension(type);
		//アップロードされたのが画像でなかったら画像をアップロードしない
		if (checkContentType(type)) {
			//画像を保存するパスを指定する
			String path = getServletContext().getRealPath(Constants.SAVE_DIRECTORY + fileName);
			//画像を保存する
			part.write(path);
			//保存した画像のパスと画像名、メッセージ、成功フラグのXMLを返す
			out.println("<root><src>" + Constants.IMAGE_DIRECTORY + fileName + "</src><filename>" + fileName
					+ "</filename><message>"
					+ Constants.SUCCESS_UPLOAD_MESSAGE + "</message><issuccess>1</issuccess></root>");
		} else {
			//失敗フラグのXMLを返却する
			out.println("<root><src></src><message>" + Constants.INVALID_FILE_SEND_MESSAGE
					+ "</message><issuccess>0</issuccess></root>");
		}
	}

	/* 関数名:getExtension
	 * 概要:取得したcontentTypeより拡張子を取得する
	 * 引数:String type:クライアントより取得したcontentType
	 * 戻り値:String:拡張子を示す文字列
	 * 作成日:2016.10.26
	 * 作成者:R.Shibata
	 */
	private String getExtension(String type) {
		//返却する拡張子をセットする変数を用意する
		String retExtension = Constants.EMPTY_STRING;
		//取得したtypeから拡張子となる部分を取得する
		String typeName = type.substring(type.lastIndexOf("/") + 1);
		//正しく値が取得できていれば
		if (!typeName.equals(Constants.EMPTY_STRING)) {
			//拡張子として.を付与して変数へセットする
			retExtension = "." + typeName;
		}
		//拡張子を返却する
		return retExtension;
	}

	/* 関数名:checkContentType
	 * 概要:contentTypeが画像であるかを判断する
	 * 引数:String type:クライアントより取得したcontentType
	 * 戻り値:boolean:画像であればtrue、それ以外はfalseを返却する
	 * 作成日:2016.10.26
	 * 作成者:R.Shibata
	 */
	private boolean checkContentType(String type) {
		//真偽値を返却するための変数を宣言する
		boolean retBoo = false;
		//取得したtypeの先頭を取得する
		String contentType = type.substring(0, type.indexOf("/"));
		//取得した文字列が画像を示す値であれば
		if (contentType.equals(Constants.FILE_TYPE_IMAGE)) {
			//返却値にtrueをセットする
			retBoo = true;
		}
		//真偽値を返却する
		return retBoo;
	}
}
