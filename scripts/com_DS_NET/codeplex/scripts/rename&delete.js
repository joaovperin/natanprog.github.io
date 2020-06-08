/* 

	This work is licensed under the Creative Commons Attribution-ShareAlike 3.0 Unported License.
	To view a copy of this license, visit http://creativecommons.org/licenses/by-sa/3.0/

*/

JavaScript:

	/* the below loop is used to find the table containing the reports */
    var eleSpans = document.getElementsByTagName("span");
	for(var x=0;x<eleSpans.length;x++){
		if(eleSpans[x].id.match(/label_/i)){ /* when a span with an id containing "label_" (the underscore is n.b.) is within the appropriate table */
			table=getParent(eleSpans[x], "table");
			break;
		}
	}

	/* simple function to parse the text from html, needed because of different standards within browsers */
	function theInnerText(theNode) {
		return typeof(theNode.innerText) == "undefined"? theNode.textContent : theNode.innerText;
	}

	/* function to get the 'real' parentNode of an element */
	function getParent(obj, ele){
		var table = obj;
		do {
			table = table.parentNode;
		} while(!table.nodeName.match(new RegExp(ele, "i")));
		return table;
	}

	/* renamer for outgoing attacks --unedited in the current version */
	function overView(){
		var eleTrs=table.rows;
		var headers=eleTrs[0].getElementsByTagName("th");

		function getHeader(ele){
			for(var i=0;i<headers.length;i++){
				if(headers[i].innerHTML.match(ele,"i"))
					return i;
			}
		}
		for(var x=1;x<eleTrs.length;x++){
			var inputs=eleTrs[x].getElementsByTagName("input");
			if(inputs[0].value.match(/(Attack on|Support for|Atac asupra|Sprijin pentru)/i)){
				var spear=eleTrs[x].cells[getHeader("spear")].innerHTML;
				var sword=eleTrs[x].cells[getHeader("sword")].innerHTML;
				var axe=eleTrs[x].cells[getHeader("axe")].innerHTML;
				var scout=eleTrs[x].cells[getHeader("spy")].innerHTML;
				var lc=eleTrs[x].cells[getHeader("light")].innerHTML;
				var hc=eleTrs[x].cells[getHeader("heavy")].innerHTML;
				var ram=eleTrs[x].cells[getHeader("ram")].innerHTML;
				var cat=eleTrs[x].cells[getHeader("catapult")].innerHTML;
				var noble=eleTrs[x].cells[getHeader("snob")].innerHTML;
				var coord = inputs[0].value.match(/(\d+\|\d+)\) (K\d+)/);
				inputs[0].value = "Fake";
				if(lc < 250 && lc != 0){inputs[0].value = "Farming";}
				if(hc > 250){inputs[0].value = "fast support";}
				if(scout > 50){inputs[0].value = "Scout";}
				if(spear > 100){inputs[0].value = "Support";}
				if(sword > 100){inputs[0].value = "Support";}
				if(cat == 1 && scout <= 100){inputs[0].value = "Intel Fake";}
				if(cat >= 30){inputs[0].value = "Cat wave";}
				if(axe > 1000 && lc > 500){inputs[0].value = "Nuke";}
				if(ram == 1 && scout <= 5){inputs[0].value = "Fake";}
				if(noble == 1){inputs[0].value = "Noble";}
				inputs[0].value = coord[1] + " " + coord[2] + " " + inputs[0].value;
				inputs[1].click();
			}
		}
	}

	/* the actual number of reports on the page, used for looping through each report */
	var numReports = table.rows.length;

	/* function used to mark a report based on the text of the report */
	function mark(str, type) {
		/* stop marking all reports when the checkbox to remember selection is selected and textbox is empty */
		if(document.getElementById("check_and").checked==true && str=="")
			return;
		var checkbox = null, row = null;
		for(var i=2; i<numReports; i++) { /* loop through each report */
			/* get current row/report */
			row = table.rows[i];
			/* get the checkbox of the current report */
			checkbox = row.getElementsByTagName("input")[0];

			if(str.match(/:OR:/)) { /* if the user entered an OR selection in the textbox */
				/* split the contents of the textbox */
				var splitStrs = str.split(":OR:");
				for(var x=0; x<splitStrs.length; x++) {
					mark(splitStrs[x], true);
				}
			}

			if(str.match(/:AND:/)) { /* if the user entered an AND selection in the textbox */
				/* split the contents of the textbox */
				var splitStrs = str.split(":AND:");
				var ifStatement = true;
				/* if the report contains both of the phrases */
				for(var y=0; y<splitStrs.length; y++) {
					if(!theInnerText(row).match(new RegExp(splitStrs[y], "i"))) {
						ifStatement = false;
						break;
					}
				}
				if(ifStatement) {
					checkbox.checked = type;
				}
			}

			if(theInnerText(row).match(new RegExp(str, "i"))) { /* if the report contains the text */
				checkbox.checked = type;
			}
		}
	}

	function imageMark(str, type) { /* function to mark a report based on it's image */
		/* variable to store the current report */
		var row = null;
		for(var i=2; i<numReports; i++) { /* loop through all the reports */
			row = table.rows[i];
			if(row.innerHTML.match(new RegExp(str, "i"))) { /* if the reports html matchs the passed String */
				row.getElementsByTagName("input")[0].checked = type;
			}
		}
	}

	function coords(str) { /* to select reports based on the coordinates in it's title */
		var coord = null;
		var title = null;
		/* split-up the coordinates entered into an array */
		var coords = str.split(" ");
		for(var i=2; i<numReports; i++) { /* loop through all the reports */
			for(var k=0; k<coords.length; k++) { /* loop through all the coordinates entered */
				/* split-up the coordinate into it's x and y parts */
				coord = coords[k].split("|");
				/* store the title of the report */
				title = table.rows[i].getElementsByTagName("input")[1].value;
				if(title.match(new RegExp(coord[0], "i")) && title.match(new RegExp(coord[1], "i"))) { /* if the title contains the coordinate */
					table.rows[i].getElementsByTagName("input")[0].checked = true;
				}
			}
		}
	}

	function invert() { /* a function to invert the entire selection */
		/* variable to store the checkbox of the current report */
		var checkbox = null;
		for(var i=2; i<numReports; i++) { /* loop through all the reports */
			checkbox = table.rows[i].getElementsByTagName("input")[0];
			if(checkbox.checked == true) {
				checkbox.checked = false;
			} else {
				checkbox.checked = true;
			}
		}
	}

	function allOthers() { /* function to select reports that are of the same village */
		/* variable to store the current report and variable to store the coordinate of the report */
		var row = null, checkCoord = null;
		for(var i=2; i<numReports; i++) { /* loop through all the reports */
			/* parse coordinate of current report */
			checkCoord = theInnerText(table.rows[i]).match(/.*\((\d+)\|(\d+)\)/);
			if(checkCoord) { /* if there is a coordinate in the report */
				for(var x=i+1; x<numReports; x++) { /* loop through the rest of the reports to check for another occurance of the coord */
					row = table.rows[x];
					if(theInnerText(row).match(checkCoord[1], "i") && theInnerText(row).match(checkCoord[2], "i")) {
						row.getElementsByTagName("input")[0].checked = true;
					}
				}
			}
		}
	}

	function appendIcons(input, input2) { /* function to append the selection icons to the page */
		/* this is here so old scripts without input2 defined won't crash */
		if(typeof input2 == "undefined")
			input2 = "Coords";
		/* create the icons */
		var newElement='<tr id="markReportTr"><th><a href="JavaScript:mark(\'\',false);imageMark(\'green.png\',true);"><img src="/graphic/dots/green.png?1" title="Select all green reports." /></a><a href="JavaScript:mark(\'\',false);imageMark(\'yellow.png\',true);"> <img src="/graphic/dots/yellow.png?1" title="Select all yellow reports." /></a><a href="JavaScript:mark(\'\',false);imageMark(\'red.png\',true);"> <img src="/graphic/dots/red.png?1" title="Select all red reports." /></a><a href="JavaScript:mark(\'\',false);imageMark(\'blue.png\',true);"> <img src="/graphic/dots/blue.png?1" title="Select all scout reports." /></a><a href="JavaScript:mark(\'\',false);imageMark(\'max_loot\/0.png\',true);"> <img src="/graphic/max_loot/0.png?1" title="Select all reports with no resources remaining." /></a> <a href="JavaScript:mark(\'\',false);imageMark(\'max_loot\/1.png\',true);"> <img src="/graphic/max_loot/1.png?1" title="Select all reports with resources remaining." /></a> <a href="JavaScript:mark(\'\',false);imageMark(\'forwarded.png\',true);"> <img src="/graphic/forwarded.png?1" title="Select all forwarded reports." /></a> <a href="JavaScript:mark(\'\',false);allOthers();"> <img src="/graphic/map/map_s.png?1" title="Select all sequential reports." /></a> <input value="' + input + '" type="text" size="10" onKeyUp="mark(\'\',false);mark(this.value,true)" /> <a href="JavaScript:invert();"> <img src="/graphic/group_jump.png?1" title="Invert the current selection." /></a> <input type="checkbox" id="check_and" /> <input value="' + input2 + '" type="text" size="10" onKeyUp="mark(\'\',false);coords(this.value)" /></th></tr>';
		/* if the icon row is not already on the page, append it to the page */
		if(document.getElementById("markReportTr") == null)
			table.innerHTML = newElement + table.innerHTML + newElement;
		/* get the position to place the second delete button */
		var delRow = document.forms[0].getElementsByTagName("table")[0].rows[0];
		delRow.parentNode.innerHTML = '<input type="submit" value="Delete" name="del" />' + delRow.parentNode.innerHTML;
	}