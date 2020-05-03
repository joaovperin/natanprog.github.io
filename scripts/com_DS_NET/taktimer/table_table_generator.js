/* `User end script */
/*javascript: $.getScript("http://taktimer.net/scripts/table_table_generator.sj");  void(0);*/

cTab = $("table[id$='_table']")[$("table[id$='_table']").length - 1];
heads = cTab.getElementsByTagName("th");
headers =[];
for (i = 0;i < heads.length;i++)
   {imgs = heads[i].getElementsByTagName("img");
    if (imgs.length != 0)
       { /*headers[i] = imgs[0].title.toString().trim();*/headers[i] ="[img]" + imgs[0].src +"[/img]";
       }
    else 
       {headers[i] = $(heads[i]).text();
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
for (i = 1;i < rows.length - 1;i++)
   {tempData = rows[i - 1].getElementsByTagName("td");
    for (ii = 0;ii < tempData.length;ii++)
       {if (tempData[ii].getElementsByTagName("a").length != 0)
           {tempData2[ii] ="[url=" + tempData[ii].getElementsByTagName("a")[0].href +"]" + $(tempData[ii]).text().trim() + 
              "[/url]";
           }
        if (tempData[ii].getElementsByTagName("img").length != 0)
           {images = tempData[ii].getElementsByTagName("img");
            tempData2[ii] = "";
            for (z = 0;z < images.length;z++)
               {tempData2[ii] +="[img]" + images[z].src +"[/img](" + images[z].title.toString().split( "-")[0] +")" + $(tempData[ii]).text().trim();
               }
           }
        else 
           {tempData2[ii] = $(tempData[ii]).text().trim().replace("today at", sDate + " at ").replace("tomorrow at", tDate + 
              " at ");
           }
       }
    rData[i - 1] = tempData2.join("[||]");
   }
alert("[table]\n" + headers + "\n" + rData.join("[*]") + "\n[/table]\n\nTotal characters = " + (rData.toString().length) + 
  " and headers and tables -ish");
void (0);