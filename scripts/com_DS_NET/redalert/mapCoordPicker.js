/*
 * Script Name: Map Coord Picker
 * Version: v1.0.1
 * Last Updated: 2020-07-05
 * Author: RedAlert
 * Author URL: https://twscripts.ga/
 * Author Contact: RedAlert#9859 (Discord)
 * Approved: t14065247
 * Approved Date: 2020-07-04
 * Mod: JawJaw
 */

var scriptData = {
    name: 'Map Coord Picker',
    version: 'v1.0.1',
    author: 'RedAlert',
    authorUrl: 'https://twscripts.ga/',
    helpLink:
        'https://forum.tribalwars.net/index.php?threads/map-coords-picker.285565/',
};

// User Input
if (typeof DEBUG !== 'boolean') DEBUG = false;

// Globals
var mapOverlay;
var index = 0;
if ('TWMap' in window) mapOverlay = TWMap;

// Translations
var translations = {
    en_DK: {
        'Map Coord Picker': 'Map Coord Picker',
        Help: 'Help',
        'Script must be executed from the <a href="/game.php?screen=map" class="btn">Map</a>':
            'Script must be executed from the <a href="/game.php?screen=map" class="btn">Map</a>',
        'Script is already loaded and running!':
            'Script is already loaded and running!',
        Reset: 'Reset',
        Copy: 'Copy',
        'Copied!': 'Copied!',
        'Nothing to be copied!': 'Nothing to be copied!',
        'Selection cleared!': 'Selection cleared!',
        'Selected villages:': 'Selected villages:',
    },
    en_US: {
        'Map Coord Picker': 'Map Coord Picker',
        Help: 'Help',
        'Script must be executed from the <a href="/game.php?screen=map" class="btn">Map</a>':
            'Script must be executed from the <a href="/game.php?screen=map" class="btn">Map</a>',
        'Script is already loaded and running!':
            'Script is already loaded and running!',
        Reset: 'Reset',
        Copy: 'Copy',
        'Copied!': 'Copied!',
        'Nothing to be copied!': 'Nothing to be copied!',
        'Selection cleared!': 'Selection cleared!',
        'Selected villages:': 'Selected villages:',
    },
    ro_RO: {
        'Map Coord Picker': 'Map Coord Picker',
        Help: 'Ajutor',
        'Script must be executed from the <a href="/game.php?screen=map" class="btn">Map</a>':
            'Scriptul trebuie rulat de pe <a href="/game.php?screen=map" class="btn">Map</a>',
        'Script is already loaded and running!': 'Scriptul ruleaza deja!',
        Reset: 'Reset',
        Copy: 'Copiaza',
        'Copied!': 'Copiat!',
        'Nothing to be copied!': 'Nimic de copiat!',
        'Selection cleared!': 'Selectare golita!',
        'Selected villages:': 'Alege satele:',
    },
};

// Init Debug
initDebug();

// Init Translations Notice
initTranslationsNotice();

