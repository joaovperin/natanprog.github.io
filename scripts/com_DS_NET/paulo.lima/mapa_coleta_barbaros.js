javascript:void(function(){
    var gerarCoord = function(coord,bb){
        var ret = coord.substr(0,3)+'|'+coord.substr(-3);
        if(bb){
            ret = '[coord]'+ret+'[/coord]';
        }
        return ret;
    };
    var aldeias = {'bonusb': [], 'bonusp': [], 'barb': []};
    var config = {
        'barb_maiorq': 0,
        'bonus_maiorq': parseInt(prompt('Pontuação mínima de aldeia bonus',1000)),
        'mostrar_barb' : confirm('Considerar barbaras sem bônus?'),
        'codigo_bb': confirm('Aldeias em código BB?')
    };
    if(config.mostrar_barb){
        config.barb_maiorq = parseInt(prompt('Pontuação mínima de aldeia barbara:',1000));
    }
    for (var coord in TWMap.villages){
        var villa = TWMap.villages[coord];
        if(villa.owner == game_data.player.id){
            //-- pula aldeia do proprio jogador
        } else if(villa.bonus && parseInt(villa.points.replace(/\./g,'')) >= config.bonus_maiorq){
            if (villa.owner == '0'){
                aldeias.bonusb.push(gerarCoord(coord,config.codigo_bb));
            } else {
                if (TWMap.allyRelations[TWMap.players[villa.owner].ally] != 'partner'){
                    aldeias.bonusp.push(gerarCoord(coord,config.codigo_bb));
                }
            }
        } else if (config.mostrar_barb && parseInt(villa.points.replace(/\./g,'')) >= config.barb_maiorq) {
            aldeias.barb.push(gerarCoord(coord,config.codigo_bb));
        }
    }
    prompt('Aldeias bônus barbara',aldeias.bonusb.join(' '));
    prompt('Aldeias bônus de inimigos',aldeias.bonusp.join(' '));
    if(config.mostrar_barb){
        prompt('Aldeias barbara',aldeias.barb.join(' '));
    }
})();

//540|465 541|475 543|473 545|460 546|494 546|496 547|489 552|462 552|465 553|472 554|476 557|472 557|487 559|475 560|462 561|474 562|494 564|479 566|462 568|464 568|467 568|483 569|470 570|463 572|482 574|471 577|462 578|461 579|490