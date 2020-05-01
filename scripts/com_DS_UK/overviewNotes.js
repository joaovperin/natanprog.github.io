/*	displays village notes on overviews
 *	credit: mark12lancs, slowtarget
 */
$('.village_note').each(function(){$(this).parent('td').append(' <span>'+this.tooltipText+"</span>");});void 0;