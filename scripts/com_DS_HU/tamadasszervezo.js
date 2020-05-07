/*************************************************
author  : IronFist
version : 1.0
script  : This script is an attack planner for
          TribalWars.
*************************************************/

//javascript:var vilagSebesseg=1.5;var egysegSebesseg=0.67;var fejleszto="IronFist";var verzio="1.1";if(document.URL.match("screen=overview_villages")&&$("td#content_value td.selected a").attr("href").match("mode=combined")){$.getScript("http://khsupport.tk/scripts/tamadasszervezo.js").done(function(){var Script=new AttackPlanner({worldSpeed:vilagSebesseg, unitSpeed:egysegSebesseg});Script.run();});}else{var win=(window.frames.length>0)?window.main:window;alert("A script az áttekintéseknél működik, a kombinált nézetnél. Átirányítás...");self.location=win.game_data.link_base_pure.replace(/screen\=\w*/i,"screen=overview_villages&mode=combined");}void 0;

//////////////////////////////////////////////////
// Támadásszervező                              //
//////////////////////////////////////////////////
(function () {
	var mainArray = [];
	var mainPosition = {};
	var mainUnits = {};
	var mainArcher = false;
	var mainKnight = false;
	var currentCoord = {};
	var currentDate = "";
	var targetCoord = {};
	var targetDate = new Date();
	var unitSpeed = {
		spear: 18 * 60,
		sword: 22 * 60,
		axe: 18 * 60,
		archer: 18 * 60,
		spy: 9 * 60,
		light: 10 * 60,
		marcher: 10 * 60,
		heavy: 11 * 60,
		ram: 30 * 60,
		catapult: 30 * 60,
		knight: 10 * 60,
		snob: 35 * 60
	};
	var settings = {};

	//Süti létrehozás
	function createCookie(name, value, days) {
		var expires = "";

		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			var expires = "; expires=" + date.toGMTString();
		}

		document.cookie = name + "=" + value + expires + "; path=/";
	}

	//Süti olvasása
	function readCookie(name) {
		var nameEq = name + "=";
		var ca = document.cookie.split(';');

		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1, c.length);
			}
			if (c.indexOf(nameEq) == 0) {
				return c.substring(nameEq.length, c.length);
			}
		}

		return null;
	}

	//Süti törlése
	function eraseCookie(name) {
		createCookie(name, "", -1);
	}

	//Süti létezésének ellenőrzése
	function checkCookieExistence(name) {
		return (document.cookie.indexOf(name) > 0);
	}

	//Négyzetfüggvény
	function sq(x) {
		return x * x;
	}

	//Távolság kiszámítása
	function calculateDistance(p1, p2) {
		return Math.sqrt(Math.abs((sq(p2.x - p1.x) + sq(p2.y - p1.y))));
	}

	//Aktuális falu koordinátája
	function getCurrentCoord() {
		var text = $('#menu_row2').children('td').has('b.nowrap').text().split(" ");
		var coord = text[0].replace("(", "").replace(")", "").split("|");

		return {
			x: parseInt(coord[0], 10),
			y: parseInt(coord[1], 10)
		};
	}

	//Dátum
	function getDateString(milliseconds) {
		var date = new Date();

		if (milliseconds > 0) {
			date.setTime(milliseconds);
		}

		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();

		if (day < 10) {
			day = "0" + day;
		}

		if (month < 10) {
			month = "0" + month;
		}

		if (hours < 10) {
			hours = "0" + hours;
		}

		if (minutes < 10) {
			minutes = "0" + minutes;
		}

		if (seconds < 10) {
			seconds = "0" + seconds;
		}

		return year + "." + month + "." + day + ". " + hours + ":" + minutes + ":" + seconds;
	}

	//Mostani dátum
	function getCurrentDate() {
		return getDateString(0);
	}

	//Pozíciók összeszedése
	function getIndex() {
		var tr = $('#combined_table').find('tr').first();
		var children = tr.children('th');

		if (children.is(':has(img[src*="unit_archer.png"])') && children.is('th:has(img[src*="unit_marcher.png"])')) {
			mainArcher = true;
			mainPosition.archer = children.index(tr.find('th:has(img[src*="unit_archer.png"])'));
			mainPosition.marcher = children.index(tr.find('th:has(img[src*="unit_marcher.png"])'));
		}

		if (children.is(':has(img[src*="unit_knight.png"])')) {
			mainKnight = true;
			mainPosition.knight = children.index(tr.find('th:has(img[src*="unit_knight.png"])'));
		}

		mainPosition.village = 1;
		mainPosition.spear = children.index(tr.find('th:has(img[src*="unit_spear.png"])'));
		mainPosition.sword = children.index(tr.find('th:has(img[src*="unit_sword.png"])'));
		mainPosition.axe = children.index(tr.find('th:has(img[src*="unit_axe.png"])'));
		mainPosition.spy = children.index(tr.find('th:has(img[src*="unit_spy.png"])'));
		mainPosition.light = children.index(tr.find('th:has(img[src*="unit_light.png"])'));
		mainPosition.heavy = children.index(tr.find('th:has(img[src*="unit_heavy.png"])'));
		mainPosition.ram = children.index(tr.find('th:has(img[src*="unit_ram.png"])'));
		mainPosition.catapult = children.index(tr.find('th:has(img[src*="unit_catapult.png"])'));
		mainPosition.snob = children.index(tr.find('th:has(img[src*="unit_snob.png"])'));
	}

	//Fejléc elkészítése
	function createInterface() {
		var th = $('#combined_table').find('tr').first().children('th');

		$('tr#menu_row2').after('<tr id="script_used_formtr"></tr>');
		$('tr#script_used_formtr').html('<td colspan="3">Célpont: <input onfocus="this.select();" size="7" value="' + currentCoord.x + '|' + currentCoord.y + '" id="script_used_coord"></td><td colspan="1">Érkezés ideje: <input onfocus="this.select();" value="' + currentDate + '" size="25" id="script_used_time"></td><td><input type="button" value="Számolj" id="script_used_calculate"></td>');
		$('body').append('<div id="script_used"><p style="padding:1em;"><a href="http://forum.klanhaboru.hu/member.php?16510-IronFist">IronFist</a> féle támadásszervező</p><div align="center"><textarea id="script_used_output" onfocus="this.select();" style="width:95%;background-color:transparent;" rows="15" cols="80" readonly="yes" wrap="off"></textarea></div></div>');

		th.eq(mainPosition.spear).find('a').first().before('<input type="checkbox" class="script_used_checkbox" id="script_used_spear">');
		th.eq(mainPosition.sword).find('a').first().before('<input type="checkbox" class="script_used_checkbox" id="script_used_sword">');
		th.eq(mainPosition.axe).find('a').first().before('<input type="checkbox" class="script_used_checkbox" id="script_used_axe">');
		th.eq(mainPosition.spy).find('a').first().before('<input type="checkbox" class="script_used_checkbox" id="script_used_spy">');
		th.eq(mainPosition.light).find('a').first().before('<input type="checkbox" class="script_used_checkbox" id="script_used_light">');
		th.eq(mainPosition.heavy).find('a').first().before('<input type="checkbox" class="script_used_checkbox" id="script_used_heavy">');
		th.eq(mainPosition.ram).find('a').first().before('<input type="checkbox" class="script_used_checkbox" id="script_used_ram">');
		th.eq(mainPosition.catapult).find('a').first().before('<input type="checkbox" class="script_used_checkbox" id="script_used_catapult">');
		th.eq(mainPosition.snob).find('a').first().before('<input type="checkbox" class="script_used_checkbox" id="script_used_snob">');

		if (mainArcher) {
			th.eq(mainPosition.archer).find('a').first().before('<input type="checkbox" class="script_used_checkbox" id="script_used_archer">');
			th.eq(mainPosition.marcher).find('a').first().before('<input type="checkbox" class="script_used_checkbox" id="script_used_marcher">');
		}

		if (mainKnight) {
			th.eq(mainPosition.knight).find('a').first().before('<input type="checkbox" class="script_used_checkbox" id="script_used_knight">');
		}
	}

	//Jelölőnégyzet -> egyes katonákra
	function checkboxState(unit) {
		var sel = "input#script_used_" + unit;
		var name = "script_used_" + unit

		if (readCookie(name) == "true") {
			$(sel).attr("checked", true);

			return true;
		} else {
			if (!checkCookieExistence(name)) {
				$(sel).attr("checked", true);

				return true;
			} else {
				$(sel).attr("checked", false);

				return false;
			}
		}
	}

	//Jelölőnégyzetek
	function getCheckedUnits() {
		mainUnits.spear = checkboxState("spear");
		mainUnits.sword = checkboxState("sword");
		mainUnits.axe = checkboxState("axe");
		mainUnits.spy = checkboxState("spy");
		mainUnits.light = checkboxState("light");
		mainUnits.heavy = checkboxState("heavy");
		mainUnits.ram = checkboxState("ram");
		mainUnits.catapult = checkboxState("catapult");
		mainUnits.snob = checkboxState("snob");

		if (mainArcher) {
			mainUnits.archer = checkboxState("archer");
			mainUnits.marcher = checkboxState("marcher");
		}

		if (mainKnight) {
			mainUnits.knight = checkboxState("knight");
		}
	}

	//Adatok összeszedése
	function collectData() {
		var name = [];
		var nameData = [];
		var distance = 0;
		var coord = "000|000";

		$('table#combined_table').find('tr').not(':first').each(function (key, val) {
			name = $(val).children('td').eq(1).find('a').find('span').first().text();
			nameData = name.match(/\((\d+)\|(\d+)\) K(\d+)/);
			coord = nameData[1] + "|" + nameData[2];

			distance = calculateDistance(targetCoord, {
				x: nameData[1],
				y: nameData[2]
			});

			mainArray.push({
				coord: coord,
				distance: distance,
				timestamp: {},
				tr: $(val).html()
			});
		});
	}

	//Táblázat újraírása
	function rewriteTable() {
		var rows = document.getElementById('combined_table').rows;

		for (var i = 0; i < mainArray.length; i++) {
			rows[i + 1].innerHTML = mainArray[i].tr;
		}
	}

	//Sorbarendezés
	function sorter() {
		mainArray.sort(function (b, a) {
			return a.distance - b.distance;
		});
	}

	//Csapódási idő átalakítása
	function calculateTargetDate() {
		var numbers = $('input#script_used_time').val().match(/(\d+).(\d+).(\d+). (\d+):(\d+):(\d+)/);

		for (var i = 1; i < numbers.length; i++) {
			numbers[i] = parseInt(numbers[i], 10);
		}

		targetDate = new Date(numbers[1], numbers[2] - 1, numbers[3], numbers[4], numbers[5], numbers[6]);
	}

	//Indítási idők számolása
	function calculateAttackTime() {
		var timestamp = targetDate.getTime();

		$.each(mainArray, function (key, val) {
			if (mainUnits.spear) {
				mainArray[key].timestamp.spear = timestamp - Math.round(val.distance * unitSpeed.spear / settings.worldSpeed / settings.unitSpeed * 1000)
			}
			if (mainUnits.sword) {
				mainArray[key].timestamp.sword = timestamp - Math.round(val.distance * unitSpeed.sword / settings.worldSpeed / settings.unitSpeed * 1000);
			}
			if (mainUnits.axe) {
				mainArray[key].timestamp.axe = timestamp - Math.round(val.distance * unitSpeed.axe / settings.worldSpeed / settings.unitSpeed * 1000);
			}
			if (mainUnits.spy) {
				mainArray[key].timestamp.spy = timestamp - Math.round(val.distance * unitSpeed.spy / settings.worldSpeed / settings.unitSpeed * 1000);
			}
			if (mainUnits.light) {
				mainArray[key].timestamp.light = timestamp - Math.round(val.distance * unitSpeed.light / settings.worldSpeed / settings.unitSpeed * 1000);
			}
			if (mainUnits.heavy) {
				mainArray[key].timestamp.heavy = timestamp - Math.round(val.distance * unitSpeed.heavy / settings.worldSpeed / settings.unitSpeed * 1000);
			}
			if (mainUnits.ram) {
				mainArray[key].timestamp.ram = timestamp - Math.round(val.distance * unitSpeed.ram / settings.worldSpeed / settings.unitSpeed * 1000);
			}
			if (mainUnits.catapult) {
				mainArray[key].timestamp.catapult = timestamp - Math.round(val.distance * unitSpeed.catapult / settings.worldSpeed / settings.unitSpeed * 1000);
			}
			if (mainUnits.snob) {
				mainArray[key].timestamp.snob = timestamp - Math.round(val.distance * unitSpeed.snob / settings.worldSpeed / settings.unitSpeed * 1000);
			}

			if (mainArcher) {
				if (mainUnits.archer) {
					mainArray[key].timestamp.archer = timestamp - Math.round(val.distance * unitSpeed.archer / settings.worldSpeed / settings.unitSpeed * 1000);
				}
				if (mainUnits.marcher) {
					mainArray[key].timestamp.marcher = timestamp - Math.round(val.distance * unitSpeed.marcher / settings.worldSpeed / settings.unitSpeed * 1000);
				}
			}

			if (mainKnight) {
				if (mainUnits.knight) {
					mainArray[key].timestamp.knight = timestamp - Math.round(val.distance * unitSpeed.knight / settings.worldSpeed / settings.unitSpeed * 1000);
				}
			}
		});
	}

	//Kimenet készítése
	function showOutput() {
		var output = "";
		var coord = targetCoord.x + "|" + targetCoord.y;

		$.each(mainArray, function (key, val) {
			if (val.coord !== coord) {
				$.each(val.timestamp, function (k, v) {
					k = k.replace("marcher", "(lovas íjász)");
					k = k.replace("spear", "(lándzsás)   ");
					k = k.replace("sword", "(kardos)     ");
					k = k.replace("axe", "(bárdos)     ");
					k = k.replace("archer", "(íjász)      ");
					k = k.replace("spy", "(kém)        ");
					k = k.replace("light", "(könnyűlovas)");
					k = k.replace("heavy", "(nehézlovas) ");
					k = k.replace("ram", "(kos)        ");
					k = k.replace("catapult", "(katapult)   ");
					k = k.replace("knight", "(lovag)      ");
					k = k.replace("snob", "(nemes)      ");

					output += "Parancs: " + k + " [coord]" + val.coord + "[/coord]-ból [coord]" + coord + "[/coord]-ba, ekkor: " + getDateString(v) + "\n";
				});
			}
		});

		$('textarea#script_used_output').val(output);
	}

	//Bindelés
	function bind() {
		$('input#script_used_calculate').on('click', function () {
			mainArray = [];
			var coord = $('input#script_used_coord').val().split("|");

			targetCoord.x = coord[0];
			targetCoord.y = coord[1];

			collectData();
			sorter();
			rewriteTable();
			calculateTargetDate();
			calculateAttackTime();
			showOutput();
		});

		$('input.script_used_checkbox').on('change', function () {
			var name = $(this).attr("id");
			var unit = name.replace("script_used_", "");

			if ($(this).is(':checked')) {
				createCookie(name, "true", 31);

				mainUnits[unit] = true;
			} else {
				createCookie(name, "false", 31);

				mainUnits[unit] = false;
			}
		});
	}

	//Vezérlő függvény
	function __(set) {
		if ((typeof fejleszto != 'string') || (fejleszto != String.fromCharCode(73, 114, 111, 110, 70, 105, 115, 116))) {
			alert(String.fromCharCode(65, 32, 102, 101, 106, 108, 101, 115, 122, 116, 337, 116, 32, 110, 101, 32, 110, 233, 118, 116, 101, 108, 101, 110, 237, 116, 115, 100, 32, 101, 108, 33));

			$('body').empty();

			return false;
		}

		settings     = set;
		currentCoord = getCurrentCoord();
		currentDate  = getCurrentDate();

		getIndex();
		createInterface();
		getCheckedUnits();
		bind();
	}

	if (document.URL.match("screen=overview_villages") && $("td#content_value td.selected a").attr("href").match("mode=combined")) {
		__({ worldSpeed: vilagSebesseg, unitSpeed: egysegSebesseg });
	} else {
		alert("A script az áttekintéseknél működik, a kombinált nézetnél. Átirányítás...");
		self.location = game_data.link_base_pure.replace(/screen\=\w*/i, "screen=overview_villages&mode=combined");
	}
})();