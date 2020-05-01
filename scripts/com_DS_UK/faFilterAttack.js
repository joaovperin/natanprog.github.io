/**
 *	farm assistant - hide entries with troops enroute
 */

$('#am_widget_Farm tr[class^=report]').each(
function(index,item)
{
	var img = $('td:eq(3) img',item);
	var src = img.attr('src');
	if(src != undefined && src.indexOf('attack') != -1)
		$(item).remove();
});