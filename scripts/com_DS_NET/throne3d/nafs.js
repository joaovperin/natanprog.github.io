var serverTimezones = {"en" : " GMT+0100", "zz" : " GMT+0200", "no" : " GMT+0200"};
var resourceSp = [0, 30, 35, 41, 47, 55, 64, 74, 86, 100, 117, 136, 158, 184, 214, 249, 289, 337, 391, 455, 530, 616, 717, 833, 
                    969, 1127, 1311, 1525, 1774, 2063, 2400];
var warehouseC = [0, 1000, 1229, 1512, 1859, 2285, 2810, 3454, 4247, 5222, 6420, 7893, 9705, 11932, 14670, 18037, 22177, 27266, 
                    33523, 41217, 50675, 62305, 76604, 94184, 115798, 142373, 175047, 215219, 264611, 325337, 400000];
var carry = {"spear": 25, "sword": 15, "axe": 10, "archer": 10, "scout": 0, "lc": 80, "ma": 50, "hc": 50, "ram": 0, "cat": 0, "paladin": 100}
var speed = {"spear": 18, "sword": 22, "axe": 18, "archer": 18, "scout": 9, "lc": 10, "ma": 10, "hc": 11, "ram": 30, "cat": 30}
var xmlConfig;
/*HQ (1), Barracks (0), Stable (0), Workshop (0), Church (0), Academy (0), Smithy (0), Rally Point (0), Statue (0), Market (0), 
    Timber Camp (leave), Clay Pit (leave), Iron Mine (leave), Farm (1), Warehouse (leave), Hiding Place (impossible), Wall (0)*/
