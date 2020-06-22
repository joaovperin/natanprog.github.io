/* 
    Last Modif: 14:52:25
	Author	: Dale McKay
	French Translator : Artemisia (fr)
	Email	: dalesmckay@gmail.com
	Notes	: thanks to slowtarget for some initial ideas/functions
	
	TODO	:
		* Display foreign troop summary
____________________________________________________________

Copyright (C) 2010 Dale McKay, all rights reserved
version 1.0, 9 April 2010

This software is provided 'as-is', without any express or implied warranty. In no event will the author be held liable for any damages arising from the use of this software.

Permission is granted to anyone to use this software for any purpose, including commercial applications, and to alter it and redistribute it freely, subject to the following restrictions:
The origin of this software must not be misrepresented; you must not claim that you wrote the original software. If you use this software in a product, an acknowledgment in the product documentation would be appreciated but is not required.
Altered source versions must be plainly marked as such, and must not be misrepresented as being the original software.
This notice may not be removed or altered from any source distribution.
____________________________________________________________

*/

function fnExecuteScript(){
    try{
        var strVersion="  v7.7_fr";
        
        var unitDesc = {
            "spear":"Lances",
            "sword":"Épées",
            "axe":"Haches",
            "archer":"Archers",
            "spy":"Éclaireurs",
            "light":"Cavaleries légères",
            "marcher":"Archers montés",
            "heavy":"Cavaleries lourdes",
            "ram":"Béliers",
            "catapult":"Catapultes",
            "knight":"Paladins",
            "snob":"Nobles",
            "militia":"milices",
            "offense":"Offensif",
            "defense":"Défensif"
        };
        
        function fnTranslate(id){
            var translation=[
                    // GROUP NAMES
                    "Train de nobles avec off",
                    "Train de noble avec def",
                    "Autre nobles",
                    "Off pleine",
                    "3/4 d'off",
                    "1/2 d'off",
                    "1/4 d'off",
                    "Off avec catapultes",
                    "Def pleine",
                    "3/4 de def",
                    "1/2 de def",
                    "1/4 de def",
                    "Éclaireur plein",
                    "3/4 d'Éclaireur",
                    "1/2 d'Éclaireur",
                    "1/4 d'Éclaireur",
                    "Autre",
                    
                    // OTHER DESCRIPTIONS
                    "Compteur de Troupes",
                    "Armées avec noble",
                    "Armées offensives",
                    "Armées défensive",
                    "Armées d'éclaireur",
                    "Autres armées",
                    "Unités offensives",
                    "Unités défensives",
                    "Autres unités",
                    "Unités totales",
                    "Coordonnées des villages"
                ];
    
            return translation[id];
        }
    
        function fnDebugLog(msg){win.$("body").append("<span>"+msg+"</span><br/>");}
        
        /* sendMethod = "GET" || "POST", params = json, type = xml,json,text */
        function fnAjaxRequest(url,sendMethod,params,type){
            var error=null,payload=null;
            
            win.$.ajax({
                "async":false,
                "url":url,
                "data":params,
                "dataType":type,
                "type":String(sendMethod||"GET").toUpperCase(),
                "error":function(req,status,err){error="ajax: " + status;},
                "success":function(data,status,req){payload=data;}
            });
        
            if(error){
                throw(error);
            }
            
            return payload;
        }
    
        function fnCreateConfig(name){return win.$(fnAjaxRequest("/interface.php","GET",{"func":name},"xml")).find("config");}
        function fnCreateWorldConfig(){return fnCreateConfig("get_config");}
        function fnCreateBuildingConfig(){return fnCreateConfig("get_building_info");}
        function fnCreateUnitConfig(){return fnCreateConfig("get_unit_info");}
    
        function fnHasArchers(){return (parseInt(win.game_data.worldConfig.find("game archer").text()||"0",10)>0);}
        function fnHasChurch(){return (parseInt(win.game_data.worldConfig.find("game church").text()||"0",10)>0);}
        function fnHasNotebook(){return (win.$('[src*="note.png"],[class*="note-icon"]').length>0);}
        function fnHasPaladin(){return (parseInt(win.game_data.worldConfig.find("game knight").text()||"0",10)>0);}
        function fnHasMilitia(){return (win.game_data.unitConfig.find("militia").length>0);}
        
        
        var Villages_In_Each_Category = {}

        function fnGetTroopCount(){				
            /* returns an array of: {"x":"xxx","y":"yyy","coords":"xxx|yyy","troops":[0,0,0,0,0,0,0,0,0,0,0,0,0]} */
    
            /* Number of Columns - VillageColumn - ActionColumn */
            var counter = 0;
            var gameVersion = parseFloat(win.game_data.version.match(/[\d|\.]+/g)[1]);
            var colCount = win.$('#units_table '+((gameVersion>=7.1)?'thead':'tbody:eq(0)')+' th').length - 2;
            var villageTroopInfo=[];
            var unitPerVillage = {}
            var list_Village = new Array()

            function addUnit(nbPop, unit_name, coordinates){
                if(unitPerVillage[coordinates] == undefined) {
                    unitPerVillage[coordinates] = { [unit_name] : nbPop }
                    list_Village.push(coordinates)
                }
                else{
                    if(unitPerVillage[coordinates][unit_name]==undefined) unitPerVillage[coordinates][unit_name] = nbPop
                    else{
                        unitPerVillage[coordinates][unit_name]+=nbPop
                    }
                }
                
            }

            function getCategory(coordinates) {
				var popOff = 0
				var popDef = 0
				var popSnob = 0
                var popSpy = 0
                var popCata = 0;
				var path = unitPerVillage[coordinates]
		
				
				for(var i = 0; i< array_units.length ; i++){   
					if (array_str_unit_def.indexOf(array_units[i]) >= 0 && path[ array_units[i]] != undefined){
						  popDef += path[ array_units[i]];
					} else if (array_str_unit_off.indexOf(array_units[i]) >= 0 && path[ array_units[i]] != undefined){
						  popOff += path[ array_units[i]];
					} else if (array_str_unit_spy.indexOf(array_units[i]) >= 0 && path[ array_units[i]] != undefined){
						  popSpy +=path[ array_units[i]];
					}else if (array_str_unit_snob.indexOf(array_units[i]) >= 0 && path[ array_units[i]] != undefined){
						  popSnob += path[ array_units[i]];
                     }
                    if (array_str_unit_catapult.indexOf(array_units[i]) >= 0 && path[ array_units[i]] != undefined){
                        popCata += path[ array_units[i]];
                  }
				}
            
            var Village_categories = new Array();
			if(popOff >= 5000){
				if(popOff >= 20000){
                    if(popSnob >= 400) Village_categories.push("Full Train Nuke")
                    else Village_categories.push("Full Nuke")
                    if(popSnob < 100 && popCata >= 800)  Village_categories.push("Cat Nuke")
				}
				else if(15000 <= popOff) Village_categories.push("Semi Nuke")
				else if(10000 <= popOff) Village_categories.push("Half Nuke")
				else if(5000 <= popOff) Village_categories.push("Quarter Nuke")
			}
			else if(popDef >= 5000){
				 if(popDef >= 20000){
					if(popSnob >= 400) Village_categories.push("Full Defense Train")
					else Village_categories.push("Full Defense")
				}
				else if(15000 <= popDef)  Village_categories.push("Semi Defense")
				else if(10000 <= popDef)  Village_categories.push("Half Defense")
				else if(5000 <= popDef)  Village_categories.push("Quarter Defense")
			}
			else if(popSpy >= 5000){
                if(popSnob>=400)  Village_categories.push("Other train")
                if(popSnob >= 100) Village_categories.push("Other Nobles")
				if(popSpy >= 20000)  Village_categories.push("Full Scout")
				else if(15000 <= popDef)  Village_categories.push("Semi Scout")
				else if(10000 <= popDef)  Village_categories.push("Half Scout")
				else if(5000 <= popDef)  Village_categories.push("Quarter Scout")
            }
            
            if(popSnob>=400 && Village_categories.indexOf("Full Train Nuke") == -1 && Village_categories.indexOf("Full Defense Train") == -1)  Village_categories.push("Other train")
            if(popSnob >= 100 && Village_categories.indexOf("Other train") == -1) Village_categories.push("Other Nobles")
            
            if(Village_categories[0]==undefined) Village_categories.push("Other")
            
            return Village_categories
            }

            function setCategory(){
			list_Village.forEach(village => {
                getCategory(village).forEach(category => {
					if(Villages_In_Each_Category[category] == undefined) {
                        Villages_In_Each_Category[category] = {'tally' : 1, 'coords' : Array(village)};
                    }
					else{
                        Villages_In_Each_Category[category]['tally'] += 1;
                        Villages_In_Each_Category[category]['coords'].push(village);
                    }
                })
			})
            }

            var array_units = ['spear', 'sword', 'axe', 'archer', 'spy', 'light', 'marcher', 'heavy', 'ram', 'catapult', 'knight', 'snob', 'milicia'];
            var array_pop_units = [1, 1, 1,1, 2, 4, 5, 6, 5, 8, 10, 100, 0];
			// Array list for defined wich unit is def, off, spy, snob...
            var array_str_unit_def = ['spear', 'sword', 'archer', 'heavy'];
			var array_str_unit_off = ['axe', 'light', 'ram', 'marcher', 'catapult'];
			var array_str_unit_spy = ['spy'];
            var array_str_unit_snob = ['snob'];
            var array_str_unit_catapult = ['catapult'];
            
            
            // For each tbody
            win.$('#units_table tbody').each(function(row,eleRow){
                /* Reset for next Village */
                var villageData={"troops":[0,0,0,0,0,0,0,0,0,0,0,0,0]};
    
                /* Village */
                coords=win.$(eleRow).find("td:eq(0)").text().match(/\d+\|\d+/g);
                coords=(coords?coords[coords.length-1].match(/(\d+)\|(\d+)/):null);
                villageData.x = parseInt(coords[1],10);
                villageData.y = parseInt(coords[2],10);
                villageData.coords = coords[0];
                
                
                win.$(eleRow).find("tr").each(function(key, tr){
                    if(key == 0 || key == 2 || key == 3){
                        //console.log('tr');
                        //console.log(tr);
                        var current_tr = tr;
                        var td_collection = win.$(current_tr).find('td:gt(0):not(:has(>a))');
                        counter = 0;
                        win.$(td_collection).each(function(cell,eleCell){
                            if (win.$(eleCell).hasClass('unit-item')){
                                if(!(win.$(eleCell).hasClass('hidden'))){
                                    villageData.troops[counter] += parseInt(win.$(eleCell).text()||"0",10);
                                }
                                counter++;
                            }                            
                        });
                        
                        for(i = 0; i<villageData['troops'].length; i++){
                            addUnit(array_pop_units[i]*villageData['troops'][i],array_units[i],villageData['coords']);
                        }
                    }
                });
                villageTroopInfo.push(villageData);
            });
            setCategory();   
            return villageTroopInfo;
        }
    
        function fnLogVersionInfo(){
            fnDebugLog("");
            fnDebugLog("=========================");
            fnDebugLog("dalesmckay's Troop Summary: " + strVersion);
            fnDebugLog("=========================");
            fnDebugLog("Premium: "+(win.game_data.isPremium?"yes":"no"));
            fnDebugLog("Church : "+(fnHasChurch()?"yes":"no"));
            fnDebugLog("Statue : "+(fnHasPaladin()?"yes":"no"));
            fnDebugLog("Archer : "+(fnHasArchers()?"yes":"no"));
            fnDebugLog("Militia: "+(fnHasMilitia()?"yes":"no"));
            fnDebugLog("Sitter : "+(win.location.href.match(/t\=\d+/i)?"yes":"no"));
            fnDebugLog("=========================");
            fnDebugLog("Version: "+win.game_data.version);
            fnDebugLog("World  : "+win.game_data.world);
            fnDebugLog("Screen : "+win.game_data.screen);
            fnDebugLog("Mode   : "+win.game_data.mode);
            fnDebugLog("URL    : "+win.location.href);
            fnDebugLog("Browser: "+navigator.userAgent);
            fnDebugLog("=========================");
        
            return true;
        }
    
        function fnCriteriaToStr(criteria){
            var valueStr = "";
    
            if(criteria && (criteria.length > 0)){
                for(var ii=0; ii < criteria.length; ii++){
                    if(typeof(criteria[ii].minpop) != "undefined"){
                        valueStr += (valueStr?" and ":"") + "(" + unitDesc[criteria[ii].unit] + "[pop] >= " + criteria[ii].minpop + ")";
                    }
                    if(typeof(criteria[ii].maxpop) != "undefined"){
                        valueStr += (valueStr?" and ":"") + "(" + unitDesc[criteria[ii].unit] + "[pop] < " + criteria[ii].maxpop + ")";
                    }
                }
            }
        
            return valueStr;
        }
    
        function fnCalculateTroopCount(){
            var maxGroups=0;
            var outputSummary = {
                "Full Train Nuke":{
                    "group":"Nobles",
                    "criteria":[{"unit":"snob","minpop":400},{"unit":"offense","minpop":19600}],
                    "descID":maxGroups++
                },
                "Full Defense Train":{
                    "group":"Nobles",
                    "criteria":[{"unit":"snob","minpop":400},{"unit":"defense","minpop":19600}],
                    "descID":maxGroups++
                },
                "Other Nobles":{
                    "group":"Nobles",
                    "criteria":[{"unit":"snob","minpop":100},{"unit":"defense","maxpop":19600},{"unit":"offense","maxpop":19600}],
                    "descID":maxGroups++
                },
                "Full Nuke":{
                    "group":"Offensive",
                    "criteria":[{"unit":"snob","maxpop":100},{"unit":"offense","minpop":20000}],
                    "descID":maxGroups++
                },
                "Cat Nuke":{
                    "group":"Offensive",
                    "criteria":[{"unit":"snob","maxpop":100},{"unit":"catapult","minpop":800},{"unit":"offense","minpop":20000}],
                    "descID":maxGroups++
                },
                "Semi Nuke":{
                    "group":"Offensive",
                    "criteria":[{"unit":"snob","maxpop":100},{"unit":"offense","minpop":15000,"maxpop":20000}],
                    "descID":maxGroups++
                },
                "Half Nuke":{
                    "group":"Offensive",
                    "criteria":[{"unit":"snob","maxpop":100},{"unit":"offense","minpop":10000,"maxpop":15000}],
                    "descID":maxGroups++
                },
                "Quarter Nuke":{
                    "group":"Offensive",
                    "criteria":[{"unit":"snob","maxpop":100},{"unit":"offense","minpop":5000,"maxpop":10000}],
                    "descID":maxGroups++
                },
                "Full Defense":{
                    "group":"Defensive",
                    "criteria":[{"unit":"snob","maxpop":100},{"unit":"defense","minpop":20000}],
                    "descID":maxGroups++
                },
                "Semi Defense":{
                    "group":"Defensive",
                    "criteria":[{"unit":"snob","maxpop":100},{"unit":"defense","minpop":15000,"maxpop":20000}],
                    "descID":maxGroups++
                },
                "Half Defense":{
                    "group":"Defensive",
                    "criteria":[{"unit":"snob","maxpop":100},{"unit":"defense","minpop":10000,"maxpop":15000}],
                    "descID":maxGroups++
                },
                "Quarter Defense":{
                    "group":"Defensive",
                    "criteria":[{"unit":"snob","maxpop":100},{"unit":"defense","minpop":5000,"maxpop":10000}],
                    "descID":maxGroups++
                },
                "Full Scout":{
                    "group":"Scouts",
                    "criteria":[{"unit":"snob","maxpop":100},{"unit":"spy","minpop":20000}],
                    "descID":maxGroups++
                },
                "Semi Scout":{
                    "group":"Scouts",
                    "criteria":[{"unit":"snob","maxpop":100},{"unit":"spy","minpop":15000,"maxpop":20000}],
                    "descID":maxGroups++
                },
                "Half Scout":{
                    "group":"Scouts",
                    "criteria":[{"unit":"snob","maxpop":100},{"unit":"spy","minpop":10000,"maxpop":15000}],
                    "descID":maxGroups++
                },
                "Quarter Scout":{
                    "group":"Scouts",
                    "criteria":[{"unit":"snob","maxpop":100},{"unit":"spy","minpop":5000,"maxpop":10000}],
                    "descID":maxGroups++
                },
                "Other":{
                    "group":"Other",
                    "criteria":[{"unit":"snob","maxpop":100},{"unit":"spy","maxpop":5000},{"unit":"defense","maxpop":5000},{"unit":"offense","maxpop":5000}],
                    "descID":maxGroups++
                }
            };	
        
            var ii,jj,village,total,index,count,unit,item,key,criteria,condition,isValid;
            var defense = ["spear","sword","heavy","catapult"];
            var offense = ["axe","light","ram","catapult"];
            
            if(fnHasMilitia()){
                defense.push("militia");
            }
            
            if(fnHasArchers()){
                defense.push("archer");
                offense.push("marcher");
            }
    /*	
            if(fnHasPaladin()){
                offense.push("knight");
            }
    */	
    
            /* Initialize */
            var summary = {
                unitTotal:{"tally":0,"population":0},
                defense:{"tally":0,"count":0,"population":0,"coords":[]},
                offense:{"tally":0,"count":0,"population":0,"coords":[]}
            };
            
            win.$(win.game_data.unitConfig).children().each(function(i,e){
                summary[e.nodeName]={"tally":0,"count":0,"population":0,"coords":[]};
            });
    
            for(item in outputSummary){
                if(outputSummary.hasOwnProperty(item)){
                    summary[item]={"tally":0,"count":0,"population":0,"coords":[]};
                }
            }
                        
            var villageTroops = fnGetTroopCount();
            var tata = 0;
            for(ii=0;ii<villageTroops.length;ii++){
                // object village with coord and troops
                village = villageTroops[ii];
                total = {
                    defense:{"tally":0,"count":0,"population":0,"coords":[]},
                    offense:{"tally":0,"count":0,"population":0,"coords":[]}
                };
    
                win.$(win.game_data.unitConfig).children().each(function(i,e){
                    total[e.nodeName]={"tally":0,"count":0,"population":0,"coords":[]};
                });
                //console.log(total);
                
                /* Calculate total count & population for each unit type */
                index=0;
                win.$(win.game_data.unitConfig).children().each(function(i,e){
                    var unit=e.nodeName;
                    total[unit].count += village.troops[index];
                    total[unit].population += village.troops[index]*parseInt(win.$(e).find("pop").text(),10);
                    
                    
                    /* Defense */
                    if (new RegExp('^(' + defense.join('|') + ')$').test(unit)){
                        total.defense.count += total[unit].count;
                        total.defense.population += total[unit].population;
                    }
        
                    /* Offense */
                    if (new RegExp('^(' + offense.join('|') + ')$').test(unit)){
                        total.offense.count += total[unit].count;
                        total.offense.population += total[unit].population;
                    } 
    
                    /* Units */
                    summary[unit].count += total[unit].count;
                    summary[unit].population += total[unit].population;
                        
                    /* All Units */
                    summary.unitTotal.tally += total[unit].count;
                    summary.unitTotal.population += total[unit].population;
                
                    index++;
                });
            
                summary.defense.count += total.defense.count;
                summary.defense.population += total.defense.population;
            
                summary.offense.count += total.offense.count;
                summary.offense.population += total.offense.population;
            }
            tata++;
            
            var groupSummary={};
            for(item in outputSummary){
                if(outputSummary.hasOwnProperty(item)){
                    if(typeof(groupSummary[outputSummary[item].group])=="undefined"){
                        groupSummary[outputSummary[item].group]=[];
                    }
                    
                    groupSummary[outputSummary[item].group].push(item);
                }
            }
            
            var curGroup=maxGroups;

            function SetCategoryInSummary(){
                for(element in summary){
                    if(Villages_In_Each_Category[element]!=undefined){
                        summary[element]['tally'] = Villages_In_Each_Category[element]['tally']
                        summary[element]['coords'] = Villages_In_Each_Category[element]['coords']
                    }  
                }
            }
            SetCategoryInSummary();
            
            var docSource = "";
            docSource += "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\" \"http://www.w3.org/TR/html4/strict.dtd\">\n";
            docSource += "<html>\n";
            docSource += "\t<head>\n";
            docSource += "\t\t<title>dalesmckay's - Troop Summary</title>\n";
            docSource += "\t\t<meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\"/>\n";				
    
    /*
            docSource += "\t\t<link rel=\"stylesheet\" type=\"text/css\" href=\"http://" + win.location.hostname + "/style.php?type=game&amp;stamm_new_menu&amp;stamm&amp;overview&amp;1273236925\"/>\n";
    */
            docSource += "\t\t<link rel=\"stylesheet\" type=\"text/css\" href=\"http://" + win.location.hostname + "/merged/game.css\"/>\n";
    
            docSource += "\t\t<script type=\"text/javascript\">\n";
            docSource += "\t\t\t<!--\n";
            docSource += "\t\t\tfunction fnShowCoords(id,description){\n";
            docSource += "\t\t\t\tvar coords={};\n";
            for(item in outputSummary){
                if(outputSummary.hasOwnProperty(item)){
                    if(summary[item].coords.length){
                        docSource += "\t\t\t\tcoords[\"" + item + "\"] = \"" + summary[item].coords.join(" ") + "\";\n";
                    }
                }
            }
            docSource += "\t\t\t\tdocument.getElementById(\"coords_group\").innerHTML = description;\n";
            docSource += "\n";
            docSource += "\t\t\t\tvar eleCoords = document.getElementById(\"coords_container\");\n";
            docSource += "\t\t\t\teleCoords.value = coords[id]?coords[id]:\"\";\n";
            docSource += "\t\t\t\teleCoords.focus();\n";
            docSource += "\t\t\t\teleCoords.select();\n";
            docSource += "\t\t\t}\n";		
            docSource += "\t\t\t-->\n";
            docSource += "\t\t</script>\n";
            docSource += "\t</head>\n";
            docSource += "\n";
            docSource += "\t<body>\n";
            docSource += "\t\t<table align=\"center\"><tr><td>\n";
            docSource += "\t\t\t<table class=\"content-border\"><tr><td>\n";
            docSource += "\t\t\t\t<table class=\"main\" width=\"100%\" align=\"center\">\n";
            docSource += "\t\t\t\t\t<tr>\n";
            docSource += "\t\t\t\t\t\t<td id=\"content_value\">\n";
            docSource += "\t\t\t\t\t\t\t<h2>" + fnTranslate(curGroup++) + "<sup><span style=\"font-size:small;\">" + strVersion + "</span></sup><sub><span style=\"font-weight:100;font-style:italic;text-decoration:none;font-size:x-small;\"> codé par <a href=\"http://www.crosstrigger.com\" target=\"_blank\">dalesmckay</a> traduit en français par <a href=\"http://forum.guerretribale.fr/member.php?27255-artemisia\" target=\"_blank\">Artemisia</a></span></sub></h2>\n";
            docSource += "\t\t\t\t\t\t\t<hr>\n";
    
            docSource += "\t\t\t\t\t\t\t<table>\n";
            docSource += "\t\t\t\t\t\t\t\t<tr><td width=\"450\" valign=\"top\"><table class=\"vis\" width=\"100%\">\n";
            for(item in groupSummary){
                if(groupSummary.hasOwnProperty(item)){
                    count=0;
                    docSource += "<tr><th colspan=\"2\">" + fnTranslate(curGroup++) + "</th></tr>\n";
                    for(jj=0;jj<groupSummary[item].length;jj++){
                        docSource += "\t\t\t\t\t\t\t\t<tr class=\"" + ((count++%2)?"row_b":"row_a") + "\">\n";
                        docSource += "\t\t\t\t\t\t\t\t\t<td width=\"240\" style=\"white-space:nowrap;\"><a href=\"#\" onclick=\"fnShowCoords('" + groupSummary[item][jj] + "','" + fnTranslate(outputSummary[groupSummary[item][jj]].descID) + "');\" title=\"" + fnCriteriaToStr(outputSummary[groupSummary[item][jj]].criteria) + "\">&raquo;&nbsp; " + fnTranslate(outputSummary[groupSummary[item][jj]].descID) + "</a></td>\n";
                        docSource += "\t\t\t\t\t\t\t\t\t<td width=\"240\"" + ((summary[groupSummary[item][jj]].tally>0)?"":" class=\"hidden\"") + " style=\"text-align:right;\"><span>" + summary[groupSummary[item][jj]].tally + "</span></td>\n";
                        docSource += "\t\t\t\t\t\t\t\t</tr>\n";								
                    }
                }
            }
            docSource += "\t\t\t\t\t\t\t</table>\n";
            docSource += "\t\t\t\t\t\t\t<td valign=\"top\">\n";
            
            /* Offensive Units */						
            docSource += "\t\t\t\t\t\t\t\t<table class=\"vis\" width=\"100%\">\n";
            docSource += "\t\t\t\t\t\t\t\t\t<tr><th colspan=\"2\" style=\"white-space:nowrap;\">" + fnTranslate(curGroup++) + "</th></tr>\n";
            count = 0;		
            for(key in offense){
                if(offense.hasOwnProperty(key)){
                    docSource += "\t\t\t\t\t\t\t\t\t<tr class=\"" + ((count++%2)?"row_b":"row_a") + "\"><td><img src=\"http://" + win.location.hostname + "/graphic/unit/unit_" + offense[key] + ".png?1\" alt=\"\"/></td><td style=\"white-space:nowrap;\"><span> " + summary[offense[key]].count + " " + unitDesc[offense[key]] + "</span></td></tr>\n";
                }
            }
            docSource += "\t\t\t\t\t\t\t\t</table>\n";
            
            /* Defensive Units */
            docSource += "\t\t\t\t\t\t\t\t<table class=\"vis\" width=\"100%\">\n";
            docSource += "\t\t\t\t\t\t\t\t\t<tr><th colspan=\"2\" style=\"white-space:nowrap;\">" + fnTranslate(curGroup++) + "</th></tr>\n";
            count = 0;		
            for(key in defense){
                if(defense.hasOwnProperty(key)){
                    docSource += "\t\t\t\t\t\t\t\t\t<tr class=\"" + ((count++%2)?"row_b":"row_a") + "\"><td><img src=\"http://" + win.location.hostname + "/graphic/unit/unit_" + defense[key] + ".png?1\" alt=\"\"/></td><td style=\"white-space:nowrap;\"><span> " + summary[defense[key]].count + " " + unitDesc[defense[key]] + "</span></td></tr>\n";
                }
            }
            docSource += "\t\t\t\t\t\t\t\t</table>\n";
    
            /* Other Units */
            docSource += "\t\t\t\t\t\t\t\t<table class=\"vis\" width=\"100%\">\n";
            docSource += "\t\t\t\t\t\t\t\t\t<tr><th colspan=\"2\" style=\"white-space:nowrap;\">" + fnTranslate(curGroup++) + "</th></tr>\n";
            count = 0;
            win.$(win.game_data.unitConfig).children().each(function(i,e){
                var unit=e.nodeName;
                if(!new RegExp('^(' + defense.join('|') + '|' + offense.join('|') + ')$').test(unit)){
                    docSource += "\t\t\t\t\t\t\t\t\t<tr class=\"" + ((count++%2)?"row_b":"row_a") + "\"><td><img src=\"http://" + win.location.hostname + "/graphic/unit/unit_" + unit + ".png?1\" alt=\"\"/></td><td style=\"white-space:nowrap;\"><span> " + summary[unit].count + " " + unitDesc[unit] + "</span></td></tr>\n";
                }
            });
            docSource += "\t\t\t\t\t\t\t\t</table>\n";
            
            /* Total Units */
            docSource += "\t\t\t\t\t\t\t\t<table class=\"vis\" width=\"100%\">\n";
            docSource += "\t\t\t\t\t\t\t\t\t<tr><th colspan=\"2\" style=\"white-space:nowrap;\">" + fnTranslate(curGroup++) + "</th></tr>\n";
            docSource += "\t\t\t\t\t\t\t\t\t<tr class=\"" + "row_a" + "\"><td><span>Count:</span></td><td style=\"white-space:nowrap;\"><span> " + summary.unitTotal.tally + "</span></td></tr>\n";
            docSource += "\t\t\t\t\t\t\t\t\t<tr class=\"" + "row_b" + "\"><td><span>Pop:</span></td><td style=\"white-space:nowrap;\"><span> " + summary.unitTotal.population + "</span></td></tr>\n";
            docSource += "\t\t\t\t\t\t\t\t</table>\n";
    
            docSource += "\t\t\t\t\t\t\t</td>\n";
            docSource += "\t\t\t\t\t\t</td>\n";
            docSource += "\t\t\t\t\t</tr>\n";
            docSource += "\t\t\t\t</table>\n";
            docSource += "\t\t\t\t<hr>\n";
            docSource += "\t\t\t\t<table id=\"coordinate_table\" class=\"vis\" style=\"width:100%;\">\n";
            docSource += "\t\t\t\t\t<tr><th>" + fnTranslate(curGroup++) + ": <span id=\"coords_group\" style=\"font-weight:100;\"></span>\n";
            docSource += "\t\t\t\t\t<tr><td style=\"padding:1em;\"><textarea id=\"coords_container\" style=\"width:100%;\"></textarea></td></tr>\n";
            docSource += "\t\t\t\t</table>\n";
            docSource += "\t\t\t</table>\n";
            docSource += "\t\t</table>\n";					
            docSource += "\t</body>\n";
            docSource += "</html>\n";
    
            var popup=win.open('about:blank','dalesmckay_tw_troopsummary','width=460,height=730,scrollbars=yes');
            popup.document.open('text/html','replace');
            popup.document.write(docSource);
            popup.document.close();
        }
    
    
    
        var win=(window.main||self);
    
    
    
    
        // Check Permissions.
        if(win.game_data.world=='zz2'){
            if([16467].indexOf(parseInt(win.game_data.player.id,10))<0){
                throw('Hi '+win.game_data.player.name+'!\n\nYour scripts have been disabled by dalesmckay\nSend him a mail if you wish to help with testing');
            }
        }
    
    
    
    
    
        /* HACK: fix null mode */
        if(!win.game_data.mode){
            var vmode=win.$("#overview_menu td[class=selected] a").attr("href").match(/mode\=(\w*)/i);
            if(vmode){
                win.game_data.mode=vmode[1];
            }
        }
            
        win.game_data.isPremium=(win.$("#quickbar_outer").length>0);
        
        if(typeof(win.game_data.worldConfig)=="undefined"){
            win.game_data.worldConfig=fnCreateWorldConfig();
        }
    
        if(typeof(win.game_data.unitConfig)=="undefined"){
            win.game_data.unitConfig=fnCreateUnitConfig();
        }
        
        /* Todo: Handle different scripts by name */
        if(typeof(win.game_data.versionDumped)=="undefined"){
            win.game_data.versionDumped=fnLogVersionInfo();
        }
    
        function getTypeOfTroop(troop_label){
            var array_off = ['axe', 'catapult', 'light', 'marcher', 'ram', 'snob'],
                array_def = ['archer', 'heavy', 'spear', 'sword'];
    
            if (array_off.hasOwnProperty(troop_label)) return 'offense';
            if (array_def.hasOwnProperty(troop_label)) return 'defense';
    
            return null;
        }
    
        fnCalculateTroopCount();
    
        void(0);
    }
    catch(objError){
        var errMsg=String(objError.message||objError||"");
        if(errMsg){
            fnDebugLog("Error: " + errMsg);
            alert("Error: " + errMsg);
        }
    }}
    
    if(game_data.mode == 'units'){
        fnExecuteScript();
    } else {
        UI.ErrorMessage('Ce script doit être lancé depuis l\’aperçu troupes.',4000);
    }