javascript: function wstaw_all(jednostka){
var ile="";
var pole="#unit_input_"+jednostka;
var tresc_pola = $(pole).next().text(); var i=1;
while(i < tresc_pola.length-1){
ile=ile+tresc_pola; i++;} return(ile); }

var licz=0;
var atak = document.getElementsByClassName("command_hover_details");
for(var x=0;x<atak.length;x++)
{
if(atak[x].getAttribute("data-icon-hint")=="Mały atak (1-1000 jednostek)")
licz++;
}
document.getElementById("unit_input_spear").value=0;
document.getElementById("unit_input_sword").value=0;
document.getElementById("unit_input_axe").value=wstaw_all("axe")-(wstaw_all("snob")*50) ;
document.getElementById("unit_input_spy").value=wstaw_all("spy") ;
document.getElementById("unit_input_light").value=wstaw_all("light")-(wstaw_all("snob")*25) ;
document.getElementById("unit_input_heavy").value=0;
document.getElementById("unit_input_ram").value=wstaw_all("ram") ;

var kat=0;
switch(licz){
case 0: kat=wstaw_all("catapult")-50; break;
case 1: kat=wstaw_all("catapult")-25; break;
case 2: kat=wstaw_all("catapult"); break;
}
document.getElementById("unit_input_catapult").value=kat ;
void(0);