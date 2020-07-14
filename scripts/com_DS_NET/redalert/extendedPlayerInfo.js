/*
 * Script Name: Extended Player Info
 * Version: v1.0.2
 * Last Updated: 2020-06-26
 * Author: RedAlert
 * Author URL: https://twscripts.ga/
 * Author Contact: RedAlert#9859 (Discord)
 * Approved: t14036346
 * Approved Date: 2020-06-14
 * Mod: JawJaw
 */

var scriptData = {
    name: 'Extended Player Info',
    version: 'v1.0.2',
    author: 'RedAlert',
    authorUrl: 'https://twscripts.ga/',
    helpLink:
        'https://forum.tribalwars.net/index.php?threads/extended-player-info.285361/',
};

// User Input
if (typeof DEBUG !== 'boolean') DEBUG = false;

// Globals
var villages = [];
var playerVillages = [];

// Constants
var VILLAGE_TIME = 'mapVillageTime'; // localStorage key name
var VILLAGES_LIST = 'mapVillagesList'; // localStorage key name
var TIME_INTERVAL = 60 * 60 * 1000; // fetch data every hour

// Translations
var translations = {
    en_DK: {
        'Extended Player Info': 'Extended Player Info',
        Help: 'Help',
        'Script must be executed from Player Info screen!':
            'Script must be executed from Player Info screen!',
        'Error while fetching "village.txt"!':
            'Error while fetching "village.txt"!',
        'Points:': 'Points:',
        'Rank:': 'Rank:',
        'Player:': 'Player:',
        'All Villages Coords:': 'All Villages Coords:',
        'Villages:': 'Villages:',
        'Toggle Graphs': 'Toggle Graphs',
        'Toggle Coords': 'Toggle Coords',
        'Toggle Random Fake Scripts': 'Toggle Random Fake Scripts',
        'Toggle Sequential Fake Scripts': 'Toggle Sequential Fake Scripts',
        'TWStats Player Profile': 'TWStats Player Profile',
        'Show Player on Global Map': 'Show Player on Global Map',
        'TribalWars Maps Player Profile': 'TribalWars Maps Player Profile',
        'Village Coords for Continent': 'Village Coords for Continent',
        'village/s': 'village/s',
        'Script is already loaded!': 'Script is already loaded!',
    },
    en_US: {
        'Extended Player Info': 'Extended Player Info',
        Help: 'Help',
        'Script must be executed from Player Info screen!':
            'Script must be executed from Player Info screen!',
        'Error while fetching "village.txt"!':
            'Error while fetching "village.txt"!',
        'Points:': 'Points:',
        'Rank:': 'Rank:',
        'Player:': 'Player:',
        'All Villages Coords:': 'All Villages Coords:',
        'Villages:': 'Villages:',
        'Toggle Graphs': 'Toggle Graphs',
        'Toggle Coords': 'Toggle Coords',
        'Toggle Random Fake Scripts': 'Toggle Random Fake Scripts',
        'Toggle Sequential Fake Scripts': 'Toggle Sequential Fake Scripts',
        'TWStats Player Profile': 'TWStats Player Profile',
        'Show Player on Global Map': 'Show Player on Global Map',
        'TribalWars Maps Player Profile': 'TribalWars Maps Player Profile',
        'Village Coords for Continent': 'Village Coords for Continent',
        'village/s': 'village/s',
        'Script is already loaded!': 'Script is already loaded!',
    },
    sk_SK: {
        'Extended Player Info': 'Rozšírený profil hráča',
        Help: 'Pomoc',
        'Script must be executed from Player Info screen!':
            'Skript musí byť spustený z profilu hráča!',
        'Error while fetching "village.txt"!':
            'Chyba pri načítaní "village.txt"!',
        'Points:': 'Body:',
        'Rank:': 'Umiestnenie:',
        'Player:': 'Hráč:',
        'All Villages Coords:': 'Súradnice všetkých dedín:',
        'Villages:': 'Dediny:',
        'Toggle Graphs': 'Prepnúť grafy',
        'Toggle Coords': 'Prepnúť súradnice',
        'Toggle Random Fake Scripts': 'Prepnúť náhodné fake skripty',
        'Toggle Sequential Fake Scripts': 'Prepnúť postupné fake skripty',
        'TWStats Player Profile': 'Profil hráča na TW Stats',
        'Show Player on Global Map': 'Zobraziť hráča na mape sveta',
        'TribalWars Maps Player Profile': 'Profil hráča na TribalWars Maps',
        'Village Coords for Continent': 'Súradnice dedín na kontinent',
        'village/s': 'dedina/-y',
        'Script is already loaded!': 'Skript je už načítaný!',
    },
};

