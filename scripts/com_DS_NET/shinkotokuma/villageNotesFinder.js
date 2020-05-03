javascript:
if (window.location.href.indexOf('map') < 0) {
    window.location.assign(game_data.link_base_pure + "map");
}
var villageIDs = [];
var creator = [];
var data = [];
var langShinko={ "en_DK": {
    "player": "Player:",
    "coord": "Coordinates:"
    },
    "it_IT": {
    "player": "Giocatore:",
    "coord": "Coordinate:"
    }
  }

//check all icons on minimap
for (key in TWMap.villageIcons) {
    //check for a note property to find the village notes
    for (property in TWMap.villageIcons[key]) {
        if (property == "note") {
            console.log(key);
            if (TWMap.villageIcons[key].note.img.includes("village_notes") == true) {
                id = key;
                //creatorType = TWMap.villageIcons[key].note.img.match(/village_notes_(\d)/)[1];
                villageIDs.push(id);
                /*if (creatorType == 1) {
                    //own village note
                    creator.push("own");
                } else {
                    //someone elses note
                    creator.push("someone else");
                }*/

            }
        }
    }
}



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


//function to get multiple urls
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


infoURLs = [];
for (var i = 0; i < villageIDs.length; i++) {
    infoURLs.push(`/game.php?&screen=info_village&id=${villageIDs[i]}`);
}
villagesHTML = "";
var tempRow;
$.getAll(infoURLs,
    (i, blabla) => {
        thisVillaNotes = $(blabla).find(".village-notes-container")[0].innerHTML;
        thisVillaName = $(blabla).find(".icon.header.village")[1].parentElement.innerText;
        thisVillaCoordinate = $(blabla).find("td:contains('"+langShinko[game_data.locale]["coord"]+"')").next()[2].innerText;
        if ($(blabla).find("td:contains('Player:')").length != 0) {
            thisVillaPlayer = $(blabla).find("td:contains('"+langShinko[game_data.locale]["player"]+"')").next()[2].innerText;
            thisVillaPlayerID = $(blabla).find("td:contains('"+langShinko[game_data.locale]["player"]+"')").next()[2].children[0].href.match(/id=(\d*)/)[1];
            thisVillaPlayerID=`<a href="/game.php?&screen=info_player&id=${thisVillaPlayerID}">${thisVillaPlayer}</a>`
        }
        else {
            thisVillaPlayerID = "Barbarians :D";
        }

        if (i % 2 == 0) {
            tempRow = "class='row_b'";
        }
        else {
            tempRow = "class='row_a'";
        }
        urlParams = new URLSearchParams(infoURLs[i]);
        myParam = urlParams.get('id');
        villagesHTML += `<tr ${tempRow}><td><a href ="${infoURLs[i]}">${thisVillaName}</a></td><td>${thisVillaPlayerID}</td><td><a href ="${infoURLs[i]}">${thisVillaCoordinate}</a></td><td id="${myParam}">${thisVillaNotes}</td></tr>`
    },
    () => {
        //on done
        htmlCode = `
            <div id="villageNotes" class="vis" border=0>
                <table id="tableNotes" width="100%" border=1>
                    <tbody id="appendHere">
                        <tr>
                            <th colspan=6 width=“550” style="text-align:center" >Village notes</th>
                        </tr>
                        <tr>
                            <th width="15%" style="text-align:center">Vil name</th>
                            <th width="15%" style="text-align:center">Vilowner</th>
                            <th width="5%" style="text-align:center">Coord</th>
                            <th width="65%">
                                <font size="1">Script created by Sophie "Shinko to Kuma"</font>
                            </th>
                        </tr>
                        ${villagesHTML}
                    </tbody>
                </table>
            </div>`;

        $("#contentContainer").eq(0).prepend(htmlCode);
        for(var k=0;k<$(".float_right.tooltip.village-note-delete").length;k++)
        {
            
            $(".float_right.tooltip.village-note-delete")[k].onclick = function(){
                idToDelete=this.parentElement.parentElement.parentElement.parentElement.id;
                deleteNote(idToDelete);
                this.parentElement.parentElement.parentElement.parentElement.innerHTML="";
            };
        }
    },
    (error) => {
        console.error(error);
    });

function deleteNote(villageID) {
    var e = { "village_id": villageID, "note": "" };
    TribalWars.post("api", {
        ajaxaction: "village_note_edit",
    }, e, function () {
        UI.SuccessMessage("Succesfully deleted message");
    },
        !1
    );
}