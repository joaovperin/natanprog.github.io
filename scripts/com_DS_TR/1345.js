/* 
	Yazar(Author)     : Konsantre
	Forum             : http://forum.klanlar.org
	Iletisim(Contact) : konsantre.op@gmail.com

	TribalWars Turkey - JavaScript Moderator
*/

if(premium==false){alert('Bu scripti çalıştırmak için premium hesabınız olması gerekir.');end()};
if(game_data.screen != 'map'){alert('KNS Yağma Yardımcısı\n\nBu script sadece haritada çalışır.');end()};
if ($('#KNSyagma').length == 0){
	$('#map_config').prepend("<div id='KNSyagma'style='width:100%;position:relative;top:5px;background-color:transparent'><table width='100%'><tr><th width='100%'><div style='text-align:center;'><b style='color:purple'><small>KNS Yağma Yardımcısı<sup>v2.2</sup></small></b></div></th></tr><tr align='center'style='padding-left:10px;padding-right:10px;'><td width='100%'><img src='https://dstr.innogamescdn.com/graphic/unit/unit_light.png'title='Hafif atlı'>&nbsp;<input id='hafif'type='text'style='margin-right:5px;text-align:center;font-weight:bold;'size='1'value='5'/>&nbsp;&nbsp;<img src='https://dstr.innogamescdn.com/graphic/unit/unit_spy.png'title='Casus'>&nbsp;<input id='casus'type='text'style='text-align:center;font-weight:bold;'size='1'value='0'/><br/><button style='cursor:pointer;color:purple;margin-top:10px;margin-bottom:5px;font-weight:bold;background-color:#FFccAA;height:30px;border:2px solid #765942;border-radius:10px;'type='button'onclick='Konsantre();'>Scripti Hazırla</button><br/><font id='ortamesaj'style='font-weight:bold;color:red'>Naber <font color='#603000'>"+game_data.player.name+"</font> nasılsın?</font><br/><textarea id='plan'style='margin-top:5px;width:95%;height:100px;background-color:transparent;resize:none;border-radius:10px'onfocus='this.select();'readonly></textarea></td></tr></table></div>");
	function Konsantre(){
		var Koordinat = [];var col,row,coord,village,player;for (row=0;row<TWMap.size[1];row++){for (col=0;col<TWMap.size[0];col++){coord = TWMap.map.coordByPixel(TWMap.map.pos[0]+(TWMap.tileSize[0]*col),TWMap.map.pos[1]+(TWMap.tileSize[1]*row));if (coord){village=TWMap.villages[coord.join("")];if (village){player=null;if (parseInt(village.owner||"0",10)){player = TWMap.players[village.owner];}else {Koordinat.push(coord.join("|"));}}}}}
		var Sayij=Koordinat.join('a');var s2=Sayij.match(/\|/g);var s3=s2.join('');var Sayi=s3.length;
		var Hafif = document.getElementById('hafif').value;var Casus = document.getElementById('casus').value;
		document.getElementById('ortamesaj').innerHTML = "Toplam <font color='black'>'"+Sayi+"'</font> Barbar Köyü eklendi";
		document.getElementById('plan').innerHTML = "Javascript:H="+Hafif+";C="+Casus+";KNS='"+Koordinat.join(' ')+"';$.getScript('https://media.innogamescdn.com/com_DS_TR/Scripts/99123.js');";}}