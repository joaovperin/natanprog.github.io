var isEncoded = true;
var attackSummary = [];

function fnQueryIncomingAttacks()
{
    try
    {
        var summary = [];
        var eleTable = document.getElementById('incomings_table');
        var requestSupportVisible = (document.getElementsByName('reqdef').length > 0);
        var xx = (requestSupportVisible) ? (eleTable.rows.length - 1) : (eleTable.rows.length);
        for (var row = 1; row < xx; row++)
        {
            var eleRow = eleTable.rows[row];
            var isAttack = (eleRow.cells[0].innerHTML.indexOf('attack') >= 0);
            if (isAttack)
            {
                var cellData = typeof(eleRow.cells[1].innerText) == 'undefined' ? eleRow.cells[1].textContent : eleRow.cells[1].innerText;
                var coords = cellData.match(/(\d+)\|(\d+)/)[0];
                if (typeof(summary[coords]) == 'undefined')
                    summary[coords] =
                    {
                        tally: 0,
                        html: eleRow.cells[1].innerHTML,
                        coord: coords
                    };
                summary[coords].tally++;
            }
        }
        var count = 0;
        for (var coords in summary)
            if (summary.hasOwnProperty(coords))
                attackSummary[count++] = summary[coords];
        attackSummary.sort(function(a, b)
        {
            return b.tally - a.tally;
        });
        var docSource = '<html><head><title>Contador de ataques a chegar</title><meta http-equiv=\"content - type\" content=\"text / html; charset = UTF - 8\" /><link rel="stylesheet" type="text/css" href="/merged/game.css"/></head><body background-image=../graphic/index/bg-tile.jpg)><center><div style="padding: 6px"><h3>Contagem dos ataques a chegar</h3><input class="btn" type=button value="Fechar janela" onClick=window.close()><hr></div></center></body></html>';
        var popup = window.open('about:blank', 'tribalwars', 'width=360,height=400,scrollbars=yes');
        popup.document.open('text/html', 'replace');
        popup.document.write(docSource);
        popup.document.close();
        popup.focus();
        
        var criteriaDIV = popup.document.createElement('div');
        criteriaDIV.setAttribute('id', 'div_attack_summary');
        criteriaDIV.setAttribute('style', 'margin: 0 6px');
        popup.document.body.appendChild(criteriaDIV);
        
        var resultTable = popup.document.createElement('table');
        resultTable.setAttribute('id', 'table_attack_summary');
        resultTable.setAttribute('class', 'vis');
        criteriaDIV.appendChild(resultTable);
        
        var curRow = resultTable.insertRow(0);
        curRow.setAttribute('style', 'white-space:nowrap');
        var curTH = popup.document.createElement('th');
        curTH.appendChild(popup.document.createTextNode('Aldeia'));
        curRow.appendChild(curTH);
        curTH = popup.document.createElement('th');
        curTH.appendChild(popup.document.createTextNode('Qtd. de ataques'));
        curRow.appendChild(curTH);
        
        for (var ii = 0; ii < attackSummary.length; ii++)
        {
            curRow = resultTable.insertRow(-1);
            curRow.setAttribute('class', (ii % 2) ? 'row_b' : 'row_a');
            curRow.setAttribute('style', 'white-space:nowrap');
            var curTD = document.createElement('td');
            curTD.innerHTML = attackSummary[ii].html;
            curRow.appendChild(curTD);
            
            curTD.getElementsByTagName('a')[0].setAttribute('target', 'tw.main');
            curTD = document.createElement('td');
            curTD.setAttribute('align', 'right');
            curTD.innerHTML = attackSummary[ii].tally;
            curRow.appendChild(curTD);
        }
        var textarea = popup.document.createElement('textarea');
        textarea.setAttribute('name', 'BBcodes');
        textarea.setAttribute('cols', '40');
        textarea.setAttribute('rows', '10');
        criteriaDIV.appendChild(textarea);
        for (var i in attackSummary)
            $(textarea).html($(textarea).html() + (isEncoded ? '[coord]' + attackSummary[i].coord + '[/coord]\n' : attackSummary[i].coord + ' '));
    }
    catch (objError)
    {
        alert('ERRO: ' + objError.message || objError);
    }
}

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
    try
    {
        if (typeof(attackCounterDone) != 'undefined')
            throw ('O script j\u00E1 est\u00E1 a ser executado.\n\nPor favor, actualize a p\u00E1gina e tente novamente.');
        var attackCounterDone = true;
        fnQueryIncomingAttacks();
    }
    catch (objError)
    {
        alert(objError.message || objError);
    }
}