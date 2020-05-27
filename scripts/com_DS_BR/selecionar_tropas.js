//----------------------------------------------------------------
//Projeto:		Renomeador de ataques
//Autor:		Desconhecido
//Editor:		Gil Penner (Paçoquita) <skype: gilhrpenner@gmail.com>
//Versão:		1.0 - 28/06/2015
//Changelog:
//		> 1.0 - Lançamento
//---------------------------------------------------------------

if(game_data.player.premium == false) {
	UI.InfoMessage('Para utilizar esse script é necessário uma Conta Premium!', 3000, true);
	end();
}

if(game_data.screen!='place'){
	UI.InfoMessage('Script deve ser usado na praça de reunião.', 3000, true);
	end();
}


if(typeof cookie_atk === 'undefined') var cookie_atk = "tw_br_attack";
if(typeof aviso === 'undefined') var aviso = true;
if(typeof acao === 'undefined') var acao = "ataque";
if(typeof todas_as_tropas === 'undefined') var todas_as_tropas = false;

if(document.URL.search(/try=confirm/)===-1) {
	if(typeof coords_ataque !== 'undefined') {
		function i(o, v) {
			$("input[name=" + o + "]").attr("value", v)
		}
		if($("input[name=support]").length > 0) {
			coords_ataque = coords_ataque.split(" ");
			n = $.cookie(cookie_atk);
			n == null ? n = 0 : n = parseInt(n);
			if (n >= coords_ataque.length) n = aviso ? (confirm('último ataque já foi enviado, continuar?') ? 0 : -1) : 0;
			if (n >= 0) {
				coords_ataque = coords_ataque[n].split("|");
				i("x", coords_ataque[0]);
				i("y", coords_ataque[1]);
				$.cookie(cookie_atk, n + 1, {
					expires: 10
				});
			}
		}
	}
	var i;
	var nomes = ['spear','sword','axe','archer','spy','light','marcher','heavy','ram','catapult','knight','snob'];
	if(todas_as_tropas == false) {
		for(i=0; i < tropas.length;i++) {
			if(tropas[i] > 0) {
				var e = $('input#unit_input_'+nomes[i]);
				if (e[0]) {
					insertUnit(document.forms[0][nomes[i]], tropas[i])
				}
			}
		}
	} else {
		document.getElementById('selectAllUnits').click();
	}
	if(acao == "ataque")document.forms[0].attack.click();
	if(acao == "apoio")document.forms[0].support.click();
}