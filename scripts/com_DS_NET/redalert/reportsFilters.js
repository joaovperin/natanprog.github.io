/*
 * Script Name: Filter Reports
 * Version: v1.0.3
 * Last Updated: 2020-07-16
 * Author: RedAlert
 * Author URL: https://twscripts.ga/
 * Author Contact: RedAlert#9859 (Discord)
 * Approved: t14043639
 * Approved Date: 2020-06-21
 * Mod: JawJaaw
 */

var scriptData = {
    name: 'Filter Reports',
    version: 'v1.0.3',
    author: 'RedAlert',
    authorUrl: 'https://twscripts.ga/',
    helpLink:
        'https://forum.tribalwars.net/index.php?threads/filter-reports.285476/#',
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
        'Filter Reports': 'Filter Reports',
        Help: 'Help',
        'Script must be run from': 'Script must be run from',
        'Reports Overview': 'Reports Overview',
        'Error while fetching "village.txt"!':
            'Error while fetching "village.txt"!',
        'Script is already loaded and running!':
            'Script is already loaded and running!',
        'Reset Filters': 'Reset Filters',
        'Players Only': 'Players Only',
        'Barbarians Only': 'Barbarians Only',
        'No reports found!': 'No reports found!',
        'Reports have been selected!': 'Reports have been selected!',
        'No reports found fitting the criteria!':
            'No reports found fitting the criteria!',
    },
    en_US: {
        'Filter Reports': 'Filter Reports',
        Help: 'Help',
        'Script must be run from': 'Script must be run from',
        'Reports Overview': 'Reports Overview',
        'Error while fetching "village.txt"!':
            'Error while fetching "village.txt"!',
        'Script is already loaded and running!':
            'Script is already loaded and running!',
        'Reset Filters': 'Reset Filters',
        'Players Only': 'Players Only',
        'Barbarians Only': 'Barbarians Only',
        'No reports found!': 'No reports found!',
        'Reports have been selected!': 'Reports have been selected!',
        'No reports found fitting the criteria!':
            'No reports found fitting the criteria!',
    },
    sk_SK: {
        'Filter Reports': 'Filtrovanie oznámení',
        Help: 'Pomoc',
        'Script must be run from': 'Skript musí byť spustený z',
        'Reports Overview': 'Náhľadov oznámení',
        'Error while fetching "village.txt"!':
            'Chyba pri načítaní "village.txt"!',
        'Script is already loaded and running!':
            'Skript je už načítaný a spustený!',
        'Reset Filters': 'Resetovať filtre',
        'Players Only': 'Filtrovať oznámenia hráčov',
        'Barbarians Only': 'Filtrovať oznámenia barbarov',
        'No reports found!': 'Žiadne oznámenia!',
        'Reports have been selected!': 'Oznámenia boli vybrané!',
        'No reports found fitting the criteria!':
            'Žiadne oznámenie nesplnilo kritériá!',
    },
};

// Init Debug
initDebug();

// Init Translations Notice
initTranslationsNotice();

// Auto-update localStorage villages list
if (localStorage.getItem(VILLAGE_TIME) != null) {
    var mapVillageTime = parseInt(localStorage.getItem(VILLAGE_TIME));
    if (Date.parse(new Date()) >= mapVillageTime + TIME_INTERVAL) {
        // hour has passed, refetch village.txt
        fetchVillagesData();
    } else {
        // hour has not passed, work with village list from localStorage
        var data = localStorage.getItem(VILLAGES_LIST);
        villages = CSVToArray(data);
        filterPlayerReports();
    }
} else {
    // Fetch village.txt
    fetchVillagesData();
}

// Fetch 'village.txt' file
function fetchVillagesData() {
    $.get('map/village.txt', function (data) {
        villages = CSVToArray(data);
        localStorage.setItem(VILLAGE_TIME, Date.parse(new Date()));
        localStorage.setItem(VILLAGES_LIST, data);
    })
        .done(function () {
            filterPlayerReports();
        })
        .fail(function (error) {
            console.error(`${scriptInfo()} Error:`, error);
            UI.ErrorMessage(
                `${tt('Error while fetching "village.txt"!')}`,
                4000
            );
        });
}

