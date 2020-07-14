/*
 * Script Name: Extended Tribe Info
 * Version: v1.0.1
 * Last Updated: 2020-07-05
 * Author: RedAlert
 * Author URL: https://twscripts.ga/
 * Author Contact: RedAlert#9859 (Discord)
 * Approved: t14075898
 * Approved Date: 2020-07-04
 * Mod: JawJaw
 */

var scriptData = {
    name: 'Extended Tribe Info',
    version: 'v1.0.1',
    author: 'RedAlert',
    authorUrl: 'https://twscripts.ga/',
    helpLink:
        'https://forum.tribalwars.net/index.php?threads/extended-tribe-info.285566/',
};

// User Input
if (typeof DEBUG !== 'boolean') DEBUG = false;

// CONSTANTS
var VILLAGE_TIME = 'mapVillageTime'; // localStorage key name
var VILLAGES_LIST = 'mapVillagesList'; // localStorage key name
var TIME_INTERVAL = 60 * 60 * 1000; // fetch data every hour

// Globals
var villages = [];

// Translations
var translations = {
    en_DK: {
        'Extended Tribe Info': 'Extended Tribe Info',
        Help: 'Help',
        'Script must be executed from a Tribe overview!':
            'Script must be executed from a Tribe overview!',
        'Villages Coords': 'Villages Coords',
        'Script is already running!': 'Script is already running!',
        'TW Stats': 'TW Stats',
        'TW Map Stats': 'TW Map Stats',
        'TW Map': 'TW Map',
        'Player Links': 'Player Links',
        'TW Tribe Stats': 'TW Tribe Stats',
        'TW Map Tribe Stats': 'TW Map Tribe Stats',
        'TW Map Tribe': 'TW Map Tribe',
        'Tribe Villages Coordinates': 'Tribe Villages Coordinates',
        'village/s': 'village/s',
        'Mailing List': 'Mailing List',
        'Script Initialized!': 'Script Initialized!',
        'Points Graph': 'Points Graph',
        'Random Ram Only Fake Script': 'Random Ram Only Fake Script',
        'Sequantial Ram Only Fake Script': 'Sequantial Ram Only Fake Script',
    },
    en_US: {
        'Extended Tribe Info': 'Extended Tribe Info',
        Help: 'Help',
        'Script must be executed from a Tribe overview!':
            'Script must be executed from a Tribe overview!',
        'Villages Coords': 'Villages Coords',
        'Script is already running!': 'Script is already running!',
        'TW Stats': 'TW Stats',
        'TW Map Stats': 'TW Map Stats',
        'TW Map': 'TW Map',
        'Player Links': 'Player Links',
        'TW Tribe Stats': 'TW Tribe Stats',
        'TW Map Tribe Stats': 'TW Map Tribe Stats',
        'TW Map Tribe': 'TW Map Tribe',
        'Tribe Villages Coordinates': 'Tribe Villages Coordinates',
        'village/s': 'village/s',
        'Mailing List': 'Mailing List',
        'Script Initialized!': 'Script Initialized!',
        'Points Graph': 'Points Graph',
        'Random Ram Only Fake Script': 'Random Ram Only Fake Script',
        'Sequantial Ram Only Fake Script': 'Sequantial Ram Only Fake Script',
    },
    ro_RO: {
        'Extended Tribe Info': 'Informatii Trib Extinse',
        Help: 'Ajutor',
        'Script must be executed from a Tribe overview!':
            'Scriptul trebuie rulat din pagina Însuşiri(trib)',
        'Villages Coords': 'Coordonatele Satelor',
        'Script is already running!': 'Scriptul ruleaza deja!',
        'TW Stats': 'TW Stats',
        'TW Map Stats': 'TW Map Stats',
        'TW Map': 'TW Map',
        'Player Links': 'Player Links',
        'TW Tribe Stats': 'TW Tribe Stats',
        'TW Map Tribe Stats': 'TW Map Tribe Stats',
        'TW Map Tribe': 'TW Map Tribe',
        'Tribe Villages Coordinates': 'Coordonatele Satelor Tribului',
        'village/s': 'sat/e',
        'Mailing List': 'Lista mesaje',
        'Script Initialized!': 'Script pornit!',
        'Points Graph': 'Puncte Grafic',
        'Random Ram Only Fake Script': 'Random Ram Only Fake Script',
        'Sequantial Ram Only Fake Script': 'Sequantial Ram Only Fake Script',
    },
};

