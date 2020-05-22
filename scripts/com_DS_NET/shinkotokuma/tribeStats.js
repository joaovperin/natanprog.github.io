javascript:


/*if (window.location.href.indexOf('screen=ally&mode=members') < 0) {
    //relocate
    window.location.assign(game_data.link_base_pure + "ally&mode=members");
}*/
// Sophie "Shinko to Kuma"
var tribeTable='';
var rowStart=1;
var columnStart=6;
var columnName=0;
var rows;
if (window.location.href.indexOf('screen=ally&mode=members') >-1)
{
    //members own tribe
    tribeTable= "#content_value table.vis";
    rowStart=3;
    columnStart=6;
    columnName=0;
    rows = $($("table .vis")[2]).find('tr');
}
if  (window.location.href.indexOf('&screen=info_ally') >-1)
{
    //any tribe
    tribeTable= ".vis:eq(2)";
    rowStart=1;
    columnStart=5;
    columnName=0;
    rows = $($("table .vis")[2]).find('tr');
}
if (window.location.href.indexOf('screen=ranking&mode=player') >-1 || (window.location.href.indexOf('screen=ranking') >-1 && window.location.href.indexOf('&mode') == -1))
{
    //any player
    tribeTable= ".vis:eq(1)";
    rowStart=1;
    columnStart=6;
    columnName=1;
    rows = $($("table .vis")[1]).find('tr');
}


$.getAll = function (
    urls, // array of URLs
    onLoad, // called when any URL is loaded, params (index, data)
    onDone, // called when all URLs successfully loaded, no params
    onError // called when a URL load fails or if onLoad throws an exception, params (error)
) {
    var numDone = 0;
    var lastRequestTime = 0;
    var minWaitTime = 200; // ms between requests
    loadNext();
    function loadNext() {
        if (numDone == urls.length) {
            onDone();
            return;
        }

        let now = Date.now();
        let timeElapsed = now - lastRequestTime;
        if (timeElapsed < minWaitTime) {
            let timeRemaining = minWaitTime - timeElapsed;
            setTimeout(loadNext, timeRemaining);
            return;
        }
        console.log('Getting ', urls[numDone]);
        $("#progress").css("width", `${(numDone + 1) / urls.length * 100}%`);
        lastRequestTime = now;
        $.get(urls[numDone])
            .done((data) => {
                try {
                    onLoad(numDone, data);
                    ++numDone;
                    loadNext();
                } catch (e) {
                    onError(e);
                }
            })
            .fail((xhr) => {
                onError(xhr);
            })
    }
};
var names = [];

for (var i = 1; i < rows.length; i++) {
    names.push($(rows[i]).find('a')[0].innerText.trim().split(' ').join('+'));
}

linksODS = [];
linksODD = [];
linksODA = [];
linksLoot = [];
linksGathering = [];
ODSperPlayer = [];
ODDperPlayer = [];
ODAperPlayer = [];
lootperPlayer = [];
gatheredperPlayer = [];
for (var i = 0; i < names.length; i++) {
    linksODA.push("/game.php?screen=ranking&mode=in_a_day&type=kill_att&name=" + names[i]);
    linksODS.push("/game.php?screen=ranking&mode=in_a_day&type=kill_sup&name=" + names[i]);
    linksODD.push("/game.php?screen=ranking&mode=in_a_day&type=kill_def&name=" + names[i]);
    linksLoot.push("/game.php?screen=ranking&mode=in_a_day&type=loot_res&name=" + names[i]);
    linksGathering.push("/game.php?screen=ranking&mode=in_a_day&type=scavenge&name=" + names[i]);
}
$(tribeTable+" tr").eq(rowStart-1).append("<th onclick='sortTableTest("+columnStart+")'>ODA</th><th onclick='sortTableTest("+(columnStart+1)+")'>ODD</th><th onclick='sortTableTest("+(columnStart+2)+")'>ODS</th><th onclick='sortTableTest("+(columnStart+3)+")'>Loot</th><th onclick='sortTableTest("+(columnStart+4)+")'>Gathered</th><th onclick='sortTableTest("+(columnStart+5)+")'>Combined</th>")
$(tribeTable).eq(rowStart-1).attr('id', 'tableMembers');
$("#contentContainer").eq(0).prepend(`
                <div id="progressbar" style="width: 100%;
                background-color: #36393f;"><div id="progress" style="width: 0%;
                height: 35px;
                background-color: #4CAF50;
                text-align: center;
                line-height: 32px;
                color: black;"></div>
                </div>`);
