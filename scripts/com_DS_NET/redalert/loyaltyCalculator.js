/*
 * Script Name: Loyalty Calculator
 * Version: v1.0
 * Last Updated: 2020-07-10
 * Author: RedAlert
 * Author URL: https://twscripts.ga/
 * Author Contact: RedAlert#9859 (Discord)
 * Approved: t14092877
 * Approved Date: 2020-07-14
 * Mod: JawJaw
 */

var scriptData = {
    name: 'Loyalty Calculator',
    version: 'v1.0',
    author: 'RedAlert',
    authorUrl: 'https://twscripts.ga/',
    helpLink:
        'https://forum.tribalwars.net/index.php?threads/loyalty-calculator.285636/',
};

// User Input
if (typeof DEBUG !== 'boolean') DEBUG = false;

// Translations
var translations = {
    en_DK: {
        'Loyalty Calculator': 'Loyalty Calculator',
        Help: 'Help',
        'Script must be executed from the Village Overview!':
            'Script must be executed from the Village Overview!',
        'Estimated Loyalty ≈': 'Estimated Loyalty ≈',
        'No incommings found!': 'No incommings found!',
        'Loyalty is already 100!': 'Loyalty is already 100!',
    },
    en_US: {
        'Loyalty Calculator': 'Loyalty Calculator',
        Help: 'Help',
        'Script must be executed from the Village Overview!':
            'Script must be executed from the Village Overview!',
        'Estimated Loyalty ≈': 'Estimated Loyalty ≈',
        'No incommings found!': 'No incommings found!',
        'Loyalty is already 100!': 'Loyalty is already 100!',
    },
};

// Init Debug
initDebug();

// Init Translations Notice
initTranslationsNotice();

// Initialize Loyalty Calculator
function initLoyaltyCalculator() {
    let currentLoyalty = jQuery(
        '#show_mood > .widget_content > .vis_item .green b'
    ).text();

    if (currentLoyalty.length !== 0) {
        if (jQuery('#commands_incomings').length > 0) {
            let incRows = jQuery('#commands_incomings table tr.command-row');

            currentLoyalty = parseInt(currentLoyalty);

            const xmlDoc = getWorldConfig();
            const worldSpeed = xmlDoc.getElementsByTagName('speed')[0]
                .childNodes[0].nodeValue;

            let noblesFound = false;

            incRows.each(function () {
                let currentAttackLabel = jQuery(this)
                    .find('td:eq(0)')
                    .text()
                    .trim();
                if (currentAttackLabel.includes('Noble') && !noblesFound) {
                    let currentAttackTimeToLand = jQuery(this)
                        .find('td:eq(2)')
                        .text()
                        .trim();
                    let hoursToLand = parseInt(
                        currentAttackTimeToLand.split(':')[0]
                    );

                    jQuery(this).find('td').css({
                        'background-color': '#ffc800',
                    });

                    let loyaltyIncrease = hoursToLand * worldSpeed;
                    let newLoyalty = currentLoyalty + loyaltyIncrease;
                    if (newLoyalty > 100) newLoyalty = 100;

                    const content = `
                            <h3>${tt(scriptData.name)}</h3>
                            <p>
                                <b>
                                    ${tt('Estimated Loyalty ≈')}
                                    ${newLoyalty} (&#177;${worldSpeed})
                                </b>
                            </p>
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
                        `;

                    jQuery('#show_mood > .widget_content .vis_item').append(
                        content
                    );
                    noblesFound = true;
                }
            });
        } else {
            UI.ErrorMessage('No incommings found!');
        }
    } else {
        UI.SuccessMessage(tt('Loyalty is already 100!'));
    }
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
    const gameVillage = getParameterByName('village');

    if (gameScreen === 'overview' && gameVillage !== '') {
        initLoyaltyCalculator();
    } else {
        UI.ErrorMessage(
            `${tt('Script must be executed from the Village Overview!')}`,
            4000
        );
    }
})(window.jQuery);
