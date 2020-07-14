javascript:

if (window.location.href.indexOf('&screen=main') < 0) {
    //relocate
    window.location.assign(game_data.link_base_pure + "main");
}


var sourceID = 0;
var resourcesNeeded = [];
var resource = {};
var sources = [];
//set start resources
var nonReservedWood = game_data.village.wood;
var nonReservedStone = game_data.village.stone;
var nonReservedIron = game_data.village.iron;
//set total resources reserved so we don't overflow the cap later
var WHWoodCap = nonReservedWood;
var WHStoneCap = nonReservedStone;
var WHIronCap = nonReservedIron;
var sourceWood = 0;
var sourceStone = 0;
var sourceIron = 0;
var sourceMerchants = 0;
var WHCap = game_data.village.storage_max;

cssClassesSophie = `
<style>
.res{
padding: 1px 1px 1px 18px;
}
.trclass:hover { background: #40D0E0 !important; }
.trclass:hover td { background: transparent; }
</style>`;
$("#contentContainer").eq(0).prepend(cssClassesSophie);
$("#mobileHeader").eq(0).prepend(cssClassesSophie);
$("#building_wrapper").prepend(`<table><tr>
<th id="currentSelection">No village chosen</th>
<th>Res:</th>
<td class="res"><span class="icon header wood"></span><span id="sourceWood">0</span></td>
<td class="res"><span class="icon header stone"></span><span id="sourceStone">0</span></td>
<td class="res"><span class="icon header iron"></span><span id="sourceIron">0</span></td>
<th>Merchants:</th>
<td class="res"><span id="sourceMerchants">0</span></td>
<th><input type="button" class="btn evt-confirm-btn btn-confirm-yes" id="showSourceSelect" onclick="showSourceSelect()" value="Change source"></th>
</tr></table>
`)


function checkBuildings() {
    // check all buildings that need a request
    for (var i = 0; i < $("#buildings tr .build_options .inactive").length; i++) {
        //check if warehouse space is big enough for this building
        wood = $("#buildings tr .build_options .inactive").eq(i).parents().eq(1).find($("[data-cost]")).eq(0).text().trim();
        stone = $("#buildings tr .build_options .inactive").eq(i).parents().eq(1).find($("[data-cost]")).eq(1).text().trim();
        iron = $("#buildings tr .build_options .inactive").eq(i).parents().eq(1).find($("[data-cost]")).eq(2).text().trim();
        resourcesNeeded.push({ "wood": wood, "stone": stone, "iron": iron })
        //create request buttons.
        if ($("#buildings tr .build_options .inactive").eq(i).text() != 'The Warehouse is too small') {
            $("#buildings tr .build_options .inactive").eq(i).parent().parent().append(`<td id="request${i}"><input type="button" class="btn evt-confirm-btn btn-confirm-yes" id="calculate${i}" onclick="requestRes(${i})" value="Request"></td>`)
        }
        else {
            $("#buildings tr .build_options .inactive").eq(i).parent().parent().append(`<td id="request${i}"><input type="button" class="btn btn-disabled" id="calculate" value="WH CAP"></td>`)
        }
    }
}


function requestRes(buildingNr) {
    resource[sourceID] = {}
    resource[sourceID]["wood"] = Math.max(0, resourcesNeeded[buildingNr].wood - nonReservedWood);
    resource[sourceID]["stone"] = Math.max(0, resourcesNeeded[buildingNr].stone - nonReservedStone);
    resource[sourceID]["iron"] = Math.max(0, resourcesNeeded[buildingNr].iron - nonReservedIron);
    //check if this would cause an overflow
    if (WHWoodCap + resource[sourceID]["wood"] > WHCap || WHStoneCap + resource[sourceID]["stone"] > WHCap || WHIronCap + resource[sourceID]["iron"] > WHCap) {
        alert("Not enough storage space for this action!")
        throw Error("Out of space");
    }
    else {
        TribalWars.post('market', { ajaxaction: 'call', village: game_data.village.id }, { "select-village": sourceID, "target_id": 0, "resource": resource }, function (e) {
            UI.SuccessMessage(`
            <p>
            <span>Resources requested: </span>
            <span class="icon header wood"></span><span>${resource[sourceID]["wood"]}</span>
            <span class="icon header stone"></span><span>${resource[sourceID]["stone"]}</span>
            <span class="icon header iron"></span><span>${resource[sourceID]["iron"]}</span>
            </p>
            <p>
            <span>Used/reserved WH space: </span>
            <span class="icon header wood"></span><span>${resource[sourceID]["wood"] + WHWoodCap}</span>
            <span class="icon header stone"></span><span>${resource[sourceID]["stone"] + WHStoneCap}</span>
            <span class="icon header iron"></span><span>${resource[sourceID]["iron"] + WHIronCap}</span>
            </p>
            `);
            nonReservedWood = nonReservedWood + resource[sourceID]["wood"] - resourcesNeeded[buildingNr].wood;
            nonReservedStone = nonReservedStone + resource[sourceID]["stone"] - resourcesNeeded[buildingNr].stone;
            nonReservedIron = nonReservedIron + resource[sourceID]["iron"] - resourcesNeeded[buildingNr].iron;
            //adding requested resources to the current total
            WHWoodCap += resource[sourceID]["wood"];
            WHStoneCap += resource[sourceID]["stone"];
            WHIronCap += resource[sourceID]["iron"];
            sourceWood -= resource[sourceID]["wood"];
            sourceStone -= resource[sourceID]["stone"];
            sourceIron -= resource[sourceID]["iron"];
            sourceMerchants -=Math.floor(((resource[sourceID]["wood"]+resource[sourceID]["stone"]+resource[sourceID]["iron"])/1000))+1;
            $("#sourceWood").text(sourceWood);
            $("#sourceStone").text(sourceStone);
            $("#sourceIron").text(sourceIron);
            $("#sourceMerchants").text(sourceMerchants);
            $(`input[id='calculate${buildingNr}']`).remove();
        },
            !1
        );
    }
}

