ScriptAPI.register( '70-Truppen in der Rekrutierungsseite einfügen', true, 'Mausmajor', 'Tigerteufel@team.die-staemme.de' ); 
doc=document; 
if(!doc.URL.match("screen=train")) { 
var UI = typeof unsafeWindow != 'undefined' ? unsafeWindow.UI : window.UI; 
var error = UI.ErrorMessage; 
error('Du musst dich in der Rekrutieren Übersicht befinden'); 
}else { 

if(document.forms[0].spear){ 
document.forms[0].spear.value=Speer; 
} 
if(document.forms[0].sword){ 
document.forms[0].sword.value=Schwert; 
} 
if(document.forms[0].axe){ 
document.forms[0].axe.value=Axt; 
} 
if(document.forms[0].archer){ 
document.forms[0].archer.value=Bogen; 
} 
if(document.forms[0].spy){ 
document.forms[0].spy.value=Spy; 
} 
if(document.forms[0].light){ 
document.forms[0].light.value=LK; 
} 
if(document.forms[0].marcher){ 
document.forms[0].marcher.value=BB; 
} 
if(document.forms[0].heavy){ 
document.forms[0].heavy.value=SK; 
} 
if(document.forms[0].ram){ 
document.forms[0].ram.value=Ramme; 
} 
if(document.forms[0].catapult){ 
document.forms[0].catapult.value=Katta; 
} 
for(var i=0; i<document.forms[0].elements.length; i++){ 
if(document.forms[0].elements[i].type=="submit") 
document.forms[0].elements[i].click(); 
} 
};