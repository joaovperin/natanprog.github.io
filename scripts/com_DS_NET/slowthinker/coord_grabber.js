javascript:
var author = "Stotty2009 but most of the code is from: dalesmckay@gmail.com";
var minVer = "7.2";
var win = (window.frames.length > 0) ? window.main : window;
var ver = win.game_data.version.match(/[\d|\.]+/g);

function getMode() {
    mode = prompt("b for barb villages, p for player villages, or t for tribe villages", "p");
    mode = mode.toLowerCase();
    checkMode()
}

function checkMode() {
    if (mode == 'p') {
        playername = prompt("which player pl0x?", "Stotty2009") + ' '
    } else if (mode == 't') {
        tribename = prompt("which tribe pl0x?", "Crazy Muthas")
    } else if (mode == 'b') {} else {
        getMode()
    }
}
getMode();

function trim(str) {
    return str.replace(/^\s+|\s+$/g, "")
}
if (!ver || (parseFloat(ver[1]) < minVer)) {
    alert("This script requires v" + minVer + " or higher.\nYou are running: v" + ver[1])
} else {
    if (win.game_data.screen == "map") {
        var coords = [];
        var col, row, coord, village, player, points;
        for (row = 0; row < TWMap.size[1]; row++) {
            for (col = 0; col < TWMap.size[0]; col++) {
                coord = TWMap.map.coordByPixel(TWMap.map.pos[0] + (TWMap.tileSize[0] * col), TWMap.map.pos[1] + (TWMap.tileSize[1] * row));
                if (coord) {
                    village = TWMap.villages[coord.join("")];
                    if (village) {
                        player = null;
                        if (parseInt(village.owner || "0", 10)) {
                            player = TWMap.players[village.owner];
                            var ally = TWMap.allies[player.ally]
                        }
                        if (player) {
                            if (mode == "p") {
                                if (trim(player.name) == trim(playername)) {
                                    coords.push(coord.join("|"))
                                }
                            } else if (mode == "t") {
                                if (ally) {
                                    if (trim(ally.name) == trim(tribename)) {
                                        coords.push(coord.join("|"))
                                    }
                                }
                            }
                        } else {
                            if (mode == "b") {
                                coords.push(coord.join("|"))
                            }
                        }
                    }
                }
            }
        }
        alert(coords.join(" "))
    } else {
        alert("Run this script from the Map.\nRedirecting now...");
        self.location = win.game_data.link_base_pure.replace(/screen\=/i, "screen=map")
    }
}
void(o);