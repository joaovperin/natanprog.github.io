var sourceText = null;
var locationType = null;
var _href = window.top.location.href;
if (_href.indexOf('screen=overview') >= 0) {
    // village overview
    var unitData = [];
    window.top.$('#show_units .vis td')
        .filter((i, el) => $(el)
            .text()
            .indexOf("recruit") < 0)
        .each((i, el) => {
            var unit = $(el)
                .text()
                .trim();
            unitData.push(unit)
        });
    
    sourceText = unitData.join('\n');
    locationType = 'Village Overview';
}
else
if (_href.indexOf('screen=place') > 0) {
    // rally point
    var _un = [];
    $('input[id^=unit_]')
        .each((i, el) => {
            _un.push(/unit_input_(\w+)/.exec(el.id)[1] + ' ' + (el.value || '0'))
        });

    sourceText = _un.join('\n');
    locationType = 'Rally Point';
}
if (!sourceText) {
    alert("Can't open this page in Army Calculator");
} else {
    var villageName = $('#menu_row2').find('a.nowrap').text();

    sourceText = `
    # From ${villageName} - ${locationType}
    # ${window.location.href}

    ${sourceText}
    `.replace(/    /g, '');

    function getStructureLevel(name) {
        var selector = `.visual-label-${name} > a`;
        var el = document.querySelector(selector);
        if (el) {
            return el.innerText.split('\n')[0];
        } else {
            return 0;
        }    
    }

    var data = {
        worldSpeed: 2,
        structures: {
            "Barracks": getStructureLevel("barracks"),
            "Stable": getStructureLevel("stable"),
            "Workshop": getStructureLevel("garage"),
            "Academy": getStructureLevel("snob")
        },
        text: sourceText
    };

    var sourceUrl = `https://tylercamp.me/tw/#${btoa(JSON.stringify(data))}`;
    window.open(sourceUrl, null, 'width=650,height=350,resizable=1 ');
}
//# sourceURL=https://tylercamp.me/tw/open-in-ac.js