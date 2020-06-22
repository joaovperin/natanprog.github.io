javascript:

    // Shinko To Kuma


    var doc = document;
if (window.frames.length > 0 && window.main != null) doc = window.main.document;
var url = doc.URL;
if (url.indexOf('screen=place&mode=scavenge') == -1) window.location.assign("/game.php?screen=place&mode=scavenge");

var spears = document.getElementsByClassName("units-entry-all")[0].innerHTML;
spears = spears.substr(1, spears.length - 2);
spears = Math.max(spears - lance,0);

var swords = document.getElementsByClassName("units-entry-all")[1].innerHTML;
swords = swords.substr(1, swords.length - 2);
swords = Math.max(swords - epee,0);

var axes = document.getElementsByClassName("units-entry-all")[2].innerHTML;
axes = axes.substr(1, axes.length - 2);
axes = Math.max(axes - hache,0);

var lightC = document.getElementsByClassName("units-entry-all")[3].innerHTML;
lightC = lightC.substr(1, lightC.length - 2);
lightC = Math.max(lightC - leger,0);

var heavyC = document.getElementsByClassName("units-entry-all")[4].innerHTML;
heavyC = heavyC.substr(1, heavyC.length - 2);
heavyC = Math.max(heavyC - lourd,0);


var scavengeOptions;



scavengeOptions = {
    'Collecte massive': [{
            type: 'spear',
            count: spears * (1 / 13)
        },
        {
            type: 'sword',
            count: swords * (1 / 13)
        },
        {
            type: 'axe',
            count: axes * (1 / 13)
        },
        {
            type: 'light',
            count: lightC * (1 / 13)
        },
        {
            type: 'heavy',
            count: heavyC * (1 / 13)
        },
    ],
    'Grosse collecte': [{
            type: 'spear',
            count: spears / (12 / 13) * (3 / 26)
        },
        {
            type: 'sword',
            count: swords / (12 / 13) * (3 / 26)
        },
        {
            type: 'axe',
            count: axes / (12 / 13) * (3 / 26)
        },
        {
            type: 'light',
            count: lightC / (12 / 13) * (3 / 26)
        },
        {
            type: 'heavy',
            count: heavyC / (12 / 13) * (3 / 26)
        },
    ],
    'Collecte moyenne': [{
            type: 'spear',
            count: spears / (21 / 26) * (3 / 13)
        },
        {
            type: 'sword',
            count: swords / (21 / 26) * (3 / 13)
        },
        {
            type: 'axe',
            count: axes / (21 / 26) * (3 / 13)
        },
        {
            type: 'light',
            count: lightC / (21 / 26) * (3 / 13)
        },
        {
            type: 'heavy',
            count: heavyC / (21 / 26) * (3 / 13)
        },
    ],
    'Petite collecte': [{
            type: 'spear',
            count: spears
        },
        {
            type: 'sword',
            count: swords
        },
        {
            type: 'axe',
            count: axes
        },
        {
            type: 'light',
            count: lightC
        },
        {
            type: 'heavy',
            count: heavyC
        },
    ],
};


var unitsCapacity = {
    'spear': 25,
    'sword': 15,
    'axe': 10,
    'light': 80,
    'heavy': 50,
    'knight': 100
}

run();


function run() {
    let btn = null;
    for (var option in scavengeOptions) {
        btn = findNextButton(option);

        if (btn) {
            fillInTroops(option, getAvailableUnits(), btn);
            break;
        }
    }

}

function fillInTroops(option, availableUnits, button) {
    scavengeOptions[option].forEach(units => {
        var type = units.type;
        var count = units.count;
        let requiredCapacity = availableUnits[type] < count ? availableUnits[type] : count;

        $(`input.unitsInput[name='${type}']`).val(requiredCapacity).trigger("change");
        $(button).focus();
    });
}

function findNextButton(option) {
    let btn = $(`.scavenge-option:contains("${option}")`).find('a:contains("Start")');
    if (btn.length > 0 && !$(btn).hasClass('btn-disabled')) return btn;
}

function getAvailableUnits() {
    let availableUnits = {};

    $('.units-entry-all').each((i, e) => {
        var unitName = $(e).attr("data-unit");
        var count = $(e).text().replace(/[()]/, '');
        availableUnits[unitName] = parseInt(count);
    });

    return availableUnits;
}