javascript:
var data, totalWood = 0, totalStone = 0, totalIron = 0, resLimit = 0;
//check if correct page
if (window.location.href.indexOf('&screen=market&mode=send') < 0) {
    //relocate
    window.location.assign(game_data.link_base_pure + "market&mode=send");
}

if ("totalWood" in sessionStorage) {
    //found total sent resources in storage, get it
    totalWood = parseInt(sessionStorage.getItem("totalWood", totalWood));
    totalStone = parseInt(sessionStorage.getItem("totalStone", totalStone));
    totalIron = parseInt(sessionStorage.getItem("totalIron", totalIron));
}
else {
    //create total resources sent so far for first time in sessionstorage
    sessionStorage.setItem("totalWood", totalWood);
    sessionStorage.setItem("totalStone", totalStone);
    sessionStorage.setItem("totalIron", totalIron);
}

if ("resLimit" in sessionStorage) {
    //found resLimit in storage, get it
    console.log('ok');
    resLimit = parseInt(sessionStorage.getItem("resLimit", resLimit));
}
else {
    //create resLimit for first time in sessionstorage
    sessionStorage.setItem("resLimit", resLimit);
    console.log('not found');
}


//UI
if ($("#resourceSender").length == 0) {
    var htmlString = `
            <div id="resourceSender">
                <table id="Settings" class="vis">
                    <thead>
                        <tr>
                            <th>Coordinate to send to</th>
                            <th>Keep WH% behind</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <td>
                            <input type="text" ID="coordinateTarget" name="coordinateTarget" size="20" margin="5" align=left>
                        </td>
                        <td align="right">
                            <input type="text" ID="resPercent" name="resPercent" size="1" align=right>%
                        </td>
                        <td margin="5">
                            <button type="button" ID="button" class="btn-confirm-yes" >Save</button>
                        </td>
                        <td>
                            <input type="checkbox" ID="showOnlyFiltered" name="showOnlyFiltered"> Skip low res villages
                        </td>
                    </tbody>
                </table>
                </br>
            </div>`.trim();

    uiDiv = document.createElement('div');
    uiDiv.innerHTML = htmlString;
    $("#market_status_bar").prepend(uiDiv.firstChild);
    $("#resPercent")[0].value = resLimit;
}
//try and load coordinate
var coordinate;
if ("coordinate" in sessionStorage) {
    coordinate = sessionStorage.getItem("coordinate");
    sendResource();
    //desktop
    $("#coordinateTarget")[0].value = coordinate;
    //mobile
    $("#inputx")[0].value = coordinate.substring(0, 3);
    $("#inputy")[0].value = coordinate.substring(4, 7);
}
else {
    //ask for coordinate
    var content = `<div style=max-width:1000px;>
    <h2 class="popup_box_header">
       <center><u>
          <font color="darkgreen">Resource sender for flag minting</font>
          </u>
       </center>
    </h2>
    <hr>
    <p>
    <center>
       <font color=maroon><b>Enter coordinate to send to</b>
       </font>
    </center>
    </p>
    <center> <table><tr><td><center>
    <input type="text" ID="coordinateTargetFirstTime" name="coordinateTargetFirstTime" size="20" margin="5" align=left></center></td></tr>
       <tr></tr>
       <tr><td><center><input type="button"
          class="btn evt-cancel-btn btn-confirm-yes" id="saveCoord"
          value="Save">&emsp;</center></td></tr>
          <tr></tr>
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
       <p>Creator: <a
          href="https://forum.tribalwars.net/index.php?members/shinko-to-kuma.121220/"
          title="Sophie profile" target="_blank">Sophie "Shinko
          to Kuma"</a>
       </p>
    </center>
 </div>`;
    Dialog.show('Supportfilter', content);
}

$("#saveCoord").click(function () {
    coordinate = $("#coordinateTargetFirstTime")[0].value.match(/\d+\|\d+/)[0];
    sessionStorage.setItem("coordinate", coordinate);
    var close_this = document.getElementsByClassName(
        'popup_box_close');
    close_this[0].click();
    sendResource();
});




