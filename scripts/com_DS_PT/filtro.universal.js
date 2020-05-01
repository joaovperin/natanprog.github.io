$(document).ready(function()
{
    if (!game_data.mode && game_data.screen == 'overview_villages')
    {
        game_data.mode = $('#overview_menu td[class=selected] a').attr('href');
        game_data.mode = game_data.mode.split('mode=')[1];
        game_data.mode = game_data.mode.split('&')[0];
    }
    if (!(((game_data.screen == 'overview_villages') && (game_data.mode == 'prod' || game_data.mode == 'buildings' || game_data.mode == 'tech' || game_data.mode == 'groups')) || (game_data.screen == 'info_player')))
    {
        alert('O script funcionar\u00E1 somente nos seguintes locais:\n\n1\u00BA - Visualiza\u00E7\u00F5es gerais \u00BB Produ\u00E7\u00E3o;\n2\u00BA - Visualiza\u00E7\u00F5es gerais \u00BB Edif\u00EDcios;\n3\u00BA - Visualiza\u00E7\u00F5es gerais \u00BB Pesquisa;\n4\u00BA - Visualiza\u00E7\u00F5es gerais \u00BB Grupos;\n5\u00BA - Perfil de algum jogador.');
        end();
    }
    if (!(operador == '>' || operador == '>=' || operador == '<' || operador == '<=' || operador == '==' || operador == '!='))
    {
        alert('A op\u00E7\u00E3o "operador" s\u00F3 pode ser configurada com as seguintes op\u00E7\u00F5es:\n">" ou ">=" ou "<" ou "<=" ou "==" ou "!="');
        end();
    }
    if (um_ou_zero(atualizar_numero_de_aldeias) == false || um_ou_zero(atualizar_pontuacao) == false)
    {
        alert('As op\u00E7\u00F5es "atualizar_numero_de_aldeias" e "atualizar_pontuacao" s\u00F3 podem ser configuradas com o n\u00FAmero 1 ou 0.');
        end();
    }
    if (pontuacao_limpa() == false)
    {
        alert('Configure a op\u00E7\u00E3o "pontuacao" somente com n\u00FAmero (sem separador de milhar).\n\nPor exemplo, n\u00E3o digite n\u00FAmeros assim: 12.154.');
        end();
    }

    function formatar_numero(number)
    {
        return String(number).split('').reverse().join('').replace(/(.{3}\B)/g, '$1.').split('').reverse().join('');
    }

    function um_ou_zero(v)
    {
        if (v == 1 || v == 0)
            return true;
        return false;
    }

    function pontuacao_limpa()
    {
        var biblioteca = /^\d+$/;
        return biblioteca.test(pontuacao);
    }

    var j = 0;

    if (game_data.screen == 'overview_villages' && game_data.mode == 'prod')
    {
        var pontos = parseInt(($('div[class="rank"]').text()).split('|')[1].replace(/\./g, ''), 10);
        var ranking = ($('div[class="rank"]').text()).split('|')[0];
        var aldeias = parseInt(($('#production_table tr th:eq(1)').html()).split('Aldeia</a> (')[1].split(')')[0], 10);
        $('#production_table tr').each(function(i, e)
        {
            var a = $(e).find('th');
            if (i == 0)
                $(a).each(function(i, e)
                {
                    if ($(e).text() == 'Pontos')
                        j = i;
                });
            else if (eval(pontuacao + operador + "Number($('td:eq(' + j + ')', this).text().replace('.', ''))") && parseInt(Number($('td:eq(' + j + ')', this).text().replace('.', '')), 10) != 0)
            {
                e.parentNode.removeChild(e);
                aldeias--;
                pontos -= parseInt(Number($('td:eq(' + j + ')', this).text().replace('.', '')), 10);
            }
        });

        if (atualizar_numero_de_aldeias == 1)
            $('#production_table tr th:eq(1)').replaceWith('<th>Aldeia (' + aldeias + ')</th>');
        if (atualizar_pontuacao == 1)
        {
            pontos = formatar_numero(pontos);
            pontos = pontos.replace(/\./g, '<span class="grey">.</span>');
            $('div[class="rank"]').replaceWith('<div class="rank">' + ranking + '|' + pontos + ' P)</div>');
        }
    }

    if (game_data.screen == 'overview_villages' && game_data.mode == 'buildings')
    {
        var pontos = parseInt(($('div[class="rank"]').text()).split('|')[1].replace(/\./g, ''), 10);
        var ranking = ($('div[class="rank"]').text()).split('|')[0];
        var aldeias = parseInt(($('#buildings_table tr th:eq(2)').html()).split('Aldeia</a> (')[1].split(')')[0], 10);
        var link = ($('#buildings_table tr th:eq(2)').html()).split('</a> (')[0];
        $('#buildings_table tr').each(function(i, e)
        {
            var a = $(e).find('th');
            if (i == 0)
                $(a).each(function(i, e)
                {
                    if ($(e).text() == 'Pontos')
                        j = i;
                });
            else if (eval(pontuacao + operador + "Number($('td:eq(' + j + ')', this).text().replace('.', ''))") && parseInt(Number($('td:eq(' + j + ')', this).text().replace('.', '')), 10) != 0)
            {
                e.parentNode.removeChild(e);
                aldeias--;
                pontos = pontos - parseInt(Number($('td:eq(' + j + ')', this).text().replace('.', '')), 10);
            }
        });

        if (atualizar_numero_de_aldeias == 1)
            $('#buildings_table tr th:eq(2)').replaceWith('<th style="text-align: left;">' + link + '</a> (' + aldeias + ')</th>');
        if (atualizar_pontuacao == 1)
        {
            pontos = formatar_numero(pontos);
            pontos = pontos.replace(/\./g, '<span class="grey">.</span>');
            $('div[class="rank"]').replaceWith('<div class="rank">' + ranking + '|' + pontos + ' P)</div>');
        }
    }

    if (game_data.screen == 'overview_villages' && game_data.mode == 'tech')
    {
        var pontos = parseInt(($('div[class="rank"]').text()).split('|')[1].replace(/\./g, ''), 10);
        var ranking = ($('div[class="rank"]').text()).split('|')[0];
        var aldeias = parseInt(($('#techs_table tr th:eq(0)').html()).split('Aldeia</a> (')[1].split(')')[0], 10);
        var link = ($('#techs_table tr th:eq(0)').html()).split('</a> (')[0];
        $('#techs_table tr').each(function(i, e)
        {
            var a = $(e).find('th');
            if (i == 0)
                $(a).each(function(i, e)
                {
                    if ($(e).text() == 'Pontos')
                        j = i;
                });
            else if (eval(pontuacao + operador + "Number($('td:eq(' + j + ')', this).text().replace('.', ''))") && parseInt(Number($('td:eq(' + j + ')', this).text().replace('.', '')), 10) != 0)
            {
                e.parentNode.removeChild(e);
                aldeias--;
                pontos = pontos - parseInt(Number($('td:eq(' + j + ')', this).text().replace('.', '')), 10);
            }
        });

        if (atualizar_numero_de_aldeias == 1)
            $('#techs_table tr th:eq(0)').replaceWith('<th>' + link + '</a> (' + aldeias + ')' + '</th>');
        if (atualizar_pontuacao == 1)
        {
            pontos = formatar_numero(pontos);
            pontos = pontos.replace(/\./g, '<span class="grey">.</span>');
            $('div[class="rank"]').replaceWith('<div class="rank">' + ranking + '|' + pontos + ' P)</div>');
        }
    }

    if (game_data.screen == 'overview_villages' && game_data.mode == 'groups')
    {
        var pontos = parseInt(($('div[class="rank"]').text()).split('|')[1].replace(/\./g, ''), 10);
        var ranking = ($('div[class="rank"]').text()).split('|')[0];
        var aldeias = parseInt(($('#group_assign_table tr th:eq(0)').html()).split('Aldeia</a> (')[1].split(')')[0], 10);
        var link = ($('#group_assign_table tr th:eq(0)').html()).split('</a> (')[0];
        $('#group_assign_table tr').each(function(i, e)
        {
            var a = $(e).find('th');
            if (i == 0)
                $(a).each(function(i, e)
                {
                    if ($(e).text() == 'Pontos')
                        j = i;
                });
            else if (eval(pontuacao + operador + "Number($('td:eq(' + j + ')', this).text().replace('.', ''))") && parseInt(Number($('td:eq(' + j + ')', this).text().replace('.', '')), 10) != 0)
            {
                e.parentNode.removeChild(e);
                aldeias--;
                pontos = pontos - parseInt(Number($('td:eq(' + j + ')', this).text().replace('.', '')), 10);
            }
        });

        if (atualizar_numero_de_aldeias == 1)
            $('#group_assign_table tr th:eq(0)').replaceWith('<th width="280">' + link + '</a> (' + aldeias + ')</th>');
        if (atualizar_pontuacao == 1)
        {
            pontos = formatar_numero(pontos);
            pontos = pontos.replace(/\./g, '<span class="grey">.</span>');
            $('div[class="rank"]').replaceWith('<div class="rank">' + ranking + '|' + pontos + ' P)</div>');
        }
    }

    if (game_data.screen == 'info_player')
    {
        var pontos = parseInt($('#content_value tr:eq(2) td:eq(1)').text().replace(/\./g, ''), 10);
        var aldeias = parseInt(($('#content_value th[width="180"]').html()).split('Aldeias (')[1].split(")")[0], 10);
        $('#content_value tr').each(function(i, e)
        {
            var a = $(e).find('th');
            if (i == 0)
                $(a).each(function(i, e)
                {
                    if ($(e).text() == 'Pontos') j = i;
                });
            else if ((eval(pontuacao + operador + "Number($('td:eq(2)', this).text().replace('.', ''))")) && parseInt(Number($('td:eq(2)', this).text().replace('.', '')), 10) != 0) {
                e.parentNode.removeChild(e);
                aldeias--;
                pontos = pontos - parseInt(Number($('td:eq(2)', this).text().replace('.', '')), 10);
            }
        });

        if (atualizar_numero_de_aldeias == 1)
            $('#content_value th[width="180"]').replaceWith('<th width="180">Aldeias (' + aldeias + ')</th>');
        if (atualizar_pontuacao == 1)
        {
            pontos = formatar_numero(pontos);
            pontos = pontos.replace(/\./g, '<span class="grey">.</span>');
            $('#content_value tr:eq(2) td:eq(1)').replaceWith('<td>' + pontos + '</td>');
        }
    }
});