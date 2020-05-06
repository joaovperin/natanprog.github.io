javascript:
// ==UserScript==
// @name         Rekord farmy w profilu
// @version      1.10
// @author       Filip Klich
// @include        *://*.plemiona.pl/game.php?*screen=info_player*
// ==/UserScript==
//LICENCJA       FREE SOFTWARE - drogi Supporcie <3 wyrażam zgodę na użytkowanie i publikowanie tego skryptu przez każdą osobę

(function() {
    'use strict';

    var nick=takeNick();
    console.log(nick);
    makeProfileGreatAgain(nick);
})();

function makeProfileGreatAgain(nick){
    $['ajax']({
        async: true,
        url: 'https://pl'+ window.location.href.split("pl")[1].split(".")[0] +'.plemiona.pl/game.php?screen=ranking&mode=in_a_day&type=loot_res&name=' + nick,
        type: 'GET',
        success: function(test) {
            var t = $(test).find('.lit-item:nth-child(4)').html().split(`<span class="grey">.</span>`);
            var x=t[0];
            for (var i=1;i<t.length;i++) {x+=".";x+=t[i];}
            x+=" (" +  $(test)['find']('.lit-item:first')['html']()+".) ";
            x+=" z dnia "+ $(test)['find']('.lit-item:nth-child(5)')['html']().replace("wczoraj", "wczorajszego");
            addLoot(x);
        }
    });
}

function takeNick(){
    var ret = document.getElementsByClassName("selected")[0];
    return (ret === undefined ? $("#content_value")[0].getElementsByTagName("h2")[0].innerText : ret.innerText);
}
function addLoot(loot){
    var tableRef = document.getElementById("player_info").getElementsByTagName("tbody")[0];
    var newRow   = tableRef.insertRow(5);

    var d  = newRow.insertCell(0);
    var f  = newRow.insertCell(0);
    f.appendChild(document.createTextNode('Rekord farmy'));
    d.appendChild(document.createTextNode(loot));
}