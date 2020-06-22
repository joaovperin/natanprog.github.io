if(typeof(eleDoc)=="undefined"){var eleDoc,arrTable,arrSupportReq,arrSortBys,eleTable;fnSetup();}

function fnGetConfig(){
	var oRequest=new XMLHttpRequest();
	var sURL="http://"+window.location.hostname+"/interface.php?func=get_config";
	oRequest.open("GET",sURL,0);
	oRequest.send(null);
	if(oRequest.status==200)return oRequest.responseXML;
	UI.ErrorMessage("Error executing XMLHttpRequest call to get Config!",3000);
}

function fnStatus(strMessage){
	try{
		eleDoc.body.appendChild(eleDoc.createTextNode(strMessage));
		eleDoc.body.appendChild(eleDoc.createElement("br"));
	}
	catch(objError){
		UI.ErrorMessage(strMessage+"\n"+objError,3000);
	}
}

function fnSetup(){
	eleDoc=(window.frames.length>0)?window.main.document:document;
	strVersion="1.0a";

	fnStatus("SlowTarget's Sort "+strVersion);
	fnStatus("Sagato Patch v7.2");
	fnStatus("D'apr\350s un script original de dalesmckay");

	var arrSort=["asc","desc"];
	var cNumber=0,cText=1,cDate=2,cTime=2;
	var xmlDoc=fnGetConfig();
			
	try{blChurch=(xmlDoc.getElementsByTagName("church")[0].childNodes[0].nodeValue!=0);}
	catch(objError){blChurch=false;}
	try{blStatue=(xmlDoc.getElementsByTagName("knight")[0].childNodes[0].nodeValue!=0);}
	catch(objError){blStatue=false;}
	try{blArcher=(xmlDoc.getElementsByTagName("archer")[0].childNodes[0].nodeValue!=0);}
	catch(objError){blArcher=false;}

	fnStatus("Church : "+((blChurch)?"yes":"no"));
	fnStatus("Statue : "+((blStatue)?"yes":"no"));
	fnStatus("Archer : "+((blArcher)?"yes":"no"));
	
	fnStatus("========");
	fnStatus("Version: "+window.game_data.version);
	fnStatus("World  : "+window.game_data.world);
	fnStatus("Screen : "+window.game_data.screen);
	fnStatus("Mode   : "+window.game_data.mode);
	fnStatus("Browser: "+navigator.userAgent);

	/* fnAddField(varValue,intType)
		adds a value to the sort array
	*/
	function fnAddField(varValue,intType){
		idx3++;

		if(varValue){
			if(intType==cNumber){
				varValue=varValue.replace(".","");
				varValue=parseInt(varValue,10);
			}

			arrRow[idx3]=varValue;
		}else{
			arrRow[idx3]=(intType==cNumber)?0:"";
		}
	}

	/* fnAddSortLinks(eleRef,intIndex,strBefore,strAfter)
		creates the sort arrows
	*/
	function fnAddSortLinks(eleRef,intIndex,strBefore,strAfter){
		if(strBefore){
			fnText(eleRef,strBefore);
		}

		eleSortDiv=eleDoc.createElement("div");
		eleSortDiv.className="sort";

		arrSort.forEach(
			function(strSort){
				var eleLink=eleDoc.createElement("a");
				eleLink.onclick=fnClick;
				eleLink.onmouseover=fnHover;
				eleLink.onmouseout=fnOut;
				eleLink.className=strSort;
				eleLink.href="javascript:";
				eleLink.name="SORT_"+intIndex+"_"+strSort;

				var eleDiv=eleDoc.createElement("div");
				eleDiv.className=strSort+" EventInactive";
				eleDiv.name="SORT_"+intIndex+"_"+strSort;

				eleLink.appendChild(eleDiv);

				eleSortDiv.appendChild(eleLink);
			}
		);

		eleRef.appendChild(eleSortDiv);

		if(strAfter){
			fnText(eleRef,strAfter);
		}
	}

	/*fnAddColumn(txtId,arrNew)
		arrColumns is an array definining the sort columns - its mostly static data - but is added to for archer worlds etc
		 an entry in this array is an array ["{name}",{regex pattern},[sort elements array]]
		 the sort elements array will contain an entry for each match in the regex pattern
		 [type(text or number),beforetext,afterText] the before and after text is placed before and after the sort links in the header

		this function will add an entry to arrColumns after the entry where {name}=txtId
	*/
	function fnAddColumn(txtId,arrNew){
		for(idx1=0;idx1<arrColumns.length;idx1++){
			if(typeof(arrColumns[idx1][0])!="undefined"){
				if(arrColumns[idx1][0]==txtId){
					arrColumns.splice(idx1+1,0,arrNew);
					break;
				}
			}
		}
	} 

	var blEditGroup=false;
	var blAttack=false;

/*	var blRequestSupport=(eleDoc.getElementsByName("reqdef").length > 0);
*/

	/*in edit/remove villages mode there is no form for villages/page with the table it contains... */

	if(eleDoc.location.search.search("&edit_group=")!=-1){
		fnStatus("edit_group=true");
		blEditGroup=true;
	}

	arrSortBys=[[1,1]];
	var arrColumns;

	/*	
		supports the following...
		Combined  	Production  	Transports  	Troops  	Commands  	Incoming  	Buildings  	Research  	Groups

		combined overview
		production overview
		transports overview
		troops overview (*** NOT CURRENTLY SUPPORTED ***)
		commands overview
		incomings overview
		buildings overview
		research overview
		groups overview
	
		(*** DOES NOT CURRENTLY SORT THE CHECKBOXES ***)
		in group add/remove villages mode - including sorting the checkboxes... : &edit_group=603
	*/
	if(window.game_data.mode=="combined"){
		/* combined */
		/*the format here is
		id,pattern to match,array of match type and before and after text to include around the sort links
		*/
		arrColumns=[
			["NT"],
			["village",/(.*?)\s\((\d+)\|(\d+)\)\sC(\d+)/,[[cText],[cNumber," ("],[cNumber,"|"],[cNumber,") C"]]],
			["HQ"],
			["BA"],
			["ST"],
			["WO"],
			["SM"],
			["farm",/(\d+)\s\((\d+)\)/,[[cNumber],[cNumber,"(",")"]]],
			["sp",/(\d+)/,[[cNumber]]],
			["sw",/(\d+)/,[[cNumber]]],
			["ax",/(\d+)/,[[cNumber]]],
			["sc",/(\d+)/,[[cNumber]]],
			["lc",/(\d+)/,[[cNumber]]],
			["hc",/(\d+)/,[[cNumber]]],
			["ra",/(\d+)/,[[cNumber]]],
			["ca",/(\d+)/,[[cNumber]]],
			["no",/(\d+)/,[[cNumber]]],
			["market",/(\d+)\/(\d+)/,[[cNumber],[cNumber,"/"]]]
		];

		if(blArcher){
			fnAddColumn("ax",["ar",/(\d+)/,[[cNumber]]]);
			fnAddColumn("lc",["ma",/(\d+)/,[[cNumber]]]);	
		}

		if(blStatue){
			fnAddColumn("ca",["pa",/(\d+)/,[[cNumber]]]);
		}

		if(blChurch){
			fnAddColumn("SM",["CH"]);
		}

		eleTable=eleDoc.getElementById("combined_table");
	}else if(window.game_data.mode=="prod"){
		arrColumns=[
			["NT"],
			["village",/(.*?)\s\((\d+)\|(\d+)\)\sC(\d+)/,[[cText],[cNumber," ("],[cNumber,"|"],[cNumber,") C"]]],
			["pts",/\b(\d*\.?\d+)\b/,[[cNumber]]],
			["res",/\b(\d*\.?\d+)\s\b(\d*\.?\d+)\s\b(\d*\.?\d+)/,[[cNumber],[cNumber," - "],[cNumber," - "]]],
			["wh",/(\d+)/,[[cNumber]]],
			["market",/(\d+)\/(\d+)/,[[cNumber],[cNumber,"/"]]],
			["fm",/(\d+)\/(\d+)/,[[cNumber],[cNumber,"/"]]],
			["cn"],
			["rs"],
			["rc"]
		];

		eleTable=eleDoc.getElementById("production_table");
/* Sagato - this does not work, so has been removed.
	}else if(window.game_data.mode=="trader"){
		arrColumns=[
			["direction"],
			["sender",/(.*)/,[[cText]]],
			["origin",/(.*?)\s\((\d+)\|(\d+)\)\sC(\d+)/,[[cText],[cNumber," ("],[cNumber,"|"],[cNumber,") C"]]],
			["recipient",/(.*)/,[[cText]]],
			["village",/(.*?)\s\((\d+)\|(\d+)\)\sC(\d+)/,[[cText],[cNumber," ("],[cNumber,"|"],[cNumber,") C"]]],
			["arrival",/(.*)/,[[cText]]],
			["merchants",/(\d+)/,[[cNumber]]],
			["res",/\b(\d*\.?\d+)\s\b(\d*\.?\d+)\s\b(\d*\.?\d+)/,[[cNumber],[cNumber],[cNumber]]]
		];

		eleTable=eleDoc.getElementById("trades_table");
*/
/* dalesmckay - this does not work, so has been removed.
		requires more thought into how to sort the subgroups within each village
	}else if(window.game_data.mode=="units"){
		arrColumns=[
			["NT"],
			["village",/(.*?)\s\((\d+)\|(\d+)\)\sC(\d+)/,[[cText],[cNumber," ("],[cNumber,"|"],[cNumber,") C"]]],
			["location"],
			["sp",/(\d+)/,[[cNumber]]],
			["sw",/(\d+)/,[[cNumber]]],
			["ax",/(\d+)/,[[cNumber]]],
			["sc",/(\d+)/,[[cNumber]]],
			["lc",/(\d+)/,[[cNumber]]],
			["hc",/(\d+)/,[[cNumber]]],
			["ra",/(\d+)/,[[cNumber]]],
			["ca",/(\d+)/,[[cNumber]]],
			["no",/(\d+)/,[[cNumber]]],
			["action",/(.*)/,[[cText]]]
		];

		if(blArcher){
			fnAddColumn("ax",["ar",/(\d+)/,[[cNumber]]]);
			fnAddColumn("lc",["ma",/(\d+)/,[[cNumber]]]);	
		}

		if(blStatue){
			fnAddColumn("ca",["pa",/(\d+)/,[[cNumber]]]);
		}

		eleTable=eleDoc.getElementById("units_table");
*/		
	}else if(window.game_data.mode=="commands"){
		/*add some new columns? id & type ... 
			split attack name by ( and | ... or perhaps just space... 
			have as many sorts as there are splits... maybe
			Command	                                               Village of origin	arrival time	sp sw ax spy lc hc ra ca no								
		Attack on Built To Punish an Enslave (607|644) K66  	FUBAR (606|645) K66	today at 02:03	0	100	0	0	0	0	0	0	1

			for now forget about sorting by arrival time - except as text...
					
				link in column zero is ... http://en10.tribalwars.net/game.php?village=46929&screen=info_command&id=32269408&type=own
				blAttack ===
					new column 0 = id
					new column 1 = type
				
				commands
				<archer>1</archer> : Add Ar after ax and ma after lc
				<knight>1</knight> : Add pa after ca
		*/

		blAttack=true;
		arrColumns=[
			["ID",/(\d+)/,[[cNumber]]],
			["TY",/(.*)/,[[cText]]],
			["Name",/(.*?)\s\((\d+)\|(\d+)\)\sC(\d+)/,[[cText],[cNumber," ("],[cNumber,"|"],[cNumber,") C"]]],
			["origin",/(.*?)\s\((\d+)\|(\d+)\)\sC(\d+)/,[[cText],[cNumber," ("],[cNumber,"|"],[cNumber,") C"]]],
			["arrival",/(.*)/,[[cText]]],
			["sp",/(\d+)/,[[cNumber]]],
			["sw",/(\d+)/,[[cNumber]]],
			["ax",/(\d+)/,[[cNumber]]],
			["sc",/(\d+)/,[[cNumber]]],
			["lc",/(\d+)/,[[cNumber]]],
			["hc",/(\d+)/,[[cNumber]]],
			["ra",/(\d+)/,[[cNumber]]],
			["ca",/(\d+)/,[[cNumber]]],
			["no",/(\d+)/,[[cNumber]]]
		];

		if(blArcher){
			fnAddColumn("ax",["ar",/(\d+)/,[[cNumber]]]);
			fnAddColumn("lc",["ma",/(\d+)/,[[cNumber]]]);	
		}

		if(blStatue){
			fnAddColumn("ca",["pa",/(\d+)/,[[cNumber]]]);
		}

		eleTable=eleDoc.getElementById("commands_table");
	}else if(window.game_data.mode=="incomings"){
		/*Command	Destination	Origin	arrival time	Arrival in*/

		blAttack=true;
		arrColumns=[
			["ID",/(\d+)/,[[cNumber]]],
			["TY",/(.*)/,[[cText]]],
			["name"], /*["name",/(.*?)\s(\((\d+)\|(\d+)\))?(\sC(\d+))?/,[[cText],[cNumber," ("],[cNumber,"|"],[cNumber,") C"]]],*/
			["dest",/(.*?)\s\((\d+)\|(\d+)\)\sC(\d+)/,[[cText],[cNumber," ("],[cNumber,"|"],[cNumber,") C"]]],
			["player",/(.*)/,[[cText]]],
			["arrival time",/(.*)/,[[cText]]],
			["arrival in",/(.*)/,[[cText]]],
		];

		eleTable=eleDoc.getElementById("incomings_table");
	}else if(window.game_data.mode=="buildings"){
		/*buildings
				<knight>1</knight> : Add Statue after RP
				<church>1</church> : Add Church1 & ChurchX after workshop.
		*/

		arrColumns=[
			["CT"],
			["DM"],
			["village",/(.*?)\s\((\d+)\|(\d+)\)\sC(\d+)/,[[cText],[cNumber," ("],[cNumber,"|"],[cNumber,") C"]]],
			["pts",/(\d+)/,[[cNumber]]],
			["HQ",/(\d+)/,[[cNumber]]],
			["BA",/(\d+)/,[[cNumber]]],
			["ST",/(\d+)/,[[cNumber]]],
			["WK",/(\d+)/,[[cNumber]]],
			["AC",/(\d+)/,[[cNumber]]],
			["SM",/(\d+)/,[[cNumber]]],
			["RP",/(\d+)/,[[cNumber]]],
			["MA",/(\d+)/,[[cNumber]]],
			["WO",/(\d+)/,[[cNumber]]],
			["CL",/(\d+)/,[[cNumber]]],
			["IR",/(\d+)/,[[cNumber]]],
			["FM",/(\d+)/,[[cNumber]]],
			["WH",/(\d+)/,[[cNumber]]],
			["HI",/(\d+)/,[[cNumber]]],
			["WA",/(\d+)/,[[cNumber]]],
			["assignments"],
		];

		if(blStatue){
			fnAddColumn("RP",["SU",/(\d+)/,[[cNumber]]]);
		}

		if(blChurch){
			fnAddColumn("WK",["CH1",/(\d+)/,[[cNumber]]]);
			fnAddColumn("CH1",["CH2",/(\d+)/,[[cNumber]]]);		} 

		eleTable=eleDoc.getElementById("buildings_table");
	}else if(window.game_data.mode=="tech"){
		arrColumns=[
			["village",/(.*?)\s\((\d+)\|(\d+)\)\sC(\d+)/,[[cText],[cNumber," ("],[cNumber,"|"],[cNumber,") C"]]],
			["pts",/\b(\d*\.?\d+)\b/,[[cNumber]]],
			["sp",/(\d+)/,[[cNumber]]],
			["sw",/(\d+)/,[[cNumber]]],
			["ax",/(\d+)/,[[cNumber]]],
			["sc",/(\d+)/,[[cNumber]]],
			["lc",/(\d+)/,[[cNumber]]],
			["hc",/(\d+)/,[[cNumber]]],
			["ra",/(\d+)/,[[cNumber]]],
			["ca",/(\d+)/,[[cNumber]]],
			["assigments"],
		];

		if(blArcher){
			fnAddColumn("ax",["ar",/(\d+)/,[[cNumber]]]);
			fnAddColumn("lc",["ma",/(\d+)/,[[cNumber]]]);	
		}

		eleTable=eleDoc.getElementById("techs_table");
/* Sagato - this does not work, so has been removed.
	}else if(window.game_data.mode=="groups"){
		arrColumns=[
			["village",/(.*?)\s\((\d+)\|(\d+)\)\sC(\d+)/,[[cText],[cNumber," ("],[cNumber,"|"],[cNumber,") C"]]],
			["qty",/(\d+)/,[[cNumber]]],
			["pts",/\b(\d*\.?\d+)\b/,[[cNumber]]],
			["groups"],
			["edit"],
		];

		eleTable=eleDoc.getElementById("group_assign_table");
*/
	} else if(window.game_data.mode==null){
	        UI.ErrorMessage("Aper\347u non d\351termin\351\nVeuillez s\351l\351ctionner un aper\347u",3000);
		return;
	}

	if(typeof(eleTable)=="undefined"){
		UI.ErrorMessage("Le tri ne fonctionne pas sur cette aper\347u :\n" + eleDoc.location.search,3000);
		return;
	}

    	if(typeof(arrColumns)=="undefined"){
		UI.ErrorMessage("Le tri ne fonctionne pas sur cette aper\347u :\n" + eleDoc.location.search,3000);
		return;
	}

	if(typeof(blDebug)!="undefined"&&blDebug){
		fnStatus("arrColumns : ");
		for(idx1 in arrColumns){
			fnStatus("arrColumns : "+idx1+": "+arrColumns[idx1]);
		}
	}

	/* all fairly generic now...*/
	arrTable=[];
	var arrRow,idx1,idx2,idx3,strString,arrValue,eleCell;
	arrSupportReq=[];
	var xx = (eleTable.rows.length-1);
	if (window.game_data.mode=="commands") var xx = (eleTable.rows.length); 

	for(idx1=1;idx1<xx;idx1++){
		arrRow=[];
		idx3=1;

		if(blEditGroup){
			eleCell=eleTable.rows[idx1].cells[0];
			fnAddField(eleCell.getElementsByTagName("input")[1].checked,cText);
		}
		if(blAttack){
			eleCell=eleTable.rows[idx1].cells[0];
			strSearch=eleCell.getElementsByTagName("a")[0].href;
			strAttackID=strSearch.match(/\&id=(\d+)\b/i)[1];
			strType=strSearch.match(/\&type=(\w+)\b/i)[1];

			eleCell=eleTable.rows[idx1].insertCell(0);
			eleCell.appendChild(eleDoc.createTextNode(strType));
			eleCell=eleTable.rows[idx1].insertCell(0);
			eleCell.appendChild(eleDoc.createTextNode(strAttackID));
		}

		arrRow[0]=eleTable.rows[idx1].cloneNode(true);
		arrRow[1]=idx1;

		for(idx2=0;idx2<eleTable.rows[idx1].cells.length&&idx2<arrColumns.length;idx2++){
			eleCell=eleTable.rows[idx1].cells[idx2];
			strString=typeof(eleCell.innerText)=="undefined"?eleCell.textContent:eleCell.innerText;

			if(typeof(arrColumns[idx2])!="undefined"){
				if(typeof(arrColumns[idx2][1])!="undefined"){
					/* ok no stub this.. do something...*/
					var arrValue=strString.match(arrColumns[idx2][1]);

					arrColumns[idx2][2].forEach(
						function(arrField,idx4){
							if(arrValue){varValue=arrValue[idx4+1];}else{varValue=null;}
							fnAddField(varValue,arrField[0]);
						}
					);
				}
			}
		}

		arrTable.push(arrRow);
	}

/*	if(blRequestSupport && (typeof(eleTable.rows[idx1])!="undefined")){
		arrRow = [];
		arrRow[0]=eleTable.rows[idx1].cloneNode(true);
		arrRow[1]=idx1;
		arrSupportReq.push(arrRow);
	}
*/
	if(typeof(eleTable.rows[idx1])!="undefined"){
		arrRow = [];
		arrRow[0]=eleTable.rows[idx1].cloneNode(true);
		arrRow[1]=idx1;
		arrSupportReq.push(arrRow);
	}
	if(typeof(blDebug)!="undefined"&&blDebug){
		tmpTable=eleDoc.createElement("table");
		tmpRow=tmpTable.insertRow(0);

		for(j=1;j<arrTable[0].length;j++){
			tmpTH=eleDoc.createElement("th");
			tmpTH.appendChild(eleDoc.createTextNode(j));
			tmpRow.appendChild(tmpTH);
		}

		for(i=0;i<arrTable.length;i++){
			tmpRow=tmpTable.insertRow(-1);
			for(j=1;j<arrTable[i].length;j++){
				tmpCell=tmpRow.insertCell(-1);
				tmpCell.appendChild(eleDoc.createTextNode(arrTable[i][j]));
			}
		}

		eleDoc.body.appendChild(tmpTable);
		eleDoc.body.appendChild(eleDoc.createElement("br"));
	}

	arrCSSs=[];
	arrCSSs.push(["div.clear","clear:both;vertical-align:bottom;"]);
	arrCSSs.push(["div.text","float:left;"]);
	arrCSSs.push(["div.sort","float:left;width:0.7em"]);
	arrCSSs.push(["div.asc","width:0;height:0;line-height:0;margin-top:.0em;border-top:0px solid;border-right:.3em solid rgb(222,211,185);border-bottom:.8em solid;border-left:.3em solid rgb(222,211,185);float:left;margin-left:0px;"]);
	arrCSSs.push(["div.desc","width:0;height:0;margin-top:.2em;line-height:0;border-top:.8em solid ;border-left:.3em solid rgb(222,211,185);border-right:.3em solid rgb(222,211,185);border-bottom:0px solid;float:left;"]);
	arrCSSs.push(["div.EventHover","border-top-color:#0082BE;border-bottom-color:#0082BE;"]);
	arrCSSs.push(["div.EventActive","border-top-color:#C00;border-bottom-color:#C00;"]);
	arrCSSs.push(["div.EventInactive","border-top-color:#fff;border-bottom-color:#fff;"]);

	eleCSS=document.styleSheets[0];

	function fnInsertRule(arrCSS,idx){
		eleCSS.insertRule(arrCSS[0]+"{"+arrCSS[1]+"}",idx);
	}

	function fnAddRule(arrCSS,idx){
		eleCSS.addRule(arrCSS[0],arrCSS[1],idx);
	}

	try{arrCSSs.forEach(fnInsertRule);
		fnStatus("CSS rules OK - not IE");
	}
	catch(objError){
		try{
			arrCSSs.forEach(fnAddRule);
			fnStatus("CSS rules OK - IE");
		}
		catch(objError){
			fnStatus("CSS rules BAD : "+objError);
		}
	}

	idx3=1;
	var idx1,idx2,idx3,eleClearDiv,eleSortDiv;

	/* add a column for the type & attack ID */
	if(blAttack){		
		eleCell=eleTable.rows[0].insertCell(0);
		eleTH=eleDoc.createElement("th");
		eleTH.appendChild(eleDoc.createTextNode("type"));
		eleCell.appendChild(eleTH);
		
		eleCell=eleTable.rows[0].insertCell(0);
		eleTH=eleDoc.createElement("th");
		eleTH.appendChild(eleDoc.createTextNode("Attack ID"));
		eleCell.appendChild(eleTH);
	}

	var colHead=eleTable.getElementsByTagName("th");
	if (window.game_data.mode=="incomings") colHead.Length=colHead.length-2; 
	for(idx1=0;idx1<colHead.length;idx1++){
		var arrCell=arrColumns[idx1][2];

		/*["{name}",{regex pattern},[sort elements array]]*/
		if(typeof(arrCell)!="undefined"){
			if(arrCell.length>0){
				var colHeadContent=colHead[idx1].childNodes;
				eleClearDiv=eleDoc.createElement("div");
				eleClearDiv.className="clear";
				
				/* for the add remove groups membership screens... add the checkbox*/
				if(blEditGroup&&idx1==0){
					idx3++;
					fnAddSortLinks(eleClearDiv,idx3);
				}

				var eleTextDiv=eleDoc.createElement("div");
				eleTextDiv.className="text";

				for(idx2=0;idx2<colHeadContent.length;idx2++){
					eleTextDiv.appendChild(colHeadContent[idx2]);
				}

				eleClearDiv.appendChild(eleTextDiv);

				arrCell.forEach(
					function(arrField,idx4){
						idx3++;
						fnAddSortLinks(eleClearDiv,idx3,arrField[1],arrField[2]);
					}
				);

				colHead[idx1].appendChild(eleClearDiv);				}	
		}
	}
}

