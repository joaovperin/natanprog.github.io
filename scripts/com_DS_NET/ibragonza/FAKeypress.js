var version = "1.102<br/>";
var updateversion = 1.6;
var CdnRoot = "https://dsen.innogamescdn.com/8.48.1/29690/graphic/";
var keycodes = {"a": 65, "b": 66, "c": 67, "skip": 74, "right": 39, "left": 37, "master": 90};
var keyedits = {"a": false, "b": false, "c": false, "skip": false};
var key;
var keydown = false;
var cansend = true;
var sitter = "";
if (window.game_data.player.sitter != "0") {
    sitter = "t=" + window.game_data.player.id + "&";
}
var link = ["https://" + window.location.host + "/game.php?" + sitter + "village=", "&screen=am_farm"];
var pos = {
    s: {
        order: 0,
        dir: 1,
        loadp: 2,
        fp: 3,
        lp: 4,
        remaxes: 5,
        remyellow: 6,
        remred: 7,
        remblue: 8,
        remgreen: 9,
        remredy: 10,
        remredb: 11,
        remattsince: 12
    }
};
var faTable, userkeys, userset, totalrows, countedrows = 0;
var pagesLoad = 0;
pagesLoaded = false, pageLoading = false, start = false;
function run() {
    checkPage();
    if (checkCookie()) {
        if ($.cookie(cookieName).indexOf('{') == -1) {
            alert("Attempting to adapt existing settings to work with newer version. If there are problems with the settings transition, please try changing your cookie name.\n\n-crim");
            dodokeys = $.cookie(cookieName).split(',');
            resetCookie();
            userkeys[0] = dodokeys[0];
            userkeys[1] = dodokeys[1];
            userkeys[2] = dodokeys[2];
            keycodes.a = parseInt(userkeys[0]);
            keycodes.b = parseInt(userkeys[1]);
            keycodes.c = parseInt(userkeys[2]);
            setCookie(cookieName, 180);
        } else if (parseFloat($.cookie(cookieName).split("{")[1].split("}")[0]) <= updateversion) {
            UI.ErrorMessage("Due to an update, the user data must be reset to default settings. Please redefine your settings and keys, sorry for any inconvenience<br><br>-crim", 2000);
            resetCookie();
        } else {
            userkeys = $.cookie(cookieName).split("[")[1].split("]")[0].split(",");
            userset = $.cookie(cookieName).split("[")[2].split("]")[0].split(",");
            keycodes.a = parseInt(userkeys[0]);
            keycodes.b = parseInt(userkeys[1]);
            keycodes.c = parseInt(userkeys[2]);
            keycodes.skip = parseInt(userkeys[3]);
        }
    } else {
        UI.SuccessMessage("Welcome to FA KeyPress by Crimsoni", 1000);
        resetCookie();
    }
    faTable = $('#plunder_list');
    if (userset[pos.s.loadp] === "1") {
        removeFirstPage();
        showPages();
    } else {
        initStuff();
    }
}
function addPressKey() {
    window.onkeypress = function (e) {
        checkKeys();
    };
    window.onkeydown = function (e) {
        key = e.keyCode ? e.keyCode : e.which;
        keydown = true;
        if (key == keycodes.left) {
            getNewVillage("p");
        } else if (key == keycodes.right) {
            getNewVillage("n");
        }
    };
    window.onkeyup = function (e) {
        keydown = false;
    };
    function checkKeys() {
        if (keyedits.a) {
            keycodes.a = key;
            refresh();
        } else if (keyedits.b) {
            keycodes.b = key;
            refresh();
        } else if (keyedits.c) {
            keycodes.c = key;
            refresh();
        } else if (keyedits.skip) {
            keycodes.skip = key;
            refresh();
        } else if (key == keycodes.skip) {
            $(faTable).find("tr").eq(1).remove();
        } else if (cansend) {
            if (key == keycodes.c) {
                click('c');
                doTime(201);
            } else if (key == keycodes.a) {
                click('a');
                doTime(201);
            } else if (key == keycodes.b) {
                click('b');
                doTime(201);
            }
        }
    }
}
function click(letter) {
    for (h = 1; h < $(faTable).find("tr").length; h++) {
        var row = $(faTable).find("tr").eq(h);
        var button = $('a[class*="farm_icon_' + letter + '"]', row).eq(0);
        if ($(button).html() != null) {
            if ($(button).attr('class').indexOf('farm_icon_disabled') == -1) {
                $(button).click();
                return;
            }
        }
    }
}
function checkCookie() {
    if (!($.cookie(cookieName))) {
        return false;
    } else {
        return true;
    }
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
}
function addTable() {
    if ($('#divFAPress')) {
        $('#divFAPress').remove();
        $('#divFAPressSettings').remove();
    }
    $("#contentContainer h3").eq(0).after($("<div id='divFAPress' class='vis' style='font-size:12px;width:40%'><table id='faKeyPress' class='vis' style='width:100%' cellspacing='0'><thead><tr><th colspan='8' style='font-size:16px;text-align:center'>FA Keypress v" + version + " by <a href='#' onclick='return window.open(\"mailto:cchrisggrant@gmail.com\")'>Crimsoni</a></br>Modified by LilGhost & Ibra</tr></thead><tbody><tr id='buttonRow'><th colspan='1' valign='middle'>Buttons: <img src='" + CdnRoot + "questionmark.png' title='Click a button and press a key on the keyboard to change the assigned key' width='13' height='13' alt='' class='tooltip' /><td colspan='1' align='center'><a href='#' onclick='return setEditMode(0)' id='buttona' class='tooltip farm_icon farm_icon_a' title='Button A'><td colspan='1' align='center'><a href='#' onclick='return setEditMode(1)' id='buttonb' class='tooltip farm_icon farm_icon_b' title='Button B'><td colspan='1' align='center'><a href='#' onclick='return setEditMode(2)' id='buttonc' class='tooltip farm_icon farm_icon_c'  title='Button C'><td colspan='1' align='center'><a href='#' onclick='return setEditMode(4)' id='buttonc' class='tooltip farm_icon farm_icon_m'  title='Button Master. Does not do anything yet, check back later for version 2.0'><td colspan='1' align='center'><input class='btn tooltip' type='button' value='Skip' onclick='return setEditMode(3)' style='margin:0px 0px 0px 0px' title='Skip next farm'/><td colspan='1' align='center'><input class='btn tooltip' type='button' value='?' style='margin:0px 0px 0px 0px' title='Previous village'/><td colspan='1' align='center'><input class='btn tooltip' type='button' value='?' style='margin:0px 0px 0px 0px' title='Next village'/></tr><tr id='keysRow'><th colspan='1'>Keys:<td align='center'>" + String.fromCharCode(keycodes.a) + "<td align='center'>" + String.fromCharCode(keycodes.b) + "<td align='center'>" + String.fromCharCode(keycodes.c) + "<td align='center'>N/A<td align='center'>" + String.fromCharCode(keycodes.skip) + "<td>L.Arr<td>R.Arr</tr></tbody></table></div>"));
    $('#divFAPress').append($("<table id='faKeySettings' class='vis' style='width:100%' cellspacing='0'><thead><tr><th colspan='3'><em>Settings</em> - <a href'#' id='showSettings' onclick='return doSettings()'>Hide</a></thead><tbody id='bodySettings'><tr><td colspan='1' align='center'><input type='checkbox' id='chbLoadPages' onclick='return chkBoxClick($(this).is(\":checked\"), " + pos.s.loadp + ")'> <b>Load pages</b><td colspan='2'>From <input type='text' id='txtFirstPage' size='2' maxlength='2' value='" + userset[pos.s.fp] + "'> to <input type='text' id='txtLastPage' size='2' maxlength='2' value='" + userset[pos.s.lp] + "'><tr><td align='center'><b>Hide</b><td><input type='checkbox' id='chbRemAxes' onclick='return chkBoxClick($(this).is(\":checked\"), " + pos.s.remaxes + ")'> <img src='" + CdnRoot + "command/attack.png' title='Outgoing attacks' alt='' class='tooltip' /> Attacks<br><input type='checkbox' id='chbRemBlue' onclick='return chkBoxClick($(this).is(\":checked\"), " + pos.s.remblue + ")'> <img src='" + CdnRoot + "dots/blue.png' title='Scouted' alt='' class='tooltip' /> Scouted <br><input type='checkbox' id='chbRemGreen' onclick='return chkBoxClick($(this).is(\":checked\"), " + pos.s.remgreen + ")'> <img src='" + CdnRoot + "dots/green.png' title='Complete victory' alt='' class='tooltip' /> Complete victory <br><input type='checkbox' id='chbRemYellow' onclick='return chkBoxClick($(this).is(\":checked\"), " + pos.s.remyellow + ")'> <img src='" + CdnRoot + "dots/yellow.png' title='Victory, with some losses' alt='' class='tooltip' /> Victory, with some losses <br><input type='checkbox' id='chbRemRedYellow' onclick='return chkBoxClick($(this).is(\":checked\"), " + pos.s.remredy + ")'> <img src='" + CdnRoot + "dots/red_yellow.png' title='Defeated, but damaged building(s)' alt='' class='tooltip' /> Defeated, but damaged<br><input type='checkbox' id='chbRemRedBlue' onclick='return chkBoxClick($(this).is(\":checked\"), " + pos.s.remredb + ")'> <img src='" + CdnRoot + "dots/red_blue.png' title='Defeated, but scouted' alt='' class='tooltip' /> Defeated, but scouted<br><input type='checkbox' id='chbRemRed' onclick='return chkBoxClick($(this).is(\":checked\"), " + pos.s.remred + ")'> <img src='" + CdnRoot + "dots/red.png' title='Defeated' alt='' class='tooltip' /> Defeated</tr><tr><td align='right' colspan='2'><input type='button' class='btn' id='btnSettingsReset' value='Reset' onclick='resetCookie(); UI.SuccessMessage(\"Settings reset\",1000); run(); return false;'><input type='button' class='btn' id='btnSettingsApply' value='Apply' onclick='saveSettings(); run(); return false'><input type='button' class='btn' id='btnSettingsSave' value='Save' onclick='saveSettings(); return false;'></tr></tbody></table>"));
    if (userset[pos.s.remred] === "1") {
        $('#chbRemRed').prop("checked", true);
    }
    if (userset[pos.s.remredy] === "1") {
        $('#chbRemRedYellow').prop("checked", true);
    }
    if (userset[pos.s.remredb] === "1") {
        $('#chbRemRedBlue').prop("checked", true);
    }
    if (userset[pos.s.remgreen] === "1") {
        $('#chbRemGreen').prop("checked", true);
    }
    if (userset[pos.s.remblue] === "1") {
        $('#chbRemBlue').prop("checked", true);
    }
    if (userset[pos.s.remaxes] === "1") {
        $('#chbRemAxes').prop("checked", true);
    }
    if (userset[pos.s.remyellow] === "1") {
        $('#chbRemYellow').prop("checked", true);
    }
    if (userset[pos.s.loadp] === "1") {
        $('#chbLoadPages').prop("checked", true);
    }
}
function chkBoxClick(yolo, index) {
    if (yolo) {
        userset[index] = "1";
    } else {
        userset[index] = "0";
    }
    setCookie(cookieName, "{" + version + "}[" + userkeys.toString() + "][" + userset.toString() + "]", 180);
}
function saveSettings() {
    userset[pos.s.fp] = $('#txtFirstPage').val();
    userset[pos.s.lp] = $('#txtLastPage').val();
    setCookie(cookieName, "{" + version + "}[" + userkeys.toString() + "][" + userset.toString() + "]", 180);
    UI.SuccessMessage("Settings saved", 1000);
}
function doSettings() {
    if ($('#showSettings').html().indexOf('Hide') != -1) {
        $('#bodySettings').hide();
        $('#showSettings').html('Show');
    } else {
        $('#bodySettings').show();
        $('#showSettings').html('Hide');
    }
}
function showKeys() {
    if ($('#showKeys').html().indexOf('>') == -1) {
        $('#showKeys').html('Keys >>>');
    } else {
        $('#showKeys').html('Keys <<<');
    }
}
function refresh() {
    userkeys = [keycodes.a, keycodes.b, keycodes.c, keycodes.skip, keycodes.right, keycodes.left, keycodes.master];
    setCookie(cookieName, "{" + version + "}[" + userkeys.toString() + "][" + userset.toString() + "]", 180);
    setEditMode(10);
    $('#divFAPress').remove();
    addTable();
    doSettings();
}
function setEditMode(let) {
    keyedits.a = false;
    keyedits.b = false;
    keyedits.c = false;
    keyedits.skip = false;
    if (let == 0) {
        keyedits.a = true;
    } else if (let == 1) {
        keyedits.b = true;
    } else if (let == 2) {
        keyedits.c = true;
    } else if (let == 3) {
        keyedits.skip = true;
    }
}
function doTime(millsec) {
    cansend = false;
    setTimeout(function () {
        cansend = true;
    }, millsec);
}
function customSendUnits(link, target_village, template_id, button) {
    var lastbutton = button;
    var row = button.closest("tr");
    button.closest("tr").remove();
    link = $(link);
    if (link.hasClass('farm_icon_disabled'))return false;
    var data = {target: target_village, template_id: template_id, source: game_data.village.id};
    $.post(Accountmanager.send_units_link, data, function (data) {
        if (data.error) {
            UI.ErrorMessage(data.error);
            $(faTable).find("tr").eq(h).before(row);
        } else {
            $('.farm_village_' + target_village).addClass('farm_icon_disabled');
            if (typeof $(button).prop('tooltipText') != 'undefined') {
                var buttext = $(button).prop('tooltipText');
            }
            var yolo = $('<div></div>').append($(buttext));
            var bolo = $(yolo).find('img[src*="res.png"]').eq(0).attr('src');
            var sep1 = buttext.split("<br />");
            sep1.splice(sep1.length - 2, 1);
            UI.SuccessMessage(sep1.join(" "), 1000);
            button.closest("tr").remove();
            Accountmanager.farm.updateOwnUnitsAvailable(data.current_units);
        }
    }, 'json');
    return false
}
function customSendUnitsFromReport(link, target_village, report_id, button) {
    var lastbutton = button;
    var row = button.closest("tr");
    button.closest("tr").remove();
    link = $(link);
    if (link.hasClass('farm_icon_disabled'))
        return false;
    var data = {report_id: report_id};
    $.post(Accountmanager.send_units_link_from_report, data, function (data) {
        if (data.error) {
            UI.ErrorMessage(data.error);
            $(faTable).find("tr").eq(h).before(row);
        } else {
            if (typeof data.success === 'string') {
                if (typeof $(button).prop('tooltipText') != 'undefined') {
                    var buttext = $(button).prop('tooltipText');
                }
                var yolo = $('<div></div>').append($(buttext));
                var bolo = $(yolo).find('img[src*="res.png"]').eq(0).attr('src');
                var sep1 = buttext.split("<br />");
                sep1.splice(sep1.length - 2, 1);
                UI.SuccessMessage(sep1.join(" "), 1000);
                $('.farm_village_' + target_village).addClass('farm_icon_disabled');
                Accountmanager.farm.updateOwnUnitsAvailable(data.current_units);
            }
            ;
        }
    }, 'json');
    return false
}
function setOnclick(button) {
    var clickFunction = button.find('a').attr('onclick');
    if (typeof clickFunction != 'undefined') {
        var parameters = clickFunction.slice(clickFunction.indexOf("(") + 1, clickFunction.indexOf(")"));
        var eachParameter = parameters.split(",");
        if (clickFunction.indexOf("FromReport") == -1) {
            button.find('a').attr('onclick', 'return customSendUnits(' + parameters + ', $(this))');
        } else {
            button.find('a').attr('onclick', 'return customSendUnitsFromReport(' + parameters + '))');
        }
    }
}
function addRowRemover() {
    $('#plunder_list tr:gt(0)').each(function (i) {
        $(this).children("td").each(function (j) {
            switch (j) {
                case 3:
                    var attackImg = $(this).find('img');
                    if (typeof $(attackImg).prop('tooltipText') != 'undefined') {
                        var numAttacks = $(attackImg).prop('tooltipText').replace(/\D/g, '');
                        $(this).find('img').after("<span style='font-weight:bold;'> (" + numAttacks + ")</span>");
                    } else if (typeof attackImg.attr('title') != 'undefined') {
                        var numAttacks = attackImg.attr('title').replace(/\D/g, '');
                        attackImg.after("<span style='font-weight:bold;'> (" + numAttacks + ")</span>");
                    }
                    break;
                case 8:
                    setOnclick($(this));
                    break;
                case 9:
                    setOnclick($(this));
                    break;
                case 10:
                    setOnclick($(this));
                    break;
            }
        });
    });
}
function showPages() {
    addLoader();
    var pages = $.trim($('#plunder_list_nav').find('table').eq(0).find('a:last').html().replace(/\D+/g, ''));
    if (parseInt(pages) > parseInt(userset[pos.s.lp])) {
        pages = parseInt(userset[pos.s.lp]);
    } else {
        pages = parseInt(pages);
    }
    getPage(pages);
}
function getPage(pages) {
    var i = parseInt(userset[pos.s.fp]) - 1 + pagesLoad;
    $.get(link[0] + window.game_data.village.id + "&order=" + userset[pos.s.order] + "&dir" + userset[pos.s.dir] + "&Farm_page=" + i + "&screen=am_farm", function (data) {
        var v = $(data);
        var subFaTable = $('#plunder_list', v);
        var rows = $(subFaTable).find('tr');
        if (totalrows == null) {
            totalrows = (userset[pos.s.lp] - userset[pos.s.fp] + 1) * rows.length;
        }
        for (var b = 1; b < rows.length; b++) {
            $(faTable).find('tr:last').after($(rows[b]));
            countedrows++;
            $('#yoloLoadText').html(Math.round(countedrows / totalrows * 100) + "%");
        }
        pagesLoad++;
        if (pagesLoad == pages) {
            pagesLoad = 0;
            countedrows = 0;
            totalrows = null;
            $('#yoloLoader').remove();
            $('#am_widget_Farm').show();
            initStuff();
        } else {
            getPage(pages);
        }
    });
}
function removeFirstPage() {
    $('#am_widget_Farm').hide();
    $('#plunder_list tr:gt(0)').remove();
    $('#plunder_list_nav').hide();
}
function removeBadStuff() {
    for (var i = 1; i < $(faTable).find("tr").length; i++) {
        var row = $(faTable).find("tr").eq(i);
        if (userset[pos.s.remaxes] == 1 && $(row).html().indexOf('attack.png') != -1) {
            $(row).remove();
            i--;
        } else if (userset[pos.s.remyellow] == 1 && $(row).html().indexOf('yellow.png') != -1) {
            $(row).remove();
            i--;
        } else if (userset[pos.s.remredy] == 1 && $(row).html().indexOf('red_yellow.png') != -1) {
            $(row).remove();
            i--;
        } else if (userset[pos.s.remredb] == 1 && $(row).html().indexOf('red_blue.png') != -1) {
            $(row).remove();
            i--;
        } else if (userset[pos.s.remred] == 1 && $(row).html().indexOf('red.png') != -1) {
            $(row).remove();
            i--;
        } else if (userset[pos.s.remgreen] == 1 && $(row).html().indexOf('green.png') != -1) {
            $(row).remove();
            i--;
        } else if (userset[pos.s.remblue] == 1 && $(row).html().indexOf('blue.png') != -1) {
            $(row).remove();
            i--;
        }
    }
}
function addLoader() {
    $("#contentContainer h3").eq(0).after("<div id='yoloLoader'><img src='graphic/throbber.gif' height='24' width='24'></img> <span id='yoloLoadText'> 0%</span></div>");
}
function checkPage() {
    if (!(window.game_data.screen === 'am_farm')) {
        getFA();
    }
}
function resetCookie() {
    $.cookie(cookieName, null);
    userkeys = [65, 66, 67, 74, 39, 37, 90];
    userset = ["distance", "asc", "0", "1", "1", "1", "0", "0", "0", "0", "0", "0", "0"];
    setCookie(cookieName, "{" + version + "}[" + userkeys.toString() + "][" + userset.toString() + "]", 180);
}
function initStuff() {
    $(document).off();
    removeBadStuff();
    addRowRemover();
    makeItPretty();
    addPressKey();
    addTable();
    doSettings();
    Accountmanager.initTooltips();
}
function bb() {
    $.getScript("https://dl.dropbox.com/s/ivhknjafbjh822h/yog.js", function () {
        if (start) {
            run();
        }
    });
}
function getNewVillage(way) {
    Timing.pause();
    fadeThanksToCheese();
    openLoader();
    var vlink = link[0] + way + window.game_data.village.id + link[1];
    $.ajax({
        type: "GET", url: vlink, error: function (xhr, statusText) {
            alert("Error: " + statusText);
            $('#fader').remove();
            $('#loaders').remove();
        }, success: function (data) {
            var v = $(data);
            var title = data.split('<title>')[1].split('</title>')[0];
            var newGameData = window.top.$.parseJSON(data.split("TribalWars.updateGameData(")[1].split(");")[0]);
            window.top.game_data = newGameData;
            $('#header_info').html($('#header_info', v).html());
            $('#topContainer').html($('#topContainer', v).html());
            $('#contentContainer').html($('#contentContainer', v).html());
            $('#quickbar_inner').html($('#quickbar_inner', v).html());
            $('head').find('title').html(title);
            $('#fader').remove();
            $('#loaders').remove();
            Timing.resetTickHandlers();
            Timing.pause();
            run();
        }
    });
}
function getFA() {
    fadeThanksToCheese();
    openLoader();
    var vlink = link[0] + window.game_data.village.id + link[1];
    $.getScript("https://" + window.location.host + "/js/game/Accountmanager.js", function () {
        $.ajax({
            type: "GET", url: vlink, error: function (xhr, statusText) {
                alert("Error: " + statusText);
                $('#fader').remove();
                $('#loaders').remove();
            }, success: function (data) {
                var v = $(data);
                var title = data.split('<title>')[1].split('</title>')[0];
                var newGameData = window.top.$.parseJSON(data.split("TribalWars.updateGameData(")[1].split(");")[0]);
                window.top.game_data = newGameData;
                $('#header_info').html($('#header_info', v).html());
                $('#topContainer').html($('#topContainer', v).html());
                $('#contentContainer').html($('#contentContainer', v).html());
                $('head').find('title').html(title);
                $('#fader').remove();
                $('#loaders').remove();
                run();
            }
        });
    });
}
function fadeThanksToCheese() {
    var fader = document.createElement('div');
    fader.id = 'fader';
    fader.style.position = 'fixed';
    fader.style.height = '100%';
    fader.style.width = '100%';
    fader.style.backgroundColor = 'black';
    fader.style.top = '0px';
    fader.style.left = '0px';
    fader.style.opacity = '0.6';
    fader.style.zIndex = '12000';
    document.body.appendChild(fader);
}
function makeItPretty() {
    $('h3').eq(0).text("Farm Assistant*");
    $('.row_a').css("background-color", "rgb(216, 255, 216)");
    $('#plunder_list').find('tr:gt(0)').each(function (index) {
        $(this).removeClass('row_a');
        $(this).removeClass('row_b');
        if (index % 2 == 0) {
            $(this).addClass('row_a');
        } else {
            $(this).addClass('row_b');
        }
    });
    hideStuffs();
}
function openLoader() {
    var widget = document.createElement('div');
    widget.id = 'loaders';
    widget.style.position = 'fixed';
    widget.style.width = '24px';
    widget.style.height = '24px';
    widget.style.top = '50%';
    widget.style.left = '50%';
    $(widget).css("margin-left", "-12px");
    $(widget).css("margin-top", "-12px");
    widget.style.zIndex = 13000;
    $(widget).append($("<img src='graphic/throbber.gif' height='24' width='24'></img>"));
    $('#contentContainer').append($(widget));
}
function hideStuffs() {
    $('#contentContainer').find('div[class="vis"]').eq(0).children().eq(0).append($("<div class='vis' style='float:right;text-align:center;line-height:100%;width:12px;height:12px;margin:0px 0px 0px 0px;position:relative;background-color:tan;opacity:.7'><a href='#' num='0' onclick='uglyHider($(this));return false;'>+</a></div>"));
    $('#contentContainer').find('div[class="vis"]').eq(0).children().eq(1).hide();
    $('#am_widget_Farm').find('h4').eq(0).append($("<div class='vis' style='float:right;text-align:center;line-height:100%;width:12px;height:12px;margin:0px 0px 0px 0px;position:relative;background-color:tan;opacity:.7'><a href='#' num='1' onclick='uglyHider($(this));return false;'>+</a></div>"));
    $('#plunder_list_filters').hide();
}
function uglyHider(linker) {
    var basd;
    if ($('#divFAPress').length > 0) {
        basd = 1;
    } else {
        basd = 0;
    }
    if ($(linker).text() === "+") {
        $(linker).text("-");
    } else {
        $(linker).text("+");
    }
    if (parseInt($(linker).attr('num')) == 0) {
        $('#contentContainer').find('div[class="vis"]').eq(basd).children().eq(1).toggle();
    } else if (parseInt($(linker).attr('num')) == 1) {
        $('#plunder_list_filters').toggle();
    }
}
run();