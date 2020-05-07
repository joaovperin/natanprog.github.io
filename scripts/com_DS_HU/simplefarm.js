$(function() {
	/*
	 * Ötletek a jövőre:
		* falu hovernél az időt mutassa, ami a jelenleg kiválasztott templatből számol []
		* lehessen megadni időintervallumot, ami alapján ki lehet emelni falukat []
	*/
	// Csak a térkép oldalon működik
	if(typeof TWMap === 'undefined') {
		UI.InfoMessage('Ez a script csak a térképnél használható. Hamarosan továbbítva leszel...', 1000, 'error', $('body'));	
		setTimeout(function() {
			var win = window.frames.length > 0 ? window.main : window;
			self.location = win.game_data.link_base_pure.replace(/screen\=\w*/i, "screen=map");
		}, 1000);
		return;		
	}
	// Csak egyszer legyen bekapcsolva
	if(typeof TWMapFarm !== 'undefined') {
		return;
	}
	TWMapFarm = true;

	var options = {
		// Melyik gomb nyomásának feleljen meg a térképen való kattintás
		mode : $.cookie('mapfarm.mode') || 'a',
		// Többi játékos falvainak elrejtése
		hideOtherPlayers : true
	};

	// Felül lehessen írni a beállításokat egyedien minden játékosnál
	if(typeof beallitasok !== 'undefined') {
		$.extend(options, beallitasok);
	}

	// Néhány css..
	$('<style type="text/css">' +
		'.autoHideBox { top: auto; bottom: 10px } ' + // Értesítés jelző ne a térkép közepén jelenjen meg
		'.farm_icon_a.active { background-position: -264px -24px } ' + // Aktív állapot a templateknek
		'.farm_icon_b.active { background-position: -288px -24px }' +
	'</style>').appendTo($('head'));

	var credit = $('<div style="text-align: right; margin-bottom: 10px;">' +
		'Készítette: wantoo, Verzió: 1.03, ' +
		'<a class="btn" href="https://docs.google.com/forms/d/1d8SZL-4xyKasjzeMFJKd2shzdbQBRIoKTX-Q-fkSlI0/viewform?usp=send_form" target="_blank">Ötletláda</a>' +
	'</div>').insertBefore('#minimap_whole');

	var table = $('<table class="vis" style="margin: 0 0 10px; width: 100%;">' +
		'<tr>' +
			'<th colspan="3">' +
				'Beállítások' +
			'</th>' +
		'</tr>' +
		'<tr>' +
			'<td rowspan="2">' +
				'Sablonok' +
			'</td>' +
			'<td>' +
				'<a class="farm_icon farm_icon_a" data-mode="a" style="display: inline-block; margin: 5px"></a>' +
			'</td>' +
			'<td id="a_tpl"></td>' +
		'</tr>' +
		'<tr>' +
			'<td>' +
				'<a class="farm_icon farm_icon_b" data-mode="b" style="display: inline-block; margin: 5px"></a>' +
			'</td>' +
			'<td id="b_tpl"></td>' +
		'</tr>' +
		'<tr>' +
			'<td colspan="3"><label><input type="checkbox" id="hideOtherPlayers"> Többi játékos falvainak elrejtése</label></td>' +
		'</tr>' +
	'</table>').insertBefore('#minimap_whole');

	// Templatek beillesztése a táblázatba
	$('#a_tpl').html($('#mp_farm_a').data('tooltip-tpl'));
	$('#b_tpl').html($('#mp_farm_b').data('tooltip-tpl'));

	// Aktív template kijelölése
	table.find('.farm_icon_' + options.mode.toLowerCase()).addClass('active');

	// Template váltás
	table.find('a[class^="farm_icon"]').on('click', function() {
		table.find('a[class^="farm_icon"]').removeClass('active');
		$(this).addClass('active');
		options.mode = $(this).data('mode');
		$.cookie('mapfarm.mode', options.mode, {expires : 7});
	});

	// Többi játékos falvainak elrejtése
	$('#hideOtherPlayers')
		.prop('checked', options.hideOtherPlayers)
		.on('change', function() {
			options.hideOtherPlayers = $(this).is(':checked');
			
			if(options.hideOtherPlayers) {
				hideOtherPlayers();
			}
			else {
				TWMap.reload();
			}
		});

	// Faluban lévő egységek megjelenítése
	var unitsTable = $('<table class="vis" style="margin: 0 10px 10px 0; float: right;">');

	$.get('game.php', {
                village : game_data.village.id,
                ajax : 'map_info',
                source : game_data.village.id,
                screen : 'overview'
	}).success(function(response) {
		var imagesRow = $('<tr>').appendTo(unitsTable);
		var unitsRow = $('<tr>').appendTo(unitsTable);

		$.each(response[0].units, function(index, value) {
			var image = $('<img>')
				.attr('src', image_base + value.image);

			$('<th>')
				.append(image)
				.appendTo(imagesRow);

			$('<td>')
				.attr('id', 'unit_' + index)
				.text(value.count.home)
				.appendTo(unitsRow);
		});

		unitsTable.insertBefore($('#map_whole'));
	});

	TWMap.mapHandler.onClick = function(x,y,e) {
		e.preventDefault();

		var village = TWMap.villages[x * 1000 + y];

		// Csak barbár falura lehet küldeni
		if(village.owner !== '0') {
			UI.InfoMessage('A farmkezelő csak barbár falukon használható', 1000, 'error', $('body'));
			return;
		}

		// URL előállítása, amit majd meg kell hívni
		var url = TWMap.urls.ctx['mp_farm_' + options.mode]
			.replace('__village__', village.id)
			.replace('__source__', game_data.village.id);
		
		// Farmoló gomb
		var uniqId = Date.now();
		var button = $('<a>')
			.attr('id', uniqId)
			.appendTo($('body'));

		// Regisztrálás, hogy ha a gombot megnyomják, akkor az URL meghívódjon
		TWMap.context.ajaxRegister(uniqId, url);
		
		// Gombon kattintás, majd eltávolítás, mert már nem kell
		button
			.trigger('click')
			.remove();

		// Térképen ebben az esetben nem jelenne meg a támadás ikon, így manuálisan odatesszük
		// A térkép újrarajozlása villogást okoz, így odatesszük a képet
		var villageImg = $('#map_village_' + village.id);
		var cmdImg = $('<img>')
			.attr('src', image_base + 'map/attack.png')
			.css({
				width : '14px',
				height : '14px',
				'margin-left' : '34px',
				position : 'absolute',
				'z-index' : 4,
				left : villageImg.css('left'),
				top : villageImg.css('top')
			})
			.insertBefore(villageImg);
	
		// Betesszük a parancsikonok közé, ha mozgatja a térképet és visszajön, akkor így már ott lesz
		TWMap.commandIcons[village.id] = [{img : 'attack'}];
	};

	var hideOtherPlayers = function() {
		var minX = (TWMap.pos[0] - 30) * 1000;
		var maxX = (TWMap.pos[0] + 30) * 1000;

		$.each(TWMap.villages, function(id, village) {			
			if(id > minX && id < maxX && village.owner !== '0' && village.owner !== game_data.player.id) {
				$('#map_village_' + village.id + ', #map_icons_' + village.id).hide();
			}
		});		
	};

	var originalOnMove = TWMap.mapHandler.onMove;
	TWMap.mapHandler.onMove = function(x, y) {
		if(options.hideOtherPlayers) {
			hideOtherPlayers();
		}

		originalOnMove.apply(this, [x, y]);
	};
	if(options.hideOtherPlayers) {
		hideOtherPlayers();
	}
	

	// Egységek táblázat frissítése támadás elküldése után
	var originalAjaxDone = TWMap.context.ajaxDone;
	TWMap.context.ajaxDone = function(key, data) {
		$.each(data.current_units, function(index, value) {
			$('#unit_' + index).text(value);
		});

		originalAjaxDone.apply(this, [key, data]);
	};
});
