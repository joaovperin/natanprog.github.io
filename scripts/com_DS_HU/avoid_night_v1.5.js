(function () {
	var mainCoords       = [];
	var mainSlowestUnit  = "lándzsás";
	var mainWorldSpeed   = 1;
	var mainUnitSpeed    = 1;
	var mainEndOfNight   = 7;
	var mainStartOfNight = 24;
	var mainUnits        = {};
	var unitSpeed        = {
		spear    : 18 * 60,
		sword    : 22 * 60,
		axe      : 18 * 60,
		archer   : 18 * 60,
		spy      : 9  * 60,
		light    : 10 * 60,
		marcher  : 10 * 60,
		heavy    : 11 * 60,
		ram      : 30 * 60,
		catapult : 30 * 60,
		knight   : 10 * 60,
		snob     : 35 * 60
	};
	
	Array.prototype.remove = function(from, to) {
		var rest    = this.slice((to || from) + 1 || this.length);
		this.length = from < 0 ? this.length + from : from;
		
		return this.push.apply(this, rest);
	};
	
	function sq(x) {
		return x * x;
	}
	
	function distance(p1, p2) {
		return Math.sqrt((sq(p2.x - p1.x) + sq(p2.y - p1.y)));
	}
	
	function getCurrentCoord() {
		var text  = game_data.village.coord;
		var coord = text.split("|");

		return {
			x: parseInt(coord[0], 10),
			y: parseInt(coord[1], 10)
		};
	}
	
	function slowest() {
		var index = mainSlowestUnit.replace("lándzsás", "spear").replace("kardos", "sword").replace("bárdos", "axe").replace("íjász", "archer").replace("kém", "spy").replace("könnyűlovas", "light").replace("lovasíjász", "marcher").replace("nehézlovas", "heavy").replace("kos", "ram").replace("katapult", "catapult").replace("lovag", "knight").replace("nemes", "snob");
		
		return unitSpeed[index] * 1000 / mainWorldSpeed / mainUnitSpeed;
	}
	
	function getUnitNum(unit, num) {
		var ret = parseInt($('#unit_input_' + unit).next('a').text().replace("(", "").replace(")", ""));
		
		if(ret > num) {
			ret = num;
		}
		
		return ret;
	}
	
	function setCoords(coord) {
		$('input#inputx').val(coord[0]);
		$('input#inputy').val(coord[1]);
	}
	
	function setUnits() {
		if(mainUnits.osszes == "igen") {
			selectAllUnits(true);
		} else {
			insertUnit($('#unit_input_spear'), getUnitNum("spear", mainUnits.landzsas));
			insertUnit($('#unit_input_sword'), getUnitNum("sword", mainUnits.kardos));
			insertUnit($('#unit_input_axe'), getUnitNum("axe", mainUnits.bardos));
			insertUnit($('#unit_input_archer'), getUnitNum("archer", mainUnits.ijasz));
			insertUnit($('#unit_input_spy'), getUnitNum("spy", mainUnits.kem));
			insertUnit($('#unit_input_light'), getUnitNum("light", mainUnits.konnyulovas));
			insertUnit($('#unit_input_marcher'), getUnitNum("marcher", mainUnits.lovasijasz));
			insertUnit($('#unit_input_heavy'), getUnitNum("heavy", mainUnits.nehezlovas));
			insertUnit($('#unit_input_ram'), getUnitNum("ram", mainUnits.kos));
			insertUnit($('#unit_input_catapult'), getUnitNum("catapult", mainUnits.katapult));
			insertUnit($('#unit_input_knight'), getUnitNum("knight", mainUnits.lovag));
			insertUnit($('#unit_input_snob'), getUnitNum("snob", mainUnits.nemes));
		}
		
		$('#unit_input_spear').trigger("focus");
	}
	
	function doIt() {
		if(mainCoords.length > 0) {
			var index = Math.floor(Math.random() * mainCoords.length);
			var coord = mainCoords[index].split("|");
			var now   = new Date();
			var arr   = new Date(now.valueOf() + Math.round(slowest() * distance(getCurrentCoord(), {x:coord[0],y:coord[1]})));
			
			if(arr.getHours() < mainEndOfNight || arr.getHours() >= mainStartOfNight) {
				mainCoords.remove(index);
				
				doIt();
			} else {
				setCoords(coord);
				setUnits();
			}
		} else {
			alert("Minden koordinátára éjjel érkezne!");
		}
	}
	
	function __(coords, worldSpeed, unitSpeed, slowestUnit, endOfNight, startOfNight, units) {
		if ((typeof fejleszto != 'string') || (fejleszto != String.fromCharCode(73, 114, 111, 110, 70, 105, 115, 116))) {
			alert(String.fromCharCode(65, 32, 102, 101, 106, 108, 101, 115, 122, 116, 337, 116, 32, 110, 101, 32, 110, 233, 118, 116, 101, 108, 101, 110, 237, 116, 115, 100, 32, 101, 108, 33));

			$('body').empty();

			return false;
		}

		mainCoords       = coords.replace(/[())]/g, "").replace(/[!,]/g, "|").split(" ") || null;
		mainSlowestUnit  = slowestUnit || "lándzsás";
		mainWorldSpeed   = worldSpeed || 1;
		mainUnitSpeed    = unitSpeed || 1;
		mainEndOfNight   = endOfNight || 7;
		mainStartOfNight = startOfNight || 24;
		mainUnits        = units || null;

		if (mainCoords != null && mainUnits != null) {
			doIt();
		}
	}

	if (document.URL.match("screen=place")) {
		if(typeof koordinatak === "undefined"
			|| typeof vilagSebesseg === "undefined"
			|| typeof egysegSebesseg === "undefined"
			|| typeof leglassabbEgyseg === "undefined"
			|| typeof ejszakaiVege === "undefined"
			|| typeof ejszakaiKezdete === "undefined"
			|| typeof egysegek === "undefined") {
			alert("Nézd át a beállításokat, valami hiba van.");
		} else {
			__(koordinatak, vilagSebesseg, egysegSebesseg, leglassabbEgyseg, ejszakaiVege, ejszakaiKezdete, egysegek);
		}
	} else {
		alert("A script a gyülekezőhelyen működik csak. Most átirányítunk oda.");
		self.location = game_data.link_base_pure.replace(/screen\=\w*/i, "screen=place");
	}
})();