// JavaScript Document
n = confirm('OK = Filtrar aldeias SEM influência religiosa;\nCancelar = Filtrar aldeias COM influência religiosa.');
j = 0;
e = $('#combined_table tr');
a = $(e[0]).find('th');
$(a).each(function(i,e){if($(e).html().match('church')) j = i;});
if(j>0){
  for(i=1;i<e.length;i++){
    a = $(e[i]).find('td');
    var k = $(a[j]).html().match('running');
    if(!n) k = !k; if(k) e[i].parentNode.removeChild(e[i]);
  }
}
void(0);
