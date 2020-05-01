/*
javascript:
var format = "{image} {NL} {index} {coord} {player} {points} {tag} {tribename} {kk} {x} {y} {tribepoints} {playerpoints} {playerid} {villageid} {tribeid}";
$.getScript("http://dl.dropbox.com/u/24469843/Tribalwars/Scripts/Map_Export.js"); 
void(0);
*/

if (format === undefined) { var format = "K{kk} [coord]{coord}[/coord] {points}{NL\}"; }
var win = (window.frames.length > 0) ? window.main : window;
var index = 0;
var outputID = 'villageList';
$(document).ready(function () {
    if ($('#' + outputID).length <= 0) {
        if (game_data.screen == 'map') {
            var srcHTML = '<div id="coord_picker">' + '<span style="color:blue;text-decoration:underline;">dalesmckay\'s co-ordinate picker v7.1:</span><br/><br/><textarea id="' + outputID + '" cols="40" rows="10" value="" onFocus="this.select();"/>' + '</div>';
            ele = win.$('body').append(win.$(srcHTML));
            win.TWMap.map._handleClick = function (e) {
                index++;
                var pos = this.coordByEvent(e);
                var x = pos[0];
                var y = pos[1];
                var coord = pos.join("|");
                coordidx = x * 1000 + y,
                village = TWMap.villages[coordidx];
                var ownername, ownerpoints, tribetag, tribename, tribepoints, ownerally;
                if (village.owner == 0) {
                    ownername = "";
                    ownerpoints = 0;
                }
                else {
                    owner = TWMap.players[village.owner];

                    if (TWMap.allies[TWMap.players[village.owner]] > 0) {
                        tribetag = TWMap.allies[TWMap.players[village.owner].ally].tag;
                        tribename = TWMap.allies[TWMap.players[village.owner].ally].name;
                        tribepoints = TWMap.allies[TWMap.players[village.owner].ally].points;
                        ownerally = owner.ally;
                        tribe = TWMap.allies[TWMap.players[village.owner].ally];
                    }
                    else {
                        tribe = "";
                        tribetag = "";
                        tribename = "";
                        tribepoints = "";
                        ownerally = 0;
                    }
                }
                var image = "";
                if (village.bonus) {
                    image = village.bonus[1];
                }

                var data = format.replace("{coord\}", coord)
                .replace("{player\}", ownername)
                .replace("{playerpoints\}", ownerpoints)
                .replace("{playerid\}", village.owner)
                .replace("{villageid\}", village.id)
                .replace("{points\}", village.points.replace(".", ""))
                .replace("{tag\}", tribetag)
                .replace("{tribename\}", tribename)
                .replace("{tribepoints\}", tribepoints)
                .replace("{tribeid\}", ownerally)
                .replace("{x\}", x)
                .replace("{y\}", y)
                .replace("{kk\}", TWMap.con.continentByXY(x, y))
                .replace("{image\}", 'http://' + document.URL.split('/')[2] + '/graphic/' + image)
                .replace("{index\}", index)
                .replace("{NL\}", "\n");
                
                document.getElementById(outputID).innerHTML += data;
                /* $('#' + outputID).value += data + "\n";*/
                return false;
            };
        } else {
            alert("Run this script from the Map.\nRedirecting now...");
            self.location = win.game_data.link_base_pure.replace(/screen\=\w*/i, "screen=map");
        }
    }
});
void (0);