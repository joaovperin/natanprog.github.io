javascript:
doc = document;
if (window.frames.length > 0)
doc = document.main;
url = document.URL;
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
table = doc.getElementById("production_table");
cell = table.rows[0].cells[1].innerHTML;
if (cell.indexOf('">Wioska</a>') > -1) {
var rowsy = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
for (j = 1; j < rowsy; j++) {
innerHTML = table.rows[j].cells[6].innerHTML;
zagr=innerHTML;
zagr = zagr.split("/");
if(zagr[1].slice(-1) == "<"){
zagr[1] = zagr[1].slice(0,-1)
}
var procent = (zagr[0]/zagr[1])*100;
var red = Math.floor((255*procent)/100);
var green = Math.floor((255*(100-procent))/100);
table.rows[j].cells[6].innerHTML = '<font style="color: rgb('+red+','+green+',0); font-weight: bold;">' +zagr[0] + '/' + zagr[1] +'</font>';
}	
}
}
end();