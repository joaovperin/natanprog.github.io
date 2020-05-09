function main(){
    win = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
    win.$.ajaxSetup({ cache: true });
    win.ScriptAPI.register( '88-Incs in der Dorfübersicht umbenennen', true, 'Harpstennah', 'support-nur-im-forum@arcor.de' );
    const SlIncDorfuebersicht_version = '1.2';
    function gid(id){return document.getElementById(id);}
    var sVorgabe = (typeof(vorgabe) == 'undefined') ? '{old}' : vorgabe;
    var iBox = (typeof(inputbox) == 'undefined') ? false : inputbox;
    var zellen = win.$('#show_incoming_units .quickedit');
    if (zellen.length == 0) {
        win.UI.InfoMessage('kein Angriff gefunden', 2000, 'error');
        return;
    }
    if (iBox == 1){
        sVorgabe = win.prompt("Wie sollen die Befehle benannt werden?", sVorgabe);
    }
    for (var i = 0; i < zellen.length; i++){
        var sPic = zellen[i].getElementsByTagName('img')[0].src;
        if(sPic.match("attack.png") || sPic.match("attack_small.png")){  
            var IncID = $(zellen[i]).attr('data-id');
            var editlabel = zellen[i].getElementsByClassName('quickedit-label')[0];
            var oldText = win.$.trim(editlabel.innerHTML);
            var neuText = sVorgabe.split("{old}").join(oldText);
            neuText=neuText.split("{id}").join(IncID);
            win.$(editlabel).attr('data-text', neuText);
            var editstyle = zellen[i].getElementsByClassName('quickedit-content')[0].style.display;
            var editbtn = zellen[i].getElementsByClassName('rename-icon')[0];
            if (editstyle != 'none') $(editbtn).click();
        }
    }
}
main();