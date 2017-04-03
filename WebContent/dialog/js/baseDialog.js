/** ファイル名:baseDialog.js
 * 概要　　　:ダイアログ内コンテンツ作成、要素操作のためのクラスのための基底クラスの定義ファイル
 * 設計者　:H.Kaneko
 * 作成日　:2015.0813
 * 作成者　:T.Masuda
 * 場所　　:dialog/js/baseDialog.js
 */

//ひとまずクラスインスタンス用変数名はdialogBuilderに統一します。
/** クラス名:baseDialog
 * 概要　:ダイアログ内コンテンツ作成、要素操作のためのクラスのための基底クラス
 * 引数	:Element dialog:コンテンツを作る対象となるダイアログのDOM。jQueryオブジェクトとして渡す
 * 設計者:H.Kaneko
 * 作成日:2015.0813
 * 作成者:T.Masuda
 */
function baseDialog(dialog){
	//※このクラスを継承したクラスのインスタンスはdialogBuilder変数に入れて使う。
	
	//各コンストラクタ引数をメンバに格納する
	this.dialog = dialog;		//ダイアログのDOM
	//dialogExクラスインスタンス。初期展開時のエラー対策のため、dialogが空かどうかの判定をしています。
	this.dialogClass = commonFuncs.checkEmpty(dialog) ? dialog.instance : void(0);
	//ダイアログの生成と操作に使うcreateLittleContentsインスタンスを用意する
	this.create_tag = new createLittleContents();
	
	
	/* 関数名:dispContents
	 * 概要　:openDialogから呼ばれる、画面パーツ設定用関数
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0813
	 * 作成者　:T.Masuda
	 */
	this.dispContents = function(){
		try{
			//ダイアログ内コンテンツの準備を行う
			this.constructionContent();
			//小分けした画面作成用関数をコールする
			this.dispContentsHeader();	//上部
			this.dispContentsMain();	//メイン部分
			this.dispContentsFooter();	//下部
			this.setConfig();			//ダイアログの設定関数をコールする
			this.setCallback();			//イベントのコールバック関数をセットする
		} catch(e){
			console.log(e);
			//ダイアログ生成エラー
			throw new failedToDisplayException();
		}
	}

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
			this.getJson();			//JSONを取得する
			this.getDom();			//DOMを取得する
			this.customizeJson();	//取得したJSONを加工する
		//例外時処理
		}catch(e){
			//接続エラー例外であれば
			if(e instanceof connectErrorException){
			//DB操作エラー例外であれば
			} else if(e instanceof failedToDBControleException){
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
		
	};
	
	/* 関数名:dispContentsHeader
	 * 概要　:openDialogから呼ばれる、画面パーツ設定用関数のヘッダー部分作成担当関数
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0814
	 * 作成者　:T.Masuda
	 */
	this.dispContentsHeader = function(){
		
	}
	
	/* 関数名:dispContentsMain
	 * 概要　:openDialogから呼ばれる、画面パーツ設定用関数のメイン部分作成担当関数
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0814
	 * 作成者　:T.Masuda
	 */
	this.dispContentsMain = function(){
		
	}
	
	/* 関数名:dispContentsFooter
	 * 概要　:openDialogから呼ばれる、画面パーツ設定用関数のフッター部分作成担当関数
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0814
	 * 作成者　:T.Masuda
	 */
	this.dispContentsFooter = function(){
		
	}

	/* 関数名:setCallback
	 * 概要　:ダイアログのイベントのコールバック関数を設定する
	 * 引数　:なし(オーバーライド時に定義する)
	 * 返却値:なし
	 * 作成日　:2015.0822
	 * 作成者　:T.Masuda
	 */
	this.setCallback = function(){
		//dialogExクラスインスタンスがあれば
		if(commonFuncs.checkEmpty(this[DIALOG_CLASS])){
			//デフォルトのコールバック関数をセットする
			this[DIALOG_CLASS].setCallbackCloseOnAfterOpen(this.callbackClose);
		}
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
		//デフォルトではダイアログの位置調整のみ行う
		this.setDialogPosition(POSITION_CENTER_TOP);
	}
	
	//以下オプションセット関数はopenDialog関数内に記述する
	
	/* 関数名:setDialogOption
	 * 概要　:ダイアログのオプションを設定する
	 * 引数　:String optionName:オプション名
	 * 		:? value:オプションに設定する値
	 * 返却値:なし
	 * 作成日　:2015.0813
	 * 作成者　:T.Masuda
	 */
	this.setDialogOption = function(optionName, value){
		//引数のダイアログのオプションをセットする
		$(this.dialog).dialog(OPTION, optionName, value);
	}
	
	/* 関数名:setDialogButtons
	 * 概要　:ダイアログにjQuery UI Dialogのボタンを配置する
	 * 引数　:Array buttons:ボタンの設定の配列
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0813
	 * 作成者　:T.Masuda
	 */
	this.setDialogButtons = function(buttons){
		//ダイアログのbuttonsオプションを設定する
		this.setDialogOption(BUTTONS, buttons);
	}
	
	/* 関数名:setDialogTitle
	 * 概要　:タイトルをセットする
	 * 引数　:String title:タイトルの文字列
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0813
	 * 作成者　:T.Masuda
	 */
	this.setDialogTitle = function(title){
		//ダイアログのbuttonsオプションを設定する
		this.setDialogOption(TITLE, title);
	}

	/* 関数名:setDialogPosition
	 * 概要　:ダイアログの位置をセットする
	 * 引数　:Object positionObj:位置設定の3つのキーが入ったオブジェクト
	 * 返却値:なし
	 * 作成日　:2015.0815
	 * 作成者　:T.Masuda
	 */
	this.setDialogPosition = function(positionObj){
		//ダイアログの位置を設定する
		this.setDialogOption(POSITION, positionObj);
	}

	/* 関数名:updateJson
	 * 概要　:サーバへクエリを投げる前に、送信するJSONデータを加工する
	 * 引数　:なし(オーバーライド時に編集する)
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0815
	 * 作成者　:T.Masuda
	 */
	this.updateJson = function(){
	};
	
	
	/* 関数名:sendQuery
	 * 概要　:DBヘテーブル操作のクエリを投げる
	 * 引数　:String sendUrl:DBへアクセスするアプリケーションのパス
	 * 		:Object sendObj:URLへ送信するデータのオブジェクト
	 * 返却値:Object:DBから取得したデータをオブジェクトで返す
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0815
	 * 作成者　:T.Masuda
	 */
	this.sendQuery = function(sendUrl, sendObj){
		var send = this.create_tag.checkBeforeConvertJsonString(this.create_tag.replaceValueNode(sendObj));
		//引数のオブジェクトをパースしてJSON文字列にする
		var jsonString = JSON.stringify(send);
		//JSONが無効なものであれば
		if(!commonFuncs.checkEmpty(jsonString)){
			//JSON解析エラー例外を投げる
			throw new jsonFailedToParseException(sendObj);
		}
		
		var retObj = {};	//返却用の変数を宣言する
		$.ajax({
			url:sendUrl			//PHPのURLを設定する
			,data:{json:jsonString}	//送信データのオブジェクト
			,dataType:"json"	//JSON形式でデータをもらう
			,type:"POST"		//POSTメソッドでHTTP通信する
			,async:false		//同期通信を行う
			//通信成功時の処理
			,success:function(json, status){	//オブジェクトに変換したJSONと通信状態をを返してもらう
				retObj = json;	//通信結果のJSONを取得する
			},
			//通信失敗時の処理
			error:function(xhr, status, error){	//通信結果を返してもらう
				//通信エラー例外を投げる
				throw new connectErrorException(xhr, status, error);
			}
		});
		
		return retObj;
	};
	
	//デフォルトのはい:いいえボタン設定用配列
	this.yes_no = [
	                         	{
	                         		//はいボタン
		                        	 text:TEXT_YES,
		                        	 //クリック時のコールバック関数を設定する
                            		 click:
                              			 //コールバック関数
                              			 function(){
                              			 //更新ボタンの処理を行う
                              			 this.dialogBuilder.callbackYes();
                              		 },
                              		 icons : {primary : "ui-icon-check"}
	                         	},
		                         {	//いいえボタン
		                        	 text:TEXT_NO,
		                        	//クリック時のコールバック関数を設定する
                            		 click:
                              			 //コールバック関数
                              			 function(){
                              			 //更新ボタンの処理を行う
                              			 this.dialogBuilder.callbackNo();
                              		 },
                              		 icons : {primary : "ui-icon-close"}
		                         }
	                         ];
	
	//デフォルトの新規作成ボタン設定用配列
	this.createNew = [
	                         {	//新規作成ボタン
	                        	 text:TEXT_BUTTON_NEW,
	                        	 //クリック時のコールバック関数を設定する
                        		 click:
                          			 //コールバック関数
                          			 function(){
                          			 //更新ボタンの処理を行う
                          			 this.dialogBuilder.callbackCreateNew();
                          		 },
                          		 icons : {primary : "ui-icon-plus"}
	                         }
	                 ];
	
	//デフォルトの新規作成ボタン・編集ボタン・削除ボタン設定用配列
	this.createNew_edit_delete = [
	                  {	
	                	  //新規作成ボタン
	                	  text:TEXT_BUTTON_NEW,
	                	  //クリック時のコールバック関数を設定する
	                	  click:
	                		  //コールバック関数
	                		  function(){
	                		  //更新ボタンの処理を行う
	                		  this.dialogBuilder.callbackCreateNew();
                   		 },
                  		 icons : {primary : "ui-icon-plus"}
	                  },
	                  {	
	                	  //編集ボタン
	                	  text:TEXT_EDIT,
	                	  //クリック時のコールバック関数を設定する
	                	  click:
	                		  //コールバック関数
	                		  function(){
	                		  //更新ボタンの処理を行う
	                		  this.dialogBuilder.callbackEdit();
                   		 },
                  		 icons : {primary : "ui-icon-pencil"}
	                  },
	                  {	
	                	  //削除ボタン
	                	  text:TEXT_DELETE,
	                	  //クリック時のコールバック関数を設定する
	                	  click:
	                		  //コールバック関数
	                		  function(){
	                		  //削除ボタンの処理を行う
	                		  this.dialogBuilder.callbackDelete();
                   		 },
                  		 icons : {primary : "ui-icon-close"}
	                  }
	                  ];
	
	//送信の確認・リセットボタンの配列
	this.send_reset = [
	                   {
	                	   //送信ボタン
	                	   text:TEXT_BUTTON_SEND,
	                	   //コールバック関数
                    		 click:
                      			 //コールバック関数
                      			 function(){
                      			 //更新ボタンの処理を行う
                      			 this.dialogBuilder.callbackSend();
                      		 },
                      		 icons : {primary : "ui-icon-signal-diag"}
	                   },
	                   {
	                	   //リセットボタン
	                	   text:TEXT_BUTTON_RESET,
	                	   //コールバック関数
	                   		 click:
	                  			 //コールバック関数
	                  			 function(){
	                  			 //更新ボタンの処理を行う
	                  			 this.dialogBuilder.callbackReset();
                      		 },
                      		 icons : {primary : "ui-icon-trash"}
	                   }
	             ];
	
	//確認・キャンセルボタンの配列
	this.confirm_cancel = [
					{	
						//確認ボタン
						text:TEXT_BUTTON_CONFIRM,
						icons: {
					        primary: "ui-icon-check"
					    },
						//確認ボタンのコールバック関数をセットする
                   		 click:
                   			 //コールバック関数
                   			 function(){
                   			 //更新ボタンの処理を行う
                   			 this.dialogBuilder.callbackConfirm();
                  		 }
					},
					{
						//閉じるボタン
						// 2016/09/07 mod k.urabe 閉じるボタンの名称をキャンセルボタンに統一
						text:STR_CANCEL_JP,
						//閉じるボタンのコールバック関数をセットする
                  		 click:
                  			 //コールバック関数
                  			 function(){
                  			 //更新ボタンの処理を行う
                  			 // 2016/09/07 mod k.urabe 閉じるボタンの名称をキャンセルボタンに統一したことによる呼び出し関数の変更
                  			 this.dialogBuilder.callbackCancelButton();
                  		 },
                  		 icons : {primary : "ui-icon-close"}
					}
	           ];
	
	//送信・キャンセルボタンの配列
	this.send_cancel = [
	                       {	
	                    	   //送信ボタン
	                    	   text:TEXT_BUTTON_SEND,
	                    	   icons: {
	                    		   primary: "ui-icon-signal-diag"
	                    	   },
	                    	   //送信ボタンのコールバック関数をセットする
	                    	   click:
	                    		   //コールバック関数
	                    		   function(){
	                    		   //送信ボタンの処理を行う
	                    		   this.dialogBuilder.callbackSend();
	                    	   }
	                       },
	                       {
	                    	   //キャンセルボタン
	                    	   text:STR_CANCEL_JP,
	                    	   //キャンセルボタンのコールバック関数をセットする
	                    	   click:
	                    		   //コールバック関数
	                    		   function(){
	                    		   //キャンセルボタンの処理を行う
	                    		   this.dialogBuilder.callbackCancelButton();
	                    	   },
	                    	   icons : {primary : "ui-icon-close"}
	                       }
	                       ];
	
	//更新ボタンと受講者一覧ボタン
	this.update_students = [
					{	//更新ボタン
						text : TEXT_LESSON_UPDATE_BUTTON,
						//クリック時のコールバック関数
                		 click:
                			 //コールバック関数
                			 function(){
                			 //更新ボタンの処理を行う
                			 this.dialogBuilder.callbackUpdate();
                  		 },
                  		 icons : {primary : "ui-icon-refresh"}
					},
					{	//受講者一覧ボタン
						text : TEXT_LESSON_STUDENTS_BUTTON,
						//クリック時のコールバック関数
	               		 click:
	               			 //コールバック関数
	               			 function(){
	               			 //受講者一覧ボタンの処理を行う
	               			 this.dialogBuilder.callbackStudents();
                  		 },
                  		 icons : {primary : "ui-icon-note"}
					}
	];
	
	//ログイン・閉じるボタンの配列
	this.login_close = [
					{	
						//ログインボタン
						text:LOGIN,
						//ログインボタンのクラスを付ける
			        	 class:LOGIN_BUTTON,
			        	 //クリック時にログイン処理を行う
		                		 click:
		                			 //コールバック関数
		                			 function(){
		                			 //ログインボタンの処理を行う
		                			 this.dialogBuilder.callbackLogin();
                  		 },
                  		 icons : {primary : "ui-icon-person"}
					},
					//キャンセルボタン
					{
						//ボタンテキスト
						text:STR_CANCEL_JP,
						//ダイアログを閉じるボタンのイベントコールバック関数
		                click:
               			 //コールバック関数
               			 function(){
		                	//閉じるボタンの処理を行う
		                	this.dialogBuilder.callbackCloseButton();
                 		 },
                  		 icons : {primary : "ui-icon-close"}
					}
	           ];
	
	//閉じるボタン単体の配列
	this.close_single = [
	                    //閉じるボタン
	                    {
	                    	//ボタンテキスト
	                    	// 2016/09/07 mod k.urabe 閉じるボタンの名称をキャンセルボタンに統一
	                    	text:STR_CANCEL_JP,
	                    	//ダイアログを閉じるボタンのイベントコールバック関数
	                    	click:
	                    		//コールバック関数
	                    		function(){
	                    		//閉じるボタンの処理を行う
	                    		// 2016/09/07 mod k.urabe 閉じるボタンの名称をキャンセルボタンに統一したことによる呼び出し関数の変更
	                    		this.dialogBuilder.callbackCancelButton();
	                 		 },
	                  		 icons : {primary : "ui-icon-close"}
	                    }
	                    ];
	
	/* 関数名:callbackYes
	 * 概要　:ダイアログのはいボタンを押したときのコールバック関数用関数
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0815
	 * 作成者　:T.Masuda
	 */
	this.callbackYes = function(){
		this.dialogClass.setPushedButtonState(YES);
		$(this.dialog).dialog(CLOSE);		//ダイアログを閉じる
	};
	
	/* 関数名:callbackNo
	 * 概要　:ダイアログのいいえボタンを押したときのコールバック関数用関数
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0815
	 * 作成者　:T.Masuda
	 */
	this.callbackNo = function(){
		this.dialogClass.setPushedButtonState(NO);
		$(this.dialog).dialog(CLOSE);		//ダイアログを閉じる
	};
	
	/* 関数名:callbackCancel
	 * 概要　:ダイアログのキャンセルボタンを押したときのコールバック関数用関数
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0815
	 * 作成者　:T.Masuda
	 */
	this.callbackCancel = function(){
		this.dialogClass.setPushedButtonState(CANCEL);
		$(this.dialog).dialog(CLOSE);		//ダイアログを閉じる
	};

	/* 関数名:callbackCreateNew
	 * 概要　:新規作成ボタンのコールバック関数(必ずオーバーライドで内容を定義されたし)
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:2015.0822
	 * 作成者　:T.Masuda
	 */
	this.callbackCreateNew = function(){
		this.dialogClass.setPushedButtonState(CREATE_NEW);
	}
	
	/* 関数名:callbackEdit
	 * 概要　:編集ボタンのコールバック関数(必ずオーバーライドで内容を定義されたし)
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:2016.0409
	 * 作成者　:T.Masuda
	 */
	this.callbackEdit = function(){
		this.dialogClass.setPushedButtonState(EDIT);
	}
	
	/* 関数名:callbackCreateNew
	 * 概要　:削除ボタンのコールバック関数(必ずオーバーライドで内容を定義されたし)
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:2016.0409
	 * 作成者　:T.Masuda
	 */
	this.callbackDelete = function(){
		this.dialogClass.setPushedButtonState(DELETE);
	}
	
	/* 関数名:setCallbackRowClick
	 * 概要　:テーブルの行をクリックした時のイベントのコールバック関数を設定する
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:015.08.22
	 * 作成者　:T.Masuda
	 */
	this.setCallbackRowClick = function() {
		var thisElem = this;	//イベントコールバック内でクラスインスタンスを使うため、変数に入れる
		//ダイアログの内のテーブルの行をクリックしたときのコールバック関数をセットする
		$(STR_TR, this[DIALOG_CLASS].dom).on(CLICK, function(){
			//行クリック時のコールバック関数を実行する
			thisElem.callbackRowClick(this);
		});
	};
	
	/* 関数名:callbackRowClick
	 * 概要　:テーブルの行をクリックした時のイベントのコールバック関数(内容はオーバーライドして定義されたし)
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:015.08.22
	 * 作成者　:T.Masuda
	 */
	this.callbackRowClick = function() {
	};
	
	/* 関数名:callbackLogin
	 * 概要　:ダイアログのログインボタンを押したときのコールバック関数
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:015.08.23
	 * 作成者　:T.Masuda
	 */
	this.callbackLogin = function(){
		//ログインボタンが押されたという状態にする
		this.dialogClass.setPushedButtonState(LOGIN_NUM);
	};
	
	/* 関数名:callbackCreateNew
	 * 概要　:ダイアログの新規作成ボタンを押したときのコールバック関数用関数
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:015.08.22
	 * 作成者　:T.Masuda
	 */
	this.callbackCreateNew = function(){
	};
	
	/* 関数名:callbackConfirm
	 * 概要　:ダイアログの確認ボタンを押したときのコールバック関数用関数
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:015.08.22
	 * 作成者　:T.Masuda
	 */
	this.callbackConfirm = function(){
		this.dialogClass.setPushedButtonState(CONFIRM);
	};
	
	/* 関数名:callbackConfirm
	 * 概要　:ダイアログの確認ボタンを押したときのコールバック関数用関数
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2016.04.17
	 * 作成者　:T.Masuda
	 */
	this.callbackSend = function(){
		this.dialogClass.setPushedButtonState(SEND);
	};
	
	/* 関数名:callbackCloseButton
	 * 概要　:ダイアログの閉じるボタンを押したときのコールバック関数用関数
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:015.08.22
	 * 作成者　:T.Masuda
	 */
	this.callbackCloseButton = function(){
		this.dialogClass.setPushedButtonState(CLOSE_BUTTON);
		$(this.dialog).dialog(CLOSE);		//ダイアログを閉じる
	};

	/* 関数名:callbackCancelButton
	 * 概要　:ダイアログのキャンセルボタンを押したときのコールバック関数用関数
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:015.08.22
	 * 作成者　:T.Masuda
	 */
	this.callbackCancelButton = function(){
		this.dialogClass.setPushedButtonState(CANCEL);
		$(this.dialog).dialog(CLOSE);		//ダイアログを閉じる
	};
	
	/* 関数名:callbackReset
	 * 概要　:ダイアログのリセットボタンを押したときのコールバック関数用関数
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:015.08.22
	 * 作成者　:T.Masuda
	 */
	this.callbackReset = function(){
	};

	/* 関数名:callbackUpdate
	 * 概要　:ダイアログの更新ボタンを押したときのコールバック関数用関数
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0823
	 * 作成者　:T.Masuda
	 */
	this.callbackUpdate = function(){
	};

	/* 関数名:callbackStudents
	 * 概要　:ダイアログの受講者一覧ボタンを押したときのコールバック関数用関数
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0823
	 * 作成者　:T.Masuda
	 */
	this.callbackStudents = function(){
	};
	
	
	/* 関数名:setArgumentObj
	 * 概要　:ダイアログに渡すオブジェクトを生成する。暫定的に安全性を考えてreturnするようにしました。
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:015.08.14
	 * 作成者　:T.Masuda
	 */
	this.setArgumentObj = function() {
		return {};	//argumentObjをセットする。継承して各自定義すること。
	}
	
	/* 関数名:openDialog
	 * 概要　:渡されたURLから新たなダイアログを開く
	 * 引数　:String url:ダイアログのURL
	 * 		:Object argumentObj:ダイアログのインプットデータ、設定データのオブジェクト
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0814
	 * 作成者　:T.Masuda
	 */
	this.openDialog = function(url){
		//ダイアログのクラスインスタンスを生成する。
		//openイベントはsetArgumentObjでセットしておく
		var newDialog = new dialogEx(url, this.setArgumentObj());
		//openイベントのコールバック関数をセットする
		newDialog.run();	//ダイアログを開く
	}

	/* 関数名:insertFooterContents
	 * 概要　:フッターのコンテンツを作る
	 * 引数　:なし(オーバーライド時に定義する)
	 * 返却値:なし
	 * 作成日　:2015.0815
	 * 作成者　:T.Masuda
	 */
	this.insertFooterContents = function(){
	}
	
	/* 関数名:callbackClose
	 * 概要　:デフォルトのcloseイベントコールバック用関数
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0823
	 * 作成者　:T.Masuda
	 */
	this.callbackClose = function(){
		//ダイアログを完全に消す
		this.instance.destroy();
	};

}

