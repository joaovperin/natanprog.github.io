javascript:

log_deleted_task = false;
goingToOverviewMessage = "Ez a script a termelési áttekintésen működik, ugrás...";
doc = document;
resourceTypes = ["wood", "clay", "iron"];
iconTypes = ["wood", "stone", "iron"];

var currentVersion = "1.3";
 
versioningLoaded = true;
function versionCompare(v1, v2) {
	var v1arr = v1.split(".");
	var v2arr = v2.split(".");
	v1arr = v1arr.map( function(e) { 
		return parseInt(e, 10);
	});
	v2arr = v2arr.map( function(e) { 
		return parseInt(e, 10);
	});
	var i = 0;
	while (i < v1arr.length && i < v2arr.length && v1arr[i] == v2arr[i]) {
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

function isThereNewerVersion() {
	if (typeof(advanced_equalizer_script_version) == "undefined") return true;
	if (versionCompare(advanced_equalizer_script_version, currentVersion) == 1) return true;
	return false;
}

/////////////////////////////
//Utils
/////////////////////////////
function roundTo(num, to) {
    if (num < 0) {
        what = -num;
    } else {
        what = num;
    }
    what = Math.floor(what/to)*to;
    if (num < 0) {
        return -what;
    } else {
        return what;
    }
}

function roundToTransfer(num) {
    return roundTo(num,1000);
}

function getLinkStart() {
	var endIdx = document.URL.indexOf("/game.php");
    return document.URL.substring(0,endIdx);
}

function placeContent(content) {
    var row = document.createElement("TR");
	var cell = document.createElement("TD");
	cell.appendChild(content);
	row.appendChild(cell);
	var cellBefore = document.getElementById("content_value");
	var rowBefore = $(cellBefore).closest("tr")[0];
	var parentTable = rowBefore.parentNode;
	
	parentTable.insertBefore(row, rowBefore);
}

function getNums(str) {
	var str = str.replace(/\./g, "");
	var nums = str.match(/\d+/g);
	if (nums) {
		nums = nums.map(function(e){ return parseInt(e,10); });
	}
	return nums;
}

function showInfo() {
	var htmlToPrepend = "";
	if(isThereNewerVersion()) {
		htmlToPrepend += "<a target='_blank' href='http://forum.klanhaboru.hu/showthread.php?3661-Egy-ablakos-nyersanyagkiegyenl%C3%ADt%C5%91'>[Új verzió: Egy ablakos nyersanyagkiegyenlítő script]</a>";
		htmlToPrepend += "<a target='_blank' href='" + doc.URL.replace(/screen\=.*/i, "screen=settings&mode=quickbar") + "'>[Gyorsgombok szerkesztése]</a>";
		//htmlToPrepend += "<a target='_blank' href='https://docs.google.com/forms/d/11g8njPpKnXlvNQkqRqpV6Z4V6gViwND_qatsj4iGB8c/viewform'>[Panasz, ötlet]</a>";
		htmlToPrepend += "<br>"
		htmlToPrepend += "A legfrissebb verzió: " + currentVersion;
		htmlToPrepend += "<br>"
		htmlToPrepend += "A te verziód: " + advanced_equalizer_script_version;
		
	} else {
		htmlToPrepend = "<a target='_blank' href='http://forum.klanhaboru.hu/showthread.php?3661-Egy-ablakos-nyersanyagkiegyenl%C3%ADt%C5%91'>[Egy ablakos nyersanyagkiegyenlítő script súgó]</a>";
		//htmlToPrepend += "<a target='_blank' href='https://docs.google.com/forms/d/11g8njPpKnXlvNQkqRqpV6Z4V6gViwND_qatsj4iGB8c/viewform'>[Panasz, ötlet]</a>";
		htmlToPrepend += "  Verzió: " + currentVersion;
	}
	$("#content_value").prepend(htmlToPrepend);
}

/////////////////////////////
//Model Logic
/////////////////////////////

function getResources(str) {
    var nums = getNums(str);
    var res = {};
    if (nums && nums.length > 0) {
        res["wood"] = nums[0];
        if (nums.length > 1) {
            res["clay"] = nums[1];
            if (nums.length > 2) {
                res["iron"] = nums[2];
            }
        }
    } 
	resourceTypes.forEach( function(resourceType){ 
		if (typeof(res[resourceType]) == "undefined") {
			res[resourceType] = 0;
		}
	});
    return res;
}

function Village(villageRow) {
    var cells = $("td", villageRow);
    function getCellText(idx) {
		return cells[idx].innerText || cells[idx].textContent;
	}
	
	this.row = villageRow;
    
	this.coord = cells[1].innerHTML.match(/\d+\|\d+/)[0];
	this.x = parseInt(this.coord.split("|")[0], 10);
	this.y = parseInt(this.coord.split("|")[1], 10);
    this.villageID = parseInt(cells[1].innerHTML.match(/village\=\d+/)[0].split("=")[1],10);
    
	this.points = getNums(getCellText(2))[0];
	this.resources = getResources(getCellText(3));
	this.storage = getNums(getCellText(4))[0];
	this.originalCapacity = getNums(getCellText(5))[0];
	this.currentPopulation = getNums(getCellText(6))[0];
	this.maxPopulation = getNums(getCellText(6))[1];
    
    this.tasks = {};
    this.transfer = {
		wood : 0,
		clay : 0,
		iron : 0
	};
	
	this.extraResources = {
		wood : 0,
		clay : 0,
		iron : 0
	};
}

Village.prototype.addResources = function(resourcePackage) {
	for (var idx in resourceTypes) {
		var type = resourceTypes[idx];
		this.extraResources[type] += resourcePackage.resources[type];
	}
};

Village.prototype.getVirtualResource = function(type) {
	return this.resources[type] + this.extraResources[type];
};

Village.prototype.toString = function(isShort) {
	if (typeof isShort == "undefined") {
		isShort = false;
	}
	var res = "";
	res += this.x + "|" + this.y + ": " + this.points + " points;" 
		+ " RES[" 
			+ "wood: " + this.resources.wood + "(+" + this.extraResources.wood + ")" 
			+ " clay: " + this.resources.clay + "(+" + this.extraResources.clay + ")" 
			+ " iron: " + this.resources.iron + "(+" + this.extraResources.iron + ")" 
		+ "]";
	if (!isShort) {
		res += " capacity: " + this.originalCapacity + " storage: " + this.storage + " pop: " + this.currentPopulation + "/" + this.maxPopulation
		+ " TRANSFER[" + "wood: " + this.transfer.wood + " clay: " + this.transfer.clay + " iron: " + this.transfer.iron + "]";
	}
	return res;
};

Village.prototype.calculateWishTransfer = function(wishTransfer) {
	this.wishTransfer = {};
	for (var idx in resourceTypes) {
		var type = resourceTypes[idx];
		var roundVirtualRes = roundToTransfer(this.getVirtualResource(type));
		this.wishTransfer[type] = wishTransfer.avg[type] - roundVirtualRes; //this.wishTransfer gets round
    }
}

Village.prototype.hasCapacityUnderflow = function() {
	//output capacity check and hack
	var output = 0;
	for (var idx in resourceTypes) {
		var type = resourceTypes[idx];
		if (this.transfer[type] < 0) {
			output += (-this.transfer[type]);
		}
	}
	return output/1000 > this.capacity;
};

Village.prototype.calculateTransfer = function(stat) {
    this.capacity = this.originalCapacity;
    this.transfer = {
		wood : 0,
		clay : 0,
		iron : 0
	};
	
	//calculate wish capacity
	var sumOutput = 0;
	for (var idx in resourceTypes) {
		var type = resourceTypes[idx];
		if (this.wishTransfer[type] < 0) {
			sumOutput += (-this.wishTransfer[type]);
		}
	}
	var wishCapacity = sumOutput / 1000;
	
	//calculate final transfer ratio
	var transferRatio = wishCapacity > this.capacity ? this.capacity/wishCapacity : 1;
	
	//calculate final transfers
	for (var idx in resourceTypes) {
		var type = resourceTypes[idx];
		if (this.wishTransfer[type] < 0) { //output
			this.transfer[type] = roundToTransfer(this.wishTransfer[type] * transferRatio);
			if (this.transfer[type] < -this.resources[type]) { //if the output would be higher than possible
				debugger;
                this.transfer[type] = -roundToTransfer(this.resources[type]);
			}
		} else { //input
			this.transfer[type] = this.wishTransfer[type]; //greedy
		}
	}
	
	while (this.hasCapacityUnderflow()) { //haaack
		for (var idx in resourceTypes) {
			type = resourceTypes[idx];
			if (this.transfer[type] < 0) {
				this.transfer[type] += 1000;
				break;
			}
		}
	}	
};

Village.prototype.filterTasks = function() {
    for (var idx in this.tasks) {
        var task = this.tasks[idx];
        if (task.wood + task.clay + task.iron < transfer_threshold) {
            if (log_deleted_task) {
				console.log("deleted task: " + task.targetVillage.coord + " [wood: " + task.wood + " clay: " + task.clay + " iron: " + task.iron + "]");
			}
            delete this.tasks[idx];
        }
    }
};

Village.prototype.needsResourceType = function(resourceType) {
	return this.transfer[resourceType] > 0;
};

Village.prototype.needsInput = function() {
	return this.transfer.wood > 0 || this.transfer.clay > 0 || this.transfer.iron > 0;
};

Village.prototype.hasOutput = function(resourceType) {
	return this.transfer[resourceType] < 0;
};

Village.prototype.uniqueKey = function() {
	return "" + this.x + "|" + this.y;
};

Village.prototype.addTask = function(targetVillage, resourceType, amount) {
    if (roundToTransfer(amount) != amount) { /*problem!*/ debugger; }
    var targetKey = targetVillage.uniqueKey();
	if (typeof this.tasks[targetKey] == "undefined") {
		this.tasks[targetKey] = {
			targetVillage : targetVillage,
			wood : 0,
			clay : 0,
			iron : 0
		};
	}
	this.transfer[resourceType] += amount;
	this.capacity -= amount/1000;
	if (this.capacity < 0) { /*problem!*/ debugger; }	
	this.tasks[targetKey][resourceType] += amount;
};

Village.prototype.exportTasks = function() {
    for (var idx in this.tasks) {
		var task = this.tasks[idx];
        if (task.wood > 0 || task.clay > 0 || task.iron > 0) {
            transferTasks.push({
                sourceVillage: this,
                targetVillage: task.targetVillage,
                wood: task.wood,
                clay: task.clay,
                iron: task.iron
            });
        }
    }
};

function createVillages() {
    villageList = [];
	villageMap = {};
    villageTable = $("#content_value");
    var rows = $("tr.row_a, tr.row_b", villageTable);
    for (var idx = 0; idx < rows.length; ++idx) {
        var row = rows[idx];
        var villageObject = new Village(row);
        villageList.push(villageObject);
		villageMap[villageObject.coord] = villageObject;
    }
}

function getResourceAvg(sum, numVillages) {
	var avg = {};
	resourceTypes.forEach(function(type) {
		avg[type] = roundToTransfer(sum[type] / numVillages);
	});
	return avg;
}

function calculateWishTransfer(villages) {
	var result = {};
	//sum and avg of all resources
	result.numVillages = villages.length;
	result.sum = { wood : 0, clay : 0, iron : 0 };
	villages.forEach(function(village) {
		resourceTypes.forEach(function(type) {
			result.sum[type] += village.getVirtualResource(type);
		});
	});
	result.avg = getResourceAvg(result.sum, result.numVillages);
	
	//theoretical ideal transfer to achieve avg
	villages.forEach(function(village) {
		village.calculateWishTransfer(result);
	});
	result.input = { wood : 0, clay : 0, iron : 0 };
	result.output = { wood : 0, clay : 0, iron : 0 };
	villages.forEach( function(village) {
		resourceTypes.forEach( function(type) {
			if (village.wishTransfer[type] > 0) { //input
				result.input[type] += village.wishTransfer[type];
			} else { //output
				result.output[type] += (-village.wishTransfer[type]);
			}
		});
	});
	return result;
}

//unused
function calculateRealTransfer(villages) {
	var result = {};
	result.numVillages = villages.length;
	result.output = { wood : 0, clay : 0, iron : 0 };
	villages.forEach(function(village) {
		resourceTypes.forEach(function(type) {
			if (village.transfer[type] < 0) { //output
				result.output[type] += (-village.transfer[type]);
			}
		});
	});
	result.avg = getResourceAvg(result.output, result.numVillages);	
	return result;
}

function recalculateTransferredResources() {
	//reset village tasks
    villageList.forEach(function(village) {
		village.tasks = {};
        village.transfer = {
            wood : 0,
            clay : 0,
            iron : 0
        };
	});
    
    //we handle every village as if there was enough transfer capacity to equalize everything
	var wishStat = calculateWishTransfer(villageList);
	
	//we calculate possible transfer output per village balanced respecting the real transfer capacity
	villageList.forEach(function(village) {
		village.calculateTransfer(wishStat);
	});
    
    //rebuild tree
    villageTree = new QuadTreeManager();
	villageTree.addVillages(villageList);
	villageTree.createTasks();
	
    villageList.forEach(function(village) {
		village.filterTasks();
	});
    
	transferTasks = [];
    villageList.forEach(function(village) {
		village.exportTasks();
	});
	nextTransferIdx = 0;
	
	//listTasks();
}

///////////////////////////////////////////
//QuadTree Logic
///////////////////////////////////////////
function createSpaces(length) {
	var res = "";
	for (var n = 0; n < length; ++n) {
		res += " ";
	}
	return res;
}

LEAF_WIDTH = 5;

function QuadTreeManager() {
	this.root = null;
}

function createTransferTask(sourceVillage, targetVillage, resourceType) {
	var amount = Math.min(-sourceVillage.transfer[resourceType], targetVillage.transfer[resourceType]);
    sourceVillage.addTask(targetVillage, resourceType, amount);
	targetVillage.transfer[resourceType] -= amount;
}

QuadTreeManager.prototype.extendTree = function(coverDirection) {
	//LEGEND:
	//x is the current root.
	//+ are the new siblings to be created
	//_ remains uncovered
	var nodeWidth = this.root.width;
	if (coverDirection.xPos < 1 && coverDirection.yPos < 1) {
		// + + _
		// + x _
		// _ _ _
		var left = this.root.left - nodeWidth;
		var top = this.root.top - nodeWidth;
		var newRoot = new QuadNode(left, top, nodeWidth*2);
		newRoot.childNodes[3] = this.root;
		this.root = newRoot;
	} 
	else if (-1 < coverDirection.xPos && -1 < coverDirection.yPos) {
		// _ _ _
		// _ x +
		// _ + + 
		var left = this.root.left;
		var top = this.root.top;
		var newRoot = new QuadNode(left, top, nodeWidth*2);
		newRoot.childNodes[0] = this.root;
		this.root = newRoot;
	}
	else if (coverDirection.xPos == 1) { //&& coverDirection.yPos == -1
		// _ + +
		// _ x +
		// _ _ _ 
		var left = this.root.left;
		var top = this.root.top - nodeWidth;
		var newRoot = new QuadNode(left, top, nodeWidth*2);
		newRoot.childNodes[2] = this.root;
		this.root = newRoot;
	}
	else { //if (coverDirection.xPos == -1 && coverDirection.yPos == 1)
		// _ _ _
		// + x _
		// + + _ 
		var left = this.root.left - nodeWidth;
		var top = this.root.top;
		var newRoot = new QuadNode(left, top, nodeWidth*2);
		newRoot.childNodes[1] = this.root;
		this.root = newRoot;
	}
}

QuadTreeManager.prototype.addVillage = function(village) {
	var x = village.x;
	var y = village.y;
	//if this is the first village:
	if (!this.root) {
		var left = x - x%LEAF_WIDTH;
		var top = y - y%LEAF_WIDTH;
		this.root = new QuadNode(left, top, LEAF_WIDTH);
	} 
	//ensure the village is covered by the tree:
	while (true) {
		coverPosition = this.root.getCoverPosition(x, y);
		if (coverPosition.xPos == 0 && coverPosition.yPos == 0) {
			break;
		} else {
			this.extendTree(coverPosition);
		}
	}
	//add village
	this.root.addVillage(village);
}

QuadTreeManager.prototype.addVillages = function(villages) {
	for (var idx = 0; idx < villages.length; ++idx) {
		this.addVillage(villages[idx]);
	}
};

QuadTreeManager.prototype.createTasks = function() {
	this.root.createTasks();
};

QuadTreeManager.prototype.debugPrint = function() {
	console.log("Village tree:");
	if (this.root != null) {
		this.root.debugPrint(0);
	}
};

function QuadNode(left, top, width) {
	this.left = left;
	this.top = top;
	this.width = width;
	if (!this.isLeaf()) {
		this.childNodes = [];
		this.sourceSelectorIdx = {
			wood : 0,
			clay : 0,
			iron : 0
		};
		this.targetSelectorIdx = {
			wood : 0,
			clay : 0,
			iron : 0
		};
	} else {
		this.villages = [];
		this.sourceVillageIdx = {
			wood : 0,
			clay : 0,
			iron : 0
		};
		this.targetVillageIdx = {
			wood : 0,
			clay : 0,
			iron : 0
		};
	}
}

QuadNode.prototype.createChildNode = function(selector) {
	var childWidth = this.width/2;
	var childLeft = this.left;
	var childTop = this.top;
	if (selector%2 == 1) {
		childLeft += childWidth;
	}
	if (selector > 1) {
		childTop += childWidth;
	}
	this.childNodes[selector] = new QuadNode(childLeft, childTop, childWidth);
};

QuadNode.prototype.isLeaf = function() {
	return this.width == LEAF_WIDTH;
};

QuadNode.prototype.getSelector = function(x,y) {
	var selector = 0;
	if (this.left + this.width/2 <= x) {
		selector += 1;
	}
	if (this.top + this.width/2 <= y) {
		selector += 2;
	}
	return selector;
};

QuadNode.prototype.addVillage = function(village) {
	var x = village.x;
	var y = village.y;
	pos = this.getCoverPosition(x, y);
	if (pos.xPos != 0 || pos.yPos != 0) { 
        /*problem: can't insert node*/ debugger; 
        return;
	}
	if (this.isLeaf()) {
		this.villages.push(village);
	} else {
		var selector = this.getSelector(x,y);
		if (this.childNodes[selector] == null) {
			this.createChildNode(selector);
		}
		this.childNodes[selector].addVillage(village);
	}
};

QuadNode.prototype.getCoverPosition = function(x, y) {
	var res = {};
	res.xPos = 0;
	if (x < this.left) {
		res.xPos = -1;
	} else if (this.left+this.width <= x) {
		res.xPos = 1;
	} 
	res.yPos = 0;
	if (y < this.top) {
		res.yPos = -1;
	} else if (this.top+this.width <= y) {
		res.yPos = 1;
	} 
	return res;
};

QuadNode.prototype.getNumVillages = function() {
	if (this.isLeaf()) {
		return this.villages.length;
	} else {
		var res = 0;
		for (var idx = 0; idx < 4; ++idx) {
			if (this.childNodes[idx] != null) {
				res += this.childNodes[idx].getNumVillages();
			}				
		}
		return res;
	}
};

QuadNode.prototype.getNextSourceVillage = function(resourceType) {
	if (this.isLeaf()) {
		while (this.sourceVillageIdx[resourceType] < this.villages.length && 
			!this.villages[this.sourceVillageIdx[resourceType]].hasOutput(resourceType)) 
		{
			++this.sourceVillageIdx[resourceType];
		}
		if (this.sourceVillageIdx[resourceType] < this.villages.length) {
			return this.villages[this.sourceVillageIdx[resourceType]];
		} else {
			return null;
		}
	} else {
		while (this.sourceSelectorIdx[resourceType] < 4 &&
			(this.childNodes[this.sourceSelectorIdx[resourceType]] == null || 
			this.childNodes[this.sourceSelectorIdx[resourceType]].getNextSourceVillage(resourceType) == null))
		{
			++this.sourceSelectorIdx[resourceType];
		}
		if (this.sourceSelectorIdx[resourceType] < 4 && 
			(this.childNodes[this.sourceSelectorIdx[resourceType]] != null)) 
		{
			return this.childNodes[this.sourceSelectorIdx[resourceType]].getNextSourceVillage(resourceType);
		} else {
			return null;
		}
	}	
};

QuadNode.prototype.getNextTargetVillage = function(resourceType) {
	if (this.isLeaf()) {
		while (this.targetVillageIdx[resourceType] < this.villages.length && 
			!this.villages[this.targetVillageIdx[resourceType]].needsResourceType(resourceType)) 
		{
			++this.targetVillageIdx[resourceType];
		}
		if (this.targetVillageIdx[resourceType] < this.villages.length) {
			return this.villages[this.targetVillageIdx[resourceType]];
		} else {
			return null;
		}
	} else {
		while (this.targetSelectorIdx[resourceType] < 4 &&
			(this.childNodes[this.targetSelectorIdx[resourceType]] == null || 
			this.childNodes[this.targetSelectorIdx[resourceType]].getNextTargetVillage(resourceType) == null))
		{
			++this.targetSelectorIdx[resourceType];
		}
		if (this.targetSelectorIdx[resourceType] < 4 && 
			(this.childNodes[this.targetSelectorIdx[resourceType]] != null)) 
		{
			return this.childNodes[this.targetSelectorIdx[resourceType]].getNextTargetVillage(resourceType);
		} else {
			return null;
		}
	}
};

QuadNode.prototype.debugPrint = function(spaces) {
	console.log(createSpaces(spaces) + this.left + "|" + this.top + " width: " + this.width);
	if (this.isLeaf()) {
		for (var idx = 0; idx < this.villages.length; ++idx) {
			console.log(createSpaces(spaces+1) + this.villages[idx].toString(false));
		}
	} else {
		for (var idx = 0; idx < 4; ++idx) {
			if (this.childNodes[idx] != null) {
				console.log(createSpaces(spaces) + "-selector: " + idx + " num of villages: " + this.childNodes[idx].getNumVillages());
				this.childNodes[idx].debugPrint(spaces+2);
			}
		}
	}
};

QuadNode.prototype.createTasksSelfLevel = function() {	
	for (var idx = 0; idx < resourceTypes.length; ++idx) {
		var resourceType = resourceTypes[idx]; 
	
		while (this.getNextSourceVillage(resourceType) != null) {
			var sourceVillage = this.getNextSourceVillage(resourceType);
		
			while (sourceVillage.hasOutput(resourceType) &&
				this.getNextTargetVillage(resourceType) != null)
			{
				var targetVillage = this.getNextTargetVillage(resourceType);
				createTransferTask(sourceVillage, targetVillage, resourceType);
			}
			if (sourceVillage.hasOutput(resourceType)) {
				//no more target on this level needs this resourceType, output overflow
				break;
			}
		}
	}	
};

QuadNode.prototype.createTasks = function() {
	if (!this.isLeaf()) {
		for (var idx = 0; idx < 4; ++idx) {
			if (this.childNodes[idx] != null) {
				
				this.childNodes[idx].createTasks();
			}
		}
	} 
	
	this.createTasksSelfLevel();
};


///////////////////////////////////////
//senderFrame setup
///////////////////////////////////////

function injectScriptIntoFrame(ifrm, injectedFn) {
	var frameDoc = ifrm.contentDocument;
	var injectedScript = frameDoc.createElement("script");
	injectedScript.type = "text/javascript";
	injectedScript.innerHTML = injectedFn.toString();
	var head = frameDoc.getElementsByTagName("head")[0];
	head.appendChild(injectedScript);
}

function setupSenderFrame() {
    senderFrame = doc.createElement("IFRAME"); 
	senderFrame.id = "sender_frame";
    senderFrame.style.width = 600+"px"; 
    senderFrame.style.height = 300+"px"; 
	placeContent(senderFrame);
	
	senderFrame.contentDocument.write("Egy ablakos nyersanyagkiegyenlítő 1.3\nEbben a keretben megy majd az üzlet :)");
	senderFrame.contentDocument.write(" Kattints újra és újra a scriptre a feladatok végrehajtásához!");
	senderFrame.contentDocument.write(" Ha nem megy, próbáld meg letiltani 10 percre a víruskeresőt, és próbáld úgy. Add a kivételekhez a klanhaboru.hu-t.");
	senderFrame.contentDocument.write(" Nézd meg a gyorsgombikonjaidat, mindegyik betöltődik-e, és ha nem, akkor cseréld le őket, különben időtúllépést okoz, ami miatt megakad a script!");
	
	$("iframe#sender_frame").load(
		function() {
			injectScriptIntoFrame(senderFrame, senderFillResources);
			injectScriptIntoFrame(senderFrame, pressOk);
			injectScriptIntoFrame(senderFrame, handlePage);
			injectScriptIntoFrame(senderFrame, checkBotChecker);
			injectScriptIntoFrame(senderFrame, listenToBotChecker);
			injectScriptIntoFrame(senderFrame, "handlePage();");
            
            //dbgDecorateIframe();
		}		
	);
	
	senderFrame.contentDocument.isWorking = false;
	senderFrame.contentDocument.readyForNewTask = true;
}

function dbg() {
    UI.InfoMessage(document.URL, 3000);
}

function dbgDecorateIframe() {
	var frameDoc = senderFrame.contentDocument;
	var dbglink = frameDoc.createElement("a");
	dbglink.href = "javascript: dbg(); void(0);";
	dbglink.appendChild(frameDoc.createTextNode("call dbg()"));
	
	var parentNode = frameDoc.getElementById("content_value");
	parentNode.insertBefore(dbglink, parentNode.childNodes[0]);
    
    injectScriptIntoFrame(senderFrame, dbg);
}

function senderFillResources() {
	var resources = document.forms[0];
	var URLargs = document.URL.split("&");
	for (var i = 0; i < URLargs.length; ++i) {
		var args = URLargs[i].split("=");
		if (args.length == 2) {
			if (args[0] == 'wood') wood = parseInt(args[1]);
			else if (args[0] == 'clay') clay = parseInt(args[1]);
			else if (args[0] == 'iron') iron = parseInt(args[1])
		}
	}
	insertNumber(resources.wood, wood);
	insertNumber(resources.stone, clay);
	insertNumber(resources.iron, iron)
}

function pressOk() {
	$("input[type=submit]")[0].click();
}

function checkBotChecker() {
	if ($("#bot_check_form").length > 0) {
		botCheckForm = $("#bot_check_form")[0]; 
		if ($(botCheckForm).is(":visible")) {
			document.isBotCheckActive = true;
		} else {
			document.isBotCheckActive = false;
		}
	} else {
		document.isBotCheckActive = false;
	}
}

function listenToBotChecker() {
	checkBotChecker();
	if (document.isBotCheckActive) {
		setTimeout( function() {
			listenToBotChecker();
		}, 300);
	}
}

function handlePage() {
	//debugger;
	listenToBotChecker();
	if (!document.isBotCheckActive) {
		if (document.URL.indexOf("target") != -1) {
			document.readyForNewTask = false;
			document.isWorking = true;
			senderFillResources();
			UI.InfoMessage("OK gomb megnyomása...");
			document.isSetup = true;
			pressOk();
		} else if (document.URL.indexOf("confirm_send") != -1) {
			document.readyForNewTask = false;
			document.isWorking = true;
			UI.InfoMessage("Jóváhagyás...");
			document.isSetup = true;
			pressOk();
		} else {
			UI.InfoMessage("Kész");
			document.readyForNewTask = true;
			document.isWorking = false;
			document.isSetup = true;
		}
	} else {
        document.isSetup = true;
    }
}

/////////////////////////////////////////
// ongoing trades logic
/////////////////////////////////////////
function calculateOngoingTraders() {
	
	resourceTypes = ["wood", "clay", "iron"];
	iconTypes = ["wood", "stone", "iron"];

	function getNums(str) {
		var str = str.replace(/\./g, "");
		var nums = str.match(/\d+/g);
		if (nums) {
			nums = nums.map(function(e){ return parseInt(e,10); });
		}
		return nums;
	}

	function Package(tradeRow) {
		var cells = $("td", tradeRow);
		function getCellText(idx) {
			return cells[idx].innerText || cells[idx].textContent;
		}
		this.targetCoords = cells[3].innerHTML.match(/\d+\|\d+/)[0];
		this.resources = {
			wood : 0,
			clay : 0,
			iron : 0
		};
		var tradeNums = getNums(getCellText(7));
		var resCell = cells[7];
		
		if ($("span.clay", resCell)[0]) {
			UI.ErrorMessage("Szóljatok kockalovagnak, mert át kell írnia a scripet, mert fejlesztették az oldalt, ez így nem jól működik!", 15000);
			stopHereImmediately();
		}
		
		for (var idx in iconTypes) {
			var type = iconTypes[idx];
			if ($("span."+type, resCell)[0]) {
				this.resources[resourceTypes[idx]] = tradeNums[0];
				tradeNums.splice(0,1);
			}
		}
	}

	Package.prototype.toString = function() {
		return "" + this.targetCoords + " [wood: " + this.resources.wood + " clay: " + this.resources.clay + " iron: " + this.resources.iron + "]";
	};

	function collectTrades() {
		var tradesTable = $("#trades_table");
		var tradeRows = $("tr.row_a, tr.row_b", tradesTable);
		document.trades = [];
		for (var idx = 0; idx < tradeRows.length; ++idx) {
			document.trades.push(new Package(tradeRows[idx]));
		}
		document.collectingTradesDone = true;
	}

	function listTrades() {
		document.trades.forEach(function(trade) {
			console.log(trade.toString());
		});
	}
	
	collectTrades();
}

function assembleOngoingLink() {
	var link = game_data.link_base_pure.replace(/screen\=\w*/i, "&mode=trader&screen=overview_villages&type=inc&page=-1");
	return getLinkStart() + link;
}

function setupOngoingFrame() {
	ongoingFrame = doc.createElement("IFRAME"); 
	ongoingFrame.id = "ongoing_frame";
    ongoingFrame.style.width = 600+"px"; 
    ongoingFrame.style.height = 400+"px"; 
	placeContent(ongoingFrame);
	
	$("iframe#ongoing_frame").load(
		function() {
			injectScriptIntoFrame(ongoingFrame, calculateOngoingTraders);
			injectScriptIntoFrame(ongoingFrame, "calculateOngoingTraders();");
		}		
	);	
	
	ongoingFrame.contentDocument.write("ongoing frame");
	ongoingFrame.contentDocument.collectingTradesDone = false;
}

function performTradeCollection() {
	ongoingFrame.setAttribute("src", assembleOngoingLink()); 	
}

function waitForCollectionDone(callbackFn) {
	setTimeout( function() {
		if (ongoingFrame.contentDocument.collectingTradesDone) {
			callbackFn();
		} else {
			waitForCollectionDone(callbackFn);
		}
	}, 200);
}

/////////////////////////////////////////
//logic used for manipulating senderFrame
/////////////////////////////////////////
function assembleSenderLink(sourceID, targetID, wood, clay, iron) {
    var paramStr = "screen=market&mode=send&village=" + sourceID + "&target=" + targetID + "&wood=" + wood + "&clay=" + clay + "&iron=" + iron;
    var link = game_data.link_base_pure.replace(/screen\=\w*/i, paramStr);
    link = getLinkStart() + link;
    return link;
}

function listenToSenderFrame() {
	setTimeout( function() {
		if (!senderFrame.contentDocument.isSetup) {
			listenToSenderFrame();
		} else if (senderFrame.contentDocument.isBotCheckActive) {
			UI.ErrorMessage("Bot védelem: írd be a kis ablakon a kódot!", 3000);
			lastTimeSent = new Date();
			listenToSenderFrame();
		} else if (senderFrame.contentDocument.isWorking) {
            if (new Date() - lastTimeSent > taskPerformTimeout) {
                UI.ErrorMessage("Időtúllépés: " + (taskPerformTimeout/1000) + " másodperc, újrapróbálás...");
                performNextTransfer();
            } else {
                listenToSenderFrame();
            }
		} else {
			calculateNextTransferIdx();
			UI.SuccessMessage("Végrehajtva: " + getCurrentTaskProgress() + " " + ((new Date() - lastTimeSent)/1000) + " másodperc alatt", 5000);
			canSend = true;
		}
	}, 200);
}

function performSending(sourceID, targetID, wood, clay, iron) {
	senderFrame.contentDocument.isWorking = true;
	senderFrame.setAttribute("src", assembleSenderLink(sourceID, targetID, wood, clay, iron)); 
	lastTimeSent = new Date();
	canSend = false;
	listenToSenderFrame();    
}

//////////////////////
//main logic
//////////////////////
function setupParameters() {
    greetingMessage = "";
	if (isThereNewerVersion()) {
		greetingMessage += "!!! Új verzió elérhető, lásd a fórumon !!! ";
	}
	
	if (typeof transfer_threshold == "undefined") {
        transfer_threshold = 0;
    } 
	if (transfer_threshold) {
		greetingMessage += "szállítási küszöbmennyiség: " +  transfer_threshold + "; ";
	}
	
	if (typeof respect_ongoing == "undefined") {
        transfer_threshold = 0;
    } 
	if (respect_ongoing) {
		greetingMessage += "figyelembe veszi az úton levő szállításokat; ";
	}
    
    if (typeof time_limit == "undefined") {
        time_limit = 10;
    }
    taskPerformTimeout = time_limit*1000;
}

function needsToSetup() {
    return typeof(setupDone) == "undefined";
}

function listTasks() {
    console.log("****************Transfer Tasks:************");
	for (var idx = 0; idx < transferTasks.length; ++idx) {
		var task = transferTasks[idx];
		console.log("from: " + task.sourceVillage.uniqueKey() + " to: " + task.targetVillage.uniqueKey() 
			+ " wood: " + task.wood + " clay: " + task.clay + " iron: " + task.iron);
	}
}

function listVillages() {
	console.log("****************Villages:************");
	for (var idx = 0; idx < villageList.length; ++idx) {
		var village = villageList[idx];
		console.log(village.toString());
	}
}

function listPackages() {
	console.log("****************Ongoing:************");
	for (var idx in packages) {
		console.log(packages[idx].toString());
	}
}	

//////////////////////////////
//StepReactor logic
//////////////////////////////

function Step(stepFn) {
	this.fn = stepFn;
	this.running = false;
	this.done = false;
	this.dependencies = [];
}

Step.prototype.getKey = function() {
	return this.fn.toString();
};

Step.prototype.addDependency = function(step) {
	this.dependencies.push(step);
};

Step.prototype.canStart = function() {
	if (this.done || this.running) {
		return false;
	}
	for (var idx in this.dependencies) {
		if (!this.dependencies[idx].done) {
			return false;
		}
	}
	return true;
};

Step.prototype.start = function(doneCallbackFn) {
	this.running = true;
	this.fn(doneCallbackFn);
};

function StepReactor() {
	this.steps = {};
}

StepReactor.prototype.registerStep = function(stepFn) {
	var stepKey = stepFn.toString(); 
	if (typeof this.steps[stepKey] == "undefined") {
		this.steps[stepKey] = new Step(stepFn);
	}
	return this.steps[stepKey];
};

StepReactor.prototype.setupDependency = function(dependencyFn, dependentFn) {
	var dependencyStep = this.registerStep(dependencyFn);
	var dependentStep = this.registerStep(dependentFn);
	dependentStep.addDependency(dependencyStep);
};

StepReactor.prototype.stepDoneCallback = function(stepFn) {
	var stepKey = stepFn.toString();
	var step = stepReactor.steps[stepKey]; //todo solve this hack
	if (step) {
		step.done = true;
		step.running = false;
	}
};

StepReactor.prototype.tryRun = function() {
	var isAnyStepRunning = false;
	var immediateRetry = false;
	do {
		isAnyStepRunning = false;
		immediateRetry = false;
		for (var idx in this.steps) {
			var step = this.steps[idx];
			if (step.running) {
				isAnyStepRunning = true;
			} else if (step.canStart()) {
				step.start(this.stepDoneCallback);
				if (step.done) {
					immediateRetry = true;
				}
				isAnyStepRunning = true;
			}
		}
	} while (immediateRetry);
	return isAnyStepRunning;
};

StepReactor.prototype.loop = function() {
	thisReactor = this;
	setTimeout( function() {
		if (thisReactor.tryRun()) {
			thisReactor.loop();
		}
	}, 100);
};

function addOngoingResources(packages) {
	for (var idx in packages) {
		var resourcePackage = packages[idx];
		var village = villageMap[resourcePackage.targetCoords];
		if (village) { //if the targetvillage is in the group
			village.addResources(resourcePackage);
		}
	}	
}

function handleOngoingStep(doneCallback) {
	setupOngoingFrame();
	performTradeCollection();
	
	function onPackageCollectionDone() {
		packages = ongoingFrame.contentDocument.trades;		
		$("#ongoing_frame").hide();
		addOngoingResources(packages);
		doneCallback(handleOngoingStep);
	}
	waitForCollectionDone(onPackageCollectionDone);
}
	
function setupSenderFrameStep(doneCallback) {
	setupSenderFrame();
	doneCallback(setupSenderFrameStep);
}	

function recalculateTransferredResourcesStep(doneCallback) {
	recalculateTransferredResources();
	doneCallback(recalculateTransferredResourcesStep);
}	

function enableUserActionsStep(doneCallback) {
	canSend = true;
	doneCallback(enableUserActionsStep);
}

function trySetup() {
    if (game_data.screen != "overview_villages" || game_data.mode != "prod") {
        UI.InfoMessage(goingToOverviewMessage, 4000);
        self.location = game_data.link_base_pure.replace(/screen\=\w*/i, "screen=overview_villages&mode=prod");
        return false;
    }	
    if (game_data.player.premium == false) {
        UI.ErrorMessage("Prémium kéne, na.", 5000);
        return false;
    }
	showInfo();
    setupParameters();
    if (greetingMessage != "") {
		UI.InfoMessage(greetingMessage, 4000);
	}
	
	stepReactor = new StepReactor();
	createVillages();	

	stepReactor.registerStep(recalculateTransferredResourcesStep);
	stepReactor.registerStep(setupSenderFrameStep);
	stepReactor.registerStep(enableUserActionsStep);
	if (respect_ongoing) {
		stepReactor.registerStep(handleOngoingStep);
		stepReactor.setupDependency(handleOngoingStep, recalculateTransferredResourcesStep);
	}
	stepReactor.setupDependency(recalculateTransferredResourcesStep, enableUserActionsStep);
	stepReactor.setupDependency(setupSenderFrameStep, enableUserActionsStep);
	
	stepReactor.loop();
	
	setupDone = true;	
    return true;
}

function getCurrentTaskProgress() {
	return "" + nextTransferIdx + "/" + transferTasks.length + " feladat";
}

function calculateNextTransferIdx() {
	if (senderFrame.contentDocument.readyForNewTask) {
		++nextTransferIdx;
	}
}

function performNextTransfer() {
	if (nextTransferIdx < transferTasks.length) {
		var task = transferTasks[nextTransferIdx];
		performSending(task.sourceVillage.villageID, task.targetVillage.villageID, task.wood, task.clay, task.iron);
	} else {
        UI.InfoMessage("Minden feladat végrehajtva");
    }
}

function advancedEquScript() {
    if (needsToSetup()) {
        trySetup();
    } else {
		if (canSend) {
			UI.InfoMessage("Végrehajtás...");
			performNextTransfer();
		} else {
			UI.ErrorMessage("Várj még, végrehajtás...");
		}
    }
}

advancedEquScript();