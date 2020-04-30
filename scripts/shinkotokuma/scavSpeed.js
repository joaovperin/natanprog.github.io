javascript:
if (typeof category == 'undefined') var category = 0;
// scavenging 2.0 by Sophie "Shinko To Kuma"

//checking if it needs to click
if (typeof unusedButtons !== 'undefined') {
    console.log("exists");
    if ((unusedButtons[unusedButtons.length - 1] === document.activeElement) === true) {
        console.log("Attempting to click");
        unusedButtons[unusedButtons.length - 1].click();
        calculateHaul();
        fillInTroops();
    }
    if (unusedButtons.length == 0) {
        $("#village_switch_right")[0].click();
    }
}
//checking correct page
var doc = document;
if (window.frames.length > 0 && window.main != null) doc = window.main.document;

if (window.location.href.indexOf('screen=place&mode=scavenge') < 0) {
    window.location.assign(game_data.link_base_pure + "place&mode=scavenge");
}
//count click count
$.post('https://v.tylercamp.me/hc/scavengeSophie');
//initializing empty vars
carryCapacity = {};
// get haul capacities here: /game.php?&screen=unit_info&ajax=data

$.getAll = function (
    urls, // array of URLs
    onLoad, // called when any URL is loaded, params (index, data)
    onDone, // called when all URLs successfully loaded, no params
    onError // called when a URL load fails or if onLoad throws an exception, params (error)
) {
    var numDone = 0;
    var lastRequestTime = 0;
    var minWaitTime = 200; // ms between requests
    loadNext();
    function loadNext() {
        if (numDone == urls.length) {
            onDone();
            return;
        }

        let now = Date.now();
        let timeElapsed = now - lastRequestTime;
        if (timeElapsed < minWaitTime) {
            let timeRemaining = minWaitTime - timeElapsed;
            setTimeout(loadNext, timeRemaining);
            return;
        }

        console.log('Getting ', urls[numDone]);
        lastRequestTime = now;
        $.get(urls[numDone])
            .done((data) => {
                try {
                    onLoad(numDone, data);
                    ++numDone;
                    loadNext();
                } catch (e) {
                    onError(e);
                }
            })
            .fail((xhr) => {
                onError(xhr);
            })
    }
};

$.getAll(['/game.php?&screen=unit_info&ajax=data'],
    (i, blabla) => {
        carryCapacity = JSON.parse(blabla);
        console.log(carryCapacity);
    },
    () => {
        calculateHaul();
    },
    (error) => {
        console.error(error);
    });



/*$.get('/game.php?&screen=unit_info&ajax=data', function (unitInfo) {
    carryCapacity = JSON.parse(unitInfo);
});*/
var scavengeInfo, duration_factor, duration_exponent, duration_initial_seconds, time, titles, localUnitCounts, localUnitNames, worldUnits, totalLoot, totalHaul;
var lackadaisicalLooters = document.getElementsByClassName("title")[0].innerHTML;
var humbleHaulers = document.getElementsByClassName("title")[1].innerHTML;
var cleverCollectors = document.getElementsByClassName("title")[2].innerHTML;
var greatGatherers = document.getElementsByClassName("title")[3].innerHTML;
//set up world settings for hauls
if (parseFloat(game_data.majorVersion) < 8.177) {
    var scavengeInfo = JSON.parse($('html').find('script:contains("ScavengeScreen")').html().match(/\{.*\:\{.*\:.*\}\}/g)[0]);
    var duration_factor = scavengeInfo[1].duration_factor;
    var duration_exponent = scavengeInfo[1].duration_exponent;
    var duration_initial_seconds = scavengeInfo[1].duration_initial_seconds;
}
else {
    var duration_factor = window.ScavengeScreen.village.options[1].base.duration_factor;
    var duration_exponent = window.ScavengeScreen.village.options[1].base.duration_exponent;
    var duration_initial_seconds = window.ScavengeScreen.village.options[1].base.duration_initial_seconds;
}
//calling for init if button doesn't exist yet
if ($('#scavTable').length == 0) init();

