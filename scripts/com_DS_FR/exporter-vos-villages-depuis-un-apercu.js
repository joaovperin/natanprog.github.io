// @name       Exporter vos villages depuis un aperçu
// @version    1.0
// @auteur     Artemisia (fr)

// === Config ===
var formats = {
    liste: ['', "\n"],
    coord: ['[coord]', "[/coord]\n"],
    claim: ['[claim]', "[/claim]\n"],
    script: ['', ' '],
}

// === Lib ===
/**
 * Function: getVillageFromOverview
 * --------------------
 * Returns a string of space separated villages coordinates
 *   Supported overviews : combined, production, units, buildings, techs, groups
 *   The output list is cached
 * 
 * @return string
 */
function getVillageFromOverview()
{	
    if (typeof villages !== 'undefined' && villages.length > 2)
        return villages;
    
    var villages = '';
    
    $('#paged_view_content').find('.overview_table a span.quickedit-label').each(function() {
        village = $(this).text().trim();
        villages += village.substring( village.lastIndexOf('(')+1, village.lastIndexOf(')')) + ' ';
    });
    
    return villages;
}

/**
 * Function: formatCoordinates
 * --------------------
 * Returns a string with formatted coordinates
 * 
 * @param string input_string
 * @param string before
 * @param string after
 * @return string
 */
function formatCoordinates(input_string, before, after)
{	
    coords = $.unique( input_string.match(/([0-9]{1,3}\|[0-9]{1,3})/g) );
    output_string = "";
    
    $.each(coords, function(){
    	output_string += before + this + after;
    });
    
    return output_string;
}

/**
 * Function: updateExportTextarea
 * --------------------
 * Updates the export textarea with formatted coordinates
 */
function updateExportTextarea(format) 
{
	$('#villages-export').val(
        formatCoordinates(getVillageFromOverview(), format[0], format[1])
	)
}

// === Main ===
if (game_data.screen == 'overview_villages'
   && game_data.mode != 'trader'
   && game_data.mode != 'commands'
    && game_data.mode != 'incomings') {
    // add export textarea
    $('#paged_view_content').prepend(''
        +'<textarea id="villages-export" type="textarea" style="width:98%; height:100px"></textarea>'                            
    );
    updateExportTextarea(formats[defaultFormat]);
    
    // add control buttons
    var buttons = '';
    $.each(formats, function(i) {
        buttons += '<input id="format-' + i + '" class="btn" type="button" value="' + i + '">';
    });
    $('#villages-export').after('<br>' + buttons + '<br><br>');
    
    // add listeners
    $.each(formats, function(i, val) {
        $('#format-' + i).click(function() {
            updateExportTextarea(val);
        });
    });
} else if (game_data.screen == 'overview_villages') {
	UI.ErrorMessage('Aperçu non supporté', 5000);
} else {
	UI.ErrorMessage('Ce script doit être lancé depuis un aperçu', 5000)
}