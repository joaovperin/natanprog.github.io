javascript:
//Creator: Sophie "Shinko to Kuma"
var exportTable = "";
var playersSupported = {};
//grabbing all unit data/translations
var test;
$.get("/game.php?&screen=unit_info&ajax=data", function (data) {
    test = JSON.parse(data);
});


var langShinko = [
    "Support filter",
    "Select which page you want to go to",
    "Withdraw",
    "Send back",
    "Close this window",
    "Creator: ",
    "Filter",
    "Amount currently filtered",
    "Find only Offensive selfsupport",
    "Currently filtered: ",
    "Show only external support",
    "Filter for player/tribe",
    "Withdraw",
    "Leftover offense recalling currently broken",
    "Player",
    "Tribe",
    "Selection count",
    "Population",
    "After filtering export data will be placed here",
    "Support at/from "
];
if (game_data.locale == "en_DK") {
    langShinko = [
        "Support filter",
        "Select which page you want to go to",
        "Withdraw",
        "Send back",
        "Close this window",
        "Creator: ",
        "Filter",
        "Amount currently filtered",
        "Find only Offensive selfsupport",
        "Currently filtered: ",
        "Show only external support",
        "Filter for player/tribe",
        "Withdraw",
        "Leftover offense recalling currently broken",
        "Player",
        "Tribe",
        "Selection count",
        "Population",
        "After filtering export data will be placed here",
        "Support at/from "
    ];
}
if (game_data.locale == "el_GR") {
    langShinko = [
        "Φιλτράρισμα Βοηθειών",
        "Διάλεξε την σελίδα στην οποία θέλεις να κατευθυνθείς",
        "Τράβα άμυνες",
        "Στείλε άμυνες πίσω",
        "Κλείσιμο",
        "Δημιουργός: ",
        "Φίλτρο",
        "Φιλτραρισμένα",
        "Εύρεση μόνο επιθετικών δικών σου μονάδων",
        "φιλτραρισμένα μέχρι στιγμής: ",
        "Δείξε μόνο βοήθεια προς τα έξω",
        "Φιλτράρισμα για παίκτη/φυλή",
        "Τράβα άμυνες",
        "Αυτή η λειτουργία δεν είναι διαθέσιμη",
        "Παίκτης",
        "Φυλή",
        "Υπολογισμός επιλεγμένων",
        "Πληθυσμός",
        "Αφού έχουν φιλτραριστεί, τα δεδομένα θα εξαχθούν εδώ",
        "Βοήθειες σε/από"
    ];
}
if (game_data.locale == "nl_NL") {
    langShinko = [
        "Support filter",
        "Select which page you want to go to",
        "Withdraw",
        "Send back",
        "Close this window",
        "Creator: ",
        "Filter",
        "Amount currently filtered",
        "Find only Offensive selfsupport",
        "Currently filtered: ",
        "Show only external support",
        "Filter for player/tribe",
        "Withdraw",
        "Leftover offense recalling currently broken",
        "Player",
        "Tribe",
        "Selection count",
        "Population",
        "After filtering export data will be placed here",
        "Support at/from"
    ];
}
if (game_data.locale == "it_IT") {
    langShinko = [
        "Filtra supporti",
        "Seleziona la pagina a cui vuoi andare",
        "Ritira",
        "Manda indietro",
        "Chiudi questa finestra",
        "Creatrice: ",
        "Filtro",
        "Numero villaggi filtrati",
        "Trova solo autosupporti offensivi",
        "Attualmente filtrati: ",
        "Mostra solo supporti esterni",
        "Filtra per giocatore/tribù",
        "Ritira",
        "Funzione attualmente non disponibile",
        "Giocatore",
        "Tribù",
        "Numero selezionati",
        "Popolazione",
        "Qui verranno mostrati i dati dopo aver applicato i filtri",
        "Supporto a/da "
    ];
}