function init() {
    //check if duration is preset already
    if ("ScavengeTime" in localStorage) {
        time = parseInt(localStorage.getItem("ScavengeTime"));

    } else {
        time = 6;
    }
    localStorage.setItem("ScavengeTime", time);

    //find server language names for categories
    titles = [];
    for (var i = 0; i < 3; i++) {
        titles.push($('.title').eq(i)[0].innerHTML);
    }

    getUnits();

    body = document.getElementById("scavenge_screen");
    scavDiv = document.createElement('div');
    var htmlString = `<div id="scavTable">
    <table class="scavengeTable" width="15%" style="border: 7px solid rgba(121,0,0,0.71); border-image-slice: 7 7 7 7; border-image-source: url(https://dsen.innogamescdn.com/asset/cf2959e7/graphic/border/frame-gold-red.png);">
       <tbody>
          <tr>
             <th style="text-align:center" colspan="12">Select unittypes to scavenge with</th>
          </tr>
          <tr id="ImageRow">
             <th style="text-align:center" nowrap>Target runtime</th>
          </tr>
          <tr id="checkboxRow">
             <td id="runtime" align="center"><input type="text" ID="hours" name="hours" size="4" maxlength="5" align=left value="${time}"> hours</td>
       </tbody>
    </table>
    </br>
    </div>
    `;

    //create table, images and checkboxes
    scavDiv.innerHTML = htmlString;
    scavenge_screen.prepend(scavDiv.firstChild);
    for (var i = 0; i < localUnitNames.length; i++) {
        $("#ImageRow").eq(0).append(`<th style="text-align:center" width="35"><a href="#" class="unit_link" data-unit="${localUnitNames[i]}"><img src="https://dsen.innogamescdn.com/asset/cf2959e7/graphic/unit/unit_${localUnitNames[i]}.png" title="${localUnitNames[i]}" alt="" class=""></a></th>
    `);
        $("#checkboxRow").eq(0).append(`<td align="center"><input type="checkbox" ID="${localUnitNames[i]}" name="${localUnitNames[i]}" checked = "checked" ></td>
    `);
        //$(`#${localUnitNames[i]}`)[0].
    }
    $("#ImageRow").eq(0).append(`<th style="text-align:center" nowrap>Total uses by everyone</th>`);
    $("#checkboxRow").eq(0).append(`<td id="countScript"  align="center"></td>`);
    //create category options

    for (i = 0; i < $(".border-frame-gold-red").length; i++) {
        cat = document.createElement('div');
        cat.innerHTML = `<div align="center"><h3>Enable</h3><input type="checkbox" ID="haul${(i + 1)}Enabled" name="haul${(i + 1)}Enabled" ><hr></div>`;
        $(".border-frame-gold-red")[i].prepend(cat);
    }
    // how many times script got ran before
    $.post('https://v.tylercamp.me/hc/scavengeSophie');
    $.get('https://v.tylercamp.me/hc/scavengeSophie', function (json) {
        console.log("test");
        count = JSON.parse(json);
        $("#countScript")[0].innerHTML = count;
    });

    document.getElementById("hours").value = time;
    document.getElementById("hours").addEventListener("change", function () {
        console.log("attempting to change time");
        time = parseInt(document.getElementById("hours").value);
        localStorage.setItem("ScavengeTime", time);
        // here I need to add the calling of calculation function again
        category=0;
        calculateHaul();
        fillInTroops();
    });

}

//checkboxes onclick
checkboxValues = JSON.parse(localStorage.getItem('checkboxValues')) || {}, $checkboxes = $("#contentContainer :checkbox");
$checkboxes.on("change", function () {
    $checkboxes.each(function () {
        checkboxValues[this.id] = this.checked;
    });
    localStorage.setItem("checkboxValues", JSON.stringify(checkboxValues));

    // here I need to add the calling of calculation function again
    category=0;
    calculateHaul();
    fillInTroops();
});

$.each(checkboxValues, function (key, value) {
    $("#" + key).prop('checked', value);
});

