ScriptAPI.register('79-Truppen zählen', true, 'Ademes', 'support-nur-im-forum@ademes.at');
Scriptversion = 'MIT-Lizenz - Copyright (c) 2012 Ademes , Version 1.6';  
if (top.frames.length > 1){
	var doc = (top.frames[1].document.URL.match('game.php') == 'game.php') ? top.frames[1].document : top.frames[0].document;
} else {
	var doc = document;
};
if (!doc.URL.match('mode=units')){
	UI.InfoMessage('Du musst dich auf der "Truppen"-Übersicht befinden!',3000,true);
} else {
	ADS_Truppen_zaehlen(doc);
};
function ADS_Truppen_zaehlen(doc){
	if (typeof(world) == 'undefined') {
			units = Array(Array(0,'Speerträger'),Array(1,'Schwertkämpfer'),Array(2,'Axtkämpfer'),Array(3,'Bogenschützen'),Array(4,'Späher'),Array(5,'Leichte Kavallerie'),Array(6,'Berittener Bogenschütze'),Array(7,'Schwere Kavallerie'),Array(8,'Rammböcke'),Array(9,'Katapulte'));	
	} else {	
		if (world == 'oBogen') {
			units = Array(Array(0,'Speerträger'),Array(1,'Schwertkämpfer'),Array(2,'Axtkämpfer'),Array(3,'Späher'),Array(4,'Leichte Kavallerie'),Array(5,'Schwere Kavallerie'),Array(6,'Rammböcke'),Array(7,'Katapulte'));		
		} else if (world == 'mBogen') {
			units = Array(Array(0,'Speerträger'),Array(1,'Schwertkämpfer'),Array(2,'Axtkämpfer'),Array(3,'Bogenschützen'),Array(4,'Späher'),Array(5,'Leichte Kavallerie'),Array(6,'Berittener Bogenschütze'),Array(7,'Schwere Kavallerie'),Array(8,'Rammböcke'),Array(9,'Katapulte'));	
		}
	}	
	units_count = units.length;
	troops = new Array(units_count);
	for (var i = 0; i < units_count; i++)
	troops[i]=0;
	village_count = 0;
	var troops_cells = document.getElementById('units_table').getElementsByTagName('td');
	for (var x = 0; x < troops_cells.length; x++) {	
		if (typeof(art) == 'undefined') {
			art = "Gesamt";
			if (troops_cells[x].firstChild.nodeValue == 'eigene' || troops_cells[x].firstChild.nodeValue == 'auswärts'  || troops_cells[x].firstChild.nodeValue == 'unterwegs') {
				village_count += 1;
				next = troops_cells[x].nextSibling;
				for (var y = 0; y < units_count; y++) {
					do {next = next.nextSibling;} while (next.nodeType != 1)
				troops[y] += parseInt(next.firstChild.nodeValue);
				}
			}
		} else {	
			if (art == 'Im Dorf') {
				if (troops_cells[x].firstChild.nodeValue == 'eigene') {
					village_count += 1;
					next = troops_cells[x].nextSibling;
					for (var y = 0; y < units_count; y++) {
						do {next = next.nextSibling;} while (next.nodeType != 1)
					troops[y] += parseInt(next.firstChild.nodeValue);
					}
				}
			} else if (art == 'Auswärts') {
				if (troops_cells[x].firstChild.nodeValue == 'auswärts'  || troops_cells[x].firstChild.nodeValue == 'unterwegs') {
					village_count += 1;
					next = troops_cells[x].nextSibling;
					for (var y = 0; y < units_count; y++) {
						do {next = next.nextSibling;} while (next.nodeType != 1)
					troops[y] += parseInt(next.firstChild.nodeValue);
					}
				}
			} else if (art == 'Gesamt') {
				if (troops_cells[x].firstChild.nodeValue == 'eigene' || troops_cells[x].firstChild.nodeValue == 'auswärts'  || troops_cells[x].firstChild.nodeValue == 'unterwegs') {
					village_count += 1;
					next = troops_cells[x].nextSibling;
					for (var y = 0; y < units_count; y++) {
						do {next = next.nextSibling;} while (next.nodeType != 1)
					troops[y] += parseInt(next.firstChild.nodeValue);
					}
				}	
			}
		}
	}
	if (village_count > 0) {
		var output ='';
		for (var i = 0; i < units_count; i++) {
			output += "<tr><td style='color:blue; font-weight: bold;'>  " + units[i][1] + "   </td><td style='color:red; text-align:right'>" + troops[i] + "</td></tr>";
		}
		if ($('#ADS_Display').size()==0){
			$('.maincell').append("<div id='ADS_Display' style='position: fixed; top: 51px; left: 20px; border-radius: 8px; border: 2px #804000 solid; background-color: #F1EBDD'><div id='inline_popup_menu' style='cursor: auto; text-align:center;'>Truppenübersicht: "+ art +"</div><div style='padding: 15px 10px 5px 10px;'><table id='ADS_Display_Main' style='vertical-align:middle;'></table><br><a onclick='$(\"#ADS_Display\").remove();' style='cursor: pointer;'>Schließen</a></div></div>");
		} else {
			$("#ADS_Display").show();
		}
		$("#ADS_Display_Main").html(output);
	} else {
		UI.InfoMessage('Fehler! Keine Dörfer/Truppen gefunden!',3000,true);
	} 
};