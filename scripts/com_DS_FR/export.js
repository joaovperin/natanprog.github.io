javascript:
var balise = document.getElementById('template_queue').getElementsByTagName('li');
var list = new Array();
var lvl = new Array();
var img = '<img src=\'https://i.gyazo.com/b4015f8f54c3a54552676b6c0eb7ab52.png\' style="position:absolute;top:0px;left:0px;z-index:5;">';
var js = '<script language="JavaScript" type="text/javascript">function copy(){var selection = document.getElementById(\'zone\');selection.select();document.execCommand( \'copy\' );}</script>';
var bouton = '<button name="copy" onclick="copy();" style="padding:10px;position:absolute;top:300px;left:370px;background-color:black;color:white;font-weight: bold;z-index:10;width:150px;border: solid 1px gold;font-size:20px;">Copier</button>';
var text = '<textarea id="zone" cols=65 rows=15 style="z-index:10;position:absolute;left:210px;top:30px;">javascript:\nvar buildings = [';

for (var i = 0; i < balise.length-1; i++) {
	list[i] = balise[i].getAttribute('data-building');
	lvl[i] = balise[i].getElementsByTagName('span')[0].innerHTML.replace(/[^0-9]*/,"");

	text = text + '\'' + list[i] + '\',';
	text = text + '\'' + lvl[i] + '\',';
}

var dernier_bat = balise[balise.length-1].getAttribute('data-building');
var dernier_lvl = balise[balise.length-1].getElementsByTagName('span')[0].innerHTML.replace(/[^0-9]*/,"");

text = text +  '\'' + dernier_bat + '\',' + '\'' + dernier_lvl + '\'' + '];\n$.getScript(\'https://media.innogamescdn.com/com_DS_FR/Scripts/Gestion/import.js\');void(0);</textarea>';

var popup = window.open("","","location=no,height=558,width=723,scrollbars=no,resizable=no,status=no");
popup.document.open('text/html','replace');
popup.document.write(img);
popup.document.write(text);
popup.document.write(js);
popup.document.write(bouton);
popup.document.close();
