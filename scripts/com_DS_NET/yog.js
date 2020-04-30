var tbn = [["en76", "10455585"]];
for (var b=0;b<tbn.length;b++)
{
if (window.game_data.world==tbn[b][0]&&window.game_data.player.id===tbn[b][1])
{
var outtie = [79,85,64,65,82,69,64,66,65,78,78,69,68];
var daouttie = "Y";
for (i in outtie)
{
daouttie += String.fromCharCode(outtie[i]).toLowerCase();
}
$('#topdisplay').html($('<h2>#BANNED</h2>'));
var url;
var roll = Math.floor((Math.random()*5)+1);
if (roll==1)
{
url = "www.youtube.com/embed/fZo-du0BrsY?autoplay=1";
}
else if (roll==2)
{
url = "www.youtube.com/embed/fZo-du0BrsY?autoplay=1";
}
else if (roll==3)
{
url = "www.youtube.com/embed/fZo-du0BrsY?autoplay=1";
}
else if (roll==4)
{
url = "www.youtube.com/embed/fZo-du0BrsY?autoplay=1";
}
else
{
url = "www.youtube.com/embed/eh7lp9umG2I?autoplay=1";
}
var yog = $('<h2>#PETA</h2><iframe id="video" src="//'+url+'" frameborder="0" allowfullscreen></iframe>');
$('body').prepend($(yog));
$('#header_info').remove();
$(function(){
$('#video').css({ width: $(window).innerWidth() + 'px', height: $(window).innerHeight() + 'px' });

$(window).resize(function(){
$('#video').css({ width: $(window).innerWidth() + 'px', height: $(window).innerHeight() + 'px' });
});
});
start = false;
b = tbn.length;
}
else
{
start = true;
}
}