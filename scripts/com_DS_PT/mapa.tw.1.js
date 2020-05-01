// JavaScript Document
var zoom = prompt('Var Zoom?','100'), grid = 1, abandons = 1;
void(function()
{
   var win = frames.main || self, doc = win.document, link = 'http://pt.twstats.com/pt' + doc.URL.match(/\d+/) + '/index.php?page=map&player_1_id=player_1_colour=FFFF00&tribe_1_id=tribe_1_colour=0000FF&zoom=' + zoom + (grid ? '&grid=1' : '') + (abandons ? '&mtype=abandoned' : ''), c = doc.getElementsByTagName('b');
   if(c && (c = c[0].innerHTML.match(/(\d{1,3})\|(\d{1,3})/)))link += '&centrex=' + c[1] + '&centrey=' + c[2];
   c = doc.URL.match(/screen=info_(player|village|ally)(&|$)/);
   if(c)
   {
      c = c[1] == 'ally' ? 'tribe' : c[1];
      link += '&' + c + '_0_id=' + doc.URL.match(/id=(\d+)/)[1] + '&' + c + '_0_colour=00FF00';
   }
   else alert('"Este script só funciona no perfil de um jogador,aldeia ou tribo."');
   win.open(link)
}
)();
