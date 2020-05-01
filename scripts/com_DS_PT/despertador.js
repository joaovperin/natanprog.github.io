javascript:
function despertador()
{
var hora=new Date();
var h=hora.getHours();
var m=hora.getMinutes();
var s=hora.getSeconds();
h=despertadorzero(h);
m=despertadorzero(m);
s=despertadorzero(s);
document.title = h+":"+m+":"+s+" -> "+hora_despertar;
if (h+":"+m+":"+s == hora_despertar){
window.open ("http://scripts.ds.solutions.pt/js/som.htm", "Som","menubar=0,resizable=0,width=50,height=30");
return false
};
t=setTimeout('despertador()',500);
}
function despertadorzero(i)
{
if (i<10)
  {
  i="0" + i;
  }
return i;
}
$(document).ready(function () {
hora_despertar = prompt('Introduzir hora com os seguintes formato\n\nhh:mm:ss','00:00:00');
despertador();
});
void(0);
