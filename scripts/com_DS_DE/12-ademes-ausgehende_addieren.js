ScriptAPI.register( '12-Befehle / Ausgehende addieren', true, 'Ademes', 'support-nur-im-forum@ademes.at' );
Scriptversion = 'MIT-Lizenz - Copyright (c) 2014 Ademes , Version 1.7'; 
if (top.frames.length > 1){
  var doc = (top.frames[1].document.URL.match('game.php') == 'game.php') ? top.frames[1].document : top.frames[0].document;
} else {
  var doc = document;
};
if (!doc.URL.match('mode=commands')){
  UI.InfoMessage('Du musst Dich in der Befehle-Übersicht befinden!',3000,true);
} else {
  ADS_Commands(doc);
};
function ADS_Commands(doc){
  var obj = new Array();
  var row = doc.getElementsByTagName('tr');
  var reg = /\(\d+\|\d+\) K\d+/;
  for (var i = 0; i < row.length; i++){
    if (row[i].className == 'nowrap  row_ax' || row[i].className == 'nowrap  row_bx' || row[i].className == 'nowrap  selected  row_ax' || row[i].className == 'nowrap  selected  row_bx'){
      var cell = row[i].getElementsByTagName('td');
      var span = cell[0].getElementsByClassName('quickedit-label')[0];
      var coord = reg.exec(span.innerHTML);
      var input = cell[0].getElementsByTagName('input')[0];
      input.parentNode.removeChild(input);			
      if (coord){
        var troups = new Array();
        for (var j = 3; j < cell.length; j++){
          troups[j-3] = parseInt(cell[j].innerHTML);					
        }
        if (obj[coord]){
          obj[coord][1]++;
          for (var j = 0; j < troups.length; j++){
            obj[coord][2][j] +=troups[j];
          }
          row[i].parentNode.removeChild(row[i]);
          i--;
        } else {
          obj[coord] = new Array(span,1,troups,cell);
        }
      } else {
        row[i].parentNode.removeChild(row[i]);
        i--;
      }
    }				
  }
  for (i in obj){
    if (obj[i][1] >= 1){
      obj[i][0].innerHTML = '<span style=\'color:green\'>(' + obj[i][1] + ')</span> ' + obj[i][0].innerHTML;
      obj[i][3][1].innerHTML = '1. ' + obj[i][3][1].innerHTML;
      obj[i][3][2].innerHTML = '1. ' + obj[i][3][2].innerHTML;
      for (var j = 0; j < obj[i][2].length; j++){
        obj[i][3][j+3].innerHTML = obj[i][2][j];
        obj[i][3][j+3].className = (obj[i][2][j] > 0) ? '' : 'hidden';
      }
    }
  }
};