var millis = 0;

function setMillis()
{
	var tmp = millis;
	millis += 200;
	return tmp;
}

if ($('#production_table').length === 0)
{
    var redirect = confirm('O script deve ser executado em:\nVisualiza\u00E7\u00F5es gerais \u00BB Produ\u00E7\u00E3o\n\nRedireccionar agora?');
    if (redirect)
        window.location = 'game.php?screen=overview_villages&mode=prod';
}
else
{
    if (typeof name != 'string' || name.length === 0)
        name = prompt('Introduza o nome da aldeia.\n ');
    if (name.length >= 3)
    {
		$('#production_table tr').each(function()
        {
			var village = $(this);
			setTimeout(function()
			{
				if (village.index() === 0)
					return;
				village.find('a.rename-icon').click();
				village.find('.quickedit-edit input[type=text]').val(name);
				village.find('.quickedit-edit input[type=button]').click();
			}, setMillis());
		});
    }
    else
        alert('O nome da aldeia deve conter, pelo menos, 3 caracteres!');
}