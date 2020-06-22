var doc=(window.frames.length>0)?window.main.document:window.document; 
	if (game_data.screen == 'overview_villages' && (game_data.mode=='combined' || game_data.mode=='prod' || game_data.mode=='units' || game_data.mode=='buildings' ) )
	{
  var i=0;
  var str="";
  var indexChrono=0;
  var maxIndeChrono=0;
  
	// Récupère la chaine du type (xxx|yyy)
	function getBBCode(myString) {
		return new RegExp("[0-9]{1,3}[\|][0-9]{1,3}").exec(myString);
	}
	// Supprime la pollution en début et fin de chaine
	function customTrim(x)
	{
		return x.replace(/^\s+|\s+$/gm,'');
	}
	// Extrait le premier nombre (coordonnées)
 	function getX(bbCode) {
 		return new RegExp("[0-9]{1,3}").exec(bbCode);
 	}

	// Extrait le deuxième nombre (coordonnées)
 	function getY(bbCode) {
 		return new RegExp("[0-9]{1,3}$").exec(bbCode);
 	}
 	// Concatène deux chaine en intercalant un espace si nécessaire
 	function FFConcatEspace(chaine1,chaine2)
	{
		if((chaine1.length>0) && (chaine2.length>0))
		{
			return ((chaine1[-1]!=" ") && (chaine2[0]!=" "))?chaine1+" "+chaine2:chaine1+chaine2;
		} else {
				return chaine1+chaine2;
		}	
	}
	
	// Formate un nombre en ajoutant des '0' devant (maxi 10 digits)
	function FFAjouteZeros(nombre,nb_digits)
	{
		var ret="0000000000"+nombre;
		return ret.slice(-nb_digits);
	}
	
	// Crée une chaine de démonstration
	function FFpreview()
	{
		var nv="Mon Village (551|449) C45";
		var coords_str = nv.substring(nv.lastIndexOf("("),nv.length);
		doc.getElementById('FFexemple').value=FFConstruitNom(nv,doc.getElementsByName('val01')[0].value) + " " + coords_str; 
	};
	
	// Transforme un nom de village en fonction des paramètres
	// Le Nom de Village doit contenir les coordonnées sous la forme (xxx|yyy)
	function FFConstruitNom(nv,clef)
	{
		// Sépare le nom des coordonnées
		var nomv = nv.substring(0,nv.lastIndexOf("(")-1);
		var coords_str = nv.substring(nv.lastIndexOf("("),nv.length);
		var str_result = "";
		var bbCode = getBBCode(nv);
		var xv = getX(bbCode);
		var yv = getY(bbCode);
		var xv0 = 500;
		var yv0 = 500;
		var bbCode = getBBCode(doc.getElementsByName('val04')[0].value);
		if(bbCode==null)
		{
			if(doc.getElementById('FFcb4').checked) {
				UI.ErrorMessage("Distance : Coordonnées invalides. Utilisation de '500|500' par défaut."); } 
		} else {
			var xv0 = getX(bbCode);
			var yv0 = getY(bbCode);
		}
		var c = Math.floor(yv/100)*10+Math.floor(xv/100);
		var rows = doc.getElementById('FF_param_table').rows;
		var changemode = doc.getElementById('FF_Mode_Renommage').value;
		for(i=0; i<rows.length; i++)
		{
			if(rows[i].cells[0].firstChild.checked)
			{
				switch(rows[i].cells[0].firstChild.id)
				{
					case "FFcb1":
						var num_str = FFAjouteZeros(clef,doc.getElementsByName('FFdigits')[0].value);
						str_result = FFConcatEspace(str_result,num_str);
					break;
					case "FFcb2":
						str_result = FFConcatEspace(str_result,doc.getElementsByName('val02')[0].value+c);
						break;
					case "FFcb3":
						var xx1 = Math.floor(yv/10) - (Math.floor(yv/100) * 10);
						var xx2 = Math.floor(xv/10) - (Math.floor(xv/100) * 10);
						var yy1 = yv%10;
						var yy2 = xv%10;
						var CCxxyy = FFAjouteZeros(c,2) + FFConcatEspace(str_result,doc.getElementsByName('val03')[0].value) + xx1+xx2 + FFConcatEspace(str_result,doc.getElementsByName('val03')[0].value) + yy1 + yy2  ; /* 561|409 on doit avoir 45 06 91 */
						str_result = FFConcatEspace(str_result,CCxxyy);
					break;
					case "FFcb4":
						var xr = Math.floor(Math.random()*1000);
						var yr = Math.floor(Math.random()*1000);
						str_result = FFConcatEspace(str_result,"("+xr+"|"+yr+")");
						break;
					case "FFcb5":
						var dist = FFAjouteZeros(Math.round(Math.sqrt(Math.pow(xv0-xv,2)+Math.pow(yv0-yv,2))),4);
						str_result = FFConcatEspace(str_result,dist);
					break;
					case "FFcb6":
						str_result = FFConcatEspace(str_result,doc.getElementsByName('val05')[0].value);
						break;
					case "FFcb7":
						str_result = FFConcatEspace(str_result,doc.getElementsByName('val06')[0].value);
						break;
					case "FFcb8":
						str_result = FFConcatEspace(str_result,doc.getElementsByName('val07')[0].value);
						break;
				}
				
			}
		}

		// Préfixe, remplace, suffixe ?
		switch(changemode)
		{
			case "mode1":
				str_result = FFConcatEspace(str_result,nomv);
				break;
			case "mode2":
				break;
			case "mode3":
				str_result = FFConcatEspace(nomv,str_result);
				break;
		}
		
		return str_result;
	}

	// Renomme les villages
	function FFRenommeVillages()
	{
		try{
			var j=0;
			var newName='';
			var averti=false;
			var clef=parseInt(doc.getElementsByName('val01')[0].value);
			var gadgets=doc.getElementsByClassName('quickedit-vn');
			var noms=doc.getElementsByClassName('quickedit-label');
			for(j=0;j<gadgets.length;j++){
				$(gadgets[j]).find('.rename-icon').click();
				var enter=gadgets[j].children[1].children[0];
				newName = customTrim(noms[j].innerHTML);
				if(newName.length>32) {
					if(averti==false) {
						UI.ErrorMessage("Certains noms dépassent 32 caractères. Ils seront tronqués.");
						averti=true;
					}
					newName=newName.substring(0,32);
				}
				$(gadgets[j]).find('input[type=text]').val(FFConstruitNom(newName,clef));
				clef += 1;
			}
			maxIndexChrono=gadgets.length;
			FFClickASync();
		}catch(e){alert(e);}
	}
	// Clique sur un bouton avec délai
	function FFClickASync()
	{
		var gadgets=doc.getElementsByClassName('quickedit-vn');
		$(gadgets[indexChrono]).find('input[type=button]').click();
		indexChrono+=1;
		if(indexChrono<maxIndexChrono)
		{
			setTimeout(function () { FFClickASync() } ,delai );
		}
	}
	// Mémorise les paramètres
	function FFsauveParametres()
	{
		var FFrowOrdre = new Array();
		var FFcbChecked = new Array();
		var FFboxText = new Array();
		var FFmodeRenom=$('#FF_Mode_Renommage').prop('selectedIndex');
		var rows = doc.getElementById('FF_param_table').rows;
		
		if(typeof localStorage!='undefined')
		{
			for(i=1;i<=rows.length;i++)
	  	{
	   		FFrowOrdre[i] = parseInt(/([0-9]+)/.exec(rows[i-1].cells[0].firstChild.id));
	   		FFcbChecked[i] = $("#FFcb"+i).prop('checked');
	  	}
	  	
	  	for(i=1;i<8;i++)
				FFboxText[i]=$("#FFbox"+i).prop('value');
				
			// Mémorise les valeurs
			localStorage['FFrowOrdre']=JSON.stringify(FFrowOrdre);
			localStorage['FFcbChecked']=JSON.stringify(FFcbChecked);
			localStorage['FFboxText']=JSON.stringify(FFboxText);
			localStorage['FFmodeRenom']=JSON.stringify(FFmodeRenom);
			UI.SuccessMessage('Paramètres mémorisés.', 1000);
		}
	}
	
	
	
	// Affiche le haut de la page
	doc.body.scrollTop = doc.documentElement.scrollTop = 0;
	var FFrowOrdre=new Array();
	var FFcbChecked=new Array();
	var FFboxText=['0','1','3','C','500|500','~','~',':','~'];
	var FFmodeRenom=1;
	var sauvegardePossible=false;
	
	// Config par défaut
	for(i=1;i<9;i++)
  {
   	FFrowOrdre[i] = i;
   	FFcbChecked[i] = false;
  }
     			
	// Teste si on peut sauvegarder des données de config 
	if(typeof localStorage=='undefined')
  {
		UI.ErrorMessage("Mémorisation des paramètres non supportée par ce navigateur.",2000);   
	}else{
		sauvegardePossible=true;
		// Lecture des paramètres mémorisés
		if(localStorage.getItem('FFrowOrdre')) {
 				FFrowOrdre=JSON.parse(localStorage['FFrowOrdre']); }
		if(localStorage.getItem('FFcbChecked')) {
 				FFcbChecked=JSON.parse(localStorage['FFcbChecked']); }
		if(localStorage.getItem('FFboxText')) {
 				FFboxText=JSON.parse(localStorage['FFboxText']); }
		if(localStorage.getItem('FFmodeRenom')) {
 				FFmodeRenom=JSON.parse(localStorage['FFmodeRenom']); }
	}
 		
   // Iteration principale

	// Dessine l'interface
	if(doc.getElementById('FFa3')==null)
	{
		var interStr = new Array();
		var FFrowsStr = '';
		var FFrowStyle = '<tr style="background-image: url(&quot;http://cdn.guerretribale.fr/8.20/20120/graphic/index/main_bg.jpg?1b7f4&quot;);"> <td style="width: 20px; height: 25px;">';
		interStr[0]='<div style="left: 624px; width: 500px;" id="FFa3"> <table id="FF_entete_table" style="background-color: #dfcca6; height: 23px; width: 100%;" border="0" cellpadding="0" cellspacing="0"> <tbody> <tr> <td style="background-color: #dfcca6; font-weight: bold; font-size: 14pt; cursor: move;">Renommer mes villages<span style="float: right;" id="FFnarcisse"><span style="font-weight: bold;">Franticfranz</span><br> v1.1</span> </td> <td style="width: 25px; margin-left: 182px; text-align: right;"><img alt="X" src="http://www.guerretribale.fr/graphic/login_close.png" onclick="javascript:$(\'#FFa3\').remove();"><br> </td> </tr> </tbody> </table> <br> <form method="POST" action="" name="FFrenommer_form">Exemple : <input id="FFexemple" value="---" size="40" readonly="readonly" name="FFexemple" type="text"><br> <br> <table id="FF_param_table" style="width: 100%;" border="0" cellpadding="0" cellspacing="2"> <tbody> ';
		interStr[1]=FFrowStyle+'<input id="FFcb1" type="checkbox"><br> </td> <td> <table style="width: 100%;" border="0" cellpadding="0" cellspacing="0"> <tbody> <tr> <td style="width: 50%;">Démarrer à :<br> <div style="text-align: center; width: 107px;"><input id="FFbox1" size="5" name="val01" type="text"> </div> </td> <td>Nb de Chiffres :<br> <div style="text-align: center;"><input id="FFbox2" step="1" max="10" min="1" name="FFdigits" size="2" type="number"></div> </td> </tr> </tbody> </table> </td> <td style="height: 48px; margin-left: -44px;">Numéroter les villages<br> </td> <td class="ui-sortable" style="background-color: #fff5da; text-align: center; cursor: move; height: 48px; margin-left: -106px;"><img alt="+" src="http://cdn.guerretribale.fr/8.20/20120/graphic/sorthandle.png?8838f"> </td> </tr> ';
		interStr[2]=FFrowStyle+'<input id="FFcb2" type="checkbox"></td> <td><input id="FFbox3" name="val02" type="text"><br> </td> <td style="margin-left: -105px;">Insérer numéro de continent<br> </td> <td class="ui-sortable" style="background-color: #fff5da; text-align: center; cursor: move;"><img alt="+" src="http://cdn.guerretribale.fr/8.20/20120/graphic/sorthandle.png?8838f"> </td> </tr> ';
		interStr[3]=FFrowStyle+'<input id="FFcb3" type="checkbox"></td> <td><input id="FFbox7" size="20" name="val03" type="text"> </td> <td>Insérer "CC:XX:YY" (CC=continent)<br> </td> <td class="ui-sortable" style="background-color: #fff5da; text-align: center; cursor: move;"><img alt="+" src="http://cdn.guerretribale.fr/8.20/20120/graphic/sorthandle.png?8838f"> </td> </tr> ';
		interStr[4]=FFrowStyle+'<input id="FFcb4" type="checkbox"></td> <td><br> </td> <td>Coordonnées aléatoires</td> <td class="ui-sortable" style="background-color: #fff5da; text-align: center; cursor: move;"><img alt="+" src="http://cdn.guerretribale.fr/8.20/20120/graphic/sorthandle.png?8838f"> </td> </tr> ';
		interStr[5]=FFrowStyle+'<input id="FFcb5" type="checkbox"></td> <td><input id="FFbox4" name="val04" type="text"> </td> <td> Distance d\'un village</td> <td class="ui-sortable" style="background-color: #fff5da; text-align: center; cursor: move;"><img alt="+" src="http://cdn.guerretribale.fr/8.20/20120/graphic/sorthandle.png?8838f"> </td> </tr> ';
		interStr[6]=FFrowStyle+'<input id="FFcb6" type="checkbox"></td> <td><input id="FFbox5" size="20" name="val05" type="text"> </td> <td>Texte 1</td> <td class="ui-sortable" style="background-color: #fff5da; text-align: center; cursor: move;"><img alt="+" src="http://cdn.guerretribale.fr/8.20/20120/graphic/sorthandle.png?8838f"> </td> </tr> ';
		interStr[7]=FFrowStyle+'<input id="FFcb7" type="checkbox"></td> <td><input id="FFbox6" name="val06" type="text"> </td> <td> Texte 2 </td> <td class="ui-sortable" style="background-color: #fff5da; text-align: center; cursor: move;"><img alt="+" src="http://cdn.guerretribale.fr/8.20/20120/graphic/sorthandle.png?8838f"> </td> </tr> ';
		interStr[8]=FFrowStyle+'<input id="FFcb8" type="checkbox"></td> <td style="height: 10px;"><input id="FFbox8" name="val07" type="text"> </td> <td style="height: 10px;">Texte 3 </td> <td class="ui-sortable" style="background-color: #fff5da; text-align: center; cursor: move; height: 10px;"><img alt="+" src="http://cdn.guerretribale.fr/8.20/20120/graphic/sorthandle.png?8838f"> </td> </tr>';
		interStr[9]='</tbody> </table> <div style="text-align: center;"> <br> Méthode: <select id="FF_Mode_Renommage" name="FF_Mode_Renommage"> <option value="mode1">Ajouter avant le nom</option> <option value="mode2">Remplacer le nom</option> <option value="mode3">Ajouter après le nom</option> &nbsp; </select> &nbsp; <input value="Mémoriser" id="FFsauver" type="button"> <input id="Confirme-btn" value="Renommer mes villages" name="renomme" type="button"></div> </form> <br> </div>';
   	for(i=1;i<9;i++)
   	{
   		FFrowsStr+=interStr[FFrowOrdre[i]];
   	}
		$("head").append('<style type="text/css">#Confirme-btn {  background-color: transparent;  background-image: -webkit-linear-gradient(bottom, #947a62 0%, #7b5c3d 22%, #6c4824 30%, #6c4824 100%); background-image: -o-linear-gradient(bottom, #947a62 0%, #7b5c3d 22%, #6c4824 30%, #6c4824 100%); background-image: -ms-linear-gradient(bottom, #947a62 0%, #7b5c3d 22%, #6c4824 30%, #6c4824 100%); background-image: -moz-linear-gradient(bottom, #947a62 0%, #7b5c3d 22%, #6c4824 30%, #6c4824 100%); background-image: linear-gradient(to bottom, #947a62 0%, #7b5c3d 22%, #6c4824 30%, #6c4824 100%);  background-repeat: repeat;  background-attachment: scroll;  background-position: 0px 0px;  border-top-width: 1px;  border-right-width: 1px;  border-bottom-width: 1px;  border-left-width: 1px;  border-top-style: solid;  border-right-style: solid;  border-bottom-style: solid;  border-left-style: solid;  border-top-color: black;  border-right-color: black;  border-bottom-color: black;  border-left-color: black;  border-radius: 5px 5px 5px 5px;  color: white;  cursor: pointer;  display: inline-block;  font-family: Verdana, Arial;  font-size: 12px;  font-weight: bold;  line-height: normal;  margin-top: 0px;  margin-right: 2px;  margin-bottom: 0px;  margin-left: 2px;  padding-top: 3px;  padding-right: 3px;  padding-bottom: 3px;  padding-left: 3px;  text-align: center;  white-space: nowrap;}#FFa3 {  display: block;  z-index: 99999;  border-top-style: ridge;  border-right-style: ridge;  border-bottom-style: ridge;  border-left-style: ridge;  border-top-color: brown;  border-right-color: brown;  border-bottom-color: brown;  border-left-color: brown;  background-color: #f7eed3;  width: 650px;  font-family: Arial, Helvetica, sans-serif;  padding-left: 2px;  padding-right: 2px;  background-image: url("http://cdn.guerretribale.fr/8.20/20120/graphic/background/bg-tile.jpg?27a8b");  position: absolute;  left: 35%;  top: 10%;  font-size: small;}#FFnarcisse {  float: right;  font-size: 7pt;  font-family: Arial, Helvetica, sans-serif; text-shadow: 2px 2px 1px #996633;  font-variant: small-caps;}#FF_content_table {  background-image: url("http://cdn.guerretribale.fr/8.20/20120/graphic/index/main_bg.jpg?1b7f4");}#FF_draggable_cursor {  cursor: move;}#FFrow {  background-image: url("http://cdn.guerretribale.fr/8.20/20120/graphic/index/main_bg.jpg?1b7f4");  border-top-width: 1px;  border-right-width: 1px;  border-bottom-width: 1px;  border-left-width: 1px;  border-top-style: solid;  border-right-style: solid;  border-bottom-style: solid;  border-left-style: solid;  border-top-color: black;  border-right-color: black;  border-bottom-color: black;  border-left-color: black;}#FF_param_table {  border-top-width: 1px;  border-right-width: 1px;  border-bottom-width: 1px;  border-left-width: 1px;  border-top-style: solid;  border-right-style: solid;  border-bottom-style: solid;  border-left-style: solid;  border-top-color: #cc0000;  border-right-color: #cc0000;  border-bottom-color: #cc0000;  border-left-color: #cc0000;}</style>'); 
		$("body").append(interStr[0]+FFrowsStr+interStr[9]); 
	}
	// Gestion des évènements
	$('#FF_param_table > tbody').sortable({
    refreshPositions: true,
    opacity: 0.6,
    scroll: true,
    containment: 'parent',
    placeholder: 'ui-placeholder',
    tolerance: 'pointer',
    'start': function (event, ui) {
      ui.placeholder.html("<td colspan='6'><hr></td>")}});
	$('#FF_param_table > tbody').on('sortstop', function(){FFpreview();});
	$("#FFa3").draggable({ containment:"html", handle:"#FF_entete_table" }); 
	$("#Confirme-btn").click( function(){FFRenommeVillages();});
	for(i=1;i<9;i++) {
		$("#FFcb"+i).prop('checked',FFcbChecked[i]);
		$("#FFcb"+i).change(function(){FFpreview();});
	}
	for(i=1;i<8;i++) {	
		str = "#FFbox"+i;
		$(str).prop('value',FFboxText[i]);
		$(str).keyup(function(){FFpreview();});
	}
	$('#FF_Mode_Renommage').prop('selectedIndex',FFmodeRenom);
	$('#FF_Mode_Renommage').change(function(){FFpreview();});
	if(sauvegardePossible) {
		$('#FFsauver').click(function(){ FFsauveParametres(); });
	} else {
		$('#FFsauver').prop('disabled',true);
	}

	FFpreview();
	// On redonne la main
	//void(0);

	} else {
		UI.ErrorMessage("Ce script doit être lancé depuis un écran d'aperçu avec une liste de villages.");
		void(0);
	}