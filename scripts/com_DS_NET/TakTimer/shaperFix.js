deactivationSwitch = 0;
function run(sameVillage, type, catLevel)
   {var doc = (window.frames.length > 0) ? window.main.document: document;
    debug("Cascade version: 1.1.06\n Farm Assitant Update by File Not Found");
    debug("Browser: " + navigator.userAgent);
    debug("Url: " + window.location);
    var arrLanguage =['Level', 'Attacker:', 'Defender:', 'commands', 'Give commands'];
    var arrBuildings =["Village Headquarters", "Barracks", "Stable", "Workshop", "Academy", "Smithy", "Rally point", 
      "Statue", "Market", "Farm", "Wall"];
    if(typeof custom_order == "undefined"){custom_order = false;}
    if (custom_order){arrBuildings = arrCustomOrder;}
    try 
       {var arrLang = location.hostname.split('.');
        var strLang = arrLang.pop();
        var strLang2 = arrLang.pop();
        var strLang3;
        if (arrLang.length > 1){strLang3 = arrLang[1]; arrLang = arrLang[0]; strLang = strLang2; strLang2 = strLang3;}
        if (strLang == 'se' || strLang == 'no')
           {var arrLanguage =['Niv�', 'By:', 'F�rsvarare:', 'Anfallare:', 'kommando', 'Ge kommando'];
            var arrBuildings =["H�gkvarter", "Barack", "Stall", "Verkstad", "Akademi", "Smedja", "Samlingsplats", "Staty", "Marknad", "Farm", "Mur"];
            var arrLanguage =['Niv.', 'By:', 'F.rsvarare:', 'Anfallare:', 'kommando', 'Ge kommando'];
            var arrBuildings =["H.gkvarter", "Barack", "Stall", "Verkstad", "Akademi", "Smedja", "Samlingsplats", "Staty", 
              "Marknad", "Farm", "Mur"];
           }
        else if (strLang == 'hr')
           {var arrLanguage =['Razina', 'Napadaci:', 'Branitelj:', 'Naredbe', 'Izdaj naredbe'];
            var arrBuildings =["Seosko sjedi�te", "Vojarna", "�tala", "Workshop", "Radionica", "Kovacnica", 
              "Okupljali�te", "Spomenik", "Tr�nica", "Farma", "Zid"];
            var arrBuildings =["Seosko sjedi.te", "Vojarna",".tala", "Workshop", "Radionica", "Kovacnica", "Okupljali�te", 
              "Spomenik", "Tr.nica", "Farma", "Zid"];
           }
        else if (strLang == 'dk')
           {var arrLanguage =['Trin', 'Angriber:', 'Forsvarende:', 'kommandoer', 'Giv kommandoer'];
            var arrBuildings =["Hovedbygning", "Kaserne", "Stald", "V�rksted", "Akademi", "Smed", "Forsamlingsplads", 
              "Statue", "Markedsplads", "Farm", "Mur"];
           }
        else if (strLang == 'br')
           {var arrLanguage =['N�vel', 'Atacante:', 'Defensor:', 'ordens', 'Distribuir ordens'];
            var arrBuildings =["Edif�cio principal", "Quartel", "Est�bulo", "Oficina", "Academia", "Ferreiro", 
              "Pra�a de Reuni�o", "Est�tua", "Mercado", "Fazenda", "Muralha"];
            var arrLanguage =['N.vel', 'Atacante:', 'Defensor:', 'ordens', 'Distribuir ordens'];
            var arrBuildings =["Edif.cio principal", "Quartel", "Est.bulo", "Oficina", "Academia", "Ferreiro", 
              "Pra.a de Reuni.o", "Est.tua", "Mercado", "Fazenda", "Muralha"];
           }
       }
   catch (objError){}
    debug("Language: '" + arrLanguage.join("','") + "'");
    debug("Buildings: '" + arrBuildings.join("','") + "'");
   
    function report()
       {theCookieStuff = "";
        for (i = 0;i < arrBuildings.length;i++)
           {var levels = buildingLevel(arrBuildings[i]);
            if (levels != 0) theCookieStuff += levels +"," + arrBuildings[i] + "|";
           }
       
        function getLink(a)
           {var coordinate = $("th:contains('" + a + "')")[0].parentNode.parentNode.rows[1].cells[1];
            return coordinate;
           }
        if (theCookieStuff == '')
           {alert("No building levels found.");
           }
        else 
           {document.cookie = "Building_Levels=" + theCookieStuff + "!" + getLink(arrLanguage[2]).innerHTML.match(/\d+\|\d+/);
            debug("Cookie created: " + theCookieStuff);
            if (sameVillage) villageId = getLink(arrLanguage[1]).getElementsByTagName("a")[0].href.match(/id=(\d+)/)[1];
            else villageId = getLink(arrLanguage[1]).getElementsByTagName("a")[0].href.match(/village=(\d+)/)[1];
            var t = (doc.URL.match( /&t=\d+/)) ? doc.URL.match( /&t=\d+/): '';
            location.search = "village=" + villageId + "&screen=place" + t;
           }
       }
   
    function rallyPoint()
       {var demolishArray;
        if (catLevel == 1) demolishArray = new Array(0,2,6,10,15,21,28,36,45,56,68,82,98,115,136,159,185,215,248,286,328,376,430,490,558,634,720,815,922,1041,1175);
        if (catLevel == 2) demolishArray = new Array(0, 2, 5, 8, 12, 17, 23, 29, 36, 45, 54, 66, 78, 92, 109, 127, 148, 172, 199, 229, 263, 301, 344, 392, 447, 508, 576, 
          652, 738, 833, 940);
        if (catLevel == 3) demolishArray = new Array(0, 2, 4, 7, 11, 15, 20, 26, 33, 40, 49, 59, 70, 83, 97, 114, 132, 154, 177, 204, 235, 269, 307, 350, 399, 453, 
          514, 582, 659, 744, 839);
        var catsAtHome = doc.forms[0].catapult.parentNode.getElementsByTagName("a")[1].innerHTML.match(/\d+/);
        if (catsAtHome == 0)
           {alert("You have 0 catapults here\nMove on to another village to continue.");
            return;
           }
		var buildingLevels = getCookie("Building_Levels");
		debug("Cookie read: "+buildingLevels);
		var currentTarget = buildingLevels[0].split(",")[1];
		var requiredCats = demolishArray[parseInt(buildingLevels.shift(),10)];
		debug("Target building/Cats needed: "+currentTarget+"/"+requiredCats);
		var neededCats = requiredCats;
		var coord = doc.cookie.match ( '(^|;) ?Building_Levels=([^;]*)(;|$)' )[2].split("!")[1].match(/\d+\|\d+/);
		debug("Target village: "+coord);
		document.cookie = "Building_Levels="+buildingLevels.join("|")+"!"+coord[0]+","+currentTarget;
		if ((currentTarget==arrBuildings[0]||currentTarget==arrBuildings[9])&&requiredCats == 2) rallyPoint();
		else {
			if (requiredCats>catsAtHome){
				alert(requiredCats+" Catapults are needed to demoilsh the " + currentTarget + ".\nYou have "+catsAtHome);
				requiredCats=catsAtHome;
			}
            if ( ! currentTarget)
               {alert("All buildings are now demolished.");
                location.search = doc.URL.match(/village=\d+/) + "&screen=report";
               }
            else 
               {               debug("Append :" + currentTarget +": to '" + arrLanguage[3] + "'");
                $("h3:contains('" + arrLanguage[3] + "')")[0].innerHTML = arrLanguage[4] + 
                  "<br /><div style=\"color:red; font-size:large\">" + currentTarget + "</div>"; /*alert(currentTarget);*/
                debug("Troops entered: " + type);
                if (type[0][0].length > 1)
                   {for (var k = 0;k < type.length;k++)
                       {var curUnit = doc.units[type[k][0]];
                        var atHome = unescape(curUnit.parentNode.getElementsByTagName('a')[1].href).match(/\d+/g)[1];
                        var troopAmount = (atHome >= type[k][1]) ? type[k][1]: atHome;
                        curUnit.value = troopAmount;
                       }
                   }
                else doc.units[type[0]].value = type[1];
                doc.forms[0].catapult.value = requiredCats;
                doc.forms[0].catapult.focus();
                doc.forms[0].x.value = coord[0].split( "|")[0];
                doc.forms[0].y.value = coord[0].split( "|")[1]; /*alert(doc.cookie.match ( '(^|;) ?Building_Levels=([^;]*)(;|$)' )[2]);*/
               }
           }
       }
   
    function confirmationScreen()
       {var cookieInfo = doc.cookie.match('(^|;) ?Building_Levels=([^;]*)(;|$)')[2];
        var target = cookieInfo.split( "!")[1].split(",")[1];
        debug("Cookie: " + target);
        select = doc.getElementsByTagName("select")[0];
        option = doc.getElementsByTagName("option");
        for (x = 0;x < option.length;x++)
           {if (select.options[x].innerHTML.match(target, "i")) select.options[x].selected = true;
            else select.options[x].selected = false;
            debug("Building/selected: " + select.options[x].innerHTML + "/" + select.options[x].selected);
           }
        document.cookie = "Building_Levels=" + cookieInfo.replace("," + target + "$", "");
       }
    var i_cell = ' ';
   
    function buildingLevel(build)
       {problematicRow = $("th:contains('Possible resources:')")[0];
        if ((problematicRow != "undefined") && (deactivationSwitch == 0) && (problematicRow != "null") && (problematicRow != ""))
           {deactivationSwitch = deactivationSwitch +1;
            problematicRow = problematicRow.parentNode;
            problematicRow.setAttribute("id","problemRow");
            $("#problemRow")[0].parentNode.removeChild(document.getElementById("problemRow"));
           }
        i_cell = doc.getElementById("attack_spy").getElementsByTagName("td")[1];
        strBuildings = i_cell.innerHTML;
        var newRegExp = new RegExp(build +".*?\\(" + arrLanguage[0] +".*?(\\d+)", "i");
        var level = strBuildings.match(newRegExp);
        if (level) return level[1];
        else return 0;
       }
   
    function debug(m)
       {doc.body.appendChild(doc.createTextNode(m));
        doc.body.appendChild(doc.createElement('br'));
       }
   
    function getCookie(name)
       {var results = doc.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        results = unescape(results[2]);
        results = results.split( "!");
        return results[0].split( "|");
       }
   /*fine from here*/
    if (doc.URL.match(/report/)) report();
    else if (doc.URL.match(/try=confirm/)) confirmationScreen();
    else if (getCookie("Building_Levels") && doc.URL.match(/place/)) rallyPoint();
    else location.search = doc.URL.match(/village=\d+/) + "&screen=report";
    debug("Original Script: Fluffy88");
    debug("TW-V6.3 Fix: File not Found ");
   }