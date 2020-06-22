/*
	Created by	: artemisia
	Contact		: Forum FR
	
	Adapted by 	: Assashina
	TW version	: v8.47.1
	Skype 		: Youro-Aks
	Mail 		: Aks@fireflies.fr
*/

plus_one = 0;
// Affiche 
show_points = true;
show_villages = true;
show_ODA = true;
show_ODD = true;
dimensions = [200, 100];
 
 
function exportGraph() {
    // édit Artémisia : on exporte uniquement une fois
    if (exportGraph.done === true)
        return;
    exportGraph.done = true;
   
    // édit Artémisia : on supprime les blasons
    $('.userimage-tiny').remove();
   
    var str = '[table][**]Nom[||]Rang[||]Points[||]Villages[||]Points[||]Villages[||]ODA[||]ODD[/**]';
    var exportTable = [];
    $('#content_value table.vis tr:gt(0)').each(function(i) {
        var name = $(this).children().children().html();
        var number = $(this).html().replace(/<span class="grey">\.<\/span>/gi, '').match(/\d+/gi);
        if (name.match(/\d+/gi)) {
            number.splice(2, 1);
        }
        var string = '[*][player]' + name + '[/player][|]' + number[2] + '[|]' + number[3] + '[|]' + number[4] + '[|][img]' + img('points', number[1]) + '[/img][|][img]' + img('villages', number[1]) + '[/img][|][img]' + img('oda', number[1]) + '[/img][|][img]' + img('odd', number[1]) + '[/img][|]';
       
        console.log(string);
       
        exportTable.push(string);
    });
   
    exportTable.shift();
    $('#script_warning').after('<h3>Stats Tribu</h3><div class="info_box" style="max-height: 200px;overflow: hidden;overflow-y: scroll">' + str + exportTable.join('\n') + '[/table]' + '</div>');
 
    function img(str, id) {
        return 'https://fr.twstats.com/' + game_data.world + '/image.php?type=playergraph&graph=' + str + '&id=' + id;
    }
}
 
if((game_data.screen == "info_ally")||(game_data.mode == "members")) {
if (document.getElementById("ally_content") !== null) {
    table = document.getElementById("ally_content");
} else {
    table = document.getElementsByClassName("vis")[document.getElementsByClassName("vis").length-1];
    plus_one = 1;
}
   
$(table).prepend('<input class="btn" type="button" id="export_tribe_stats" value="Exporter" onclick="javascript:void(0);" />');
   
$('#export_tribe_stats').on("click", function() {
    exportGraph();
});
   
rows = table.getElementsByTagName("tr");
if (show_points === true) {
    rows[0].innerHTML += "<th><center><b><u>Points</u></b></center></th>";
}
if (show_villages === true) {
    rows[0].innerHTML += "</b></center></th><th><center><b><u>Villages</u></b></center></th>";
}
if (show_ODA === true) {
    rows[0].innerHTML += "<th><center><b><u>ODA</u></b></center></th>";
}
if (show_ODD === true) {
    rows[0].innerHTML += "<th><center><b><u>ODD</u></b></center></th>";
}
for (i = 1; i < rows.length; i++) {
    pid = rows[i].getElementsByTagName("a")[0].toString().match(/id=\d+/).toString().split("=")[1];
    if (show_points === true) {
        rows[i].innerHTML += "<td><img src='https://fr.twstats.com/" + game_data.world + "/image.php?type=playergraph&graph=points&id=" + pid + "' style='width:" + dimensions[0] + "px; height:" + dimensions[1] + "px'></img></td>";
    }
    if (show_villages === true) {
        rows[i].innerHTML += "<td><img src='https://fr.twstats.com/" + game_data.world + "/image.php?type=playergraph&graph=villages&id=" + pid + "' style='width:" + dimensions[0] + "px; height:" + dimensions[1] + "px'></img></td>";
    }
    if (show_ODA === true) {
        rows[i].innerHTML += "<td><img src='https://fr.twstats.com/" + game_data.world + "/image.php?type=playergraph&graph=oda&id=" + pid + "' style='width:" + dimensions[0] + "px; height:" + dimensions[1] + "px'></img></td>";
    }
    if (show_ODD === true) {
        rows[i].innerHTML += "<td><img src='https://fr.twstats.com/" + game_data.world + "/image.php?type=playergraph&graph=odd&id=" + pid + "' style='width:" + dimensions[0] + "px; height:" + dimensions[1] + "px'></img></td>";
    }
 
}
} else { UI.ErrorMessage("Ce script doit être lancé depuis l'aperçu des membres d'une tribu.", 3000); }