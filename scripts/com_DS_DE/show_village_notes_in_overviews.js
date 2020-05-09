ScriptAPI.register( '93-Dorfnotizen in Übersicht anzeigen', true, 'Harpstennah', 'support-nur-im-forum@arcor.de' );
/*    displays village notes on overviews
 *    credit: mark12lancs, slowtarget
 */
$('.village_note').each(function(){$(this).parent('td').append(' <span>'+this.tooltipText+"</span>");});
