javascript:
if (window.location.href.indexOf('screen=overview_villages&mode=combined') < 0) {
    //relocate
    window.location.assign(game_data.link_base_pure + "overview_villages&mode=combined");
}
else {
    //made by Sophie "Shinko to Kuma"
    //declaring base variables
    var msPerSec = 1000;
    var secsPerMin = 60;
    var minsPerHour = 60;
    var hrsPerDay = 24;
    var msPerMin = msPerSec * secsPerMin;
    var msPerHour = msPerMin * minsPerHour;
    var msPerDay = msPerHour * hrsPerDay;
    var minsPerDay = hrsPerDay * minsPerHour;
    var defaultDate = new Date();

    var coordListOwn = [];
    var testDistances = [];
    var timedFakeList = [];
    var units;
    var ramSpeed;
    var ramSpeedMs;
    $.get("/interface.php?func=get_unit_info", function (data) {
        units = data;
    })
        .done(function () {
            ramSpeed = $(units).find("catapult speed").text()
            ramSpeedMs = ramSpeed * 60 * 1000;
        });




    // colors for UI
    var backgroundColor = "#36393f";
    var borderColor = "#3e4147";
    var headerColor = "#202225";
    var titleColor = "#ffffdf";

    //classes CSS
    cssClassesSophie = `
        <style>
        .sophRowA {
        background-color: #32353b;
        color: white;
        }
        .sophRowB {
        background-color: #36393f;
        color: white;
        }
        .sophHeader {
        background-color: #202225;
        font-weight: bold;
        color: white;
        }
        </style>`
    $(".content-border").eq(0).prepend(cssClassesSophie);
    $("#mobileHeader").eq(0).prepend(cssClassesSophie);
    defaultDate.setTime(((Math.floor(defaultDate.getTime() / msPerDay) + 1) * minsPerDay + defaultDate.getTimezoneOffset()) * msPerMin);
    defaultDate = defaultDate.toString().replace(/\w+\s*/i, "").replace(/(\d*:\d*:\d*)(.*)/i, "$1");

    if (localStorage.getItem("timedFakeDate") == null) {
        console.log("No date found, making new one")
        localStorage.setItem("timedFakeDate", defaultDate);
    }
    else {
        console.log("Date found, checking if older than right now");
        lastDate = localStorage.getItem("timedFakeDate");
        if (Date.parse(lastDate) < Date.parse(defaultDate)) {
            console.log("last date is older than right now: "+ defaultDate);

            localStorage.setItem("timedFakeDate", defaultDate);
        }
        else {
            console.log("keep last date: "+ lastDate);
            defaultDate = lastDate;
            localStorage.setItem("timedFakeDate", defaultDate);
        }
    }
    $("#arrival_time").value=defaultDate;

    // calculate distances between two coordinates
    function calculateDistance(to, from) {
        var target = extractCoords(to).match(/(\d+)\|(\d+)/);
        var source = extractCoords(from).match(/(\d+)\|(\d+)/);
        var fields = Math.sqrt(Math.pow(source[1] - target[1], 2) + Math.pow(source[2] - target[2], 2));

        return fields;
    }

    //extract coordinates out of text
    function extractCoords(src) {
        var loc = src.match(/\d+\|\d+/ig);
        return (loc ? loc[loc.length - 1] : null);
    }

    //compare dates in unicode
    function compareDates(x) {
        var start = x,
            end = new Date(),
            diff = new Date(end - start),
            hours = diff / 1000 / 60 / 60;
        return hours;
    }

    function createDateBox() {
        Dialog.show("Content", `
    <div>
        <table id="dateBox" class="sophHeader">
            <tr>
                <td colspan="2" style="text-align:center">Mass timed fake finder</td>
            </tr>
            <tr>
                <td class="sophHeader">Target Villages:</td>
                <td class="sophRowA"><textarea id="targetCoordinates" value="Insert list of coordinates here." class="text-input" rows="6" cols="50" onFocus="this.select()" /></td>
            </tr>
            <tr>
                <td class="sophHeader">Hit time:</td>
                <td class="sophRowB"><input id="arrival_time" size="25" class="text-input" value="${defaultDate}"/></td>
            </tr>
            <tr>
                <td class="sophHeader"></td>
                <td class="sophRowA"><input type="button" class="btn-confirm-yes" value="Go" onClick="calculateTimedAttacks()" /></td>
            </tr>
        </table>
    </div>
`)
    }

    function calculateTimedAttacks() {
        console.log("Storing landing time");
        localStorage.setItem("timedFakeDate", new Date($("#arrival_time")[0].value));
        grabVillageData();
        //grab target coordinates
        targetCoords = parseCoordinates();
        //grab target time
        landTime = new Date($("#arrival_time")[0].value);

        //grab servertime from page
        serverTimeTemp = $("#serverDate")[0].innerText + " " + $("#serverTime")[0].innerText;
        serverTime = serverTimeTemp.match(/^([0][1-9]|[12][0-9]|3[01])[\/\-]([0][1-9]|1[012])[\/\-](\d{4})( (0?[0-9]|[1][0-9]|[2][0-3])[:]([0-5][0-9])([:]([0-5][0-9]))?)?$/);
        serverDate = Date.parse(serverTime[2] + "/" + serverTime[1] + "/" + serverTime[3] + serverTime[4]);

        //cycle through all the villages
        for (var i = 0; i < coordListOwn.length; i++) {
            //get distances between the village and each target
            for (var j = 0; j < targetCoords.length; j++) {
                tempDistance = calculateDistance(targetCoords[j], coordListOwn[i].Coord);
                testDistances.push({ "source": coordListOwn[i], "target": targetCoords[j], "distance": tempDistance })
            }
        }
        testDistances.sort((a, b) => (parseInt(a.distance) > parseInt(b.distance)) ? 1 : -1)

        //check runtimes for available units
        for (var i = 0; i < testDistances.length; i++) {
            if (testDistances[i].source.Units.ram > 0 || testDistances[i].source.Units.catapult > 0) {
                //found catapult/ram in source

                //time till launch
                launchTime = landTime - (testDistances[i].distance * ramSpeedMs);
                timeTillLaunch = launchTime - serverDate;
                if (timeTillLaunch > 0) {
                    //time left till fake window
                    timedFakeList.push({ "source": testDistances[i].source, "target": testDistances[i].target, "distance": testDistances[i].distance, "timeTillFake": timeTillLaunch });
                }

            }
        }
        timedFakeList.sort((a, b) => (parseInt(a.timeTillFake) > parseInt(b.timeTillFake)) ? 1 : -1);
        Dialog.close();
        html = `
    <div>
        <table class="sophHeader">
            <tr class="sophHeader">
                <td colspan="5" style="text-align:center">Mass timed fake finder</td>
            </tr>
            <tr class="sophHeader">
                <td>Source</td>
                <td>Target</td>
                <td>Distance</td>
                <td>Launch time from now</td>
                <td>Link to rally page</td>
            </tr>`;
        for (var i = 0; i < timedFakeList.length; i++) {
            if (i % 2 == 0) {
                tempRow = " id='" + i + "' class='sophRowB'";
            }
            else {
                tempRow = " id='" + i + "' class='sophRowA'";
            }
            tempSecs = Math.floor(parseInt(timedFakeList[i].timeTillFake) / 1000) % 60;
            if (tempSecs < 10) tempSecs = "0" + tempSecs;
            tempMins = Math.floor(parseInt(timedFakeList[i].timeTillFake) / 1000 / 60);
            tempHours = Math.floor(tempMins / 60);
            tempMins = tempMins % 60;
            if (tempMins < 10) tempMins = "0" + tempMins;
            html += `
        <tr ${tempRow}>
            <td><a href="/game.php?&screen=info_village&id=${timedFakeList[i].source.ID}">${timedFakeList[i].source.Coord}</a></td>
            <td>${timedFakeList[i].target}</td>
            <td>${Math.round(timedFakeList[i].distance)}</td>
            <td>${tempHours + ":" + tempMins + ":" + tempSecs}</td>
            <td onclick="openRallyPage(${timedFakeList[i].source.ID},${timedFakeList[i].target.match(/(\d+)\|(\d+)/)[1]},${timedFakeList[i].target.match(/(\d+)\|(\d+)/)[2]})" style="cursor: pointer;"><font color="#40D0E0">Go to rally point</font></td>
        </tr>`
        }
        html += "</table></div>";
        Dialog.show("Content", html);
    }




    function grabVillageData() {
        //grab village data
        for (var i = 1; i < $("#combined_table tr").length; i++) {
            tempID = $($("#combined_table tr")[i].children[1].children[0]).attr("data-id");
            tempCoord = $("#combined_table tr")[i].children[1].innerText.match(/(\d+\|\d+)/)[0];
            tempUnits = {};
            for (var j = 0; j < game_data.units.length; j++) {
                tempUnits[game_data.units[j]] = $("#combined_table tr")[i].children[8 + j].innerText;
            }
            coordListOwn.push({ "ID": tempID, "Coord": tempCoord, "Units": tempUnits });
        }
    }

    function parseCoordinates() {
        //grab coordinates from textarea
        targetCoords = $("#targetCoordinates")[0].value.match(/\d+\|\d+/g);
        return targetCoords;
    }

    createDateBox();


    function openRallyPage(sourceID, x, y) {
        //<a href="/game.php?village=${timedFakeList[i].source.ID}&screen=place&target=${timedFakeList[i].targetID}"></a>


        temp = $.get("/game.php?village=" + sourceID + "&screen=api&ajax=target_selection&input=" + x + "|" + y + "&type=coord&request_id=1&limit=5&offset=0", function (data) {
            temp = JSON.parse(data);
        })
            .done(function (page) {
                window.open("/game.php?village=" + sourceID + "&screen=place&target=" + temp.villages[0].id, '_blank');
            });

    }
}