javascript:
//
// stv label enhancer
// author DNSTW (stivens)
//
var inc_commands, stv_label;
var atm = new Date();
var btn_tab = [];
var okienko = "<button type=\"button\" onclick=\"edit()\">Zmień nazwę</button>";
var counter = 1;
var a,b;
var coords = {};
var distance;
 
function edit() {
    if (btn_tab.length != 0) {
        $(btn_tab.pop()).trigger('click');
        UI.InfoMessage('Zmieniono nazwę ataku #'+counter, 1000, 'success');
        counter++;
    } else {
        UI.InfoMessage('Zmiany wprowadzone', 5000, 'success');
        Dialog.close();
    }
}
 
 
if (game_data.mode == 'incomings') {
    inc_commands = $('#incomings_table tbody tr:not(:first-child, :last-child)');
    $.each($(inc_commands), function(){
        $(this).find('.quickedit').find('.rename-icon').trigger('click');
        stv_label = $(this).find('.quickedit').find('input[type=text]').val();
 
        if (stv_label == 'Zwiad' ||
            stv_label == 'LK' ||
            stv_label == 'Topór' ||
            stv_label == 'Miecz' ||
            stv_label == 'Taran' ||
            stv_label == 'Szlachcic') {
                a = $(this).find('td');//wioska atakowana
                a = a[1];
                a = $(a).text();
                a = a.match(/\d{3}\|\d{3}/g);
                a = a[a.length-1];
                coords.atakowana_x = a.match(/\d{3}/g)[0];
                coords.atakowana_y = a.match(/\d{3}/g)[1];
 
 
                b = $(this).find('td');//wioska atakująca
                b = b[2];
                b = $(b).text();
                b = b.match(/\d{3}\|\d{3}/g);
                b = b[b.length-1];
                coords.atakujaca_x = b.match(/\d{3}/g)[0];
                coords.atakujaca_y = b.match(/\d{3}/g)[1];
 
                distance = Math.floor(Math.sqrt(Math.pow(coords.atakowana_x - coords.atakujaca_x, 2) + Math.pow(coords.atakowana_y - coords.atakujaca_y, 2)));
 
 
                stv_label = stv_label + " " + atm.getDate() + "/" + parseInt(atm.getMonth()+1) + "/" + atm.getFullYear()  + " "  + atm.getHours() + ":"  + atm.getMinutes() + ":" + atm.getSeconds() + " [" + distance + "]";
                stv_label = $(this).find('input[type=text]').val(stv_label);
                btn_tab.unshift($(this).find('.btn'));
        } else {
            $(this).closest('tr').remove();
        }
    });
 
    Dialog.show("okienko_komunikatu", okienko);
 
} else {
    UI.InfoMessage('Skryptu należy używać z przeglądu przybywających ataków.', 5000, 'error');
}