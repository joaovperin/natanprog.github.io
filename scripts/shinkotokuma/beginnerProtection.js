javascript:
if (window.location.href.indexOf('map') < 0) {
    window.location.assign(game_data.link_base_pure + "map");
}

serverTimeTemp = $("#serverDate")[0].innerText + " " + $("#serverTime")[0].innerText;
serverTime = serverTimeTemp.match(/^([0][1-9]|[12][0-9]|3[01])[\/\-]([0][1-9]|1[012])[\/\-](\d{4})( (0?[1-9]|[1][0-9]|[2][0-3])[:]([0-5][0-9])([:]([0-5][0-9]))?)?$/)
serverDate = Date.parse(serverTime[2] + "/" + serverTime[1] + "/" + serverTime[3] + serverTime[4]);
var beginnerProtection = [];
allVillages = $.find('img');
for (var i = 0; i < allVillages.length; i++) {
    //find all village ids in beginner protection
    if (allVillages[i].id.includes("map_village") && allVillages[i].src.includes("/v1_left.png") != true && allVillages[i].src.includes("/v2_left.png") != true && allVillages[i].src.includes("/v4_left.png") != true && allVillages[i].src.includes("/v3_left.png") != true && allVillages[i].src.includes("/stronghold") != true && allVillages[i].src.includes("/v5_left.png") != true && allVillages[i].src.includes("/b1_left.png") != true && allVillages[i].id.includes("map_village_undefined") != true) {
        beginnerProtection.push((allVillages[i].id).replace(/[^0-9]/gi, ''));
    }
}

var villageData = [];
//villageData
for (var property in TWMap.villages) {
    villageData.push({ "owner": TWMap.villages[property].owner, "id": TWMap.villages[property].id, "points": TWMap.villages[property].points, "xy": TWMap.villages[property].xy });
}

//find village nearby that is still in beginner protection in village array
var result = [];
for (var j = 0; j < beginnerProtection.length; j++) {
    for (var i = 0, len = villageData.length; i < len; i++) {
        if (villageData[i].id === beginnerProtection[j]) {
            result.push(villageData[i]);
        }
    }
}

//get all data for the players that are nearby
var localVillages = [];
var today = new Date();
for (var k = 0; k < result.length; k++) {
    localVillages.push({ "villageName": TWMap.villages[result[k].xy].name, "name": TWMap.players[result[k].owner].name, "points": TWMap.villages[result[k].xy].points, "ally": TWMap.players[result[k].owner].ally, "newbie": TWMap.players[result[k].owner].newbie, "owner": result[k].owner, "id": result[k].id, "xy": result[k].xy })
}
localVillagesDateOut = [];
for (var i = 0; i < localVillages.length; i++) {
    if(localVillages[i].newbie.toString().indexOf("tomorrow") == 0)
    {
        localVillagesDateOut.push(new Date("2020", today.getUTCMonth(), today.getUTCDate() + 1, localVillages[i].newbie.match(/([0-9]{2}):([0-9]{2})/)[1], localVillages[i].newbie.match(/([0-9]{2}):([0-9]{2})/)[2], "00", "000"));
    }
    if (localVillages[i].newbie.toString().indexOf("today") == 0) {
        console.log("today");
        localVillagesDateOut.push(new Date("2020", today.getUTCMonth(), today.getUTCDate(), localVillages[i].newbie.match(/([0-9]{2}):([0-9]{2})/)[1], localVillages[i].newbie.match(/([0-9]{2}):([0-9]{2})/)[2], "00", "000"));
    }
    if (localVillages[i].newbie == 0)
    {
        console.log("out of BP");
            localVillagesDateOut.push("out of BP");
    }
    if (localVillages[i].newbie != 0 && localVillages[i].newbie.indexOf("tomorrow") < 0 && localVillages[i].newbie.indexOf("today") < 0) {
        console.log("not today or tomorrow");
        localVillagesDateOut.push(new Date("2020", parseInt(localVillages[i].newbie.match(/([0-9]{2}).([0-9]{2})/)[2] - 1), localVillages[i].newbie.match(/([0-9]{2}).([0-9]{2})/)[1], localVillages[i].newbie.match(/([0-9]{2}):([0-9]{2})/)[1], localVillages[i].newbie.match(/([0-9]{2}):([0-9]{2})/)[2], "00", "000"));
    }
}

html = `<div id="beginnerProtection" class="vis" border=0>
<h2 style="text-align:center">Beginner protection finder</h2>
<p style="text-align:center"><font size="1" color="blue">Created by Sophie "Shinko to Kuma"</font></p>
<hr>
<table id="table" width="100%">
    <tbody>
        <tr>
            <th colspan=8 width=“550” style="text-align:center" ><i>Click on the category names to sort ascending/descending</i></th>
        </tr>
        <tr>
            <th width="20%" style="text-align:center" onclick="sortTable(0)">Player</th>
            <th width="20%" style="text-align:center" onclick="sortTable(1)">Village name</th>
            <th width="8%" style="text-align:center" onclick="sortTable(2)">Tribe</th>
            <th width="6%" style="text-align:center" onclick="sortTableTest(3)">Pts.</th>
            <th width="8%" style="text-align:center" onclick="sortTable(4)">Coordinate</th>
            <th width="6%" style="text-align:center" onclick="sortTableTest(5)">Dist.</th>
            <th width="20%" style="text-align:center" onclick="sortTable(6)"> Out of BP</th>
            <th width="12%" style="text-align:center" onclick="sortTableTest(8)">Time left</th>
            <th width="2%" style="display:none">Test</th>
        </tr>
    `
