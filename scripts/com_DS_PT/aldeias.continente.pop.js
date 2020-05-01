void(function()
{
   var pre = '[village]', post = '[/village]\n', win = frames.main || self, doc = win.document;
   if(doc.URL.indexOf('screen=info_player') == - 1)
   {
      alert('Este script só funciona no perfil do jogador.');
      return;
   }
   var h = doc.getElementsByTagName('th'), i, j, l, c = [], d, k, th;
   for(i = 0; i < 99; i ++ )
   {
      c[i] = [];
   }
   for(i = 0; i < h.length; i ++ )
   {
      if(h[i].width == 80)
      {
         l = h[i].parentNode.cells;
         for(j = 1; j < l.length; j ++ )
         {
            if(h[i] == l[j])
            {
               th = j;
               break;
            }
         }
         h = h[i].offsetParent.rows;
         l = h.length;
         if(l < 2)return;
         for(i = 1; i < l; i ++ )
         {
            k = (d = h[i].cells[th].innerHTML).split('|');
            k = Math.floor(k[0] / 100) + 10 * Math.floor(k[1] / 100);
            c[k].push(d);
         }
         l -- ;
         d = c.join(',').replace(/,+/g, ' ').replace(/^ +| +$/g, '');
         if(bbcode)d = pre + d.split(' ').join(post + pre) + post;
         k = function(k)
         {
            return'<h4>' + k + '</h4><textarea cols="50" rows="'+Math.min(7,Math.ceil(d.length/90))+'" onfocus="this.select()" readonly="readonly">' + d + '</textarea>'
         }
         ;
         h = '<button onclick="parentNode.parentNode.removeChild(parentNode)">Fechar</button><h3>TW Gerador de listas</a>.' + k('Total de aldeias (' + l + ')');
         for(i = 0; i < 99; i ++ )
         {
            if((l = c[i].length))
            {
               d = bbcode ? pre + c[i].join(post + pre) + post : c[i].join(' ');
               h += k('K' + i + ': ' + l + ' aldeia' + (l > 1 ? 's' : ''));
            }
         }
         if(popup)
         {
            l = open(), l = l.document;
            l.title = 'Co\xf6rdinaten zoeker';
            l.write(h);
            l.close();
         }
         else
         {
            l = doc.createElement('div');
            l.style.cssText = 'border:1px solid black;z-index:99999;background:#D2C09E;position:absolute;top:30px;left:' + (screen.availWidth / 2 - 200) + 'px;width:400;height:90% ;padding:9px;overflow:auto';
            l.innerHTML = h;
            doc.body.appendChild(l);
            win.scrollTo(0, 0)
         }
         return
      }
   }
   return
}
)();
