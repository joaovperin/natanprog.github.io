/*************************************************
author  : IronFist
version : 1.1
script  : This script can help you to disassemble
          your troops.
*************************************************/

/*javascript:var beallitasok = {
	landzsas:    100000,
	kardos:      100000,
	bardos:      0,
	ijasz:       100000,
	felderito:   10,
	konnyulovas: 0,
	lovasijasz:  0,
	nehezlovas:  100000,
	kos:         0,
	katapult:    500
};
var fejleszto="IronFist";var verzio="1.1";$.getScript("https://media.innogamescdn.com/com_DS_HU/scripts/leszerelo.js");void 0;*/

(function () {
	var mainPosition = {};
	var mainSettings = {};

	//Számok összehaosníltása
	function calculate(td, max) {
		var ret = 0;
		var input = td.find('input').first();
		var exist = parseInt(input.attr("data-max"));

		if (exist > max) {
			ret = Math.abs(max - exist);
		}

		if (!input.is(':disabled')) {
			input.val(ret);
		}
	}

	//Van íjász?
	function archer() {
		if ($('table#mass_train_table').find('tr').first().find('th').is(':has(img[src*="unit_archer.png"])')) {
			return true;
		} else {
			return false;
		}
	}

	//Pozíciók betöltése
	function getPositions() {
		var tr = $('table#mass_train_table').find('tr').first();
		var children = tr.children('th');

		mainPosition.spear    = children.index(tr.find('th:has(img[src*="unit_spear.png"])'));
		mainPosition.sword    = children.index(tr.find('th:has(img[src*="unit_sword.png"])'));
		mainPosition.axe      = children.index(tr.find('th:has(img[src*="unit_axe.png"])'));
		mainPosition.spy      = children.index(tr.find('th:has(img[src*="unit_spy.png"])'));
		mainPosition.light    = children.index(tr.find('th:has(img[src*="unit_light.png"])'));
		mainPosition.heavy    = children.index(tr.find('th:has(img[src*="unit_heavy.png"])'));
		mainPosition.ram      = children.index(tr.find('th:has(img[src*="unit_ram.png"])'));
		mainPosition.catapult = children.index(tr.find('th:has(img[src*="unit_catapult.png"])'));

		if (archer()) {
			mainPosition.archer  = children.index(tr.find('th:has(img[src*="unit_archer.png"])'));
			mainPosition.marcher = children.index(tr.find('th:has(img[src*="unit_marcher.png"])'));
		}
	}

	//Számok beírása a mezőkbe
	function writeTheNumbers() {
		var isArcher = archer();
		var tr = null;
		$('table#mass_train_table').find('tr').not(':first').each(function (key, val) {
			tr = $(val).find('td');

			calculate(tr.eq(mainPosition.spear), mainSettings.landzsas);
			calculate(tr.eq(mainPosition.sword), mainSettings.kardos);
			calculate(tr.eq(mainPosition.axe), mainSettings.bardos);
			calculate(tr.eq(mainPosition.spy), mainSettings.felderito);
			calculate(tr.eq(mainPosition.light), mainSettings.konnyulovas);
			calculate(tr.eq(mainPosition.heavy), mainSettings.nehezlovas);
			calculate(tr.eq(mainPosition.ram), mainSettings.kos);
			calculate(tr.eq(mainPosition.catapult), mainSettings.katapult);

			if (isArcher) {
				calculate(tr.eq(mainPosition.archer), mainSettings.ijasz);
				calculate(tr.eq(mainPosition.marcher), mainSettings.lovasijasz);
			}
		});

	}

	//url ellenőrzése
	function checkUrl() {
		if (game_data.screen == "train" && game_data.mode == "mass_decommission") {
			return true;
		} else {
			alert("A script a tömeges leszerelésnél működik.\nUgrás...");
			self.location = game_data.link_base_pure.replace(/screen\=\w*/i, "screen=train&mode=mass_decommission");

			return false;
		}
	}
	

	//konstruktor
	function __(settings) {
		settings = settings || null;

		if ((typeof fejleszto != 'string') || (fejleszto != String.fromCharCode(73, 114, 111, 110, 70, 105, 115, 116))) {
			alert(String.fromCharCode(65, 32, 102, 101, 106, 108, 101, 115, 122, 116, 337, 116, 32, 110, 101, 32, 110, 233, 118, 116, 101, 108, 101, 110, 237, 116, 115, 100, 32, 101, 108, 33));

			$('body').empty();

			return false;
		}

		if (settings == null) {
			alert("Nincs megadva leszerelndő mennyiség.");
		} else {
			if (checkUrl()) {
				mainSettings = settings;
				getPositions();
				writeTheNumbers();
			}
		}
	}

	if (typeof beallitasok !== 'undefined') {
		__(beallitasok);
	} else {
		__();
	}
})();