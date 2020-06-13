/*
 * Script Name: Barbs Finder
 * Version: v1.2.1
 * Last Updated: 2020-06-09
 * Author: RedAlert
 * Author URL: https://twscripts.ga/
 * Author Contact: RedAlert#9859 (Discord)
 * Approved: t13981993
 * Approved Date: 2020-05-27
 * Mod: JawJaw
 */

var scriptData = {
	name: 'Barbs Finder',
	version: 'v1.2.1',
	author: 'RedAlert',
	authorUrl: 'https://twscripts.ga/',
	helpLink:
		'https://forum.tribalwars.net/index.php?threads/barb-finder-with-filtering.285289/',
};

// User Input
if (typeof DEBUG !== 'boolean') DEBUG = false;

// CONSTANTS
var VILLAGE_TIME = 'mapVillageTime'; // localStorage key name
var VILLAGES_LIST = 'mapVillagesList'; // localStorage key name
var TIME_INTERVAL = 60 * 60 * 1000; // fetch data every hour

// Globals
var villages = [];
var barbarians = [];

// Translations
var translations = {
	en_DK: {
		'Barbs Finder': 'Barbs Finder',
		'Min Points:': 'Min Points:',
		'Max Points:': 'Max Points:',
		'Radius:': 'Radius:',
		'Barbs found:': 'Barbs found:',
		'Coordinates:': 'Coordinates:',
		'Error while fetching "village.txt"!':
			'Error while fetching "village.txt"!',
		Coords: 'Coords',
		Points: 'Points',
		'Dist.': 'Dist.',
		Attack: 'Attack',
		Filter: 'Filter',
		Reset: 'Reset',
		'No barbarian villages found!': 'No barbarian villages found!',
		'Current Village:': 'Current Village:',
		Help: 'Help',
	},
	en_US: {
		'Barbs Finder': 'Barbs Finder',
		'Min Points:': 'Min Points:',
		'Max Points:': 'Max Points:',
		'Radius:': 'Radius:',
		'Barbs found:': 'Barbs found:',
		'Coordinates:': 'Coordinates:',
		'Error while fetching "village.txt"!':
			'Error while fetching "village.txt"!',
		Coords: 'Coords',
		Points: 'Points',
		'Dist.': 'Dist.',
		Attack: 'Attack',
		Filter: 'Filter',
		Reset: 'Reset',
		'No barbarian villages found!': 'No barbarian villages found!',
		'Current Village:': 'Current Village:',
		Help: 'Help',
	},
};

// Init Debug
initDebug();

// Auto-update localStorage villages list
if (localStorage.getItem(TIME_INTERVAL) != null) {
	var mapVillageTime = parseInt(localStorage.getItem(VILLAGE_TIME));
	if (Date.parse(new Date()) >= mapVillageTime + TIME_INTERVAL) {
		// hour has passed, refetch village.txt
		fetchVillagesData();
	} else {
		// hour has not passed, work with village list from localStorage
		var data = localStorage.getItem(VILLAGES_LIST);
		villages = CSVToArray(data);
		init();
	}
} else {
	// Fetch village.txt
	fetchVillagesData();
}

// Fetch 'village.txt' file
function fetchVillagesData() {
	$.get('map/village.txt', function (data) {
		villages = CSVToArray(data);
		localStorage.setItem(TIME_INTERVAL, Date.parse(new Date()));
		localStorage.setItem(VILLAGES_LIST, data);
	})
		.done(function () {
			init();
		})
		.fail(function (error) {
			console.error(`${scriptInfo()} Error:`, error);
			UI.ErrorMessage(
				`${tt('Error while fetching "village.txt"!')}`,
				4000
			);
		});
}

