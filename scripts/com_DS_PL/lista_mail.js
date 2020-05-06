javascript:
//
// author DNSTW (stivens)
//
if ((game_data.screen == 'ally' && game_data.mode == 'members') || game_data.screen == 'info_ally') {
    try {
        $('table.vis:contains(Ranking globalny)').attr('id', 'ally_content');
    } catch {
        ;
    }
    var table = $('#ally_content');
    var theader = $('table th:contains(Funkcje)').clone().text('Dodać?');
}
else if (game_data.screen == 'info_member') {
    var table = $('th:contains(Ranking globalny)').parent().parent().parent();
    var theader = $('table th:contains(Wioski)').clone().find('a').text('Dodać?');
} else {
    UI.InfoMessage('Skryptu należy używać z przeglądu członków plemienia.', 5000, 'error');
    throw new Error('Skrypt przerwany.');
}
var popup_content = `<div style="text-align:center">
                        <input type="radio" name="type" value="mailing" checked> Lista mailingowa<br>
                        <input type="radio" name="type" value="bbcode"> Lista z bbcode<br><br><br>
                        <button type="button" class="btn" id="check_all_btn">Zaznacz wszystkich</button>
                        <button type="button" class="btn" id="ready_btn">Stwórz listę</button><br><br><hr><br><br>
                        <textarea id="list_textar" style="width: 90%" rows="7"></textarea>
                    </div>`;
inlinePopup({
    clientX: $(window).width() - 400,
    clientY: 100
}, 'list_script', null, {
    offset_x: 0,
    offset_y: 0,
    width: 400
}, popup_content, 'Tworzenie listy graczy');
$('#ready_btn').on('click', function() {
    var type = $('input[name = "type"]:checked').val();
    var result = '';
    switch (type) {
        case 'mailing':
            $('.mailing_chkbox').each(function() {
                if ($(this).is(':checked')) {
                    result += $(this).attr('value') + ";";
                }
            });
            break;
        case 'bbcode':
            $('.mailing_chkbox').each(function() {
                if ($(this).is(':checked')) {
                    result += '[player]' + $(this).attr('value') + "[/player]\r\n";
                }
            });
            break;
    }
    $('#list_textar').text(result);
});
$('#check_all_btn').on('click', function() {
    $('.mailing_chkbox').each((index, checkbox) => {
        $(checkbox).attr('checked', true);
    });
});
$(table).find('th:first').before(theader);
var members = $(table).find('tr:not(:first-child)');
$(members).each(function() {
    var name = $(this).find('td')[0];
    name = $(name).find('a').text().trim();
    $(this).find('td:first').before('<td class="lit-item"><input type="checkbox" class="mailing_chkbox" value="' + name + '"></td>');
});