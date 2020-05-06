javascript:
//
// Zliczanie powtórzeń ataków
// author DNSTW (stivens)
//
var inc_commands, coords, counter, bufor;
var result = "<textarea rows=\"20\" cols=\"50\">[table]\r\n[**]Wioska[||]Powtórzenia[/**]\r\n";
var table_result = "<button type=\"button\" class=\"btn\" onclick=\"eksportuj()\" style=\"width:100%\">Eksportuj</button><br><table style=\"width:95%\"><tr><th>Wioska</th><th>Ataki wychodzące</th></tr>";
var dict = {};
var items = [];

function eksportuj(){
Dialog.close();
Dialog.show("okienko_komunikatu", result);
}

if (game_data.mode == 'incomings') {
inc_commands = $('#incomings_table tbody tr:not(:first-child, :last-child)');
$(inc_commands).each(function() {
bufor = $(this).find('td')[2];
bufor = $(bufor).text();

coords = bufor.match(/\d{3}\|\d{3}/g);
coords = coords[coords.length-1];


if ( typeof dict[coords] === 'undefined' || dict[coords] === null ){
dict[coords] = 1;
} else {
counter = dict[coords];
counter = parseInt(counter) + 1;
dict[coords] = counter;
}
});

items = Object.keys(dict).map(function(key) {
return [key, dict[key]];
});

items.sort(function(first, second) {
return second[1] - first[1];
});

for (i = 0; i < items.length; i++){
result += "[*] " + items[0] + "[|]" + items[1] + "\r\n";
table_result += "<tr><td>" + items[0] + "</td>" + "<td style=\"text-align:right;\">" + items[1] + "</td></tr>";
}

result += "[/table]</textarea>";
table_result += "</table>";
Dialog.show("okienko_komunikatu", table_result);

} else {
UI.InfoMessage('Skryptu należy używać z przeglądu nadciągających ataków.', 5000, 'error');
}