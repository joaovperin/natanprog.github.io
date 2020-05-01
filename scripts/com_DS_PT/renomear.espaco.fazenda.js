var millis = 0;

function setMillis()
{
	var tmp = millis;
	millis += 200;
	return tmp;
}

function zeroPad(number, length)
{
    var n = number.toString();
    while (n.length < length)
        n = '0' + n;
    return n;
}

if ($('#production_table').length === 0)
{
    var redirect = confirm('O script deve ser executado em:\nVisualiza\u00E7\u00F5es gerais \u00BB Produ\u00E7\u00E3o\n\nRedireccionar agora?');
    if (redirect)
        window.location = 'game.php?screen=overview_villages&mode=prod';
}
else
{
    var ii = -1;
    $('#production_table th').each(function(i, e)
    {
		if (e.innerHTML.match(/Fazenda/i))
        {
            ii = i;
            return false;
        }
    });
    if (ii >= 0)
    {
		$('#production_table tr').each(function()
        {
			var village = $(this);
			setTimeout(function()
			{
				if (village.index() === 0)
					return;
				village.find('a.rename-icon').click();
				var k = parseInt(village.find('td:eq(' + ii + ')').text().match(/\d+/) || '0', 10);
				village.find('.quickedit-edit input[type=text]').val(zeroPad(k, 5));
				village.find('.quickedit-edit input[type=button]').click();
			}, setMillis());
		});
    }
}