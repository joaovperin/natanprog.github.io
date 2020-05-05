javascript:
if(!licznik_wojska) var licznik_wojska={};
var langScript = { "en_DK": {
    "0": "Spear_fighter",
    "1": "Swordsman",
    "2": "Axeman",
    "3": "Archer",
    "4": "Scout",
    "5": "Light_cavalry",
    "6": "Mounted_archer",
    "7": "Heavy_cavalry",
    "8": "Ram",
    "9": "Catapult",
    "10": "Paladin",
    "11": "Nobleman",
    "12": "Troop Counter",
    "13": "Group: ",
    "14": "All",
    "15": "Type: ",
    "16": "Available",
    "17": "All Your Own",
    "18": "In Villages",
    "19": "Support",
    "20": "Outwards",
    "21": "In Transit",
    "22": "Export",
    "23": " Please Wait...",
    "24": "There are no villages in the group. <br />Choose another group.",
    "25": " Empty",
    "26": "Attention\nOnly the first 1000 villages",
    "27": "https://help.tribalwars.net/wiki/",
    "28": "Total of ",
    "29": " villages"
    },
    "pt_BR": {
        "0": "Lanceiro",
        "1": "Espadachim",
        "2": "Bárbaro",
        "3": "Arqueiro",
        "4": "Explorador",
        "5": "Cavalaria_Leve",
        "6": "Arqueiro_a_cavalo",
        "7": "Cavalaria_Pesada",
        "8": "Aríete",
        "9": "Catapulta",
        "10": "Paladino",
        "11": "Nobres",
        "12": "Contador de Tropas",
        "13": "Grupo: ",
        "14": "Todos",
        "15": "Tipo: ",
        "16": "Disponível",
        "17": "Todas as Suas Próprias",
        "18": "Nas Aldeias",
        "19": "Apoios",
        "20": "Fora",
        "21": "Em Trânsito",
        "22": "Exportar",
        "23": " Por Favor, Espere...",
        "24": "Não há aldeias no grupo. <br />Escolha outro grupo.",
        "25": " Vazio",
        "26": "Atenção\nSomente as primeiras 1000 aldeias",
        "27": "https://help.tribalwars.com.br/wiki/",
        "28": "Total de ",
        "29": " aldeias"
    }
}
var tabela;
var sumaWojsk = [];
var domyslnyWiersz = '0';
licznik_wojska.link = "/game.php?&village="+game_data.village.id+"&type=complete&mode=units&group=0&page=-1&screen=overview_villages";
if(game_data.player.sitter != 0) 
	licznik_wojska.link="/game.php?t=" + game_data.player.id + "&village="+game_data.village.id+"&type=complete&mode=units&group=0&page=-1&screen=overview_villages";
licznik_wojska.pobraneGrupy = false;
licznik_wojska.obrazki = "spear,sword,axe,archer,spy,light,marcher,heavy,ram,catapult,knight,snob".split(",");
licznik_wojska.nazwyJednostek = langScript[game_data.locale]["0"]+","+langScript[game_data.locale]["1"]+","+langScript[game_data.locale]["2"]+","+langScript[game_data.locale]["3"]+","+langScript[game_data.locale]["4"]+","+langScript[game_data.locale]["5"]+","+langScript[game_data.locale]["6"]+","+langScript[game_data.locale]["7"]+","+langScript[game_data.locale]["8"]+","+langScript[game_data.locale]["9"]+","+langScript[game_data.locale]["10"]+","+langScript[game_data.locale]["11"].split(",");
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