/*************************************************
author  : IronFist
version : 1.2
script  : This script is a sorter for TribalWars.
*************************************************/

//javascript:var negylepcsosFejlesztes=false;var fejleszto="IronFist";var verzio="1.2";$.getScript("http://5.231.81.6/scripts/sorbarendezo.js");void 0;


//////////////////////////////////////////////////
// Kiegészítű függvények gyűjtőosztálya         //
//////////////////////////////////////////////////

function ExternalMethods() {
	//Négyzetfüggvény
	this.sq = function(x) {
		return x * x;
	};

	//Távolság kiszámítása
	this.distance = function(p1, p2) {
		return Math.sqrt(Math.abs((this.sq(p2.x - p1.x) + this.sq(p2.y - p1.y)))).toFixed(1);
	};

	//Aktuális falu koordinátája
	this.getCurrentCoord = function() {
		var text  = $('#menu_row2').children('td').has('b.nowrap').text().split(" ");
		var coord = text[0].replace("(", "").replace(")", "").split("|");

		return {
			x: parseInt(coord[0]),
			y: parseInt(coord[1])
		};
	};
	
	//CSS alkalmazása
	this.addCSSRules = function() {
		$('div.text').css('float', 'left');
		$('div.sort').css({
			'float': 'left',
			'width': '0.5em'
		});
		$('div.sort div.asc').css({
			'width': '0',
			'height': '0',
			'line-height': '0',
			'margin-top': '.0em',
			'border-top': '0px solid',
			'border-right': '.3em solid rgb(222,211,185)',
			'border-bottom': '.8em solid',
			'border-left': '.3em solid rgb(222,211,185)',
			'float': 'left',
			'margin-left': '0px',
			'border-top-color': '#fff',
			'border-bottom-color': '#fff'
		});
		$('div.sort div.desc').css({
			'width': '0',
			'height': '0',
			'margin-top': '.2em',
			'line-height': '0',
			'border-top': '.8em solid ',
			'border-left': '.3em solid rgb(222,211,185)',
			'border-right': '.3em solid rgb(222,211,185)',
			'border-bottom': '0px solid',
			'float': 'left',
			'border-top-color': '#fff',
			'border-bottom-color': '#fff'
		});
		
		//bindelés miatt return
		return $('div.sort div').hover(function() {
			if(!$(this).is('.active_sorter')) {
				$(this).css({
					'border-top-color': '#0082BE',
					'border-bottom-color': '#0082BE'
				});
			}
		}, function() {
			if(!$(this).is('.active_sorter')) {
				$(this).css({
					'border-top-color': '#fff',
					'border-bottom-color': '#fff'
				});
			}
		}).on('click', function() {
			$('div.active_sorter').css({
				'border-top-color': '#fff',
				'border-bottom-color': '#fff'
			}).removeClass('active_sorter');
			
			$(this).addClass("active_sorter").css({
				'border-top-color': '#C00',
				'border-bottom-color': '#C00'
			});
		});
	};
	
	//Fejlécben elemek létrehozása
	this.createHeader = function(pattern, element) {
		var text  = '<div class="text">$1</div>';
		var arrow = '<div class="sort" id="$1"><div class="asc"></div><div class="desc"></div></div>';
		
		pattern = pattern.replace('{BR}', '<br>');
		pattern = pattern.replace(/\{ARROW\:(.*?)\}/g, arrow);
		pattern = pattern.replace(/\{TEXT\:(.*?)\}/g, text);
		
		element.append(pattern);
	};
}

