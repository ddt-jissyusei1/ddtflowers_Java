// ボタンにマウスカーソルがあたる、またはタップされた場合に色合いを変える。
(function($){
	// jQueryプラグインの宣言。
	$.fn.extend({
		// buttonFilter関数を定義する。
		buttonFilter: function(){
			
			// メニューの要素を変数に格納する。
			var $menu = $(this);
			// メニューのボタンの要素を変数に格納する。
			var $buttons = $('.button', $menu);

	 		// ボタンをクリックした時のイベント
	 		$menuButtons.on('click',function(){
	 		});
	 		
	 		// ボタンにマウスカーソルを重ねたときと離したときのイベント
	 		$menuButtons.hover(
	 			//マウスを重ねたときの処理
	 			function(){
	 				$(this)
	 			},
	 			//マウスを離したときの処理
	 			function(){
	 			}
	 		);
		}
	})

})(jQuery);