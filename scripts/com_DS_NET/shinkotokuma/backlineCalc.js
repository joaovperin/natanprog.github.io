javascript:
if (typeof populationPerHC == 'undefined') {
    var populationPerHC = 4;
}
var packetSize = 1000;
var villageIDs = [];
var rallyPointURLS = [];
var availableUnits = [];
var backgroundColor = "#36393f";
var borderColor = "#3e4147";
var headerColor = "#202225";
var titleColor = "#ffffdf";
var totalPackets = 0;
if ($("#popup")[0]) $("#popup")[0].remove();
//loading bar

$("#contentContainer").eq(0).prepend(`
<div id="progressbar" style="width: 100%;
background-color: #36393f;"><div id="progress" style="width: 0%;
height: 35px;
background-color: #4CAF50;
text-align: center;
line-height: 32px;
color: black;"></div>
</div>`);



if (window.location.href.indexOf('screen=overview_villages&mode=combined') < 0) {
    //relocate
    window.location.assign(game_data.link_base_pure + "overview_villages&mode=combined");
}
else {
    //right page
    console.log("Right");
    grabVillageAvailableUnits();

}


function popupSophie(html) {
    var popup = `<div id="popup" class="ui-widget-content" style="position:absolute;height: 500px; width: 950px;overflow-y: auto;overflow-x: hidden;z-index:50;background-color:${backgroundColor};cursor:move">
    <table id="tableBarbShaper" class="vis" border="1" style="width: 100%;background-color:${backgroundColor};border-color:${borderColor}">
    <tr>
        <tr>
            <td colspan="10" id="BLpacketCounter" style="text-align:center; width:auto; background-color:${headerColor}">
            <h2>
                <center style="margin:10px"><u>
                        <font color="${titleColor}">Backline packet counter</font>
                    </u>
                </center>
            </h2>
            </td>
        </tr>
        <tr>
            <td colspan="10" id="titlePackets" style="text-align:center; width:auto; background-color:${headerColor}">
            <h2>
                <font color="${titleColor}">Total packets found: ${totalPackets}</font>
                </u>
            </h2>
            </td>
        </tr>
        <tr style="background-color:${backgroundColor}">
        <td id="pasteHere"></td>
        </tr>
    </table>
    <hr>
    <center><img class="tooltip-delayed" title="Sophie -Shinko to Kuma-" src="https://dl.dropboxusercontent.com/s/0do4be4rzef4j30/sophie2.gif" style="cursor:help; position: relative"></center>
    <br>
    <center>
    <p><font color="${titleColor}">Creator: </font><a href="https://shinko-to-kuma.my-free.website/" style="text-shadow:-1px -1px 0 ${titleColor},1px -1px 0 ${titleColor},-1px 1px 0 ${titleColor},1px 1px 0 ${titleColor};" title="Sophie profile" target="_blank">Sophie "Shinko to Kuma"</a>
    </p>
    </center>
    </div>`;
    $("#contentContainer").before(popup);
    $("mobileContent").eq(0).prepend(popup);
    $("#popup").draggable();
    $("#pasteHere").eq(0).append(html);
    $("#progress").remove();
    //$("#totalPackets")[0].innerHTML=totalPackets;
    rows=$("#troops")[0].children[0].childNodes.length-1;
    for (var p = 0; p <rows ; p++) {
        if ($(`#packetnr${p}`)[0].innerText == 0) {
            $(`#packetnr${p}`)[0].parentElement.remove();
        }
    }
}

function grabVillageIDs() {
    var IDs = [];
    /*
    for (var j = 0; j < villageIds.length; j++) {
        targetUrls.push(`${window.location.origin}/game.php?village=${villageIds[j]}&screen=place`);
    }*/
    for (var j = 0; j < $(".quickedit-vn").length; j++) {
        IDs.push($(".quickedit-vn").eq(j).attr("data-id"));
    }
    console.log(IDs);
    return IDs;
}

function grabVillageAvailableUnits() {


    var availableUnits = [];
    var allRows = $("#combined_table tr.nowrap");
    for (var i = 0; i < allRows.length; i++) {
        troopCounts = {};
        //grab this rows troop counts, -2 cause snob and militia dont count
        for (var j = 0; j < game_data.units.length - 2; j++) {
            troopCounts[game_data.units[j]] = parseInt($("#combined_table tr.nowrap").eq(i).find("td.unit-item")[j].innerText);
        }
        availableUnits.push(troopCounts);
    }
    console.log("Total available");
    console.table(availableUnits);
    //header section
    var html = `<font color="${titleColor}"><table id="troops" class="vis" border="1" style="width: 100%;background-color:${backgroundColor};border-color:${borderColor}">
        <tr><td align="center" style="background-color:${headerColor}">Village link</td><td align="center" style="background-color:${headerColor}">Packets</td>`;
    //header for each unit available
    for (var o = 0; o < game_data.units.length - 2; o++) {
        html += `<td align="center" style="background-color:${headerColor}">${game_data.units[o]}</td>`
    }
    html += `</tr>`;

    //troops section
    for (var k = 0; k < allRows.length; k++) {
        html += `<tr><td align="center" style="background-color:${backgroundColor}"><a href=${$(".quickedit-content")[k].children[0].href.substring(0, $(".quickedit-content")[k].children[0].href.length - 8) + "place"} style="color:#40D0E0;" target="_blank"><div style="height:100%;width:100%">${$(".quickedit-content")[k].innerText}</div></td>`;
        //calc population of def units
        localDefPackets = availableUnits[k]["spear"] + availableUnits[k]["sword"];
        if (game_data.units[3] == "archer") {
            localDefPackets += availableUnits[k]["archer"]
        }
        heavyNr = game_data.units.indexOf("heavy");
        localDefPackets += availableUnits[k]["heavy"] * populationPerHC;
        localDefPackets = Math.floor(localDefPackets / packetSize);
        totalPackets += localDefPackets;
        html += `<td id="packetnr${k}" align="center" style="background-color:${backgroundColor}">${localDefPackets}</td>`
        for (var unit = 0; unit < game_data.units.length - 2; unit++) {
            html += `<td align="center" style="background-color:${backgroundColor}">${availableUnits[k][game_data.units[unit]]}</td>`
        }
        html += `</tr>`
    }
    html += `</table></font>`
    popupSophie(html);

}


