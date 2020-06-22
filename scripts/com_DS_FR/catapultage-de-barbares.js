/*
	Created by	: Ichiro
	Contact		: 
	
	Adapted by 	: Assashina
	TW version	: v8.45.1
	Skype 		: Youro-Aks
	Mail 		: Aks@fireflies.fr
*/
// ----------------------- Configuration utilisateur
/*
var numScoot = 4; // seulement envoyés si un batiment passe au niveau zero
var unitUsed = ["axe", "light", "heavy", "sword", "spear"];  // liste de priorité des troupes d'accompagnement
// "wall","smith","barracks","snob","stable","garage","market","snob","place","statue","farm", "main"
var buildingIds = ["wall", "smith", "barracks", "snob", "stable", "garage", "market", "farm"];  // liste de priorité des batiments a detruire

var extraCata = true; // si true, envoie des cata pour le niveau de batiment+1 (par prudence, si il s'est développé depuis le scoot)

// ferme 15 necessaire après catapultage du reste, 22 sinon
var minLevels = {'farm': 22, 'main': 20};
 */
/*jslint browser: true */
/*global $, game_data, insertUnit, selectTarget, UI */
// TODO: rams
// TODO: localstorage cleanup even if not done catapulting
// DONE: detect if not enough units
// DONE: send axes or other to protect
// DONE: send spies for last attack (or all?)
// TODO: prendre en compte la croyance et envoyer le double de troupes si le village n'est pas croyant
//             worldConfig.game.church;
// TODO: archers montés
// TODO: cata ferme 326+447+949 + 8 + 475 => ferme niveau 15
// TODO: use insertUnit(input, count, all_units) method
var isAlreadyStared = false;

