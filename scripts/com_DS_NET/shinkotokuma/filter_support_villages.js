javascript:
//Creator: Sophie "Shinko to Kuma"
var exportTable = "";
var playersSupported = {};
//if not on correct page yet, ask which page to go to
if (window.location.href.indexOf('&screen=overview_villages&mode=units&type=away_detail&page=-1&type=away_detail') < 0) {
        window.location.assign(game_data.link_base_pure + "overview_villages&mode=units&type=away_detail&page=-1&type=away_detail");
}

function search_table() {


    //html part here, table to prepend is units_table
    if ($('#button').length == 0) {
        var onlyShowOutsideSupport = false;
        body = document.getElementById("paged_view_content");
        htmlString = `
            <div id="supportQuery">
                <table id="filterTable" class="vis">
                    <thead>
                        <tr>
                            <th>Filter</th>
                            <th style="text-align:center" width=""></th>
                            
                            
                        </tr>
                    </thead>
                    <tbody>
                        <td>
                            <input type="text" ID="search_field_input" name="filter" size="20" margin="5" align=left>
                        </td>

                        <td margin="5">
                            <button type="button" ID="button" class="btn-confirm-yes" >Filter for player/tribe</button>
                        </td>
                        
                      
                        <thead id="supportList">
                        </thead>
                    </tbody>
                </table>
                </br>
            </div>`.trim();
        //<button type="button" ID="findOffensive" class="btn" onclick="filterOffensiveSupport()" >Select leftover offense</button>
        var buttonText = document.getElementsByName("submit_units_back")[0].value;

        supportDiv = document.createElement('div');
        supportDiv.innerHTML = htmlString;
        body.prepend(supportDiv.firstChild);
        $('#supportQuery').prepend(`<div id="exportTable" style="display:none"><textarea id="textField" cols="60" rows="20" placeholder="After filtering export data will be placed here"></textarea></div>`);
        



        $('#button').click(function () {
            //clear extra rows
            /*count = 0;
            for (var prop in playersSupported) {
                if (!playersSupported.hasOwnProperty(prop)) continue;
                count++;
            }
            $('#textField')[0].value = '';
            deleterows("filterTable", count * 7);
            for (var prop in playersSupported) {
                if (playersSupported.hasOwnProperty(prop))
                    delete playersSupported[prop];
            }
*/
            $(".undefined").remove();
            $('#filterTable tr.header').remove();

            //filter here
            // Declare variables 
            $('#supportList').empty();
            $('#supportList').append(`<tr>
                <th>Player</th>
                <th>Population</th>
                <th>Selection count</th>
            </tr>`);
            exportTable = "";
            var input, filter, i;
            input = document.getElementById("search_field_input");
            filter = input.value.toUpperCase();
            checkboxes = document.getElementsByClassName("village_checkbox");

            //reseting all checkboxes and counter
            amountChecked = 0;
            count = 0;
            for (i = 0; i < checkboxes.length; i++) checkboxes[i].checked = false;

            //clearing population counts for each player/village
            for (i=0;i<Object.keys(playersSupported).length;i++)
            {
                for(village=0;village<Object.keys(playersSupported[Object.keys(playersSupported)[i]]).length;village++)
                {
                    //set totalPop to 0
                    playersSupported[Object.keys(playersSupported)[i]][Object.keys(playersSupported[Object.keys(playersSupported)[i]])[village]]["totalPop"]=0;
                }
            }

            //checking if filter is empty
            if (filter == "" || filter.length < 2) return;

            //checking through all the checkboxes
            for (i = 0; i < checkboxes.length; i++) {
                //checking if support is at another player
                supportedPlayer = checkboxes[i].nextElementSibling.nextElementSibling;
                if (supportedPlayer) {
                    supportInfo = playersSupported[supportedPlayer.innerHTML];
                    playerName = supportedPlayer.innerHTML;
                    tribeName = checkboxes[i].nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
                    villageName = checkboxes[i].nextElementSibling.nextElementSibling.getAttribute("title");
                    link = checkboxes[i].nextElementSibling.children[0].getAttribute("href");
                    villageCoords = checkboxes[i].nextElementSibling.innerText.match(/\d+\|\d+/ig)[0]
                    if (playersSupported[playerName] == undefined) {
                        //add player to list
                        playersSupported[playerName] = [];
                    }

                    //check if support is at the right player
                    if (supportedPlayer.innerHTML.toUpperCase().indexOf(filter) > -1) {
                        //check if village already in list
                        if (playersSupported[playerName][villageCoords] == undefined) {
                            //add new village
                            playersSupported[playerName][villageCoords] = [];
                            for (k = 0; k < game_data.units.length - 1; k++) {
                                var currentUnitCycle = parseInt($(checkboxes[i].parentElement.parentElement.parentElement).find("td.unit-item")[k].innerHTML);
                                playersSupported[playerName][villageCoords][game_data.units[k]] = currentUnitCycle;
                                playersSupported[playerName][villageCoords]["totalPop"] = 0;
                                playersSupported[playerName][villageCoords]["link"]=link;

                                for (k = 0; k < game_data.units.length - 1; k++) {
                                    var currentUnitCycle = parseInt($(checkboxes[i].parentElement.parentElement.parentElement).find("td.unit-item")[k].innerHTML);
                                    playersSupported[playerName][villageCoords][game_data.units[k]] = currentUnitCycle;
                                    tempPop = 1;
                                    if (game_data.units[k] == 'spy') tempPop = 2;
                                    if (game_data.units[k] == 'light') tempPop = 4;
                                    if (game_data.units[k] == 'marcher') tempPop = 5;
                                    if (game_data.units[k] == 'heavy') tempPop = 4;
                                    if (game_data.units[k] == 'ram') tempPop = 5;
                                    if (game_data.units[k] == 'catapult') tempPop = 8;
                                    if (game_data.units[k] == 'snob') tempPop = 100;

                                    playersSupported[playerName][villageCoords]["totalPop"] += currentUnitCycle * tempPop;
                                }
                            }

                        }
                        else {
                            //add on top of already added 
                            for (k = 0; k < game_data.units.length - 1; k++) {
                                var currentUnitCycle = parseInt(playersSupported[playerName][villageCoords][game_data.units[k]]) + parseInt($(checkboxes[i].parentElement.parentElement.parentElement).find("td.unit-item")[k].innerHTML);
                                playersSupported[playerName][villageCoords][game_data.units[k]] = currentUnitCycle;
                                tempPop = 1;
                                if (game_data.units[k] == 'spy') tempPop = 2;
                                if (game_data.units[k] == 'light') tempPop = 4;
                                if (game_data.units[k] == 'marcher') tempPop = 5;
                                if (game_data.units[k] == 'heavy') tempPop = 4;
                                if (game_data.units[k] == 'ram') tempPop = 5;
                                if (game_data.units[k] == 'catapult') tempPop = 8;
                                if (game_data.units[k] == 'snob') tempPop = 100;

                                playersSupported[playerName][villageCoords]["totalPop"] += parseInt($(checkboxes[i].parentElement.parentElement.parentElement).find("td.unit-item")[k].innerHTML) * tempPop;
                            }
                        }

                    }
                    else
                        //check if filtered on tribe instead
                        if (checkboxes[i].nextElementSibling.nextElementSibling.nextElementSibling.innerHTML.toUpperCase().indexOf(filter) > -1) {
                            //check if village already in list
                            if (playersSupported[playerName][villageCoords] == undefined) {
                                //add new village
                                playersSupported[playerName][villageCoords] = [];
                                playersSupported[playerName][villageCoords]["totalPop"] = 0;
                                playersSupported[playerName][villageCoords]["link"]=link;

                                for (k = 0; k < game_data.units.length - 1; k++) {
                                    var currentUnitCycle = parseInt($(checkboxes[i].parentElement.parentElement.parentElement).find("td.unit-item")[k].innerHTML);
                                    playersSupported[playerName][villageCoords][game_data.units[k]] = currentUnitCycle;
                                    tempPop = 1;
                                    if (game_data.units[k] == 'spy') tempPop = 2;
                                    if (game_data.units[k] == 'light') tempPop = 4;
                                    if (game_data.units[k] == 'marcher') tempPop = 5;
                                    if (game_data.units[k] == 'heavy') tempPop = 4;
                                    if (game_data.units[k] == 'ram') tempPop = 5;
                                    if (game_data.units[k] == 'catapult') tempPop = 8;
                                    if (game_data.units[k] == 'snob') tempPop = 100;

                                    playersSupported[playerName][villageCoords]["totalPop"] += currentUnitCycle * tempPop;
                                }

                            }
                            else {
                                //add on top of already added 
                                for (k = 0; k < game_data.units.length - 1; k++) {
                                    var currentUnitCycle = parseInt(playersSupported[playerName][villageCoords][game_data.units[k]]) + parseInt($(checkboxes[i].parentElement.parentElement.parentElement).find("td.unit-item")[k].innerHTML);
                                    playersSupported[playerName][villageCoords][game_data.units[k]] = currentUnitCycle;
                                    tempPop = 1;
                                    if (game_data.units[k] == 'spy') tempPop = 2;
                                    if (game_data.units[k] == 'light') tempPop = 4;
                                    if (game_data.units[k] == 'marcher') tempPop = 5;
                                    if (game_data.units[k] == 'heavy') tempPop = 4;
                                    if (game_data.units[k] == 'ram') tempPop = 5;
                                    if (game_data.units[k] == 'catapult') tempPop = 8;
                                    if (game_data.units[k] == 'snob') tempPop = 100;

                                    playersSupported[playerName][villageCoords]["totalPop"] += parseInt($(checkboxes[i].parentElement.parentElement.parentElement).find("td.unit-item")[k].innerHTML) * tempPop;
                                }
                            }
                        }
                }
                else {
                    //not our filter, need to hide?
                    if (onlyShowOutsideSupport == true) {
                        checkboxes[i].parentNode.parentNode.parentNode.style.display = 'none';
                    }
                }
            }
            $('span#filterCount').html("Currently " + amountChecked + " filtered");
            for (var prop in playersSupported) {
                //make table for current player
                if (!playersSupported.hasOwnProperty(prop)) continue;
                var info = playersSupported[prop];
                console.log(info);
                createTable([[prop, "Population", "Coordinate"]], "header");
                exportTable += "[spoiler=Support at " + prop + "]\n[table][**]Coordinate[||]population[/**]\n";
                for (var lol = 0; lol < Object.keys(info).length; lol++) {
                    createTable([[" ", info[Object.keys(info)[lol]].totalPop,`<a href="${info[Object.keys(info)[lol]].link}">${Object.keys(info)[lol]}</a>`]]);
                    exportTable += `[*]${Object.keys(info)[lol]}[|]${info[Object.keys(info)[lol]].totalPop}`;
                    exportTable += "\n";
                }
                exportTable +="[/spoiler]"
                exportTable += "\n";

            }
            /*for (i = 0; i < $('#filterTable tr.header').length; i++) {
                collapse(i);
            }*/
            $('#textField')[0].value = exportTable;
            $('#exportTable')[0].style.display = "block";
        });

    }
    function createTable(tableData, style) {
        var tableBody = document.getElementById("filterTable");
        tableData.forEach(function (rowData) {
            var row = document.getElementById("filterTable").insertRow("-1");
            row.className = style;
            rowData.forEach(function (cellData) {
                var cell = document.createElement('td');
                
                $(cell).append(cellData)
                if (style == "header") {
                    cell.style.backgroundColor = "#c1a264";
                    cell.style.backgroundImage = "url('https://dsen.innogamescdn.com/asset/fa6f0423/graphic/screen/tableheader_bg3.png')";
                    cell.style.backgroundRepeat = "repeat-x";
                    cell.style.fontWeight = "bold";
                }
                row.appendChild(cell);
            });

            tableBody.appendChild(row);
        });
        
    }

    function deleterows(tableID, amount) {
        if (amount != 0) {
            var rowCount;
            while (amount > 0) {
                rowCount = document.getElementById(tableID).getElementsByTagName("tr").length;
                document.getElementById(tableID).deleteRow(rowCount - 1);
                amount--;
            }
        }
    }

}

