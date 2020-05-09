ScriptAPI.register( '73-Rohstoffe schicken', true, 'Ademes', 'support-nur-im-forum@ademes.at' );
Scriptversion = 'MIT-Lizenz - Copyright (c) 2012 Ademes , Version 1.8';  
if (top.frames.length > 1){
	var doc = (top.frames[1].document.URL.match('game.php') == 'game.php') ? top.frames[1].document : top.frames[0].document;
} else {
	var doc = document;
};
if (!doc.URL.match('screen=market')){
	UI.InfoMessage('Du musst dich auf dem "Marktplatz" befinden!',3000,true);
} else {
	Ademes_Rohstoffe_schicken(doc);
};
function Ademes_Rohstoffe_schicken(doc){
	var first = doc.getElementById("content_value").getElementsByClassName("vis");
	var ressis_max = new Number(doc.getElementById('market_merchant_max_transport').innerHTML);
	if (typeof(holz) == 'undefined' && typeof(lehm) == 'undefined' && typeof(eisen) == 'undefined') {
	holz = Math.floor(ressis_max/3);
	lehm = Math.floor(ressis_max/3);
	eisen = Math.floor(ressis_max/3);
	}
	var regx = new Array(holz,lehm,eisen,Market.Data.Res.wood,Market.Data.Res.stone,Market.Data.Res.iron);
	if (typeof(gewichtung) == 'undefined') var regx = new Array(regx[0],regx[1],regx[2],regx[3],regx[4],regx[5]);
	else if (gewichtung == 'lehm') var regx = new Array(regx[1],regx[0],regx[2],regx[4],regx[3],regx[5]);
	else if (gewichtung == 'eisen') var regx = new Array(regx[2],regx[0],regx[1],regx[5],regx[3],regx[4]);
	part = Math.floor(ressis_max*ressis_max/(regx[0]+regx[1]+regx[2]));
	regx[0] = (regx[0] < ressis_max && regx[0] < part) ? regx[0] : part;
	ressis_max = (regx[3] < regx[0]) ? (ressis_max - regx[3]) : (ressis_max - regx[0]);
	part = Math.floor(ressis_max*ressis_max/(regx[1]+regx[2]));
	regx[1] = (regx[1] < ressis_max  && regx[1] < part) ? regx[1] : part;
	ressis_max = (regx[4] < regx[1]) ? (ressis_max - regx[4]) : (ressis_max - regx[1]);
	regx[2] = (regx[2] < ressis_max) ? regx[2] : ressis_max;
	if (typeof(gewichtung) == 'undefined') var regx = new Array(regx[0],regx[1],regx[2],regx[3],regx[4],regx[5]);
	else if (gewichtung == 'lehm') var regx = new Array(regx[1],regx[0],regx[2],regx[4],regx[3],regx[5]);
	else if (gewichtung == 'eisen') var regx = new Array(regx[1],regx[2],regx[0],regx[5],regx[4],regx[3]);
	doc.getElementsByName('wood')[0].value = (regx[3] < regx[0]) ? regx[3] : regx[0];
	doc.getElementsByName('stone')[0].value = (regx[4] < regx[1]) ? regx[4] : regx[1];
	doc.getElementsByName('iron')[0].value = (regx[5] < regx[2]) ? regx[5] : regx[2];
	if (typeof(koord) != 'undefined') doc.getElementById('inputx').value = koord.split('|')[0], doc.getElementById('inputy').value = koord.split('|')[1];
	$("input[type|=submit]").click();	
};