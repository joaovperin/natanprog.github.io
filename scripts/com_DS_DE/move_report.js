/*Script API*/
ScriptAPI.register( '111-Berichte verschieben', true, 'Mausmajor', 'none' );
function move(){
    /*prüfen ob der User auf der richtigen Seite ist*/
    if(game_data.screen == "report"){
        /*prüfen ob die Variable Gruppenname deklariert ist wenn nicht Fehlermeldung+beenden*/
        if(typeof(Gruppenname) == "undefined" || Gruppenname == ""){
                    UI.InfoMessage('Es wurde keine Gruppenname angegeben',3000,true);
                    return;
        }
        /*Deklaration der Typen. Suchbegriffe in den Icon-urls*/
        var icons = {
            Pala: "knight.png",
            AG: "snob.png",
            Farm: "farm.png",
            UT: "support.png",
            Angriff_large: "attack_large.png",
            Angriff_medium: "attack_medium.png",
            Angriff_small: "attack_small.png",
            OFF: "command/attack"
        };
        /*prüfen ob die Variable Typ deklariert ist wenn nicht Fehler + Beenden*/
        if(typeof (Typ) == "undefined"){
            UI.InfoMessage('Es wurde kein Typ angegeben!',3000,true);
            return;
        }
        /*prüfen ob der angegbene Typ einem icon zugeordnet ist wennnicht Fehler + Beenden*/
        if(typeof(icons[Typ]) == "undefined"){
                    UI.InfoMessage('Dieser Typ existiert nicht!',3000,true);
                    return;
        }
        var group_id;
        /*Herrausfinden der Gruppen_Id*/
        $('select[name="group_id"] option').each(function(){
            if($(this).text()==Gruppenname){
                group_id = $(this).val();
            }
        });
        /*Wenn Gruppen_Id definiert dann alle Berichte
         *  deselektieren danach die das passende Icon
         *  haben selektieren und verschieben.
         *  Ansonnsten Fehler*/
        if(group_id != undefined){
            $('#report_list input[type="checkbox"]:not(.selectAll)').prop( "checked" , false);
            $('#report_list .float_right img[src*="'+icons[Typ]+'"]').parent().parent().parent().find('input[type="checkbox"]').prop( "checked" , true);
            $('select[name="group_id"]').val(group_id).next().click();
        }else{
            UI.InfoMessage('Es wurde keine Gruppe gefunden bzw du bist in der Ziel-Gruppe',3000,true);
        }
    }else{
        UI.InfoMessage('Du musst dich auf der bei den Berichten befinden!',3000,true);
    }
}
move();