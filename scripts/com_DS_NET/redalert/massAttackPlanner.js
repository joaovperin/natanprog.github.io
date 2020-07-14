/*
 * Script Name: Mass Attack Planner
 * Version: v1.0.2
 * Last Updated: 2020-06-12
 * Author: RedAlert
 * Author URL: https://twscripts.ga/
 * Author Contact: RedAlert#9859 (Discord)
 * Approved: t14001534
 * Approved Date: 2020-06-05
 * Mod: JawJaw
 */

var scriptData = {
	name: 'Mass Attack Planner',
	version: 'v1.0.2',
	author: 'RedAlert',
	authorUrl: 'https://twscripts.ga/',
	helpLink:
		'https://forum.tribalwars.net/index.php?threads/mass-attack-planner.285331/',
};

// User Input
if (typeof DEBUG !== 'boolean') DEBUG = false;

// Init Debug
initDebug();

// Script Initializer
function init() {
	var xmlDoc = getWorldConfig();
	var worldSpeed = xmlDoc.getElementsByTagName('speed')[0].childNodes[0]
		.nodeValue;
	var unitSpeed = xmlDoc.getElementsByTagName('unit_speed')[0].childNodes[0]
		.nodeValue;

	var currentDateTime = getCurrentDateTime();

	const content = `
		<div class="ra-flex">
			<div class="ra-flex-6">
				<div class="ra-mb15">
					<label for="world_speed">World Speed</label>
					<input id="world_speed" type="text" value="${worldSpeed}">
				</div>
			</div>
			<div class="ra-flex-6">
				<div class="ra-mb15">
					<label for="unit_speed">Unit Speed</label>
					<input id="unit_speed" type="text" value="${unitSpeed}">
				</div>
			</div>
		</div>
		<div class="ra-mb15">
			<label for="arrival_time">Arrival Time</label>
			<input id="arrival_time" type="text" placeholder="yyyy-mm-dd hh:mm:ss" value="${currentDateTime}">
		</div>
		<div class="ra-flex">
			<div class="ra-flex-6">
				<div class="ra-mb15">
					<label for="nuke_unit">Slowest Nuke unit</label>
					<select id="nuke_unit">
						<option value=18>Axe</option>
						<option value=9>Spy</option>
						<option value=10>LC/MA/Pally</option>
						<option value=11>HC</option>
						<option value=30 selected="selected">Ram/Cat</option>
					</select>
				</div>
			</div>
			<div class="ra-flex-6">
				<div class="ra-mb15">
					<label for="support_unit">Slowest Support unit</label>
					<select id="support_unit">
						<option value=18>Spear/Archer</option>
						<option value=22 selected="selected">Sword</option>
						<option value=9>Spy</option>
						<option value=10>LC/MA/Pally</option>
						<option value=11>HC</option>
						<option value=30>Cat</option>
					</select>
				</div>
			</div>
		</div>
		<div class="ra-mb15">
			<label for="target_coords">Targets Coords</label>
			<textarea id="target_coords"></textarea>
		</div>
		<div class="ra-flex">
			<div class="ra-flex-4">
				<div class="ra-mb15">
					<label for="nobel_coords">Nobles Coords</label>
					<textarea id="nobel_coords"></textarea>
				</div>
				<div class="ra-mb15">
					<label for="nobel_count">Nobles per Target</label>
					<input id="nobel_count" type="text" value="1">
				</div>
			</div>
			<div class="ra-flex-4">
				<div class="ra-mb15">
					<label for="nuke_coords">Nukes Coords</label>
					<textarea id="nuke_coords"></textarea>
				</div>
				<div class="ra-mb15">
					<label for="nuke_count">Nukes per Target</label>
					<input id="nuke_count" type="text" value="1">
				</div>
			</div>
			<div class="ra-flex-4">
				<div class="ra-mb15">
					<label for="support_coords">Support Coords</label>
					<textarea id="support_coords"></textarea>
				</div>
				<div class="ra-mb15">
					<label for="support_count">Support per Target</label>
					<input id="support_count" type="text" value="1">
				</div>
			</div>
		</div>
		<div class="ra-mb15">
			<a id="submit_btn" class="button" onClick="handleSubmit();">Get Plan!</a>
		</div>
		<div class="ra-mb15">
			<label for="results">Results</label>
			<textarea id="results"></textarea>
		</div>
	`;

	const windowContent = prepareWindowContent(content);
	attackPlannerWindow = window.open(
		'',
		'',
		'left=10px,top=10px,width=480,height=720,toolbar=0,resizable=0,location=0,menubar=0,scrollbars=0,status=0'
	);
	attackPlannerWindow.document.write(windowContent);
}

