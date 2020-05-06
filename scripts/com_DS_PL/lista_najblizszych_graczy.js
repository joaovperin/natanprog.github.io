javascript: var Counter = 0; var Village = []; var Player = []; var Trible = []; var Ally = []; var Distance; var X; var Y; function ScriptRequest(Url) { Counter++; switch(Counter) { case 3: Url = '/map/tribe.txt'; break; case 4: Url = '/map/ally.txt'; break; case 2: Url = '/map/village.txt'; break; case 1: Url = 'interface.php?func=get_config'; break; } var Request = new XMLHttpRequest(); Request.onreadystatechange = function() { if(Request.readyState == 4 && Request.status == 200) { switch(Counter) { case 3: ScriptTrible(Request.responseText); break; case 4: ScriptAlly(Request.responseText); break; case 2: ScriptVillage(Request.responseText); break; case 1: ScriptPrepare(Request.responseXML); break; } } }; Request.open('GET', Url, true); Request.send(); } function ScriptTrible(Data) { Dialog.show('Script','Przetwarzanie informacji o graczach...'); var Players = Data.split("\n"); var i = Players.length - 1; while(i--) { Player[i] = Players[i].split(','); } for(i=0;i<Village.length;i++) { for(j=0;j<Player.length;j++) { if(Village[i][4] == Player[j][0]) { Village[i][4] = decodeURIComponent(Player[j][1]).split('+').join(' '); Village[i][5] = Player[j][2]; break; } } } ScriptRequest(Counter); Dialog.show('Script','Ładowanie informacji o plemionach...'); } function ScriptAlly(Data) { Dialog.show('Script','Przetwarzanie informacji o plemionach...'); var Tribles = Data.split("\n"); var i = Tribles.length - 1; while(i--) { Trible[i] = Tribles[i].split(','); } for(i=0;i<Village.length;i++) { for(j=0;j<Trible.length;j++) { if(Village[i][5] == Trible[j][0]) { Village[i][5] = decodeURIComponent(Trible[j][2]); break; } } } for(i = Village.length - 1;i >= 0;i--) { if(Ally.indexOf(Village[i][5].toLowerCase()) < 0) { Village.splice(i,1); } } var Text = ''; for(i=0;i<Village.length;i++) { Text = Text + Village[i][4] + ';'; if(i % 49 == 0 && i > 0) { Text = Text + '</textarea><textarea onclick="this.focus(); this.select();" style="width: 98%; margin: 0px auto 0px auto; border: 1px solid rgb(129, 66, 2);">'; } } Dialog.show('Script','<h2 align="center">Lista graczy</h2>W przypadku gdy lista zawiera wiecej niż 50 graczy zostaje ona podzielona na mniejsze listy z powodu ograniczeń w wysyłaniu wiadomości. <br><br><textarea onclick="this.focus(); this.select();" style="width: 98%; margin: 0px auto 0px auto; border: 1px solid rgb(129, 66, 2);">' + Text + '</textarea>'); } function ScriptVillage(Data) { Dialog.show('Script','Przetwarzanie informacji o wioskach...'); var Villages = Data.split("\n"); var i = Villages.length - 1; while(i--) { Village[i] = Villages[i].split(','); if(Village[i][4] == 0 || Village[i][4] == undefined || Distance < Math.sqrt(Math.pow(Village[i][2]-X,2)+Math.pow(Village[i][3]-Y,2))) { Village.splice(i,1); } else { for(j=i+1;j<Village.length;j++) { if(Village[i][4] == Village[j][4]) { Village.splice(i,1); break; } } } } ScriptRequest(Counter); Dialog.show('Script','Ładowanie informacji o graczach...'); } function ScriptSort(a, b) { if(a[4] === b[4]) { return 0; } else { return (a[4] < b[4]) ? -1 : 1; } } Dialog.show('Script','Koordynaty: <input type="text" id="ScriptCoordinates" placeholder="123|456" style="width: 50%; float: right; border: 1px solid rgb(129, 66, 2);" required><br><br>Za ile dotrze atak: <input type="text" id="ScriptTime" placeholder="1:12:34" style="width: 50%; float: right; border: 1px solid rgb(129, 66, 2);" required><br><br>Prędkość pomocy: <select id="ScriptSpeed" style="padding: 1px; width: 50%; float: right; border: 1px solid rgb(129, 66, 2);" required><option value="18">Pikinier</option><option value="22">Miecznik</option><option value="18">Topornik</option><option value="18">Łucznik</option><option value="9">Zwiadowca</option><option value="10">Lekki kawalerzysta</option><option value="10">Łucznik na koniu</option><option value="11">Ciężki kawalerzysta</option><option value="30">Taran</option><option value="30">Katapulta</option><option value="10">Rycerz</option><option value="35">Szlachcic</option></select><br><br><textarea id="ScriptAlly" placeholder="Lista skrótów plemion oddzielona spacją" style="width: 96%; margin: 0px auto 0px auto; border: 1px solid rgb(129, 66, 2);" required></textarea><br><br><button type="button" onclick="ScriptButton()" style="border-radius: 5px; border: 1px solid #000; color: #fff; background: linear-gradient(to bottom, #947a62 0%,#7b5c3d 22%,#6c4824 30%,#6c4824 100%)">Generuj listę</button>'); function ScriptPrepare(Data) { Distance *= Data.getElementsByTagName('speed')[0].childNodes[0].nodeValue*Data.getElementsByTagName('unit_speed')[0].childNodes[0].nodeValue; ScriptRequest(Counter); Dialog.show('Script','Ładowanie informacji o wioskach...'); } function ScriptButton() { X = document.getElementById('ScriptCoordinates').value.substring(0,document.getElementById('ScriptCoordinates').value.indexOf('|')); Y = document.getElementById('ScriptCoordinates').value.substring(document.getElementById('ScriptCoordinates').value.indexOf('|') + 1); var Time = document.getElementById('ScriptTime').value.split(':'); Ally = document.getElementById('ScriptAlly').value.split(' '); for(i=0;i<Ally.length;i++) { Ally[i] = Ally[i].toLowerCase(); } if(Time.length == 3) { Distance = (parseInt(Time[0])*60+parseInt(Time[1]))/document.getElementById('ScriptSpeed').value; ScriptRequest(Counter); } else if(Time.length == 2) { Distance = Time[0]/document.getElementById('ScriptSpeed').value; ScriptRequest(Counter); } else { Dialog.show('Script','Podano błędny czas'); } }