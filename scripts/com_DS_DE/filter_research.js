ScriptAPI.register( '56-Forschungsfilter', true, 'Ademes', 'support-nur-im-forum@ademes.at' );
Scriptversion = 'MIT-Lizenz - Copyright (c) 2013 Ademes , Version 1.5';
if (top.frames.length > 1){
	var doc = (top.frames[1].document.URL.match('game.php') == 'game.php') ? top.frames[1].document : top.frames[0].document;
} else {
	var doc = document;
};
if (!document.URL.match('mode=tech')){
	UI.InfoMessage('Du musst dich auf der "Forschungs"-Übersicht befinden!',3000,true);
} else {
	ADS_Forschungsfilter(doc);
};
function ADS_Forschungsfilter(doc){
	var rows = evaluate('//tr[contains(@class,"row_")]');
	for (var i = 0; i < rows.length; i++){
		if (rows[i].innerHTML.match(/rtt grey|rtt brown/) === null) rows[i].style.display = 'none';
	}
};
function evaluate(path,context){
	if (typeof(context) == 'undefined') var context = document;
	var XPath = document.evaluate(path,context,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	var Nodes = [];
	for (var x = 0; x < XPath.snapshotLength; x++){
		Nodes.push(XPath.snapshotItem(x));
	}
	return Nodes;
};