/*
javascript: var format = "{DefName} {DefCoord} [{DefTroopsRemain}] Wall: {Wall}"; $.getScript("http://pastebin.com/raw.php?i=TcBzhfKF", function(){ rename(format); });
{ReportID} - Report ID (e.g. 12221212)
{AtkName} - Attacker's Player Name (e.g. Nineza)
{AtkID} - Attacker's Player ID (e.g. 111223)
{AtkCoord} - Attacker's Village Coords (e.g. 555|444)
{AtkVilName} - Attacker's Village Name (e.g. 001)
{AtkVilID} - Attacker's village ID (e.g. 1221)
{AtkVilK} - Attacker's K/continent (e.g. K53)
{DefName} - Defender's Player Name (e.g. Throne3d)
{DefID} - Defender's Player ID (e.g. 222113)
{DefCoord} - Defender's Village Coords (e.g. 444|555)
{DefVilName} - Defender's Village Name (e.g. 002)
{DefVilID} - Defender's village ID (e.g. 2112)
{DefVilK} - Defender's K/continent (e.g. K51)
{Distance} - Distance between attacker and defender (e.g. 156.98)
{Resources} - Resources of the defending village (e.g. Wood:397400 Clay:397400 Iron:397440)
{Wood} - Wood of the defending village (e.g. 397400)
{Clay} - Clay of the defending village (e.g. 397400)
{Iron} - Iron of the defending village (e.g. 397440)
{AtkTroopsOriginal} - Attacker's original troops (e.g. Scouts:50 LC:25)
{AtkTroopsLoss} - Attacker's troop loss (e.g. Scouts:1 LC:3)
{AtkTroopsRemain} - Attacker's remaining troops (e.g. Scouts:49 LC:22)
{DefTroopsOriginal} - Defender's original troops (e.g. Spears:5 Scouts:10)
{DefTroopsLoss} - Defender's troop loss (e.g. Spears:5 Scouts:8)
{DefTroopsRemain} - Defender's remaining troops (e.g. Scouts:2)
{Cleared} - Whether the defender was cleared (e.g. Cleared; e.g. [blank])
{%Lost} - The percentage of troops the attacker lost (e.g. 5.3%)
{%Killed} - The percentage of troops the defender lost (e.g. 86.7%)
{%Hauled} - The percentage of resources taken versus those left in village (e.g. 0.1%) 1760/1192240
{%OfHaul} - The percentage hauled of maximum possible to haul with remaining troops (e.g. 100%)
{Wall} - The level of the wall (after the attack) (e.g. 2)
{Loyalty} - The loyalty of the defending village (after the attack, if visible) (e.g. 56 or ?)
*/

_lang = {
	"en" : {
		"Attacker" : "Attacker",
		"Defender" : "Defender",
		"Buildings" : "Buildings",
		"None of your troops have returned" : "None of your troops have returned",
		"Cleared" : "Cleared",
		"Haul" : "Haul",
		"Wood" : "Wood",
		"Clay" : "Clay",
		"Iron" : "Iron",
		"Unexpected troop type!" : "Unexpected troop type!",
		"Wall" : "Wall",
		"Loyalty" : "Loyalty",
		"to" : "to"
	}, 
	"no" : {
		"Attacker" : "Angriper",
		"Defender" : "Forsvarer",
		"Buildings" : "Bygninger",
		"None of your troops have returned" : "Ingen av dine tropper har returnert",
		"Cleared" : "Tt",
		"Haul" : "Bytte",
		"Wood" : "Hogstfelt",
		"Clay" : "Leirgrav",
		"Iron" : "Jerngruve",
		"Unexpected troop type!" : "Ukjent enhetstype",
		"Wall" : "Mur",
		"Loyalty" : "Lojalitet",
		"to" : "til"
	}
};
var worldLetters = window.location.host.split(/\W+/)[0].substring(0, 2);
var lang = (_lang[worldLetters] && worldLetters) || "en";

