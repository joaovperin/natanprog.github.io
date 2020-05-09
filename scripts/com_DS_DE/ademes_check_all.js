ScriptAPI.register( '102-Checkboxen markieren', true, 'Ademes', 'support-nur-im-forum@ademes.at' );
Scriptversion = 'MIT-Lizenz - Copyright (c) 2013 Ademes , Version 1.0';  
if (top.frames.length > 1){
	var doc = (top.frames[1].document.URL.match('game.php') == 'game.php') ? top.frames[1].document : top.frames[0].document;
} else {
	var doc = document;
};
ADS_Check_ALL(doc);
function ADS_Check_ALL(doc){
	$('input[type=checkbox]').attr('checked', true);
};