// Init Debug
initDebug();

// Init Translations Notice
initTranslationsNotice();

// Fetch 'village.txt' file
function fetchVillagesData(playerId) {
    $.get('map/village.txt', function (data) {
        villages = CSVToArray(data);
        localStorage.setItem(VILLAGE_TIME, Date.parse(new Date()));
        localStorage.setItem(VILLAGES_LIST, data);
    })
        .done(function () {
            initExtendedPlayerInfo(playerId);
        })
        .fail(function (error) {
            console.error(`${scriptInfo()} Error:`, error);
            UI.ErrorMessage(
                `${tt('Error while fetching "village.txt"!')}`,
                4000
            );
        });
}

// Prepare all player info
function initExtendedPlayerInfo(playerId) {
    var pointsGraph = buildGraphImageUrl(playerId, 'playergraph', 'points');
    var villagesGraph = buildGraphImageUrl(playerId, 'playergraph', 'villages');
    var odGraph = buildGraphImageUrl(playerId, 'playergraph', 'od');
    var odaGraph = buildGraphImageUrl(playerId, 'playergraph', 'oda');
    var oddGraph = buildGraphImageUrl(playerId, 'playergraph', 'odd');

    var continents = [];

    villages.forEach((village) => {
        if (village[4] == playerId) {
            playerVillages.push(village);
        }
    });

    var playerVillageCoords = getVillageCoord(playerVillages);
    var playerVillageCoordsString = playerVillageCoords.join(' ');

    // get continents
    playerVillageCoords.forEach((coord) => {
        var continent = getContinentFromCoord(coord);
        continents.push(continent);
    });

    // remove duplicates from continents array
    continents = [...new Set(continents)];

    var filteredVillagesByContinent = getFilteredVillagesByContinent(
        playerVillageCoords,
        continents
    );

    var renderVillageCoordsForContinents = '';

    for (var key in filteredVillagesByContinent) {
        if (filteredVillagesByContinent.hasOwnProperty(key)) {
            var coordsList = filteredVillagesByContinent[key].join(' ');
            var villagesCount = filteredVillagesByContinent[key].length;
            renderVillageCoordsForContinents += `
				<div>
					<label for="villagesForContinentK${key}">
						${tt('Village Coords for Continent')} K${key}
						(${villagesCount} ${tt('village/s')})
					</label>
					<textarea readonly id="villagesForContinentK${key}">${coordsList}</textarea>
				</div>
			`;
        }
    }

    if (DEBUG) {
        console.debug(`${scriptInfo()} Player Villages:`, playerVillages);
        console.debug(`${scriptInfo()} Villages Coords:`, playerVillageCoords);
        console.debug(
            `${scriptInfo()} Villages Coords String:`,
            playerVillageCoordsString
        );
        console.debug(`${scriptInfo()} Continents:`, continents);
        console.debug(
            `${scriptInfo()} Villages by Continent:`,
            filteredVillagesByContinent
        );
    }

    var regex = '/\\d+/';

    var randomOnlyScouts = `javascript:coords='${playerVillageCoordsString}';var doc=document;url=doc.URL; if (url.indexOf('screen=place') == -1) alert('This script needs to be run from the rally point'); coords = coords.split(' '); index = Math.round(Math.random() * (coords.length - 1));coords = coords[index];coords = coords.split('|'); doc.forms.units.x.value = coords[0]; doc.forms.units.y.value = coords[1]; if (doc.getElementsByName('spy')[0].parentNode.textContent.match(${regex})[0] * 1 >= 1) { insertUnit(doc.forms.units.spy, 0); insertUnit(doc.forms.units.spy, 1); } void (0);`;
    var randomOnlyRams = `javascript:coords='${playerVillageCoordsString}';var doc=document;url=doc.URL;if (url.indexOf('screen=place') == -1) alert('This script needs to be run from the rally point');coords = coords.split(' ');index = Math.round(Math.random() * (coords.length - 1));coords = coords[index];coords = coords.split('|');doc.forms.units.x.value = coords[0];doc.forms.units.y.value = coords[1];if (doc.getElementsByName('spy')[0].parentNode.textContent.match(${regex})[0] * 1 >= 1) {insertUnit(doc.forms.units.spy, 0);insertUnit(doc.forms.units.spy, 1);}if (doc.getElementsByName('ram')[0].parentNode.textContent.match(${regex})[0] * 1 > 0) {insertUnit(doc.forms.units.ram, 0);insertUnit(doc.forms.units.ram, 1);}void (0);`;
    var randomOnlyCats = `javascript:coords='${playerVillageCoordsString}';var doc=document;url=doc.URL;if (url.indexOf('screen=place') == -1) alert('This script needs to be run from the rally point');coords = coords.split(' ');index = Math.round(Math.random() * (coords.length - 1));coords = coords[index];coords = coords.split('|');doc.forms.units.x.value = coords[0];doc.forms.units.y.value = coords[1];if (doc.getElementsByName('spy')[0].parentNode.textContent.match(${regex})[0] * 1 >= 1) {insertUnit(doc.forms.units.spy, 0);insertUnit(doc.forms.units.spy, 1);}if (doc.getElementsByName('catapult')[0].parentNode.textContent.match(${regex})[0] * 1 > 0) {insertUnit(doc.forms.units.catapult, 0);insertUnit(doc.forms.units.catapult, 1);}void (0);`;

    var sequentialOnlyScouts = `javascript:coords='${playerVillageCoordsString}';var doc=document,index=0;url=doc.URL,Timing.pause();var cookieparams=doc.cookie.match(/GenFakeScript0=index([0-9]*)/);if(null!=cookieparams&&(index=1*cookieparams[1]),-1==url.indexOf("screen=place")){var r=confirm("This script needs to be run from the rally point Press OK to reset index.");1==r&&(index=0)}coords=coords.split(" ");var restart=!1;index>=coords.length&&(index=0,restart=!0);var d=new Date;d.setDate(d.getDate()+5),doc.cookie="GenFakeScript0=index"+(index+1)+";expires="+d.toGMTString(),restart&&alert("End of coord list is reached. Starting over"),coords=coords[index],coords=coords.split("|"),doc.forms.units.x.value=coords[0],doc.forms.units.y.value=coords[1],1*doc.getElementsByName("spy")[0].parentNode.textContent.match(${regex})[0]>=1&&(insertUnit(doc.forms.units.spy,0),insertUnit(doc.forms.units.spy,1));`;
    var sequentialOnlyRams = `javascript:coords='${playerVillageCoordsString}';var doc=document,index=0;url=doc.URL,Timing.pause();var cookieparams=doc.cookie.match(/GenFakeScript0=index([0-9]*)/);if(null!=cookieparams&&(index=1*cookieparams[1]),-1==url.indexOf("screen=place")){var r=confirm("This script needs to be run from the rally point Press OK to reset index.");1==r&&(index=0)}coords=coords.split(" ");var restart=!1;index>=coords.length&&(index=0,restart=!0);var d=new Date;d.setDate(d.getDate()+5),doc.cookie="GenFakeScript0=index"+(index+1)+";expires="+d.toGMTString(),restart&&alert("End of coord list is reached. Starting over"),coords=coords[index],coords=coords.split("|"),doc.forms.units.x.value=coords[0],doc.forms.units.y.value=coords[1],1*doc.getElementsByName("spy")[0].parentNode.textContent.match(${regex})[0]>=1&&(insertUnit(doc.forms.units.spy,0),insertUnit(doc.forms.units.spy,1)),1*doc.getElementsByName("ram")[0].parentNode.textContent.match(${regex})[0]>0&&(insertUnit(doc.forms.units.ram,0),insertUnit(doc.forms.units.ram,1));`;
    var sequentialOnlyCats = `javascript:coords='${playerVillageCoordsString}';var doc=document,index=0;url=doc.URL,Timing.pause();var cookieparams=doc.cookie.match(/GenFakeScript0=index([0-9]*)/);if(null!=cookieparams&&(index=1*cookieparams[1]),-1==url.indexOf("screen=place")){var r=confirm("This script needs to be run from the rally point Press OK to reset index.");1==r&&(index=0)}coords=coords.split(" ");var restart=!1;index>=coords.length&&(index=0,restart=!0);var d=new Date;d.setDate(d.getDate()+5),doc.cookie="GenFakeScript0=index"+(index+1)+";expires="+d.toGMTString(),restart&&alert("End of coord list is reached. Starting over"),coords=coords[index],coords=coords.split("|"),doc.forms.units.x.value=coords[0],doc.forms.units.y.value=coords[1],1*doc.getElementsByName("spy")[0].parentNode.textContent.match(${regex})[0]>=1&&(insertUnit(doc.forms.units.spy,0),insertUnit(doc.forms.units.spy,1)),1*doc.getElementsByName("catapult")[0].parentNode.textContent.match(${regex})[0]>0&&(insertUnit(doc.forms.units.catapult,0),insertUnit(doc.forms.units.catapult,1));`;

    var twStatusProfile = buildTWStatsProfileUrl(playerId);
    var mapPlayerUrl = buildMapPlayerUrl(playerId);
    var twMapPlayerUrl = buildTWMapPlayerUrl(playerId);

    if (DEBUG) {
        console.debug(
            `${scriptInfo()} TWStats Player Profile:`,
            twStatusProfile
        );
        console.debug(`${scriptInfo()} TWMap Player URL:`, twMapPlayerUrl);
        console.debug(`${scriptInfo()} Map Player URL:`, mapPlayerUrl);
    }

    var playerName = jQuery('#player_info tbody tr:eq(0) th').text().trim();
    var playerPoints = jQuery('#player_info tbody tr:eq(2) td:eq(1)')
        .text()
        .trim();
    var playerRank = jQuery('#player_info tbody tr:eq(3) td:eq(1)')
        .text()
        .trim();

    var content = `
		<div class="ra-extended-player-info">
			<h2>${tt(scriptData.name)}</h2>
			<div class="extended-player-info-body">
				<div class="extended-player-info-meta">
					<strong>${tt('Player:')}</strong> ${playerName}<br>
					<strong>${tt('Points:')}</strong> ${playerPoints}<br>
					<strong>${tt('Rank:')}</strong> ${playerRank}<br>
					<strong>${tt('Villages:')}</strong> ${playerVillageCoords.length}<br><br>
					<a href="${twStatusProfile}" class="btn" target="_blank" rel="noopener noreferrer">
						${tt('TWStats Player Profile')}
					</a>
					<a href="${twMapPlayerUrl}" class="btn" target="_blank" rel="noopener noreferrer">
						${tt('TribalWars Maps Player Profile')}
					</a>
					<a href="${mapPlayerUrl}" class="btn" target="_blank" rel="noopener noreferrer">
						${tt('Show Player on Global Map')}
					</a>
				</div>
				<hr>
				<div class="extended-player-info-graphs">
					<img src="${pointsGraph}" />
					<img src="${villagesGraph}" />
					<img src="${odGraph}" />
					<img src="${odaGraph}" />
					<img src="${oddGraph}" />
				</div>
				<hr>
				<a href="javascript:void(0);" class="extended-player-content-toggler" onClick="toggleContent('coords')">
					${tt('Toggle Coords')}
				</a>
				<div class="extended-player-coords" style="display:none;">
					<div>
						<label for="allVillagesCoords">
							${tt('All Villages Coords:')}
							(${playerVillageCoords.length} ${tt('village/s')})
						</label>
						<textarea readonly id="allVillagesCoords">${playerVillageCoordsString.trim()}</textarea>
					</div>
					${renderVillageCoordsForContinents}
				</div>
				<a href="javascript:void(0);" class="extended-player-content-toggler" onClick="toggleContent('random-scripts')">
					${tt('Toggle Random Fake Scripts')}
				</a>
				<div class="extended-player-scripts extended-player-random-scripts" style="display:none;">
					<div>
						<label for="randomOnlyScouts">Random Only Scouts</label>
						<textarea readonly id="randomOnlyScouts">${randomOnlyScouts}</textarea>
					</div>
					<div>
						<label for="randomOnlyRams">Random Only Rams</label>
						<textarea readonly id="randomOnlyRams">${randomOnlyRams}</textarea>
					</div>
					<div>
						<label for="randomOnlyCats">Random Only Cats</label>
						<textarea readonly id="randomOnlyCats">${randomOnlyCats}</textarea>
					</div>
				</div>
				<a href="javascript:void(0);" class="extended-player-content-toggler" onClick="toggleContent('sequential-scripts')">
					${tt('Toggle Sequential Fake Scripts')}
				</a>
				<div class="extended-player-scripts extended-player-sequential-scripts" style="display:none;">
					<div>
						<label for="sequentialOnlyScouts">Sequential Only Scouts</label>
						<textarea readonly id="sequentialOnlyScouts">${sequentialOnlyScouts}</textarea>
					</div>
					<div>
						<label for="sequentialOnlyRams">Sequential Only Rams</label>
						<textarea readonly id="sequentialOnlyRams">${sequentialOnlyRams}</textarea>
					</div>
					<div>
						<label for="sequentialOnlyCats">Sequential Only Cats</label>
						<textarea readonly id="sequentialOnlyCats">${sequentialOnlyCats}</textarea>
					</div>
				</div>
			</div>
			<br>
			<small>
				<strong>
					${tt(scriptData.name)} ${scriptData.version}
				</strong> -
				<a href="${scriptData.authorUrl}" target="_blank" rel="noreferrer noopener">
					${scriptData.author}
				</a> -
				<a href="${scriptData.helpLink}" target="_blank" rel="noreferrer noopener">
					${tt('Help')}
				</a>
			</small>
		</div>
		<style>
			.ra-extended-player-info {
				position: relative;
				display: block;
				width: 100%;
				height: auto;
				clear: both;
				margin: 15px auto;
				padding: 15px;
				border: 1px solid #7d510f;
				box-sizing: border-box;
				background-color: #f4e4bc;
				box-sizing: border-box;
			}

			.ra-extended-player-info label {
				display: block;
				font-weight: 600;
				margin-bottom: 5px;
			}

			.ra-extended-player-info textarea {
				display: block;
				width: 100%;
				height: 80px;
				resize: none;
				box-sizing: border-box;
			}

			.extended-player-content-toggler {
				display: block;
				width: 100%;
				height: auto;
				padding: 8px 15px;
				font-size: 14px;
				background-color: #804000;
				color: #fff !important;
				margin: 10px auto;
				text-align: center;
				box-sizing: border-box;
				border-radius: 4px;
			}

			.extended-player-info-meta {
				display: block;
				width: 100%;
				height: auto;
				clear: both;
				margin: 0 auto 15px;
				padding: 0;
			}

			.extended-player-info-graphs {
				display: grid;
				grid-gap: 15px;
				grid-template-columns: 1fr 1fr 1fr;
			}

			.extended-player-info-graphs img {
				display: block;
				width: 100%;
				max-width: 100%;
				height: auto;
			}

			.extended-player-coords {
				display: grid;
				grid-gap: 15px;
				grid-template-columns: 1fr;
				box-sizing: border-box;
			}

			.extended-player-scripts {
				display: grid;
				grid-gap: 15px;
				grid-template-columns: 1fr 1fr 1fr;
				box-sizing: border-box;
			}
		</style>
	`;

    jQuery('#contentContainer').before(content);
}

