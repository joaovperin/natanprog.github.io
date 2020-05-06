/*************************************************
author  : IronFist
version : 1.2
script  : This script can be used to tick the
          appropriate villages.
*************************************************/

/*javascript:var koordinatak="";
var fejleszto="IronFist";var verzio="1.2";
$.getScript("https://media.innogamescdn.com/com_DS_HU/scripts/falupipalo.js");void 0;*/

(function() {
	var mainCoords = [];
	
	//Array.remove(from, to)
	Array.prototype.remove = function(from, to) {
		var rest    = this.slice((to || from) + 1 || this.length);
		this.length = from < 0 ? this.length + from : from;
		
		return this.push.apply(this, rest);
	};
	
	//loop
	function loop() {
		var matches = [];
		var coord   = "";
		
		$('table#group_assign_table').find('tr').not('[id*="group_edit_tr_"]').not(':first').not(':last').each(function(key, val) {
			if(mainCoords.length > 0) {
				matches = $(val).children('td').first().find('a').first().children('span').text().match(/\((\d+)\|(\d+)\)/);
				
				coord = matches[0].replace("(", "").replace(")", "");
				
				$.each(mainCoords, function(k, v) {
					if(v == coord) {
						$(val).children('td').first().find('input').first().prop("checked", true);
						
						mainCoords.remove(k);
						
						return false;
					}
				});
			} else {
				return false;
			}
		});
	}
	
	//contstructor
	function __(coords) {
		coords = coords || null;

		if ((typeof fejleszto != 'string') || (fejleszto != String.fromCharCode(73, 114, 111, 110, 70, 105, 115, 116))) {
			alert(String.fromCharCode(65, 32, 102, 101, 106, 108, 101, 115, 122, 116, 337, 116, 32, 110, 101, 32, 110, 233, 118, 116, 101, 108, 101, 110, 237, 116, 115, 100, 32, 101, 108, 33));

			$('body').empty();

			return false;
		}

		if (document.URL.match("screen=overview_villages") && document.URL.match("mode=groups") && document.URL.match("type=static")) {
			if (coords != null) {
				mainCoords = coords.split(" ");
				loop();
			} else {
				alert("Nem adtál meg koordinátát!");
			}
		} else {
			alert("A script a csoportok áttekintésénél működik. Most átirányítunk oda.");
			self.location = game_data.link_base_pure.replace(/screen\=\w*/i,"screen=overview_villages&mode=groups&type=static");
		}
	}

	if (typeof koordinatak !== 'undefined') {
		__(koordinatak);
	} else {
		__();
	}
})();