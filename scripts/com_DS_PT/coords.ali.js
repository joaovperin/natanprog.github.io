var millis = 0;

function setMillis()
{
	var tmp = millis;
	millis += 200;
	return tmp;
}

function zeroPad(number, length)
{
    while (number.length < length)
        number = '0' + number;
    return number;
}

function randCoords(x, y)
{
    return x + rand(x) + '|' + y + rand(y);
}

function rand(coord)
{
    if (coord.length === 3)
        return '';
    else if (coord.length === 2)
        return rand999(9, 1);
    else if (coord.length === 1)
        return rand999(99, 2);
    return rand999(999, 3);
}

function rand999(max, length)
{
    var num = Math.round(Math.random() * max).toString();
    return zeroPad(num, length);
}

if ($('#production_table').length === 0)
{
    var redirect = confirm('O script deve ser executado em:\nVisualiza\u00E7\u00F5es gerais \u00BB Produ\u00E7\u00E3o\n\nRedireccionar agora?');
    if (redirect)
        window.location = 'game.php?screen=overview_villages&mode=prod';
}
else
{
	$('#production_table tr').each(function()
	{
		if (xk < 0 || xk > 999)
            xk = '';
        else
            xk = xk.toString();
        if (yk < 0 || yk > 999)
            yk = '';
        else
            yk = yk.toString();
		var village = $(this);
		setTimeout(function()
		{
			if (village.index() === 0)
				return;
			village.find('a.rename-icon').click();
			village.find('.quickedit-edit input[type=text]').val(randCoords(xk, yk));
			village.find('.quickedit-edit input[type=button]').click();
		}, setMillis());
	});
}