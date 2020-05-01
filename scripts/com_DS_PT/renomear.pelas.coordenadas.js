var millis = 0;

function setMillis()
{
	var tmp = millis;
	millis += 200;
	return tmp;
}

function convertCoords(x, y)
{
    var con = Math.floor(y / 100) + '' + Math.floor(x / 100);
    var sec = (Math.floor(y / 10) % 10) + '' + (Math.floor(x / 10) % 10);
    var sub = (y % 10) + '' + (x % 10);
    return con + ':' + sec + ':' + sub;
}

if ($('#production_table').length === 0)
{
    var redirect = confirm('O script deve ser executado em:\nVisualiza\u00E7\u00F5es gerais \u00BB Produ\u00E7\u00E3o\n\nRedireccionar agora?');
    if (redirect)
        window.location = 'game.php?screen=overview_villages&mode=prod';
}
else
{
    $('span.quickedit-vn').each(function()
    {
		var village = $(this);
		var str = village.find('span.quickedit-label').html();
        var mid = str.lastIndexOf('|');
        var x = str.substring(str.lastIndexOf('(') + 1, mid);
        var y = str.substring(mid + 1, str.lastIndexOf(')'));
		setTimeout(function()
		{
			village.find('a.rename-icon').click();
			village.find('.quickedit-edit input[type=text]').val(convertCoords(x, y));
			village.find('.quickedit-edit input[type=button]').click();
		}, setMillis());
    });
}