//if not on correct page yet, ask which page to go to
if (window.location.href.indexOf('overview_villages&mode=units&type=away_detail&group=0&page=-1&type=away_detail') < 0 && window.location.href.indexOf('overview_villages&mode=units&type=away_detail&group=0&page=-1&type=support_detail') < 0) {

    var content = `<div style=max-width:1000px;>
    <h2 class="popup_box_header">
       <center><u>
          <font color="darkgreen">${langShinko[0]}</font>
          </u>
       </center>
    </h2>
    <hr>
    <p>
    <center>
       <font color=maroon><b>${langShinko[1]}</b>
       </font>
    </center>   
    </p>
    <center> <table><tr><td><center><input type="button" 
       class="btn evt-confirm-btn btn-confirm-yes" id="withdraw"
       value="${langShinko[2]}">&emsp;</center></td></tr>
       <tr></tr>
       <tr><td><center><input type="button"
          class="btn evt-cancel-btn btn-confirm-yes" id="sendback"
          value="${langShinko[3]}">&emsp;</center></td></tr>
          <tr></tr>
       <tr><td><center><input type="button"  class="btn evt-cancel-btn btn-confirm-no"
          id="close_this" value="${langShinko[4]}">&emsp;</center></td></tr>
          </table>
    </center>
    <br>
    <hr>
    <center><img class="tooltip-delayed"
       title="<font color=darkgreen>Sophie -Shinko to Kuma-</font>"
       src="https://dl.dropboxusercontent.com/s/0do4be4rzef4j30/sophie2.gif"
       style="cursor:help; position: relative"></center>
    <br>
    <center>
       <p>${langShinko[5]}<a
          href="https://forum.tribalwars.net/index.php?members/shinko-to-kuma.121220/"
          title="Sophie profile" target="_blank">Sophie "Shinko
          to Kuma"</a>
       </p>
    </center>
 </div>`;
    Dialog.show('Supportfilter', content);
    $("#withdraw").click(function () {
        window.location.assign(game_data.link_base_pure + "overview_villages&mode=units&type=away_detail&group=0&page=-1&type=away_detail");
    });
    $("#sendback").click(function () {
        window.location.assign(game_data.link_base_pure + "overview_villages&mode=units&type=away_detail&group=0&page=-1&type=support_detail");
    });
    $("#close_this").click(function () {
        var close_this = document.getElementsByClassName(
            'popup_box_close');
        close_this[0].click();
    });
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
                            <th>${langShinko[6]}</th>
                            <th style="text-align:center" width="">${langShinko[7]}</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>${langShinko[8]}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <td>
                            <input type="text" ID="search_field_input" name="filter" size="20" margin="5" align=left>
                        </td>
                        <td>
                            <span id="filterCount">${langShinko[9]} 0</span>
                        </td>
                        <td>
                            <input type="checkbox" ID="showOnlyFiltered" name="showOnlyFiltered"> ${langShinko[10]}
                        </td>

                        <td margin="5">
                            <button type="button" ID="button" class="btn-confirm-yes" >${langShinko[11]}</button>
                        </td>
                        <td margin="5">
                            <button type="button" ID="${langShinko[12]}" class="btn" ></button>
                        </td>
                        <td margin="5">
                        ${langShinko[13]}
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
        $('#supportQuery').prepend(`<div id="exportTable" style="display:none"><textarea id="textField" cols="60" rows="2" placeholder="${langShinko[18]}"></textarea></div>`);
        document.getElementById(langShinko[12]).innerText = langShinko[12];
        $('#' + langShinko[12]).click(function () {
            document.getElementsByName("submit_units_back")[0].click();
        });

        document.getElementById("showOnlyFiltered").addEventListener("change", function () {
            if (document.getElementById("showOnlyFiltered").checked == true) {
                onlyShowOutsideSupport = true;
            }
            else {
                onlyShowOutsideSupport = false;
            }
        });



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
                <th>${langShinko[14]}</th>
                <th>${langShinko[15]}</th>
                <th>${langShinko[16]}</th>
                <th>${langShinko[17]}</th>
                <th></th>
            </tr>`);
            exportTable = "";
            var input, filter, i;
            input = document.getElementById("search_field_input");
            filter = input.value.toUpperCase();
            checkboxes = document.getElementsByClassName("village_checkbox");


            //clearing population counts for each player/village
            for (i = 0; i < Object.keys(playersSupported).length; i++) {
                playersSupported[Object.keys(playersSupported)[i]][0]["count"] = 0;
                playersSupported[Object.keys(playersSupported)[i]][0]["population"] = 0;
                playersSupported[Object.keys(playersSupported)[i]][0]["totalPop"] = 0;
                for (village = 0; village < Object.keys(playersSupported[Object.keys(playersSupported)[i]]).length; village++) {
                    //set totalPop to 0
                    playersSupported[Object.keys(playersSupported)[i]][village]["totalPop"] = 0;

                }
            }
            //clearing population counts for each player/village
            if (typeof supportInfo != "undefined") {
                supportInfo[Object.keys(supportInfo)[0]]["count"] = 0;
                supportInfo[Object.keys(supportInfo)[0]]["population"] = 0;
                supportInfo[Object.keys(supportInfo)[0]]["totalPop"] = 0;
                for (i = 0; i < Object.keys(supportInfo).length; i++) {

                    for (village = 0; village < Object.keys(supportInfo[Object.keys(supportInfo)[i]]).length; village++) {
                        //set totalPop to 0
                        supportInfo[Object.keys(supportInfo)[i]]["totalPop"] = 0;

                    }
                }
            }
            //reseting all checkboxes and counter
            amountChecked = 0;
            count = 0;
            for (i = 0; i < checkboxes.length; i++) checkboxes[i].checked = false;

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
                    if (!supportInfo) {
                        supportInfo = [
                            {
                                name: playerName,
                                tribe: tribeName,
                                count: 0,
                                population: 0
                            }

                        ];
                        for (j = 0; j < game_data.units.length; j++) {
                            var unit = game_data.units[j];
                            var item = {};
                            item[unit] = 0;
                            supportInfo.push(item);
                        }
                        playersSupported[supportedPlayer.innerHTML] = supportInfo;
                    }

                    //check if support is at the right player
                    if (supportedPlayer.innerHTML.toUpperCase().indexOf(filter) > -1) {
                        checkboxes[i].checked = true;
                        amountChecked++;
                        supportInfo[0].count++;
                        supportInfo[0].population = 0;
                        for (k = 0; k < game_data.units.length - 1; k++) {
                            var currentUnitCycle = parseInt(supportInfo[k + 1][game_data.units[k]]) + parseInt($(checkboxes[i].parentElement.parentElement.parentElement).find("td.unit-item")[k].innerHTML);
                            supportInfo[k + 1][game_data.units[k]] = currentUnitCycle
                        }
                    }
                    else
                        //check if filtered on tribe instead
                        if (checkboxes[i].nextElementSibling.nextElementSibling.nextElementSibling.innerHTML.toUpperCase().indexOf(filter) > -1) {
                            checkboxes[i].checked = true;
                            amountChecked++;
                            supportInfo[0].count++;
                            for (k = 0; k < game_data.units.length - 1; k++) {
                                var currentUnitCycle = parseInt(supportInfo[k + 1][game_data.units[k]]) + parseInt($(checkboxes[i].parentElement.parentElement.parentElement).find("td.unit-item")[k].innerHTML);
                                supportInfo[k + 1][game_data.units[k]] = currentUnitCycle
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
                if (!playersSupported.hasOwnProperty(prop)) continue;
                var info = playersSupported[prop];
                console.log(info);

                for (var k = 1; k < Object.keys(info).length - 1; k++) {
                    var tempPop = 1;
                    if (Object.keys(info[k]) == 'spy') tempPop = 2;
                    if (Object.keys(info[k]) == 'light') tempPop = 4;
                    if (Object.keys(info[k]) == 'marcher') tempPop = 5;
                    if (Object.keys(info[k]) == 'heavy') tempPop = 6;
                    if (Object.keys(info[k]) == 'ram') tempPop = 5;
                    if (Object.keys(info[k]) == 'catapult') tempPop = 8;
                    if (Object.keys(info[k]) == 'snob') tempPop = 100;
                    info[0].population += info[k][Object.keys(info[k])[0]] * tempPop;
                }
                createTable([[info[0].name, info[0].tribe, numberWithCommas(info[0].count), numberWithCommas(info[0].population) + " " + langShinko[17], ""]], "header");
                exportTable += "[spoiler=" + langShinko[19] + " " + info[0].name + "]\n[table][**]" + info[0].name + "[||]" + info[0].tribe + "[||]" + numberWithCommas(info[0].count) + "[||]" + numberWithCommas(info[0].population) + "[||]" + langShinko[17] + "[/**]\n";
                for (var i = 0; i < game_data.units.length - 1; i++) {
                    createTable([["", test.unit_data[game_data.units[i]].shortname, numberWithCommas(info[i + 1][game_data.units[i]]), "", ""]]);
                    exportTable += `[*][|][unit]${game_data.units[i]}[/unit][|]` + numberWithCommas(info[i + 1][game_data.units[i]]);
                    exportTable += "\n";
                }
                exportTable += "[/table][/spoiler]\n";
            }
            for (i = 0; i < $('#filterTable tr.header').length; i++) {
                collapse(i);
            }
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
                cell.appendChild(document.createTextNode(cellData));
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
        for (i = 0; i < $('#filterTable tr.header').length; i++) {
            $('#filterTable tr.header')[i].children[4].innerHTML = `<img data-hidden="false" class="toggle" style="display:block; margin-left: auto; margin-right: auto;cursor:pointer;" src="graphic/minus.png" onclick=collapse(` + i + `)></img>`;
        }
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

function collapse(groupToMinimize) {
    var $currentRow = $($('#filterTable tr.header')[groupToMinimize])
    if ($('#filterTable tr.header')[groupToMinimize].children[4].children[0].src == window.location.origin + "/graphic/plus.png") {
        $('#filterTable tr.header')[groupToMinimize].children[4].children[0].src = "/graphic/minus.png";
        for (var i = 0; i < game_data.units.length - 1; i++) {
            $currentRow = $currentRow.next();
            $currentRow.show();
        }
    }
    else {
        $('#filterTable tr.header')[groupToMinimize].children[4].children[0].src = "/graphic/plus.png";
        for (var i = 0; i < game_data.units.length - 1; i++) {
            $currentRow = $currentRow.next();
            $currentRow.hide();
        }
    }
}

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