function sendResource() {

    // save coordinate
    $('#button').click(function () {
        coordinate = $("#coordinateTarget")[0].value.match(/\d+\|\d+/)[0];
        sessionStorage.setItem("coordinate", coordinate);
        resLimit = $("#resPercent")[0].value;
        sessionStorage.setItem("resLimit", resLimit);
        $("[name^='input']")[0].value = coordinate;
    });




    $("[type^='submit']")[0].addEventListener("click", function () {
        totalWood = parseInt(totalWood) + parseInt($('.resources_max')[0].value);
        totalStone = parseInt(totalStone) + parseInt($('.resources_max')[1].value);
        totalIron = parseInt(totalIron) + parseInt($('.resources_max')[2].value);
        sessionStorage.setItem("totalWood", totalWood);
        sessionStorage.setItem("totalStone", totalStone);
        sessionStorage.setItem("totalIron", totalIron);
    });

    //grab coordinate information
    if (coordinate) {
        $.get('/game.php?&screen=api&ajax=target_selection&input=' + coordinate + '+&type=coord', function (json) {
            data = JSON.parse(json);

            villageHTML = `<table id="villageData" class="vis">
<tr>
  <th rowspan="4"><img src="`+ data.villages[0].image + `"></th>
  <th >Player</th>
  <td>`+ data.villages[0].player_name + `</th>
  <th></th>
  <th >Sent resources</th>
</tr>
<tr>
  <th >Village:</td>
  <td >`+ data.villages[0].name + `</td>
  <th><span class="icon header wood"> </span></th>
  <td id="totalWood"></td>

</tr>
<tr>
  <th >Distance: </td>
  <td >`+ checkDistance(game_data.village.x, game_data.village.y, coordinate.substring(0, 3), coordinate.substring(4, 7)) + `</td>
  <th><span class="icon header stone"> </span></th>
  <td  id="totalStone"></td>

</tr>
<tr>
  <th >Points: </td>
  <td >`+ data.villages[0].points + `</td>
  <th><span class="icon header iron"> </span></th>
  <td id="totalIron"></td>

</tr>
</table>`;

            //create table if it doesn't exist yet
            if ($("#villageData").length == 0) {
                $("#market_status_bar").append(villageHTML);
            }

            //sent so far from all villages
            var displayWood = numberWithCommas(totalWood);
            var displayStone = numberWithCommas(totalStone);
            var displayIron = numberWithCommas(totalIron);
            $("#totalWood")[0].innerHTML = displayWood;
            $("#totalStone")[0].innerHTML = displayStone;
            $("#totalIron")[0].innerHTML = displayIron;
            $("[name^='input']")[0].value = "";
            $("[name^='input']")[0].value += data.villages[0].x;
            $("[name^='input']")[0].value += "|";
            $("[name^='input']")[0].value += data.villages[0].y;
        });


    }

    var merchantCarry = Data.Trader.amount * 1000;
    //grabbing resources in village and substracting what we wanna leave behind
    leaveBehindRes = Math.floor(game_data.village.storage_max / 100 * resLimit);
    var localWood = game_data.village.wood - leaveBehindRes;
    var localStone = game_data.village.stone - leaveBehindRes;
    var localIron = game_data.village.iron - leaveBehindRes;
    localWood = Math.max(0, localWood);
    localStone = Math.max(0, localStone);
    localIron = Math.max(0, localIron);


    woodPercentage = 28000 / 83000;
    stonePercentage = 30000 / 83000;
    ironPercentage = 25000 / 83000;




    //recalculate how much can be sent according to how much is available
    //how much the merchant can take maximum
    merchantWood = (merchantCarry * woodPercentage);
    merchantStone = (merchantCarry * stonePercentage);
    merchantIron = (merchantCarry * ironPercentage);

    //check each type if we have enough available
    var perc = 1;
    if (merchantWood > localWood) {
        perc = localWood / merchantWood;
        merchantWood = merchantWood * perc;
        merchantStone = merchantStone * perc;
        merchantIron = merchantIron * perc;
    }
    if (merchantStone > localStone) {
        perc = localStone / merchantStone;
        merchantWood = merchantWood * perc;
        merchantStone = merchantStone * perc;
        merchantIron = merchantIron * perc;
    }
    if (merchantIron > localIron) {
        perc = localIron / merchantIron;
        merchantWood = merchantWood * perc;
        merchantStone = merchantStone * perc;
        merchantIron = merchantIron * perc;
    }

    //fill in how much has to be sent how much can be sent



    $('.resources_max')[0].value = parseInt(merchantWood);
    $('.resources_max')[1].value = parseInt(merchantStone);
    $('.resources_max')[2].value = parseInt(merchantIron);



    $("[type^='submit']")[0].focus();

}

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1.$2");
    return x;
}

function checkDistance(x1, y1, x2, y2) {
    var a = x1 - x2;
    var b = y1 - y2;
    var distance = Math.round(Math.hypot(a, b));
    return distance;
}