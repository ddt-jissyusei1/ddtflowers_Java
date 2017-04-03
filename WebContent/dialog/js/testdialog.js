/* ファイル名:testdialog.js
 * 概要　　　:テスト用ダイアログ
 * 作成者　:T.Masuda
 * 場所　　:dialog/js/testdialog.js
 */

/* クラス名:testdialog.js
 * 概要　　:URLからダイアログのHTMLファイルを取得して表示する。
 * 親クラス:baseDialog
 * 引数	 :Element dialog:ダイアログのDOM
 * 作成者　:T.Masuda
 * 場所　　:dialog/js/testdialog.js
 */
function testdialog(dialog){
	baseDialog.call(this, dialog);	//親クラスのコンストラクタをコールする
	
	//はい、いいえボタンの配列
	this.yes_no = [
					{	//はいボタン
						text:'はい',
						//クリック時のコールバック関数
						click:function(){
							//子のダイアログを開く
							this.dialogBuilder.openDialog(URL_TEST_DIALOG_CHILD);
						}
					},
					//いいえボタン
					{	//ボタンテキスト
						text:'いいえ',
						//クリック時のコールバック関数
						click:function(){	//クリックのコールバック関数
							//ダイアログを閉じる
							$(this).dialog('close');
						}
					}
	           ];

	//子ダイアログ用オブジェクト
	this.dialogExOptionSampleChild = {
			argumentObj:{
				config:{
					//幅を自動設定する。
					width			: 300,
					//ダイアログを生成と同時に開く。
					autoOpen		: true,
					//リサイズ不可にする
					resizable:false,
					//Escキーを押してもダイアログが閉じないようにする。
					closeOnEscape	: false,
					//モーダル化する
					modal:true,
					//ダイアログタイトルを送信確認にする
					title:'タイトル',
					//画面上部にダイアログを表示する
					position :{my:'center top',at:'center top', of:window},
					create:function(){	//ダイアログが作られたときのイベントとコールバック関数
					},
					open:function(){	//ダイアログが開いたときのイベントとコールバック関数
					},
					close:function(){	//ダイアログが閉じたのイベントとコールバック関数
						
					},
					buttons:[]
				},
				data:{
					message:""
				}
			}
	}
	
	
	this.callAlert = function(){
		alert("I called.")
	}
	
	//タイトルの文字列
	this.alterTitle = '変更できました。';
	
	/* 関数名:dispContentsMain
	 * 概要　:openDialogから呼ばれる、画面パーツ設定用関数のメイン部分作成担当関数
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0814
	 * 作成者　:T.Masuda
	 */
	this.dispContentsMain = function(){
		var creator = new createLittleContents();	//createLittleContentsクラスインスタンスを用意する
		//以下、createTagによる画面パーツの配置。
		creator.getJsonFile('dialog/source/testdialog.json');
		creator.getDomFile('dialog/template/testdialog.html');
		creator.outputTag('notice1', 'notice1', '.dialog:last');
		creator.outputTag('table1', 'table1', '.dialog:last');
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
		this.setDialogButtons(this.yes_no);		//YES_NOボタンを配置する
		this.setDialogTitle(this.alterTitle);	//タイトルを入れ替える
		//ダイアログを閉じるときは破棄する
		this.dialog[0].instance.setCallbackCloseOnAfterOpen(dialog[0].instance.destroy);
	}
	
	
	/* 関数名:setArgumentObj
	 * 概要　:ダイアログに渡すオブジェクトを生成する
	 * 引数　:なし
	 * 返却値:なし
	 * 作成日　:015.08.13
	 * 作成者　:T.Masuda
	 */
	this.setArgumentObj = function() {
		//新たにオブジェクトを作り、親ダイアログから引き継いだargumentObjの内容をセットする
		var argumentObj = $.extend(true, {}, this.dialogExOptionSampleChild.argumentObj);
		//openイベントを設定する
		$.extend(true, argumentObj.config, {open:commonFuncs.callOpenDialog});
		//このダイアログのdialogExクラスインスタンスを子へ渡すオブジェクトに追加する
		$.extend(true, argumentObj.data, {parentDialogEx:this.dialog[0].instance});
		console.log(argumentObj);
		return argumentObj;	//生成したオブジェクトを返す
	}
}

//継承の記述
testdialog.prototype = new baseDialog();
//サブクラスのコンストラクタを有効にする
testdialog.prototype.constructor = baseDialog;