function _(thing){
    return (_lang[lang] && _lang[lang][thing]) || (_lang["en"] && _lang["en"][thing]) || thing;
}

function rename(format){
    format = format || "{DefName} {DefCoord} [{DefTroopsRemain}] Wall: {Wall}";
    var attackerStuff = $("table[id='attack_info_att']");
    var attackerName = $("tr:has(th:contains('" + _("Attacker") + ":')) th:not(th:contains('" + _("Attacker") + ":'))", attackerStuff).text();
    var attackerLink = $("tr:has(th:contains('" + _("Attacker") + ":')) th:not(th:contains('" + _("Attacker") + ":')) a", attackerStuff);
    var attackerID = (attackerLink.length > 0 && attackerLink.attr("href").match(/&id=(\d+)/)[1]) || "?";
    var attackerVil = $(".village_anchor", attackerStuff).text();
    var attackerVilCoords = attackerVil.split("(")[1].split(")")[0];
    var attackerVilContinent = attackerVil.match(/K\d+/)[0];
    var attackerVilName = attackerVil.split("(")[0].trim();
    var attackerVilID = $(".village_anchor a[href!='#']", attackerStuff).attr("href").match(/id=(\d+)/)[1];
    
    var defenderStuff = $("table[id='attack_info_def']");
    var defenderName = $("tr:has(th:contains('" + _("Defender") + ":')) th:not(th:contains('" + _("Defender") + ":'))", defenderStuff).text();
    var defenderLink = $("tr:has(th:contains('" + _("Defender") + ":')) th:not(th:contains('" + _("Defender") + ":')) a", defenderStuff);
    var defenderID = (defenderLink.length > 0 && defenderLink.attr("href").match(/&id=(\d+)/)[1]) || "?";
    var defenderVil = $(".village_anchor", defenderStuff).text();
    var defenderVilCoords = defenderVil.split("(")[1].split(")")[0];
    var defenderVilContinent = defenderVil.match(/K\d+/)[0];
    var defenderVilName = defenderVil.split("(")[0].trim();
    var defenderVilID = $(".village_anchor a[href!='#']", defenderStuff).attr("href").match(/id=(\d+)/)[1];
    
    var attackerVilCoordsA = attackerVilCoords.split("|");
    var defenderVilCoordsA = defenderVilCoords.split("|");
    var distance = Math.floor(Math.sqrt(Math.pow(attackerVilCoordsA[0] - defenderVilCoordsA[0], 2) + Math.pow(attackerVilCoordsA[1] - defenderVilCoordsA[1], 2)) * 100 + 0.5) / 100;
    
    var espionage = $("#attack_spy");
    var wood, clay, iron, wall;
    if (espionage.length > 0){
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
        wood = parseInt(resz[0].replace(".", ""));
        clay = parseInt(resz[1].replace(".", ""));
        iron = parseInt(resz[2].replace(".", ""));
        var buildingBox = $("tr:has(th:contains('" + _("Buildings") + "')) td", espionage);
        if (buildingBox.length > 0){
            var buildingsText = buildingBox.text().trim().replace(/\t/g, "");
            if (buildingsText.match(new RegExp(_("Wall") + " \(" + _("Level") + " (\d+)\)")))
                var wall = buildingsText.match(new RegExp(_("Wall") + " \(" + _("Level") + " (\d+)\)"))[1];
            else 
                var wall = "0";
        } else {
            var buildingsText = "";
        }
    } else {
		var espiRes = $("#attack_spy_resources"),
			espiBuild = $("#attack_spy_building_data");
		
		if (espiRes.length > 0){
			var resources = $($("tr td", espiRes).get(0));
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
			wood = parseInt(resz[0].replace(".", ""));
			clay = parseInt(resz[1].replace(".", ""));
			iron = parseInt(resz[2].replace(".", ""));
		}
		if (espiBuild.length > 0){
			var builds = JSON.parse(espiBuild.attr("value"));
			builds.forEach(function(build){
				if (build.id === "wall")
					wall = build.level;
			});
            wall = wall || 0;
		}
	}
    wood = wood && wood.toString() || "?";
    clay = clay && clay.toString() || "?";
    iron = iron && iron.toString() || "?";
    wall = wall && wall.toString() || "?";
    
    var reportID = window.location.href.match(/&view=(\d+)/)[1];
    
    var attackerTroops = $("#attack_info_att_units");
    var defenderTroops = $("#attack_info_def_units");
    
    var atttroopsExisting = $("tr[class='center'] td[width='35']", attackerTroops);
    var attworldFunctionality = [];
    atttroopsExisting.each(function(){ 
        if ($(this).html().match("spear")) attworldFunctionality.push(_("Spear"));
        else if ($(this).html().match("sword")) attworldFunctionality.push(_("Sword"));
        else if ($(this).html().match("axe")) attworldFunctionality.push(_("Axe"));
        else if ($(this).html().match("archer")) attworldFunctionality.push(_("Archer"));
        else if ($(this).html().match("spy")) attworldFunctionality.push(_("Scout"));
        else if ($(this).html().match("light")) attworldFunctionality.push(_("LC"));
        else if ($(this).html().match("marcher")) attworldFunctionality.push(_("MA"));
        else if ($(this).html().match("heavy")) attworldFunctionality.push(_("HC"));
        else if ($(this).html().match("ram")) attworldFunctionality.push(_("Ram"));
        else if ($(this).html().match("catapult")) attworldFunctionality.push(_("Cat"));
        else if ($(this).html().match("knight")) attworldFunctionality.push(_("Paladin"));
        else if ($(this).html().match("snob")) attworldFunctionality.push(_("Noble"));
        else alert(_("Unexpected troop type!"));
    });
    
    var deftroopsExisting = $("tr[class='center'] td[width='35']", defenderTroops);
    var defworldFunctionality = [];
    deftroopsExisting.each(function(){ 
        if ($(this).html().match("spear")) defworldFunctionality.push(_("Spear"));
        else if ($(this).html().match("sword")) defworldFunctionality.push(_("Sword"));
        else if ($(this).html().match("axe")) defworldFunctionality.push(_("Axe"));
        else if ($(this).html().match("archer")) defworldFunctionality.push(_("Archer"));
        else if ($(this).html().match("spy")) defworldFunctionality.push(_("Scout"));
        else if ($(this).html().match("light")) defworldFunctionality.push(_("LC"));
        else if ($(this).html().match("marcher")) defworldFunctionality.push(_("MA"));
        else if ($(this).html().match("heavy")) defworldFunctionality.push(_("HC"));
        else if ($(this).html().match("ram")) defworldFunctionality.push(_("Ram"));
        else if ($(this).html().match("catapult")) defworldFunctionality.push(_("Cat"));
        else if ($(this).html().match("knight")) defworldFunctionality.push(_("Paladin"));
        else if ($(this).html().match("snob")) defworldFunctionality.push(_("Noble"));
        else if ($(this).html().match("militia")) defworldFunctionality.push(_("Militia"));
        else alert(_("Unexpected troop type!"));
    });
    
    var attackerTroopsOriginal = $("tr[class!='center']", attackerTroops).get(0);
    var attackerTroopsLoss = $("tr[class!='center']", attackerTroops).get(1);
    var attackerTroopsOriginalListA = $("td[width!='20%']", attackerTroopsOriginal);
    var attackerTroopsLossListA = $("td[width!='20%']", attackerTroopsLoss);
    var attackerTroopsOriginalList = {};
    var attackerTroopsLossList = {};
    var attackerTroopsRemainingList = {};
    var attackerTroopsOriginalString = "";
    var attackerTroopsLossString = "";
    var attackerTroopsRemainingString = "";
    var attackerTroopsOriginalNumber;
    var attackerTroopsLossNumber;
    var attackerTroopsRemainingNumber;
    
    var defenderTroopsOriginal = $("tr[class!='center']", defenderTroops).get(0);
    var defenderTroopsLoss = $("tr[class!='center']", defenderTroops).get(1);
    if (defenderStuff.html().match(_("None of your troops have returned"))) defenderTroopsOriginalListA = $();
    else defenderTroopsOriginalListA = $("td[width!='20%']", defenderTroopsOriginal);
    if (defenderStuff.html().match(_("None of your troops have returned"))) defenderTroopsLossListA = $();
    else defenderTroopsLossListA = $("td[width!='20%']", defenderTroopsLoss);
    var defenderTroopsOriginalList = {};
    var defenderTroopsLossList = {};
    var defenderTroopsRemainingList = {};
    var defenderTroopsOriginalString = "";
    var defenderTroopsLossString = "";
    var defenderTroopsRemainingString = "";
    var defenderTroopsOriginalNumber;
    var defenderTroopsLossNumber;
    var defenderTroopsRemainingNumber;
    
    defenderTroopsOriginalListA.each(function(index){
        if (parseInt($(this).html()) !== 0){
            defenderTroopsOriginalList[defworldFunctionality[index]] = parseInt($(this).html());
            defenderTroopsOriginalString += " " + defworldFunctionality[index] + ":" + $(this).html();
            defenderTroopsOriginalNumber += parseInt($(this).html());
        }
    });
    defenderTroopsLossListA.each(function(index){
        if (parseInt($(this).html()) !== 0){
            defenderTroopsLossList[defworldFunctionality[index]] = parseInt($(this).html());
            defenderTroopsLossString += " " + defworldFunctionality[index] + ":" + $(this).html();
            defenderTroopsLossNumber += parseInt($(this).html());
        }
    });
    attackerTroopsOriginalListA.each(function(index){
        if (parseInt($(this).html()) !== 0){
            attackerTroopsOriginalList[attworldFunctionality[index]] = parseInt($(this).html());
            attackerTroopsOriginalString += " " + attworldFunctionality[index] + ":" + $(this).html();
            attackerTroopsOriginalNumber += parseInt($(this).html());
        }
    });
    attackerTroopsLossListA.each(function(index){
        if (parseInt($(this).html()) !== 0){
            attackerTroopsLossList[attworldFunctionality[index]] = parseInt($(this).html());
            attackerTroopsLossString += " " + attworldFunctionality[index] + ":" + $(this).html();
            attackerTroopsLossNumber += parseInt($(this).html());
        }
    });
    for (unit in defenderTroopsOriginalList){
        defenderTroopsRemainingList[unit] = (defenderTroopsLossList[unit]) ? defenderTroopsOriginalList[unit] - defenderTroopsLossList[unit] : defenderTroopsOriginalList[unit];
        if (defenderTroopsRemainingList[unit] === 0) delete defenderTroopsRemainingList[unit];
        else { 
            defenderTroopsRemainingString += " " + unit + ":" + defenderTroopsRemainingList[unit];
            defenderTroopsRemainingNumber += parseInt(defenderTroopsRemainingList[unit]);
        }
    }
    for (unit in attackerTroopsOriginalList){
        attackerTroopsRemainingList[unit] = (attackerTroopsLossList[unit]) ? attackerTroopsOriginalList[unit] - attackerTroopsLossList[unit] : attackerTroopsOriginalList[unit];
        if (attackerTroopsRemainingList[unit] === 0) delete attackerTroopsRemainingList[unit];
        else {
            attackerTroopsRemainingString += " " + unit + ":" + attackerTroopsRemainingList[unit];
            attackerTroopsRemainingNumber += parseInt(attackerTroopsRemainingList[unit]);
        }
    }
    
    attackerTroopsOriginalString = attackerTroopsOriginalString.trim();
    attackerTroopsLossString = attackerTroopsLossString.trim();
    attackerTroopsRemainingString = attackerTroopsRemainingString.trim();
    
    defenderTroopsOriginalString = defenderTroopsOriginalString.trim();
    defenderTroopsLossString = defenderTroopsLossString.trim();
    defenderTroopsRemainingString = defenderTroopsRemainingString.trim();
    
    if (defenderTroopsRemainingString === "") var cleared = _("Cleared"); else var cleared = "";
    var percLost = Math.floor((attackerTroopsLossNumber / attackerTroopsOriginalNumber) * 10000 + 0.5) / 100;
    var percKilled = Math.floor((defenderTroopsLossNumber / defenderTroopsOriginalNumber) * 10000 + 0.5) / 100;
    var haul = $("#attack_results tr:has(th:contains('" + _("Haul") + "')) td");
    if (haul.length > 0){
        var haulDet = $(haul.get(1)).text().trim().replace(/\./g, "").split("/");
        var hauled = haulDet[0];
        var percResHauled = (Math.floor((haulDet[0] / haulDet[1]) * 10000 + 0.5) / 100).toString();
        var percOfPossibleHaul = (Math.floor((haulDet[0] / (parseInt(haulDet[0]) + parseInt(wood) + parseInt(clay) + parseInt(iron))) * 10000 + 0.5) / 100).toString();
    } else {
        var percOfPossibleHaul = "?";
        var percResHauled = "?";
    }
	
	var loyalt = $("tr:has(> th:contains('" + _("Loyalty") + ":'):not(:has(pan))) td");
	var loyalty = (loyalt.length > 0) ? (loyalt.text().split(_("to") + " ").length > 1) ? parseInt(loyalt.text().split(_("to") + " ")[1]) : "?" : "?";
    
    var name = format;
    name = name.replace("{ReportID}", reportID);
    name = name.replace("{AtkName}", attackerName);
    name = name.replace("{AtkID}", attackerID);
    name = name.replace("{AtkCoord}", attackerVilCoords);
    name = name.replace("{AtkVilName}", attackerVilName);
    name = name.replace("{AtkVilID}", attackerVilID);
    name = name.replace("{AtkVilK}", attackerVilContinent);
    name = name.replace("{DefName}", defenderName);
    name = name.replace("{DefID}", defenderID);
    name = name.replace("{DefCoord}", defenderVilCoords);
    name = name.replace("{DefVilName}", defenderVilName);
    name = name.replace("{DefVilID}", defenderVilID);
    name = name.replace("{DefVilK}", defenderVilContinent);
    name = name.replace("{Distance}", distance);
    name = name.replace("{Resources}", _("Wood") + ":" + wood + " " + _("Clay") + ":" + clay + " " + _("Iron") + ":" + iron);
    name = name.replace("{Wood}", wood);
    name = name.replace("{Clay}", clay);
    name = name.replace("{Iron}", iron);
    name = name.replace("{AtkTroopsOriginal}", attackerTroopsOriginalString);
    name = name.replace("{AtkTroopsLoss}", attackerTroopsLossString);
    name = name.replace("{AtkTroopsRemain}", attackerTroopsRemainingString);
    name = name.replace("{DefTroopsOriginal}", defenderTroopsOriginalString);
    name = name.replace("{DefTroopsLoss}", defenderTroopsLossString);
    name = name.replace("{DefTroopsRemain}", defenderTroopsRemainingString);
    name = name.replace("{Cleared}", cleared);
    name = name.replace("{%Lost}", percLost);
    name = name.replace("{%Killed}", percKilled);
    name = name.replace("{%ResHauled}", percResHauled);
    name = name.replace("{%OfPossibleHaul}", percOfPossibleHaul);
    name = name.replace("{Wall}", wall);
	name = name.replace("{Loyalty}", loyalty);
    /*console.log(name);*/
    
    $(".quickedit .rename-icon").click();
    setTimeout(function(){ $(".quickedit input[type='text']").val(name); setTimeout(function(){ $(".quickedit input[type='button']").click(); }, 250); }, 100);
}