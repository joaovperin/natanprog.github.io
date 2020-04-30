//----------------------------------------------------------------
//Projeto:		Calc. BT & Snipe
//Autor:		Desconhecido
//Editor:		Gil Penner (Paçoquita) <skype: gilhrpenner@gmail.com>
//Versão:		1.0 - 09/07/2015
//Changelog:
//		> 1.0 - Lançamento
//---------------------------------------------------------------

if(game_data.player.premium == false) {
	UI.InfoMessage('Para utilizar esse script é necessário uma Conta Premium!', 3000, true);
	end();
}

function calcular() {
	if(document.getElementById('bt1').value.match(/[0-9]{2}\:[0-9]{2}\:[0-9]{2}/) != null && document.getElementById('bt2').value.match(/[0-9]{2}\:[0-9]{2}\:[0-9]{2}/) != null) {
	var timeArray = document.getElementById('bt1').value.split(':');
	var travArray = document.getElementById('bt2').value.split(':');
	var result;
	
	//Back Time
	var h = parseInt(timeArray[0], 10) + parseInt(travArray[0], 10);
	var m = parseInt(timeArray[1], 10) + parseInt(travArray[1], 10);
	var s = parseInt(timeArray[2], 10) + parseInt(travArray[2], 10);

	if (s > 60) {
		m += 1;
		s -= 60;
	}
	if (m > 60) {
		h += 1;
		m -= 60;
	}
	if (h >= 24) {
		h -= 24;
	}
	if (s < 10) {
		s = '0' + s;
	}
	if (m < 10) {
		m = '0' + m;
	}
	if (h < 10) {
		h = '0' + h;
	}
	result = h + ':' + m + ':' + s;
	$("#resultado").html("Back:&nbsp; " + result + " (Tropas retornam)");
	
	//Snipe
	var H = parseInt(timeArray[0], 10) - parseInt(travArray[0], 10);
	var M = parseInt(timeArray[1], 10) - parseInt(travArray[1], 10);
	var S = parseInt(timeArray[2], 10) - parseInt(travArray[2], 10);
	
	if(S < 0) {S = 60 - (S * -1);M --;}
	if(M < 0) {M = 60 - (M * -1);H --;}
 	if(H < 0 ) {H = 24 - (H * -1);if(H>10) {H = 'Ontem às ' + H;}else if(H<10) {H = 'Ontem às ' + H;}}
 	if(S<10) {S = '0' + S;}
 	if(M<10) {M = '0' + M;}
 	if(H<10) {H = '0' + H;}	
	
	result = H + ':' + M + ':' + S;
	$("#resultado").html($("#resultado").html() + "<br />Snipe: " + result);
	$("#resultado").fadeIn("slow");
	} else {
		$("#resultado").html("<p style='color: red;'>Formato de horas incorreto!<br />Utilize: HH:MM:SS</p> ");
		$("#resultado").fadeIn("slow");
	}
}

var conteudo = '<div style=max-width:600px;>' +
'<h2 class="popup_box_header">Calc. BT & Snipe</h2>' +
'<p><div style="text-align: center;">Hora do ataque<br /><input type="text" id="bt1"><br />Duração<br /><input type="text" id="bt2"><br /><br /><input onClick="calcular()" style="padding-left: 28px; background: #6C4824 url(https://brtwscripts.com/calc-icon.png) no-repeat 10px" class="btn" type="submit" value="Calcular"></div></p>' +
'<div id="resultado" style="display: none;">Back:&nbsp; xx:xx:xx<br />Snipe: xx:xx:xx</div>' +
'</div>';

Dialog.show('bt_snipe_calc', conteudo);