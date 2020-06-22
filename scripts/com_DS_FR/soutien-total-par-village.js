// @name       TribalWars - Soutien total par village
// @version    1.5_fr_1.0
// @description  Ajoute un tableau à l'aperçu troupe > soutien contenant la liste des soutiens triée par village soutenu.
// @copyright  2013+, Artemisia
/*== license ==
 *	Copyright (C) 2013+  Ademes (auteur)
 *  Copyright (C) 2013+  Artemisia (traduction fr, amélioration, relecture)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see http://www.gnu.org/licenses/

    * LAST MODIF 2019-09-23 - Start refactoring and quick debug
 */

/*== main ==*/
ads_lduDidT()
function ads_lduDidT() {
    var doc = document;
    var table = doc.getElementById('units_table');

    let tr_header = table.getElementsByTagName('tr')[1];

    let tr_per_village = new Array(0);
    let array_unit_out = new Array(0);
    let nb_village_def = 0;

    for (var i = 0; i< table.getElementsByTagName('tr').length; i++){
        if (table.getElementsByTagName('tr')[i].className == 'row_a' || table.getElementsByTagName('tr')[i].className == 'row_b'){
            tr_per_village[i-3] = table.getElementsByTagName('tr')[i];
        }
    }

    for (var counter = 0; counter<tr_per_village.length; counter++){
        if (tr_per_village[counter]){
            var cells = tr_per_village[counter].cells;
            var village_name = trim(cells[0].textContent);
                if (array_unit_out[village_name] == undefined){
                    array_unit_out[village_name] = new Array(tr_header.getElementsByTagName('th').length-3);
                }
                // ini array of troop by village
                for (var k = 0; k<tr_header.getElementsByTagName('th').length-3; k++){
                    if (!array_unit_out[village_name][k] || !array_unit_out[village_name][k]>0)array_unit_out[village_name][k] = 0;
                }
                for (var j = 2; j<tr_header.getElementsByTagName('th').length-2; j++){
                    array_unit_out[village_name][j-2] += parseInt(cells[j].textContent);
                    nb_village_def++;
                }
                array_unit_out[village_name]['td'] = tr_per_village[counter].getElementsByTagName('td')[0];

        }
    }

    var div = doc.getElementById('paged_view_content');

    var new_table = doc.createElement('table');
    var current_table = doc.getElementsByClassName('units_table');
    var current_header = doc.getElementsByTagName('thead')[0];
    var new_header = current_header.cloneNode(true);
    new_header.id = current_header.id+'script';

    // Delete dist cell of the header
    new_header.getElementsByTagName('tr')[1].removeChild(new_header.getElementsByTagName('tr')[1].getElementsByTagName('th')[1]);
    // Delete last cell of the header (action)
    new_header.getElementsByTagName('tr')[1].removeChild(new_header.getElementsByTagName('tr')[1].getElementsByTagName('th')[new_header.getElementsByTagName('tr')[1].getElementsByTagName('th').length - 1]);

    new_table.appendChild(new_header);
    new_table.createTBody();


    var for_counter = 1;
    for (var v in array_unit_out){
        // To leave at the end of the array_unit_out
        if (v == "multisort") break;

        //créer le TR
        var new_row = doc.createElement('tr');
        new_row.classList.add(insertRow(i)); // to set row_a or row_b

        var first_cell = array_unit_out[v]['td'].cloneNode(true);
        new_row.appendChild(first_cell);

        for (var w in array_unit_out[v]){
            if (w != 'td' && w!= 'multisort'){
                var cell_troop = doc.createElement('td');
                // console.log(array_unit_out[v][w]);
                if (array_unit_out[v][w] === 0) cell_troop.className = 'hidden';
                cell_troop.innerHTML = array_unit_out[v][w];
                new_row.appendChild(cell_troop);
            }
        }
        for_counter++;

        new_table.getElementsByTagName('tbody')[0].appendChild(new_row);
    }


    div.insertBefore(new_table, doc.forms[doc.forms.length-2]);
    window.addEventListener('click', function(event) {
        if (event.target.type == 'checkbox')  {
            var rows = table.getElementsByTagName('tr');
            for (var i = 1; i < rows.length - 1; i++) {
                if (rows[i].getElementsByTagName('td')[rows[i].getElementsByTagName('td').length - 1]){
                    if ((rows[i].getElementsByTagName('td')[rows[i].getElementsByTagName('td').length - 1].textContent != 'Wojska') && trim(rows[i].getElementsByTagName('span')[0].textContent) == event.target.id) {
                        rows[i].getElementsByTagName('input')[0].checked = event.target.checked;
                    }
                }
            }
        }
    }, true);

    // var button = doc.getElementsByName('submit_units_back')[0];
    // var newButton = doc.createElement('input');
    // newButton.type = 'submit';
    // newButton.value = 'Retirer';
    // newButton.className = "btn";
    // new_table.appendChild(newButton);
    // newButton.addEventListener('click', action, false);
    // function action() {
    //     button.click();
    // }
    var endTable = doc.createElement('tr');
    endTable.innerHTML = '<br>';
    new_table.appendChild(endTable)
};



function trim(str, chars) {
    return ltrim(rtrim(str, chars), chars);
};
function ltrim(str, chars) {
    var chars = chars || '\\s';
    return str.replace(new RegExp('^[' + chars + ']+', 'g'), '');
};
function rtrim(str, chars) {
    var chars = chars || '\\s';
    return str.replace(new RegExp('[' + chars + ']+$', 'g'), '');
};

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function insertRow(n)
{
    if (n % 2 == 0) return 'row_a';
    return 'row_b';
};