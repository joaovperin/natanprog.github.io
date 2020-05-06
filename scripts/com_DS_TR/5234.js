var win=(window.frames.length>0)?window.main:window;
var col=(-1);
	win.$('table[class*=overview_table] tr th').each(function(i,e){if(e.innerHTML.match(/snob\.png/i)){col=i;return false;}});
if(col>=0)
	{
	win.$('table[class*=overview_table] tr td:nth-child('+(col+1)+')').each(function(i,e){if(parseInt(win.$(e).text()||'0',10)<1){win.$(e).parent('tr').remove();}});
	alert('Sadece misyoner bulunan köyler listelenmiştir.');
	} 				
else
	{
	alert("HATA:\nBir hata olustu.\nLütfen forumda bildirin.");
	}