if (game_data.screen == 'am_farm' || game_data.screen == 'place') {
	var ramSup = 1;
	var murMax = 0;
	var scout = 1;
	var hache = 50;
	if(document.URL.indexOf('am_farm') != -1){
		
		var reports = [];
		
		$('#plunder_list tr[class*=report_]').each(function() {
			console.log($(this));
			var tds = $(this).find('td');
			console.log('td');
			
			var wallLevel = parseInt($.trim($(tds[6]).text()));
			console.log('wall_level');
			console.log(wallLevel);
			if(wallLevel != '?' && wallLevel > murMax) {
				wallLevel = wallLevel;
				
				// Get coords
				var coordsTxt = $(tds[3]).text();
				var coordsPos = coordsTxt.indexOf('|');
				var x = coordsTxt.substring(coordsPos-3,coordsPos);
				var y = coordsTxt.substring(coordsPos+1,coordsPos+4);
				var ram = Math.round(2*(Math.pow(1.09,wallLevel))*(wallLevel-1) + Math.pow(1.09,wallLevel) + 0.5 + ramSup);
				if (! ram> 0){
					ram = 0;
				}
				reports.push({
					x:x,
					y:y,
					ram:ram
				});
				
			}
		});
		
		$.cookie('wallIndex', 0, { expires: 365 });
		$.cookie('wallDatas', JSON.stringify(reports), { expires: 365 });
		
		// Popup
		var url = 'https://' + document.domain + game_data.link_base_pure + 'place';
		var popupWindow = window.open(url);
		popupWindow.blur();
		window.focus();
	}

	if(document.URL.indexOf('place') != -1) {
		
		var index = parseInt($.cookie('wallIndex'));
		var datas = JSON.parse($.cookie('wallDatas'));
		
		var data = datas[index];
		$('#unit_input_spy').attr('value',scout);
		$('#unit_input_axe').attr('value',hache);
		if (typeof leger != "undefined") {
			$('#unit_input_light').attr('value',leger);
		}
		
		$('#unit_input_ram').attr('value',data.ram);
		$('#inputx').attr('value',data.x);
		$('#inputy').attr('value',data.y);

		index ++;
		if(index >= datas.length){
			alert('C\'est le dernier !');
			index = 0;
		}
		$.cookie('wallIndex', index, { expires: 365 });
	}
	
}
else {
	UI.ErrorMessage('Ce script doit être lancé depuis l\'assistant de pillage', 5000);
}