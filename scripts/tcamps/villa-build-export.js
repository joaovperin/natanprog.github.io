// This script has been approved by Tribal Wars as of 27/01/2018, ticket t12168060.

console.log('villa-build-export');

var href = window.location.href;
if (href.indexOf('screen=am_village') < 0 || href.indexOf('mode=queue') < 0 || href.indexOf('template=') < 0) {
    alert('This script must be ran while editing a construction template in the account manager!');
    exit();
}

var labelToCanonicalNameMap = {
    'Headquarters': 'main',
    'Barracks': 'barracks',
    'Stable': 'stable',
    'Workshop': 'garage',
    'Watchtower': 'watchtower',
    'Church': 'church',
    'Academy': 'snob',
    'Smithy': 'smith',
    'Rally point': 'place',
    'Statue': 'statue',
    'Market': 'market',
    'Timber camp': 'wood',
    'Clay pit': 'stone',
    'Iron mine': 'iron',
    'Farm': 'farm',
    'Warehouse': 'storage',
    'Hiding place': 'hide',
    'Wall': 'wall'
};

function getCurrentConstructionEntries() {
    var entries = [];
    $('a[class*=building-]').each((i, el) => {
        var $label = $(el);
        var $count = $label.next('.level_relative');

        var label = $label.text();
        var count = $count.text().match(/\+(\d+)/)[1];
        if (!labelToCanonicalNameMap[label]) {
            debugger;
        }
        entries.push({
            label: label,
            count: count,
            name: labelToCanonicalNameMap[label]
        });
    });
    console.log('Got construction entries: ', entries);
    return entries;
}

function parseConstructionString(text) {
    console.log('Parsing construction text');
    text = text.replace('[spoiler]', '').replace('[/spoiler]', '');
    console.log('Trimmed BB-code')

    var result = [];
    var matcher = /([^\+;]+)\+(\d+)/g;
    var match;
    while (match = matcher.exec(text)) {
        if (!match[1] || !match[2]) {
            console.warn('Incomplete regex match for line ' + text);
        }
        var canonicalName = labelToCanonicalNameMap[match[1]]
        if (!canonicalName) {
            console.log('Unable to get canonical name for building name: ', match[1]);
        }
        result.push({
            label: match[1],
            count: parseInt(match[2]),
            name: canonicalName
        });
    }
    console.log('Parsed construction string: ', result)
    return result;
}

function makeConstructionString(commands) {
    var result = [];
    commands.forEach((cmd) => {
        result.push(`${cmd.label}+${cmd.count}`);
    });
    return '[spoiler]' + result.join(';') + '[/spoiler]';
}

function updateTemplateWithEntries(entries) {
    $('a[class*=building-]').closest('.vis_item').remove();
    var $target = $('#template_queue');
    entries.forEach(command => {
        console.log('Sending account manager command: ', command);
        Accountmanager.addQueueItem(command.name, command.label, command.count, false);
    });
}




$('#vbe-container').remove();

var $container = $(`
    <div id="vbe-container">
        <input type="button" id="vbe-save" value="Export"> <input type="text" id="vbe-save-output">
        <br>
        <input type="button" id="vbe-load" value="Import"> <input type="text" id="vbe-load-input">
    </div>
`.trim());

$container.find('#vbe-save').click(() => {
    var commandText = makeConstructionString(getCurrentConstructionEntries());
    $('#vbe-save-output').val(commandText);
});

$container.find('#vbe-load').click(() => {
    var commandText = $('#vbe-load-input').val();
    if (!commandText.trim().length) {
        alert('No text was entered');
        return;
    }

    var originalBuild = getCurrentConstructionEntries();
    try {
        updateTemplateWithEntries(parseConstructionString(commandText));
    } catch (ex) {
        console.warn('Exception occurred while trying to parse construction string: ', ex);
        updateTemplateWithEntries(originalBuild);
        alert("Couldn't understand the imported text");
    }
});

$container.insertAfter('#content_value h3');





// TW Accountmanager.addQueueItem
function addQueueItem(buildingType, buildingLabel, numUpgrades, error) { // is it 'error'?
    // ...
}

//# sourceURL=https://tylercamp.me/tw/villa-build-export.js