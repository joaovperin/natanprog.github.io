ScriptAPI.register( '108-Umbenenn-Button', true, 'Die Stämme Team', 'tomabrafix@team.die-staemme.de' );

var date = new Date();
format = format.replace('%day%', date.getDate());
format = format.replace('%month%', date.getMonth()+1);
format = format.replace('%year%', date.getFullYear());
format = format.replace('%time%', date.getHours()+':'+date.getMinutes()+':'+date.getSeconds());
$('input[name=label_format]').val(format).parents('form').find('input[name=label]').click();