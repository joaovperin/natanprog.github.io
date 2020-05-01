var doc = document;
if(window.frames.length > 0)doc = window.main.document;
url = document.URL;
var start = url.indexOf("village");
var end = url.indexOf('%26', start);
var id;
if(end > 0)id = url.substring(start, end);
elseid = url.substring(start);
if(url.indexOf('screen=market') == - 1 || url.indexOf('mode=own_offer') == - 1)location.search = '?screen=market&mode=own_offer&' + id;
else
{
   var wood = new Number(doc.getElementById('wood').innerHTML);
   var clay = new Number(doc.getElementById('stone').innerHTML);
   var iron = new Number(doc.getElementById('iron').innerHTML);
   var forms = doc.getElementsByTagName('form'); var table = ""; for(i = 0; i < forms.length && table == ""; i ++ )
   {
      if(forms[i].action.indexOf('action=modify_offers') != - 1)
      {
         table = forms[i].getElementsByTagName('table')[0];
      }
   }
   for(i = 1; table != "" && i < table.rows.length - 1; i ++ )
   {
      child = table.rows[i].cells[1].childNodes;
      res = child[0].title;
      num = "";
      for(j = 0; j < child.length; j ++ )
      {
         value = child[j].nodeValue;
         if(value != null)num += value;
      }
      num = num.substring(0, num.length - 1);
      num *= new Number(table.rows[i].cells[2].innerHTML);
      if(res == 'Wood')wood += num;
      if(res == 'Clay')clay += num;
      if(res == 'Iron')iron += num;
   }
   e = $('input[id=res_sell_wood]'); e[e.length-1].checked = wood > clay && wood > iron;
	e = $('input[id=res_sell_stone]'); e[e.length-1].checked = clay > wood && clay > iron;
	e = $('input[id=res_sell_iron]'); e[e.length-1].checked = iron > clay && iron > wood;
	e = $('input[id=res_buy_wood]'); e[e.length-1].checked = wood < clay && wood < iron;
	e = $('input[id=res_buy_stone]'); e[e.length-1].checked = clay < wood && clay < iron;
	e = $('input[id=res_buy_iron]'); e[e.length-1].checked = iron < clay && iron < wood;
   wood = Math.round(wood / 1000);
   clay = Math.round(clay / 1000);
   iron = Math.round(iron / 1000);
   offers = Math.max(Math.max(wood, clay), iron) - Math.min(Math.min(wood, clay), iron);
   offers = Math.round(offers / 2.3);
   inputs = doc.getElementsByTagName('input');
   $('input[value=Criar]').focus();
   $('input[name=multi]').val(oferta);
   $('input[name=max_time]').val(tempo);
   document.getElementsByName('buy')[0].value=comprar;
   document.getElementsByName('sell')[0].value=vender;
   document.getElementsByName('buy')[1].value=1000;
   document.getElementsByName('sell')[1].value=1000;
}
end();
