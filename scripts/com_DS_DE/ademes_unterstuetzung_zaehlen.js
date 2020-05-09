ScriptAPI.register('100-Unterstützung zählen', true, 'Ademes', 'support-nur-im-forum@ademes.at');
Scriptversion = 'MIT-Lizenz - Copyright (c) 2013 Ademes , Version 1.0';
if (top.frames.length > 1){
	var doc = (top.frames[1].document.URL.match('game.php') == 'game.php') ? top.frames[1].document : top.frames[0].document;
} else {
	var doc = document;
};
if (!doc.URL.match('mode=units')){
	UI.InfoMessage('Du musst dich auf der Verteidigungs-/Unterstützungs-Übersicht befinden!',3000,true);
} else {
	ADS_Unterstuetzung_zaehlen(doc);
};
function ADS_Unterstuetzung_zaehlen(doc){
	var output = '';
	var world = ($("#units_table thead tr th:eq(5) img").attr("src").indexOf("unit_spy") == -1);
	var num_spear = 0; 
	var num_sword = 1;
	var num_archer = (world ? 3:-999);
	var num_spy = (world ? 4:3);
	var num_marcher = (world ? 6:-999);
	var num_heavy = (world ? 7:5);	
	var num_catapult = (world ? 9:7);
	var obj = new Object();
	$('#units_table tr.row_a, #units_table tr.row_b').each(function(a) {
		acc = '';
		$(this).find('a').each(function(b) {
			if ($(this).attr('href').search(/info_player&/) != -1) acc = $(this).html();
		}
		);
		if (acc != '') {
			var count = obj[acc];
			if (obj[acc] == undefined) {
				count = new Object();
				count.spear = 0;
				count.sword = 0;
				count.archer = 0;
				count.spy = 0;
				count.marcher = 0;
				count.heavy = 0;
				count.catapult = 0;
				obj[acc] = count;
			}
			count.spear += parseInt($(this).find('td.unit-item:eq('+ num_spear +')').html());
			count.sword += parseInt($(this).find('td.unit-item:eq('+ num_sword +')').html());					
			if (world) count.archer += parseInt($(this).find('td.unit-item:eq('+ num_archer +')').html());
			count.spy += parseInt($(this).find('td.unit-item:eq('+ num_spy +')').html());			
			if (world) count.marcher += parseInt($(this).find('td.unit-item:eq('+ num_marcher +')').html());
			count.heavy += parseInt($(this).find('td.unit-item:eq('+ num_heavy +')').html());			
			count.catapult += parseInt($(this).find('td.unit-item:eq('+ num_catapult +')').html());
			obj[acc] = count;
		}
	});
	if (doc.URL.match('away_detail')) {
		output += '<h5>Stammesdeff eingesetzt bei:</h5>';
		word = 'Eingesetzt';
	} else if (doc.URL.match('support_detail')) {
		output += '<h5>Unterstützungen erhalten von:</h5>';
		word = 'Erhalten';
	}
	var counter = 0;
	var sum = 0;
	troops = (typeof(Truppenanzahl) == 'undefined') ? 20000 : Truppenanzahl;
	$.each(obj, function(acc,count) {
		counter++;
		deffs = Math.round(((count.spear + count.sword + count.archer + 2*count.spy + 5*count.marcher + 6*count.heavy + 8*count.catapult)/troops)*10)/10;
		output += acc+ ': ' + deffs + '<br>';
		output += (typeof(Detail) == 'undefined') ? '' : '<div style="color: grey;">('+ count.spear +','+ count.sword +','+ count.archer +','+ count.spy +','+ count.marcher +','+ count.heavy +','+ count.catapult +')</div>';
		sum += Math.round(deffs*10)/10;
	});
	output += (counter == 0) ? '<br><div style="color: green; font-weight: bold;">Keine Stammesdeff!</div><br>' : '<br><div style="color: green; font-weight: bold;">'+ word +' Insgesamt: '+ Math.round(sum) +'</div><span style="color: grey;">(Anzeige pro Seite)</span>';
	if ($('#ADS_Display').size()==0){
			$('.maincell').append("<div id='ADS_Display' style='position: fixed; top: 51px; left: 20px; border-radius: 8px; border: 2px #804000 solid; background-color: #F1EBDD'><div id='inline_popup_menu' style='cursor: auto; text-align:center;'>"+ game_data.player.name +" ("+ $('#serverDate').text() +")</div><div style='padding: 15px 10px 5px 10px;'><table id='ADS_Display_Main' style='vertical-align:middle;'></table><br><a onclick='$(\"#ADS_Display\").remove();' style='cursor: pointer;'>Schließen</a></div></div>");
		} else {
			$("#ADS_Display").show();
		}
		$("#ADS_Display_Main").html(output);
};