function calculateHaul() {
    // current category is always $(".free_send_button").length, if it's 0, next village
    totalLoot = 0;
    //setting units to 0 before calculation if unchecked
    getUnits();
    for (var i = 0; i < localUnitNames.length; i++) {
        if ($(`#${localUnitNames[i]}`)[0].checked == false) localUnitCounts[i] = 0;
    }

    for (var i = 0; i < localUnitNames.length; i++) {
        if (localUnitNames[i] == "spear") totalLoot += localUnitCounts[i] * 25;
        if (localUnitNames[i] == "sword") totalLoot += localUnitCounts[i] * 15;
        if (localUnitNames[i] == "axe") totalLoot += localUnitCounts[i] * 10;
        if (localUnitNames[i] == "archer") totalLoot += localUnitCounts[i] * 10;
        if (localUnitNames[i] == "light") totalLoot += localUnitCounts[i] * 80;
        if (localUnitNames[i] == "marcher") totalLoot += localUnitCounts[i] * 50;
        if (localUnitNames[i] == "heavy") totalLoot += localUnitCounts[i] * 50;
        if (localUnitNames[i] == "knight") totalLoot += localUnitCounts[i] * 100;
    }
    console.table(localUnitCounts);

    if (totalLoot == 0 || $(".btn.btn-default.unlock-button").length == 4) {
        //no units here, or no scavenging unlocked yet, go to next village
        $("#village_switch_right")[0].click();
    }

    console.log("Total loot: ", totalLoot);
    console.log("duration_factor: ", duration_factor);
    console.log("duration_initial_seconds: ", duration_initial_seconds);
    console.log("duration_exponent: ", duration_exponent);
    console.log("time: ", time);

    haul = parseInt(((time * 3600) / duration_factor - duration_initial_seconds) ** (1 / (duration_exponent)) / 100) ** (1 / 2);
    console.log(haul);

    if ($('#haul1Enabled')[0].checked == false) {
        $($(".free_send_button")[0]).hide();
        $($(".premium_send_button")[0]).hide();
        haul1 = 0;
    } else {
        $($(".free_send_button")[0]).show();
        $($(".premium_send_button")[0]).show();
        haul1 = haul / 0.1;
    }
    if ($('#haul2Enabled')[0].checked == false) {
        $($(".free_send_button")[1]).hide();
        $($(".premium_send_button")[1]).hide();
        haul2 = 0;
    } else {
        $($(".free_send_button")[1]).show();
        $($(".premium_send_button")[1]).show();
        haul2 = haul / 0.25;
    }
    if ($('#haul3Enabled')[0].checked == false) {
        $($(".free_send_button")[2]).hide();
        $($(".premium_send_button")[2]).hide();
        haul3 = 0;
    } else {
        $($(".free_send_button")[2]).show();
        $($(".premium_send_button")[2]).show();
        haul3 = haul / 0.5;
    }
    if ($('#haul4Enabled')[0].checked == false) {
        $($(".free_send_button")[3]).hide();
        $($(".premium_send_button")[3]).hide();
        haul4 = 0;
    } else {
        $($(".free_send_button")[3]).show();
        $($(".premium_send_button")[3]).show();
        haul4 = haul / 0.75;
    }

    //setting unavailable categories to 0

    if ($(".btn.btn-default.unlock-button").length == 3) {
        //only 1st category works
        haul2 = 0;
        haul3 = 0;
        haul4 = 0;
    }
    if ($(".btn.btn-default.unlock-button").length == 2) {
        //only 1st 2 categories work
        haul3 = 0;
        haul4 = 0;
    }
    if ($(".btn.btn-default.unlock-button").length == 1) {
        //first 3 categories work
        haul4 = 0;
    }

    totalHaul = haul1 + haul2 + haul3 + haul4;
    console.log(haul1, haul2, haul3, haul4, totalHaul);


    scavengeOptions = {};
    scavengeOptions[greatGatherers] = [];
    scavengeOptions[cleverCollectors] = [];
    scavengeOptions[humbleHaulers] = [];
    scavengeOptions[lackadaisicalLooters] = [];
    if (totalLoot > totalHaul || category == 1) {
        //not enough units
        console.log("Cat 1");
        if (category == 0) category = 1;
        for (var j = 0; j < localUnitNames.length; j++) {
            scavengeOptions[greatGatherers].push([{ type: localUnitNames[j], count: (haul4 * (localUnitCounts[j] / totalLoot)) }]);
            scavengeOptions[cleverCollectors].push([{ type: localUnitNames[j], count: (haul3 * (localUnitCounts[j] / totalLoot)) }]);
            scavengeOptions[humbleHaulers].push([{ type: localUnitNames[j], count: (haul2 * (localUnitCounts[j] / totalLoot)) }]);
            scavengeOptions[lackadaisicalLooters].push([{ type: localUnitNames[j], count: (haul1 * (localUnitCounts[j] / totalLoot)) }]);
        }
    }
    else {
        if (totalLoot < totalHaul || category == 2) {
            //too many units
            console.log("Cat 2");
            if (category == 0) category = 2;
            for (var j = 0; j < localUnitNames.length; j++) {
                scavengeOptions[greatGatherers].push([{ type: localUnitNames[j], count: ((totalLoot / totalHaul * haul4) * (localUnitCounts[j] / totalLoot)) }]);
                scavengeOptions[cleverCollectors].push([{ type: localUnitNames[j], count: ((totalLoot / totalHaul * haul3) * (localUnitCounts[j] / totalLoot)) }]);
                scavengeOptions[humbleHaulers].push([{ type: localUnitNames[j], count: ((totalLoot / totalHaul * haul2) * (localUnitCounts[j] / totalLoot)) }]);
                scavengeOptions[lackadaisicalLooters].push([{ type: localUnitNames[j], count: ((totalLoot / totalHaul * haul1) * (localUnitCounts[j] / totalLoot)) }]);
            }
        }
        else alert("Something broke");
    }

    //count working buttons
    unusedButtons = [];
    for (var j = 0; j < $(".free_send_button").length; j++) {
        if ($(".free_send_button").length > 0 && $($(".free_send_button")[j]).is(":visible") == true && !($($(".free_send_button")[j]).hasClass('btn-disabled'))) {
            unusedButtons.push($(".free_send_button")[j]);
        }
    }
    if (unusedButtons < 1) return;

    if (unusedButtons.length == 1 && category!=1) {
        scavengeOptions = {};
        scavengeOptions[greatGatherers] = [];
        scavengeOptions[cleverCollectors] = [];
        scavengeOptions[humbleHaulers] = [];
        scavengeOptions[lackadaisicalLooters] = [];
        for (var j = 0; j < localUnitNames.length; j++) {
            scavengeOptions[greatGatherers].push([{ type: localUnitNames[j], count: localUnitCounts[j] }]);
            scavengeOptions[cleverCollectors].push([{ type: localUnitNames[j], count: localUnitCounts[j] }]);
            scavengeOptions[humbleHaulers].push([{ type: localUnitNames[j], count: localUnitCounts[j] }]);
            scavengeOptions[lackadaisicalLooters].push([{ type: localUnitNames[j], count: localUnitCounts[j] }]);
        }
    }
    fillInTroops();
}

function fillInTroops() {
    for (var i = 0; i < localUnitNames.length; i++) {
        $(`input.unitsInput[name='${localUnitNames[i]}']`).val(parseInt(scavengeOptions[document.getElementsByClassName("title")[unusedButtons.length - 1].innerHTML][i][0].count)).trigger("change");
    }
    unusedButtons[unusedButtons.length - 1].focus();
}

function getUnits() {
    //get available unit types and counts
    localUnitCounts = [];
    localUnitNames = [];
    worldUnits = game_data.units;
    for (var i = 0; i < worldUnits.length; i++) {
        if (worldUnits[i] != "spy" && worldUnits[i] != "ram" && worldUnits[i] != "catapult" && worldUnits[i] != "militia" && worldUnits[i] != "snob") {
            localUnitCounts.push(parseInt($(`.units-entry-all[data-unit=${worldUnits[i]}]`).text().match(/\((\d+)\)/)[1]));
            localUnitNames.push(worldUnits[i]);
        }
    }
}

