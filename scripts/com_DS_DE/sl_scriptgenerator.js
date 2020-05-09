win = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
win.ScriptAPI.register( 'SL-Scriptgenerator', true, 'Team Die Stämme', 'scripts@team.die-staemme.de' );

if($('.sl_scriptgenerator').length) $('.sl_scriptgenerator').remove(); // prevent it can be opened more than once!

// some vars
var output = '';
var content = '';
var units_table = '';
var settings_table = '';
var coords_active = false;

// array with units
var units = ['spear', 'sword', 'axe', 'archer', 'spy', 'light', 'marcher', 'heavy', 'ram', 'catapult', 'knight', 'snob'];

// language vars
var lang = {
    'spear': 'Speerträger',
    'sword': 'Schwertkämpfer',
    'axe': 'Axtkämpfer',
    'archer': 'Bogenschütze',
    'spy': 'Späher',
    'light': 'Leichte Kavallerie',
    'marcher': 'Berittener Bogenschütze',
    'heavy': 'Schwere Kavallerie',
    'ram': 'Rammbock',
    'catapult': 'Katapult',
    'knight': 'Paladin',
    'snob': 'Adelsgeschlecht',   
}; 

// define popup and buttons
var popup_box_container = '<div class="popup_box_container" id="popup_box_container"></div>';
var popup_box           = '<div class="popup_box show mobile sl_scriptgenerator" id="popup_box" style="width: 500px;"></div>';
var popup_box_content   = '<div class="popup_box_content" id="popup_box_content" style="overflow: auto;"></div>';
var popup_box_header    = '<h2 class="popup_box_header center" id="popup_box_header">Script-Generator</h2>';
var popup_box_close     = '<a class="popup_box_close" href="#" onclick="$(\'.popup_box_container\').remove();" title="Popup schließen">&nbsp;</a>';
var input_container     = '<div id="input_container"></div>';
var show_data_container = '<div id="show_data_container"></div>';
var script_container    = '<div id="script_container" style="display: none;"></div>';
var button_continue     = '<button class="btn btn-confirm-yes step1" id="button_continue">Weiter</button>';
var button_generate     = '<button class="btn btn-confirm-yes step2" id="button_generate" style="display: none;">Script generieren</button>';
var button_edit         = '<button class="btn btn-confirm-no step2" id="button_edit" style="display: none;">Eingaben korrigieren</button>'; 
var buttons             = '<p style="text-align: right;">' + button_continue + ' ' + button_edit + ' ' + button_generate + '</p>';
var textarea            = '<textarea class="step3" id="generatedScript" style="width: 98%; min-height: 200px; resize: vertical;" onfocus="this.select();"></textarea>';
var script_hint         = '<p class="step3" id="script_hint">Kopiere nun das generierte Script und füge es in das Feld <i>Ziel-URL</i> ein.</p>';
 
$('body').append(popup_box_container);
$('#popup_box_container').append(popup_box);
$('#popup_box').append(popup_box_content);
$('#popup_box_content').append(popup_box_header); 
$('#popup_box_content').append(popup_box_close);
$('#popup_box_content').append(input_container);
$('#popup_box_content').append(show_data_container);
$('#popup_box_content').append(script_container);

// fill content_container with our content
$('#input_container').append(create_units_table());
$('#input_container').append(create_settings_table());
$('#script_container').append(script_hint);
$('#script_container').append(textarea);
$('#popup_box_content').append(buttons);

// type selection was changed
$('.select_amount').change(function() {
    var value = $('option:selected', $(this)).val();
	var name = $(this).attr('name');	
	var cur_unit = name.split('_')[1];

    switch(value) {
        case '0': 
            $('#input_' + cur_unit).prop('disabled', true);
            $('#input_' + cur_unit).val('');
            break;
        case '1':
            $('#input_' + cur_unit).prop('disabled', false);
            $('#input_' + cur_unit).val('');            
            break;
        case '2':
            $('#input_' + cur_unit).prop('disabled', true);
            $('#input_' + cur_unit).val('A');        
            break;
        case '3':
            $('#input_' + cur_unit).prop('disabled', false);
            $('#input_' + cur_unit).val('');        
            break;            
        default:
            $('#input_' + cur_unit).prop('disabled', true);
            $('#input_' + cur_unit).val('');                                                
    }
});

