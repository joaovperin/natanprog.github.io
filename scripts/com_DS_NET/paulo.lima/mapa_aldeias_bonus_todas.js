javascript:(function(){
    var aBonus = $('#map_container div:not(\'.map_border\') img[id^=\'map_village\'][src*=\'/b\']');
    var lista = '';
    var baseUrl = window.location.origin+'/game.php?screen=info_village&id=';
    if (confirm('Foram encontradas '+aBonus.length+' aldeias, deseja abri-las?')){
        $(aBonus).each(function(){
            var $this = $(this);
            var vilId = $this.attr('id').split('_')[2];
            window.open(baseUrl+vilId);
        });
    }
})();