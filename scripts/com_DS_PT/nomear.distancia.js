var vilname = 0;
var vildistx = -1;
var vildisty = -1;
var millis = 0;

function setMillis()
{
	var tmp = millis;
	millis += 200;
	return tmp;
}

function distance(x, y)
{
    var n = Math.round(Math.sqrt(Math.pow(vildistx - x, 2) + Math.pow(vildisty - y, 2))).toString();
    while (n.length < 4)
        n = '0' + n;
    return n + ' ' + vilname;
}

function fnExecuteScript()
{
    if (vildistx == -1 || vildisty == -1)
    {
        var coords = prompt('Dist\u00E2ncia da Aldeia', '500|500');
        if (coords.length < 3)
            return;
        vildistx = coords.split('|')[0];
        vildisty = coords.split('|')[1];
    }
    if (isNaN(vildistx) || isNaN(vildisty))
        return;
    if (vilname === 0)
        vilname = prompt('Introduza o nome da aldeia.', 'Aldeia');
    else
        vilname = vilname.toString();
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
			village.find('.quickedit-edit input[type=text]').val(distance(x, y));
			village.find('.quickedit-edit input[type=button]').click();
		}, setMillis());
    });
}

if ($('#production_table').length === 0)
{
    var redirect = confirm('O script deve ser executado em:\nVisualiza\u00E7\u00F5es gerais \u00BB Produ\u00E7\u00E3o\n\nRedireccionar agora?');
    if (redirect)
        window.location = 'game.php?screen=overview_villages&mode=prod';
}
else
    fnExecuteScript();