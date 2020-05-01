if ($('#incomings_table').length === 0)
{
    if (window.game_data.mode == 'incomings')
        alert('N\u00E3o se encontra a receber ataques neste momento!');
    else
    {
        var redirect = confirm('O script deve ser executado em:\nVisualiza\u00E7\u00F5es gerais \u00BB A chegar\n\nRedireccionar agora?');
        if (redirect)
            window.location = 'game.php?screen=overview_villages&mode=incomings';
    }
}
else
{
    var n = prompt('Renomear ataques:\n ');
    if (!n)
        n = 'Desconhecido';
    var strDate = $('#serverDate');
    var strTime = $('#serverTime');
    $('a.rename-icon').click();
    $('.quickedit-edit input[type=text]').val(n + ' (' + strTime.text() + ') [' + strDate.text() + ']');
    $('.quickedit-edit input[type=button]').click();
}