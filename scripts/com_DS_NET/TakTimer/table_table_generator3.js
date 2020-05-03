javascript: /* OVERVIEW SELECTOR *//* Version Data */scriptName = "Overview Selector";
majorVersion = "1";
minorVersion = "00"; /*End Version Data*/
if (typeof (defaultExString) == "undefined")
   {defaultExString = "";
   }
else 
   {defaultExString += " ";
   }
/* Define major object variables */
selectionsPositive = "false";
cTab = $("table[id$='_table']")[$("table[id$='_table']").length - 1];
heads = cTab.getElementsByTagName("th");
rows = cTab.getElementsByTagName("tr");
mainTable = cTab; 
/* End define major object variables */
for (i = 0;i < heads.length;i++)
   {heads[i].innerHTML += "<input type='checkbox' id='includeColumnInputBox_" + i + "'></input>";
   }
/* Add and Identify Checkboxes */
rows[0].innerHTML += "<th>Include village?</th>";
for (i = 1;i < rows.length;i++)
   {   rows[i].innerHTML += "<td><input type='checkbox' id='includeCoordsInputBox_" + i + "'></input></td>";
   }
cTab.parentNode.innerHTML = 
  "<input type='button' value='Select/Deselect All' onClick='javascript: selectAll(); void(0);'></input><input type='button' value='Invert Selection' onClick='javascript: invertAll(); void(0);'></input><input type='button' value='Output Table' onClick='javascript: tableGet(); void(0);'></input>" + cTab.parentNode.innerHTML; 
/* End Add and Identify Checkboxes */

/* Define functions */

function selectAll()
   {if (selectionsPositive == "false")
       {selectionsPositive = "true";
        for (i = 1;i < rows.length;i++)
           {box = document.getElementById("includeCoordsInputBox_" + i);
            box.checked = true;
           }
       }
    else if (selectionsPositive == "true")
       {selectionsPositive = "false";
        for (i = 1;i < rows.length;i++)
           {box = document.getElementById("includeCoordsInputBox_" + i);
            box.checked = false;
           }
       }
   }

function invertAll()
   {for (i = 1;i < rows.length;i++)
       {box = document.getElementById("includeCoordsInputBox_" + i);
        if (box.checked == true)
           {box.checked = false;
           }
        else if (box.checked == false)
           {box.checked = true;
           }
       }
   }
/* End define functions */

/* Assign ids */
selAll = document.getElementById("selectAllBox");
invAll = document.getElementById("invertListBox"); 
/* End assign ids */
/* END OVERVIEW SELECTOR */

function tableGet()
   {headers =[];
    x = 0;
    for (i = 0;i < heads.length - 1;i++)
       {boxCheck = document.getElementById("includeColumnInputBox_" + i).checked.toString();
        if (boxCheck == "true")
           {imgs = heads[i].getElementsByTagName("img");
            if (imgs.length != 0)
               { /*headers[x] = imgs[0].title.toString().trim();*/headers[x] ="[img]" + imgs[0].src +"[/img]";
                x = x + 1;
               }
            else 
               {headers[x] = $(heads[i]).text();
                x = x + 1;
               }
           }
       }
    headers ="[**]" + headers.join("[||]") +"[/**]";
    rData =[];
    rows = cTab.getElementsByTagName("tr");
    tempData = "";
    tempData2 =[];
    sDate = $("#serverDate").text();
    tDate = sDate.split( "/");
    tDate = parseInt(tDate[0]) + 1 + "/" + tDate[1] + "/" + tDate[2];
    for (i = 1;i < rows.length;i++)
       {kk = 0;
        rBox = document.getElementById("includeCoordsInputBox_" + i).checked.toString();
        if (rBox != "false")
           {tempData = rows[i].getElementsByTagName("td");

            for (ii = 0;ii < tempData.length-1;ii++)
               {if (document.getElementById("includeColumnInputBox_" + ii).checked.toString() != "false"){
                if (tempData[ii].getElementsByTagName("a").length != 0)
                   {if($(tempData[ii].getElementsByTagName("a")[0].getElementsByTagName("span")[0]).text().match(/\(\d+\|\d+\)/)){ tString1 = $(tempData[ii].getElementsByTagName("a")[0].getElementsByTagName("span")[0]).text().match(/\(\d+\|\d+\)/gi); 
  tString1 = tString1[tString1.length-1];
   tempData2[kk] ="[claim]" + tString1 + "[/claim]";}
else{tempData2[kk] ="[url=" + tempData[ii].getElementsByTagName("a")[0].href +"]" + $(tempData[ii]).text().trim() + "[/url]";}
                   }

                else if (tempData[ii].getElementsByTagName("img").length != 0)
                   {images = tempData[ii].getElementsByTagName("img");
                    tempData2[kk] = "";

                    for (z = 0;z < images.length;z++)
                       {tempData2[kk] +="[img]" + images[z].src +"[/img](" + images[z].title.toString().split( "-")[0] + ")" + $(tempData[ii]).text().trim();
                       }
                   }
                else 
                   {tempData2[kk] = $(tempData[ii]).text().trim().replace("today at", sDate + " at ").replace("tomorrow at", 
                      tDate + " at ");
                   }
               kk=kk+1;
               }
            if (tempData2 !== "")
               {rData[i - 1] = "[*]" + tempData2.join("[||]") + "\n";
               }
           }
       }}
rData2 = [];
jj = 0;
for(i=0; i < rData.length; i++)
   {if(rData[i] != ("" || " "))
      {rData2[jj] = rData[i];
       jj++;
      }
   }
rData = rData2;
jj = 0;
    outputTable = "[table]\n" + headers + "\n";
    outputTable += rData.join("");
    outputTable += "[/table]\n\nTotal characters = " + (outputTable.toString().length) + 
      " and headers and tables -ish";
alert(outputTable);
   }
void (0);