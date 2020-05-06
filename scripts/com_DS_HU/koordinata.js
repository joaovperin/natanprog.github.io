/*************************************************
author  : IronFist
version : 2.2
script  : This script coordinate picker
          for TribalWars. It can be used on the
		  map.
*************************************************/

//javascript:var alapertelmezes={bbkodos:'igen',ujsor:'igen'};var fejleszto="IronFist";var verzio="2.2";var win=(window.frames.length>0)?window.main:window;if(win.game_data.screen=='map'){$.getScript("http://5.231.81.6/scripts/koordinata.js").done(function(){var script=new CoordinatePicker;script.run();}).fail(function(){alert("Hiba a szerver elérése közben. Kérlek vedd fel a kapcsolatot a fejlesztővel!")});}else{alert("A script csak a térképen működik.\nUgrás a térképre...");self.location=win.game_data.link_base_pure.replace(/screen\=\w*/i,"screen=map");}void 0;

(function () {
	var mainNewline = "\n";
	var mainBB = true;
	//Felület létrehozása
	function create() {
		var bb = ' checked="checked"';
		var nl = ' checked="checked"';

		if (typeof alapertelmezes != "undefined") {
			bb = (alapertelmezes.bbkodos == "igen") ? ' checked="checked"' : '';
			nl = (alapertelmezes.ujsor == "igen") ? ' checked="checked"' : '';
		}

		$('.minimap_container').after('<input type="checkbox" id="scriptused_bb"' + bb + ' /><label for="scriptused_bb">BB kóddal?</label><br /><input type="checkbox" id="scriptused_newline"' + nl + ' /><label for="scriptused_newline">Új sorba?</label><br /><textarea id="scriptused_coords" cols="40" rows="20"></textarea><br /><button id="scriptused_ready">Kész vagyok</button><button id="scriptused_again">Újra gyűjteni akarok</button>');
	}

	//BB kódos?
	function getBB() {
		return $('input#scriptused_bb').is(':checked');
	}

	//Új sorba?
	function newLine() {
		return $('input#scriptused_newline').is(':checked');
	}

	//textarea frissítése
	function addCoord(coord) {
		var pre = $('textarea#scriptused_coords').val();
		var aft = pre + coord + mainNewline;

		$('textarea#scriptused_coords').val(aft);
	}

	//Térkép kattintásra lefutó fgv.
	function handleClick(e) {
		var pos = this.coordByEvent(e);
		var x = pos[0];
		var y = pos[1];
		var a = x * 1000 + y;
		var village = TWMap.villages[a];

		if ((typeof village != 'undefined') && !($('img#map_village_' + village.id).hasClass("script_in_list"))) {
			var coord = "";

			if (mainBB) {
				coord = "[coord]" + pos.join('|') + "[/coord]";
			} else {
				coord = pos.join('|');
			}

			addCoord(coord);

			$('img#map_village_' + village.id).fadeTo(0, 0.5).addClass("script_in_list");
		}

		return false;
	}

	//Eredeti eseménykezelő fgv.
	function originalHandleClick(e) {
		if (this.mover && this.mover.moveDirty) {
			return false;
		}

		var pos = this.coordByEvent(e);

		return this.handler.onClick(pos[0], pos[1], e)
	}

	//Térkép bindelése
	function bind() {
		TWMap.map._handleClick = handleClick;

		$('button#scriptused_ready').on('click', function () {
			TWMap.map._handleClick = originalHandleClick;
		});

		$('button#scriptused_again').on('click', function () {
			TWMap.map._handleClick = handleClick;
		});

		$('textarea#scriptused_coords').on('focus', function () {
			$(this).select();
		});

		$('input#scriptused_newline').on('change', function () {
			if ($(this).is(':checked')) {
				mainNewline = "\n";
			} else {
				mainNewline = " ";
			}
		});

		$('input#scriptused_bb').on('change', function () {
			if ($(this).is(':checked')) {
				mainBB = true;
			} else {
				mainBB = false;
			}
		});
	}

	//Belépési pont
	function __() {
		if ((typeof fejleszto != 'string') || (fejleszto != String.fromCharCode(73, 114, 111, 110, 70, 105, 115, 116))) {
			alert(String.fromCharCode(65, 32, 102, 101, 106, 108, 101, 115, 122, 116, 337, 116, 32, 110, 101, 32, 110, 233, 118, 116, 101, 108, 101, 110, 237, 116, 115, 100, 32, 101, 108, 33));
			return false;
		}

		if (typeof alapertelmezes != "undefined") {
			mainNewline = (alapertelmezes.ujsor == 'igen') ? "\n" : " ";
			mainBB      = (alapertelmezes.bbkodos == 'igen') ? true : false;
		}

		create();
		bind();
	}

	if (game_data.screen == 'map') {
		__();
	} else {
		alert("A script csak a térképen működik.\nUgrás a térképre...");
		self.location = game_data.link_base_pure.replace(/screen\=\w*/i, "screen=map");
	}
})();