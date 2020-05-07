/***********************************************
Template saver script for Tribal Wars. This can
be used with building queues.
IronFist, 2015. september
***********************************************/

(function () {
	//Create textarea (and buttons if necessary)
	function createTextArea(save) {
		if (save) {
			$('table#overview_menu').after('<h3>Sablon mentése</h3><p>A szövegmező tartalmát másold ki, és mentsd le egy fájlba módosítás nélkül.</p><textarea id="script_output" cols="40" rows="20"></textarea>');
		}
		else {
			$('table#overview_menu').after('<h3>Sablon importálása</h3><p>Az alábbi szövegmezőbe másold be a betöltendő sablont.</p><textarea id="script_input" cols="40" rows="20"></textarea><br><button id="script_import">Sablon betöltése</button>');
		}
	}

	//delete existing build commands
	function deleteCurrentTemplate() {
		$('ul#template_queue').children('li').each(function (key, val) {
			$('div.bqremove:first').click();
		});
	}

	//creates an array from the string
	function parseInput(input) {
		var ret      = [];
		var building = [];
		var data     = input.trim().split(";");

		//iterate through the input
		for (var i = 0; i < data.length; i++) {
			building = data[i].split("|");

			ret.push({
				name: building[0].trim(),
				level: parseInt(building[1])
			});
		}

		return ret;
	}

	//Add elements from array
	function addElements(queue) {
		for (var i = 0; i < queue.length; i++) {
			$('select#add_building').val(queue[i].name);
			$('input#add_levels').val(queue[i].level);
			$('input#add_levels').next('input[type="submit"]').click();
		}
	}

	//Save building list
	function saveTemplate() {
		var output = "";

		//create output field
		createTextArea(true);

		//generate output string
		$('ul#template_queue').children('li').each(function (key, val) {
			if (key > 0) {
				output += ";"
			}

			output += $(val).attr('data-building') + "|";
			output += $(val).find('.level_relative').text().replace("+", "").trim();
		});

		//bind
		$('textarea#script_output').val(output).on('focus', function () {
			$(this).select();
		});
	}

	//Import the buildings
	function importTemplate() {
		createTextArea(false);

		//start import
		$('button#script_import').on('click', function () {
			var input = $('textarea#script_input').val().trim();

			//check if input is empty
			if (!input) {
				UI.ErrorMessage("Nem adtál meg sablont!");
			}
			else {
				deleteCurrentTemplate();
				addElements(parseInput(input));
			}
		});
	}

	//constructor
	function __() {
		//var save = confirm("Mentés = OK, importálás = Mégse");
		var buttons = [{
			text: "Mentés",
			callback: function () { saveTemplate(); }
		}, {
			text: "Importálás",
			callback: function () { importTemplate(); }
		}, {
			text: "Mégse",
			cancel: true
		}];

		UI.ConfirmationBox("Sablonmentő és importáló script", buttons, "", true);
	}

	//Entry point
	(function main(screen, mode) {
		if (screen == "am_village" && mode == "queue") {
			__();
		}
		else {
			UI.ErrorMessage("Nyiss meg egy sablont szerkesztésre!");
		}
	})(game_data.screen, game_data.mode);
})();