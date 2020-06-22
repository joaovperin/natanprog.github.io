const options = { month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};


$('span.return-countdown').each(function(){
    let now = new Date();
    let countdown = $(this).html();

    let hours = parseInt(countdown.split(':')[0]),
        minutes = parseInt(countdown.split(':')[1]),
        seconds = parseInt(countdown.split(':')[2]);

    now.setHours(now.getHours()+hours);
    now.setMinutes(now.getMinutes()+minutes);
    now.setSeconds(now.getSeconds()+seconds);

    let ul_parent = $(this).closest('ul.preview');

    ul_parent.append('<li><span>Retour : '+ now.toLocaleDateString('fr-FR', options) +'</span></li>')
    
});