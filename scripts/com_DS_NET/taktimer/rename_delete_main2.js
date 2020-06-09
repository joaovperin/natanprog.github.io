JavaScript: var win = (window.frames.length > 0) ? window.main: window;
var doc = win.document;
var J = win.$;
var eleSpans = doc.getElementsByTagName("span");
table = $("table:contains('Village of origin')");
table = table[table.length-1];
eleTrs = table.rows;
headers = eleTrs[0].getElementsByTagName("th");


function theInnerText(theNode)
   {return typeof (theNode.innerText) == 'undefined' ? theNode.textContent: theNode.innerText;
   }

function overView()
   {function getHeader(ele)
       {for (i = 0;i < headers.length;i++)
           {if (headers[i].innerHTML.match(ele, "i")) return i;
           }
       }
    for (x = 1;x < eleTrs.length;x++)
       {inputs = eleTrs[x].getElementsByTagName("input");
        if (inputs[0].value.match(/(Attack on|Support for)/i))
           {var spear = eleTrs[x].cells[getHeader('spear')].innerHTML;
            var sword = eleTrs[x].cells[getHeader('sword')].innerHTML;
            var axe = eleTrs[x].cells[getHeader('axe')].innerHTML;
            var scout = eleTrs[x].cells[getHeader('spy')].innerHTML;
            var lc = eleTrs[x].cells[getHeader('light')].innerHTML;
            var hc = eleTrs[x].cells[getHeader('heavy')].innerHTML;
            var ram = eleTrs[x].cells[getHeader('ram')].innerHTML;
            var cat = eleTrs[x].cells[getHeader('catapult')].innerHTML;
            var noble = eleTrs[x].cells[getHeader('snob')].innerHTML;
            var coord = inputs[0].value.match(/(\d+\|\d+)\) (K\d+)/);
            inputs[0].value = 'Fake';
            if (lc < 250 && lc != 0)
               {inputs[0].value = 'Farming';
               }
            if (hc > 250)
               {inputs[0].value = 'fast support';
               }
            if (hc > 250 && axe > 1000)
               {inputs[0].value = 'HC Nuke';
               }
            if (scout > 50)
               {               inputs[0].value = 'Scout';
               }
            if (spear > 100)
               {               inputs[0].value = 'Support';
               }
            if (sword > 100)
               {inputs[0].value = 'Support';
               }
            if (cat == 1 && scout <= 100)
               {inputs[0].value = 'Intel Fake';
               }
            if (cat == 35)
               {inputs[0].value = 'fanged fake';
               }
            if (axe > 1000 && lc > 500)
               {inputs[0].value = 'Nuke';
               }
            if (ram == 1 && scout <= 5)
               {inputs[0].value = 'Fake';
               }
            if (noble == 1)
               {inputs[0].value = 'Noble';
               }
            inputs[0].value = coord[1] + ' ' + coord[2] + ' ' + inputs[0].value;
            inputs[1].click();
           }
       }
   }
var eleTds = table.getElementsByTagName('td');

function mark(str, type)
   {if (doc.getElementById("check_and").checked == true && str == '') return;
    for (var i = 0;i < eleTds.length;i = i + 2)
       {if (str.match(/:OR:/))
           {var splitStrs = str.split(":OR:");
            for (var x = 0;x < splitStrs.length;x++)
               {mark(splitStrs[x], true);
               }
           }
        if (str.match(/:AND:/))
           {var splitStrs = str.split(":AND:");
            var ifStatement;
            for (var y = 0;y < splitStrs.length;y++)
               {if (theInnerText(eleTds[i]).match(splitStrs[y], "i")) ifStatement = true;
                else 
                   {ifStatement = false;
                    break;
                   }
               }
            if (ifStatement)
               {J(eleTds[i]).find('input').get(0).checked = type;
               }
           }
        if (theInnerText(eleTds[i]).match(str, "i"))
           {J(eleTds[i]).find('input').get(0).checked = type;
           }
       }
   }

function imageMark(str, type)
   {for (var i = 0;i < eleTds.length;i = i + 2)
       {if (eleTds[i].innerHTML.match(str, "i"))
           {J(eleTds[i]).find('input').get(0).checked = type;
           }
       }
   }

function invert()
   { inputs = table.getElementsByTagName("input");
    for (var i = 2;i < (inputs.length - 3);i++)
       {if (inputs[i].checked == true) inputs[i].checked = false;
        else inputs[i].checked = true;
       }
   }

function allOthers()
   {for (var i = 0;i < eleTds.length;i = i + 2)
       {var testCoord = theInnerText(eleTds[i]).match(/.*\((\d+)\|(\d+)\)/);
        if (testCoord)
           {for (x = i + 2;x < eleTds.length;x = x + 2)
               {if (theInnerText(eleTds[x]).match(testCoord[1], 'i') && theInnerText(eleTds[x]).match(testCoord[2], 'i')) J(eleTds[x]).find('input').get(0).checked = true;
               }
           }
       }
   }

function appendIcons(input)
   {var newElement = 
      '<tr id="markReportTr"><th><a href="JavaScript:mark(\'\',false);imageMark(\'green.png\',true);"><img src="/graphic/dots/green.png?1" /></a><a href="JavaScript:mark(\'\',false);imageMark(\'yellow.png\',true);"> <img src="/graphic/dots/yellow.png?1" /></a><a href="JavaScript:mark(\'\',false);imageMark(\'red.png\',true);"> <img src="/graphic/dots/red.png?1" /></a><a href="JavaScript:mark(\'\',false);imageMark(\'blue.png\',true);"> <img src="/graphic/dots/blue.png?1" /></a><a href="JavaScript:mark(\'\',false);imageMark(\'max_loot\/0.png\',true);"> <img src="/graphic/max_loot/0.png?1" /></a> <a href="JavaScript:mark(\'\',false);imageMark(\'max_loot\/1.png\',true);"> <img src="/graphic/max_loot/1.png?1" /></a> <a href="JavaScript:mark(\'\',false);imageMark(\'forwarded.png\',true);"> <img src="/graphic/forwarded.png?1" /></a> <a href="JavaScript:mark(\'\',false);allOthers();"> <img src="/graphic/map/map_s.png?1" /></a> <input value="' + 
      input + 
      '" type="text" size="10" onKeyUp="mark(\'\',false);mark(this.value,true)" /> <a href="JavaScript:invert();"> <img src="/graphic/group_jump.png?1" /></a> <input type="checkbox" id="check_and" /></th></tr>';
    if (doc.getElementById('markReportTr') == null) table.innerHTML = newElement + table.innerHTML + newElement;
   }