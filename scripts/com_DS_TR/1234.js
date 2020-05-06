/* 
	Yazar(Author)     : Konsantre
	Forum             : http://forum.klanlar.org
	Iletisim(Contact) : konsantre.op@gmail.com

	TribalWars Turkey - JavaScript Moderator
*/

if(game_data.screen == 'info_player'){
	$("#player_info").before("<div id='ana' style='width:100%;height:auto;overflow-y:hidden;background-color:transparent'></div>");
	var konsantre = document.getElementById('ana');
	var oyuncu ={
		g1: ('<center>Puan Grafiği</center><img src="http://tr.twstats.com/image.php?type=playergraph&amp;graph=points&amp;id='+InfoPlayer.player_id+'&amp;s='+game_data.world)+'"><br/>',
		g2: ('<center>Köy Grafiği</center><img src="http://tr.twstats.com/image.php?type=playergraph&amp;graph=villages&amp;id='+InfoPlayer.player_id+'&amp;s='+game_data.world)+'"><br/>',
		g3: ('<center>Yenilen Rakipler Grafiği</center><img src="http://tr.twstats.com/image.php?type=playergraph&amp;graph=od&amp;id='+InfoPlayer.player_id+'&amp;s='+game_data.world)+'"><br/>',
		g4: ('<center>Sıralama Grafiği</center><img src="http://tr.twstats.com/image.php?type=playergraph&amp;graph=rank&amp;id='+InfoPlayer.player_id+'&amp;s='+game_data.world)+'"><br/>',
		g5: ('<center>Saldırı Puanı Grafiği</center><img src="http://tr.twstats.com/image.php?type=playergraph&amp;graph=oda&amp;id='+InfoPlayer.player_id+'&amp;s='+game_data.world)+'"><br/>',
		g6: ('<center>Savunma Puanı Grafiği</center><img src="http://tr.twstats.com/image.php?type=playergraph&amp;graph=odd&amp;id='+InfoPlayer.player_id+'&amp;s='+game_data.world)+'"><br/>',
		g7: ('<center>Puan Grafiği</center><img src="http://tr.twstats.com/image.php?type=playerssgraph&amp;graph=points&amp;id='+InfoPlayer.player_id+'&amp;s='+game_data.world)+'"><br/>',
		g8: ('<center>Köy Grafiği</center><img src="http://tr.twstats.com/image.php?type=playerssgraph&amp;graph=villages&amp;id='+InfoPlayer.player_id+'&amp;s='+game_data.world)+'"><br/>',
		g9: ('<center>Yenilen Rakipler Grafiği</center><img src="http://tr.twstats.com/image.php?type=playerssgraph&amp;graph=od&amp;id='+InfoPlayer.player_id+'&amp;s='+game_data.world)+'"><br/>',
		g10: ('<center>Sıralama Grafiği</center><img src="http://tr.twstats.com/image.php?type=playerssgraph&amp;graph=rank&amp;id='+InfoPlayer.player_id+'&amp;s='+game_data.world)+'"><br/>',
		g11: ('<center>Saldırı Puanı Grafiği</center><img src="http://tr.twstats.com/image.php?type=playerssgraph&amp;graph=oda&amp;id='+InfoPlayer.player_id+'&amp;s='+game_data.world)+'"><br/>',
		g12: ('<center>Savunma Puanı Grafiği</center><img src="http://tr.twstats.com/image.php?type=playerssgraph&amp;graph=odd&amp;id='+InfoPlayer.player_id+'&amp;s='+game_data.world)+'"><br/>',};
	function standarto(){konsantre.innerHTML = "<table style='width:100%;height:100%;'><tr><th><b style='color:purple'>KNS TwStats Grafikleri<sup>v2.1</sup></b></th></tr><tr><td><font style='font-weight:bold;color:red'>"+oyuncu.g1+oyuncu.g2+oyuncu.g3+oyuncu.g4+oyuncu.g5+oyuncu.g6+"</font><br/><div align='center'><button style='cursor:pointer;color:purple;font-weight:bold;background-color:#F4E4BC;height:25px;border:2px solid brown;border-radius:5px;'onclick='alternatifo();'>Alternatif Grafikler</button></div><br/></td></tr</table>";}
	function alternatifo(){konsantre.innerHTML 	= "<table style='width:100%;height:100%;'><tr><th><b style='color:purple'>KNS TwStats Grafikleri<sup>v2.1</sup></b></th></tr><tr><td><font style='font-weight:bold;color:red'>"+oyuncu.g7+oyuncu.g8+oyuncu.g9+oyuncu.g10+oyuncu.g11+oyuncu.g12+"</font><br/><div align='center'><button style='cursor:pointer;color:purple;font-weight:bold;background-color:#F4E4BC;height:25px;border:2px solid brown;border-radius:5px;'onclick='standarto();'>Standart Grafikler</button></div><br/></td></tr</table>";}standarto();}
