ScriptAPI.register( '103-Kontinentfilter für die kombinierte Übersicht', true, 'Ademes', 'support-nur-im-forum@ademes.at' );
Scriptversion = 'MIT-Lizenz - Copyright (c) 2013 Ademes , Version 1.0';
if (top.frames.length > 1){
	var doc = (top.frames[1].document.URL.match('game.php') == 'game.php') ? top.frames[1].document : top.frames[0].document;
} else {
	var doc = document;
};
if (!doc.URL.match('mode=combined')){
	UI.InfoMessage('Du musst dich auf der "Kombiniert"-Übersicht befinden!',3000,true);
} else {
	ADS_Input(doc);
};
function trim(x){
  return (x.length < 3 ? 0 : parseInt(x.charAt(0)))
};
function ADS_Input(doc){
	$('.maincell').append("<div id='ADS_Display' style='position: fixed; top: 51px; left: 20px; border-radius: 8px; border: 2px #804000 solid; background-color: #F1EBDD'><div id='inline_popup_menu' style='cursor: auto; text-align:center;'>Kontinentfilter kombinierte Übersicht</div><div style='padding: 15px 10px 5px 10px;'><h4>Welcher Kontinent soll gefiltert werden?</h4><form><input type='text' id='ADS_Form'></form><br><button class ='btn btn-confirm-yes' onclick='ADS_Combi_Konti(doc);'>OK</button>  <button class ='btn btn-confirm-no' onclick='$(\"#ADS_Display\").remove();' >Abbrechen</button></div></div>");
};
function ADS_Combi_Konti(doc) {
	var input = doc.getElementById('ADS_Form').value;
	var table = doc.getElementById('combined_table');
	var row = table.getElementsByTagName('tr');
	$('#ADS_Display').remove();
	for (i = 1; i < row.length; i++){
		var cells = row[i].getElementsByTagName('a')[0].textContent;
		var id = cells.lastIndexOf('(');
		var koord = cells.slice(id, id+9).replace(/\(|\)|\s/g,'').split('|');
		var konti = trim(koord[1])*10 + trim(koord[0]);
		if (konti != input){
			row[i].parentNode.removeChild(row[i]);
			i -= 1;
		}
	}
};