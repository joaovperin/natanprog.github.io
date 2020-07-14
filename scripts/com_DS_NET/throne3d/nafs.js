/*Global save of a file.*/
/*jshint -W004 */
var xmlConfig;

/*
Changelog:
2018-08-11 2.0.1:
- Fix typo in catapult calculation
2015-10-16 2.0:
- Re-organised all the code.
*/

/*The standard data.*/
var serverTimezones = {"en" : " GMT+0000", "zz" : " GMT+0100", "no" : " GMT+0100"};
var resourceRates = [0, 30, 35, 41, 47, 55, 64, 74, 86, 100, 117, 136, 158, 184, 214, 249, 289, 337, 391, 455, 530, 616, 717, 833, 969, 1127, 1311, 1525, 1774, 2063, 2400];
var warehouseCapacity = [0, 1000, 1229, 1512, 1859, 2285, 2810, 3454, 4247, 5222, 6420, 7893, 9705, 11932, 14670, 18037, 22177, 27266, 33523, 41217, 50675, 62305, 76604, 94184, 115798, 142373, 175047, 215219, 264611, 325337, 400000];
var unitCarry = {"spear": 25, "sword": 15, "axe": 10, "archer": 10, "spy": 0, "light": 80, "marcher": 50, "heavy": 50, "ram": 0, "catapult": 0, "knight": 100};
var unitSpeed = {"spear": 18, "sword": 22, "axe": 18, "archer": 18, "spy": 9, "light": 10, "marcher": 10, "heavy": 11, "ram": 30, "catapult": 30};

var speedGroups = [["spy", "light", "marcher", "heavy"], ["spear", "sword", "axe", "archer"], ["ram", "catapult"]];
var slowestSpeedofGroups = [11, 22, 30];

var troopList = ["spear", "sword", "axe", "archer", "spy", "light", "marcher", "heavy", "ram", "catapult", "knight"]; /*Ignore snob*/
var commonTroopNames = [["spearman", "spear"], ["swordman", "sword"], ["axeman", "axe"], ["scout", "spy"], ["lc", "light"], ["light cavalry", "light"], ["ma", "marcher"], ["mounted archer", "marcher"], ["heavy cavalry", "heavy"], ["hc", "heavy"], ["cat", "catapult"], ["paladin", "knight"]];

var ramsRequired = [0, 2, 4, 7, 10, 14, 19, 24, 30, 37, 45, 55, 65, 77, 91, 106, 124, 143, 166, 191, 219]; /* to break a wall at [i] level to 0.*/
var ramsMin = [0, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 6, 6]; /*to break a wall at [i] level by 1 level*/
var catsRequiredToBreak = [
    /*[0,30] = from 30 to 0*/
    /*From:[0,1,2, 3, 4, 5, 6, 7, 8, 9,10,11,12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,  29,  30]*/
    /*To:*/
    /* 0*/ [0,2,6,10,15,21,28,36,45,56,68,82,98,115,136,159,185,215,248,286,328,376,430,490,558,634,720,815,922,1041,1175],
    /* 1*/ [0,0,2, 6,11,17,23,31,39,49,61,74,89,106,126,148,173,202,234,270,312,358,410,469,534,508,691,784,888,1005,1135],
    /* 2*/ [0,0,0, 2, 7,12,18,25,33,43,54,66,81, 97,116,137,161,189,220,255,295,340,390,447,511,583,663,754,855, 968,1095],
    /* 3*/ [0,0,0, 0, 3, 7,13,20,27,36,47,59,72, 88,106,126,149,176,206,240,278,321,370,425,487,557,635,723,821, 932,1055],
    /* 4*/ [0,0,0, 0, 0, 3, 8,14,21,30,40,51,64, 79, 96,115,137,163,192,224,261,303,350,403,463,531,607,692,788, 895,1015],
    /* 5*/ [0,0,0, 0, 0, 0, 3, 9,15,23,32,43,55, 69, 86,104,126,150,177,209,244,285,330,382,440,505,579,661,754, 859, 976],
    /* 6*/ [0,0,0, 0, 0, 0, 0, 3, 9,17,25,35,47, 60, 76, 93,114,137,163,193,227,266,310,360,416,479,550,631,721, 822, 936],
    /* 7*/ [0,0,0, 0, 0, 0, 0, 0, 3,10,18,28,38, 51, 66, 82,102,124,149,178,211,248,290,338,392,453,522,600,687, 786, 896],
    /* 8*/ [0,0,0, 0, 0, 0, 0, 0, 0, 4,11,20,30, 42, 56, 72, 90,111,135,162,194,230,270,316,368,427,494,569,654, 749, 856],
    /* 9*/ [0,0,0, 0, 0, 0, 0, 0, 0, 0, 4,12,22, 33, 46, 61, 78, 98,121,147,177,211,250,294,345,401,466,538,620, 713, 816],
    /*10*/ [0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 4,13, 23, 36, 50, 66, 85,107,132,160,193,230,273,321,376,438,508,587, 676, 777],
    /*11*/ [0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 14, 26, 39, 54, 72, 92,116,143,175,210,251,297,350,409,477,553, 640, 737],
    /*12*/ [0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  5, 16, 28, 42, 59, 78,101,127,156,190,229,273,324,381,446,520, 603, 697],
    /*13*/ [0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  6, 17, 30, 46, 64, 85,110,138,170,207,250,298,353,415,486, 567, 657],
    /*14*/ [0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  6, 18, 33, 50, 70, 93,120,150,186,226,272,325,385,453, 530, 617],
    /*15*/ [0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  6, 20, 36, 54, 76,101,130,164,202,246,297,354,419, 493, 578],
    /*16*/ [0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0,  7, 22, 39, 59, 83,110,142,178,220,268,323,386, 457, 538],
    /*17*/ [0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0,  0,  8, 24, 43, 65, 90,120,155,195,240,292,352, 420, 498],
    /*18*/ [0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0,  0,  0,  8, 26, 46, 70, 98,131,169,212,262,319, 384, 458],
    /*19*/ [0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0,  0,  0,  0,  9, 28, 50, 77,107,143,184,231,285, 347, 418],
    /*20*/ [0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0,  0,  0,  0,  0, 10, 30, 55, 84,117,156,200,252, 311, 379],
    /*21*/ [0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 10, 33, 60, 91,127,170,218, 274, 339],
    /*22*/ [0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 11, 36, 65, 99,139,185, 238, 299],
    /*23*/ [0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 12, 39, 71,108,151, 201, 259],
    /*24*/ [0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 13, 43, 77,118, 165, 219],
    /*25*/ [0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 15, 47, 84, 128, 180],
    /*26*/ [0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 16, 51,  92, 140],
    /*27*/ [0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 17,  55, 100],
    /*28*/ [0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  19,  60],
    /*29*/ [0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,   0,  20],
    /*30*/ [0,0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,   0,   0]
];
var catsMin = [0,2,2,2,3,3,3,3,3,4,4,4,5,5,6,6,6,7,8,8,9,10,10,11,12,13,15,16,17,19,20]; /*to break a building at level [i] by 1*/
var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]; /*To get UTC-ize dates!*/
var _a = { /*translations. Duh*/
    "en" : {
        "Headquarters" : "Headquarters",
        "Barracks" : "Barracks",
        "Stable" : "Stable",
        "Workshop" : "Workshop",
        "Church" : "Church",
        "First church" : "First church",
        "Academy" : "Academy",
        "Smithy" : "Smithy",
        "Rally point" : "Rally point",
        "Statue" : "Statue",
        "Market" : "Market",
        "Timber camp" : "Timber camp",
        "Clay pit" : "Clay pit",
        "Iron mine" : "Iron mine",
        "Farm" : "Farm",
        "Warehouse" : "Warehouse",
        "Hiding place" : "Hiding place",
        "Wall" : "Wall",
        "Please run this from the 'attacks' menu!" : "Please run this from the 'attacks' menu on the reports page (not all)!",
        "SAVED" : "SAVED",
        "Saved" : "Saved",
        "NOT SAVED" : "NOT SAVED (Village disabled?)",
        "Are you sure you've imported some reports?" : "Are you sure you've imported some reports?",
        "Changed" : "Changed",
        "Attack on" : "Attack on",
        "No villages left to attack! Either add more villages, or wait for the attacks to complete." : "No villages left to attack! Either add more villages, or wait for the attacks to complete.",
        "Add to farm list for " : "Add to farm list for ",
        "Enable farm for " : "Enable farm for ",
        "Disable farm for " : "Disable farm for ",
        "Added" : "Added",
        "Enabled" : "Enabled",
        "Disabled" : "Disabled",
        "Level" : "Level",
        "jan" : "Jan",
        "feb" : "Feb",
        "mar" : "Mar",
        "apr" : "Apr",
        "may" : "May",
        "jun" : "Jun",
        "jul" : "Jul",
        "aug" : "Aug",
        "sep" : "Sep",
        "oct" : "Oct",
        "nov" : "Nov",
        "dec" : "Dec",
        "Coordinates" : "Coordinates",
        "Tribe" : "Tribe",
        "Actions" : "Actions",
        "Defender" : "Defender"
    },
    "no" : {
        "Headquarters" : "Hovedkvarter",
        "Barracks" : "Brakker",
        "Stable" : "Stall",
        "Workshop" : "Verksted",
        "Church" : "Kirke",
        "First church" : "Første Kirke",
        "Academy" : "Akademi",
        "Smithy" : "Smie",
        "Rally point" : "Samlingsplass",
        "Statue" : "Statue",
        "Market" : "Marked",
        "Timber camp" : "Hogstfelt",
        "Clay pit" : "Leirgrav",
        "Iron mine" : "Jerngruve",
        "Farm" : "Gård",
        "Warehouse" : "Varehus",
        "Hiding place" : "Skjulested",
        "Wall" : "Mur",
        "Please run this from the 'attacks' menu!" : "Vennligst kjør dette scrtiptet fra 'angrep' menyen på rapport siden (ikke alle).",
        "SAVED" : "LAGRET",
        "Saved" : "Lagret",
        "NOT SAVED" : "IKKE LAGRET (Landsby deaktivert?)",
        "Are you sure you've imported some reports?" : "Er du sikker på at du har importert rapporter?",
        "Changed" : "Endret",
        "Attack on" : "Angrep på",
        "No villages left to attack! Either add more villages, or wait for the attacks to complete." : "Ingen flere byer igjen til å angripe! Vennligst legg til flere byer, eller vent til angrepene har truffet.",
        "Add to farm list for " : "Legg til i listen over farms for ",
        "Enable farm for " : "Aktiver farm for ",
        "Disable farm for " : "Deaktiver farm for ",
        "Added" : "Lagt til",
        "Enabled" : "Aktivert",
        "Disabled" : "Deaktivert",
        "Level" : "Nivå",
        "jan" : "Jan",
        "feb" : "Feb",
        "mar" : "Mar",
        "apr" : "Apr",
        "may" : "Mai",
        "jun" : "Juni",
        "jul" : "Juli",
        "aug" : "Aug",
        "sep" : "Sep",
        "oct" : "Okt",
        "nov" : "Nov",
        "dec" : "Des",
        "Coordinates" : "Koordinater",
        "Tribe" : "Stamme",
        "Actions" : "Handlinger",
        "Defender" : "Forsvarer"
    }
};

