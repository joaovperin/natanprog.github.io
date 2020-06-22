if (game_data.screen != 'market' && game_data.mode != 'own_offer') {
	window.location.href = game_data.link_base_pure + 'market&mode=own_offer';
}
else {
	/* Get resources */
	var wood = game_data.village.wood;
	var stone = game_data.village.stone;
	var iron = game_data.village.iron;
	
	/* Add resources from current offers on the market */
	var $trsCurrentOffers = $('#own_offers_table tr').not(':first,:last');
	
	$trsCurrentOffers.each(function() {
		var $tds = $(this).find('td');
		
		var value = $($tds[2]).text().replace('.','');
		var nb = $($tds[3]).text();
		
		var $icon = $($tds[2]).find('.icon');
		
		if($icon.hasClass('wood')) {
			wood += nb * value;
		}
		else if($icon.hasClass('stone')) {
			stone += nb * value;
		}
		else if($icon.hasClass('iron')) {
			iron += nb * value;
		}
	});
	
	/* Work with thousands */
	wood = Math.round(wood / 1000); 
	stone = Math.round(stone / 1000); 
	iron = Math.round(iron / 1000);
	
	/* Get offers nb to create */
	var nbOffers = Math.max(wood, stone, iron) - Math.min(wood, stone, iron);
	nbOffers = Math.round(nbOffers / 2); 
	
	/* Get nb available traders */
	var marketLevel = game_data.village.buildings.market;
	var nbTotal = (marketLevel < 10) ? marketLevel : Math.pow(marketLevel - 10,2) + 10;
	var nbAway = game_data.village.trader_away;
	var nbAvailable = nbTotal - nbAway;
	
	/* Check radios */
	if(wood > stone && wood > iron) {
		$('#res_sell_wood').attr('checked','checked');
	}
	else if(stone > wood && stone > iron) {
		$('#res_sell_stone').attr('checked','checked');
	}
	else if(iron > stone && iron > wood) {
		$('#res_sell_iron').attr('checked','checked');
	}
	
	if(wood < stone && wood < iron) {
		$('#res_buy_wood').attr('checked','checked');
	}
	else if(stone < wood && stone < iron) {
		$('#res_buy_stone').attr('checked','checked');
	}
	else if(iron < stone && iron < wood) {
		$('#res_buy_iron').attr('checked','checked');
	}
	
	/* Fill text inputs */
	$('#res_sell_amount').val(1000);
	$('#res_buy_amount').val(1000);
	$('#own_offer_form input[name=max_time]').val(trajet);
	$('#own_offer_form input[name=multi]').val(Math.min(nbOffers,nbAvailable));
	
	/* Focus submit button */
	$('#own_offer_form input[type=submit]').focus();
}