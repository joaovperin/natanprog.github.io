//var daysCount = 10;
var unitsent = $("#attack_info_att_units")[0].rows[1];
var unitkilled = $("#attack_info_att_units")[0].rows[2];
var attacker = $($('#attack_info_att')[0]).find("a")[0].innerHTML;
var deffender = $($('#attack_info_def')[0]).find("a")[0].innerHTML;
if ((game_data.screen !== 'report') || ((window.location.href.match("view") == null))) {
    UI.InfoMessage("Skrypt uruchom z przeglądu raportu", 1800, 'error');
} else {
	if (attacker == game_data.player.name) {
        idv = $($("#attack_info_def")[0]).find("span")[0].getAttribute("data-id");
    }
    if (deffender == game_data.player.name) {
        idv = $($("#attack_info_att")[0]).find("span")[0].getAttribute("data-id");
    }
	if (!(attacker == game_data.player.name) && !(deffender == game_data.player.name)) {
        idv = $($("#attack_info_def")[0]).find("span")[0].getAttribute("data-id");
    }
	deffinfounits = "\n# Data: [b]"+$($('table.vis')[3]).find('td')[1].innerHTML.replace(/\s\s+/g, "").split("<")[0]+"[/b]\n";
	deffinfounits += "\n Jednostka:[color=#F5EDDA]___.__[/color][unit]spear[/unit][color=#F5EDDA]______[/color][unit]sword[/unit][color=#F5EDDA]____[/color][unit]axe[/unit][color=#F5EDDA]___._[/color][unit]archer[/unit][color=#F5EDDA]__.__[/color][unit]spy[/unit][color=#F5EDDA]_____[/color][unit]light[/unit][color=#F5EDDA]_____[/color][unit]marcher[/unit][color=#F5EDDA]_____[/color][unit]heavy[/unit][color=#F5EDDA]__.__[/color][unit]ram[/unit][color=#F5EDDA]__.__[/color][unit]catapult[/unit][color=#F5EDDA]__.__[/color][unit]knight[/unit][color=#F5EDDA]_____[/color][unit]snob[/unit]";
	deffinfounits += "\n [code] Ilość: \t" + unitsent.cells[1].innerHTML + "\t " + unitsent.cells[2].innerHTML + "\t " + unitsent.cells[3].innerHTML + "\t " + unitsent.cells[4].innerHTML + "\t " + unitsent.cells[5].innerHTML + "\t " + unitsent.cells[6].innerHTML + "\t " + unitsent.cells[7].innerHTML + "\t " + unitsent.cells[8].innerHTML + "\t " + unitsent.cells[9].innerHTML + "\t " + unitsent.cells[10].innerHTML + "\t " + unitsent.cells[11].innerHTML + "\t " + unitsent.cells[12].innerHTML + "\t";
	deffinfounits += "\n Straty: \t"+ unitkilled.cells[1].innerHTML + "\t " + unitkilled.cells[2].innerHTML + "\t " + unitkilled.cells[3].innerHTML + "\t " + unitkilled.cells[4].innerHTML + "\t " + unitkilled.cells[5].innerHTML + "\t " + unitkilled.cells[6].innerHTML + "\t " + unitkilled.cells[7].innerHTML + "\t " + unitkilled.cells[8].innerHTML + "\t " + unitkilled.cells[9].innerHTML + "\t " + unitkilled.cells[10].innerHTML + "\t " + unitkilled.cells[11].innerHTML + "\t " + unitkilled.cells[12].innerHTML + "\t [/code]";
	deffinfounits += "\n\n[size=7]Notatka dodana za pomocą skryptu wykonanego przez [url=https://pl134.plemiona.pl/guest.php?screen=info_player&id=1030731]pm161@[/url][/size]";
        $.get('https://' + game_data.world + '.plemiona.pl/game.php?village=' + game_data.village.id + '&screen=info_village&id=' + idv, function(infonote) {
        note = $(infonote).find('#message').text();
        varnot = note.match(/\#/mg);		
        if (varnot == null) {	
			if ($($('#attack_info_def')[0]).find("a")[0].innerHTML == game_data.player.name) {
					thenote = deffinfounits;
			}
			else{
					thenote = "\n# Data: [b]" + $($('table.vis')[3]).find('td')[1].innerHTML.replace(/\s\s+/g, "").split("<")[0] + "[/b]\n" + $('#report_export_code')[0].innerHTML + "";
					thenote += "\n\n[size=7]Notatka dodana za pomocą skryptu wykonanego przez [url=https://pl134.plemiona.pl/guest.php?screen=info_player&id=1030731]pm161@[/url][/size]";
			}
        } else {   
            let notesText = note;
            const compareDate = (new Date()).setDate((new Date()).getDate() - daysCount);
            const regex = /\s*#\s*Data:\s*\[b\](\d*\.\d*\.\d*)\s*(\d*:\d*:\d*)\[\/b\]\n((?:.|\n)*?)\n{2,}/mg;
            const regex2 = /^\s*#\s*Data:\s*\[b\](\d*\.\d*\.\d*)\s*(\d*:\d*:\d*)\[\/b\]\n((?:.|\n)*?)/;
            const notes = [...notesText.match(regex)];
            let finalNotes = [];
            notes.forEach(note => {
                let noteMatch = note.match(regex2);
                let noteDate = new Date(Date.parse("20" + noteMatch[1].split(".").reverse().join("-")));
                if (noteDate > compareDate) {
                    finalNotes.push(note);			
                }
            });	
				if ($($('#attack_info_def')[0]).find("a")[0].innerHTML == game_data.player.name) {
					thenote = finalNotes.join("");
					thenote += deffinfounits;
				}else{	
				thenote = finalNotes.join("")+"\n# Data: [b]" + $($('table.vis')[3]).find('td')[1].innerHTML.replace(/\s\s+/g, "").split("<")[0] + "[/b]\n" + $('#report_export_code')[0].innerHTML + "\n";
				thenote += "\n\n[size=7]Notatka dodana za pomocą skryptu wykonanego przez [url=https://pl134.plemiona.pl/guest.php?screen=info_player&id=1030731]pm161@[/url][/size]";
				thenote.replace(/\n{3,}/g, "\n\n");
				}
        }
        TribalWars.post('info_village', {
            ajaxaction: 'edit_notes',
            id: idv
        }, {
            note: thenote
        });
        UI.InfoMessage("Raport został dodany do notatek!", 2000, 'success');

    });
}	