/*function collapse(groupToMinimize) {
    var $currentRow = $($('#filterTable tr.header')[groupToMinimize])
    if ($('#filterTable tr.header')[groupToMinimize].children[2].children[0].src == window.location.origin + "/graphic/plus.png") {
        $('#filterTable tr.header')[groupToMinimize].children[2].children[0].src = "/graphic/minus.png";
        for (var i = 0; i < game_data.units.length - 1; i++) {
            $currentRow = $currentRow.next();
            $currentRow.show();
        }
    }
    else {
        $('#filterTable tr.header')[groupToMinimize].children[2].children[0].src = "/graphic/plus.png";
        for (var i = 0; i < game_data.units.length - 1; i++) {
            $currentRow = $currentRow.next();
            $currentRow.hide();
        }
    }
}*/

search_table();

function filterOffensiveSupport() {
    amount = 0;
    playersSupported = {};
    checkboxes = document.getElementsByClassName("village_checkbox");
    for (i = 0; i < checkboxes.length; i++) checkboxes[i].checked = false;

    for (i = 0; i < checkboxes.length; i++) {
        //checking if support is at another player
        supportedPlayer = checkboxes[i].nextElementSibling.nextElementSibling;
        if (typeof supportInfo == 'undefined') {
            var supportInfo = [
                {
                    axe: 0,
                    light: 0
                }
            ];
        }
        if (supportedPlayer) {
            // hide external support
            //checkboxes[i].parentNode.parentNode.parentNode.style.display = 'none';
        }
        else {
            playersSupported["player"] = supportInfo;
        }
        if ($("#units_table").find("tr:first th").length == 15) {
            axesInVillage = parseInt(checkboxes[i].parentElement.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML);
            supportInfo[0].axe = parseInt(supportInfo[0].axe) + axesInVillage;
            lightInVillage = parseInt(checkboxes[i].parentElement.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML);
            supportInfo[0].light = parseInt(supportInfo[0].light) + lightInVillage;
        }
        else {
            axesInVillage = parseInt(checkboxes[i].parentElement.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML);
            supportInfo[0].axe = parseInt(supportInfo[0].axe) + axesInVillage;
            lightInVillage = parseInt(checkboxes[i].parentElement.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML);
            supportInfo[0].light = parseInt(supportInfo[0].light) + lightInVillage;

        }
        if ((axesInVillage > 25 || lightInVillage > 3) && checkboxes[i].nextElementSibling.nextElementSibling == null) {
            // tick checkbox
            console.log("Discovered " + supportInfo[0].axe + " and " + supportInfo[0].light);
            checkboxes[i].checked = true;
            amount++;
        }
        else {
            // hiding unrelated rows
            //checkboxes[i].parentNode.parentNode.parentNode.style.display = 'none';
        }
    }

    amountChecked = 0;
    for (i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked == true)
            amountChecked++;
    }
    console.log("finished, found a total of " + amount + " supports and checked them");
    console.log("checked " + amountChecked + " out of a total of " + checkboxes.length);
    console.table(supportInfo)
    console.log("Selected " + supportInfo[0].axe + " axe and " + supportInfo[0].light + " light cavalry ");
}

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1.$2");
    return x;
}