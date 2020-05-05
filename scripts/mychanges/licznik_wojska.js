javascript:
if(!licznik_wojska) var licznik_wojska={};
var langScript = [
    "Spear_fighter",
    "Swordsman",
    "Axeman",
    "Archer",
    "Scout",
    "Light_cavalry",
    "Mounted_archer",
    "Heavy_cavalry",
    "Ram",
    "Catapult",
    "Paladin",
    "Nobleman",
    "Troop Counter",
    "Group: ",
    "All",
    "Type: ",
    "Available",
    "All Your Own",
    "In Villages",
    "Support",
    "Outwards",
    "In Transit",
    "Export",
    " Please Wait...",
    "There are no villages in the group. <br />Choose another group.",
    " Empty",
    "Attention\nOnly the first 1000 villages",
    "https://help.tribalwars.net/wiki/",
    "Total of ",
    " villages"
    ]
if(game_data.locale =="pt_BR"){
    langScript = [
    "Lanceiro",
    "Espadachim",
    "Bárbaro",
    "Arqueiro",
    "Explorador",
    "Cavalaria_Leve",
    "Arqueiro_a_cavalo",
    "Cavalaria_Pesada",
    "Aríete",
    "Catapulta",
    "Paladino",
    "Nobres",
    "Contador de Tropas",
    "Grupo: ",
    "Todos",
    "Tipo: ",
    "Disponível",
    "Todas as Suas Próprias",
    "Nas Aldeias",
    "Apoios",
    "Fora",
    "Em Trânsito",
    "Exportar",
    " Por Favor, Espere...",
    "Não há aldeias no grupo. <br />Escolha outro grupo.",
    " Vazio",
    "Atenção\nSomente as primeiras 1000 aldeias",
    "https://help.tribalwars.com.br/wiki/",
    "Total de ",
    " aldeias"
    ]
}
var tabela;
var sumaWojsk = [];
var domyslnyWiersz = '0';
licznik_wojska.link = "/game.php?&village="+game_data.village.id+"&type=complete&mode=units&group=0&page=-1&screen=overview_villages";
if(game_data.player.sitter != 0) 
	licznik_wojska.link="/game.php?t=" + game_data.player.id + "&village="+game_data.village.id+"&type=complete&mode=units&group=0&page=-1&screen=overview_villages";
