/*
 *  @author: kockalovag (kockalovag@gmail.com)
 *  [Script] - searches for coordinates (village anchors) in the page and displays unit distances from current village
 */

//TW
var Timing;
var distance_script_version="1.0";
var doc = document;
var myGlobal = this;
var currentVersion = "1.1";

function fnGetConfig(){
	var oRequest = new XMLHttpRequest();
	var sURL = "https://"+window.location.hostname + "/interface.php?func=get_config";
	oRequest.open("GET",sURL,0); oRequest.send(null);
	if(oRequest.status==200){
		return oRequest.responseXML;
	} else {
		alert("Error executing XMLHttpRequest call to get Config!");
	}
}

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (obj, fromIndex) {
        "use strict";
        return jQuery.inArray(obj, this, fromIndex);
    };
}

function versionCompare(v1, v2) {
    var v1arr,
        v2arr,
        i;
    v1arr = v1.split(".");
    v2arr = v2.split(".");
    v1arr = v1arr.map(function (e) {
        return parseInt(e, 10);
    });
    v2arr = v2arr.map(function (e) {
        return parseInt(e, 10);
    });
    i = 0;
    while (i < v1arr.length && i < v2arr.length && v1arr[i] === v2arr[i]) {
        ++i;
    }
    if (i >= v1arr.length) {
        if (i >= v2arr.length) { //v1 finished, v2 finished, equal
            return 0;
        } else { //v1 finished, v2 not finished, v2 is bigger
            return 1;
        }
    } else {
        if (i >= v2arr.length) { //v1 not finished, v2 finished, v1 is bigger
            return -1;
        } else { //v1 not finished, v2 not finished, current element decides
            if (v1arr[i] < v2arr[i]) {
                return 1;
            } else {
                return -1;
            }
        }
    }
}

var tableClass = "distance_measure";

var imgSrcBase = "https://" + window.location.host + "/graphic/";
var dayIconUrl = "https://media.innogamescdn.com/TribalWars/emoji/2600.png";
var arrivalIconUrl = "https://media.innogamescdn.com/TribalWars/emoji/23f1.png";
var clockIconUrl = "https://media.innogamescdn.com/TribalWars/emoji/23f0.png";

var imgSrc = {
    spear :     "unit_spear.png",
    sword :     "unit_sword.png",
    axe :       "unit_axe.png",
    archer :    "unit_archer.png",
    spy :       "unit_spy.png",
    light :     "unit_light.png",
    marcher :   "unit_marcher.png",
    heavy :     "unit_heavy.png",
    ram :       "unit_ram.png",
    catapult :  "unit_catapult.png",
    knight :    "unit_knight.png",
    snob :      "unit_snob.png"
};

var arrowImgSrc = "group_right.png";

var minutesPerField = {
    spear :    18, 
    sword :    22,
    axe :      18, 
    archer :   18, 
    spy :       9, 
    light :    10, 
    marcher :  10,
    heavy :    11,
    ram :      30, 
    catapult : 30,
    knight :   10, 
    snob :     35 
};

function getUnitImgSrc(unit) {
    return imgSrcBase + 'unit/' + imgSrc[unit];
}

function getImgHTML(alt, imgSrc) {
    return '<img src="' + imgSrc + '" title=' + alt + ' alt=' + alt + ' height=18 width=18>';
}

function zeroPad(intVal) {
    return intVal > 9 ? '' + intVal : '0' + intVal;
}

function getTimeLength(unit, distance) {
    var secondsDiff = Math.round(distance * minutesPerField[unit] * 60 / theWorldSpeed / theUnitSpeed);
    var hours = Math.floor(secondsDiff/3600);
    var minutes = Math.floor(secondsDiff%3600/60);
    var seconds = Math.floor(secondsDiff%60);
    result = {
        seconds : seconds,
        minutes : minutes,
        hours : hours,
        whole_days : Math.floor(hours/24),
        remaining_hours : hours%24,
        seconds_length : secondsDiff
    };
    return result;
}

function getTimeStr(t, useSmartTimeDisplay) {
    var result = "";
    //days if needed
    if (useSmartTimeDisplay && t.whole_days > 0) {
        result += '' + t.whole_days + getImgHTML("nap(ok)", dayIconUrl) + " ";
    }
    //hours
    if (useSmartTimeDisplay) {
        result += '' + zeroPad(t.remaining_hours);
    } else {
        result += '' + zeroPad(t.hours);
    }
    //minutes, seconds
    result += ':' + zeroPad(t.minutes) + ":" + zeroPad(t.seconds);
    return result;
}

