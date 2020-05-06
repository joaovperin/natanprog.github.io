if((game_data.mode == "members")||(game_data.screen == "info_member")){
$("tr.selected").remove();
$("#contentContainer")[0].insertAdjacentHTML("beforebegin", "<div id='wyjebka'><textarea rows='6' cols='100'>Brak zastów od:\n\n</textarea></div><br>")
var ileniedalo = 0;
var zasty=[]
var braki="";
doc = document.createElement("body");

$.get("game.php?screen=settings&mode=vacation")
.done(function(data){
doc.innerHTML = data

lista = $(doc).find(".sitter_details")[0].parentNode.parentNode.parentNode.rows;

$(lista).each(function(o){
if (o == 0){return}else{
zasty.push(lista[o].cells[0].getElementsByTagName("a")[0].innerHTML.trim())}
})
if (game_data.mode == "members"){
var grajki = $("#form_rights>table")[0].rows
}else if (game_data.screen == "info_member"){
var grajki = $(".lit-item")[0].parentNode.parentNode.rows
}

$.each(grajki, function(i){
if(i==0){return}
if((i== grajki.length-1)&&(game_data.mode == "members")){return}
var grajek = grajki[i].cells[0].getElementsByTagName("a")[0].innerHTML.trim()
//console.log(grajek)
//.style.backgroundColor = "green"
if($.inArray(grajek, zasty)>-1){
//console.log($.inArray(grajek, zasty))
grajki[i].cells[0].style.backgroundColor = "lime"
}else{
	ileniedalo++
$("#wyjebka>textarea")[0].value += grajek + ";"

} 
})
$("#wyjebka>textarea")[0].value += "\n\nBrakuje "+ileniedalo+" wisielców";

})
}else{UI.ErrorMessage("Musisz wejść w członków plemienia!", 5000)}