function formatSmiles(string){
    var smiles = [
    	[':\\\)', '01.png'],
    	[':o', '04.png'],
    	[':\\\(', '03.png'],
    	[':p', '06.png'],
    	[';\\\)', '05.png'],
    	[':\\\|', '02.png'],
    	[':rofl:', '07.png'],
    	['8D', '09.png'],
    	[':\\\$', '12.png'],
    	[':mad:', '10.png'],
    	[':D', '11.png'],
    	[':zip:', '13.png'],
    	[';\\\(', '14.png'],
    	[':inlove:', '15.png'],
    	[':angel:', '18.png']
	];
    for(var i = 0; i < smiles.length; i++){
        string = string.replace(new RegExp(smiles[i][0], 'gi'), '[img]http://forum.guerretribale.fr/images/smilies/' + smiles[i][1] + '[/img]');
    }
    return string;
}

/*== main ==*/
if (game_data.screen == 'forum') { 
$('form').submit(function(){
    $('#message').val(formatSmiles( $('#message').val()) );
	return true; 
})
} else {
UI.ErrorMessage('Ce script doit être exécuté depuis le forum de votre tribu', 5000);
} 