function fnText(eleRef,strText){
	var eleTextDiv=eleDoc.createElement("div");
	eleTextDiv.className="text";
	eleTextDiv.appendChild(eleDoc.createTextNode(strText));
	eleRef.appendChild(eleTextDiv);
}

function fnEvent(objEvent){
	var objElement;
	var strType="";
	try{
		objElement=objEvent.target;strType="target";
	}
	catch(objError){
		try{
			objElement=objEvent.srcElement;strType="srcElement";
		}
		catch(objError){
			objEvent=event;objElement=event.srcElement;strType="event";
		}
	}

	var strName=objElement.name;
	if(typeof(blDebug)!="undefined"&&blDebug){
		fnStatus(strType+" "+objEvent.type+" event on "+objElement.nodeType+":"+objElement.tagName+objElement.name);
	}

	return objElement;
}

function fnEventClass(objDiv,strClass,blOverrideActive){
	if(!objDiv.className.match(/\bEventActive\b/)||blOverrideActive){
		objDiv.className=objDiv.className.replace(/\bEvent\w+?\b/," "+strClass);
	}
}

function fnHover(objEvent){
	objDiv=fnEvent(objEvent);

	fnEventClass(objDiv,"EventHover",false);
	if(typeof(blDebug)!="undefined"&&blDebug){
		fnStatus("hover");
	}

	return true;
}

