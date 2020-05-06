/*************************************************
author  : IronFist
version : 2.1
script  : This script can be used to rename the
          incomings.
*************************************************/

//javascript:var fejleszto="IronFist";var verzio="2.1";$.getScript("https://media.innogamescdn.com/com_DS_HU/scripts/bejovoatnevezo.js");void 0;

(function () {
	function doIt(all, name) {
		var td = [];
		$('table#incomings_table').find('tr').not(':first').not(':last').each(function (key, val) {
			td = $(val).children('td').first();

			if (all) {
				td.find('a').last().trigger("click");
				td.find('span.quickedit-edit').first().find('input').first().val(name).next().trigger("click");
			} else {
				if (td.find('input[type="checkbox"]').first().prop("checked")) {
					td.find('a').last().trigger("click");
					td.find('span.quickedit-edit').first().find('input').first().val(name).next().trigger("click");
				}
			}
		});
	}

	function reName() {
		var all = confirm("Mindet nevezzem át?");
		var name = prompt("Mire nevezzem át?", "");

		doIt(all, name);
	}

	function __() {
		if (typeof fejleszto != 'string' || fejleszto != String.fromCharCode(73, 114, 111, 110, 70, 105, 115, 116)) {
			alert(String.fromCharCode(65, 32, 102, 101, 106, 108, 101, 115, 122, 116, 337, 116, 32, 110, 101, 32, 110, 233, 118, 116, 101, 108, 101, 110, 237, 116, 115, 100, 32, 101, 108, 33));
			return false;
		}

		reName();
	}

	if (document.URL.match("screen=overview_villages") && document.URL.match("mode=incomings")) {
		__();
	} else {
		alert("A script a bejövők áttekintésénél működik. Most átirányítunk oda.");
		self.location = game_data.link_base_pure.replace(/screen\=\w*/i, "screen=overview_villages&mode=incomings");
	}
})();