// Init Debug
initDebug();

// Init Translations Notice
initTranslationsNotice();

// Fetch World Data
function fetchWorldData() {
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
            initTribeInfo();
        }
    } else {
        // Fetch village.txt
        fetchVillagesData();
    }
}

// Fetch 'village.txt' file
function fetchVillagesData() {
    $.get('map/village.txt', function (data) {
        villages = CSVToArray(data);
        localStorage.setItem(VILLAGE_TIME, Date.parse(new Date()));
        localStorage.setItem(VILLAGES_LIST, data);
    })
        .done(function () {
            initTribeInfo();
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
function initTribeInfo() {
    if (jQuery('.tribe-info-shown').length < 1) {
        const headersToAdd = `
            <th width="260px">${tt('Points Graph')}</th>
            <th>${tt('Villages Coords')}</th>
            <th>${tt('Player Links')}</th>
        `;

        let tribeVillages = [];
        let tribeMembers = [];

        jQuery('#content_value > table.vis tr:first').append(headersToAdd);
        jQuery('#content_value > table.vis tr')
            .not('tr:eq(0)')
            .each(function () {
                const currentPlayerName = jQuery(this)
                    .find('td:eq(0)')
                    .find('a')
                    .text()
                    .trim();
                const currentPlayerLink = jQuery(this)
                    .find('td:eq(0)')
                    .find('a')
                    .attr('href');
                const [_, currentPlayerId] = currentPlayerLink.split('&id=');
                const currentPlayerVillages = villages.filter((village) => {
                    return village[4] === currentPlayerId;
                });
                const currentPlayerVillagesCoords = getVillageCoords(
                    currentPlayerVillages
                );

                const currentPlayerVillagesString = currentPlayerVillagesCoords
                    .join(' ')
                    .trim();

                const twStatsLink = buildTWStatsProfileUrl(currentPlayerId);
                const twMapStatsLink = buildTWMapPlayerUrl(currentPlayerId);
                const twMapLink = buildMapPlayerUrl(currentPlayerId);

                const playerPointsGraph = buildGraphImageUrl(
                    currentPlayerId,
                    'playergraph',
                    'points'
                );

                const rowData = `
                    <td width="260px">
                        <img src="${playerPointsGraph}" class="player-points-graph" />
                    </td>
                    <td>
                        <textarea readonly>${currentPlayerVillagesString}</textarea>
                    </td>
                    <td>
                        <a href="${twStatsLink}" target="_blank" rel="noopener noreferrer" class="btn">
                            ${tt('TW Stats')}
                        </a><br>
                        <a href="${twMapStatsLink}" target="_blank" rel="noopener noreferrer" class="btn">
                            ${tt('TW Map Stats')}
                        </a><br>
                        <a href="${twMapLink}" target="_blank" rel="noopener noreferrer" class="btn">
                            ${tt('TW Map')}
                        </a>
                    </td>
                `;

                tribeVillages.push(...currentPlayerVillages);
                tribeMembers.push(currentPlayerName);

                jQuery(this).append(rowData);
            });

        const allyId = getParameterByName('id');

        // tribe coords list
        const tribeVillageCoords = getVillageCoords(tribeVillages);
        const tribeVillageCoordsString = tribeVillageCoords.join(' ').trim();

        // tribe links
        const twTribeStatsLink = buildTWStatsTribeUrl(allyId);
        const twTribeMapStatsLink = buildTWMapTribeUrl(allyId);
        const twTribeMapLink = buildMapTribeUrl(allyId);

        // tribe graphs
        const graphPoints = buildGraphImageUrl(allyId, 'tribegraph', 'points');
        const graphVillages = buildGraphImageUrl(
            allyId,
            'tribegraph',
            'villages'
        );
        const graphMembers = buildGraphImageUrl(
            allyId,
            'tribegraph',
            'members'
        );
        const graphOd = buildGraphImageUrl(allyId, 'tribegraph', 'od');
        const graphOda = buildGraphImageUrl(allyId, 'tribegraph', 'oda');
        const graphOdd = buildGraphImageUrl(allyId, 'tribegraph', 'odd');

        // tribe mailing list
        const mailingList = tribeMembers.join(';');

        // fake scripts
        const regex = '/\\d+/';
        const randomOnlyRams = `javascript:coords='${tribeVillageCoordsString}';var doc=document;url=doc.URL;if (url.indexOf('screen=place') == -1) alert('This script needs to be run from the rally point');coords = coords.split(' ');index = Math.round(Math.random() * (coords.length - 1));coords = coords[index];coords = coords.split('|');doc.forms.units.x.value = coords[0];doc.forms.units.y.value = coords[1];if (doc.getElementsByName('spy')[0].parentNode.textContent.match(${regex})[0] * 1 >= 1) {insertUnit(doc.forms.units.spy, 0);insertUnit(doc.forms.units.spy, 1);}if (doc.getElementsByName('ram')[0].parentNode.textContent.match(${regex})[0] * 1 > 0) {insertUnit(doc.forms.units.ram, 0);insertUnit(doc.forms.units.ram, 1);}void (0);`;
        const sequentialOnlyRams = `javascript:coords='${tribeVillageCoordsString}';var doc=document,index=0;url=doc.URL,Timing.pause();var cookieparams=doc.cookie.match(/GenFakeScript0=index([0-9]*)/);if(null!=cookieparams&&(index=1*cookieparams[1]),-1==url.indexOf("screen=place")){var r=confirm("This script needs to be run from the rally point Press OK to reset index.");1==r&&(index=0)}coords=coords.split(" ");var restart=!1;index>=coords.length&&(index=0,restart=!0);var d=new Date;d.setDate(d.getDate()+5),doc.cookie="GenFakeScript0=index"+(index+1)+";expires="+d.toGMTString(),restart&&alert("End of coord list is reached. Starting over"),coords=coords[index],coords=coords.split("|"),doc.forms.units.x.value=coords[0],doc.forms.units.y.value=coords[1],1*doc.getElementsByName("spy")[0].parentNode.textContent.match(${regex})[0]>=1&&(insertUnit(doc.forms.units.spy,0),insertUnit(doc.forms.units.spy,1)),1*doc.getElementsByName("ram")[0].parentNode.textContent.match(${regex})[0]>0&&(insertUnit(doc.forms.units.ram,0),insertUnit(doc.forms.units.ram,1));`;

        const tribeInfo = `
            <div class="ra-extended-tribe-info" id="extendedTribeInfo">
                <h2>${tt(scriptData.name)}</h2>
                <div class="extended-tribe-info-body">
                    <div class="etib-box">
                        <a href="${twTribeStatsLink}" target="_blank" rel="noopener noreferrer" class="btn">
                            ${tt('TW Tribe Stats')}
                        </a>
                        <a href="${twTribeMapStatsLink}" target="_blank" rel="noopener noreferrer" class="btn">
                            ${tt('TW Map Tribe Stats')}
                        </a>
                        <a href="${twTribeMapLink}" target="_blank" rel="noopener noreferrer" class="btn">
                            ${tt('TW Map Tribe')}
                        </a>
                    </div>
                    <div class="etib-box etib-grid">
                        <img src="${graphPoints}">
                        <img src="${graphVillages}">
                        <img src="${graphMembers}">
                        <img src="${graphOd}">
                        <img src="${graphOda}">
                        <img src="${graphOdd}">
                    </div>
                    <div class="etib-box">
                        <label for="tribeVillagesCoords">
                            ${tt('Tribe Villages Coordinates')}
                            (${tribeVillageCoords.length} ${tt('village/s')})
                        </label>
                        <textarea id="tribeVillagesCoords" readonly>${tribeVillageCoordsString}</textarea>
                    </div>
                    <div class="etib-box">
                        <label for="tribeMailingList">
                            ${tt('Mailing List')}
                        </label>
                        <textarea id="tribeMailingList" readonly>${mailingList}</textarea>
                    </div>
                    <div class="etib-box">
                        <label for="randomRamOnly">
                            ${tt('Random Ram Only Fake Script')}
                        </label>
                        <textarea id="randomRamOnly" readonly>${randomOnlyRams}</textarea>
                    </div>
                    <div class="etib-box">
                        <label for="sequentialRamOnly">
                            ${tt('Sequantial Ram Only Fake Script')}
                        </label>
                        <textarea id="sequentialRamOnly" readonly>${sequentialOnlyRams}</textarea>
                    </div>
                </div>
                <br>
                <small>
                    <strong>
                        ${tt(scriptData.name)} ${scriptData.version}
                    </strong> -
                    <a href="${
                        scriptData.authorUrl
                    }" target="_blank" rel="noreferrer noopener">
                        ${scriptData.author}
                    </a> -
                    <a href="${
                        scriptData.helpLink
                    }" target="_blank" rel="noreferrer noopener">
                        ${tt('Help')}
                    </a>
                </small>
            </div>
            <style>
                .ra-extended-tribe-info {
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
                .etib-box { display: block; width: 100%; height: auto; clear: both; margin: 0 0 15px; padding: 0 0 15px 0; border-bottom: 1px solid #7d510f; }
                .etib-box:last-child { margin-bottom: 0; }
                .etib-grid { display: grid !important; grid-template-columns: 1fr 1fr 1fr; grid-gap: 15px; }
                .etib-box label { display: block; font-weight: 600; margin-bottom: 5px; }
                .etib-box textarea { width: 100%; height: 80px; box-sizing: border-box; resize: none; }
                .etib-box img { width: 100%; height: auto; }
                .tribe-info-shown { width: 100% !important; }
                .tribe-info-shown textarea { width: 100%; height: 90px; resize: none; box-sizing: border-box; }
                .tribe-info-shown .btn { margin: 5px 0; }
                .tribe-info-shown .player-points-graph { width: 100%; height: auto; }
            </style>
        `;

        jQuery('#content_value > table.vis').addClass('tribe-info-shown');
        jQuery('#content_value > table.vis').before(tribeInfo);
        jQuery('html,body').animate({
            scrollTop: jQuery('#extendedTribeInfo').offset().top - 20,
        });
    } else {
        UI.ErrorMessage(tt('Script is already running!'));
    }

    // Prepare Fake scripts for the whole tribe
    // Show fake scripts on a separate box above the tribe members list
}

// Helper: Get village coords from a list of villages
function getVillageCoords(villages) {
    var villageCoords = [];
    villages.forEach((village) => {
        villageCoords.push(village[2] + '|' + village[3]);
    });
    return villageCoords;
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

// Helper: Build map tribe URL
function buildMapTribeUrl(tribeId) {
    return `//${
        game_data.market === 'en' ? '' : game_data.market + '.'
    }twstats.com/${
        game_data.world
    }/index.php?page=map&ti0=${tribeId}&tc0=002bff&zoom=300&centrex=500&centrey=500&nocache=1&fill=000000`;
}

// Helper: Build TW Stats Tribe Profile Url
function buildTWStatsTribeUrl(tribeId) {
    return `//www.twstats.com/in/${game_data.world}/tribe/${tribeId}`;
}

// Helper: Build TribalWars Maps tribe url
function buildTWMapTribeUrl(tribeId) {
    return `http://${game_data.world}.tribalwarsmap.com/${
        game_data.market === 'en' ? '' : game_data.market
    }/history/tribe/${tribeId}#general`;
}

// Helper: Build graph image URL
function buildGraphImageUrl(id, type, graph) {
    return `//${
        game_data.market === 'en' ? '' : game_data.market + '.'
    }twstats.com/${
        game_data.world
    }/image.php?type=${type}&graph=${graph}&id=${id}`;
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

// Helper: Get parameter by name
function getParameterByName(name, url = window.location.href) {
    return new URL(url).searchParams.get(name);
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

// Helper: Text Translator
function tt(string) {
    var gameLocale = game_data.locale;

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
    const allyId = getParameterByName('id');

    if (gameScreen === 'info_ally' && allyId !== '') {
        UI.SuccessMessage(tt('Script Initialized!'));
        fetchWorldData();
    } else {
        UI.ErrorMessage(
            `${tt('Script must be executed from a Tribe overview!')}`,
            4000
        );
    }
})(window.jQuery);