$("#mobileHeader").eq(0).prepend(`
                <div id="progressbar" style="width: 100%;
                background-color: #36393f;"><div id="progress" style="width: 0%;
                height: 35px;
                background-color: #4CAF50;
                text-align: center;
                line-height: 32px;
                color: black;"></div>
                </div>`);
//ODA
$.getAll(linksODA, (i, data) => {
    if ($(data).find(".lit-item")[3] != undefined) {
        temp = $(data).find(".lit-item")
        ODAperPlayer.push([temp[3].innerText, temp[4].innerText]);
    }
    else {
        ODAperPlayer.push(["0", "Never"]);
    }

},
    () => {
        $("#progress").css("width", `${(linksODA.length) / linksODA.length * 100}%`);
        for (var o = rowStart; o < ODAperPlayer.length + rowStart; o++) {
            $(tribeTable +" tr").eq(o).append("<td title=" + ODAperPlayer[o - rowStart][1] + ">" + ODAperPlayer[o - rowStart][0] + "</td>")
        }
        //ODD
        $.getAll(linksODD, (i, data) => {
            if ($(data).find(".lit-item")[3] != undefined) {
                temp = $(data).find(".lit-item")
                ODDperPlayer.push([temp[3].innerText, temp[4].innerText]);
            }
            else {
                ODDperPlayer.push(["0", "Never"]);
            }

        },
            () => {
                for (var o = rowStart; o < ODDperPlayer.length + rowStart; o++) {
                    $(tribeTable +" tr").eq(o).append("<td title=" + ODDperPlayer[o - rowStart][1] + ">" + ODDperPlayer[o - rowStart][0] + "</td>")
                }
                //ODS
                $.getAll(linksODS, (i, data) => {
                    if ($(data).find(".lit-item")[3] != undefined) {
                        temp = $(data).find(".lit-item")
                        ODSperPlayer.push([temp[3].innerText, temp[4].innerText]);
                    }
                    else {
                        ODSperPlayer.push(["0", "Never"]);
                    }

                },
                    () => {
                        for (var o = rowStart; o < ODSperPlayer.length + rowStart; o++) {
                            $(tribeTable +" tr").eq(o).append("<td title=" + ODSperPlayer[o - rowStart][1] + ">" + ODSperPlayer[o - rowStart][0] + "</td>")
                        }

                        //loot
                        $.getAll(linksLoot, (i, data) => {
                            if ($(data).find(".lit-item")[3] != undefined) {
                                temp = $(data).find(".lit-item")
                                lootperPlayer.push([temp[3].innerText, temp[4].innerText]);
                            }
                            else {
                                lootperPlayer.push(["0", "Never"]);
                            }

                        },
                            () => {
                                for (var o = rowStart; o < lootperPlayer.length + rowStart; o++) {
                                    $(tribeTable +" tr").eq(o).append("<td title=" + lootperPlayer[o - rowStart][1] + ">" + lootperPlayer[o - rowStart][0] + "</td>")
                                }
                                //gathering
                                $.getAll(linksGathering, (i, data) => {
                                    if ($(data).find(".lit-item")[3] != undefined) {
                                        temp = $(data).find(".lit-item")
                                        gatheredperPlayer.push([temp[3].innerText, temp[4].innerText]);
                                    }
                                    else {
                                        gatheredperPlayer.push(["0", "Never"]);
                                    }

                                },
                                    () => {
                                        for (var o = rowStart; o < gatheredperPlayer.length + rowStart; o++) {
                                            $(tribeTable +" tr").eq(o).append("<td title=" + gatheredperPlayer[o - rowStart][1] + ">" + gatheredperPlayer[o - rowStart][0] + "</td>")
                                            $(tribeTable +" tr").eq(o).append("<td>" + (parseInt(gatheredperPlayer[o - rowStart][0].replace(".", ""))+ parseInt(lootperPlayer[o - rowStart][0].replace(".", ""))) + "</td>")
                                        }

                                        $("#progress").remove();

                                    },
                                    (error) => {
                                        console.error(error);
                                    });
                            },
                            (error) => {
                                console.error(error);
                            });
                    },
                    (error) => {
                        console.error(error);
                    });

            },
            (error) => {
                console.error(error);
            });



    },
    (error) => {
        console.error(error);
    });




function sortTableTest(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("tableMembers");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName("td")[n];
            y = rows[i + 1].getElementsByTagName("td")[n];
            /* Check if the two rows should switch place,
            based on the direction, asc or desc: */
            if (dir == "asc") {
                if (Number(x.innerHTML.replace(/\./g, '')) > Number(y.innerHTML.replace(/\./g, ''))) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (Number(x.innerHTML.replace(/\./g, '')) < Number(y.innerHTML.replace(/\./g, ''))) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}
