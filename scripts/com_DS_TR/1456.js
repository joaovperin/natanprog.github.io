/* 
	Yazar(Author)     : Konsantre
	Forum             : http://forum.klanlar.org
	Iletisim(Contact) : konsantre.op@gmail.com

	TribalWars Turkey - JavaScript Moderator
*/

	function Konsantre(){
	var dunya = game_data.world;
	var rapor1 = window.location.search;
	var rapor2 = rapor1.match(/view=\d+/g);
	var rapor3 = rapor2.join('');
	var rapor = rapor3.match(/\d+/);
	window.location = ('https://'+dunya+'.klanlar.org/game.php?screen=place&try=confirm&type=same&report_id='+rapor);
	}Konsantre();end()