function overview()
{
    var table = document.getElementById('commands_table');
    if (window.location.href.indexOf('type=attack') === -1)
    {
        var redirect = confirm('O script deve ser executado em:\nVisualiza\u00E7\u00F5es gerais \u00BB Comandos \u00BB Ataques\n\nRedireccionar agora?');
        if (redirect)
            window.location = 'game.php?mode=commands&screen=overview_villages&type=attack';
        return;
    }
    var units = [];
    var counter = 0;
    $('#commands_table').first().find('img').each(function()
    {
        var unit = $(this).attr('title');
        if (unit !== undefined)
            units[unit] = 3 + counter++;
    });
    var i = 1;
    $('a.rename-icon').click();
    $('.quickedit-edit input[type=text]').each(function()
    {
        var value = 'none';
        if ($(this).val().match(/Ataque a|Apoio a/i))
        {
            var spear = table.rows[i].cells[units['Lanceiro']].innerHTML;
            var sword = table.rows[i].cells[units['Espadachim']].innerHTML;
            var axe = table.rows[i].cells[units['Viking']].innerHTML;
            var archer = table.rows[i].cells[units['Arqueiro']].innerHTML;
            var scout = table.rows[i].cells[units['Batedor']].innerHTML;
            var lc = table.rows[i].cells[units['Cavalaria leve']].innerHTML;
            var marcher = table.rows[i].cells[units['Arqueiro a cavalo']].innerHTML;
            var hc = table.rows[i].cells[units['Cavalaria Pesada']].innerHTML;
            var ram = table.rows[i].cells[units['Ar\u00EDete']].innerHTML;
            var cat = table.rows[i].cells[units['Catapulta']].innerHTML;
            var noble = table.rows[i].cells[units['Nobre']].innerHTML;
            if (scout >= 1)
                value = 'Batedores';
            if (spear >= 100)
                value = 'Lan\u00E7as';
            if (sword >= 100)
                value = 'Espadas';
            if (archer >= 100)
                value = 'Arcos';
            if (hc >= 100)
                value = 'Pesados';
            if (cat == 1)
                value = 'Cat-Fake';
            if (cat >= 100)
                value = 'Cat';
            if (ram == 1)
                value = 'Ar\u00EDete-Fake';
            if ((ram == 1 && scout >= 1) || (cat == 1 && scout >= 1))
                value = 'Fake+Bat';
            if (marcher >= 500)
                value = 'Arcos-Cavalo';
            if (axe >= 4000)
                value = 'Semi-Vikings';
            if (axe >= 8000)
                value = 'Full-Vikings';
            if (lc >= 3500)
                value = 'Cleves-Nuke';
            if (axe >= 3000 && lc >= 1250)
                value = 'Semi-Vikings+Cleves';
            if (axe >= 6000 && lc >= 2500)
                value = 'Full-Vikings+Cleves';
            if (axe >= 3000 && lc >= 1250 && ram >= 125)
                value = 'Semi-Nuke';
            if (axe >= 6000 && lc >= 2500 && ram >= 200)
                value = 'Full-Nuke';
            if (noble >= 1)
                value = 'Nobre';
        }
        if (value != 'none')
            $(this).val(value);
        i++;
    });
    $('.quickedit-edit input[type=button]').click();
}
overview();