/*The two letter acronym (typically) for the world. e.g. en, zz, no, de.*/
var worldLetters = window.location.host.split(/\W+/)[0].substring(0, 2);

/*Temporary local copy.*/
var settings;

/*Fetch local storage*/
function getLocalStorage() {
    if (!localStorage){ alert("Local storage doesn't seem to be enabled. NAFS won't function without it!"); throw "Whoops. Local storage isn't enabled, apparently."; }
    if (!localStorage.NAFSData) localStorage.NAFSData = '{"villages":{}, "settings":{}}';
    if (typeof settings === "undefined") settings = JSON.parse(localStorage.NAFSData);
    return settings;
}

/*Save local storage*/
function setLocalStorage(data){
    if (typeof data === "undefined") data = settings;
    localStorage.NAFSData = JSON.stringify(data);
}

/*Fetch the language from the localStorage settings.*/
function getCurrentLang() {
    return getSetting("lang", _a[worldLetters] && worldLetters || "en");
    /*Return the "lang" setting, or else if there's a translation for the current world's code, return that, or else "en".*/
}

/*Return the localised version.*/
function _(translateID){
    return (typeof _a[getCurrentLang()] !== "undefined" && _a[getCurrentLang()][translateID]) || translateID;
    /*If there are translations for the current language, and there exists a translation for this thing, use that. Else, return the translation's ID.*/
}

/*HQ (1), Barracks (0), Stable (0), Workshop (0), Church (0), Academy (0), Smithy (0), Rally Point (0), Statue (0), Market (0), Timber Camp (leave), Clay Pit (leave), Iron Mine (leave), Farm (1), Warehouse (leave), Hiding Place (impossible), Wall (0)*/
var catables = [
    {"name" : _("Farm"), "lowest" : (getSetting("catFarmToZero", false) ? 1 : 12), "id" : "farm"},
    {"name" : _("Headquarters"), "lowest" : 1, "id" : "main"},
    {"name" : _("Barracks"), "lowest" : 0, "id" : "barracks"},
    {"name" : _("Stable"), "lowest" : 0, "id" : "stable"},
    {"name" : _("Workshop"), "lowest" : 0, "id" : "garage"},
    {"name" : _("Academy"), "lowest" : 0, "id" : "snob"},
    {"name" : _("Smithy"), "lowest" : 0, "id" : "smith"},
    {"name" : _("Rally point"), "lowest" : 0, "id" : "place"},
    {"name" : _("Statue"), "lowest" : 0, "id" : "statue"},
    {"name" : _("Market"), "lowest" : 0, "id" : "market"}
];

var buildingList = ["barracks", "rally", "stable", "garage", "snob", "smith", "statue", "market", "main", "farm", "wall"];

