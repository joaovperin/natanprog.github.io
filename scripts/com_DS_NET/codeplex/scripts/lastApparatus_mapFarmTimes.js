/** lastApparatus_mapFarmTimes.js
 *	on the map, displays the time elapsed since you attacked each village (premium only). Also highlights in blue if the last attack was a full haul.
 *	@author	LastApparatus
 * Version 1.0
 * Not working for 7.1
 */
 
var doc=(window.frames.length>0)?window.main.document:document;
var color='HoneyDew';
function getElementByClass(tagname,classname)
{
	var element=doc.getElementsByTagName(tagname);
	for(var x=0;x<element.length;x++)
	{
		if(element[x].className==classname)
		{
			return element[x]
		}
	}
	return-1
}

function setStatusTitle(current,total)
{
	var title=doc.getElementsByTagName("h2");
	if(title[0].innerHTML.length>12)
	{
		title[0].innerHTML=title[0].innerHTML.replace(title[0].innerHTML.substring(12)," ("+current+"/"+total+")")
	}
	else
	{
		title[0].innerHTML+=" ("+current+"/"+total+")"
	}
}

if(doc.URL.match(/screen=map/))
{
	el=getElementByClass("table","map");
	var teller=1;
	maxaantal=(el.rows.length*el.rows[1].cells.length);
	for(var x=0;x<el.rows.length;x++)
	{
		for(var y=0;y<el.rows[x].cells.length;y++)
		{
			setStatusTitle(teller++,maxaantal);
			var help=el.rows[x].cells[y].innerHTML.split(",");
			var helpCount = help.length;
			if(help[helpCount-4]!=' false'&&help[helpCount-4])
			{
				var lastAttack=new Date((help[helpCount-5]+" "+help[helpCount-4]).replace(/'/,"").replace(/ o\\'clock'/,""));
				var serverDate=doc.getElementById('serverDate').innerHTML.split('/');
				var now=new Date(serverDate[1]+'/'+serverDate[0]+'/'+serverDate[2]+" "+doc.getElementById('serverTime').innerHTML);
				var dateDifference=new Date();
				var difference=now.getTime()-lastAttack.getTime();
				dateDifference.setTime(difference);
				var format=" hrs";
				var display=Math.round(dateDifference.getTime()/(1000*60*60)*100)/100;
				if(display>=24)
				{
					display=Math.round(dateDifference.getTime()/(1000*60*60*24)*100)/100;
					format="  D"
				}
				if(help[helpCount-2] == " 'max_loot/1.png'")
				{
					var color = 'turquoise';
				}
				el.rows[x].cells[y].innerHTML+="<div style = \"border: 1px coral solid; position: absolute; background-color:"+color+"; filter:alpha(opacity=80); opacity:.8; -moz-opacity:.8; width:53px; height:12px; margin-top:-13px; display:block; color:black;\">"+display+format+"</div>";
				color = 'honeydew';
			}
		}
	}
}
else
{
	var redirect=confirm("This option can only be used in the map!\nWould you like to be redirected automatically?");
	if(redirect)
		location.search='screen=map'
};
void 0;
