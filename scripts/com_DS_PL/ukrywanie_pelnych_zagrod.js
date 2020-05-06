javascript:
if (game_data.screen=='overview_villages')
{
  if (game_data.mode!='prod');
  else
  {
    var wioski = $('#production_table')[0].rows;
    var i, len = wioski.length-1;
    var dx = 0;
    var zagroda = [];
    for (i=len;i>0;--i)
    {
      zagroda = wioski[i].cells[6].innerText.match(/\d+/g);
      if (zagroda[0] > 23000 && zagroda[0]==zagroda[1])
      {
        dx++;
        $(wioski[i]).closest('tr').remove();
      }
    }
    wioski[0].cells[1].innerText = "Wioska (" + (wioski[0].cells[1].innerText.match(/\d+/) - dx) + ")";
  }
}