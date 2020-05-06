javascript:
    //
    // Wyświetlanie ilości ataków w przeglądzie wojska
    // author DNSTW (stivens)
    //
var coords;
var dict = {};
var label;

function convert_data(data) {
    var result = $('<div>').html(data).contents();

    result.find('#incomings_table tbody tr:not(:first-child, :last-child)').each(function() {
        bufor = $(this).find('td')[1];
        bufor = $(bufor).text();

        coords = bufor.match(/\d{3}\|\d{3}/g);
        coords = coords[coords.length - 1];


        if (typeof dict[coords] === 'undefined' || dict[coords] === null) {
            dict[coords] = 1;
        } else {
            dict[coords]++;
        }
    });
}

function modify_table() {
    $('#units_table tbody:not(:first-child) tr').each(function() {
        coords = $(this).find('td')[0];
        coords = $(coords).find('.quickedit-label').text();
        coords = coords.match(/\d{3}\|\d{3}/g);
        coords = coords[coords.length - 1];

        if (typeof dict[coords] != 'undefined' && dict[coords] !== null) {
            label = $(this).find('td')[1];
            $(label).html("<img src=\"" + image_base + "/unit/att.png\" alt=\"x\">" + dict[coords]);
        } else {
            $(this).closest('tbody').remove();
        }
    });
}

if (game_data.mode == 'units') {
    $.get(
        '/game.php?screen=overview_villages&mode=incomings&subtype=attacks&type=all&page=-1'
    ).done(function(data) {
        convert_data(data);
        modify_table();
    }).error(function() {
        UI.ErrorMessage('Wystąpił błąd podczas pobierania danych z przeglądu. Odśwież stronę aby spróbować ponownie', 4000);
    });
} else {
    UI.ErrorMessage('Skryptu należy używać z przeglądu wojska -> w wiosce', 4000);
}