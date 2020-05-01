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
    var name = prompt('Introduza o nome da aldeia.\n ');
    var counter = prompt('Introduza o n\u00FAmero inicial:', '1');
    if (isNaN(counter))
        alert('Deve introduzir um n\u00FAmero inteiro!');
    else
    {
        counter = parseInt(counter, 10);
        if (name !== null && !isNaN(counter))
        {
			$('#production_table tr').each(function()
			{
				var village = $(this);
				setTimeout(function()
				{
					if (village.index() === 0)
						return;
					village.find('a.rename-icon').click();
					village.find('.quickedit-edit input[type=text]').val(zeroPad(counter++, padding) + ' ' + name);
					village.find('.quickedit-edit input[type=button]').click();
				}, setMillis());
			});
        }
        else
            alert('Os dados introduzidos s\u00E3o inv\u00E1lidos, por favor adicione-os novamente e de forma correcta.');
    }
}