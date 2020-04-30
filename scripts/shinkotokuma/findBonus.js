javascript:
var villages = [];
var woodBonus = [];
var stoneBonus = [];
var ironBonus = [];
var barracksBonus = [];
var warehouseBonus = [];
var workshopBonus = [];
var farmBonus = [];
var allResBonus = [];
var stableBonus = [];
var backgroundColor = "#36393f";
var borderColor = "#3e4147";
var baseColor = "#e3d5b3";
var titleColor = "#ffffdf";
var headerColor = "#202225";

var currentTime = Date.parse(new Date());
if (localStorage.getItem("mapVillageTime") != null) {
    mapVillageTime = localStorage.getItem("mapVillageTime");
    if (currentTime >= mapVillageTime + 60 * 60 * 24 * 1000) {
        //hour has passed
        console.log("Hour has passed, recollecting the village data");
        $.get("map/village.txt", function (data) {
            villages = CSVToArray(data);
            localStorage.setItem("mapVillageTime",Date.parse(new Date()));
            localStorage.setItem("mapVillageTxt",data);
        })
            .done(function () {
                findBonus();
            });
    }
    else {
        // within same hour
        console.log("Hour not over yet, waiting to recollect, using old data");
        data = localStorage.getItem("mapVillageTxt");
        villages = CSVToArray(data);
        findBonus();
    }
}
else {
    //get villageTxt for first time
    console.log("Grabbing village.txt for the first time");
    $.get("map/village.txt", function (data) {
        villages = CSVToArray(data);
        localStorage.setItem("mapVillageTime",Date.parse(new Date()));
        localStorage.setItem("mapVillageTxt",data);
    })
        .done(function () {
            findBonus();
        });
    
}


function findBonus() {
    for (i = 0; i < villages.length; i++) {
        if (villages[i][6] != "0" && villages[i][4] == "0") {
            switch (villages[i][6]) {
                case "1":
                    woodBonus.push([villages[i][2] + "|" + villages[i][3], villages[i][0]]);
                    break;
                case "2":
                    stoneBonus.push([villages[i][2] + "|" + villages[i][3], villages[i][0]]);
                    break;
                case "3":
                    ironBonus.push([villages[i][2] + "|" + villages[i][3], villages[i][0]]);
                    break;
                case "4":
                    farmBonus.push([villages[i][2] + "|" + villages[i][3], villages[i][0]]);
                    break;
                case "5":
                    barracksBonus.push([villages[i][2] + "|" + villages[i][3], villages[i][0]]);
                    break;
                case "6":
                    stableBonus.push([villages[i][2] + "|" + villages[i][3], villages[i][0]]);
                    break;
                case "7":
                    workshopBonus.push([villages[i][2] + "|" + villages[i][3], villages[i][0]]);
                    break;
                case "8":
                    allResBonus.push([villages[i][2] + "|" + villages[i][3], villages[i][0]]);
                    break;
                case "9":
                    warehouseBonus.push([villages[i][2] + "|" + villages[i][3], villages[i][0]]);
                    break;
                default:
                    break;
            }

        }
    }

    html = `
        <div id="main" class="ui-widget-content" style="background-color:${backgroundColor}">
            <table id="bonusVillages" class="vis" border="1" style="width: 100%;background-color:${backgroundColor};border-color:${borderColor}">
                <tr style="background-color:${backgroundColor}">
                    <td style="text-align:center; width:auto; background-color:${baseColor}"><img src="graphic/bonus/wood.png" style="width:48px;height:48px;" onClick="displayArray(0)"/>
                    </td>
                    <td style="text-align:center; width:auto; background-color:${baseColor}"><img src="graphic/bonus/stone.png" style="width:48px;height:48px;" onClick="displayArray(1)"/>
                    </td>
                    <td style="text-align:center; width:auto; background-color:${baseColor}"><img src="graphic/bonus/iron.png" style="width:48px;height:48px;" onclick="displayArray(2)"/>
                    </td>
                    <td style="text-align:center; width:auto; background-color:${baseColor}"><img src="graphic/bonus/farm.png" style="width:48px;height:48px;" onclick="displayArray(3)"/>
                    </td>
                    <td style="text-align:center; width:auto; background-color:${baseColor}"><img src="graphic/bonus/barracks.png" style="width:48px;height:48px;" onclick="displayArray(4)"/>
                    </td>
                    <td style="text-align:center; width:auto; background-color:${baseColor}"><img src="graphic/bonus/stable.png" style="width:48px;height:48px;" onclick="displayArray(5)" role="button"/>
                    </td>
                    <td style="text-align:center; width:auto; background-color:${baseColor}"><img src="graphic/bonus/garage.png" style="width:48px;height:48px;" onclick="displayArray(6)" role="button"/>
                    </td>
                    <td style="text-align:center; width:auto; background-color:${baseColor}"><img src="graphic/bonus/all.png" style="width:48px;height:48px;" onclick="displayArray(7)" role="button"/>
                    </td>
                    <td style="text-align:center; width:auto; background-color:${baseColor}"><img src="graphic/bonus/storage.png" style="width:48px;height:48px;" onclick="displayArray(8)" role="button"/>
                    </td>
                </tr>
                <tr style="background-color:${backgroundColor}">
                <td id="villageList" colspan="9" style="background-color:${backgroundColor}">
                </td>
                </tr>
            </table>
        </div>`
    Dialog.show("Content", html);
}