licznik_wojska.pobraneGrupy = false;
licznik_wojska.obrazki = "spear,sword,axe,archer,spy,light,marcher,heavy,ram,catapult,knight,snob".split(",");
licznik_wojska.nazwyJednostek = langScript[0],langScript[1],langScript[2],langScript[3],langScript[4],langScript[5],langScript[6],langScript[7],langScript[8],langScript[9],langScript[10],langScript[11].split(",");
var okienko = "<h2 align='center'>Troop Counter</h2><table width='100%'><tr><th>Group: <select id='listaGrup' onchange=\"licznik_wojska.link = this.value; pobierzDane();\"><option value='"+licznik_wojska.link+"'>All</select>";
okienko += "<tr><td><table width='100%'><tr><th colspan='4'>Type: <select onchange=\"zmiana(this.value);\"><option value='0'>Available<option value='0p2p3'>All Your Own<option value='1'>In Villages<option value='1m0'>Support<option value='2'>Outwards<option value='3'>In Transit</select><tbody id='dostepne_wojska'></table><tr><th><b id='ilosc_wiosek'></b><a href='#' style='float: right;' onclick=\"eksportuj();\">Export</a></table>";
Dialog.show("okienko_komunikatu",okienko);
pobierzDane();
void 0;
function eksportuj(){
	if(!$("#dostepne_wojska").html().match("textarea")) 
		$("#dostepne_wojska").html(licznik_wojska.eksport);
	else	
		zmiana(domyslnyWiersz);
}
function pobierzDane(){
	$("#ilosc_wiosek").html(" Please Wait...");
	$(mobile?'#loading':'#loading_content').show();
	var r;
	r = new XMLHttpRequest();
	r.open('GET', licznik_wojska.link, true);
	function processResponse(){
		if (r.readyState == 4 && r.status == 200) {
			requestedBody = document.createElement("body");
			requestedBody.innerHTML = r.responseText;
			tabela = $(requestedBody).find('#units_table').get()[0];
			if(!tabela){ $("#dostepne_wojska").html("There are no villages in the group. <br />Choose another group."); $("#ilosc_wiosek").html(" Empty"); return false;}
			var grupy = $(requestedBody).find('.vis_item').get()[0].getElementsByTagName(mobile?'option':'a');
			if(tabela.rows.length>4000) alert("Attention\nOnly the first 1000 villages");
			if(!licznik_wojska.pobraneGrupy){
				for(i=0;i<grupy.length;i++){
					nazwa = grupy[i].textContent;
					if(mobile && grupy[i].textContent=="wszystkie") continue;
					$("#listaGrup").append($('<option>', {
						value: grupy[i].getAttribute(mobile?"value":"href")+"&page=-1",
						text: mobile?nazwa:nazwa.slice(1,nazwa.length-1)
					}));	
				}
				licznik_wojska.pobraneGrupy = true;
				if(!tabela.rows[0].innerHTML.match("archer")){
					licznik_wojska.obrazki.splice(licznik_wojska.obrazki.indexOf("archer"),1);
					licznik_wojska.obrazki.splice(licznik_wojska.obrazki.indexOf("marcher"),1);
				}
				if(!tabela.rows[0].innerHTML.match("knight"))
					licznik_wojska.obrazki.splice(licznik_wojska.obrazki.indexOf("knight"),1); 
			}
			sumuj();
			zmiana(domyslnyWiersz);
		};
	}
	r.onreadystatechange = processResponse;
	r.send(null);
}
function zmiana(tekst){
	domyslnyWiersz = tekst;
	ktory = String(tekst).match(/\d+/g);
	coZrobic = String(tekst).match(/[a-z]/g);
	var nowaSuma = [];
	for(j=0;j<licznik_wojska.obrazki.length;j++)
		nowaSuma[j] = 0;
	for(i=0;i<ktory.length;i++)
		if(i==0 || coZrobic[i-1]=="p")
			nowaSuma = dodaj(nowaSuma,sumaWojsk[ktory[i]]);
		else 
			nowaSuma = odejmij(nowaSuma,sumaWojsk[ktory[i]]);
	wypisz(nowaSuma);
}
function sumuj(){
	for(i=0;i<5;i++){
		sumaWojsk[i] = [];
		for(j=0;j<licznik_wojska.obrazki.length;j++)
			sumaWojsk[i][j] = 0;
	}
	for(var i=1;i<tabela.rows.length;i++){
		m = (tabela.rows[1].cells.length == tabela.rows[i].cells.length)?2:1; 
		for(var j=m;j<licznik_wojska.obrazki.length+m;j++){
			sumaWojsk[(i-1)%5][j-m] += parseInt(tabela.rows[i].cells[j].textContent);
		}
	}
}
function odejmij(sumaWojsk1,sumaWojsk2){
	var wynik = [];
	for(k=0;k<licznik_wojska.obrazki.length;k++)
		wynik[k] = sumaWojsk1[k] - sumaWojsk2[k];
	return wynik;
}
function dodaj(sumaWojsk1,sumaWojsk2){
	var wynik = [];
	for(k=0;k<licznik_wojska.obrazki.length;k++)
		wynik[k] = sumaWojsk1[k] + sumaWojsk2[k];
	return wynik;
}
function rysujSpacje(ile){
	var tekst = String(ile);
	var wynik = "";
	for(j=0;j<(10-tekst.length);j++)
		wynik += "\u2007";
	return wynik;
}
function wypisz(sumaWojskDoWypisania){
	elem = "<tr>";
	licznik_wojska.eksport = "<textarea rows='7' cols='25' onclick=\"this.select();\">";
	for(i=0;i<licznik_wojska.obrazki.length;i++){
		licznik_wojska.eksport +="[unit]"+licznik_wojska.obrazki[i]+"[/unit]"+sumaWojskDoWypisania[i]+(i%2==0?rysujSpacje(sumaWojskDoWypisania[i]):"\n");
		elem += (i%2==0?"<tr>":"")+"<th width='20'><a href='https://help.tribalwars.net/wiki/"+licznik_wojska.nazwyJednostek[i]+"' target='_blank'><img src='"+image_base + "unit/unit_"+licznik_wojska.obrazki[i]+".png'></a><td bgcolor='#fff5da'>"+sumaWojskDoWypisania[i];
	}
	licznik_wojska.eksport += "</textarea>";
	$("#dostepne_wojska").html(elem);
	$(mobile?'#loading':'#loading_content').hide();
	$("#ilosc_wiosek").html("Total of "+((tabela.rows.length-1)/5)+" villages");
}