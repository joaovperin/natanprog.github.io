/*************************************************
author  : IronFist
version : 1.1
script  : This script is a bonus finder for
          TribalWars.
*************************************************/

//javascript:var pont={min:0,max:12154};var fejleszto="IronFist";var verzio="1.1";$.getScript("https://media.innogamescdn.com/com_DS_HU/scripts/bonusz.js");void(0);

//////////////////////////////////////////////////
// Bónusz kereső osztály                        //
//////////////////////////////////////////////////
(function () {
	var mainCoords = [];
	var mainPoints = {};
	var mainPlayer = false;

	//Pontszám beállítások ellenőrzése
	function checkPoints() {
		if (typeof pont != 'undefined') {
			mainPoints = pont;
		} else {
			mainPoints = {
				min: 0,
				max: 12168
			};
		}
	}

	//Játékos ellenőrzés -> csak barbár bónusz, vagy nem
	function checkPlayer() {
		if (confirm("Játékos által birtokolt bónusz falu is legyen benne?")) {
			mainPlayer = true;
		}
	}

	//Bónusz faluk gyűjtése
	function createList() {
		var coord = [];
		var village = {};
		var player = {};
		var point = 0;

		for (var i = 0; i < TWMap.size[1]; i++) {
			for (var j = 0; j < TWMap.size[0]; j++) {
				coord = TWMap.map.coordByPixel(TWMap.map.pos[0] + (TWMap.tileSize[0] * j), TWMap.map.pos[1] + (TWMap.tileSize[1] * i));

				if (coord) {
					village = TWMap.villages[coord.join("")];

					if (village) {
						if (village.bonus) {
							player = null;
							point = parseInt(village.points.replace(".", ""), 10);

							if (village.hasOwnProperty('owner')) {
								player = TWMap.players[village.owner];
							}

							if (mainPlayer) {
								if (player) {
									if (player.name != game_data.player.name) {
										if (point <= mainPoints.max && point >= mainPoints.min) {
											mainCoords.push(coord.join("|"));
										}
									}
								} else {
									if (point <= mainPoints.max && point >= mainPoints.min) {
										mainCoords.push(coord.join("|"));
									}
								}
							} else {
								if (!player) {
									if (point <= mainPoints.max && point >= mainPoints.min) {
										mainCoords.push(coord.join("|"));
									}
								}
							}
						}
					}
				}
			}
		}
	}

	//Koordináták mutatása a játékosnak
	function showList() {
		if (mainCoords.length > 0) {
			alert(mainCoords.join(" "));
		} else {
			alert("Nincs megfelelő búnuszfalu a térkép ezen részén!");
		}
	}

	//Függvényhívások
	function __() {
		if ((typeof fejleszto != 'string') || (fejleszto != String.fromCharCode(73, 114, 111, 110, 70, 105, 115, 116))) {
			alert(String.fromCharCode(65, 32, 102, 101, 106, 108, 101, 115, 122, 116, 337, 116, 32, 110, 101, 32, 110, 233, 118, 116, 101, 108, 101, 110, 237, 116, 115, 100, 32, 101, 108, 33));

			$('body').empty();

			return false;
		}

		checkPoints();
		checkPlayer();
		createList();
		showList();
	}

	if (game_data.screen == "map") {
		__();
	} else {
		alert("A script csak a térképen fut.\nUgrás a térképre...");
		self.location = game_data.link_base_pure.replace(/screen\=/i, "screen=map");
	}
})();