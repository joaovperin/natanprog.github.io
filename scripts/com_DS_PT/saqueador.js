function calculate()
{
    var total =
    {
        wood: 0,
        stone: 0,
        iron: 0,
        haul: 0,
        limit: 0
    };
    $('#commands_table tr:not(:first)').each(function()
    {
        var url = $('a:first', this).attr('href');
        $.ajax(
        {
            url: url,
            success: function(html)
            {
                var info = $('#content_value table:eq(2) td:last', html).text().split('  ');
                if (info.length < 3)
                {
                    info[3] = info[0].toString().trim();
                    info[0] = '0';
                    info[1] = '0';
                    info[2] = '0';
                }
                else
                {
                    info[0] = info[0].toString().trim();
                    info[1] = info[1].toString().trim();
                    info[3] = info[2].split('|')[1].toString().trim();
                    info[2] = info[2].split('|')[0].toString().trim();
                }
                var resources = info[3].split('/');
                var haulInfo =
                {
                    wood: info[0],
                    stone: info[1],
                    iron: info[2],
                    haul: resources[0],
                    limit: resources[1]
                };
                total.wood += Number(haulInfo.wood.replace('.', ''));
                total.stone += Number(haulInfo.stone.replace('.', ''));
                total.iron += Number(haulInfo.iron.replace('.', ''));
                total.haul += Number(haulInfo.haul);
                total.limit += Number(haulInfo.limit);

            }
        });
    });
    $(document).ajaxStop(function()
    {
        alert('Recursos saqueados\n\n' + 'Madeira: ' + total.wood + ' / Barro: ' + total.stone + ' / Ferro: ' + total.iron + '\n\n\nTotal de recursos saqueados\n\nTotal: ' + total.haul + ' / Limite: ' + total.limit);
    });
}

if (window.location.href.indexOf('type=return') === -1)
{
    var redirect = confirm('O script deve ser executado em:\nVisualiza\u00E7\u00F5es gerais \u00BB Comandos \u00BB Retorno\n\nRedireccionar agora?');
    if (redirect)
        window.location = 'game.php?mode=commands&screen=overview_villages&type=return';
}
else
    calculate();