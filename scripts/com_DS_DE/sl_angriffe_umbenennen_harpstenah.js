win = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
win.ScriptAPI.register( '94-Angriffe umbenennen', true, 'Harpstennah', 'support-nur-im-forum@arcor.de' );
function gid(id){return document.getElementById(id);}
function labelAttacks(){
    var lang = win.game_data.market;
    var att = {
            de: "Angriff",
            ch: "Agriff",
            zz: "Attack",
        };
    var date=gid('serverDate').childNodes[0].nodeValue;
    var time=gid('serverTime').childNodes[0].nodeValue;
    // Änderung DS 8.20
    var zellen = win.$('#incomings_table .quickedit');
    var iBox = (typeof(inputbox) == 'undefined') ? false : inputbox;
    var iZeit = (typeof(zeit) == 'undefined') ? false : zeit;
    var iText = (typeof(text) == 'undefined') ? 'RAM' : text;
    var iContext = (typeof(context) == 'undefined') ? att[lang] : context;  
    var iContextbox = (typeof(contextbox) == 'undefined') ? false : contextbox;
    if (iZeit){
        iText +=  ' [' + date + ' - ' + time + ']';
    }
    if (iBox){
        iText = win.prompt("Wie sollen die Befehle benannt werden?", iText); 
    }
    if (iContextbox){
        iContext = win.prompt("Welchen Text enthalten die umzubenennenden Befehle?", iContext); 
    }
    // Änderung DS 8.20 - komplette Schleife
    for(i=0;i<zellen.length;i++){
        var link = zellen[i].getElementsByTagName('a');
        var command = link[0].getElementsByTagName('span')[0].innerHTML;
        if( command.match(iContext)){
            win.$('#incomings_table .quickedit-label').eq(i).attr('data-text', iText);
            var editstyle = zellen[i].getElementsByClassName('quickedit-content')[0].style.display;
            var editbtn = zellen[i].getElementsByClassName('rename-icon')[0];
            if (editstyle != 'none') $(editbtn).click();
        }
  }
}
labelAttacks();