function fnOut(objEvent){
	objDiv=fnEvent(objEvent);

	fnEventClass(objDiv,"EventInactive",false);
	if(typeof(blDebug)!="undefined"&&blDebug){
		fnStatus("out");
	}

	return true;
}

function fnClick(objEvent){
	objDiv=fnEvent(objEvent);

	if(objDiv.className.match(/\bEventActive\b/)){
		return;
	}

	colDiv=eleTable.rows[0].getElementsByTagName("div");

	for(idx1=0;idx1<colDiv.length;idx1++){
		if(colDiv[idx1].className.match(/\bEventActive\b/)){
			fnEventClass(colDiv[idx1],"EventInactive",true);
		}
	}

	fnEventClass(objDiv,"EventActive",true);

	var intSort,intSortId;

	if(objDiv.name.match(/_desc$/)){
		intSort=-1;	
	}else{
		intSort=1;
	}

	intSortId=parseInt(objDiv.name.match(/\d+/)[0],10);
	arrSortBys=arrSortBys.filter(function(arrSortBy){return arrSortBy[0]!=intSortId;});
	arrSortBys.unshift([intSortId,intSort]);

	if(typeof(blDebug)!="undefined"&&blDebug){
		fnStatus("click:"+objDiv.name+":"+intSort+":"+intSortId+":"+arrSortBys.length);
	}

	arrTable.sort(
		function(arrRowA,arrRowB){
			for(idx1=0;idx1<arrSortBys.length;idx1++){
				intSortId=arrSortBys[idx1][0];
				intSort=arrSortBys[idx1][1];
			
				if(arrRowA[intSortId]<arrRowB[intSortId]){
					return intSort*-1;
				}else{
					if(arrRowA[intSortId]>arrRowB[intSortId]){
						return intSort;
					}
				}
			}
		}
	);

	for(idx1=eleTable.rows.length-1;idx1>0;idx1--){
		eleTable.deleteRow(idx1);
	}

	eleObj=eleTable.getElementsByTagName("tbody")[0];
	arrTable.forEach(function(arrRow,idx1){eleObj.appendChild(arrRow[0]);})
	
	arrSupportReq.forEach(function(arrRow,idx1){eleObj.appendChild(arrRow[0]);});

	return true;
}