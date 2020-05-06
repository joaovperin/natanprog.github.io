javascript:
    if ((game_data.screen !== 'report') || ((window.location.href.match("view") == null))) {
        UI.InfoMessage("Wejdź w raport i dopiero uruchom skrypt!", 2000, 'error');
    } else {
        try {
var tekst = "";
            if ($("table#attack_info_def")[0].rows[0].cells[1].getElementsByTagName('a')[0].innerHTML == game_data.player.name) {
                // opisywanie wioski z której wyszedł atak
                var tekst = "Atak z tej wioski dnia [b]" + $("table#attack_info_def")[0].parentNode.parentNode.parentNode.rows[1].cells[1].innerHTML.replace(/\s\s+/g, "").split("<")[0] + "[/b]";

                var cowyslal = $("table#attack_info_att_units")[0].rows[1];
                var coubite = $("table#attack_info_att_units")[0].rows[2];
                tekst += "\n[code]Jednostka\tPik\tMiecz\tTopór\tŁuk\tZwiad\tLK\tŁNK\tCK\tTaran\tKatas\tRycerz\tSzlacht";
                tekst += "\nWysłane:\t" + cowyslal.cells[1].innerHTML + "\t" + cowyslal.cells[2].innerHTML + "\t" + cowyslal.cells[3].innerHTML + "\t" + cowyslal.cells[4].innerHTML + "\t" + cowyslal.cells[5].innerHTML + "\t" + cowyslal.cells[6].innerHTML + "\t" + cowyslal.cells[7].innerHTML + "\t" + cowyslal.cells[8].innerHTML + "\t" + cowyslal.cells[9].innerHTML + "\t" + cowyslal.cells[10].innerHTML + "\t" + cowyslal.cells[11].innerHTML + "\t" + cowyslal.cells[12].innerHTML + "\t";
                tekst += "\nZabite:\t\t" + coubite.cells[1].innerHTML + "\t" + coubite.cells[2].innerHTML + "\t" + coubite.cells[3].innerHTML + "\t" + coubite.cells[4].innerHTML + "\t" + coubite.cells[5].innerHTML + "\t" + coubite.cells[6].innerHTML + "\t" + coubite.cells[7].innerHTML + "\t" + coubite.cells[8].innerHTML + "\t" + coubite.cells[9].innerHTML + "\t" + coubite.cells[10].innerHTML + "\t" + coubite.cells[11].innerHTML + "\t" + coubite.cells[12].innerHTML + "\t[/code]";
				tekst += "\n\n[size=7]Notatka wykonana za pomocą skryptu napisanego przez [b]Howcio[/b][/size]"
				var wioska = $("table#attack_info_att")[0].rows[1].cells[1].getElementsByTagName("span")[0].getAttribute("data-id");
            } else {
                // opisywanie wioski na którą wszedł atak

var poziom = 0;
try{
var rows = document.getElementById('attack_spy_buildings_left').getElementsByTagName('tr');
for (var i = 1; i < rows.length; i++) {
	if (rows[i].innerHTML.indexOf('Kościół') > -1){
	poziom = rows[i].cells[1].innerHTML;}
};
}catch(err){poziom=0;};
if (Number(poziom)>0){ tekst +="[b]KOŚCIÓŁ POZIOM "+poziom+"[/b]\n"};
                tekst += "Atak na tą wioskę dnia [b]" + $("table#attack_info_def")[0].parentNode.parentNode.parentNode.rows[1].cells[1].innerHTML.replace(/\s\s+/g, "").split("<")[0] + "[/b]";

                var wioska = $("table#attack_info_def")[0].rows[1].cells[1].getElementsByTagName("span")[0].getAttribute("data-id");
                tekst += "\n" + $('#report_export_code')[0].innerHTML;
				tekst += "\n\n[size=7]Notatka wykonana za pomocą skryptu napisanego przez [b]Howcio[/b][/size]"
				
            };
            TribalWars.post('info_village', {
                ajaxaction: 'edit_notes',
                id: wioska
            }, {
                note: tekst
            });
            UI.InfoMessage("Raport dodany do notatek", 2000, 'success');
        } catch (err) {};
    };