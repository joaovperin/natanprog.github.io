javascript:
/*Script API*/
ScriptAPI.register( '105-AG Bau', true, 'Mausmajor', 'none' );
if(game_data.screen=="snob")
{
    /*löst das bauen aus*/
	/*nun wird erst auf das AG-icon zugegriffen und von dort aus weiter gehangelt*/
    $('#content_value .unit_link').parent().parent().find('td:last a')[0].click();
}else{
  /*Fehlermeldung wenn man sich auf der falschen Seite befindet*/
  UI.ErrorMessage('Du musst dich auf dem Adelshof befinden!');
}