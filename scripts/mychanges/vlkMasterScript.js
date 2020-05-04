/**
 * Script que agrupa diversos mods de minha autoria e de autoria de terceiros.
 *
 * Change log:
 * Versão 2.3
 *
 *
 * Versão 2.2
 *     Contador de tropas       - Adicionado gráficos por força da aldeia (ataque e defesa)
 *     Contador de tropas       - Adicionado Totalização em formato de tabela
 *     Contador de tropas       - Adicionado código BB com contagem de aldeias de ataque/defesa/blindadas e a respectiva força das tropas em cada aldeia
 *
 * Versão 2.1
 *     Pedido Apoio em Massa    - Corrigido campo de catapulta e feito melhorias técnicas para desempenho.
 *     créditos                 - Corrigido disposição de itens na janela.
 *     Adicionado Script        - Calculo de BackTime e Snipe
 *     Adicionado Script        - Ocultar aldeias atacadas
 *     Adicionado Script        - Extrair aldeias do perfil do jogador
 *     Adicionado Script        - Ordenação de aldeias por distância
 *     Adicionado Script        - Extrair coordenadas do mapa
 *     Renomear Aldeias         - Corrigido link do dropbox
 *
 * Versão 2.0
 *     Melhoria de interface e menu.
 *     Calculadora de Farm      - Correção para respeitar limite de solicitações ajax.
 *     Contador de Tropas       - Agora é posicionado nos gráficos ao termino da execução.
 *     Ataques Planejados       - Adicionado atalho direto no menu principal.
 *     Ataques Planejados       - A configuração agora pré-carrega os dados já informados.
 *     Ataques Planejados       - Mostra o progresso dos ataques e informa quando terminou o ciclo.
 *     Ataques Planejados       - Ao clicar no botão do modelo na tela de confirmação será confirmado o envio do ataque/apoio.
 *     Coletar Membros Coletiva - Agora funciona também na página de membros da própria tribo.
 *     Coletar Membros Coletiva - Melhorias visuais.
 *     Adicionado: Balanceamento de recursos e créditos.
 *
 * Versão 1.2
 *     Melhorias de interface em scripts próprios e de terceiros.
 *     Permite exportar/importar as configurações.
 *
 * Versão 1.1
 *     Adição de scripts de terceiros.
 *
 * Versão 1.0
 *     Release inicial, estrutura, menus e scripts próprios.
 *
 * Créditos:
 * VLKTW - Para os demais colaboradores ver a variável: vlk.param.creditos;
 */
 function vlkMaster() {

    /**
     * Instancia da classe
     * @type {[type]}
     */
     var vlk = this;

    /**
     * Parâmetros da classe
     * @type {Object}
     */
     vlk.param = {
        'versao': '2.2',
        'autor': 'VLKTW',
        'versao_data': '18/03/2017',
        'creditos': {
            'VLKTW': ['Contador de Recursos', 'Contador de tropas', 'Redimensionar Mapa', 'Página Inicial','Ataques planejados', 'Assinatura', 'Calculo de farm','Coletar Jogadores Tribo (Coletiva)','Pedido apoio em Massa','Coletar aldeias perfil'],
            'Nick Toby (cheesasaurus@gmail.com)' : ['Renomeador de aldeias','Renomeador de atauqes/apoios'],
            'Erebus de Nix' : ['Renomeador de aldeias'],
            'Gil Penner (Paçoquita)' : ['Pedido de apoio entre aldeias','Planejador de ataques','Calculo de farm','Coletar Jogadores Tribo (Coletiva)','Calculo BT & Snipe'],
            'Fluffy88' : ['Planejador de ataques'],
            'extremetw.com': ['Balancear recursos'],
            'Paulo Pcappelli': ['Esconder aldeias farmadas'],
            'DESCONHECIDO' : ['Relatórios duplicados','Ordenar Aldeia Distancia']
        }
    };

    /**
     * Armazenamento interno da classe.
     * @type {Object}
     */
     vlk.innerCache = {'menu_id': [],'menu_carregado':false};

    /**
     * Dados de usuário geridos pela classe.
     * @type {Array}
     */
     vlk.userCache = ['AtaquesPlanejadosA', 'AtaquesPlanejadosB', 'AtaquesPlanejadosC', 'Assinatura', 'ExtrairCoordenadas'];

    /**
     * Menu e configuração de chamadas padrão.
     * @type {Object}
     */
     vlk.menu = {
        '0': {
            'titulo': 'Contador de Recursos',
            'link': 'screen=overview_villages&mode=prod',
            'funcao': 'overviewContadorRecursos',
            'ativo': true
        },
        '1': {
            'titulo': 'Contador de Tropas',
            'link': 'screen=overview_villages&mode=units&type=complete',
            'funcao': 'overviewContadorTropas',
            'ativo': true
        },
        '2': {
            'titulo': 'Redimensionar mapa',
            'link': 'screen=map',
            'funcao': 'mapRedimensionar',
            'ativo': true
        },
        '3': {
            'titulo': 'Página inicial',
            'link': 'screen=welcome',
            'funcao': 'link',
            'ativo': true
        },
        '4': {
            'titulo': 'Ataques Planejados',
            'link': 'screen=place',
            'funcao': 'placeAtaquesPlanejados',
            'ativo': true
        },
        '5': {
            'titulo': 'Ataques Planejados (Configurar)',
            'link': '',
            'funcao': 'placeAtaquesPlanejadosConfig',
            'ativo': true
        },
        '6': {
            'titulo': 'Renomear aldeias',
            'link': 'screen=overview_villages',
            'funcao': 'overviewRenomearAldeias',
            'ativo': true
        },
        '7': {
            'titulo': 'Assinatura (Inserir)',
            'link': '',
            'funcao': 'overviewAssinatura',
            'ativo': true
        },
        '8': {
            'titulo': 'Assinatura (Cadastrar)',
            'link': '',
            'funcao': 'overviewAssinaturaCadastrar',
            'ativo': true
        },
        '9': {
            'titulo': 'Relatórios Repetidos',
            'link': 'screen=report',
            'funcao': 'reportSelecionarRepetidos',
            'ativo': true
        },
        '10': {
            'titulo': 'Pedido de apoio em massa',
            'link': 'screen=place&mode=call',
            'funcao': 'placeApoioEmMassa',
            'ativo': true
        },
        '11': {
            'titulo': 'Renomear Ataques/Apoios chegando em massa',
            'link': 'screen=overview_villages&mode=incomings',
            'funcao': 'overviewRenomearAtaquesApoios',
            'ativo': true
        },
        '12': {
            'titulo': 'Calculadora de farm',
            'link': 'screen=overview_villages&mode=commands&type=return',
            'funcao': 'overviewCalculadoraFarm',
            'ativo': true
        },
        '13': {
            'titulo': 'Planejador de Ataques',
            'link': 'screen=overview_villages',
            'funcao': 'overviewPlanejadorAtaque',
            'ativo': true
        },
        '14': {
            'titulo': 'Coletar membros para coletiva',
            'link': '',
            'funcao': 'allyMembrosColetiva',
            'ativo': true
        },
        '15': {
            'titulo': 'Balancear Recursos',
            'link': '',
            'funcao': 'marketBalancearRecursos',
            'ativo': true
        },
        '16': {
            'titulo': 'Calculo BT&Snipe',
            'link': '',
            'funcao': 'overviewCalculoBTSnipe',
            'ativo': true
        },
        '17': {
            'titulo': 'Aldeias no Perfil',
            'link': '',
            'funcao': 'playerAldeiasPerfil',
            'ativo': true
        },
        '18': {
            'titulo': 'Ordenar Aldeia por distância',
            'link': 'screen=overview_villages&mode=combined',
            'funcao': 'overviewOrdenarAldeiaDistancia',
            'ativo': true
        },
        '19': {
            'titulo': 'Esconder aldeias atacadas',
            'link': 'screen=map',
            'funcao': 'mapEsconderFarm',
            'ativo': true
        },
        '20': {
            'titulo': 'Extrair coordenadas',
            'link': 'screen=map',
            'funcao': 'mapExtrairCoordenadas',
            'ativo': true
        },
        '21': {
            'titulo': 'Identificar Fake',
            'link': 'screen=overview_villages&mode=incomings&subtype=attacks',
            'funcao': 'overviewIdentificarFake',
            'ativo': true
        },
        '22': {
            'titulo': 'Remover Comandos',
            'link': '',
            'funcao': 'overviewRemoverComandos',
            'ativo': true
        },
        'X1': {
            'titulo': 'Exportar configurações',
            'link': '',
            'funcao': 'vlkSalvarPreferencias',
            'ativo': true
        },
        'X2': {
            'titulo': 'Importar configurações',
            'link': '',
            'funcao': 'vlkImportarPreferencias',
            'ativo': true
        },
        'X3': {
            'titulo': 'Créditos',
            'link': '',
            'funcao': 'vlkCreditos',
            'ativo': true
        }
    };

    /**
     * Construtor da classe
     * @author VLKTW
     * @return {[type]} [description]
     */
     vlk.init = function()
     {
        if (!game_data.player.premium) {
            UI.InfoMessage('Para utilizar esse script é necessário uma Conta Premium!', 3000, true);
            end();
        }
        if(!vlk.innerCache.menu_carregado){
            for (var x in vlk.menu){
                vlk.innerCache.menu_id.push(x);
            }
            vlk.innerCache.menu_carregado = true;
        }
        var menu = '';
        menu += '<div style="width:100%; min-width: 550px;">';
        menu += '    <h5 style="border-bottom: 2px dashed #803000;color: #803000;">Atalho / Contadores / Calculadoras</h5>';
        menu += '    <button class="btn btn" onclick="vkMas.vlkValidarChamadaFuncao(\'3\');">Página Inicial</button>';
        menu += '    <button class="btn btn" onclick="vkMas.vlkValidarChamadaFuncao(\'0\');">Recursos</button>';
        menu += '    <button class="btn btn" onclick="vkMas.vlkValidarChamadaFuncao(\'1\');">Tropas</button>';
        menu += '    <button class="btn btn" onclick="vkMas.vlkValidarChamadaFuncao(\'12\');">Farm</button>';
        menu += '    <button class="btn btn" onclick="vkMas.vlkValidarChamadaFuncao(\'16\');">BT & Snipe</button>';
        menu += '    <button class="btn btn" onclick="vkMas.vlkValidarChamadaFuncao(\'21\');">ID. Fake</button>';
        menu += '    <button class="btn btn" onclick="vkMas.vlkValidarChamadaFuncao(\'22\');">Filtrar Com.</button>';
        menu += '    <h5 style="border-bottom: 2px dashed #803000;color: #803000;">Ataques Planejados / Balancear Recursos</h5>';
        menu += '    <button class="btn btn" onclick="vkMas.placeAtaquesPlanejados(\'A\');">&nbsp;A&nbsp;</button>';
        menu += '    <button class="btn btn" onclick="vkMas.placeAtaquesPlanejados(\'B\');">&nbsp;B&nbsp;</button>';
        menu += '    <button class="btn btn" onclick="vkMas.placeAtaquesPlanejados(\'C\');">&nbsp;C&nbsp;</button>';
        menu += '    <button class="btn btn" onclick="vkMas.placeAtaquesPlanejadosConfig();">Configurar</button>';
        menu += '    <button class="btn btn" onclick="vkMas.marketBalancearRecursos();">Balancear Recursos</button>';
        menu += '    <button class="btn btn" onclick="vkMas.vlkValidarChamadaFuncao(\'10\');">Pedido de Apoio Massa</button>';
        menu += '    <h5 style="border-bottom: 2px dashed #803000;color: #803000;">Organização</h5>';
        menu += '    <button class="btn btn" onclick="vkMas.vlkValidarChamadaFuncao(\'6\');">Renomear Aldeias</button>';
        menu += '    <button class="btn btn" onclick="vkMas.vlkValidarChamadaFuncao(\'9\');">Relatórios repetidos</button>';
        menu += '    <button class="btn btn" onclick="vkMas.vlkValidarChamadaFuncao(\'11\');">Renomear Ataques/Apoios chegando em massa</button>';
        menu += '    <button class="btn btn" onclick="vkMas.vlkValidarChamadaFuncao(\'13\');">Planejador de Ataque</button>';
        menu += '    <h5 style="border-bottom: 2px dashed #803000;color: #803000;">Diversos</h5>';
        menu += '    <button class="btn btn" onclick="vkMas.vlkValidarChamadaFuncao(\'14\');">Coletar Membros Coletiva</button>';
        menu += '    <button class="btn btn" onclick="vkMas.vlkValidarChamadaFuncao(\'17\');">Coletar Aldeias Jogador</button>';
        menu += '    <button class="btn btn" onclick="vkMas.vlkValidarChamadaFuncao(\'18\');">Ordernar aldeia por distância</button>';
        menu += '    <h5 style="border-bottom: 2px dashed #803000;color: #803000;">Mapa</h5>';
        menu += '    <button class="btn btn" onclick="vkMas.vlkValidarChamadaFuncao(\'2\');">Redimensionar Mapa</button>';
        menu += '    <button class="btn btn" onclick="vkMas.vlkValidarChamadaFuncao(\'19\');">Esconder Aldeias Atacadas</button>';
        menu += '    <button class="btn btn" onclick="vkMas.vlkValidarChamadaFuncao(\'20\');">Extrair coordenadas</button>';
        menu += '    <h5 style="border-bottom: 2px dashed #803000;color: #803000;">Configurar</h5>';
        menu += '    <button class="btn btn" onclick="vkMas.vlkValidarChamadaFuncao(\'X1\');">Exportar</button>';
        menu += '    <button class="btn btn" onclick="vkMas.vlkValidarChamadaFuncao(\'X2\');">Importar</button>';
        menu += '    <button class="btn btn" onclick="vkMas.vlkValidarChamadaFuncao(\'7\');">Inserir Assinatura</button>';
        menu += '    <button class="btn btn" onclick="vkMas.vlkValidarChamadaFuncao(\'8\');">Configurar Assinatura</button>';
        menu += '    <button class="btn btn" onclick="vkMas.vlkValidarChamadaFuncao(\'X3\');">Créditos</button>';
        menu += '    <p>Agrupador desenvolvido por <a href="">VLKTW - Lord Valkhan</a> - Versão: '+vlk.param.versao+'</p>';
        menu += '</div>';
        Dialog.show('vlkDialogMenu', menu);
    };

    /**
     * Gera JSON de export das preferencias
     * @author VLKTW
     * @return {[type]} [description]
     */
     vlk.vlkSalvarPreferencias = function()
     {
        var len = vlk.userCache.length;
        var uCache = {};
        for(var x =0;x<len;++x){
            uCache[vlk.userCache[x]] = localStorage.getItem(vlk.userCache[x]);
        }
        var msg = '<h3>Copie o texto abaixo:</h3>';
        msg += '<textarea type="text" id="vlk_preferencias" style="width: 100%;" rows="8">';
        msg += JSON.stringify(uCache);
        msg += '</textarea>';
        UI.ConfirmationBox(msg, []);
    };

    /**
     * Gera JSON de export das preferencias
     * @author VLKTW
     * @return {[type]} [description]
     */
     vlk.vlkCreditos = function()
     {
        var msg = '<div style="width: 100%;min-width: 450px;max-height: 350px;overflow:auto;"><h3>Créditos</h3>';
        for (var autor in vlk.param.creditos){
            msg += "<p><b>"+autor+"</b></p><p>"+vlk.param.creditos[autor].join(', ')+'</p>';
        }
        msg += '</div>';
        Dialog.show('vlkCreditos',msg);
    };

    /**
     * Importa JSON de preferencias
     * @param  {[type]} uCache [description]
     * @return {[type]}        [description]
     */
     vlk.vlkImportarPreferencias = function(uCache)
     {
        uCache = uCache || false;
        if(uCache === false){
            var msg = '<h3>Informe suas preferências abaixo:</h3>';
            msg += '<textarea type="text" id="vlk_preferencias" style="width: 100%;" rows="8"></textarea>';
            UI.ConfirmationBox(msg, [{
                text: "OK",
                callback: function() {
                    vlk.vlkImportarPreferencias($('#vlk_preferencias').val());
                },
                confirm: true
            }]);
        } else {
            try{
                uCache = JSON.parse(uCache);
                for (var x in uCache){
                    if($.inArray(x,vlk.innerCache.menu_id) != -1){
                        localStorage.setItem(x,uCache[x]);
                    }
                }
                UI.SuccessMessage('Preferências importadas com sucesso!',3000);
            } catch(ex){
                UI.ErrorMessage('Falha ao importar preferências!',3000);
            }
        }
    };

    /**
     * Valida chamada de função
     * @author VLKTW
     * @param  {[type]} escolha [description]
     * @return {[type]}         [description]
     */
     vlk.vlkValidarChamadaFuncao = function(escolha)
     {
        if ($.inArray(escolha, vlk.innerCache.menu_id) == -1) {
            UI.InfoMessage('Opção inválida!', 3000, true);
            return false;
        }
        if (window.location.href.indexOf(vlk.menu[escolha].link) != -1) {
            try {
                Dialog.close('vlkDialogMenu');
                if (vlk.menu[escolha].funcao == 'link') {
                    var url = window.location.origin + game_data.link_base_pure + vlk.menu[escolha].link.substr(7);
                    window.location.href = url;
                } else {
                    eval('vlk.' + vlk.menu[escolha].funcao + '();');
                }
            } catch (ex) {}
        } else {
            UI.InfoMessage('Redirecionando para página correta.', 3000, false);
            setTimeout(function() {
                var url = window.location.origin + game_data.link_base_pure + vlk.menu[escolha].link.substr(7);
                window.location.href = url;
            }, 1000);
        }
    };

    /**
     * Script contado de recursos
     * @author VLKTW
     * @return {[type]} [description]
     */
     vlk.overviewContadorRecursos = function()
     {
        var $table = $('#production_table');
        var rec = {
            'wood': 0,
            'stone': 0,
            'iron': 0
        };
        $table.find('span.res.wood').each(function() {
            rec.wood += parseInt($(this).html().replace(/\<span class="grey"\>\.\<\/span\>/g, ''));
        });
        $table.find('span.res.stone').each(function() {
            rec.stone += parseInt($(this).html().replace(/\<span class="grey"\>\.\<\/span\>/g, ''));
        });
        $table.find('span.res.iron').each(function() {
            rec.iron += parseInt($(this).html().replace(/\<span class="grey"\>\.\<\/span\>/g, ''));
        });
        var msg = "<b>Totais</b>: <br>";
        msg += ' <span class="icon header wood">&nbsp;</span><span style="padding-right: 15px;">' + Format.number(rec.wood) + '</span>';
        msg += ' <span class="icon header stone">&nbsp;</span><span style="padding-right: 15px;">' + Format.number(rec.stone) + '</span>';
        msg += ' <span class="icon header iron">&nbsp;</span><span style="padding-right: 15px;">' + Format.number(rec.iron) + '</span>';
        msg += '<hr>';
        msg += '<b>Média:</b> <br>';
        msg += ' <span class="icon header wood">&nbsp;</span><span style="padding-right: 15px;">' + Format.number(Math.round(rec.wood / parseInt(game_data.player.villages))) + '</span>';
        msg += ' <span class="icon header stone">&nbsp;</span><span style="padding-right: 15px;">' + Format.number(Math.round(rec.stone / parseInt(game_data.player.villages))) + '</span>';
        msg += ' <span class="icon header iron">&nbsp;</span><span style="padding-right: 15px;">' + Format.number(Math.round(rec.iron / parseInt(game_data.player.villages))) + '</span>';
        UI.InfoMessage(msg, 10000, false);
    };

    /**
     * Script que redimensiona a área visivel do mapa.
     * @author VLKTW
     * @return {[type]} [description]
     */
     vlk.mapRedimensionar = function()
     {
        var msg = '<h3>Preencha os campos:</h3>';
        msg += '<label style="font-weight: bold;">Altura:</label> <input type="number" id="vlk_altura" value="50"><br>';
        msg += '<label style="font-weight: bold;">Largura:</label> <input type="number" id="vlk_largura" value="50">';
        UI.ConfirmationBox(msg, [{
            text: "OK",
            callback: function() {
                TWMap.resize(parseInt($('#vlk_altura').val()), parseInt($('#vlk_largura').val()));
            },
            confirm: true
        }]);
    };

    /**
     * Script que conta as tropas gerando graficos
     * @author VLKTW
     * @return {[type]} [description]
     */
     vlk.overviewContadorTropas = function()
     {

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
};

    /**
     * Gerencia até 3 modelos de ataques para fakes, farm ou apoios
     * @author VLKTW
     * @param  {[type]} modelo [description]
     * @return {[type]}        [description]
     */
     vlk.placeAtaquesPlanejados = function(modelo)
     {
        modelo = modelo || false;
        var url = document.URL;
        if(url.search(/screen=place/) != -1 && url.search(/try=confirm/) != -1){
            $('#troop_confirm_go').trigger('click');
        } else if (url.search(/screen=place/) != -1) {
            var dados = localStorage.getItem('AtaquesPlanejados'+modelo);
            if (dados !== null) {
                modelo = JSON.parse(dados);
                var doc = document;
                var data = new Date();
                if (document.forms[0].x.value === "" && document.forms[0].y.value === "") {
                    if (window.frames.length > 0) {
                        doc = window.document;
                    }
                    url = document.URL;
                    var coord = modelo.coord.split(" ");
                    if (modelo.ataques >= coord.length) {
                        modelo.ataques = -1;
                    } else if (modelo.ataques >= 0) {
                        coord = coord[modelo.ataques];
                        coord = coord.split("|");
                        doc.forms[0].x.value = coord[0];
                        doc.forms[0].y.value = coord[1];
                        for (var unidade in modelo) {
                            if ($.inArray(unidade, ['modelo', 'tipo', 'coord', 'cookie']) == -1) {
                                $('#unit_input_' + unidade).val(modelo[unidade]);
                            }
                        }
                        modelo.ataques++;
                        localStorage.setItem('AtaquesPlanejados' + modelo.modelo, JSON.stringify(modelo));
                        $('#target_' + (modelo.tipo == 'A' ? 'attack' : 'support')).trigger('click');
                    }
                    UI.SuccessMessage('Ataque '+modelo.ataques+ ' de '+modelo.coord.split(' ').length,3000);
                    if (modelo.ataques === -1) {
                        UI.SuccessMessage('Todos ataques/apoios foram enviados!', 3000);
                    }
                }
            } else {
                UI.ErrorMessage('Modelo '+modelo+' não configurado!', 3000);
                end();
            }
        } else {
            UI.InfoMessage('Redirecionando para página correta.', 3000, false);
            setTimeout(function() {
                var url = window.location.origin + game_data.link_base_pure + vlk.menu['4'].link.substr(7);
                window.location.href = url;
            }, 1000);
        }
    };

    /**
     * Configura os ataques planejados
     * @author VLKTW
     * @param  {[type]} dados [description]
     * @return {[type]}       [description]
     */
     vlk.placeAtaquesPlanejadosConfig = function(dados)
     {
        dados = dados || false;
        if (dados === false) {
            var msg = '<h3>Informe os dados abaixo:</h3><div style="text-align: left">';
            msg += '<label style="font-weight:bold;">Modelo:</label><select id="vlk_modelo"><option value="A">Modelo A</option><option value="B">Modelo B</option><option value="C">Modelo C</option></select><br>';
            msg += '<label style="font-weight:bold;">Tipo:</label><select id="vlk_tipo"><option value="A">Ataque</option><option value="D">Apoio</option></select><br>';
            msg += '<label style="font-weight:bold;">Coordenadas (separadas por espaço):</label><br><input type="text" id="vlk_coord" value="" style="width: 100%;"><br>';
            msg += '<label style="font-weight:bold;">Tropas:</label><br>';
            msg += '<div style="width: 40%;padding-left: 2%;float: left;"><label><img style="width: 18px;height: 18px;" src="' + Format.image_src('unit/unit_spear.png') + '"/></label> <input type="number" id="vlk_spear" value="0"></div>';
            msg += '<div style="width: 40%;padding-left: 2%;float: left;"><label><img style="width: 18px;height: 18px;" src="' + Format.image_src('unit/unit_sword.png') + '"/></label> <input type="number" id="vlk_sword" value="0"></div>';
            msg += '<div style="width: 40%;padding-left: 2%;float: left;"><label><img style="width: 18px;height: 18px;" src="' + Format.image_src('unit/unit_axe.png') + '"/></label> <input type="number" id="vlk_axe" value="0"></div>';
            msg += '<div style="width: 40%;padding-left: 2%;float: left;"><label><img style="width: 18px;height: 18px;" src="' + Format.image_src('unit/unit_spy.png') + '"/></label> <input type="number" id="vlk_spy" value="5"></div>';
            msg += '<div style="width: 40%;padding-left: 2%;float: left;"><label><img style="width: 18px;height: 18px;" src="' + Format.image_src('unit/unit_light.png') + '"/></label> <input type="number" id="vlk_light" value="0"></div>';
            msg += '<div style="width: 40%;padding-left: 2%;float: left;"><label><img style="width: 18px;height: 18px;" src="' + Format.image_src('unit/unit_marcher.png') + '"/></label> <input type="number" id="vlk_marcher" value="0"></div>';
            msg += '<div style="width: 40%;padding-left: 2%;float: left;"><label><img style="width: 18px;height: 18px;" src="' + Format.image_src('unit/unit_heavy.png') + '"/></label> <input type="number" id="vlk_heavy" value="0"></div>';
            msg += '<div style="width: 40%;padding-left: 2%;float: left;"><label><img style="width: 18px;height: 18px;" src="' + Format.image_src('unit/unit_ram.png') + '"/></label> <input type="number" id="vlk_ram" value="0"></div>';
            msg += '<div style="width: 40%;padding-left: 2%;float: left;"><label><img style="width: 18px;height: 18px;" src="' + Format.image_src('unit/unit_catapult.png') + '"/></label> <input type="number" id="vlk_catapult" value="0"></div>';
            msg += '</div><div style="clear:both;">&nbsp;</div>';

            UI.ConfirmationBox(msg, [{
                text: "Salvar",
                callback: function() {
                    var coord = $.unique($('#vlk_coord').val().split(' '));
                    var modelo = $('#vlk_modelo').val();
                    var tof = vlk.placeAtaquesPlanejadosConfig({
                        'modelo': modelo,
                        'tipo': $('#vlk_tipo').val(),
                        'coord': coord.join(' '),
                        'spear': parseInt($('#vlk_spear').val()),
                        'sword': parseInt($('#vlk_sword').val()),
                        'axe': parseInt($('#vlk_axe').val()),
                        'spy': parseInt($('#vlk_spy').val()),
                        'light': parseInt($('#vlk_light').val()),
                        'marcher': parseInt($('#vlk_marcher').val()),
                        'heavy': parseInt($('#vlk_heavy').val()),
                        'ram': parseInt($('#vlk_ram').val()),
                        'catapult': parseInt($('#vlk_catapult').val()),
                        'ataques': 0
                    });
                    if (tof) {
                        UI.SuccessMessage("Configuração gravada com sucesso!", 3000);
                    } else {
                        UI.ErrorMessage("Falha ao gravar a informação!", 3000);
                    }
                },
                confirm: true
            }]);
            setTimeout(function(){
                $('#vlk_modelo').on('change',function(){
                    var modelo = this.value;
                    var dados = localStorage.getItem('AtaquesPlanejados'+modelo);
                    if(dados !== null){
                        dados = JSON.parse(dados);
                        for (var x in dados){
                            $('#vlk_'+x).val(dados[x]);
                        }
                    } else {
                        $('#vlk_coord').val('');
                        $('#vlk_spear').val('0');
                        $('#vlk_sword').val('0');
                        $('#vlk_axe').val('0');
                        $('#vlk_spy').val('5');
                        $('#vlk_light').val('0');
                        $('#vlk_marcher').val('0');
                        $('#vlk_heavy').val('0');
                        $('#vlk_ram').val('0');
                        $('#vlk_catapult').val('0');
                        $('#vlk_ataques').val('0');
                    }
                }).trigger('change');
            },300);
        } else {
            var nomeCookie = 'AtaquesPlanejados' + dados.modelo;
            localStorage.setItem(nomeCookie, JSON.stringify(dados));
            return localStorage.getItem(nomeCookie) !== null;
        }
    };

    /**
     * Renomeia aldeias
     * @author Nick Toby (cheesasaurus@gmail.com)
     * @author Erebus de Nix
     * @version 8.2
     * @return {[type]} [description]
     */
     vlk.overviewRenomearAldeias = function()
     {
         var vlkAldeias = [];
         var i = 0;
         var j = 0;
         var k = 0;
         var condicaoContem = "";
         var condicaoNaoContem = "";
         var subst1 = "";
         var subst2 = "";
         if (namePool === 'undefinid') {
             var namePool = ['Cheese', 'Cheesy', 'Pickle', 'Noodle', 'Mc', 'Mega', 'Ultra', 'Super', 'Cuddle', 'Hug', 'Merge', 'Princess', 'Queen', 'O', 'Snappy', 'Dandy', 'Zippy', 'Fiddle', 'Harp', 'Chimes', 'Mooo', 'Quack', 'Oink', 'Penguin', 'Giraffe', 'Hippo', 'Sandals', 'Boots', 'Heels', 'Ninja', 'Pirate', 'Town', 'City', 'Burg', 'polis', 'ville', 'Land', 'Realm', 'Wand', 'Cape', 'Hat', 'Tickle', 'Smack', 'Kick', 'Armor', 'Sword', 'Shield', 'Happy', 'Sad', 'Grumpy', 'Forest', 'Lake', 'Mountain', 'Swamp', 'Fortress', 'Castle', 'Keep', 'Palace', 'Hall', 'Shiny', 'Dull', 'Hidden', 'King', 'Knight', 'Enchanted', 'Court', 'Bridge', 'Kingdom', 'Manor', 'Tower', 'Royal', 'Peasant', 'Unicorn', 'Dragon', 'Nightmare', 'Dark', 'Light', 'Red', 'Blue', 'Yellow', 'Green', 'Orange', 'Purple', 'Pink', 'Wood', 'Stone', 'Stick', 'Straw', 'Brick', 'Steel', 'Iron', 'Gold', 'Forge', 'Hut', 'Betrayal', 'Honor', 'Fellowship', 'Gardening', 'Cabbage', 'Potato', 'Pine', 'Oak', 'Bamboo', 'Flower', 'Daisy', 'Rose', 'Pansy', 'Fearless', 'Brave', 'Enduring', 'Fast', 'Slow', 'Steady', 'Strong'];
         }
         if (!twcheese) {
             var twcheese = {};
         }
         twcheese.createNamerGUI = function() {
             var contentContainer = document.createElement('div');
             contentContainer.id = 'twcheese_name_village_container';
             contentContainer.style.display = 'block';
             contentContainer.style.position = 'fixed';
             contentContainer.style.zIndex = 5;
             contentContainer.style.top = '60px';
             contentContainer.style.left = '10px';
             contentContainer.style.borderStyle = 'ridge';
             contentContainer.style.borderColor = 'brown';
             contentContainer.style.backgroundColor = '#f7eed3';
             contentContainer.style.width = '650px';
             var titleBar = document.createElement('table');
             titleBar.style.backgroundColor = '#dfcca6';
             titleBar.insertRow(-1);
             titleBar.rows[0].insertCell(-1);
             titleBar.rows[0].insertCell(-1);
             titleBar.rows[0].cells[0].innerHTML = '<b>Renomear vilas</b> (max 32 caracteres)';
             titleBar.rows[0].cells[0].width = '100%';
             titleBar.rows[0].cells[1].innerHTML = '<img src="graphic/delete.png" alt="X"/>';
             titleBar.rows[0].cells[1].style.cursor = "pointer";
             titleBar.rows[0].cells[1].style.color = 'red';
             titleBar.rows[0].cells[1].onclick = function() {
                 $('#twcheese_name_village_container').remove();
             };
             contentContainer.appendChild(titleBar);
             var narcismElement = document.createElement('span');
             narcismElement.innerHTML = 'created by <a href="http://forum.tribalwars.net/member.php?u=28484" target="_blank">cheesasaurus</a></br>upgrade e tradu&ccedil&atildeo <a href="http://forum.tribalwars.com.br/member.php?19258-Erebus-de-Nyx"target="_blank">Erebus de Nyx</a>';
             narcismElement.style.fontSize = '14px';
             narcismElement.style.fontStyle = 'normal';
             narcismElement.style.fontWeight = 'normal';
             narcismElement.style.marginRight = '25px';
             narcismElement.style.cssFloat = 'right';
             titleBar.rows[0].cells[0].appendChild(narcismElement);
             var content = document.createElement('div');
             content.id = 'twcheese_name_config';
             content.style.padding = '5px';
             var useDefaultConfig = false;
             if (localStorage.getItem('twcheese.nameVillagesConfig')) {
                 var options = JSON.parse(localStorage.getItem('twcheese.nameVillagesConfig'));
                 content.config = options;
             } else useDefaultConfig = true;
             if (useDefaultConfig) {
                 content.config = [];
                 var options = [{
                     name: 'number_villages',
                     description: 'numerar vilas',
                     defaultLabel: '0',
                     startNum: '0',
                     digits: '4',
                     example: '',
                     enabled: false
                 }, {
                     name: 'romana',
                     description: 'numera&ccedil&atildeo romana',
                     defaultLabel: '',
                     numinicial: '1',
                     example: 'VII',
                     enabled: false
                 }, {
                     name: 'insert_text0',
                     description: 'texto',
                     defaultLabel: ' coloque seu texto ',
                     example: '',
                     enabled: true
                 }, {
                     name: 'random_text',
                     description: 'nome aleat&oacuterio',
                     defaultLabel: ' ',
                     example: 'qualquer coisa',
                     enabled: false
                 }, {
                     name: 'random_coordinates',
                     description: 'coordenada aleat&oacuteria <img id="help1" src="http://cdn.tribalwars.net/graphic/questionmark.png" style="width: 13px; height: 13px" title="Caso queira restringir as coordenadas para determinado continente<br/> coloque Kxy  ex K56">',
                     defaultLabel: ' ',
                     continente: "k54",
                     example: '(xxx|yyy)',
                     enabled: false
                 }, {
                     name: 'coordenadas',
                     description: 'coordenada da aldeia',
                     defaultLabel: ' ',
                     example: '(XXX|YYY)',
                     enabled: false
                 }, {
                     name: 'insert_text1',
                     description: 'texto',
                     defaultLabel: ' coloque seu texto',
                     example: '',
                     enabled: false
                 }, {
                     name: 'distance',
                     description: 'dist&acircncia at&eacute a vila',
                     defaultLabel: '500|500',
                     example: '13.37',
                     enabled: false
                 }, {
                     name: 'sector',
                     description: 'continente:setor:campo <img id="help2" src="http://cdn.tribalwars.net/graphic/questionmark.png" style="width: 13px; height: 13px" title="O mapa Ã£© dividido da esquerda para a direita e de cima para baixo.<br/>mundo - 100 continentes (10x10)<br/>Continente - 400 setores (20x20)<br/>setor - 25 campos (5x5)">',
                     defaultLabel: ' ',
                     example: '55:12:2',
                     enabled: false
                 }, {
                     name: 'setor',
                     description: 'continent:&Aacuterea:local <img id="help3" src="http://cdn.tribalwars.net/graphic/questionmark.png" style="width: 13px; height: 13px" title="exemplo: aldeia abc|123 .<br/> nome = 1a:2b:3c">',
                     defaultLabel: ' ',
                     example: '1a:2b:3c',
                     enabled: false
                 }, {
                     name: 'direction',
                     description: 'dire&ccedil&atildeo do continente',
                     defaultLabel: ' ',
                     example: 'NE',
                     enabled: false
                 }, {
                     name: 'continent',
                     description: 'numerar continente',
                     defaultLabel: ' K',
                     example: '55',
                     enabled: false
                 }, {
                     name: 'insert_text2',
                     description: 'texto',
                     defaultLabel: ' coloque seu texto',
                     example: '',
                     enabled: false
                 }];
                 for (i = 0; i < options.length; i++) {
                     options[i].label = options[i].defaultLabel;
                 }
             }
             content.generateExample = function() {
                 var example = '';
                 var rows = document.getElementById('twcheese_config_table').rows;
                 for (i = 0; i < rows.length; i++) {
                     if (rows[i].cells[0].firstChild.checked) {
                         if (rows[i].optionData.name == 'number_villages') {
                             var number = Number(Number(rows[i].optionData.startNum) + 69);
                             var digits = rows[i].optionData.digits;
                             for (; String(number).length < digits; digits--)
                                 example += '0';
                             example += number;
                         } else if (rows[i].optionData.name == 'distance') {
                             example += rows[i].optionData.example;
                         } else {
                             example += rows[i].optionData.label;
                             example += rows[i].optionData.example;
                         }
                     }
                 }
                 return example;
             };
             content.preview = function() {
                 document.getElementById('twcheese_name_preview').innerHTML = this.generateExample();
             };
             content.saveConfig = function() {
                 var rows = document.getElementById('twcheese_config_table').rows;
                 for (i = 0; i < rows.length; i++) {
                     this.config[i] = rows[i].optionData;
                     if (this.config[i].label)
                         this.config[i].defaultLabel = this.config[i].label;
                 }
                 mode = this.getMode();
                 localStorage.setItem('twcheese.nameVillagesConfig', JSON.stringify(this.config));
                 localStorage.setItem('twcheese_nameVillagesMode', mode);
                 UI.InfoMessage('Configura&ccedil&atildeo salva.', 3000, '');
             };
             content.getConfig = function() {
                 var rows = document.getElementById('twcheese_config_table').rows;
                 for (i = 0; i < rows.length; i++) {
                     this.config[i] = rows[i].optionData;
                     if (!this.config[i].label)
                         this.config[i].label = this.config[i].defaultLabel;
                 }
                 return this.config;
             };
             content.getMode = function() {
                 var modeForm = document.getElementById('twcheese_name_mode_form');
                 var options = modeForm.getElementsByTagName('input');
                 for (i = 0; i < options.length; i++) {
                     if (options[i].checked)
                         this.mode = options[i].value;
                 }
                 return this.mode;
             };
             content.nameVillages = function() {
                 if (document.getElementById('twcheese_name_preview').innerHTML.length >= 31) {
                     UI.InfoMessage('O Nome &eacute muito longo (max 32 caracteres).', 5000, 'error');
                 } else {
                     var config = this.getConfig();
                     var mode = this.getMode();
                     $('#twcheese_name_village_container').remove();
                     setTimeout(function() {
                         twcheese.renameVillages(config, mode);
                     }, 50);
                 }
             };
             var preview = document.createElement('span');
             preview.id = 'twcheese_name_preview';
             preview.innerHTML = 'blahblahblah';
             content.innerHTML = '<b>&nbsp;Example: </b>';
             content.appendChild(preview);
             var optionsTable = document.createElement('table');
             optionsTable.id = 'twcheese_config_table';
             for (i = 0; i < options.length; i++) {
                 optionsTable.insertRow(-1);
                 optionsTable.rows[i].optionData = options[i];
                 optionsTable.rows[i].insertCell(-1);
                 optionsTable.className = 'vis';
                 var checkbox = document.createElement('input');
                 checkbox.type = 'checkbox';
                 checkbox.checked = options[i].enabled;
                 checkbox.onchange = function() {
                     content.preview();
                     this.parentNode.parentNode.optionData.enabled = this.checked;
                 };
                 optionsTable.rows[i].cells[0].appendChild(checkbox);
                 optionsTable.rows[i].insertCell(-1);
                 if (options[i].name == 'number_villages') {
                     var numberingInputTable = document.createElement('table');
                     numberingInputTable.insertRow(-1);
                     numberingInputTable.insertRow(-1);
                     numberingInputTable.rows[0].insertCell(-1);
                     numberingInputTable.rows[0].insertCell(-1);
                     numberingInputTable.rows[1].insertCell(-1);
                     numberingInputTable.rows[1].insertCell(-1);
                     numberingInputTable.rows[0].cells[0].innerHTML = 'in&iacutecio ';
                     numberingInputTable.rows[0].cells[0].style.width = '80px';
                     numberingInputTable.rows[0].cells[1].innerHTML = 'D&iacutegitos';
                     var startNumInput = document.createElement('input');
                     startNumInput.type = 'text';
                     startNumInput.size = 5;
                     startNumInput.value = options[i].startNum;
                     startNumInput.onchange = function() {
                         this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.optionData.startNum = this.value;
                         content.preview();
                     };
                     numberingInputTable.rows[1].cells[0].appendChild(startNumInput);
                     var digitsInput = document.createElement('input');
                     digitsInput.type = 'number';
                     digitsInput.size = 4;
                     digitsInput.value = options[i].digits;
                     digitsInput.onchange = function() {
                         this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.optionData.digits = this.value;
                         content.preview();
                     };
                     numberingInputTable.rows[1].cells[1].appendChild(digitsInput);
                     optionsTable.rows[i].cells[1].appendChild(numberingInputTable);
                 } else if (options[i].name == 'romana') {
                     var numberingInputTable = document.createElement('table');
                     numberingInputTable.insertRow(-1);
                     numberingInputTable.rows[0].insertCell(-1);
                     numberingInputTable.rows[0].insertCell(-1);
                     numberingInputTable.rows[0].cells[0].innerHTML = 'in&iacutecio';
                     numberingInputTable.rows[0].cells[0].style.width = '40px';
                     var numinicial = document.createElement('input');
                     numinicial.type = 'text';
                     numinicial.size = 5;
                     numinicial.value = options[i].numinicial;
                     numinicial.onchange = function() {
                         this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.optionData.numinicial = this.value;
                         content.preview();
                     };
                     numberingInputTable.rows[0].cells[1].appendChild(numinicial);
                     optionsTable.rows[i].cells[1].appendChild(numberingInputTable);
                 } else if (options[i].name == 'random_coordinates') {
                     var numberingInputTable = document.createElement('table');
                     numberingInputTable.insertRow(-1);
                     numberingInputTable.rows[0].insertCell(-1);
                     numberingInputTable.rows[0].insertCell(-1);
                     numberingInputTable.rows[0].cells[0].innerHTML = 'continente';
                     numberingInputTable.rows[0].cells[0].style.width = '80px';
                     var continente = document.createElement('input');
                     continente.type = 'text';
                     continente.size = 5;
                     continente.value = options[i].continente;
                     continente.onchange = function() {
                         this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.optionData.continente = this.value;
                         content.preview();
                     };
                     numberingInputTable.rows[0].cells[1].appendChild(continente);
                     optionsTable.rows[i].cells[1].appendChild(numberingInputTable);
                 } else {
                     var label = document.createElement('input');
                     label.type = 'text';
                     if (!options[i].noLabel)
                         label.value = options[i].defaultLabel;
                     else
                         label.value = '';
                     label.onkeyup = function() {
                         this.parentNode.parentNode.optionData.label = this.value;
                         if (!this.value)
                             this.parentNode.parentNode.optionData.noLabel = true;
                         else
                             this.parentNode.parentNode.optionData.noLabel = false;
                         content.preview();
                     };
                     optionsTable.rows[i].cells[1].appendChild(label);
                 }
                 optionsTable.rows[i].insertCell(-1);
                 optionsTable.rows[i].cells[2].innerHTML = options[i].description;
                 optionsTable.rows[i].insertCell(-1);
                 optionsTable.rows[i].cells[3].innerHTML = '<div style="width: 11px; height:11px; background-image: url(http://cdn.tribalwars.net/graphic/sorthandle.png); cursor:move" class="qbhandle" title="drag to re-order"> </div>';
             }
             content.appendChild(optionsTable);
             var modeForm = document.createElement('form');
             modeForm.id = 'twcheese_name_mode_form';
             overwriteButton = document.createElement('input');
             overwriteButton.id = 'twcheese_radio_overwrite';
             overwriteButton.type = 'radio';
             overwriteButton.name = 'name_mode';
             overwriteButton.value = 'overwrite';
             overwriteButton.style.marginLeft = '20px';
             modeForm.appendChild(overwriteButton);
             modeForm.innerHTML += 'renomear';
             substituirButton = document.createElement('input');
             substituirButton.id = 'twcheese_radio_ApenasSubstituir';
             substituirButton.type = 'radio';
             substituirButton.name = 'name_mode';
             substituirButton.value = 'ApenasSubstituir';
             substituirButton.style.marginLeft = '20px';
             modeForm.appendChild(substituirButton);
             modeForm.innerHTML += 'apenas substituir';
             prependButton = document.createElement('input');
             prependButton.id = 'twcheese_radio_prepend';
             prependButton.type = 'radio';
             prependButton.name = 'name_mode';
             prependButton.value = 'prepend';
             prependButton.style.marginLeft = '20px';
             modeForm.appendChild(prependButton);
             modeForm.innerHTML += 'colocar na frente';
             appendButton = document.createElement('input');
             appendButton.id = 'twcheese_radio_append';
             appendButton.type = 'radio';
             appendButton.name = 'name_mode';
             appendButton.value = 'append';
             appendButton.style.marginLeft = '20px';
             modeForm.appendChild(appendButton);
             modeForm.innerHTML += 'colocar ap&oacutes';
             content.appendChild(modeForm);
             var condicoes_table = document.createElement('table');
             condicoes_table.id = 'erebus_condicoes_table';
             condicoes_table.insertRow(-1);
             condicoes_table.rows[0].insertCell(-1);
             condicoes_table.rows[0].insertCell(-1);
             condicoes_table.rows[0].insertCell(-1);
             condicoes_table.rows[0].insertCell(-1);
             condicoes_table.rows[0].cells[0].innerHTML = 'substituir';
             condicoes_table.rows[0].cells[0].style.width = '100px';
             condicoes_table.rows[0].cells[2].innerHTML = 'substituir por';
             condicoes_table.rows[0].cells[2].style.width = '100px';
             var original = document.createElement('input');
             original.type = 'text';
             original.size = 20;
             original.value = "";
             original.onchange = function() {
                 subst1 = this.value;
             };
             condicoes_table.rows[0].cells[1].appendChild(original);
             var novo = document.createElement('input');
             novo.type = 'text';
             novo.size = 20;
             novo.value = "";
             novo.onchange = function() {
                 subst2 = this.value;
             };
             condicoes_table.rows[0].cells[3].appendChild(novo);
             condicoes_table.insertRow(-1);
             condicoes_table.rows[1].insertCell(-1);
             condicoes_table.rows[1].insertCell(-1);
             condicoes_table.rows[1].cells[0].style.width = '200px';
             condicoes_table.rows[1].cells[0].innerHTML = 'apenas se o nome contiver:';
             var nome_contem = document.createElement('input');
             nome_contem.type = 'text';
             nome_contem.size = 40;
             nome_contem.value = "";
             nome_contem.onchange = function() {
                 condicaoContem = this.value;
             };
             condicoes_table.rows[1].cells[1].appendChild(nome_contem);
             condicoes_table.insertRow(-1);
             condicoes_table.rows[2].insertCell(-1);
             condicoes_table.rows[2].insertCell(-1);
             condicoes_table.rows[2].cells[0].innerHTML = 'apenas se o nome n&atildeo contiver:';
             condicoes_table.rows[2].cells[0].style.width = '200px';
             var nome_nao_contem = document.createElement('input');
             nome_nao_contem.type = 'text';
             nome_nao_contem.size = 40;
             nome_nao_contem.value = "";
             nome_nao_contem.onchange = function() {
                 condicaoNaoContem = this.value;
             };
             condicoes_table.rows[2].cells[1].appendChild(nome_nao_contem);
             content.appendChild(condicoes_table);
             var buttonDiv = document.createElement('div');
             buttonDiv.align = 'center';
             buttonDiv.style.padding = '10px';
             var confirmButton = document.createElement('a');
             confirmButton.className = 'btn-default btn-green';
             confirmButton.innerHTML = 'renomear';
             confirmButton.onclick = function() {
                 document.getElementById('twcheese_name_config').nameVillages();
             };
             buttonDiv.appendChild(confirmButton);
             content.appendChild(buttonDiv);
             var saveButton = document.createElement('button');
             saveButton.onclick = function() {
                 content.saveConfig();
             };
             saveButton.innerHTML = 'salvar configura&ccedil&atildeo';
             buttonDiv.appendChild(saveButton);
             var OutputButton = document.createElement('button');
             OutputButton.onclick = function() {
                 outputlist();
             };
             OutputButton.innerHTML = 'exportar';
             buttonDiv.appendChild(OutputButton);

             function outputlist() {
                 var sep = [";", "#"];
                 var vlist = new String();
                 $('.quickedit-vn').each(function(key, village) {
                     vlist += $(village).attr('data-id');
                     vlist += sep[0];
                     $(village).find('.rename-icon').click();
                     vlist += $(village).find('input[type=text]').val();
                     vlist += sep[1];
                     $(village).find('input[type=button]').click();
                 });
                 alert(vlist);
             }
             var InputButton = document.createElement('button');
             InputButton.onclick = function() {
                 inputlist();
             };
             InputButton.innerHTML = 'importar';
             buttonDiv.appendChild(InputButton);

             function inputlist() {
                 var vlist = new Array();
                 var sep = [";", "#"];
                 var reply = prompt('Por favor, insira a lista de aldeias', '');
                 p = reply.split(sep[1]);
                 for (i = 0; i < p.length; i++) {
                     m = p[i].split(sep[0]);
                     vlist[m[0]] = m[1];
                 }
                 $('.quickedit-vn').each(function(key, village) {
                     aldeia = $(village).attr('data-id');
                     $(village).find('.rename-icon').click();
                     $(village).find('input[type=text]').val(vlist[aldeia]);
                     $(village).find('input[type=button]').click();
                 });
                 alert("OK");
             }
             contentContainer.appendChild(content);
             document.getElementById('content_value').appendChild(contentContainer);
             $('#twcheese_config_table > tbody').sortable({
                 handle: '.qbhandle',
                 placeholder: 'sortable-placeholder'
             });
             $('#twcheese_config_table > tbody').on('sortstop', function() {
                 content.preview();
             });
             UI.ToolTip('#help1');
             UI.ToolTip('#help2');
             UI.ToolTip('#help3');
             content.preview();
             content.mode = 'overwrite';
             if (localStorage.getItem('twcheese_nameVillagesMode'))
                 content.mode = localStorage.getItem('twcheese_nameVillagesMode');
             var selection = document.getElementById('twcheese_radio_' + content.mode);
             selection.checked = true;
         };
         twcheese.calculateDistance = function(village1, village2) {
             return Math.sqrt((village1[0] - village2[0]) * (village1[0] - village2[0]) + (village1[1] - village2[1]) * (village1[1] - village2[1]));
         };
         twcheese.renameVillages = function(config, mode) {
             if (subst2.indexOf(subst1) != -1 && subst1.length > 0) {
                 alert("o novo valor n\u00e3o pode conter o valor original");
             } else {
                 try {
                     $('.quickedit-vn').each(function(key, village) {
                         var villageId = $(village).attr('data-id');
                         var $label = $(village).find('.quickedit-label');
                         var originalFullName = $label.text();
                         var originalName = $label.attr('data-text');
                         var continent = originalFullName.match(/[0-9]{1,2}/gi).pop();
                         var coordinates = originalFullName.match(/[0-9]{1,}\|[0-9]{1,}/gi).pop();
                         var coordX = coordinates.match(/[0-9]{1,}/);
                         var coordY = String(coordinates.match(/\|[0-9]{1,}/)).substring(1);
                         var name = '';
                         for (j = 0; j < config.length; j++) {
                             if (config[j].enabled) {
                                 if (config[j].name == 'number_villages') {
                                     var number = key + Number(config[j].startNum);
                                     var digits = config[j].digits;
                                     for (; String(number).length < digits; digits--)
                                         name += '0';
                                     name += number;
                                 } else if (config[j].name == 'distance') {
                                     var targetCoords = config[j].label.split('|');
                                     var targetX = targetCoords[0].match(/[0-9]{1,}/);
                                     var targetY = targetCoords[1].match(/[0-9]{1,}/);
                                     var distance = twcheese.calculateDistance([targetX, targetY], [coordX, coordY]);
                                     name += Math.round(distance * 10) / 10;
                                 } else {
                                     if (!config[j].noLabel)
                                         name += config[j].label;
                                 }
                                 if (config[j].name == 'continent') {
                                     name += continent;
                                 }
                                 if (config[j].name == 'random_text') {
                                     for (k = 0; k < 3; k++) {
                                         randomInt = Math.round(Math.random() * (namePool.length - 1));
                                         name += namePool[randomInt];
                                     }
                                 }
                                 if (config[j].name == 'sector') {
                                     var tempX = Number(coordX);
                                     var tempY = Number(coordY);
                                     if (Number(tempX) >= 100)
                                         tempX = Number(String(coordX).substring(1));
                                     if (Number(tempY) >= 100)
                                         tempY = Number(String(coordY).substring(1));
                                     var xPos = Math.floor(tempX / 5);
                                     var yPos = Math.floor(tempY / 5);
                                     var sector = yPos * 20 + xPos;
                                     if (Number(tempX) >= 10)
                                         tempX = Number(String(tempX).substring(1));
                                     if (Number(tempY) >= 10)
                                         tempY = Number(String(tempY).substring(1));
                                     if (Number(tempX) >= 5)
                                         tempX = tempX - 5;
                                     if (Number(tempY) >= 5)
                                         tempY = tempY - 5;
                                     var field = tempY * 5 + tempX;
                                     name += continent + ':' + sector + ':' + field;
                                 }
                                 if (config[j].name == 'direction') {
                                     var directionNames = [
                                         ['NW', 'N', 'NE'],
                                         ['W', 'C', 'E'],
                                         ['SW', 'S', 'SE']
                                     ];

                                     function getLocation(number) {
                                         if (number > 66) {
                                             return 2;
                                         } else if (number > 33) {
                                             return 1;
                                         } else {
                                             return 0;
                                         }
                                     }
                                     var xLocation = getLocation(coordX % 100);
                                     var yLocation = getLocation(coordY % 100);
                                     name += directionNames[yLocation][xLocation];
                                 }
                                 if (config[j].name == 'coordenadas') {
                                     name += "(" + coordX + "|" + coordY + ")";
                                 }
                                 if (config[j].name == 'setor') {
                                     x = coordX;
                                     y = coordY;
                                     con = Math.floor(y / 100) + '' + Math.floor(x / 100);
                                     sec = (Math.floor(y / 10) % 10) + '' + (Math.floor(x / 10) % 10);
                                     sub = (y % 10) + '' + (x % 10);
                                     name += con + ':' + sec + ':' + sub;
                                 }
                                 if (config[j].name == 'random_coordinates') {
                                     function rand99() {
                                         num = Math.round(Math.random() * 99);
                                         if (num < 10) {
                                             num = '0' + num;
                                         }
                                         return num;
                                     }
                                     if (config[j].continente.length == 3) {
                                         var KX = config[j].continente[1];
                                         var KY = config[j].continente[2];
                                         name += "(" + KX + "" + rand99() + '|' + KY + "" + rand99() + ")";
                                     } else name += "(" + Math.round(Math.random() * 999) + '|' + Math.round(Math.random() * 999) + ")";
                                 }
                                 if (config[j].name == 'romana') {
                                     var number = key + Number(config[j].numinicial);

                                     function rom(a) {
                                         b = "";
                                         for (; a / 1000 >= 1;) {
                                             b += "M";
                                             a -= 1000;
                                         }
                                         if (a / 900 >= 1) {
                                             b += "CM";
                                             a -= 900;
                                         }
                                         if (a / 500 >= 1) {
                                             b += "D";
                                             a -= 500;
                                         }
                                         if (a / 400 >= 1) {
                                             b += "CD";
                                             a -= 400;
                                         }
                                         for (; a / 100 >= 1;) {
                                             b += "C";
                                             a -= 100;
                                         }
                                         if (a / 90 >= 1) {
                                             b += "XC";
                                             a -= 90;
                                         }
                                         if (a / 50 >= 1) {
                                             b += "L";
                                             a -= 50;
                                         }
                                         if (a / 40 >= 1) {
                                             b += "XL";
                                             a -= 40;
                                         }
                                         for (; a / 10 >= 1;) {
                                             b += "X";
                                             a -= 10;
                                         }
                                         if (a / 9 >= 1) {
                                             b += "IX";
                                             a -= 9;
                                         }
                                         if (a / 50 >= 1) {
                                             b += "V";
                                             a -= 5;
                                         }
                                         if (a / 4 >= 1) {
                                             b += "IV";
                                             a -= 4;
                                         }
                                         for (; a / 1 >= 1;) {
                                             b += "I";
                                             a -= 1;
                                         }
                                         return b;
                                     }
                                     name += rom(number);
                                 }
                             }
                         }
                         var contemOK = ((condicaoContem.length == 0) || (originalName.indexOf(condicaoContem) > -1));
                         var naocontemOK = ((condicaoNaoContem.length == 0) || (originalName.indexOf(condicaoNaoContem) == -1));
                         if (contemOK && naocontemOK) {
                             for (i = 0; originalName.indexOf(subst1) > -1 && (i < 33); i++) {
                                 originalName = originalName.replace(subst1, subst2);
                             };
                             if (mode == 'overwrite')
                                 name = name;
                             else if (mode == 'append')
                                 name = originalName + name;
                             else if (mode == 'prepend')
                                 name = name + originalName;
                             else if (mode == 'ApenasSubstituir')
                                 name = originalName;
                             if (name.length <= 32) {
                                     $(village).find('.rename-icon').click();
                                     $(village).find('input[type=text]').val(name);
                                     $(village).find('input[type=button]').click();
                                     alert(name);
                             } else
                                 UI.InfoMessage('O Nome &eacute muito longo (max 32 caracteres).<br/>nem todas as vilas ser&atildeo renomeadas', 5000, 'error');
                         }
                     });
                 } catch (e) {
                     alert(e);
                 }
             }
         };
         var script = {
             scriptname: 'name villages',
             version: 8.20,
             author: 'Nicholas Toby',
             email: 'cheesasaurus@gmail.com',
             broken: false
         };
         $.post(ScriptAPI.url, script);
         if (game_data.screen == 'overview_villages' || canNameVillages) {
             if (carregado != "rodando") {
                 twcheese.createNamerGUI();
                 var canNameVillages = true;
                 var carregado = "rodando";
             } else {
                 alert('j\u00e1 foi executado nesta p\u00e1gina, ela ir\u00e1 recerregar');
                 $(location).attr("href", game_data.link_base_pure + 'overview_villages');
             }
         } else {
             UI.InfoMessage('use na visualiza&ccedil&atildeo das vilas.', 5000, 'error');
         }
     };

    /**
     * Script que facilita pedido de apoio entre suas aldeias
     * @author Gil Penner (Paçoquita) <skype: gilhrpenner@gmail.com>
     * @version 1.0
     * @return {[type]} [description]
     */
     vlk.placeApoioEmMassa = function()
     {
        var html = '';
        html += "<br /><img src='" + Format.image_src('unit/unit_spear.png') + "' width='18' height='18' > <input type='text' size='2' onchange='vkMas.placeApoioEmMassaAdicionarTropas(\"spear\", this)' name='lanceiro'>";
        html += "&nbsp;&nbsp;&nbsp;<img src='"+Format.image_src('unit/unit_sword.png')+"' width='18' height='18' > <input type='text' onchange='vkMas.placeApoioEmMassaAdicionarTropas(\"sword\", this)' size='2' name='espadachin'>";
        html += "&nbsp;&nbsp;&nbsp;<img src='"+Format.image_src('unit/unit_axe.png')+"' width='18' height='18' > <input type='text' onchange='vkMas.placeApoioEmMassaAdicionarTropas(\"axe\", this)' size='2' name='barbaro'>";
        $('#pedido_apoio').remove();
        if ($("#village_troup_list tr:lt(1) th:gt(1):not(:last)").length == 11){
            html += "&nbsp;&nbsp;&nbsp;<img src='" + Format.image_src('unit/unit_archer.png') + "' width='18' height='18' > <input type='text' onchange='vkMas.placeApoioEmMassaAdicionarTropas(\"archer\", this)' size='2' name='arqueiro'>";
        }
        html += "&nbsp;&nbsp;&nbsp;<img src='" + Format.image_src('unit/unit_spy.png') + "' width='18' height='18' > <input type='text' onchange='vkMas.placeApoioEmMassaAdicionarTropas(\"spy\", this)' size='2' name='explorador'>";
        html += "&nbsp;&nbsp;&nbsp;<img src='" + Format.image_src('unit/unit_light.png') + "' width='18' height='18' > <input type='text' onchange='vkMas.placeApoioEmMassaAdicionarTropas(\"light\", this)' size='2' name='cl'>";
        if ($("#village_troup_list tr:lt(1) th:gt(1):not(:last)").length == 11){
            html += "&nbsp;&nbsp;&nbsp;<img src='" + Format.image_src('unit/unit_marcher.png') + "' width='18' height='18' > <input type='text' onchange='vkMas.placeApoioEmMassaAdicionarTropas(\"marcher\", this)' size='2' name='ca'>";
        }
        html += "&nbsp;&nbsp;&nbsp;<img src='" + Format.image_src('unit/unit_heavy.png') + "' width='18' height='18' > <input type='text' onchange='vkMas.placeApoioEmMassaAdicionarTropas(\"heavy\", this)' size='2' name='cp'>";
        html += "&nbsp;&nbsp;&nbsp;<img src='" + Format.image_src('unit/unit_ram.png') + "' width='18' height='18' > <input type='text' onchange='vkMas.placeApoioEmMassaAdicionarTropas(\"ram\", this)' size='2' name='ariete'>";
        html += "&nbsp;&nbsp;&nbsp;<img src='" + Format.image_src('unit/unit_catapult.png') + "' width='18' height='18' > <input type='text' onchange='vkMas.placeApoioEmMassaAdicionarTropas(\"catapult\", this)' size='2' name='catapulta'>";
        if ($("#village_troup_list tr:lt(1) th:gt(1):not(:last)").length == 11){
            html += "&nbsp;&nbsp;&nbsp;<img src='" + Format.image_src('unit/unit_knight.png') + "' width='18' height='18' > <input type='text' onchange='vkMas.placeApoioEmMassaAdicionarTropas(\"knight\", this)' size='2' name='paladino'>";
        }
        $("<div id='pedido_apoio'><br /><strong>Digite a quantia de tropas que deseja pedir</strong> <label style='color: red;'>v0.1</label><hr>"+html+"</div>").insertBefore("#village_troup_list");
        $("input[value='Selecionar']").click();
        $("input:checkbox").prop('checked', false);
    };

    /**
     * Script que facilita pedido de apoio entre suas aldeias
     * @author Gil Penner (Paçoquita) <skype: gilhrpenner@gmail.com>
     * @version 1.0
     * @return {[type]} [description]
     */
     vlk.placeApoioEmMassaAdicionarTropas = function (tropas, nome) {
        if ($("input[name=\"" + nome.getAttribute("name") + "\"]").val().match(/^[0-9]+$/) == null) {
            UI.InfoMessage('Use apenas números!', 3000, true);
            return $("input[name=" + nome.getAttribute("name") + "]").val('0');
        }

        $("input[id=checkbox_" + tropas + "][type=checkbox]").prop("checked", true);

        var atual = 0;
        var novo = parseInt($("input[name=" + nome.getAttribute("name") + "]").val());

        $("#village_troup_list tr:gt(0)").each(function() {
            atual = parseInt($(this).find("[name='" + tropas + "']").val());

            if (atual >= novo) {
                $(this).find("[name='" + tropas + "']").val(novo);
            }
        });
    };

    /**
     * Script que insere um assinatura.
     * @autor VLKTW
     * @return {[type]} [description]
     */
     vlk.overviewAssinatura = function()
     {
        var assinatura = localStorage.getItem('Assinatura');
        if (assinatura === null) {
            return vlk.overviewAssinaturaCadastrar();
        }
        $("textarea[id*='message']").val($("textarea[id*='message']").val() + assinatura);
    };

    /**
     * Script que configura uma assinatura
     * @autor VLKTW
     * @return {[type]} [description]
     */
     vlk.overviewAssinaturaCadastrar = function()
     {
        var assinatura = localStorage.getItem('Assinatura');
        if (assinatura === null) {
            assinatura = '';
        }
        var msg = '<h3>Digite a sua assinatura:</h3>';
        msg += '<textarea id="vlk_assinatura" style="width: 100%;" rows="5">' + assinatura + '</textarea>';
        UI.ConfirmationBox(msg, [{
            text: "Salvar",
            callback: function() {
                localStorage.setItem('Assinatura', $('#vlk_assinatura').val());
                var dados = localStorage.getItem('Assinatura');
                if (dados !== null) {
                    UI.SuccessMessage("Assinatura gravada com sucesso!", 3000);
                } else {
                    UI.ErrorMessage("Falha ao gravar a assinatura!", 3000);
                }
            },
            confirm: true
        }]);
    };

    /**
     * Seleciona relatórios duplicados.
     * @author <DESCONHECIDO>
     * @return {[type]} [description]
     */
     vlk.reportSelecionarRepetidos = function()
     {
        $("#relatorios_repetidos").remove();
        $("<div id=\"relatorios_repetidos\"><br /><br /><strong>Relatórios repetidos v1.0</strong><hr><div id=\"quantia_relatorios\">Há 0 relatórios repetidos.</div><br /></div>").insertBefore("#report_list");
        $("input[name*=id_][type=checkbox]").prop("checked", false);

        function fnExtractCoords(src) {
            var vv = src.match(/\d+\|\d+/ig);
            return (vv ? vv[vv.length - 1] : null);
        }

        function copyToClipboard() {
            window.prompt("Copiar coordenadas: Ctrl+C, Enter", coordenadas.join(" "));
        }
        var repetidos = 0;
        var coord;
        var coordenadas = new Array();
        var table = document.getElementById('report_list');
        for (var r = 1, n = table.rows.length; r < n - 1; r++) {
            if ((coordenadas.indexOf(fnExtractCoords(table.rows[r].cells[1].innerHTML)) > -1) == false) {
                coord = fnExtractCoords(table.rows[r].cells[1].innerHTML);
                if (coord != null) {
                    coordenadas.push(fnExtractCoords(table.rows[r].cells[1].innerHTML));
                }
            } else {
                repetidos++;
                $("input[name=" + table.rows[r].cells[0].innerHTML.split('"')[1] + "][type=checkbox]").prop("checked", true);
            }
        }
        document.getElementById('quantia_relatorios').innerHTML = "Há " + repetidos + " relatórios repetidos.<br /><a onclick=\"copyToClipboard()\" href=\"javascript:void(0)\">Copiar coordenadas não repetidas.</a><br />";
    };

    /**
     * Script que renomeia ataques e apoios chegando
     * @author Nick Toby (cheesasaurus@gmail.com)
     * @todo Tradução
     * @return {[type]} [description]
     */
     vlk.overviewRenomearAtaquesApoios = function()
     {
        $.getScript('https://media.innogamescdn.com/com_DS_UK/Scripts/mass_tag_launch.js');
    };

    /**
     * Planejador de ataques
     * @author Fluffy88
     * @author Gil Penner (Paçoquita)
     * @return {[type]} [description]
     */
     vlk.overviewPlanejadorAtaque = function()
     {
        $.getScript('https://media.innogamescdn.com/com_DS_BR/Scripts/Aprovados/planejador_de_ataques.js');
    };

    /**
     * Calcula o retorno de um farm.
     * @author Gil Penner (Paçoquita) <gilhrpenner@gmail.com> (Script original)
     * @author VLKTW (Melhorias técnicas/visuais para atender as novas modificações do TW)
     * @return {[type]} [description]
     */
     vlk.overviewCalculadoraFarm = function()
     {
        var msg = '<div style=max-width:500px;>';
        msg += '<h2 class="popup_box_header">Calculadora de farm</h2>';
        msg += '<p><span class="icon wood"></span> <label id="madeira">0</label></p>';
        msg += '<p><span class="icon stone"></span> <label id="argila">0</label></p>';
        msg += '<p><span class="icon iron"></span> <label id="ferro">0</label></p>';
        msg += '<p><span class="icon header ressources"></span>';
        msg += '<label id="total">0</label></p>';
        msg += '<p>Somando: <span id="vlkSomaFarm">0</span>/'+$("#commands_table tr:not(:first) td:first-child > span.quickedit").length+' comandos.';
        msg += '</div>';
        Dialog.show('vlkDialogFarm', msg);
        var madeira = 0;
        var argila = 0;
        var ferro = 0;
        var cont = 0;
        $("#commands_table tr:not(:first) td:first-child > span.quickedit").each(function(i, e) {
            setTimeout(function(){
                TribalWars.get('info_command', {
                    ajax: 'details',
                    id: $(e).attr("data-id")
                }, function(response) {
                    if (response.booty != null) {
                        madeira += Number(response.booty.wood);
                        $("#madeira").html(madeira);
                        argila += Number(response.booty.stone);
                        $("#argila").html(argila);
                        ferro += Number(response.booty.iron);
                        $("#ferro").html(ferro);
                        $("#total").html(madeira + argila + ferro);
                    }
                });
                $('#vlkSomaFarm').html(i+1);
            },300*(i+1));
        });
    };

    /**
     * Coleta nicks de membros de uma tribo para mensagem coletiva.
     * @author Gil Penner (Paçoquita) <skype: gilhrpenner@gmail.com>
     * @author VLKTW (Melhorias visuais)
     * @return {[type]} [description]
     */
     vlk.allyMembrosColetiva = function() {
        if(game_data.screen!='info_member' && window.location.href.indexOf('screen=ally&mode=members') === -1){
            UI.InfoMessage('Script deve ser usado na pagina de membros de uma tribo.', 3000, true);
            end();
        }
        var membros = new Array();
        $("#content_value table:not(:first) tr:not(:first) td:first-child").each(function() {
            membros.push($(this).text().replace(/\(.*$/,"").trim());
        });
        var msg = '<h3>Copie o texto abaixo:</h3>';
        msg += '<textarea type="text" id="vlk_membroscoletiva" style="width: 100%;" rows="8">';
        msg += membros.join(";");
        msg += '</textarea>';
        UI.ConfirmationBox(msg, []);
    };

    /**
     * Balancear recursos entre suas aldeias.
     * @author http://www.extremetw.com
     * @return {[type]} [description]
     */
     vlk.marketBalancearRecursos = function()
     {
        function MarketMain(){var a=document;if(window.frames.length>0)a=window.main.document;var b=a.createElement('script');b.type='text/javascript';b.src='https://media.innogamescdn.com/com_DS_ES/Scripts/mb.js';a.getElementsByTagName('head')[0].appendChild(b)}function getGameDoc(winvar){getdoc=winvar.document;if(!getdoc.URL.match('game\.php')){for(var i=0;i<winvar.frames.length;i++){if(winvar.frames[i].document.URL.match('game\.php')){getdoc=winvar.frames[i].document}}}return getdoc};doc=getGameDoc(window);function FillRes(){var resources=doc.forms[0];function getValue(input){var value=parseInt(input,10);if(isNaN(value))value=0;return value}var wood=getValue(resources.wood.value);var clay=getValue(resources.stone.value);var iron=getValue(resources.iron.value);function OKClick(){var arrInputs=resources.getElementsByTagName('input');for(var idx1=0;idx1<arrInputs.length;idx1++){if(arrInputs[idx1].value.indexOf('OK')!=-1){arrInputs[idx1].click();break}}}function insertValues(){var URLargs=doc.URL.split("&");for(var i=0;i<URLargs.length;i++){var args=URLargs[i].split("=");if(args.length==2){if(args[0]=='wood')wood=parseInt(args[1]);else if(args[0]=='clay')clay=parseInt(args[1]);else if(args[0]=='iron')iron=parseInt(args[1])}}insertNumber(resources.wood,wood);insertNumber(resources.stone,clay);insertNumber(resources.iron,iron)}if(wood+clay+iron>0){OKClick()}else{insertValues()}}if(doc.URL.match(/clay=/)||doc.URL.match(/confirm_send/)){FillRes()}else{MarketMain()}
    };

    /**
     * Calcula tempo de backtime e snipe
     * @author Gil Penner (Paçoquita) <skype: gilhrpenner@gmail.com>
     * @return {[type]} [description]
     */
     vlk.overviewCalculoBTSnipe = function()
     {
        var conteudo = '<div style=max-width:600px;>' +
        '<h2 class="popup_box_header">Calc. BT & Snipe</h2>' +
        '<p><div style="text-align: center;">Hora do ataque<br /><input type="text" id="bt1"><br />Duração<br /><input type="text" id="bt2"><br /><br /><input onClick="vkMas.overviewCalculoBTSnipeCalcular()" class="btn btn-confirm" type="submit" value="Calcular"></div></p>' +
        '<div id="resultado" style="display: none;">Back:&nbsp; xx:xx:xx<br />Snipe: xx:xx:xx</div>' +
        '</div>';
        Dialog.show('vlkt_bt_snipe_calc', conteudo);
    };

    /**
     * Função de calculo do backtime e snipe
     * @return {[type]} [description]
     */
     vlk.overviewCalculoBTSnipeCalcular = function()
     {
        if(document.getElementById('bt1').value.match(/[0-9]{2}\:[0-9]{2}\:[0-9]{2}/) != null && document.getElementById('bt2').value.match(/[0-9]{2}\:[0-9]{2}\:[0-9]{2}/) != null) {
            var timeArray = document.getElementById('bt1').value.split(':');
            var travArray = document.getElementById('bt2').value.split(':');
            var result;
            //Back Time
            var h = parseInt(timeArray[0], 10) + parseInt(travArray[0], 10);
            var m = parseInt(timeArray[1], 10) + parseInt(travArray[1], 10);
            var s = parseInt(timeArray[2], 10) + parseInt(travArray[2], 10);
            if (s > 60) {
                m += 1;
                s -= 60;
            }
            if (m > 60) {
                h += 1;
                m -= 60;
            }
            if (h >= 24) {
                h -= 24;
            }
            if (s < 10) {
                s = '0' + s;
            }
            if (m < 10) {
                m = '0' + m;
            }
            if (h < 10) {
                h = '0' + h;
            }
            result = h + ':' + m + ':' + s;
            $("#resultado").html("<b>Back:</b>&nbsp; " + result + " (Tropas retornam)");
            var H = parseInt(timeArray[0], 10) - parseInt(travArray[0], 10);
            var M = parseInt(timeArray[1], 10) - parseInt(travArray[1], 10);
            var S = parseInt(timeArray[2], 10) - parseInt(travArray[2], 10);
            if(S < 0) {S = 60 - (S * -1);M --;}
            if(M < 0) {M = 60 - (M * -1);H --;}
            if(H < 0 ) {H = 24 - (H * -1);if(H>10) {H = 'Ontem às ' + H;}else if(H<10) {H = 'Ontem às ' + H;}}
            if(S<10) {S = '0' + S;}
            if(M<10) {M = '0' + M;}
            if(H<10) {H = '0' + H;}
            result = H + ':' + M + ':' + S;
            $("#resultado").html($("#resultado").html() + "<br /><b>Snipe:</b> " + result);
            $("#resultado").fadeIn("slow");
        } else {
            $("#resultado").html("<p style='color: red;'>Formato de horas incorreto!<br />Utilize: HH:MM:SS</p> ");
            $("#resultado").fadeIn("slow");
        }
    };

    /**
     * Coletar aldeias do perfil
     * @author VLKTW
     * @return {[type]} [description]
     */
     vlk.playerAldeiasPerfil = function()
     {
        if(game_data.screen != 'info_player'){
            UI.ErrorMessage('Vá até o perfil do jogador desejado!',3000);
            return;
        }
        var aldeias = {'todos': [] };
        $('#villages_list tbody tr td:nth-child(2)').each(function(i){
            if(i != 0 && i % 2 != 0){
                var coord = $.trim($(this).html().substr(0,7));
                var k = 'K'+coord.substr(4,1)+coord.substr(0,1);
                if(typeof aldeias[k] == 'undefined'){
                    aldeias[k] = [];
                }
                aldeias[k].push(coord);
                aldeias.todos.push(coord);
            }
        });
        var msg = '<div style="width: 550px; min-height: 300px;"><h3>Aldeias do perfil:</h3>';
        if(aldeias.todos.length > 0){
            msg += '<label style="font-weight: bold;">Todas:</label><textarea style="width: 99%;" rows="2">'+aldeias.todos.join(' ')+'</textarea>';
            msg += '<label style="font-weight: bold;">Todas BB:</label><textarea style="width: 99%;" rows="2">[coord]'+aldeias.todos.join("[/coord]\n[coord]")+'[/coord]</textarea>';
        }
        for (var x in aldeias){
            if(x !== 'todos'){
                msg += '<label style="font-weight: bold;">Aldeias '+x+':</label><textarea style="width: 99%;" rows="2">'+aldeias[x].join(' ')+'</textarea>';
                msg += '<label style="font-weight: bold;">Aldeias '+x+' BB:</label><textarea style="width: 99%;" rows="2">[coord]'+aldeias[x].join("[/coord]\n[coord]")+'[/coord]</textarea>';
            }
        }
        msg += '</div>';
        Dialog.show('vlkAldeiasPerfil',msg);
    };

    /**
     * Script que ordena as aldeias de acordo com a distância entre uma dada coordenada
     * @author DESCONHECIDO
     * @param  {[type]} targetCoord [description]
     * @return {[type]}             [description]
     */
     vlk.overviewOrdenarAldeiaDistancia = function()
     {
        $.getScript('https://cld.pt/dl/download/f829d433-7a64-477b-abad-7d8534992308/ordenar_aldeias_distancia.js');
    };

    /**
     * Esconde aldeias barbaras que estão senod farmadas.
     * @author Paulo Pcappelli
     * @return {[type]} [description]
     */
     vlk.mapEsconderFarm = function()
     {
        setInterval(function(){
            $("#map_container div:not('.map_border') img[id^='map_cmdicons_']").each(function(i,e) {
                var aldeia = $(e).attr('id').replace('_0', '').replace('cmdicons', 'village');
                $(e).remove();
                $("#" + aldeia).remove();
            });
        }, 1);
    };

    vlk.mapExtrairCoordenadas = function(oper)
    {
        oper = oper || false;
        if(!oper){
            var msg = '<h3>Extrair coordenadas</h3>';
            msg += '<a href="#" class="btn" onclick="vkMas.mapExtrairCoordenadas(true)">Extrair</a> ';
            msg += '<a href="#" class="btn" onclick="vkMas.mapExtrairCoordenadasConfig()">Configurar</a> ';
        } else {
            var dados = localStorage.getItem('ExtrairCoordenadas');
            if(dados === null){
                dados = {
                    'codigo_bb' : 'S',
                    'barb_maiorq' : 0,
                    'bonus_maiorq' : 0,
                    'player_maiorq' : 0,
                    'tribo' : 'S'
                }
                localStorage.setItem('ExtrairCoordenadas',JSON.stringify(dados));
            } else {
                dados = JSON.parse(dados);
            }
            var gerarCoord = function(coord){
                var ret = coord.substr(0,3)+'|'+coord.substr(-3);
                ret = '[coord]'+ret+'[/coord]';
                return ret;
            };
            var aldeias = {'barbb': [],  'barb': [], 'playere':[], 'playereb':[], 'playera': [], 'playerab': []};
            for (var coord in TWMap.villages){
                var villa = TWMap.villages[coord];
                if(villa.owner == game_data.player.id){
                    //-- pula aldeia do proprio jogador
                } else if (villa.owner != '0' && (TWMap.allyRelations[TWMap.players[villa.owner].ally] != TWMap.allyRelations[TWMap.players[game_data.player.id].ally] && TWMap.allyRelations[TWMap.players[villa.owner].ally] != 'partner') && parseInt(villa.points.replace(/\./g,'')) >= dados.player_maiorq){
                    //-- Aldeias de inimigos
                    if(villa.bonus){
                        aldeias.playereb.push(gerarCoord(coord));
                    } else {
                        aldeias.playere.push(gerarCoord(coord));
                    }
                } else if (villa.owner != '0' && (TWMap.allyRelations[TWMap.players[villa.owner].ally] == TWMap.allyRelations[TWMap.players[game_data.player.id].ally] || TWMap.allyRelations[TWMap.players[villa.owner].ally] == 'partner') && parseInt(villa.points.replace(/\./g,'')) >= dados.player_maiorq){
                    //-- Aldeias de aliados
                    if(villa.bonus){
                        aldeias.playerab.push(gerarCoord(coord));
                    } else {
                        aldeias.playera.push(gerarCoord(coord));
                    }
                } else if(villa.bonus && villa.owner == '0' && parseInt(villa.points.replace(/\./g,'')) >= dados.bonus_maiorq){
                    //-- Aldeias de barbaros bonus
                    aldeias.barbb.push(gerarCoord(coord));
                } else if (villa.owner == '0'){
                    //-- Aldeias de barbaros
                    aldeias.barb.push(gerarCoord(coord));
                }
            }
            var msg = '<div style="width: 450px;"><h3>Aldeias extraídas</h3><textarea style="width: 100%;" rows="10">';
            if (dados.codigo_bb == 'S'){
                msg += '[spoiler=Barbaros]'+aldeias.barb.join('\n')+'[/spoiler]\n';
                msg += '[spoiler=Barbaros Bônus]'+aldeias.barbb.join('\n')+'[/spoiler]\n';
                msg += '[spoiler=Inimigos]'+aldeias.playere.join('\n')+'[/spoiler]\n';
                msg += '[spoiler=Inimigos Bônus]'+aldeias.playereb.join('\n')+'[/spoiler]\n';
                if(dados.tribo == 'N'){
                    msg += '[spoiler=Aliados]'+aldeias.playera.join('\n')+'[/spoiler]\n';
                    msg += '[spoiler=Aliados Bônus]'+aldeias.playerab.join('\n')+'[/spoiler]\n';
                }
            } else {
                msg += '[spoiler=Barbaros][code]'+aldeias.barb.join(' ').replace(/\[coord\]/g,'').replace(/\[\/coord\]/g,'')+'[/code][/spoiler]\n\n';
                msg += '[spoiler=Barbaros Bônus][code]'+aldeias.barbb.join(' ').replace(/\[coord\]/g,'').replace(/\[\/coord\]/g,'')+'[/code][/spoiler]\n\n';
                msg += '[spoiler=Inimigos][code]'+aldeias.playere.join(' ').replace(/\[coord\]/g,'').replace(/\[\/coord\]/g,'')+'[/code][/spoiler]\n\n';
                msg += '[spoiler=Inimigos Bônus][code]'+aldeias.playereb.join(' ').replace(/\[coord\]/g,'').replace(/\[\/coord\]/g,'')+'[/code][/spoiler]\n\n';
                if(dados.tribo == 'N'){
                    msg += '[spoiler=Aliados][code]'+aldeias.playera.join(' ').replace(/\[coord\]/g,'').replace(/\[\/coord\]/g,'')+'[/code][/spoiler]\n\n';
                    msg += '[spoiler=Aliados Bônus][code]'+aldeias.playerab.join(' ').replace(/\[coord\]/g,'').replace(/\[\/coord\]/g,'')+'[/code][/spoiler]\n\n';
                }
            }
            msg += '</textarea></div>'
        }
        Dialog.show('vlkExtrairCoordenadas',msg);

    };

    vlk.mapExtrairCoordenadasConfig = function(dados)
    {
        dados = dados || false;
        if(dados === false){

            var html = '<div style="width: 100%; text-align: left;">';
            html += '<h3>Extração de coordenadas:</h3>';
            html += '<label style="font-weight: bold;">Código BB:</label><br>';
            html += '<select id="vlk_codigo_bb"><option value="S">Sim</option><option value="N">Não</option></select><br>';
            html += '<label style="font-weight: bold;">Pontuação mínima Barbaros:</label><br>';
            html += '<input type="number" id="vlk_barb_maiorq" value="1000"><br>';
            html += '<label style="font-weight: bold;">Pontuação mínima Bônus:</label><br>';
            html += '<input type="number" id="vlk_bonus_maiorq" value="1000"><br>';
            html += '<label style="font-weight: bold;">Pontuação mínima jogadores:</label><br>';
            html += '<input type="number" id="vlk_player_maiorq" value="1000"><br>';
            html += '<label style="font-weight: bold;">Ignorar aldeias da tribo:</label><br>';
            html += '<select id="vlk_tribo"><option value="S">Sim</option><option value="N">Não</option></select><br><br>';
            html += '<input type="submit" class="btn" id="vlkExtrairCoordenadasGravar" value="Gravar">';
            html += '</div>';
            Dialog.show('vlkExtrairCoordenadasConfig',html);
            setTimeout(function(){
                $('#vlkExtrairCoordenadasGravar').on('click',function(){
                    var dados = {};
                    dados['codigo_bb'] = $('#vlk_codigo_bb').val();
                    dados['barb_maiorq'] = $('#vlk_barb_maiorq').val();
                    dados['bonus_maiorq'] = $('#vlk_bonus_maiorq').val();
                    dados['player_maiorq'] = $('#vlk_player_maiorq').val();
                    dados['tribo'] = $('#vlk_tribo').val();
                    vlk.mapExtrairCoordenadasConfig(dados);
                });
                var dados = localStorage.getItem('ExtrairCoordenadas');
                dados = dados !== null ? JSON.parse(dados) : {};
                for (var x in dados){
                    $('#vlk_'+x).val(dados[x]);
                }
            },300);
        } else {
            localStorage.setItem('ExtrairCoordenadas',JSON.stringify(dados));
            var dados = localStorage.getItem('ExtrairCoordenadas');
            if(dados === null){
                UI.ErrorMessage('Falha ao gravar configurações!',3000);
            } else {
                UI.SuccessMessage('Configurações salvas!',3000);
            }
        }
    };

    vlk.overviewIdentificarFake = function()
    {
        $.getScript('https://media.innogamescdn.com/com_DS_ES/Scripts/FakeCounter.js');
    };

    vlk.overviewRemoverComandos = function()
    {
        var tem = prompt('Com o termo:','Explorador');
        var exato = confirm('Valor exato?');
        $('#incomings_table tr td:nth-child(1)').each(function(){
            var $this = $(this);
            var html = $.trim($this.find('.quickedit-label').html());
            console.log(html);
            //-- Termo requerido não encontrado (remove)
            if(exato){
                if(html != tem){
                    $this.parent().remove();
                }
            } else {
                if(html.indexOf(tem) == -1){
                    $(this).parent().remove();
                }
            }

        });
    };

    /**
     * Inicializador padrão da classe
     */
     vlk.init();
 };

 var vkMas = new vlkMaster();