// checkbox for the coords clicked
$('#insert_coords').click(function(){
	if($(this).is(':checked') ) {
    	$('#coord_x, #coord_y').prop('disabled', false);
    	$('#coord_x, #coord_y').prop('required', true);
        coords_active = true;
    }
    else {
	    $('#coord_x, #coord_y').prop('disabled', true);
	    $('#coord_x, #coord_y').prop('required', false);
	    $('#coord_x, #coord_y').val('');
        coords_active = false;	
	}
});

// button continue was clicked
$('#button_continue').click(function() {
    var error = true;
    var settings = [];
    
	$('#units_table input').each(function() {
		var unit_name = $(this).attr('name');
		var unit_amount = $(this).val();        
        var unit_option = $('#selection_' + unit_name + ' option:selected').val();

        if(unit_option == 0) settings.push(0);

        if(unit_option == 1 && $.isNumeric(unit_amount) && unit_amount > 0) settings.push(unit_amount);
        
        if(unit_option == 2 && unit_amount == 'A') settings.push('\'A\'');
        
        if(unit_option == 3 && $.isNumeric(unit_amount)) {
            settings.push(-Math.abs(unit_amount));
        }   		     	
	});        

    if(coords_active) {
        var input_x = check_coords($('#coord_x').val());        
        if(input_x == true) settings.push($('#coord_x').val());

        var input_y = check_coords($('#coord_y').val());        
        if(input_y == true) settings.push($('#coord_y').val());
    }
    else {
        settings.push('\'none\''); // x
        settings.push('\'none\''); // y    
    }
    
    // which button?
    var which_button = $('input[name="which_button"]:checked').val();
    switch(which_button) {
        case '1':
            settings.push('\'attack\'');
            break;        
        case '2':
            settings.push('\'support\'');
            break;        
        default:
            settings.push('\'none\'');                        
    }        
    
    // create script source
    output = 'javascript: var settings = Array(';
    
    var settings_count = settings.length;
    for (var i = 0; i < settings_count; i++) {
        output += settings[i];
        if(i < settings_count - 1) output += ', ';
    }

    output += '); $.getScript(\'https://media.innogamescdn.com/com_DS_DE/scripts/qb_main/scriptgenerator.js\'); void(0);' 

    if(settings.length == 15) error = false; 

    if(error == false) {	
        // show what we will insert...
        var show_user_inputs = '<table class="vis step2" style="width: 100%;"><thead><tr><th colspan="2">Folgende Truppen würden eingetragen:</th></tr></thead><tbody>'
    	$('#units_table input').each(function() {
    		var unit_name = $(this).attr('name');
    		var unit_amount = $(this).val();
            var unit_option = $('#selection_' + unit_name + ' option:selected').val();
            
            switch(unit_option) {
                case '0': 
                    unit_amount = 0;
                    break;
                case '2':
                    unit_amount = 'Alle Truppen';
                    break;
                case '3':
                    unit_amount = 'Alle Truppen minus ' + Math.abs(unit_amount); 
                    break;
                default:
                    unit_amount = unit_amount;               
            }
            
            show_user_inputs += '<tr class="row_b"><td>' + unit_image(unit_name) + lang[unit_name] + '</td><td>' + unit_amount + '</td></tr>';      	
    	});  
        
        show_user_inputs += '</tbody></table>';

        // check coords       
        if($('#insert_coords').is(':checked')) {            
            var input_x = check_coords($('#coord_x').val());
            var input_y = check_coords($('#coord_y').val());
        }
        else {
            var input_x = false;
            var input_y = false;            
        }	 
    
    	if(input_x == true && input_y == true) show_user_inputs += '<p class="step2">Diese Koordinaten würden eingetragen: ' + $('#coord_x').val() + '|' + $('#coord_y').val() + '</p>';
    	else show_user_inputs += '<p class="step2">Es würden keine Koordinaten eingetragen.</p>';

        var which_button = $('input[name="which_button"]:checked').val(); 
        switch(which_button) {
            case '1':
                show_user_inputs += '<p class="step2">Es würde der Button <b>Angreifen</b> ausgelöst.</p>';
                break;        
            case '2':
                show_user_inputs += '<p class="step2">Es würde der Button <b>Unterstützen</b> ausgelöst.</p>';
                break;        
            default:
                show_user_inputs += '<p class="step2">Es würde kein Button ausgelöst.</p>';                        
        }
        
        $('#show_data_container').append(show_user_inputs);    

        // hide what we don't need    
        $('#input_container, #button_continue').hide();
        
        // show edit and generate button and container
    	$('#button_edit, #button_generate, #show_data_container').show();          
    }
    else UI.ErrorMessage('Es wurden Fehler gefunden. Bitte Eingaben prüfen!', 3000);
});