// Initialize Filtering Player Reports
function filterPlayerReports() {
    const gameScreen = getParameterByName('screen');
    const gameMode = getParameterByName('mode');

    jQuery('#report_list tr')
        .find('td:eq(0)')
        .find('input[type="checkbox"]')
        .attr('checked', false);

    if (gameScreen === 'report' && gameMode === 'attack') {
        let filters = `
            <div class="ra-filter-reports" id="raFilterReports">
                <div class="ra-filter-reports-header">
                    <h2>${tt(scriptData.name)}</h2>
                </div>
                <div class="ra-filter-reports-body">
                    <a href="javascript:void(0);" onClick="resetFilters();" class="btn">
                        ${tt('Reset Filters')}
                    </a>
                    <a href="javascript:void(0);" onClick="playerOnlyReports();" class="btn">
                        ${tt('Players Only')}
                    </a>
                    <a href="javascript:void(0);" onClick="barbarianOnlyReports();" class="btn">
                        ${tt('Barbarians Only')}
                    </a>
                </div>
                <div class="ra-filter-reports-footer">
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
            </div>
            <style>
                .ra-filter-reports {
                    position: relative;
                    display: block;
                    width: 100%;
                    height: auto;
                    clear: both;
                    margin: 15px auto;
                    padding: 10px;
                    border: 1px solid #603000;
                    box-sizing: border-box;
                    background-color: #f4e4bc;
                }

                .ra-filter-reports-body {
                    margin-bottom: 15px;
                }

                .ra-filter-reports-body > div {
                    margin-bottom: 5px;
                }

                .ra-filter-reports-body > div:last-child {
                    margin-bottom: 0;
                }
            </style>
        `;

        if (jQuery('.ra-filter-reports').length == 0) {
            jQuery('#report_list').before(filters);
        } else {
            UI.ErrorMessage(tt('Script is already loaded and running!'));
        }

        jQuery('html,body').animate(
            { scrollTop: jQuery('#raFilterReports').offset().top - 80 },
            'slow'
        );
    } else {
        UI.ErrorMessage(
            `${tt(
                'Script must be run from'
            )} <a href="/game.php?screen=report&mode=attack" class="btn">${tt(
                'Reports Overview'
            )}</a>`
        );
    }
}

// Reset Report Filters
function resetFilters() {
    jQuery('#report_list tr')
        .find('td:eq(0)')
        .find('input[type="checkbox"]')
        .attr('checked', false);
    jQuery('#select_all').attr('checked', false);
    jQuery('#report_list tbody tr').show();
    const totalRows = jQuery('#report_list tr').not(':first').not(':last')
        .length;
    if (totalRows === 0) {
        UI.ErrorMessage(tt('No reports found!'), 3000);
    }
}

// Show only Player Reports
function playerOnlyReports() {
    resetFilters();

    const barbarians = getBarbarianVillages(villages);

    const reportsTableRows = jQuery('#report_list tbody tr')
        .not(':first')
        .not(':last');

    let visibleRow = 0;

    reportsTableRows.each(function (index) {
        const reportName = jQuery(this)
            .find('.report-link')
            .find('.quickedit-label')
            .text()
            .trim();
        const defenderVillageCoords = getDefenderVillageCoords(reportName);
        const isBarbarian = barbarians.includes(defenderVillageCoords);

        if (isBarbarian) {
            jQuery(this).hide();
        } else {
            visibleRow++;
        }
    });

    if (visibleRow > 0) {
        UI.SuccessMessage(tt('Reports have been selected!'), 3000);
        jQuery('#report_list tr:visible input[type="checkbox"]').prop(
            'checked',
            true
        );
    } else {
        UI.ErrorMessage(tt('No reports found fitting the criteria!'), 3000);
    }
}

// Show only Barbarian Reports
function barbarianOnlyReports() {
    resetFilters();

    const barbarians = getBarbarianVillages(villages);

    const reportsTableRows = jQuery('#report_list tbody tr')
        .not(':first')
        .not(':last');

    let visibleRow = 0;

    reportsTableRows.each(function (index) {
        const reportName = jQuery(this)
            .find('.report-link')
            .find('.quickedit-label')
            .text()
            .trim();
        const defenderVillageCoords = getDefenderVillageCoords(reportName);
        const isBarbarian = barbarians.includes(defenderVillageCoords);

        if (!isBarbarian) {
            jQuery(this).hide();
        } else {
            visibleRow++;
        }
    });

    if (visibleRow > 0) {
        UI.SuccessMessage(tt('Reports have been selected!'), 3000);
        jQuery('#report_list tr:visible input[type="checkbox"]').prop(
            'checked',
            true
        );
    } else {
        UI.ErrorMessage(tt('No reports found fitting the criteria!'), 3000);
    }
}

// Helper: Get Coords of defender village
function getDefenderVillageCoords(reportName) {
    const [_, defender] = reportName.match(/\d+\|\d+/g);
    return defender;
}

// Helper: Get list of barbarians
function getBarbarianVillages(villages) {
    let barbarians = [];
    villages.forEach((village) => {
        if (village[4] == '0') {
            const barbCoords = village[2] + '|' + village[3];
            barbarians.push(barbCoords);
        }
    });
    return barbarians;
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
