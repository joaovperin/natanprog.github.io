ScriptAPI.register( '96-OK Button', true, 'Ademes', 'support-nur-im-forum@ademes.at' );
Scriptversion = 'MIT-Lizenz - Copyright (c) 2014 Ademes , Version 1.1';  
if (top.frames.length > 1){
	var doc = (top.frames[1].document.URL.match('game.php') == 'game.php') ? top.frames[1].document : top.frames[0].document;
} else {
	var doc = document;
};
ADS_OK(doc);
function ADS_OK(doc){
	 $('.btn').click();
};