/* クラス名:connectErrorException
 * 概要　:Ajax通信失敗時の例外クラス
 * 引数　:Object xhr:通信結果をまとめたオブジェクト
 * 		:int status:通信ステータスの値
 * 		:String error:エラーテキスト
 * 作成日　:2015.0815
 * 作成者　:T.Masuda
 */
function connectErrorException(xhr, status, error){
	//通信が終了しているのでローディング画面を消す
	commonFuncs.hideLoadingScreen();
	//通信失敗のアラートを出す。
	alert(MESSAGE_FAILED_CONNECT);
	Error.apply(this);	//エラーを起こす
}

/* クラス名:connectErrorException
 * 概要　:Ajax通信失敗時の例外クラス
 * 引数　:Object json:サーバから返ってきたJSONのオブジェクト
 * 		:int status:通信ステータスの値
 * 作成日　:2015.0815
 * 作成者　:T.Masuda
 */
function failedToDBControleException(json, status){
	Error.apply(this);	//エラーを起こす
}

/* クラス名:jsonFailedToParseException
 * 概要　:JSONパース失敗時の例外
 * 引数　:Object json:サーバから返ってきたJSONのオブジェクト
 * 		:int status:通信ステータスの値
 * 作成日　:2015.0815
 * 作成者　:T.Masuda
 */
function jsonFailedToParseException(json){
	Error.apply(this);	//エラーを起こす
}

/* クラス名:failedToDisplayException
 * 概要　:dispContents内で起きたエラーに対する例外
 * 引数　:Object json:サーバから返ってきたJSONのオブジェクト
 * 		:int status:通信ステータスの値
 * 作成日　:2015.0815
 * 作成者　:T.Masuda
 */
function failedToDisplayException(json){
	Error.apply(this);	//エラーを起こす
}

/* クラス名:cannotGetAnyRecordException
 * 概要　:目的のレコードが取得できなかった時に投げる例外
 * 引数　:なし
 * 作成日　:2015.0815
 * 作成者　:T.Masuda
 */
function cannotGetAnyRecordException(){
	Error.apply(this);	//エラーを起こす
}

//各例外クラスの継承の記述
connectErrorException.prototype			= new Error;
failedToDBControleException.prototype	= new Error;
jsonFailedToParseException.prototype	= new Error;
failedToDisplayException.prototype		= new Error;
cannotGetAnyRecordException.prototype	= new Error;