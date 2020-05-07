var settings = {
	showPoints: true,
	showVillages: true,
	showODA: true,
	showODD: true,
	width: '180px',
	height: '96px'
};

(function (config) {
	var win = (window.main || self);

	var script = {
		name: 'Ranking With TWStats Script',
		version: 1.01,
		minGameVersion: 7.00,
		author: {
			name: 'dalesmckay',
			email: 'dalesmckay@gmail.com'
		},
		credit: '(based on a concept by an unKnown author)',
		runOnce: true,
		modernized: 'IronFist',
		fixed: 'IronFist'
	};

	function callBack() {
		$('.' + this.value).toggle('fast');
	}

	function fnInjectStatGraphs() {
		var url = ('http://%%MARKETtwstats.com/').replace(/\%\%MARKET/ig,
			(win.game_data.market == 'en') ? '' : (win.game_data.market + '.')) + win.game_data.world + '/image.php';
		var template = '%%POINTS%%VILLAGES%%ODA%%ODD';
		var cellTemplate = '<td class="dsm%%MODE%%VISIBLE"><img src="%%URL?type=%%TYPEgraph&graph=%%MODE&%%ID" style="width:%%WIDTH;height:%%HEIGHT;"></img></td>';
		var mode = (win.location.href.match(/mode\=(\w+)/i) || [null, 'player'])[1];
		var table = $('#' + mode.replace(/awards/i, 'award') + '_ranking_table' + (mode.match(/kill\_/i) ? '~table:eq(0)' : ''));
		var srcHTML;

		if (table.length <= 0) {
			table = $('table[class*="vis"]:has(td a[href*="info_player"])');
		}
		if (table.length <= 0) {
			return;
		}

		// Inject the Checkboxes	
		srcHTML = '<div id="dsmStats"><input id="cbPoints" type="checkbox" value="dsmpoints"' + (config.showPoints ? ' checked' : '') + '/><label for="cbPoints">Pont statisztika</label><input id="cbVillages" type="checkbox" value="dsmvillages"' + (config.showVillages ? ' checked' : '') + '/><label for="cbVillages">Falu statisztika</label><input id="cbODA" type="checkbox" value="dsmoda"' + (config.showODA ? ' checked' : '') + '/><label for="cbODA">LET Statisztika</label><input id="cbODD" type="checkbox" value="dsmodd"' + (config.showODD ? ' checked' : '') + '/><label for="cbODD">LEV Statisztika</label></div>';

		$(srcHTML).insertBefore(table);
		$('#cbPoints').click(callBack);
		$('#cbVillages').click(callBack);
		$('#cbODA').click(callBack);
		$('#cbODD').click(callBack);

		// Inject the Column Headers
		srcHTML = template
			.replace(/\%\%POINTS/ig, '<th class="dsmpoints"%%VISIBLE>Pont statisztika</th>').replace(/\%\%VISIBLE/ig, config.showPoints ? '' : ' style="display:none;"')
			.replace(/\%\%VILLAGES/ig, '<th class="dsmvillages"%%VISIBLE>Falu Statisztika</th>').replace(/\%\%VISIBLE/ig, config.showVillages ? '' : ' style="display:none;"')
			.replace(/\%\%ODA/ig, '<th class="dsmoda"%%VISIBLE>LET Statisztika</th>').replace(/\%\%VISIBLE/ig, config.showODA ? '' : ' style="display:none;"')
			.replace(/\%\%ODD/ig, '<th class="dsmodd"%%VISIBLE>LEV Statisztika</th>').replace(/\%\%VISIBLE/ig, config.showODD ? '' : ' style="display:none;"')
		;
		var hdr = table.find('tr:eq(0)');
		hdr.html(hdr.html() + srcHTML);

		// Inject the Cells.
		srcHTML = template
			.replace(/\%\%POINTS/ig, config.showPoints ? cellTemplate.replace(/\%\%MODE/ig, 'points') : '').replace(/\%\%VISIBLE/ig, config.showPoints ? '' : ' style="display:none;"')
			.replace(/\%\%VILLAGES/ig, config.showVillages ? cellTemplate.replace(/\%\%MODE/ig, 'villages') : '').replace(/\%\%VISIBLE/ig, config.showVillages ? '' : ' style="display:none;"')
			.replace(/\%\%ODA/ig, config.showODA ? cellTemplate.replace(/\%\%MODE/ig, 'oda') : '').replace(/\%\%VISIBLE/ig, config.showODA ? '' : ' style="display:none;"')
			.replace(/\%\%ODD/ig, config.showODD ? cellTemplate.replace(/\%\%MODE/ig, 'odd') : '').replace(/\%\%VISIBLE/ig, config.showODD ? '' : ' style="display:none;"')
			.replace(/\%\%URL/ig, url)
			.replace(/\%\%TYPE/ig, mode.match(/ally/i) ? 'tribe' : 'player')
			.replace(/\%\%WIDTH/ig, config.width)
			.replace(/\%\%HEIGHT/ig, config.height)
		;

		var id;
		table.find('tr:has(td a[href*="info_"])').each(function (i, e) {
			id = ($(e).find('a:eq(0)').attr('href') || '').match(/id\=\d*/i);
			e.innerHTML += srcHTML.replace(/\%\%ID/ig, id);
		});
	}

	function __() {
		if ($('#dsmStats').length > 0) {
			return;
		}

		var url = win.location.href;

		if ((url.match(/screen\=ally/i) && url.match(/mode\=members/i)) || (['ranking', 'info_member'].indexOf(win.game_data.screen) >= 0)) {
			fnInjectStatGraphs(config);
		}
		else if (confirm('Ez a script a következőknél működik:\n\t* Ranglista\n\t* Klán/Tagok\n\nUgrás a Ranglistához...')) {
			if (url.match(/screen\=ally/i)) {
				win.location = win.game_data.link_base_pure.replace(/screen\=\w*/i, 'screen=ally&mode=members');
			}
			else {
				win.location = win.game_data.link_base_pure.replace(/screen\=\w*/i, 'screen=ranking');
			}
		}
	}

	__();
})(settings);