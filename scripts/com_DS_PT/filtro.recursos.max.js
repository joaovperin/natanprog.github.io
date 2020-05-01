if(game_data.mode != 'prod')$(location).attr('href', game_data.link_base_pure + 'overview_villages&mode=prod');
$('#production_table tr').each(function(i, e)
{
   if(i != 0)
   {
      excesso = $(e).find('[class*="warn"]');
      if($(excesso).length == 0)$(e).remove();
   }
}
);
void 0
