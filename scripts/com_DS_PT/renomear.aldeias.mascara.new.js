var randomRange = {'min': 100, 'max': 999};
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

function Point(x, y)
{
    return {'x': x, 'y': y};
}

function Rect(left, top, right, bottom)
{
    return {'left': left, 'top': top, 'right': right, 'bottom': bottom};
}

function pointInRect(point, rect)
{
    return (point.x >= rect.left && point.x <= rect.right && point.y >= rect.top && point.y <= rect.bottom);
}

function fnExtractDetails(x, y)
{
    var location =
    {
        'continent': (Math.floor(y / 100) * 10) + Math.floor(x / 100),
        'direction': '',
        'sector': ((Math.floor(y / 10) % 10) * 10) + (Math.floor(x / 10) % 10),
        'field': ((y % 10) * 10) + (x % 10)
    };
    var position = Point(Math.floor(x / 100), Math.floor(y / 100));
    var continentMap =
    {
        'Noroeste': Rect(0, 0, 4, 4),
        'Nordeste': Rect(5, 0, 9, 4),
        'Sudoeste': Rect(0, 5, 4, 9),
        'Sudeste': Rect(5, 5, 9, 9)
    };
    for (var direction in continentMap)
        if (continentMap.hasOwnProperty(direction))
            if (pointInRect(position, continentMap[direction]))
            {
                location.direction = direction;
                break;
            }
    return location;
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
        name = prompt('Introduza o nome da aldeia.', '{n} {p} {x}|{y} K{k}');
    if (name.length >= 3)
    {
        var counter = 1;
        $('#production_table tr').each(function()
        {
			var village = $(this);
			setTimeout(function()
			{
				if (village.index() === 0)
					return;
				var str = village.find('span.quickedit-label').html();
				var mid = str.lastIndexOf('|');
				var x = str.substring(str.lastIndexOf('(') + 1, mid);
				var y = str.substring(mid + 1, str.lastIndexOf(')'));
				var details = fnExtractDetails(x, y);
				var previousName = village.find('span.quickedit-label').attr('data-text');
				var newName = name;
				while (newName.match(/\{r\}/i))
					newName = newName.replace(/\{r\}/i, Math.floor(Math.random() * (randomRange.max - randomRange.min)) + randomRange.min);
				while (newName.match(/\{k\}/i))
					newName = newName.replace(/\{k\}/i, zeroPad(details.continent, 2));
				while (newName.match(/\{d\}/i))
					newName = newName.replace(/\{d\}/i, details.direction);
				while (newName.match(/\{s\}/i))
					newName = newName.replace(/\{s\}/i, zeroPad(details.sector, 2));
				while (newName.match(/\{f\}/i))
					newName = newName.replace(/\{f\}/i, zeroPad(details.field, 2));
				while (newName.match(/\{n\}/i))
					newName = newName.replace(/\{n\}/i, zeroPad(counter, padding));
				while (newName.match(/\{x\}/i))
					newName = newName.replace(/\{x\}/i, zeroPad(x, 3));
				while (newName.match(/\{y\}/i))
					newName = newName.replace(/\{y\}/i, zeroPad(y, 3));
				while (newName.match(/\{p\}/i))
					newName = newName.replace(/\{p\}/i, previousName);
				village.find('a.rename-icon').click();
				village.find('.quickedit-edit input[type=text]').val(newName);
				village.find('.quickedit-edit input[type=button]').click();
				counter++;
			}, setMillis());
        });
    }
    else
        alert('O nome da aldeia deve conter, pelo menos, 3 caracteres!');
}