(function() {
    "use strict";

    /***********************************************************************************************************
     *
     *   TWLib
     *
     **********************************************************************************************************/

    function xmlConfigToJson(xml) {

        // Create the return object
        var obj = {},
            j,
            i;

        function upack(o) {
            if (typeof o === "object") {
                var k;
                var c = 0;
                for (k in o) {
                    if (o.hasOwnProperty(k)) {
                        c++;
                    }
                }
                if (c === 1 && o.hasOwnProperty('#text')) {
                    return o['#text'];
                }
            }
            return o;
        }

        if (xml.nodeType === 1) { // element
            // do attributes
            if (xml.attributes.length > 0) {
                obj["@attributes"] = {};
                for (j = 0; j < xml.attributes.length; j++) {
                    var attribute = xml.attributes.item(j);
                    obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                }
            }
        } else if (xml.nodeType === 3) { // text
            obj = xml.nodeValue.trim();
            /*var n = parseFloat(obj);
            if (!isNaN(n)) {
            obj = n;
            }*/
        }

        // do children
        if (xml.hasChildNodes()) {
            for (i = 0; i < xml.childNodes.length; i++) {
                var item = xml.childNodes.item(i);
                var nodeName = item.nodeName;
                var o;
                if (obj[nodeName] === undefined) {
                    o = xmlConfigToJson(item);
                    if (o !== '') {
                        obj[nodeName] = o;
                    }
                } else {
                    if (obj[nodeName].push === undefined) {
                        var old = obj[nodeName];
                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    o = xmlConfigToJson(item);
                    if (o !== '') {
                        obj[nodeName].push(o);
                    }
                }
            }
        }
        return upack(obj);
    }

    function callTWInterface(funcName) {
        "use strict";
        var result;
        var loc = window.location;
        $.ajax({
            type: 'GET',
            async: false,
            url: loc.protocol + "//" + loc.host + '/interface.php',
            data: {
                func: funcName
            },
            dataType: 'xml',
            success: function(xml) {
                result = xml;
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (window.console && window.console.log) {
                    window.console.log(textStatus, errorThrown);
                }
                UI.ErrorMessage('An error occurred while processing XML file.' + "\n" + textStatus);
            }
        });
        return result;
    }

    function getConfig(name, funcName) {
        getConfig.c = getConfig.c || {}; // cache
        if (localStorage.getItem(name) === null) {
            var xml = callTWInterface(funcName);
            var json = xmlConfigToJson(xml).config;
            localStorage.setItem(name, JSON.stringify(json));
            return getConfig.c[name] = json;
        }
        if (getConfig.c[name]) {
            return getConfig.c[name];
        }
        return getConfig.c[name] = JSON.parse(localStorage.getItem(name));
    }


    var TWScript = {};

    TWScript.worldConfig = function() {
        return getConfig('worldConfig', 'get_config');
    }
    TWScript.buildingConfig = function() {
        return getConfig('buildingConfig', 'get_building_info');
    }
    TWScript.unitConfig = function() {
        return getConfig('unitConfig', 'get_unit_info');
    }

    /***********************************************************************************************************
     *
     *   TWLib-UI
     *
     **********************************************************************************************************/


    TWScript = typeof TWScript !== 'undefined' ? TWScript : {};

    TWScript.UI = TWScript.UI || {};
    /**
     * Bigger ConfirmationBox - can contain a menu
     */
    TWScript.UI.ConfirmationBox = function(content, buttons, id, disable_cancel) {
        id = id || 'tw-script-config';
        var msg = typeof content == 'string' ? content : '';
        UI.ConfirmationBox(msg, buttons, id);
        var element = $("#" + id);
        if (typeof content != 'string') {
            content.insertAfter(element.find("#confirmation-msg"));
        }
        var width = $("#contentContainer").width() || 800;
        element.css('width', width + 'px');
        element.css('marginLeft', Math.floor(-width / 2 - 5) + "px");
        var height = element.height();
        var maxHeigth = $(window).height() - 200;
        if (height > maxHeigth) {
            element.css('height', maxHeigth);
            height = maxHeigth;
        }
        element.css('marginTop', Math.min(Math.floor(-height / 2 + 100), 0) + "px");
        element.css('overflow', 'auto');
        return element;
    };

    TWScript.UI.rule = function(selector, rule) {
        this.__ruleCache = this.__ruleCache || {};
        var key = selector + '##' + rule;
        if (this.__ruleCache[key]) return;
        this.__ruleCache[key] = true;
        var stylesheet = document.styleSheets[0];
        if (stylesheet.insertRule) {
            stylesheet.insertRule(selector + rule, stylesheet.cssRules.length);
        } else if (stylesheet.addRule) {
            stylesheet.addRule(selector, rule, -1);
        }
    }

    TWScript.UI.SortWidget = function(config) {
        // TODO: permit removal of an element
        config = config || {};

        var SORT_IMAGE = 'http://dsfr.innogamescdn.com/8.32.1/24847/graphic/sorthandle.png';
        var DELETE_IMAGE = 'http://dsfr.innogamescdn.com/8.33/24884/graphic/delete.png'; // delete_small.png
        //["spear", "sword", "axe", "archer", "spy", "light", "marcher", "heavy", "ram", "catapult"]

        var items;
        var axis = config.axis || 'x';
        var type = config.type || 'unit';
        var initialOrder = config.initialOrder;
        switch (type) {
            case 'unit':
                /*var items=[];
$.each(UnitPopup.unit_data, function(a,b) {
	console.log(b);
	items.push({id:a, name:b.name, img:s("http://dsfr.innogamescdn.com/8.32.1/24847/graphic/unit/recruit/%1.png",a)});
}); JSON.stringify( items )*/
                items = [{
                    "id": "spear",
                    "name": "Lancier",
                    "img": "http://dsfr.innogamescdn.com/8.32.1/24847/graphic/unit/recruit/spear.png"
                }, {
                    "id": "sword",
                    "name": "Porteur d'épée",
                    "img": "http://dsfr.innogamescdn.com/8.32.1/24847/graphic/unit/recruit/sword.png"
                }, {
                    "id": "axe",
                    "name": "Guerrier à la hache",
                    "img": "http://dsfr.innogamescdn.com/8.32.1/24847/graphic/unit/recruit/axe.png"
                }, {
                    "id": "archer",
                    "name": "Archer",
                    "img": "http://dsfr.innogamescdn.com/8.32.1/24847/graphic/unit/recruit/archer.png"
                }, {
                    "id": "spy",
                    "name": "Éclaireur",
                    "img": "http://dsfr.innogamescdn.com/8.32.1/24847/graphic/unit/recruit/spy.png"
                }, {
                    "id": "light",
                    "name": "Cavalerie légère",
                    "img": "http://dsfr.innogamescdn.com/8.32.1/24847/graphic/unit/recruit/light.png"
                }, {
                    "id": "marcher",
                    "name": "Archer monté",
                    "img": "http://dsfr.innogamescdn.com/8.32.1/24847/graphic/unit/recruit/marcher.png"
                }, {
                    "id": "heavy",
                    "name": "Cavalerie lourde",
                    "img": "http://dsfr.innogamescdn.com/8.32.1/24847/graphic/unit/recruit/heavy.png"
                }, {
                    "id": "ram",
                    "name": "Bélier",
                    "img": "http://dsfr.innogamescdn.com/8.32.1/24847/graphic/unit/recruit/ram.png"
                }, {
                    "id": "catapult",
                    "name": "Catapulte",
                    "img": "http://dsfr.innogamescdn.com/8.32.1/24847/graphic/unit/recruit/catapult.png"
                }];
                break;
            case 'building':
                /*var list=[]
                $.each(BuildingMain.buildings, function(id, dat) {
                	var img = s("http://dsfr.innogamescdn.com/8.33/24884/graphic/buildings/mid/%11.png",id);
                	img = "/graphic/"+dat.image;
                	list.push({id:id,name:dat.name,img:img});
                });JSON.stringify(list);*/
                items = [{
                    "id": "main",
                    "name": "Quartier général",
                    "img": "http://dsfr.innogamescdn.com/8.33/24884/graphic/buildings/mid/main1.png"
                }, {
                    "id": "barracks",
                    "name": "Caserne",
                    "img": "http://dsfr.innogamescdn.com/8.33/24884/graphic/buildings/mid/barracks1.png"
                }, {
                    "id": "stable",
                    "name": "Écurie",
                    "img": "http://dsfr.innogamescdn.com/8.33/24884/graphic/buildings/mid/stable1.png"
                }, {
                    "id": "garage",
                    "name": "Atelier",
                    "img": "http://dsfr.innogamescdn.com/8.33/24884/graphic/buildings/mid/garage1.png"
                }, {
                    "id": "church",
                    "name": "Église",
                    "img": "http://dsfr.innogamescdn.com/8.33/24884/graphic/buildings/mid/church1.png"
                }, {
                    "id": "snob",
                    "name": "Académie",
                    "img": "http://dsfr.innogamescdn.com/8.33/24884/graphic/buildings/mid/snob1.png"
                }, {
                    "id": "smith",
                    "name": "Forge",
                    "img": "http://dsfr.innogamescdn.com/8.33/24884/graphic/buildings/mid/smith1.png"
                }, {
                    "id": "place",
                    "name": "Point de ralliement",
                    "img": "http://dsfr.innogamescdn.com/8.33/24884/graphic/buildings/mid/place1.png"
                }, {
                    "id": "statue",
                    "name": "Statue",
                    "img": "http://dsfr.innogamescdn.com/8.33/24884/graphic/buildings/mid/statue1.png"
                }, {
                    "id": "market",
                    "name": "Marché",
                    "img": "http://dsfr.innogamescdn.com/8.33/24884/graphic/buildings/mid/market1.png"
                }, {
                    "id": "wood",
                    "name": "Camp de bois",
                    "img": "http://dsfr.innogamescdn.com/8.33/24884/graphic/buildings/mid/wood1.png"
                }, {
                    "id": "stone",
                    "name": "Carrière d'argile",
                    "img": "http://dsfr.innogamescdn.com/8.33/24884/graphic/buildings/mid/stone1.png"
                }, {
                    "id": "iron",
                    "name": "Mine de fer",
                    "img": "http://dsfr.innogamescdn.com/8.33/24884/graphic/buildings/mid/iron1.png"
                }, {
                    "id": "farm",
                    "name": "Ferme",
                    "img": "http://dsfr.innogamescdn.com/8.33/24884/graphic/buildings/mid/farm1.png"
                }, {
                    "id": "storage",
                    "name": "Entrepôt",
                    "img": "http://dsfr.innogamescdn.com/8.33/24884/graphic/buildings/mid/storage1.png"
                }, {
                    "id": "hide",
                    "name": "Cachette",
                    "img": "http://dsfr.innogamescdn.com/8.33/24884/graphic/buildings/mid/hide1.png"
                }, {
                    "id": "wall",
                    "name": "Muraille",
                    "img": "http://dsfr.innogamescdn.com/8.33/24884/graphic/buildings/mid/wall1.png"
                }];
                items = [{
                    "id": "main",
                    "name": "Quartier général",
                    "img": "/graphic/buildings/main.png"
                }, {
                    "id": "barracks",
                    "name": "Caserne",
                    "img": "/graphic/buildings/barracks.png"
                }, {
                    "id": "stable",
                    "name": "Écurie",
                    "img": "/graphic/buildings/stable.png"
                }, {
                    "id": "garage",
                    "name": "Atelier",
                    "img": "/graphic/buildings/garage.png"
                }, {
                    "id": "church",
                    "name": "Église",
                    "img": "/graphic/buildings/church.png"
                }, {
                    "id": "snob",
                    "name": "Académie",
                    "img": "/graphic/buildings/snob.png"
                }, {
                    "id": "smith",
                    "name": "Forge",
                    "img": "/graphic/buildings/smith.png"
                }, {
                    "id": "place",
                    "name": "Point de ralliement",
                    "img": "/graphic/buildings/place.png"
                }, {
                    "id": "statue",
                    "name": "Statue",
                    "img": "/graphic/buildings/statue.png"
                }, {
                    "id": "market",
                    "name": "Marché",
                    "img": "/graphic/buildings/market.png"
                }, {
                    "id": "wood",
                    "name": "Camp de bois",
                    "img": "/graphic/buildings/wood.png"
                }, {
                    "id": "stone",
                    "name": "Carrière d'argile",
                    "img": "/graphic/buildings/stone.png"
                }, {
                    "id": "iron",
                    "name": "Mine de fer",
                    "img": "/graphic/buildings/iron.png"
                }, {
                    "id": "farm",
                    "name": "Ferme",
                    "img": "/graphic/buildings/farm.png"
                }, {
                    "id": "storage",
                    "name": "Entrepôt",
                    "img": "/graphic/buildings/storage.png"
                }, {
                    "id": "hide",
                    "name": "Cachette",
                    "img": "/graphic/buildings/hide.png"
                }, {
                    "id": "wall",
                    "name": "Muraille",
                    "img": "/graphic/buildings/wall.png"
                }];
                break;
        }

        if (initialOrder) {
            items = items.sort(function(a, b) {
                var ax = initialOrder.indexOf(a.id);
                var bx = initialOrder.indexOf(b.id);
                ax = ax == -1 ? 1000 : ax;
                bx = bx == -1 ? 1000 : bx;
                return ax - bx;
            });
            var excluded = items.filter(function(e) {
                return initialOrder.indexOf(e.id) == -1;
            });
        }

        TWScript.UI.rule('.sortable-axis-x', "{ display: inline-table; }");
        TWScript.UI.rule('.tws-disabled > *', "{ opacity: 0.5; }");
        TWScript.UI.rule('.tws-disabled', '{background:#ccc;border:1px dotted #aaa;}');

        var eclass = 'ui-state-default' + (axis == 'x' ? ' sortable-axis-x' : '');

        var list = $("<div>", {
            class: eclass
        });
        items.forEach(function(item) {
            var li = $("<div>", {
                class: eclass,
                name: item.id,
                html: '<div style="float: left;"><img src="' + SORT_IMAGE + '" style="display: block;"/><img src="' + DELETE_IMAGE + '" class="tws-delete" style="display: block;"/></div>' + '<img title="' + item.name + '" src="' + item.img + '"/>',
            });
            list.append(li);
        });

        var disabledList = $('<div>', {
            class: eclass + ' tws-disabled'
        });

        function onDelete() {
            var clicked = $(this),
                item = clicked.closest('.ui-state-default');
            item.detach();
            disabledList.append(item);
            $(list).sortable('refresh').trigger('sortreceive');
            disabledList.trigger('sortreceive');
        }

        $(list).on('click', '.tws-delete', onDelete);
        $(disabledList).on('click', '.tws-delete', function enable() {
            var clicked = $(this),
                item = clicked.closest('.ui-state-default');
            item.detach();
            list.append(item);
            $(list).sortable('refresh').trigger('sortreceive');
            disabledList.trigger('sortreceive');
        });

        $(list).sortable({
            connectWith: disabledList,
        });
        $(disabledList).sortable({
            //placeholder: 'tws_drop-placeholder-blocked',
            //forcePlaceholderSize: true,
            connectWith: list,
        });
        $(list, disabledList).disableSelection();
        var lcontainer = $("<div>").append(list, disabledList);
        lcontainer.on('mouseover', function fixHeight() {
            // this has to be called after the element was inserted in dom (otherwise list.height() is 0)
            var h = (lcontainer.height());
            $(lcontainer).css('height', h + "px");
            lcontainer.off('mouseover', fixHeight);
        });

        if (excluded) {
            excluded.forEach(function(item) {
                list.find("div[name='" + item.id + "']").each(onDelete);
            });
        }

        return {
            element: lcontainer,
            list: function() {
                return $(list).find('>div.ui-state-default').map(function() {
                    return $(this).attr('name');
                }).get();
            },

        };
    };


    /***********************************************************************************************************
     *
     *   Script
     *
     **********************************************************************************************************/

    function firstConfig(a1, a2) {
        var i;
        for (i = 0; i < arguments.length; i++) {
            if (arguments[i] !== undefined) return arguments[i];
        }
    }

    // --------  Dev config ------------
    var debug = false;
    var LOCALSTORAGE_NS = 'tw-scripts:cata'; // avoid name conflicts

    // --- defaults
    var persistentConfig = JSON.parse(localStorage.getItem(LOCALSTORAGE_NS + ":config") || "{}");

    var numScoot = firstConfig(persistentConfig.numScoot, window.numScoot, 4);
    var unitUsed = firstConfig(persistentConfig.unitUsed, window.unitUsed, ["axe", "light", "heavy", "sword", "spear"]);
    var minLevels = firstConfig(persistentConfig.minLevels, window.minLevels, {
        'farm': 22,
        'main': 20
    });
    var buildingIds = firstConfig(persistentConfig.buildingIds, window.buildingIds, ["wall", "smith", "barracks", "snob", "stable", "garage", "market", "farm"]);
    var extraCata = firstConfig(persistentConfig.extraCata, window.extraCata, false);


    // -------------------------

    // sessionStorage avoid collecting garbage in browser memory, better than localStorage
    var storage = sessionStorage;

    var UNIT_ATTACK_STRENGTH = {};
    $.each(TWScript.unitConfig(), function(name, conf) {
        UNIT_ATTACK_STRENGTH[name] = parseInt(conf.attack, 10);
    });


    function UserError(message) {
        this.name = 'UserError';
        this.message = message;
        //this.stack = (new Error()).stack;
    }


    function catapultConfigForm() {
        var unitOrder = TWScript.UI.SortWidget({
            initialOrder: unitUsed,
            type: 'unit'
        });
        var buildingOrder = TWScript.UI.SortWidget({
            initialOrder: buildingIds,
            type: 'building'
        });
        var content = $("<div>").append("<p>Troupes d'accompagnement:</p>").append(unitOrder.element).append("<p>Bâtiments à détruire:</p>").append(buildingOrder.element);
        content.append("<br>");
        content.append(s('<label for="numScout">Nombre de scouts</label>: <input type="text" name="numScout" value="%1"/>', +numScoot));
        content.append('<label for="extraCata">Envoyer des catapultes supplémentaires</label>: <input type="checkbox" name="extraCata" ' + (extraCata ? 'checked="true"' : '') + '/>');

        function readForm() {
            persistentConfig.unitUsed = (unitOrder.list());
            persistentConfig.buildingIds = (buildingOrder.list());
            persistentConfig.numScoot = +content.find("[name='numScout']").val();
            persistentConfig.extraCata = content.find("[name='extraCata']").is(':checked');

            localStorage.setItem(LOCALSTORAGE_NS + ":config", JSON.stringify(persistentConfig));

            numScoot = persistentConfig.numScoot;
            unitUsed = persistentConfig.unitUsed;
            //minLevels   = persistentConfig.minLevels  ;
            buildingIds = persistentConfig.buildingIds;
            extraCata = persistentConfig.extraCata;
        }

        var el = TWScript.UI.ConfirmationBox(content, [{
            text: 'Oui',
            callback: readForm,
            confirm: true
        }]);
    }

    //
    // retourne force d'attaque necessaire
    function troopStrengthRequired(wallLevel) {
        // heuristique: 30 haches(Force d'attaque=40) * <niveau mur>
        // +10 haches en bonus
        return 30 * 40 * wallLevel;
    }

    //localStorage.removeItem(LOCALSTORAGE_NS+'_villages_connus_');

    function loadVillagesDone() {
        var bidKey = JSON.stringify(buildingIds);
        if (localStorage.getItem(LOCALSTORAGE_NS + '_typeAttaque_') !== bidKey) {
            localStorage.removeItem(LOCALSTORAGE_NS + '_villages_connus_');
            window.villagesDone = undefined;
            localStorage.setItem(LOCALSTORAGE_NS + '_typeAttaque_', bidKey);
        }
        if (window.villagesDone === null || typeof window.villagesDone !== 'object') {
            window.villagesDone = JSON.parse(localStorage.getItem(LOCALSTORAGE_NS + '_villages_connus_') || "{}");
            //alert(Object.keys(villagesDone).length);
        }
        return window.villagesDone;
    }

    function rememberVillageDone(coord) {
        loadVillagesDone();
        window.villagesDone[coord] = new Date().getTime();
    }

    function isVillageDone(coord) {
        loadVillagesDone();
        return window.villagesDone[coord];
    }

    $(window).bind('beforeunload', function storeVillagesOnUnload() {
        if (window.villagesDone) {
            localStorage.setItem(LOCALSTORAGE_NS + '_villages_connus_', JSON.stringify(window.villagesDone));
        }
    });

    //
    // Loads the value of the hidden input field with id=attack_spy_building_data into a map indexed by building name
    function loadBuildings() {
        var reportStr = $("#attack_spy_building_data").val();
        if (!reportStr) {
            throw new UserError("Le rapport ne contient pas les batiments");
        }
        var report = JSON.parse(reportStr);
        var buildings = {};
        var i;
        for (i = 0; i < report.length; i++) {
            buildings[report[i].id] = report[i];
        }
        return buildings;
    }

    // Number of catapults for a reduction of one level
    function cataForLevel(level) {
        var MAP = {
            '1': 2,
            '2': 2,
            '3': 2,
            '4': 3,
            '5': 3,
            '6': 3,
            '7': 3,
            '8': 4,
            '9': 4,
            '10': 4,
            '11': 4,
            '12': 5,
            '13': 5,
            '14': 6,
            '15': 6,
            '16': 6,
            '17': 7,
            '18': 8,
            '19': 8,
            '20': 9,
            '21': 10,
            '22': 11,
            '23': 11,
            '24': 12,
            '25': 13,
            '26': 15,
            '27': 16,
            '28': 17,
            '29': 19,
            '30': 20,
            '31': 20
        };
        if (MAP[String(level)]) {
            return MAP[level];
        }
        UI.ErrorMessage("Level not found:" + level);
        return 20;
    }

    //
    // Choose a building to destroy and return a map:
    // {'id':<building name>, 'catapult':<amount of catapults>, 'level':<level of building before attack>, 'nextLevel':<expected level after attack>}
    function cataChoose(buildings) {
        var i;
        for (i = 0; i < buildingIds.length; i++) {
            var bId = buildingIds[i];
            if (buildings.hasOwnProperty(bId)) {
                var bInfo = buildings[bId];
                var minLevel = minLevels[bId] || 0;
                if ((!bInfo) || (bInfo.level <= minLevel)) {
                    continue;
                }
                var cata = cataForLevel(parseInt(bInfo.level, 10) + (extraCata ? 1 : 0)); // if extraCata is true, do as if the level was one more.
                return {
                    'id': bId,
                    'catapult': cata,
                    'level': bInfo.level,
                    'nextLevel': bInfo.level - 1
                };
            }
        }
    }

    // Read number of available units
    function numberOfUnits(name) {
        return parseInt(document.getElementById("units_entry_all_"+name).innerHTML.replace(/[^0-9]/g, ''),10);
    }

    // Number of rams to destroy completely a wall of some level
    function numRamForWall(wallLevel) {
        var ramSup = 1;
        return Math.round(2 * (Math.pow(1.09, wallLevel)) * (wallLevel - 1) + Math.pow(1.09, wallLevel) + 0.5 + ramSup);
    }

    // helper function that selects axes,.. as needed and available
    function fillProtectionTroop(strength) {
        var i;
        for (i = 0; i < unitUsed.length && strength > 0; i++) {
            var unitName = unitUsed[i];
            var available = numberOfUnits(unitName);
            var needed = Math.ceil(strength / UNIT_ATTACK_STRENGTH[unitName]);

            var used = Math.min(needed, available);
            strength -= used * UNIT_ATTACK_STRENGTH[unitName];

            $("#unit_input_" + unitName).val(used);
        }
        if (strength > 0) {
            throw new UserError("Pas assez de troupes pour l'accompagnement, il manque " + Math.ceil(strength / UNIT_ATTACK_STRENGTH.axe) + " haches ou equivalent");
        }
    }

    function setAttackName(name) {
        $("#attack_name").val(name);
        $("#default_name").get()[0].innerHTML = name;
    }

    function getReportLinks() {
        var KEY = LOCALSTORAGE_NS + "_reports_" + game_data.village.id;
        var serialized = storage.getItem(KEY);
        if (!serialized) {
            return [];
        }
        return JSON.parse(serialized);
    }

    function openReportLink() {
        var KEY = LOCALSTORAGE_NS + "_reports_" + game_data.village.id;
        var links = getReportLinks();
        if (links.length === 0) {
            storage.removeItem(KEY);
            throw new UserError("Plus aucun rapport à traiter");
        }
        var first = links.shift();
        storage.setItem(KEY, JSON.stringify(links)); // removed first
        window.open(first, "_self");
    }

    // -------- Main Functions ------

    // Function called when in a report window
    function cataOpenPlace() {
        if (window.cataOpenPlaceDone) {
            return;
        }
        window.cataOpenPlaceDone = true;
        // reads target village
        var targetVillage = $("#attack_info_def span.village_anchor").get(0);
        var targetId = targetVillage.getAttribute("data-id");

        var buildings;
        try {
            buildings = loadBuildings();
        } catch (e) {
            if (e instanceof UserError) {
                UI.ConfirmationBox(e.message + '\nVoulez-vous passer au prochain rapport?', [{
                    text: 'Oui',
                    callback: openReportLink,
                    confirm: true
                }]);
                return;
            }
            throw e;
        }

        if (!cataChoose(buildings)) {
            var villageName = $("#attack_info_def span.village_anchor").text();
            var targetVillageCoord = /(\([0-9]+\|[0-9]+\))/.exec(villageName)[1];
            rememberVillageDone(targetVillageCoord);
            openReportLink(); // TODO: ask for confirm
            return;
        }

        // stores buildings in localStorage.
        storage.setItem(LOCALSTORAGE_NS + "_target", JSON.stringify(buildings));

        // open place in same window
        var url = "/game.php?village=" + game_data.village.id + "&target=" + targetId + "&screen=place";
        //window.open(url,"_blank"); // don't work with sessionStorage
        window.open(url, "_self");
    }

    function errorTryNextVillage(message) {
        var nextVillageHref = $("#village_switch_right").prop('href');
        var nextId = /village=([^&]*)/.exec(nextVillageHref);
        nextId = nextId ? nextId[1] : undefined;
        if (!(nextId && game_data.player.farm_manager)) {
            throw new UserError(message);
        }
        var nextVillageFarmUrl = game_data.link_base_pure.replace(game_data.village.id, nextId) + 'am_farm';
        UI.ConfirmationBox(message + '\nVoulez-vous passer au village suivant?', [{
            text: 'Oui',
            callback: function() {
                window.open(nextVillageFarmUrl, '_self');
            },
            confirm: true
        }]);
    }

    // Function called in the place to fill the data or send
    function fillCata() {
        if (debug) {
            console.log("ENTER fillCata()");
        }
        if (window.fillCataDisable) {
            return;
        }

        if ($("#unit_input_catapult").val() === "") {
            // Fill data
            if (document.location.href.indexOf("target=") < 0) {
                // The target is not filled. lookup last_attacked..
                // and click last attacked button to fill field
                $("a.target-last-attacked").click();
            }

            var buildings = JSON.parse(storage.getItem(LOCALSTORAGE_NS + "_target"));
            if (!buildings) {
                try {
                    var villageName = $("span.village-name").text();
                    var targetVillageCoord = /(\([0-9]+\|[0-9]+\))/.exec(villageName)[1];
                    rememberVillageDone(targetVillageCoord);
                } catch (e) {
                    // ignore - non essential function
                }
                if (getReportLinks().length === 0) {
                    UI.ErrorMessage("Il n'y a pas de rapport pour cette cible.<br>Peut-être qu'il vient d'être effacé car tout a été détruit?");
                } else {
                    UI.ConfirmationBox('Voulez-vous passer au prochain rapport?', [{
                        text: 'Oui',
                        callback: openReportLink,
                        confirm: true
                    }]);
                    window.fillCataDisable = true;
                }
                return;
            }
            var cataInfo = cataChoose(buildings);
            if (!cataInfo) {
                UI.SuccessMessage("Tout a été détruit.");
                storage.removeItem(LOCALSTORAGE_NS + "_target");
                return;
            }

            var wallLevel = buildings.wall ? buildings.wall.level : 0;
            var troopStrength = troopStrengthRequired(wallLevel);
            try {
                fillProtectionTroop(troopStrength);
            } catch (e) {
                if (e instanceof UserError) {
                    errorTryNextVillage(e.message);
                    return;
                }
                throw e;
            }

            if (cataInfo.id === 'wall') {
                // special case: use rams if available
                var ramNeeded = numRamForWall(cataInfo.level);
                if (numberOfUnits("ram") >= ramNeeded) {
                    UI.InfoMessage("Destruction du mur avec des béliers");
                    $("#unit_input_ram").val(ramNeeded);
                    //$("#unit_input_catapult").val("1");  needed for workaround (sendCata() assumes we have catapults)
                    return;
                }
            }

            if (debug) {
                var msg = JSON.stringify(cataInfo) + "<br>\n" + JSON.stringify(buildings);
                UI.InfoMessage(msg, 8000);
            }
            var availableCatapults = numberOfUnits("catapult");
            if (availableCatapults < cataInfo.catapult) {
                errorTryNextVillage("Pas assez de catapultes");
                window.fillCataDisable = true;
                return;
            }
            if (cataInfo.nextLevel === 0) {
                UI.SuccessMessage("Dernier niveau du bâtiment " + buildings[cataInfo.id].name);
                // the building will be destroyed - send some spies if we have enough
                if (numberOfUnits('spy') >= numScoot) {
                    $("#unit_input_spy").val(numScoot);
                }
            } else {
                UI.InfoMessage("Réduction du bâtiment " + buildings[cataInfo.id].name + " au niveau " + cataInfo.nextLevel);
            }
            if (availableCatapults < cataInfo.catapult * 2) {
                // les catapultes ne seront peut-être pas suffisantes pour une autre attaque -> on met des scoots
                if (numberOfUnits('spy') >= numScoot) {
                    $("#unit_input_spy").val(numScoot);
                }
            }
            $("#unit_input_catapult").val(cataInfo.catapult);
        } else {
            /*  Assashina Have to be removed to conform to the new rules
      $('#target_attack').click();
      $('#target_attack').prop('disabled', true);
	  */
        }
    }

    // Function called in the troop confirm page.
    //  - define the correct building for the catapults
    //  - if defined correctly, click on troop_confirm_go link
    function sendCata() {
        /* Assashina : I don't get the point here, seems quite useless by now */
        if (window.catapultSent) {
            return;
        }

        var targetVillage = $("span.village_anchor").get(0);
        var buildings = JSON.parse(storage.getItem(LOCALSTORAGE_NS + "_target"));
        var cataInfo = cataChoose(buildings);

        var canSend = $("#attack_name").val() !== ""; //$("select[name='building']").val()==cataInfo.id;
        var isRamAttack = $("#command-confirm-form input[name='ram']").val() > 0;
        if (canSend) {
            // everything ok, send
            buildings[cataInfo.id].level = cataInfo.nextLevel;
            if (isRamAttack) {
                // rams do all or nothing. If we have some, the wall is destroyed
                buildings.wall.level = 0;
            }
            storage.setItem(LOCALSTORAGE_NS + "_target", JSON.stringify(buildings)); // actualise batiments  
            /*  Assashina : Have to be removed to conform to the new rules
      $("#troop_confirm_go").click();
      $('#troop_confirm_go').prop('disabled', true);
	   */
            window.catapultSent = true;

        } else {
            var targetVillageCoord = /(\([0-9]+\|[0-9]+\))/.exec(targetVillage.textContent)[1];
            // define building for catapults
            if (debug) {
                UI.InfoMessage($("select[name='building']").val() + "!=" + cataInfo.id);
            }
            $("select[name='building']").val(cataInfo.id);
            if (isRamAttack) {
                setAttackName("Destruction du mur sur " + targetVillageCoord);
            } else {
                setAttackName("Cata " + buildings[cataInfo.id].name + "->" + cataInfo.nextLevel + " sur " + targetVillageCoord);
            }
        }
        if (!isAlreadyStared) {
            buildings[cataInfo.id].level = cataInfo.nextLevel;
            if (isRamAttack) {
                // rams do all or nothing. If we have some, the wall is destroyed
                buildings.wall.level = 0;
            }
            storage.setItem(LOCALSTORAGE_NS + "_target", JSON.stringify(buildings));
            isAlreadyStared = true;
        }
    }

    function farmSaveReportLinks() {
        var KEY = LOCALSTORAGE_NS + "_reports_" + game_data.village.id;
        if (!window.reportsSaved) {
            var links = $("a[href*='report'][href*='view']")
                .filter(function() {
                    try {
                        var targetVillageCoord = /(\([0-9]+\|[0-9]+\))/.exec($(this).text())[1];
                        var done = isVillageDone(targetVillageCoord);
                        if (done && debug) {
                            UI.InfoMessage("Done: " + targetVillageCoord);
                        }
                        return !done;
                    } catch (e) {
                        return false;
                    }
                })
                .map(function() {
                    return $(this).prop('href');
                }).get();
            storage.setItem(KEY, JSON.stringify(links));
            UI.InfoMessage("Liste de rapports enregistrés. Total de " + links.length + " rapports.");
            window.reportsSaved = true;
        } else if (!window.reportOpened) {
            openReportLink();
            window.reportOpened = true;
        }
    }

    // Main:
    //  dispatches to cataOpenPlace(), fillCata() or sendCata() depending on page
    //  shows error-messages if wrong page
    //  catches UserErrors and show message to user
    function run() {
        try {
            if (game_data.screen === "report" && location.href.indexOf('view') > 0) {
                cataOpenPlace();
            } else if (game_data.screen === 'place') {
                if (location.href.indexOf('try=confirm') > 0) {
                    sendCata();
                } else {
                    fillCata();
                }
            } else if (game_data.screen === 'am_farm' || game_data.screen === 'report') {
                farmSaveReportLinks();
            } else if (game_data.screen === 'settings') {
                catapultConfigForm();
            } else {
                UI.ErrorMessage('Lancez le script depuis un rapport espionnage ou depuis l\'assistant de pillage.');
            }
        } catch (e) {
            if (e instanceof UserError) {
                UI.ErrorMessage(e.message);
            } else {
                // likely a bug
                UI.ErrorMessage("Une erreur s'est produite " + e);
                var el = $('<div/>', {
                    class: 'info_box',
                    id: 'cata_barb_error',
                }).insertAfter("#script_warning");
                el.append($("<pre>", {
                    text: "Une erreur s'est produite:\n" + e + "\n" + String(e.stack)
                }));
            }
        }
    }

    run();
}());