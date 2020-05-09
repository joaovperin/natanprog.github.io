window.ScriptAPI.register( '112-KirchenSimulator', true, 'Harpstennah', 'support-nur-im-forum@arcor.de' );
/* Version 1.0 */
b_SL_Kirche = typeof b_SL_Kirche != 'undefined' ? true : false;
if(game_data.screen=="map"){
    (function(){
        function gid(id){return document.getElementById(id);}
        /* ist centercoords_toggler ? */
        if(!gid('center_new_x')){ 
            var x = parseInt(gid('mapx').value,10);
            var y = parseInt(gid('mapy').value,10);
        }else{
            var x = parseInt(gid('center_new_x').value,10);
            var y = parseInt(gid('center_new_y').value,10);
        }
        var radius = parseInt(prompt("Wie groß soll der Kirchenradius sein (Felder)?",8),10);
        var addKirche = [x, y, radius*radius];
        var Anzahl = MapCanvas.churchData.length;
        if (!b_SL_Kirche){
            /* beim ersten Aufruf des Scriptes Kirche einmogeln */
            MapCanvas.churchData = MapCanvas.churchData.concat([addKirche]);
        }else{
            /* aktualisieren */ 
            MapCanvas.churchData[Anzahl-1] = addKirche;
        }
        TWMap.reload();
        })();
 }else{
    window.UI.InfoMessage("KirchenSimulator ist hier ohne Funktion" , 1000, 'error');
 };  