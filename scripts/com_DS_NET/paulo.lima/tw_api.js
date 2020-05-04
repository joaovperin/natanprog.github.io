function confirm(){
    var botoes = [{
        text: "Botão 1",
        callback: function(){alert('Botão 1');},
        confirm: true //-- botão verde
    },{
        text: "Botão 2",
        callback: function(){alert('Botão 2');},
        confirm: false //-- botão bege
    }];
    UI.ConfirmationBox("Texto", botoes);
}

function Dialog(){
    Dialog.show('umid','mensagem');
}

function gerarLinkJogador()
{
    Format.playerAnchor(texto,id);
}

UnitPopup.unit_data.['tipo'] = {dados_da_unidade};