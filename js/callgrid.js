
	colData = {};		//列定義データの配列を格納する。
	colNamesLists = {};		//列名の配列を格納する。
	objRules = {};			//jqGridの設定の連想配列を格納する。
	gridFormOptions = [];	//行の編集ダイアログの設定。
	isCheckbox = false;		//チェックボックスをクリックしたかの判定。

	//0埋めする桁数の定数
	ZERO_PADDING_FIGURE = 6;
	//受注伝票のレコードを追加するクエリ
	ORDER_INSERT_QUERY = "INSERT INTO Order_ddt VALUES ('date', 'order_code', 'stock_code', 'quantity', 'price', (SELECT MAX(organization_code) FROM Organization WHERE organization='custom_organization_code'), (SELECT MAX(organization_code) FROM Organization WHERE organization='deliver_organization_code') ,'delivery_date', 'est_delivery_date', (SELECT MAX(order_type_code) FROM Order_Type WHERE order_type='order_type_code'),(SELECT MAX(person_code) FROM Person WHERE person_name='inputter'), (SELECT MAX(person_code) FROM Person WHERE person_name='submitter'));";
	//受注伝票のレコードを削除するクエリ
	ORDER_DELETE_QUERY = "DELETE FROM Order_ddt WHERE order_code='order_code';";
	//受注伝票のレコードを更新するクエリ
	ORDER_UPDATE_QUERY = "UPDATE Order_ddt SET date='date', stock_code='stock_code', quantity='quantity', price='price', custom_organization_code=(SELECT MAX(organization_code) FROM Organization WHERE organization='custom_organization_code'), delivery_date='delivery_date', est_delivery_date='est_delivery_date', order_type_code=(SELECT MAX(order_type_code) FROM Order_Type WHERE order_type='order_type_code'), inputter=(SELECT MAX(person_code) FROM Person WHERE person_name='inputter'), submitter=(SELECT MAX(person_code) FROM Person WHERE person_name='submitter') WHERE order_code='order_code';";

	
	//行の編集ダイアログの設定その1。
	gridFormOptions[0] = {
			url:location.href,			//編集データの送信先。
			addCaption:'レコード追加',		//追加モード時のタイトル
			editCaption:'レコード編集',	//編集モード時のタイトル
			width: 'auto',				//幅を自動調整する
			bSubmit: '確定',				//確定ボタンのテキスト。
			bCancen: 'キャンセル',			//キャンセルボタンのテキスト。
			modal:true,					//モーダル表示する。
			closeAfterAdd:true,			//追加後に閉じる
			closeAfterEdit:true,		//編集後に閉じる
			recreateForm:true,			//レイアウト崩れ防止のため、毎回フォームを作成し直す。
			//前後ボタンを押した後のイベント。
			onclickPgButtons:function(whichbutton, formid, rowid){
				var rowidNum = parseInt(rowid);	//行番号を整数値に変換する。
				//切り替え先のレコードのチェック状態を確認する。
				isCheck = $('.list:first #' + (whichbutton == 'prev'?rowidNum - 1: rowidNum + 1) + ' input:checkbox:first').prop('checked');
			}
	};

	// 予約中の授業テーブル、列名
	colNamesLists['reservedData'] = ['開始日時', '終了', 'テーマ', '店舗', '料金', 'ポイント'];
	// 受講済みの授業テーブル、列名
	colNamesLists['finishedData'] = ['開始日時', '終了', 'テーマ', '店舗', '料金', 'ポイント'];
	// 日ごと授業テーブル、列名
	colNamesLists['lessonStatusList'] = ['時間割', '店舗', 'テーマ', '料金', '残席', '状況', '詳細'];

	// 予約中の授業の列データ
	//列の設定について、特筆すべき点のみ補足します。
	colData['reservedData'] = [
	        //name:名前 index:ソート時の名前 width:列幅 dataType:データの型 align:セルのテキストの寄せる方向
	        //className:列のクラス名 editable:編集可能にするかどうかの設定。trueかfalseで指定する。
	        //editType:editableが有効な場合のセルの編集方法の指定。ラジオボタン、チェックボックス等を指定する。
	        //editoptions:セレクトメニューでのセル編集時に、選択項目のソースとなる連想配列を指定する。
	        //sortable:ソート可能かどうかの設定。 sorttype:ソートのデータ型を指定する。
	        // 開始日時列
	        { name: "start_date", index:"start_date", width: 91,  align:"center", className: " start_date", editable: true, sortable:true, sorttype:'date', datefmt:"yyyy-mm-dd"},
	        //終了列
	        { name: "finish_time", index:"finish_time", width: 33.5, align:"center", className: "finish_time", editable: true, sortable:true, sorttype:'time'},
	        //テーマ列
	        { name: "theme", index:"theme", width: 31.5, align:"center", className: "theme", editable: true, sortable:true, sorttype:'text'},
	        //店舗列
	        { name: "store_place", index:"store_place", width: 24, align:"center", className: "store_place", editable: true, sortable:true, sorttype:'text'},
	        //料金列
	        { name: "rate", index:"rate", width: 42, align:"center", className: "rate", editable: false, sortable:true, sorttype:'text'},
	        //ポイント列
	        { name: "point", index:"point", width: 35, align:"center", className: "point", editable: false, sortable:true, sorttype:'text'}
	];

	// 受講済みの授業の列データ
	//列の設定について、特筆すべき点のみ補足します。
	colData['finishedData'] = [
	        //name:名前 index:ソート時の名前 width:列幅 dataType:データの型 align:セルのテキストの寄せる方向
	        //className:列のクラス名 editable:編集可能にするかどうかの設定。trueかfalseで指定する。
	        //editType:editableが有効な場合のセルの編集方法の指定。ラジオボタン、チェックボックス等を指定する。
	        //editoptions:セレクトメニューでのセル編集時に、選択項目のソースとなる連想配列を指定する。
	        //sortable:ソート可能かどうかの設定。 sorttype:ソートのデータ型を指定する。
	        // 開始日時列
	        { name: "start_date", index:"start_date", width: 91,  align:"center", className: " start_date", editable: true, sortable:true, sorttype:'date', datefmt:"yyyy-mm-dd"},
	        //終了列
	        { name: "finish_time", index:"finish_time", width: 33.5, align:"center", className: "finish_time", editable: true, sortable:true, sorttype:'time'},
	        //テーマ列
	        { name: "theme", index:"theme", width: 31.5, align:"center", className: "theme", editable: true, sortable:true, sorttype:'text'},
	        //店舗列
	        { name: "store_place", index:"store_place", width: 24, align:"center", className: "store_place", editable: true, sortable:true, sorttype:'text'},
	        //料金列
	        { name: "rate", index:"rate", width: 42, align:"center", className: "rate", editable: false, sortable:true, sorttype:'text'},
	        //ポイント列
	        { name: "point", index:"point", width: 35, align:"center", className: "point", editable: false, sortable:true, sorttype:'text'}
	];

	// 日ごと授業テーブルのデータ
	//列の設定について、特筆すべき点のみ補足します。
	colData['lessonStatusList'] = [
	        //name:名前 index:ソート時の名前 width:列幅 dataType:データの型 align:セルのテキストの寄せる方向
	        //className:列のクラス名 editable:編集可能にするかどうかの設定。trueかfalseで指定する。
	        //editType:editableが有効な場合のセルの編集方法の指定。ラジオボタン、チェックボックス等を指定する。
	        //editoptions:セレクトメニューでのセル編集時に、選択項目のソースとなる連想配列を指定する。
	        //sortable:ソート可能かどうかの設定。 sorttype:ソートのデータ型を指定する。
	        // 時間割列
	        { name: "timeSchedule", index:"timeSchedule", width: 77,  align:"center", className: " timeSchedule", editable: true, sortable:true, sorttype:'time'},
	        //店舗列
	        { name: "store_place", index:"store_place", width: 28, align:"center", className: "store_place", editable: true, sortable:true, sorttype:'time'},
	        //テーマ列
	        { name: "theme", index:"theme", width: 31, align:"center", className: "theme", editable: true, sortable:true, sorttype:'text'},
	        //料金列
	        { name: "rate", index:"rate", width: 45, align:"center", className: "rate", editable: true, sortable:true, sorttype:'text'},
	        //残席列
	        { name: "vacant_seat", index:"vacant_seat", width: 21, align:"center", className: "vacant_seat", editable: false, sortable:true, sorttype:'text'},
	        //状況列
	        { name: "situation", index:"situation", width: 42, align:"center", className: "situation", editable: false, sortable:true, sorttype:'text'},
	        //詳細列
	        { name: "detail", index:"detail", width: 27, align:"center", className: "detail", editable: false, sortable:true, sorttype:'text'}
	];

	/*
	 * 関数名:zeroPadding
	 * 引数  :int digits:ない桁を0で埋める対象の数値
	 * 　　  :int figure:桁数
	 * 戻り値:String:値を文字列にして返す
	 * 概要  :整数の桁を0で埋める
	 * 作成日 :2015.05.23
	 * 作成者:T.Masuda
	 */
	function zeroPadding(digits, figure){
		var figureString = '';	//桁の数だけ0を並べた文字列を用意する
		//ループでfigureStringの中身を作成する
		for(var i = 0; i < figure; i++){
			figureString+='0';	//figureStringに0の文字列を足していく
		}
		//digitsをfigure桁まで0で埋めて返す
		return ( figureString + digits ).slice( -figure );
	}

	/*
	 * 関数名:createOrderRecord
	 * 引数  :Object rowData:表から取得した行データ
	 * 		:Element grid:表本体
	 * 		:int paddingFigure:コード列の桁数
	 * 戻り値:Object :作成したレコードのデータをを返す
	 * 概要  :受注画面の表のレコードから受注伝票のレコードを作り返す
	 * 作成日 :2015.05.23
	 * 作成者:T.Masuda
	 */
	function createOrderRecord(rowData, grid, paddingFigure, queryType){
		var retMap = {};	//返却用の連想配列を用意する
		//行のデータを走査する
		for(key in rowData){
			if(key == "order_date"){
				//連想配列の当該キーに新たにオブジェクトを挿入する
				retMap["date"] = {value:rowData[key]};
			} else if(key == "order_code"){
				//連想配列の当該キーに新たにオブジェクトを挿入する。
				//INSERT命令なら
				if(queryType == ORDER_INSERT_QUERY){
					//受注コードがかぶらないよう、レコード数を基準に受注コードを生成してセットする
					retMap["order_code"] =
					{value:zeroPadding($(grid).getGridParam("records") + 1, paddingFigure)};
				//UPDATE命令なら
				} else if(queryType == ORDER_UPDATE_QUERY){
					//受注コードをセットする
					retMap["order_code"] = {value:rowData[key]};
				}
			} else if(key == "customer"){
				//連想配列の当該キーに新たにオブジェクトを挿入する
				retMap["custom_organization_code"] = {value:rowData[key]};
				retMap["deliver_organization_code"] = {value:rowData[key]};
			} else if(key == "delivery_date"){
				//連想配列の当該キーに新たにオブジェクトを挿入する
				retMap["delivery_date"] = {value:rowData[key]};
				retMap["est_delivery_date"] = {value:rowData[key]};
			} else if(key == "scribedby"){
				//連想配列の当該キーに新たにオブジェクトを挿入する
				retMap["inputter"] = {value:rowData[key]};
			} else if(key == "permiter"){
				//連想配列の当該キーに新たにオブジェクトを挿入する
				retMap["submitter"] = {value:rowData[key]};
			} else if(key == "order_type"){
				//連想配列の当該キーに新たにオブジェクトを挿入する
				retMap["order_type_code"] = {value:rowData[key]};
			} else if(key == "amount"){
				//連想配列の当該キーに新たにオブジェクトを挿入する。
				//クライアントのデータだけでは決められないデータなので、テストということで仮に固定の値を入力する
				retMap["stock_code"] = {value:"000001"};
				retMap["quantity"] = {value:"1"};
				retMap["price"] = {value:"20000"};
			}
		}
		
		return retMap;	//作成したレコードの連想配列を返す
	}
	
	/*
	 * 関数名:insertOrderRecord
	 * 引数  :int rowid:処理する行の番号
	 * 		:Element grid:表本体
	 * 戻り値:なし
	 * 概要  :DBにレコードのデータを送信してテーブルに追加する
	 * 作成日 :2015.05.23
	 * 作成者:T.Masuda
	 */
	function insertOrderRecord(rowid, grid){
		var rowData= $(grid).getRowData(rowid);		//選択した行を取得する
		//サーバへ送信するデータを作成する
		var sendData = createOrderRecord(rowData, grid, ZERO_PADDING_FIGURE, ORDER_INSERT_QUERY);	
		
		//DB保存用のクエリをセットする
		sendData["db_setQuery"] = ORDER_INSERT_QUERY; 
		
		//AJAX通信でサーバへ保存するレコードを送信する
		$.ajax({
			url:'../SaveJSONRecord',	//JSONでレコードを保存するサーブレットを呼ぶ
			dataType:"json",			//JSONデータを返してもらう
			async:false,				//同期通信を行う
			method:"POST",				//POSTメソッドで通信する
			data:{json:JSON.stringify(sendData)},	//作成したレコードを送信する
			success:function(json, a, b, c){		//成功時の処理
				alert(json.message);				//サーバから帰ってきたメッセージをダイアログに出す
				$(grid).trigger("reloadGrid");		//表を読み込み直す
			},
			error:function(xhr, status, error){			//エラー時の処理
				alert(xhr.responseJSON.message);	//サーバから帰ってきたメッセージをダイアログに出す
			}
		});
	}

	/*
	 * 関数名:updateOrderRecord
	 * 引数  :int rowid:処理する行の番号
	 * 		:Element grid:表本体
	 * 戻り値:なし
	 * 概要  :DBにレコードのデータを送信してレコードを更新する
	 * 作成日 :2015.05.23
	 * 作成者:T.Masuda
	 */
	function updateOrderRecord(rowid, grid){
		var rowData= $(grid).getRowData(rowid);		//選択した行を取得する
		//サーバへ送信するデータを作成する
		var sendData = createOrderRecord(rowData, grid, ZERO_PADDING_FIGURE, ORDER_UPDATE_QUERY);	
		
		//DB保存用のクエリをセットする
		sendData["db_setQuery"] = ORDER_UPDATE_QUERY; 
		
		//AJAX通信でサーバへ保存するレコードを送信する
		$.ajax({
			url:'../SaveJSONRecord',	//JSONでレコードを保存するサーブレットを呼ぶ
			dataType:"json",			//JSONデータを返してもらう
			async:false,				//同期通信を行う
			method:"POST",				//POSTメソッドで通信する
			data:{json:JSON.stringify(sendData)},	//作成したレコードを送信する
			success:function(json, a, b, c){		//成功時の処理
				alert(json.message);				//サーバから帰ってきたメッセージをダイアログに出す
				$(grid).trigger("reloadGrid");		//表を読み込み直す
			},
			error:function(xhr, status, error){			//エラー時の処理
				alert(xhr.responseJSON.message);	//サーバから帰ってきたメッセージをダイアログに出す
			}
		});
	}
	
	/*
	 * 関数名:deleteOrderRecord
	 * 引数  :int rowid:処理する行の番号
	 * 		:Element grid:表本体
	 * 戻り値:なし
	 * 概要  :選択されたレコードを削除する
	 * 作成日 :2015.05.23
	 * 作成者:T.Masuda
	 */
	function deleteOrderRecord(rowid, grid){
		var rowData= $(grid).getRowData(rowid);		//選択した行を取得する
		//サーバへ送信するデータを作成する。対象の受注コードと在庫コードをセットする
		var sendData = {order_code:{value:rowData.order_code}};	
		//テーブルから該当するレコードを削除するクエリをセットする
		sendData["db_setQuery"] = ORDER_DELETE_QUERY;
		
		//AJAX通信でサーバへ保存するレコードを送信する
		$.ajax({
			url:'../SaveJSONRecord',	//JSONでレコードを削除するサーブレットを呼び出す
			dataType:"json",			//結果をJSONデータを返してもらう
			async:false,				//同期通信を行う
			method:"POST",				//POSTメソッドで通信する
			data:{json:JSON.stringify(sendData)},	//作成したレコードを送信する
			success:function(json, a, b, c){		//成功時の処理
				alert(json.message);				//サーバから帰ってきたメッセージをダイアログに出す
				$(grid).trigger("reloadGrid");		//表を読み込み直す
			},
			error:function(xhr, status, error){			//エラー時の処理
				alert(xhr.responseJSON.message);	//サーバから帰ってきたメッセージをダイアログに出す
			}
		});
	}


	// //予約中の授業テーブルのjqGridのルールを連想配列に設定する。
	// objRules['reservedData'] = { 
	// 	url:'../GetJSONArray',	//サーブレットGetJSONArrayからJSONを取得する
	// 	//JSONデータをデータソースとして利用する。
	// 	datatype:"json",
	// 	mtype:"post",	//POSTメソッドでサーバにデータを送信する
	// 	//基本の幅を指定する。
	// 	width: 288,
	// 	//グリッドのリサイズ時の最大幅、最小幅を指定する。
	// 	gridResize: {minWidth:288, maxWidth:288},
	// 	//表部分の高さを指定する。
	// 	height: "auto",
	// 	//列名の表示の配列をセットする。
	// 	colNames: colNamesLists['receivedData'],
	// 	//列定義のデータをセットする。
	// 	colModel: colData['receivedData'],
	// 	caption: ''	,		//リストのタイトルを設定する。
	// 	cellEdit: true,    	// セルの編集を無効にする。
	// 	//セルを編集してもサーバとの通信をしないように設定する。
	// 	cellsubmit: 'clientArray',
 //        sortorder: "desc",	// 降順ソートをする
 //        shrinkToFit: false,	// 列幅の自動調整を行う。
	// 	//行を選択した後に実行される関数。
	// 	afterEditCell:function(rowid, status, e){
	// 		//確認ウィンドウを出す.
	// 		if(window.confirm(rowid + "番目のレコードを複製します。")){
	// 			insertOrderRecord(rowid, this);	//レコードを複製してDBに保存する
	// 		//キャンセルが選択されたら
	// 		} else {
	// 			//削除するかを問う
	// 			if(window.confirm(rowid + "番目のレコードを削除します。")){
	// 				deleteOrderRecord(rowid, this);	//レコードを削除する
	// 			} 
	// 		}
	// 	},
	// 	//セルを編集したら
	// 	afterSaveCell:function(rowid){
	// 		//確認ウィンドウを出す.
	// 		if(window.confirm(rowid + "番目のレコードを更新します。")){
	// 			updateOrderRecord(rowid, this);
	// 		}
	// 	}
	// };

	//予約中の授業テーブルのjqGridのルールを連想配列に設定する。
	objRules['reservedData'] = { 
		//url:'../GetJSONArray',	//サーブレットGetJSONArrayからJSONを取得する
		url:'source/reservedLessonTable.json',
		// JSONデータをデータソースとして利用する。
		 datatype:"json",
		// mtype:"post",	//POSTメソッドでサーバにデータを送信する
		//基本の幅を指定する。
		width: 286,
		//グリッドのリサイズ時の最大幅、最小幅を指定する。
		gridResize: {minWidth:286, maxWidth:286},
		//表部分の高さを指定する。
		height: "auto",
		//列名の表示の配列をセットする。
		colNames: colNamesLists['reservedData'],
		//列定義のデータをセットする。
		colModel: colData['reservedData'],
		caption: ''	,		//リストのタイトルを設定する。
		cellEdit: true,    	// セルの編集を無効にする。
		//セルを編集してもサーバとの通信をしないように設定する。
		cellsubmit: 'clientArray',
        sortorder: "desc",	// 降順ソートをする
        shrinkToFit: false,	// 列幅の自動調整を行う。
		//行を選択した後に実行される関数。
		// afterEditCell:function(rowid, status, e){
		// 	//確認ウィンドウを出す.
		// 	if(window.confirm(rowid + "番目のレコードを複製します。")){
		// 		insertOrderRecord(rowid, this);	//レコードを複製してDBに保存する
		// 	//キャンセルが選択されたら
		// 	} else {
		// 		//削除するかを問う
		// 		if(window.confirm(rowid + "番目のレコードを削除します。")){
		// 			deleteOrderRecord(rowid, this);	//レコードを削除する
		// 		} 
		// 	}
		// },
		// //セルを編集したら
		// afterSaveCell:function(rowid){
		// 	//確認ウィンドウを出す.
		// 	if(window.confirm(rowid + "番目のレコードを更新します。")){
		// 		updateOrderRecord(rowid, this);
		// 	}
		// }
	};

	//予約中の授業テーブルのjqGridのルールを連想配列に設定する。
	objRules['finishedData'] = { 
		//url:'../GetJSONArray',	//サーブレットGetJSONArrayからJSONを取得する
		url:'source/reservedLessonTable.json',
		// JSONデータをデータソースとして利用する。
		 datatype:"json",
		// mtype:"post",	//POSTメソッドでサーバにデータを送信する
		//基本の幅を指定する。
		width: 286,
		//グリッドのリサイズ時の最大幅、最小幅を指定する。
		gridResize: {minWidth:286, maxWidth:286},
		//表部分の高さを指定する。
		height: "auto",
		//列名の表示の配列をセットする。
		colNames: colNamesLists['finishedData'],
		//列定義のデータをセットする。
		colModel: colData['finishedData'],
		caption: ''	,		//リストのタイトルを設定する。
		cellEdit: true,    	// セルの編集を無効にする。
		//セルを編集してもサーバとの通信をしないように設定する。
		cellsubmit: 'clientArray',
        sortorder: "desc",	// 降順ソートをする
        shrinkToFit: false,	// 列幅の自動調整を行う。
		//行を選択した後に実行される関数。
		// afterEditCell:function(rowid, status, e){
		// 	//確認ウィンドウを出す.
		// 	if(window.confirm(rowid + "番目のレコードを複製します。")){
		// 		insertOrderRecord(rowid, this);	//レコードを複製してDBに保存する
		// 	//キャンセルが選択されたら
		// 	} else {
		// 		//削除するかを問う
		// 		if(window.confirm(rowid + "番目のレコードを削除します。")){
		// 			deleteOrderRecord(rowid, this);	//レコードを削除する
		// 		} 
		// 	}
		// },
		// //セルを編集したら
		// afterSaveCell:function(rowid){
		// 	//確認ウィンドウを出す.
		// 	if(window.confirm(rowid + "番目のレコードを更新します。")){
		// 		updateOrderRecord(rowid, this);
		// 	}
		// }
	};

	//予約中の授業テーブルのjqGridのルールを連想配列に設定する。
	objRules['lessonStatusList'] = { 
		//url:'../GetJSONArray',	//サーブレットGetJSONArrayからJSONを取得する
		url:'source/eachDayLessonTable.json',
		// JSONデータをデータソースとして利用する。
		 datatype:"json",
		// mtype:"post",	//POSTメソッドでサーバにデータを送信する
		//基本の幅を指定する。
		width: 286,
		//グリッドのリサイズ時の最大幅、最小幅を指定する。
		gridResize: {minWidth:286, maxWidth:286},
		//表部分の高さを指定する。
		height: "auto",
		//列名の表示の配列をセットする。
		colNames: colNamesLists['lessonStatusList'],
		//列定義のデータをセットする。
		colModel: colData['lessonStatusList'],
		caption: ''	,		//リストのタイトルを設定する。
		cellEdit: true,    	// セルの編集を無効にする。
		//セルを編集してもサーバとの通信をしないように設定する。
		cellsubmit: 'clientArray',
        sortorder: "desc",	// 降順ソートをする
        shrinkToFit: false,	// 列幅の自動調整を行う。
		//行を選択した後に実行される関数。
		// afterEditCell:function(rowid, status, e){
		// 	//確認ウィンドウを出す.
		// 	if(window.confirm(rowid + "番目のレコードを複製します。")){
		// 		insertOrderRecord(rowid, this);	//レコードを複製してDBに保存する
		// 	//キャンセルが選択されたら
		// 	} else {
		// 		//削除するかを問う
		// 		if(window.confirm(rowid + "番目のレコードを削除します。")){
		// 			deleteOrderRecord(rowid, this);	//レコードを削除する
		// 		} 
		// 	}
		// },
		// //セルを編集したら
		// afterSaveCell:function(rowid){
		// 	//確認ウィンドウを出す.
		// 	if(window.confirm(rowid + "番目のレコードを更新します。")){
		// 		updateOrderRecord(rowid, this);
		// 	}
		// }
	};


