ScriptAPI.register( '55-Inc-Gruppe (Alternative)', false, 'Ademes', 'support-nur-im-forum@ademes.at' );
Scriptversion = 'MIT-Lizenz - Copyright (c) 2013 Ademes , Version 1.5';  
if (top.frames.length > 1){
	var doc = (top.frames[1].document.URL.match('game.php') == 'game.php') ? top.frames[1].document : top.frames[0].document;
} else {
	var doc = document;
};
if (!doc.URL.match('mode=groups')){
	UI.InfoMessage('Du musst dich in der Gruppen-Uebersicht befinden!',3000,true);
} else {
	ADS_Inc_Gruppe(doc);
};
function ADS_Inc_Gruppe(doc){
	var table = doc.getElementById('group_assign_table');
	var rows = table.getElementsByTagName('tr'); 
	for (i = 1; i < rows.length; i++){
		var row_a = rows[i].getElementsByTagName('td')[0];
		var row_b = rows[i].getElementsByTagName('input')[0];
		var img_a = row_a.innerHTML.match('graphic/command/attack.png');
		var img_b = (typeof(Art) == 'undefined') ? ' ' : row_a.innerHTML.match('graphic/command/support.png');
		if (row_a != undefined && img_a && img_b) row_b.checked = 'checked';
	}
};