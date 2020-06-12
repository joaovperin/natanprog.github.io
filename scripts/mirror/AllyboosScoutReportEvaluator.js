function AllyBooScoutReportEvaluator(){
	// scout report evaluator as posted on us forums at http://forum.tribalwars.us/showthread.php?p=41979#post41979

//	possibly written by allyboo and amended... 
//	JavaScript Document
	var maxRes = 50000;
	var worldSpeed = 1.5;
	var unitSpeed = 0.7;
	var newWindow = 0;
	var currVillage = 0;
	var openEmptyVillages = 0;
	var unitLimit = 0;
	var numScounts = 4;
	var UNKNOWN_FARM_HAUL = 500;
	var MIN_AMOUNT_FARM_HAUL = 5;
	var colors = new Array("blue", "green", "yellow");
	var CN_NEXT_UNIT = 'booNextUnit';
	var CN_UNITS_NEEDED = 'booUnitsNeeded';
	var CN_REPORT_EVAL = 'booReportEval';
	var doc = document;
	if (window.frames.length > 0) doc = window.main.document;
	var nameLC = 'light';
	var nameHC = 'heavy';
	var nameSP = 'spear';
	var nameAX = 'axe';
	var unitFarmList = new Array(nameLC, nameAX, nameHC, nameSP);
	var units = new Array();
	units[nameLC] = new Array(600, 80);
	units[nameAX] = new Array(1080, 10);
	units[nameHC] = new Array(660, 50);
	units[nameSP] = new Array(1080, 25);
	var warehouseMax = new Array(1000, 1229, 1512, 1859, 2285, 2810, 3454, 4247, 5222, 6420, 7893, 9705, 11932, 14670, 18037, 22177, 27266, 33523, 41217, 50675, 62305, 76604, 94184, 115798, 142373, 175047, 215219, 264611, 325337, 400000);
	var productionPerHour = new Array(30, 35, 41, 47, 55, 64, 74, 86, 100, 117, 136, 158, 184, 214, 249, 289, 337, 391, 455, 530, 616, 717, 833, 959, 1127, 1311, 1525, 1774, 2063, 2400);
	var hidingPlace = new Array(150, 200, 267, 356, 474, 632, 843, 1125, 1500, 2000);
	function createCookie(name, value, days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			var expires = ";				expires=" + date.toGMTString()
		} else {
			var expires = "";
		}
		doc.cookie = name + "=" + value + expires + ";		path=/"
	}
	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = doc.cookie.split(';				');
				for (var i = 0; i < ca.length; i++) {
					var c = ca[i];
					while (c.charAt(0) == ' ') c = c.substring(1, c.length);
					if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
				}
				return null
	}
	function clearCookies() {
		createCookie(CN_NEXT_UNIT, "blah", -1);
		createCookie(CN_UNITS_NEEDED, "blah", -1);
		createCookie(CN_REPORT_EVAL, "blah", -1)
	}
	function gettheURLprefix(fullURL) {
		var data = window.game_data;
		if (data.player.sitter_id == "0") {
			var urlPrefix = "/game.php?"
		}
		else {
			var urlPrefix = "/game.php?t=" + data.player.id
		}
		return urlPrefix;

	}
	function getCoordinates(theString) {
		theString = theString.split("|");
		var x = theString[theString.length - 2];
		var y = theString[theString.length - 1];
		x = x.split("(");
		x = x[x.length - 1];
		y = y.split(")");
		y = y[0];
		var coordinates = new Array(x, y);
		return coordinates
	}
	function getLevel(building) {
		var tRow = doc.getElementsByTagName('tr');
		for (i = 0; i < tRow.length; i++) {
			var thead = tRow[i].getElementsByTagName('th')[0];
			if (thead) {
				if (thead.firstChild.nodeValue === 'Buildings:') {
					var text = tRow[i].getElementsByTagName('td')[0];
					text = text.innerHTML;
					text = text.split(")");
					for (j = 0; j < text.length; j++) {
						var line = text[j];
						if (line.search(building) != -1) {
							var level = line.split(" ");
							level = level[level.length - 1];
							return level;
							break
						}

					}
					return 0
				}

			}

		}

	}
	function checkOverflow(amount, warehouse, hiding) {
		var amount = parseInt(amount);
		var max = warehouseMax[warehouse - 1] - hidingPlace[hiding - 1];
		if (amount > max) {
			return max
		}
		else {
			return amount
		}

	}
	function getDurationInSeconds(originX, originY, targetX, targetY, speed, unitSpeed, unit) {
		var x = originX - targetX;
		var y = originY - targetY;
		var fields = Math.sqrt((x * x) + (y * y));
		var overallSpeed = speed * unitSpeed;
		var secondsPerField = unit / overallSpeed;
		var duration = Math.round(secondsPerField * fields);
		return duration
	}
	function getInnerHTMLString(tableHeader) {
		var tbls = doc.getElementsByTagName('table');
		for (var i = 0; i < tbls.length; i++) {
			var thead = tbls[i].getElementsByTagName('th')[0];
			if (thead) {
				if (thead.firstChild.nodeValue === tableHeader) {
					var village = tbls[i];
					var row = village.getElementsByTagName('tr')[1];
					var cell = row.getElementsByTagName('td')[1];
					cell = cell.innerHTML;
					return cell
				}

			}

		}

	}
	function elapsedTime(dateString) {
		var serverTime = doc.getElementById('serverTime').firstChild.nodeValue;
		serverTime = serverTime.split(':');
		var serverDate = doc.getElementById('serverDate').firstChild.nodeValue;
		serverDate = serverDate.split('/');
		var dNow = new Date(serverDate[2], serverDate[1] - 1, serverDate[0], serverTime[0], serverTime[1], serverTime[2]);
		var dThen = Date.parse(dateString);
		var minutes = ((dNow - dThen) / 1000) / 60;
		return minutes
	}
	function timeOfReport() {
		var tRow = doc.getElementsByTagName('tr');
		for (i = 0;
		i < tRow.length;
		i++) {
			var tCell = tRow[i].getElementsByTagName('td');
			if (tCell[0]) {
				if (tCell[0].innerHTML === "Sent") {
					sentTime = tCell[1].innerHTML;
					return sentTime
				}

			}

		}

	}
	function sameVillage() {
		var anchors = doc.getElementsByTagName('a');
		for (i = 0;
		i < anchors.length;
		i++) {
			if (anchors[i].firstChild.nodeValue === 'Paste quantities of surviving troops into simulator') {
				var theLink = anchors[i].getAttribute('href');
				theLink = theLink.split("&");
				return theLink[0]
			}

		}

	}
	function originalVillage() {
		var tbls = doc.getElementsByTagName('table');
		for (var i = 0;
		i < tbls.length;
		i++) {
			var thead = tbls[i].getElementsByTagName('th')[0];
			if (thead) {
				if (thead.firstChild.nodeValue === 'Attacker:') {
					var defVill = tbls[i];
					var anchor = defVill.getElementsByTagName('a');
					anchor = anchor[anchor.length - 1];
					var link = anchor.getAttribute('href');
					var numAttrs;
					if (link.search(/\?t=/) != -1) {
						numAttrs = 2
					}
					else {
						numAttrs = 1
					}
					link = link.split("=");
					var retVal = link[0];
					for (var j = 1;
					j < numAttrs;
					j++) {
						retVal = retVal + "=" + link[j]
					}
					if (currVillage == 1) {
						var currVill = link[numAttrs];
						currVill = currVill.split("&");
						currVill = currVill[0];
						retVal = retVal + "=" + currVill
					}
					else {
						retVal = retVal + "=" + link[link.length - 1]
					}
					var data = window.game_data;
					if (data.player.sitter_id == "0") {
						return retVal;

					}
					else {
						return retVal + "&t=" + data.player.id;

					}

				}

			}

		}

	}
	function deleteURL() {
		var urls = doc.getElementsByTagName('a');
		for (var i = 0; i < urls.length; i++) {
			var command = urls[i].firstChild.nodeValue;
			if (command == 'Delete') {
				var anchor = urls[i];
				var link = anchor.getAttribute('href');
				return link
			}

		}

	}
	function targety() {
		var tbls = doc.getElementsByTagName('table');
		for (var i = 0; i < tbls.length; i++) {
			var thead = tbls[i].getElementsByTagName('th')[0];
			if (thead) {
				if (thead.firstChild.nodeValue === 'Defender:') {
					var defVill = tbls[i];
					var anchor = defVill.getElementsByTagName('a');
					anchor = anchor[anchor.length - 1];
					var link = anchor.getAttribute('href');
					link = link.split("=");
					link = link[link.length - 1];
					return link
				}

			}

		}

	}
	function removeHTMLTags(strInputCode) {
		return strInputCode.replace(/<\/?[^>]+(>|$)/g, "")
	}
	function production(mine) {
		if (mine === 0) {
			return 5 / 60
		}
		else {
			return productionPerHour[mine - 1] / 60
		}

	}
	function scoutReportClick() {
		var target = getCoordinates(getInnerHTMLString("Defender:"));
		var targetX = target[0];
		var targetY = target[1];
		var warehouse = getLevel(/warehouse/i);
		var hidingPlace = getLevel(/hiding place/i);
		var timberCamp = getLevel(/timber camp/i);
		var clayPit = getLevel(/clay pit/i);
		var ironMine = getLevel(/iron mine/i);
		if (isNaN(warehouse)) warehouse = 30;
		if (isNaN(hidingPlace)) hidingPlace = 1;
		if (isNaN(timberCamp)) timberCamp = 1;
		if (isNaN(clayPit)) clayPit = 1;
		if (isNaN(ironMine)) ironMine = 1;
		var woodPerMin = (production(timberCamp) * worldSpeed);
		var clayPerMin = (production(clayPit) * worldSpeed);
		var ironPerMin = (production(ironMine) * worldSpeed);
		var elapsedTimeInMins = Math.ceil(elapsedTime(timeOfReport()));
		var trow = doc.getElementsByTagName('tr');
		var targ = targety();
		var link = originalVillage();
		var url = link + "&screen=place&mode=command&target=" + targ;
		for (var i = 0; i < trow.length; i++) {
			var thead = trow[i].getElementsByTagName('th')[0];
			if (thead) {
				if (thead.firstChild.nodeValue === 'Resources scouted:') {
					var tcell = trow[i].getElementsByTagName('td')[0];
					var finText = removeHTMLTags(tcell.innerHTML);
					finText = finText.replace(/\./gi, "");
					finText = finText.split(" ");
					var wood = parseInt(finText[0]);
					var clay = parseInt(finText[1]);
					var iron = parseInt(finText[2]);
					if (isNaN(wood)) {
						wood = 0
					}
					if (isNaN(clay)) {
						clay = 0
					}
					if (isNaN(iron)) {
						iron = 0
					}
					var cookieValue = elapsedTimeInMins + "|" + wood + "|" + clay + "|" + iron + "|" + warehouse + "|" + hidingPlace + "|" + woodPerMin + "|" + clayPerMin + "|" + ironPerMin + "|" + targetX + "|" + targetY + "|";
					createCookie(CN_REPORT_EVAL, cookieValue, 1);
					if (newWindow == 1) window.open(url, 'newwindow');
					else doc.location.href = url;
					return
				}

			}

		}
		createCookie(CN_REPORT_EVAL, "Fixed|" + UNKNOWN_FARM_HAUL, 1);
		if (newWindow == 1) window.open(url, 'newwindow');
		else doc.location.href = url
	}
	function getRallyPointCoords() {
		var titleString = doc.getElementsByTagName('title')[0];
		titleString = titleString.innerHTML;
		titleString = titleString.split(")");
		titleString = titleString[titleString.length - 2];
		titleString = titleString.split("(");
		titleString = titleString[titleString.length - 1];
		var origin = titleString.split("|");
		return origin
	}
	function checkTarget(targetX, targetY) {
		var inputs = doc.getElementsByTagName('input');
		for (i = 0;
		i < inputs.length;
		i++) {
			var name = inputs[i].getAttribute('name');
			if (name === 'x') {
				var x = inputs[i].value
			}
			if (name === 'y') {
				var y = inputs[i].value
			}

		}
		if ((parseInt(targetX) == x) && (parseInt(targetY) == y)) {
			return 1
		}
		else {
			return -1
		}

	}
	function fillUnits(unitformname, amount, scouts) {
		doc.forms[0]['light'].value = 0;
		doc.forms[0]['axe'].value = 0;
		doc.forms[0]['heavy'].value = 0;
		doc.forms[0]['spear'].value = 0;
		doc.forms[0][unitformname].value = amount;
		doc.forms[0].spy.value = scouts
	}
	function getNumberOfUnitsFound(unitformname) {
		var unitsFound = 0;
		var fields = doc.getElementsByTagName('input');
		for (var i = 0;
		i < fields.length;
		i++) {
			var thename = fields[i].getAttribute('name');
			if (thename) {
				if (thename == unitformname) {
					var next = fields[i].nextSibling;
					next = next.nextSibling;
					s = next.firstChild.nodeValue;
					s = s.split("(");
					s = s[s.length - 1];
					s = s.replace(/\)/g, "");
					unitsFound = parseInt(s)
				}

			}

		}
		return unitsFound
	}
	function getNumberOfUnitsNeeded(originX, originY, targetX, targetY, unitChoiceSpeed, haul, elapsedTimeInMins, woodPerMin, clayPerMin, ironPerMin, wood, clay, iron, warehouse, hidingP) {
		var durationInMinutes = (Math.ceil(getDurationInSeconds(originX, originY, targetX, targetY, worldSpeed, unitSpeed, unitChoiceSpeed) / 60));
		var totalTimeInMinutes = elapsedTimeInMins + parseInt(durationInMinutes);
		var excessWood = parseInt(Math.floor(totalTimeInMinutes * woodPerMin));
		var excessClay = parseInt(Math.floor(totalTimeInMinutes * clayPerMin));
		var excessIron = parseInt(Math.floor(totalTimeInMinutes * ironPerMin));
		wood = parseInt(wood) + parseInt(excessWood);
		wood = checkOverflow(wood, warehouse, hidingP);
		clay = clay + excessClay;
		clay = checkOverflow(clay, warehouse, hidingP);
		iron = iron + excessIron;
		iron = checkOverflow(iron, warehouse, hidingP);
		var resources = wood + clay + iron;
		if (maxRes > 0 && resources > maxRes) resources = maxRes;
		var numberOfUnits = Math.ceil(resources / haul);
		return numberOfUnits
	}
	function getNextUnit(unitNumber) {
		unitNumber = unitNumber + 1;
		if (unitNumber >= unitFarmList.length) unitNumber = 0;
		return unitNumber
	}
	function nextA() {
		return 0
	}
	function nextC() {

	}
	function iterateUnits() {
		var cookieValue = readCookie(CN_UNITS_NEEDED);
		cookieValue = cookieValue.split("|");
		var uAX = parseInt(cookieValue[0]);
		var uSP = parseInt(cookieValue[1]);
		var uLC = parseInt(cookieValue[2]);
		var uHC = parseInt(cookieValue[3]);
		var unitsNeededAll = new Array();
		unitsNeededAll[nameLC] = uLC;
		unitsNeededAll[nameSP] = uSP;
		unitsNeededAll[nameAX] = uAX;
		unitsNeededAll[nameHC] = uHC;
		var unitsFound = new Array();
		unitsFound[nameLC] = getNumberOfUnitsFound(nameLC);
		unitsFound[nameSP] = getNumberOfUnitsFound(nameSP);
		unitsFound[nameAX] = getNumberOfUnitsFound(nameAX);
		unitsFound[nameHC] = getNumberOfUnitsFound(nameHC);
		var next_unit_cookie_val = readCookie(CN_NEXT_UNIT);
		next_unit_cookie_val = next_unit_cookie_val.split("|");
		var unitNumber = parseInt(next_unit_cookie_val[0]);
		var unitsEntered = parseInt(next_unit_cookie_val[1]);
		if (unitLimit == 1) {
			if (unitsEntered <= unitsFound[unitFarmList[unitNumber]]) {
				if (nextA() == 1) return;
				else unitNumber = getNextUnit(unitNumber)
			}

		}
		else unitNumber = getNextUnit(unitNumber);
		var unitName = null;
		var iter = unitFarmList.length;
		while (iter > 0) {
			unitName = unitFarmList[unitNumber];
			if ((unitsFound[unitName] * units[unitName][1]) >= MIN_AMOUNT_FARM_HAUL) {
				unitsEntered = unitsNeededAll[unitName];
				if (unitsEntered > unitsFound[unitName] && unitLimit == 1) unitsEntered = unitsFound[unitName];
				fillUnits(unitName, unitsEntered, numScounts);
				break
			}
			unitNumber = getNextUnit(unitNumber);
			iter = iter - 1
		}
		if (iter == 0) {
			unitName = unitFarmList[unitNumber];
			var unitsEntered = unitsNeededAll[unitName];
			if (unitsEntered > unitsFound[unitName] && unitLimit == 1) unitsEntered = unitsFound[unitName];
			fillUnits(unitName, unitsEntered, numScounts)
		}
		var cookie_val = unitNumber + "|" + unitsEntered;
		createCookie(CN_NEXT_UNIT, cookie_val, 1)
	}
	function initialUnits() {
		var cookieValue = readCookie(CN_UNITS_NEEDED);
		cookieValue = cookieValue.split("|");
		var uAX = parseInt(cookieValue[0]);
		var uSP = parseInt(cookieValue[1]);
		var uLC = parseInt(cookieValue[2]);
		var uHC = parseInt(cookieValue[3]);
		var unitsNeededAll = new Array();
		unitsNeededAll[nameLC] = uLC;
		unitsNeededAll[nameSP] = uSP;
		unitsNeededAll[nameAX] = uAX;
		unitsNeededAll[nameHC] = uHC;
		var unitsFound = new Array();
		unitsFound[nameLC] = getNumberOfUnitsFound(nameLC);
		unitsFound[nameSP] = getNumberOfUnitsFound(nameSP);
		unitsFound[nameAX] = getNumberOfUnitsFound(nameAX);
		unitsFound[nameHC] = getNumberOfUnitsFound(nameHC);
		var unitNumber = 0;
		var unitName = null;
		var iter = unitFarmList.length;
		while (iter > 0) {
			unitName = unitFarmList[unitNumber];
			if (unitsFound[unitName] >= unitsNeededAll[unitName]) {
				fillUnits(unitName, unitsNeededAll[unitName], numScounts);
				break
			}
			unitNumber = getNextUnit(unitNumber);
			iter = iter - 1
		}
		if (iter == 0) {
			unitNumber = 0;
			unitName = unitFarmList[unitNumber];
			fillUnits(unitName, unitsNeededAll[unitName], numScounts)
		}
		var cookie_val = unitNumber + "|" + unitsNeededAll[unitName];
		createCookie(CN_NEXT_UNIT, cookie_val, 1)
	}
	function rallyPointClick() {
		var cookieValue = readCookie(CN_REPORT_EVAL);
		cookieValue = cookieValue.split("|");
		var uAxe = 0;
		var uSpear = 0;
		var uLC = 0;
		var uHC = 0;
		if (cookieValue[0] === "Fixed") {
			var amt = parseInt(cookieValue[1]);
			uAxe = amt / units[nameAX][1];
			uSpear = amt / units[nameSP][1];
			uLC = amt / units[nameLC][1];
			uHC = amt / units[nameHC][1]
		}
		else {
			var elapsedTimeInMins = parseInt(cookieValue[0]);
			var wood = parseInt(cookieValue[1]);
			var clay = parseInt(cookieValue[2]);
			var iron = parseInt(cookieValue[3]);
			var warehouse = parseInt(cookieValue[4]);
			var hidingP = parseInt(cookieValue[5]);
			var woodPerMin = parseFloat(cookieValue[6]);
			var clayPerMin = parseFloat(cookieValue[7]);
			var ironPerMin = parseFloat(cookieValue[8]);
			var targetX = parseInt(cookieValue[9]);
			var targetY = parseInt(cookieValue[10]);
			var check = checkTarget(targetX, targetY);
			if (check == -1) {
				alert("Warning: You have switched target since last using this script. Unable to compute units needed.")
			}
			var origin = getRallyPointCoords();
			var originX = origin[0];
			var originY = origin[1];
			var unitOfChoice = units[nameAX];
			uAxe = getNumberOfUnitsNeeded(originX, originY, targetX, targetY, unitOfChoice[0], unitOfChoice[1], elapsedTimeInMins, woodPerMin, clayPerMin, ironPerMin, wood, clay, iron, warehouse, hidingP);
			unitOfChoice = units[nameSP];
			uSpear = getNumberOfUnitsNeeded(originX, originY, targetX, targetY, unitOfChoice[0], unitOfChoice[1], elapsedTimeInMins, woodPerMin, clayPerMin, ironPerMin, wood, clay, iron, warehouse, hidingP);
			unitOfChoice = units[nameLC];
			uLC = getNumberOfUnitsNeeded(originX, originY, targetX, targetY, unitOfChoice[0], unitOfChoice[1], elapsedTimeInMins, woodPerMin, clayPerMin, ironPerMin, wood, clay, iron, warehouse, hidingP);
			unitOfChoice = units[nameHC];
			uHC = getNumberOfUnitsNeeded(originX, originY, targetX, targetY, unitOfChoice[0], unitOfChoice[1], elapsedTimeInMins, woodPerMin, clayPerMin, ironPerMin, wood, clay, iron, warehouse, hidingP)
		}
		var unitsNeededAll = uAxe + "|" + uSpear + "|" + uLC + "|" + uHC;
		createCookie(CN_UNITS_NEEDED, unitsNeededAll, 1);
		initialUnits()
	}
	function colorTest(strHTML) {
		for (var i = 0; i < colors.length; i++) {
			if (strHTML.indexOf(colors[i]) != -1) return colors[i]
		}
		return false
	}
	function getNewReportID(openEmptyVillages) {
		var trs;
		$(function () {
			trs = $('table.vis').eq(2).find('tr');

		}
		);
		var id;
		var scouty;
		for (var i = trs.length - 1;
		i > -1;
		i--) {
			id = 0;
			scouty = colorTest(trs[i].innerHTML);
			if (trs[i].innerHTML.search("(new)") != -1 && scouty !== -1) {
				if (trs[i].innerHTML.search(/graphic\/max_loot\/1.png/) !== -1 || openEmptyVillages == 1 || scouty == "blue") {
					var reportA = trs[i].getElementsByTagName('input');
					var reportHTML = reportA[0].getAttribute('name');
					id = reportHTML.replace("id_", "");
					return id;

				}

			}

		}
		return 0;

	}
	function getTopReportID() {
		var trs;
		trs = doc.getElementsByTagName('tr');
		for (var i = 0; i < trs.length; i++) {
			if (trs[i].innerHTML.search(/view=/) != -1) {
				var reportA = trs[i].getElementsByTagName('a');
				var reportHTML = reportA[0].getAttribute('href');
				var info = reportHTML.split("=");
				var id = 0;
				if (info.length > 1 && info[info.length - 2] == 'all&view') {
					id = info[info.length - 1];
					return id
				}

			}

		}
		return 0
	}
	function doEvalFarm() {
		var url = doc.URL;
		if (url.search(/screen=report/) != -1 && url.search(/view=/) === -1) {
			var reportID = getNewReportID(openEmptyVillages);
			if (reportID !== 0) {
				var newURL = gettheURLprefix(url) + "&screen=report&mode=all&view=" + reportID;
				window.location = (newURL)
			}
			else {
				alert("No new reports to open.")
			}

		}
		else if (url.search(/screen=report/) != -1 && url.search(/view=/) != -1) {
			clearCookies();
			scoutReportClick()
		}
		else if (url.search(/screen=info_village/) != -1) {
			var reportID = getTopReportID();
			if (reportID > 0) {
				var newURL = gettheURLprefix(url) + "&screen=report&mode=all&view=" + reportID;
				window.location = (newURL)
			}
			else {
				var targetURL = url.split("=");
				var targ = targetURL[targetURL.length - 1];
				var newURL = gettheURLprefix(url) + "&screen=place&mode=command&target=" + targ;
				clearCookies();
				createCookie(CN_REPORT_EVAL, "Fixed|" + UNKNOWN_FARM_HAUL, 1);
				window.location = (newURL)
			}

		}
		else if (url.search(/mode=command&target/) != -1) {
			var cookie = readCookie(CN_UNITS_NEEDED);
			if (cookie == null) {
				rallyPointClick()
			}
			else {
				iterateUnits()
			}

		}
		else if (url.search(/screen=place/) != -1 && url.search(/try=confirm/) != -1) {
			nextC()
		}
		else {
			var newURL = gettheURLprefix(url) + "&screen=report";
			window.location = (newURL)
		}

	}
	doEvalFarm();
};
AllyBooScoutReportEvaluator();void 0;