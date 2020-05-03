/*Original script by File not Found */
/*Released  30/03/2011              */
/*                                  */
/*Adds some filtering options to the*/
/*Incommings overview               */


table = $("th:contains('Arrival in')")[0].parentNode.parentNode;
rows = table.getElementsByTagName("tr");
headers = rows[0].getElementsByTagName("th");


headers[0].innerHTML += "\t Title Match<input type='text' size='10' id='titleMatch' onChange='javascript: goTextMatch(0); void(0);' />";

headers[1].innerHTML += "\t Text Match:<input type='text' id='textFilter' size='10' onChange='javascript: goTextMatch(1); void(0);' />\t Coord Match:<input type='text' id='coordFilter' size='7' onChange='javascript: goCoordMatch(1); void(0);' />";

headers[2].innerHTML += "\t <input type='text' size='10' id='playerFilter' onChange='javascript: goTextMatch(2); void(0);' />";

function textMatch(cellNum)
   {if($(cells[cellNum].getElementsByTagName("a")[0].firstChild).text().match(headers[0].getElementsByTagName("input")[0].value))
       {ignoreBox.checked = true;
       }
    else
       {if(removeFalse == true){ignoreBox.checked = false;}
       }
   }

function goCoordMatch(cellNum)
   {for(i=1; i<rows.length-1; i++)
      {cells = rows[i].getElementsByTagName("td");
       ignoreBox = cells[0].getElementsByTagName("input")[1]; 
       coords = $(cells[1].getElementsByTagName("a")[0].firstChild).text();
       coords = coords.split(/\(/);
       coords = coords[coords.length-1].split(/\)/)[0];
       if(coords.match($("#coordFilter")[0].value))
       {ignoreBox.checked = true;
       }
    else
       {if(removeFalse == true){ignoreBox.checked = false;}
       }
      }
   }

function goTextMatch(CN)
   {for(i=1; i<rows.length-1; i++)
      {cells = rows[i].getElementsByTagName("td");
       ignoreBox = cells[0].getElementsByTagName("input")[1]; 
       textMatch(CN);
      }
   }