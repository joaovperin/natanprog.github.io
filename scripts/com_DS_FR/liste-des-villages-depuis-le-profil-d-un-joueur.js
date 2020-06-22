if (game_data.screen == 'info_player') {
	var idtable = document.getElementById("villages_list");
	var tag_tbody = idtable.getElementsByTagName("tbody")[0];
	var tag_table = document.getElementById('contentContainer').getElementsByTagName('table')[3];
	var tag_td = tag_tbody.getElementsByTagName('td');

	/* D&eacute;finie les Checkbox */
	var check_points = "<tr><td><input id=\"check_points\" type=\"checkbox\" name=\"Points villages\"  /></td><td colspan='20'><p> Voulez vous avoir les points des villages ?</p></td></tr>";
	var check_reserve_par = "<tr><td><input id=\"check_reserve_par\" type=\"checkbox\" name=\"R&eacute;serv&eacute; par\"  /></td><td colspan='20'><p> Voulez vous une colonne \"r&eacute;serv&eacute; par\" dans votre tableau ?</p></td></tr>";
	/*var check_ = "<p><input id=\"check_\" type=\"checkbox\" name=\"\"  /> Voulez vous  ?</p>";*/

	/*Ajoute les options (Checkbox) et l'aire de texte*/
	tag_table.innerHTML += '<br /><table id="tableOptions" class="vis " width="130%"><tr><th colspan="2">Options</th></tr>' + check_points + check_reserve_par;
	tag_table.innerHTML += '<br /><table id="tableText" class="vis " width="130%"><tr><th colspan="2">Liste des villages</th></tr>' + '<tr><td><input type="button" id="button_generate" value="G&eacute;n&eacute;rer la liste" onclick="Generate();" /></td><td><textarea rows="10" cols="35" id="text_area" name="text_area" onfocus="select();" value=""></textarea></td></tr>';

	function Generate()	{
		/* R&eacute;cup&egrave;re les Checkbox, l'aire de texte */
		var getIpoints = document.getElementById("check_points");
		var getIreserv = document.getElementById("check_reserve_par");
		var text_area = document.getElementById('text_area');
		text_area.textContent = "";
		var tag_tbody = document.getElementById("villages_list").getElementsByTagName("tbody")[0];
		var tag_td = tag_tbody.getElementsByTagName('td');
		var tableau = [],
			s = "[|]",
			d = "[*]",
			format = [],
			name_villages = [],
            points = [],
			reserver_par = [];
		var noms_colonnes = [];
		noms_colonnes[0] = "[table]\n[**]  [||]Villages - Reservé par[||]Points[/**] \n";
		noms_colonnes[1] = "[table]\n[**]  [||]Villages[||]Points[/**] \n";
		noms_colonnes[2] = "[table]\n[**]  [||]Villages - Reservé par[/**] \n";
		noms_colonnes[3] = "[table]\n[**]  [||]Villages[/**] \n";
		format[0] = "",
		format[1] = "",
		format[2] = "",
		format[3] = "";
		var addText = function (texte) {
			text_area.appendChild(document.createTextNode(texte));
		};
        for (var j = 3, j2 = 4; j < tag_td.length, j2 < tag_td.length; j = j + 5, j2 = j2 + 5)	{
            name_villages.push("[coord]" + tag_td[j].textContent + "[/coord]");
            reserver_par.push("[claim]" + tag_td[j].textContent + "[/claim]");
            points.push(tag_td[j2].textContent);
        }
		for (var i = 1, k = 0; i < tag_td.length / 3, k < name_villages.length; i++, k++)	{
			format[0] += "\n" + d + i + s + reserver_par[k] + s + points[k];
			format[1] += "\n" + d + i + s + name_villages[k] + s + points[k];
			format[2] += "\n" + d + i + s + reserver_par[k];
			format[3] += "\n" + d + i + s + name_villages[k];
		}
		if (getIpoints.checked && getIreserv.checked)	{
			addText(noms_colonnes[0]);
			addText(format[0]);
			addText("\n[/table]");
		}
		else if (getIpoints.checked)	{
			addText(noms_colonnes[1]);
			addText(format[1]);
			addText("\n[/table]");
		}
		else if (getIreserv.checked)	{
			addText(noms_colonnes[2]);
			addText(format[2]);
			addText("\n[/table]");
		}
		else if (!getIpoints.checked && !getIreserv.checked)	{
			addText(noms_colonnes[3]);
			addText(format[3]);
			addText("\n[/table]");
		}
	}
}
else {
	UI.ErrorMessage('Ce script doit être exécuté depuis le profil d\'un joueur', 5000);
}