//////////////////////////////////////////////////
// Kombinált áttekintés                         //
//////////////////////////////////////////////////
function CombinedSorter() {
	var mainExternal = new ExternalMethods();
	var mainChurch   = false;
	var mainArcher   = false;
	var mainKnight   = false;
	var mainMilitia  = false;
	var mainPosition = {};
	var mainArray    = [];
	
	//Beállítások begyűjtése
	function checkSettings() {
		$('table#combined_table').find('tr').first().children('th').last().after('<th id="script_distance">Távolság</th>');

		var tr       = $('table#combined_table').find('tr').first();
		var children = tr.children('th');

		if(children.is(':has(img[src*="church.png"])')) {
			mainChurch          = true;
			mainPosition.church = children.index(tr.find('th:has(img[src*="church.png"])'));
		}

		if(children.is(':has(img[src*="unit_archer.png"])') && children.is('th:has(img[src*="unit_marcher.png"])')) {
			mainArcher           = true;
			mainPosition.archer  = children.index(tr.find('th:has(img[src*="unit_archer.png"])'));
			mainPosition.marcher = children.index(tr.find('th:has(img[src*="unit_marcher.png"])'));
		}

		if(children.is(':has(img[src*="unit_knight.png"])')) {
			mainKnight          = true;
			mainPosition.knight = children.index(tr.find('th:has(img[src*="unit_knight.png"])'));
		}

		if(children.is(':has(img[src*="unit_militia.png"])')) {
			mainMilitia          = true;
			mainPosition.militia = children.index(tr.find('th:has(img[src*="unit_militia.png"])'));
		}

		mainPosition.village  = 1;
		mainPosition.farm     = children.index(tr.find('th:has(img[src*="farm.png"])'));
		mainPosition.spear    = children.index(tr.find('th:has(img[src*="unit_spear.png"])'));
		mainPosition.sword    = children.index(tr.find('th:has(img[src*="unit_sword.png"])'));
		mainPosition.axe      = children.index(tr.find('th:has(img[src*="unit_axe.png"])'));
		mainPosition.spy      = children.index(tr.find('th:has(img[src*="unit_spy.png"])'));
		mainPosition.light    = children.index(tr.find('th:has(img[src*="unit_light.png"])'));
		mainPosition.heavy    = children.index(tr.find('th:has(img[src*="unit_heavy.png"])'));
		mainPosition.ram      = children.index(tr.find('th:has(img[src*="unit_ram.png"])'));
		mainPosition.catapult = children.index(tr.find('th:has(img[src*="unit_catapult.png"])'));
		mainPosition.snob     = children.index(tr.find('th:has(img[src*="unit_snob.png"])'));
		mainPosition.trader   = children.index(tr.find('th:has(img[src*="trader.png"])'));
		mainPosition.distance = children.index(children.last());
	}
	
	//Adatok összeszedése
	function collectData() {
		var td           = [];
		var name         = [];
		var farm         = [];
		var trader       = [];
		var nameData     = [];
		var currentCoord = mainExternal.getCurrentCoord();
		var distance     = 0;
		
		$('table#combined_table').find('tr').not(':first').each(function(key, val) {
			td        = $(val).children('td');
			name      = td.eq(mainPosition.village).find('a').find('span').first().text();
			farm      = td.eq(mainPosition.farm).text().match(/(\-?\d+) \((\d+)\)/);
			trader    = td.eq(mainPosition.trader).text().match(/(\d+)\/(\d+)/);
			nameData  = name.match(/\((\d+)\|(\d+)\) K(\d+)/);
			
			distance  = mainExternal.distance(currentCoord, {
				x: nameData[1],
				y: nameData[2]
			});
			
			td.last().after('<td>' + distance + '</td>');
			
			mainArray.push({
				x          : parseInt(nameData[1]),
				y          : parseInt(nameData[2]),
				continent  : parseInt(nameData[3]),
				distance   : distance,
				name       : name,
				freePop    : parseInt(farm[1]),
				farm       : parseInt(farm[2]),
				freeTrader : parseInt(trader[1]),
				allTrader  : parseInt(trader[2]),
				spear      : parseInt(td.eq(mainPosition.spear).text()),
				sword      : parseInt(td.eq(mainPosition.sword).text()),
				axe        : parseInt(td.eq(mainPosition.axe).text()),
				spy        : parseInt(td.eq(mainPosition.spy).text()),
				light      : parseInt(td.eq(mainPosition.light).text()),
				heavy      : parseInt(td.eq(mainPosition.heavy).text()),
				ram        : parseInt(td.eq(mainPosition.ram).text()),
				catapult   : parseInt(td.eq(mainPosition.catapult).text()),
				snob       : parseInt(td.eq(mainPosition.snob).text()),
				tr         : $(val).html()
			});
			
			if(mainArcher) {
				mainArray[key].archer  = parseInt(td.eq(mainPosition.archer).text());
				mainArray[key].marcher = parseInt(td.eq(mainPosition.marcher).text());
			}
			
			if(mainKnight) {
				mainArray[key].knight = parseInt(td.eq(mainPosition.knight).text());
			}
			
			if(mainMilitia) {
				mainArray[key].militia = parseInt(td.eq(mainPosition.militia).text())
			}
			
			if(mainChurch) {
				if(td.eq(mainPosition.church).is(':has(img[src*="prod_running.png"])') || td.eq(mainPosition.church).is('span.running')) {
					mainArray[key].church = 1;
				} else {
					mainArray[key].church = 0;
				}
			}
		});
	}
	
	//Táblázat újraírása
	function rewriteTable() {
		var rows = document.getElementById('combined_table').rows;

        for(var i = 0; i < mainArray.length; i++) {
			rows[i+1].innerHTML = mainArray[i].tr;
		}
	}
	
	//Sorbarendezés
	function sorter(order, index) {
		if(index == "name") {
			if(order == "asc") {
				mainArray.sort(function(a, b) {
					if(a.name.toLowerCase() == b.name.toLowerCase()) {
						return 0;
					} else if(a.name.toLowerCase() < b.name.toLowerCase()) {
						return -1;
					} else {
						return 1;
					}
				});
			} else if(order == "desc") {
				mainArray.sort(function(b, a) {
					if(a.name.toLowerCase() == b.name.toLowerCase()) {
						return 0;
					} else if(a.name.toLowerCase() < b.name.toLowerCase()) {
						return -1;
					} else {
						return 1;
					}
				});
			}
		} else {
			if(order == "asc") {
				mainArray.sort(function(a, b) {
					return a[index] - b[index];
				});
			} else if(order == "desc") {
				mainArray.sort(function(b, a) {
					return a[index] - b[index];
				});
			}
		}
		
		rewriteTable();
	}
	
	//Táblázat bindelése
	function bind() {
		var th = $('table#combined_table').find('tr').first().children('th');
		
		mainExternal.createHeader('{BR}{ARROW:name}{TEXT:(}{ARROW:x}{TEXT:|}{ARROW:y}{TEXT:)&nbsp;K}{ARROW:continent}', th.eq(mainPosition.village));
		mainExternal.createHeader('{BR}{ARROW:freePop}{TEXT:(}{ARROW:farm}{TEXT:)}', th.eq(mainPosition.farm));
		mainExternal.createHeader('{BR}{ARROW:spear}', th.eq(mainPosition.spear));
		mainExternal.createHeader('{BR}{ARROW:sword}', th.eq(mainPosition.sword));
		mainExternal.createHeader('{BR}{ARROW:axe}', th.eq(mainPosition.axe));
		mainExternal.createHeader('{BR}{ARROW:spy}', th.eq(mainPosition.spy));
		mainExternal.createHeader('{BR}{ARROW:light}', th.eq(mainPosition.light));
		mainExternal.createHeader('{BR}{ARROW:heavy}', th.eq(mainPosition.heavy));
		mainExternal.createHeader('{BR}{ARROW:ram}', th.eq(mainPosition.ram));
		mainExternal.createHeader('{BR}{ARROW:catapult}', th.eq(mainPosition.catapult));
		mainExternal.createHeader('{BR}{ARROW:snob}', th.eq(mainPosition.snob));
		mainExternal.createHeader('{BR}{ARROW:freeTrader}{TEXT:/}{ARROW:allTrader}', th.eq(mainPosition.trader));
		mainExternal.createHeader('{BR}{ARROW:distance}', th.eq(mainPosition.distance));
		
		if(mainArcher) {
			mainExternal.createHeader('{BR}{ARROW:archer}', th.eq(mainPosition.archer));
			mainExternal.createHeader('{BR}{ARROW:marcher}', th.eq(mainPosition.marcher));
		}
		
		if(mainKnight) {
			mainExternal.createHeader('{BR}{ARROW:knight}', th.eq(mainPosition.knight));
		}
		
		if(mainMilitia) {
			mainExternal.createHeader('{BR}{ARROW:militia}', th.eq(mainPosition.militia));
		}
		
		if(mainChurch) {
			mainExternal.createHeader('{BR}{ARROW:church}', th.eq(mainPosition.church));
		}
		
		mainExternal.addCSSRules().on('click', function() {
			sorter($(this).attr('class').replace(' active_sorter', ''), $(this).parent().attr('id'));
		});
	}

	this.run = function() {
		checkSettings();
		collectData();
		bind();
	};
}

