/*
 * Script Name: Farming Efficiency Calculator
 * Version: v1.1
 * Last Updated: 2020-05-29
 * Author: RedAlert
 * Author URL: https://twtools.ga/
 * Author Contact: RedAlert#9859 (Discord)
 * Approved: t13970817
 * Approved Date: 2020-05-28
 * Mod: JawJaw
 */

var scriptData = {
	name: 'Farming Efficiency Calculator',
	version: 'v1.1',
	author: 'RedAlert',
	authorUrl: 'https://twtools.ga/',
	helpLink:
		'https://forum.tribalwars.net/index.php?threads/farming-efficiency-calculator.285288/',
};

// User Input
if (typeof DEBUG !== 'boolean') DEBUG = true;

// Globals
var farmingEfficiency = 0;
var resourcesLootedArray = [];
var resourcesEstimatedArray = [];
var totalEstimatedResources = 0;
var totalLootedResources = 0;
var woodArray = [];
var clayArray = [];
var ironArray = [];
var totalWood = 0;
var totalClay = 0;
var totalIron = 0;

// Init Debug
initDebug();

// Inititalize Script
function init() {
	//Check that we are on a correct screen
	var isReportsOverviewSCreen = checkScreen('report', 'attack');

	if (isReportsOverviewSCreen) {
		// Populate Farming arrays with data
		getFarmingData();

		// Show popup
		var content = `
			<p class="ra-fs16"><strong>Efficiency:</strong> <span id="farmingEfficiency">0%</span></p>
			<p class="ra-fs12">
				<strong>Total Looted:</strong> <span id="totalLooted">0</span><br>
				<strong>Total Estimated:</strong> <span id="totalEstimated">0</span>
			</p>
			<p class="ra-fs12">
				<strong>Villages Looted:</strong> <span id="villagesLooted">0</span><br>
				<strong>Looted/Village:</strong> <span id="lootedPerVillage">0</span>
			</p>
			<p class="ra-fs12">
				<strong>Total Wood:</strong> <span id="totalWood">0</span><br>
				<strong>Total Clay:</strong> <span id="totalClay">0</span><br>
				<strong>Total Iron:</strong> <span id="totalIron">0</span>
			</p>
		`;

		var popupContent = preparePopupContent(content);
		Dialog.show('content', popupContent);
	} else {
		UI.ErrorMessage(
			'Script must be run from <a href="/game.php?screen=report&mode=attack" class="btn">Reports Overview</a>',
			4000
		);
	}
}

// Farming Efficiency Calculator
function getFarmingData() {
	var reportIds = getReportIds();

	if (DEBUG) {
		console.debug(`${scriptInfo()} Report IDs:`, reportIds);
	}

	// Call an asynchronous function upon each element in the array
	reportIds.asyncForEach(async function (reportId) {
		await wait(() => {
			var fetchReportUrl = `/game.php?screen=report&ajax=view&id=${reportId}`;
			$.get(fetchReportUrl, function (data) {
				parseReport(data);
			}).done(function () {
				doFarmingCalculations();
			});
		}, 300);
	});
}

// Helper: Do farming calculations
function doFarmingCalculations() {
	totalLootedResources = arrayItemsSum(resourcesLootedArray);
	totalEstimatedResources = arrayItemsSum(resourcesEstimatedArray);
	totalWood = arrayItemsSum(woodArray);
	totalClay = arrayItemsSum(clayArray);
	totalIron = arrayItemsSum(ironArray);

	var totalLottedFormatted = formatAsNumber(totalLootedResources);
	var totalEstimatedFormatted = formatAsNumber(totalEstimatedResources);
	var totalWoodFormatted = formatAsNumber(totalWood);
	var totalClayFormatted = formatAsNumber(totalClay);
	var totalIronFormatted = formatAsNumber(totalIron);

	farmingEfficiency = (
		(totalLootedResources / totalEstimatedResources) *
		100
	).toFixed(2);

	var lootedPerVillage = (
		totalLootedResources / resourcesLootedArray.length
	).toFixed(0);

	// Update UI
	$('#farmingEfficiency').text(farmingEfficiency + '%');
	$('#totalLooted').text(totalLottedFormatted);
	$('#totalEstimated').text(totalEstimatedFormatted);
	$('#villagesLooted').text(resourcesLootedArray.length);
	$('#lootedPerVillage').text(formatAsNumber(lootedPerVillage));
	$('#totalWood').text(totalWoodFormatted);
	$('#totalClay').text(totalClayFormatted);
	$('#totalIron').text(totalIronFormatted);
}

