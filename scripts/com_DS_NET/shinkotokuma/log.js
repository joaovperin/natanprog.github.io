javascript:

if (window.location.href.indexOf('premium&mode=log&page=') < 0) {
    //relocate
    window.location.assign(game_data.link_base_pure + "premium&mode=log&page=0");
}

var langShinko={ "en_DK": {
        "Purchase": "Purchase",
        "Premium Exchange":"Premium Exchange",
        "Points redeemed":"Points redeemed",
        "Transfer":"Transfer",
        "Sold":"sold"
    },
    "nl_NL": {
        "Purchase": "Koop",
        "Premium Exchange":"Premium Beurs",
        "Points redeemed":"Ingezet",
        "Transfer":"Overdragen",
        "Sold":"Gehandeld voor"
    },
    "it_IT": {
        "Purchase": "Ottieni",
        "Premium Exchange":"Cambio del Premium",
        "Points redeemed":"Utilizzati",
        "Transfer":"Trasferiti",
        "Sold":"venduto"
    },
    "el_GR": {
        "Purchase": "Ottieni",
        "Premium Exchange":"premium beurs",
        "Points redeemed":"Utilizzati",
        "Transfer":"Trasferiti",
        "Sold":"venduto"
    }

  }
  var worldDataBase={};

baseURL = "/game.php?&screen=premium&mode=log&page=";
amountOfPages = parseInt($(".paged-nav-item")[$(".paged-nav-item").length - 1].href.match(/page=(\d+)/)[1]);
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
var URLs = [];
var purchases = [];
var spending = [];
var farmed=[];
var totalBought = 0;
var totalSpent = 0;
var totalFarmed=0;
for (var i = 0; i <= amountOfPages; i++) {
    URLs.push(baseURL + i);
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


$.getAll(URLs,
    (i, data) => {
        console.log("Grabbing page "+i);
        tempRows=$(data).find("table .vis> tbody > tr");
        for (var j = 0; j < tempRows.length - 2; j++) {
            // buying
            if (tempRows[j + 2].children[2].innerText.indexOf(langShinko[game_data.locale]["Purchase"])>-1){
                console.log("Found a purchase!");
                if (typeof worldDataBase[tempRows[j + 2].children[1].innerText]=="undefined")
                {
                    worldDataBase[tempRows[j + 2].children[1].innerText]={"Purchases":0,"Spending":0,"Farming":0};
                }
                purchases.push({"Date":tempRows[j + 2].children[0].innerText,"World":tempRows[j + 2].children[1].innerText,"Transaction":tempRows[j + 2].children[2].innerText,"Amount":tempRows[j + 2].children[3].innerText,"newTotal":tempRows[j + 2].children[4].innerText,"moreInformation":tempRows[j + 2].children[5].innerText});
                worldDataBase[tempRows[j + 2].children[1].innerText]["Purchases"]+=parseInt(tempRows[j + 2].children[3].innerText);
                totalBought +=parseInt(tempRows[j + 2].children[3].innerText);
            }
            // spending
            if (tempRows[j + 2].children[2].innerText.indexOf(langShinko[game_data.locale]["Premium Exchange"])>-1 || tempRows[j + 2].children[2].innerText.indexOf(langShinko[game_data.locale]["Points redeemed"])>-1 ){
                console.log("Found a spending!");
                spending.push({"Date":tempRows[j + 2].children[0].innerText,"World":tempRows[j + 2].children[1].innerText,"Transaction":tempRows[j + 2].children[2].innerText,"Amount":tempRows[j + 2].children[3].innerText,"newTotal":tempRows[j + 2].children[4].innerText,"moreInformation":tempRows[j + 2].children[5].innerText});
                totalSpent +=parseInt(tempRows[j + 2].children[3].innerText);
                if (typeof worldDataBase[tempRows[j + 2].children[1].innerText]=="undefined")
                {
                    worldDataBase[tempRows[j + 2].children[1].innerText]={"Purchases":0,"Spending":0,"Farming":0};
                }
                worldDataBase[tempRows[j + 2].children[1].innerText]["Spending"]+=-parseInt(tempRows[j + 2].children[3].innerText);
            }
            //pp farm
            if (tempRows[j + 2].children[2].innerText.indexOf(langShinko[game_data.locale]["Transfer"])>-1 && (tempRows[j + 2].children[5].innerText.indexOf(langShinko[game_data.locale]["Sold"])>-1 ||tempRows[j + 2].children[5].innerText.indexOf(langShinko[game_data.locale]["Premium Exchange"])>-1 ) ){
                console.log("Found a pp farm!");
                farmed.push({"Date":tempRows[j + 2].children[0].innerText,"World":tempRows[j + 2].children[1].innerText,"Transaction":tempRows[j + 2].children[2].innerText,"Amount":tempRows[j + 2].children[3].innerText,"newTotal":tempRows[j + 2].children[4].innerText,"moreInformation":tempRows[j + 2].children[5].innerText});
                if (typeof worldDataBase[tempRows[j + 2].children[1].innerText]=="undefined")
                {
                    worldDataBase[tempRows[j + 2].children[1].innerText]={"Purchases":0,"Spending":0,"Farming":0};
                }
                worldDataBase[tempRows[j + 2].children[1].innerText]["Farming"]+=parseInt(tempRows[j + 2].children[3].innerText);
                totalFarmed +=parseInt(tempRows[j + 2].children[3].innerText);
            }
            // gifted to others

            // gifts received

        }
    },
    () => {
        console.log("Total bought: "+ totalBought);
        console.table(purchases);
        html=`
        <tr>
            <th colspan=6>
                <center>PP Purchase log</center>
            </th>
        </tr>
        <tr>
            <th colspan=6>
            <center><h2>Total pp spent: ${-totalSpent}</h2></center>
            </th>
        </tr>
        <tr>
            <th colspan=6>
            <center><h2>Total pp farmed: ${totalFarmed}</h2></center>
            </th>
        </tr>
        <tr>
            <th colspan=2>World</th>
            <th>Purchases</th>
            <th>Spending</th>
            <th>Farmed</th>
            <th>Difference</th>
        </tr>
        `;
        for(var i=0;i<Object.keys(worldDataBase).length;i++)
        {
            html+=`
            <tr>
                <td colspan=2>${Object.keys(worldDataBase)[i]}</td>
                <td>${worldDataBase[Object.keys(worldDataBase)[i]]["Purchases"]}</td>
                <td>${worldDataBase[Object.keys(worldDataBase)[i]]["Spending"]}</td>
                <td>${worldDataBase[Object.keys(worldDataBase)[i]]["Farming"]}</td>
                <td>${worldDataBase[Object.keys(worldDataBase)[i]]["Farming"]-worldDataBase[Object.keys(worldDataBase)[i]]["Spending"]+worldDataBase[Object.keys(worldDataBase)[i]]["Purchases"]}
            </tr>`
        }
        html+=`
            <tr>
                <th colspan=6>
                    <center><h2>Total pp bought: ${totalBought}</h2></center>
                </th>
            </tr>
            <tr>
                <th>
                    Date
                </th>
                <th>
                    World
                </th>
                <th>
                    Transaction
                </th>
                <th>
                    Amount
                </th>
                <th>
                    New total
                </th>
                <th>
                    More information
                </th>
            </tr>`;
        for(var i = 0; i<purchases.length;i++)
        {
            html+=`
            <tr>
                <td>
                    ${purchases[i].Date}
                </td>
                <td>
                    ${purchases[i].World}
                </td>
                <td>
                    ${purchases[i].Transaction}
                </td>
                <td>
                    ${purchases[i].Amount}
                </td>
                <td>
                    ${purchases[i].newTotal}
                </td>
                <td>
                    ${purchases[i].moreInformation}
                </td>
            </tr>`
        }
        $("#progress").remove();
        Dialog.show("Log:",`
        <div>
            <table class="vis">
            ${html}
            </table>
        </div>
        `)
    },
    (error) => {
        console.error(error);
    });
