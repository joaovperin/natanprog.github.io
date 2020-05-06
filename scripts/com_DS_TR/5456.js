var minVer = "7.2";
var win = (window.frames.length > 0) ? window.main : window;
var ver = win.game_data.version.match(/[\d|\.]+/g);
function getMode(){
	mode = prompt(" Barbar köyleri için “b”, Oyuncu köyleri için “o”, Klan köyleri için “k” yaz \nUnutma sadece büyük harita (sol) içinde gözüken köylerde arama yapar", "o");
	mode = mode.toLowerCase();
	checkMode()}
function checkMode(){
	if (mode == 'o')
	{playername = prompt("Hangi oyuncu?","Trafik")+' '}
	else if (mode == 'k')
	{tribename = prompt("Hangi klan?","KORKUSUZ MERT AÇIK")}
	else if (mode == 'b')
	{}
	else
	{getMode()}}
	getMode();
function trim(str){return str.replace(/^\s+|\s+$/g, "")}
if (!ver || (parseFloat(ver[1]) < minVer)){alert("Bu script için gerekli olan minimum versiyon"+minVer+" veya daha yükseği. \nSenin kullandığın versiyon"+ver[1])}
else {
	if (win.game_data.screen == "map"){
		var coords = [];
		var col, row, coord, village, player, points;
		for (row = 0; row < TWMap.size[1]; row++){
			for (col = 0; col < TWMap.size[0]; col++){
				coord = TWMap.map.coordByPixel(TWMap.map.pos[0] + (TWMap.tileSize[0] * col), TWMap.map.pos[1] + (TWMap.tileSize[1] * row));
				if (coord){
					village = TWMap.villages[coord.join("")];
					if (village){
						player = null;
						if (parseInt(village.owner || "0", 10)){player = TWMap.players[village.owner];var ally = TWMap.allies[player.ally]}
						if (player){
							if (mode == "o"){if (trim(player.name)==trim(playername)){coords.push(coord.join("|"))}}
							else if (mode == "k"){if (ally){if(trim(ally.name)==trim(tribename)){coords.push(coord.join("|"))}}}}
						else {if (mode == "b"){coords.push(coord.join("|"))}}}}}}
		alert(coords.join(" "))}
		else {
			UI.InfoMessage('Burada çalışmaz hacı ben haritayı açıyorum',3000,'success');
			document.location = game_data.link_base_pure+'overview_villages&mode=map';
			self.location = win.game_data.link_base_pure.replace(/screen\=/i,"screen=map")}}