if (!(document.URL.match('screen=info_player')))
   die('O script apenas funcionar\u00E1 no perfil de um jogador.');
try
{
   if (typeof(claim) != 'boolean')
      claim = false;
}
catch(e)
{
   claim = false;
}
var maxParentheses = 975;
var xmin = 0;
var xmax = 999;
var ymin = 0;
var ymax = 999;
var vil = document.getElementById('menu_row2');
var vcurrent;
if (vil !== null)
   vcurrent = vil.getElementsByTagName('b')[0].innerHTML.match(/\d{1,3}\|\d{1,3}/);
else
   vcurrent = '500|500';
var vtarget = prompt('Qual a aldeia que pretende centrar?\n\nUtilize o formato 123|456\n\nSe n\u00E3o quiser nenhuma, fa\u00E7a click no bot\u00E3o OK.', vcurrent);
if (vtarget === null)
   die();
if (!vtarget.match(/^\d{1,3}\|\d{1,3}$/))
   die('Coordenadas ' + vtarget + ' inv\u00E1lidas\n\nDeve utilizar o formato 123|456');
var vtargetx = vtarget.match(/^\d{1,3}/) * 1;
var vtargety = vtarget.match(/\d{1,3}$/) * 1;
var radius = prompt('Qual o raio que pretende?\n\nUtilize 0 (zero) para todas as aldeias do jogador\n', 0);
if (radius === null)
   die();
if (!radius.match(/^\d{1,3}$/))
   die('Raio ' + radius + ' inv\u00E1lido\n\nDeve utilizar um valor num\u00E9rico (ex: 5)');
var out2 = '';
radius = radius * 1;
if (radius > 0)
{
   var outRadius = radius * 2 + 1;
   out2 = 'Centrando em [coord]' + vtarget + '[/coord], lista de aldeias numa \u00E1rea de ' + outRadius + 'x' + outRadius + ' campos (raio ' + radius + ')\n\n';
   xmin = vtargetx - radius;
   xmax = vtargetx + radius;
   ymin = vtargety - radius;
   ymax = vtargety + radius;
}
var playerName = document.getElementsByTagName('h2')[0].innerHTML.toString();
var out1 = '>>> [player]' + playerName.trim() + '[/player]\n\n';
var out3 = '';
var outraw = '';
var tbr = document.getElementById('villages_list');
var tb = tbr.rows;
var num = 0;
var arr = [];
for (var ix = 1; ix < tb.length; ix++)
   if (tb[ix].getElementsByTagName('td')[1])
   {
      var coords = tb[ix].getElementsByTagName('td')[1].innerHTML;
      var coordx = coords.match(/^\d{1,3}/) * 1;
      var coordy = coords.match(/\d{1,3}$/) * 1;
      if (coordx >= xmin && coordx <= xmax && coordy >= ymin && coordy <= ymax)
      {
         num++;
         var pts = tb[ix].getElementsByTagName('td')[2].innerHTML.toString();
         if (pts.match(/</))
            pts = pts.match(/^\d{1,2}/) + '.' + pts.match(/\d{1,3}$/);
         arr.push([num, coordx, coordy, pts]);
      }
   }
   else
      alert('ATEN\u00C7\u00C3O, lista incompleta!!\n\nPara ver a lista na totalidade carregue no link, em baixo:\n\n\u00BB' + tb[ix].getElementsByTagName('a')[0].innerHTML + '\u00AB');
var list = 1;
var outList = '';
var exceeds = false;
var popup = openWindow();
for (var ix = 0; ix < arr.length; ix++)
{
   if (countChar(out1 + out2 + out3 + 10, '[') > maxParentheses)
   {
      if (list == 1)
         exceeds = true;
      outList = 'Lista ' + list + '\n\n';
      out3 = '[spoiler][table][**]#[||]Aldeia[||]Pontos[||]Notas[/**]\n' + out3 + '[/table]\n[spoiler] ' + outraw + ' [/spoiler][/spoiler]\n';
      printOut(popup, list, outList + out1 + out2 + out3);
      out3 = '';
      outraw = '';
      list++;
   }
   num = arr[ix][0];
   coordx = arr[ix][1];
   coordy = arr[ix][2];
   pts = arr[ix][3];
   if (claim)
      out3 += '[*]' + num + '[|][claim]' + coordx + '|' + coordy + '[/claim][|]' + pts + '[|]\n';
   else
      out3 += '[*]' + num + '[|][coord]' + coordx + '|' + coordy + '[/coord][|]' + pts + '[|]\n';
   if (outraw !== '')
      outraw += ' ';
   outraw += coordx + '|' + coordy;
}
if (out3 !== '')
{
   if (list > 1)
      outList = 'Lista ' + list + '\n\n';
   out3 = '[spoiler][table][**]#[||]Aldeia[||]Pontos[||]Notas[/**]\n' + out3 + '[/table]\n[spoiler] ' + outraw + ' [/spoiler][/spoiler]\n';
}
else
   out3 = 'N\u00E3o foram encontradas aldeias.\n';
if (exceeds)
   alert('ATEN\u00C7\u00C3O\n\nForam encontradas ' + arr.length + ' aldeias e, por haver limite de\npar\u00EAnteses em cada t\u00F3pico no f\u00F3rum (m\u00E1x. 1000),\nv\u00E3o ser produzidas v\u00E1rias listas.\n\nPrepare-se para fazer copy/paste de cada uma delas.');
printOut(popup, list, outList + out1 + out2 + out3);
popup.focus();
die();

function printOut(popup, lista, out)
{
   popup.document.write('<form name="select_all">');
   popup.document.write('<input type="button" value="Highlight Text (lista ' + lista + ')" onClick="javascript:this.form.text_area.focus();this.form.text_area.select();"><br>');
   popup.document.write('<textarea name="text_area" rows="10" cols="60" style="backgound-color:#FFFFCC">');
   popup.document.write(out + '\n');
   popup.document.write('</textarea>');
   popup.document.write('</form>');
}

function countChar(str, char)
{
   return str.split(char).length;
}

function openWindow()
{
   var popup = window.open('', 'Comandos', 'status=0,toolbar=0,width=600,height=500,scrollbars=1');
   popup.moveTo(10, 10);
   popup.document.body.innerHTML = '';
   popup.scrollTo(0, 0);
   popup.document.write('<h2>Script: Lista de aldeias de um jogador.</h2>\n');
   return popup;
}

function die(msg)
{
   if (msg !== undefined)
      alert(msg);
   throw '';
}