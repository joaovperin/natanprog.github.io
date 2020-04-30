//----------------------------------------------------------------
//Projeto:		Calcular FARM
//Autor:		Gil Penner (Paçoquita) <gilhrpenner@gmail.com>
//Versão:		1.0 - 04/07/2015
//Changelog:
//		> 1.0 - Lançamento
//---------------------------------------------------------------
if(game_data.player.premium == false) {
	UI.InfoMessage('Para utilizar esse script é necessário uma Conta Premium!', 3000, true);
	end();
}

if(window.location.href.indexOf("type=return") == -1) {
	UI.InfoMessage('Para utilizar esse script é vá na aba <ins>Comandos</ins> e selecione <ins>Retornar</ins>', 5000, true);
	end();
}

var msg = '<div style=max-width:500px;>' +
'<h2 class="popup_box_header">Farm v1.0</h2>' +
'<p><span class="icon wood"></span> <labe id="madeira">0</label></p>' +
'<p><span class="icon stone"></span> <labe id="argila">0</label></p>' +
'<p><span class="icon iron"></span> <labe id="ferro">0</label></p>' +
'<p><span class="icon header ressources"></span> <labe id="total">0</label></p>' +
'</div>';

Dialog.show('dialog_nome', msg);

var madeira = 0;
var argila = 0;
var ferro = 0;

$("#commands_table tr:not(:first) td:first-child > span.quickedit").each(function(i,e){
	TribalWars.get('info_command',{ajax:'details',id: $(e).attr("data-id")},function(response){
		
		if(response.booty != null) {
			madeira += Number(response.booty.wood);
			$("#madeira").html(madeira);
			argila += Number(response.booty.stone);
			$("#argila").html(argila);
			ferro += Number(response.booty.iron);
			$("#ferro").html(ferro);
			$("#total").html(madeira+argila+ferro);
			console.log("Madeira: " + Number(response.booty.wood) + " ID: " + $(e).attr("data-id"));
		}
	});
});

//quickedit
