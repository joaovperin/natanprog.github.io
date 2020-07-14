javascript:
/*var allowed = new Array();
allowed['spear'] = true;
allowed['sword'] = true;
allowed['axe'] = true;
allowed['archer'] = true;
allowed['spy'] = true;
allowed['light'] = true;
allowed['marcher'] = true;
allowed['heavy'] = true;
allowed['ram'] = true;
allowed['catapult'] = true;
allowed['snob'] = false;
var coords = '551|222 550|231 534|222 562|244';
var land = "November 09, 2013 17:00:00";
var landWindow = [0, 30, 0];*/
var eleDoc = (window.frames.length > 0) ? window.main.document : document;
var now = new Date();
var units = {
    'spear': 18,
    'sword': 22,
    'axe': 18,
    'archer': 18,
    'spy': 9,
    'light': 10,
    'marcher': 10,
    'heavy': 11,
    'ram': 30,
    'catapult': 30,
    'snob': 35
};

function calculateDistance(x, y) {
    var homeInner = eleDoc.getElementById("menu_row2_village").nextElementSibling.innerHTML;
    var regExp = /\(([^)]+)\)/;
    var matches = regExp.exec(homeInner);
    var homeCoord = matches[1];
    var homeCoordSplit = homeCoord.split('|');
    var homeX = homeCoordSplit[0];
    var homeY = homeCoordSplit[1];
    var dX = homeX - x;
    var dY = homeY - y;
    var distance = Math.sqrt((dX * dX) + (dY * dY));
    return distance;
}

function fnGetConfig() {
    var oRequest = new XMLHttpRequest();
    var sURL = "https://" + window.location.hostname + "/interface.php?func=get_config";
    oRequest.open("GET", sURL, 0);
    oRequest.send(null);
    if (oRequest.status == 200) return oRequest.responseXML;
    alert("Error executing XMLHttpRequest call to get Config!");
}

function calculateTravelTimes(distance, unitType) {
    var xmldocument = fnGetConfig();
    var unitSpeed = xmldocument.getElementsByTagName('unit_speed')[0].childNodes[0].nodeValue;
    var worldSpeed = xmldocument.getElementsByTagName('speed')[0].childNodes[0].nodeValue;
    return distance * unitSpeed * worldSpeed * units[unitType];
}

function setAllToZero() {
    if (allowed["spy"]) {
        eleDoc.forms[0].spy.value = 0;
    }
    if (allowed["spear"]) {
        eleDoc.forms[0].spear.value = 0;
    }
    if (allowed["sword"]) {
        eleDoc.forms[0].sword.value = 0;
    }
    if (allowed["axe"]) {
        eleDoc.forms[0].axe.value = 0;
    }
    if (allowed["archer"]) {
        eleDoc.forms[0].archer.value = 0;
    }
    if (allowed["light"]) {
        eleDoc.forms[0].light.value = 0;
    }
    if (allowed["marcher"]) {
        eleDoc.forms[0].marcher.value = 0;
    }
    if (allowed["heavy"]) {
        eleDoc.forms[0].heavy.value = 0;
    }
    if (allowed["ram"]) {
        eleDoc.forms[0].ram.value = 0;
    }
    if (allowed["catapult"]) {
        eleDoc.forms[0].catapult.value = 0;
    }
    if (allowed["snob"]) {
        eleDoc.forms[0].snob.value = 0;
    }
}

function fillRallyPoint(troop, x, y) {
    setAllToZero();
    if (troop == "spy" || getTroop("spy") > 0) {
        eleDoc.forms[0].spy.value = 1;
    }
    if (troop == "spear") {
        eleDoc.forms[0].spear.value = 1;
    }
    if (troop == "sword") {
        eleDoc.forms[0].sword.value = 1;
    }
    if (troop == "axe") {
        eleDoc.forms[0].axe.value = 1;
    }
    if (troop == "archer") {
        eleDoc.forms[0].archer.value = 1;
    }
    if (troop == "light") {
        eleDoc.forms[0].light.value = 1;
    }
    if (troop == "marcher") {
        eleDoc.forms[0].marcher.value = 1;
    }
    if (troop == "heavy") {
        eleDoc.forms[0].heavy.value = 1;
    }
    if (troop == "ram") {
        eleDoc.forms[0].ram.value = 1;
    }
    if (troop == "catapult") {
        eleDoc.forms[0].catapult.value = 1;
    }
    if (troop == "snob") {
        eleDoc.forms[0].snob.value = 1;
    }
    eleDoc.forms[0].x.value = x;
    eleDoc.forms[0].y.value = y;
}

function getTroop(a) {
    return parseInt(eleDoc.units[a].nextSibling.nextSibling.innerHTML.match(/\d+/), 10);
}

function calculateIfAttackCanLand() {
    var calculating = "Calculating travel times...";
    eleDoc.getElementsByTagName("h3")[0].innerHTML = calculating;
    eleDoc.getElementsByTagName("h3")[0].setAttribute("style", "color: #0000FF");
    var actualLand = null;
    var landDate = new Date(land);
    landDate.setMinutes(landDate.getMinutes() - landDate.getTimezoneOffset());
    var firstLand = new Date(landDate.toString());
    firstLand.setHours(landDate.getHours() - landWindow[0]);
    firstLand.setMinutes(landDate.getMinutes() - landWindow[1]);
    firstLand.setSeconds(landDate.getSeconds() - landWindow[2]);
    var lastLand = new Date(landDate.toString());
    lastLand.setHours(landDate.getHours() + landWindow[0]);
    lastLand.setMinutes(landDate.getMinutes() + landWindow[1]);
    lastLand.setSeconds(landDate.getSeconds() + landWindow[2]);
    var coord = coords.split(' ');
    var found = false;
    var coordNum = 0;
    var start = Math.floor(Math.random() * coord.length);
    for (var i = 0; i < coord.length; i++) {
        coordNum = (start + i) % coord.length;
        var coordSplit = coord[coordNum].split('|');
        var x = coordSplit[0];
        var y = coordSplit[1];
        var distance = calculateDistance(x, y);
        if (coordNum % 10 == 1) {
            calculating = calculating + ".";
            eleDoc.getElementsByTagName("h3")[0].innerHTML = calculating;
        }
        for (key in allowed) {
            if (getTroop(key) > 0 && allowed[key]) {
                var travelTime = calculateTravelTimes(distance, key);
                actualLand = new Date(now.toString());
                actualLand.setMinutes(actualLand.getMinutes() + travelTime);
                if (actualLand.getTime() > firstLand.getTime() && actualLand.getTime() < lastLand.getTime()) {
                    fillRallyPoint(key, x, y);
                    eleDoc.getElementsByTagName("h3")[0].innerHTML = "Found a target!";
                    eleDoc.getElementsByTagName("h3")[0].setAttribute("style", "color: #00CC00");
                    found = true;
                    break;
                }
            }
        }
        if (found) {
            break;
        }
    }
    if (!found) {
        eleDoc.getElementsByTagName("h3")[0].innerHTML = "Couldn't find a target within the landing window!";
        eleDoc.getElementsByTagName("h3")[0].setAttribute("style", "color: #FF0033");
    }
}
calculateIfAttackCanLand();
//void(0);