// Initialize Script
function init() {
	// Filter out only Barbarian villages
	findBarbarianVillages();
	// Show popup
	var content = `
		<div class="ra-mb15">
			<strong>${tt('Current Village:')}</strong>
			<a href="/game.php?screen=info_village&id=${
				game_data.village.id
			}" target="_blank" rel="noopener noreferrer">
				${game_data.village.name}
			</a>
		</div>
		<div class="ra-flex ra-mb10">
			<div class="ra-flex-4">
				<label for="minPoints" class="ra-fw600"">${tt('Min Points:')}</label>
				<input type="text" id="minPoints" class="ra-form-control" value="26">
			</div>
			<div class="ra-flex-4">
				<label for="maxPoints" class="ra-fw600"">${tt('Max Points:')}</label>
				<input type="text" id="maxPoints" class="ra-form-control" value="12154">
			</div>
			<div class="ra-flex-4">
				<label for="radius" class="ra-fw600">${tt('Radius:')}</label>
				<select id="radius_choser" class="ra-form-control">
					<option value="10">10</option>
					<option value="20">20</option>
					<option value="30">30</option>
					<option value="40">40</option>
					<option value="50" selected>50</option>
					<option value="60">60</option>
					<option value="70">70</option>
					<option value="80">80</option>
					<option value="90">90</option>
					<option value="100">100</option>
					<option value="110">110</option>
					<option value="120">120</option>
					<option value="130">130</option>
					<option value="140">140</option>
					<option value="150">150</option>
				</select>
			</div>
		</div>
		<a href="javascript:void(0);" onClick="filterBarbs();" class="btn btn-confirm-yes">
			${tt('Filter')}
		</a>
		<a href="javascript:void(0);" onClick="resetFilters();" class="btn btn-confirm-no">
			${tt('Reset')}
		</a>
		<p class="ra-fs12">
			<strong>${tt('Barbs found:')}</strong>
			<span id="barbsCount">0</span>
		</p>
		<div class="ra-mb10">
			<label class="ra-fw600" for="barbCoordsList">${tt('Coordinates:')}</label>
			<textarea id="barbCoordsList" class="ra-textarea" readonly></textarea>
		</div>
		<div id="barbariansTable" style="display:none;max-height:300px;overflow-y:auto;margin-bottom:8px;"></div>
		<div id="noBarbariansFound" style="display:none;">
			<p><strong>${tt('No barbarian villages found!')}</strong>
		</div>
	`;

	const popupContent = preparePopupContent(content);
	Dialog.show('content', popupContent);
}

// Populate villages list
function findBarbarianVillages() {
	villages.forEach((village) => {
		if (village[4] == '0' && village[6] == '0') {
			barbarians.push(village);
		}
	});

	if (DEBUG) {
		console.debug(`${scriptInfo()} Barbarian Villages:`, barbarians);
	}
}

// Filter Barbarians
function filterBarbs() {
	var minPoints = parseInt($('#minPoints').val().trim());
	var maxPoints = parseInt($('#maxPoints').val().trim());
	var radius = parseInt($('#radius_choser').val());

	if (DEBUG) {
		console.debug(`${scriptInfo()} Minimum Points:`, minPoints);
		console.debug(`${scriptInfo()} Maximum Points:`, maxPoints);
	}

	// Filter by min and max points
	const filteredBarbs = barbarians.filter((barbarian) => {
		return barbarian[5] >= minPoints && barbarian[5] <= maxPoints;
	});

	// Filter by radius
	const filteredByRadiusBarbs = filteredBarbs.filter((barbarian) => {
		var distance = calcDistanceFromCurrentVillage(barbarian);
		if (distance <= radius) {
			return barbarian;
		}
	});

	updateUI(filteredByRadiusBarbs);
}

// Reset Filters
function resetFilters() {
	$('#minPoints').val(26);
	$('#maxPoints').val(12154);
	$('#radius_choser').val('20');
	$('#barbsCount').text('0');
	$('#barbCoordsList').text('');
	$('#barbariansTable').hide();
	$('#barbariansTable').html('');
}