var ramsRequired = [0, 2, 4, 7, 10, 14, 19, 24, 30, 37, 45, 55, 65, 77, 91, 106, 124, 143, 166, 191, 219];
var ramsMin = [0, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 6, 6];
var catsRequiredTo = [
    /*From [0,1,2, 3, 4, 5, 6, 7, 8, 9,10,11,12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,  29,  30]*/
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
var catsMin = [0,2,2,2,3,3,3,3,3,4,4,4,5,5,6,6,6,7,8,8,9,10,10,11,12,13,15,16,17,19,20];
var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
var _a = {
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
var worldLetters = window.location.host.split(/\W+/)[0].substring(0, 2);
var lang = (localStorage && localStorage.twstuffz && JSON.parse(localStorage.twstuffz)["settings"] && JSON.parse(localStorage.twstuffz)["settings"]["lang"]) || (_a[worldLetters] && worldLetters) || "en";
var catables = [
    {"name" : _("Farm"), "deloc" : "farm", "lowest" : (getSetting("catFarmToZero", false) ? 1 : 12), "select" : "farm"},
    {"name" : _("Headquarters"), "deloc" : "hq", "lowest" : 1, "select" : "main"},
    {"name" : _("Barracks"), "deloc" : "barracks", "lowest" : 0, "select" : "barracks"},
    {"name" : _("Stable"), "deloc" : "stable", "lowest" : 0, "select" : "stable"},
    {"name" : _("Workshop"), "deloc" : "workshop", "lowest" : 0, "select" : "garage"},
    {"name" : _("Academy"), "deloc" : "academy", "lowest" : 0, "select" : "snob"},
    {"name" : _("Smithy"), "deloc" : "smithy", "lowest" : 0, "select" : "smith"},
    {"name" : _("Rally point"), "deloc" : "rally", "lowest" : 0, "select" : "place"},
    {"name" : _("Statue"), "deloc" : "statue", "lowest" : 0, "select" : "statue"},
    {"name" : _("Market"), "deloc" : "market", "lowest" : 0, "select" : "market"}
];

function _(thing){
    return (_a[lang] && _a[lang][thing]) || (_a["en"] && _a["en"][thing]) || thing;
}

/*
Changelog:
2014-08-27, 1.0.7:
-Allows changing of minimum wall level required to send rams.

2014-08-19, 1.0.6:
-New option to prevent import of reports with a player as the defender
-Truly fixed the localization thing (and the stupid page thing - beta has changed that village overview page YET AGAIN)

2014-08-19, 1.0.5c:
-Fixed localizations (duh. forgot to add it for "Coordinates" >_>)

2014-08-19, 1.0.5b:
-Fixed it to work with the new report layout (oops?)
-Fixed it to work with the new village overview layout (hopefully?)

2014-08-15, 1.0.5a:
-Allows more troop variety...

2014-08-01, 1.0.5:
-Now allows the choice of axes or spears (or whichever is available) for catapulting.
-Now allows the choice of spears, swords, axes, LC and mounted archers for regular farming.

2014-07-28, 1.0.4b:
-Fixed a bug relating to ignorance of the "ram" config...

2014-06-29, 1.0.4a:
-Fixed a bug relating to an attack having no millisecond value in the date...

2014-06-28, 1.0.4:
-Modified how it handles dates... made it work on Opera with weird months and stuuf (stupid non-locale handling... y u no follo Chrome? D:<)

2014-06-24, 1.0.3:
-Slight change to method of retrieving resources in village (might have ignored thousands previously? o.o)

2014-06-14, 1.0.2:
-Catapults farm to level 12 now... (Configurable)
-Slight change in the handling of "catsRequiredTo[one/zero]" - now a double array [to][from] instead of To(One/Zero)[from]...

2014-06-14, 1.0.1:
-Allow setting the number of scouts to send

2014-06-07, 1.0.0:
-First release! (Kinda already been released to some people though... and will be released more...)
-Since last version (betas, duh), will now disable banned villages, villages that are too large to be attacked (if on a world with the 140% rule thingy)
-Also has a config script!

*/

function getQuery(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getQueryFromHaystack(haystack, name){
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(haystack);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getLocalCoords() {
    return $("#menu_row2").text().split("(")[1].split(")")[0].split("|");
}

function getLocalName() {
    return $("#menu_row2 a.nowrap").text();
}

function getXML(){
    if (xmlConfig === undefined){
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

function getWorldSpeed(){
    return parseFloat(getXML().getElementsByTagName("speed")[0].childNodes[0].nodeValue);
}

function getUnitSpeed(){
    return parseFloat(getXML().getElementsByTagName("unit_speed")[0].childNodes[0].nodeValue);
}

var settings;

/*Settings change: javascript:void(jQuery.getScript('http://pastebin.com/raw.php?i=Vx28j5bu'));
 *javascript:
 */
 
function changeConfig(){
    function clearDisabledFarms(where){
        if (!localStorage) return false;
        if (!localStorage["twstuffz"]) localStorage["twstuffz"] = "{}";
        var twStuffz = JSON.parse(localStorage["twstuffz"]);
        
        if (typeof where === "undefined"){
            for (place in twStuffz){
                if (place.indexOf(",") !== -1){
                    clearDisabledFarms(place);
                }
            }
        } else {
            if (place.indexOf(",") !== -1 && twStuffz[place]){
                vil = twStuffz[place];
                for (i=0; i<vil.length; i++){
                    if (vil[i].disabled){
                        vil.splice(i, 1);
                        i--;
                    }
                }
                localStorage["twstuffz"] = JSON.stringify(twStuffz);
            }
        }
    }
    function getSetting(index, defaul){
        if (!localStorage) return false;
        if (!localStorage["twstuffz"]) localStorage["twstuffz"] = "{}";
        var twStuffz = JSON.parse(localStorage["twstuffz"]);
        if (!twStuffz.settings) twStuffz.settings = {};
        if (typeof twStuffz.settings[index] === "undefined"){
            twStuffz.settings[index] = defaul;
            localStorage["twstuffz"] = JSON.stringify(twStuffz);
        }
        if (twStuffz.settings[index] === "true") return true;
        if (twStuffz.settings[index] === "false") return false;
        return twStuffz.settings[index];
    }
    function changeSetting(index, value){
        if (!localStorage) return false;
        if (!localStorage["twstuffz"]) localStorage["twstuffz"] = "{}";
        var twStuffz = JSON.parse(localStorage["twstuffz"]);
        if (!twStuffz.settings) twStuffz.settings = {};
        
        if (value === "true") value = true;
        if (value === "false") value = false;
        
        twStuffz.settings[index] = value;
        localStorage["twstuffz"] = JSON.stringify(twStuffz);
        return true;
    }
    alert("We will now change the settings of this farming script! Please do not CANCEL, nor type in random stuff, as you will have to redo this!");
    changeSetting("rescout", prompt("Should we re-scout farms with old/stale reports? (true/false)", getSetting("rescout", true)) == "true");
    changeSetting("farm", prompt("Should we farm villages? (true/false)", getSetting("farm", true)) == "true");
    if (getSetting("rescout", true) == true) changeSetting("minScout", parseInt(prompt("How many scouts to send at a minimum per attack?", getSetting("minScout", 1))));
    if (getSetting("farm", true) == true) changeSetting("minLC", parseInt(prompt("How many troops to send at a minimum per farming attack?", getSetting("minLC", 6))));
    if (getSetting("farm", true) == true) {
        var farmWith = prompt("Which troops should we farm with? (spear, sword, axe, archer, lc, ma, hc - separate by commas, no spaces)", 
                                getSetting("farmWith", "lc"));
        var farmWiths = farmWith.replace(/\s+/g, "").split(",");
        farmWiths.forEach(function(element, index, array){ 
            if (["spear", "sword", "axe", "archer", "lc", "ma", "hc"].indexOf(element.toLowerCase().replace(/[sS]$/, "")) === -1){
                alert("Invalid unit type: " + element.toLowerCase());
            } else {
                array[index] = element.toLowerCase().replace(/[sS]$/, "");
            }
        });
        changeSetting("farmWith", farmWiths.join(","));
    }
    changeSetting("hoursToRescout", parseInt(prompt("How many hours until a report expires? (Affected by world speed)", getSetting("hoursToRescout", 36))));
    if (getSetting("rescout", true) == true) changeSetting("hoursToStale", parseInt(prompt("How many hours until a report becomes 'stale' and may be rescouted? (Affected by world speed)", getSetting("hoursToStale", 10))));
    changeSetting("catapult", prompt("Should we use catapults to shape farms? (true/false)", getSetting("catapult", true)) == "true");
    if (getSetting("catapult", true) == true) changeSetting("catFarmToZero", prompt("Should we catapult farms to zero? (Otherwise about level 12 - true/false)", getSetting("catFarmToZero", false)) == "true")
    changeSetting("ram", prompt("Should we use rams to knock down farm walls? (true/false)", getSetting("ram", true)) == "true");
    changeSetting("minWallRam", parseInt(prompt("What should the minimum wall level required to send rams be?", getSetting("minWallRam", 1))));
    if (getSetting("catapult", true) == true || getSetting("ram", true) == true){
        var shapeAlong = prompt("Which troops should we send along with catapults/rams? (spear, sword, axe, archer, lc, ma, hc - separate by commas, no spaces)", 
                                getSetting("shapeAlong", "axe"));
        var shapeAlongs = shapeAlong.replace(/\s+/g, "").split(",");
        shapeAlongs.forEach(function(element, index, array){ 
            if (["spear", "sword", "axe", "archer", "lc", "ma", "hc"].indexOf(element.toLowerCase().replace(/[sS]$/, "")) === -1){
                alert("Invalid unit type: " + element.toLowerCase());
            } else {
                array[index] = element.toLowerCase().replace(/[sS]$/, "");
            }
        });
        changeSetting("shapeAlong", shapeAlongs.join(","));
    }
    if (getSetting("ram", true) == true || getSetting("catapult", true) == true) changeSetting("minAxe", parseInt(prompt("How many troops to send at a minimum along with catapults per shaping attack?", getSetting("minAxe", 25))));
	changeSetting("playerimport", prompt("Should we import reports with players as the defenders? (true/false)", getSetting("playerimport", true)) == "true");
    if (prompt("Clear disabled villages from the farm list? (true/false)", "false") == "true") clearDisabledFarms();
}

function getSetting(index, defaul){
    if ((index === "hoursToRescout" || index === "hoursToStale") && !getSetting("rescout", true)){
        return 300000;
    }
    if (!settings){
        if (!localStorage) return false;
        if (!localStorage["twstuffz"]) localStorage["twstuffz"] = "{}";
        var twStuffz = JSON.parse(localStorage["twstuffz"]);
        if (!twStuffz.settings) twStuffz.settings = {};
        settings = twStuffz.settings;
    }
    if (typeof settings[index] === "undefined"){
        if (!localStorage) return false;
        if (!localStorage["twstuffz"]) localStorage["twstuffz"] = "{}";
        var twStuffz = JSON.parse(localStorage["twstuffz"]);
        if (!twStuffz.settings) twStuffz.settings = {};
        twStuffz.settings[index] = defaul;
        settings[index] = defaul;
        localStorage["twstuffz"] = JSON.stringify(twStuffz);
    }
    if (settings[index] === "true") return true;
    if (settings[index] === "false") return false;
    return settings[index];
}

/*
function changeSetting(index, value){
    if (!localStorage) return false;
    if (!localStorage["twstuffz"]) localStorage["twstuffz"] = "{}";
    var twStuffz = JSON.parse(localStorage["twstuffz"]);
    if (!twStuffz.settings) twStuffz.settings = {};
    twStuffz.settings[index] = value;
    localStorage["twstuffz"] = JSON.stringify(twStuffz);
    return true;
}
*/

function changeSetting(index, value){
    if (!localStorage) return false;
    if (!localStorage["twstuffz"]) localStorage["twstuffz"] = "{}";
    var twStuffz = JSON.parse(localStorage["twstuffz"]);
    if (!twStuffz.settings) twStuffz.settings = {};
    
    if (value === "true") value = true;
    if (value === "false") value = false;
    
    twStuffz.settings[index] = value;
    localStorage["twstuffz"] = JSON.stringify(twStuffz);
    /*twstuffs {
        settings : {
            rescout: true(/false),
            farm: true(/false),
            minLC: 6,
            minAxe: 25,
            hoursToRescout: 36,
            hoursToStale: 10,
            catapult: true(/false),
            ram: true(/false),
            ...
        },
        xxx|yyy : [ ... ]
    }
    */
    settings[index] = value;
    return true;
}

function addReport(reportID, localCoords, vilCoords, wood, clay, iron, battleTime, buildings){
    if (!localStorage) return false;
    if (!localStorage["twstuffz"]) localStorage["twstuffz"] = "{}";
    var twStuffz = JSON.parse(localStorage["twstuffz"]);
    if (!twStuffz[localCoords]) twStuffz[localCoords] = [];
    var vilIndex;
    twStuffz[localCoords].forEach(function(element, index) {
        if (element.coords === (vilCoords[0] + "|" + vilCoords[1])) vilIndex = index;
    });
    if (typeof vilIndex === "undefined"){
        vilIndex = twStuffz[localCoords].push({
            coords: (vilCoords[0] + "|" + vilCoords[1]),
            disabled: false,
            distance: (Math.floor(Math.sqrt(Math.pow(vilCoords[0]-localCoords[0],2)+Math.pow(vilCoords[1]-localCoords[1],2))*100)/100),
            reports: [ ]
        });
        twStuffz[localCoords].sort(function(a, b){
            return a.distance - b.distance;
        });
    }
    
    var vilIndex = undefined;
    twStuffz[localCoords].forEach(function(element, index) {
        if (element.coords === (vilCoords[0] + "|" + vilCoords[1])) vilIndex = index;
    });
    
    if (typeof vilIndex === "undefined"){ /*Something has gone wrong! Not there even after we created it; wut?*/
        console.log("just created, no exist. wut.");
        return false;
    }
    
    if (twStuffz[localCoords][vilIndex].disabled){
        return false;
    }
    
    if (typeof buildings["barracks"] === "undefined") buildings["barracks"] = 0;
    if (typeof buildings["rally"] === "undefined") buildings["rally"] = 0;
    if (typeof buildings["stable"] === "undefined") buildings["stable"] = 0;
    if (typeof buildings["workshop"] === "undefined") buildings["workshop"] = 0;
    if (typeof buildings["academy"] === "undefined") buildings["academy"] = 0;
    if (typeof buildings["smithy"] === "undefined") buildings["smithy"] = 0;
    if (typeof buildings["statue"] === "undefined") buildings["statue"] = 0;
    if (typeof buildings["market"] === "undefined") buildings["market"] = 0;
    if (typeof buildings["hq"] === "undefined") buildings["hq"] = 0;
    if (typeof buildings["farm"] === "undefined") buildings["farm"] = 0;
    if (typeof buildings["wall"] === "undefined") buildings["wall"] = 0;
    
    battleTime = Number(battleTime);
    var exists = false;
    twStuffz[localCoords][vilIndex]["reports"].forEach(function(element){
        if (element["reportID"] === reportID) exists = true;
    });
    if (!exists) twStuffz[localCoords][vilIndex]["reports"].push({
        "reportID" : reportID,
        "battleTime" : battleTime,
        "wood" : wood,
        "clay" : clay,
        "iron" : iron,
        "buildings" : buildings
    });
    
    twStuffz[localCoords][vilIndex]["reports"].sort(function(a, b) {
        return b["battleTime"] - a["battleTime"];
    });
    
    while (twStuffz[localCoords][vilIndex]["reports"].length > 1) { twStuffz[localCoords][vilIndex]["reports"].pop() };
    
    localStorage["twstuffz"] = JSON.stringify(twStuffz);
    return true;
}

function insertUnits(troops, minTroops){
    if (getQuery("screen") !== "place"){
        console.log("Wrong screen. Should be at rally point.");
        return false;
    }
    if (typeof minTroops === "undefined") minTroops = {};
    
    if (troops["scout"]) troops["spy"] = troops["scout"];
    if (minTroops["scout"]) minTroops["spy"] = minTroops["scout"];
    if (troops["lc"]) troops["light"] = troops["lc"];
    if (minTroops["lc"]) troops["light"] = troops["lc"];
    
    var maxSpy = parseInt($("#unit_input_spy").parent("td").text().split("(")[1].split(")")[0]),
        maxSpear = parseInt($("#unit_input_spear").parent("td").text().split("(")[1].split(")")[0]),
        maxSword = parseInt($("#unit_input_sword").parent("td").text().split("(")[1].split(")")[0]),
        maxAxe = parseInt($("#unit_input_axe").parent("td").text().split("(")[1].split(")")[0]),
        maxArcher = $("#unit_input_archer").length > 0 ? parseInt($("#unit_input_archer").parent("td").text().split("(")[1].split(")")[0]) : 0,
        maxLight = parseInt($("#unit_input_light").parent("td").text().split("(")[1].split(")")[0]),
        maxMA = $("#unit_input_marcher").length > 0 ? parseInt($("#unit_input_marcher").parent("td").text().split("(")[1].split(")")[0]) : 0,
        maxHeavy = parseInt($("#unit_input_heavy").parent("td").text().split("(")[1].split(")")[0]),
        maxRam = parseInt($("#unit_input_ram").parent("td").text().split("(")[1].split(")")[0]),
        maxCatapult = parseInt($("#unit_input_catapult").parent("td").text().split("(")[1].split(")")[0]);
    
    var doneGood = true;
    
    $("#unit_input_archer").length < 1 && delete troops["archer"] && delete minTroops["archer"];
    $("#unit_input_marcher").length < 1 && delete troops["ma"] && delete minTroops["ma"];
    
    if ((minTroops["spy"] && minTroops["spy"] > maxSpy) || (!minTroops["spy"] && troops["spy"] && troops["spy"] > maxSpy)) doneGood = false;
    if ((minTroops["spear"] && minTroops["spear"] > maxSpear) || (!minTroops["spear"] && troops["spear"] && troops["spear"] > maxSpear)) doneGood = false;
    if ((minTroops["sword"] && minTroops["sword"] > maxSword) || (!minTroops["sword"] && troops["sword"] && troops["sword"] > maxSword)) doneGood = false;
    if ((minTroops["axe"] && minTroops["axe"] > maxAxe) || (!minTroops["axe"] && troops["axe"] && troops["axe"] > maxAxe)) doneGood = false;
    if ((minTroops["archer"] && minTroops["archer"] > maxArcher) || (!minTroops["archer"] && troops["archer"] && troops["archer"] > maxArcher)) doneGood = false;
    if ((minTroops["light"] && minTroops["light"] > maxLight) || (!minTroops["light"] && troops["light"] && troops["light"] > maxLight)) doneGood = false;
    if ((minTroops["ma"] && minTroops["ma"] > maxMA) || (!minTroops["ma"] && troops["ma"] && troops["ma"] > maxMA)) doneGood = false;
    if ((minTroops["heavy"] && minTroops["heavy"] > maxHeavy) || (!minTroops["heavy"] && troops["heavy"] && troops["heavy"] > maxHeavy)) doneGood = false;
    if ((minTroops["ram"] && minTroops["ram"] > maxRam) || (!minTroops["ram"] && troops["ram"] && troops["ram"] > maxRam)) doneGood = false;
    if ((minTroops["catapult"] && minTroops["catapult"] > maxCatapult) || (!minTroops["catapult"] && troops["catapult"] && troops["catapult"] > maxCatapult)) doneGood = false;
    
    if (doneGood){
        troops["spy"] && $("#unit_input_spy").val((troops["spy"] <= maxSpy) ? troops["spy"] : maxSpy);
        troops["spear"] && $("#unit_input_spear").val((troops["spear"] <= maxSpear) ? troops["spear"] : maxSpear);
        troops["sword"] && $("#unit_input_sword").val((troops["sword"] <= maxSword) ? troops["sword"] : maxSword);
        troops["axe"] && $("#unit_input_axe").val((troops["axe"] <= maxAxe) ? troops["axe"] : maxAxe);
        troops["archer"] && $("#unit_input_archer").val((troops["archer"] <= maxArcher) ? troops["archer"] : maxArcher);
        troops["light"] && $("#unit_input_light").val((troops["light"] <= maxLight) ? troops["light"] : maxLight);
        troops["ma"] && $("#unit_input_marcher").val((troops["ma"] <= maxMA) ? troops["ma"] : maxMA);
        troops["heavy"] && $("#unit_input_heavy").val((troops["heavy"] <= maxHeavy) ? troops["heavy"] : maxHeavy);
        troops["ram"] && $("#unit_input_ram").val((troops["ram"] <= maxRam) ? troops["ram"] : maxRam);
        troops["catapult"] && $("#unit_input_catapult").val((troops["catapult"] <= maxCatapult) ? troops["catapult"] : maxCatapult);
    }
    
    (!doneGood || !troops["spy"]) && $("#unit_input_spy").val() !== "" && $("#unit_input_spy").val("");
    (!doneGood || !troops["spear"]) && $("#unit_input_spear").val() !== "" && $("#unit_input_spear").val("");
    (!doneGood || !troops["sword"]) && $("#unit_input_sword").val() !== "" && $("#unit_input_sword").val("");
    (!doneGood || !troops["axe"]) && $("#unit_input_axe").val() !== "" && $("#unit_input_axe").val("");
    (!doneGood || !troops["archer"]) && $("#unit_input_archer").val() !== "" && $("#unit_input_archer").val("");
    (!doneGood || !troops["light"]) && $("#unit_input_light").val() !== "" && $("#unit_input_light").val("");
    (!doneGood || !troops["ma"]) && $("#unit_input_marcher").val() !== "" && $("#unit_input_marcher").val("");
    (!doneGood || !troops["heavy"]) && $("#unit_input_heavy").val() !== "" && $("#unit_input_heavy").val("");
    (!doneGood || !troops["ram"]) && $("#unit_input_ram").val() !== "" && $("#unit_input_ram").val("");
    (!doneGood || !troops["catapult"]) && $("#unit_input_catapult").val() !== "" && $("#unit_input_catapult").val("");
    
    return doneGood;
}

function def(){
    if (!localStorage){ alert("ERROR: You don't have LocalStorage! Please update to a newer browser - this script won't work for you."); return; }
    if (getQuery("screen") === "report"){
        if (getQuery("view") === "" && (getQuery("mode") === "all" || getQuery("mode") === "")) {
            if ($("#twswarning").length === 0)
                $("#report_list").before($("<span id='twswarning' style='color:#F00;font-weight:bold;'>" + _("Please run this from the 'attacks' menu!") + "</span>"));
        } else if (getQuery("view") === "" && getQuery("mode") === "attack"){
            /*We're on the report screen.*/
            $("#report_list tbody tr:has(img) .quickedit-content").each(function(index){
                /*var name = this.innerText.split("(")[1].split(")")[0];
                if (name !== getLocalName()) //not from this village
                    return;*/
                var coords = $(this).text().trim().split("(")[2].split(")")[0].split("|");
                var localCoords = getLocalCoords();
                /*this.innerHTML += " - " + (Math.round(Math.sqrt(Math.pow(coords[0] - localCoords[0], 2) + Math.pow(coords[1] - localCoords[1], 2)) * 100) / 100);*/
                var a = jQuery.ajax($("a", $(this)).attr("href"), {type: "GET", dataType:"html", async:false});
                var b = a.responseText;
                var c = $("<div></div>");
                c.get(0).id = "TWSReportThing";
                c.html(b);
                if (doReport(c, getQueryFromHaystack($("a", $(this)).attr("href"), "view"))){
                    this.innerHTML += " - " + _("SAVED");
                    $("input[type='checkbox']", $(this).parent().parent().parent()).prop("checked", true);
                } else {
                    this.innerHTML += " - " + _("NOT SAVED");
                }
            });
        } else {
            doReport(document, getQuery("view"));
        }
    //$("#units_form").length === 0 : we r not on regular rally page.
    //$("#units_form").length >= 1  : we r on regular rally page.
    } else if (getQuery("screen") === "place" && $("#units_form").length === 0){
        var twStuffz = localStorage && localStorage.twstuffz && JSON.parse(localStorage.twstuffz);
        var localCoords = getLocalCoords();
        var twStuffzLocal = twStuffz && twStuffz[localCoords];
        if (!twStuffzLocal){
            console && console.log && console.log("Go import some reports fgs >.>");
        } else {
            var vilCoords = $(".village_anchor").text().split("(")[1].split(")")[0].split("|");
            var vilIndex;
            twStuffzLocal.forEach(function(element, index) {
                if (element.coords === (vilCoords[0] + "|" + vilCoords[1])) vilIndex = index;
            });
            if (typeof vilIndex === "undefined"){
                console && console.log && console.log("Go import some reports for this village fgs >.>");
            } else {
                var villageDat = twStuffzLocal[vilIndex]
                var latestReport = villageDat && villageDat["reports"] && villageDat["reports"][0];
                if (latestReport){
                    var catThing;
                    catables.forEach(function(element, index, array){ 
                        if (catThing) return; 
                        if (latestReport 
                          && latestReport["buildings"] 
                          && latestReport["buildings"][element.deloc] 
                          && latestReport["buildings"][element.deloc] > element.lowest) {
                            element.current = latestReport["buildings"][element.deloc];
                            catThing = element;
                        }
                    });
                    if (catThing){
                        $("select[name='building']").val(catThing.select);
                        $("select[name='building']").after($("#catThingy").get(0) || $("<span id='catThingy' style='color:#0A0;'>" + _("Changed") + "</span>").get(0));
                        
                    }
                    $("#troop_confirm_go").focus();
                }
            }
        }
    //$("#units_form").length === 0 : we r not on regular rally page.
    //$("#units_form").length >= 1  : we r on regular rally page.
    } else if (getQuery("screen") === "place" && $("#units_form").length >= 1){
        var linke = ($("#twstuffzerror").length >= 1) ? $("#twstuffzerror") : $("<span id='twstuffzerror'>ERROR_MSG</span>").css("color", "#F00");
        linke.css("display", "none");
        $($("#units_form table").get(0)).before(linke);
        (function(){
            var twStuffz = localStorage && localStorage["twstuffz"] && JSON.parse(localStorage["twstuffz"]);
            var twStuffzLocal = twStuffz && twStuffz[getLocalCoords()];
            if (!twStuffzLocal){
                linke.text(_("Are you sure you've imported some reports?")).css("display", "block");
            } else {
                var errorBoxText = $(".error_box").text().trim();
                if (errorBoxText.indexOf("can only attack each other when the bigger player's points") !== -1
                    || errorBoxText.indexOf("has been banned and cannot be attacked") !== -1){
                    //Go disable teh village. - banned or too large/small.
                    var vilCoords = $(".village-name").length >= 1 && $(".village-name").text().trim().split("(")[1].split(")")[0];
                    if (vilCoords){
                        var twStuffz = localStorage && localStorage["twstuffz"] && JSON.parse(localStorage["twstuffz"]);
                        var twStuffzLocal = twStuffz && twStuffz[getLocalCoords()];
                        var vilIndex;
                        twStuffzLocal.forEach(function(element, index) {
                            if (element.coords === vilCoords) vilIndex = index;
                        });
                        twStuffz[getLocalCoords()][vilIndex].disabled = true;
                        localStorage.twstuffz = JSON.stringify(twStuffz);
                        $(".error_box").html("Previous farm disabled... (Please <a href='" + window.location.href.replace("&try=confirm", "").replace(/\&target\=\d*/, "") + "'>reopen rally point</a>)");
                    }
                } else {
                    linke.css("display", "none").text("ERROR_MSG");
                    /* First check for things to (catapult and) ram. Reports expire in 36 hours / world speed.*/
                    var troopsEntered = false;
                    twStuffzLocal.forEach(function(element, index, array){
                        if (troopsEntered) return false;
                        var alreadyAttacking = false;
                        $(".quickedit-content span").each(function(){
                            if ($(this).text().trim().indexOf(_("Attack on")) !== -1 && $(this).text().trim().split("(")[1].split(")")[0] === element.coords)
                                alreadyAttacking = true;
                        });
        /*Wall (0), HQ (1), Barracks (0), Stable (0), Workshop (0), Church (0), Academy (0), Smithy (0), Rally Point (0), Statue (0), Market (0), 
        Timber Camp (leave), Clay Pit (leave), Iron Mine (leave), Farm (1), Warehouse (leave), Hiding Place (impossible)*/
                        if (!alreadyAttacking && !element["disabled"]){
                            var latestReport = element && element["reports"] && element["reports"][0];
                            var shouldCat = getSetting("catapult", true);
                            var shouldRam = getSetting("ram", true);
                            var wall = (shouldRam) ? latestReport && latestReport["buildings"] && latestReport["buildings"]["wall"] : 0;
                            if (!shouldCat && !shouldRam) return;
							var catThing;
                            if (shouldCat) catables.forEach(function(element, index, array){ 
                                if (catThing) return; 
                                if (latestReport 
                                  && latestReport["buildings"] 
                                  && latestReport["buildings"][element.deloc] 
                                  && latestReport["buildings"][element.deloc] > element.lowest) {
                                    element.current = latestReport["buildings"][element.deloc];
                                    catThing = element;
                                }
                            });
                            if (latestReport && (Number(new Date()) - latestReport.battleTime) < ((getSetting("hoursToRescout", 36) * 60 * 60 * 1000) / getWorldSpeed())
                                  && latestReport["buildings"] && (latestReport["buildings"]["wall"] > getSetting("minWallRam", 1) || catThing)){
                                var units = {spy:getSetting("minScout", 1)};
                                var shapeAlong = getSetting("farmAlong", "axe").split(",");
                                if (wall >= getSetting("minWallRam", 1)) units["ram"] = ramsRequired[wall];
                                if (catThing) units["catapult"] = catsRequiredTo[catThing.lowest][catThing.current];
                                var minUnits = {spy:getSetting("minScout", 1)};
                                if (wall >= getSetting("minWallRam", 1)) minUnits["ram"] = ramsMin[wall];
                                if (catThing) minUnits["catapult"] = catsMin[catThing.current];
                                
                                for (var i=0; i<shapeAlong.length; i++){
                                    if (troopsEntered) break;
                                    units[shapeAlong[i]] = getSetting("minAxe", 25);
                                    minUnits[shapeAlong[i]] = getSetting("minAxe", 25);
                                    
                                    if (insertUnits(units, minUnits)){
                                        $("#inputx").val(element.coords.split("|")[0]); 
                                        $("#inputy").val(element.coords.split("|")[1]);
                                        
                                        $('#unit_input_spear').focus();
                                        troopsEntered = true;
                                    } else {
                                        if (catThing){
                                            delete units.ram;
                                            delete minUnits.ram;
                                        }
                                        if (insertUnits(units, minUnits)){
                                            $("#inputx").val(element.coords.split("|")[0]); 
                                            $("#inputy").val(element.coords.split("|")[1]);
                                            
                                            $('#unit_input_spear').focus();
                                            troopsEntered = true;
                                        } else {
                                            if (wall > 0){
                                                units.ram = ramsRequired[wall];
                                                minUnits.ram = ramsMin[wall];
                                                delete units.catapult;
                                                delete minUnits.catapult;
                                                if (insertUnits(units, minUnits)){
                                                    $("#inputx").val(element.coords.split("|")[0]); 
                                                    $("#inputy").val(element.coords.split("|")[1]);
                                                    
                                                    $('#unit_input_spear').focus();
                                                    troopsEntered = true;
                                                }
                                            }
                                        }
                                    }
                                }
                            } /*else continue as if village no existo*/
                        } /*else continue as if village no existo.*/
                    });
                    /*Let's check for things to just... y'know... farm via LC. Reports expire in 36 hours / world speed.*/
                    if (getSetting("farm", true))
                    twStuffzLocal.forEach(function(element, index, array){
                        if (troopsEntered) return false;
                        var alreadyAttacking = false;
                        $(".quickedit-content span").each(function(){
                            if ($(this).text().trim().indexOf(_("Attack on")) !== -1 && $(this).text().trim().split("(")[1].split(")")[0] === element.coords)
                                alreadyAttacking = true;
                        });
                        if (!alreadyAttacking && !element["disabled"]){
                            var latestReport = element && element["reports"] && element["reports"][0];
                            if (latestReport && (Number(new Date()) - latestReport.battleTime) < ((getSetting("hoursToRescout", 36) * 60 * 60 * 1000) / getWorldSpeed())){
                                var wood = latestReport.wood,
                                    clay = latestReport.clay,
                                    iron = latestReport.iron;
                                var woodCamp = latestReport.buildings.woodcamp,
                                    clayCamp = latestReport.buildings.claycamp,
                                    ironCamp = latestReport.buildings.ironcamp,
                                    warehouse = latestReport.buildings.warehouse;
                                var hoursAgo = (Number(new Date()) - latestReport.battleTime) / 60 / 60 / 1000;
                                var wood2 = wood + (resourceSp[woodCamp] * hoursAgo * getWorldSpeed()),
                                    clay2 = clay + (resourceSp[clayCamp] * hoursAgo * getWorldSpeed()),
                                    iron2 = iron + (resourceSp[ironCamp] * hoursAgo * getWorldSpeed());
                                wood2 = (wood2 > warehouseC[warehouse]) ? warehouseC[warehouse] : wood2;
                                clay2 = (clay2 > warehouseC[warehouse]) ? warehouseC[warehouse] : clay2;
                                iron2 = (iron2 > warehouseC[warehouse]) ? warehouseC[warehouse] : iron2;
                                var distance = element.distance;
                                var farmWith = getSetting("farmWith", "lc").split(",");
                                for (var i=0; i<farmWith.length; i++){
                                    if (troopsEntered) break;
                                    var hours = distance * (speed[farmWith[i]] / getUnitSpeed()) / 60;
                                    var wood3 = wood2 + (resourceSp[woodCamp] * hours * getWorldSpeed()),
                                        clay3 = clay2 + (resourceSp[clayCamp] * hours * getWorldSpeed()),
                                        iron3 = iron2 + (resourceSp[ironCamp] * hours * getWorldSpeed());
                                    wood3 = (wood3 > warehouseC[warehouse]) ? warehouseC[warehouse] : wood3;
                                    clay3 = (clay3 > warehouseC[warehouse]) ? warehouseC[warehouse] : clay3;
                                    iron3 = (iron3 > warehouseC[warehouse]) ? warehouseC[warehouse] : iron3;
                                    if ((wood3 + clay3 + iron3) / carry[farmWith[i]] + 0.25 >= getSetting("minLC", 6)){
                                        var units = {spy:getSetting("minScout", 1)},
                                            minUnits = {spy:getSetting("minScout", 1)};
                                        minUnits[farmWith[i]] = getSetting("minLC", 6);
                                        units[farmWith[i]] = Math.floor((wood3 + clay3 + iron3) / carry[farmWith[i]] + 0.25);
                                        if (insertUnits(units, minUnits)){
                                            $("#inputx").val(element.coords.split("|")[0]); 
                                            $("#inputy").val(element.coords.split("|")[1]);
                                            
                                            $('#unit_input_spear').focus();
                                            troopsEntered = true;
                                        }
                                    }
                                }
                                
                                
                            }
                        }
                    });
                    /*Okay. Nothing left under current report expiration. Time to re-scout dem viwwagez (that are over 10 hours / world speed old).*/
                    if (getSetting("rescout", true))
                    twStuffzLocal.forEach(function(element, index, array){
                        if (troopsEntered) return false;
                        var alreadyAttacking = false;
                        $(".quickedit-content span").each(function(){
                            if ($(this).text().trim().indexOf(_("Attack on")) !== -1 && $(this).text().trim().split("(")[1].split(")")[0] === element.coords)
                                alreadyAttacking = true;
                        });
                        if (!alreadyAttacking && !element["disabled"]){
                            var latestReport = element && element["reports"] && element["reports"][0];
                            if ((latestReport && (Number(new Date()) - latestReport.battleTime) > ((getSetting("hoursToStale", 10) * 60 * 60 * 1000) / getWorldSpeed())) || !latestReport){
                                if (insertUnits({spy:getSetting("minScout", 1)})){
                                    $("#inputx").val(element.coords.split("|")[0]); 
                                    $("#inputy").val(element.coords.split("|")[1]);
                                    
                                    $('#unit_input_spear').focus();
                                    troopsEntered = true;
                                }
                            }
                        }
                    });
                    
                    if (!troopsEntered) { 
                        linke.text(_("No villages left to attack! Either add more villages, or wait for the attacks to complete.")).css("display", "block"); 
                    }
                }
            }
        })();
    } else if (getQuery("screen") === "info_village"){
        var vilTable = $("#content_value table table[width='100%']");
        var vilCoords = $("tr:contains('" + _("Coordinates") + "')", vilTable).text().split(":")[1].split("|");
        var localCoords = getLocalCoords();
        var tribe = $("tr:contains('" + _("Tribe") + "')", vilTable)
        
        if (!localStorage) return false;
        if (!localStorage["twstuffz"]) localStorage["twstuffz"] = "{}";
        var twStuffz = JSON.parse(localStorage["twstuffz"]);
        if (!twStuffz[localCoords]) twStuffz[localCoords] = [];
        var vilIndex;
        twStuffz[localCoords].forEach(function(element, index) {
            if (element.coords === (vilCoords[0] + "|" + vilCoords[1])) vilIndex = index;
        });
        var clickText = "";
        var type = -2;
        if (typeof vilIndex === "undefined"){
            clickText = _("Add to farm list for ") + getLocalName();
            type = -1;
        } else if (twStuffz[localCoords][vilIndex].disabled){
            clickText = _("Enable farm for ") + getLocalName();
            type = 1;
        } else {
            clickText = _("Disable farm for ") + getLocalName();
            type = 0;
        }
        var thingy = $("<tr><td colspan='2'></td></tr>");
        var thingy2 = $("<tr><td colspan='2'></td></tr>").css("display", "none");
        $("td", thingy).append($("<a style='cursor:pointer;'>» " + clickText + "</a>").on("click", function(){
            if (!localStorage) return false;
            if (!localStorage["twstuffz"]) localStorage["twstuffz"] = "{}";
            var twStuffz = JSON.parse(localStorage["twstuffz"]);
            if (!twStuffz[localCoords]) twStuffz[localCoords] = [];
            if (type === -1){
                vilIndex = twStuffz[localCoords].push({
                    coords: (vilCoords[0] + "|" + vilCoords[1]),
                    disabled: false,
                    distance: (Math.floor(Math.sqrt(Math.pow(vilCoords[0]-localCoords[0],2)+Math.pow(vilCoords[1]-localCoords[1],2))*100)/100),
                    reports: [ ]
                });
                twStuffz[localCoords].sort(function(a, b){
                    return a.distance - b.distance;
                });
                $("td", thingy2).text(_("Added"));
            } else {
                var vilIndex;
                twStuffz[localCoords].forEach(function(element, index) {
                    if (element.coords === (vilCoords[0] + "|" + vilCoords[1])) vilIndex = index;
                });
                if (type === 0){
                    twStuffz[localCoords][vilIndex].disabled = true;
                    $("td", thingy2).text(_("Disabled"));
                } else {
                    twStuffz[localCoords][vilIndex].disabled = false;
                    $("td", thingy2).text(_("Enabled"));
                }
            }
            localStorage["twstuffz"] = JSON.stringify(twStuffz);
            thingy.css("display", "none");
            thingy2.css("display", "");
        }));
		($("tr:contains('" + _("Actions") + "')", vilTable).length > 0 ? $("tr:contains('" + _("Actions") + "')", vilTable) : tribe).after(thingy).after(thingy2);
    }
}

/*Returns: WENTWELL (boolean) - used to decide whether to add "SAVED" onto the end or not...*/
function doReport(doc, reportID){
    /*We're on *a* report screen.*/
    var espionage = $("#attack_spy_resources, #attack_spy_buildings_left", doc);
    if (espionage.length >= 1) {
		/* NEW REPORT STYUHL */
        var repTable = espionage.parent().parent().parent();
		var defender = $("#attack_info_def th:not(:contains('" + _("Defender") + "'))", repTable);
		if (!getSetting("playerimport", true) && defender.length >= 1 && !defender.text().match("---")){
			var linkd = $("<span>" + _("Saved") + "</span>");
			repTable.parent().before(linkd);
			linkd.text("Defender seems to be a player, and config says not to import - not saved");
			console && console.log && console.log("Not saved a report! - Player as defender, config says no.");
			return false;
		}
		
        var resources = $("#attack_spy_resources td", repTable);
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
        if ($("#attack_spy_building_data", repTable).length >= 1){
			buildings = JSON.parse($("#attack_spy_building_data", repTable).val());
			var woodCamp, clayCamp, ironCamp, warehouse;
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
            var woodCamp = 5,
                clayCamp = 5,
                ironCamp = 5,
                warehouse = 10,
                wall = 0;
        }
        var hoursAgo = (new Date() - battleTime) / 60 / 60 / 1000;
        var wood2 = wood + (resourceSp[woodCamp] * hoursAgo * getWorldSpeed()),
            clay2 = clay + (resourceSp[clayCamp] * hoursAgo * getWorldSpeed()),
            iron2 = iron + (resourceSp[ironCamp] * hoursAgo * getWorldSpeed());
        wood2 = (wood2 > warehouseC[warehouse]) ? warehouseC[warehouse] : wood2;
        clay2 = (clay2 > warehouseC[warehouse]) ? warehouseC[warehouse] : clay2;
        iron2 = (iron2 > warehouseC[warehouse]) ? warehouseC[warehouse] : iron2;
        
        var vilCoords = $($("#attack_info_def span a", repTable).get(0)).text().split("(")[1].split(")")[0].split("|"),
            localCoords = $($("#attack_info_att span a", repTable).get(0)).text().split("(")[1].split(")")[0].split("|"),
            distance = Math.round(Math.sqrt(Math.pow(vilCoords[0] - localCoords[0], 2) + Math.pow(vilCoords[1] - localCoords[1], 2)) * 100) / 100,
            hours = distance * (speed.lc / getUnitSpeed()) / 60;
        var wood3 = wood2 + (resourceSp[woodCamp] * hours * getWorldSpeed()),
            clay3 = clay2 + (resourceSp[clayCamp] * hours * getWorldSpeed()),
            iron3 = iron2 + (resourceSp[ironCamp] * hours * getWorldSpeed());
        wood3 = (wood3 > warehouseC[warehouse]) ? warehouseC[warehouse] : wood3;
        clay3 = (clay3 > warehouseC[warehouse]) ? warehouseC[warehouse] : clay3;
        iron3 = (iron3 > warehouseC[warehouse]) ? warehouseC[warehouse] : iron3;
        var buildz = {};
        buildz["woodcamp"] = woodCamp;
        buildz["claycamp"] = clayCamp;
        buildz["ironcamp"] = ironCamp;
        buildz["warehouse"] = warehouse;
        buildz["wall"] = wall;
		
		if (buildings) {
			buildings.forEach(function(element, index, array){
				if (element.id === "barracks") buildz.barracks = parseInt(element.level);
				if (element.id === "place") buildz.rally = parseInt(element.level);
				if (element.id === "stable") buildz.stable = parseInt(element.level);
				if (element.id === "garage") buildz.workshop = parseInt(element.level);
				if (element.id === "snob") buildz.academy = parseInt(element.level);
				if (element.id === "smith") buildz.smithy = parseInt(element.level);
				if (element.id === "statue") buildz.statue = parseInt(element.level);
				if (element.id === "market") buildz.market = parseInt(element.level);
				if (element.id === "main") buildz.hq = parseInt(element.level);
				if (element.id === "farm") buildz.farm = parseInt(element.level);
			});
		}
		
		buildz.barracks = buildz.barracks || 0;
		buildz.rally = buildz.rally || 0;
		buildz.stable = buildz.stable || 0;
		buildz.workshop = buildz.workshop || 0;
		buildz.academy = buildz.academy || 0;
		buildz.smithy = buildz.smithy || 0;
		buildz.statue = buildz.statue || 0;
		buildz.market = buildz.market || 0;
		buildz.hq = buildz.hq || 0;
		buildz.farm = buildz.farm || 0;
		
        var linkd = $("<span>" + _("Saved") + "</span>");
        linkd.css("display", "none");
        
        repTable.parent().before(linkd);
        var wentWell = false;
        (function(){
            if (addReport(parseInt(reportID), localCoords, vilCoords, wood, clay, iron, battleTime, buildz)){
                linkd.text(_("Saved"));
                linkd.css("display", "block").css("color", "");
                console && console.log && console.log("Saved a report! - " + localCoords[0] + "|" + localCoords[1] + " - " + vilCoords[0] + "|" + vilCoords[1] + " - " + parseInt(reportID));
                wentWell = true;
            } else {
                linkd.text("Oops! There was an error.");
                linkd.css("display", "block").css("color", "#F00");
                console && console.log && console.log("Error with a report! - " + localCoords[0] + "|" + localCoords[1] + " - " + vilCoords[0] + "|" + vilCoords[1] + " - " + parseInt(reportID));
            }
        })();
        
        var lcA1 = Math.floor((wood + clay + iron) / carry.lc + 0.25),
            lcA2 = Math.floor((wood2 + clay2 + iron2) / carry.lc + 0.25),
            lcA3 = Math.floor((wood3 + clay3 + iron3) / carry.lc + 0.25);
    } else if ($("#attack_spy", doc).length >= 1) {
		/*OLD STYLE *BLERGH* */
		var espionage = $("#attack_spy", doc);
        var repTable = espionage.parent().parent().parent();
		var defender = $("#attack_info_def th:not(:contains('" + _("Defender") + "'))", repTable);
		if (!getSetting("playerimport", true) && defender.length >= 1 && !defender.text().match("---")){
			var linkd = $("<span>" + _("Saved") + "</span>");
			repTable.parent().before(linkd);
			linkd.text("Defender seems to be a player, and config says not to import - not saved");
			console && console.log && console.log("Not saved a report! - Player as defender, config says no.");
			return false;
		}
		
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
        if ($("tr", espionage).length >= 2){
            buildings = espionage.text();
            var woodCamp = parseInt(buildings.replace(new RegExp("[\\s\\S]*" + _("Timber camp") + " \\(" + _("Level") + " "), "").replace(/\)[\s\S]*/, "")),
                clayCamp = parseInt(buildings.replace(new RegExp("[\\s\\S]*" + _("Clay pit") + " \\(" + _("Level") + " "), "").replace(/\)[\s\S]*/, "")),
                ironCamp = parseInt(buildings.replace(new RegExp("[\\s\\S]*" + _("Iron mine") + " \\(" + _("Level") + " "), "").replace(/\)[\s\S]*/, "")),
                warehouse = parseInt(buildings.replace(new RegExp("[\\s\\S]*" + _("Warehouse") + " \\(" + _("Level") + " "), "").replace(/\)[\s\S]*/, "")),
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
        var hoursAgo = (new Date() - battleTime) / 60 / 60 / 1000;
        var wood2 = wood + (resourceSp[woodCamp] * hoursAgo * getWorldSpeed()),
            clay2 = clay + (resourceSp[clayCamp] * hoursAgo * getWorldSpeed()),
            iron2 = iron + (resourceSp[ironCamp] * hoursAgo * getWorldSpeed());
        wood2 = (wood2 > warehouseC[warehouse]) ? warehouseC[warehouse] : wood2;
        clay2 = (clay2 > warehouseC[warehouse]) ? warehouseC[warehouse] : clay2;
        iron2 = (iron2 > warehouseC[warehouse]) ? warehouseC[warehouse] : iron2;
        /* vilCoords = $(".quickedit-label", repTable).text().split("(")[2].split(")")[0].split("|") */
        var vilCoords = $($("#attack_info_def span a", repTable).get(0)).text().split("(")[1].split(")")[0].split("|"),
            localCoords = $($("#attack_info_att span a", repTable).get(0)).text().split("(")[1].split(")")[0].split("|"), /* getLocalCoords() */
            distance = Math.round(Math.sqrt(Math.pow(vilCoords[0] - localCoords[0], 2) + Math.pow(vilCoords[1] - localCoords[1], 2)) * 100) / 100,
            hours = distance * (speed.lc / getUnitSpeed()) / 60;
        var wood3 = wood2 + (resourceSp[woodCamp] * hours * getWorldSpeed()),
            clay3 = clay2 + (resourceSp[clayCamp] * hours * getWorldSpeed()),
            iron3 = iron2 + (resourceSp[ironCamp] * hours * getWorldSpeed());
        wood3 = (wood3 > warehouseC[warehouse]) ? warehouseC[warehouse] : wood3;
        clay3 = (clay3 > warehouseC[warehouse]) ? warehouseC[warehouse] : clay3;
        iron3 = (iron3 > warehouseC[warehouse]) ? warehouseC[warehouse] : iron3;
        var buildz = {};
        buildz["woodcamp"] = woodCamp;
        buildz["claycamp"] = clayCamp;
        buildz["ironcamp"] = ironCamp;
        buildz["warehouse"] = warehouse;
        buildz["wall"] = wall;
        /*CHURCH*/
        buildz.barracks = buildings && parseInt(buildings.replace(new RegExp("[\\s\\S]*" + _("Barracks") + " \\(" + _("Level") + " "), "").replace(/\)[\s\S]*/, "")) || 0,
        buildz.rally = buildings && parseInt(buildings.replace(new RegExp("[\\s\\S]*" + _("Rally point") + " \\(" + _("Level") + " "), "").replace(/\)[\s\S]*/, "")) || 0,
        buildz.stable = buildings && parseInt(buildings.replace(new RegExp("[\\s\\S]*" + _("Stable") + " \\(" + _("Level") + " "), "").replace(/\)[\s\S]*/, "")) || 0,
        buildz.workshop = buildings && parseInt(buildings.replace(new RegExp("[\\s\\S]*" + _("Workshop") + " \\(" + _("Level") + " "), "").replace(/\)[\s\S]*/, "")) || 0,
        buildz.academy = buildings && parseInt(buildings.replace(new RegExp("[\\s\\S]*" + _("Academy") + " \\(" + _("Level") + " "), "").replace(/\)[\s\S]*/, "")) || 0,
        buildz.smithy = buildings && parseInt(buildings.replace(new RegExp("[\\s\\S]*" + _("Smithy") + " \\(" + _("Level") + " "), "").replace(/\)[\s\S]*/, "")) || 0,
        buildz.statue = buildings && parseInt(buildings.replace(new RegExp("[\\s\\S]*" + _("Statue") + " \\(" + _("Level") + " "), "").replace(/\)[\s\S]*/, "")) || 0,
        buildz.market = buildings && parseInt(buildings.replace(new RegExp("[\\s\\S]*" + _("Market") + " \\(" + _("Level") + " "), "").replace(/\)[\s\S]*/, "")) || 0,
        buildz.hq = buildings && parseInt(buildings.replace(new RegExp("[\\s\\S]*" + _("Headquarters") + " \\(" + _("Level") + " "), "").replace(/\)[\s\S]*/, "")) || 0,
        buildz.farm = buildings && parseInt(buildings.replace(new RegExp("[\\s\\S]*" + _("Farm") + " \\(" + _("Level") + " "), "").replace(/\)[\s\S]*/, "")) || 0;
        var linkd = $("<span>" + _("Saved") + "</span>");
        linkd.css("display", "none");
        
        repTable.parent().before(linkd);
        var wentWell = false;
        (function(){
            /*
            if ($("th[width=400] span.quickedit-label", repTable).get(0).innerText.split("(")[1].split(")")[0] !== getLocalName() && linkd.css("display") === "none") {
                linkd.text("This report doesn't appear to come from this village - Are you sure? ");
                linkd.css("display", "block").css("color", "#F00");
                console && console.log && console.log("Report not from this village - " + vilCoords[0] + "|" + vilCoords[1] + " - " + parseInt(reportID));
            } else {
            */
            if (addReport(parseInt(reportID), localCoords, vilCoords, wood, clay, iron, battleTime, buildz)){
                linkd.text("Saved");
                linkd.css("display", "block").css("color", "");
                console && console.log && console.log("Saved a report! - " + localCoords[0] + "|" + localCoords[1] + " - " + vilCoords[0] + "|" + vilCoords[1] + " - " + parseInt(reportID));
                wentWell = true;
            } else {
                linkd.text("Oops! There was an error.");
                linkd.css("display", "block").css("color", "#F00");
                console && console.log && console.log("Error with a report! - " + localCoords[0] + "|" + localCoords[1] + " - " + vilCoords[0] + "|" + vilCoords[1] + " - " + parseInt(reportID));
            }
            /* } */
        })();
        
        var lcA1 = Math.floor((wood + clay + iron) / carry.lc + 0.25),
            lcA2 = Math.floor((wood2 + clay2 + iron2) / carry.lc + 0.25),
            lcA3 = Math.floor((wood3 + clay3 + iron3) / carry.lc + 0.25);
    }
    return wentWell;
}