function getQuery(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getQueryFromHaystack(haystack, name){
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(haystack);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getXML() {
    if (typeof xmlConfig === "undefined"){
        if (window.XMLHttpRequest){
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.open("GET", window.location.protocol + "//" + window.location.host + "/interface.php?func=get_config", false);
        xmlhttp.send();
        xmlConfig = xmlhttp.responseXML;
    }
    return xmlConfig;
}

function getWorldSpeed() {
    return parseFloat(getXML().getElementsByTagName("speed")[0].childNodes[0].nodeValue);
}

function getUnitSpeed() {
    return parseFloat(getXML().getElementsByTagName("unit_speed")[0].childNodes[0].nodeValue);
}

function getLocalCoords() {
    var temp = $("#menu_row2 b.nowrap").text();
    temp = splitOutCoords(temp, true);
    temp = temp.split("|").length > 1 && temp.split("|");
    /*Split "VillName (XXX|YYY) into ("XXX","YYY")*/
    return temp;
}

function getLocalName() {
    return $("#menu_row2 a.nowrap").text().trim();
}

/*Fetch a setting from the localStorage*/
function getSetting(name, def){
    var nafsData = getLocalStorage();
    if (typeof nafsData.settings !== "undefined" && typeof nafsData.settings[name] !== "undefined") {
        var tempData = nafsData.settings[name];
        if (tempData === "true") tempData = true;
        if (tempData === "false") tempData = false;
        return tempData;
    }  /*If settings exist, and setting exists, return it (slightly modified).*/
    return def; /*Else, return default.*/
}

/*Save a setting to the localStorage*/
function setSetting(name, val){
    var nafsData = getLocalStorage();
    if (typeof nafsData.settings === "undefined") nafsData.settings = {};

    if (val === "true") val = true;
    if (val === "false") val = false;

    nafsData.settings[name] = val;
    setLocalStorage(nafsData);

    return true;
}

function objectifySetting(settingValues, settingKeys) {
    var nafsData = getLocalStorage();
    if (!nafsData.settings) nafsData.settings = {};
    var settingName;

    if (typeof settingValues === "string") {
        settingName = settingValues;
        settingValues = nafsData.settings[settingValues];
    }
    if (typeof settingValues === "undefined") return false;

    if (typeof settingKeys === "undefined") settingKeys = nafsData.settings[settingName + "Key"];
    else if (typeof settingKeys === "string") {
        var settingKeyName = settingKeys;
        settingKeys = nafsData.settings[settingKeys];
    }

    if (typeof settingKeys === "undefined") return false;

    if (typeof settingKeys === "string") settingKeys = settingKeys.split(",");
    if (typeof settingValues === "string") settingValues = settingValues.split(",");

    var settingsObject = {};
    for (var settingKeyIndex in settingKeys) {
        settingsObject[settingKeys[settingKeyIndex]] = settingValues[settingKeyIndex];
    }

    return settingsObject;
}

function objectifyTroopSettings(settingValues, settingKeys) {
    var objectedSettings = objectifySetting(settingValues, settingKeys);
    for (var settingKey in objectedSettings){
        objectedSettings[settingKey] = parseInt(objectedSettings[settingKey]);
        if (fixTroopName(settingKey) && fixTroopName(settingKey) !== settingKey) {
            objectedSettings[fixTroopName(settingKey)] = parseInt(objectedSettings[settingKey]);
            delete objectedSettings[settingKey];
        }
    }
    return objectedSettings;
}

function changeConfig() {
    /*
    Config Data:
    {rescout {minScout, hoursToRescout, hoursToStale}, farm {minFarmTroops (,), maxFarmTroops (,), leaveFarmTroops (,)}, shape {catapult {catFarmToZero}, [catapultWalls, ram] {minWallLevel}, minShapeTroops (,), maxShapeTroops (,), leaveShapeTroops (,)}, playerImport}
    */
    function clearDisabledFarms(coords) {
        var nafsData = getLocalStorage();

        if (typeof coords === "undefined") {
            for (var villageIndex in nafsData.villages) {
                if (villageIndex.indexOf("|") !== -1) {
                    clearDisabledFarms(villageIndex);
                }
            }
        } else {
            if (coords.indexOf("|") !== -1 && typeof nafsData.villages[coords] !== "undefined") {
                var village = nafsData.villages[coords];
                for (var i=0; i < village.length; i++){
                    if (village[i].disabled) {
                        village.splice(i, 1);
                        i--;
                    }
                }
                nafsData.villages[coords] = village;
            }
        }

        setLocalStorage(nafsData);
    }

    alert("We will now change the settings of this farming script! Please do not CANCEL, nor type in random stuff, as you will have to redo this!");

    setSetting("rescout", prompt("Should we re-scout farms with old/stale reports? (If you disable this, automatic values will likely be wrong!) (true/false)", getSetting("rescout", true)) == "true");

    if (getSetting("rescout", true) === true) setSetting("minScout", parseInt(prompt("How many scouts to send at a minimum per attack?", getSetting("minScout", 1))));

    if (getSetting("rescout", true) === true) setSetting("hoursToRescout", parseInt(prompt("How many hours until a report 'expires' and may no longer be used for data? You will want to adjust this based on the world speed.", getSetting("hoursToRescout", 36))));

    if (getSetting("rescout", true) === true) setSetting("hoursToStale", parseInt(prompt("How many hours until a report becomes 'stale' and /may/ be rescouted? You will want to adjust this based on the world speed.", getSetting("hoursToStale", 10))));

    setSetting("farm", prompt("Should we farm villages? (true/false)", getSetting("farm", true)) == "true");

    if (getSetting("farm", true) === true) {
        setSetting("minFarmTroops", prompt("If the troop is used, how many of each troop should be sent at a minimum per farming attack? (spear, sword, axe, archer, lc, ma, hc, paladin - separate by commas, no spaces)", getSetting("minFarmTroops", "0,0,0,0,5,0,0,0")));
        setSetting("minFarmTroopsKey", "spear,sword,axe,archer,lc,ma,hc,paladin");

        setSetting("maxFarmTroops", prompt("If the troop is used, how many of each troop should be sent at a maximum per farming attack? (spear, sword, axe, archer, lc, ma, hc, paladin - separate by commas, no spaces; -1 means no limit, 0 disables the troop)", getSetting("maxFarmTroops", "0,0,0,0,-1,0,0,0")));
        setSetting("maxFarmTroopsKey", "spear,sword,axe,archer,lc,ma,hc,paladin");

        setSetting("leaveFarmTroops", prompt("How many troops to leave, at a minimum, within the village? (spear, sword, axe, archer, scout, lc, ma, hc, paladin - separate by commas, no spaces)", getSetting("leaveFarmTroops", "0,0,0,0,0,0,0,0,0")));
        setSetting("leaveFarmTroopsKey", "spear,sword,axe,archer,scout,lc,ma,hc,paladin");
    }

    setSetting("shape", prompt("Should we knock down walls and/or shape villages?", getSetting("shape", true)) == "true");

    if (getSetting("shape", true) === true) {
        setSetting("catapult", prompt("Should we use catapults to shape villages? (true/false)", getSetting("catapult", true)) == "true");

        if (getSetting("catapult", true) === true)
            setSetting("catFarmToZero", prompt("Should we catapult farms to zero? (Otherwise about level 12 - true/false)", getSetting("catFarmToZero", false)) == "true");

        setSetting("catapultWalls", prompt("Should we use catapults to knock down walls (after rams)? (true/false)", getSetting("catapultWalls", true)) == "true");

        setSetting("ram", prompt("Should we use rams to knock down farm walls? (true/false)", getSetting("ram", true)) == "true");

        if (getSetting("catapultWalls", true) || getSetting("ram", true)) setSetting("minWallLevel", parseInt(prompt("What should the minimum wall level required to send rams (or catapults, if applicable) be?", getSetting("minWallLevel", 1))));
    }

    if (getSetting("shape", true) === true && (getSetting("catapult", true) === true || getSetting("ram", true) === true)){
        setSetting("minShapeTroops", prompt("If the troop is used, how many of each should be sent at a minimum per shaping attack? (spear, sword, axe, archer, lc, ma, hc, ram, catapult, paladin - separate by commas, no spaces)", getSetting("minShapeTroops", "50,50,50,50,0,0,0,2,2,0")));
        setSetting("minShapeTroopsKey", "spear,sword,axe,archer,lc,ma,hc,ram,catapult,paladin");

        setSetting("maxShapeTroops", prompt("If the troop is used, how many of each should be sent at a maximum per shaping attack? (spear, sword, axe, archer, lc, ma, hc, ram, catapult, paladin - separate by commas, no spaces; -1 means no limit, 0 disables the troop)", getSetting("maxShapeTroops", "100,100,100,100,0,0,0,-1,-1,0")));
        setSetting("maxShapeTroopsKey", "spear,sword,axe,archer,lc,ma,hc,ram,catapult,paladin");

        setSetting("leaveShapeTroops", prompt("How many troops to leave, at a minimum, within the village after shaping attacks? (spear, sword, axe, archer, scout, lc, ma, hc, ram, catapult, paladin - separate by commas, no spaces)", getSetting("leaveShapeTroops", "50,50,50,50,5,0,0,0,0,0,0")));
        setSetting("leaveShapeTroopsKey", "spear,sword,axe,archer,scout,lc,ma,ha,ram,catapult,paladin");
    }

    setSetting("playerImport", prompt("Should we import reports with players as the defenders? (true/false)", getSetting("playerImport", true)) == "true");

    if (prompt("Clear disabled villages from the farm list? (true/false)", "false") == "true") clearDisabledFarms();
}

function addReport(reportID, localCoords, vilCoords, wood, clay, iron, battleTime, buildings){
    if (typeof vilCoords === "object") vilCoords = vilCoords[0] + "|" + vilCoords[1];
    if (typeof localCoords === "object") localCoords = localCoords[0] + "|" + localCoords[1];
    var nafsData = getLocalStorage();
    if (!nafsData.villages) nafsData.villages = {};
    if (!nafsData.villages[localCoords]) nafsData.villages[localCoords] = [];


    var vilIndex;
    nafsData.villages[localCoords].forEach(function(element, index) {
        if (element.coords === vilCoords) vilIndex = index;
    });

    if (typeof vilIndex === "undefined"){
        vilIndex = nafsData.villages[localCoords].push({
            coords: vilCoords,
            disabled: false,
            distance: (Math.floor(Math.sqrt(Math.pow(parseInt(vilCoords.split("|")[0])-localCoords.split("|")[0],2)+Math.pow(parseInt(vilCoords.split("|")[1])-localCoords.split("|")[1],2))*100)/100),
            reports: [ ]
        });
        nafsData.villages[localCoords].sort(function(a, b){
            return a.distance - b.distance;
        });
        nafsData.villages[localCoords].forEach(function(element, index) {
            if (element.coords === vilCoords) vilIndex = index;
        });
    }

    if (typeof vilIndex === "undefined"){
        /*Something has gone wrong! Not there even after we created it!*/
        throw "Something has gone seriously wrong. Pushing an item to an array didn't result in said item being in said array. Since when? Broken Javascript?";
    }

    if (nafsData.villages[localCoords][vilIndex].disabled){
        return "Disabled";
    }

    buildingList.forEach(function(element, index){
        if (typeof buildings[element] === "undefined") buildings[element] = 0;
    });

    battleTime = Number(battleTime);
    var reportIndex = false;
    nafsData.villages[localCoords][vilIndex].reports.forEach(function(element, index) {
        if (element.reportID === reportID) reportIndex = index;
    });

    if (reportIndex) return "Report already imported.";

    nafsData.villages[localCoords][vilIndex].reports.push({
        "reportID" : reportID,
        "battleTime" : battleTime,
        "wood" : wood,
        "clay" : clay,
        "iron" : iron,
        "buildings" : buildings
    });

    nafsData.villages[localCoords][vilIndex].reports.sort(function(a, b) {
        return b.battleTime - a.battleTime;
    });

    /*If we have more than one report in the list, delete the others. (o.e?)*/
    while (nafsData.villages[localCoords][vilIndex].reports.length > 1) {
        nafsData.villages[localCoords][vilIndex].reports.pop();
    }

    setLocalStorage(nafsData);
    return true;
}

function fixTroopName(troopName) {
    troopName = troopName.toLowerCase().trim();
    for (var troopNameID in commonTroopNames){
        if (troopName.indexOf(commonTroopNames[troopNameID][0].toLowerCase().trim()) !== -1) {
            troopName = commonTroopNames[troopNameID][1];
        }
    }
    return troopName;
}

function getMaxTroops() {
    if (getQuery("screen") !== "place"){
        console.log("Wrong screen. Should be at rally point.");
        return "Wrong screen.";
    }

    var troopCounts = {};
    for (var troopID in troopList) {
        var troopInput = $("#unit_input_" + troopList[troopID]);
        if (troopInput.length > 0) {
            var parentText = troopInput.parent().text();
            var meaningful = false;
            if (parentText.split("(").length > 1){
                parentText = parentText.split("(")[1];
                if (parentText.split(")").length > 1) {
                    parentText = parentText.split(")")[0];
                    if (parseInt(parentText).toString() == parentText){
                        troopCounts[troopList[troopID]] = parseInt(parentText);
                        meaningful = true;
                    }
                }
            }
            if (!meaningful){
                console.log("Something seems to be wrong with the max number of " + troopList[troopID] + ".");
            }
        }
    }
    return troopCounts;
}

function getMaxTroop(troopName) {
    return getMaxTroops()[fixTroopName(troopName)];
}

function errorBox(msg){
    if (getQuery("screen") === "place" && ($("#units_form").length > 0 || $("#command-data-form").length > 0)) {
        /*Regular rally page.*/
        if ($("#nafserror").length > 0) {
            $("#nafserror").text($("#nafserror").text() + "\n" + msg);
        } else {
            var errorBo = $("<span id='nafserror'></span>").css("color", "#F00");
            errorBo.text(msg);
            $($("#units_form table, #command-data-form table").get(0)).before(errorBo);
        }
    } else if (getQuery("screen") === "report" && getQuery("view") === "") {
        var warning = ($("#nafswarning").length > 0 ? $("#nafswarning") : $("<span id='nafswarning'>")).css({"color":"#F00","font-weight":"bold"}).text(msg);
        $("#report_list").before(warning);
    }
}

function splitOutCoords(str, num, removeBrackets){
    str = str.trim();
    if (typeof num === "boolean"){
        if (typeof removeBrackets === "undefined") {
            removeBrackets = num;
            num = undefined;
        } else if (typeof removeBrackets === "number"){
            temp = removeBrackets;
            removeBrackets = num;
            num = temp;
        }
    }
    if (typeof num === "undefined") num = 1;

    if (typeof removeBrackets === "undefined") removeBrackets = false;
    num = parseInt(num);

    var results = str.match(/\((\d{2}|\d{3})\|(\d{2}|\d{3})\)/g);
    if (typeof results !== "object") return false;

    var index = num > 0 ? num-1 : num === 0 ? 0 : results.length+num;
    if (0 <= index && index < results.length)
        return removeBrackets ? results[index].split("(")[1].split(")")[0] : results[index];
    else return false;
}

function insertTroops(troops) {
    $("[id*='unit_input_']").val("");
    for (var troop in troops) {
        var troopName = "";
        for (var troopID in troopList) {
            if (fixTroopName(troop) === troopList[troopID]) {
                troopName = troopList[troopID];
            }
        }
        $("#unit_input_" + troopName).val(troops[troop]);
    }
}

function targetVil(vilCoords){
    if (vilCoords.indexOf(")") !== -1) vilCoords = vilCoords.match(/(\d{2}|\d{3})\|(\d{2}|\d{3})/g)[0];
    $("#inputx").val(vilCoords.split("|")[0]);
    $("#inputy").val(vilCoords.split("|")[1]);
    $("#unit_input_spear").focus();
}

function def() {
    var nafsData = getLocalStorage();
    var localCoords = getLocalCoords();
    var localData = nafsData.villages[localCoords] || nafsData.villages[localCoords[0] + "|" + localCoords[1]];

    /*Assume we're not gonna try AJAX-ing a report list page. It probably wouldn't be sensible, if the user wants any feedback.*/
    if (getQuery("screen") === "report"){
        if (getQuery("view") === "" && getQuery("mode") === "attack") {
            /*Report: Attack menu*/
            $("#report_list tr:has(td) .quickedit-content").each(function(index, element){
                var reportURL = $("a", this);
                if (reportURL.length < 1) {
                    /*This report has no URL. Woo?*/
                    this.innerHTML += " - no report URL";
                } else {
                    reportURL = reportURL.attr("href");
                    var reportElement = this;

                    var ajx = jQuery.ajax(reportURL,
                        {type: "GET",
                        dataType: "html",
                        async: true,
                        error: function(jqXHR, textStatus, errorThrown) {
                            reportElement.innerHTML += " - report failed to load (see console for more info)";
                            console.log("Report failed to load via AJAX. Status: " + textStatus + "; error: " + errorThrown);
                        },
                        success: function(responseData, textStatus, jqXHR) {
                            var fakeDOM = $("<div>");
                            fakeDOM.get(0).class = "NAFSReportDOM";
                            fakeDOM.html(responseData);

                            var progressReport = processReport(fakeDOM, getQueryFromHaystack(reportURL, "view"));

                            if (progressReport === true) {
                                reportElement.innerHTML += " - " + _("Saved");

                                var reportCheckbox = $("input[type='checkbox']", $(reportElement).parents("#report_list tr"));
                                if (reportCheckbox.length === 1) {
                                    reportCheckbox.prop("checked", true);
                                } else {
                                    console.log("Couldn't check box of element " + index);
                                }
                            } else {
                                reportElement.innerHTML += " - " + progressReport;
                            }
                            /*Cleanup*/
                            fakeDOM.html("");
                        }
                    });
                }
            });
        } else if (getQuery("view") !== "") {
            /*We're on an individual report!*/
            processReport(document, getQuery("view"));
        } else if (getQuery("view") === "" && (getQuery("mode") === "all" || getQuery("mode") === "")) {
            errorBox(_("Please run this from the 'attacks' menu!"));
        }
    } else if (getQuery("screen") === "place" && $("#units_form").length === 0 && $("#command-data-form").length === 0) {
        /*Rally confirm page.*/
        if (!localData) {
            errorBox(_("Are you sure you've imported some reports?"));
            return;
        }

        var targetCoords = splitOutCoords($(".village_anchor").text(), true);
        var vilIndex;
        localData.forEach(function(element, index) {
            if (element.coords === targetCoords) vilIndex = index;
        });
        if (typeof vilIndex === "undefined") {
            errorBox(_("Are you sure this village is in the NAFS list?"));
            $("#troop_confirm_go").focus();
            return;
        }
        var nafsLocalData = localData;
        var targetVillage = nafsLocalData[vilIndex];
        var latestReport = targetVillage && targetVillage.reports && targetVillage.reports[0];
        if (latestReport) {
            var catTarget;
            catables.forEach(function(element, index) {
                if (catTarget) return;
                if (latestReport.buildings && latestReport.buildings[element.id] && latestReport.buildings[element.id] > element.lowest) {
                    catTarget = element.id;
                }
            });
            if (catTarget) {
                $("select[name='building']").val(catTarget);
                $("select[name='building']").after($("#nafsMsg") || $("<span id='nafsMsg' style='color:#0A0;'>" + _("Changed") + "</span>"));
            }
        }
        $("#troop_confirm_go").focus();
    } else if (getQuery("screen") === "place" && ($("#units_form").length > 0 || $("#command-data-form").length > 0)) {
        /*Rally page.*/
        if (!localData) {
            errorBox(_("Are you sure you've imported some reports?"));
            return;
        }

        var errorBo = $(".error_box");
        if (errorBo.length > 0) {
            if (errorBo.text().trim().indexOf("can only attack each other when the bigger player's") !== -1 || errorBo.text().trim().indexOf("has been banned and cannot be attacked") !== -1) {
                var vilCoords = $(".village-name");
                var coordsFound = false;
                if (vilCoords.length > 0) {
                    vilCoords = splitOutCoords(vilCoords.text(), true);
                    if (vilCoords){
                        var vilIndex;
                        localData.forEach(function(element, index) {
                            if (element.coords === vilCoords) vilIndex = index;
                        });
                        if (typeof vilIndex !== "undefined") {
                            coordsFound = true;
                            localData[vilIndex].disabled = true;
                            $(".error_box").html("Previous farm disabled. Please <a href='" + window.location.href.replace("&try=confirm", "") .replace(/\&target\=\d*/, "") + "'>reopen the rally point</a>)");
                        }
                    }
                }
                if (!coordsFound) {
                    errorBox("Unable to disable village. Is it in the NAFS list?");
                }
            }
        } else {
            var troopsEntered = false;

            var rescout = getSetting("rescout", true);
            var minScout = getSetting("minScout", 1);
            var hoursToRescout = getSetting("hoursToRescout", 36);
            var hoursToStale = getSetting("hoursToStale", 12); /*?*/

            var farm = getSetting("farm", true);
            var minFarmTroops = objectifyTroopSettings("minFarmTroops");
            var maxFarmTroops = objectifyTroopSettings("maxFarmTroops");
            var leaveFarmTroops = objectifyTroopSettings("leaveFarmTroops");

            var shape = getSetting("shape", true);
            var catapult = getSetting("catapult", true);
            var catFarmToZero = getSetting("catFarmToZero", false);
            var catapultWalls = getSetting("catapultWalls", true);
            var ramWalls = getSetting("ram", true);
            var minWallLevel = getSetting("minWallLevel", 1);
            var minShapeTroops = objectifyTroopSettings("minShapeTroops");
            var maxShapeTroops = objectifyTroopSettings("maxShapeTroops");
            var leaveShapeTroops = objectifyTroopSettings("leaveShapeTroops");

            var troopsEntered = false;

            localData.forEach(function(element, index, array) {
                if (troopsEntered) return false;
                var alreadyAttacking = false;
                $(".quickedit-content span").each(function() {
                    if ($(this).text().indexOf(_("Attack on")) !== -1 && splitOutCoords($(this).text(), true) === element.coords) alreadyAttacking = true;
                });
                if (!alreadyAttacking && !element.disabled) {
                    var latestReport = element.reports && element.reports[0];
                    if (!latestReport) return false;
                    var targetCoords = element.coords;
/*{rescout {minScout, hoursToRescout, hoursToStale}, farm {minFarmTroops (sp,sw,ax,ar,lc,ma,hc), maxFarmTroops (sp,sw,ax,ar,lc,ma,hc), leaveFarmTroops (sp,sw,ax,ar,sc,lc,ma,hc,pa)}, shape {catapult {catFarmToZero}, [catapultWalls, ram] {minWallLevel}, minShapeTroops (sp,sw,ax,ar,lc,ma,hc,pa), maxShapeTroops (sp,sw,ax,ar,lc,ma,hc,pa), leaveShapeTroops (sp,sw,ax,ar,sc,lc,ma,hc,pa)}, playerImport}*/

                    var minimumAchieved = false;
                    var troops = {spy: minScout};
                    /*Shaping is allowed, we have building data, and either we're not rescouting or it's under the hours to rescout value.*/
                    if (shape && latestReport.buildings && (!rescout || (Number(new Date()) - latestReport.battleTime) <= hoursToRescout * 60 * 60 * 1000) && getMaxTroop("spy") > leaveShapeTroops.spy) {
                        var wallLevel = latestReport.buildings.wall;

                        if ((ramWalls || catapultWalls) && wallLevel && wallLevel >= minWallLevel) {
                            /*We're ramming or catting walls. We have a wall that's greater than or equal to the minimum level.*/
                            for (var speedGroupID = speedGroups.length-1; speedGroupID>=0; speedGroupID--) {
                                /*Group 0 is the fasters, therefore this goes slowest first.*/
                                for (var unitID in speedGroups[speedGroupID]){
                                    if (minimumAchieved) break;

                                    var unit = speedGroups[speedGroupID][unitID];
                                    if (unitCarry[fixTroopName(unit)] === 0) continue;
                                    var troopCount = Math.min(getMaxTroop(unit) - leaveShapeTroops[unit], maxShapeTroops[unit] === -1 ? getMaxTroop(unit) : maxShapeTroops[unit]);
                                    if (troopCount >= minShapeTroops[unit] && troopCount > 0) {
                                        minimumAchieved = true;
                                        troops[unit] = troopCount;
                                    }
                                }
                            }

                            if (minimumAchieved) {
                                if (ramWalls && getMaxTroop("ram") - leaveShapeTroops.ram >= minShapeTroops.ram && getMaxTroop("ram") - leaveShapeTroops.ram >= ramsMin[wallLevel]) {
                                    /*Ram walls, and we have enough to fulfill the min criteria (user-set and to take a wall)*/
                                    var ramCount = Math.min(ramsRequired[wallLevel], getMaxTroop("ram") - leaveShapeTroops.ram, maxShapeTroops.ram === -1 ? getMaxTroop("ram") : maxShapeTroops.ram);
                                    if (ramCount >= ramsMin[wallLevel] && ramCount >= minShapeTroops.ram && ramCount > 0) {
                                        /*Enough for minimum. Enough for leaving. Under the max. Ready to ram with these rams.*/
                                        if (ramCount < ramsRequired[wallLevel]) {
                                            /*We should really use catapults to supplement this... Oh well.*/
                                        }

                                        troops.ram = ramCount;

                                        console.log("Ram wall shaping! Village " + targetCoords);
                                        insertTroops(troops);
                                        targetVil(targetCoords);

                                        troopsEntered = true;
                                        return false;
                                    }
                                }
                                if (catapultWalls && getMaxTroop("catapult") - leaveShapeTroops.catapult >= minShapeTroops.catapult && getMaxTroop("catapult") - leaveShapeTroops.catapult >= catsMin[wallLevel]) {
                                    var catCount = Math.min(catsRequiredToBreak[0][wallLevel], getMaxTroop("catapult") - leaveShapeTroops.catapult, maxShapeTroops.catapult === -1 ? getMaxTroop("catapult") : maxShapeTroops.catapult);
                                    if (catCount >= catsMin[wallLevel] && catCount >= minShapeTroops.catapult && catCount > 0) {
                                        /*Enough for minimum. Enough for leaving. Under the max. Ready to ram with these rams.*/
                                        /*For now we'll just deal with cats and rams separately, m'kay? Rams take priority.*/

                                        troops.catapult = catCount;

                                        console.log("Catapult wall shaping! Village " + targetCoords);
                                        insertTroops(troops);
                                        targetVil(targetCoords);

                                        troopsEntered = true;
                                        return false;
                                    }
                                }
                            }
                        }

                        minimumAchieved = false;
                        troops = {spy: minScout};
                        if (catapult) {
                            for (var speedGroupID = speedGroups.length-1; speedGroupID>=0; speedGroupID--) {
                                /*Group 0 is the fasters, therefore this goes slowest first.*/
                                for (var unitID in speedGroups[speedGroupID]){
                                    if (minimumAchieved) break;

                                    var unit = speedGroups[speedGroupID][unitID];
                                    var troopCount = Math.min(getMaxTroop(unit) - leaveShapeTroops[unit], maxShapeTroops[unit] === -1 ? getMaxTroop(unit) : maxShapeTroops[unit]);
                                    if (troopCount >= minShapeTroops[unit] && troopCount > 0) {
                                        minimumAchieved = true;
                                        troops[unit] = troopCount;
                                    }
                                }
                            }

                            if (minimumAchieved) {
                                var catTarget;
                                var catTargetLevel;
                                var catTargetMin;
                                catables.forEach(function(element, index) {
                                    if (catTarget) return false;
                                    if (latestReport.buildings[element.id] && latestReport.buildings[element.id] > element.lowest) {
                                        catTarget = element.id;
                                        catTargetLevel = latestReport.buildings[element.id];
                                        catTargetMin = element.lowest;
                                    }
                                });

                                /*catapultWalls && getMaxTroop("catapult") - leaveShapeTroops.catapult >= minShapeTroops.catapult && getMaxTroop("catapult") - leaveShapeTroops.catapult >= catsMin[wallLevel]) {
                                    var catCount = Math.min(catsRequiredToBreak[0][wallLevel], getMaxTroop("catapult") - leaveShapeTroops.catapult, maxShapeTroops.catapult === -1 ? getMaxTroop("catapult") : maxShapeTroops.catapult);
                                    if (catCount >= catsMin[wallLevel] && catCount >= minShapeTroops.catapult) {*/
                                if (getMaxTroop("catapult") - leaveShapeTroops.catapult >= minShapeTroops.catapult && getMaxTroop("catapult") - leaveShapeTroops.catapult >= catsMin[catTargetLevel]) {
                                    var catCount = Math.min(catsRequiredToBreak[catTargetMin][catTargetLevel], getMaxTroop("catapult") - leaveShapeTroops.catapult, maxShapeTroops.catapult === -1 ? getMaxTroops("catapult") : maxShapeTroops.catapult);
                                    if (catCount >= catsMin[catTargetLevel] && catCount >= minShapeTroops.catapult && catCount > 0) {
                                        troops.catapult = catCount;

                                        console.log("Catapult shaping! Village " + targetCoords);
                                        insertTroops(troops);
                                        targetVil(targetCoords);

                                        troopsEntered = true;
                                        return false;
                                    }
                                }
                            }
                        }
                    }

                    minimumAchieved = false;
                    troops = {spy: minScout};
                    if (farm && (!rescout || (Number(new Date()) - latestReport.battleTime) <= hoursToRescout * 60 * 60 * 1000) && getMaxTroop("spy") > leaveShapeTroops.spy) {
                        var hoursAgo = (Number(new Date()) - latestReport.battleTime) / 60 / 60 / 1000;
                        var origWood = latestReport.wood,
                            origClay = latestReport.clay,
                            origIron = latestReport.iron;
                        var woodCamp = latestReport.buildings.woodcamp,
                            clayCamp = latestReport.buildings.claycamp,
                            ironCamp = latestReport.buildings.ironcamp,
                            warehouse = latestReport.buildings.warehouse;
                        var currWood = Math.min(origWood + (resourceRates[woodCamp] * hoursAgo * getWorldSpeed()), warehouseCapacity[warehouse]),
                            currClay = Math.min(origClay + (resourceRates[clayCamp] * hoursAgo * getWorldSpeed()), warehouseCapacity[warehouse]),
                            currIron = Math.min(origIron + (resourceRates[ironCamp] * hoursAgo * getWorldSpeed()), warehouseCapacity[warehouse]);

                        var distance = element.distance;

                        var sendingTroops = false;
                        for (var speedGroupID = 0; speedGroupID<speedGroups.length; speedGroupID++) {
                            /*Group 0 is the fasters, therefore this goes fastest first.*/
                            var slowestSpeedofGroup = slowestSpeedofGroups[speedGroupID];
                            var hours = distance * (slowestSpeedofGroup / getUnitSpeed()) / 60;
                            var newWood = currWood + (resourceRates[woodCamp] * hours * getWorldSpeed()),
                                newClay = currClay + (resourceRates[clayCamp] * hours * getWorldSpeed()),
                                newIron = currIron + (resourceRates[ironCamp] * hours * getWorldSpeed());
                            var possibleHaul = newWood + newClay + newIron;
                            for (var unitID in speedGroups[speedGroupID]){
                                var unit = speedGroups[speedGroupID][unitID];
                                var troopCount = Math.min(getMaxTroop(unit) - leaveFarmTroops[unit], maxFarmTroops[unit] === -1 ? getMaxTroop(unit) : maxFarmTroops[unit], Math.ceil(possibleHaul / unitCarry[unit]));
                                if (troopCount >= minFarmTroops[unit] && troopCount > 0) {
                                    possibleHaul -= unitCarry[unit] * troopCount;
                                    sendingTroops = true;
                                    troops[unit] = troopCount;
                                }
                            }
                            if (sendingTroops) break;
                        }

                        if (sendingTroops) {
                            console.log("Farming! Village " + targetCoords);
                            insertTroops(troops);
                            targetVil(targetCoords);

                            troopsEntered = true;
                            return false;
                        }
                    }

                    minimumAchieved = false; /*Unnecessary, but oh well.*/
                    troops = {spy: minScout};
                    if (rescout && (Number(new Date()) - latestReport.battleTime) > hoursToRescout * 60 * 60 * 1000 && getMaxTroop("spy") > leaveShapeTroops.spy) {
                        /*It's time to rescout. We also have at least 1 scout "available".*/
                        console.log("Rescouting! Village " + targetCoords);
                        insertTroops(troops);
                        targetVil(targetCoords);

                        troopsEntered = true;
                        return false;
                    }
                }
                if (index === array.length - 1) {
                    errorBox(_("No villages left to attack! Either add more villages, or wait for the attacks to complete."));
                }
            });
        }
    } else if (getQuery("screen") === "info_village"){
        /*Probably incomplete! FIX IT TOMORROW! TODO: Fix this better tomorrow!!!!*/
        var vilTable = $("#content_value table table[width='100%']");
        var vilCoords = $("tr:contains('" + _("Coordinates") + "')", vilTable).text().split(":")[1].split("|");
        var localCoords = getLocalCoords();
        var tribe = $("tr:contains('" + _("Tribe") + "')", vilTable);

        var vilIndex;
        localData.forEach(function(element, index) {
            if (element.coords === (vilCoords[0] + "|" + vilCoords[1])) vilIndex = index;
        });
        var clickText = "";
        var type = -2;
        if (typeof vilIndex === "undefined"){
            clickText = _("Add to farm list for ") + getLocalName();
            type = -1;
        } else if (localData[vilIndex].disabled){
            clickText = _("Enable farm for ") + getLocalName();
            type = 1;
        } else {
            clickText = _("Disable farm for ") + getLocalName();
            type = 0;
        }
        var thingy = $("<tr><td colspan='2'></td></tr>");
        var thingy2 = $("<tr><td colspan='2'></td></tr>").css("display", "none");
        $("td", thingy).append($("<a style='cursor:pointer;'>» " + clickText + "</a>").on("click", function() {
            var nafsData = getLocalStorage();
            if (type === -1){
                vilIndex = localData.push({
                    coords: (vilCoords[0] + "|" + vilCoords[1]),
                    disabled: false,
                    distance: (Math.floor(Math.sqrt(Math.pow(vilCoords[0]-localCoords[0],2)+Math.pow(vilCoords[1]-localCoords[1],2))*100)/100),
                    reports: [ ]
                });
                localData.sort(function(a, b){
                    return a.distance - b.distance;
                });
                $("td", thingy2).text(_("Added"));
            } else {
                var vilIndex;
                localData.forEach(function(element, index) {
                    if (element.coords === (vilCoords[0] + "|" + vilCoords[1])) vilIndex = index;
                });
                if (type === 0){
                    localData[vilIndex].disabled = true;
                    $("td", thingy2).text(_("Disabled"));
                } else {
                    localData[vilIndex].disabled = false;
                    $("td", thingy2).text(_("Enabled"));
                }
            }
            setLocalStorage(nafsData);
            thingy.css("display", "none");
            thingy2.css("display", "");
        }));
        ($("tr:contains('" + _("Actions") + "')", vilTable).length > 0 ? $("tr:contains('" + _("Actions") + "')", vilTable) : tribe).after(thingy).after(thingy2);
    }
    setLocalStorage(nafsData);
}

/*Returns either a boolean ("It went well!") or a message of what went wrong.*/
/*Returns: WENTWELL (boolean) - used to decide whether to add "SAVED" onto the end or not...*/
function processReport(doc, reportID){
    /*We're on *a* report screen.*/
    var espionage = $("#attack_spy_resources, #attack_spy_buildings_left", doc);
    if (espionage.length >= 1) {
        /* NEW REPORT STYUHL */
        var repTable = espionage.closest("tbody");
        var defender = $("#attack_info_def th:not(:contains('" + _("Defender") + "'))", repTable);
        if (!getSetting("playerImport", true) && defender.length >= 1 && !defender.text().match("---")){
            var linkd = $("<span>" + _("Saved") + "</span>");
            repTable.parent().before(linkd);
            linkd.text("Defender seems to be a player, and config says not to import - not saved");
            return "The defender appears to be a player.";
        }

        var attackerVillage = $("#attack_info_att th:not(:contains('" + _("Attacker") + "'))", repTable).closest("tbody").find("tr:contains('Origin') td:not(:contains('Origin'))");
        var localCoords = splitOutCoords(attackerVillage.text(), true).split("|");

        var defenderVillage = $("#attack_info_def th:not(:contains('" + _("Defender") + "'))", repTable).closest("tbody").find("tr:contains('Destination') td:not(:contains('Destination'))");
        var vilCoords = splitOutCoords(defenderVillage.text(), true).split("|");

        var resources = $("#attack_spy_resources td", repTable);
        var resz = resources.text().trim().split(/\s+/);
        if (resources.get(0).innerHTML.indexOf("wood") === -1){
            resz.unshift("0");
        }
        if (resources.get(0).innerHTML.indexOf("stone") === -1){
            if (resz[1]) { resz.push(resz[1]); resz[1] = "0"; }
            else resz.push("0");
        }
        if (resources.get(0).innerHTML.indexOf("iron") === -1){
            resz.push("0");
        }
        var wood = parseInt(resz[0].replace(".", "")),
            clay = parseInt(resz[1].replace(".", "")),
            iron = parseInt(resz[2].replace(".", ""));
        var battleTimeText = $($("tr td", repTable).get(1)).text().trim().replace(/:\d{3}/, "") + serverTimezones[window.location.host.split(/\W+/)[0].substring(0, 2)];
        /* Format: MMM(M?) D(D), YYYY HH:mm:ss:mmm GMT+HHmm */
        var timeThings = battleTimeText.match(/[\w-+]+/g);
        var month = 0;
        for (var i=0; i<months.length; i++){
            if (timeThings[0].match(new RegExp(_(months[i]),"i"))) {
                month = i+1;
            }
        }
        var date = parseInt(timeThings[1]);
        var year = parseInt(timeThings[2]);
        var hour = parseInt(timeThings[3]);
        var minute = parseInt(timeThings[4]);
        var second = parseInt(timeThings[5]);
        var offsets = timeThings[6].replace("GMT", "");
        var offsetz = [];
        offsetz[0] = offsets.substring(0, 1);
        offsetz[1] = offsets.substring(1, 3);
        offsetz[2] = offsets.substring(3, 5);
        var offset = ((offsetz[0] === "+") ? -1 : 1) * (parseInt(offsetz[1])*60 + parseInt(offsetz[2]));
        minute += offset;

        var day = new Date();
        day.setUTCFullYear(year);
        day.setUTCMonth(month-1);
        day.setUTCDate(date);
        day.setUTCHours(hour);
        day.setUTCMinutes(minute);
        day.setUTCSeconds(second);

        var battleTime = day;
        var buildings;
        var woodCamp, clayCamp, ironCamp, warehouse;
        if ($("#attack_spy_building_data", repTable).length >= 1){
            buildings = JSON.parse($("#attack_spy_building_data", repTable).val());
            buildings.forEach(function(element, index, array){
                if (element.id === "wood") woodCamp = parseInt(element.level);
                if (element.id === "stone") clayCamp = parseInt(element.level);
                if (element.id === "iron") ironCamp = parseInt(element.level);
                if (element.id === "storage") warehouse = parseInt(element.level);
                if (element.id === "wall") wall = parseInt(element.level);
            });
            woodCamp = (isNaN(woodCamp)) ? 0 : woodCamp;
            clayCamp = (isNaN(clayCamp)) ? 0 : clayCamp;
            ironCamp = (isNaN(ironCamp)) ? 0 : ironCamp;
            warehouse = (isNaN(warehouse)) ? 0 : warehouse;
            wall = (isNaN(wall)) ? 0 : wall;
        } else {
            woodCamp = 5;
            clayCamp = 5;
            ironCamp = 5;
            warehouse = 10;
            wall = 0;
        }
        var buildz = {};
        buildz.woodcamp = woodCamp;
        buildz.claycamp = clayCamp;
        buildz.ironcamp = ironCamp;
        buildz.warehouse = warehouse;
        buildz.wall = wall;

        if (buildings) {
            buildings.forEach(function(element, index, array){
                buildz[element.id] = parseInt(element.level);
            });
        }

        buildz.barracks = buildz.barracks || 0;
        buildz.place = buildz.place || 0;
        buildz.stable = buildz.stable || 0;
        buildz.garage = buildz.garage || 0;
        buildz.snob = buildz.snob || 0;
        buildz.smith = buildz.smith || 0;
        buildz.statue = buildz.statue || 0;
        buildz.market = buildz.market || 0;
        buildz.main = buildz.main || 0;
        buildz.farm = buildz.farm || 0;

        var linkd = $("<span>" + _("Saved") + "</span>");
        linkd.css("display", "none");

        repTable.parent().before(linkd);
        var progress = addReport(parseInt(reportID), localCoords, vilCoords, wood, clay, iron, battleTime, buildz);
        if (progress === true){
            linkd.text(_("Saved"));
            linkd.css("display", "block").css("color", "");
            console.log("Saved a report! - " + localCoords[0] + "|" + localCoords[1] + " - " + vilCoords[0] + "|" + vilCoords[1] + " - " + parseInt(reportID));
            return true;
        } else {
            linkd.text("Oops! There was an error.");
            linkd.css("display", "block").css("color", "#F00");
            console.log("Error with a report! - " + localCoords[0] + "|" + localCoords[1] + " - " + vilCoords[0] + "|" + vilCoords[1] + " - " + parseInt(reportID));
            return progress;
        }
    } else if ($("#attack_spy", doc).length >= 1) {
        /*OLD STYLE *BLERGH* */
        var espionage = $("#attack_spy", doc);
        var repTable = espionage.parent().parent().parent();
        var defender = $("#attack_info_def th:not(:contains('" + _("Defender") + "'))", repTable);
        if (!getSetting("playerimport", true) && defender.length >= 1 && !defender.text().match("---")){
            var linkd = $("<span>" + _("Saved") + "</span>");
            repTable.parent().before(linkd);
            linkd.text("Defender seems to be a player, and config says not to import - not saved");
            return "The defender appears to be a player.";
        }

        var attackerVillage = $("#attack_info_att th:not(:contains('" + _("Attacker") + "'))", repTable).closest("tbody").find("tr:contains('Origin') td:not(:contains('Origin'))");
        var localCoords = splitOutCoords(attackerVillage.text(), true).split("|");

        var defenderVillage = $("#attack_info_def th:not(:contains('" + _("Defender") + "'))", repTable).closest("tbody").find("tr:contains('Destination') td:not(:contains('Destination'))");
        var vilCoords = splitOutCoords(defenderVillage.text(), true).split("|");

        var resources = $($("tr td", espionage).get(0));
        var resz = resources.text().trim().split("  ");
        if (resources.get(0).innerHTML.indexOf("wood") === -1){
            resz.unshift("0");
        }
        if (resources.get(0).innerHTML.indexOf("stone") === -1){
            if (resz[1]) { resz.push(resz[1]); resz[1] = "0"; }
            else resz.push("0");
        }
        if (resources.get(0).innerHTML.indexOf("iron") === -1){
            resz.push("0");
        }
        var wood = parseInt(resz[0].replace(".", "")),
            clay = parseInt(resz[1].replace(".", "")),
            iron = parseInt(resz[2].replace(".", ""));
        var battleTimeText = $($("tr td", repTable).get(1)).text().trim().replace(/:\d{3}/, "") + serverTimezones[window.location.host.split(/\W+/)[0].substring(0, 2)];
        /* Format: MMM(M?) D(D), YYYY HH:mm:ss:mmm GMT+HHmm */
        var timeThings = battleTimeText.match(/[\w-+]+/g);
        var month = 0;
        for (var i=0; i<months.length; i++){
            if (timeThings[0].match(new RegExp(_(months[i]),"i"))) {
                month = i+1;
            }
        }
        var date = parseInt(timeThings[1]);
        var year = parseInt(timeThings[2]);
        var hour = parseInt(timeThings[3]);
        var minute = parseInt(timeThings[4]);
        var second = parseInt(timeThings[5]);
        var offsets = timeThings[6].replace("GMT", "");
        var offsetz = [];
        offsetz[0] = offsets.substring(0, 1);
        offsetz[1] = offsets.substring(1, 3);
        offsetz[2] = offsets.substring(3, 5);
        var offset = ((offsetz[0] === "+") ? -1 : 1) * (parseInt(offsetz[1])*60 + parseInt(offsetz[2]));
        minute += offset;

        var day = new Date();
        day.setUTCFullYear(year);
        day.setUTCMonth(month-1);
        day.setUTCDate(date);
        day.setUTCHours(hour);
        day.setUTCMinutes(minute);
        day.setUTCSeconds(second);

        var battleTime = day;
        var buildings;
        var woodCamp, clayCamp, ironCamp, warehouse, wall;
        if ($("tr", espionage).length >= 2){
            buildings = espionage.text();
            woodCamp = parseInt(buildings.replace(new RegExp("[\\s\\S]*" + _("Timber camp") + " \\(" + _("Level") + " "), "").replace(/\)[\s\S]*/, ""));
            clayCamp = parseInt(buildings.replace(new RegExp("[\\s\\S]*" + _("Clay pit") + " \\(" + _("Level") + " "), "").replace(/\)[\s\S]*/, ""));
            ironCamp = parseInt(buildings.replace(new RegExp("[\\s\\S]*" + _("Iron mine") + " \\(" + _("Level") + " "), "").replace(/\)[\s\S]*/, ""));
            warehouse = parseInt(buildings.replace(new RegExp("[\\s\\S]*" + _("Warehouse") + " \\(" + _("Level") + " "), "").replace(/\)[\s\S]*/, ""));
            wall = parseInt(buildings.replace(new RegExp("[\\s\\S]*" + _("Wall") + " \\(" + _("Level") + " "), "").replace(/\)[\s\S]*/, ""));
            woodCamp = (isNaN(woodCamp)) ? 0 : woodCamp;
            clayCamp = (isNaN(clayCamp)) ? 0 : clayCamp;
            ironCamp = (isNaN(ironCamp)) ? 0 : ironCamp;
            warehouse = (isNaN(warehouse)) ? 0 : warehouse;
            wall = (isNaN(wall)) ? 0 : wall;
        } else {
            var woodCamp = 5,
                clayCamp = 5,
                ironCamp = 5,
                warehouse = 10,
                wall = 0;
        }
        var buildz = {};
        buildz.woodcamp = woodCamp;
        buildz.claycamp = clayCamp;
        buildz.ironcamp = ironCamp;
        buildz.warehouse = warehouse;
        buildz.wall = wall;
        /*CHURCH*/
        buildz.barracks = buildings && parseInt(buildings.replace(new RegExp("[\\s\\S]*" + _("Barracks") + " \\(" + _("Level") + " "), "").replace(/\)[\s\S]*/, "")) || 0;
        buildz.place = buildings && parseInt(buildings.replace(new RegExp("[\\s\\S]*" + _("Rally point") + " \\(" + _("Level") + " "), "").replace(/\)[\s\S]*/, "")) || 0;
        buildz.stable = buildings && parseInt(buildings.replace(new RegExp("[\\s\\S]*" + _("Stable") + " \\(" + _("Level") + " "), "").replace(/\)[\s\S]*/, "")) || 0;
        buildz.garage = buildings && parseInt(buildings.replace(new RegExp("[\\s\\S]*" + _("Workshop") + " \\(" + _("Level") + " "), "").replace(/\)[\s\S]*/, "")) || 0;
        buildz.snob = buildings && parseInt(buildings.replace(new RegExp("[\\s\\S]*" + _("Academy") + " \\(" + _("Level") + " "), "").replace(/\)[\s\S]*/, "")) || 0;
        buildz.smith = buildings && parseInt(buildings.replace(new RegExp("[\\s\\S]*" + _("Smithy") + " \\(" + _("Level") + " "), "").replace(/\)[\s\S]*/, "")) || 0;
        buildz.statue = buildings && parseInt(buildings.replace(new RegExp("[\\s\\S]*" + _("Statue") + " \\(" + _("Level") + " "), "").replace(/\)[\s\S]*/, "")) || 0;
        buildz.market = buildings && parseInt(buildings.replace(new RegExp("[\\s\\S]*" + _("Market") + " \\(" + _("Level") + " "), "").replace(/\)[\s\S]*/, "")) || 0;
        buildz.main = buildings && parseInt(buildings.replace(new RegExp("[\\s\\S]*" + _("Headquarters") + " \\(" + _("Level") + " "), "").replace(/\)[\s\S]*/, "")) || 0;
        buildz.farm = buildings && parseInt(buildings.replace(new RegExp("[\\s\\S]*" + _("Farm") + " \\(" + _("Level") + " "), "").replace(/\)[\s\S]*/, "")) || 0;
        var linkd = $("<span>" + _("Saved") + "</span>");
        linkd.css("display", "none");

        repTable.parent().before(linkd);
        var progress = addReport(parseInt(reportID), localCoords, vilCoords, wood, clay, iron, battleTime, buildz);
        if (progress === true){
            linkd.text("Saved");
            linkd.css("display", "block").css("color", "");
            console.log("Saved a report! - " + localCoords[0] + "|" + localCoords[1] + " - " + vilCoords[0] + "|" + vilCoords[1] + " - " + parseInt(reportID));
            return true;
        } else {
            linkd.text("Oops! There was an error.");
            linkd.css("display", "block").css("color", "#F00");
            console.log("Error with a report! - " + localCoords[0] + "|" + localCoords[1] + " - " + vilCoords[0] + "|" + vilCoords[1] + " - " + parseInt(reportID));
            return progress;
        }
    }
}