ScriptAPI.register( '64-Anzahl Offs', true, 'Rob S', 'Rob_66@gmx.net' );
k=parseInt(document.getElementById('attack_info_def_units').getElementsByTagName('tr')[1].getElementsByTagName('td')[1].innerHTML);
l=parseInt(document.getElementById('attack_info_def_units').getElementsByTagName('tr')[1].getElementsByTagName('td')[2].innerHTML);
m=parseInt(document.getElementById('attack_info_def_units').getElementsByTagName('tr')[1].getElementsByTagName('td')[6].innerHTML);
deff=((k+l)/2000)+(m/480); 
min=Math.floor(1+ (0.116465*deff) + (0.0020175*deff*deff));  
alert('Man benötigt '+min+' Offs.'); 
undefined;