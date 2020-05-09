ScriptAPI.register( '106-Befehle / Incomings addieren', true, 'Ademes', 'support-nur-im-forum@ademes.at' );
Scriptversion = 'MIT-Lizenz - Copyright (c) 2014 Ademes , Version 1.1'; 
if (top.frames.length > 1){
	var doc = (top.frames[1].document.URL.match('game.php') == 'game.php') ? top.frames[1].document : top.frames[0].document;
} else {
	var doc = document;
};
if (!doc.URL.match('mode=incomings')){
	UI.InfoMessage('Du musst Dich in der eintreffende Übersicht befinden!',3000,true);
} else {
	ADS_Incomings(doc);
};
function ADS_Incomings(doc){
	var obj = new Array();
	var row = doc.getElementsByTagName('tr');
	var reg = /\(\d+\|\d+\)/;
	for (var i = 0; i < row.length; i++){
		if (row[i].className == 'nowrap  row_a' || row[i].className == 'nowrap  row_b' || row[i].className == 'nowrap  selected row_a' || row[i].className == 'nowrap  selected row_b'){
			var cell = row[i].getElementsByTagName('td');
			var span = cell[1].getElementsByTagName('a')[0];
			var coord = reg.exec(span.innerHTML);
			var input = cell[0].getElementsByTagName('input')[1];
			input.parentNode.removeChild(input);
			if (coord){
				if (obj[coord]){
					obj[coord][1]++;
					row[i].parentNode.removeChild(row[i]);
					i--;
				} else {
					obj[coord] = new Array(span,1,cell);
				}
			} else {
				row[i].parentNode.removeChild(row[i]);
				i--;
			}
		}				
	}
	for (i in obj){
		if (obj[i][1] >= 1){
			obj[i][0].innerHTML = '<span style=\'color:green\'>(' + obj[i][1] + ')</span> ' + obj[i][0].innerHTML;
			obj[i][2][3].innerHTML = '1. ' + obj[i][2][3].innerHTML;
		}
	}
};