//add rows with data
for (var i = 0; i < localVillages.length; i++) {
    // if tribe /= own
    ignore = false;
    if (TWMap.allies[localVillages[i].ally] != undefined) {
        tribesToIgnore = [];
        // ignore own tribe
        tribesToIgnore.push(game_data.player.ally);

        //find all NAP and allies
        for (var property in TWMap.allyRelations) {
            if (TWMap.allyRelations[property] == "nap" || TWMap.allyRelations[property] == "ally") {
                tribesToIgnore.push(property);
            }
        }
        for (var j = 0; j < tribesToIgnore.length; j++) {
            if (localVillages[i].ally == tribesToIgnore[j]) {
                ignore = true;
            }
        }

        tempTribe = TWMap.allies[localVillages[i].ally].tag;
        tempURL = "<a href='/game.php?&screen=info_ally&id=${localVillages[i].id}'>"
    }
    else {
        tempTribe = "None";
        tempURL = "";
    }
    if (ignore == true) {
        console.log("ally/nap/own tribe, skipping");
    }
    else {

        var tempDate;
        var tempRow;
        if (i % 2 == 0) {
            tempRow = "class='row_b'";
        }
        else {
            tempRow = "class='row_a'";
        }


        if (localVillagesDateOut[i] != "out of BP") {
            //create date
            tempDate = localVillagesDateOut[i].getUTCDate() + "/" + (localVillagesDateOut[i].getUTCMonth() + 1) + "/2020 "
            if (localVillagesDateOut[i].getUTCHours()+2<10) {
                tempDate += "0" + (localVillagesDateOut[i].getUTCHours()+2);
            }
            else {
                tempDate += localVillagesDateOut[i].getUTCHours()+2;
            }
            tempDate += ":"
            if (localVillagesDateOut[i].getUTCMinutes() < 10) {
                tempDate += "0" + localVillagesDateOut[i].getUTCMinutes();
            }
            else {
                tempDate += localVillagesDateOut[i].getUTCMinutes();
            }

            tempHours = Math.abs(compareDates(localVillagesDateOut[i]))*60;

            tempHoursLeft = timeConvert(Math.abs(compareDates(localVillagesDateOut[i])));

        }
        else {
            tempDate = "Out of BP";
            tempHoursLeft = "0";
            tempHours = "0";
        }

        tempCoord = localVillages[i].xy.toString().substring(0, 3) + "|" + localVillages[i].xy.toString().substring(3, 7);

        html += `<tr ${tempRow}>   
                <td style="text-align:center"><a href="/game.php?&screen=info_player&id=${localVillages[i].owner}">${localVillages[i].name}</th>
                <td style="text-align:center"><a href="/game.php?&screen=place&target=${localVillages[i].id}">${localVillages[i].villageName}</th>
                <td style="text-align:center">${tempURL}${tempTribe}</th>
                <td style="text-align:center">${localVillages[i].points}</th>
                <td style="text-align:center">${localVillages[i].xy.toString().substring(0, 3)}|${localVillages[i].xy.toString().substring(3, 7)}</th>
                <td style="text-align:center">${Math.round(calculateDistance(tempCoord, game_data.village.coord))}</th>
                <td style="text-align:center">${tempDate}</th>
                <td style="text-align:center">${tempHoursLeft}</th>
                <td style="display:none" >${tempHours}</th>
            </tr>`
    }
}

html += `
        </tbody>
        </table>
        </div>`


Dialog.show("html", html);
sortTableTest(8);
formatTable();
function compareDates(x) {
    var start = x,
        end = serverDate,
        diff = new Date(end - start),
        hours = diff / 1000 / 60 / 60;
    return hours;
}

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("table");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 2; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName("td")[n];
            y = rows[i + 1].getElementsByTagName("td")[n];
            /* Check if the two rows should switch place,
            based on the direction, asc or desc: */
            if (dir == "asc") {
                if (x.innerText.toLowerCase() > y.innerText.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerText.toLowerCase() < y.innerText.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
    formatTable();
}

function sortTableTest(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("table");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 2; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName("td")[n];
            y = rows[i + 1].getElementsByTagName("td")[n];
            /* Check if the two rows should switch place,
            based on the direction, asc or desc: */
            if (dir == "asc") {
                if (Number(x.innerHTML) > Number(y.innerHTML)) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (Number(x.innerHTML) < Number(y.innerHTML)) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
    formatTable();
}

function timeConvert(n) {
    var hours = n;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    if (rminutes < 10) {
        rminutes = "0" + rminutes;
    }
if(hours<1)
{
return "0:"+rminutes;
}
else
{
    return rhours + ":" + rminutes;
}
}
function formatTable() {
    var tableRows = $("#table tr");
    for (var i = 1; i < tableRows.length; i++) {
        if (i % 2 == 0) {
            $("#table tr")[i].className = "row_b";
        }
        else {
            $("#table tr")[i].className = "row_a";
        }
    }
}

function calculateDistance(to, from) {
    var target = extractCoords(to).match(/(\d+)\|(\d+)/);
    var source = extractCoords(from).match(/(\d+)\|(\d+)/);
    var fields = Math.sqrt(Math.pow(source[1] - target[1], 2) + Math.pow(source[2] - target[2], 2));

    return fields;
}

function extractCoords(src) {
    var loc = src.match(/\d+\|\d+/ig);
    return (loc ? loc[loc.length - 1] : null);
}