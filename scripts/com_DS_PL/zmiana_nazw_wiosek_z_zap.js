javascript:
//
// stv village renamer
// author: DNSTW (stivens)
//

var dict = {};
var inputDict;
var tab = [];
var villages = $('.quickedit-vn');
var edit_window = "<button type=\"button\" onclick=\"edit()\">Zmień nazwę</button>";
var btn_tab = [];
var counter = 1;

function edit() {
    if (btn_tab.length != 0) {
        $(btn_tab.pop()).trigger('click');
        UI.InfoMessage('Zmieniono nazwę wioski #'+counter, 1000, 'success');
        counter++;
    } else {
        UI.InfoMessage('Zmiany wprowadzone', 5000, 'success');
        Dialog.close();
    }
}

function getVillages() {
    villages.each(function(key, village) {
        var $label = $(village).find('.quickedit-label');
        var villageName = $label.attr('data-text');

        dict[$(village).attr('data-id')] = villageName;
    });

    $("#villNames").val(JSON.stringify(dict));
}

function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

function getCoords(){
    var villages = $('.quickedit-vn');
    villages.each(function(key, village) {
        var $label = $(village).find('.quickedit-label');
        var originalFullName = $label.text();
        var coordinates = originalFullName.match(/[0-9]{1,}\|[0-9]{1,}/gi).pop();
        var coordX = coordinates.match(/[0-9]{1,}/);
        var coordY = String(coordinates.match(/\|[0-9]{1,}/)).substring(1);

        tab.push(coordX+"|"+coordY);
    });

    shuffle(tab);
}

function getDict() {
    inputDict = JSON.parse(prompt('Wprowadź "słownik" wiosek:'));

    villages.each(function(key, village){
        $(village).find('.rename-icon').trigger('click');
        if (typeof inputDict[$(village).attr('data-id')] !== 'undefined' || dict[coords] !== null) {
            $(village).find('input[type=text]').val(inputDict[$(village).attr('data-id')]);
            btn_tab.unshift($(this).find('.btn'));
        } else {
            $(this).closest('tr').remove();
        }
    });

    Dialog.close();
    Dialog.show("okienko_komunikatu", edit_window);
}

function setMono() {
    var name = prompt('Podaj nazwę którą chcesz wprowadzić:');

    villages.each(function(key, village){
        $(village).find('.rename-icon').trigger('click');
        $(village).find('input[type=text]').val(name);
        btn_tab.unshift($(this).find('.btn'));
    });

    Dialog.close();
    Dialog.show("okienko_komunikatu", edit_window);
}

function rush() {
    getCoords();
    villages.each(function(key, village){
        $(village).find('.rename-icon').trigger('click');
        $(village).find('input[type=text]').val(tab.pop());
        btn_tab.unshift($(this).find('.btn'));
    });

    Dialog.close();
    Dialog.show("okienko_komunikatu", edit_window);
}

if (game_data.screen == 'overview_villages') {
    var okienko = `
        <div style="text-align: center;">
            <h2>stv village renamer</h2><br>
            <h4>stivens dla skubi \<3</h4> <br><hr><br><br><br>
            <button type="button" class="btn" onclick="getVillages()">Pobierz nazwy wiosek</button><br><br><br>
            <textarea rows="8" cols="40" id="villNames"></textarea><br><br><br>
            <button type="button" class="btn" onclick="getDict()">Przywróć nazwy</button><br><br><br>
            <button type="button" class="btn" onclick="setMono()">Ustaw jednakowe nazwy</button><br><br><br>
            <button type="button" class="btn" onclick="rush()">! CORD RUSH !</button><br><br><br>
        </div>
    `;
    Dialog.show("okienko_komunikatu",okienko);
} else {
    UI.InfoMessage('Skryptu należy używać z przeglądu wiosek.', 5000, 'error');
}