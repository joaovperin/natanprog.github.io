javascript:

var coord1X = 0;
var coord1Y = 0;
var coord2X = 0;
var coord2Y = 0;
var switcher = 0;
var UnitSpeed;
var WorldSpeed;

var baseUnitSpeed = {
    'Éclaireur' : 9,
    'Léger' : 10,
    'Lourd' : 11,
    'Hache' : 18,
    'Épée' : 22,
    'Bélier' : 30,
    'Noble' : 35
}
var timeUnit = new Array(7);

$.ajax({
    type: 'GET',
    url: '/interface.php?func=get_config',
    dataType: 'xml',
    success: function(xml) {
        UnitSpeed = $(xml).find('unit_speed').text();
        WorldSpeed = $(xml).find('speed').text();
    },
    error: function() {
        UI.ErrorMessage('An error occurred while processing XML file.');
    }
});

function markVillageAsSelected(id) {
	var v = $('#map_village_' + id);
	$('<div class="DSSelectVillagesOverlay" id="DSSelectVillages_overlay_' + id + '" style="border-radius: 5px;width:52px; height:37px; position: absolute; z-index: 50; left:' + $(v).css('left') + '; top: ' + $(v).css('top') + ';"></div>').appendTo(v.parent());
    $('#DSSelectVillages_overlay_' + id).css('outline', 'rgba(255, 215, 0, 0.7) solid 2px').css('border-radius','5px').css('background-color', 'rgba(255, 215, 0, 0.14)');
}
function demarkVillageAsSelected(id) {
    $('#DSSelectVillages_overlay_' + id).css('outline', '').css('background-color', '');
}

function getDistance(x1,y1,x2,y2){
    var exactDistance = Math.sqrt(Math.pow(parseInt(x1)-parseInt(x2),2) + Math.pow(parseInt(y1)-parseInt(y2),2))
    return exactDistance;
}

function getTravelTimeInSecond(distance, unit){
  SECONDS = Math.round(distance * (60*baseUnitSpeed[unit]/WorldSpeed/UnitSpeed));
  return new Date(SECONDS * 1000).toISOString().substr(11, 8);
}

function startCalcul(){
    var distance = getDistance(coord1X,coord1Y,coord2X,coord2Y)
    var i = 0;
    for(var unit in baseUnitSpeed){
        timeUnit[i] = getTravelTimeInSecond(distance, unit);
        i++;
    }
}

function clickFunction(x, y, event) {
    console.log(x+','+y);
    if(coord1X == 0 || coord1Y == 0) {
    	coord1X = x;
    	coord1Y = y;
    	id = window.TWMap.villages[coord1X*1000+coord1Y].id;
    	markVillageAsSelected(id);
    }else if(coord2X == 0 || coord2Y == 0) {
    	coord2X = x;
    	coord2Y = y;
    	id = window.TWMap.villages[coord2X*1000+coord2Y].id;
    	markVillageAsSelected(id);
    	startCalcul();
    	var text = "Durée :<br>";
    	var i = 0;
	    for(var unit in baseUnitSpeed){
	        text = text + unit + " --> " + timeUnit[i] +"<br>";
	        i++;
	    }
    	div.innerHTML = text;
    }else {
    	id = window.TWMap.villages[coord1X*1000+coord1Y].id;
    	demarkVillageAsSelected(id);
    	id = window.TWMap.villages[coord2X*1000+coord2Y].id;
    	demarkVillageAsSelected(id);
		coord1X = x;
		coord1Y = y;
		id = window.TWMap.villages[coord1X*1000+coord1Y].id;
    	markVillageAsSelected(id);
		coord2X = 0;
		coord2Y = 0;
    	
    }
    return false; /*Signal that the TWMap should not follow the URL associated to this click event*/
}

window.TWMap.mapHandler.onClick = clickFunction;
var div = document.createElement("DIV");
area = document.getElementById('content_value');
area.insertBefore(div, area.childNodes[0]);   