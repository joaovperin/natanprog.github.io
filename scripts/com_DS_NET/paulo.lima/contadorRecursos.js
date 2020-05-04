var $table = $('#production_table');
var rec = {'wood':0,'stone': 0,'iron':0};
$table.find('span.res.wood').each(function(){
    rec.wood += parseInt($(this).html().replace(/\<span class="grey"\>\.\<\/span\>/g,''));
});
$table.find('span.res.stone').each(function(){
    rec.stone += parseInt($(this).html().replace(/\<span class="grey"\>\.\<\/span\>/g,''));
});
$table.find('span.res.iron').each(function(){
    rec.iron += parseInt($(this).html().replace(/\<span class="grey"\>\.\<\/span\>/g,''));
});
var msg = "Totais: \n";
msg += "Madeira: "+rec.wood+"\n";
msg += "Argila: "+rec.stone+"\n";
msg += "Ferro: "+rec.iron+"\n";
alert(msg);

msg = "Média: \n";
msg += "Madeira: "+Math.round(rec.wood/parseInt(game_data.player.villages))+"\n";
msg += "Argila: "+Math.round(rec.stone/parseInt(game_data.player.villages))+"\n";
msg += "Ferro: "+Math.round(rec.iron/parseInt(game_data.player.villages))+"\n";
alert(msg);