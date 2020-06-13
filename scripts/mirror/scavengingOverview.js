javascript:

//scav overview by Sophie "Shinko to Kuma"

if (game_data.player.sitter > 0) {
    URLReq = `game.php?t=${game_data.player.id}&screen=place&mode=scavenge_mass`;
}
else {
    URLReq = "game.php?&screen=place&mode=scavenge_mass";
}
var scavengeInfo = [];
var categoryNames;
var html = "";
//classes CSS
cssClassesSophie = `
  <style>
  .sophRowA {
  background-color: #32353b;
  color: white;
  padding:5px;
  }
  .sophRowB {
  background-color: #36393f;
  color: white;
  padding:5px;
  }
  .sophHeader {
  background-color: #202225;
  font-weight: bold;
  color: white;
  padding:5px;
  }
  </style>`
$(".content-border").eq(0).prepend(cssClassesSophie);
$("#mobileHeader").eq(0).prepend(cssClassesSophie);


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

URLs = [];
$.get(URLReq, function (data) {
    if ($(data).find(".paged-nav-item").length > 0) {
        amountOfPages = parseInt($(data).find(".paged-nav-item")[$(data).find(".paged-nav-item").length - 1].href.match(/page=(\d+)/)[1]);
    }
    else {
        amountOfPages = 0;
    }
    console.log("Amount of pages: " + amountOfPages);
    categoryNames = JSON.parse("[" + $(data).find('script:contains("ScavengeMassScreen")')[0].innerHTML.match(/\{.*\:\{.*\:.*\}\}/g) + "]")[0];
    for (var i = 0; i <= amountOfPages; i++) {
        //push url that belongs to scavenging page i
        URLs.push(URLReq + "&page=" + i);
        //get world data
        tempData = JSON.parse($(data).find('script:contains("ScavengeMassScreen")').html().match(/\{.*\:\{.*\:.*\}\}/g)[0]);
        duration_exponent = tempData[1].duration_exponent;
        duration_factor = tempData[1].duration_factor;
        duration_initial_seconds = tempData[1].duration_initial_seconds;
    }
    console.log(URLs);

})
    .done(function () {
        html = "<div><table class='sophHeader'><tr class='sophHeader'><td class='sophHeader'colspan='5'><h1><center>Mass scavenging overview</center></h1></td></tr><tr class='sophHeader'><td class='sophHeader'>Village</td><td class='sophHeader'>" + categoryNames[1].name + "</td><td class='sophHeader'>" + categoryNames[2].name + "</td><td class='sophHeader'>" + categoryNames[3].name + "</td><td class='sophHeader'>" + categoryNames[4].name + "</td></tr>";
        //here we get all the village data and make an array with it, we won't be able to parse unless we add brackets before and after the string
        arrayWithData = "[";
        $.getAll(URLs,
            (i, here) => {
                thisPageData = $(here).find('script:contains("ScavengeMassScreen")').html().match(/\{.*\:\{.*\:.*\}\}/g)[2];
                arrayWithData += thisPageData + ",";
            },
            () => {
                //on done
                arrayWithData = arrayWithData.substring(0, arrayWithData.length - 1);
                //closing bracket so we can parse the data into a useable array
                arrayWithData += "]";
                scavengeInfo = JSON.parse(arrayWithData);

                //get all the data in a table
                $.each(scavengeInfo, function (villageNr) {
                    if (villageNr % 2 == 0) {
                        rowClass = 'class="sophRowA"'
                    }
                    else {
                        rowClass = 'class="sophRowB"'
                    }
                    html += `<tr ${rowClass}><td class="sophHeader">${scavengeInfo[villageNr].village_name}</td>`;
                    $.each(scavengeInfo[villageNr]["options"], function (villageCategoryNr) {

                        if (scavengeInfo[villageNr]["options"][villageCategoryNr]["scavenging_squad"] != null) {
                            endTime = parseInt(scavengeInfo[villageNr]["options"][villageCategoryNr]["scavenging_squad"]["return_time"]) * 1000;
                            html += `<td ${rowClass}><span class="timer" data-endtime=${parseInt(endTime / 1000)}></span></td>`
                        }
                        else {
                            if (scavengeInfo[villageNr]["options"][villageCategoryNr]["is_locked"] != true) {
                                html += `<td ${rowClass}>No run</td>`
                            }
                            else
                            {
                                html += `<td ${rowClass}>LOCKED</td>`
                            }
                        }
                    })
                    html += "</tr>";
                })
                html += "</table></div>";
                $("#contentContainer").eq(0).prepend(html);
                $("#mobileContent").eq(0).prepend(html);
                Timing.tickHandlers.timers.init();
            },
            (error) => {
                console.error(error);
            });
    }
    )

