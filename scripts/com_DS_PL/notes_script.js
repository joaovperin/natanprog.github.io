/*
	Skrypt usuwający notatki z wiosek
	Autor: Makak
	Wersja: 1.2
*/


if (window.location.href.indexOf('screen=map') === -1) {
	UI.ErrorMessage('Przejdź na mapę aby skorzystać z tego skryptu', 4000);
} else {
	if (!notes_script) {
		var notes_script = {};
	}

	var t = (game_data.player.sitter !== '0') ? 't=' + game_data.player.id + '&' : '';

	notes_script.init = function() {
		this.villages = {};
		this.load_data();
		this.update_notes_list();
		this.update_villages_data();
		this.save_data();

		this.config = {own: true, ally: true, partner: true, nap: true, enemy: false, other: false, barbarian: false};
		this.load_config();
	};

	notes_script.display_gui = function() {
		var t = this;
		var content = `
			<label><input type="checkbox" id="notes_own_villages" ${this.get_config('own')}>Usuń notatki z własnych wiosek</label><br>
			<label><input type="checkbox" id="notes_ally_villages" ${this.get_config('ally')}>Usuń notatki z wiosek współplemieńców</label><br>
			<label><input type="checkbox" id="notes_partner_villages" ${this.get_config('partner')}>Usuń notatki z wiosek sojuszników</label><br>
			<label><input type="checkbox" id="notes_nap_villages" ${this.get_config('nap')}>Usuń notatki z wiosek plemion z którymi masz PON</label><br>
			<label><input type="checkbox" id="notes_enemy_villages" ${this.get_config('enemy')}>Usuń notatki z wiosek wrogów</label><br>
			<label><input type="checkbox" id="notes_other_villages" ${this.get_config('other')}>Usuń notatki z wiosek pozostałych graczy</label><br>
			<label><input type="checkbox" id="notes_barbarian_villages" ${this.get_config('barbarian')}>Usuń notatki z wiosek barbarzyńskich</label><br><br><br>

			<div id="notes_next_village_div">Następna wioska: <span id="notes_next_village"></span></div>
			<input type="button" class="btn" id="notes_remove_note" value="Usuń notatkę" style="position: relative; top: 5px">

			<div id="notes_no_information_div" style="display: none; position: absolute; bottom: 75px">Skrypt nie wie do kogo należą wioski na których masz notatki. Kliknij ten link: <a href="#" id="notes_no_information">pobierz informacje o wiosce</a> aby kontynuować korzystanie ze skryptu</div><br><br>
			<div id="notes_clear_data_div" style="position: absolute; bottom: 10px">Jeżeli uważasz że skrypt ma nieaktualne informacje o właścicielach wiosek itp. to odśwież stronę a następnie kliknij ten przycisk: <input type="button" id="notes_clear_data" value="Zresetuj informacje"></div>
		`;

		inlinePopup({clientX: 300, clientY: 100}, 'notes_script', null, {offset_x: -0, offset_y: -0, width: 400}, content, 'Usuwanie notatek wiosek');
		$('#inline_popup').css('width', '380px');
		$('#inline_popup_main').css('padding', '10px');
		this.show_next_village();

		$('#inline_popup input[type=checkbox]').change(function() {
			t.show_next_village();
			t.update_config();
			t.save_config();
		});

		$('#notes_remove_note').click(function() {
			t.remove_note();
		});

		$('#notes_clear_data').click(function() {
			t.clear_data();
			t.reload_notes_list();
			t.update_villages_data();
			t.save_data();
			t.show_next_village();
		});
	};

	notes_script.reload_notes_list = function() {
		this.villages = {};
		for (var village_id in TWMap.villageIcons) {
			if (TWMap.villageIcons.hasOwnProperty(village_id) && TWMap.villageIcons[village_id].hasOwnProperty('note')) {
				if (TWMap.villageIcons[village_id].note.img === '/graphic/map/village_notes_1.png' || TWMap.villageIcons[village_id].note.img === '/graphic/map/village_notes_3.png') {
					this.villages[village_id] = {type: 'unknown', x: -1, y: -1, player_name: '', player_id: -1};
				}
			}
		}
	};

	notes_script.update_notes_list = function() {
		for (var village_id in TWMap.villageIcons) {
			if (this.villages.hasOwnProperty(village_id) === false && TWMap.villageIcons.hasOwnProperty(village_id) && TWMap.villageIcons[village_id].hasOwnProperty('note')) {
				if (TWMap.villageIcons[village_id].note.img === '/graphic/map/village_notes_1.png' || TWMap.villageIcons[village_id].note.img === '/graphic/map/village_notes_3.png') {
					this.villages[village_id] = {type: 'unknown', x: -1, y: -1, player_name: '', player_id: -1};
				}
			}
		}
	};

	notes_script.update_villages_data = function() {
		for (var village_id in this.villages) {
			if (this.villages.hasOwnProperty(village_id)) {
				if (TWMap.villageKey.hasOwnProperty(village_id)) {
					var xy = TWMap.villageKey[village_id];
					var x = TWMap.CoordByXY(xy)[0], y = TWMap.CoordByXY(xy)[1];
					var player_id = Number(TWMap.villages[xy].owner);
					if (player_id === 0) {
						this.villages[village_id] = {type: 'barbarian', x: x, y: y, player_name: '', player_id: player_id};
					} else {
						var player_name = TWMap.players[player_id].name;
						if (player_id === Number(TribalWars.getGameData().player.id)) {
							this.villages[village_id] = {type: 'own', x: x, y: y, player_name: player_name, player_id: player_id};
						} else {
							var ally_id = Number(TWMap.players[player_id].ally);
							if (ally_id === 0 || (TWMap.allyRelations.hasOwnProperty(ally_id) === false && ally_id !== Number(TribalWars.getGameData().player.ally))) {
								this.villages[village_id] = {type: 'other', x: x, y: y, player_name: player_name, player_id: player_id};
							} else {
								if (ally_id === Number(TribalWars.getGameData().player.ally)) {
									this.villages[village_id] = {type: 'ally', x: x, y: y, player_name: player_name, player_id: player_id};
								} else {
									this.villages[village_id] = {type: TWMap.allyRelations[ally_id], x: x, y: y, player_name: player_name, player_id: player_id};
								}
							}
						}
					}
				}
			}
		}
	};

	notes_script.find_village_by_type = function(type) {
		for (var village_id in this.villages) {
			if (this.villages.hasOwnProperty(village_id)) {
				if (this.villages[village_id].type === type) {
					return village_id;
				}
			}
		}
		return -1;
	};

	notes_script.find_village = function() {
		var types = ['own', 'ally', 'partner', 'nap', 'enemy', 'other', 'barbarian'];
		for (var type in types) {
			if (types.hasOwnProperty(type) && $('#notes_' + types[type] + '_villages').is(':checked')) {
				var id = this.find_village_by_type(types[type]);
				if (id !== -1) {
					return id;
				}
			}
		}

		return -1;
	};

	notes_script.show_next_village = function() {
		if ($('#inline_popup input[type=checkbox]:checked').length === 0) {
			UI.ErrorMessage('Musisz zaznaczyć jedną z opcji które notatki skrypt ma usuwać', 4000);
			$('#notes_next_village').text('nie wybrano żadnej opcji');
			$('#notes_remove_note').hide();
			$('#notes_no_information_div').hide();
		} else {
			var id = this.find_village();
			if (id !== -1) {
				$('#notes_next_village').html('<a href="/game.php?' + t + 'village=' + TribalWars.getGameData().village.id + '&screen=info_village&id=' + id + '">' + this.villages[id].x + '|' + this.villages[id].y + '</a> [' + (this.villages[id].player_id === 0 ? 'barbarzyńska' : '<a href="/game.php?' + t + 'village=' + TribalWars.getGameData().village.id + '&screen=info_player&id=' + this.villages[id].player_id + '">' + this.villages[id].player_name + '</a>') + ']');
				$('#notes_remove_note').show();
				$('#notes_no_information_div').hide();
			} else {
				var unknown_id = this.find_village_by_type('unknown');
				if (unknown_id === -1) {
					$('#notes_next_village').text('nie ma żadnych notatek do usunięcia');
					$('#notes_remove_note').hide();
					$('#notes_no_information_div').hide();
				} else {
					$('#notes_next_village').text('brak informacji');
					$('#notes_remove_note').hide();
					$('#notes_no_information_div').show();
					$('#notes_no_information').data('village_id', unknown_id);
				}
			}
		}
	};

	notes_script.remove_note = function() {
		var _this = this;
		var id = this.find_village();
		$.post(
			'/game.php?' + t + 'village=' + TribalWars.getGameData().village.id + '&screen=info_village&ajaxaction=edit_notes&id=' + id + '&h=' + TribalWars.getGameData().csrf + '&client_time=' + Math.floor(Date.now()/1000),
			{note: ''}
		).done(function() {
			UI.SuccessMessage('Notatka została usunięta.', 700);
			delete _this.villages[id];
			_this.save_data();
			_this.show_next_village();

			delete TWMap.villageIcons[id].note;
		}).error(function() {
			UI.ErrorMessage('Notatka nie została usunięta. Spróbuj za chwilę jeszcze raz.', 3000);
		});
	};

	notes_script.load_data = function() {
		if (localStorage.getItem('notes_script') !== null) {
			this.villages = JSON.parse(localStorage.getItem('notes_script'));
		}
	};

	notes_script.save_data = function() {
		localStorage.setItem('notes_script', JSON.stringify(this.villages));
	};

	notes_script.clear_data = function() {
		this.villages = {};
	};

	notes_script.load_config = function() {
		if (localStorage.getItem('notes_script_config') !== null) {
			this.config = JSON.parse(localStorage.getItem('notes_script_config'));
		}
	};

	notes_script.save_config = function() {
		localStorage.setItem('notes_script_config', JSON.stringify(this.config));
	};

	notes_script.get_config = function(type) {
		return (this.config[type] === true) ? 'checked="checked"' : '';
	};

	notes_script.update_config = function() {
		for (var type in this.config) {
			if (this.config.hasOwnProperty(type)) {
				this.config[type] = $('#notes_' + type + '_villages').is(':checked');
			}
		}
	};

	$('body').on('click', '#notes_no_information', function(e) {
		e.preventDefault();
		$.get('/game.php?' + t + 'screen=info_village&id=' + $(this).data('village_id'), function(result) {
			var coords = result.match(/Współrzędne:<\/td><td>(\d+)\|(\d+)<\/td>/);
			if (coords === null) {
				UI.ErrorMessage('Wystąpił błąd podczas pobierania danych. Odśwież stronę i spróbuj ponownie.');
			} else {
				$('#mapx').val(coords[1]);
				$('#mapy').val(coords[2]);
				TWMap.focusSubmit();

				var handle = setInterval(function() {
					if (window.location.hash.substr(1) === coords[1] + ';' + coords[2]) {
						clearInterval(handle);

						setTimeout(function() {
							notes_script.update_villages_data();
							notes_script.save_data();
							notes_script.show_next_village();
						}, 200);
					}
				}, 100);
			}
		});

		return false;
	});



	notes_script.init();
	notes_script.display_gui();
}


