javascript: /*Hidden villages by Tuam, v1.2*/
var settings={}, coords, villID, currentName;

function change_a_name(villID, currentName){
	settings[villID]=prompt('Wat moet de naam van het dorp worden?',currentName);
	if (settings[villID] != '' && settings[villID] != null){
		localStorage.Tuam_hidden_villages = JSON.stringify(settings);
		coords = $('span[data-id="'+villID+'"]').text().match(/\((.*?)\) C(.*?) /);
		$('span[data-id="'+villID+'"] .quickedit-label').contents().replaceWith(settings[villID]+' ('+coords[1]+') C'+coords[2]);
	}
}

function export_settings(){
	var newNames = prompt('Hieronder vind je jouw dorpsnamen.\nJe kan dit opslaan en ergens anders invoeren.\n\nWat je hier plakt wordt opgeslagen.',JSON.stringify(settings));
	if (newNames){
		settings = JSON.parse(newNames);
		localStorage.Tuam_hidden_villages = newNames;
		view_hidden_names();
	}
}

function view_hidden_names(){
	$('span[class="quickedit-vn"]').each(function(){
		villID = $(this).attr('data-id');
		currentName = $(this).find('.quickedit-label').attr('data-text');
		if (settings[villID]) {
			coords = $(this).text().match(/\((.*?)\) C(.*?) /);
			$(this).find('.quickedit-label').contents().replaceWith(settings[villID]+' ('+coords[1]+') C'+coords[2]);
		}
		if ($('#hidden_village_link').length == 0) $(this).append('<img src="/graphic/stat/banned.png" onclick="change_a_name(\''+villID+'\',\''+currentName+'\')">');
	});
	if ($('#hidden_village_link').length == 0) $('#paged_view_content table:last').after('<a href="#" id="hidden_village_link" onclick="export_settings()">Klik hier om je dorpsnamen te exporteren of te importeren</a>');
}

try {
	JSON.parse(localStorage.Tuam_hidden_villages);
} catch (e) {
	localStorage.Tuam_hidden_villages = JSON.stringify(settings);
}

settings = JSON.parse(localStorage.Tuam_hidden_villages);
view_hidden_names();
void(0);