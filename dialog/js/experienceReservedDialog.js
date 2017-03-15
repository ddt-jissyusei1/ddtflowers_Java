/* ファイル名:experienceReservedDialog.js
 * 概要　　　:体験レッスン予約希望ダイアログ用クラス
 * 作成者　:T.Masuda
 * 場所　　:dialog/js/experienceReservedDialog.js
 */

/* クラス名:experienceReservedDialog.js
 * 概要　　:体験レッスン予約希望ダイアログ用クラス。
 * 親クラス:baseDialog
 * 引数	 :Element dialog:ダイアログのDOM
 * 作成者　:T.Masuda
 * 場所　　:dialog/js/experienceReservedDialog.js
 */
function experienceReservedDialog(dialog){
	baseDialog.call(this, dialog);	//親クラスのコンストラクタをコールする
	
	//フォーム入力チェックのルールを定義するオブジェクト
	this.validationRule = {
			//submit成功時のコールバック
			submitHandler : function (form, event){
				//送信する
				$(CURRENT_DIALOG)[0].dialogBuilder.sendReservedMail();
				return false;	//本来のsubmitをキャンセルする
			},
			//バリデーションルール
			rules : {
				//氏名
				name:{
					//日本語入力
					jp : true,
					//必須チェック
					required : true
				},
				//氏名(カナ)
				nameKana : {
					//必須チェック
					required : true,
					//カタカナ入力要求
					katakana : true
				},
				//電話番号
				personPhoneNumber : {
					//必須チェック
					required : true,
					//電話番号入力要求
					telnum : true
				},
				//メールアドレス
				email : {
					//必須チェック
					required : true,
					//メール形式チェック
					emailjp : true
				},
				//メールアドレス入力確認
				personEmailCheck:{
					//必須チェック
					required : true,
					//メールアドレス入力確認
					equalTo: '[name="email"]'
				},
				//人数
				personCount:{
					//必須チェック
					required : true,
					//0〜100の間の値を要求する
					range : [0, 100]
				}, 
				//作品
				construct : {
					//必須チェック
					required : true
				}, 
				//時限
				schedule : {
					//必須チェック
					required : true
				},
				//曜日
				dayOfWeek : {
					//必須ではない
					required : false
				}, 
				//週
				week : {
					//必須ではない
					required : false
				}
			},
			//エラーメッセージ追記
			messages : {
				//人数入力欄
				personCount : {
					//入力範囲を伝える
					range : "0 〜 100の範囲で入力してください。"
				}
			},
			invalidHandler:function(form,error){	//チェックで弾かれたときのイベントを設定する。
				var errors = $(error.errorList);	//今回のチェックで追加されたエラーを取得する。
				//エラー文を表示する。
				alert(createErrorText(errors, errorJpNames));
			}
	};
	
	/* 関数名:constructionContent
	 * 概要　:JSONやHTMLをcreateLittleContentsクラスインスタンスにロードする。
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0815
	 * 作成者　:T.Masuda
	 */
	this.constructionContent = function(){
		//主に分岐処理を行うためにtry catchブロックを用意する
		try{
			this.getJson();	//体験レッスン予約希望ダイアログのJSONを読み込む
			this.getDom();	//体験レッスン予約希望ダイアログのテンプレートHTMLを読み込む
		//例外時処理
		}catch(e){
			//接続エラー例外であれば
			if(e instanceof connectErrorException){
				throw new connectErrorException();	//該当する例外クラスを投げる
			//DB操作エラー例外であれば
			} else if(e instanceof failedToDBControleException){
				throw new failedToDBControleException();	//該当する例外クラスを投げる
			} else {
				console.log(e);	//コンソールにエラーを出力する
			}
		}
	};

	/* 関数名:getJson
	 * 概要　:JSONを取得する(オーバーライドして内容を定義してください)
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0815
	 * 作成者　:T.Masuda
	 */
	this.getJson = function(){
		//体験レッスン予約希望ダイアログのJSONを読み込む
		this[VAR_CREATE_TAG].getJsonFile(EXPERIENCE_RESERVED_DIALOG_JSON);	//予約ダイアログのJSONを読み込む
	};

	/* 関数名:customizeJson
	 * 概要　:constructionContentで取得したJSONの加工を行う。オーバーライドして定義されたし
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0815
	 * 作成者　:T.Masuda
	 */
	this.customizeJson = function(){
		//当該ダイアログへインプットされたデータから授業日付を取り出す
		var date = this.dialogClass.getArgumentDataObject().dateJapanese;
	};
	
	/* 関数名:getDom
	 * 概要　:createTag用テンプレートHTMLを取得する(オーバーライドして内容を定義してください)
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0822
	 * 作成者　:T.Masuda
	 */
	this.getDom = function(){
		//体験レッスン予約希望ダイアログのテンプレートHTMLを取得する
		this[VAR_CREATE_TAG].getDomFile(EXPERIENCE_RESERVED_DIALOG_HTML);	//タグを作るためにテンプレートのDOMを取得する。
	};
	
	/* 関数名:dispContentsMain
	 * 概要　:openDialogから呼ばれる、画面パーツ設定用関数のメイン部分作成担当関数
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0814
	 * 作成者　:T.Masuda
	 */
	this.dispContentsMain = function(){
		//当該ダイアログへのDOM追加をするため、ダイアログのDOMを取得する
		var $thisDialog = $(this.dialog)[0];	
		//createTagでダイアログに必要なタグを生成する。
		//予約日時の隠しフォーム
		this[VAR_CREATE_TAG].outputTag(RESERVED_DATE, RESERVED_DATE, $thisDialog);
		//注意書き
		this[VAR_CREATE_TAG].outputTag(RESERVED_SUMMARY, RESERVED_SUMMARY, $thisDialog);
		//作品選択
		this[VAR_CREATE_TAG].outputTag(SPECIAL_CONTRUCT, SPECIAL_CONTRUCT, $thisDialog);
		//時限選択
		this[VAR_CREATE_TAG].outputTag(SPECIAL_SCHEDULE, SPECIAL_SCHEDULE, $thisDialog);
		//予約の予備情報
		this[VAR_CREATE_TAG].outputTag(SUBINFO, SUBINFO, $thisDialog);
		//お客様の情報入力欄
		this[VAR_CREATE_TAG].outputTag(PERSON_INFORMATION, PERSON_INFORMATION, $thisDialog);
		//メールの件名の値を格納する隠しフォーム
		this[VAR_CREATE_TAG].outputTag(MAIL_SUBJECT, MAIL_SUBJECT, $thisDialog);
	}

	/* 関数名:setCallback
	 * 概要　:ダイアログのイベントコールバックを設定する
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:2015.0815
	 * 作成者　:T.Masuda
	 */
	this.setCallback = function(){
		//ダイアログを閉じるときは破棄する
		this.dialogClass.setCallbackCloseOnAfterOpen(this.dialogClass.destroy);
	}

	/* 関数名:setConfig
	 * 概要　:ダイアログの設定を行う。任意でオーバーライドして定義する
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成者　:T.Masuda
	 * 作成日　:2015.0822
	 */
	this.setConfig = function(){
		//送信・キャンセルボタンを配置する
		this.setDialogButtons(this.send_cancel);		
		// 全ての曜日のチェックボックスにチェックする
		commonFuncs.allCheckbox(ALLDAY_CHECKBOX, CHECKBOX_DAYOFWEEK);
		// 全ての週のチェックボックスにチェックする
		commonFuncs.allCheckbox(ALLWEEK_CHECKBOX, CHECKBOX_WEEK);
		//ダイアログの位置調整のみ行う
		this.setDialogPosition(POSITION_CENTER_TOP);
		//日付を隠しフォームにセットする
		$('.reservedDate').val(this.dialogClass.getArgumentDataObject().dateJapanese);
		$(CURRENT_DIALOG).validate(this.validationRule);
	}
	
	/* 関数名:validationForm
	 * 概要　:入力フォームの入力チェックを行う
	 * 引数　:なし
	 * 返却値:Object:入力チェックの結果をオブジェクトにまとめて返す
	 * 作成日　:015.08.16
	 * 作成者　:T.Masuda
	 */
    this.validationForm = function(form){
    	var retObj = {};	//返却用オブジェクトを宣言、空オブジェクトで初期化する
	    //必須入力チェックを行う。
    	retObj[EMPTY_LIST] = commonFuncs.checkEmptyInput(EXPERIENCE_CHECK_FORMS);
        //アルファベット入力だけ行わせるテキストボックス名のリストを格納する配列を宣言する。
    	retObj[ONLY_ALPHABET_LIST] = commonFuncs.checkAllAlphabet(IS_ALPHABET_CHECK_ELEMS_RESERVED_DIALOG);
	    //メールアドレスの再入力が行われているかをチェックする。失敗なら配列に空文字を入れる。
    	retObj[EMAIL_CHECK] = $(SELECTOR_PERSON_MAIL).val() !== $(SELECTOR_PERSON_MAIL_CHECK).val()? true : null;
	    //カウントクラスのテキストボックス(人数)が0以下でないかをチェックする。
    	retObj[NUMBER_LIST] = commonFuncs.numberCheck(SELECTOR_COUNT);	//OKならname属性の値を配列で返す
	    
	    return retObj;
    }
	
	
	/* 関数名:setArgumentObj
	 * 概要　:ダイアログに渡すオブジェクトを生成する。
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:015.08.17
	 * 作成者　:T.Masuda
	 */
	this.setArgumentObj = function() {
		var $form = $(this.dialog);	//フォーム(このパターンではダイアログの本体)を取得する
		var argumentObj = $.extend(true, {}, this[DIALOG_CLASS].getArgumentObject());
		var checkResult = this.validationForm($form);	//フォームの入力チェックを行う
	    // 必須入力項目が皆入力済みであり、英数字しか入力してはいけない項目がOKなら
		//checkResultルートのnull持ちキーがなければOK
	    if(commonFuncs.nullCheckInObject(checkResult) == Object.keys(checkResult).length) {
	    	
		    //入力確認のものは送信すべきではないので、送信前に前持って無効化する。
	        //対象はメールチェックのテキストボックス
		    $(SELECTOR_PERSON_MAIL_CHECK, $form).attr(DISABLED, DISABLED);
		    //子ダイアログ(確認ダイアログ)に渡すオブジェクトのインプット用データ部分を作成する。以下のデータを結合する
		    $.extend(true, 
		    		argumentObj[DATA_KEY], 							//今のダイアログのargumentObjのdata
		    		{
		    			parentDialogBuilder:this,					//当該クラス
		    			callback:this.sendReservedMail,				//予約のメールを送る
		    			message:EXPERIENCE_CONFIRM_TEXT,			//送信確認ダイアログのメッセージ
		    			formData:commonFuncs.createFormData($form)	//フォームデータ
		    		}			
		    	);
		    // このダイアログの入力要素を一時的に無効化する。
		    commonFuncs.disableInputs($form);
	    } else {
	        //警告のテキストを作る。
	        var alerts = commonFuncs.makeFailedAlertString(checkResult, EXPERIENCE_CHECK_FORMS_JP_NAME, EXPERIENCE_CHECK_FORMS_ERROR_TEXT);
	        //アラートを出す。
	    	 alert(alerts);
	    }
		
		return argumentObj;	//argumentObjを返してダイアログ作成時の引数にセットする。
	}
	
	/* 関数名:openDialog
	 * 概要　:渡されたURLから新たなダイアログを開く
	 * 引数　:String url:ダイアログのURL
	 * 		:Object argumentObj:ダイアログのインプットデータ、設定データのオブジェクト
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0817
	 * 作成者　:T.Masuda
	 */
	this.openDialog = function(url){
		//argumentObjを生成する
		var argumentObj = this.setArgumentObj();
		
		//フォームデータが取得されていたら体験レッスン希望送信確認ダイアログを開く
		if(commonFuncs.checkEmpty(argumentObj[DATA_KEY][FORM_DATA])){
			//ダイアログのクラスインスタンスを生成する。
			//openイベントはsetArgumentObjでセットしておく
			var confirmDialog = new dialogEx(url, argumentObj);
			//openイベントのコールバック関数をセットする
			confirmDialog.run();	//ダイアログを開く
		}
	}

	/* 関数名:callbackSend
	 * 概要　:ダイアログの送信ボタンを押したときのコールバック関数用関数
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:015.08.22
	 * 作成者　:T.Masuda
	 */
	this.callbackSend = function(){
		console.log("pushSendButton");
		this.dialogClass.setPushedButtonState(SEND);
		//フォームをsubmitする
		$(CURRENT_DIALOG).submit();
	};
	
	/* 関数名:createExperienceReservedMail
	 * 概要　:体験レッスン予約希望メールの本文を作成する
	 * 引数　:Object formObj:フォームデータのオブジェクト
	 * 返却値:String:体験レッスン予約希望メールの本文を返す
	 * 作成日　:015.08.22
	 * 作成者　:T.Masuda
	 */
	this.createExperienceReservedMail = function(formObj){
		//返却する文字列の変数を宣言する
		var retStr = EMPTY_STRING;
		
		//フォームのオブジェクトを走査する
		for(key in formObj){
			//送信するデータであれば
			if(key != 'personEmailCheck' && key != 'subject'){
				//日本語の項目名とデータを追加していく。毎回改行する
				retStr += EXPERIENCE_CHECK_FORMS_JP_NAME[key] + ':' + formObj[key] + ESCAPE_KAIGYOU;
			}
		}
		
		return retStr;	//作成した文章を返す
	};

	
	/* 関数名:showSendResultMessage
	 * 概要　:体験レッスン予約希望メール送信判定(メッセージをアラートで出す)
	 * 引数　:int isSendToCustom:お客様に送信できたかの判定の値
	 * 　　　:int isSendToAdmin:管理者側に送信できたかの判定の値
	 * 返却値:なし
	 * 作成日　:015.09.21
	 * 作成者　:T.Masuda
	 */
	this.showSendResultMessage = function(isSendToCustom, isSendToAdmin){
		//メール送信の正否判定を行う。成功時のメッセージで初期化する
		var retMessage = EXPERIENCE_MAIL_SEND_SUCCESS;
		//メールの送信に失敗していたら
		if(!isSendToCustom && !isSendToAdmin){
			//失敗のメッセージを出す
			retMessage = EXPERIENCE_MAIL_SEND_FAILED;
			//お客様への返信だけ送信された場合
		} else if(isSendToCustom && !isSendToAdmin){
			//失敗のメッセージ(お客様へ間違ってメールが送信されている旨)
			retMessage = EXPERIENCE_MAIL_SEND_ONLY_CUSTOM;
			//管理者への通知だけ送信された場合
		} else if(!isSendToCustom && isSendToAdmin){
			//成功のメッセージ(返信なしの旨)
			retMessage = EXPERIENCE_MAIL_SEND_ADMIN;
		}

		//結果のメッセージをアラートで表示する
		commonFuncs.showMessageDialog(EMPTY_STRING, retMessage);
	}
	
	
	/* 関数名:sendReservedMail
	 * 概要　:予約メールの送信を行うコールバック用関数
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:015.08.22
	 * 作成者　:T.Masuda
	 */
	this.sendReservedMail = function(){
		
		//押されたボタンの判定を行う。returnObjに設定されたボタンの値を基準にする
		switch(this.dialogClass.getPushedButtonState()){
		//送信ボタンが押されていたら
			case SEND:
				//フォーム要素からデータを取得する
				var formObj = commonFuncs.createFormObject(this.dialog);
				//メール本文を作成する
				var mailContent = this.createExperienceReservedMail(formObj);
				//送信するデータをまとめたオブジェクトを作る
				var sendObj	= {
								//お客様返信用
								custom:{content : EXPERIENCE_MAIL_INTRODUCTION_CUSTOM + mailContent, subject:EXPERIENCE_MAIL_SUBJECT_CUSTOM, from:EMPTY_STRING, to:formObj.email},
								//管理者送信用
								admin:{content : EXPERIENCE_MAIL_INTRODUCTION_ADMIN + mailContent, subject:EXPERIENCE_MAIL_SUBJECT_ADMIN, from:formObj.email, "to[]":1}
							};
				//予約希望メールを送信する
				var isSendToAdmin	= commonFuncs.sendMail(sendObj.admin, EXPERIENCE_MAIL_SEND_PHP);
				var isSendToCustom	= commonFuncs.sendMail(sendObj.custom, EXPERIENCE_MAIL_SEND_PHP);

				//送信結果をアラートで通知する
				this.showSendResultMessage(isSendToCustom, isSendToAdmin);

				//メール送信ができていたら
				if (isSendToAdmin) {
					this.dialogClass.destroy();	//ダイアログを破棄する
				}
				
				break;	//switch文を抜ける
			//処理を行うボタンが押されていなければ
			default:
				break;	//そのまま処理を終える
		}
	}
	
	
	//ここまでクラス定義
}

//継承の記述
experienceReservedDialog.prototype = new baseDialog();
//サブクラスのコンストラクタを有効にする
experienceReservedDialog.prototype.constructor = baseDialog;
