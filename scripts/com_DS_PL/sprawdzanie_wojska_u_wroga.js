javascript:

var nejm = [".T.", ":T:", "PasiChłop"]; // tutaj wpisujemy nick gracza lub skrót plemienia, można wpisać dowolną ilość





		if ((window.location.href.match("overview_villages") != null)&&(window.location.href.match("away_detail") != null)){
		

var iloscwiosek = $("table#units_table>tbody>tr").length;
var i,j;
suma3 =0;
match = false;


	
for (i = 0; i < iloscwiosek-1; i++) {
var wies = $("table#units_table>tbody>tr")[i].getElementsByTagName("td")[0];
var nazwawioski=wies.innerText.toLowerCase(); 
	
	for(j=0;j<nejm.length;j++){
	
if (nazwawioski.indexOf(nejm[j].toLowerCase())>1){
	wies.style.backgroundColor = "red";
console.log("Wioska "+nazwawioski+ "nejm: "+nejm[j]);
match = true;
}

}
}

if (match){
	UI.InfoMessage('Uwaga! Twój def znajduje się u wroga!',5000,'error')
}else{
	UI.InfoMessage('Nie masz żadnego defa u wroga ;)',5000,'success')
}
}else{
	UI.InfoMessage('Przejdź do Przegląd -> Wojska -> Pomoc',5000,'error')
}