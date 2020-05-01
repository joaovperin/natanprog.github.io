/**	twclip linker
 *	opens a fan website in a new window
 	website opened: the conquer feed for the user's tribe at www.twclip.com
 *	author:	Nick Toby(cheesasaurus@gmail.com)
 */

window.open('http://www.twclip.com/'+ game_data.market +
	'/tracker-popup?world=' + game_data.world +
	'&tribeId=' + game_data.player.ally_id + 
	'&playerId=' + game_data.player.id +
	'&link_base=' + escape(game_data.link_base),
	'_blank',
	'location=no,menu=no,height=500,width='+document.getElementById('contentContainer').clientWidth);