// Toggle Content based on user action
function toggleContent(type) {
    switch (type) {
        case 'coords':
            jQuery('.extended-player-coords').slideToggle(50);
            break;
        case 'random-scripts':
            jQuery('.extended-player-random-scripts').slideToggle(50);
            break;
        case 'sequential-scripts':
            jQuery('.extended-player-sequential-scripts').slideToggle(50);
            break;
        default:
            break;
    }
}

// Helper: Add Zero Padding
function zeroPad(number, length) {
    var n = number.toString();
    while (n.length < length) {
        n = '0' + n;
    }
    return n;
}

// Helper: Get Continent from Coord
function getContinentFromCoord(coord) {
    var coords = coord.split('|');
    var xx = zeroPad(coords[0], 3);
    var yy = zeroPad(coords[1], 3);
    return yy[0] + xx[0];
}

// Helper: Filter Villages by Continent
function getFilteredVillagesByContinent(playerVillagesCoords, continents) {
    var coords = [...playerVillagesCoords];
    var filteredVillagesByContinent = [];

    coords.forEach((coord) => {
        continents.forEach((continent) => {
            var currentVillageContinent = getContinentFromCoord(coord);
            if (currentVillageContinent === continent) {
                filteredVillagesByContinent.push({
                    continent: continent,
                    coords: coord,
                });
            }
        });
    });

    var result = groupArrayByProperty(
        filteredVillagesByContinent,
        'continent',
        'coords'
    );

    return result;
}