// Helper: Get all report IDs
function getReportIds() {
	var reportIds = [];

	var reportsTableRows = $('#report_list tbody tr');

	reportsTableRows.each(function () {
		var reportId = jQuery(this).find('.report-link').attr('data-id');
		if (typeof reportId !== 'undefined' && reportId !== '') {
			reportIds.push(reportId);
		}
	});

	return reportIds;
}

// Helper: Parse Report
function parseReport(reportData) {
	var reportJSON = JSON.parse(reportData);
	var reportHtmlString = reportJSON.dialog;

	var parser = new DOMParser();
	var report = parser.parseFromString(reportHtmlString, 'text/html');

	var attackResults = report.getElementById('attack_results');
	if (attackResults !== null) {
		var attackRes = $(report).find('#attack_results');
		var hauledResources = attackRes
			.children('tbody')
			.children('tr:first-child')
			.children('td:last-child')
			.text();

		var hauledWood = $(attackRes)
			.find('tr:first-child .nowrap:eq(0)')
			.text()
			.replace('.', '');
		var hauledClay = $(attackRes)
			.find('tr:first-child .nowrap:eq(1)')
			.text()
			.replace('.', '');
		var hauledIron = $(attackRes)
			.find('tr:first-child .nowrap:eq(2)')
			.text()
			.replace('.', '');

		var [looted, estimated] = hauledResources.split('/');
		looted = looted.replace('.', '');
		estimated = estimated.replace('.', '');

		if (looted !== '') resourcesLootedArray.push(parseInt(looted));
		if (estimated !== '') resourcesEstimatedArray.push(parseInt(estimated));
		if (hauledWood !== '') woodArray.push(parseInt(hauledWood));
		if (hauledClay !== '') clayArray.push(parseInt(hauledClay));
		if (hauledIron !== '') ironArray.push(parseInt(hauledIron));
	}
}

// Helper: Format as number
function formatAsNumber(number) {
	return parseInt(number).toLocaleString('de');
}

// Helper: Find sum of array items
function arrayItemsSum(array) {
	return array.reduce(function (a, b) {
		return a + b;
	}, 0);
}

// Helper: Check that we are on a correct screen
function checkScreen(userScreen, userMode) {
	const currentLocation = window.location.href;
	var url = new URL(currentLocation);

	const gameScreen = url.searchParams.get('screen');
	const gameMode = url.searchParams.get('mode');
	const gameView = url.searchParams.get('view');

	if (DEBUG) {
		console.debug(`${scriptInfo()} Game Screen:`, gameScreen);
		console.debug(`${scriptInfo()} Game Mode:`, gameMode);
		console.debug(`${scriptInfo()} Game View:`, gameView);
	}

	if (gameScreen === userScreen && gameMode === userMode) {
		if (gameView !== null) return false;
		return true;
	}

	return false;
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
	const popupHeader = `<h3 class="ra-fs18 ra-fw600">${scriptData.name}</h3><div class="ra-body">`;
	const popupFooter = `</div><small><strong>${scriptData.name} ${scriptData.version}</strong> by <a href="${scriptData.authorUrl}" target="_blank" rel="noreferrer noopener">${scriptData.author}</a> - <a href="${scriptData.helpLink}" target="_blank" rel="noreferrer noopener">Help</a></small>`;
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
	}
}

// Extend the Array prototype with an asyncForEach method
Array.prototype.asyncForEach = async function (fn) {
	for (let i = 0; i < this.length; i++) {
		await fn(this[i], i);
	}
};

// Define a Promise wrapper around the setTimeout function
function wait(fn, time) {
	return new Promise((resolve) =>
		setTimeout(() => {
			fn();
			resolve();
		}, time)
	);
}

init();
