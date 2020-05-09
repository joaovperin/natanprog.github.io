ScriptAPI.register( '72-Truppen filtern', true, 'Ademes', 'support-nur-im-forum@ademes.at' );
Scriptversion = 'MIT-Lizenz - Copyright (c) 2013 Ademes , Version 1.8';  
if (top.frames.length > 1){
	var doc = (top.frames[1].document.URL.match('game.php') == 'game.php') ? top.frames[1].document : top.frames[0].document;
} else {
	var doc = document;
};
if (!doc.URL.match('mode=combined')){
	UI.InfoMessage('Du musst dich auf der "Kombiniert"-Übersicht befinden!',3000,true);
} else {
	ADS_Truppen_filtern(doc);
};
function ADS_Truppen_filtern(doc){
	var table = doc.getElementById('combined_table'); 
	var rows = table.getElementsByTagName('th');
	var counter = 0;	
	for (var i = 0; i < rows.length; i++){
		var img = rows[i].getElementsByTagName('img'); 
		if (img.length > 0){
			if(img[0].title == troup) th_id = i;
		}
	};
	$('#combined_table tr:gt(0)').each(function(){	
		troupmax = (typeof(troupmax) == 'undefined') ? 24000 : troupmax;
		troupmin = (typeof(troupmin ) == 'undefined') ? 0 : troupmin;			
		troups = $('td:eq(' + th_id + ')', $(this)).text();
		if (troups < troupmin || troups > troupmax) $(this).remove();																			
	});
	$('#combined_table tr:gt(0)').each(function(){
		if ($('span:eq(0)')) counter++;																
	});
	var header = ($('.note-icon').length > 0) ? 'th:eq(1)' : 'th:eq(0)';
  	$('#combined_table tr:eq(0)').children(header).replaceWith('<th style="text-align:left;">Dörfer (' + counter.toString() + ')</th>');
	UI.InfoMessage('Truppen im Dorf gefiltert!',2000,false);
};