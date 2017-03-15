// 画像アップロード関数
/* 
 * 関数名:imageUp
 * 概要  :画像をアップロードした時にサムネイルを表示する
 * 引数  :なし
 * 返却値 :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.04.18
 */
function showThumbnail () {
	$(document).ready(function(){
		// アップロードするファイルを選択
		$('.imageFile').change(function() {
			// 属性名を取得する
			var file = $(this).prop('files')[0];

			// 選択されたものが画像だった時にサムネを表示する
			if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg' || file.type == 'image/gif') {
				// 画像表示するオブジェクトを作る
				var reader = new FileReader();
				// ファイルを読み込んだとき画像のsrc属性を入力する
				reader.onload = function() {
					// 画像を表示する
					var img_src = $('.imageArea').attr('src', reader.result);
				}
				// fileのURLを読み込む
				reader.readAsDataURL(file);

			// 選択されたのが画像でなかった時の処理
			} else {
				// 画像表示エリアに注釈を表示する
				$('.outputarea').html('選択したものは画像ではありません<br>ページを再読み込みして画像を選択してください');
				// 関数の処理を終了する
				return;
			}
		});		// ファイルのアップロードの設定終わり
	});
}

/* 
 * 関数名:createContentTriggerClick
 * 概要  :管理者ページでタブがクリックされたときにコンテンツを呼び出すための関数。
 * 引数  :clickSelector:クリックされたときにイベントを開始する対象のセレクター名
 		callContentFunc:タブがクリックされたときにcreateTagによって要素を作るための関数をコールするための関数名
 * 返却値  :なし
 * 作成者:T.Yamamoto
 * 作成日:2015.07.20
 */
function imageUpload() {
	//フォームが送信されたときに画像を受け取ってphpに渡す
	$(".imageUploadForm").submit(function(){
		//受け取るデータを入れる変数を作る
		var $form, fd;
		//フォームのjqueryオブジェクトを変数に入れて扱いやすくする
		$form = $(this);
		//フォームデータを入れたオブジェクトを作る
		fd = new FormData($form[0]);
		//通信を行い、phpに画像情報を渡す
		$.ajax({
			//画像をアップロードするためのphpファイルのパス
			url:'imageUpload.php',
			//postメソッドで画像を渡す
			type: 'post',
			//データを変換せずに送信し、画像が文字列に変換されて送信されるのを防ぐ
			processData: false,
			contentType: false,
			//フォームから取得したデータをurlプロパティのファイルに送信する
			data: fd,
			//
			dataType: 'html',
			//通信に成功した時の処理
			success: function(data){
				//成功したことを表示する
				console.log(data);
			}
		});
		return false;
	});
}