//////////////////////////////////////////////////
// Termelés áttekintés                          //
//////////////////////////////////////////////////
function ProdSorter() {
	var mainExternal = new ExternalMethods();
	var mainPosition = {};
	var mainArray    = [];
	
	//Beállítások begyűjtése
	function checkSettings() {
		$('table#production_table').find('tr').first().children('th').last().after('<th id="script_distance">Távolság</th>');

		mainPosition.village   = 1;
		mainPosition.points    = 2;
		mainPosition.resources = 3;
		mainPosition.store     = 4;
		mainPosition.trader    = 5;
		mainPosition.farm      = 6;
		mainPosition.build     = 7;
		mainPosition.develop   = 8;
		mainPosition.recruit   = 9;
		mainPosition.distance  = 10;
	}
	
	//Adatok összeszedése
	function collectData() {
		var td           = [];
		var name         = [];
		var farm         = [];
		var trader       = [];
		var nameData     = [];
		var currentCoord = mainExternal.getCurrentCoord();
		var distance     = 0;
		
		$('table#production_table').find('tr').not(':first').each(function(key, val) {
			td        = $(val).children('td');
			name      = td.eq(mainPosition.village).find('a').find('span').first().text();
			farm      = td.eq(mainPosition.farm).text().match(/(\d+)\/(\d+)/);
			trader    = td.eq(mainPosition.trader).text().match(/(\d+)\/(\d+)/);
			nameData  = name.match(/\((\d+)\|(\d+)\) K(\d+)/);
			distance  = mainExternal.distance(currentCoord, {
				x: nameData[1],
				y: nameData[2]
			});
			
			td.last().after('<td>' + distance + '</td>');
			
			mainArray.push({
				x          : parseInt(nameData[1]),
				y          : parseInt(nameData[2]),
				continent  : parseInt(nameData[3]),
				distance   : distance,
				name       : name,
				points     : parseInt(td.eq(mainPosition.points).text().replace(".", "")),
				maxPop     : parseInt(farm[2]),
				population : parseInt(farm[1]),
				freeTrader : parseInt(trader[1]),
				allTrader  : parseInt(trader[2]),
				wood       : parseInt(td.eq(mainPosition.resources).children('span').eq(0).text().replace(".", "")),
				stone      : parseInt(td.eq(mainPosition.resources).children('span').eq(1).text().replace(".", "")),
				iron       : parseInt(td.eq(mainPosition.resources).children('span').eq(2).text().replace(".", "")),
				store      : parseInt(td.eq(mainPosition.store).text()),
				build      : td.eq(mainPosition.build).children('ul').children('li').length,
				develop    : td.eq(mainPosition.develop).children('img').length,
				recruit    : td.eq(mainPosition.recruit).children('ul').children('li').length,
				tr         : $(val).html()
			});
		});
	}
	
	//Táblázat újraírása
	function rewriteTable() {
		var rows = document.getElementById('production_table').rows;

        for(var i = 0; i < mainArray.length; i++) {
			rows[i+1].innerHTML = mainArray[i].tr;
		}
	}
	
	//Sorbarendezés
	function sorter(order, index) {
		if(index == "name") {
			if(order == "asc") {
				mainArray.sort(function(a, b) {
					if(a.name.toLowerCase() == b.name.toLowerCase()) {
						return 0;
					} else if(a.name.toLowerCase() < b.name.toLowerCase()) {
						return -1;
					} else {
						return 1;
					}
				});
			} else if(order == "desc") {
				mainArray.sort(function(b, a) {
					if(a.name.toLowerCase() == b.name.toLowerCase()) {
						return 0;
					} else if(a.name.toLowerCase() < b.name.toLowerCase()) {
						return -1;
					} else {
						return 1;
					}
				});
			}
		} else {
			if(order == "asc") {
				mainArray.sort(function(a, b) {
					return a[index] - b[index];
				});
			} else if(order == "desc") {
				mainArray.sort(function(b, a) {
					return a[index] - b[index];
				});
			}
		}
		
		rewriteTable();
	}
	
	//Táblázat bindelése
	function bind() {
		var th = $('table#production_table').find('tr').first().children('th');
		
		mainExternal.createHeader('{BR}{ARROW:name}{TEXT:(}{ARROW:x}{TEXT:|}{ARROW:y}{TEXT:)&nbsp;K}{ARROW:continent}', th.eq(mainPosition.village));
		mainExternal.createHeader('{BR}{ARROW:points}', th.eq(mainPosition.points));
		mainExternal.createHeader('{BR}{ARROW:wood}{TEXT:&nbsp;}{ARROW:stone}{TEXT:&nbsp;}{ARROW:iron}', th.eq(mainPosition.resources));
		mainExternal.createHeader('{BR}{ARROW:store}', th.eq(mainPosition.store));
		mainExternal.createHeader('{BR}{ARROW:freeTrader}{TEXT:/}{ARROW:allTrader}', th.eq(mainPosition.trader));
		mainExternal.createHeader('{BR}{ARROW:population}{TEXT:/}{ARROW:maxPop}', th.eq(mainPosition.farm));
		mainExternal.createHeader('{BR}{ARROW:build}', th.eq(mainPosition.build));
		mainExternal.createHeader('{BR}{ARROW:develop}', th.eq(mainPosition.develop));
		mainExternal.createHeader('{BR}{ARROW:recruit}', th.eq(mainPosition.recruit));
		mainExternal.createHeader('{BR}{ARROW:distance}', th.eq(mainPosition.distance));
		
		mainExternal.addCSSRules().on('click', function() {
			sorter($(this).attr('class').replace(' active_sorter', ''), $(this).parent().attr('id'));
		});
	}

	this.run = function() {
		checkSettings();
		collectData();
		bind();
	};
}

