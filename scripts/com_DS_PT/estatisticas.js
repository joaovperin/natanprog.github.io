javascript: 
/*Inicio script*/
/*Onde executar o script*/
if(game_data.screen != 'info_player' && game_data.screen != 'info_ally')
{
/*Janela de alerta*/
   alert('Execute o script na visualização de um jogador ou de uma tribo!');

}
else
{
   var doc = document;
   if (window.frames.length > 0) doc = window.main.document;
   url = doc.URL;
   if (url.indexOf('&screen=info_player') == - 1)
   {
      {
         var teste = $(location).attr('href').match(/id\=([0-9]+)/)[1];
         var win = (window.frames.length > 0) ? window.main : window;
         var outputID = 'imagens';
         var isEncoded = true;
         function fnRefresh()
         {
            $("#estatistica").draggable ();

         }
         win.$(win.document).ready(function()
         {
            if(win.$('#' + outputID).length <= 0)
            {
			/* Estatistica da tribo*/
               var srcHTML = '<div id="estatistica" style="z-index: 99999; position: fixed; top: 50px; right: 10px; width: 700px; height: 480px; background-color:#CEBC98; background-image: url(../graphic/index/bg-tile.jpg); border:2px solid;  visibility: visible; cursor:pointer">'  +'<center><span style="color:blue;text-decoration:bold;align:center;">Evolução Tribo / Versão 3.1.2</span><br/><br/>'+ '<center>..::Evolução Aldeias::..&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;..::Evolução pontos::..<br/><br/>' + '<center><img src="http://pt.twstats.com/'+game_data.world+'/image.php?type=tribegraph&graph=villages&id='+teste+'" >&nbsp;<img src="http://pt.twstats.com/'+game_data.world+'/image.php?type=tribegraph&graph=points&id='+teste+'" ><br/><br/><center>..::Evolução ODA::..&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;..::Evolução ODD::..<br/><br/><img src="http://pt.twstats.com/'+game_data.world+'/image.php?type=tribegraph&graph=oda&id='+teste+'" >&nbsp;<img src="http://pt.twstats.com/'+game_data.world+'/image.php?type=tribegraph&graph=odd&id='+teste+'" > ' + '<br/><br/><center><input type="radio" id="drag" onClick="drag=this.checked;fnRefresh();"' + (isEncoded ? '' : '') + '/>Soltar (seleccione para soltar esta janela)<br/>' + '<input type=button value="Fechar Janela" onClick="history.go()">' + '<hr>Script compativél com a versão 8.2<br/><br>Última verificação do script efetuada dia 23/03/2012'+'</div>';
               ele = win.$('body').append(win.$(srcHTML));

            }
         }
         );
         void(0);

      }
   }
   else if (url.indexOf('&screen=info_ally') )
   {
      var teste = $(location).attr('href').match(/id\=([0-9]+)/)[1];
      var win = (window.frames.length > 0) ? window.main : window;
      var outputID = 'imagens';
      var isEncoded = true;
      function fnRefresh()
      {
         $("#estatistica").draggable ();

      }
      win.$(win.document).ready(function()
      {
         if(win.$('#' + outputID).length <= 0)
         {
		 /* Estatistica do jogador*/
            var srcHTML = '<div id="estatistica" style="z-index: 99999; position: fixed; top: 50px; right: 10px; width: 700px; height: 480px; background-color:#CEBC98; background-image: url(../graphic/index/bg-tile.jpg); border:2px solid;  visibility: visible; cursor:pointer">'  +'<center><span style="color:blue;text-decoration:bold;align:center;">Evolução Jogador / Versão 3.1.2</span><br/><br/>'+ '<center>..::Evolução Aldeias::..&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;..::Evolução pontos::..<br/><br/>' + '<center><img src="http://pt.twstats.com/'+game_data.world+'/image.php?type=playergraph&graph=villages&id='+teste+'" >&nbsp;<img src="http://pt.twstats.com/'+game_data.world+'/image.php?type=playergraph&graph=points&id='+teste+'" ><br/><br/><center>..::Evolução ODA::..&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;..::Evolução ODD::..<br/><br/><img src="http://pt.twstats.com/'+game_data.world+'/image.php?type=playergraph&graph=oda&id='+teste+'" >&nbsp;<img src="http://pt.twstats.com/'+game_data.world+'/image.php?type=playergraph&graph=odd&id='+teste+'" > ' + '<br/><br/><center><input type="radio" id="drag" onClick="drag=this.checked;fnRefresh();"' + (isEncoded ? '' : '') + '/>Soltar (seleccione para soltar esta janela)<br/>' + '<input type=button value="Fechar Janela" onClick="history.go()">'+'<hr>Script compativél com a versão 8.2<br/><br>Última verificação do script efetuada dia 23/03/2012'+'</div>';
            ele = win.$('body').append(win.$(srcHTML));

         }
      }
      );/*Fim script*/
      void(0);

   }
}