// Update UI
function updateUI(barbs) {
	if (barbs.length > 0) {
		var barbariansCoordsArray = getVillageCoord(barbs);
		var barbariansCount = barbariansCoordsArray.length;

		var barbariansCoordsList = barbariansCoordsArray.join(' ');

		var tableContent = generateBarbariansTable(barbs);

		$('#barbsCount').text(barbariansCount);
		$('#barbCoordsList').text(barbariansCoordsList);
		$('#barbariansTable').show();
		$('#barbariansTable').html(tableContent);
	} else {
		resetFilters();
		$('#noBarbariansFound').fadeIn(200);
		setTimeout(function () {
			$('#noBarbariansFound').fadeOut(200);
		}, 4000);
	}
}

// Generate Table
function generateBarbariansTable(barbs) {
	if (barbs.length < 1) return;

	var barbariansWithDistance = [];

	barbs.forEach((barb) => {
		var distance = calcDistanceFromCurrentVillage(barb);
		barbariansWithDistance.push([...barb, distance]);
	});

	barbariansWithDistance.sort((a, b) => {
		return a[7] - b[7];
	});

	var tableRows = generateTableRows(barbariansWithDistance);

	var tableContent = `
		<table class="vis overview_table ra-table" width="100%">
			<thead>
				<tr>
					<th>
						#
					</th>
					<th>
						K
					</th>
					<th>
						${tt('Coords')}
					</th>
					<th>
						${tt('Points')}
					</td>
					<th>
						${tt('Dist.')}
					</th>
					<th>
						${tt('Attack')}
					</th>
				</tr>
			</thead>
			<tbody>
				${tableRows}
			</tbody>
		</table>
	`;

	return tableContent;
}

// Generate Table Rows
function generateTableRows(barbs) {
	var renderTableRows = '';

	barbs.forEach((barb, index) => {
		index++;
		var continent = barb[3].charAt(0) + barb[2].charAt(0);
		renderTableRows += `
			<tr>
				<td class="ra-tac">
					${index}
				</td>
				<td class="ra-tac">
					${continent}
				</td>
				<td class="ra-tac">
					<a href="game.php?screen=info_village&id=${
						barb[0]
					}" target="_blank" rel="noopener noreferrer">
						${barb[2]}|${barb[3]}
					</a>
				</td>
				<td>${formatAsNumber(barb[5])}</td>
				<td class="ra-tac">${barb[7]}</td>
				<td class="ra-tac">
					<a href="/game.php?screen=place&target=${
						barb[0]
					}" target="_blank" rel="noopener noreferrer" class="btn">
						${tt('Attack')}
					</a>
				</td>
			</tr>
		`;
	});

	return renderTableRows;
}

// Helper: Calculate distance between current and a given village
function calcDistanceFromCurrentVillage(village) {
	var x1 = game_data.village.x,
		y1 = game_data.village.y,
		x2 = village[2],
		y2 = village[3];
	//calculate distance from current village
	var a = x1 - x2;
	var b = y1 - y2;
	var distance = Math.round(Math.hypot(a, b));
	return distance;
}

// Helper: Get Villages Coords Array
function getVillageCoord(villages) {
	var villageCoords = [];
	villages.forEach((village) => {
		villageCoords.push(village[2] + '|' + village[3]);
	});
	return villageCoords;
}

// Helper: Format as number
function formatAsNumber(number) {
	return parseInt(number).toLocaleString('de');
}

//Helper: Convert CSV data into Array
function CSVToArray(strData, strDelimiter) {
	strDelimiter = strDelimiter || ',';
	var objPattern = new RegExp(
		'(\\' +
			strDelimiter +
			'|\\r?\\n|\\r|^)' +
			'(?:"([^"]*(?:""[^"]*)*)"|' +
			'([^"\\' +
			strDelimiter +
			'\\r\\n]*))',
		'gi'
	);
	var arrData = [[]];
	var arrMatches = null;
	while ((arrMatches = objPattern.exec(strData))) {
		var strMatchedDelimiter = arrMatches[1];
		if (
			strMatchedDelimiter.length &&
			strMatchedDelimiter !== strDelimiter
		) {
			arrData.push([]);
		}
		var strMatchedValue;

		if (arrMatches[2]) {
			strMatchedValue = arrMatches[2].replace(new RegExp('""', 'g'), '"');
		} else {
			strMatchedValue = arrMatches[3];
		}
		arrData[arrData.length - 1].push(strMatchedValue);
	}
	return arrData;
}

