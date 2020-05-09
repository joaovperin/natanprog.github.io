ScriptAPI.register( '99-Truppen einfügen / zurückziehen', true, 'Mausmajor', 'none' );

var units = ["spear","sword","axe","archer","spy","light","marcher","heavy","ram","catapult","knight","snob"];
for(var i=0;i<units.length;i++)
{
  if(document.getElementById("unit_input_"+units[i]))
  {
    var stehende_truppen =(document.getElementById("unit_input_"+units[i]).value);
    if(stehende_truppen =="")
    {
      stehende_truppen = 0;
    }
    var lassen = (stehen_lassen[i]);
    var differens = stehende_truppen-lassen;
    if(differens<0)
    {
      differens = 0;
    }
    insertUnit($('#unit_input_'+units[i]),differens);
    if(lassen == 0)
    {
      insertUnit($('#unit_input_'+units[i]),differens);
    }
  }
}
document.units.submit();