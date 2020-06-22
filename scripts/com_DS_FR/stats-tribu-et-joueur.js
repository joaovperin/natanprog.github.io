function getId() {
    var playerId = $(location).attr('search').match( /[?&]id=([0-9]*)?/ );
    return parseInt( playerId[1] );
}
function getStatsUrl(id, graph, type) {
    return "http://fr.twstats.com/" + game_data.world + "/image.php?type=" + type + "graph&graph=" + graph + "&id=" + id;
}

if(game_data.screen == 'info_player' || game_data.screen == 'info_ally') {
	var type = (game_data.screen == 'info_player') ? 'player' : 'tribe';
	
    var points      = getStatsUrl(getId(), 'points',    type);
    var villages    = getStatsUrl(getId(), 'villages',  type);
    var oda         = getStatsUrl(getId(), 'oda',       type);
    var odd         = getStatsUrl(getId(), 'odd',       type);
    
    $('#content_value').prepend("<table><tr><td><table><tr><td>Evolution des Points</td></tr><tr><td><img src='" + points +"'> <br><center><input type='text' value='[img]" + points + "[/img]' onFocus='select();'></center></td></tr><tr><td>Evolutions des Villages</td></tr><tr><td><img src='" + villages +"'><center><input type='text' value='[img]" + villages + "[/img]' onFocus='select();'></center></td></tr></table></td><td><table><tr><td>Evolutions de l'ODA</td></tr><tr><td><img src='" + oda +"'> <center><input type='text' value='[img]" + oda + "[/img]' onFocus='select();'></center></td></tr><tr><td>Evolution ODD</td></tr><tr><td><img src='" + odd +"'><center><input type='text' value='[img]" + odd + "[/img]' onFocus='select();'></center></td></tr></table></td></tr></table>");
} 
else {
    UI.ErrorMessage('Ce script doit être lancé depuis le profil d\'un joueur ou d\'une tribu.', 5000);
}