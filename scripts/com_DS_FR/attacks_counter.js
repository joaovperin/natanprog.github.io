javascript:

var responses = [];
var ids = [];
var coords = [];
var vlist = $('#villages_list');
var trs = vlist.find('tbody tr');
Http = new XMLHttpRequest();

//getcoords
for(i=0;i<trs.length;i+=2) {
	if(document.getElementsByClassName('command-attack-ally')[0] != undefined || document.getElementsByClassName('command-attack')[0] != undefined) {
		temp = trs[i].getElementsByTagName('td')[4].innerText;
		temp = temp.replace("|",";");
		coords.push(temp);
	}else{
		temp = trs[i].getElementsByTagName('td')[3].innerText;
		temp = temp.replace("|",";");
		coords.push(temp);
	}
}


var villageList = document.getElementsByClassName('village_anchor');

//getids
for(i=0;i<villageList.length;i++) {
	ids.push(villageList[i].getAttribute('data-id'));
}

var link = location.href;
var world = link.substring(8,12);


url = 'https://'+world+'.guerretribale.fr/game.php?screen=info_village&id='+ids[0]+'#'+coords[0];
var cpt = 0;


function tryRequest(numAttempts,url) {
  var responseStatus = 404;
  var request = new XMLHttpRequest(); 

  request.open('GET', url, true);
  request.onreadystatechange = function(){
      if (request.readyState === 4){
          responseStatus = request.status;
          if (request.status == 200) {  
              //console.log("working on village number " + numAttempts);
              responses.push(request.response);
              if(cpt < ids.length-1) {
              	cpt++;
			    temp = 'https://'+world+'.guerretribale.fr/game.php?screen=info_village&id='+ids[cpt]+'#'+coords[cpt];
                tryRequest(numAttempts + 1,temp);
              }else {
              	endCalcul();
              }
          }  
      }
  };
  cpt2 = cpt+1;
  UI.SuccessMessage('Patientez...  '+cpt2+"/"+coords.length, 1000);
  request.send();
}

tryRequest(0,url);


var somme = 0;

function endCalcul() {
	var patt = /data-icon-hint="Attaque.*data-command-type="attack"/g;

	for(i=0;i<villageList.length;i++) {
		result = [];
		while ((match = patt.exec(responses[i])) != null) {
			result.push(match[0]);
		}
		if(result != []) {
			somme += result.length;
		}
	}
	//console.log("Compteur : "+ somme);
	if(somme < 100) alert("Ce joueur a un compteur à "+somme+"\n\nTu peux faire beaucoup mieux !");
	if(somme >= 100 && somme < 500) alert("Ce joueur a un compteur à "+somme+"\n\nTu peux mieux faire, un petit effort...");
	if(somme >= 500 && somme < 1000) alert("Ce joueur a un compteur à "+somme+"\n\nCa commence a être pas trop mal...");
	if(somme >= 1000 && somme < 3000) alert("Ce joueur a un compteur à "+somme+"\n\nLa on est d'accord ! Beau travail !");
	if(somme >= 3000) alert("Ce joueur a un compteur à "+somme+"\n\nT'es dans le futur !");
}