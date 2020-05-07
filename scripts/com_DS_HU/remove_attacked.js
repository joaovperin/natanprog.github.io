/*
 *  @inspiration by patricier
 *  @rethinker: kockalovag (kockalovag@gmail.com)
 *  [Script] - Filters and hides attacked villages - and a lot more features
 */

//TW
var Timing;

var doc = document;
var myGlobal = this;

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (obj, fromIndex) {
        "use strict";
        return jQuery.inArray(obj, this, fromIndex);
    };
}

function getCurrentServerDateTime() {
    return new Date(Timing.getCurrentServerTime());
}

function dateToStringDetailed (date) {
    return date.getFullYear() + "." + (date.getMonth()+1) + "." + date.getDate() + ". " +
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds();
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

function setupNumberObjectVariant(variant, propertyNames) {
    var num,
        idx,
        name;
    if (typeof variant == "number") {
        num = variant;
        variant = {};
        for (idx in propertyNames) {
            name = propertyNames[idx];
            variant[name] = num;
        }
    } else {
        for (idx in propertyNames) {
            name = propertyNames[idx];
            if (typeof variant[name] == "undefined") {
                variant[name] = 0;
            }
        }
    }
    return variant;
}

/*{
    waitCondition : fn, must be given
    waitMsg : string,
    callback : fn, must be given
    callbackMsg : string,
    interval : number, must be given
}*/
function waitFor(o) {
    if (typeof o.waitCondition != "undefined") {
        if (o.waitCondition()) {
            if (typeof o.waitMsg != "undefined") {
                console.log("Waiting " + o.interval + " because " + o.waitMsg + "...");
            }
            setTimeout( function() { waitFor(o); }, o.interval);
        } else {
            //assemble message
            var msg = "";
            if (typeof o.waitMsg != "undefined") {
                msg = "Waiting is over, because [" + o.waitMsg + "] is false. Performing callback ";
            }
            if (typeof o.callbackMsg != "undefined") {
                if (msg == "") {
                    msg = "Performing callback ";
                }
                msg += "[" + o.callbackMsg + "]...";
            }
            if (msg != "") {
                console.log(msg);
            }
            //callback if given
            if (typeof o.callback != "undefined") {
                o.callback();
            } else {
                console.log("Problem: No callback given");
            }            
        }
    } else {
        console.log("No waitCondition given");
    }
}

var farmMgr = {
    currentVersion : "1.6",

    unitTypes : ["spear", "sword", "axe", "archer", "spy", "light", "marcher", "heavy", "knight"],
    resourceTypes : ["wood", "clay", "iron"],
    unitCarry : {
        spear : 25,
        sword : 15,
        axe : 10,
        archer : 10,
        spy : 0,
        light : 80,
        marcher : 50,
        heavy : 50,
        knight : 100
    },

    autoFarmOn : false,
    responseThreshold : 2000,
    pendingRefreshInterval : 400,
    autoFarmInterval : 250,

    msg : {
        animStage : 0,
        animChars : ["/", "-", "\\"],

        goingToFarmMessage : "Ez a script a farmkezelőben működik, ugrás...",
        goingToNextPageMessage : "Váltás a következő oldalra...",
        noMoreUnitsMessage : "Nincs több a egység a sablonhoz: ",
        possibleTemplateMessage : "Lehetséges sablonok: ",
        waitingTemplateMessage : "Elvárt sablonok továbblépés előtt: ",
        goingToNextVillageMessage : "Váltás a következő falura...",

        getAnimation : function () {
            ++this.animStage;
            if (this.animStage == this.animChars.length) {
                this.animStage = 0;
            }
            return "(" + this.animChars[this.animStage] + ")";
        }
    },
    local : {
        hu : {
            today : RegExp("ma", "i"),
            yesterday : RegExp("tegnap", "i")
        },
        br : {
            today : RegExp("hoje", "i"),
            yesterday : RegExp("ontem", "i")
        }
    },

    param : {
        isThereNewerVersion : function () {
            if (typeof farm_script_version == "undefined") { return true; }
            if (versionCompare(farm_script_version, farmMgr.currentVersion) == 1) { return true; }
            return false;
        },
        rulesEqual : function (rules1, rules2) {
            if (rules1.length != rules2.length) {
                return false;
            }
            for (var idx in rules1.length) {
                if (rules1[idx] != rules2[idx]) {
                    return false;
                }
            }
            return true;
        },
        setupRules : function () {
            if (typeof(rules) != "object") {
                rules = [];
            }
            if (typeof(this.prevRules) != "undefined") {
                if (this.rulesEqual(this.prevRules, rules)) {
                    return;
                } else {
                    console.log("The rules are different, regenerating...");
                }
            }
            this.ruleList = [];
            console.log("*** RULES: ***");
            for (var idx in rules) {
                var ruleStr = rules[idx];
                var newRule = new Rule(ruleStr);
                console.log(newRule.toString());
                this.ruleList.push(newRule);
            }
            this.prevRules = rules.slice();
        },
        setupGlobalNumberParameter : function (name, defaultValue) {
            if (typeof myGlobal[name] == "undefined") {
                myGlobal[name] = defaultValue;
            }
        },
        setupGlobalStringParameter : function (name, defaultValue) {
            if (typeof myGlobal[name] == "undefined" || myGlobal[name] === "") {
                myGlobal[name] = defaultValue;
            } else {
                myGlobal[name] = myGlobal[name].toLowerCase();
            }
        },
        setupGlobalNumberObjectVariant : function (name, defaultValue, propertyNames) {
            if ((typeof myGlobal[name] != "object") && (typeof myGlobal[name] != "number")) {
                myGlobal[name] = defaultValue;
            }
            myGlobal[name] = setupNumberObjectVariant(myGlobal[name], propertyNames);
        },
        simpleParamDefaults : {
            auto_next_village : 0,
            remove_attacked : 1, //remove attacked villages by default
            remove_emptied : 1, //remove emptied villages by default
            remove_c_disabled : 0,
            min_resources_sum : 0,
            auto_repeat : 0,
            add_button : 0,
            click_on_load : 0,
            min_wall : 0,
            max_wall : 20,
            min_time : 0,
            max_time : 0,
            max_distance : 0,
            
            diagnostics : 0
        },
        paramToString : function (paramName) {
            if (typeof myGlobal[paramName] == "object") {
                return paramName + "=" + JSON.stringify(myGlobal[paramName]);
            } else {
                return paramName + "=" + myGlobal[paramName] + "; ";
            }
        },
        logParameters : function () {
            var logMsg = "*** PARAMETERS: ***\n";
            logMsg += this.paramToString("what") + this.paramToString("wait") + "\n";
            
            for (paramName in this.simpleParamDefaults) {
                logMsg += this.paramToString(paramName);
            }
            logMsg += "\n";
            
            logMsg += this.paramToString("unit_threshold") + "\n";
            logMsg += this.paramToString("min_resources");
            console.log(logMsg);
        },
        setupParameters : function () {
            this.setupGlobalStringParameter("what", "c");
            this.setupGlobalStringParameter("wait", what);

            for (paramName in this.simpleParamDefaults) {
                this.setupGlobalNumberParameter(paramName, this.simpleParamDefaults[paramName]);
            }
            
            this.setupGlobalNumberObjectVariant("unit_threshold", 0, farmMgr.unitTypes);
            this.setupGlobalNumberObjectVariant("min_resources", 0, farmMgr.resourceTypes);

            if (typeof delete_reports_attacked != "undefined" && delete_reports_attacked !== 0) {
                farmMgr.ui.addWarning("delete_reports_attacked = 1; többé nem tesz semmit, mert csak problémát okozott!");
            }
            if (typeof delete_reports_on_success != "undefined" && delete_reports_on_success !== 0) {
                farmMgr.ui.addWarning("delete_reports_on_success = 1; többé nem tesz semmit, mert a kh új fejlesztése fölöslegessé teszi.");
            }
            this.logParameters();
            
            this.setupRules();
            
            if (remove_attacked) {
                farmMgr.ui.addGreeting("Támadottak eltávolítva; ");
            }
            if (remove_emptied) {
                farmMgr.ui.addGreeting("Üresek eltávolítva; ");
            }
            if (auto_next_village) {
                farmMgr.ui.addGreeting("Egységek elfogyása esetén falut vált; ");
            }
            if (what) {
                farmMgr.ui.addGreeting("A script további nyomkodása [" + what + "] gombnyomást eredményez; ");
            }
            if (click_on_load) {
                farmMgr.ui.addGreeting("Első gombnyomás végrehajtva; ");
            }
            console.log("Parameter setup done");
        }
    },

    ui : {
        attacked_icon : "graphic/command/attack.png",
        emptied_icon : "graphic/max_loot/0.png",
        max_loot_icon : "graphic/max_loot/1.png",

        resourceIcons : {
            wood : "graphic/holz.png",
            clay : "graphic/lehm.png",
            iron : "graphic/eisen.png"
        },

        wall_icon : "graphic/buildings/wall.png",
        distance_icon : "graphic/rechts.png",
        logIsVisible : false,
        logIsSetup : false,
        preLogMsg : "",
        
        setupLocal : function () {
            farmMgr.ui.localSetting = farmMgr.local[game_data.market];
        },
        isLoadingContent : function () {
            return $("#loading_content").is(":visible");
        },
        setupScriptLinks : function () {
            if (auto_repeat) {
                var quickBars = $("ul.quickbar");
                var scriptLinks = $("a", quickBars);
                var farmScriptLinks = scriptLinks.filter( function (idx) {
                    return this.href.indexOf("farm_script_version") != -1;
                });
                $(farmScriptLinks).mousedown( function (){
                    farmMgr.startAutoFarm();
                });
                $(farmScriptLinks).mouseup( function (){
                    farmMgr.stopAutoFarm();
                });
                $(farmScriptLinks).mouseout( function (){
                    farmMgr.stopAutoFarm();
                });
                console.log("farmMgr.ui.setupScriptLinks() done");
            }
        },
        highlightAttackedCheckbox : function () {
            $("#attacked_checkbox").next("label").css("background-color", "yellow");
        },
        setupSettings : function () {
            if (! $("#attacked_checkbox").is(":checked")) { //Accountmanager.farm.hide_attacked
                console.log("#attacked_checkbox gets clicked");
                $("#attacked_checkbox")[0].click();
                farmMgr.ui.addWarning("Be lett kapcsolva:");
                farmMgr.ui.addWarning($("#attacked_checkbox").next("label").text());
                farmMgr.ui.addWarning("Ezt muszáj bekapcsolni, ha a scriptet akarod használni, ne kapcsold ki! A lapozófunkció elromlana, illetve megakadna a script. Próbáljuk okosítani.");
                this.highlightAttackedCheckbox();
                setTimeout ( function () {
                    farmMgr.ui.highlightAttackedCheckbox();
                },1500);
            }
            if (typeof this.localSetting == "undefined") {
                farmMgr.ui.addWarning("The script's date-handling will be wrong on your world. The script needs to know the translation for 'today' and 'yesterday'. I can correct this script if you mail these words as they appear to kockalovag[at]gmail.com. Include your world info as well.");
            }
        },
        isMobileUI : function () {
            return $("#mobileContent").length !== 0;
        },
        addGreeting : function (msg) {
            if (typeof this.greetingMessage == "undefined") {
                this.greetingMessage = "";
            }
            this.greetingMessage += msg;
        },
        addWarning : function (msg) {
            if (typeof this.warningMessage == "undefined") {
                this.warningMessage = "";
            }
            this.warningMessage += msg + "<br>";
        },
        showWarning : function (blockId) {
            if (typeof this.warningMessage != "undefined") {
                var finalWarningMessage = "";
                finalWarningMessage += "<b><u>Figyelem! Warning!</u></b>";
                finalWarningMessage += "<br>";
                finalWarningMessage += this.warningMessage;
                $("#" + blockId).html(finalWarningMessage);
            }
        },
        prependNewBlock : function (id) {
            var block = doc.createElement("div");
            block.id = id;
            $("#content_value").prepend(block);
        },
        setupLogArea : function (blockId) {
            var html = "";
            html += "<a target='_blank' href='https://docs.google.com/forms/d/1kcTQ3KreOIXY2TS7Th0g3yVUcwsPOY-J_S6ova6YO1Q/viewform'>[Panasz, ötlet]</a>";
            html += "   ";
            html += "<input type='button' id='log_toggle' value='log' style='width: 50px; height: 20px' onclick='farmMgr.ui.toggleLog()'>";
            html += "   ";
            html += "<-- Panasz esetén nyisd le és másold.";
            html += "<br>";
            html += "<textarea id='log_area' rows='10' cols='95' style='display:none;' readonly='true' ondblclick='this.focus();this.select()'></textarea>";    
            $("#" + blockId).html(html); 
            
            this.logIsSetup = true;
            this.setLogVisibility(this.logIsVisible);
            if (this.preLogMsg !== "") {
                $("#log_area").val(this.preLogMsg);
            }
        },
        setupInfoArea : function (blockId) {
            if (farmMgr.param.isThereNewerVersion()) {
                this.addWarning("A legfrissebb paraméterverzió (elérhető a fórumsúgóban): " + farmMgr.currentVersion + "   " 
                    + "<a target='_blank' href='" + doc.URL.replace(/screen\=\w*/i, "screen=settings&mode=quickbar") + "'>[Gyorsgombok szerkesztése]</a>");
            }
            
            var html = "";
            html += "<a target='_blank' href='http://forum.klanhaboru.hu/showthread.php?3601-Farmkezel%C5%91b%C5%91l-a-m%C3%A1r-t%C3%A1madott-falukat-elt%C3%A1vol%C3%ADt%C3%B3-script'>[Farm script fórumsúgó]</a>";
            html += "  ";
            html += "A te paraméterverziód: " + farm_script_version;
            html += "<br>";
            $("#" + blockId).html(html);
        },
        setupControlArea : function (blockId) {
            if (add_button) {
                var html = "";
                html += "<input type='button' value='Farm' style='width: 100px; height: 50px' onclick='farmMgr.advancedFarm()'>";
                html += "<input type='button' value='x' style='width: 100px; height: 50px' onclick='farmMgr.hideFarm(farmMgr.getNextVisibleFarm(), \"x: farm kihagyva\")'>";
                html += "<input type='button' value='next' style='width: 100px; height: 50px' onclick='farmMgr.ui.gotoNextVillage()'>";
                html += "<br>";
                html += "<input type='button' value='a' style='width: 100px; height: 50px' onclick='farmMgr.getNextVisibleFarm().click(\"a\")'>";
                html += "<input type='button' value='b' style='width: 100px; height: 50px' onclick='farmMgr.getNextVisibleFarm().click(\"b\")'>";
                html += "<input type='button' value='c' style='width: 100px; height: 50px' onclick='farmMgr.getNextVisibleFarm().click(\"c\")'>";
                html += "<br>";
                $("#" + blockId).html(html);
            }
        },
        setLogVisibility : function (visibility) {
            if (visibility) {
                $("#log_toggle").attr("value", "log [-]");
                var area = $("#log_area");
                area.show();
                area[0].select();
                farmMgr.ui.scrollLogToBottom();
            } else {
                $("#log_toggle").attr("value", "log [+]");
                $("#log_area").hide();
            }
            farmMgr.ui.logIsVisible = visibility;
        },
        toggleLog : function () {
            farmMgr.ui.setLogVisibility(!farmMgr.ui.logIsVisible);
        },
        log : function (what) {
            if (farmMgr.ui.logIsSetup) {
                box = $("#log_area");
                box.val(box.val() + what + "\n");
                farmMgr.ui.scrollLogToBottom();
            } else {
                farmMgr.ui.preLogMsg += what + "\n";
            }
        },
        scrollLogToBottom : function () {
            box = $("#log_area");
            box.scrollTop(
                box[0].scrollHeight - box.height()
            );
        },
        showGreeting : function () {
            if (typeof this.greetingMessage != "undefined");
            UI.InfoMessage(this.greetingMessage, 3000);
        },
        hasIcon : function (farmRow, icon) {
            var imgs = $(farmRow).find("img");
            for (var i = 0; i < imgs.length; ++i) {
                if (imgs.eq(i).attr("src").indexOf(icon) != -1) {
                    return true;
                }
            }
            return false;
        },
        getReportColor : function (element) {
            var colorPng = element.innerHTML.match(/dots\/.*\.png/)[0];
            var color = colorPng.slice(5, colorPng.indexOf("."));
            return color;
        },
        getDayDiff : function (twDateTimeStr) {
            var localSetting = farmMgr.ui.localSetting;
            if (typeof localSetting != "undefined") {
                if (twDateTimeStr.match(localSetting["today"])) {
                    return 0;
                } else if (twDateTimeStr.match(localSetting["yesterday"])) {
                    return -1;
                } 
            } 
            console.log("Date parse problem: " + twDateTimeStr + " (" + game_data.market + ")");
            return 0;
        },
        getHoursElapsed : function (twDateTimeStr) {
            var date,
                thisYear,
                thisMonth,
                dateStr,
                nums,
                month,
                timeStr;
            date = new Date();
            thisYear = farmMgr.dateNow.getFullYear();
            thisMonth = farmMgr.dateNow.getMonth();

            //calculate year, month, day:
            dateStr = twDateTimeStr.match(/\d+\.\d+\./);
            if (dateStr) {
                nums = dateStr[0].split(".");
                month = parseInt(nums[1],10)-1;
                date.setMonth(month);
                date.setDate(parseInt(nums[0],10));
                if (month <= thisMonth) {
                    date.setFullYear(thisYear);
                } else {
                    date.setFullYear(thisYear-1);
                }
            } else {
                date.setYear(thisYear);
                date.setMonth(thisMonth);
                date.setDate(farmMgr.dateNow.getDate());
                var dayDiff = farmMgr.ui.getDayDiff(twDateTimeStr);
                date.setDate(date.getDate() + dayDiff);
            }

            //calculate time:
            timeStr = twDateTimeStr.match(/\d+\:\d+\:\d+/);
            nums = timeStr[0].split(":");
            date.setHours(parseInt(nums[0],10));
            date.setMinutes(parseInt(nums[1],10));
            date.setSeconds(parseInt(nums[2],10));

            var result = (farmMgr.dateNow - date)/1000/60/60;
            if (result < 0) {
                console.log("Date parse problem! input: [" + twDateTimeStr + "] now: [" + dateToStringDetailed(farmMgr.dateNow) + "] diff: [" + result + "]");
            }
            return result;
        },
        getResources : function (str) {
            var result,
                nums;
            
            result = {
                hasInfo : false,
                resources : {},
            };
            str = str.replace(/\./g, "");
            nums = str.match(/\d+/g);
            if (nums) {
                nums = nums.map(function (e){ return parseInt(e,10); });
                result.hasInfo = true;
            }
            if (nums && nums.length > 0) {
                result.resources["wood"] = nums[0];
                if (nums.length > 1) {
                    result.resources["clay"] = nums[1];
                    if (nums.length > 2) {
                        result.resources["iron"] = nums[2];
                    }
                }
            }
            farmMgr.resourceTypes.forEach( function (resourceType){
                if (typeof result.resources[resourceType] == "undefined") {
                    result.resources[resourceType] = 0;
                }
            });

            return result;
        },
        selectImg : function (element, icon_type) {
            var imgSelector = "img[src*='" + icon_type + "']";
            return $(imgSelector, element);
        },
        retrieveNextSpannedTextResource : function (element, icon_type) {
            var selectedImg = this.selectImg(element, icon_type);
            var res = {
                available: false,
                amount: 0,
            };
            if (selectedImg.length > 0) {
                res.available = true;
                var numStr = $(selectedImg.nextAll("span")[0]).text();
                numStr =  numStr.replace(/\./g, "");
                var num = parseInt(numStr, 10);
                res.amount = num;
            }
            return res;
        },
        extractReportID : function (str) {
            return parseInt(str.match(/view\=\d+/)[0].split("=")[1],10);
        },
        retrieveKey : function (farmRow) {
            if (!this.isMobileUI()) {
                return DesktopFarm.prototype.getReportID(farmRow);
            } else {
                var row1 = $(farmRow).prev().prev();
                return MobileFarm.prototype.getReportID(row1);
            }
        },
        getFarm : function (farmLink) {
            var farmRow = $(farmLink).closest("tr");
            return farmMgr.farmMap[this.retrieveKey(farmRow)];
        },
        getTemplateFromLink : function (farmLink) {
            if ($(farmLink).hasClass("farm_icon_a")) {
                return "a";
            }
            if ($(farmLink).hasClass("farm_icon_b")) {
                return "b";
            }
            if ($(farmLink).hasClass("farm_icon_c")) {
                return "c";
            }
        },
        //result form: e.g. [{name: spy, value: 1}, {name: light, value: 30}]
        getTemplateUnits : function (form) {
            var inputs = $("input[type=text]", form);
            units = [];
            for (var i = 0; i < inputs.length; ++i) {
                var element = $(inputs[i]);
                var value = parseInt(element.attr("value"),10);
                if (value > 0) {
                    units.push({
                        name : element.attr("name"),
                        value : value});
                }
            }
            return units;
        },
        getLastPageIdx : function () { //zero-based
            var nums = $("a.paged-nav-item, strong").text().match(/\d+/g);
            if (nums) {
                return parseInt(nums[nums.length-1],10)-1;
            } else {
                return 0;
            }
        },
        getPageIdx : function () { //zero-based
            return Accountmanager.farm.page;
        },
        getAvailableNumOfUnit : function (unitName) {
            var unitStr = $("#units_home #" + unitName).text();
            return parseInt(unitStr, 10);
        },
        getAvailableUnits : function () {
            var units = {};
            farmMgr.unitTypes.forEach( function(unitType) {
                var num = farmMgr.ui.getAvailableNumOfUnit(unitType);
                if (!isNaN(num)) {
                    units[unitType] = num;
                }
            });
            return units;
        },
        gotoNextPage : function () {
            if (doc.URL.match(/Farm_page[\=][\d]+/i)) {
                var pageIdx = this.getPageIdx();
                var nextIdx = pageIdx + 1;
                self.location = doc.URL.replace(/Farm_page[\=][\d]+/ig, "Farm_page=" + nextIdx);
            } else {
                self.location = doc.URL + "&Farm_page=1";
            }
        },
        gotoNextVillage : function () {
            if ($("a#village_switch_right").length > 0) {
                if (farmMgr.ui.getPageIdx() > 0) {
                    self.location = $('a#village_switch_right').attr('href').replace(/Farm_page[\=][\d]+/i, "Farm_page=0");
                } else {
                    self.location = $('a#village_switch_right').attr('href');
                }
            } else {
                UI.InfoMessage("Vége");
            }
        },
        getCheckedUnits : function () {
            var checkedUnits = $("#farm_units").serialize(); //e.g. "light=on&marcher=on&heavy=on"
            checkedUnits = checkedUnits.replace(/=on/g, ""); //e.g. "light&marcher&heavy"
            checkedUnits = checkedUnits.split("&"); //e.g. ["light", "marcher", "heavy"]
            return checkedUnits;
        },
        checkBoxes : [
            "#all_village_checkbox",
            "#attacked_checkbox",
            "#full_losses_checkbox",
            "#partial_losses_checkbox",
            "#full_hauls_checkbox"            
        ],
        logFacts : function () {
            var logMsg = "*** SETTINGS and FACTS: ***\n";
            this.checkBoxes.forEach(function (checkBoxId) {
                logMsg += checkBoxId + "=" + $(checkBoxId).is(":checked") + "; ";
            });
            logMsg += "\n";
            
            logMsg += "page_size=" + $("#farm_pagesize").val() + "; ";
            logMsg += "current page idx:" + this.getPageIdx() + "; ";
            logMsg += "last page idx:" + this.getLastPageIdx() + "; ";
            logMsg += "\n";
            
            logMsg += "Available units: " + JSON.stringify(this.getAvailableUnits());
            logMsg += "\n";
            
            logMsg += "game_data: {";
            logMsg += "device: " + game_data.device + ", ";
            logMsg += "majorVersion: " + game_data.majorVersion + ", ";
            logMsg += "market: " + game_data.market + ", ";
            logMsg += "world: " + game_data.world + ", ";
            logMsg += "player.villages: " + game_data.player.villages;
            logMsg += "}";
            
            console.log(logMsg);
        }
    },

    dbg : {
        keep_visible : false,
        dont_leave_page : false,
        isPrintStackTraceLoading : false,
        printStackTraceLoaded : false,        

        init : function () {
            //Accountmanager.farm.hide_attacked = false;
        },

        testFastSending : function (nowWhat, num) {
            for (var idx = 0; idx < num; ++idx) {
                var farm = farmMgr.getNextVisibleFarm();
                farm.click(nowWhat);
            }
        },

        debugCountVisible : function () {
            var numVisible = 0;
            var numHidden = 0;
            for (var idx in farmList) {
                var farm = farmMgr.farmList[idx];
                if (farm.visible) {
                    ++numVisible;
                } else {
                    ++numHidden;
                }
            }
            console.log("Visible: " + numVisible + " Hidden: " + numHidden);
        },
        
        createError : function () {
            try {
                this.undef();
            } catch (e) {
                return e;
            }
        },
        myPrintStackTrace : function (error, dateError) {
            console.log("omgWTF happened at " + dateToStringDetailed(dateError) + ", stacktrace:");
            var stackTrace = printStackTrace({e: error});
            console.log(stackTrace.join("\n"));
            console.log("-------------------------------------------");
        },
        omgWTF : function (error, dateError) {
            //As getScript is asynchronous, we have to use a workaround to save the current stacktrace.
            if (typeof error == "undefined") {
                var error = farmMgr.dbg.createError();
            }
            if (typeof dateError == "undefined") {
                var dateError = getCurrentServerDateTime();
            }
            console.log("omgWTF happened at " + dateToStringDetailed(dateError) + ", stacktrace is following soon...");
            if (farmMgr.dbg.isPrintStackTraceLoading) {                
                waitFor({ 
                    waitCondition : $.proxy( function () { return this.isPrintStackTraceLoading; }, this), 
                    waitMsg : "stacktrace printer is loading",
                    callback : $.proxy( this.myPrintStackTrace, this, error, dateError ), 
                    callbackMsg : "printing stacktrace",
                    interval : 50
                });
            } else if (!farmMgr.dbg.printStackTraceLoaded) {
                //We load the stacktrace-printer functionality only if needed, the first time omgWTF() is called.
                farmMgr.dbg.isPrintStackTraceLoading = true;
                $.getScript("https://dl.dropboxusercontent.com/u/21199222/tw/scripts/script_utils/stacktracejs.js", 
                    function () {
                        farmMgr.dbg.isPrintStackTraceLoading = false;
                        farmMgr.dbg.printStackTraceLoaded = true;
                        farmMgr.dbg.myPrintStackTrace(error, dateError);
                    });
            } else {
                //already loaded, ready to use
                farmMgr.dbg.myPrintStackTrace(error, dateError);
            }            
        },
        setupLogHook : function () {
            if (typeof console.log != "object") { //check: IE9 will suck
                var oldLog = console.log;
                console.log = function (msg) {
                    farmMgr.ui.log(msg);
                    oldLog.call(this, msg);
                };
            }
        },
        logEnvironment : function () { 
            // http://stackoverflow.com/questions/5916900/detect-version-of-browser
            var result = (function(){
                var ua= navigator.userAgent, tem, 
                M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
                if(/trident/i.test(M[1])){
                    tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
                    return 'IE '+(tem[1] || '');
                }
                if(M[1]=== 'Chrome'){
                    tem= ua.match(/\bOPR\/(\d+)/)
                    if(tem!= null) return 'Opera '+tem[1];
                }
                M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
                if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
                return M.join(' ');
            })();
            console.log("Environment: " + result);
        }
    },

    farmList : [],
    farmMap : {},
    pendingList : [],
    autoFarmThat : function (nowWhat) { //todo refactor
        if (this.autoFarmOn) {
            this.tryFarmIfPossible(this.getNextVisibleFarm(), nowWhat, "");
        }
    },
    autoFarm : function () {
        if (this.autoFarmOn) {
            this.advancedFarm();
            setTimeout( function () {
                console.log("autoFarm...");
                farmMgr.autoFarm();
            }, this.autoFarmInterval);
        }
    },
    startAutoFarm : function () {
        if (!this.autoFarmOn) {
            this.autoFarmOn = true;
            this.autoFarm();
        }
    },
    stopAutoFarm : function () {
        this.autoFarmOn = false;
    },
    setupExternalClickHook : function (farmObject) {
        var farmLinkTemplate,
            farmLink;
        for(farmLinkTemplate in farmObject.links) {
            farmLink = farmObject.links[farmLinkTemplate][0];
            $(farmLink).click(function () {
                farmMgr.ui.getFarm(this).handleExternalClick(farmMgr.ui.getTemplateFromLink(this));
            });
        }
        /*
        $("a.farm_icon_c, a.farm_icon_b, a.farm_icon_a").click(function () {
            farmMgr.ui.getFarm(this).handleExternalClick(farmMgr.ui.getTemplateFromLink(this));
        });*/
    },
    setupFarm : function(farmObject) {
        this.farmList.push(farmObject);
        this.farmMap[farmObject.getKey()] = farmObject;
        this.setupExternalClickHook(farmObject);
    },
    createNewFarms : function () {
        console.log("Creating farms");
        var isMobile,
            idx,
            rows,
            farmObject;
        rows = $("tr.row_a, tr.row_b").not(".farmMgrAdded");
        if (this.ui.isMobileUI()) {
            isMobile = true;
            console.log("Mobile");
        }
        if (!isMobile) {
            for (idx = 0; idx < rows.length; idx += 1) {
                farmObject = new DesktopFarm(rows[idx]);
                this.setupFarm(farmObject);
            }
        } else {
            for (idx = 0; idx < rows.length - 2; idx += 3) {
                farmObject = new MobileFarm(rows[idx], rows[idx+1], rows[idx+2]);
                this.setupFarm(farmObject);
            }
        }
    },
    handlePending : function () {
        var succ = 0;
        var unSucc = 0;
        var shouldLog = false;
        var newPendingList = [];
        for (var idx in farmMgr.pendingList) {
            var farm = farmMgr.pendingList[idx];
            if (!farm.isStillThere()) {
                console.log("considering it successful, TW rudely removed: " + farm.toString());
                shouldLog = true;
                ++succ;
            } else if (farm.isFullyDisabled()) {
                shouldLog = true;
                ++succ;
            } else if (getCurrentServerDateTime() - farm.clickedDate > farmMgr.responseThreshold) {
                shouldLog = true;
                farm.show();
                console.log("unsuccessful in " + farmMgr.responseThreshold + " milliseconds: " + farm.toString());
                ++unSucc;
            } else {
                newPendingList.push(farm);
            }
        }
        farmMgr.pendingList = newPendingList;
        if (shouldLog) {
            console.log("Successful: " + succ + "; unsuccessful: " + unSucc);
        }
    },
    waitForPendingDone : function (callbackFn) {
        if (this.pendingList.length > 0) {
            console.log("Waiting for " + this.pendingRefreshInterval + " before performing action...");
            setTimeout(
                function () { farmMgr.waitForPendingDone(callbackFn); },
                    this.pendingRefreshInterval);
        } else {
            console.log("Performing action (waitForPendingDone())...");
            callbackFn();
        }
    },
    setupPendingChecker : function () {
        setInterval(this.handlePending, this.pendingRefreshInterval);
    },
    getTemplateCapacity : function (templateUnits) {
        var capacity = 0;
        for (var idx in templateUnits) {
            var desctription = templateUnits[idx];
            capacity += this.unitCarry[desctription.name] * desctription.value;
        }
        return capacity;
    },
    setupEnvironment : function () {
        this.dbg.setupLogHook(); //definitely the first
        console.log("trySetup() at " + dateToStringDetailed(getCurrentServerDateTime()));
        
        this.ui.setupLocal();
        this.ui.prependNewBlock("control_area");
        this.ui.prependNewBlock("info_area");
        this.ui.prependNewBlock("dbg_log");
        this.ui.prependNewBlock("warning_area");
        this.ui.setupLogArea("dbg_log");
        this.ui.setupInfoArea("info_area");
        
        this.dbg.logEnvironment();
        this.ui.logFacts();
        this.ui.setupSettings();
        
        this.farmWidget = doc.getElementById("am_widget_Farm");

        this.checkedUnits = this.ui.getCheckedUnits();
        console.log("checkedUnits: " + this.checkedUnits);
        
        this.templates = this.getTemplates();
        console.log("templates: " + JSON.stringify(this.templates));
        
        
        this.param.setupParameters();
        this.ui.setupControlArea("control_area"); //after setupParameters
        this.ui.setupScriptLinks();
        this.ui.showWarning("warning_area"); //must be after setupParameters
    },
    setupFarmLogic : function () {
        this.dateNow = getCurrentServerDateTime();

        this.param.remove_attacked_prev = remove_attacked;
        this.param.remove_emptied_prev = remove_emptied;

        this.pendingList = [];
        this.farmList = [];
        this.farmMap = {};
        this.setupPendingChecker();
        
        this.createNewFarms();
        console.log("setupFarmLogic() done");
    },
    setupLogic : function () {
        this.setupSuccessful = false;
        try {
            this.setupFarmLogic(); //must be after setupParameters
            this.setupDiagnostics();
            this.filterFarms(); //must be after setupFarmLogic //refactor
            this.ui.showGreeting();
            this.dbg.init();
            this.setupSuccessful = true;
            console.log("Setup successful!");
        } catch (e) {
            console.log("Setup of logic failed!");
            this.dbg.omgWTF(e);
        }
        this.setupTried = true;
        console.log("-----------------");
    },
    areThereEnoughResourcesPerType : function (farm) {
        var ok = true;
        this.resourceTypes.forEach( function (resourceType) {
            if (farm.resources[resourceType] < min_resources[resourceType]) {
                ok = false;
            }
        });
        return ok;
    },
 
    applyFilters : function (farm) {
        var shouldHide = false;
        if (remove_attacked && farm.isAttacked) {
            farm.appendDiagLog("attacked");
            shouldHide = true;
        }
        if (remove_emptied && farm.isEmptied) {
            farm.appendDiagLog("emptied");
            shouldHide = true;
        }
        if (remove_c_disabled && !farm.isEnabled("c")) {
            farm.appendDiagLog("c_disabled");
            shouldHide = true;
        }
        if (farm.wall < min_wall) {
            farm.appendDiagLog("" + farm.wall + "< min_wall(" + min_wall + ")");
            shouldHide = true;
        }
        if (farm.wall > max_wall) {
            farm.appendDiagLog("" + farm.wall + "> max_wall(" + max_wall + ")");
            shouldHide = true;
        }
        if (max_distance > 0 && farm.distance > max_distance) {
            farm.appendDiagLog("" + farm.distance + " > max_distance(" + max_distance + ")");
            shouldHide = true;
        }
        if (farm.hoursElapsed < min_time) {
            farm.appendDiagLog("" + farm.hoursElapsed.toFixed(2) + " < min_time(" + min_time + ")");
            shouldHide = true;
        }
        if (max_time > 0 && farm.hoursElapsed > max_time) {
            farm.appendDiagLog("" + farm.hoursElapsed.toFixed(2) + " > max_time(" + max_time + ")");
            shouldHide = true;
        }
        if (!this.areThereEnoughResourcesPerType(farm)) {
            farm.appendDiagLog("< min_resources");
            shouldHide = true;
        }
        if (farm.getSumResources() < min_resources_sum) {
            farm.appendDiagLog("" + farm.getSumResources() + " < min_resources_sum(" + min_resources_sum + ")");
            shouldHide = true;
        }
        if (shouldHide) {
            farm.hide();
        }
    },
    filterFarms : function () { //refactor
        console.log("Filtering farms");
        this.farmList.forEach(function (farm) {
            farmMgr.applyFilters(farm);
        });
    },
    setupDiagnostics : function () {
        if (diagnostics) {
            this.farmList.forEach(function (e){e.addDiagnostics();});
            this.dbg.keep_visible = true;
            this.dbg.dont_leave_page = true;
        }
    },
    getTemplates : function () {
        var forms = $("form");
        var templates = {};
        templates["a"] = {};
        templates["a"].units = this.ui.getTemplateUnits(forms[0]);
        templates["a"].capacity = this.getTemplateCapacity(templates["a"].units);
        templates["b"] = {};
        templates["b"].units = this.ui.getTemplateUnits(forms[1]);
        templates["b"].capacity = this.getTemplateCapacity(templates["b"].units);
        return templates;
    },
    
    trySetup : function () {
        //guard against multiple trial to setup
        if (typeof this.setupStarted == "undefined") {
            this.setupStarted = true;
        } else {
            console.log("trySetup() at " + dateToStringDetailed(getCurrentServerDateTime()) + " ignoring, already setting up");
            return false;
        }
        if (game_data.screen != "am_farm") {
            UI.InfoMessage(this.msg.goingToFarmMessage, 4000);
            self.location=game_data.link_base_pure.replace(/screen\=\w*/i, "screen=am_farm");
            return false;
        }
        if (game_data.player.premium === false) {
            UI.ErrorMessage("Prémium kéne na.", 4000);
            return false;
        }
        
        this.setupEnvironment();
        
        waitFor({ 
            waitCondition : farmMgr.ui.isLoadingContent,      
            waitMsg : "content is loading",
            callback : $.proxy( this.setupLogic, this ), 
            callbackMsg : "farmMgr.setupLogic()",
            interval : 50
        });
    },
    getNextVisibleFarm : function () {
        for (var i = 0; i < this.farmList.length; ++i) {
            if (this.farmList[i].visible) {
                return this.farmList[i];
            }
        }
        return null; //todo exception?
    },
    nextPage : function (force) {
        this.stopAutoFarm();
        UI.InfoMessage(this.msg.goingToNextPageMessage, 2000);
        this.waitForPendingDone( function () {
            if (!farmMgr.dbg.dont_leave_page) {
                var pageIdx = farmMgr.ui.getPageIdx();
                var lastPageIdx = farmMgr.ui.getLastPageIdx();
                if (pageIdx == lastPageIdx) {
                    if (auto_next_village || force) {
                        farmMgr.nextVillage();
                    }
                } else {
                    farmMgr.ui.gotoNextPage();
                }
            } else {
                UI.InfoMessage("farmMgr.dbg.dont_leave_page is true, we stay here", 3000);
                console.log("farmMgr.dbg.dont_leave_page is true, we stay here");
            }
        });
    },
    nextVillage : function () {
        this.stopAutoFarm();
        //todo message refactor
        UI.InfoMessage(this.msg.goingToNextVillageMessage, 2000);
        this.waitForPendingDone( function () {
            if (!farmMgr.dbg.dont_leave_page) {
                farmMgr.ui.gotoNextVillage();
            } else {
                UI.InfoMessage("farmMgr.dbg.dont_leave_page is true, we stay here", 3000);
                console.log("farmMgr.dbg.dont_leave_page is true, we stay here");
            }
        });
    },
    areThereUnitsToSend : function (nowWhat) {
        var ok,
            num;
        if (nowWhat == "c") {
            ok = false;
            this.checkedUnits.forEach( function (unitType) {
                if (farmMgr.ui.getAvailableNumOfUnit(unitType) > unit_threshold[unitType]) ok = true;
            });
            return ok;
        } else if (nowWhat == "a" || nowWhat == "b") {
            ok = true;
            this.templates[nowWhat].units.forEach( function (unitDescription) { //e. g. {name: "spy", value: 1}
                num = farmMgr.ui.getAvailableNumOfUnit(unitDescription.name);
                if ( num < unitDescription.value || (num - unitDescription.value) < unit_threshold[unitDescription.name]) {
                    ok = false;
                }
            });
            return ok;
        }
    },
    haveToWait : function (nowWhat) {
        if (wait.indexOf(nowWhat) != -1) {
            return this.areThereUnitsToSend(nowWhat);
        }
    },
    getPossibleTemplates : function () {
        var str = "";
        if (this.areThereUnitsToSend("a")) {
            str += "a";
        }
        if (this.areThereUnitsToSend("b")) {
            str += "b";
        }
        if (this.areThereUnitsToSend("c")) {
            str += "c";
        }
        return str;
    },
    canGoToNextVillage : function () {
        return auto_next_village && (!(this.haveToWait("a") || this.haveToWait("b") || this.haveToWait("c")));
    },
    tryFarmIfPossible : function (farm, nowWhat, message) {
        if (this.areThereUnitsToSend(nowWhat)) {
            farm.click(nowWhat);
            if (nowWhat == "a" || nowWhat == "b") {
                UI.InfoMessage(this.msg.getAnimation() + " [" + nowWhat + "] sablon használva; " + message, 4000);
            }
            return true;
        } else {
            UI.ErrorMessage(this.msg.noMoreUnitsMessage + " [" + nowWhat + "] " +
                this.msg.possibleTemplateMessage + "[" + this.getPossibleTemplates() + "] " +
                this.msg.waitingTemplateMessage + "[" + wait + "]", 3000);
            return false;
        }
    },
    applyRules : function (farm) {
        var rulePerformed = false;
        var ruleIdx = 0;
        while (ruleIdx < this.param.ruleList.length && !rulePerformed) {
            rulePerformed = false;
            var rule = this.param.ruleList[ruleIdx];
            if (!rule.info.ok) {
                UI.ErrorMessage(rule.getErrorMessage(), 5000);
                return; //todo exception
            } else {
                if (rule.applies(farm)) {
                    console.log("Rule applies on [" + farm.toString() + "] trying: " + rule.toString());
                    if (rule.action == "x") {
                        this.hideFarm(farm, "Kihagyva emiatt: " + (ruleIdx+1) + ". [" + rule.info.rule + "]");
                        rulePerformed = true;
                    } else if (rule.action == "stop") {
                        this.stopAutoFarm();
                        UI.InfoMessage("Ez a szabály megállított: " + (ruleIdx+1) + ". [" + rule.info.rule + "]", 5000);
                        rulePerformed = true;
                    } else if (rule.action == "next") {
                        this.nextVillage();
                        rulePerformed = true;
                    } else {
                        var nowWhat = rule.action;
                        if (this.tryFarmIfPossible(farm, nowWhat, "" + (ruleIdx+1) + ". [" + rule.info.rule + "]")) {
                            rulePerformed = true;
                        }
                    }
                    if (!rulePerformed) {
                        console.log("Application failed, trying next rule");
                    }
                }
            }
            ++ruleIdx;
        }
        if (!rulePerformed) {
            console.log("No rule performed, performing farm template: " + what);
            var msg = "";
            if (this.param.ruleList.length > 0) {
                msg = "szabályok nem teljesültek";
            }
            this.tryFarmIfPossible(farm, what, msg);
        }
    },
    farmClick : function () {
        if (this.needsToSetup()) {
            console.log("wait for setup");
            return;
        }
        var nextFarm = this.getNextVisibleFarm();
        if (!nextFarm) {
            if (this.canGoToNextVillage()) {
                this.nextVillage();
            } else {
                this.nextPage();
            }
        } else { //if there are visible farms
            if (this.canGoToNextVillage()) {
                this.nextVillage();
            } else {
                this.applyRules(nextFarm);
            }
        }
    },
    hideFarm : function (farm, message) {
        farm.hide();
        farm.appendDiagLog(message);
        UI.InfoMessage(message, 5000);
    },
    needsToSetup : function () {
        return (typeof this.setupTried == "undefined");
    },
    trackFilterSettings : function () {
        if (this.param.remove_attacked_prev != remove_attacked) {
            this.filterFarms(); //refact
            this.param.remove_attacked_prev = remove_attacked;
        }
        if (this.param.remove_emptied_prev != remove_emptied) {
            this.filterFarms(); //refact
            this.param.remove_emptied_prev = remove_emptied;
        }
    },
    trackBehaviorSettings : function () {
        wait = wait.toLowerCase();
        what = what.toLowerCase();
        this.param.setupGlobalNumberObjectVariant("unit_threshold", 0, farmMgr.unitTypes);
        this.param.setupGlobalNumberObjectVariant("min_resources", 0, farmMgr.resourceTypes);
        this.param.setupRules();
    },
    advancedFarm : function () {
        if (this.needsToSetup()) {
            this.trySetup();
            waitFor({ 
                waitCondition : $.proxy(farmMgr.needsToSetup, this),    
                waitMsg : "setup is not finished yet",
                callback : $.proxy( function () {     
                        var success = this.setupSuccessful;
                        if (click_on_load && success) {
                            console.log("click_on_load...");
                            this.advancedFarm();
                        }
                    }, this), 
                callbackMsg : "stuff after successful trySetup()",
                interval : 50
            });            
        } else if (this.setupSuccessful) {
            this.trackFilterSettings();
            this.trackBehaviorSettings();
            if (what) {
                this.farmClick();
            }
        } else {
            console.log("Setup was not successful, ignoring");
        }
    },
};

function Rule(ruleStr) {
    this.info = {
        ok: true,
        rule: ruleStr,
        error: ""
    };
    this.action = null;
    this.checkList = [];

    if (typeof ruleStr != "string") {
        this.info.ok = false;
        this.info.error += 'Idézőjelek "" közt kell lennie a szabálynak! ';
        return;
    }
    var rulePair = ruleStr.split(":");
    if (rulePair.length != 2) {
        this.info.ok = false;
        this.info.error += "Pontosan egy kettőspont : választhatja el a feltételt és az akciót";
        return;
    }

    var conditionStr = rulePair[0];
    this.parseConditions(conditionStr);
    if (!this.info.ok) {
        return;
    }

    var actionStr = rulePair[1].trim();
    if (this.allowedActions.indexOf(actionStr) != -1) {
        this.action = actionStr;
    } else {
        this.info.ok = false;
        this.info.error += "Értelmezhetetlen akció: [" + actionStr + "] Csak ezek egyike lehetne: " + this.allowedActions.toString();
        return;
    }
}

Rule.prototype.allowedActions = ["a", "b", "c", "x", "stop", "next"];

Rule.prototype.applies = function (farm){
    if (this.checkList.length > 0) {
        for (var idx in this.checkList) {
            var checkFn = this.checkList[idx];
            if (!checkFn(farm)) {
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
};

Rule.prototype.unaryABCConditionTypes = [
    {   name: "farm_ok",
        conditionIsMetFn: function (farm, nowWhat) { return farm.isEnabled(nowWhat); }
    },
    {   name: "farm_no",
        conditionIsMetFn: function (farm, nowWhat) { return !farm.isEnabled(nowWhat); }
    },
    {   name: "units_ok",
        conditionIsMetFn: function (farm, nowWhat) { return farmMgr.areThereUnitsToSend(nowWhat); }
    },
    {   name: "units_no",
        conditionIsMetFn: function (farm, nowWhat) { return !farmMgr.areThereUnitsToSend(nowWhat); }
    }
];

Rule.prototype.noParamBoolConditionTypes = [
    {   name: "always",
        conditionIsMetFn : function (farm) { return true; }
    },
    {   name: "green",
        conditionIsMetFn : function (farm) { return farm.reportColor == "green"; }
    },
    {   name: "blue",
        conditionIsMetFn : function (farm) { return farm.reportColor == "blue"; }
    },
    {   name: "yellow",
        conditionIsMetFn : function (farm) { return farm.reportColor == "yellow"; }
    },
    {   name: "red",
        conditionIsMetFn : function (farm) { return farm.reportColor == "red"; }
    },
    {   name: "max_loot",
        conditionIsMetFn : function (farm) { return farm.wasMaxLoot; }
    },
    {   name: "emptied",
        conditionIsMetFn : function (farm) { return farm.isEmptied; }
    },
    {   name: "attacked",
        conditionIsMetFn : function (farm) { return farm.isAttacked; }
    },
    {   name: "was_spied",
        conditionIsMetFn : function (farm) { return farm.wasSpied; }
    }
];

Rule.prototype.getOperandEvaluator = function (operand) {
    if (farmMgr.resourceTypes.indexOf(operand) != -1) {
        return function (farm) {
            return farm.resources[operand];
        };
    } else if (farmMgr.unitTypes.indexOf(operand) != -1) {
        return function (farm) {
            return farmMgr.ui.getAvailableNumOfUnit(operand);
        };
    } else if (operand == "time") {
        return function (farm) {
            return farm.hoursElapsed;
        };
    } else if (operand == "distance") {
        return function (farm) {
            return farm.distance;
        };
    } else if (operand == "wall") {
        return function (farm) {
            return farm.wall;
        };
    } else if (operand == "sum_resources") {
        return function (farm) {
            return farm.getSumResources();
        };
    } else if (operand == "page") {
        return function (farm) {
            return farmMgr.ui.getPageIdx();
        };
    } else if (operand == "now") {
        return function (farm) {
            return getCurrentServerDateTime().getHours();
        };
    } else if (["a", "b"].indexOf(operand) != -1) {
        return function (farm) {
            return farmMgr.templates[operand].capacity;
        };
    } else if (operand.match(/^\d+$/)) {
        return function (farm) {
            return parseInt(operand, 10);
        };
    } else { //invalid operand
        farmMgr.dbg.omgWTF();
        return null;
    }
};

Rule.prototype.operationMap = {
    "<" : function (lhs, rhs) { return lhs < rhs; },
    ">" : function (lhs, rhs) { return lhs > rhs; },
    "=" : function (lhs, rhs) { return lhs == rhs; },
    "<=" : function (lhs, rhs) { return lhs <= rhs; },
    ">=" : function (lhs, rhs) { return lhs >= rhs; },
    "==" : function (lhs, rhs) { return lhs == rhs; },
};

Rule.prototype.getOperation = function (lhs, operator, rhs) {
    return function (farm) {
        var lhsVal = lhs(farm);
        var rhsVal = rhs(farm);
        return Rule.prototype.operationMap[operator](lhsVal, rhsVal);
    };
};

Rule.prototype.operandRegexStr = "(\\d+|[a-zA-Z_]+)";
Rule.prototype.operatorRegexStr = "(<=|>=|==|<|>|=)"; //keep the order! longer literals need to precede shorter ones
Rule.prototype.operatorRegex = RegExp(Rule.prototype.operatorRegexStr);
Rule.prototype.comparisonRegex =
    RegExp("^\\s*" + Rule.prototype.operandRegexStr + "\\s*" + Rule.prototype.operatorRegexStr + "\\s*" + Rule.prototype.operandRegexStr + "\\s*$");

Rule.prototype.tryCreateComparisonRule = function (conditionStr) {
    if (conditionStr.match(this.comparisonRegex)) {
        var operator,
            operands;
        operator = conditionStr.match(this.operatorRegex)[0]; //Hack: we assume the first match will be ok. Note the danger of operatorRegex order.
        operands = conditionStr.split(operator);
        if (operands.length != 2) {
            return false;
        } else {
            operands = operands.map( function (e) { return e.trim(); } );
            var lhs = this.getOperandEvaluator(operands[0]);
            var rhs = this.getOperandEvaluator(operands[1]);
            if (lhs && rhs) {
                this.checkList.push( this.getOperation(lhs, operator, rhs) );
                return true; //successfully created
            } else {
                return false;
            }
        }
    } else {
        return false; //no match
    }
};

Rule.prototype.createUnaryParamRegex = function (name, paramRegStr) {
    return RegExp("^\\s*" + name + "\\s*\\(\\s*" + paramRegStr + "\\s*\\)\\s*$");
};

Rule.prototype.isUnaryIntCondition = function (name, conditionStr) {
    var regex = Rule.prototype.createUnaryParamRegex(name, "\\d+");
    return conditionStr.match(regex) !== null;
};

Rule.prototype.isUnaryABCCondition = function (name, conditionStr) {
    var regex = Rule.prototype.createUnaryParamRegex(name, "[a|b|c]");
    return conditionStr.match(regex) !== null;
};

Rule.prototype.getParameter = function (conditionStr, paramRegStr) {
    var parantheses = conditionStr.match(/\(.*\)/)[0];
    var param = parantheses.match(paramRegStr)[0];
    return param;
};

Rule.prototype.getIntParameter = function (conditionStr) {
    return parseInt(getParameter(conditionStr, "\\d+"), 10);
};

Rule.prototype.getABCParameter = function (conditionStr) {
    return this.getParameter(conditionStr, "[a|b|c]");
};

Rule.prototype.tryCreateUnaryABCCondition = function (conditionType, conditionStr) {
    if (this.isUnaryABCCondition(conditionType.name, conditionStr)) { //e.g. "xyz(b)"
        var templateParam = this.getABCParameter(conditionStr);
        this.checkList.push(
            function (farm) {
                return conditionType.conditionIsMetFn(farm, templateParam);
            }
        );
        return true; //successfully created
    } else {
        return false; //no match
    }
};

function negateIfNeeded(value, hasToNegate) {
    if (typeof value != "boolean") {
        farmMgr.dbg.omgWTF();
    }
    if (hasToNegate) {
        return !value;
    } else {
        return value;
    }
}

Rule.prototype.tryCreateNoParamBoolCondition = function (conditionType, conditionStr) {
    if (conditionStr.match(conditionType.name)) {
        var hasToNegate = conditionStr.match("!");
        this.checkList.push(
            function (farm) {
                return negateIfNeeded(conditionType.conditionIsMetFn(farm), hasToNegate);
            }
        );
        return true; //successfully created
    } else {
        return false; //no match
    }
};

Rule.prototype.parseConditions = function (fullConditionStr) {
    var conditions,
        idx,
        conditionStr,
        foundConditionType,
        i;
    
    conditions = fullConditionStr.split("&");
    for (idx in conditions) {
        conditionStr = conditions[idx];
        foundConditionType = false;

        //try to create comparison:
        if (this.tryCreateComparisonRule(conditionStr)) {
            foundConditionType = true;
        }

        //search through unary-abc-condition-types:
        if (!foundConditionType) {
            for (i in this.unaryABCConditionTypes) {
                if (this.tryCreateUnaryABCCondition(this.unaryABCConditionTypes[i], conditionStr)) {
                    foundConditionType = true;
                    break;
                }
            }
        }

        if (!foundConditionType) {
            for (i in this.noParamBoolConditionTypes) {
                if (this.tryCreateNoParamBoolCondition(this.noParamBoolConditionTypes[i], conditionStr)) {
                    foundConditionType = true;
                    break;
                }
            }
        }

        //Error: no matching conditionType found
        if(!foundConditionType) {
            this.info.ok = false;
            this.info.error += "Nem lehet ilyen feltételt írni: [" + conditionStr + "]";
        }
    }
};

Rule.prototype.getAction = function () {
    return this.action;
};

Rule.prototype.getErrorMessage = function () {
    return "Hibás szabály: [" + this.info.rule + "]: " + this.info.error;
};

Rule.prototype.toString = function () {
    return "info: { ok: " + this.info.ok + ", rule: " + this.info.rule + ", error: " + this.info.error + "}";
};

//base of descendants
function Farm() {
}

function DesktopFarm(farmRow) {
    //todo retrieve hardcoded indexes from table header
    var cells = $("td", farmRow);
    this.row = farmRow;
    $(this.row).addClass("farmMgrAdded");
    this.reportColor = farmMgr.ui.getReportColor(cells[1]); //hardcoded idx
    this.coord = farmRow.innerHTML.match(/\d+\|\d+/)[0]; //first coord found is considered the village's coord
    this.visible = true;
    this.deleteReportsLink = $("a", cells[0])[0]; //hardcoded idx
    this.targetVillageID = parseInt(farmRow.className.match(/\d+/)[0],10);
    this.reportID = this.getReportID(farmRow);
    this.isAttacked = farmMgr.ui.hasIcon(farmRow, farmMgr.ui.attacked_icon);
    this.isEmptied = farmMgr.ui.hasIcon(farmRow, farmMgr.ui.emptied_icon);
    this.wasMaxLoot = farmMgr.ui.hasIcon(farmRow, farmMgr.ui.max_loot_icon);
    this.hoursElapsed = farmMgr.ui.getHoursElapsed(cells[4].innerHTML); //hardcoded idx
    this.wall = parseInt(cells[6].innerHTML, 10); //hardcoded idx
    if (isNaN(this.wall)) {
        this.wall = 0;
    } //todo exception

    this.distance = parseFloat(cells[7].innerHTML); //hardcoded idx

    var resourceInfo = farmMgr.ui.getResources($(cells[5]).text()); //hardcoded idx
    this.wasSpied = resourceInfo.hasInfo;
    this.resources = resourceInfo.resources;
    this.links = {
        "a": $("a.farm_icon_a", farmRow),
        "b": $("a.farm_icon_b", farmRow),
        "c": $("a.farm_icon_c", farmRow)
    };
    this.startingStatus = {
        "a": this.isEnabled("a"),
        "b": this.isEnabled("b"),
        "c": this.isEnabled("c")
    };
    return this;
}

DesktopFarm.prototype = new Farm();

function MobileFarm(row1, row2, row3) {
    this.row1 = row1;
    var row1Links = $("a", row1);
    this.deleteReportsLink = row1Links[0];
    this.reportID = this.getReportID(row1);
    this.coord = row1Links[1].innerHTML.match(/\d+\|\d+/)[0];
    this.reportColor = farmMgr.ui.getReportColor(row1);
    this.isAttacked = farmMgr.ui.hasIcon(row1, farmMgr.ui.attacked_icon);
    this.isEmptied = farmMgr.ui.hasIcon(row1, farmMgr.ui.emptied_icon);
    this.wasMaxLoot = farmMgr.ui.hasIcon(row1, farmMgr.ui.max_loot_icon);
    this.targetVillageID = parseInt(row1.className.match(/\d+/)[0],10);

    var detailCell = $("td", row1)[1];
    this.parseDetails(detailCell);

    this.row2 = row2;
    this.hoursElapsed = farmMgr.ui.getHoursElapsed(row2.innerHTML);

    this.row3 = row3;
    this.links = {
        "a": $("a.farm_icon_a", row3),
        "b": $("a.farm_icon_b", row3),
        "c": $("a.farm_icon_c", row3)
    };
    this.startingStatus = {
        "a": this.isEnabled("a"),
        "b": this.isEnabled("b"),
        "c": this.isEnabled("c")
    };
    $(this.row1).addClass("farmMgrAdded");
    $(this.row2).addClass("farmMgrAdded");
    $(this.row3).addClass("farmMgrAdded");
    this.visible = true;
    return this;
}

MobileFarm.prototype = new Farm();

DesktopFarm.prototype.getReportID = function (farmRow) {
    return farmMgr.ui.extractReportID($("td", farmRow)[3].innerHTML);
};

MobileFarm.prototype.getReportID = function (row) {
    return farmMgr.ui.extractReportID($("a", row)[1].href);
};

MobileFarm.prototype.parseDetails = function (element) {
    var resInfo,
        idx,
        type,
        info,
        parts,
        wallStr;
    resInfo = {};
    this.resources = {};
    for (idx in farmMgr.resourceTypes) {
        type = farmMgr.resourceTypes[idx];
        info = farmMgr.ui.retrieveNextSpannedTextResource(element, farmMgr.ui.resourceIcons[type]);
        this.resources[type] = info.amount;
    }
    this.wasSpied = info.available; //theoretically if one was available, every other was available too and vice versa

    //hackity hacks:
    parts = $(element).text().match(/[\S]+/g); //nonspace

    if (farmMgr.ui.selectImg(element, farmMgr.ui.wall_icon).length > 0) {
        wallStr = parts[parts.length-2];
        this.wall = parseInt(wallStr, 10);
        if (isNaN(this.wall)) {
            this.wall = 0;
        } //todo add warning
    }

    if (farmMgr.ui.selectImg(element, farmMgr.ui.distance_icon).length > 0) {
        var distanceStr = parts[parts.length - 1];
        this.distance = parseFloat(distanceStr);
    }
};

Farm.prototype.getKey = function () {
    return this.reportID;
};
//refactor
Farm.prototype.hide = function () {
    this.visible = false;
};

DesktopFarm.prototype.hide = function () {
    if (!farmMgr.dbg.keep_visible) {
        $(this.row).hide();
    }
    this.appendDiagLog("hidden");
    Farm.prototype.hide.call(this);
};

MobileFarm.prototype.hide = function () {
    if (!farmMgr.dbg.keep_visible) {
        $(this.row1).hide();
        $(this.row2).hide();
        $(this.row3).hide();
    }
    Farm.prototype.hide.call(this);
};

Farm.prototype.show = function () {
    this.visible = true;
};

DesktopFarm.prototype.show = function () {
    $(this.row).show();
    Farm.prototype.show.call(this);
};

MobileFarm.prototype.show = function () {
    $(this.row1).show();
    $(this.row2).show();
    $(this.row3).show();
    Farm.prototype.show.call(this);
};

Farm.prototype.click = function (nowWhat) {
    if (this.visible) {
        if (this.links[nowWhat].length !== 0) {
            this.links[nowWhat].click();
        } else {
            this.hide();
        }
    }
};

Farm.prototype.handleExternalClick = function (nowWhat) {
    if (this.isEnabled(nowWhat)) {
        this.clickedDate = getCurrentServerDateTime();
        farmMgr.pendingList.push(this);
    }
    this.hide();
};

Farm.prototype.isEnabled = function (nowWhat) {
    if (this.links[nowWhat].length > 0) {
        return !($(this.links[nowWhat]).hasClass("farm_icon_disabled"));
    } else {
        return false;
    }
};

Farm.prototype.isStillThere = function () {
    return $(".farm_village_" + this.targetVillageID).length > 0;
};

Farm.prototype.isFullyDisabled = function () {
    return !(this.isEnabled("a") || this.isEnabled("b") || this.isEnabled("c"));
};

Farm.prototype.getSumResources = function () {
    return this.resources.wood + this.resources.clay + this.resources.iron;
};

Farm.prototype.deleteReports = function () {
    this.deleteReportsLink.click();
};

Farm.prototype.toString = function () {
    var str = "";
    str += this.coord + " ";
    str += "wood: " + this.resources["wood"] + "; ";
    str += "clay: " + this.resources["clay"] + "; ";
    str += "iron: " + this.resources["iron"] + "; ";
    return str;
};

Farm.prototype.addDiagnostics = function () {
};

DesktopFarm.prototype.addDiagnostics = function () {
    var cell = doc.createElement("td");
    this.diagCell = cell;
    this.row.appendChild(cell);
};

Farm.prototype.appendDiagLog = function () {
    if (diagnostics) {
    }
};

DesktopFarm.prototype.appendDiagLog = function (log) {
    if (diagnostics) {
        var currentText = $(this.diagCell).text();
        $(this.diagCell).text(currentText + log + "; " );
    }
};

function advancedFarmScript() {
    farmMgr.advancedFarm();
}

farmMgr.advancedFarm();
void(0);