// Helper: Group array items by object project and filter by another object property
function groupArrayByProperty(array, property, filter) {
    return array.reduce(function (accumulator, object) {
        // get the value of our object(age in our case) to use for group    the array as the array key
        const key = object[property];
        // if the current value is similar to the key(age) don't accumulate the transformed array and leave it empty
        if (!accumulator[key]) {
            accumulator[key] = [];
        }
        // add the value to the array
        accumulator[key].push(object[filter]);
        // return the transformed array
        return accumulator;
        // Also we also set the initial value of reduce() to an empty object
    }, {});
}

// Helper: Build map player URL
function buildMapPlayerUrl(playerId) {
    return `//${
        game_data.market === 'en' ? '' : game_data.market + '.'
    }twstats.com/${
        game_data.world
    }/index.php?page=map&pi0=${playerId}&pc0=002bff&zoom=300&centrex=500&centrey=500&nocache=1&fill=000000`;
}

// Helper: Build TW Stats Player Profile Url
function buildTWStatsProfileUrl(playerId) {
    return `//www.twstats.com/in/${game_data.world}/player/${playerId}`;
}

// Helper: Build TribalWars Maps player url
function buildTWMapPlayerUrl(playerId) {
    return `http://${game_data.world}.tribalwarsmap.com/${
        game_data.market === 'en' ? '' : game_data.market
    }/history/player/${playerId}#general`;
}

