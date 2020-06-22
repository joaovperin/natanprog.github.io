	function tradCollect()
	{
		var win=(window.main||self);
		var screen_title = win.$('h3')[0];
		var a_title = win.$(screen_title).find('a')[0];

		win.$(a_title).click(function(){
			var popup_twcheese = win.$('.twcheese-scavenge-preferences-widget');
			var timing_table = win.$('.timing-section');
			var option_table = win.$('.options-section')[0];
			var timing_tr_collection = timing_table.find('tr');

			// First line of timing table
			var timing_second_td = timing_tr_collection[1].getElementsByTagName('td')[0];
			var input_timing_set_time = timing_second_td.getElementsByTagName('input')[0];
			timing_second_td.innerText = "Temps de trajet: ";
			timing_second_td.appendChild(input_timing_set_time);
			timing_second_td.appendChild(document.createTextNode(" heures:minutes"));
			
			// Second line of timing table
			var timing_third_td = timing_tr_collection[2].getElementsByTagName('td')[0];
			var input_in_third_td = timing_third_td.getElementsByTagName('label')[0].getElementsByTagName('input')[0];
			timing_third_td.getElementsByTagName('label')[0].innerText = '';
			timing_third_td.getElementsByTagName('label')[0].appendChild(input_in_third_td);
			br_1 = document.createElement('br');
			helper_span_1 = document.createElement('span');
			helper_span_1.classList.add("hint");
			helper_span_1.appendChild(document.createTextNode("(recommandé si vous êtes AFK)"));
			timing_third_td.getElementsByTagName('label')[0].appendChild(document.createTextNode(" Temps maximum de la meilleur option"));
			timing_third_td.getElementsByTagName('label')[0].appendChild(br_1);
			timing_third_td.getElementsByTagName('label')[0].appendChild(helper_span_1);
			
			// Third line of timing table
			var timing_fourth_td = timing_tr_collection[3].getElementsByTagName('td')[0];
			var input_in_fourth_td = timing_fourth_td.getElementsByTagName('label')[0].getElementsByTagName('input')[0];
			timing_fourth_td.getElementsByTagName('label')[0].innerText = '';
			timing_fourth_td.getElementsByTagName('label')[0].appendChild(input_in_fourth_td);
			br_2 = document.createElement('br');
			helper_span_2 = document.createElement('span');
			helper_span_2.classList.add("hint");
			helper_span_2.appendChild(document.createTextNode("(recommandé si vous pouvez relancer directement)"));
			timing_fourth_td.getElementsByTagName('label')[0].appendChild(document.createTextNode(" Temps identique pour toutes les options"));
			timing_fourth_td.getElementsByTagName('label')[0].appendChild(br_2);
			timing_fourth_td.getElementsByTagName('label')[0].appendChild(helper_span_2);

			// OPTION TABLE
			tr_collection = option_table.getElementsByTagName('tr');
			option_table_title = tr_collection[0];
			option_table_title.getElementsByTagName('th')[0].innerText = "Options à utiliser";
			tr_collection[1].getElementsByTagName('td')[1].innerText = "(10% de capacité)";
			tr_collection[2].getElementsByTagName('td')[1].innerText = "(25% de capacité)";
			tr_collection[3].getElementsByTagName('td')[1].innerText = "(50% de capacité)";
			tr_collection[4].getElementsByTagName('td')[1].innerText = "(75% de capacité)";

			// Troop table
			troop_table = win.$('.troops-section')[0];
			header_select_troop =  win.$(troop_table).find('tr')[0];
			header_th_1_select_troop = win.$(header_select_troop).find('th')[0];
			header_th_2_select_troop = win.$(header_select_troop).find('th')[1];
			win.$(header_th_1_select_troop).text('Utilisé');
			win.$(header_th_2_select_troop).text('Réserve');

			// Order table
			order_table = win.$('.troop-order-section')[0];
			header_order = win.$(order_table).find('tr')[0];
			header_th_order = win.$(header_order).find('th')[0];
			win.$(header_th_order).text('Ordre d\'envoi');
		});
	}
	tradCollect();