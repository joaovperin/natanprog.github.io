javascript:
doc=document;
if(window.frames.length>0)
doc=document.main;
url=document.URL;
var start = url.indexOf("village");
var end = url.indexOf('%26', start);
var id;
if (end > 0)
id = url.substring(start, end);
else
id = url.substring(start);
if (url.indexOf('screen=overview_villages') == -1)
location.search = '?screen=overview_villages&mode=prod&' + id;
else {

var pwood = 0;
var pclay = 0;
var piron = 0;

table = doc.getElementById("production_table");
cell = table.rows[0].cells[1].innerHTML;
if (cell.indexOf('">Wioska</a>') > -1) {
var rowsy = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
for(j = 1; j < rowsy; j++){
var innerHTML = table.rows[j].cells[3].innerHTML;
if (innerHTML.indexOf('wood') > -1){

var Wstart = innerHTML.indexOf("<span");
var Wend = innerHTML.indexOf('</span> ', Wstart);
var stringHTML = innerHTML.substring(Wstart, Wend);
var innerHTML = innerHTML.replace(stringHTML,"");
stringHTML = stringHTML.replace(/[^0-9]/gi,"");
pwood = pwood + parseInt(stringHTML);
}
if (innerHTML.indexOf('stone') > -1){
var Wstart = innerHTML.indexOf("<span");
var Wend = innerHTML.indexOf('</span> ', Wstart);
var stringHTML = innerHTML.substring(Wstart, Wend);
var innerHTML = innerHTML.replace(stringHTML,"");
stringHTML = stringHTML.replace(/[^0-9]/gi,"");
pclay = pclay + parseInt(stringHTML);
}
if (innerHTML.indexOf('iron') > -1){
var stringHTML = innerHTML;
stringHTML = stringHTML.replace(/[^0-9]/gi,"");
piron = piron + parseInt(stringHTML);
}

}


table.rows[0].cells[3].innerHTML = '<span class="res wood">' + pwood.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span><span class="res stone">' + pclay.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span><span class="res iron">' + piron.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</span>';

}


}
end();