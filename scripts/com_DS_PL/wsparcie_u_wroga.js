javascript:
var okienko = "<h2 align='center'>Ilość wsparć u wroga</h2><table width='100%'>";
var licz=0;
var plemiona = ["[LEGEND]", "[GEH]", "[~SS~]", "[!N!]","[!O!]","[ABW]"];

for (j=0;j<plemiona.length;j++)
{
licz=0;
var x = $('#units_table').find('.row_a');
for (i=0;i<x.length;i++){ if (x.children[0].outerText.indexOf(plemiona[j])>=0) licz++;}
var x = $('#units_table').find('.row_b');
for (i=0;i<x.length;i++){ if (x.children[0].outerText.indexOf(plemiona[j])>=0) licz++;}
okienko += "<tr><td><table width='100%'><tr><th colspan='4'>"+plemiona[j]+"</th><th colspan='4'>"+licz+"</th></tr></table><tr>";
}
okienko+="</table>";
Dialog.show("okienko_komunikatu",okienko);

void(0);