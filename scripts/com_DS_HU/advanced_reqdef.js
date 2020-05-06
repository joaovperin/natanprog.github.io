(function() {
	var area = $("#simple_message");
	var text = area.val();
	text = text.replace(/^.*védekező.*$/gim, "");
	area.val(text);
})();
