$(function(){
	// use_pointの初期保存と差分保存
	var target =  $("input[name='use_point']", $("#lecturePermitList"));
	// 初期値保存
	target.each(function() {
		$(this).focus(function() {
			if(!$(this).attr("data-base_point")) {
				$(this).attr("data-base_point", $(this).val());
			}
		})
	});
	// 差分保存
	target.each(function() {
		$(this).change(function() {
			$(this).attr("data-diff_point", ($(this).val() - $(this).attr("data-base_point")));
		})
	});
});
