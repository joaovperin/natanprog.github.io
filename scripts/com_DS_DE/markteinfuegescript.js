//Script API
ScriptAPI.register('89-Markt Einfügeskript', true, 'Phisa', 'skype:philippwinter11');
 
//Eigentliches Programm
if (wood > 0) {
        max_wood = $("a.wood").html().slice(1, wood.length - 1);
        if (max_wood < wood) {
                $("input[name|=wood]").val(wood);
        } else {
                Market.Modes.send.insertMax('wood');
                alert("Es ist nicht mehr die gewünschte Menge an Holz vorhanden! Es wurde die maximal mögliche Menge eingesetzt.")
        }
}
if (stone > 0) {
        max_stone = $("a.stone").html().slice(1, stone.length - 1);
        if (max_stone < stone) {
                $("input[name|=stone]").val(stone);
        } else {
                Market.Modes.send.insertMax('stone');
                alert("Es ist nicht mehr die gewünschte Menge an Lehm vorhanden! Es wurde die maximal mögliche Menge eingesetzt.")
        }
}
if (iron > 0) {
        max_iron = $("a.iron").html().slice(1, iron.length - 1);
        if (max_iron < iron) {
                $("input[name|=iron]").val(iron);
        } else {
                Market.Modes.send.insertMax('iron');
                alert("Es ist nicht mehr die gewünschte Menge an Eisen vorhanden! Es wurde die maximal mögliche Menge eingesetzt.")
        }
}
if (coord_fill) {
        $("input[name|=x]").val(x_coord);
        $("input[name|=y]").val(y_coord);
}
 
if (ok) {
        $("input[type|=submit]").click();
}