//////////////////////////////////////////////////
// Parancsok sorbarendezése                     //
//////////////////////////////////////////////////
function CommandsSorter() {
	var mainExternal = new ExternalMethods();
	var mainArcher   = false;
	var mainKnight   = false;
	var mainPosition = {};
	var mainArray    = [];
	
	//Beállítások begyűjtése
	function checkSettings() {
		var tr       = $('table#commands_table').find('tr').first();
		var children = tr.children('th');

		if(children.is(':has(img[src*="unit_archer.png"])') && children.is('th:has(img[src*="unit_marcher.png"])')) {
			mainArcher           = true;
			mainPosition.archer  = children.index(tr.find('th:has(img[src*="unit_archer.png"])'));
			mainPosition.marcher = children.index(tr.find('th:has(img[src*="unit_marcher.png"])'));
		}

		if(children.is(':has(img[src*="unit_knight.png"])')) {
			mainKnight          = true;
			mainPosition.knight = children.index(tr.find('th:has(img[src*="unit_knight.png"])'));
		}

		mainPosition.command  = 0;
		mainPosition.from     = 1;
		mainPosition.date     = 2;
		mainPosition.spear    = children.index(tr.find('th:has(img[src*="unit_spear.png"])'));
		mainPosition.sword    = children.index(tr.find('th:has(img[src*="unit_sword.png"])'));
		mainPosition.axe      = children.index(tr.find('th:has(img[src*="unit_axe.png"])'));
		mainPosition.spy      = children.index(tr.find('th:has(img[src*="unit_spy.png"])'));
		mainPosition.light    = children.index(tr.find('th:has(img[src*="unit_light.png"])'));
		mainPosition.heavy    = children.index(tr.find('th:has(img[src*="unit_heavy.png"])'));
		mainPosition.ram      = children.index(tr.find('th:has(img[src*="unit_ram.png"])'));
		mainPosition.catapult = children.index(tr.find('th:has(img[src*="unit_catapult.png"])'));
		mainPosition.snob     = children.index(tr.find('th:has(img[src*="unit_snob.png"])'));
	}
	
	//Adatok összeszedése
	function collectData() {
		var td               = [];
		var command          = [];
		var commandData      = [];
		var from             = [];
		var fromData         = [];
		
		$('table#commands_table').find('tr').not(':first').not(':last').each(function(key, val) {
			td               = $(val).children('td');
			command          = td.eq(mainPosition.command).find('a').first().text();
			commandData      = command.match(/\((\d+)\|(\d+)\) K(\d+)/);
			from             = td.eq(mainPosition.from).find('a').first().text();
			fromData         = from.match(/\((\d+)\|(\d+)\) K(\d+)/);
			
			mainArray.push({
				command          : command,
				commandX         : parseInt(commandData[1]),
				commandY         : parseInt(commandData[2]),
				commandContinent : parseInt(commandData[3]),
				from             : from,
				fromX            : parseInt(fromData[1]),
				fromY            : parseInt(fromData[2]),
				fromContinent    : parseInt(fromData[3]),
				spear            : parseInt(td.eq(mainPosition.spear).text()),
				sword            : parseInt(td.eq(mainPosition.sword).text()),
				axe              : parseInt(td.eq(mainPosition.axe).text()),
				spy              : parseInt(td.eq(mainPosition.spy).text()),
				light            : parseInt(td.eq(mainPosition.light).text()),
				heavy            : parseInt(td.eq(mainPosition.heavy).text()),
				ram              : parseInt(td.eq(mainPosition.ram).text()),
				catapult         : parseInt(td.eq(mainPosition.catapult).text()),
				snob             : parseInt(td.eq(mainPosition.snob).text()),
				date             : td.eq(mainPosition.date).text(),
				tr               : $(val).html()
			});
			
			if(mainArcher) {
				mainArray[key].archer  = parseInt(td.eq(mainPosition.archer).text());
				mainArray[key].marcher = parseInt(td.eq(mainPosition.marcher).text());
			}
			
			if(mainKnight) {
				mainArray[key].knight = parseInt(td.eq(mainPosition.knight).text());
			}
		});
	}
	
	//Táblázat újraírása
	function rewriteTable() {
		var rows = document.getElementById('commands_table').rows;

        for(var i = 0; i < mainArray.length; i++) {
			rows[i+1].innerHTML = mainArray[i].tr;
		}
	}
	
	//Sorbarendezés
	function sorter(order, index) {
		if(index == "command") {
			if(order == "asc") {
				mainArray.sort(function(a, b) {
					if(a.command.toLowerCase() == b.command.toLowerCase()) {
						return 0;
					} else if(a.command.toLowerCase() < b.command.toLowerCase()) {
						return -1;
					} else {
						return 1;
					}
				});
			} else if(order == "desc") {
				mainArray.sort(function(b, a) {
					if(a.command.toLowerCase() == b.command.toLowerCase()) {
						return 0;
					} else if(a.command.toLowerCase() < b.command.toLowerCase()) {
						return -1;
					} else {
						return 1;
					}
				});
			}
		} if(index == "from") {
			if(order == "asc") {
				mainArray.sort(function(a, b) {
					if(a.from.toLowerCase() == b.from.toLowerCase()) {
						return 0;
					} else if(a.from.toLowerCase() < b.from.toLowerCase()) {
						return -1;
					} else {
						return 1;
					}
				});
			} else if(order == "desc") {
				mainArray.sort(function(b, a) {
					if(a.from.toLowerCase() == b.from.toLowerCase()) {
						return 0;
					} else if(a.from.toLowerCase() < b.from.toLowerCase()) {
						return -1;
					} else {
						return 1;
					}
				});
			}
		} if(index == "date") {
			if(order == "asc") {
				mainArray.sort(function(b, a) {
					if(a.date.toLowerCase() == b.date.toLowerCase()) {
						return 0;
					} else if(a.date.toLowerCase() < b.date.toLowerCase()) {
						return -1;
					} else {
						return 1;
					}
				});
			} else if(order == "desc") {
				mainArray.sort(function(a, b) {
					if(a.date.toLowerCase() == b.date.toLowerCase()) {
						return 0;
					} else if(a.date.toLowerCase() < b.date.toLowerCase()) {
						return -1;
					} else {
						return 1;
					}
				});
			}
		} else {
			if(order == "asc") {
				mainArray.sort(function(a, b) {
					return a[index] - b[index];
				});
			} else if(order == "desc") {
				mainArray.sort(function(b, a) {
					return a[index] - b[index];
				});
			}
		}
		
		rewriteTable();
	}
	
	//Táblázat bindelése
	function bind() {
		var th = $('table#commands_table').find('tr').first().children('th');
		
		mainExternal.createHeader('{BR}{ARROW:command}{TEXT:(}{ARROW:commandX}{TEXT:|}{ARROW:commandY}{TEXT:)&nbsp;K}{ARROW:commandContinent}', th.eq(mainPosition.command));
		mainExternal.createHeader('{BR}{ARROW:from}{TEXT:(}{ARROW:fromX}{TEXT:|}{ARROW:fromY}{TEXT:)&nbsp;K}{ARROW:fromContinent}', th.eq(mainPosition.from));
		mainExternal.createHeader('{BR}{ARROW:date}', th.eq(mainPosition.date));
		mainExternal.createHeader('{BR}{ARROW:spear}', th.eq(mainPosition.spear));
		mainExternal.createHeader('{BR}{ARROW:sword}', th.eq(mainPosition.sword));
		mainExternal.createHeader('{BR}{ARROW:axe}', th.eq(mainPosition.axe));
		mainExternal.createHeader('{BR}{ARROW:spy}', th.eq(mainPosition.spy));
		mainExternal.createHeader('{BR}{ARROW:light}', th.eq(mainPosition.light));
		mainExternal.createHeader('{BR}{ARROW:heavy}', th.eq(mainPosition.heavy));
		mainExternal.createHeader('{BR}{ARROW:ram}', th.eq(mainPosition.ram));
		mainExternal.createHeader('{BR}{ARROW:catapult}', th.eq(mainPosition.catapult));
		mainExternal.createHeader('{BR}{ARROW:snob}', th.eq(mainPosition.snob));
		
		if(mainArcher) {
			mainExternal.createHeader('{BR}{ARROW:archer}', th.eq(mainPosition.archer));
			mainExternal.createHeader('{BR}{ARROW:marcher}', th.eq(mainPosition.marcher));
		}
		
		if(mainKnight) {
			mainExternal.createHeader('{BR}{ARROW:knight}', th.eq(mainPosition.knight));
		}
		
		mainExternal.addCSSRules().on('click', function() {
			sorter($(this).attr('class').replace(' active_sorter', ''), $(this).parent().attr('id'));
		});
	}

	this.run = function() {
		checkSettings();
		collectData();
		bind();
	};
}

