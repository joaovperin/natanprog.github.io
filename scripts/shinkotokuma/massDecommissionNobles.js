javascript:
if (window.location.href.indexOf('screen=overview_villages&mode=combined') < 0) {
    //relocate
    window.location.assign(game_data.link_base_pure + "overview_villages&mode=combined");
}

// translations
var langShinko = ["All nobles decommissioned in the current group."]
if (game_data.locale == "el_GR") {
    langShinko = ["Όλοι οι αριστοκράτες παροπλίστηκαν."]   
}
if (game_data.locale == "nl_NL") {
    langShinko = ["Alle edels in de huidige groep massa-ontslagen."]
}
if (game_data.locale == "it_IT") {
    langShinko = ["Congedati tutti i nobili nel gruppo attuale."]
}

//mass decomission nobles Sophie "Shinko to Kuma"
var units = {};
html="<div><form action='/game.php?village="+game_data.village.id+"&screen=train&mode=mass_decommission&action=decommission_mass&page=-1' method='post'><table>";
//find all snob numbers
for (var i = 1; i < $("#combined_table tr").length; i++) {
    snobCount = $("#combined_table tr")[i].children[$("#combined_table tr")[i].children.length-3].innerText;
    villageID = $("#combined_table tr")[i].children[1].children[0].children[0].children[0].href.match(/village=(\d+)/)[1];
    villageData= $("#combined_table tr")[i].children[1].children[0].children[0].children[0].outerHTML;
    if (snobCount > 0) {
        units[villageID] = { "snob": snobCount };
        html+=`<tr><td align='left'>${villageData}</td><td align='right'><input class="unit_entry" data-max="6688" data-existing="6689" data-running="1" type="text" id="snob_${villageID}" name="units[${villageID}][snob]" size="3" tabindex="" value="${snobCount}"></input><span>/${snobCount}</span></td></tr>`
    }
}

html+="<tr><td align='left'><input type='hidden' name='h' value='"+csrf_token+"'></td><td align='right'><input type='submit' class='btn evt-cancel-btn btn-confirm-yes' value='Submit'></td></tr></table></form></div>";
Dialog.show("content",html);

/*TribalWars.post('train', { mode: "mass_decommission", action: "decommission_mass", village: game_data.village.id, page: 0 }, { "units": units }, function (e) {
    UI.SuccessMessage(e.message)
   
},
    !1
);*/
/*alert(langShinko[0]);*/