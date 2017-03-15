$(function(){
	// use_pointの初期保存と差分保存
	var $parent = $("#sellCommodityPermitList");
	var targetSelector = "input[name='use_point']";
	// 初期値保存
	$parent.on('focus', targetSelector, function() {
			if($(this).attr("data-base_point")) {
				console.log("focus");
				$(this).attr("data-base_point", $(this).val());
			}
	});
	// 差分保存
	$parent.on('change', targetSelector, function() {
		$(this).attr("data-diff_point", ($(this).val() - $(this).attr("data-base_point")));
	});
});
