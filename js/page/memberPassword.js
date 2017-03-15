/* 
 * ファイル名:memberPassword.js
 * 概要  :会員プロフィールページ用のクラスjsファイル
 * 作成者:T.Yamamoto
 * 作成日:2015.08.04
 * 変更者:T.Masuda
 * 変更日:2015.10.31
 * 内容　:クラス化しました。また、パスワードがSHA1ハッシュに変換されていなかったため修正しました。
 * パス :/js/page/memberPassword.js
 */

/* 
 * クラス名:memberPassword
 * 概要  :会員画面パスワード変更ページ用のクラス
 * 作成者:T.Masuda
 * 作成日:2015.10.31
 */

function memberPassword(userId){
	//送信用データ
	this.queryReplaceData = null;
	//ユーザID
	this.userId = userId;
	
	/* 
	 * 関数名:setPasswordUpdate
	 * 概要  :パスワード変更画面で更新ボタンを押されたときにテキストボックスに
	 		 入っている値をDBに送信してデータを更新する
	 * 引数  :なし
	 * 返却値  :なし
	 * 作成者:T.Yamamoto
	 * 作成日:2015.07.02
	 * 変更者:T.Masuda
	 * 変更日:2015.10.31
	 * 内容　:入力チェックを追加しました。また、フォームのセレクタを修正しました
	 */
	this.setPasswordUpdate = function() {
		var own = this;	//自身の参照を変数に保存する
		//更新ボタンが押された時の処理
		$('.passwordUpdate').click(function(){
			//ユーザが入力した値を取得する
			own.queryReplaceData = commonFuncs.getInputData('.postPass');
			
			//パスワード入力欄のいずれかが空欄であれば
			if(!commonFuncs.checkEmpty(own.queryReplaceData.newPass) 
				|| !commonFuncs.checkEmpty(own.queryReplaceData.password)){
				
				alert('空欄があります。2つの入力欄にパスワードを入力してください。');		//空欄があることを注意する
				return false;	//処理を終了する
			}
			
			//ユーザ番号を追加する
			own.queryReplaceData['userId'] = own.userId;
			//新しいパスワードと確認のパスワードが一致すれば登録する
			if(own.queryReplaceData.newPass === own.queryReplaceData.password) {
				//データべベースにクエリを発行してデータを更新する
				create_tag.setDBdata(create_tag.json.updatePassword, own.queryReplaceData, MESSAGE_SUCCESS_PASSWORD_UPDATE);
				//パスワード欄を空にして初期化する
				$('.passTextbox').val(EMPTY_STRING);
			} else {
				alert('パスワードが確認と異なります');
			}
		});
	}
}