// Helper: Build graph image URL
function buildGraphImageUrl(id, type, graph) {
    return `//${
        game_data.market === 'en' ? '' : game_data.market + '.'
    }twstats.com/${
        game_data.world
    }/image.php?type=${type}&graph=${graph}&id=${id}`;
}

// Helper: Get Villages Coords Array
function getVillageCoord(villages) {
    var villageCoords = [];
    villages.forEach((village) => {
        villageCoords.push(village[2] + '|' + village[3]);
    });
    return villageCoords;
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

// Helper: Get parameter by name
function getParameterByName(name, url = window.location.href) {
    return new URL(url).searchParams.get(name);
}

// Helper: Text Translator
function tt(string) {
    const gameLocale = game_data.locale;

    if (translations[gameLocale] !== undefined) {
        return translations[gameLocale][string];
    } else {
        return translations['en_DK'][string];
    }
}

// Helper: Translations Notice
function initTranslationsNotice() {
    const gameLocale = game_data.locale;

    if (translations[gameLocale] === undefined) {
        UI.ErrorMessage(
            `No translation found for <b>${gameLocale}</b>. <a href="${scriptData.helpLink}" class="btn" target="_blank" rel="noreferrer noopener">Add Yours</a> by replying to the thread.`,
            4000
        );
    }
}

// Initalize Script
(function () {
    const gameScreen = getParameterByName('screen');
    let playerId = getParameterByName('id');

    if (playerId === null) playerId = game_data.player.id;

    if (gameScreen === 'info_player') {
        if (jQuery('.ra-extended-player-info').length < 1) {
            if (localStorage.getItem(VILLAGE_TIME) != null) {
                var mapVillageTime = parseInt(
                    localStorage.getItem(VILLAGE_TIME)
                );
                if (Date.parse(new Date()) >= mapVillageTime + TIME_INTERVAL) {
                    // hour has passed, refetch village.txt
                    fetchVillagesData(playerId);
                } else {
                    // hour has not passed, work with village list from localStorage
                    var data = localStorage.getItem(VILLAGES_LIST);
                    villages = CSVToArray(data);
                    initExtendedPlayerInfo(playerId);
                }
            } else {
                // Fetch village.txt
                fetchVillagesData(playerId);
            }
        } else {
            UI.ErrorMessage(tt('Script is already loaded!'));
        }
    } else {
        UI.ErrorMessage(
            `${tt('Script must be executed from Player Info screen!')}`,
            4000
        );
    }
})(window.jQuery);
