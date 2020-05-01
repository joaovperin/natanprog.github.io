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
    var sec = (Math.floor(x / 10) % 10) + '' + (Math.floor(y / 10) % 10);
    var sub = (x % 10) + '' + (y % 10);
    var n = y.substr(1, 3);
    if (n < 34)
        n = 'A';
    else
        n = '';
    var c = y.substr(1, 3);
    if (c < 66 && c > 33)
        c = 'C';
    else
        c = '';
    var s = y.substr(1, 3);
    if (s > 65)
        s = 'S';
    else
        s = '';
    var e = x.substr(1, 3);
    if (e > 65)
        e = '3';
    else
        e = '';
    var d = x.substr(1, 3);
    if (d < 66 && d > 33)
        d = '2';
    else
        d = '';
    var w = x.substr(1, 3);
    if (w < 34)
        w = '1';
    else
        w = '';
    return con + ':' + n + '' + c + '' + s + '' + e + '' + d + '' + w + ':' + sec + ':' + sub;
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
		setTimeout(function()
		{
			var str = village.find('span.quickedit-label').html();
			var mid = str.lastIndexOf('|');
			var x = str.substring(str.lastIndexOf('(') + 1, mid);
			var y = str.substring(mid + 1, str.lastIndexOf(')'));
			village.find('a.rename-icon').click();
			village.find('.quickedit-edit input[type=text]').val(convertCoords(x, y));
			village.find('.quickedit-edit input[type=button]').click();
		}, setMillis());
    });
}