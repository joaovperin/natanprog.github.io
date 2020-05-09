ScriptAPI.register( '97 Kontinentfilter Spielerprofil', true, 'Ademes', 'support-nur-im-forum@ademes.at' );
Scriptversion = 'MIT-Lizenz - Copyright (c) 2015 Ademes , Version 1.2';
if (top.frames.length > 1){
	var doc = (top.frames[1].document.URL.match('game.php') == 'game.php') ? top.frames[1].document : top.frames[0].document;
} else {
	var doc = document;
};
if (!document.URL.match('info_player')){
	UI.InfoMessage('Du musst dich auf der Spielerübersicht befinden!',3000,true);
} else {
	ADS_Input(doc);
};
function trim(x){
  return (x.length < 3 ? 0 : parseInt(x.charAt(0)))
};
function ADS_Input(doc){
	// Fensterabfrage
	$('.maincell').append("<div id='ADS_Display' style='position: fixed; top: 51px; left: 20px; border-radius: 8px; border: 2px #804000 solid; background-color: #F1EBDD'><div id='inline_popup_menu' style='cursor: auto; text-align:center;'>Kontinentfilter Spielerprofil</div><div style='padding: 15px 10px 5px 10px;'><h4>Welcher Kontinent soll gefiltert werden?</h4><form><input type='text' id='ADS_Form'></form><br><button class ='btn btn-confirm-yes' onclick='ADS_Player_Konti(doc);'>OK</button>&nbsp;&nbsp;<button class ='btn btn-confirm-no' onclick='$(\"#ADS_Display\").remove();' >Abbrechen</button></div></div>");
};
function ADS_Player_Konti(doc){
	// Eingebener Wertabfrage
	var input = doc.getElementById('ADS_Form').value;
		// Fensterabfrage entfernen
	$('#ADS_Display').remove();
	// Zähler
	var counter = 0;
	// Ausdruck zum Auslesen der Koordinate, falls der Truppenankunftsfilter aktiv ist
	var req=/\d+\|\d+/;
	// Tabelle ID village_list 
	$('#villages_list tbody tr:not("#villages_list tbody tr:last")').each(function(i,el){
		// Alle tr Elemente durchlaufen und davon vorletzte td Element auswählen
		var $td = $(el).find('td:last').prev();
		// Prüfen beim Durchlauf ob ein td Element gibt und ob er bei Koordinate und nciht beim Dorflink ist
		if ($td.length && !$td.find('.village_anchor').length){
			// Koordinate auslesen und teilen x|y
			var coord = $td.html().match(req)[0].split('|');
			var konti = trim(coord[1])*10 + trim(coord[0]);
			// Vergleichen Kontinent Eingabe mit Vorhanden und Ungleiche verstecken
			if (konti == input){
				$(el).show();
				counter++;
			} else {
				$(el).hide();
            }
        }
    })
	// Tabelle Ausgabe einfügen/ersetzen
	$('#villages_list th:first').html($('#villages_list th:first').html().replace(/\d+/,counter));
};