function getArrivalTimeStr(startDateTime, myLength) {
    var secondsDiff = myLength.seconds_length % 86400; //a day is 24 hours * 60 minutes * 60 = 86400 seconds
    var arrivalDateTime = new Date(startDateTime.getTime() + secondsDiff*1000); //adding millisecs
    //CAUTION! To produce the time (which is needed now) the above method is sufficient. But the date part might be incorrect!
    //http://stackoverflow.com/questions/1197928/how-to-add-30-minutes-to-a-javascript-date-object
    var myArrivalTime = {
        seconds : arrivalDateTime.getSeconds(),
        minutes : arrivalDateTime.getMinutes(),
        hours : arrivalDateTime.getHours(),
        whole_days : 0,
        remaining_hours : arrivalDateTime.getHours()
    };
    var timeStr = getTimeStr(myArrivalTime, false);
    if (theNightSettings.isActive) {
        if (theNightSettings.startHour <= myArrivalTime.hours 
            && myArrivalTime.hours < theNightSettings.endHour)
        {
            timeStr = '<font color="red">' + timeStr + '</font>';
        }
    }
    return timeStr;
}

function getCurrentServerDateTime() {
    return new Date(Timing.getCurrentServerTime());
}

function collectUnits(speed) {
    var result = [];
    for (unitName in minutesPerField) {
        if (minutesPerField[unitName] == speed) {
            result.push(unitName);
        }
    }
    return result;
}

function collectUnitImgs(units) {
    result = "";
    for (var idx = 0; idx < units.length; ++idx) {
        var actUnit = units[idx];
        result += getImgHTML(actUnit, getUnitImgSrc(actUnit));
    }
    return result;
}

function getCoordFromStr(coordStr) {
    var coordMatched = coordStr.match(/\d{3}\|\d{3}/)[0];
    var coordsSplit = coordMatched.split("|");
    var coord = {
        x : parseInt(coordsSplit[0]),
        y : parseInt(coordsSplit[1])
    };
    return coord;
}

function getDistance(oneCoord, targetCoord) {
    return Math.sqrt(
        Math.pow(oneCoord.x - targetCoord.x, 2) + 
        Math.pow(oneCoord.y - targetCoord.y, 2));
}

function assembleAppendedContent(table) {
    return table;
}

function createCheckbox(settings) {
    result = "";
    result += '<input type="checkbox" name="' + settings.name + '"';
    if (settings.isChecked) {
        result += ' checked';
    }
    result += ' onclick="' + settings.onclickScript + '">';
    if (settings.imageSrc != "") {
        result += '<label for="' + settings.name + '">' + '<img src="' + settings.imageSrc + '"/>' + '</label>';
    }
    if (settings.description != "") {
        result += '<label for="' + settings.name + '">' + settings.description + '</label>';
    }
    return result;
}