// Helper: Generates script info
function scriptInfo() {
	return `[${scriptData.name} ${scriptData.version}]`;
}

// Helper: Prepare Popup Content
function preparePopupContent(
	popupBody,
	minWidth = '340px',
	maxWidth = '360px'
) {
	const popupHeader = `
		<h3 class="ra-fs18 ra-fw600">
			${tt(scriptData.name)}
		</h3>
		<div class="ra-body">`;
	const popupFooter = `</div><small><strong>${tt(scriptData.name)} ${
		scriptData.version
	}</strong> - <a href="${
		scriptData.authorUrl
	}" target="_blank" rel="noreferrer noopener">${
		scriptData.author
	}</a> - <a href="${
		scriptData.helpLink
	}" target="_blank" rel="noreferrer noopener">${tt('Help')}</a></small>`;
	const popupStyle = `
		<style>
			.popup_box_content { overflow-y: hidden; }
			.ra-body { width: 100%; min-width: ${minWidth}; max-width: ${maxWidth}; box-sizing: border-box; }
			.ra-fs12 { font-size: 12px; }
			.ra-fs16 { font-size: 16px; }
			.ra-fs18 { font-size: 18px; }
			.ra-fw600 { font-weight: 600; }
			.ra-mb10 { margin-bottom: 10px; }
			.ra-mb15 { margin-bottom: 15px; }
			.ra-tac { text-align: center; }
			.ra-textarea { width: 100%; height: 80px; box-sizing: border-box; padding: 5px; resize: none; }
			.ra-textarea:focus { box-shadow: none; outline: none; border: 1px solid #000; background-color: #eee; }
			.ra-table { border-spacing: 2px; border-collapse: separate; margin-bottom: 5px; border: 2px solid #f0e2be; }
			.ra-table th { text-align: center; }
			.ra-table td { padding: 1px 2px; }
			.ra-table tr:nth-of-type(2n) td { background-color: #f0e2be }
			.ra-table tr:nth-of-type(2n+1) td { background-color: #fff5da; }
			.ra-form-control { font-size: 12px; padding: 4px; width: 100%; box-sizing: border-box; }
			.ra-flex { display: flex; flex-flow: row wrap; justify-content: space-between; }
			.ra-flex-6 { flex: 0 0 48%; }
			.ra-flex-4 { flex: 0 0 30.5%; }
		</style>
	`;

	let popupContent = `
		${popupHeader}
		${popupBody}
		${popupFooter}
		${popupStyle}
	`;

	return popupContent;
}

// Helper: Prints universal debug information
function initDebug() {
	console.debug(`${scriptInfo()} It works 🚀!`);
	console.debug(`${scriptInfo()} HELP:`, scriptData.helpLink);
	if (DEBUG) {
		console.debug(`${scriptInfo()} Market:`, game_data.market);
		console.debug(`${scriptInfo()} World:`, game_data.world);
		console.debug(`${scriptInfo()} Screen:`, game_data.screen);
		console.debug(`${scriptInfo()} Game Version:`, game_data.majorVersion);
		console.debug(`${scriptInfo()} Game Build:`, game_data.version);
		console.debug(`${scriptInfo()} Locale:`, game_data.locale);
		console.debug(
			`${scriptInfo()} Premium:`,
			game_data.features.Premium.active
		);
	}
}

// Helper: Text Translator
function tt(string) {
	var gameLocale = game_data.locale;

	if (translations[gameLocale] !== undefined) {
		return translations[gameLocale][string];
	} else {
		return translations['en_DK'][string];
	}
}
