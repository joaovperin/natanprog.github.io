ScriptAPI.register('Truppen einfügen (oder Rest)', true, 'Ademes', 'support-nur-im-forum@ademes.at');
Scriptversion = 'MIT-Lizenz - Copyright (c) 2014 Ademes , Version 2.3';
if (top.frames.length > 1){
	var doc = (top.frames[1].document.URL.match('game.php') =='game.php') ? top.frames[1].document : top.frames[0].document;
} else {
	var doc = document;
}; 
if (!doc.URL.match('screen=place')){
	UI.InfoMessage('Du musst dich auf dem "Versammlungsplatz" befinden!',3000,true);
} else {
	ADS_Truppen_einfuegen(doc);
};
function ADS_Truppen_einfuegen(doc){
	/* Hilfsmittel Truppendaten abarbeiten */
	Array.prototype.contains = function(obj) {
		var i;
		var listed = false; 
		for (i = 0; i < this.length; i++) {
			if (this[i] === obj) {
				listed = true; 
				break;
			}
		}
		return listed;
	};
	/* Truppenarten von der aktuellen Welt einlesen */
	var units = [];
	for (i in UnitPopup.unit_data){
		if (i!="militia") units.push(i);
	};
	var inputs = doc.units.getElementsByTagName('input');
	/* Truppendaten berechnen und einfügen */
	for (var i=0; i<inputs.length; i++) {
		if (inputs[i].type == 'text') {
			if (units.contains(inputs[i].name)) {
				/* Truppendaten abarbeiten */
				var next = inputs[i].nextSibling; 
				do {
					next = next.nextSibling;
				} while (
					next.nodeType != 1
				);
				/* möglichen Truppen */
				var a = next.firstChild.nodeValue.replace(/\(|\)/g,'');
				/* erforderlichen Truppen berücksichtigen */				
				if (typeof(required) != 'undefined' && a < required[i-3]) {
					UI.InfoMessage('Achtung: Die Mindestanzahl der vorgegebenen Truppen sind nicht vorhanden!',3000,true);
					return;
				};
				/* restlichen Truppen berücksichtigen zu möglichen*/
				if (typeof(relativ) == 'undefined') {
					var ins = (a > limits[i-3]) ? limits[i-3] : a;			
				} else {
					/* relative Truppen berücksichtigen */
					var r = relativ[i-3];
					var w = limits[i-3];				
					if (a > (w + r)) {
						var ins = w;
					} else {
						var ins = ((a - r) < 0) ? UI.InfoMessage('Achtung: Mindestanzahl einer der vorgegebenen Truppen sind nicht vorhanden!',3000,true) : (a - r); 
					};
				};
				/* Truppen einfügen */
				insertUnit(doc.units.elements[inputs[i].name],ins);
			}		
		}
	};
	/* vorherige Koordinaten nochmals einfügen */
	if (typeof(previous) != 'undefined') doc.units.x.value = TargetField.last_attacked.x, doc.units.y.value = TargetField.last_attacked.y;
	/* Koordinaten einfügen */	
	if (typeof(koord) != 'undefined') doc.units.x.value = koord.split('|')[0], doc.units.y.value = koord.split('|')[1];
	/* Befehl bestätigen */	
	if (typeof(confirm) != 'undefined' && confirm == 'attack') doc.units.attack.click();
	else if (typeof(confirm) != 'undefined' && confirm == 'support') doc.units.support.click();
};