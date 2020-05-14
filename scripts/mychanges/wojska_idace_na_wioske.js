/*
         This script...

         scriptname:       Kalkulator wojsk idących na daną wioskę
         author:           Howcio712
         editor:           Rinne, Gangsta Anime Girl
         original url:     https://media.innogamescdn.com/com_DS_PL/skrypty/wojska_idace_na_wioske.js

         editor:           natanprog
         url:              https://natanprog.github.io/scripts/tw/
*/
javascript:
  if (window.location.href.match("info_village") != null){
      var unitlink = "https://dspl.innogamescdn.com/asset/63a05504/graphic/unit/unit_";
var langScript = [];
if (game_data.locale == "en_DK") {
    langScript = [
        "Calculadora de Comandos",
        "Próprios comandos",
        "Todos os comandos",
        "Carregar dados",
        "Tipo",
        "Criado por",
        "Reparado por",
        "Tropas a caminho",
        "Ofensivas:",
        "Defensivas:",
        "Outras:",
        "Bárbaros: ",
        "CL: ",
        "AC: ",
        "Aríetes: ",
        "Lanceiros: ",
        "Espadachins: ",
        "Arqueiros: ",
        "CP: ",
        "Fazendas DEF: ",
        "Exploradores: ",
        "Catapultas: ",
        "Paladinos: ",
        "Nobres: ",
        "DEF na aldeia"
    ]
};
if (game_data.locale == "pt_BR") {
    langScript = [
        "Calculadora de Comandos",
        "Próprios comandos",
        "Todos os comandos",
        "Carregar dados",
        "Tipo",
        "Criado por",
        "Reparado por",
        "Tropas a caminho",
        "Ofensivas:",
        "Defensivas:",
        "Outras:",
        "Bárbaros: ",
        "CL: ",
        "AC: ",
        "Aríetes: ",
        "Lanceiros: ",
        "Espadachins: ",
        "Arqueiros: ",
        "CP: ",
        "Fazendas DEF: ",
        "Exploradores: ",
        "Catapultas: ",
        "Paladinos: ",
        "Nobres: ",
        "DEF na aldeia"
    ]
};
var jednostkiObrazki = "spear,sword,axe,archer,spy,light,marcher,heavy,ram,catapult,knight,snob".split(",");
var tabelka= "<style>#hofcio_div td{white-space: nowrap;} #hofcio_suma_off,#hofcio_suma_def,#hofcio_suma_o,#hofcio_suma_in div{margin:0px 5px 5px 0px;} h4{color:green;} tr{border-spacing: 2px;border-collapse: separate;}</style>";
tabelka +="<div id='hofcio_div' style='width:750px;'><h2>" + langScript[0] + "</h2>"+
"<div style='width:68%;float:left;overflow: auto; height: 350px;'>"+
"<select id='howcio_sel'><option value=0>" + langScript[1] + "</option><option value=1>" + langScript[2] + "</option></select> <input type=button id='howcio_subm' class=btn value='" + langScript[3] + "' onclick='letsgo();'><br><br>"+
"<table class='vis hofcio' id=tabelkahow><tbody><tr class=zostaw>";
for(var a=0;a<jednostkiObrazki.length;a++){    tabelka += "<th width='25px'><img src='"+unitlink+jednostkiObrazki[a]+".png'></th>"}
tabelka +="<th>" + langScript[4] + "</th></tr></tbody></table></div>";
tabelka +="<div style='width:31%;float:right;'><div style='width:100% text-align:center;'><h4 id='hofcio_suma_1h'></h4><div id='hofcio_suma_off' style ='width:45%; float:left;'></div><div id='hofcio_suma_def' style ='width:45%; float:right;'></div></div><div id='hofcio_suma_o'></div><div id='hofcio_suma_in'></div><div style='position: fixed;bottom: 0;right: 0;fontSize:8px'>" + langScript[5] + " <b>Howcio712</b> / " + langScript[6] + " <b>Rinne</b> & <b>Gangsta Anime Girl</b></div></div>";
Dialog.show("okienko_komunikatu",tabelka);
function letsgo(){
    document.getElementById("howcio_subm").disabled=true;
$("#tabelkahow tr").not(".zostaw").remove();
var kom = $(".command_hover_details");
var ideki = [];
for (var i = 0;i< kom.length;i++){
    var klasy = kom[i].classList;
    if(kom[i].getAttribute("data-command-type")=="return"){}else{
    if (klasy[0].includes("commandicon-ally")){
        if(document.getElementById("howcio_sel").value==1){
            if (ideki.includes(kom[i].getAttribute("data-command-id")+":ally")){
}else{ideki.push(kom[i].getAttribute("data-command-id")+":ally");}}}else{
    if (ideki.includes(kom[i].getAttribute("data-command-id")+":own")){
}else{ideki.push(kom[i].getAttribute("data-command-id")+":own");}}}}
var xd = setInterval(function(){
    if(ideki.length<1){
clearInterval(xd);
setTimeout(function(){
    suma();
    document.getElementById("howcio_subm").disabled=false;
},2500)};
    if(game_data.player.sitter != 0){
var url = "game.php?screen=info_command&t=" + game_data.player.id;      
}else{var url = "game.php?screen=info_command";}
if(ideki.length>0){  
var numerek = ideki[0].split(":")[0];
var tekst = ideki[0].split(":")[1];
$.get( url+"&ajax=details&id="+numerek, function( data ) {
dane = JSON.parse(data);
var ikonka = dane.type+".png";
var czas_dojscia = "<img src='https://dspl.innogamescdn.com/asset/63a05504/graphic/command/"+ikonka+"'>";
if(tekst =="ally"){czas_dojscia += "<img src='https://dspl.innogamescdn.com/asset/63a05504/graphic/command/ally.png'>";}
var table = document.getElementsByClassName("hofcio")[0];
var row = table.insertRow();
var cell = row.insertCell(0).innerHTML = dane.units.spear.count;
var cell = row.insertCell(1).innerHTML = dane.units.sword.count;
var cell = row.insertCell(2).innerHTML = dane.units.axe.count;
var cell = row.insertCell(3).innerHTML = dane.units.archer.count;
var cell = row.insertCell(4).innerHTML = dane.units.spy.count;
var cell = row.insertCell(5).innerHTML = dane.units.light.count;
var cell = row.insertCell(6).innerHTML = dane.units.marcher.count;
var cell = row.insertCell(7).innerHTML = dane.units.heavy.count;
var cell = row.insertCell(8).innerHTML = dane.units.ram.count;
var cell = row.insertCell(9).innerHTML = dane.units.catapult.count;
var cell = row.insertCell(10).innerHTML = dane.units.knight.count;
var cell = row.insertCell(11).innerHTML = dane.units.snob.count;
var cell = row.insertCell(12).innerHTML = czas_dojscia;
});}
ideki.splice(0, 1);
if(ideki.length<1){
clearInterval(xd);  
setTimeout(function(){
    suma();
    document.getElementById("howcio_subm").disabled=false;
},2500)};}, 250)}
function suma(){
hofcio_sum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var linijki = $(".hofcio>tbody>tr");

for (var x=1;x<linijki.length;x++){
var kolumny = linijki[x].getElementsByTagName("td")
    for (var c=0;c<kolumny.length;c++){
        var hofcio_sumka = parseInt(linijki[x].getElementsByTagName("td")[c].innerHTML);
        var ile123 = hofcio_sum[c];
        var ile123 = ile123 + hofcio_sumka;
        hofcio_sum[c] = ile123;}}
var zagrody = Math.round(((((1*hofcio_sum[0])+(1*hofcio_sum[1])+(1*hofcio_sum[3])+(6*hofcio_sum[7]))/20000))* 100)/100;
var razemzag =0;
var tablicax = [0,0,0,0,0,0,0,0,0,0,0,0,0];
if(document.getElementsByTagName("h3").length > 1){
var def = $("table.vis");
var wlasciwa = def[def.length-2];
var linijkii = wlasciwa.getElementsByTagName("tr");
for (var i = 1;i<linijkii.length;i++)
{var tdy = linijkii[i].getElementsByTagName("td");
        for (var j = 1;j<tdy.length-2;j++)
        {var hofcio_sumka = parseInt(tdy[j].innerHTML);
        var ile111 = tablicax[j];
        var ile111 = ile111 + hofcio_sumka;
        tablicax[j] = ile111;}}
var razemzag = Math.round(((((1*tablicax[1])+(1*tablicax[2])+(1*tablicax[4])+(6*tablicax[8]))/20000))* 100)/100;
if (razemzag == undefined){razemzag=0;};
}
$("#hofcio_suma_1h")[0].innerHTML = langScript[7];
$("#hofcio_suma_off")[0].innerHTML = "<font color=red>" + langScript[8] + "</font><br>" + langScript[11] + "<b>"+hofcio_sum[2]+"</b><br>" + langScript[12] + "<b>"+hofcio_sum[5]+"</b><br>" + langScript[13] + "<b>"+hofcio_sum[6]+"</b><br>" + langScript[14] + "<b>"+hofcio_sum[8]+"</b>";
$("#hofcio_suma_def")[0].innerHTML = "<font color=red>" + langScript[9] + "</font><br>" + langScript[15] + "<b>"+hofcio_sum[0]+"</b><br>" + langScript[16] + "<b>"+hofcio_sum[1]+"</b><br>" + langScript[17] + "<b>"+hofcio_sum[3]+"</b><br>" + langScript[18] + "<b>"+hofcio_sum[7]+"</b><br><br>" + langScript[19] + "<b>"+zagrody+"</b>";
$("#hofcio_suma_o")[0].innerHTML = "<font color=red>" + langScript[10] + "</font><br>" + langScript[20] + "<b>"+hofcio_sum[4]+"</b><br>" + langScript[21] + "<b>"+hofcio_sum[9]+"</b><br>" + langScript[22] + "<b>"+hofcio_sum[10]+"</b><br>" + langScript[23] + "<b>"+hofcio_sum[11]+"</b>";
$("#hofcio_suma_in")[0].innerHTML = "<h4>" + langScript[24] + "</h4>" + langScript[15] + "<b>"+tablicax[1]+"</b><br>" + langScript[16] + "<b>"+tablicax[2]+"</b><br>" + langScript[17] + "<b>"+tablicax[4]+"</b><br>" + langScript[18] + "<b>"+tablicax[8]+"</b><br>Razem Zagród: <b>"+razemzag+"</b><br>" + langScript[21] + "<b>"+tablicax[10]+"</b><br>" + langScript[12] + "<b>"+tablicax[11]+"</b><br>";
}}else{UI.InfoMessage("Uruchom w informacjach o wiosce<br>(Środkowa ikonka klikając na wioskę na mapie)<br><img src='https://natanprog.github.io/images/mp_info.png'>",8000,"error")};