var tableMgr = {
    isSetup : false,
    units : ["spy", "knight", "heavy", "spear", "sword", "catapult", "snob"],
    
    setupUi : function() {
        var lengthCheckbox = createCheckbox({
            name : "Mutasd a tĂĄvolsĂĄgot",
            onclickScript : "tableMgr.toggleShowLength()",
            imageSrc : clockIconUrl,
            description : "TĂĄvolsĂĄg",
            isChecked : tableMgr.showLength
        });
        var arrivalCheckbox = createCheckbox({
            name : "Mutasd az ĂŠrkezĂŠst",
            onclickScript : "tableMgr.toggleShowArrival()",
            imageSrc : arrivalIconUrl,
            description : "Ă�rkezĂŠs",
            isChecked : tableMgr.showArrival
        });
        $("#content_value").prepend(arrivalCheckbox + "<br>");
        $("#content_value").prepend(lengthCheckbox + "<br>");
    },
    setupParams : function() {
        var xmlDoc = fnGetConfig();
        theUnitSpeed = xmlDoc.getElementsByTagName('unit_speed')[0].childNodes[0].nodeValue;
        theWorldSpeed = xmlDoc.getElementsByTagName('speed')[0].childNodes[0].nodeValue; 
        var nightNode = xmlDoc.getElementsByTagName('night')[0];
        theNightSettings = {};
        theNightSettings.isActive = nightNode.getElementsByTagName('active')[0].childNodes[0].nodeValue == 1;
        if (theNightSettings.isActive) {
            theNightSettings.startHour = parseInt(nightNode.getElementsByTagName('start_hour')[0].childNodes[0].nodeValue, 10);
            theNightSettings.endHour = parseInt(nightNode.getElementsByTagName('end_hour')[0].childNodes[0].nodeValue, 10);
        }
        
        tableMgr.showLength = true;
        if (typeof show_length != "undefined") {
            tableMgr.showLength = show_length != 0;
        }
        
        tableMgr.useSmartTimeDisplay = true;
        if (typeof smart_time != "undefined") {
            tableMgr.useSmartTimeDisplay = smart_time != 0;
        }
        
        tableMgr.showArrival = true;
        if (typeof show_arrival != "undefined") {
            tableMgr.showArrival = show_arrival != 0;
        }
    },
    setupLogic : function() {
        tableMgr.startTime = getCurrentServerDateTime();
        
        tableMgr.theVillageCoord = { 
            x : game_data.village.x,
            y : game_data.village.y
        };
        
        var anchors = $(".village_anchor");
        tableMgr.anchors = anchors;
        for (var idx = 0; idx < anchors.length; ++idx) {
            var actAnchor = anchors[idx];
            $(actAnchor).prepend("<br>");
        }
    },
    setup : function() {
        if (tableMgr.isSetup) {
            return;
        }
        tableMgr.isSetup = true;
        
        tableMgr.setupParams();
        tableMgr.setupUi();
        
        var infoMessage = "<a target='_blank' href='https://forum.klanhaboru.hu/index.php?threads/t%C3%A1vols%C3%A1gm%C3%A9r%C5%91-script.3856/'>[TĂĄvolsĂĄg mĂŠrĹ�]</a>";
        infoMessage += " " + distance_script_version;
        $("#content_value").prepend(infoMessage + "<br>");
        
        tableMgr.setupLogic();
        
        var numParsed = tableMgr.anchors.length;
        var successMsg = "<b>OK</b>(" + numParsed + ")    ";
        $("#content_value").prepend(successMsg);
    },
    
    createTableHTML : function(startCoord, targetCoord) {
        var distance = getDistance(startCoord, targetCoord);
        
        var headerRow = "<tr>";
        var lengthRow = "<tr>";
        var arrivalRow = "<tr>";
        
        distanceStr = "" + Math.round(distance*100)/100;
        headerRow += "<td>" + getImgHTML("TĂĄvolsĂĄg(mezĹ�)", imgSrcBase + arrowImgSrc) + distanceStr + "</td>";
        lengthRow += "<td>" + getImgHTML("TĂĄvolsĂĄg(idĹ�)", clockIconUrl) + "</td>";
        arrivalRow += "<td>" + getImgHTML("Ă�rkezĂŠs idĹ�pontja", arrivalIconUrl) + "</td>";
        
        for (var idx = 0; idx < tableMgr.units.length; ++idx) {
            var actUnit = tableMgr.units[idx];
            var unitsAtThisSpeed = collectUnits(minutesPerField[actUnit]);
            headerRow += "<td>" + collectUnitImgs(unitsAtThisSpeed) + "</td>";
            var myLength = getTimeLength(actUnit, distance);
            lengthRow += "<td>" + getTimeStr(myLength, tableMgr.useSmartTimeDisplay) + "</td>";
            arrivalRow += "<td>" + getArrivalTimeStr(tableMgr.startTime, myLength) + "</td>";
        }
        headerRow += "</tr>";
        lengthRow += "</tr>";
        arrivalRow += "</tr>";
        
        var table = '<table class="vis bbcodetable ' + tableClass + '">';
        table += headerRow;
        if (tableMgr.showLength) {
            table += lengthRow;
        }
        if (tableMgr.showArrival) {
            table += arrivalRow;
        }
        table += "</table>";
        return table;
    },
    createTables : function() {
        if (tableMgr.showLength || tableMgr.showArrival) {
            for (var idx = 0; idx < tableMgr.anchors.length; ++idx) {
                var actAnchor = tableMgr.anchors[idx];
                if (game_data.screen != "info_player") {
                     actCoord = getCoordFromStr(actAnchor.innerHTML);
                } else {
                     tdLength = $("#villages_list > tbody > tr:nth-child("+(idx+1)+")").find("td").length;
                     console.log(tdLength);
                     actCoord = getCoordFromStr($("#villages_list > tbody > tr:nth-child("+(idx+1)+")").find("td").eq(tdLength - 2).text());
                }
                var actTable = tableMgr.createTableHTML(tableMgr.theVillageCoord, actCoord);
                $(actAnchor).append(assembleAppendedContent(actTable));
            }
        }
    },
    removeTables : function() {
        tables = $("." + tableClass);
        for (var idx = 0; idx < tables.length; ++idx) {
            tables[idx].remove();
        }
    },
    showDistanceTime : function() {
        tableMgr.setup();
        tableMgr.createTables();
    },
    recreateTables : function() {
        tableMgr.removeTables();
        tableMgr.createTables();
    },
    toggleShowLength : function() {
        tableMgr.showLength = !tableMgr.showLength;
        tableMgr.recreateTables();
    },
    toggleShowArrival : function() {
        tableMgr.showArrival = !tableMgr.showArrival;
        tableMgr.recreateTables();
    }
};

function showDistanceTime() {
    tableMgr.showDistanceTime();
}

showDistanceTime();

void(0);