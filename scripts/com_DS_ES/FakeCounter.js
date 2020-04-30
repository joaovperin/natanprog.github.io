function FakeCounter(){
	try{
		var _win=(window.main||self),$=_win.$;
		
		if(!_win.game_data.mode){
			var vmode=$('#overview_menu td[class="selected"] a').attr('href');
			vmode=vmode?vmode.match(/mode\=(\w*)/i):null;
			_win.game_data.mode=vmode?vmode[1]:null;
		}
	
	
		if(_win.game_data.mode != 'incomings'){
			throw("Debes usar el script en pagina con ataques recibidos.");
		}

		return{
			execute:function(){fnQueryIncomingAttacks();}
		};
	}
	catch(objError){
		UI.ErrorMessage(String(objError.message||objError||''), 5000);
	}


	function fnQueryIncomingAttacks(){

		try{	
			var summary = [];
			
			$('#incomings_table tr:has(img[src*="/attack.png"]) td:nth-child(3)').each(function(i,e){
				var coords=$(e).text().match(/\d+\|\d+/g);
				coords = coords?coords[coords.length - 1]:null;
				if(typeof(summary[coords])=="undefined")
					summary[coords] = {tally:0,html:$(e).closest('tr').find('td:eq(2)').html()};
					
				summary[coords].tally++;
			});
			
			$('#incomings_table tr:has(img[src*="/attack.png"]) td:nth-child(3)').each(function(i,e){
				var coords=$(e).text().match(/\d+\|\d+/g);
				coords = coords?coords[coords.length - 1]:null;
				

				var cell=$(e).closest('tr').find('td:eq(2)');
				cell.html('(' + summary[coords].tally + ') ' + cell.html());
			});
		

			var count=0;
			var attackSummary=[];
			for(var coords in summary){
				if(summary.hasOwnProperty(coords))
					attackSummary[count++]=summary[coords];
			}
		
			attackSummary.sort(function(a,b){return b.tally - a.tally;});

			var docSource='\
				<html>\
					<head>\
						<title> Fake Counter</title>\
						<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>\
						<link rel="stylesheet" type="text/css" href="/style.php"/>\
					</head>\
					<body>\
						<h3>Lista:</h3><hr>\
					</body>\
				</html>\
			';

			var popup=window.open('about:blank','Fake Counter','width=400,height=480,scrollbars=yes');
			popup.document.open('text/html','replace');
			popup.document.write(docSource);
			popup.document.close();
			void(0);
			popup.focus();
		
			var eleDIV=popup.document.createElement("div");
			eleDIV.setAttribute("id","div_attack_summary");
			popup.document.body.appendChild(eleDIV);

			var resultTable=popup.document.createElement("table");
			resultTable.setAttribute("id","table_attack_summary");
			resultTable.setAttribute("class","vis");
			resultTable.setAttribute("width","100%");
			eleDIV.appendChild(resultTable);
	
			curRow=resultTable.insertRow(0);
			curRow.setAttribute("style","white-space:nowrap");
			curTH=popup.document.createElement("th");
			curTH.appendChild(popup.document.createTextNode("Sate"));
			curRow.appendChild(curTH);
			curTH=popup.document.createElement("th");
			curTH.appendChild(popup.document.createTextNode("Numar"));
			curRow.appendChild(curTH);

			for(var ii=0; ii < attackSummary.length; ii++){
				curRow=resultTable.insertRow(-1);
				curRow.setAttribute("class",(ii%2)?"row_b":"row_a");
				curRow.setAttribute("style","white-space:nowrap");
			
				curTD=popup.document.createElement("td");
				curTD.innerHTML=attackSummary[ii].html;
				curRow.appendChild(curTD);
			
				curTD.getElementsByTagName("a")[0].setAttribute("target","tw.main");
			
				curTD=popup.document.createElement("td");
				curTD.setAttribute("align","right");
				curTD.innerHTML=attackSummary[ii].tally;
				curRow.appendChild(curTD);
			}

		}
		catch(objError){
			fnHandleError(objError);
		}
	}
}


if(typeof(scriptOb)=="undefined"){
	var scriptObj = new FakeCounter;
	scriptObj.execute();
}

void(0);