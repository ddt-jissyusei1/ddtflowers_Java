
/* 
 * ファイル名:memberProfile.js
 * 概要  :会員プロフィールページ用のjsファイル
 * 作成者:T.Yamamoto
 * 作成日:2015.08.04
 * パス :/js/page/memberProfile.js
 */

/* 
 * 関数名:setProfileUpdate
 * 概要  :プロフィール画面で更新ボタンを押されたときにテキストボックスに
 		 入っている値をDBに送信してデータを更新する
 * 引数  :なし
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.07.02
 * 変更者:T.Masuda
 * 変更日:2015.11.07
 * 内容　:validation.jsで利用するためイベントコールバック登録を省きました
 */
function setProfileUpdate() {
		//ユーザが入力した値を取得する
		var queryReplaceData = commonFuncs.getInputData('.memberInfo');
		//ユーザ番号を追加する
		queryReplaceData['userId'] = create_tag.json.accountHeader.user_key.value;
		//データベースにクエリを発行してデータを更新する
		create_tag.setDBdata(create_tag.json.updateUserInf, queryReplaceData, MESSAGE_SUCCESS_PROFILE_UPDATE);

		//ヘッダー内のユーザ名を更新する
		create_tag.updateUserName();
}