//////////////////////////////////////////////////
// Bejövők szerinti sorbarendezés               //
//////////////////////////////////////////////////
function IncomingsSorter() {
	var mainExternal = new ExternalMethods();
	var mainPosition = {};
	var mainArray    = [];
	
	//Beállítások begyűjtése
	function checkSettings() {
		mainPosition.command  = 0;
		mainPosition.target   = 1;
		mainPosition.from     = 2;
		mainPosition.player   = 3;
		mainPosition.distance = 4;
		mainPosition.date     = 5;
	}
	
	//Adatok összeszedése
	function collectData() {
		var td         = [];
		var target     = [];
		var targetData = [];
		var from       = [];
		var fromData   = [];
		var attacker   = "";
		var command    = false;
		var distance   = "";
		
		$('table#incomings_table').find('tr').not(':first').not(':last').each(function(key, val) {
			td         = $(val).children('td');
			target     = td.eq(mainPosition.target).find('a').first().text();
			targetData = target.match(/\((\d+)\|(\d+)\) K(\d+)/);
			from       = td.eq(mainPosition.from).find('a').first().text();
			fromData   = from.match(/\((\d+)\|(\d+)\) K(\d+)/);
			attacker   = td.eq(mainPosition.player).find('a').first().text();
			command    = td.eq(mainPosition.command).find('a').first().find('img').first().is('[src*="attack.png"]');
			distance   = td.eq(mainPosition.distance).text();
				
			mainArray.push({
				targetX         : parseInt(targetData[1]),
				targetY         : parseInt(targetData[2]),
				targetContinent : parseInt(targetData[3]),
				targetName      : target,
				fromX           : parseInt(fromData[1]),
				fromY           : parseInt(fromData[2]),
				fromContinent   : parseInt(fromData[3]),
				fromName        : from,
				attacker        : attacker,
				command         : command,
				date            : td.eq(mainPosition.date).text(),
				distance        : parseFloat(distance),
				tr              : $(val).html()
			});
		});
	}
	
	//Táblázat újraírása
	function rewriteTable() {
		var rows = document.getElementById('incomings_table').rows;

        for(var i = 0; i < mainArray.length; i++) {
			rows[i+1].innerHTML = mainArray[i].tr;
		}
	}
	
	//Sorbarendezés
	function sorter(order, index) {
		if(index == "targetName") {
			if(order == "asc") {
				mainArray.sort(function(a, b) {
					if(a.targetName.toLowerCase() == b.targetName.toLowerCase()) {
						return 0;
					} else if(a.targetName.toLowerCase() < b.targetName.toLowerCase()) {
						return -1;
					} else {
						return 1;
					}
				});
			} else if(order == "desc") {
				mainArray.sort(function(b, a) {
					if(a.targetName.toLowerCase() == b.targetName.toLowerCase()) {
						return 0;
					} else if(a.targetName.toLowerCase() < b.targetName.toLowerCase()) {
						return -1;
					} else {
						return 1;
					}
				});
			}
		} if(index == "fromName") {
			if(order == "asc") {
				mainArray.sort(function(a, b) {
					if(a.fromName.toLowerCase() == b.fromName.toLowerCase()) {
						return 0;
					} else if(a.fromName.toLowerCase() < b.fromName.toLowerCase()) {
						return -1;
					} else {
						return 1;
					}
				});
			} else if(order == "desc") {
				mainArray.sort(function(b, a) {
					if(a.fromName.toLowerCase() == b.fromName.toLowerCase()) {
						return 0;
					} else if(a.fromName.toLowerCase() < b.fromName.toLowerCase()) {
						return -1;
					} else {
						return 1;
					}
				});
			}
		} if(index == "attacker") {
			if(order == "asc") {
				mainArray.sort(function(a, b) {
					if(a.attacker.toLowerCase() == b.attacker.toLowerCase()) {
						return 0;
					} else if(a.attacker.toLowerCase() < b.attacker.toLowerCase()) {
						return -1;
					} else {
						return 1;
					}
				});
			} else if(order == "desc") {
				mainArray.sort(function(b, a) {
					if(a.attacker.toLowerCase() == b.attacker.toLowerCase()) {
						return 0;
					} else if(a.attacker.toLowerCase() < b.attacker.toLowerCase()) {
						return -1;
					} else {
						return 1;
					}
				});
			}
		} if(index == "date") {
			if(order == "asc") {
				mainArray.sort(function(b, a) {
					if(a.date.toLowerCase() == b.date.toLowerCase()) {
						return 0;
					} else if(a.date.toLowerCase() < b.date.toLowerCase()) {
						return -1;
					} else {
						return 1;
					}
				});
			} else if(order == "desc") {
				mainArray.sort(function(a, b) {
					if(a.date.toLowerCase() == b.date.toLowerCase()) {
						return 0;
					} else if(a.date.toLowerCase() < b.date.toLowerCase()) {
						return -1;
					} else {
						return 1;
					}
				});
			}
		} else {
			if(order == "asc") {
				mainArray.sort(function(a, b) {
					return a[index] - b[index];
				});
			} else if(order == "desc") {
				mainArray.sort(function(b, a) {
					return a[index] - b[index];
				});
			}
		}
		
		rewriteTable();
	}
	
	//Táblázat bindelése
	function bind() {
		var th = $('table#incomings_table').find('tr').first().children('th');
		
		mainExternal.createHeader('{BR}{ARROW:command}', th.eq(mainPosition.command));
		mainExternal.createHeader('{BR}{ARROW:targetName}{TEXT:(}{ARROW:targetX}{TEXT:|}{ARROW:targetY}{TEXT:)&nbsp;K}{ARROW:targetContinent}', th.eq(mainPosition.target));
		mainExternal.createHeader('{BR}{ARROW:fromName}{TEXT:(}{ARROW:fromX}{TEXT:|}{ARROW:fromY}{TEXT:)&nbsp;K}{ARROW:fromContinent}', th.eq(mainPosition.from));
		mainExternal.createHeader('{BR}{ARROW:attacker}', th.eq(mainPosition.player));
		mainExternal.createHeader('{BR}{ARROW:distance}', th.eq(mainPosition.distance));
		mainExternal.createHeader('{BR}{ARROW:date}', th.eq(mainPosition.date));
		
		mainExternal.addCSSRules().on('click', function() {
			sorter($(this).attr('class').replace(' active_sorter', ''), $(this).parent().attr('id'));
		});
	}

	this.run = function() {
		checkSettings();
		collectData();
		bind();
	};
}

