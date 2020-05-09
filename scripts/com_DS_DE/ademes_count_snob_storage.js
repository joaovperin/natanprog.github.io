ScriptAPI.register( '104-AG Berechnung (Einlagerung)', true, 'Ademes', 'support-nur-im-forum@ademes.at' );
Scriptversion = 'MIT-Lizenz - Copyright (c) 2013 Ademes , Version 1.1'; 
if (top.frames.length > 1){
	var doc = (top.frames[1].document.URL.match('game.php') == 'game.php') ? top.frames[1].document : top.frames[0].document;
} else {
	var doc = document;
};
if (!doc.URL.match('screen=snob')){
	UI.InfoMessage('Du musst Dich auf der Adelshofseite befinden!',3000,true);
} else {
	ADS_SL_Einlagerung(doc);
};
function ADS_SL_Einlagerung(doc){
	var table = doc.getElementsByClassName('vis');
	var reg = /\<td align="center"\>(\d+)/;
	var snobs = 0;
	for (i = 0; i < table.length; i++){
		var row = table[i].getElementsByTagName('tr');
		if (row[0] != undefined && row[0].innerHTML.match(/Kosten für das/)) var snob_cost = reg.exec(row[0].innerHTML);
		if (row[1] != undefined && row[1].innerHTML.match(/Eingelagerte Rohstoffe/)) var snob_storage = reg.exec(row[1].innerHTML);
	}
	for (var i = 0; i < snob_storage[1]; i++)  {
		snob_storage[1] = parseInt(snob_storage[1] - snob_cost[1]);
		if (snob_storage[1] >= 0) snobs++;
		snob_cost[1]++;
	}
	UI.InfoMessage('Es können noch ' + snobs + ' AGs erzeugt werden.',4000,false);
};