// Initialize Map Coord Picker
function initMapCoordPicker() {
    var content = `
        <div id="ra-map-coord-grabber">
            <h3>${tt(scriptData.name)}</h3>
            <p>
                ${tt(
                    'Selected villages:'
                )} <span id="countSelectedVillages">0</span>
            </p>
            <textarea id="villageList" value=""></textarea>
            <a href="javascript:void(0);" class="btn btn-confirm-no" onClick="resetSelection();">
                ${tt('Reset')}
            </a>
            <a href="javascript:void(0);" class="btn btn-confirm-yes" onClick="copySelection();">
                ${tt('Copy')}
            </a>
            <br><br>
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
            <a class="popup_box_close custom-close-button" onClick="closeDraggableEl();" href="#">&nbsp;</a>
        </div>
        <style>
            #ra-map-coord-grabber {
                position: absolute;
                top: 10vw;
                right: 10vw;
                z-index: 100;
                width: 300px;
                height: auto;
                padding: 10px;
                border: 1px solid #603000;
                box-sizing: border-box;
                background-color: #f4e4bc;
            }

            #ra-map-coord-grabber textarea {
                width: 100%;
                height: 100px;
                resize: none;
                box-sizing: border-box;
                margin-bottom: 5px;
            }

            #countSelectedVillages {
                font-weight: 600;
            }

            .custom-close-button {
                right: 0;
                top: 0;
            }
        </style>
    `;

    if (jQuery('#ra-map-coord-grabber').length < 1) {
        jQuery('body').append(content);
        jQuery('#ra-map-coord-grabber').draggable();
    } else {
        UI.ErrorMessage(tt('Script is already loaded and running!'));
    }

    mapOverlay.mapHandler._spawnSector = mapOverlay.mapHandler.spawnSector;
    TWMap.mapHandler.spawnSector = spawnSectorReplacer;
    mapOverlay.map._DShandleClick = mapOverlay.map._handleClick;

    TWMap.map._handleClick = function (e) {
        var currentCoords = jQuery('#villageList').val();
        var pos = this.coordByEvent(e);
        var coord = pos.join('|');
        var village = TWMap.villages[pos[0] * 1000 + pos[1]];
        if (village && village.id) {
            if (!currentCoords.includes(coord)) {
                document.getElementById('villageList').innerHTML += coord + ' ';
                jQuery(`[id="map_village_${village.id}"]`).css({
                    filter: 'brightness(200%) grayscale(100%)',
                });
                index++;
                jQuery('#countSelectedVillages').text(index);
            }
        }
        return false;
    };
}

// Override Map Sector Spawn
function spawnSectorReplacer(data, sector) {
    mapOverlay.mapHandler._spawnSector(data, sector);
    var beginX = sector.x - data.x;
    var endX = beginX + mapOverlay.mapSubSectorSize;
    var beginY = sector.y - data.y;
    var endY = beginY + mapOverlay.mapSubSectorSize;
    for (var x in data.tiles) {
        var x = parseInt(x, 10);
        if (x < beginX || x >= endX) {
            continue;
        }
        for (var y in data.tiles[x]) {
            var y = parseInt(y, 10);

            if (y < beginY || y >= endY) {
                continue;
            }
            var xCoord = data.x + x;
            var yCoord = data.y + y;
            var v = mapOverlay.villages[xCoord * 1000 + yCoord];
            var currentCoords = jQuery('#villageList').val().trim();
            if (v) {
                if (currentCoords.length !== 0) {
                    var coordsArray = currentCoords.trim().split(' ');
                    var vXY = '' + v.xy;
                    var vCoords = vXY.slice(0, 3) + '|' + vXY.slice(3, 6);
                    if (coordsArray.includes(vCoords)) {
                        jQuery(`[id="map_village_${v.id}"]`).css({
                            filter: 'brightness(200%) grayscale(100%)',
                        });
                    }
                }
            }
        }
    }
}

// Close Draggable Element
function closeDraggableEl() {
    jQuery('#ra-map-coord-grabber').remove();
    var mapOverlay = TWMap;
    mapOverlay.mapHandler.spawnSector = mapOverlay.mapHandler._spawnSector;
    mapOverlay.map._handleClick = mapOverlay.map._DShandleClick;
    mapOverlay.reload();
}

// Reset Selected coords
function resetSelection() {
    jQuery('#villageList').text('');
    jQuery('#countSelectedVillages').text(0);
    index = 0;
    TWMap.reload();
    UI.SuccessMessage(tt('Selection cleared!'), 4000);
}

// Copy selected coords
function copySelection() {
    var coords = jQuery('#villageList').val().trim();
    if (coords.length !== 0) {
        jQuery('#villageList').select();
        document.execCommand('copy');
        UI.SuccessMessage(tt('Copied!'), 4000);
    } else {
        UI.ErrorMessage(tt('Nothing to be copied!'), 4000);
    }
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

    if (gameScreen === 'map') {
        initMapCoordPicker();
    } else {
        UI.ErrorMessage(
            `${tt(
                'Script must be executed from the <a href="/game.php?screen=map" class="btn">Map</a>'
            )}`,
            4000
        );
    }
})(window.jQuery);