// Helper: Get World Config
function getWorldConfig() {
	var oRequest = new XMLHttpRequest();
	var sURL = '/interface.php?func=get_config';
	oRequest.open('GET', sURL, 0);
	oRequest.send(null);
	if (oRequest.status == 200) return oRequest.responseXML;
	UI.ErrorMessage('Error executing XMLHttpRequest call to get Config!', 4000);
}

// Helper: Window Content
function prepareWindowContent(windowBody) {
	const windowHeader = `<h1 class="ra-fs18 ra-fw600">${scriptData.name}</h1>`;
	const windowFooter = `<small><strong>${scriptData.name} ${scriptData.version}</strong> - <a href="${scriptData.authorUrl}" target="_blank" rel="noreferrer noopener">${scriptData.author}</a> - <a href="${scriptData.helpLink}" target="_blank" rel="noreferrer noopener">Help</a></small>`;
	const windowStyle = `
		<style>
			body { background-color: #f4e4bc; font-family: Verdana, Arial, sans-serif; font-size: 14px; line-height: 1; }
			main { max-width: 768px; margin: 0 auto; }
			h1 { font-size: 27px; }
			a { font-weight: 700; text-decoration: none; color: #603000; }
			small { font-size: 10px; }
			input[type="text"],
			select { display: block; width: 100%; height: auto; line-height: 1; box-sizing: border-box; padding: 5px; outline: none; border: 1px solid #999; }
			input[type="text"]:focus { outline: none; box-shadow: none; border: 1px solid #603000; background-color: #eee; }
			label { font-weight: 600; display: block; margin-bottom: 5px; font-size: 12px; }
			textarea { width: 100%; height: 80px; box-sizing: border-box; padding: 5px; resize: none; }
			textarea:focus { box-shadow: none; outline: none; border: 1px solid #603000; background-color: #eee; }
			.ra-mb15 { margin-bottom: 15px; }
			.ra-flex { display: flex; flex-flow: row wrap; justify-content: space-between; }
			.ra-flex-6 { flex: 0 0 48%; }
			.ra-flex-4 { flex: 0 0 30%; }
			.button { padding: 10px 20px; background-color: #603000; font-weight: 500; color: #fff; text-align: center; display: inline-block; cursor: pointer; text-transform: uppercase; }
		</style>
	`;

	const html = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>${scriptData.name} ${scriptData.version}</title>
			${windowStyle}
		</head>
		<body>
			<main>
				${windowHeader}
				${windowBody}
				${windowFooter}
			</main>
			<script>
				function a() {
					var a = document;
					if (window.frames.length > 0) a = window.main.document;
					var b = a.createElement("script");
					b.type = "text/javascript";
					var d = new Date();
					b.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js";
					a.getElementsByTagName("head")[0].appendChild(b);
				}
				function b() {
					var a = document;
					if (window.frames.length > 0) a = window.main.document;
					var b = a.createElement("script");
					b.type = "text/javascript";
					var d = new Date();
					b.src = "https://dl.dropboxusercontent.com/s/2s771it20omy3wa/attackPlannerHelper.js";
					a.getElementsByTagName("head")[0].appendChild(b);
				}
				a();
				b();
			</script>
		</body>
		</html>
	`;

	return html;
}

// Helper: Get and format current datetime
function getCurrentDateTime() {
	let currentDateTime = new Date();

	var currentYear = currentDateTime.getFullYear();
	var currentMonth = currentDateTime.getMonth();
	var currentDate = '' + currentDateTime.getDate();
	var currentHours = '' + currentDateTime.getHours();
	var currentMinutes = '' + currentDateTime.getMinutes();
	var currentSeconds = '' + currentDateTime.getSeconds();

	currentMonth = currentMonth + 1;
	currentMonth = '' + currentMonth;
	currentMonth = currentMonth.padStart(2, '0');

	currentDate = currentDate.padStart(2, '0');
	currentHours = currentHours.padStart(2, '0');
	currentMinutes = currentMinutes.padStart(2, '0');
	currentSeconds = currentSeconds.padStart(2, '0');

	let formatted_date =
		currentYear +
		'-' +
		currentMonth +
		'-' +
		currentDate +
		' ' +
		currentHours +
		':' +
		currentMinutes +
		':' +
		currentSeconds;

	return formatted_date;
}

// Helper: Generates script info
function scriptInfo() {
	return `[${scriptData.name} ${scriptData.version}]`;
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

init();
