/**
 * Efetua contagem de tropas por aldeia e totaliza.
 * @return {[type]} [description]
 */
 function contadorTropas(){

    var tof = true;

    tof = game_data.screen == 'overview_villages';
    tof = tof && game_data.mode == 'units';
    tof = tof && window.location.href.indexOf('complete') != -1;

    if(!tof){
        window.location.href = game_data.link_base_pure+'overview_villages&mode=units&type=complete';
        return false;
    }

    function contarPopulacao(info){
            var popAtk = 0;
            var popDef = 0;
            var pop = 0;
            var ret = {'tropa': '','capacidade': ''};
            popDef += info.spear    ;
            popDef += info.sword    ;
            popAtk += info.axe      ;
            popDef += info.archer   ;
            pop    += info.spy      ;
            popAtk += info.light    ;
            popAtk += info.marcher  ;
            popDef += info.heavy    ;
            popAtk += info.ram      ;
            popAtk += info.catapult ;
            pop    += info.knight   ;
            pop    += info.snob     ;
            pop    += info.militia  ;
            pop    += popDef + popAtk;
            if(pop >= 5000){
                ret.capacidade = 'G';
            } else if(pop >= 2500){
                ret.capacidade = 'M';
            } else {
                ret.capacidade = 'P';
            }
            ret.tropa = popAtk > popDef ? 'A' : 'D';
            return ret;
        }

        function contarBlind(info){
            var pop = info.spear+info.sword+info.archer+info.heavy;
            ret = {'capacidade': '', 'tropas': pop};
            if(pop>=60000){
                ret.capacidade = 'G';
            } else if (pop >= 45000){
                ret.capacidade = 'M';
            } else if (pop >= 15000) {
                ret.capacidade = 'P';
            } else {
                ret.capacidade = 'V';
            }
            return ret;
        }

        var $table = $('#units_table');
        var unitsTmp = {'spear': 0,'sword': 0,'axe': 0,'archer': 0,'spy': 0,'light': 0,'marcher': 0,'heavy': 0,'ram': 0,'catapult': 0,'knight': 0,'snob': 0,'militia': 0};
        var unitsTmpBlind = {'spear': 0,'sword': 0,'axe': 0,'archer': 0,'spy': 0,'light': 0,'marcher': 0,'heavy': 0,'ram': 0,'catapult': 0,'knight': 0,'snob': 0,'militia': 0};
        var dados = {
            'todas': {'spear': 0,'sword': 0,'axe': 0,'archer': 0,'spy': 0,'light': 0,'marcher': 0,'heavy': 0,'ram': 0,'catapult': 0,'knight': 0,'snob': 0,'militia': 0},
            'proprias': {'spear': 0,'sword': 0,'axe': 0,'archer': 0,'spy': 0,'light': 0,'marcher': 0,'heavy': 0,'ram': 0,'catapult': 0,'knight': 0,'snob': 0,'militia': 0},
            'apoio': {'spear': 0,'sword': 0,'axe': 0,'archer': 0,'spy': 0,'light': 0,'marcher': 0,'heavy': 0,'ram': 0,'catapult': 0,'knight': 0,'snob': 0,'militia': 0},
            'full': {'atk': {'G': [],'M': [], 'P':[]},'def': {'G': [],'M': [], 'P':[]}},
            'blind': {'G': [],'M': [], 'P':[], 'V': []}
        };
        var trCount = 1;
        var trLenght = $table.find('tr').length - 1;
        var coord = '';
        var tmp = '';
        $table.find('tr').each(function(i, obj) {
            if (i > 0) {
                var $this = $(this);
                if(trCount == 1){
                    coord = $this.find('td').eq(0).find('.quickedit-label').data('text');
                    coord = $.trim($this.find('td').eq(0).find('.quickedit-label').html().replace(coord+' ',''));
                    coord = coord.substr(1,7);

                }
                var spear                    = parseInt($this.find('td.unit-item').eq(0).html());
                var sword                    = parseInt($this.find('td.unit-item').eq(1).html());
                var axe                      = parseInt($this.find('td.unit-item').eq(2).html());
                var archer                   = parseInt($this.find('td.unit-item').eq(3).html());
                var spy                      = parseInt($this.find('td.unit-item').eq(4).html());
                var light                    = parseInt($this.find('td.unit-item').eq(5).html());
                var marcher                  = parseInt($this.find('td.unit-item').eq(6).html());
                var heavy                    = parseInt($this.find('td.unit-item').eq(7).html());
                var ram                      = parseInt($this.find('td.unit-item').eq(8).html());
                var catapult                 = parseInt($this.find('td.unit-item').eq(9).html());
                var knight                   = parseInt($this.find('td.unit-item').eq(10).html());
                var snob                     = parseInt($this.find('td.unit-item').eq(11).html());
                var militia                  = parseInt($this.find('td.unit-item').eq(12).html());
                console.log(coord,trCount,unitsTmp);
                if (trCount == 2) {
                    unitsTmpBlind.spear      = spear    - unitsTmp.spear;
                    unitsTmpBlind.sword      = sword    - unitsTmp.sword;
                    unitsTmpBlind.axe        = axe      - unitsTmp.axe;
                    unitsTmpBlind.archer     = archer   - unitsTmp.archer;
                    unitsTmpBlind.spy        = spy      - unitsTmp.spy;
                    unitsTmpBlind.light      = light    - unitsTmp.light;
                    unitsTmpBlind.marcher    = marcher  - unitsTmp.marcher;
                    unitsTmpBlind.heavy      = heavy    - unitsTmp.heavy;
                    unitsTmpBlind.ram        = ram      - unitsTmp.ram;
                    unitsTmpBlind.catapult   = catapult - unitsTmp.catapult;
                    unitsTmpBlind.knight     = knight   - unitsTmp.knight;
                    unitsTmpBlind.snob       = snob     - unitsTmp.snob;
                    unitsTmpBlind.militia    = militia  - unitsTmp.militia;
                    dados.apoio.spear       += unitsTmpBlind.spear;
                    dados.apoio.sword       += unitsTmpBlind.sword;
                    dados.apoio.axe         += unitsTmpBlind.axe;
                    dados.apoio.archer      += unitsTmpBlind.archer;
                    dados.apoio.spy         += unitsTmpBlind.spy;
                    dados.apoio.light       += unitsTmpBlind.light;
                    dados.apoio.marcher     += unitsTmpBlind.marcher;
                    dados.apoio.heavy       += unitsTmpBlind.heavy;
                    dados.apoio.ram         += unitsTmpBlind.ram;
                    dados.apoio.catapult    += unitsTmpBlind.catapult;
                    dados.apoio.knight      += unitsTmpBlind.knight;
                    dados.apoio.snob        += unitsTmpBlind.snob;
                    dados.apoio.militia     += unitsTmpBlind.militia;
                } else if (trCount != 2) {
                    unitsTmp.spear          += spear;
                    unitsTmp.sword          += sword;
                    unitsTmp.axe            += axe;
                    unitsTmp.archer         += archer;
                    unitsTmp.spy            += spy;
                    unitsTmp.light          += light;
                    unitsTmp.marcher        += marcher;
                    unitsTmp.heavy          += heavy;
                    unitsTmp.ram            += ram;
                    unitsTmp.catapult       += catapult;
                    unitsTmp.knight         += knight;
                    unitsTmp.snob           += snob;
                    unitsTmp.militia        += militia;
                    dados.proprias.spear    += spear;
                    dados.proprias.sword    += sword;
                    dados.proprias.axe      += axe;
                    dados.proprias.archer   += archer;
                    dados.proprias.spy      += spy;
                    dados.proprias.light    += light;
                    dados.proprias.marcher  += marcher;
                    dados.proprias.heavy    += heavy;
                    dados.proprias.ram      += ram;
                    dados.proprias.catapult += catapult;
                    dados.proprias.knight   += knight;
                    dados.proprias.snob     += snob;
                    dados.proprias.militia  += militia;
                }
                if (trCount == 4) {
                    $this.parent().find('td:first').attr('rowspan', function(x, y) {
                        return y + 1;
                    });
                    var html = '<tr>';
                    html += '<td style="font-weight:bold;">Total aldeia:</td>';
                    html += '<td>' + unitsTmp.spear + '</td>';
                    html += '<td>' + unitsTmp.sword + '</td>';
                    html += '<td>' + unitsTmp.axe + '</td>';
                    html += '<td>' + unitsTmp.archer + '</td>';
                    html += '<td>' + unitsTmp.spy + '</td>';
                    html += '<td>' + unitsTmp.light + '</td>';
                    html += '<td>' + unitsTmp.marcher + '</td>';
                    html += '<td>' + unitsTmp.heavy + '</td>';
                    html += '<td>' + unitsTmp.ram + '</td>';
                    html += '<td>' + unitsTmp.catapult + '</td>';
                    html += '<td>' + unitsTmp.knight + '</td>';
                    html += '<td>' + unitsTmp.snob + '</td>';
                    html += '<td>' + unitsTmp.militia + '</td><td>&nbsp;</td>';
                    html += '</tr>';
                    if (trLenght !== i) {
                        $(obj).after(html);
                    }
                    tmp = contarPopulacao(unitsTmp);
                    dados.full[(tmp.tropa == 'A' ? 'atk' : 'def')][tmp.capacidade].push(coord);
                    tmp = contarBlind(unitsTmpBlind);
                    //if(tmp.capacidade != 'V'){
                        dados.blind[tmp.capacidade].push(coord);
                    //}
                    coord = '';
                    unitsTmp = {'spear': 0,'sword': 0,'axe': 0,'archer': 0,'spy': 0,'light': 0,'marcher': 0,'heavy': 0,'ram': 0,'catapult': 0,'knight': 0,'snob': 0,'militia': 0};
                    unitsTmpBlind = {'spear': 0,'sword': 0,'axe': 0,'archer': 0,'spy': 0,'light': 0,'marcher': 0,'heavy': 0,'ram': 0,'catapult': 0,'knight': 0,'snob': 0,'militia': 0};
                    trCount = 1;
                } else {
                    trCount++;
                }
            } else if (trCount == 2) {
                trCount++;
            }
            if (trLenght == i) {
                $(obj).after(html);
            }
        });

var $newDiv = $table.parent();

var html = '';

        html += '<div id="vlkGraficosTropas"></div>'; //-- Ancora
        //-- Graf Visão geral das tropas
        html += '<div style="margin-left:2.5%;width:45%; height: 300px;max-height: 300px;float: left;"><h3 style="text-align:center">Visão geral das tropas</h3><canvas id="grafBar" height="270"></canvas></div>';
        //-- Graf Tropas por tipo:
        html += '<div style="margin-left:2.5%;width:45%; height: 300px;max-height: 300px;float: left;"><h3 style="text-align:center">Tropas por tipo</h3><canvas id="grafPie1" height="130"></canvas></div>';
        //-- Separador
        html += '<div style="clear:both;margin-top: 325px;">&nbsp;</div>';
        //-- Graf fulls atk
        html += '<div style="margin-left:2.5%;width:45%; height: 300px;max-height: 300px;float: left;"><h3 style="text-align:center">Aldeias de ataque</h3><canvas id="grafPie2" height="130"></canvas></div>';
        //-- Graf fulls def
        html += '<div style="margin-left:2.5%;width:45%; height: 300px;max-height: 300px;float: left;"><h3 style="text-align:center">Aldeias de defesa</h3><canvas id="grafPie3" height="130"></canvas></div>';
        html += '<table style="width: 100%;float:left;margin-top: 70px;">';
        html += '<thead><tr>';
        html += '    <th><b>Totais</b></th>';
        for (var x in dados.proprias){
            html += '    <th><img src="'+Format.image_src('unit/unit_'+x+'.png')+'"></th>';
        }
        html += '</tr></thead>';
        html += '<tbody>';
        html += '<tr class="row_marker row_b"><td><b>Próprias:</b></td>'
        for (var x in dados.proprias){
            dados.todas[x] += dados.proprias[x];
            html += '<td>'+Format.number(dados.proprias[x])+'</td>';
        }
        html += '</tr>';
        html += '<tr><td><b>Apoios:</b></td>'
        for (var x in dados.apoio){
            dados.todas[x] += dados.apoio[x];
            html += '<td>'+Format.number(dados.apoio[x])+'</td>';
        }
        html += '</tr>';
        html += '<tr class="row_marker row_b"><td><b>Total:</b></td>'
        for (var x in dados.todas){
            html += '<td>'+Format.number(dados.todas[x])+'</td>';
        }
        html += '</tr>';
        html += '</tbody>';
        html += '</table>';
        html += '<textarea style="width: 100%;" rows="15">';
        html += '[b]Total de aldeias: [/b]'+ ((dados.full.atk.G.length+dados.full.atk.M.length+dados.full.atk.P.length)+(dados.full.def.G.length+dados.full.def.M.length+dados.full.def.P.length))+'\n';
        html += '[b]Aldeias de ataque: [/b]'+ (dados.full.atk.G.length+dados.full.atk.M.length+dados.full.atk.P.length)+'\n';
        html += '[b]Aldeias de defesa: [/b]'+ (dados.full.def.G.length+dados.full.def.M.length+dados.full.def.P.length)+'\n';
        html += '[b]Aldeias blindadas: [/b]'+ (dados.blind.G.length+dados.blind.M.length+dados.blind.P.length)+'\n';
        html += '\n[b]Ataque:[/b]';
        for (var x in dados.full.atk){
            for (var y = 0;y<dados.full.atk[x].length;y++){
                html += '\n[coord]'+dados.full.atk[x][y]+'[/coord] - '+(x=='G' ? '[color=#00a500]Grande (5000+)[/color]' : (x=='M' ? '[color=#0e0eae]Médio (2500+)[/color]' : '[color=#a50000]Fraco (<1000)[/color]') );
            }
        }
        html += '\n\n[b]Defesa:[/b]';
        for (var x in dados.full.def){
            for (var y = 0;y<dados.full.def[x].length;y++){
                html += '\n[coord]'+dados.full.def[x][y]+'[/coord] - '+(x=='G' ? '[color=#00a500]Grande (5000+)[/color]' : (x=='M' ? '[color=#0e0eae]Médio (2500+)[/color]' : '[color=#a50000]Fraco (<1000)[/color]') );
            }
        }
        html += '\n\n[b]Blindagem:[/b]';
        for (var x in dados.blind){
            for (var y = 0;y<dados.blind[x].length;y++){
                html += '\n[coord]'+dados.blind[x][y]+'[/coord] - '+(x=='G' ? '[color=#00a500]Grande (60000+)[/color]' : (x=='M' ? '[color=#0e0eae]Médio (45000+)[/color]' : (x=='V' ? '[color=#ff0000]Vazio (0)[/color]' : '[color=#a50000]Fraco (15000+)[/color]')) );
            }
        }
        html += '</textarea>';

        $newDiv.append(html);

        $.getScript('https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.bundle.min.js', function(data, textStatus, jqxhr) {
            var ctxBar = document.getElementById('grafBar').getContext('2d');
            var ctxPie1 = document.getElementById('grafPie1').getContext('2d');
            var ctxPie2 = document.getElementById('grafPie2').getContext('2d');
            var ctxPie3 = document.getElementById('grafPie3').getContext('2d');
            new Chart(ctxBar, {
                type: 'bar',
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                },
                data: {
                    labels: [ UnitPopup.unit_data.spear.name, UnitPopup.unit_data.sword.name, UnitPopup.unit_data.axe.name, UnitPopup.unit_data.archer.name, UnitPopup.unit_data.spy.name, UnitPopup.unit_data.light.name, UnitPopup.unit_data.marcher.name, UnitPopup.unit_data.heavy.name, UnitPopup.unit_data.ram.name, UnitPopup.unit_data.catapult.name, UnitPopup.unit_data.knight.name, UnitPopup.unit_data.snob.name, UnitPopup.unit_data.militia.name],
                    datasets: [{
                        label: 'Próprias',
                        data: [dados.proprias.spear, dados.proprias.sword, dados.proprias.axe, dados.proprias.archer, dados.proprias.spy, dados.proprias.light, dados.proprias.marcher, dados.proprias.heavy, dados.proprias.ram, dados.proprias.catapult, dados.proprias.knight, dados.proprias.snob, dados.proprias.militia],
                        backgroundColor: "rgba(255,53,51,0.4)"
                    }, {
                        label: 'Apoios',
                        data: [dados.apoio.spear, dados.apoio.sword, dados.apoio.axe, dados.apoio.archer, dados.apoio.spy, dados.apoio.light, dados.apoio.marcher, dados.apoio.heavy, dados.apoio.ram, dados.apoio.catapult, dados.apoio.knight, dados.apoio.snob, dados.apoio.militia],
                        backgroundColor: "rgba(51,53,255,0.4)"
                    }]
                }
            });
            new Chart(ctxPie1, {
                type: 'doughnut',
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                },
                data: {
                    labels: ['Ataque', 'Defesa', 'Apoio'],
                    datasets: [{
                        data: [dados.proprias.axe + dados.proprias.light + dados.proprias.marcher + dados.proprias.ram + dados.proprias.knight + dados.proprias.snob, dados.proprias.spear + dados.proprias.sword + dados.proprias.archer + dados.proprias.heavy + dados.proprias.catapult + dados.proprias.militia, dados.apoio.axe + dados.apoio.light + dados.apoio.marcher + dados.apoio.ram + dados.apoio.knight + dados.apoio.snob + dados.apoio.spear + dados.apoio.sword + dados.apoio.archer + dados.apoio.heavy + dados.apoio.catapult + dados.apoio.militia],
                        backgroundColor: ["rgba(255,53,51,0.4)", "rgba(51,53,255,0.4)", "rgba(53,255,51,0.4)"]
                    }]
                }
            });

            new Chart(ctxPie2, {
                type: 'pie',
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                },
                data: {
                    labels: ['Forte', 'Médio', 'Fraco'],
                    datasets: [{
                        data: [dados.full.atk.G.length,dados.full.atk.M.length,dados.full.atk.P.length],
                        backgroundColor: [ "rgba(53,255,51,0.4)", "rgba(51,53,255,0.4)","rgba(255,53,51,0.4)"]
                    }]
                }
            });

            new Chart(ctxPie3, {
                type: 'pie',
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                },
                data: {
                    labels: ['Forte', 'Médio', 'Fraco'],
                    datasets: [{
                        data: [dados.full.def.G.length,dados.full.def.M.length,dados.full.def.P.length],
                        backgroundColor: [ "rgba(53,255,51,0.4)", "rgba(51,53,255,0.4)","rgba(255,53,51,0.4)"]
                    }]
                }
            });
            window.location.href = '#vlkGraficosTropas';
        });
}
contadorTropas();