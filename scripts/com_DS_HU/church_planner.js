javascript:
var doc=document;
var win=(window.frames.length>0)?window.main:window;
if(window.frames.length>0){
	doc=window.main.document;
}
var churchData = MapCanvas.churchData;
var radQuads = [4*4, 6*6, 8*8, 0];
var originalClickHandler;
var isDrawing = true;

function getNextRadQuad(actQuad) {
	var idx = radQuads.indexOf(actQuad);
	if (idx == radQuads.length-1) {
		return radQuads[0];
	} else {
		return radQuads[idx+1];
	}
}

function redrawMap() {
	win.TWMap.church.toggle();
}

function toggleChurch(x, y) {
	for (churchIdx in churchData) {
		var actChurch = churchData[churchIdx];
		if(x == actChurch[0] && y == actChurch[1]) {
			actChurch[2] = getNextRadQuad(actChurch[2]);
			if(actChurch[2] == 0) {
				churchData.splice(churchIdx,1);
			}
			return;
		}
	}
	//if we are here it means this is a new church
	churchData.push([x,y,radQuads[0]]);
}

function myHandleClick(event) {
	var pos = this.coordByEvent(event);
	if (isDrawing) {
		toggleChurch(pos[0],pos[1]);
		redrawMap();
		return false;
	} else {
		return originalClickHandler.call(win.TWMap.map, event);
	}
}

function setup() {
	if (win.game_data.screen=='map') {
		originalClickHandler=win.TWMap.map._handleClick;
		win.TWMap.map._handleClick=myHandleClick;
		
		var table = doc.getElementById("map_big").parentNode.parentNode;
		var checkDrawer = doc.createElement("input");
		var newRow = table.insertRow(0);
		newRow.appendChild(checkDrawer);
		checkDrawer.type = "checkbox";
		checkDrawer.checked = true;
		checkDrawer.id = "checkDrawer";
		$("#checkDrawer").click(function(e){
			isDrawing = this.checked;
		});
				
		var label = doc.createElement("label");
		newRow.appendChild(label);
		label.appendChild(doc.createTextNode("Kattintásra rajzol (kikapcsolhatod térképmozgatás erejéig)"));
		
	} else {
		if (typeof(noAlert)=='undefined' || noAlert == 0) {
			alert("Ez a script csak a térképen működik.\nUgrás a térképre...");
		}
		self.location=win.game_data.link_base_pure.replace(/screen\=\w*/i,"screen=map");
	}
}

setup();
void(0);