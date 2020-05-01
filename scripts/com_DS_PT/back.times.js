var outputID = 'villageList';

$(document).ready(function()
{
    if ($('#' + outputID).length <= 0)
    {
        if (window.game_data.screen != '')
        {
            var srcHTML = '<div id="back_times" style="z-index: 99999; position: absolute; top: 15px; left:15px; width: auto; height: auto; background-image: url(../graphic/index/bg-tile.jpg); padding: 12px; visibility: visible; cursor: pointer; border: 3px solid; border-radius: 6px">'
                        + '<iframe src="https://scripts.ds.solutions.pt/js/back.html" width="500" height="580" frameborder="0"></iframe> '
                        + '<center><p style="color:white;"><center><input type=button class="btn" value="Fechar janela" onClick="history.go()"></div>';
            $('body').append($(srcHTML));
            $('#back_times').draggable();
        }
    }
});