/*
 * 関数名:gridWidth()
 * 引数  :string target: 対象の列
 * 戻り値 :なし
 * 概要  :jqgridの幅を決める
 * 作成日 :2015.06.04
 * 作成者:T.Masuda
 */
function gridWidth(target) {
	// 現在の画面の幅を取得する
	var displayWidth = $(window).width();
	// 画面のサイズが600以上の時、幅を変える
	if (displayWidth >= 600) {
		// カラムに値を設定する
		colData[target][0]['width'] = 105;
		colData[target][1]['width'] = 47.5;
		colData[target][2]['width'] = 48.5;
		colData[target][3]['width'] = 48;
		colData[target][4]['width'] = 60;
		colData[target][5]['width'] = 51;
		objRules[target]['width'] = 389;
	}
	// 取得した値の90%をjqgridの幅にする
	// var jqgridWidth = displayWidth * 0.9;
	// 20グリッド構成にするため、1つのグリッドの幅を求める
	// var gridSize = jqgridWidth / 20;
}



	/*
	 * 関数名:makeGrid
	 * 引数  :string target:テーブルのクラス。
	 * 戻り値:なし
	 * 概要  :jqGridのテーブルを作成する。
	 * 作成日 :2015.01.14
	 * 作成者:T.Masuda
	*/
	function makeGrid(target, postData){
		//サーバに送信するデータがあれば
		if(postData !== void(0)){
			//送信するデータを連想配列にセットする
			var post = {postData:{json:JSON.stringify(postData)}};
			//objRulesに送信するデータ追記してサーバへ一緒に送信するようにする
			$.extend(objRules[target], post, true);
		}
		//設定用の連想配列を使い、jqGridの表を作る。
		$('#' + target).jqGrid(objRules[target]);
	}

	//ドキュメントの配置完了後(= 全てのファイルを読み込んだ後)
//	$(document).ready(function(){
//		makeGrid('receivedData');	//グリッドを作成する
//	});

function accordion() {
	// デフォルトで1番目を開く(アコーディオンの中身の最初のものの表示をオンにする)
	$('accordion').eq(0).show();
	// クリックしたらアコーディオンパネルが起動する
	$('.detailButton').click(function() {
		// メニュー表示/非表示
		$(this).next('.accordion').slideToggle('fast');
	});
}
