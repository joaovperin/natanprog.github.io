ScriptAPI.register( '107 Kontinentenliste Spielerprofil', true, 'Ademes', 'support-nur-im-forum@ademes.at' );
Scriptversion = 'MIT-Lizenz - Copyright (c) 2015 Ademes , Version 1.1';
if (top.frames.length > 1){
	var doc = (top.frames[1].document.URL.match('game.php') == 'game.php') ? top.frames[1].document : top.frames[0].document;
} else {
	var doc = document;
};
if (!document.URL.match('info_player')){
	UI.InfoMessage('Du musst dich auf der Spielerübersicht befinden!',3000,true);
} else {
	ADS_Player_BBCode(doc);
};
function ADS_Player_BBCode(doc){
	// Ausgabewert
	var output ='';
	// Zähler
	var z =1;
	// Ausdruck zum Auslesen der Koordinate, falls der Truppenankunftsfilter aktiv ist
	var req =/\d+\|\d+/;
	// Tabelle ID village_list 
	$('#villages_list tbody tr:not("#villages_list tbody tr:last")').each(function(i,el){	
		// Alle tr Elemente durchlaufen und davon vorletzte td Element auswählen
		var $td = $(el).find('td:last').prev();
		// Prüfen beim Durchlauf ob ein td Element gibt und ob er bei Koordinate und nciht beim Dorflink ist
		if ($td.length && !$td.find('.village_anchor').length){
			// Koordinate auslesen
			var koord = $td.html().match(req)[0];
			// Liste pro Durchlauf erweitern
			output+= z + ". " + koord + "\n";
			if (z%5 == 0){
				output += "\n";
			}
			z++;
		}
	}) 
	// Ausgabefenster
	if ($('#ADS_Display').size()==0){
			$('#content_value').find('h2').append("<div id='ADS_Display' style='width: 230px; height: 380px; position: relative; top: 20px; background-color: #F1EBDD'><div id='inline_popup_menu' style='cursor: auto; text-align:center;'>Spielerliste BB-Code</div><div style='padding: 15px 10px 5px 10px;'><textarea id='ADS_Display_Main' style='width: 200px; height: 300px; vertical-align:middle;'></textarea><br><a onclick='$(\"#ADS_Display\").remove();' style='cursor: pointer;'>Schließen</a></div></div><br>");
		} else {
			$("#ADS_Display").show();
		}		
		$("#ADS_Display_Main").html(output);
};
