javascript:

currentVillageID = game_data.village.id;
currentVillageX = game_data.village.x;
currentVillageY = game_data.village.y;
AtemplateID = document.getElementsByClassName('farmassistant-tooltip')[0].getAttribute('data-template').split(',')[0].split(":")[1];
BtemplateID = document.getElementsByClassName('farmassistant-tooltip')[1].getAttribute('data-template').split(',')[0].split(":")[1];
useTemplateID = AtemplateID;
useLetter = 'a';

if(template == "B") {
	useTemplateID = BtemplateID;
	useLetter = 'b';
}

nbgris = 0;
gris = [];
grisLAID = [];

for (v in TWMap.villages) {
	if(TWMap.villages[v].owner == "0" && TWMap.villages[v].special != "ghost" && TWMap.villages[v].type != "stronghold" && TWMap.villages[v].type != "university") {
		nbgris++;
		x = String(TWMap.villages[v].xy).substring(0,3);
		y = String(TWMap.villages[v].xy).substring(3,6);
		gris.push([TWMap.villages[v].id,x,y,getDistance(currentVillageX,currentVillageY,x,y)]);

	}
}

gris.sort(sortFunction);

div = document.createElement("DIV");
div.style = "height:auto; width:100%;display:inline-block; 	border: 2px solid;";
document.getElementById('map_big').prepend(div);

getPage(0);



function sortFunction(a, b) {
    if (a[3] === b[3]) {
        return 0;
    }
    else {
        return (a[3] < b[3]) ? -1 : 1;
    }
}

function sendAttack(target) {
	theUrl = "/game.php?village="+currentVillageID+"&screen=am_farm&mode=farm&ajaxaction=farm&template_id="+useTemplateID+"&target="+target+"&source="+currentVillageID+"&json=1&&h="+csrf_token;

	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() { 
	    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
	    	if(JSON.parse(xmlHttp.response).success != undefined) {
	    		UI.SuccessMessage(JSON.parse(xmlHttp.response).success);
	    		document.getElementsByClassName('farm_village_'+target)[0].remove();
	    		document.getElementsByClassName('farm_village_span_'+target)[0].remove();
	    		TWMap.commandIcons[target]=[{img:"attack"}];
	    		TWMap.reload();
	    	}else if(JSON.parse(xmlHttp.response).error != undefined) {
	    		UI.ErrorMessage(JSON.parse(xmlHttp.response).error);
	    	}
	    }
	}
	xmlHttp.open("GET", theUrl, true);
	xmlHttp.send(null);	
}

function AttackedBefore(g,gris,cpt) {
	target = gris[g][0];
	theUrl = "/game.php?village="+currentVillageID+"&screen=map&ajax=map_info&source="+currentVillageID+"&target="+target+"&&";
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() { 
	    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
	    	result = JSON.parse(xmlHttp.responseText);
	    	if(result.attack == undefined) {
	    		x = String(result.xy).substring(0,3);
				y = String(result.xy).substring(3,6);
	    		addButtons(result.id,parseInt(x),parseInt(y));
	    	}
	    }
	}
	xmlHttp.open("GET", theUrl, true);
	setTimeout(function(){console.log("working");xmlHttp.send(null);},cpt);
}

function checkIfInside(id) {
	var inside = false;
	for(var i=0;i<grisLAID.length;i++) {
		if(grisLAID[i] == id) {
			inside = true;
			break;
		}
	}
	return inside;
}

function getPageDone() {
	for(g in gris) {
		//AttackedBefore(g,gris,cpt);
		if(!checkIfInside(gris[g][0])) {
			addButtons(gris[g][0],gris[g][3]);
		}
	}
}

function getDistance(x1,y1,x2,y2){
    var exactDistance = Math.round(Math.sqrt(Math.pow(parseInt(x1)-parseInt(x2),2) + Math.pow(parseInt(y1)-parseInt(y2),2))*10)/10;
    return exactDistance;
}

function addButtons(id,dist) {
	lnk = document.createElement("A");
	lnk.style = "display:inline-block";
	lnk.setAttribute('class', 'farm_village_'+id+' farm_icon farm_icon_'+useLetter);
	lnk.setAttribute('onclick', 'sendAttack('+id+')');
	div.appendChild(lnk);

	sp = document.createElement("SPAN");
	sp.setAttribute('class', 'farm_village_span_'+id);
	sp.innerText = dist;
	div.appendChild(sp);
}

function getBarbInLA(plunderList) {
	nbvillage = plunderList.getElementsByTagName('tr').length-2;
	for(var i=2;i<nbvillage+2;i++) {
		grisLAID.push(plunderList.getElementsByTagName('tr')[i].id.split('_')[1]);
	}
}

function htmlToElements(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes;
}

function delayedRequest(j) {
	getPage(j);
}

function getPage(i) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	    	itempage = htmlToElements(xhttp.responseText);
	    	plunderListID = 27;
	    	for(var j=0;j<itempage[39].getElementsByTagName('table').length;j++) {
	    		if(itempage[39].getElementsByTagName('table')[j].id == "plunder_list") {
	    			plunderListID = j;
	    			break;
	    		}
	    	}
	    	plunderList = itempage[39].getElementsByTagName('table')[plunderListID];
	    	getBarbInLA(plunderList);
	    	nbpages = itempage[39].getElementsByClassName('paged-nav-item').length/2;
	    	k = i+1;
	    	UI.InfoMessage(k+"/"+nbpages);
	    	if(i == 0) {
		   		for(var j=1;j<nbpages;j++) {
		    		setTimeout(delayedRequest,(j-1)*100,j);
		    	}
	    	}
	    	if(nbpages == (i+1)) {
	    		getPageDone();
	    	}
	    }
	};
	xhttp.open("GET", "/game.php?village="+currentVillageID+"&screen=am_farm&order=distance&dir=asc&Farm_page="+i, true);
	xhttp.send();
}



