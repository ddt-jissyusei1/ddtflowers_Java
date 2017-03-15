/* ファイル名:testdialoggrandchild.js
 * 概要　　　:テスト用ダイアログ
 * 作成者　:T.Masuda
 * 場所　　:dialog/js/testdialoggrandchild.js
 */

/* クラス名:testdialoggrandchild.js
 * 概要　　:URLからダイアログのHTMLファイルを取得して表示する。
 * 親クラス:baseDialog
 * 引数	 :Element dialog:ダイアログのDOM
 * 作成者　:T.Masuda
 * 場所　　:dialog/js/testdialoggrandchild.js
 */
function testdialoggrandchild(dialog){
	testdialogchild.call(this, dialog);
	
	//ボタンの配列
	this.buttons = [
					{
						text:'閉じる',
						click:function(){
							$(this).dialog(CLOSE);	//閉じる
						}
					}
	           ];

	//タイトルの文字列
	this.alterTitle = '孫ダイアログ。';
	
	/* 関数名:dispContentsMain
	 * 概要　:openDialogから呼ばれる、画面パーツ設定用関数
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0814
	 * 作成者　:T.Masuda
	 */
	this.dispContentsMain = function(){
		var creator = new createLittleContents();	//createLittleContentsクラスインスタンスを用意する
		creator.getJsonFile('dialog/source/testdialoggrandchild.json');
		creator.getDomFile('dialog/template/testdialoggrandchild.html');
		creator.outputTag('notice1', 'notice1', '.dialog:last');
	}
	/* 関数名:dispContentsFooter
	 * 概要　:openDialogから呼ばれる、画面パーツ設定用関数
	 * 引数　:なし
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.0814
	 * 作成者　:T.Masuda
	 */
	this.dispContentsFooter = function(){
		this.setDialogButtons(this.buttons);		//YES_NOボタンを配置する
		this.setDialogTitle(this.alterTitle);	//タイトルを入れ替える
		//ダイアログを閉じるときは親子共々破棄する
		dialog[0].instance.setCallbackCloseOnAfterOpen(this.michidure);
	}
}

//継承の記述
testdialoggrandchild.prototype = new testdialogchild();
//サブクラスのコンストラクタを有効にする
testdialoggrandchild.prototype.constructor = testdialogchild;
