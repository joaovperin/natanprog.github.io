function trim(str) {
return str.replace(/^\s+|\s+$/g,"");
}
var od = prompt('O jogador em questão tem Inimigos derrotados? \n\nResponda s ou n\n\n','');
if(document.URL.indexOf('screen=info_player') == - 1)
{
   alert('Você deve executar o script no perfil de algum jogador!');
}else if(od == "s"){
var tds = document.getElementsByTagName("TD");
   var K = new Array();
   for(var idx = 0; idx < 100; idx ++ )K[idx] = new Array();
   var C = new Array();
   for(var idx = 0; idx < tds.length; idx ++ )
   {
      var xy = tds[idx].innerHTML;
      if(/^\d+\|\d+$/.test(xy))
      {
         C.push(xy);
         var xys = xy.split('|');
         K[Math.floor(parseInt(xys[0]) / 100) + Math.floor(parseInt(xys[1]) / 100) * 10].push(xy);
      }
   }
   C = C.join('[/village] [village]');
   var body = document.getElementById("content_value");
   var table = body.getElementsByTagName('table')[1];
   var tribo = table.getElementsByTagName('td')[7];
   var nome = table.getElementsByTagName('th')[0];
   var prefixos = '<textarea  cols=30 rows=5>';
   var prefixo = '<textarea  cols=30 rows=1>';
   var prefix = '<textarea  cols=30 rows=10>';
   var postfix = '<\/textarea>';
   var S = '<html>' + '<link rel=\"stylesheet\" type=\"text/css\" href=\"/merged/game.css\"/>' + '<head>' + '<title>Coordenadas do jogador em BB</title>' + '<meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\" />' + '</head>' + '<body>' + '<b><center>Coordenadas em Código BB</center></b><hr>';
   S += '<b><center>Jogador:</center></b><br>' + prefixo + '[player]' + trim(nome.textContent) + '[/player]' + postfix;
   S += '<br><br><b><center>Tribo:</center></b><br>' + prefixo + '[ally]' + trim(tribo.textContent)  + '[/ally]' + postfix;
   S += '<hr><b><center>Todas as Aldeias do Jogador:</center></b><br><br>' + prefix + '[village]' + C + '[/village]' + postfix + '<hr>';
   S += '<b><center>Aldeias por Continentes:</center></b><br>';
   for(var idx = 0; idx < 100; idx ++ )if(K[idx].length > 0)
   {
      var Ks = K[idx].join('[/village] [village]');
      S += '<br><b>k:</b></font>' + '<b> ' + idx + '</b>' + ' <br>' + prefixos + '[village]' + Ks + '[/village]' + postfix;
   }
   S += '<center><hr>Script compativél com a versão 8.2<br/><br>Última verificação do script efetuada dia 23/03/2012';
   S += '</body></html>';
   var popup = window.open('about:blank', 'twcc', 'width=291,height=550,scrollbars=1');
   popup.document.open('text/html', 'replace');
   popup.document.write(S);
   popup.document.close();

}
else
{
   var tds = document.getElementsByTagName("TD");
   var K = new Array();
   for(var idx = 0; idx < 100; idx ++ )K[idx] = new Array();
   var C = new Array();
   for(var idx = 0; idx < tds.length; idx ++ )
   {
      var xy = tds[idx].innerHTML;
      if(/^\d+\|\d+$/.test(xy))
      {
         C.push(xy);
         var xys = xy.split('|');
         K[Math.floor(parseInt(xys[0]) / 100) + Math.floor(parseInt(xys[1]) / 100) * 10].push(xy);
      }
   }
   C = C.join('[/village] [village]');
   var body = document.getElementById("content_value");
   var table = body.getElementsByTagName('table')[1];
   var tribo = table.getElementsByTagName('td')[5];
   var nome = table.getElementsByTagName('th')[0];
   var prefixos = '<textarea  cols=30 rows=5>';
   var prefixo = '<textarea  cols=30 rows=1>';
   var prefix = '<textarea  cols=30 rows=10>';
   var postfix = '<\/textarea>';
   var S = '<html>' + '<link rel=\"stylesheet\" type=\"text/css\" href=\"/merged/game.css\"/>' + '<head>' + '<title>Coordenadas do jogador em BB</title>' + '<meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\" />' + '</head>' + '<body>' + '<b><center>Coordenadas em Código BB</center></b><hr>';
   S += '<b><center>Jogador:</center></b><br>' + prefixo + '[player]' + trim(nome.textContent) + '[/player]' + postfix;
   S += '<br><br><b><center>Tribo:</center></b><br>' + prefixo + '[ally]' + trim(tribo.textContent)  + '[/ally]' + postfix;
   S += '<hr><b><center>Todas as Aldeias do Jogador:</center></b><br><br>' + prefix + '[village]' + C + '[/village]' + postfix + '<hr>';
   S += '<b><center>Aldeias por Continentes:</center></b><br>';
   for(var idx = 0; idx < 100; idx ++ )if(K[idx].length > 0)
   {
      var Ks = K[idx].join('[/village] [village]');
      S += '<br><b>k:</b></font>' + '<b> ' + idx + '</b>' + ' <br>' + prefixos + '[village]' + Ks + '[/village]' + postfix;
   }
   S += '<center><hr>Script compativél com a versão 8.2<br/><br>Última verificação do script efetuada dia 23/03/2012';
   S += '</body></html>';
   var popup = window.open('about:blank', 'twcc', 'width=291,height=550,scrollbars=1');
   popup.document.open('text/html', 'replace');
   popup.document.write(S);
   popup.document.close();
}