function checkDistance(x1, y1, x2, y2) {
    //calculate distance from current village
    var a = x1 - x2;
    var b = y1 - y2;
    var distance = Math.round(Math.hypot(a, b));
    return distance;
}

function showSourceSelect() {
    resource = {};
    sources = [];
    $.get("/game.php?&screen=overview_villages&mode=prod&group=0&page=-1&", function (resourcePage) {
        // get X and Y of each village, ID, resources and merchants, maybe farm used? ... then add distance from current village and at the end, sort array according
        rowsResPage = $(resourcePage).find("#production_table tr").not(":first");
        $.each(rowsResPage, function (index) {
            tempX = rowsResPage.eq(index).find("span.quickedit-vn").text().trim().match(/(\d+)\|(\d+)/)[1];
            tempY = rowsResPage.eq(index).find("span.quickedit-vn").text().trim().match(/(\d+)\|(\d+)/)[2];
            tempDistance = checkDistance(tempX, tempY, game_data.village.x, game_data.village.y);
            tempResourcesHTML = rowsResPage[index].children[3].innerHTML;
            tempWood = $(rowsResPage[index].children[3]).find(".wood").text().replace(".", "");
            tempStone = $(rowsResPage[index].children[3]).find(".stone").text().replace(".", "");
            tempIron = $(rowsResPage[index].children[3]).find(".iron").text().replace(".", "");
            tempVillageID = $(rowsResPage).eq(index).find('span[data-id]').attr("data-id");
            tempVillageName = $(rowsResPage).eq(index).find('.quickedit-label').text().trim()
            tempMerchants =rowsResPage[index].children[5].innerText;
            if (tempVillageID != game_data.village.id) {
                //store data to be used later
                sources.push({ "name": tempVillageName, "id": tempVillageID, "resources": tempResourcesHTML, "x": tempX, "y": tempY, "distance": tempDistance, "wood": tempWood, "stone": tempStone, "iron": tempIron,"merchants":tempMerchants })
            }
        })
        sources.sort(function (left, right) { return left.distance - right.distance; })
    })
        .done(function () {
            //make a way to select which village we want to use.
            htmlSelection = `<div style='width:700px;'><h1>Select village where res will be pulled from</h1><br><span>Script made by Sophie "Shinko to Kuma"</span><br><table class="vis" style='width:700px;'>
        <tr>
            <th>Village name</th>
            <th>Resources</th>
            <th>Distance</th>
            <th>Merchants</th>
        </tr>`


            $.each(sources, function (ind) {
                htmlSelection += `
            <tr class="trclass" style="cursor: pointer" onclick="storeSourceID(${sources[ind].id},'${sources[ind].name}',${sources[ind].wood},${sources[ind].stone},${sources[ind].iron},${sources[ind].merchants.match(/(\d+)\//)[1]})">
                <td>${sources[ind].name}</td>
                <td>${sources[ind].resources}</td>
                <td>${sources[ind].distance}</td>
                <td>${sources[ind].merchants}</td>
            </tr>
            `
            })
            htmlSelection += "</table></div>"

            Dialog.show("Content", htmlSelection);
            //potentionally make a way to check if a village we are using to request from is starting to run low on resources, and maybe even select another village when there aren't enough available
        });
}

function storeSourceID(id, name, wood, stone, iron,merchants) {
    resource = {};
    sourceID = id;
    sourceWood = wood;
    sourceStone = stone;
    sourceIron = iron;
    sourceMerchants= merchants;
    UI.SuccessMessage(`Using ${name} as source village.`);
    $("#currentSelection").text(name);
    $("#sourceWood").text(sourceWood);
    $("#sourceStone").text(sourceStone);
    $("#sourceIron").text(sourceIron);
    $("#sourceMerchants").text(sourceMerchants);
    Dialog.close();
    $("td[id*='request']").remove();
    checkBuildings();
}

showSourceSelect();