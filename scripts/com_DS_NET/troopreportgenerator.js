javascript:(function() {
var url_prefix = window.game_data.link_base_pure;
var url = url_prefix + "overview_villages&mode=units";
var overviews_url = url_prefix + "overview_villages";
var parse_html = function(html_string) {
	var parser = new DOMParser();
	return parser.parseFromString(html_string, "text/html");
};
var parse_row = function(row, unit_labels) {
	var trs = row.querySelectorAll('tr');
	var units = [];
	var available_tds = trs[0].querySelectorAll('td.unit-item');
	var outward_tds = trs[2].querySelectorAll('td.unit-item');
	var transit_tds = trs[3].querySelectorAll('td.unit-item');

	available_tds.forEach(function(td, i) {
		units.push({
			label: unit_labels[i],
			current: td.textContent.trim(),
			supporting: outward_tds[i].textContent.trim(),
			total: (parseInt(td.textContent) +
				parseInt(outward_tds[i].textContent) +
				parseInt(transit_tds[i].textContent)).toString(),
		});
	});
	units = units.filter(function(unit) {
		return parseInt(unit.total);
	});
	return {
		village: '',
		units: units,
	};
};
var parse_rows = function(rows, labels) {
	var coord_regex = /\(([0-9]{3}\|[0-9]{3})\)/;
	return Array.prototype.map.call(rows, function(row) {
		var village_string = row.querySelector('a span[data-text]').textContent;
		var regex_result = coord_regex.exec(village_string);
		var parsed = parse_row(row, labels);
		parsed.village = regex_result[1];
		return parsed;
	});
};
var total_villages = function(villages, labels) {
  var total_units = {};
  labels.forEach(function(label) {
    total_units[label] = {
        current: 0,
        supporting: 0,
        total: 0,
      };
  });
  villages.forEach(function(village, i) {
    var units = village.units;
    units.forEach(function(unit) {
      var key = unit.label;
      var value = total_units[key];
      value.label = key;
      value.current += parseInt(unit.current);
      value.supporting += parseInt(unit.supporting);
      value.total += parseInt(unit.total);
      total_units[key] = value;
    });
  });
  var total_units_array = [];
  for (var i in total_units) {
    total_units_array.push(total_units[i]);
  }
  total_units_array = total_units_array.filter(function(unit) {
    return parseInt(unit.total);
  });
  return total_units_array;
};
var most_chars = function(units, property) {
	/* hurts tool lookup for uses of unit.label, unit.current, unit.total */
	var character_lengths = units.map(unit => String(unit[property]).length);
	return Math.max(... character_lengths);
};
var pad_left = function(string, length) {
  string = String(string);
	if (string.length >= length)
		return string;
	var to_pad = length - string.length;
	var padding = Array(to_pad).fill(' ').join('');
	return padding + string;
};
var grid = function(units) {
	var grid_sizes = {
		label: most_chars(units, 'label'),
		current: most_chars(units, 'current'),
		supporting: most_chars(units, 'supporting'),
		total: most_chars(units, 'total'),
	};
	var unit_strings = units.map(function(unit) {
		return pad_left(unit.label, grid_sizes.label) + " | Available: " +
		pad_left(unit.current, grid_sizes.current) + " | Supporting: " +
		pad_left(unit.supporting, grid_sizes.supporting) + " | Total: " +
		pad_left(unit.total, grid_sizes.total);
	});
	return unit_strings.join("\n");
};
var request_rows = function(all_present_rows, callback) {
	var requested_rows = [];
	var inputs_html = Array.prototype.map.call(all_present_rows, function(row, i) {
		return '<label><input type="checkbox" checked value="' + i + '" />' + row.querySelector('a span[data-text]').textContent.trim() + '</label><br />';
	}).join('');
	var $all = $('<div><label><input type="checkbox" checked />' + _('All') + '</label></div>');
	var $inputs = $('<div>' + inputs_html + '</div>');
	var $buttons = $('<div class="center"><button class="btn btn-confirm-yes">' + _('Confirm') + '</button>' +
		'<button class="btn btn-confirm-no">' + _('Cancel') + '</button></div>');
	$all.find('input').change(function() {
		$inputs.find('input').prop('checked', this.checked);
	});
	$inputs.find('input').change(function() {
		var $all_checkbox = $all.find('input');
		if ($inputs.find('input:checked').length !== $inputs.find('input').length) {
			$all_checkbox.prop('checked', false);
		} else {
			$all_checkbox.prop('checked', true);
		}
	});
	$buttons.find('button.btn-confirm-yes').click(function() {
		Dialog.close();
		var result = $inputs.find('input:checked').map(function() {
			var input = this;
			return all_present_rows[input.value];
		});
		callback(result);
	});
	$buttons.find('button.btn-confirm-no').click(function() {
		Dialog.close();
	});

	var $dialog = $all.add($inputs).add($buttons);
	Dialog.show('ls_tw_troop_report', $dialog);
};
var target = document.querySelector('textarea');
if (!target) {
	UI.ErrorMessage(_('Could not find a text box to fill'));
} else {
	/*
	 * Make 3 requests: one to get the currently selected overview;
	 * one to get the troop counts;
	 * and one to restore the selected overview.
	 */
	var restore_url;
	$.ajax(overviews_url, {
		success: function(body) {
			var other_document = parse_html(body);
			restore_url = other_document.querySelector('#overview_menu td.selected a, #paged_view_content td.selected a').href;
			
			$.ajax(url, {
				success: function(body) {
					var other_document = parse_html(body);
					var container = other_document.querySelector('table#units_table');
					var label_containers = container.querySelectorAll('th [title]');
					var labels = Array.prototype.map.call(label_containers, function(container) {
						return container.title;
					});
					var rows = container.querySelectorAll('tbody');
					request_rows(rows, function(requested_rows) {
						var villages = parse_rows(requested_rows, labels);
						var totals = total_villages(villages, labels);
						target.value += _('Total units') + '\n[code]\n' + grid(totals) + '\n[/code]';
						villages.forEach(function(village) {
							target.value += '\n[coord]' + village.village + '[/coord]\n[code]\n' + grid(village.units) + '\n[/code]';
						});
					});

					$.ajax(restore_url);
				},
			});
		},
	});
}})();