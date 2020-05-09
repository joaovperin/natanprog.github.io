win = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
win.ScriptAPI.register( '109-Scriptgenerator - Truppen im Versammlungsplatz einfügen', true, 'Die Stämme Team', 'tomabrafix@team.die-staemme.de' );

var scriptgenerator = {
	/*gibt die maximale Anzahl für eine bestimmte Einheit zurück*/
	replace_all:function(unit){
		var all = $('#unit_input_'+unit).next().text().match(/\d+/);
		return all;
	},
	main:function(){
		var units = ['spear', 'sword', 'axe', 'archer', 'spy', 'light', 'marcher', 'heavy', 'ram', 'catapult', 'knight', 'snob'];
		for(var i=0; i<=units.length; i++){
			if($('#unit_input_'+units[i]).length == 0) {
				continue
			}
			var anzahl = this.replace_all(units[i]);
			if(settings[i] < 0) {
				var dif = Number(anzahl) + Number(settings[i]);
				anzahl = dif < 0 ? 0 : dif;
			} else if (settings[i] > 0) {
				anzahl = settings[i];
			}
			if (settings[i] !== 0) {
				$('#unit_input_'+units[i]).val(anzahl);
			}
		}
		if(settings[12] !='none') {
			$('#inputx').val(settings[12]);
			$('#inputy').val(settings[13]);
		}
		if(settings[14] != 'none') {
			$('#target_'+settings[14]).click();
		}
	}
};
scriptgenerator.main();