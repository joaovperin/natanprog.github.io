//javascript: SP=[200,2]; SW=[0,1]; AXE=[0,1]; SC=[0,1]; LC=[0,1]; HC=[80,1]; RAM=[10,1]; CATA=[20,0]; NOBLE=[1,2];

var win = (window.frames.length ? window.main : window);
var doc = win.document;

function available(type) {
	var input = doc.units[type];
	var el = input.nextSibling; 
	do {
		el = el.nextSibling;
	} 
	while (el.nodeType != 1);
	return parseInt(el.firstChild.nodeValue.match(/(\d+)/)[1], 10); 
}


function set(type, value) {
	doc.units[type].value = value;
}


if( document.URL.match("screen=place") == "screen=place"  && document.URL.match("try=confirm") != "try=confirm" ) {

	if(coords!=""){
		coords = coords.split(" ");
		jarjekord=0;
		cookie_date = new Date(new Date().getTime() + 2419200000);
		jarjekordcookie=document.cookie.match('(^|;) ?jarjekord=([^;]*)(;|$)');
		if(jarjekordcookie!=null){
			jarjekord=parseInt(jarjekordcookie[2]);
		}
		if(jarjekord>=coords.length){
			alert('last village');
			jarjekord=0;
		}
		coords=coords[jarjekord];
		coords = coords.split("|");
		document.units.x.value = coords[0];
		document.units.y.value = coords[1];
		jarjekord=jarjekord+1;
		document.cookie ="jarjekord="+jarjekord+";expires="+cookie_date.toGMTString();
	}
	
	win.$.each(troops, function(unit, values) {
		var amount = values[0];
		var mode = values[1];
		if  (available(unit)-amount > 0 && mode == 1) {
			set(unit, available(unit)-amount);
		}
		if  (available(unit)-amount >= 0 && mode == 2) {
			set(unit, amount);
		}
		if  (available(unit)-amount < 0 && mode == 2) {
			set(unit, available(unit));
		}
	});
}
