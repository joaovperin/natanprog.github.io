/*Script API*/
ScriptAPI.register( '95-Angriffsplaner sortieren', true, 'Mausmajor', 'none' );
if(game_data.screen == "map")
{
  /*für die verschiedenen Sprchversionen das Argument*/
  var begriffe = {
                  de:{
                      inc: "Angriff",
                     },
                 dep:{
                      inc: "Angriff",
                     },
                  zz:{
                      inc: "Attack",
                     }
                  };              
  var mark = game_data.market; /*Sprachversion aus der game_data auslesen*/
  var inhalt = $('#warplanner_bb').html();/*Auslesen der Liste im Angriffsplaner*/
  var spieler = inhalt.split(/\n\n/); /*Nach leerzeilen SPliten und somit nach Spielern*/
  var text=[];
  for(var i=0;i<spieler.length;i++)
  {
    var rows = spieler[i].split(/\n/); /*Die nach Spielern gesplitteten blocks in Zeilen aufteilen*/
    var spieler_name = rows[0]; /*In der ersten Zeile des Blocks steht immer der Spielername dher wird der gesondert herausgezogen*/
    text.push("  ","  ",spieler_name);/*Leerfelder in das Array schiebn + den Spielernamen */
    var Fake=[];
    var Angriff=[];
    var Zaehler_Angriff=1;
    var Zaehler_Feke=1;
    /*
      restliche Zeilen des Blocks durchlaufen und prüfen ob Fake oder Angriff und dementsprechend in das Array schieben.
      zudem alle 5 Koordinaten eine leeres Feld ins Array um spätereine leerzeile zu produzieren.
      ferner wird gezählt wie viele Angriffe und Fakes von jedem Spieler geschickt werden damit die Dörfer druch
      nummerriert werden können.
    */
    for(var n=1;n<rows.length;n++)
    {
      var a =-1;
      var f =-1;
      if(rows[n].match(begriffe[mark]['inc']))
      {
        Angriff.push("("+Zaehler_Angriff+") "+rows[n]);
        Zaehler_Angriff +=1;
        if((Angriff.length-a) %6 ==0)
        {
          a++;
          Angriff.push(" ");
        }
      }else
      {
        Fake.push("("+Zaehler_Feke+") "+rows[n]);
        Zaehler_Feke+=1;
        if((Fake.length-f) %6 ==0)
        {
          f++;
          Fake.push(" ");
        }
      }
    }
    Angriff.push("  ");
    var doerfer = Angriff.concat(Fake); /*Angriffe und Fakes aneinander hängen*/
    text = text.concat(doerfer); /*Dem gesamt Text die Angriffe und Fakes anhängen*/
  }
  /*
    Wenn alle Spieler abgearbeitet wurden Zeilenumbrüche einfügen und wieder ins Feld schreiben
    + Feld focusieren und selectieren
  */
  $('#warplanner_bb').html(text.join("\n"));
  $('#warplanner_bb').focus();
  $('#warplanner_bb').select();
  stop();
}

