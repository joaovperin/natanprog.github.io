ScriptAPI.register( '43-AG Filter', true, 'Ademes', 'support-nur-im-forum@ademes.at' );
Scriptversion = 'MIT-Lizenz - Copyright (c) 2013 Ademes , Version 1.5';  
if (top.frames.length > 1){
	var doc = (top.frames[1].document.URL.match('game.php') == 'game.php') ? top.frames[1].document : top.frames[0].document;
} else {
	var doc = document;
};
if (!doc.URL.match('mode=combined')){
	UI.InfoMessage('Du musst dich auf der "Kombiniert"-Übersicht befinden!',3000,true);
} else {
	ADS_AGs_filtern(doc);
};
function ADS_AGs_filtern(doc){
	var table = doc.getElementById('combined_table'); 
	var rows = table.getElementsByTagName('th');  
	for (var i = 0; i < rows.length; i++){
		var img = rows[i].getElementsByTagName('img'); 
		if (img.length > 0){
			if(img[0].title == 'Adelsgeschlecht') var th_id = i;
		}
	};
	$('#combined_table tr:gt(0)').each(function(){
		var ag = $('td:eq(' + th_id + ')', $(this)).text();
		if (ag == 0) $(this).remove();
	});
	UI.InfoMessage('AGs gefiltert!',2000,false);
};