Javascript:
/* Poached from Fluffy88
http://www.fluffy88.com/TW/op_gen.js
http://www.crosstrigger.com/tw/op_gen.js

anonymous 30/08/2011 : fixed for 7.4 
jason farmer 30/08/2011 : fudged to fit uk..
Nick Toby - May 2, 2013 : fudged the previous fudging? This was generating a bannable fake script. -edit: I am a dumbass. Of course, I was testing it on the wrong market so it wasn't disabled.
Nick Toby - July 6, 2013: added a new output section that reduces tags (limit of 1000 tags per forum post) by making use of claim tags and context menus. Moved old output into "legacy" section
Nick Toby - August 16, 2013: changed twstats links to co.uk instead of .com (wasn't putting graphs in)
Nick Toby - March 23, 2014: changed twstats links to work for all markets

uk hosted version is at : http://team.tribalwars.co.uk/scripts/opGen.js
*/

/*
Javascript: $.getScript('http://team.tribalwars.co.uk/scripts/opGen.js');void (0);
*/

var translation = [];
if (game_data.market == "ba") {
    translation = ["Gradovi", "Pleme", "Bodova", "Poraženo neprijatelja"];
} else {
    translation = ["Villages", "Tribe", "Points", "Opponents defeated"];
}

/*==== twstats link ====*/
var statsDomain;
if (game_data.market == 'uk') {
	statsDomain = 'twstats.co.uk';
} else if (game_data.market == 'en') {
	statsDomain = 'twstats.com';
} else {
	statsDomain = game_data.market + '.twstats.com';
}

var table = document.getElementsByTagName("table");
for (x = 0; x < table.length; x++) {
    if (table[x].id == "villages_list") {
        var secondarytablevalue = x;
        break;
    }
}
var table = document.getElementsByTagName("table")[secondarytablevalue];

if (table.tBodies[0].rows.length > 100 && table.tBodies[0].rows.length < 102) { /*This checks to see if its over 100 rows (if it is, then it means that annoying button is there, which you need to get rid of*/
    var str = table.tBodies[0].rows[100].getElementsByTagName("td")[0].getElementsByTagName("a")[0].getAttribute("onclick").replace("return false", "");
    var patt1 = /\d+/g;
    var x = (str.match(patt1));
    Player.getAllVillages(this, '/game.php?village=' + x[0] + '&screen=info_player&ajax=fetch_villages&player_id=' + x[1]);
    table.tBodies[0].deleteRow(100);
    //$.getScript("http://ftp.innogames.net/~tracey/scripts/opGen.js");
	$.getScript("https://media.innogamescdn.com/com_DS_UK/Scripts/opGen.js");
    void (0);
    end();
}
setTimeout(fnExecuteScript(), 1000);