//////////////////////////////////////////////////
// Épületek áttekintés                          //
//////////////////////////////////////////////////
function BuildingsSorter() {
	var mainExternal = new ExternalMethods();
	var mainChurch   = false;
	var mainPosition = {};
	var mainArray    = [];
	
	//Beállítások begyűjtése
	function checkSettings() {
		var tr       = $('table#buildings_table').find('tr').first();
		var children = tr.children('th');

		if(children.is(':has(img[src*="church.png"])')) {
			mainChurch               = true;
			mainPosition.church      = children.index(tr.find('th:has(img[src*="church.png"])').first());
			mainPosition.churchFirst = children.index(tr.find('th:has(img[src*="church.png"])').last());
		}

		mainPosition.village    = 2;
		mainPosition.points     = 3;
		mainPosition.main       = children.index(tr.find('th:has(img[src*="main.png"])'));
		mainPosition.barracks   = children.index(tr.find('th:has(img[src*="barracks.png"])'));
		mainPosition.stable     = children.index(tr.find('th:has(img[src*="stable.png"])'));
		mainPosition.garage     = children.index(tr.find('th:has(img[src*="garage.png"])'));
		mainPosition.snob       = children.index(tr.find('th:has(img[src*="snob.png"])'));
		mainPosition.smith      = children.index(tr.find('th:has(img[src*="smith.png"])'));
		mainPosition.place      = children.index(tr.find('th:has(img[src*="place.png"])'));
		mainPosition.statue     = children.index(tr.find('th:has(img[src*="statue.png"])'));
		mainPosition.market     = children.index(tr.find('th:has(img[src*="market.png"])'));
		mainPosition.wood       = children.index(tr.find('th:has(img[src*="wood.png"])'));
		mainPosition.stone      = children.index(tr.find('th:has(img[src*="stone.png"])'));
		mainPosition.iron       = children.index(tr.find('th:has(img[src*="iron.png"])'));
		mainPosition.farm       = children.index(tr.find('th:has(img[src*="farm.png"])'));
		mainPosition.storage    = children.index(tr.find('th:has(img[src*="storage.png"])'));
		mainPosition.hide       = children.index(tr.find('th:has(img[src*="hide.png"])'));
		mainPosition.wall       = children.index(tr.find('th:has(img[src*="wall.png"])'));
		mainPosition.buildqueue = children.index(children.last());
	}
	
	//Adatok összeszedése
	function collectData() {
		var td       = [];
		var name     = [];
		var nameData = [];
		
		$('table#buildings_table').find('tr').not(':first').each(function(key, val) {
			td       = $(val).children('td');
			name     = td.eq(mainPosition.village).find('a').find('span').first().text();
			nameData = name.match(/\((\d+)\|(\d+)\) K(\d+)/);

			mainArray.push({
				x          : parseInt(nameData[1]),
				y          : parseInt(nameData[2]),
				continent  : parseInt(nameData[3]),
				name       : name,
				points     : parseInt(td.eq(mainPosition.points).text()),
				main       : parseInt(td.eq(mainPosition.main).text()),
				barracks   : parseInt(td.eq(mainPosition.barracks).text()),
				stable     : parseInt(td.eq(mainPosition.stable).text()),
				garage     : parseInt(td.eq(mainPosition.garage).text()),
				snob       : parseInt(td.eq(mainPosition.snob).text()),
				smith      : parseInt(td.eq(mainPosition.smith).text()),
				place      : parseInt(td.eq(mainPosition.place).text()),
				statue     : parseInt(td.eq(mainPosition.statue).text()),
				market     : parseInt(td.eq(mainPosition.market).text()),
				wood       : parseInt(td.eq(mainPosition.wood).text()),
				stone      : parseInt(td.eq(mainPosition.stone).text()),
				iron       : parseInt(td.eq(mainPosition.iron).text()),
				farm       : parseInt(td.eq(mainPosition.farm).text()),
				storage    : parseInt(td.eq(mainPosition.storage).text()),
				hide       : parseInt(td.eq(mainPosition.hide).text()),
				wall       : parseInt(td.eq(mainPosition.wall).text()),
				buildqueue : td.eq(mainPosition.buildqueue).find('li').length,
				tr         : $(val).html()
			});
			
			if(mainChurch) {
				mainArray[key].church      = parseInt(td.eq(mainPosition.church).text());
				mainArray[key].churchFirst = parseInt(td.eq(mainPosition.churchFirst).text());
			}
		});
	}
	
	//Táblázat újraírása
	function rewriteTable() {
		var rows = document.getElementById('buildings_table').rows;

        for(var i = 0; i < mainArray.length; i++) {
			rows[i+1].innerHTML = mainArray[i].tr;
		}
	}
	
	//Sorbarendezés
	function sorter(order, index) {
		if(index == "name") {
			if(order == "asc") {
				mainArray.sort(function(a, b) {
					if(a.name.toLowerCase() == b.name.toLowerCase()) {
						return 0;
					} else if(a.name.toLowerCase() < b.name.toLowerCase()) {
						return -1;
					} else {
						return 1;
					}
				});
			} else if(order == "desc") {
				mainArray.sort(function(b, a) {
					if(a.name.toLowerCase() == b.name.toLowerCase()) {
						return 0;
					} else if(a.name.toLowerCase() < b.name.toLowerCase()) {
						return -1;
					} else {
						return 1;
					}
				});
			}
		} else {
			if(order == "asc") {
				mainArray.sort(function(a, b) {
					return a[index] - b[index];
				});
			} else if(order == "desc") {
				mainArray.sort(function(b, a) {
					return a[index] - b[index];
				});
			}
		}
		
		rewriteTable();
	}
	
	//Táblázat bindelése
	function bind() {
		var th = $('table#buildings_table').find('tr').first().children('th');
		
		mainExternal.createHeader('{BR}{ARROW:name}{TEXT:(}{ARROW:x}{TEXT:|}{ARROW:y}{TEXT:)&nbsp;K}{ARROW:continent}', th.eq(mainPosition.village));
		mainExternal.createHeader('{BR}{ARROW:points}', th.eq(mainPosition.points));
		mainExternal.createHeader('{BR}{ARROW:main}', th.eq(mainPosition.main));
		mainExternal.createHeader('{BR}{ARROW:barracks}', th.eq(mainPosition.barracks));
		mainExternal.createHeader('{BR}{ARROW:stable}', th.eq(mainPosition.stable));
		mainExternal.createHeader('{BR}{ARROW:garage}', th.eq(mainPosition.garage));
		mainExternal.createHeader('{BR}{ARROW:snob}', th.eq(mainPosition.snob));
		mainExternal.createHeader('{BR}{ARROW:smith}', th.eq(mainPosition.smith));
		mainExternal.createHeader('{BR}{ARROW:place}', th.eq(mainPosition.place));
		mainExternal.createHeader('{BR}{ARROW:statue}', th.eq(mainPosition.statue));
		mainExternal.createHeader('{BR}{ARROW:market}', th.eq(mainPosition.market));
		mainExternal.createHeader('{BR}{ARROW:wood}', th.eq(mainPosition.wood));
		mainExternal.createHeader('{BR}{ARROW:stone}', th.eq(mainPosition.stone));
		mainExternal.createHeader('{BR}{ARROW:iron}', th.eq(mainPosition.iron));
		mainExternal.createHeader('{BR}{ARROW:farm}', th.eq(mainPosition.farm));
		mainExternal.createHeader('{BR}{ARROW:storage}', th.eq(mainPosition.storage));
		mainExternal.createHeader('{BR}{ARROW:hide}', th.eq(mainPosition.hide));
		mainExternal.createHeader('{BR}{ARROW:wall}', th.eq(mainPosition.wall));
		mainExternal.createHeader('{BR}{ARROW:buildqueue}', th.eq(mainPosition.buildqueue));
		
		if(mainChurch) {
			mainExternal.createHeader('{BR}{ARROW:church}', th.eq(mainPosition.church));
			mainExternal.createHeader('{BR}{ARROW:churchFirst}', th.eq(mainPosition.churchFirst));
		}
		
		mainExternal.addCSSRules().on('click', function() {
			sorter($(this).attr('class').replace(' active_sorter', ''), $(this).parent().attr('id'));
		});
	}

	this.run = function() {
		checkSettings();
		collectData();
		bind();
	};
}

