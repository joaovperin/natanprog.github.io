/*************************************************
author  : IronFist
version : 1.5
script  : This script is a village-renamer for
          TribalWars.
*************************************************/

//javascript:var fejleszto="IronFist";var verzio="1.5";$.getScript("https://media.innogamescdn.com/com_DS_HU/scripts/faluatnevezo.js");void 0;

//////////////////////////////////////////////////
// Átnevező osztály                             //
//////////////////////////////////////////////////
(function () {
	var delay = 75;
	var mainCoords = [];
	var mainCoordsSecondArray = [];

	//Tömbből való törlés
	Array.prototype.remove = function (from, to) {
		var rest = this.slice((to || from) + 1 || this.length);
		this.length = from < 0 ? this.length + from : from;

		return this.push.apply(this, rest);
	};

	//Szám formázása
	function formatNumberLength(number, length) {
		var ret = "" + number;

		while (ret.length < length) {
			ret = "0" + ret;
		}

		return ret;
	}

	//Véetlen szüveg létrehozása
	function createRandomString(length) {
		var ret = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789äöüÄÖÜßöÖüÜóÓőŐúÚéÉáÁűŰíÍ";

		while (ret.length < length) {
			ret = ret + possible.charAt(Math.floor(Math.random() * possible.length));
		}

		return ret;
	}

	//Négyzet
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

	//Távolság átalakítása
	function createFormattedDistance(coord1, coord2, digits1, digits2) {
		var distance = calculateDistance(coord1, coord2);
		var integer = Math.floor(distance);
		var afterPoint = distance - integer;

		afterPoint = afterPoint.toFixed(digits2);
		afterPoint = afterPoint.substr(1);

		return formatNumberLength(integer, digits1) + afterPoint;
	}

	//Véletlenszerű koordináta
	function randomCoord() {
		var index = Math.floor(Math.random() * mainCoords.length);
		var coord = mainCoords[index];

		mainCoords.remove(index);

		return coord;
	}

	//Név formázása
	function createName(name, key, val) {
		key = key + 1;
		name = name.replace(/\{SORSZÁM\}/, key);
		name = name.replace(/\{SORSZÁM\:(\d)\}/, function (match, m1) {
			return formatNumberLength(key, m1);
		});
		name = name.replace(/\{MOSTANI\}/, $(val).prev('a').children('span').first().attr("data-text"));
		name = name.replace(/\{VÉLETLEN\:(\d)\}/, function (match, m1) {
			return createRandomString(m1);
		});
		name = name.replace(/\{TÁVOLSÁG:(\d{1,3})\|(\d{1,3})\,(\d)\,(\d)\}/, function (match, m1, m2, m3, m4) {
			var coord = $(val).prev('a').children('span').first().text().match(/\((\d+)\|(\d+)\)/);
			return createFormattedDistance({ x: coord[1], y: coord[2] }, { x: m1, y: m2 }, m3, m4);
		});
		name = name.replace(/\{KOORDINÁTA\}/, function () {
			if (mainCoords.length == 0) {
				mainCoords = mainCoords.concat(mainCoordsSecondArray);
			}

			return randomCoord();
		});

		return name;
	}

	//Maga az átnevezés
	function doIt(name) {
		var element = [];

		name = name.replace(/\{KOORDINÁTA:(.*?)\}/, function (match, m1) {
			mainCoords = m1.split(" ");
			mainCoordsSecondArray = mainCoordsSecondArray.concat(mainCoords);

			return "{KOORDINÁTA}";
		});

		$('table#combined_table').find('tr').not(':first').find('td:eq(1)').find('a.rename-icon').each(function (key, val) {
			setTimeout(function() {
				$(val).trigger("click");

				element = $(val).parent().next('span').children('input');

				element.first().val(createName(name, key, val));
				element.last().trigger("click");
			}, delay * key);
		});
	}

	//Vezérlő fgv.
	function __() {
		if (typeof fejleszto != 'string' || fejleszto != String.fromCharCode(73, 114, 111, 110, 70, 105, 115, 116)) {
			alert(String.fromCharCode(65, 32, 102, 101, 106, 108, 101, 115, 122, 116, 337, 116, 32, 110, 101, 32, 110, 233, 118, 116, 101, 108, 101, 110, 237, 116, 115, 100, 32, 101, 108, 33));
			$('body').empty();
			return false;
		}

		var name = prompt("Mire nevezzem át?", "");

		doIt(name);
	}

	if (document.URL.match("screen=overview_villages") && $("td#content_value td.selected a").attr("href").match("mode=combined")) {
		__();
	} else {
		alert("A script az áttekintéseknél működik, a kombinált nézetnél. Átirányítás...");
		self.location = game_data.link_base_pure.replace(/screen\=\w*/i, "screen=overview_villages&mode=combined");
	}
})();