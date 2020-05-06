/*
 *  @author: kockalovag (kockalovag@gmail.com)
 *  [Script] - searches for coordinates (village anchors) in the page and provides saved checkboxes
 */

//TW
var doc = document;
var myGlobal = this;
var currentVersion = "1.0";

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (obj, fromIndex) {
        "use strict";
        return jQuery.inArray(obj, this, fromIndex);
    };
}

function supportsHtml5Storage() {
    try {
        return "localStorage" in window && window["localStorage"] != null;
    } catch (e) {
        return false;
    }
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

function getVillageIdFromStr(str) {
    var villageMatched = str.match(/\W+id\=\d+/)[0];
    var idSplit = villageMatched.split("=");
    var id = parseInt(idSplit[1]);
    return id;
}

function createCheckbox(settings) {
    result = "";
    result += '<input type="checkbox" name="' + settings.name + '"';
    if (settings.isChecked) {
        result += ' checked';
    }
    result += ' onclick="' + settings.onclickScript + '">';
    return result;
}

var SavedValueIndicator = "xtr_chckbx_" + game_data.world;

var checkboxMgr = {
    isSetup : false,
    
    countSavedValues : function() {
        var cnt = 0;
        if (checkboxMgr.canUseStorage) {
            for(var i=localStorage.length-1; i >= 0; --i) {
                var key = localStorage.key(i);
                if (key.startsWith(SavedValueIndicator)) {
                    ++cnt;
                }
            }
        }
        return cnt;
    },
    deleteSavedValues : function() {
        if (checkboxMgr.canUseStorage) {
            for(var i=localStorage.length-1; i >= 0; --i) {
                var key = localStorage.key(i);
                if (key.startsWith(SavedValueIndicator)) {
                    localStorage.removeItem(key);
                }
            }
            checkboxMgr.updateSavedCountLabel();
        }
    },
    provideSavedValue : function(checkboxName) {
        if (!checkboxMgr.canUseStorage) {
            return false;
        } else {
            value = localStorage.getItem(checkboxName) == 1;
            //we don't create the entry if not found - for sake of low footprint
            return value;
        }
    },
    saveValue : function(checkboxName, value) {
        if (!checkboxMgr.canUseStorage) {
            return;
        } else if (value) {
            localStorage.setItem(checkboxName, 1);
        } else {
            localStorage.removeItem(checkboxName); //for sake of low footprint
        }
        checkboxMgr.updateSavedCountLabel();
    },
    toggleVillage : function(checkboxName) {
        if (checkboxName in checkboxMgr.checkboxMap) {
            var checkboxCollection = checkboxMgr.checkboxMap[checkboxName];
            checkboxCollection.isChecked = !checkboxCollection.isChecked;
            checkboxMgr.saveValue(checkboxName, checkboxCollection.isChecked);
            for (var idx = 0; idx < checkboxCollection.checkboxes.length; ++idx) {
                checkboxCollection.checkboxes[idx].prop("checked", checkboxCollection.isChecked);
            }
        }
    },
    createCheckbox : function(checkboxName, beforeElement) {
        if (!(checkboxName in checkboxMgr.checkboxMap)) {
            checkboxMgr.checkboxMap[checkboxName] = {
                isChecked : checkboxMgr.provideSavedValue(checkboxName),
                checkboxes : []
            };
        }
        var checkboxCollection = checkboxMgr.checkboxMap[checkboxName];
        var checkboxHTML = createCheckbox({
            name : checkboxName,
            onclickScript : "checkboxMgr.toggleVillage('" + checkboxName + "')",
            isChecked : checkboxCollection.isChecked
        });
        var insertedCheckbox = $(checkboxHTML);
        insertedCheckbox.prependTo(beforeElement);
        checkboxCollection.checkboxes.push(insertedCheckbox);
    },
    setupLogic : function() {
        var anchors = $(".village_anchor");
        checkboxMgr.anchors = anchors;
        checkboxMgr.checkboxMap = {};
        for (var idx = 0; idx < anchors.length; ++idx) {
            var actAnchor = anchors[idx];
            //var actCoord = getCoordFromStr(actAnchor.innerHTML);
            var actVillageId = getVillageIdFromStr(actAnchor.innerHTML);
            //var actName = SavedValueIndicator + "_" + actCoord.x + "_" + actCoord.y;
            var actName = SavedValueIndicator + "_" + actVillageId;
            checkboxMgr.createCheckbox(actName, actAnchor);
        }
    },
    updateSavedCountLabel : function() {
        var savedCount = checkboxMgr.countSavedValues();
        $("#extra_checkbox_saved_count").text("A világon " + savedCount + " falut pipáltál ki.");
    },
    setupUi : function() {
        var info = "";        
        info += "<input type='button' id='clear_saved_checkboxes' value='A világon mentett pipák törlése' onclick='checkboxMgr.deleteSavedValues()'>";
        info += savedLabel = '<label id="extra_checkbox_saved_count">Adat</label>'
        $("#content_value").prepend(info + "<br>");
        checkboxMgr.updateSavedCountLabel();
    },
    setup : function() {
        if (checkboxMgr.isSetup) {
            return;
        }
        checkboxMgr.isSetup = true;
        
        checkboxMgr.canUseStorage = supportsHtml5Storage();
        
        checkboxMgr.setupUi();
        
        var infoMessage = "<a target='_blank' href='https://forum.klanhaboru.hu/showthread.php?4077-Checkboxol%C3%B3-pipascript'>[Checkboxoló]</a>";
        infoMessage += " " + checkbox_script_version;
        $("#content_value").prepend(infoMessage + "<br>");
        
        checkboxMgr.setupLogic();
        
        var numParsed = checkboxMgr.anchors.length;
        var successMsg = "<b>OK</b>(" + numParsed + ")    ";
        if (!checkboxMgr.canUseStorage) {
            successMsg += "<br>VIGYÁZAT: az adatok nem menthetők ezzel a böngészőverzióval!";
        }
        $("#content_value").prepend(successMsg);
    }
};

function showCheckboxes() {
    checkboxMgr.setup();
}

showCheckboxes();

void(0);