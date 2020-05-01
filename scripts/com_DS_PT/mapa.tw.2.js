// JavaScript Document
var id = prompt('ID?','00000'), colors = '00FF00 00FFFF FFFFFF FF8040 053800 FF0080 C0C0C0 FF0000 808080 FF00FF FFFF00';
void(function()
{
   colors = colors.split(' ');
   var doc = (frames.main || self).document, url = doc.URL, w, l = ['http://pt.twstats.com/' + url.match(/[a-z]+\d+/) + '/index.php?page=map&centrex=500&centrey=500&zoom=100&grid=1&nocache=1&fill=00000'];
   if( ! url.match(/(screen=(ranking|info_member)|mode=members)/))alert('"Este script só funciona nas tabelas de jogador ou tribos.');
   else
   {
      var rows = doc.getElementsByTagName('th')[0].offsetParent.rows, type = rows[1].getElementsByTagName('a')[0].href.match(/player|members/) ? 'player' : 'tribe', dr, i, b = 0, a;
      if(id)l.push('player_0_id=' + id + '&' + type + '_0_colour=' + colors[b ++ ]);
      dr = Math.min(colors.length, rows.length);
      for(i = b; i < dr; i ++ )
      {
         b = type + '_' + i + '_';
         l.push(b + rows[i].getElementsByTagName('a')[0].href.match(/id=\d+/));
         l.push(b + 'colour=' + colors[i]);
      }
      l = l.join('&');
      w = open(l);
      if( ! w)
      {
         a = doc.createElement('a');
         a.href = l;
         a.innerHTML = 'TW Stats kaart';
         a.target = '_blank';
         a.style.backgroundColor = '#f99';
         a.onclick = function()
         {
            a.parentNode.removeChild(a)
         }
         ;
         b = rows[0].offsetParent;
         b.parentNode.insertBefore(a, b)
      }
   }
}
)()
