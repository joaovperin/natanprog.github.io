// @name       Exporter les villages réservés
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
 * Function: updateTextarea
 * --------------------
 * Updates the export textarea with formatted coordinates
 */
function updateTextarea(before, after) 
{
	$('#ally_content > textarea').val(function(i, val) {
		return formatCoordinates(val, before, after);
	})
}

// === Main ===
if (game_data.screen != 'ally' && game_data.mode != 'export')
    window.location.href = '/game.php?village=' + game_data.village.id + '&mode=reservations&group_id=creator_id&filter=' + game_data.player.id + '&screen=ally';
else {
    // add control buttons
    buttons = '<br>';
    $.each(formats, function(i) {
        buttons += '<input id="format-' + i + '" class="btn" type="button" value="' + i + '">';
    });
    buttons += '<br><br>';
    
    $('#ally_content > br:nth-child(3)').after(buttons);
    
    // add listeners
    $.each(formats, function(i, val) {
        $('#format-' + i).click(function() {
            updateTextarea(val[0], val[1]);
        });
    });
}