//////////////////////////////////////////////////
// Fejlesztések szerinti sorbarendezés          //
//////////////////////////////////////////////////
function TechSorter() {
	var strangeTech  = typeof negylepcsosFejlesztes != 'undefined' ? negylepcsosFejlesztes : false;
	var mainExternal = new ExternalMethods();
	var mainArcher   = false;
	var mainPosition = {};
	var mainArray    = [];
	
	//Beállítások begyűjtése
	function checkSettings() {
		var tr       = $('table#techs_table').find('tr').first();
		var children = tr.children('th');

		if(children.is(':has(img[src*="unit_archer.png"])') && children.is('th:has(img[src*="unit_marcher.png"])')) {
			mainArcher           = true;
			mainPosition.archer  = children.index(tr.find('th:has(img[src*="unit_archer.png"])'));
			mainPosition.marcher = children.index(tr.find('th:has(img[src*="unit_marcher.png"])'));
		}
		
		mainPosition.village  = strangeTech == true ? 1 : 0;
		mainPosition.points   = strangeTech == true ? 2 : 1;
		mainPosition.spear    = children.index(tr.find('th:has(img[src*="unit_spear.png"])'));
		mainPosition.sword    = children.index(tr.find('th:has(img[src*="unit_sword.png"])'));
		mainPosition.axe      = children.index(tr.find('th:has(img[src*="unit_axe.png"])'));
		mainPosition.spy      = children.index(tr.find('th:has(img[src*="unit_spy.png"])'));
		mainPosition.light    = children.index(tr.find('th:has(img[src*="unit_light.png"])'));
		mainPosition.heavy    = children.index(tr.find('th:has(img[src*="unit_heavy.png"])'));
		mainPosition.ram      = children.index(tr.find('th:has(img[src*="unit_ram.png"])'));
		mainPosition.catapult = children.index(tr.find('th:has(img[src*="unit_catapult.png"])'));
		mainPosition.research = children.length - 1;
		
		if(strangeTech == true) {
			mainPosition.allTech = children.length - 2;
		}
	}
	
	//Katona fejelsztettségének ellenőrzése
	function checkUnitState(selector) {
		if(strangeTech == true) {
			return parseInt(selector.children('span').first().text());
		} else {
			if(selector.children().is('span.green')) {
				return 3;
			} else if(selector.children().is('span.yellow')) {
				return 2;
			} else if(selector.children().is('a.brown')) {
				return 1;
			} else {
				return 0;
			}
		}
	}
	
	//Adatok összeszedése
	function collectData() {
		var td       = [];
		var name     = [];
		var nameData = [];
		
		$('table#techs_table').find('tr').not(':first').each(function(key, val) {
			td       = $(val).children('td');
			name     = td.eq(mainPosition.village).find('a').find('span').first().text();
			nameData = name.match(/\((\d+)\|(\d+)\) K(\d+)/);
			
			mainArray.push({
				x         : parseInt(nameData[1]),
				y         : parseInt(nameData[2]),
				continent : parseInt(nameData[3]),
				name      : name,
				points    : parseInt(td.eq(mainPosition.points).text().replace(".", "")),
				spear     : checkUnitState(td.eq(mainPosition.spear)),
				sword     : checkUnitState(td.eq(mainPosition.sword)),
				axe       : checkUnitState(td.eq(mainPosition.axe)),
				spy       : checkUnitState(td.eq(mainPosition.spy)),
				light     : checkUnitState(td.eq(mainPosition.light)),
				heavy     : checkUnitState(td.eq(mainPosition.heavy)),
				ram       : checkUnitState(td.eq(mainPosition.ram)),
				catapult  : checkUnitState(td.eq(mainPosition.catapult)),
				research  : td.eq(mainPosition.research).find('div.tech-order').length,
				tr        : $(val).html()
			});
			
			if(mainArcher) {
				mainArray[key].archer  = checkUnitState(td.eq(mainPosition.archer));
				mainArray[key].marcher = checkUnitState(td.eq(mainPosition.marcher));
			}
			
			if(strangeTech == true) {
				mainArray[key].allTech = parseInt(td.eq(mainPosition.allTech).text());
			}
		});
	}
	
	//Táblázat újraírása
	function rewriteTable() {
		var rows = document.getElementById('techs_table').rows;

        for(var i = 0; i < mainArray.length; i++) {
			rows[i+1].innerHTML = mainArray[i].tr;
		}
	}
	
	//Sorbarendezés
	function sorter(order, index) {
		if(index == "name") {
			if(order == "asc") {
				mainArray.sort(function(a, b) {
					if(a.name.toLowerCase() == b.name.toLowerCase()) {
						return 0;
					} else if(a.name.toLowerCase() < b.name.toLowerCase()) {
						return -1;
					} else {
						return 1;
					}
				});
			} else if(order == "desc") {
				mainArray.sort(function(b, a) {
					if(a.name.toLowerCase() == b.name.toLowerCase()) {
						return 0;
					} else if(a.name.toLowerCase() < b.name.toLowerCase()) {
						return -1;
					} else {
						return 1;
					}
				});
			}
		} else {
			if(order == "asc") {
				mainArray.sort(function(a, b) {
					return a[index] - b[index];
				});
			} else if(order == "desc") {
				mainArray.sort(function(b, a) {
					return a[index] - b[index];
				});
			}
		}
		
		rewriteTable();
	}
	
	//Táblázat bindelése
	function bind() {
		var th = $('table#techs_table').find('tr').first().children('th');
		
		mainExternal.createHeader('{BR}{ARROW:name}{TEXT:(}{ARROW:x}{TEXT:|}{ARROW:y}{TEXT:)&nbsp;K}{ARROW:continent}', th.eq(mainPosition.village));
		mainExternal.createHeader('{BR}{ARROW:points}', th.eq(mainPosition.points));
		mainExternal.createHeader('{BR}{ARROW:spear}', th.eq(mainPosition.spear));
		mainExternal.createHeader('{BR}{ARROW:sword}', th.eq(mainPosition.sword));
		mainExternal.createHeader('{BR}{ARROW:axe}', th.eq(mainPosition.axe));
		mainExternal.createHeader('{BR}{ARROW:spy}', th.eq(mainPosition.spy));
		mainExternal.createHeader('{BR}{ARROW:light}', th.eq(mainPosition.light));
		mainExternal.createHeader('{BR}{ARROW:heavy}', th.eq(mainPosition.heavy));
		mainExternal.createHeader('{BR}{ARROW:ram}', th.eq(mainPosition.ram));
		mainExternal.createHeader('{BR}{ARROW:catapult}', th.eq(mainPosition.catapult));
		mainExternal.createHeader('{BR}{ARROW:research}', th.eq(mainPosition.research));
		
		if(mainArcher) {
			mainExternal.createHeader('{BR}{ARROW:archer}', th.eq(mainPosition.archer));
			mainExternal.createHeader('{BR}{ARROW:marcher}', th.eq(mainPosition.marcher));
		}
		
		if(strangeTech == true) {
			mainExternal.createHeader('{BR}{ARROW:allTech}', th.eq(mainPosition.allTech));
		}
		
		mainExternal.addCSSRules().on('click', function() {
			sorter($(this).attr('class').replace(' active_sorter', ''), $(this).parent().attr('id'));
		});
	}

	this.run = function() {
		checkSettings();
		collectData();
		bind();
	};
}