function fnExecuteScript() {
    try {
        
        var strScriptName = "Op Planner";
        var strVersion = "V7.3";

        if (!document.URL.match(/screen\=info_player/i)) {
            throw ('This script must be run from\nPlayer Profile Screen!');
        }

        function fnGenerateSequentialFakeScript(villas, trainSize) {
            var scriptSource = "";
            scriptSource += "javascript:";
            scriptSource += "var config={victim:'miscellaneous',trainSize:" + trainSize + ",units:{spy:1,ram:1},cookieID:'fake'};";
            scriptSource += "var targets='" + villas.join(" ") + "';";
            scriptSource += "if(targets.replace(/^\\s\\s*/,'').replace(/\\s\\s*$/,'')===''){throw('There are no Targets');}";
            scriptSource += "var coords=targets.split(' ');";
            scriptSource += "function escapeStr(text){var specials=['/','.',',','~','`','@','#','%','-','_','*','+','?','|','$','=',':','!','^','<','>','(',')','[',']','{','}','\\\\'];var sRE=new RegExp('(\\\\'+specials.join('|\\\\')+')','g');return text.replace(sRE,'\\\\$1');}";
            scriptSource += "function zeroPad(number,length){var n=number.toString();while(n.length<length){n='0'+n;}return n;}";
            scriptSource += "function fnWriteCookie(index){var cookie_date=new Date(2099,11,11);document.cookie=vWorld+'$'+config.victim+'$'+config.cookieID+'='+(index+1)+';expires='+cookie_date.toGMTString();}";
            scriptSource += "function fnAssignUnits(index,isManualReset){";
            scriptSource += "if((index<0)||(index>=coords.length)){index=0;if(document.fakeSequence==1){alert('cycle restarted');}}";
            scriptSource += "document.getElementById('fake_combo').selectedIndex=index;";
            scriptSource += "var villa=coords[index].split('|');";
            scriptSource += "if(!isManualReset&&(document.fakeSequence<config.trainSize)){document.fakeSequence++;}else{document.fakeSequence=(isManualReset?2:1);fnWriteCookie(isManualReset?index-1:index);}";
            scriptSource += "var eleForm=document.getElementById('units_form');";
            scriptSource += "eleForm.x.value=villa[0];";
            scriptSource += "eleForm.y.value=villa[1];";
            scriptSource += "var count;";
            scriptSource += "for(var unit in config.units){";
            scriptSource += "if(config.units.hasOwnProperty(unit)){";
            scriptSource += "if(typeof(eleForm[unit])!='undefined'){";
            scriptSource += "count=parseInt(eleForm[unit].nextSibling.nextSibling.innerHTML.match(/\\d+/),10);";
            scriptSource += "eleForm[unit].value=Math.min(config.units[unit],count);}}}}";
            scriptSource += "try{";
            scriptSource += "if(typeof(document.fakeSequence)=='undefined'){document.fakeSequence=1;}";
            scriptSource += "var scrape,vScreen=(scrape=document.URL.match(/\\&screen=(\\w+)/i))?scrape[1]:null;";
            scriptSource += "var vWorld=(scrape=document.URL.match(/\\/\\/(\\w+)\\./i))?scrape[1]:null;";
            scriptSource += "var village=document.getElementsByTagName('title')[0].innerHTML.match(/\\(\\d+\\|\\d+\\)/);";
            scriptSource += "if(vScreen=='place'){";
            scriptSource += "var index=0;";
            scriptSource += "var twCookie=document.cookie.match('[^|;]\s?'+escapeStr(vWorld+'$'+config.victim+'$'+config.cookieID+'=')+'([^;]*)[;|$]');";
            scriptSource += "if(twCookie){index=parseInt(twCookie[1],10);}";
            scriptSource += "if(!document.getElementById('fake_combo')){";
            scriptSource += "var eleInputs=document.getElementsByTagName('input');";
            scriptSource += "if(eleInputs){for(var ii=0;ii<eleInputs.length;ii++){";
            scriptSource += "if(eleInputs[ii].name=='support'){";
            scriptSource += "var optionList='';";
            scriptSource += "for(var jj=0;jj<coords.length;jj++){optionList+='<option>'+zeroPad(jj+1,4)+':'+coords[jj]+'</option>';}";
            scriptSource += "eleInputs[ii].parentNode.parentNode.innerHTML+='<TD rowspan=\"2\"><div id=\"fakes\"><table class=\"main\">";
            scriptSource += "<tr><td id=\"fake_content_value\"><span style=\"font-weight:bold\">Current Target:</span>";
            scriptSource += "<select id=\"fake_combo\" name=\"fake_combo\" size=\"1\" onchange=\"fnAssignUnits(this.selectedIndex,true);\">'+optionList+'</select>";
            scriptSource += "<span style=\"font-weight:100;font-style:italic;text-decoration:none;font-size:x-small;\">";
            scriptSource += "<a href=\"http://www.crosstrigger.com\" target=\"_blank\"> by dalesmckay</a></span></td></tr></table></div></TD>';break;}}}}";
            scriptSource += "fnAssignUnits(index,false);}else{throw('Run from the Rally point');}void(0);}catch(objErr){alert(objErr);}";

            return scriptSource;
        }

        function fnGetText(ele) {
            return (typeof (ele.innerText) == "undefined" ? ele.textContent : ele.innerText);
        }

        function zeroPad(number, length) {
            var n = number.toString();
            while (n.length < length) {
                n = '0' + n;
            }
            return n;
        }

        function fnExtractContinent(str) {
            var coords = str.split("|");
            var xx = zeroPad(coords[0], 3);
            var yy = zeroPad(coords[1], 3);

            return yy[0] + xx[0];
        }

        function fnGenerateOp() {
            var output = "";
			var legacyOutput = "";
            var coords = [];
            var villageTable = $("th:contains('" + translation[0] + "')").parent().parent();
            var playerTable = villageTable.parent().parent();

            var k = [];
            for (var x = 0; x < 100; x++) {
                k[zeroPad(x, 2)] = [];
            }

            var server = document.URL.match(/\/\/([a-z0-9]{1,5})\./i)[1];
            var thePlayer = playerTable.find("th:first").text();
            var playerId = document.URL.match(/id\=(\d+)/i)[1];
            var theTribeTd = playerTable.find("td:contains('" + translation[1] + ":')").next("td");

            var tribeId = 0;
            var theTribe = theTribeTd.html().match(/.*>(.*)<\/a>/i);
            if (theTribe) {
                theTribe = theTribe[1];
                tribeId = parseInt(theTribeTd.html().match(/id\=(\d+)/i)[1], 10);
            }

            var thePoints = playerTable.find("td:contains('" + translation[2] + ":')").next("td").text();
            var OD = playerTable.find("td:contains('" + translation[3] + ":')").next("td").text();


            for (i = 0; i < table.tBodies[0].rows.length; i++) {
                var currentName = ""; //as[i - 1].innerHTML;
                var cod = fnGetText(table.tBodies[0].rows[i].cells[1]);
                var pint = fnGetText(table.tBodies[0].rows[i].cells[2]);
                coords[i - 1] = cod;
                k[fnExtractContinent(cod)].push([cod, pint, currentName]);
            }

            var index = 1;
            for (var idx = 0; idx < k.length; idx++) {
                var curK = zeroPad(idx, 2);
                if (k[curK][0]) {
                    legacyOutput += "[b]K" + curK + " - " + k[curK].length + " " + translation[0] + ";[/b]\n";
					output += "[b]K" + curK + " - " + k[curK].length + " " + translation[0] + ";[/b]\n";

                    for (var kdx = 0; kdx < k[curK].length; kdx++) {
                        var legacyVillageLine = "[b][color=red]" + zeroPad(index, 4) + "[/color][/b]";

                        legacyVillageLine += " - [coord]" + k[curK][kdx][0] + "[/coord] - " + k[curK][kdx][1] + " ==> ";
						villageLine = "[claim]" + k[curK][kdx][0] + "[/claim] - " + k[curK][kdx][1] + " pts";

                        legacyOutput += legacyVillageLine + '\n';
						output += villageLine + '\n';
                        index++;
                    }

                    legacyOutput += "\n";
					output += "\n";
                }
            }

            var docSource = "";
			
			/*==== new format section ====*/
			
			docSource += "<h3>Detailed info:</h3>\n";
            docSource += "<textarea cols='80' rows='9' onFocus='this.select()'>\n";
            docSource += "Use the village context menus to manage claims.\n";
            docSource += "------------------------------------------------------------------------------------------------------\n\n";
            docSource += "[color=#ff0000][i][b]Landing Time:[/b][/i][/color]\n";
            docSource += "\n\n";
            docSource += "[color=#ff0eff][i][b]Goal/Mission:[/b][/i][/color]\n";
            docSource += "\n\n";
            docSource += "[color=#4b004b][i][b]Notes:[/b][/i][/color]\n";
            docSource += "\n\n";
            docSource += "[color=#00a500][i][b]Miscellaneous:[/b][/i][/color]\n";
            var urlPrefix = "";
            if (window.location.host.match(/us/g)) {
                urlPrefix = ".us";
            }
            else if (game_data.market == "ba") {
                urlPrefix = ".ba";
            } 
            else {
                urlPrefix = "";
            }

            docSource += "[img]http://www." + statsDomain + "/image.php?type=playerssgraph&graph=points&id=" + playerId + "&s=" + server + "[/img]\n";
            docSource += "[img]http://www." + statsDomain + "/image.php?type=playerssgraph&graph=villages&id=" + playerId + "&s=" + server + "[/img]\n\n";
            docSource += "Name: [player]" + thePlayer + "[/player]\n";
            docSource += "Points: " + thePoints + "\n";
            docSource += "OD: " + OD + "\n";
            docSource += "Tribe: " + ((tribeId > 0) ? ("[ally]" + theTribe + "[/ally]") : "[color=silver]None[/color]") + "\n";
            docSource += "[url=http://www." + statsDomain + "/" + server + "/index.php?page=player&fi=1&id=" + playerId + "]TWStats[/url]\n";

            if (tribeId > 0) {
                docSource += "[url=http://www." + statsDomain + "/" + server + "/index.php?page=map&tribe_0_id=" + tribeId + "&tribe_0_colour=ff00ff&player_0_id=" + playerId + "&player_0_colour=00aeff&zoom=100&centrex=500&centrey=500&nocache=1&fill=000000&grid=1]Map[/url]\n";
            }

            docSource += "\n\n";
            docSource += output;
            docSource += "</textarea><br/>\n";
			
			/*==== old format section ====*/
			
            docSource += "<h3>Detailed info (Legacy):</h3>\n";
            docSource += "<textarea cols='80' rows='9' onFocus='this.select()'>\n";
            docSource += "Claim the village(s) you are going to noble by posting the red bolded number next to the village(s).\n";
            docSource += "------------------------------------------------------------------------------------------------------\n\n";
            docSource += "[color=#ff0000][i][b]Landing Time:[/b][/i][/color]\n";
            docSource += "\n\n";
            docSource += "[color=#ff0eff][i][b]Goal/Mission:[/b][/i][/color]\n";
            docSource += "\n\n";
            docSource += "[color=#4b004b][i][b]Notes:[/b][/i][/color]\n";
            docSource += "\n\n";
            docSource += "[color=#00a500][i][b]Miscellaneous:[/b][/i][/color]\n";

            docSource += "[img]http://www." + statsDomain + "/image.php?type=playerssgraph&graph=points&id=" + playerId + "&s=" + server + "[/img]\n";
            docSource += "[img]http://www." + statsDomain + "/image.php?type=playerssgraph&graph=villages&id=" + playerId + "&s=" + server + "[/img]\n\n";
            docSource += "Name: [player]" + thePlayer + "[/player]\n";
            docSource += "Points: " + thePoints + "\n";
            docSource += "OD: " + OD + "\n";
            docSource += "Tribe: " + ((tribeId > 0) ? ("[ally]" + theTribe + "[/ally]") : "[color=silver]None[/color]") + "\n";
            docSource += "[url=http://www." + statsDomain + "/" + server + "/index.php?page=player&fi=1&id=" + playerId + "]TWStats[/url]\n";

            if (tribeId > 0) {
                docSource += "[url=http://www." + statsDomain + "/" + server + "/index.php?page=map&tribe_0_id=" + tribeId + "&tribe_0_colour=ff00ff&player_0_id=" + playerId + "&player_0_colour=00aeff&zoom=100&centrex=500&centrey=500&nocache=1&fill=000000&grid=1]Map[/url]\n";
            }

            docSource += "\n\n";
            docSource += legacyOutput;
            docSource += "</textarea><br/>\n";
			
			/*==== fake script section ====*/

            if (game_data.market != 'uk') {
                docSource += "<h3>Random fake script for all villages:</h3>\n";
                docSource += "<textarea cols='80' rows='9' onFocus='this.select()'>\n";
                docSource += "javascript:var coords = '" + coords.join(" ") + "';";
                docSource += "function fnFillRallyPoint(){var coord=coords.split(' ');var coordSplit=coord[Math.floor(Math.random()*coord.length)].split('|');document.forms[0].x.value=coordSplit[0];document.forms[0].y.value=coordSplit[1];var scouts=parseInt(document.forms[0].spy.nextSibling.nextSibling.innerHTML.match(/\\d+/),10);if(scouts>0){document.forms[0].spy.value=1;}var rams=parseInt(document.forms[0].ram.nextSibling.nextSibling.innerHTML.match(/\\d+/),10);if(rams>0){document.forms[0].ram.value=1;}else{var cats=parseInt(document.forms[0].catapult.nextSibling.nextSibling.innerHTML.match(/\\d+/),10);if(cats>0){document.forms[0].catapult.value=1;}}}fnFillRallyPoint();";
                docSource += "</textarea><br/>\n";

                docSource += "<h3>Sequential fake script for all villages:</h3>\n";
                docSource += "<textarea cols='80' rows='9' onFocus='this.select()'>\n";
                docSource += fnGenerateSequentialFakeScript(coords, 1);
                docSource += "</textarea><br/>\n";

                docSource += "<h3>Sequential fake train script for all villages:</h3>\n";
                docSource += "<textarea cols='80' rows='9' onFocus='this.select()'>\n";
                docSource += fnGenerateSequentialFakeScript(coords, 5);
                docSource += "</textarea><br/>\n";
            }

            var outputWin = window.open();
            outputWin.document.open('text/html', 'replace');
            outputWin.document.write(docSource);
            outputWin.document.close();
        }

        fnGenerateOp();
        void (0);
    } catch (objError) {
        var dbgMsg = "Error: " + String(objError.message || objError);
        /*
        fnDebugMessage(dbgMsg);
        */
        alert(dbgMsg);
    }
}


/*fnExecuteScript();*/