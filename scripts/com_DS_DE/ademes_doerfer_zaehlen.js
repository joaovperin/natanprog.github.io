ScriptAPI.register( '98-Dörfer in Übersichten zählen', true, 'Ademes', 'support-nur-im-forum@ademes.at' );
Scriptversion = 'MIT-Lizenz - Copyright (c) 2013 Ademes , Version 1.1';
if (top.frames.length > 1){
	var doc = (top.frames[1].document.URL.match('game.php') == 'game.php') ? top.frames[1].document : top.frames[0].document;
} else {
	var doc = document;
};
if (!document.URL.match('screen=overview_villages')){
	UI.InfoMessage('Du musst dich auf Übersichtseiten befinden!',3000,true);
} else {
	ADS_Dorf_Counter(doc);
};
function ADS_Dorf_Counter(doc){
	var counter = 0;
	$('#combined_table tr:gt(0)').each(function(){
		if ($('span:eq(0)')) counter++;																
	});
	UI.InfoMessage('Auf dieser Seite befinden sich ' + counter.toString() + ' Dörfer.',3000,false);
};