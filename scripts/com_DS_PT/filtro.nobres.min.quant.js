if(typeof nmin === 'undefined' || nmin < 1)
var nmin = prompt('Quantidade', '1');
var j = 0;
$('#combined_table tr').each(function (i, e)
{
   var a;
   if(i == 0)
   {
      a = $(e).find('th');
      j = ($(a[a.length - 2]).html().search('snob') != - 1) ? a.length - 2 : a.length - 3;
   }
   else
   {
      a = $(e).find('td');
      if(parseInt($(a[j]).text()) < nmin)e.parentNode.removeChild(e);
   }
}
);