// button_edit was clicked
$('#button_edit').click(function() {
	$('#button_edit, #button_generate, #show_data_container').hide();
    $('#show_data_container').html('');
    $('#input_container, #button_continue').show();   
});

// button generate script was clicked
$('#button_generate').click(function() {
    $('#input_container, #button_edit, #button_generate, #show_data_container').hide();    
    $('#generatedScript').text(output);    
    $('#script_container').show();
});

function check_coords(coord) {
    if(coord) {    
        if($.isNumeric(coord)) {
            if(coord < 0 || coord > 999) return false;
            else return true;
        }
        else return true;         
    }
	else return false;   
}

function unit_image(str) {
    if(str) {
        return '<img src="graphic/unit/unit_' + str + '.png" alt="' + str + '" title="' + str + '" />';        
    }
    else return str;
}

function create_units_table() {
    units_table = '<table id="units_table" class="vis step1" style="width: 100%;">'; // open table
    units_table += '<thead><tr><th>Einheit</th><th colspan="2">Anzahl</th></tr></thead><tbody>';
    
    var len = units.length;
    for(var i = 0; i < len; i++) {
        units_table += '<tr class="row_b"><td>'+ unit_image(units[i]) + lang[units[i]] + '</td>';
    
        units_table += '<td>';
    
        // select
        units_table += '<select class="select_amount" name="selection_'+ units[i] + '" id="selection_'+ units[i] + '">';
        units_table += '<option value="0">Keine</option>';
        units_table += '<option value="1">Absolute Anzahl</option>';
        units_table += '<option value="2">Alle Truppen</option>';
        units_table += '<option value="3">Relative Anzahl (alle Truppen minus)</option>';
        units_table += '</select>';
    
        units_table += '</td>';
        units_table += '<td><input type="text" name="' + units[i] + '" id="input_' + units[i] + '" value="" size="5" maxlength="5" disabled="disabled" /></td>';
    }
    
    units_table += '</tbody></table>';
    
    return units_table;
}

function create_settings_table() {          
    var settings_table = '';
    settings_table += '<table class="vis step1" style="width: 100%;" id="settings_table">';
    settings_table += '<thead><tr><th colspan="2">Zusätzliche Einstellungen</th></tr></thead>';
    settings_table += '<tbody><tr><td>Soll ein Button angeklickt werden?</td><td><label><input type="radio" name="which_button" value="0" checked="checked" />Nein <input type="radio" name="which_button" value="1" />Angreifen <input type="radio" name="which_button" value="2" />Unterstützen</label></td></tr>';
    settings_table += '<tr><td>Sollen Koordinaten eingefügt werden?</td><td><input type="checkbox" id="insert_coords" name="insert_coords" /> x: <input type="number" id="coord_x" name="coord_x" size="3" placeholder="123" disabled="disabled" min="0" max="999" value="" /> y: <input type="number" id="coord_y" name="coord_y" size="3" maxlength="3" placeholder="456" disabled="disabled" min="0" max="999" value="" /></td></tr>';
    settings_table += '</tbody></table>'; 
    
    return settings_table;
}

if($(window).height() < 450) {
	$('#popup_box, div.popup_box_content').css('max-height', $(window).height() - 50);
} 

$(window).resize(function () { 
   if($(window).height() < 450){
		$('#popup_box, div.popup_box_content').css('max-height', $(window).height() - 50);       
   }else{
       $('div.popup_box, div.popup_box_content').css('max-height', ''); 
   }  
});