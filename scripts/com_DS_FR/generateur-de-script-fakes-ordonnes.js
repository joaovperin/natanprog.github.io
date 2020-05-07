// Fake List Generator = Flg
if (game_data.screen == 'info_player') {
	var $villagesList = $('#villages_list');
	
	if($('#flg_table').length == 0) {
		var html = '<table width="100%" id="flg_table" class="vis">';
		html+= '<tr><td colspan="3"><input style="width:100%" type="button" value="Générer la liste" onclick="Generate()" /></td></tr>';
		html+= '<tr><td colspan="3"><textarea style="width:calc(100% - 10px)" rows="10" cols="35" id="flg_text" onfocus="select()"></textarea></td></tr>';
		html+= '</table>';
		
		$villagesList.before($(html));
	}
	
	function Generate() {
		var flgUnits = window.flgUnits || [0,0,0,0,1,0,0,0,1,0,0,0];
		var $trs = $villagesList.find('tbody tr');
		var $textarea = $('#flg_text');
		
		$textarea.val('');
		
		var coords = [];
		$trs.each(function() {
			if($(this).find('td:eq(3)').text() != "") {
				coords.push($(this).find('td:eq(3)').text());
    		}
		});
		
		var txt = 'javascript: var max=[';
		txt+= flgUnits.join(',');
		txt+= '],coords="';
		txt+= coords.join(' ');
		txt+= '",nf=5,coords=coords.split(" ");';
		txt+= 'farmcookie=document.cookie.match("(^|;)?farm=([^;]*)(;|$)");';
		txt+= 'i = (null !== farmcookie) ? parseInt(farmcookie[2]) : 0;';
		txt+= 'n=Math.floor(i/nf);n >= coords.length && (n = i = 0,alert(\"ATTENTION On recommence !\"));';
		txt+= '$("#units_form").find("table:nth-child(3) .unitsInput").next().each(function(a){';
			txt+= 'var href=$(this).attr("href");allUnit=href.match(/\\d+/)[0];unitName=href.match(/\'(.+)\'/)[1];';
			txt+= 'if(0==allUnit||0==max[a])return!0;if(allUnit>max[a])return $(unitName).val(max[a]),!0;$(unitName).val(allUnit)';
		txt+= '});';
		txt+= '$("#place_target > input").val(coords[n]);$("#units_form label:nth-child(1) > input[type=\'radio\']").click();';
		txt+= 'i+=1;document.cookie="farm="+i+"; expires="+(new Date(5E3,1,1)).toGMTString();void(0);';
		
		$textarea.val(txt);
		
	}
}
else {
	UI.ErrorMessage('Ce script doit être exécuté depuis le profil d\'un joueur', 5000);
}