function CSVToArray(strData, strDelimiter) {
    strDelimiter = (strDelimiter || ",");
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
    );
    var arrData = [[]];
    var arrMatches = null;
    while (arrMatches = objPattern.exec(strData)) {
        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[1];
        if (
            //check if its string
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
        ) {
            //create new row
            arrData.push([]);
        }
        var strMatchedValue;

        if (arrMatches[2]) {

            //get rid of quotes
            strMatchedValue = arrMatches[2].replace(
                new RegExp("\"\"", "g"),
                "\""
            );

        } else {

            // no quotes
            strMatchedValue = arrMatches[3];
        }
        //add to array
        arrData[arrData.length - 1].push(strMatchedValue);
    }
    // Return the parsed data.
    return (arrData);
}

function displayArray(x) {
    console.log(x);
    tempHTML = `<table id="bonusWood" class="vis" border="1" align="center" style="background-color:${backgroundColor};border-color:${borderColor};">
        <tr style="background-color:${backgroundColor}"><td style="text-align:center;background-color:${headerColor}"><font color="white">Coordinate</font></td><td style="text-align:center;background-color:${headerColor}"><font color="white">Distance</font></td></tr>`;
    if (x == 0) {
        for (var i = 0; i < woodBonus.length; i++) {
            tempHTML += `
            <tr style="text-align:center; width:auto; background-color:${backgroundColor}">
                <td style="text-align:center; width:auto; background-color:${backgroundColor}"><a href="/game.php?&screen=info_village&id=${woodBonus[i][1]}"><font color="white">${woodBonus[i][0]}</font></a></td>
                <td style="text-align:center; width:auto; background-color:${backgroundColor}"><span><font color="white">${calcDistance(woodBonus[i][0])}</font></span></td>
            </tr>`
        }
    }
    if (x == 1) {
        for (var i = 0; i < stoneBonus.length; i++) {
            tempHTML += `
            <tr style="text-align:center; width:auto; background-color:${backgroundColor}">
                <td style="text-align:center; width:auto; background-color:${backgroundColor}"><a href="/game.php?&screen=info_village&id=${stoneBonus[i][1]}"><font color="white">${stoneBonus[i][0]}</font></a></td>
                <td style="text-align:center; width:auto; background-color:${backgroundColor}"><span><font color="white">${calcDistance(stoneBonus[i][0])}</font></span></td>
            </tr>`
        }
    }
    if (x == 2) {
        for (var i = 0; i < ironBonus.length; i++) {
            tempHTML += `
            <tr style="text-align:center; width:auto; background-color:${backgroundColor}">
                <td style="text-align:center; width:auto; background-color:${backgroundColor}"><a href="/game.php?&screen=info_village&id=${ironBonus[i][1]}"><font color="white">${ironBonus[i][0]}</font></a></td>
                <td style="text-align:center; width:auto; background-color:${backgroundColor}"><span><font color="white">${calcDistance(ironBonus[i][0])}</font></span></td>
            </tr>`
        }
    }
    if (x == 3) {
        for (var i = 0; i < farmBonus.length; i++) {
            tempHTML += `
            <tr style="text-align:center; width:auto; background-color:${backgroundColor}">
                <td style="text-align:center; width:auto; background-color:${backgroundColor}"><a href="/game.php?&screen=info_village&id=${farmBonus[i][1]}"><font color="white">${farmBonus[i][0]}</font></a></td>
                <td style="text-align:center; width:auto; background-color:${backgroundColor}"><span><font color="white">${calcDistance(farmBonus[i][0])}</font></span></td>
            </tr>`
        }
    }
    if (x == 4) {
        for (var i = 0; i < barracksBonus.length; i++) {
            tempHTML += `
            <tr style="text-align:center; width:auto; background-color:${backgroundColor}">
                <td style="text-align:center; width:auto; background-color:${backgroundColor}"><a href="/game.php?&screen=info_village&id=${barracksBonus[i][1]}"><font color="white">${barracksBonus[i][0]}</font></a></td>
                <td style="text-align:center; width:auto; background-color:${backgroundColor}"><span><font color="white">${calcDistance(barracksBonus[i][0])}</font></span></td>
            </tr>`
        }
    }
    if (x == 5) {
        for (var i = 0; i < stableBonus.length; i++) {
            tempHTML += `
            <tr style="text-align:center; width:auto; background-color:${backgroundColor}">
                <td style="text-align:center; width:auto; background-color:${backgroundColor}"><a href="/game.php?&screen=info_village&id=${stableBonus[i][1]}"><font color="white">${stableBonus[i][0]}</font></a></td>
                <td style="text-align:center; width:auto; background-color:${backgroundColor}"><span><font color="white">${calcDistance(stableBonus[i][0])}</font></span></td>
            </tr>`
        }
    }
    if (x == 6) {
        for (var i = 0; i < workshopBonus.length; i++) {
            tempHTML += `
            <tr style="text-align:center; width:auto; background-color:${backgroundColor}">
                <td style="text-align:center; width:auto; background-color:${backgroundColor}"><a href="/game.php?&screen=info_village&id=${workshopBonus[i][1]}"><font color="white">${workshopBonus[i][0]}</font></a></td>
                <td style="text-align:center; width:auto; background-color:${backgroundColor}"><span><font color="white">${calcDistance(workshopBonus[i][0])}</font></span></td>
            </tr>`
        }
    }
    if (x == 7) {
        for (var i = 0; i < allResBonus.length; i++) {
            tempHTML += `
            <tr style="text-align:center; width:auto; background-color:${backgroundColor}">
                <td style="text-align:center; width:auto; background-color:${backgroundColor}"><a href="/game.php?&screen=info_village&id=${allResBonus[i][1]}"><font color="white">${allResBonus[i][0]}</font></a></td>
                <td style="text-align:center; width:auto; background-color:${backgroundColor}"><span><font color="white">${calcDistance(allResBonus[i][0])}</font></span></td>
            </tr>`
        }
    }
    if (x == 8) {
        for (var i = 0; i < warehouseBonus.length; i++) {
            tempHTML += `
            <tr style="text-align:center; width:auto; background-color:${backgroundColor}">
                <td style="text-align:center; width:auto; background-color:${backgroundColor}"><a href="/game.php?&screen=info_village&id=${warehouseBonus[i][1]}"><font color="white">${warehouseBonus[i][0]}</font></a></td>
                <td style="text-align:center; width:auto; background-color:${backgroundColor}"><span><font color="white">${calcDistance(warehouseBonus[i][0])}</font></span></td>
            </tr>`
        }
    }

    tempHTML += "</table>";
    $("#villageList").eq(0).empty();
    $("#villageList").eq(0).append(tempHTML);
}

function calcDistance(village) {
    var x1 = game_data.village.x, y1 = game_data.village.y, x2 = village.match(/(\d*)\|(\d*)/)[1], y2 = village.match(/(\d*)\|(\d*)/)[2];
    //calculate distance from current village
    var a = x1 - x2;
    var b = y1 - y2;
    var distance = Math.round(Math.hypot(a, b));
    return distance;
}