if(game_data.screen == 'info_ally'){
	$("table[class=vis]:contains('Özellikler')").after("<div id='ana' style='width:100%;height:auto;overflow-y:hidden;background-color:transparent'></div>");
	var konsantre = document.getElementById('ana');
	var klan ={
		g1: ('<center>Puan Grafiği</center><img src="http://tr.twstats.com/image.php?type=tribegraph&amp;graph=points&amp;id='+InfoAlly.ally_id+'&amp;s='+game_data.world)+'"><br/>',
		g2: ('<center>Sıralama Grafiği</center><img src="http://tr.twstats.com/image.php?type=tribegraph&amp;graph=rank&amp;id='+InfoAlly.ally_id+'&amp;s='+game_data.world)+'"><br/>',
		g3: ('<center>Üye Sayısı Grafiği</center><img src="http://tr.twstats.com/image.php?type=tribegraph&amp;graph=members&amp;id='+InfoAlly.ally_id+'&amp;s='+game_data.world)+'"><br/>',
		g4: ('<center>Köy Sayısı Grafiği</center><img src="http://tr.twstats.com/image.php?type=tribegraph&amp;graph=villages&amp;id='+InfoAlly.ally_id+'&amp;s='+game_data.world)+'"><br/>',
		g5: ('<center>Yenilen Rakipler Grafiği</center><img src="http://tr.twstats.com/image.php?type=tribegraph&amp;graph=od&amp;id='+InfoAlly.ally_id+'&amp;s='+game_data.world)+'"><br/>',
		g6: ('<center>Saldırı Puanı Grafiği</center><img src="http://tr.twstats.com/image.php?type=tribegraph&amp;graph=oda&amp;id='+InfoAlly.ally_id+'&amp;s='+game_data.world)+'"><br/>',
		g7: ('<center>Savunma Puanı Grafiği</center><img src="http://tr.twstats.com/image.php?type=tribegraph&amp;graph=odd&amp;id='+InfoAlly.ally_id+'&amp;s='+game_data.world)+'"><br/>',
		g8: ('<center>Puan Grafiği</center><img src="http://tr.twstats.com/image.php?type=tribessgraph&amp;graph=points&amp;id='+InfoAlly.ally_id+'&amp;s='+game_data.world)+'"><br/>',
		g9: ('<center>Sıralama Grafiği</center><img src="http://tr.twstats.com/image.php?type=tribessgraph&amp;graph=rank&amp;id='+InfoAlly.ally_id+'&amp;s='+game_data.world)+'"><br/>',
		g10: ('<center>Üye Sayısı Grafiği</center><img src="http://tr.twstats.com/image.php?type=tribessgraph&amp;graph=members&amp;id='+InfoAlly.ally_id+'&amp;s='+game_data.world)+'"><br/>',
		g11: ('<center>Köy Sayısı Grafiği</center><img src="http://tr.twstats.com/image.php?type=tribessgraph&amp;graph=villages&amp;id='+InfoAlly.ally_id+'&amp;s='+game_data.world)+'"><br/>',
		g12: ('<center>Yenilen Rakipler Grafiği</center><img src="http://tr.twstats.com/image.php?type=tribessgraph&amp;graph=od&amp;id='+InfoAlly.ally_id+'&amp;s='+game_data.world)+'"><br/>',
		g13: ('<center>Saldırı Puanı Grafiği</center><img src="http://tr.twstats.com/image.php?type=tribessgraph&amp;graph=oda&amp;id='+InfoAlly.ally_id+'&amp;s='+game_data.world)+'"><br/>',
		g14: ('<center>Savunma Puanı Grafiği</center><img src="http://tr.twstats.com/image.php?type=tribessgraph&amp;graph=odd&amp;id='+InfoAlly.ally_id+'&amp;s='+game_data.world)+'"><br/>',};	
	function standartk(){konsantre.innerHTML = "<table style='width:100%;height:100%;'><tr><th><b style='color:purple'>KNS TwStats Grafikleri<sup>v2.1</sup></b></th></tr><tr><td><font style='font-weight:bold;color:red'>"+klan.g1+klan.g2+klan.g3+klan.g4+klan.g5+klan.g6+klan.g7+"</font><br/><div align='center'><button style='cursor:pointer;color:purple;font-weight:bold;background-color:#F4E4BC;height:25px;border:2px solid brown;border-radius:5px;'onclick='alternatifk();'>Alternatif Grafikler</button></div><br/></td></tr</table>";}
	function alternatifk(){konsantre.innerHTML = "<table style='width:100%;height:100%;'><tr><th><b style='color:purple'>KNS TwStats Grafikleri<sup>v2.1</sup></b></th></tr><tr><td><font style='font-weight:bold;color:red'>"+klan.g8+klan.g9+klan.g10+klan.g11+klan.g12+klan.g13+klan.g14+"</font><br/><div align='center'><button style='cursor:pointer;color:purple;font-weight:bold;background-color:#F4E4BC;height:25px;border:2px solid brown;border-radius:5px;'onclick='standartk();'>Standart Grafikler</button></div><br/></td></tr</table>";}standartk();}
if(game_data.screen != 'info_ally' && game_data.screen != 'info_player'){alert('KNS TwStats Grafikleri\n\nBu script sadece oyuncu veya klan profillerinde çalışır.');}