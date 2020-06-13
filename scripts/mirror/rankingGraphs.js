/*
 * Script Name: Graphs on Ranking
 * Version: v1.0.2
 * Last Updated: 2020-06-09
 * Author: RedAlert
 * Author URL: https://twscripts.ga/
 * Author Contact: RedAlert#9859 (Discord)
 * Approved: t14009286
 * Approved Date: 2020-06-04
 * Mod: JawJaw
 */

var scriptData = {
	name: 'Graphs on Ranking',
	version: 'v1.0.2',
	author: 'RedAlert',
	authorUrl: 'https://twscripts.ga/',
	helpLink:
		'https://forum.tribalwars.net/index.php?threads/graphs-in-ranking-pages.285326/',
};

// User Input
if (typeof DEBUG !== 'boolean') DEBUG = false;

// Globals
var allowedGameScreens = ['ranking'];
var allowedGameModes = ['player', 'ally', 'con_player', 'con_ally', null];
var tables = {
	player: '#player_ranking_table > tbody > tr',
	ally: '#ally_ranking_table > tbody > tr',
	con_player: '#con_player_ranking_table > tbody > tr',
	con_ally: '#con_ally_ranking_table > tbody > tr',
};

// Translations
var translations = {
	en_DK: {
		Points: 'Points',
		Villages: 'Villages',
		'Invalid game mode!': 'Invalid game mode!',
		'Script must be run from': 'Script must be run from',
		'Rankings page': 'Rankings page',
		'Graphs already added!': 'Graphs already added!',
	},
	en_US: {
		Points: 'Points',
		Villages: 'Villages',
		'Invalid game mode!': 'Invalid game mode!',
		'Script must be run from': 'Script must be run from',
		'Rankings page': 'Rankings page',
		'Graphs already added!': 'Graphs already added!',
	},
};

// Init Debug
initDebug();

// Helper: Add graphs on each row
function addRankingGraphs() {
	let gameMode = getParameterByName('mode');

	if (gameMode === null) gameMode = 'player';
	var element = tables[gameMode];

	var entity = 'player';
	if (gameMode === 'ally' || gameMode === 'con_ally') entity = 'tribe';

	if (!$(element).hasClass('graphs-added')) {
		var headersToAdd = `
			<th>${tt('Points')}</th>
			<th>${tt('Villages')}</th>
		`;

		$(element + ':first').append(headersToAdd);
		$(element)
			.not(':first')
			.each(function () {
				var link = $(this).find('td').eq(1).find('a').attr('href');
				var url = location.protocol + location.host + link;

				var id = getParameterByName('id', url);
				var [firstGraph, secondGraph] = generateGraphData(id, gameMode);

				var graphData = `
					<td>
						<a href="http://www.twstats.com/in/${game_data.world}/${entity}/${id}" target="_blank" rel="noreferrer noopener">
							<img src="${firstGraph}" width="200">
						</a>
					</td>
					<td>
						<a href="http://www.twstats.com/in/${game_data.world}/${entity}/${id}" target="_blank" rel="noreferrer noopener">
							<img src="${secondGraph}" width="200">
						</a>
					</td>
				`;

				jQuery(this).append(graphData);
			});

		$(element).addClass('graphs-added');
	} else {
		UI.ErrorMessage(tt('Graphs already added!'));
	}
}

// Helper: Generate content
function generateGraphData(id, mode) {
	var firstGraph, secondGraph;

	if (mode === 'player' || mode === 'con_player') {
		var firstGraph = buildGraphImageUrl(id, 'playergraph', 'points');
		var secondGraph = buildGraphImageUrl(id, 'playergraph', 'villages');
	}

	if (mode === 'ally' || mode === 'con_ally') {
		var firstGraph = buildGraphImageUrl(id, 'tribegraph', 'points');
		var secondGraph = buildGraphImageUrl(id, 'tribegraph', 'villages');
	}

	return [firstGraph, secondGraph];
}

// Helper: Build graph image URL
function buildGraphImageUrl(id, type, graph) {
	return `//${
		game_data.market === 'en' ? '' : game_data.market + '.'
	}twstats.com/${
		game_data.world
	}/image.php?type=${type}&graph=${graph}&id=${id}`;
}

// Helper: Get parameter by name
function getParameterByName(name, url = window.location.href) {
	return new URL(url).searchParams.get(name);
}

// Helper: Generates script info
function scriptInfo() {
	return `[${scriptData.name} ${scriptData.version}]`;
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

// Initalize Script
(function () {
	const gameScreen = getParameterByName('screen');
	const gameMode = getParameterByName('mode');

	if (allowedGameScreens.includes(gameScreen)) {
		if (allowedGameModes.includes(gameMode)) {
			addRankingGraphs();
		} else {
			UI.ErrorMessage(`${tt('Invalid game mode!')}`);
		}
	} else {
		UI.ErrorMessage(
			`${tt(
				'Script must be run from'
			)} <a href="/game.php?screen=ranking&mode=player" class="btn">${tt(
				'Rankings page'
			)}</a>`,
			4000
		);
	}
})(window.jQuery);