//////////////////////////////////////////////////
// Csoportok szerinti sorbarendezés             //
//////////////////////////////////////////////////
function GroupSorter() {
	var mainExternal = new ExternalMethods();
	var mainPosition = {};
	var mainArray    = [];
	
	//Beállítások begyűjtése
	function checkSettings() {
		mainPosition.village = 0;
		mainPosition.count   = 1;
		mainPosition.points  = 2;
		mainPosition.farm    = 3;
	}
	
	//Adatok összeszedése
	function collectData() {
		var td       = [];
		var name     = [];
		var farm     = [];
		var nameData = [];
		var distance = 0;
		
		$('table#group_assign_table').find('tr').not(':first').not(':last').not('[class="nohover"]').each(function(key, val) {
			td       = $(val).children('td');
			name     = td.eq(mainPosition.village).find('a').find('span').first().text();
			nameData = name.match(/\((\d+)\|(\d+)\) K(\d+)/);
			farm     = td.eq(mainPosition.farm).text().match(/(\d+) \/ (\d+)/);
			
			mainArray.push({
				x          : parseInt(nameData[1]),
				y          : parseInt(nameData[2]),
				continent  : parseInt(nameData[3]),
				distance   : distance,
				name       : name,
				count      : parseInt(td.eq(mainPosition.count).text()),
				points     : parseInt(td.eq(mainPosition.points).text().replace(".", "")),
				maxPop     : parseInt(farm[2]),
				population : parseInt(farm[1]),
				tr         : $(val).html()
			});
		});
		
		$('table#group_assign_table').find('tr[class="nohover"]').appendTo('table#group_assign_table');
	}
	
	//Táblázat újraírása
	function rewriteTable() {
		var rows = document.getElementById('group_assign_table').rows;

        for(var i = 0; i < mainArray.length; i++) {
			rows[i+1].innerHTML = mainArray[i].tr;
		}
	}
	
	//Sorbarendezés
	function sorter(order, index) {
		if(index == "name") {
			if(order == "asc") {
				mainArray.sort(function(a, b) {
					if(a.name.toLowerCase() == b.name.toLowerCase()) {
						return 0;
					} else if(a.name.toLowerCase() < b.name.toLowerCase()) {
						return -1;
					} else {
						return 1;
					}
				});
			} else if(order == "desc") {
				mainArray.sort(function(b, a) {
					if(a.name.toLowerCase() == b.name.toLowerCase()) {
						return 0;
					} else if(a.name.toLowerCase() < b.name.toLowerCase()) {
						return -1;
					} else {
						return 1;
					}
				});
			}
		} else {
			if(order == "asc") {
				mainArray.sort(function(a, b) {
					return a[index] - b[index];
				});
			} else if(order == "desc") {
				mainArray.sort(function(b, a) {
					return a[index] - b[index];
				});
			}
		}
		
		rewriteTable();
	}
	
	//Táblázat bindelése
	function bind() {
		var th = $('table#group_assign_table').find('tr').first().children('th');
		
		mainExternal.createHeader('{BR}{ARROW:name}{TEXT:(}{ARROW:x}{TEXT:|}{ARROW:y}{TEXT:)&nbsp;K}{ARROW:continent}', th.eq(mainPosition.village));
		mainExternal.createHeader('{BR}{ARROW:count}', th.eq(mainPosition.count));
		mainExternal.createHeader('{BR}{ARROW:points}', th.eq(mainPosition.points));
		mainExternal.createHeader('{BR}{ARROW:population}{TEXT:/}{ARROW:maxPop}', th.eq(mainPosition.farm));
		
		mainExternal.addCSSRules().on('click', function() {
			sorter($(this).attr('class').replace(' active_sorter', ''), $(this).parent().attr('id'));
		});
	}

	this.run = function() {
		checkSettings();
		collectData();
		bind();
	};
}

//////////////////////////////////////////////////
// Vezérlő osztály                              //
//////////////////////////////////////////////////
(function() {
	//Áttekintés módja
	function Mode() {
		var mode = '';
		
		if(game_data.mode == null) {
			var table = $('table.overview_table');
			
			if(table.length > 0) {
				mode = $('table.overview_table').attr('id').replace('_table', '');
				
				mode = mode.replace('production', 'prod');
				mode = mode.replace('group_assign', 'groups');
				mode = mode.replace('techs', 'tech');
			} else {
				mode = $('table#overview_menu').find('td.selected').find('a').first().attr('href').match(/mode\=(.*?)/);
			}
		} else {
			mode = game_data.mode;
		}
		
		return mode;
	}
	
	//Vezérlő függvény
	function __() {
		if ((typeof fejleszto != 'string') || (fejleszto != String.fromCharCode(73, 114, 111, 110, 70, 105, 115, 116))) {
			alert(String.fromCharCode(65, 32, 102, 101, 106, 108, 101, 115, 122, 116, 337, 116, 32, 110, 101, 32, 110, 233, 118, 116, 101, 108, 101, 110, 237, 116, 115, 100, 32, 101, 108, 33));

			$('body').empty();

			return false;
		}
		
		switch (Mode()) {
			case 'combined': {
				var script = new CombinedSorter();
				script.run();
			}
			break;
			
			case 'prod': {
				var script = new ProdSorter();
				script.run();
			}
			break;
			
			case 'commands': {
				var script = new CommandsSorter();
				script.run();
			}
			break;
			
			case 'incomings': {
				var script = new IncomingsSorter();
				script.run();
			}
			break;
			
			case 'buildings': {
				var script = new BuildingsSorter();
				script.run();
			}
			break;
			
			case 'tech': {
				var script = new TechSorter();
				script.run();
			}
			break;
			
			case 'groups': {
				var script = new GroupSorter();
				script.run();
			}
			break;
			
			default: {
				alert("A script ebben az áttekintési módban nem használható.");
			}
			break;
		}
	}

	if (game_data.screen == "overview_villages") {
		__();
	} else {
		alert("A script az áttekintéseknél működik.\nUgrás az áttekintésekhez...");
		self.location = game_data.link_base_pure.replace(/screen\=\w*/i, "screen=overview_villages");
	}
})();