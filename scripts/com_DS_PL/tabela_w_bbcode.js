javascript:
var gracze = [];
var plemiona = [];
var opcje = "<div id='opcje' align='center' style=\"display: none;\"><h2>Opcje</h2><table class='vis'><tr><th>Pierwszy wiersz jako nagłówek<td><input id='naglowek' type='checkbox' checked><tr><th>Nazwy graczy w bb-code<td><input id='form_gracze' type='checkbox' checked><tr><th>Skróty plemion w bb-code<td><input id='form_plemiona' type='checkbox' checked><tr><th>Formatuj współrzędne wiosek<td><input id='form_wspol' type='checkbox' checked></table><br><input type='button' class='btn' onclick=przelaczOpcje(); value='Powrót'></div>";
Dialog.show("tabela_do_bb",opcje+"<div id='zamiana_tabel' align='center'><h2>Zamiana tabel</h2><textarea id='wklejona_tabela' onclick=\"this.select();\" cols=35 rows=10>Wklej swoją tabelkę</textarea><br><input type='button' class='btn btn-confirm-yes' onclick=zamienNaBB(); value='Zamień'><input type='button' class='btn' onclick=\"przelaczOpcje();\" value='Opcje'></div>");
gracze = pobierz("/map/player.txt",1);
plemiona = pobierz("/map/ally.txt",2);
void 0;
function przelaczOpcje(){
	$("#opcje").toggle();
	$("#zamiana_tabel").toggle();
}
function najwiecejKolumn(tab){
	var maxKolumn = 0;
	for(i=0;i<tab.length;i++){
		if(!tab[i].match(/\t/g)) continue;
		ileKolumn = tab[i].match(/\t/g).length;
		if(ileKolumn > maxKolumn)
			maxKolumn = ileKolumn;
	}
	return maxKolumn+1;
}
function zamienNaBB(){
    var wiersz = document.getElementById('wklejona_tabela').value.split("\n");
	if(wiersz.indexOf("[table]") != -1){
		UI.ErrorMessage("Błąd. W polu tekstowym znajduje się inna tabela w bb-code !");
		return false;
	}
	var maxIloscKolumn = najwiecejKolumn(wiersz);
	tabela="[table]";
	var n = 0;
	if(naglowek.checked == 1){
		komorka=wiersz[0].split("\t");
		tabela += "\n[**]";
		for(var i=0;i<maxIloscKolumn;i++){
			if(!komorka[i]);
			else tabela+=komorka[i];
			tabela+=(i!=maxIloscKolumn-1?"[||]":"");
		}
		tabela+="[/**]\n";
		n++;
	}
	for(i=n;i<wiersz.length;i++){
		komorka=wiersz[i].split("\t");
		tabela+="[*]";
		for(var j=0;j<maxIloscKolumn;j++){
			if(!komorka[j]);
			else if(komorka[j].match(/\d+\|\d+/) && form_wspol.checked == 1)
				tabela+=" "+komorka[j].match(/\d+\|\d+/)+" ";
			else if(form_gracze.checked == 1)
				tabela+=formatuj(komorka[j],gracze,"player]");
			else if(form_plemiona.checked == 1)
				tabela+=formatuj(komorka[j],plemiona,"ally]");
			else
				tabela+=komorka[j];
			tabela+=(j!=maxIloscKolumn-1?"[|]":"");
		}
		tabela+="[/*]\n";
	}
	tabela+="[/table]";
	if((tmp = tabela.match(/\[/g).length) > 1000) 
		UI.ErrorMessage("Uwaga duża ilość nawiasów. Razem "+tmp);
	document.getElementById('wklejona_tabela').value = tabela;
}
function formatuj(tekst,tab,bb){
	tekst = tekst.trim();
	var nick = tekst.toLowerCase();
	for(i=0;i<tab.length;i++){
		if(nick == tab[i]){
			tekst="["+bb+tekst+"[/"+bb;
			break;
		}
	}
	if(bb=="player]" && !tekst.match("player]") && form_plemiona.checked == 1)
		return formatuj(tekst,plemiona,"ally]");
	else return tekst;
}
function pobierz(link,ktora){
	var tab = [];
	var r;
	r = new XMLHttpRequest();    
	r.open('GET', link, true);
	function processResponse(){
		if (r.readyState == 4 && r.status == 200) {
			wiersz=r.responseText.split("\n");
			for(i=0;i<wiersz.length;i++){
				kolumna = wiersz[i].split(",");
				nick = decodeURIComponent(kolumna[ktora]).replace(/\+/g, ' ');
				tab.push(nick.toLowerCase());
			}	
		};
	}
	r.onreadystatechange = processResponse;
	r.send(null);
	return tab;
}