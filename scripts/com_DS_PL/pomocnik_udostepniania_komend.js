javascript:
if (game_data.mode != 'command_sharing') {
    UI.InfoMessage('Skryptu należy używać z przeglądu dzielenia się komendami.', 5000, 'error');
} else {
    var trusted = `gracz1
gracz2
gracz3
gracz4
gracz5`.split('\n'); //tutaj wklej nicki
 
    var forms = $('form');
 
    $(forms).each(function(){
        let trs = $(this).find('tr');
 
        $(trs).each(function(){
            let nick = $(this).find('td:first').text().trim();
 
            if (trusted.indexOf(nick) != -1) {
                $(this).find('td:first').css('background', 'rgb(0,255,77)');
            }
 
        });
    });
} // author: DNSTW