// IronFist script:
var alapertelmezes = {bbkodos: 'nem',ujsor: 'nem'};
var fejleszto='IronFist';
var verzio='2.3';
$.getScript('https://media.innogamescdn.com/com_DS_HU/scripts/koordinata.js');

// Terkep szinezo gyorsito 
// Scriptet készítette: -Numlock-
var coordbox;
var nextcoordx;
var nextcoordy;

function appendHTML(){
	var ourElement = document.getElementById("map_topo");
	var inputBefore = document.getElementById("map_config");
	
	var buttonn = document.createElement("input");
	buttonn.setAttribute("type", "button");
	buttonn.setAttribute("value", "Következő hozzáadása");
	buttonn.setAttribute("onclick", "addNextCoord()");
	buttonn.setAttribute("class", "btn");
	buttonn.setAttribute("style", "margin-top: 5px;");
	
	ourElement.insertBefore(buttonn, inputBefore);
}

// a koordinata szinezesehez szukseges gomb letrehozasa es beillesztese a weboldalra:
appendHTML();
	
//a buttonn lekattintasanal:
function addNextCoord(){
	// ellenorzese annak hogy a csoport ahova be kell illeszteni a koordinatakat a szinezeshez - nyitva van-e
	if(document.getElementById("for_villages_popup_menu") == null){
		alert("Nyiss meg egy csoportot ahová be szeretnéd illeszteni a következő koordinátát színezés céljából.");
		return;
	}
	
	//az osszegyujtott koordinatak begyujtese egy valtozoba es azok feldolgozasa illetve hozzaadasa a csoporthoz
	coordbox = document.getElementById("scriptused_coords").value;
	if(coordbox.match(/\d\d\d\|\d\d\d/) !== null){
		nextcoordx = coordbox.match(/\d\d\d\|/);
		nextcoordy = coordbox.match(/\|\d\d\d/);
		nextcoordy = nextcoordy[0].replace("\|","");
		
		coordbox = coordbox.replace(/\d\d\d\|\d\d\d/, "");
		coordbox = coordbox.trim();
		
		document.getElementById("scriptused_coords").value = coordbox;
		
		document.getElementById("add_village_x").value = parseInt(nextcoordx);
		document.getElementById("add_village_y").value = parseInt(nextcoordy);
		document.getElementById("add_new_village").click();
	}else{
		alert("Nincs több koordináta a dobozban.")
	}
	
}